<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
if(isset($_GET))
{
	extract($_GET);
	if(isset($assign_quest_id,$remover))
	{
		$query1 = "UPDATE `KNP_ASSIGN_QUESTS` SET `".$remover."_STATUS` = 'REMOVED' WHERE `ASSIGN_QUEST_ID`= :assign_quest_id";
		$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement1->execute(array(
		':assign_quest_id'=>$assign_quest_id
		));
		$records = array("Message"=>"Quest successfully removed!");//$posts;


/*		$query = "SELECT `STATUS` FROM `KNP_ASSIGN_QUESTS` WHERE `ASSIGN_QUEST_ID`= :assign_quest_id";
		$statement = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(
		':assign_quest_id'=>$assign_quest_id
		));
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(strcmp($result[0]["STATUS"],"EXPIRE") == 0 || strcmp($result[0]["STATUS"],"COMPLETE") == 0){
			$query1 = "UPDATE `KNP_ASSIGN_QUESTS` SET `".$remover."_STATUS` = 'REMOVED' WHERE `ASSIGN_QUEST_ID`= :assign_quest_id";
			$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement1->execute(array(
			':assign_quest_id'=>$assign_quest_id
			));
			$records = array("Message"=>"Quest successfully removed!");//$posts;
		}
		else{
			$records = array("Message"=>"You can only remove completed or expired quests!");//$posts;
		}
*/	}   
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
}
else
{
	$records = array('Error'=>"Bad Request!");
}
$records = array('Record'=>$records);
echo json_indent(json_encode($records));
?>