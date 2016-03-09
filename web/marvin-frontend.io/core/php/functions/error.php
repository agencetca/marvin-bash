<?php

function error($code,$context = null){

    if(get_constant('errors::active')){
    	$args = \func_get_args();
        if($context === null){$args[2] = 'errors';}
        $label = ucfirst(\strtolower(get_constant('errors::label')));
        die($label.' : '.ucfirst(\strtolower(call_user_func_array('config',$args))).'<br>');
    }else{
        die();
    }

}

function exception_error_handler($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) {
        // Ce code d'erreur n'est pas inclu dans error_reporting
        return;
    }
    throw new \ErrorException($message, 0, $severity, $file, $line);
}

\set_error_handler("exception_error_handler");