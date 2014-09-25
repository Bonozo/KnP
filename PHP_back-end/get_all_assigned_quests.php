<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
//$union = array_unique(array_merge($a, $b));
if(isset($_GET))
{
	extract($_GET);
	if(isset($assign_by,$assign_to))
	{
		$name = "";
		$num_of_friends = "";
		$quest_id = "";
		$is_completed = "";
		
		$query = "
			SELECT 
				kaq.ASSIGN_QUEST_ID, 
				kqm.QUEST_ID,
				kqm.QUEST_NAME,
				kqm.QUEST_IMAGE,
				kaq.MESSAGE, 
				GROUP_CONCAT(kiim.NAME, CONCAT(':',kqr.UNIT)) AS 'REWARDS', 
				kaq.STARTED_TIME,
				kaq.EXPIRED_TIME,
				kaq.STATUS
			FROM 
				KNP_ASSIGN_QUESTS kaq, 
				KNP_QUESTS_MAIN kqm, 
				KNP_QUESTS_REWARDS kqr, 
				KNP_INVENTORY_ITEMS_MAIN kiim
			WHERE 
				kaq.ASSIGN_BY_UID = :assign_by AND 
				kaq.ASSIGN_TO_UID = :assign_to AND 
				kqm.QUEST_ID = kaq.QUEST_ID AND
				kqr.QUEST_ID = kaq.QUEST_ID AND
				kiim.INVENTORY_ID = kqr.INVENTORY_ID
			GROUP BY
				kaq.ASSIGN_QUEST_ID";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':assign_by' => $assign_by,
			':assign_to' => $assign_to
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);

		$counter = 0;
		foreach($res as $post){
			$posts[$counter]['ASSIGN_QUEST_ID'] = $post['ASSIGN_QUEST_ID'];
			$status = "";
			if((strcmp($post['STATUS'],'INCOMPLETE')) == 0){
				$query = "
				SELECT 
					IF((
					SELECT EXPIRED_TIME FROM KNP_ASSIGN_QUESTS WHERE ASSIGN_QUEST_ID = :assign_quest_id) > NOW(), 
					'NOT_EXPIRED' ,
					'EXPIRED')  AS 'STATUS';
				";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':assign_quest_id' => $post['ASSIGN_QUEST_ID']
					));
				$status = $statement->fetchAll(PDO::FETCH_ASSOC);
				if($status[0]['STATUS'] == 'EXPIRED'){
					$status = 'EXPIRED';
					$query = "UPDATE `KNP_ASSIGN_QUESTS` SET `STATUS` = 'EXPIRED' WHERE `ASSIGN_QUEST_ID` = :assign_quest_id";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(
					array(
						':assign_quest_id' => $post['ASSIGN_QUEST_ID']
						));
				}
			}
			
							
			$posts[$counter]['QUEST_ID'] = $post['QUEST_ID'];
			$posts[$counter]['QUEST_NAME'] = $post['QUEST_NAME'];
			$posts[$counter]['QUEST_IMAGE'] = $post['QUEST_IMAGE'];
			$posts[$counter]['MESSAGE'] = $post['MESSAGE'];
			$rewards = $post['REWARDS'];
			$reward = explode(",",$rewards);
			foreach($reward as $inventory){
			  $key_value = explode(":",$inventory);
			  $posts[$counter][$key_value[0]] = $key_value[1];
			}
			$posts[$counter]['STARTED_TIME'] = $post['STARTED_TIME'];
			$posts[$counter]['EXPIRED_TIME'] = $post['EXPIRED_TIME'];
			$posts[$counter]['STATUS'] = ($status == 'EXPIRED')?'EXPIRED':$post['STATUS'];
			$counter ++;
		}
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
function isQuestCompleted($assigned_by_uid, $assigned_to_uid){
	global $dbObj;
	
	$query = "
	SELECT 
		`STATUS` 
	FROM 
		KNP_ASSIGN_QUESTS 
	WHERE 
		ASSIGN_BY_UID = :assigned_by_uid AND 
		ASSIGN_TO_UID = :assigned_to_uid 
	GROUP BY `STATUS`";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':assigned_by_uid'=>$assigned_by_uid,
		':assigned_to_uid'=>$assigned_to_uid
		));
	if($statement->rowCount() > 1)
		return "false";
	elseif($statement->rowCount() == 1){
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		if($res[0]['STATUS'] == "COMPLETE")
			return "true";
		return "false";
	}
	else{
		return "false";
	}
}
function getNumberOfFriends($uid){
	global $dbObj;
	$query = "
			SELECT 
				COUNT(M.UID) AS `NUM_OF_FRIENDS` 
			FROM 
				`FRIENDSHIP_MAIN` M 
			WHERE 
				(M.UID = :uid OR M.FRIEND_UID = :uid) AND 
				M.STATUS = 'FRIENDS' 
			";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':uid'=>$uid
		));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	
	return $res[0]['NUM_OF_FRIENDS'];
}
function getAvatarName($uid){
	global $dbObj;
	$query = "
			SELECT `NAME` FROM KAP_USER_MAIN WHERE UID = :uid 
			";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':uid'=>$uid
		));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	
	return $res[0]['NAME'];
}

?>