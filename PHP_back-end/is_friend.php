<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";

if(isset($_GET))
{
	extract($_GET);
	if(isset($uid1,$uid2))
	{
		$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
		$query =   
			"SELECT `STATUS` FROM `FRIENDSHIP_MAIN` WHERE (UID = :uid1 AND FRIEND_UID = :uid2) OR (UID = :uid2 AND FRIEND_UID = :uid1) 
			";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid1' => $uid1,
			':uid2' => $uid2
		));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(sizeof($res) > 0){
			if($res[0]['STATUS'] == 'FRIENDS'){
				$posts = "true";
			}
			else{
				$posts = "false";
			}
		}
		else{
			$posts = "false";
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