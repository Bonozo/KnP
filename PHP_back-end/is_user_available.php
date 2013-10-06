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
		$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
		$query =   
			"select uid from KAP_USER_MAIN where email = :email";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':email' => $email
		));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(sizeof($res) <= 0){
			$posts['AVAILABLE'] = 'true';
		}
		else{
			$posts['AVAILABLE'] = 'false';
//			$posts = "false";
		}
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>ecords));

}


?>