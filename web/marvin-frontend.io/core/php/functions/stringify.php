<?php

function stringify($thing){

	if(is_string($thing)){
		return $thing;
	}else{
		return json_encode($thing);
	}
    
}