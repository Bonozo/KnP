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
	if(isset($uid))
	{
		$query = "
			SELECT COUNT(KAQG.QUEST_ID) AS 'NUM_OF_QUESTS', KAQ.ASSIGN_QUEST_ID, KAQ.ASSIGN_TO_UID, KUM.NAME,KUM.GENDER,KUM.LEVEL, 			
			TIMEDIFF(KAQ.EXPIRED_TIME,NOW()) AS 'REMAINING_TIME',KAQ.EXPIRED_TIME, KAQ.MESSAGE, KAQ.STARTED_TIME, KAQ.STATUS
			FROM KNP_ASSIGN_QUESTS KAQ 
			LEFT JOIN 
			KAP_USER_MAIN KUM
			ON 
			KAQ.ASSIGN_TO_UID = KUM.UID
			LEFT JOIN
			KNP_ASSIGN_QUEST_GAMES KAQG
			ON
			KAQ.ASSIGN_QUEST_ID = KAQG.ASSIGN_QUEST_ID
			WHERE KAQ.ASSIGN_BY_UID = :uid AND 
			NOT KAQ.ASSIGN_TO_UID = :uid AND
			KAQ.ASSIGNER_STATUS = 'ACTIVE'
			GROUP BY
			KAQG.ASSIGN_QUEST_ID
					";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid'=>$uid
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	
		$posts = array();
		$counter = 0;
		foreach($res as $key => $post){

			if(strtotime($post["EXPIRED_TIME"]) < strtotime(date("Y:m:d h:i:s", time()))){
			  if($post["STATUS"] != "COMPLETE"){
				  ExpireQuest($post["ASSIGN_QUEST_ID"]);
				  $posts[$counter]["EXPIRED_TIME"] = "00:00:00";
				  $posts[$counter]["STATUS"] = 'EXPIRE';//:"3",
			  }
			  else{
				  $posts[$counter]["EXPIRED_TIME"] = "00:00:00";
				  $posts[$counter]["STATUS"] = $post["STATUS"];//:"3",
			  }
			}
			else{
			  $posts[$counter]["EXPIRED_TIME"] = $post["REMAINING_TIME"];
			  $posts[$counter]["STATUS"] = $post["STATUS"];//:"3",
			}
			
			//			  $posts[$counter]["EXPIRED_TIME"] = $TimeRemaining;
			$posts[$counter]["ASSIGN_QUEST_ID"] = $post["ASSIGN_QUEST_ID"];//:"3",
			$posts[$counter]["NUM_OF_QUESTS"] = $post["NUM_OF_QUESTS"];//:"3",
			$posts[$counter]["ASSIGN_TO_UID"] = $post["ASSIGN_TO_UID"];//:"3",
			$posts[$counter]["NAME"] = $post["NAME"];//:"3",
			$posts[$counter]["GENDER"] = $post["GENDER"];//:"3",
			$posts[$counter]["LEVEL"] = $post["LEVEL"];//:"3",
			$posts[$counter]["MESSAGE"] = $post["MESSAGE"];//:"3",
			$posts[$counter]['USER_APPEARANCE'] = getAvatarAppearance($post['ASSIGN_TO_UID']);
			$posts[$counter]['NUM_OF_FRIENDS'] = getFriendsCount($post['ASSIGN_TO_UID']);
			$posts[$counter++]["STARTED_TIME"] = $post["STARTED_TIME"];//:"3",
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

function getFriendsCount($_uid){
	global $dbObj;
	$query = "
			SELECT 
				COUNT(M.UID) AS `NUM_OF_FRIENDS` 
			FROM 
				`FRIENDSHIP_MAIN` M 
			WHERE 
				(M.UID = '".$_uid."' OR M.FRIEND_UID = '".$_uid."') AND 
				M.STATUS = 'FRIENDS' 
			";
			//echo $query;die();
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute();
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	return $res[0]['NUM_OF_FRIENDS'];
}
function getAvatarAppearance($_uid){
	global $dbObj;
	$query =   
		"SELECT uwi.`UID`,uwt.`WEAR_TYPE_ID`,uw.`WEAR_ID`,uw.`IMAGE`,uw.`NAME`
		FROM 
			`USER_WEAR_TYPE` uwt
		LEFT JOIN 
			`USER_WEAR` uw 
		ON 
			uwt.`WEAR_TYPE_ID`= uw.`WEAR_TYPE_ID`
		LEFT JOIN 
			`USER_WEAR_INFO` uwi
		ON 
			uwt.`WEAR_TYPE_ID` = uwi.`WEAR_TYPE_ID`
		AND 
			uw.`WEAR_ID` = uwi.`WEAR_ID`
		WHERE 
			uwi.UID = :uid";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(array(':uid'=>$_uid));
	$result = $statement->fetchAll(PDO::FETCH_ASSOC);////print_r($result);
	return $result;
}
function ExpireQuest($assign_quest_id){
	global $dbObj;
	$query = "
UPDATE KNP_ASSIGN_QUESTS 
	SET
	STATUS = 'EXPIRE'
	
	WHERE
	ASSIGN_QUEST_ID = '".$assign_quest_id."' ;
	";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute();
}
?>