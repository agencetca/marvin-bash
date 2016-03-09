<?php

/**
* 
*/
class Client extends Object
{

	function init()
	{
		
		$this->terms = new stdClass();
		$this->terms->api_public_folder = 'api/public/client';

	}

	function build()
	{
		
		//Get api as object
		$thing = JSdirToObject($this->terms->api_public_folder);
		
		//Add env
		$env = new Env();
		$thing->env = $env->export();
		
		//Add controllers
		$control = new Control('innov24');
		$thing = (object) array_merge((array) $thing, (array) $control->export());
		
		return json_encode($thing);
	}
}


