Coffeemaker.core.capacities.compile = function(o,opt){
	
	    //needed repositories
	    var load = Coffeemaker.core.capacities.load;
        var ex = load('exec');
	    var check = load('check');
	    var loop = load('loop');
	    var analyze = load('analyze');
	    var toolchain = load('toolchain');

        //TODO : Hacked but MUST be optimized
        var copy2 = function (o) {

                 this.structure = JSON.parse(JSON.stringify(o.structure))
                 this.design = JSON.parse(JSON.stringify(o.design || {}))
                 this.logic = JSON.parse(JSON.stringify(o.logic || {}))
                 return this;

        }
 
	    //TODO : Hacked but MUST be optimized
        var copy = function (o) {
		this.structure = (function() { 
		    FLAG=0;
		    loop.object.simple(o.structure,function(x,y){
		        if(! check.isObject(y)){
		            FLAG=1;
		        }
		    });
		    if (FLAG === 0) { return { a : JSON.parse(JSON.stringify(o.structure || {})) } }
		    else{ return JSON.parse(JSON.stringify(o.structure  || {}))}
		}());

		this.design = JSON.parse(JSON.stringify(o.design || {}))
		this.logic = JSON.parse(JSON.stringify(o.logic || {}))
		return this;
	    } 

        new ex({
        
            name : 'compilation -- preparation',
            payload : function () {

	            var thing;

                if (check.isJSON(o)) {
                    o = JSON.parse(o);
                }


                if (check.isString(o)) {
                    load(o);
                }

                return o;
                
            },
            timeout : 0,
            callback : {
                
                    name : 'compilation -- configuration',
                    payload : function (o) {

                    o = load(o);
                    var object = new copy(o);

                    //configure
                    toolchain.configure(o);
                    return
                    return [o, opt];

                },
                timeout : 1000,
                callbak : {

                    name : 'compilation',
                    payload : function (a) {
                return;

                        var load = Coffeemaker.core.capacities.load;
                        var check = load('check');
                        var loop = load('loop');
                        var analyze = load('analyze');
                        var toolchain = load('toolchain');

                        var o = a[0];
                        var opt = a[1];

    	                //make
    	                var thing = toolchain.make(o)

                        return [ thing, opt ];

                    },
                    callback : {
                        
                        name : 'injection',
                        payload : function (a) {
                return;

                              var load = Coffeemaker.core.capacities.load;
                              var check = load('check');
                              var loop = load('loop');
                              var analyze = load('analyze');
                              var toolchain = load('toolchain');
                                
                              var thing = a[0];
                              var opt = a[1];
                              
                              //inject
                              if (opt) {
                              var args = Array.prototype.slice.call(arguments);
                              args.shift();
                              args.unshift(thing);
                              toolchain.inject.apply('',args)
                              }
                              
                              //return thing;

                        }

                    }
                }
            }
        
        });
		


}
