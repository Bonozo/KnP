<?php 
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
if(isset($_GET))
{
	extract($_GET);
	if(isset($email))
	{
		$email = strtolower(urldecode($email));
		$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
		
		$activation_code = rand(11111,9999999);
		$query = "	
					UPDATE KAP_USER_MAIN
					SET PASSWORD_RESET_CODE='".$activation_code."'
					WHERE EMAIL='".$email."' 
				 ";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute();
		
		if($statement->rowCount() != 0){
			send_email($email,$activation_code);
			$records = array('Record'=>array("Error"=>0, "Message"=>"Validation code has been sent to your email address."));//$records = array('Error'=>$posts);
		}
		else{
			$records = array('Record'=>array("Error"=>1, "Message"=>"Email address does not exists."));//$records = array('Error'=>$posts);
		}
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}
function send_email($email_address, $code){
	// create a new cURL resource
	$ch = curl_init();
	$_url = "http://mohsinrasheed.com/dev/knp/send_email.php?email_address=".$email_address."&code=".$code;
	// set URL and other appropriate options
	curl_setopt($ch, CURLOPT_URL, $_url);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	
	// grab URL and pass it to the browser
	curl_exec($ch);
	
	// close cURL resource, and free up system resources
	curl_close($ch);
}
?>