Coffeemaker.core.capacities.compile = function(o,opt){
	
	    //needed repositories
	    var load = Coffeemaker.core.capacities.load;
        var process = load('exec');
	    var check = load('check');
	    var compile = load('compile');
	    var loop = load('loop');
	    var analyze = load('analyze');
	    var toolchain = load('toolchain');

        new process({
        
            name : 'check package',
            payload : function () {

                if (check.isString(o)) {
                    if ( ! load(o)) {
                        var counter=0;
                        var clock = setInterval(function(){ 
                            if (counter++ > 30) {
                                clearInterval(clock);
                                console.log('compile.js'+o+' unavailable in repository');
                            } else {
                                if ( load(o) ) {
                                    compile(o);
                                    clearInterval(clock);
                                }
                            }
                        }, 100);
                    }

                    return true;
                }
                
                else if(check.isObject(o) && check.isObject(o.structure)) {

                    return true;
                }

            },
            timeout : 0,
            callback : {
                
                    name : 'configure',
                    payload : function (bool) {
                        if( bool === true ) {
                            console.log(o);
                            toolchain.configure(o);
                        }

                },
                callbak : {

                    name : 'make',
                    payload : function (a) {


                    },
                    callback : {
                        
                        name : 'inject',
                        payload : function (a) {

                        }

                    }
                }
            }
        
        });
		


}
