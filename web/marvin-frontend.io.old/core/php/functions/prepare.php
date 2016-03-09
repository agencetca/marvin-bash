<?php

function prepare($content = ''){

    $replacement = array(
	'platform' => 'innov24',
	'build_call_method'=> 'POST',
	'main_controller'=> 'index.php',
	'communication_keyword'=> 'action',
	'build_env'=> 'build_env',
	'initscript_name'=> 'init'
    );

    $pattern = '/__(.*)__/U';
    $complete = preg_replace_callback($pattern, 
            function ($matches) use ($replacement) {
                foreach ($matches as $key=>$value) {
                    if(array_key_exists($matches[$key],$replacement)){
                        return $replacement[$matches[$key]];
                    }
                }
            }
            , $content);
    return $complete;
    
}