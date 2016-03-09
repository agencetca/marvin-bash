<?php

/**
* 
*/
class Env extends Object
{
	private $terms;

	function init()
	{
	
		$this->terms = new stdClass();
		$this->terms->template_keyword = 'template';
		$this->terms->template_dir = 'api/protected/templates';
		
		$this->terms->pluggins = 'public';
		
		$this->terms->public_folder = 'public';
		$this->terms->modules_ext = '.js';
		$this->terms->modules = 'modules';
		$this->terms->components = 'components';
		$this->terms->methods = 'methods';
		
		$this->terms->user = 'user';
		$this->terms->role = 'role';
	}

	function build()
	{
		
		try{
		
			//build template
			$this->{$this->terms->template_keyword} = new Template();
            $this->{$this->terms->template_keyword} = $this->{$this->terms->template_keyword}->export();

			//Add needed libs
            $this->{$this->terms->pluggins} = parseLibs($this->terms->public_folder);
		
            //Add methods (hooked)
			$a = new Methods();
            $this->{$this->terms->methods} = $a->export();

			//Add modules and components
			$a = new Modules($this->{$this->terms->template_keyword});
			$b = $a->export();
				
			$this->{$this->terms->modules} = $b->{$this->terms->modules};
			if(isset($b->{$this->terms->components})){
				$this->{$this->terms->components} = (object) array_merge((array) $b->{$this->terms->components}, (array) search_for_components($this->{$this->terms->template_keyword}));
			}else{
				$this->{$this->terms->components} = search_for_components($this->{$this->terms->template_keyword});
			}
			
		}catch(Exception $e){
			$this->{$this->terms->pluggins} = new stdClass();
			$this->{$this->terms->modules} = new stdClass();
			$this->{$this->terms->components} = new stdClass();
			if(debug_active()){
				$this->{$this->terms->template_keyword} = $e->getMessage();
			}
		}
		
		return $this;
	}
}


