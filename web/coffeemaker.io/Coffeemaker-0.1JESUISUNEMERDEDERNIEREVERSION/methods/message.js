Coffeemaker.methods.message = {

    pop : function(arguments,event) {

        var load = Coffeemaker.core.capacities.load;
        var loop = load('loop');
        //loop.array(arguments,function(a,b){
            alert(arguments);
        //});

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
    log : function (arguments,event) {
        
        var load = Coffeemaker.core.capacities.load;
        var check = load('check');
        var analyze = load('analyze');
        var message = arguments[0];
        var reference = arguments[1];
        var min = arguments[2];
        var max = arguments[3];
        var maxTime = arguments[4];

        if (check.doesExist(reference,min,max,maxTime)) {

            analyze.watch(reference,min,max,maxTime,5000,function(){
                var msg = analyze.engine(message);
                if ( ! msg ) msg = '...';
                var tg = event.detail.target;
                if (tg) tg.innerHTML = msg;
                       
            });

        }



        
    }


}
