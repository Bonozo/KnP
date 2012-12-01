<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');


if(isset($_GET))
{
	extract($_GET);
	if(isset($password) && isset($name) && isset($email) && isset($gender))
	{
		$email = strtolower($email);
		$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
		$query = "SELECT `EMAIL` FROM `KAP_USER_MAIN` WHERE `EMAIL` = :email";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':email'=>$email));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);

		$search_for_email = is_value_exists($res,"EMAIL",$email);

		if(strcmp($gender,'m') != 0 && strcmp($gender,'f') != 0 ){
			$records = array('Error'=>"Gender must be `m` or `f`");
		}
		else if(strcmp($search_for_email,'-1') != 0){
			$records = array('Error'=>"Email address already exists.");
		} 
		else{
			$query = "INSERT INTO `KAP_USER_MAIN`(`PASSWORD`,`NAME`,`EMAIL`,`GENDER`) 
			VALUES ( :password,:name,:email,:gender);";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(	':password'=>md5($password),
					':name'=>$name,
					':email'=>$email,
					':gender'=>$gender
				));
			
			$records = array('Message'=>"Successfully registered with email address '".$email."'!");
		}

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>