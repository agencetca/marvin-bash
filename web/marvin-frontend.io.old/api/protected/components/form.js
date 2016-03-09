Form = {
	
	name : 'form',
	config : function(obj){
            
                this.structure = {

                        design : 'form',
                        element : document.createElement('form')

		};
	
		this.design = {
                    
			form : {
				position : 'relative',
				cssFloat : 'left',
				width : '100%',
                                maxWidth : '100%',
				height : 'auto',
				margin : 0,
				padding : 0
			}
                    
		};
                
                this.methods = {
                    
//                    onload : function(that) {
//                        //if($ && $(that).parsley){
//                            //$(that).parsley();
//                        //}
//                    },

                      empty : function(){
                          for (var i in this.childNodes){
                              if(this.childNodes.hasOwnProperty(i)){
                                if(this.childNodes[i].get('payload').empty){
                                   this.childNodes[i].get('payload').empty();
                                }
                              }
                          }
                      }
                    
                }

		return this;

	}

}
