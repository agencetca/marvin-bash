<?php

/**
* 
*/
class Template extends Object
{
	private $terms;

	function init()
	{
	
		$this->terms = new stdClass();
		$this->terms->template_dir = 'api/protected/templates';
		$this->terms->template_keyword = 'template';
		$this->terms->template_ext = '.json';
		$this->terms->user = 'user';
		$this->terms->role = 'role';

	}

	function build()
	{
	
		//Select the right template
		$template = config('template',$_SESSION[$this->terms->user]->{$this->terms->role});
		
		//Load the template
		return get_file(trim($this->terms->template_dir,'/').'/'.$template.$this->terms->template_ext);
		
	}
}


