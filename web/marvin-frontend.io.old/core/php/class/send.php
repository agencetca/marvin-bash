<?php

/**
* 
*/
class Send extends Process
{
	
	function init()
	{
		
	}

	function start()
	{
		echo $this->thing;
	}

	function stop()
	{
		unset($this->thing);
	}

}