
function(o) {

    //var h = __platform__.lib.compile(o);
    var html = new __platform__.lib.html();
    var h = html.compile(o);
    //__platform__.lib.reference(h);
    return h;

}
