<?php

/**
* 
*/
class Main extends Process
{
	
	function init()
	{
		session_start();
		
		$this->terms = new memory('terms');
		
		$this->terms->set('send','transmission');
		$this->terms->set('init','init');
		$this->terms->set('env','environment');
		$this->terms->set('module','module');
		
		$this->{$this->terms->get('send')} = new Send();
		
	}

	function start()
	{
	
		$thing = ensure_array($this->thing);
		$this->action = ensure_array_content($thing,0);
		$this->data = ensure_array_content($thing,1);
		
		switch($this->action){
			
			case $this->terms->get('init'):
				$payload = new Init($this->data);
				break;
				
			case $this->terms->get('env'):
				$payload = new Client($this->data);
				break;
				
			case $this->terms->get('module'):
				$payload = new Delay($this->data);
				break;
			
			default:
				return false;
				break;
			
		}
		
		echo "ohlala".var_dump($payload);
		$this->{$this->terms->get('send')}->run($payload->export());
		
	}

	function stop()
	{	
		
	}
}


