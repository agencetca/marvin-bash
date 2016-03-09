Role = {
	
	name : 'role',
        
	config : function(obj){
            
            
                this.structure = {
                    design : 'role',
                    element : 'div',
                    
                    
                    journalist : {
                        id : true,
                        design : 'journalist',
                        element : 'rolebutton',
                        methods : 'buttons',
                    },
                    communicator : {
                        id : true,
                        design : 'communicator',
                        element : 'rolebutton',
                        methods : 'buttons'
                    },
                    leader : {
                        id : true,
                        design : 'leader',
                        element :'rolebutton',
                        methods : 'buttons'
                    }
		};
	
		this.design = {

                    role : {
                        width : '100%',
                        height : '100px'
                    },
                    journalist : {
                        background : 'green',
                        color : 'white',
                        fontWeight : 'bold'
                    },
                    communicator : {
                        background : 'orange',
                        color : 'white',
                        fontWeight : 'bold'
                    },
                    leader : {
                        background : 'blue',
                        color : 'white',
                        fontWeight : 'bold',
                        
                    }

		};
                
                this.methods = {
                    
                    buttons : {
                        
                        _giveName : function(){
                            var name = this.path;
                            this.set('name',name.replace(/.*\/(.*)$/,'$1'));
                        },
                        _onload : function(that){

                                that._giveName();
                                
                        }
                        
                        
                    },
                    
                    onload : function(that) {
                        
                        
                       that.listen('+*::push',function(e){
                           
                           var element = e.detail.element;
                           alert();
                            if(element.get('state') === 'on'){
                                var name = element.get('name');
                                that.set('value',name);
                            }
                           
                           
                       });

                    }
		};

		return this;

	}

}
