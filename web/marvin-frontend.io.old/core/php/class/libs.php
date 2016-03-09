<?php

/**
* 
*/
class Libs extends Object
{
	private $terms;

	function init()
	{
		return func_get_args()[0];
		$this->_list = func_get_args()[0];
		$this->name = func_get_args()[0]->name;
		$this->export();
				
	}
}


