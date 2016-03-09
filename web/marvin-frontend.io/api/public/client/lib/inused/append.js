function(){

    var load =  __platform__.lib.load;
    var check = load('check');

    this.HTMLchildToParent = function (element,par) {
        if ( check.isHTMLObject(element) && check.isHTMLObject(par) ) {
            par.appendChild(element);
        }
    }

    this.HTMLtoArray = function (element,arr) {
        if ( check.isHTMLObject(element) && check.isArray(arr) ) {
            arr.push(element);
        }
    }

}
