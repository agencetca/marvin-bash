new function(){
	
	this.hasClass = function (element, cls) {
		if(!cls) return;
		if(element instanceof HTMLElement) return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	this.doesExist = function (thing) {
		if(thing) {
            return true;
        } else { return false; }
	}

	this.type = function (thing) {
		return Object.prototype.toString.call(thing);
	}

	this.objectSize = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    
	    return size;
	}

	this.isArray = function(thing) {
		
		if(this.doesExist(thing) && this.type(thing) === '[object Array]'){
			return true;
		}else{
			return false;
		}

	}

	this.isString = function(thing) {
		
		if(this.doesExist(thing) && this.type(thing) === '[object String]'){
			return true;
		}else{
			return false;
		}

	}

	this.isObject = function(thing) {
		
		if(this.doesExist(thing) && this.type(thing) === '[object Object]'){
			return true;
		}else{
			return false;
		}

	}

	this.isHTMLObject = function(thing) {
	
        var unix = __platform__.lib.unix;

		if( this.doesExist(thing) && unix.grep("HTML",this.type(thing)) ) {
			return true;
		}else{
			return false;
		}

	}

	this.isNotHTML = function(thing) {
	
        var unix = __platform__.lib.unix;

		if( this.doesExist(thing) && unix.grep("HTML",this.type(thing)) ) {
			return false;
		}else{
			return true;
		}

	}

	this.objectLength = function(obj) {

		var count = 0;

		for (var k in obj) {
			if (obj.hasOwnProperty(k)) {
				++count;
			}
		}

		return count;

	}


	this.inArray = function(value, array) {

		if(array.indexOf(value) > -1){
			return array.indexOf(value) > -1;
		}else if(array.indexOf(parseInt(value)) > -1){
			return array.indexOf(parseInt(value)) > -1;
		}else{
			return false;
		}
	}

	this.inObject = function(value, object) {
		for(var prop in object) {
			if(object.hasOwnProperty(prop)) {
				if(object[prop] === value) {
					return true;
				}
			}
		}
		return false;
	}

	this.keyInObject = function(value, object) {

		if(object[value]){
			return true;
		}else{
			return false;
		}
	}
        
        this.isFunction = function(thing) {
            var getType = {};
            return thing && getType.toString.call(thing) === '[object Function]';
        }
        
        this.getDocHeight = function() {
            var D = document;
            return Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            );
        }

    this.isEventSupported = function(eventName) {
    
	    var el = document.createElement('div');
	    eventName = 'on' + eventName;
	    var isSupported = (eventName in el);
	    if (!isSupported) {
	        el.setAttribute(eventName, 'return;');
	        isSupported = typeof el[eventName] == 'function';
	    }
	    el = null;
	    return isSupported;
    
    }

}
