<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
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


		$query = "
				SELECT UC.ID, UC.RECIPE_ID, DATE_FORMAT(UC.START_TIME,'%b %d %Y %h:%i %p')  AS START_TIME, TIMEDIFF(UC.END_TIME,NOW()) AS 'REMAINING_TIME',UC.STATUS, RM.NAME, RM.DESCRIPTION 
				FROM `USER_COOKING` UC, `RECIPE_MAIN` RM 
				WHERE UC.RECIPE_ID = RM.RECIPE_ID 
				AND UC.UID = :uid 
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(
				':uid' => $uid
				));
		$records = $statement->fetchAll(PDO::FETCH_ASSOC);
		$counter = 0;
		foreach($records as $record){
			$posts[$counter]['ID'] = $record['ID'];
			$posts[$counter]['RECIPE_ID'] = $record['RECIPE_ID'];
			$posts[$counter]['START_TIME'] = $record['START_TIME'];
			$posts[$counter]['REMAINING_TIME'] = $record['REMAINING_TIME'];
			$posts[$counter]['STATUS'] = $record['STATUS'];
			$posts[$counter]['NAME'] = $record['NAME'];
			$posts[$counter]['DESCRIPTION'] = $record['DESCRIPTION'];
			$counter++;
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