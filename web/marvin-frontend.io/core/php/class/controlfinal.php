<?php

/**
* 
*/
class controlFinal extends Object
{

	function init()
	{
		//Note : no tags allowed, alert() won't work at this point
		$this->custom_script = '';
		$this->role_script = '';
		$this->user_script = '';
	}

	function build()
	{
		return $this;
		
	}
}


