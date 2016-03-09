function(obj){

            var loop = new __platform__.lib.loop;
            var check = __platform__.lib.check;
            var make =  __platform__.lib.make;

            if ( check.isObject(obj.structure) ) {
                loop.object.recursive (obj.structure,function(a,b) { 
                    if ( check.isObject(b) && check.doesExist(b.element) ) {
                        if( check.isHTMLObject(b.element = make(b.element)) ) {
                            if ( b.id ) b.element.id = b.id;
                            if ( b.cls ) b.element.className = b.cls;
                        }
                    }
                });
            }

}
