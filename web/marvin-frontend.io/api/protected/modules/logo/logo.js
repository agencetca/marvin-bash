Logo = {
	
	name : 'logo',
	config : function(obj) {

		this.structure = {
                            id : true,
                            design : 'default',
                            element : 'container'
                         
		};
	
		this.design = {
			default : {
                                background : '#EBEBEB',
                                cursor : 'pointer',
                                backgroundSize: '100% 100%'
			}
		};
                
                this.methods = {
                    
                    onclick :function() {
                        this.push();
                    },
                    
                    
                    onload : function(that){
                        
                        that.transmit.post('logo::init',{
                            width : obj.width || that.parent.offsetWidth,
                            height : obj.height || $(that).parent().height() | 120,
                            auto : obj.auto || true,
                        },function(e){
                            
                            that.style.background = e;
                        });
                    
                        that.listen(that.path+'::push',function(e){
                            alert('pushed');
                        });
                        
                    },
                    
                    push : function(){
                        this.fire('push');
                        //location.reload();
                    }
                    
                };

		return this;
	}
}

