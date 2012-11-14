<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
//$union = array_unique(array_merge($a, $b));
if(isset($_GET))
{
	extract($_GET);
	if(isset($status,$assign_quest_id))
	{

		$query = "
				UPDATE `KNP_ASSIGN_QUESTS` SET `STATUS` = :status WHERE `ASSIGN_QUEST_ID`=:assign_quest_id;
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':status' => $status,
			':assign_quest_id'=>$assign_quest_id
			));
		if($statement->rowCount() > 0)
			$posts[] = array("Message"=>"Updated!");
		else
			$posts[] = array("Message"=>"Something went wrong!");

		$records = $posts;
	}
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