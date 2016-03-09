<?php

function warning($code,$context = null){

    if(get_constant('warnings::active')){

    	if(!stack_exists(get_constant('warnings::label'))){
    		create_stack(get_constant('warnings::label'));
    	}

    	$args = func_get_args();
    	if($context === null){$args[2] = 'warnings';}

        $label = ucfirst(strtolower(get_constant('warnings::label')));
        push_to_stack(get_constant('warnings::label'),$label.' : '.ucfirst(strtolower(call_user_func_array('config',$args))));

    }

}