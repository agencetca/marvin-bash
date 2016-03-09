function(){

        var check = __platform__.lib['check'];

        var payload = arguments[0];
        Array.prototype.shift.apply(arguments);

        var event = arguments[0];
        var func;
        var obj;

        if ( check.isFunction(func =__platform__.env.methods[payload]) ) {
            return function() {
                //func(arguments,event);
                func(arguments,event);
            }
        } else if ( check.isObject(obj = __platform__.lib[payload]) ) {
            return obj;
        } else if ( check.isFunction(func = __platform__.lib[payload]) ) {
            //number,loop,coffeemaker,stack,display 
            //TODO Need a REAL solution here
            return new func(arguments[0],
                    arguments[1],
                    arguments[2],
                    arguments[3],
                    arguments[4],
                    arguments[5],
                    arguments[6],
                    arguments[7],
                    arguments[8],
                    arguments[9],
                    arguments[10]
                    );
        } 

}
