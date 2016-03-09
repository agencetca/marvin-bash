
function(thing) {
	
var check = __platform__.lib.check;
var unix = __platform__.lib.unix;

if ( check.isHTMLObject(thing) ) { 

    console.log("make already obj!")
    return thing;

} else if ( check.isString(thing) ) { 
        console.log("make string");
        var repo = __platform__.env.components
        var compile = __platform__.lib.compile;
        if(check.doesExist(repo[thing])) {
            thing = compile(repo[thing])[0];
        }else{
            thing =  document.createElement(thing.replace(/^system::/,''));
        }
} else if ( check.isFunction(thing) ) {
        console.log("make func!")
        thing = thing();
        if ( check.isNotHTML(thing) ) { 
            thing = null;
        }

} else if ( check.isNotHTML(thing) && check.isObject(thing.structure) ) {

    thing = thing.structure;
    console.log("make obj!")
	var make = __platform__.lib.make;
    base  = [];

     var loop = function(o,callback,recursive) {
         if(!o) return;
         for(var i in o) {
             if(o.hasOwnProperty(i)) {
                 if(callback) {
                     callback(i,o[i],o);
                 };
                 if(typeof o[i] === 'object') {
                     if(recursive === true){
                         loop(o[i],callback,true);
                     };
                 };
             };
         };
     };

    loop(thing,function(k,v,b) {
                
                if(typeof v === 'object' && v.element) {
                    
                   //v.name = base.element.path+'/'+k;
                   v.element = make(v.element);
                   //v.element.path = v.name;
                   //record(v.element);
                   
                   var parse = function(v,ref){
                     loop(v,function(x,y){
                         if(typeof y === 'object' && y.element) {
                             
                             //y.name = v.name+'/'+x;
                             y.element = make(y.element);
                             //y.element = document.createElement('div');
                             //y.element.path = y.name;
                             //record(y.element);
                             
                             //configure(y);
                             
                             v.element.appendChild(y.element);
                             //if(ref) ref.appendChild(y.element);
                             parse(y);
                             
                         };
                     });
                    };
                    
                    //configure(v);
                    //base.appendChild(v.element);
                    base.push(v.element);
                    parse(v);
                };
                
            });

    thing = base;

}

    return thing

}
