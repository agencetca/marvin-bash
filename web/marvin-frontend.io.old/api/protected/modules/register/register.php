<?php
namespace platform\modules;

class register extends \platform\ldap {
    
    private $data;

    public function __construct($action,$data) {

        parent::__construct();
        $this->verify($data);
        $this->process();
        return;
    }
    
    private function verify($data) {
        
        $this->data = new \StdClass();
        
        if(parent::user_exist($data->email)){
            throw new \Exception(\config\errors::e306);
        }else{
            $this->data->unicity = true;
        }
        
        $this->data->objectclass = array('person','inetOrgPerson');
        $this->data->cn = $data->email;
        $this->data->sn = $data->username;
        $this->data->ou = $data->role;
                
        return;
        
    }
    
    private function process() {
        
        $this->create_user();
        return;
        
    }
    
    private function create_user() {
        if(!parent::record_user($this->data)){
            throw new \Exception(\config\errors::e500);
        }else{
            echo \config\messages::msg001;
            return 0;
        }
    }

}