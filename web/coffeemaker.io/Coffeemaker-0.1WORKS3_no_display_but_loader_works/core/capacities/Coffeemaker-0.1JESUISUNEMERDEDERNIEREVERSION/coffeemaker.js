'use strict';
var Coffeemaker = {

    config : {
    
    	root : "Coffeemaker-0.1",
        capacities : "core/capacities/",
        packages : "core/packages",
        process : "core/process",
        methods : "methods",
        components : "components",
        documentation : "documentation",
        templates : "templates",
        template: "example1",
        DOMwrapper : "data"
    
    },

    core : {

        import : function (path,opt) {

            if ( path.charAt(path.length-1) === "/" ) path = path.substr(0, path.length - 1);
            var base = path + "/";

            if ( ! Object.prototype.toString.call(opt) === '[object Array]' ) { 
                opt = [ opt ];
            }

            //if ( opt[0].charAt(opt[0][0]) === "/" ) opt[0] = opt[0].substr(0, opt[0]);
	        var loop = function (arr,callback) {
		        var v = arr.length;
		        for (var i = 0; i < v; i++) {
			        callback(i,arr[i]);
		        }
		    }

            loop( opt, function(a,b) {

                //path = base+"/"+b;
                path = base+b;

                var o = Coffeemaker;
                var p = path.split("/")
                //var r = p.shift();
                var c = p.pop().split(".");


                var engine = function(obj, path){
                    for (var i=0, path=path.split('/'), len=path.length; i<len; i++){
                        if ( ! obj[path[i]]) obj[path[i]] = {}
                        obj = obj[path[i]];
                    };
                    return obj;
                };

                engine(Coffeemaker,path);
                
                //for ( var n=0;n<opt.length;n++ ) {
                //    if ( ! o[p[n]] ) o[p[n]] = {};
                //    o = o[p[n]];
                //}

                if (c[c.length -1] === 'js' | c[c.length -1] === 'json') ext = c.pop(); 
                var component = c.join(".");
                if (ext !== '') { var ext = '.js' };

                path = p.join("/");
                if( ! this[component] ) {
                    var s  = document.createElement("script");
                    //s.src  = r+"/"+path+"/"+component+".js";
                    s.src  = Coffeemaker.config.root+"/"+path+"/"+component+ext;
                    document.head.appendChild(s);
                    document.head.removeChild(s);
                }

            }.bind(this));
        }
    },

}

Coffeemaker.core.import(Coffeemaker.config.methods,["message","css"]);
Coffeemaker.core.import(Coffeemaker.config.capacities,["number","unix","toolchain/configure"]);
Coffeemaker.core.import(Coffeemaker.config.capacities,["toolchain/make","toolchain/inject"]);
Coffeemaker.core.import(Coffeemaker.config.capacities,["alert","transmission/ajax/get","DOM/structure/appendElementTo","DOM/element/create","DOM/element/select","DOM/event/addListener","DOM/event/delListener"]);
Coffeemaker.core.import(Coffeemaker.config.capacities,["exec","check","loop","log","network/handler","analyze"]);
Coffeemaker.core.import(Coffeemaker.config.capacities,["UI/loading","download","compile","debug","stack","load"]);



window.onload = function() {

    var process = Coffeemaker.core.capacities.exec;
    var load = Coffeemaker.core.capacities.load;
    var analyze = load('analyze');
    var compile = load('compile');

    new process({
        name : 'preloading',
        payload : function() {


            //load the loadingbar
            //var analyze = load('analyze');
            //alert(analyze.getValue(Coffeemaker,'logs'));
            
            compile('components/example');

        },
        callback : {
        name : 'init',
        payload : function() {
//            return;
//            var load = Coffeemaker.core.capacities.load;
//            var analyze = load('analyze');
//            
//	        var load = Coffeemaker.core.capacities.load;
//            var DOM = load('DOM');
//            var inject = load('toolchain/inject');
//            var body = DOM.element.select('tag','body');
//            
            //var compile = load('compile');
            //var components = load('components');
            //alert(JSON.stringify(components));
            //compile(Coffeemaker.components.loader.loader,body,'overwrite');
            
            //inject(loadingBar.wheel(),body,'overwrite');

        },
        timeout : 3000,
        callback : {

            name : 'template loading',
            payload : function(folder,name) {

//            return;
//                var load = Coffeemaker.core.capacities.load;
//	            load(folder,name);

            },
            timeout : 3000,
            args : ['templates','example1'],
            callback : {

                name : 'load components',

                payload : function(e,f) {

//            return;
//		                var load = Coffeemaker.core.capacities.load;
//		                var check = Coffeemaker.core.capacities.check;
//		                var template = Coffeemaker.templates[Coffeemaker.config.template];
//		                var loop = load('loop');
//
//		                loop.object.recursive (template.structure,function(a,b) { 
//			            if (a === 'element') load('components',b);
//		                });

                },
                timeout : 1000,
                args : ['test-argument2'],
                callback : {
                
                    name : 'load suppl components and methods',
                    payload : function () {
//            return;
//		                var load = Coffeemaker.core.capacities.load;
//		                var loop = load('loop');
//		                var components = Coffeemaker.components;
//		                loop.object.recursive (components,function(a,b) { 
//			            if (a === 'element') load('components',b);
//		                });
                    },
                    timeout : 1000,
                    callback : {

                        name : 'compile UI',
                        payload : function () {
//            return;
//		                        var load = Coffeemaker.core.capacities.load;
//		                        var compile = load('compile');
//		                        var template = Coffeemaker.templates["example1"];
//                                var UI = compile(template);
//                                return UI;
//
                        },
                        timeout : 5000,
                        callback : {

                            name : 'launch UI',
                            payload : function (UI) {
//            return;
//                                var load = Coffeemaker.core.capacities.load;
//		                        var DOM = load('DOM');
//                                var inject = load('toolchain/inject');
//                                var body = DOM.element.select('tag','body');
//                                var id = setInterval(function(){
//                                    if (Coffeemaker.logs.tasks.ETA === 100) {
//                                        //setTimeout(function(){
//                                            inject(UI,body,'overwrite')
//                                        //},10000);
//                                        clearInterval(id);
//                                    }
//                                }, 1500);
                            },
                            timeout : 1000,
                        }
                    }
                }
            }
        }

        }
        
    });
        
}








	

//var loadTemplate = new Promise( function (resolve, reject) {
//	var load = Coffeemaker.core.capacities.load;
//	load('templates',Coffeemaker.config.template);
//	alert('khkjhkjhjhkjhjh');
//});

//var loadComponents = function(data){



//	setTimeout(function(){ 
//		var load = Coffeemaker.core.capacities.load;
//		var check = Coffeemaker.core.capacities.check;
//		var template = Coffeemaker.templates[Coffeemaker.config.template];
//		var loop = load('core/capacities/loop');
//		loop.object.recursive (template.structure,function(a,b) { 
//			if (a === 'element') load('components',b);
//		});
//		loop.object.recursive (template.logic,function(a,b) { 
//			if ( check.isString(a) && check.isArray(b) ) load('methods',a);
//		});

//	 }, 2000);
//}

//var init = new Promise( function (resolve, reject) {

//	loadTemplate.then( loadComponents() )

//});
//	
//var start = function() {
//	setTimeout(function(){
//		var load = Coffeemaker.core.capacities.load;
//		var compile = load('core/capacities/compile');
//		var template = Coffeemaker.templates[Coffeemaker.config.template];
//		compile(template,document.body);
//	}, 2000);
//};

//init.then(start());

