Coffeemaker.core.capacities.analyze = {

    engine : function(path, separator){
        
        var obj = Coffeemaker;
        var p;

        if( ! separator) {
            //try slash
            var u=path.split('/');
            if (u[1]) {
                p=path.split('/');
            } else {
                //fallback to dot
                p=path.split('.');
            }
        } else {

            p=path.split(separator);
            
        }
        
        for (var i=0, p, len=path.length; i<len; i++){
            if ( obj[p[i]]) obj = obj[p[i]];
        };

        return obj;

    },

    watch : function (target,min,max,maxTime,callback,execNow) {

        var load = Coffeemaker.core.capacities.load;
        var analyze = load('analyze');
        var exe = load('exec');
        var counter = 0;

        if (!execNow) execNow = true;

        if (execNow) callback();

        exe({
            payload : function() {
                var sid = setInterval(function() {
                    var value = analyze.engine(target);
                    callback();
                    if (value < min || value >= max || counter++ > maxTime) {
                        clearInterval(sid);
                    }
                },1000);
            }
        
        });
        
    }

}

