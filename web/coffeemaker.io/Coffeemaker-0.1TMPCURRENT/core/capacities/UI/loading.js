Coffeemaker.core.capacities.UI.loading = {

	wheel : function() {
	
         var load = Coffeemaker.core.capacities.load;
         var compile = load('compile');

        var image = {
            "structure" : {
                "element" : "div",
                "design" : "style"
            },
            "design" : {
			    "style" : {
				    "width" : "200px",
				    "height" : "200px",
				    "margin-left": "auto",
				    "margin-right": "auto",
				    "padding-top": "5%",
				    "padding-bottom": "5%",
                    "background" : "transparent url('Coffeemaker-0.1/images/loading2.gif') no-repeat center"
			    }
            }
        }

        return compile(image);

	},
	
	greenBar : function (object,ref) {
	
		var load = Coffeemaker.core.capacities.load;
		var DOM = load('DOM');
		var inject = load('toolchain/inject');
		var logs = load('log');
		var compile = load('compile');

		var loadingBar = {

            structure : {
                element : 'div',
                id : 'loadingbar',
                design : 'style',
                        events : {
                            onload : { 
                                test : ['d']
                            }
                        },
                payload : {
                    element : 'div',
                    id : 'payload',
                    design : 'payload',
                        events : {
                            onload : { 
                                test : ['c','e']
                            }
                        },
                },
                message : {
                    element : 'div',
                    id : 'loadingmsg',
                    design : 'test',
                        events : {
                            onload : { 
                                test : ['b']
                            }
                        },
                }
            },
            design : {
		        style : { 
		            width : '400px',
		            height : '40px',
		            "margin-left": 'auto',
		            "margin-right": 'auto',
                    "border-radius" : "10px",
		            background : 'lightgreen'
		        },
                payload : {
                    width : '0',
                    height : '100%',
                    "border-radius" : "10px",
                    background : 'green'
                },
                test : {
                    width : 'auto',
                    height : 'auto',
                    textAlign : 'left',
                    "background-color" : 'transparent',
                    fontSize : '12px',
                    fontFamily : 'arial',
                }

            },
            logic : {

                test : {

                    a : {"message/inline" : [ "i am" ]},
                    z : {"message/pop" : [ "i am" ]},
                    r : {"css/affect" : [ "background", "yellow" ]},
                    b : { "message/log" : [ "Coffeemaker.logs.tasks.current", "Coffeemaker.logs.tasks.current" , 0, 100, 10 ] },
                    c : { "css/follow" : [ "width", "Coffeemaker.logs.tasks.ETA", "%" , 0, 100, 20, "payload" ] },
                    d : { "css/followString" : [ "background-color", "pink", "Coffeemaker.logs.tasks.possibleError", 20 ] },
                    e : { "css/followString" : [ "background-color", "red", "Coffeemaker.logs.tasks.possibleError", 20 ] },
                    //d : { "css/followError" : [ "background", "red", "", "Coffeemaker.logs.tasks.possibleError", "payload", 10 ] },

                },

                tt : {

                    d : { "css/followString" : [ "background-color", "red", "Coffeemaker.logs.tasks.possibleError", 20 ] },

                }
            }
		 }  

         return compile(loadingBar);
	
	}



}
