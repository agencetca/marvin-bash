<?php

namespace platform\modules;

class logo extends module {
    
    function init(){
        
        $logo = new \platform\image();
        $resize = false;
        
        if(isset($this->data[1])){
            $resize = new \stdClass();
            $resize->width = $this->data[0];
            $resize->height = $this->data[1];
            $resize->auto = $this->data[2];
            $resize->blur = 0;
        }
        
        $this->send->back($logo->load('core/modules/logo/logo.png',$resize));
        
    }
    
}

