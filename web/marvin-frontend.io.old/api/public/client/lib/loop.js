function(){

	this.name = 'loop';

	this.init = function(){
		console.log('Loop!!');
	};
	
	this.object = {
	
		simple : function(o,callback) {
			__platform__.lib.debug.print(this.name,'warning::low','A SIMPLE loop is launched (ref:'+o.name+')');
			if(!o) {
			__platform__.lib.debug.print(this.name,'todo::medium','Why does o is undefined here?');
			return;}
				for(var i in o) {
					if(o.hasOwnProperty(i)) {
					if(callback) {
						callback(i,o[i],o);
					};
				};
			};
			
			__platform__.lib.debug.print(this.name,'warning::low','A loop just ended (ref:'+o.name+')');
		},

		recursive : function(o,callback,count) {
		
			if(!count) {
					count = 0;
			}
			
			count++;
			__platform__.lib.debug.print(this.name,'warning::low','A RECURSIVE loop is launched (ref:'+o.name+')');
			if(!o) {
			__platform__.lib.debug.print(this.name,'todo::medium','Why does o is undefined here?');
			return;}
			for(var i in o) {
				if(o.hasOwnProperty(i)) {
					if(callback) {
						callback(i,o[i],o);
					};

					if(typeof o[i] === 'object') {
							this.object.recursive(o[i],callback,count);
					};
				};
			};
			
			__platform__.lib.debug.print(this.name,'warning::low','A loop just ended after '+count+' iteration(s) (ref:'+o.name+')');
			
		}.bind(this)
	}
	
	return this;
}
