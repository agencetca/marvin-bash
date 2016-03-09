Submit = {
	
	name : 'submit',
	config : function(obj){
            
                this.structure = {
                        design : 'style',
                        element : 'input',
                        configure : {
                            type : 'submit',
                            label : obj.label,
                            value : obj.value || 'Submit'
                        }
		};
	
		this.design = {
			style : {
				position : 'relative',
				cssFloat : 'left',
				width : 'auto',
                                minWidth: '30px',
				height : 'auto',
				background : '#F5F5F5',
				padding : '2%',
				borderRadius : '5px',
				cursor : 'pointer'
			}
		};
                
                this.methods = {
                    
                    state : 'on',
                    min_opacity : '0.2',
                    max_opacity : '1',
                    
                    _activate : function(){
                        if(this.get('state') === 'on'){
                            var opa = this.get('max_opacity');
                            this.style.opacity = opa;
                        }
                    },
                    
                    _deactivate : function(){
                        if(this.get('state') === 'off'){
                            var opa = this.get('min_opacity');
                            this.style.opacity = opa;
                        }
                    },
                    
                    onclick : function(e){
                            e.preventDefault();
                            if(this.get('state') === 'off'){
                                e.stopPropagation();
                            };
                            
                            this.load_data();
                            
                    },
                    
                    _switch : function(){
                        if(this.get('state') === 'off'){
                                this._deactivate();
                            }else{
                                this._activate();
                            }
                    },
                    
                    _onload : function(that){
                            
                            function find_form(node){
                                if(node.parentNode.tagName === 'FORM'){
                                    return node.parentNode;
                                }else{
                                    find_form(node.parentNode);
                                }
                            }
                            
                            that.set('form',find_form(that));
                            
                            that._switch();
                    },
                    
                    transmit : function(action,data,callback){
                        
                        //IDEA : OPTION ASK A PASSWORD TO SUR-ENCRYPT DATA, INNOV WONT KNOW THIS PASS
//                        if(data.password){
//                            data.password = ''+CryptoJS.AES.encrypt("innov24", data.password)+'';
//                        }
                        
                        __lib__.singleton.Transmission.post(action,data,callback);
                        
                    },
                    empty : function(){/*do nothing*/},
                    clean : function(){
                        if(this.get('data')){
                            this.set('data',null);
                        }
                    },
                    load_data : function(){
                        var form = this.get('form').childNodes;
                        var saved = {};
                        
                        for(var i in form){
                            if(form.hasOwnProperty(i) && form[i] !== this){
                                var element = form[i].get('payload');
                                
//                                //FIX https://lostechies.com/derickbailey/2012/01/27/dont-rely-solely-on-jquerys-keyup-event/
//                                if(element.get('value') !== element.value){
//                                    element.set('value',element.value);
//                                }//ENDFIX
//                                
//                                saved[i] = element.get('value');
                                
                                saved[i] = element.value;
                                
                            }
                        }
                        
                        this.set('data',saved);
                        this.get('form').empty();
                    }
                    
		};
                
                this.events = {
                   
                    
		};

		return this;

	}

}
