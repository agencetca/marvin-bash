<?php

function get_file($path,$force = false){

	try{
		$content = file_get_contents($path);
		return prepare($content);
	}catch(Exception $e){
		if($force === true){
			return prepare($path);
		}else{
			return null;
		}
	}
    
}

function JSdirToObject($dir) { 
   
   $result = new stdClass(); 

   $cdir = scandir($dir); 
   foreach ($cdir as $key => $value) 
   { 
      if (!in_array($value,array(".",".."))) 
      {
      
         if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) 
         { 
            $result->$value = JSdirToObject($dir . DIRECTORY_SEPARATOR . $value); 
         } 
         else 
         { 
		if('js' === pathinfo($value, PATHINFO_EXTENSION)){
			$result->{basename($value,'.js')} = get_file($dir . DIRECTORY_SEPARATOR . $value);
		}

         } 
      } 
   } 
   
   
   return $result; 
}

function parseLibs($dir) {
   
   $result = new stdClass(); 
   $dir = trim($dir,'/');

   $cdir = scandir($dir); 
   foreach ($cdir as $key => $value) 
   { 
      if (!in_array($value,array(".",".."))) 
      { 
      
         if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) 
         { 
		$result->$value = parseLibs($dir . DIRECTORY_SEPARATOR . $value);
         } 
         else 
         { 
		if('js' === pathinfo($value, PATHINFO_EXTENSION)){
			$result->$value = "var script = document.createElement('script');script.src = '".$dir . DIRECTORY_SEPARATOR . $value."';document.head.appendChild(script);";
		}

         } 
      } 
   } 
   
   return $result; 
}