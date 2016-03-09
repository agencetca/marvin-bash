<?php

/**
* 
*/
abstract class Object
{
	
	function __construct()
	{
		if(func_get_args()){
			$this->init(func_get_args()[0]);
		}else{
			$this->init(null);
		}
	}

	function init()
	{
		# code...
	}

	function export()
	{
	
		if(method_exists($this,'build')){
			return $this->build();
		}else{
			return $this;
		}
	}
}