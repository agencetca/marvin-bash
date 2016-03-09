Coffeemaker.core.capacities.toolchain.configure = function(obj){

	    var load = Coffeemaker.core.capacities.load;
	    var process = load('exec');
        var loop = load('loop');
        var check = load('check');
	    var DOM = load('DOM');

        var fabric = {

            setStyle : function (e,g,h) {
                new process({
                    name : 'set object style',
                    payload : function() {

                        e.style.setProperty(g,h); 

                    }
                });
            },
            
            addEventListener : function () {
                new process({
                    name : '',
                    payload : function(){
                    }
                });
            },

            setScope : function () {
                new process({
                    name : '',
                    payload : function(){
                    }
                });
            },

            handleShortcut : function () {
                new process({
                    name : '',
                    payload : function(){
                    }
                });
            },

            ensureArray : function () {
                new process({
                    name : '',
                    payload : function(){
                    }
                });
            },

            splitPath : function(a,b) {
                new process({
                    name : '',
                    payload : function(){
                        if (check.isString(a)) return a.split(b);
                    }
                });
            },

            loadFu : function() {
                new process({
                    name : '',
                    payload : function(){
                    }
                });
            },

            handleEvent : {
                route : function () {
                    new process({
                        name : '',
                        payload : function(){
                        }
                    });
                },

                supported : function () {
                    new process({
                        name : '',
                        payload : function(){
                        }
                    });
                },

                custom : function () {
                    new process({
                        name : '',
                        payload : function(){
                        }
                    });
                },

                unsupported : function () {
                    new process({
                        name : '',
                        payload : function(){
                        }
                    });
                },

                delayExecution : function() {
                    new process({
                        name : '',
                        payload : function(){
                        }
                    });
                }
            }

        }

        process({

            name : 'configuration',
            payload : function () {

                if (check.isString(obj)) load('components/div');

                loop.object.recursive(obj,function(a,b,c) {

                    console.log(b);

                });

            },
            callback : {
            
                name : 'parse structure',
                payload : function() {

                    console.log(obj);
                },

            }
        });




	}
