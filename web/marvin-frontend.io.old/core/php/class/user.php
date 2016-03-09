<?php
    
class User extends Object {
    
    private $raw_data;
    
    function init(){
    
	$this->terms = new stdClass();
	$this->terms->role = 'role';
	$this->terms->guest = 0;
	$this->terms->user = 'user';
    
	$this->{$this->terms->role} = $this->terms->guest;
	
    }
    
    function build(){

	$_SESSION[$this->terms->user] = $this;
	return $_SESSION[$this->terms->user];

    }
    
}