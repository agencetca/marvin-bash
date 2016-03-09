Coffeemaker.core.capacities.toolchain.inject = function(item,target,opt){

	    var load = Coffeemaker.core.capacities.load;
	    var loop = load('loop');
	    var check = load('check');
	    var html;
	
	    if (check.isHTML(target)) {
	    
	        if (check.isArray(item)) {
	            loop.array(item, function(a,b) {
	                if(check.isHTML(b)) {
	                    html = b;
	                }
	            }); 
	        } else if (check.isObject(item)) {
	            loop.object.simple(item,function(a,b){
	                if(check.isHTML(b)) {
	                    html = b;
	                }
	            });
	        } else if (check.isHTML(item)) {
	            html = item;
	        }

            if(check.isHTML(html)) {
	    	    if (opt === 'overwrite') {
	    		    target.innerHTML = '';
	    	    }
	            target.appendChild(html);
            }
	    
	    }
	
	    return html;
	
	}
