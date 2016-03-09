Coffeemaker.methods.css = {
    
    affect : function (arguments,event) {

        var target = document.getElementById(arguments[0]);
        var property = arguments[1];
        var value = arguments[2];
        target.style.setProperty(property,value);

    },

    follow : function (arguments,event) {

        var property = arguments[0];
        var target = arguments[1];
        var unit = arguments[2];
        var min = arguments[3];
        var max = arguments[4];
        var maxTime = arguments[5]; // in seconds
        var el = document.getElementById(arguments[6]);

        var load = Coffeemaker.core.capacities.load;
        var analyze = load('analyze');
    
        el.style.setProperty(property,min+unit);

        analyze.watch(target,min,max,maxTime,function(){
            
            var value = analyze.engine(target,'.');
            el.style.setProperty(property,value+unit);
            
        });

    }

}
