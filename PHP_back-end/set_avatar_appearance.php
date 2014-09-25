<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
function getNewHistoryId(){
		global $dbObj;
		$sql = "SELECT `HISTORY_ID` FROM `USER_APPEARANCE_INFO_HISTORY` ORDER BY `HISTORY_ID` DESC LIMIT 1";
		$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute();
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		$history_id = (isset($res[0]['HISTORY_ID']))?intval($res[0]['HISTORY_ID']):101;
		return ++$history_id;
}
//error_reporting(E_ALL);
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid,$gender,$hair_id,$face_id,$jewelery_id,$weapon_id,$dress_id,$helmet_id,$shield_id))
	{
		$task_detail_id = 3001;
		$hair_type_id = 501;
		$face_type_id = 502;
		$jewelery_type_id = 503;
		$dress_type_id = 504;
		$weapon_type_id = 505;
		$helmet_type_id = 506;
		$shield_type_id = 507;
		
		$history_id = getNewHistoryId();
		$query = "DELETE FROM `USER_WEAR_INFO` WHERE UID = :uid";
		$params = array(':uid'=>$uid);
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute($params);
		
		if($gender == 'm'){
			$sql = "
					INSERT INTO `USER_WEAR_INFO` (`UID`,`WEAR_TYPE_ID`,`WEAR_ID`)
					VALUES
					(:uid,:hair_type_id,:hair_id),
					(:uid,:face_type_id,:face_id),
					(:uid,:dress_type_id,:dress_id),
					(:uid,:weapon_type_id,:weapon_id),
					(:uid,:helmet_type_id,:helmet_id),
					(:uid,:shield_type_id,:shield_id)
					";
			$params = array(
				':uid'=>$uid,
				':hair_type_id' => $hair_type_id,
				':hair_id' => $hair_id,
				':face_type_id' => $face_type_id,
				':face_id' => $face_id,
				':dress_type_id' => $dress_type_id,
				':dress_id' => $dress_id,
				':weapon_type_id' => $weapon_type_id,
				':weapon_id' => $weapon_id,				
				':helmet_type_id' => $helmet_type_id,
				':helmet_id' => $helmet_id,
				':shield_type_id' => $shield_type_id,
				':shield_id' => $shield_id				
				);
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute($params);
			
			$sql = "
					INSERT INTO `USER_APPEARANCE_INFO_HISTORY` (`HISTORY_ID`,`UID`,`WEAR_TYPE_ID`,`WEAR_ID`)
					VALUES
					(:history_id,:uid,:hair_type_id,:hair_id),
					(:history_id,:uid,:face_type_id,:face_id),
					(:history_id,:uid,:dress_type_id,:dress_id),
					(:history_id,:uid,:weapon_type_id,:weapon_id),
					(:history_id,:uid,:helmet_type_id,:helmet_id),
					(:history_id,:uid,:shield_type_id,:shield_id)
					";
			$params = array(
				':history_id'=>$history_id,
				':uid'=>$uid,
				':hair_type_id' => $hair_type_id,
				':hair_id' => $hair_id,
				':face_type_id' => $face_type_id,
				':face_id' => $face_id,
				':dress_type_id' => $dress_type_id,
				':dress_id' => $dress_id,
				':weapon_type_id' => $weapon_type_id,
				':weapon_id' => $weapon_id,				
				':helmet_type_id' => $helmet_type_id,
				':helmet_id' => $helmet_id,
				':shield_type_id' => $shield_type_id,
				':shield_id' => $shield_id				
				);
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute($params);
			
		}
		else{
			$sql = "
					INSERT INTO `USER_WEAR_INFO` (`UID`,`WEAR_TYPE_ID`,`WEAR_ID`)
					VALUES
					(:uid,:hair_type_id,:hair_id),
					(:uid,:face_type_id,:face_id),
					(:uid,:dress_type_id,:dress_id),
					(:uid,:jewelery_type_id,:jewelery_id)
					";
			$params = array(
				':uid'=>$uid,
				':hair_type_id' => $hair_type_id,
				':hair_id' => $hair_id,
				':face_type_id' => $face_type_id,
				':face_id' => $face_id,
				':dress_type_id' => $dress_type_id,
				':dress_id' => $dress_id,
				':jewelery_type_id' => $jewelery_type_id,
				':jewelery_id' => $jewelery_id				
				);
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute($params);
			
			$sql = "
					INSERT INTO `USER_APPEARANCE_INFO_HISTORY` (`HISTORY_ID`,`UID`,`WEAR_TYPE_ID`,`WEAR_ID`)
					VALUES
					(:history_id,:uid,:hair_type_id,:hair_id),
					(:history_id,:uid,:face_type_id,:face_id),
					(:history_id,:uid,:dress_type_id,:dress_id),
					(:history_id,:uid,:jewelery_type_id,:jewelery_id)
					";
			$params = array(
				':history_id'=>$history_id,
				':uid'=>$uid,
				':hair_type_id' => $hair_type_id,
				':hair_id' => $hair_id,
				':face_type_id' => $face_type_id,
				':face_id' => $face_id,
				':dress_type_id' => $dress_type_id,
				':dress_id' => $dress_id,
				':jewelery_type_id' => $jewelery_type_id,
				':jewelery_id' => $jewelery_id				
				);
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute($params);
		}
		$sql = "
				INSERT INTO `USER_APPEARANCE_CUST_TRACKER` (`UID`,`HISTORY_ID`)
				VALUES
				(:uid,:history_id)
				";
		$params = array(
			':uid'=>$uid,
			':history_id'=>$history_id
			);
		$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute($params);

		$sql = "
				SELECT COUNT(UID) AS 'EXISTS' FROM USER_TASK_DETAILS WHERE UID = :uid AND TASK_DETAIL_ID = :task_detail_id 
				";
		$params = array(
			':uid '=>$uid,
			':task_detail_id'=>$task_detail_id
			);
		$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute($params);
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(intval($res[0]['EXISTS']) == 0){
			$sql = "
					INSERT INTO `USER_TASK_DETAILS` (`UID`,`TASK_DETAIL_ID`,`STATUS`)
					VALUES
					( :uid, :task_detail_id, :status )
					";
			$params = array(
				':uid' => $uid,
				':task_detail_id' => $task_detail_id,
				':status' => 'COMPLETED'
				);
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute($params);
		}
		/*$sql = "
				UPDATE USER_TASK_DETAILS
				SET `STATUS` = 'COMPLETE'
				WHERE UID = :uid AND TASK_DETAIL_ID = :task_detail_id 
		";
		$params = array(
			':uid '=>$uid,
			':task_detail_id'=>$task_detail_id
			);
		$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute($params);*/


		$query = "SELECT `UID`,`NAME`,DATEDIFF(NOW(),`TIMESTAMP`) AS 'ACCOUNT_AGE',`MARITIAL_STATUS`,`LEVEL`,`XP`,`ENERGY`,`EMAIL`,`GENDER`,`STATUS_MESSAGE`,`USER_ID`,`DEVICE_TOKEN` FROM KAP_USER_MAIN WHERE 
		`UID` = :uid";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid' => $uid,
		));
		$basic_info = $statement->fetchAll(PDO::FETCH_ASSOC);//print_r($res);
			//print_r($res);

		////////////////////////////////////////////////////////////
		$query =   
			"SELECT TOTAL_UNIT FROM KNP_INVENTORY_TRANSACTION_SUMMARY WHERE UID = :uid AND INV_ID = '10004'";
		
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res5 = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		if(sizeof($res5) == 0){
			$res5[] = array("TOTAL_UNIT" => "0");
		}
		////////////////////////////////////////////////////////////

		$query =   
		   "SELECT uwt.`WEAR_TYPE_ID`,uw.`WEAR_ID`,uw.`IMAGE`,uw.`NAME`
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
		$statement->execute(array(':uid'=>$uid));
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);//print_r($result);
		
		$posts= array();
		foreach($basic_info as $post){
			$posts[0]["UID"] = $post["UID"];
			$posts[0]["NAME"] = $post["NAME"];
			$posts[0]["LEVEL"] = $post["LEVEL"];
			$posts[0]["XP"] = $post["XP"];
			$posts[0]["ENERGY"] = $post["ENERGY"];
			$posts[0]["MARITIAL_STATUS"] = $post["MARITIAL_STATUS"];
			$posts[0]["ACCOUNT_AGE"] = $post["ACCOUNT_AGE"];
			$posts[0]["EMAIL"] = $post["EMAIL"];
			$posts[0]["GENDER"] = $post["GENDER"];
			$posts[0]["STATUS_MESSAGE"] = $post["STATUS_MESSAGE"];
			$posts[0]["USER_ID"] = $post["USER_ID"];
			$posts[0]["DEVICE_TOKEN"] = $post["DEVICE_TOKEN"];
			$posts[0]['NUM_OF_GOLDS'] = $res5[0]['TOTAL_UNIT'];
			$posts[0]["USER_APPEARANCE"] = $result;
		}

		$records = array('Record'=>$posts);//$records = array('Error'=>$posts[0]);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}
?>