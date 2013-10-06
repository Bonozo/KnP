<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";

if(isset($_GET))
{
	$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
	extract($_GET);
	if(isset($uid))
	{
		$query = "
				SELECT 
			IF((
			SELECT 
			COUNT(`MESSAGE_ID`)
			FROM 
			`KNP_MESSAGE_MAIN` 
			WHERE 
			`RECEIVER_UID` = :uid AND 
			`STATUS` = 'UNREAD') > 0,
			'NEW_MESSAGE',
			'NO_MESSAGE')
			AS 
			'MESSAGE', 
			IF((
			SELECT 
			COUNT(`STATUS`)
			FROM
			`FRIENDSHIP_MAIN`
			WHERE
			`FRIEND_UID` = :uid	AND
			`STATUS` = 'REQUEST_PENDING')>0,
			'NEW_REQUEST',
			'NO_REQUEST') 
			AS 
			'REQUEST',
			IF((
			SELECT 
			COUNT(`STATUS`)
			FROM
			`KNP_ASSIGN_QUESTS`
			WHERE
			`ASSIGN_TO_UID` = :uid	AND
			(`STATUS` = 'INCOMPLETE' OR `STATUS` = 'INCOMPLETE_FRIEND'))>0,
			'NEW_QUEST',
			'NO_QUEST') 
			AS 
			'QUEST_ASSIGN',
			IF((
			SELECT 
			COUNT(`INV_TRANS_ID`)
			FROM 
			`KNP_INVENTORY_TRANSACTION` 
			WHERE 
			`BENEFICIARY_UID` = :uid AND 
			`VIEWED` = 'UNSEEN' AND `TRANS_TYPE` LIKE '%GIFT%') > 0,
			'NEW_GIFT',
			'NO_GIFT')
			AS 
			'GIFT',
			IF((SELECT COUNT(TAM.TASK_ID)  FROM KAP_USER_MAIN KUM, TASK_MAIN TAM, TASK_DETAILS TD, `USER_TASK_DETAILS` UTD
			WHERE 
			KUM.`ACTIVE_TASK` = TAM.TASK_ID AND
			TAM.TASK_ID = TD.TASK_ID AND
			UTD.`TASK_DETAIL_ID` = TD.`ID` AND
			UTD.UID = :uid AND
			KUM.UID = :uid) <> (SELECT COUNT(TD.TASK_ID) FROM TASK_DETAILS TD, KAP_USER_MAIN KUM
			WHERE
			TD.TASK_ID = KUM.`ACTIVE_TASK` AND
			KUM.UID = :uid),'NEW_TASK','NO_TASK') AS 'TASKS';
		
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);

		foreach($result as $post){
		$posts[] = $post;
		}
		$records = array('Record'=>$posts);
	}
	else
	{
		$posts = array("Request"=>"Bad Request!");
		$records = array('Error'=>$posts);
	}

}
else
{
	$posts = array("Request"=>"Bad Request!");
	$records = array('Error'=>$posts);
}

echo json_indent(json_encode($records));
?>