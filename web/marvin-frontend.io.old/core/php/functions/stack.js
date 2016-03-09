<?php

function init_metastack(){
	$_SESSION['metastack'] = array();
}

function create_stack($stackname){
	if(!stack_exists($stackname)){
		$_SESSION['metastack'][$stackname] = array();
	}else{
		return false;
	}
}

function get_stack($stackname){
	if(stack_exists($stackname)){
		return $_SESSION['metastack'][$stackname];
	}else{
		return false;
	}
	
}

function maj_stack($stackname,$stack){
	if(stack_exists($stackname)){
		$_SESSION['metastack'][$stackname] = $stack;
	}else{
		return false;
	}
	
}

function set_to_stack($stackname,$key,$value){
	if(!stack_exists($stackname)){warning('invalid stack name');print_r(list_metastack());return;}
	$stack = get_stack($stackname);
	if(!isset($stack[$key])){
		$stack[$key] = json_encode($value);
		maj_stack($stackname,$stack);
	}else{
		maj_in_stack($stackname,$key,$value);
		warning('Key'.(string) $key.'does NOT exist in '.(string) $stackname.' - Generate...');
	}
}

function get_from_stack($stackname,$key){
	if(!stack_exists($stackname)){warning('invalid stack name');print_r(list_metastack());return;}
	$stack = get_stack($stackname);
	if(isset($stack[$key])){
		return json_decode($stack[$key]);
	}
}

function push_to_stack($stackname,$value){
	if(!stack_exists($stackname)){warning('invalid stack name');print_r(list_metastack());return;}
	$stack = get_stack($stackname);
	array_push($stack, json_encode($value));
	maj_stack($stackname,$stack);
}

function pop_from_stack($stackname){
	//***Alias***
	return pull_from_stack($stackname);
}

function pull_from_stack($stackname){
	if(!stack_exists($stackname)){warning('invalid stack name');print_r(list_metastack());return;}
	$stack = get_stack($stackname);
	if(!empty($stack)) {
		$result = json_decode(array_pop($stack));
		maj_stack($stackname,$stack);
		return $result;
	}else{
		return false;
	}
}

function unshift_to_stack($stackname,$value){
	if(!stack_exists($stackname)){warning('invalid stack name');print_r(list_metastack());return;}
}

function shift_from_stack($stackname){
	if(!stack_exists($stackname)){warning('invalid stack name');print_r(list_metastack());return;}
}

function maj_in_stack($stackname,$key,$value){
	if(!stack_exists($stackname)){warning('invalid stack name');print_r(list_metastack());return;}
	$stack = get_stack($stackname);
	if(isset($stack[$key])){
		$stack[$key] = json_encode($value);
		maj_stack($stackname,$stack);
	}
}

function list_metastack(){
	$list = array();
	foreach ($_SESSION['metastack'] as $key => $value) {
		array_push($list, $key);
	}
	return $list;
}

function list_stack($stackname){
	if(!stack_exists($stackname)){warning('invalid stack name');print_r(list_metastack());return;}
	$list = array();
	foreach ($_SESSION['metastack'][$stackname] as $key => $value) {
		array_push($list, $value);
	}
	return $list;
}

function stack_exists($stackname){
	if(isset($_SESSION['metastack'][$stackname])){
		return true;
	}else{
		return false;
	}
}

function del_stack($stackname){
	if(!stack_exists($stackname)){warning('invalid stack name');print_r(list_metastack());return;}
	unset($_SESSION['metastack'][$stackname]);
}

init_metastack();