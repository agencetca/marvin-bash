<?php

class secret extends Object {

	function init(){
		
		$args = func_get_args()[0];

		try{
			$secret = $args->secret;
			echo "You found a secret! ";
			echo $secret;
		}catch(Exception $e){
			new bug($e);
		}
		
	}

	function build(){

	

	}	

}
