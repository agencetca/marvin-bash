<?php

class Component extends Object
{

	function init()
	{
		$this->terms = new stdClass();
		$this->terms->components_dir = 'api/protected/components';
		$this->terms->components_ext = '.json';
		
		$this->thing = func_get_args()[0];
	}
	
	function build() {
		
		$component = get_file(trim($this->terms->components_dir,'/').'/'.$this->thing.$this->terms->components_ext);
		return $component;
	}
	
}
