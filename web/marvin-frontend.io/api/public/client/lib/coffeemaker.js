function(){

    var load =  __platform__.lib.load;
    var number = load('number');
    var stack = load('stack','a');
    var display = load('display');

    this.id = function (element) {
         //generate random id
         var rand = number.random();
         //verify doesnt exist
         while (stack.get(rand)) {
             rand = number.random();
         }
         //record the new id
         stack.set(rand);
         //apply configuration
         element.id = rand;

    }

    this.buildLogic = function (eve,element,func,args) {

        element.addEventListener(eve, function(nt){
            __platform__.env.methods[func](args,nt);
        }, false);	

        this.exportCode(eve,element.id,func,args);
    }

    this.exportCode = function (eve,id,func,args) {
        
        var src='var element=document.getElementById('+id+');element.addEventListener('+eve+', function(nt){'+__platform__+'.env.methods['+func+'](nt,['+args+']);},false);';
            
        var src = '';
        var s = document.createElement( 'script' );
        s.innerHTML = src;
        var head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(s);
        
        display.bubble();
        //alert( document.documentElement.outerHTML );
    }

}
