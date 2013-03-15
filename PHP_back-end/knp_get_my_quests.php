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
			SELECT COUNT(KAQG.QUEST_ID) AS 'NUM_OF_QUESTS', KAQ.ASSIGN_QUEST_ID, KAQ.ASSIGN_BY_UID, KUM.NAME,KUM.GENDER,KUM.LEVEL, 
			TIMEDIFF(KAQ.EXPIRED_TIME,NOW()) AS 'REMAINING_TIME',KAQ.EXPIRED_TIME, KAQ.MESSAGE, KAQ.STARTED_TIME, KAQ.STATUS
			FROM KNP_ASSIGN_QUESTS KAQ 
			LEFT JOIN 
			KAP_USER_MAIN KUM
			ON 
			KAQ.ASSIGN_BY_UID = KUM.UID
			LEFT JOIN
			KNP_ASSIGN_QUEST_GAMES KAQG
			ON
			KAQ.ASSIGN_QUEST_ID = KAQG.ASSIGN_QUEST_ID
			WHERE KAQ.ASSIGN_TO_UID = :uid AND 
			NOT KAQ.ASSIGN_BY_UID = :uid 
			GROUP BY
			KAQG.ASSIGN_QUEST_ID
					";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid'=>$uid
			));
			################
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		$counter = 0;
		$posts = array();
		foreach($res as $key => $post){

/*			$days = floor($post["REMAINING_TIME"] / (60 * 60 * 24));
			$remainder = $post["REMAINING_TIME"] % (60 * 60 * 24);
			$hours = floor($remainder / (60 * 60));
			$remainder = $remainder % (60 * 60);
			$minutes = floor($remainder / 60);
			$seconds = $remainder % 60;  
 
			if($post["STATUS"] == 'EXPIRED'){
			  $posts[$counter]["REMAINING_TIME"] = "00:00:00";
			  $posts[$counter]["STATUS"] = 'EXPIRE';//:"3",
			}
			 else */
			 if( strtotime($post["EXPIRED_TIME"]) < strtotime(date("Y:m:d h:i:s", time()))){
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
 				
//			  $posts[$counter]["REMAINING_TIME"] = $TimeRemaining;
			  $posts[$counter]["ASSIGN_QUEST_ID"] = $post["ASSIGN_QUEST_ID"];//:"3",
			  $posts[$counter]["NUM_OF_QUESTS"] = $post["NUM_OF_QUESTS"];//:"3",
			  $posts[$counter]["ASSIGN_BY_UID"] = $post["ASSIGN_BY_UID"];//:"3",
			  $posts[$counter]["NAME"] = $post["NAME"];//:"3",
			  $posts[$counter]["GENDER"] = $post["GENDER"];//:"3",
			  $posts[$counter]["LEVEL"] = $post["LEVEL"];//:"3",
			  $posts[$counter]["MESSAGE"] = $post["MESSAGE"];//:"3",
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