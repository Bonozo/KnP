<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";

if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
		$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
		$query =   
		   "
		   SELECT KUM.`UID`,KUM.`NAME`,KUM.`GENDER`,KUM.`LEVEL`,KUM.`USER_ID`,DATE_FORMAT(KUM.`LAST_LOGIN`,'%b %d %Y, %h:%i %p') AS LAST_LOGIN ,
		   KUM.`STATUS_MESSAGE`
		   
		   FROM KAP_USER_MAIN KUM 
			WHERE 
			
			KUM.`UID` IN (
			SELECT UID FROM `FRIENDSHIP_MAIN` M WHERE M.FRIEND_UID = :uid AND M.STATUS = 'REQUEST_PENDING'
			)
			AND KUM.`UID` <>:uid
			";

	/*
		   "SELECT KUM.`UID`,KUM.`NAME`,KUM.`GENDER`,KUM.`LEVEL`,KUM.`USER_ID`,DATE_FORMAT(KUM.`LAST_LOGIN`,'%b %d %Y, %h:%i %p') AS LAST_LOGIN ,
		   KUM.`STATUS_MESSAGE`, FM.TIMESTAMP
		   
		   FROM KAP_USER_MAIN KUM LEFT JOIN ON FRIENDSHIP_MAIN FM
			WHERE 
			FM.FRIEND_UID = KUM.UID AND
			KUM.`UID` IN (
			SELECT UID FROM `FRIENDSHIP_MAIN` M WHERE M.FRIEND_UID = :uid AND M.STATUS = 'REQUEST_PENDING'
			)
			AND KUM.`UID` <>:uid";
		*/
			
			
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		$posts = array();
		$counter = 0;
		foreach($res as $post){
			$sql = "SELECT DATE_FORMAT(`TIMESTAMP`,'%b %d, %Y - %h:%i %p') AS `DATETIME` FROM `FRIENDSHIP_MAIN`  
				  WHERE `UID` = :uid AND `FRIEND_UID` = :friend_uid";
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(array(
						':uid'=>$post['UID'],
						':friend_uid'=>$uid)
						);
			$request_time_result = $statement->fetchAll(PDO::FETCH_ASSOC);
			
			$posts[$counter]['UID'] = $post['UID'];
			$posts[$counter]['NAME'] = $post['NAME'];
			$posts[$counter]['GENDER'] = $post['GENDER'];
			$posts[$counter]['LEVEL'] = $post['LEVEL'];
			$posts[$counter]['LAST_LOGIN'] = $post['LAST_LOGIN'];
			$posts[$counter]['STATUS_MESSAGE'] = $post['STATUS_MESSAGE'];
			$posts[$counter]['FRIENDS_COUNT'] = getFriendsCount($post['UID']);
			$posts[$counter]['NUM_OF_GOLDS'] = getGold($post['UID']);
			$posts[$counter]['DATETIME'] = $request_time_result[0]['DATETIME'];
			$posts[$counter]['USER_APPEARANCE'] = getAvatarAppearance($post['UID']);
			
			$counter++;
		}
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

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
	$result = $statement->fetchAll(PDO::FETCH_ASSOC);//print_r($result);
	return $result;
}
function getFriendsCount($uid){
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
	if(sizeof($res) == 0){
		return 0;
	}
	return $res[0]['NUM_OF_FRIENDS'];
}
function getGold($uid){
	global $dbObj;
	
	$query =   
		"SELECT TOTAL_UNIT FROM KNP_INVENTORY_TRANSACTION_SUMMARY WHERE UID = :uid AND INV_ID = '10004'";
	
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(array(':uid'=>$uid));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	if(sizeof($res) == 0){
		return 0;
	}
	return $res[0]['TOTAL_UNIT'];
	
}


?>