Coffeemaker.core.capacities.load = function () {

		var repository;
		var payload;
		
		repository = arguments[0];
		payload = arguments[1];
		
		Array.prototype.shift.apply(arguments);
		Array.prototype.shift.apply(arguments);

        if (!payload) {
            payload = repository.split('/');
            repository = payload.shift();
            payload = payload.join('/');
        }else {

            if (!repository) repository = '';
            if (!payload) payload = '';

        }

        if (repository !== 'components' && repository !== 'templates') {

            if (repository === 'methods') {
                return Coffeemaker.core.capacities.analyze.engine.getValue(repository+"/"+payload);
            } else {
                return Coffeemaker.core.capacities.analyze.engine.getValue("core/capacities"+"/"+repository+payload);
            }

        } else {

                if (!payload) {

                    //if( ! Coffeemaker[repository] ) Coffeemaker[repository] = {};
                    return Coffeemaker[repository];

                }

				var check = Coffeemaker.core.capacities.check;
				var url = repository+'/'+payload;
				var verif = Coffeemaker.core.capacities.analyze.engine.getValue(url)

				if (verif) { 

					return verif;
				
				} else {

                    if (check.inArray(url,Coffeemaker.core.capacities.load.loaded)) return false;
				
					//download components or templates
					if (transmission = Coffeemaker.core.capacities.transmission.ajax) {
					
						transmission.GET( url+'.json',"",function(a){
					
                            //alert(url);
								if (check.isJSON(a)) {

                                    Coffeemaker.core.capacities.analyze.engine.setValue(url,JSON.parse(a));

									//if ( ! Coffeemaker[repository] ) Coffeemaker[repository] = {};
									//Coffeemaker[repository][payload] = JSON.parse(a);
                                    //alert(a);
								} else {
									Coffeemaker.core.capacities.log.exception(
									'load.js','JSON failed to parse',a);
								}

						});
						
						Coffeemaker.core.capacities.load.loaded.push(url);
				
					}
					
				}
			
			}
		
		}
		
Coffeemaker.core.capacities.load.loaded = []
Coffeemaker.core.capacities.load.init = function(repo) {

    JSON.stringify(Coffeemaker.core.capacities.analyze.engine.getValue(repo,true));   

}
