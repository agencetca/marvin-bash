<?php

function get_constant($string){
    
    if(is_defined($string)){
        return constant($string);
    }else{
        return false;
    }
    
}

function is_defined($string){
    
    if(defined($string)){
        return true;
    }else{
        return false;
    }
    
}