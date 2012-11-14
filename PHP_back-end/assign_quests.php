<?php
//header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
//$union = array_unique(array_merge($a, $b));
if(isset($_GET))
{
	extract($_GET);
	if(isset($assign_by_uid, $assign_to_uid, $quest_ids,$message))
	{

		$quest_ids = explode(",",$quest_ids);
		$quest_ids = array_filter($quest_ids);
		foreach($quest_ids as $quest_id)
		{
			$query = "
					INSERT INTO 
					`KNP_ASSIGN_QUESTS`
						(`QUEST_ID`,`ASSIGN_BY_UID`,`ASSIGN_TO_UID`,`MESSAGE`,`EXPIRED_TIME`,`STATUS`) 
					VALUES 
						(:quest_id,:assign_by_uid,:assign_to_uid,:message,'0000-00-00 00:00:00','INCOMPLETE');
					";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':quest_id' => $quest_id,
				':assign_by_uid'=>$assign_by_uid,
				':assign_to_uid' => $assign_to_uid,
				':message'=>$message
				));
		}
		$posts[] = array("Message"=>"Updated!");
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

//echo json_indent(json_encode($records));
?>