<?php

require_once "services/composer/vendor/autoload.php";
$terms = new stdClass();
$terms->core_path = 'core/php';
$terms->vrac_path = 'core/php/functions';

$loader = new Nette\Loaders\RobotLoader;
// Add directories for RobotLoader to index
$loader->addDirectory('core/php');
// And set caching to the 'temp' directory on the disc
if(!is_dir('.tmp')) mkdir('.tmp');
$loader->setCacheStorage(new Nette\Caching\Storages\FileStorage('.tmp'));
$loader->register(); // Run the RobotLoader


foreach(glob($terms->vrac_path.'/*') as $thing){
	
	if(pathinfo($thing,PATHINFO_EXTENSION) === 'php'){
		require_once $thing;
	}
}

return 0;
