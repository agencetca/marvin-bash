Coffeemaker.methods.message = {

    pop : function(arguments,event) {

        var load = Coffeemaker.core.capacities.load;
        var loop = load('loop');
        loop.array(arguments,function(a,b){
            alert(b);
        });

    },

    bubble : function (arguments,event) {

        //var ee = new Event('build')
        //debug = load('alert',ee);
        //debug("jusqu'ici tout va bien","hello",ee);

    },

    console : function (arguments,event) {

        var load = Coffeemaker.core.capacities.load;
        var loop = load('loop');
        loop.array(arguments,function(a,b){
            console.log(b);
        });

    }, 
    inline : function (arguments,event) {
        
        var load = Coffeemaker.core.capacities.load;
        var check = load('check');
        var analyze = load('analyze');
        var message = arguments[0];
        var target = arguments[1];
        var reference = arguments[2];
        var min = arguments[3];
        var max = arguments[4];
        var maxTime = arguments[5];

        if (check.doesExist(reference,min,max,maxTime)) {

            analyze.watch(reference,min,max,maxTime,function(){
             
                var msg = analyze.engine(message);
                if ( ! msg ) msg = '...';
                var tg = document.getElementById(target);
                if (tg) tg.innerHTML = msg;
                       
            });

        }



        
    }


}
