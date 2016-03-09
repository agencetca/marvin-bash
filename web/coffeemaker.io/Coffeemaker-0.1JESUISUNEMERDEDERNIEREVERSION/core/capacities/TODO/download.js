Coffeemaker.core.capacities.exportCode : function (eve,id,func,args) {

	//TODO change for Coffeemaker.core.capacities.DOM.element.create(tagname, configuration)
	var s = document.createElement( 'script' );
	//var src='var element=document.getElementById('+id+');element.addEventListener('+eve+', function(nt){'+Coffeemaker+'.methods['+func+'](nt,['+args+']);},false);';
	//s.innerHTML = src;

	//TODO change for Coffeemaker.core.capacities.DOM.element.select( type, name, position )
	var head = document.head || document.getElementsByTagName("head")[0];

	//TODO change for Coffeemaker.core.capacities.DOM.structure.appendElementTo( type, name, position )
	head.appendChild(s);

	//display.bubble();
	//alert( document.documentElement.outerHTML );

}
