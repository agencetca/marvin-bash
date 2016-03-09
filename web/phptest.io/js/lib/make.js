
function(thing) {
	
	var check = __platform__.lib.check;

    if ( check.isString(thing) ) { 
        return document.createElement('div');

        var repo = __platform__.env.components
	    if(check.doesExist(repo[thing])) {
	        compile(repo[thing]);
        }
    } else if ( check.isFunction(thing) ) {
        thing = thing();
    //} else if ( check.isObject(thing) && ! check.isHTMLObject(thing) ) {
    //} else if ( check.isObject(thing) ) {

} else {


alert();
t = make('div');
// Build the tree :
//var buildTree = function(tree, container) {
//_.each(tree, function(item) {
// var newContainer = document.createElement('div');
//
//        var nameText = document.createTextNode(item.name);
//        newContainer.appendChild(nameText);
//
//        container.appendChild(newContainer);
//         if(item.tree) buildTree(item.tree, newContainer);
//    });
//}

buildTree(thing, t);
document.body.appendChild(t);


    }

    return thing

}
