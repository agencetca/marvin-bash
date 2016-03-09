function(item,target){

    var load = __platform__.lib.load;
    loop = load('loop');
    check = load('check');
    var html;

    if (check.isHTMLObject(target)) {
        if (check.isArray(item)) {
            loop.array(item, function(a,b) {
                if(check.isHTMLObject(b)) {
                    html = b;
                    target.appendChild(html);
                }
            }); 
        } else if (check.isObject(item)) {
            loop.object.simple(obj,function(a,b){
                if(check.isHTMLObject(b)) {
                    html = b;
                    target.appendChild(html);
                }
            });
        } else if (check.isHTMLObject(item)) {
            html = item;
            target.appendChild(html);
        }
    }

    return html;

}
