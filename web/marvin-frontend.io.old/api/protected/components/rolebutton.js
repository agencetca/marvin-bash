Rolebutton = {
	
	name : 'rolebutton',
	config : function(obj){

		this.structure = {
                    
                            design : 'style',
                            element : 'linechoice'

		};
	
		this.design = {
			style : {
				borderRadius : '10px',
			}
		};
                
                this.methods = {
                    
//                    _fetchdata : function(){
//                        
//                    },
//                    unwrap : function() {//TOO SPECIF
//                            
//                            var target = this.get('target');
//                            
//                            if(target){
//                                var wrapper = document.getElementById(this.id+'w');
//
//                                if(wrapper){
//                                    target.removeChild(wrapper);
//                                }
//
//                                this.set('wrapped',false);
//                                target.set('wrapped',false);
//                            }
//                            
//                    }
                
                };
                
                this.events = {
                    
                };

		return this;

	}

}
