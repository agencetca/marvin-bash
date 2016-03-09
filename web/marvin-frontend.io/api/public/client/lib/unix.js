new function(){
	
	this.grep = function(str,context) {
        
        var load = __platform__.lib.load;
        var check = load('check');

		if(check.isString(str)){

		    if(check.isString(context)){
			    return context.match(str);
		    }
		}

	}

}
