<?php

function ensure_array($thing){

	if(!is_array($thing)){
		return array($thing);
	}else{
		return $thing;
	}

}

function ensure_array_content($thing,$index){

	if(!isset($thing[$index])){
		return null;
	}else{
		return $thing[$index];
	}

}