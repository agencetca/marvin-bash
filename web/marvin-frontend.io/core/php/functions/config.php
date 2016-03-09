<?php

function config(){
    
    $args = func_get_args();
    $context = '\\config\\'.array_shift($args);
    $code = array_shift($args);

    if(is_numeric($code)){
        $code = '_'.$code;
    }
    
    if(is_defined($context.'::'.$code)){
        $message = get_constant($context.'::'.$code);
    }else if(method_exists($context, $code)){
        $message = call_user_func_array(array($context, $code),$args);
    }else{
    
	    if(debug_active()){
		$message = 'Unexpected Error : '.$code;
	    }else{
		$message = null;
	    }
        
    }
    return $message;
    
}