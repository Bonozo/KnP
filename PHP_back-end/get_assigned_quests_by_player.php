<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
error_reporting(0);
//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
//$union = array_unique(array_merge($a, $b));
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
		$name = "";
		$num_of_friends = "";
		$quest_id = "";
		$is_completed = "";
		
		$query = "
					SELECT 
					`QUEST_ID`, `ASSIGN_BY_UID`, `MESSAGE`
					FROM
					`KNP_ASSIGN_QUESTS`
					WHERE
					`ASSIGN_TO_UID` = :uid
					GROUP BY `ASSIGN_BY_UID`
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid'=>$uid
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		if($res[0]['QUEST_ID'] == ""){
			$records = array("Message" => "No Quests assigned to you!");
		}
		else
		{	
			//"http://justechinfo.com/kap_server/get_avatar_friend_count.php?uid=10000001";
			$posts = array();
			$counter = 0;
			foreach($res as $post){
				foreach($post as $key => $value){
					$avatar_info = getAvatarInfo($posts[$counter]["ASSIGN_BY_UID"]);
					$posts[$counter]["NAME"] = $avatar_info['NAME'];
					$posts[$counter]["LEVEL"] = $avatar_info['LEVEL'];
					$posts[$counter]["NUM_OF_FRIENDS"] = getNumberOfFriends($posts[$counter]["ASSIGN_BY_UID"]);
					$posts[$counter][$key] = $value;
					$posts[$counter]["IS_COMPLETED"] = isQuestCompleted($posts[$counter]["ASSIGN_BY_UID"], $uid);
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
function getAvatarInfo($uid){
	global $dbObj;
	$query = "
			SELECT `NAME`,`LEVEL` FROM KAP_USER_MAIN WHERE UID = :uid 
			";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':uid'=>$uid
		));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	
	return $res[0];
}

?>