<?php

/**
* 
*/
class Init extends Object
{

	public $name;
	
	function init()
	{
	
		$this->terms = new stdClass();
		$this->terms->name = 'name';
		$this->terms->platform = 'platform';
		$this->terms->user = 'user';
		$this->terms->communication_keyword = 'action';
		$this->terms->build = 'build_env';
		$this->terms->main_controller = 'index.php';
		$this->terms->build_call_method = 'POST';
		$this->terms->initscript_name = 'init';
		$this->terms->initscript_location = 'api/public/client/control/init.js';
	
		$this->{$this->terms->name} = config($this->terms->platform,$this->terms->name);
		
		if(!isset($_SESSION[$this->terms->user])){
			$user = new User(func_get_args()[0]);
			$user->export();
		}
		
	}

	function build()
	{
		
		return '<script id="'.$this->terms->initscript_name.'">'.get_file($this->terms->initscript_location).'</script>';
	}
}


