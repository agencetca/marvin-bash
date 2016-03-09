Coffeemaker.core.capacities.toolchain.configure = function(obj){

	    var load = Coffeemaker.core.capacities.load;
	    var process = load('exec');
        var loop = load('loop');
        var check = load('check');
	    var DOM = load('DOM');
        var toolchain = load('toolchain');

        new process({

            name : 'checking request',
            payload : function () {

                if (check.isString(obj)) {
                    if ( ! load(obj) ) {
                        return false;
                    }
                } else if (check.isObject(obj) && check.isObject(obj.structure)) {

                    return true;
                }


                console.log(obj);
                console.log('tout ce que je fais cest de la daube');
            },
            callback : {

                name : 'detecting needed components',
                payload : function(bool) {

                    if ( bool === false ) {
                        obj = load(obj);
                    }

                    if ( ! check.isObject(obj) || ! check.isObject(obj.structure)) return;

                    loop.object.recursive(obj.structure, function(a,b,c) {

                        if(a === 'element') {
                            b = 'components/'+b;
                            load(b);
                        }

                    });

                },
                timeout : function(bool) {
                    if (bool === false) {
                        return 3000;
                    } else {
                        return 0;
                    }
                },
                callback : {

                    name : '',
                    payload : function() {

                    if ( ! check.isObject(obj) || ! check.isObject(obj.structure)) return;

                    loop.object.recursive(obj.structure, function(a,b,c) {

                        if(a === 'element') {
                            console.log(load(b));
                        }

                    });



                    },
                    timeout :3000 
                }



            }
        });




	}
