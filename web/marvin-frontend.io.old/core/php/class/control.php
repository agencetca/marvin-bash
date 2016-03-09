<?php

/**
* 
*/
class Control extends Object
{
	private $terms;

	function init()
	{
		$this->terms = new stdClass();
		$this->terms->sys_dir = 'sys';
		
		$this->{$this->terms->sys_dir} = new stdClass();
		$this->{$this->terms->sys_dir}->control0 = new controlFix();
		$this->{$this->terms->sys_dir}->control1 = new controlMain();
		$this->{$this->terms->sys_dir}->control2 = new controlFinal();
		$this->{$this->terms->sys_dir}->clean = prepare('function(){delete '
									.prepare('__platform__')
									.'.'
									.$this->terms->sys_dir
									.';}');
		
	}

	function build()
	{
	
		return $this;
		
	}
}


