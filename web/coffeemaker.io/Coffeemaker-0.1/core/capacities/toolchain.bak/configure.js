Coffeemaker.core.capacities.toolchain.configure = function(obj){

	    var load = Coffeemaker.core.capacities.load;
        var process = load('exec');
        var loop = load('loop');

        new process({
        
            name : 'checking dependencies',
            payload : function () {

               loop.object.recursive(obj, function(a,b,c) {


                    if ( a === 'element' ) {

                            load('component/'+a)

                    }

               });

            }
        
        
        
        
        });
            
	}
