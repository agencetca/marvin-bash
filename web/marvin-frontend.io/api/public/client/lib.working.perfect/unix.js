new function(){
	
	this.grep = function(str,context) {
        
        var check = __platform__.lib.check;

		if(check.isString(str)){

		    if(check.isString(context)){
			    return context.match(str);
		    }
		}

	}

}
