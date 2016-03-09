<?php

/**
* 
*/
abstract class Process
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

	abstract function start();
	abstract function stop();

	function run($config = null)
	{
		$this->thing = $config;
		$this->start();
		$this->stop();
	}

	
}