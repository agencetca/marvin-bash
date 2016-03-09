
if(!window["__platform__"]) {
	
	window["__platform__"] = {};
	
	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "__build_call_method__", "__main_controller__?__communication_keyword__=__build_env__", true );
	xmlHttp.send( null );

	xmlHttp.onreadystatechange=function(){
		if (xmlHttp.readyState==4 && xmlHttp.status==200) {
		
			var loop = function(object){
		
				for(var i in object){
			
					if(object.hasOwnProperty(i)){
				
						if(typeof object[i] === "object"){
							loop(object[i]);
						}else{
					
							try{
								object[i] = (function(){return eval(object[i])}.bind(object[i])());
								
							}catch(e){
								try{
									object[i] = (function(){return eval("("+object[i]+")")}.bind(object[i])());
								}catch(err){
									console.log("Error during initialization : "+err);
								}
							}
						
						
						
						}
					}
				}
			
				return object;
			}
		
		
			try{
				window["__platform__"] = loop(JSON.parse(xmlHttp.responseText));
			}catch(e){
			
				//NOFAIL
				if(!window["__platform__"].debug){window["__platform__"].debug = {}};
				if(!window["__platform__"].debug.message){window["__platform__"].debug.message = []};
				window["__platform__"].debug.message.push(xmlHttp.responseText);
			
				window["__platform__"].debug.parse = function(string){
					//detect html in string
					var scripttext = string;
					var re_script = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
					var re_style = /<style\b[^>]*>([\s\S]*?)<\/style>/gm;
					var re_link = /<link(\b[^>]*)>/gm;
			
					//send script and links to head
				
					var match;
					while (match = re_script.exec(scripttext)) {
					  // full match is in match[0], whereas captured groups are in ...[1], ...[2], etc.
					  window["__platform__"].debug.scripts = match;
					  var s = document.createElement("script");
					  s.innerHTML = match[1];
					  document.head.appendChild(s);
				  
					}
					scripttext = scripttext.replace(re_script,"");
			
					while (match = re_style.exec(scripttext)) {
					  window["__platform__"].debug.styles = match;
					  var l = document.createElement("style");
					  l.innerHTML = match[1];
					  document.head.appendChild(l);
					}
					scripttext = scripttext.replace(re_style,"");
				
					while (match = re_link.exec(scripttext)) {
					  window["__platform__"].debug.links = match;
					  var l = document.createElement("link");
					  l.setAttribute("href",match[1]);
					  document.head.appendChild(l);
					}
					scripttext = scripttext.replace(re_link,"");
			
					//send noHTML in console
					//todo
				
					//transfert the rest into debug container
					var a = document.createElement("div");
					a.className += "debug ";
					a.innerHTML = scripttext;
					document.body.insertBefore(a,document.body[0]);
				
					window.stop();

				}
			
				window["__platform__"].debug.parse(xmlHttp.responseText);
			}
		
			try{
				document.head.removeChild(document.getElementById("__initscript_name__"));
                    window["__platform__"].control.init = function (){ return 1 }
                    window["__platform__"].control.start(__platform__.env.template);
                    delete window["__platform__"].control.init;
			
			}catch(e){}

		}
	}

}
