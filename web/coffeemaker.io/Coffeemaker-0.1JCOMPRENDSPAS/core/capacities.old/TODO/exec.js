Coffeemaker.core.capacities.exec = function (callback) {
	
	
	var callback = arguments[0];
	Array.prototype.shift.apply(arguments);
	var load = Coffeemaker.core.capacities.load;
	var check = load('core/capacities/check');
	var loop = load('core/capacities/loop');
	
	if (check.isArray(callback.depend)) {


			loop.array(callback.depend, function (a,b) {
				
				var load = Coffeemaker.core.capacities.load;
				var check = load('core/capacities/check');
			
				if ( ! check.isFunction(b) ) {
				
					load(a);
					setTimeout(function(){
             			callback(arguments);
         	 		}, 500);
         	 		
				}else {
					
					if (a === callback.depend.length) callback(arguments);
				}
			
			});
			

		
	}
	
	
}
