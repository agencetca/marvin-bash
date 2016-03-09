function(){

	this.name = 'loop';

	this.init = function(){
		console.log('Loop!!');
	};
	
    this.array = function (arr,callback) {
        var v = arr.length;
        for (var i = 0; i < v; i++) {
           callback(i,arr[i]);
        }
    };

	this.object = {
	
		simple : function(o,callback) {
		    for(var i in o) {
				if(o.hasOwnProperty(i)) {
					if(callback) {
						callback(i,o[i],o);
					};
				};
		    };
		},

		recursive : function(o,callback) {
		
            var check = __platform__.lib.check;
			
			for(var i in o) {
				if(o.hasOwnProperty(i)) {
					if(callback) {
					    if(callback) {
						    callback(i,o[i],o);
                        }
					};

					if(check.isObject(o[i])) {
							this.object.recursive(o[i],callback);
					};
				};
			};
			
		}.bind(this),

    }

	    return this;
}
