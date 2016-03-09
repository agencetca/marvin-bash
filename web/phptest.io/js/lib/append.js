new function(){

    this.HTMLchildToParent = function (element,par) {
        var check = __platform__.lib.check;
        if ( check.isHTMLObject(element) && check.isHTMLObject(par) ) {
            par.appendChild(element);
        }
    }

    this.HTMLtoArray = function (element,arr) {
        var check = __platform__.lib.check;
        if ( check.isHTMLObject(element) && check.isArray(arr) ) {
            arr.push(element);
        }
    }

}
