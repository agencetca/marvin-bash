<?php

class Methods extends Object
{

	function init()
	{
		$this->terms = new stdClass();
		$this->terms->methods_dir = 'api/protected/methods';
		$this->terms->methods_ext = '.js';
		
		$this->thing = func_get_args()[0];
	}
	
	function build() {
		
		//$payload = get_file(trim($this->terms->methods_dir,'/').'/'.$this->thing.$this->terms->methods_ext);
        $payload = JSdirToObject($this->terms->methods_dir);
		return $payload;
	}
	
}
