<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
//http://justechinfo.com/kap_server/insert_uid_token.php?email=" + email_value + "&uid=" + uid + "&token=" + token
if(isset($_GET))
{
	extract($_GET);
	if(isset($email,$uid,$token))
	{
		$email = strtolower($email);
		$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
		$query =   
		   "
		UPDATE `KAP_USER_MAIN` 
		SET
			USER_ID = :uid , 
			DEVICE_TOKEN = :token
		WHERE 
			`EMAIL` = :email  
			";
		
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid, ':token'=>$token, ':email'=>$email));
		if($statement->rowCount() > 0){
			$posts[0] = "Successfully updated";
		}
		else{
			$posts[0] = "Not successfully updated";
		}
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));
}


?>