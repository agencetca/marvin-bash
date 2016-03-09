<?php

class bug extends Object {

	function init(){
		
		$args = func_get_args()[0];

		try{
			$bug = $args;
			echo "You found a bug! ";
		}catch(Exception $e){
			echo "You found a bug! ";
			echo $e;
		}
		
	}

	function build(){

	

	}	

}
