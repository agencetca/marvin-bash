Coffeemaker.core.capacities.toolchain.configure = function(obj){

	    var load = Coffeemaker.core.capacities.load;
	    var process = load('exec');
        var loop = load('loop');
        var check = load('check');
	    var DOM = load('DOM');

        var make = Coffeemaker.core.capacities.toolchain.make;
       
        var fabric = {

            parse : function (o,t,l) {
                if ( check.isString(t)) {
                    if (t.match(',')) {
                        loop.array (t.split(','),function(x,y) {
                            if (check.isObject(o[y])) {
                                loop.object.recursive (o[y],function(i,r) {
                                    l(i,r);
                                });
                            }
                        });
                    } else {
                        if (check.isObject(o[t])) {
                            loop.object.recursive (o[t],function(x,y) {
                                l(x,y);
                            });
                        }
                    }
                }else if ( check.isArray(t)) {
                    loop.array (t,function(x,y) {
                        if (check.isObject(o[y])) {
                            loop.object.recursive (o[y],function(i,r) {
                                l(i,r);
                            });
                        } else if (check.isArray(o[y])) {
                            loop.array (o[y],function(i,r) {
                                l(i,r);
                            });
                        }

                    });
                }else if ( check.isObject(t)) {

                    loop.object.simple (t,function(x,y) {
                        //TESTING
                        // if (check.isEventSupported(x)) {
                        if ( check.isObject(y) ) {
                            loop.object.simple (y,function(i,r) {
                                if ( check.isArray(r) ) {
                                    loop.array (r, function(f,g) {
                                        if ( check.isString(g) ) {
                                            if ( (g !== "*") || ( ! check.doesExist(r[1]) ) ) l(i,g,x); 
                                        }
                                    });
                                } else if (check.isString(r)) {
                                    if ( r === "*" ) l(i,r,x); 
                                }
                            });
                        }
                        // }
                        //if (check.isObject(o[x])) {
                        //    loop.object.simple (o[x],function(i,r) {
                        //        l(i,r,eve);
                        //    });
                        //}
                        //ENDTEST

                        //if (check.isObject(o[y])) {
                        //    loop.object.recursive (o[y],function(i,r) {
                        //        l(i,r);
                        //    });
                        //} else if (check.isArray(o[y])) {
                        //    loop.array (o[y],function(i,r) {
                        //        l(i,r);
                        //    });
                        //}
                    });
                }
            },

            design : function (a,b) {

                o = b['design'];
                l = function (g,h) {
                    e.style.setProperty(g,h);
                }

                this.parse(o,a,l);

            },

            methods : function (a,b) {

            },

            events : function (a,b) {
                o = b['logic'];
                l = function (func,ns,eve) {
                    var funcs = func.split("/");
                    var scope = o;

                    loop.array (funcs, function(i,r) {
                        scope = scope[r];
                    });

                    if( ns !== "*" ) {
                        scope = scope[ns]
                    }

                    loop.object.recursive (scope, function(f,args) {
                        if (check.isString(args)) {
                            args = [args]; 
                        }

                        if (check.isArray(args)) {
                            var fu = load('methods',f);
                            if (check.isEventSupported(eve)) {
                                DOM.event.addListener(e,eve,fu,args);
                            } else {
                                if ( eve === 'onload' | eve === 'load' )

                                    var fufu;
                                var sid = setInterval(fufu = function() {
                                    var el = document.getElementById(e.id);    
                                    if (el) {
                                        //el.start(eve);
                                        fu(args);
                                        clearInterval(sid);
                                    }
                                },1000);

                                //alert(fufu.toString().replace(/e\.id/,e.id).replace(/args/,args).replace(/args/,args).replace(/fu/,f);

                                //if (DOM.event.custom && DOM.event.custom[eve]) 
                                // DOM.event.custom[eve](e,eve,fu,args);
                            }
                            //this.exportCode(eve,element.id,func,args);
                        }
                    });
                }

                this.parse(o,a,l);
            },

        };


        new process({

            name : 'components are downloaded',
            payload : function () {

                var loaded = [];
                loop.object.recursive(obj.structure,function(a,b,c) {

                    if (a === 'element') {
                        load('components',b);
                        loaded.push(b)
                    }
                });

                return loaded;

            },
            callback : {
            
                name : 'building components',
                payload : function() {

                    counter = 0;
                    loop.object.recursive(obj.structure,function(a,b,c) {
                        
                        var el;
                        if (a === 'element') {
                            alert(make(b));
                                //element = make(b);
                                //element.id = b.id || counter++;
                                //element.className = b.cls || '';
                                //console.log(element);
                        }
                        
                    });
                    
                    return obj;
                    
                },
                timeout : function(loaded) {
                    var FLAG=0;
                    loop.array(loaded, function(a,b) {
                      if ( ! load(b) ) FLAG += 100;  
                    });
                    return FLAG;
                },
                callback : {

                    name : 'Applying custom configuration',
                    payload : function () {
                        return;

                        loop.object.recursive(obj.structure,function(a,b,c) {

                            if (b.element) {

                                if (b.design) {
                                    fabric.design(b,obj);
                                }
                                if (b.methods) {
                                    fabric.methods(b,obj);
                                }

                                if (b.events) {
                                    fabric.events(b,obj);
                                }

                            }

                        });

                    }
                }
            },
        });
	}
