function (arguments,event) {

    var target = document.getElementById(arguments[0]);
    var property = arguments[1];
    var value = arguments[2];

    target.style.setProperty(property,value);

}
