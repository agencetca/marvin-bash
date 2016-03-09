Marvin = {
    "tree" : [
        {
            'name': 'header',
            'tree': [
                {'name': 'name2'},
                {'name': 'name3'},
                {
                    'name': 'name4',
                    'tree': [
                        {'name': 'name5'},
                        {'name': 'name6'}
                    ]
                },
                {'name': 'name7'}
            ]
        },
        {
            'name': 'name8',
            'tree': [
                {'name': 'name9'}
            ]
        }
    ]
}


window.onload = function() {
// Build the tree :
var buildTree = function(tree, container) {
    _.each(tree, function(item) {
        var newContainer = document.createElement('div');
        var button = document.createElement('button');
        button.id = item.name;
        button.innerHTML = item.name;
        newContainer.appendChild(button);

        container.appendChild(newContainer);
         if(item.tree) buildTree(item.tree, newContainer);
    });
}
buildTree(Marvin.tree, document.body);


}
