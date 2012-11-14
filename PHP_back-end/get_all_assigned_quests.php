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
	if(isset($assign_by,$assign_to))
	{
		$name = "";
		$num_of_friends = "";
		$quest_id = "";
		$is_completed = "";
		
		$query = "
				SELECT kaq.ASSIGN_QUEST_ID, kqm.QUEST_NAME,kaq.MESSAGE, kqm.COIN,kqm.CONTAINER,kqm.FLOWER,kqm.KNIFE, kaq.STATUS 
				FROM KNP_ASSIGN_QUESTS kaq, KNP_QUESTS_MAIN kqm
				WHERE kaq.ASSIGN_BY_UID = :assign_by AND kaq.ASSIGN_TO_UID = :assign_to AND kqm.QUEST_ID = kaq.QUEST_ID
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':assign_by' => $assign_by,
			':assign_to' => $assign_to
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		if($res[0]['ASSIGN_QUEST_ID'] == ""){
			$records = array("Message" => "No Quests assigned to you!");
		}
		else
		{	
			//"http://justechinfo.com/kap_server/get_avatar_friend_count.php?uid=10000001";
			$posts = array();
			$counter = 0;
			foreach($res as $post){
				foreach($post as $key => $value){
					$posts[$counter][$key] = $value;
				}
				$counter++;
			}
			$records = $posts;
		}
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