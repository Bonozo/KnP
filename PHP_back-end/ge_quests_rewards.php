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
	if(isset($assign_quest_id))
	{
		$query = "
				SELECT 
					kqm.QUEST_NAME, kqr.QUEST_ID,kqr.INVENTORY_ID,kiim.NAME, kqr.UNIT
				FROM 
					KNP_ASSIGN_QUESTS kaq, KNP_QUESTS_MAIN kqm, KNP_QUESTS_REWARDS kqr, KNP_INVENTORY_ITEMS_MAIN kiim
				WHERE 
					kaq.QUEST_ID = kqm.QUEST_ID AND 
					kqr.QUEST_ID = kqm.QUEST_ID AND 
					kiim.INVENTORY_ID = kqr.INVENTORY_ID AND
					kaq.ASSIGN_QUEST_ID = :assign_quest_id;";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':assign_quest_id' => $assign_quest_id
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		foreach($res as $post){
			$posts[0]['QUEST_ID'] = $post['QUEST_ID'];
			$posts[0]['QUEST_NAME'] = $post['QUEST_NAME'];
			$posts[0][$post['NAME']] = $post['UNIT'];
//			print_r($post);
		}
//		$posts[] = array("Message"=>"Quests Assigned!");
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