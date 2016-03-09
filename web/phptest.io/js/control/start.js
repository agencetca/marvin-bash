
function (t) {


    var docHeadObj = document.getElementsByTagName("head")[0];
    var dynamicScript = document.createElement("script");
    dynamicScript.type = "text/javascript";
    dynamicScript.src = scriptName;
    docHeadObj.appendChild(newScript);

    var h = __platform__.control.build(t);
    __platform__.control.load(h,document.body)
    //__platform__.lib.events.tell('start');
    

}
