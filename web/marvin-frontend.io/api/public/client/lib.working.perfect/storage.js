function() {

	this.name = 'storage';

	this.database = {};
	
	this.set = function(key,value){
	
		if(value === true){value = '&&~!yes&';} 
		if(value === false){value = '!no&&&~';} 
		this.database[key] = CryptoJS.AES.encrypt(value, "Secret Passphrase");
	
	}
	
	this.get = function(key){
		var decrypted = CryptoJS.AES.decrypt(this.database[key], "Secret Passphrase");
		var answer = decrypted.toString(CryptoJS.enc.Utf8);
		if(answer === '&&~!yes&'){answer = true;} 
		if(answer === '!no&&&~'){answer = false;}
		return answer;
	}
	
	this.del = function(key){
	
		delete this.database[key];
	
	}
	
	return this;
	
}