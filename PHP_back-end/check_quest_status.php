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
	if(isset($uid,$assign_quest_id))
	{
		$quest_id_status = array();
		$res = explode(",",$assign_quest_id);
		$app_quests = array();
		foreach($res as $quest_status){
			$quest = explode(":",$quest_status);
			$app_quests[$quest[0]] = $quest[1];
		}
		//print_r(array('APP_QUEST'=>$app_quests));
		////print_r(array('APP_QUEST'=>$app_quests));
		$query = "
		SELECT `ASSIGN_QUEST_ID`, `STATUS` 
		FROM `KNP_ASSIGN_QUESTS` 
		WHERE 
		`ASSIGN_TO_UID` = :uid AND 
		NOT `ASSIGN_BY_UID` = :uid AND
		ASSIGNEE_STATUS = 'ACTIVE'";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid'=>$uid
			));
			################
		$records = $statement->fetchAll(PDO::FETCH_ASSOC);
		////print_r($records); die();
		$i = 0;
		$server_quests = array();
		//print_r(array('Q1:'=>$records));
		foreach($records as $record){
			////print_r($result);
			$server_quests[$record['ASSIGN_QUEST_ID']] = $record['STATUS'];
		}
		//print_r(array('server_quests'=>$records));
		//echo json_indent(json_encode($server_quests));
		
	
		////print_r($server_quests);

		$new_quests = array();
		$updated_quests = array();
		foreach($server_quests as $server_quest_id => $server_quest_status){
			if(!isset($app_quests[$server_quest_id])){ /*New Quest assigned*/
				array_push($new_quests,$server_quest_id);
				//$new_quests[$server_quest_id] = $server_quest_status;
				
			}
			else if(strcmp($app_quests[$server_quest_id],$server_quests[$server_quest_id]) != 0){/*Quest status updated*/
				$updated_quests[$server_quest_id] = $server_quest_status;
			}
		}
		
		//print_r(array('new_quests'=>$new_quests));
		//print_r(array('updated_quests'=>$updated_quests));
		//echo json_indent(json_encode($new_quests));
		//echo json_indent(json_encode($updated_quests));die();
		////print_r(array('Record'=>$new_quests));
		
			$new_quests_records = array();
		if(sizeof($new_quests) > 0){
			$new_quests = "'".implode("','",$new_quests)."'";
			$query = "
			SELECT TIME(kaq.EXPIRED_TIME) AS EXPIRED_TIME,TIMEDIFF(kaq.EXPIRED_TIME,NOW()) AS 'REMAINING_TIME', kaq.STATUS, kaq.ASSIGN_QUEST_ID, COUNT(kaqg.QUEST_ID) AS 'NUM_OF_QUESTS',
				   kaq.ASSIGN_BY_UID, kum.NAME, kum.GENDER, kum.LEVEL, kaq.MESSAGE, kaq.STARTED_TIME
			FROM 
				`KNP_ASSIGN_QUESTS` kaq
			LEFT JOIN 
				KNP_ASSIGN_QUEST_GAMES kaqg 
			ON
				kaq.ASSIGN_QUEST_ID = kaqg.ASSIGN_QUEST_ID 
			LEFT JOIN 
				KAP_USER_MAIN kum 
			ON
				kaq.ASSIGN_BY_UID = kum.UID 
			WHERE
				kaq.ASSIGN_QUEST_ID IN (".$new_quests.")
			GROUP BY 
				kaq.ASSIGN_QUEST_ID
			";
			//print_r(array('Q2'=>$query));
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(array());
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
			//$new_quests_records = $statement->fetchAll(PDO::FETCH_ASSOC);
			$new_quests_records = array();
			$counter = 0;
			foreach($res as $post){
				$new_quests_records[$counter]['EXPIRED_TIME'] = $post['EXPIRED_TIME'];
				$new_quests_records[$counter]['REMAINING_TIME'] = $post['REMAINING_TIME'];
				$new_quests_records[$counter]['STATUS'] = $post['STATUS'];
				$new_quests_records[$counter]['ASSIGN_QUEST_ID'] = $post['ASSIGN_QUEST_ID'];
				$new_quests_records[$counter]['NUM_OF_QUESTS'] = $post['NUM_OF_QUESTS'];
				$new_quests_records[$counter]['ASSIGN_BY_UID'] = $post['ASSIGN_BY_UID'];
				$new_quests_records[$counter]['GENDER'] = $post['GENDER'];
				$new_quests_records[$counter]['NAME'] = $post['NAME'];
				$new_quests_records[$counter]['LEVEL'] = $post['LEVEL'];
				$new_quests_records[$counter]['MESSAGE'] = $post['MESSAGE'];
				$new_quests_records[$counter]['STARTED_TIME'] = $post['STARTED_TIME'];
				$new_quests_records[$counter]['USER_APPEARANCE'] = getAvatarAppearance($post['ASSIGN_BY_UID']);
				$new_quests_records[$counter]['NUM_OF_FRIENDS'] = getFriendsCount($post['ASSIGN_BY_UID']);
				$counter++;
			}
			//print_r(array('Q2'=>$new_quests_records));
		}
			
			/*
      "EXPIRED_TIME":"00:00:00",
      "STATUS":"EXPIRE",
      "ASSIGN_QUEST_ID":"90000299",
      "NUM_OF_QUESTS":"1",
      "ASSIGN_BY_UID":"10000113",
      "NAME":"Test 2",
      "GENDER":"m",
      "LEVEL":"1",
      "MESSAGE":"COMPLETE THIS TO BECOME MY FRIEND",
      "STARTED_TIME":"2013-02-09 05:51:55"			
			*/
		
		$result = array('NEW'=>$new_quests_records,'UPDATE'=>$updated_quests);
		////print_r($result);
		$records = $result;
//		echo json_indent(json_encode(array("Record"=>$result)));
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

echo json_indent(json_encode($records));
?>