<?php
namespace platform\modules;

class login extends \platform\ldap {
    
    private $data;

    public function __construct($action,$data) {

        parent::__construct();
        $this->send = new \platform\send();
        $this->verify($data);
        $this->process();
        
    }
    
    private function verify($data) {
        
//        $this->data = new \StdClass();
//        $this->data->cn = (isset($data->email)) ? $data->email : $data->cn;
//        $this->data->userPassword = (isset($data->password)) ? $data->password : $data->userPassword;
//        
//        $result = parent::get_member($this->data->cn);
//        if(parent::all_good($result,$this->data->userPassword)){
//              
//            $this->userdata = $result;
//            
//        }else{
//            $this->send->back('Vous avez fait une erreur, ou votre compte n\'est pas encore activé');
//        }
        
        $this->data = new \StdClass();
        $this->data->cn = (isset($data->email)) ? $data->email : $data->cn;
        $this->data->hash = $data->password;
        
        //VERRRRY BASIC :'( SUCKS TODO
        //verify user 
        if($this->user_exist($this->data->cn)){
            $this->all_good($this->get_member($this->data->cn), $this->data->hash);
        }else{
            throw new \Exception(\config\errors::e308);
        }
        
        
        
    }
    
    private function process() {
        
        
        $this->log_user();
        
    }
    
    public function log_user() {
        
        //TODO : IS IT REAALY GOOD TO INIT SESSION USER ONLY AT LOGIN (NO MNETION IN REGISTER) ???

        $_SESSION['user'] = new \stdClass();
        $obj = parent::get_member($this->data->cn);
                    
        $_SESSION['user']->id = $obj[0]['uid'][0];
        $_SESSION['user']->username = $obj[0]['cn'][0];
        $_SESSION['user']->surname = $obj[0]['sn'][0];
        $_SESSION['user']->role = $obj[0]['ou'][0];
        
        $_SESSION['user']->reput = 0;
        $_SESSION['user']->credits = 0;
        
        //$_SESSION['user'] = $this->code->decode($this->userdata[0]['description'][0]);
        $this->send->back('auto::reload');
        
    }

}