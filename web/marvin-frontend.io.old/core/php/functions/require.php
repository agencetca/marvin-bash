<?php

function requireI($path){
    
    require $path;
    
}

function requireX($path){
    
    $external_path = 'server/lib/external';
    require rtrim($external_path,'/').'/'.$path;
    
}