<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
//$union = array_unique(array_merge($a, $b));
if(isset($_GET))
{
	extract($_GET);
	if(isset($assign_by_uid, $assign_to_uid, $quest_ids,$message) && false)
	{
		$task_detail_id = 3007;
		$sql = "
				SELECT COUNT(UID) AS 'EXISTS' FROM USER_TASK_DETAILS WHERE UID = :uid AND TASK_DETAIL_ID = :task_detail_id 
				";
		$params = array(
			':uid '=>$assign_by_uid,
			':task_detail_id'=>$task_detail_id
			);
		$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute($params);
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(intval($res[0]['EXISTS']) == 0){
			$sql = "
					INSERT INTO `USER_TASK_DETAILS` (`UID`,`TASK_DETAIL_ID`,`STATUS`)
					VALUES
					( :uid, :task_detail_id, :status )
					";
			$params = array(
				':uid' => $assign_by_uid,
				':task_detail_id' => $task_detail_id,
				':status' => 'COMPLETED'
				);
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute($params);
		}
		


		$quest_ids = explode(",",$quest_ids);
		$quest_ids = array_filter($quest_ids);
		foreach($quest_ids as $quest_id)
		{
			$query = "
					INSERT INTO 
					`KNP_ASSIGN_QUESTS`
						(`QUEST_ID`,`ASSIGN_BY_UID`,`ASSIGN_TO_UID`,`MESSAGE`,`EXPIRED_TIME`,`STATUS`) 
					VALUES 
						(:quest_id,:assign_by_uid,:assign_to_uid,:message,'2013-12-12 00:00:00','INCOMPLETE');
					";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->bindParam(':assign_by_uid', $assign_by_uid, PDO::PARAM_INT);
			$statement->execute(
			array(
				':quest_id' => $quest_id,
				':assign_by_uid'=>$assign_by_uid,
				':assign_to_uid' => $assign_to_uid,
				':message'=>$message
				));
		}

		$lastid = $dbObj->lastInsertId();
		$posts[] = array("Message"=>"Quests Assigned!", "assign_quest_id"=>"$lastid");
		$records = $posts;
	}
	else
	{
		$records = array('Error'=>"Please upgrade your APP version to assign quest.");
//		$records = array('Error'=>"Bad Request!");
	}
}
else
{
	$records = array('Error'=>"Bad Request!");
}
$records = array('Record'=>$records);

echo json_indent(json_encode($records));
?>