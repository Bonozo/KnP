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

		$query = "
				SELECT ID, UID, RECIPE_ID
				FROM USER_COOKING
				WHERE `END_TIME` < NOW( )
				AND `STATUS` = 'ACTIVE'
				AND UID = :uid
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(
				':uid' => $uid
				));
		$records = $statement->fetchAll(PDO::FETCH_ASSOC);
		foreach($records as $record){
			$query = "SELECT RECIPE_ID FROM USER_COOKING_SUMMARY WHERE RECIPE_ID = :recipe_id AND UID = :uid";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(array(
					':recipe_id' => $record['RECIPE_ID'],
					':uid' => $uid
					));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
			if(sizeof($res) == 1){
				$query = "
					UPDATE 
						USER_COOKING_SUMMARY
					SET
						UNIT = UNIT + 1
					WHERE
						RECIPE_ID = :recipe_id AND
						UID = :uid
				";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(array(
						':recipe_id' => $record['RECIPE_ID'],
						':uid' => $uid
						));
			}
			else{
				$query = "INSERT INTO USER_COOKING_SUMMARY (`RECIPE_ID`,`UID`,`UNIT`) VALUES ('".$record['RECIPE_ID']."','".$uid."','1')";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(array(
						':uid' => $uid
						));
			}
		}
		$query = "
				UPDATE 
					`USER_COOKING`
				SET 
					`STATUS` = 'COMPLETED', `END_TIME` = ''
				WHERE 
					`END_TIME` < NOW()
					AND `STATUS` = 'ACTIVE'
					AND UID = :uid 
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(
				':uid' => $uid
				));
		////////////////
		////////////////

		$query =   
		   "SELECT 
				'INVENTORY' AS 'CATEGORY', kits.INV_ID AS 'ID', kii.NAME,kii.DESCRIPTION, kii.REQ_GOLD,kii.IMAGE,kii.TYPE,kii.STATUS,kits.TOTAL_UNIT
			FROM 
				KNP_INVENTORY_TRANSACTION_SUMMARY kits,KAP_USER_MAIN kum, KNP_INVENTORY_ITEMS_MAIN kii 
			WHERE
				kits.UID = kum.UID AND
				kii.INVENTORY_ID = kits.INV_ID AND
				NOT kii.INVENTORY_ID = '10004' AND
				NOT kits.TOTAL_UNIT = '0' AND
				kits.UID = :uid
			UNION
			SELECT 
				'CRAFT' AS 'CATEGORY', kcts.CRAFT_ID AS 'ID',
				kcm.CRAFT_NAME AS 'NAME', kcm.CRAFT_DESCRIPTION AS 'DESCRIPTION', 'N/A' AS 'REQ_GOLD',kcm.IMAGE, 
				kcm.TYPE, kcm.STATUS, kcts.TOTAL_UNIT 
			FROM 
				KNP_CRAFT_TRANSACTION_SUMMARY kcts, KNP_CRAFT_MAIN kcm
			WHERE
				kcts.CRAFT_ID = kcm.CRAFT_ID AND
				NOT kcts.TOTAL_UNIT = '0' AND
				kcts.UID = :uid
			UNION
			SELECT 
				'COOKING' AS 'CATEGORY', RM.RECIPE_ID AS 'ID',
				RM.NAME, RM.DESCRIPTION, 'N/A' AS 'REQ_GOLD',RM.IMAGE, 
				RM.TYPE, RM.STATUS, UCS.UNIT AS 'TOTAL_UNIT' 
			FROM 
				USER_COOKING_SUMMARY UCS, RECIPE_MAIN RM
			WHERE
				UCS.RECIPE_ID = RM.RECIPE_ID AND
				UCS.UNIT <> '0' AND
				UCS.UID = :uid
				";
		
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		$posts = array();
		$counter = 0;
		foreach($res as $post){
			foreach($post as $column_name => $value){
			  $posts[$counter][$column_name] = $value;
			}
			$counter ++;
		}
		
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>