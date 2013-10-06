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
		if($gold == '1'){
			$query =   
				"SELECT 
				kup.`UID`,kup.`NAME`,kup.`GENDER`,kup.`LEVEL`, kup.`STATUS_MESSAGE`,kup.`USER_ID`, DATE_FORMAT(kup.`LAST_LOGIN`,'%b %d %Y, %h:%i %p') AS LAST_LOGIN, kits.TOTAL_UNIT
AS 'NUM_OF_GOLDS' FROM KAP_USER_MAIN kup
				LEFT JOIN
					KNP_INVENTORY_TRANSACTION_SUMMARY kits
				ON
					kup.UID = kits.UID 
				WHERE kup.`UID` <> :uid AND kits.INV_ID = :inv_id 
				ORDER BY 
					kits.TOTAL_UNIT DESC

				";
				$params = array(
							':inv_id'=>'10004',
							':uid'=>$uid
							);
			
		}
		else{
			$query =   
				"SELECT `UID`,`NAME`,`GENDER`, `LEVEL`, `STATUS_MESSAGE`,`USER_ID`,DATE_FORMAT(`LAST_LOGIN`,'%b %d %Y, %h:%i %p') AS LAST_LOGIN
				FROM KAP_USER_MAIN 
				WHERE 
				`UID` NOT IN (
				   SELECT FRIEND_UID FROM `FRIENDSHIP_MAIN` M WHERE M.UID = :uid AND M.STATUS = 'FRIENDS' AND friend_uid<>:uid
				) 
				AND UID <>:uid 
				AND UID NOT IN (
				   SELECT UID FROM `FRIENDSHIP_MAIN` M WHERE M.FRIEND_UID = :uid AND M.STATUS = 'FRIENDS'
				)
				";
			if(isset($gender)){
				$gender_clause = " AND `GENDER` = :gender ";
				$params = array(':uid'=>$uid,':gender'=>$gender);
			}
			else{
				$gender_clause = "";
				$params = array(':uid'=>$uid);
			}
			$query .= $gender_clause;
		}
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute($params);
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);

		$counter = 0;
		foreach($res as $post){
		$posts[$counter]['UID'] = $post['UID'];
		$posts[$counter]['NAME'] = $post['NAME'];
		$posts[$counter]['GENDER'] = $post['GENDER'];
		$posts[$counter]['LEVEL'] = $post['LEVEL'];
		$posts[$counter]['USER_ID'] = $post['USER_ID'];
		$posts[$counter]['LAST_LOGIN'] = $post['LAST_LOGIN'];
		$posts[$counter]['STATUS_MESSAGE'] = $post['STATUS_MESSAGE'];
		$posts[$counter]['FRIENDS_COUNT'] = getFriendsCount($post['UID']);
		$posts[$counter]['USER_APPEARANCE'] = getAvatarAppearance($post['UID']);
		  
		  if(isset($post['NUM_OF_GOLDS']))
			  $posts[$counter]['NUM_OF_GOLDS'] = $post['NUM_OF_GOLDS'];
		  else
		  	   $posts[$counter]['NUM_OF_GOLDS'] = getGold($post['UID']);
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

?>