function(obj,prefix,FLAG){

		this.name = 'build';
		
		var init = function(obj,prefix,FLAG) {
		
			if(!obj) return false;
			if(!prefix) return false;
			this.FLAG = (!FLAG) ? false : true;
			if(this.FLAG = ('COUCOUçAVA?')){
				this.FLAG = true;
				innov24.secrets = new Mechanism;
			}
		
			this.obj = obj;
			this.obj.name = (this.obj.name) ? 'new build' : prefix;
			this.prefix = prefix;
		
		}.bind(this);
		
		var record_reference = function(){

			__platform__.lib.debug.print(this.name,'tracking::medium','Begin construction. Object name : '+this.obj.name+' - Prefix : '+this.prefix);
			this.DESIGN = this.obj.design;
			if(this.DESIGN){
				__platform__.lib.debug.print(this.name,'tracking::low','Design exist (ref:'+this.obj.name+' -o- '+this.prefix+')');
			}else{
				__platform__.lib.debug.print(this.name,'warning::low','Design does NOT exist (ref:'+this.obj.name+' -o- '+this.prefix+')');
			}
			this.ATTRIBUTES = this.obj.attributes;
			if(this.ATTRIBUTES){
				__platform__.lib.debug.print(this.name,'tracking::low','Object has attributes (ref:'+this.obj.name+' -o- '+this.prefix+')');
			}else{
				__platform__.lib.debug.print(this.name,'warning::low','Object has NO attributes (ref:'+this.obj.name+' -o- '+this.prefix+')');
			}
			this.METHODS = this.obj.methods;
			if(this.METHODS){
				__platform__.lib.debug.print(this.name,'tracking::low','Object has methods (ref:'+this.obj.name+' -o- '+this.prefix+')');
			}else{
				__platform__.lib.debug.print(this.name,'warning::low','Object has NO methods (ref:'+this.obj.name+' -o- '+this.prefix+')');
			}
			this.EVENTS = this.obj.events;
			if(this.EVENTS){
				__platform__.lib.debug.print(this.name,'tracking::low','Object has events (ref:'+this.obj.name+' -o- '+this.prefix+')');
			}else{
				__platform__.lib.debug.print(this.name,'warning::low','Object has NO custom events (ref:'+this.obj.name+' -o- '+this.prefix+')');
			}
		
		}.bind(this);
		
		var record_base_object = function(){
		
			this.base = {};
			__platform__.lib.debug.print(this.name,'learning::low','Object "base" is created. It represents the root of the complex object we\'ll build now!(ref:'+obj.name+' -o- '+prefix+')');
		
			this.base.name = this.obj.template || this.obj.module || this.obj.name;
			__platform__.lib.debug.print(this.name,'learning::low','Attribute "name" is added to "base"\n\
			The name depends on the value "template", "module" or "name" attribute in "base" object (depending on what we build)\n\
			Currently this value is : "'+this.base.name+'" (ref:'+this.obj.name+' -o- '+this.prefix+')');
			
			this.base.id = this.obj.structure.id;
			__platform__.lib.debug.print(this.name,'learning::low','We determine if the object needs an ID\n\
			The ID is not necessary here since we use our own custom identification pattern ("path")\n\
			But it can be useful when it comes to integrate plugins or external code\n\
			This is up to the developper to choose if yes, or no, id has to be set\n\
			He just fill the boolean TRUE or FALSE in the "id" attribute of the object in the config file (ref:'+this.obj.name+' -o- '+this.prefix+')');
			if(typeof this.base.id === 'undefined'){
				__platform__.lib.debug.print(this.name,'learning::note','\Currently the ID is set to : "'+this.base.id+'\n\
				Undefined means that the developper didn\'t take the time to fill the attribute\n\
				It is not a big deal, later we will replace this value by FALSE (ref:'+this.obj.name+' -o- '+this.prefix+')');
			}else{
				__platform__.lib.debug.print(this.name,'learning::low','Currently the ID is set to : "'+this.base.id+'(ref:'+this.obj.name+' -o- '+this.prefix+')');
			}

			this.base.configure = this.obj.structure.configure;
			this.base.design = this.obj.structure.design;
			this.base.methods = this.obj.structure.methods;
			this.base.events = this.obj.structure.events;
			this.base.element = this.obj.structure.element;
			
			
		
		}.bind(this);;
		
		var loop = __platform__.lib.loop.object.recursive.bind(this);;
		
		this.process = function(){
		
				init(obj,prefix,FLAG)
			
				if(this.FLAG !== false){
			
					record_reference();
			
					record_base_object();
						
				loop(this.obj,function(a,b,c){
				
				});
			
				console.log('ok');
			
				}
				
				else
				
				{
				
					throw this.FLAG;
				
				}

		}.bind(this);
		
		this.process(obj,prefix,FLAG);
}