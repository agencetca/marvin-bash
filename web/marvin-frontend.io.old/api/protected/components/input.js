Input = {
	
	name : 'input',
	config : function(obj){

		this.structure = {
                            design : 'style',
                            element : function(){
                                if(obj.type === 'textarea'){
                                    return document.createElement('textarea');
                                }else{
                                    return document.createElement('input');
                                }
                                
                            },
                            configure : {
                                type : obj.type  || 'text',
                                placeholder : obj.placeholder || '',
                                
                            }
		};
	
		this.design = {
			style : {
				position : 'relative',
				cssFloat : 'left',
                                width: '100%',
                                maxWidth: '100%',
				height : 'auto',
				padding : '5px',
				borderRadius : '5px',
                                borderColor : '#333',
                                background : 'white',
                                margin : '1px'
			}
		};
		this.methods = {
                    onload : function(that){
                        that.set('payload',that);
                    },
                    
                    //onkeyup can NOT be trusted
                    //no longer used in classical form
                    //but used on login : if deactivate login is impossible #TASK
                    onkeyup : function(){
                        
                        this.set('value',this.value);
                        
                        //this.set('counter',this.get('counter')+1);
                    },
//                    change : function(){
//                        
//                        this.set('value',this.value);
//                        
//                        //this.set('counter',this.get('counter')+1);
//                    },
//                    blur : function(){
//                        
//                        this.set('value',this.value);
//                        
//                        //this.set('counter',this.get('counter')+1);
//                    },
                    save : function(){
                        var payload = this.get('payload');
                        payload.set('value',this.value);
                    },
                    empty : function(){
                        
                        var payload = this.get('payload');
                        payload.value = '';
                        this.save();
                        
                    }
		};

		return this;

	}

};
