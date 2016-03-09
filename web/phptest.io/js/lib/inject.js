function(item,target){

    var loop = new __platform__.lib.loop;
    var check = __platform__.lib.check;

    if (check.isHTMLObject(target)) {
        if (check.isArray(item)) {
            loop.array(item, function(a,b) {
                if(check.isHTMLObject(b)) {
                    target.appendChild(b);
                }
            }); 
        } else if (check.isObject(item)) {
            loop.object.simple(obj,function(a,b){
                if(check.isHTMLObject(b)) {
                    target.appendChild(b);
                }
            });
        } else if (check.isHTMLObject(item)) {
            target.appendChild(item);
        }
    }
}
