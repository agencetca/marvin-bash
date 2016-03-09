new function(){

	this.name = 'debug';
	
	this.print = function(source,type,msg){
		
	    var priority;
            
            if(!type){
                type = "";
            }

            var TYPE = type;
            type = TYPE.replace(/(.*)::.*/,"$1");
            priority = TYPE.replace(/.*::(.*)/,"$1");
            
            if(!priority){
                priority = "none";
            }

            if(this.options.priorities[priority] !== true && priority !== "hook"){
                return;
            }

            try{
            
                if(priority === "hook" && this.options.priorities.hook === true){
                    var sourcefile = "";
                    if(this.options.sourcefile){
                        sourcefile = source.toUpperCase() + " says : ";
                    }
                    console.log(this.options.count+". "+ sourcefile + "("+type.toUpperCase()+" (-HOOK-)) " + msg);
                    this.options.count++;
                    return;
                }

                
                    if(this.options.types[type] === true) {
                        
                            var sourcefile = "";
                            if(this.options.sourcefile){
                                sourcefile = source.toUpperCase() + " says : ";
                            }
                            console.log(this.options.count+". "+ sourcefile + "("+type.toUpperCase()+") " + msg);
                            this.options.count++;

                    }

            }catch(e){
                this.print("sysdebug","error",e);
            }
		
	};
	
	this.options = {
		
		count : 0,
		sourcefile : true,
	
		priorities : {
		
		    high : true,
		    medium : true,
		    low : true,
		    none : true,
		    hook : true
		
		},
	
		types :{
		    error : true,
		    warning : true,
		    event : true,
		    tracking : true,
		    todo : true,
		    learning : true,
		    note : true
		  }
	};
}