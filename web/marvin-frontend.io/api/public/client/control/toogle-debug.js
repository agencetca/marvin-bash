
function () {

    if (innov24.sys.debug == false) {
        __platform__.lib.debug('on')
        __platform__.lib.events.tell('debug-start');
    } else {
        __platform__.lib.debug('off')
        __platform__.lib.events.tell('debug-stop');
    }
    

}
