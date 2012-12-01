<?php
class MessageParser
{
	var $OPCODE_LENGTH = 3;
	var $UID_LENGTH = 8;
	var $THREADID_LENGTH = 8;
	var $msg;
	var $auth_hash_key;
	function __construct($msg,$auth_hash_key){
		$this->msg = $msg;
		$this->auth_hash_key = $auth_hash_key; 
	}
	public function validateKey(){
		$key = getKey();
		if(strcmp($key,"-1") == 0)
			return false;
		if(strcmp($key,$this->auth_hash_key) == 0)
			return true;
		return false;
	}
	public function getKey(){
		if(strlen($this->msg) >= strlen($this->auth_hash_key))
			return substr($this->msg,0,strlen($this->auth_hash_key));
		return "-1";
	}
	public function getOperation(){
		if(strlen($this->msg) >= (strlen($this->auth_hash_key)+$this->OPCODE_LENGTH))
			return substr($this->msg,strlen($this->auth_hash_key),$this->OPCODE_LENGTH);
		return "-1";
	}
	public function getUID(){
		if(strlen($this->msg) >= (strlen($this->auth_hash_key)+$this->OPCODE_LENGTH+$this->UID_LENGTH))
			return substr($this->msg,strlen($this->auth_hash_key)+$this->OPCODE_LENGTH,$this->UID_LENGTH);
		return "-1";
	}
	public function getThreadId(){
		if(strlen($this->msg) >= (strlen($this->auth_hash_key)+$this->OPCODE_LENGTH+$this->UID_LENGTH+$this->THREADID_LENGTH))
			return substr($this->msg,strlen($this->auth_hash_key)+$this->OPCODE_LENGTH+$this->UID_LENGTH,$this->THREADID_LENGTH);
		return "-1";
	}
	public function getMessage(){
		if(strlen($this->msg) >= (strlen($this->auth_hash_key)+$this->OPCODE_LENGTH+$this->UID_LENGTH+$this->THREADID_LENGTH))
			return substr($this->msg,strlen($this->auth_hash_key)+$this->OPCODE_LENGTH+$this->UID_LENGTH+$this->THREADID_LENGTH);
		return "-1";
	}
}
?>