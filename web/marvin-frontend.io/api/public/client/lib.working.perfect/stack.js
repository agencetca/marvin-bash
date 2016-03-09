function() {

	this.database = {};
	
	this.set = function(key,value){
	
		if(value === true){value = 1;} 
		if(value === false){value = 0;} 
		//this.database[key] = CryptoJS.AES.encrypt(value, "Secret Passphrase");
        this.database[key] = value;
	
	}
	
	this.get = function(key){
		//var decrypted = CryptoJS.AES.decrypt(this.database[key], "Secret Passphrase");
		//var answer = decrypted.toString(CryptoJS.enc.Utf8);
        var answer = this.database[key];
		return answer;
	}
	
	this.del = function(key){
	
		delete this.database[key];
	
	}
	
	return this;
	
}
