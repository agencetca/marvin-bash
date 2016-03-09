<?php

/**
* 
*/
class controlFix extends Object
{
	private $terms;

	function init()
	{
		$this->terms = new stdClass();
		$this->terms->fix_term = 'fix';
		$this->terms->fix_path = 'api/fix';
		
		foreach(glob(trim($this->terms->fix_path,'/').'/*') as $key => $thing){
			$this->{$this->terms->fix_term.$key} = get_file($thing);
		}
		
	}

	function build()
	{
		return $this;
		
	}
}


