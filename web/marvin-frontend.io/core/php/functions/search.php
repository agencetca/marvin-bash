<?php

function search_for_modules($string,$package = null){
	
	$terms = new stdClass();
	$terms->module_pattern = 'module::';
	$terms->modules_dir = 'client/private/modules';
	$terms->modules_ext = '.js';
	$terms->modules = 'modules';
	$terms->components = 'components';
	
	if($package === null){
		$package = new stdClass();
		$package->{$terms->modules} = new stdClass();
		$package->{$terms->components} = new stdClass();
	}
	
	$pattern = '/\b'.$terms->module_pattern.'(.*)\b/i';
	preg_match_all($pattern,$string,$results);
	
	foreach($results[1] as $module){
	
	    if(!isset($package->{$module})){
		try{
			$a = new Module($module);
			$b = $a->export();
			
			$package->{$terms->modules}->{$module} = $b->{$terms->modules};
			$package->{$terms->components} = (object) array_merge((array) $package->{$terms->components}, (array) $b->{$terms->components});
			
		}catch(Exception $e){
			$package->{$terms->modules}->{$module} = new stdClass();
			$package->{$terms->components} = new stdClass();
			if(debug_active()){
				$package->{$terms->modules}->{$module} = $e->getMessage();
			}
		}
	    }
        }
	
	return $package;
    
}

function search_for_components($string,$package = null){
	
	$terms = new stdClass();
	$terms->element_keyword = 'element';
	$terms->module_pattern = 'module::';
	$terms->components_dir = 'client/private/components';
	$terms->components_ext = '.js';
	
	if($package === null){
		$package = new stdClass();
	}
	
	$pattern = '/'.$terms->element_keyword.'.*?:.*?(\'|")(((?!'.$terms->module_pattern.').)*)(\'|").*?,?/';
	preg_match_all($pattern,$string,$results);
	
	
  foreach($results[2] as $component){
    if(!$component){return;} //TODO Why that?
	  if(!isset($package->{$component})){
		  try{
			  $a = new Component($component);
			  $package->{$component} = $a->export();
			  $sub_package = search_for_components($package->{$component},$package);
			  $package = (object) array_merge((array) $package,(array) $sub_package);
		  }catch(Exception $e){
			  if(debug_active()){
				  $package->{$component} = $e->getMessage();
			  }
		  }
	  }
  }
	
	return $package;
    
}
