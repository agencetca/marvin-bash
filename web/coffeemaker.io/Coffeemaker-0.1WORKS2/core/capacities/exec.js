Coffeemaker.core.capacities.exec = function() {
	    
	    this.subprocess = function (o,timeout) {

	   	setTimeout(function(){
	   	
			   loop.array(o, function(a,b,c) {
		
					if (check.isObject(b) && check.isFunction(b.payload)) {
			
						var RETURN;
				
						try {
					
                            logs.task.start(b.name);
							RETURN = b.payload.apply('',b.args);
					
						} catch(e) {
				
							if (check.isFunction(b.error)) b.error();
                            logs.task.error(b.name);
                            console.log(e);
				
						} finally {


						 	if (check.isObject(b.callback) 
						 	&& check.isFunction(b.callback.payload)) {
						 		if ( ! check.isArray(b.callback.args)) {
                                    b.callback.args = [];
						 		}
						 		b.callback.args.push(RETURN);
						 		ex(b.callback);
							}
                            
                            logs.task.success(b.name);
						}
				
			
					}
		
		
				});
			
			}, timeout);
		
		}


		var load = Coffeemaker.core.capacities.load;
	    var loop = load('loop');
	    var check = load('check');
	    var logs = load('log');
	    var ex = load('exec');
	    
	    var timeout = 0;
        var counter = 0;
	    var total = 0;
        var n;
        var p;



	    try {
	    loop.array(arguments, function(a,b) {
	    	if (check.isObject(b)) {
	    		loop.object.simple(b, function(t,e,v){
                    //logs.task.init();
                    //if (!Coffeemaker.current) Coffeemaker.current = v.name;
                    if (!n) {
                        if (v.name) {
                            //logs.task.queued(v.name);
                            //n = v.name;
	    		            //loop.object.simple(b, function(k,l,m){
                            //    if (m.name === n) {
                            //        if(k === 'callback') {
                            //            loop.object.recursive(l,function(t,u,v){
                            //                if (t === 'payload') counter++;
                            //            })
                            //        }
                            //    }
                            //});


                            //alert('process ' + Coffeemaker.current + ' is doing '+n+' and still contains ' + counter + ' subprocess')
                            //Coffeemaker.ETA = counter;
                            //Coffeemaker.sub = n;
                            //if (! Coffeemaker.tasks) Coffeemaker.tasks = [];
                            //Coffeemaker.tasks.push(n);
                            //alert(Coffeemaker.sub+' :: '+Coffeemaker.ETA);
                            //if(counter === 0) alert(Coffeemaker.current + ' is done')
                            //logs.task.set('init');
			                //logs.task.init(n,0,counter);
                            //alert(n+' : '+counter);
                        }
                    }
	    			if (t === 'payload') {
                        total++;
                    }
	    		});
	    	}
	    });

		//if (check.isString(arguments[0])) {
	    //		logs.task.init(arguments[0],0,total);
		//}
		//logs.task.update(logs.task.get('current'),total)
	    
	    loop.array(arguments, function(a,b,c) {
	    	if (check.isObject(b)) {
	    		loop.object.simple(b, function(t,e,v){
	    			if (t === 'timeout') timeout=e;
                    if (t === 'name') logs.task.queued(e);
	    		});
	    	}
	    });

		}catch(e) {} finally {
			//alert(timeout);
            
			//if (!timeout) timeout = 4000;
            //timeout = 4000;
	    	this.subprocess(arguments,timeout);

	    }
}
