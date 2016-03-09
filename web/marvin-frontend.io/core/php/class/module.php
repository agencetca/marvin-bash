<?php

class Module extends Object
{

	private $terms;
	private $thing;

	function init()
	{
		$this->terms = new stdClass();
		$this->terms->modules_dir = 'client/private/modules';
		$this->terms->modules_ext = '.js';
		$this->terms->modules = 'modules';
		$this->terms->components = 'components';
		
		$this->thing = func_get_args()[0];
	}
	
	function build() {
	
		try{
			$this->{$this->terms->modules} = get_file(trim($this->terms->modules_dir,'/').'/'.trim($this->thing,'/').$this->terms->modules_ext);
			$this->{$this->terms->components} = search_for_components($this->{$terms->modules});
		}catch(Exception $e){
			try{
				$this->{$this->terms->modules} = get_file(trim($this->terms->modules_dir,'/').'/'.trim($this->thing,'/').'/'.basename($this->thing).$this->terms->modules_ext);
				$this->{$this->terms->components} = search_for_components($this->{$this->terms->modules});
			}catch(Exception $e){
				$this->{$this->terms->modules} = new stdClass();
				$this->{$this->terms->components} = new stdClass();
				if(debug_active()){
					$this->{$this->terms->modules} = $e->getMessage();
				}
			}
		}
		
		return $this;
	
	}
	
}
