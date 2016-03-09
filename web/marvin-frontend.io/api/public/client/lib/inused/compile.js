function(o,opt){

            var load = __platform__.lib.load;
            var check = load('check');
            var loop = load('loop');
            var html = load('html');


            //TODO : Hacked but MUST be optimized
            f = function (i) {
                this.structure = (function() { 
                    FLAG=0;
                    loop.object.simple(i,function(x,y){
                        if(! check.isObject(y)){
                            FLAG=1;
                        }
                    });
                    if (FLAG === 0) { return { a : JSON.parse(JSON.stringify(o.structure)) } }
                    else{ return JSON.parse(JSON.stringify(o.structure))}
                }());

                this.design = JSON.parse(JSON.stringify(o.design || {}))
                this.logic = JSON.parse(JSON.stringify(o.logic || {}))
                return this;
            } 


            o = new f(o)
            //configure
            html.configure(o);

            //make
            var thing = html.make(o)

            //inject
            if (opt) {
                html.inject(thing,opt)
            }

            return thing;

}
