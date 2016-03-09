<?php

function debug($thing,$option = 0){

	if(debug_active()){
		if(is_string($thing)){
			if($option === 1){
				Kint::dump( $thing );
			}else{
				var_dump($thing);
			}
		}else{
			if($option === 1){
				Kint::dump( $thing->export() );
			}else{
				Kint::dump( $thing );
			}
			
		}
		//Kint::trace();
		
		return 1;
	}
	return 0;
}

function debug_active(){

	$terms = new stdClass();
	$terms->debug = 'debug';
	$terms->active = 'active';

    $debug_state = get_constant('\\config\\'.$terms->debug.'::'.$terms->active);
    
    if($debug_state === true){
	
	return true;
    
    }else{
	
	return false;
    
    }
    
}