function(o,opt){


            var configure =  __platform__.lib.configure;
            var make =  __platform__.lib.make;
            var check =  __platform__.lib.check;
            var loop =  new __platform__.lib.loop;


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
            configure(o);


            //make
            var thing = make(o)

            //inject
            if (opt) {
                var inject = __platform__.lib.inject;
                inject(thing,opt)
            }

            return thing;

}
