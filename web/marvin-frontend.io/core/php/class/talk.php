<?php

class Talk 
{

    function __construct($data){
	
        //$this->$data = $data;
        //$this->translate();
	    //$this->process();
        //$this->talk();
    }

    function encode(){
        try {
            //$this->decode();
            //$encoded = json_decode($this->data);
            //$this->data = $encoded;	
        } catch(Error $e) {  };
    }

    function decode(){
        try {
            //$decoded = json_decode($this->data);
            //$this->data = $decoded;	
        } catch(Error $e) {  };
    }

    function process() {
	
	//do something
	
    }

    function talk(){
	if(get_config('default_answer') === true){
       	   try{
       	      //$this->say($this->data);
       	   }catch(Error $e){}
	}
    }

    function say($data){
        //echo $data;
    }


}
