<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'core/php/init.php';
$main = new Main();

$terms = new stdClass();
$terms->build = 'build_env';
$terms->load = 'load_module';
$terms->module = 'module';
$terms->init = 'init';
$terms->env = 'environment';

if($data = see($terms->build)){

	//build new client
	$main->run(array($terms->env, $data));
	return;

}elseif($data = see($terms->load)){    
	
	//perform actions, with data if any
	$main->run(array($terms->module, $data));
	return;
        
}
	
//send init script
$main->run($terms->init);
return;
