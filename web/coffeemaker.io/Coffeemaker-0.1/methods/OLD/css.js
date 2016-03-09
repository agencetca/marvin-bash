Coffeemaker.methods.css = {
    
    affect : function (arguments,event) {

        var property = arguments[0];
        var value = arguments[1];
        var target = event.target;
        target.style.setProperty(property,value);

    },

    follow : function (arguments,event) {

        var property = arguments[0];
        var target = arguments[1];
        var unit = arguments[2];
        var min = arguments[3];
        var max = arguments[4];
        var maxTime = arguments[5]; // in seconds
        var el = event.target;

        var load = Coffeemaker.core.capacities.load;
        var analyze = load('analyze');
    
        el.style.setProperty(property,min+unit);
        //$(el).animate({
        //    width: analyze.engine(target)+unit
        //});

        analyze.watch(target,min,max,maxTime,5000,function(){
            var value = analyze.engine.getValue(target);
            el.style.setProperty(property,min+unit);
            //$(el).animate({
            //    width: value+unit
            //});
        });

    },

    followString : function (arguments,event) {

        var property = arguments[0];
        var propertyValue = arguments[1];
        var target = arguments[2];
        var maxTime = arguments[3]; // in seconds
        var el = event.target;

        var load = Coffeemaker.core.capacities.load;
        var analyze = load('analyze');
    
        //setTimeout(function() {
            analyze.watch(target,'none','none',maxTime,5000,function(){
                if(typeof analyze.engine.getValue(target) === 'string') el.style.setProperty(property,propertyValue);
            });
        //},5000);

    },

}
