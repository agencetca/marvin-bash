function(){

    var load = __platform__.lib.load;
    var check = load('check');

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
