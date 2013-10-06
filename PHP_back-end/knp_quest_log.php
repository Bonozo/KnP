<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";

if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
		$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
		$query =   
		"
		SELECT COUNT(`STATUS`) AS 'TOTAL_QUESTS_COMPLETED' FROM KNP_ASSIGN_QUESTS 
		WHERE ASSIGN_TO_UID = :uid AND `STATUS` = 'COMPLETE' AND NOT ASSIGN_BY_UID = :uid
		";
		
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res1 = $statement->fetchAll(PDO::FETCH_ASSOC);

		$query =   
		"
		SELECT COUNT(`STATUS`) AS 'QUESTS_COMPLETED_FOR_ME' 
		FROM KNP_ASSIGN_QUESTS 
		WHERE ASSIGN_BY_UID = :uid AND 
		`STATUS` = 'COMPLETE' AND 
		NOT ASSIGN_TO_UID = :uid
		";
		
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res2 = $statement->fetchAll(PDO::FETCH_ASSOC);

		$posts['TOTAL_QUESTS_COMPLETED'] = $res1[0]['TOTAL_QUESTS_COMPLETED'];
		$posts['QUESTS_COMPLETED_FOR_ME'] = $res2[0]['QUESTS_COMPLETED_FOR_ME'];
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>
