<?php

class memory extends Object{

	function init($name = ''){
		
		$host = $GLOBALS;
		$this->name = (string) $name;
		
		if(!isset($host['cells'])){
			$host['cells'] = new stdClass();
		}
		
		if(!isset($host['cells']->$name)){
			$host['cells']->$name = new stdClass();
		}
		
		$this->cells = $host['cells']->$name;
		
                return 1;

        }

        function set($key,$value = 0){

                $this->cells->$key = $value;
		return 1;

        }

        function get($key){
	
		return $this->cells->$key;
		return 1;
		
	}
	
        function export(){
	
		return $this->cells;
		
	}
}

