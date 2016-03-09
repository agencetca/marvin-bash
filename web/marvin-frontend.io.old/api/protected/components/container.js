Container = {
	
	name : 'container',
	config : function() {

		 this.structure = {
			
                        design : 'container',
			element : 'div'
		
		};
	
		this.design = {
			container : {
				minWidth : '100px',
				minHeight : '15px',
                                background : 'transparent'
			}
		};
                
                this.methods = {
                    
                    onload : function(that){
                        
                        that.set('width',$(that).width()+'px');
                        that.set('marginLeft',parseInt($(that).css('marginLeft'))+'px');
                    }
                    
                };

		return this;

	}

}
