Coffeemaker.core.capacities.DOM.event.addListener = function(element,eventName,callback,args,capture) {

	var lib = Coffeemaker.core.capacities;
        var check = lib['check'];

	var func = callback;

	var listener = function(nt){

		func(args,nt);

	}

	element.addEventListener(eventName, listener , false);

	return listener;


}
