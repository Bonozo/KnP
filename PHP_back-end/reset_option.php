<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{

		
		$query =   
		   "DELETE FROM FRIENDSHIP_MAIN
			WHERE 
			`UID` =:uid
			OR 
			`FRIEND_UID` = :uid";
		   
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$query =   
		   "DELETE FROM KNP_INVENTORY_TRANSACTION 
		   WHERE 
		   `DONAR_UID` = :uid 
		   OR 
		   `BENEFICIARY_UID` = :uid";
		   
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$query =   
		   "DELETE FROM KNP_INVENTORY_TRANSACTION_SUMMARY 
		   WHERE 
		   `UID` = :uid";
		   
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$query =   
		   "DELETE FROM KNP_CRAFT_TRANSACTION_SUMMARY 
		   WHERE 
		   `UID` = :uid";
		   
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$query =   
		   "DELETE FROM 
		   `KNP_ASSIGN_QUESTS`
		   WHERE 
		   `ASSIGN_BY_UID` = :uid 
		   OR 
		   `ASSIGN_TO_UID` = :uid";
		   
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$query =   
		   "UPDATE `KAP_USER_MAIN` 
		   SET
		   `LEVEL`='1',
		   `XP` = '1000',
		   `ENERGY` = '1000'
		   WHERE `UID` = :uid";
		   
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));

		$posts = array('Message'=>"You are successfully reset your account!");


		
		
		
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts[0]);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}



?>