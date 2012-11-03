<?php 
function __autoload($class_name) {
    include $class_name . '.php';
}
$auth_hash_key = "S83HSGGH5J";
//$msg = "S83HSGGH5JOPN10000001";
//S83HSGGH5J
$msg = "S83HSGGH5JMSG1000000230000002HelloMessage";	

$obj = new MessageParser($msg,$auth_hash_key);
echo $obj->getMessage();
//echo getMessage($msg,$auth_hash_key);

//echo getThreadId($msg,$auth_hash_key);

//echo getUID($msg,$auth_hash_key);

//echo getOperation($msg,$auth_hash_key);

/*if($parsed_key)
	echo "TRUE";
else
	echo "FALSE";
	*/
?>
