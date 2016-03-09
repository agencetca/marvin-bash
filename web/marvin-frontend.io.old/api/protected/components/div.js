Div = {
	
	name : 'div',
	config : function(obj){
            
                this.structure = {
                        
                        design : 'div',
                        element : document.createElement('div')

		};
	
		this.design = {
                    
			div : {
				position : 'relative',
				cssFloat : 'left',
				width : 'auto',
				height : 'auto',
				margin : 0,
				padding : 0
			}
                    
		};
                
                this.methods = {
                    
                    _hide : function(){
                        if(this.style.display === 'block') $(this).fadeOut(300);
                        this.set('visible','no');
                    },
                    
                    _show : function(){
                        if(this.style.display === 'none') $(this).fadeIn(100);
                        this.set('visible','yes');
                    },
                    
                    _empty : function(){
                        this.innerHTML = '';
                    },
                    
                    _help  : function(){

                        if(this.get('helpContent')){
                            noty({
                                theme: 'defaultTheme', // or 'relax'
                                type: 'alert',
                                layout : 'bottomLeft',
                                dismissQueue: false,
                                killer: true,
                                timeout: false,
                                text : this.get('helpContent'),
                                template: '<div class="noty_message" style="height:300px"><span class="noty_text"></span><div class="noty_close"></div></div>',
                            });
                        }
                    },
                    
                    helper : function(){},
                    
                    onclick : function(){
                        Expression = new RegExp("body/","")
                        if(this.path.match(Expression)){
                                this.helper();    
                        }
                    },
                    
                    onload : function(that){
                        
                        that.listen('body/sideline_right/*::nohelp',function(e){
                            
                            that.helper = function(){
                                 //nothing
                            };
                            

                            
                        });
                        
                        that.listen('body/sideline_right/*::help',function(e){

                            that.helper = function(){
                                that._help();
                            };
                            
                        });
                        
                    }
                    
                    
                }

		return this;

	}

}
