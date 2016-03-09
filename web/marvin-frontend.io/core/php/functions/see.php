<?php

function see($thing){

	if(isset($_GET['action']) && !isset($_POST['action'])){
		if($_GET['action'] === $thing){return $_GET;}
	}elseif(!isset($_GET['action']) && isset($_POST['action'])){
		if($_POST['action'] === $thing){return $_POST;}
	}elseif(isset($_GET['action']) && isset($_POST['action'])){
		if($_GET['action'] === $thing){return $_GET;}
		elseif($_POST['action'] === $thing){return $_POST;}
	}else{
		return null;
	}

}