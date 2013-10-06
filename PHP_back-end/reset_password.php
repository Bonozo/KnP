<?php 
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
if(isset($_GET))
{
	extract($_GET);
	if(isset($email,$code,$password))
	{
		$email = strtolower(urldecode($email));
		$password = urldecode($password);
		$code = strtolower(urldecode($code));

		$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);

		$query = "	
					UPDATE KAP_USER_MAIN
					SET PASSWORD='".md5($password)."'
					WHERE EMAIL='".$email."' AND
					PASSWORD_RESET_CODE='".$code."'
				 ";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute();
		
		if($statement->rowCount() != 0){
			$query = "	
						UPDATE KAP_USER_MAIN
						SET PASSWORD_RESET_CODE=''
						WHERE EMAIL='".$email."'
					 ";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute();

			$records = array('Record'=>array("Error"=>0, "Message"=>"Your password has been updated."));
		}
		else{
			$records = array('Record'=>array("Error"=>1, "Message"=>"Activation code is wrong."));//$records = array('Error'=>$posts);
		}
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}
?>