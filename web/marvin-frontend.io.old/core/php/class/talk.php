<?php

class talk 
{

    function __construct($data = ''){
	
        $this->data = $data;
        $this->encode();
	$this->process();
        $this->say();
    }

    function encode(){
        try {

            if($this->decode() === false) {
                $encoded = json_encode($this->data);
                $this->data = $encoded;	
	        return true;
	    }
        } catch(Error $e) {return false; };
    }

    function decode(){
        if($decoded = json_decode($this->data)) {
            $this->data = $decoded;	
	    return true;
  	    }else
		{return false; };
    }

    function process() {
	
	//do something
	
    }

    function say(){
	//if(get_config('default_answer') === true){
       	   try{
		echo $this->data;
       	   }catch(Error $e){}
	//}
    }

}
