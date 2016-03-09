<?php
namespace config;


class warnings {
    
        const active = 1;
         
        const label = 'server warning';
         
        const _200 = '200 Nothing to do';
    
        //Auth/Reg
        const _301 = '301 Wrong password';
        const _302 = '302 Bad Request';
        const _303 = '303 Null';
        const _304 = '304 Too much results';
        const _305 = '305 Awaiting validation';
        const _306 = '306 User already registered';//warning security
        const _307 = '307 Unicity has not been checked, then LDAP cowardly refuse to process the registration';//warning security

        const _404 = '404 Environment not found';
        const _414 = '414 Variable is missing';

        const _500 = 'Undetermined error';
        //const e501 = 'Class does not exist';
        //const e501 = 'There is no module to handle this request.';
        const _501 = 'There is no module to handle this request/Class does not exist';
         
}