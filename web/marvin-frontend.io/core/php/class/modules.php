<?php

class Modules extends Object
{

	private $terms;
	private $command;
	private $data;

	function init()
	{
	
		$this->terms = new stdClass();
		$this->terms->modules = 'modules';
		$this->terms->components = 'components';
		$this->data = func_get_args()[0];
		
	}
	
	function build() {
	
		try{
			$a = search_for_modules($this->data);
			if(isset($a->{$this->terms->modules})){
				$this->{$this->terms->modules} = $a->{$this->terms->modules};
			}else{
				$this->{$this->terms->modules} = new stdClass();
			}
			if(isset($a->{$this->terms->components})){
				$this->{$this->terms->components} = $a->{$this->terms->components};
			}
			
		}catch(Exception $e){
			$this->{$this->terms->modules} = new stdClass();
			$this->{$this->terms->components} = new stdClass();
			if(debug_active()){
				$this->{$this->terms->modules} = $e->getMessage();
			}
		}
		
		return $this;
	
	}
	
}