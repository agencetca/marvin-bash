Coffeemaker.core.capacities.toolchain.inject = function(item,target,opt){

	    var load = Coffeemaker.core.capacities.load;
	    loop = load('loop');
	    check = load('check');
	    var html;
	
	    if (check.isHTML(target)) {
	    
	    	if (opt === 'overwrite') {
	    		target.innerHTML = '';
	    	}
	    
	        if (check.isArray(item)) {
	            loop.array(item, function(a,b) {
	                if(check.isHTML(b)) {
	                    html = b;
	                    target.appendChild(html);
	                }
	            }); 
	        } else if (check.isObject(item)) {
	            loop.object.simple(item,function(a,b){
	                if(check.isHTML(b)) {
	                    html = b;
	                    target.appendChild(html);
	                }
	            });
	        } else if (check.isHTML(item)) {
	            html = item;
	            target.appendChild(html);
	        }
	    }
	
	    return html;
	
	}
