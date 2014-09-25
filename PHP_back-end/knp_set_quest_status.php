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
	if(isset($game_status,$assign_quest_id,$quest_id,$uid,$friend_uid))
	{
		
		$query = "
		UPDATE 
			`KNP_ASSIGN_QUEST_GAMES`
		SET
			`STATUS` = :game_status
			
		WHERE
			`ASSIGN_QUEST_ID` = :assign_quest_id AND
			`QUEST_ID` = :quest_id
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':game_status' => $game_status,
			':assign_quest_id' => $assign_quest_id,
			':quest_id' => $quest_id
			));
		#########################################################################################
		
		#########################################################################################
		$query = "SELECT COUNT(`STATUS`) AS 'NUM_OF_REMAINING_QUESTS' FROM KNP_ASSIGN_QUEST_GAMES 
				WHERE 
				`ASSIGN_QUEST_ID` = :assign_quest_id AND `STATUS` = 'INCOMPLETE'";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(
			':assign_quest_id'=>$assign_quest_id
		));
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);
		if($result[0]['NUM_OF_REMAINING_QUESTS'] == 0){ /*  You have completed all games in this quests  */
			/*
			$assign_quest_id
			*/
			$quest_status = getQuestStatus($assign_quest_id);
			if(strcmp($quest_status,'INCOMPLETE_FRIEND') == 0){
				$query = "
				UPDATE 
					`FRIENDSHIP_MAIN`
				SET
					STATUS = 'FRIENDS'  
				WHERE
					(UID 		= :uid AND 
					FRIEND_UID 	= :friend_uid) OR
					(UID 		= :friend_uid AND 
					FRIEND_UID 	= :uid );
				";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(array(
					':uid'=>$uid,
					':friend_uid'=>$friend_uid
				));
			}
			//rewards earn
			$query = "SELECT KAQG.ASSIGN_QUEST_ID,KAQG.QUEST_ID,KQR.INVENTORY_ID, SUM(KQR.UNIT) AS 'UNIT'
						FROM KNP_ASSIGN_QUEST_GAMES KAQG 
						LEFT JOIN 
						KNP_QUESTS_REWARDS KQR
						ON
						KQR.QUEST_ID = KAQG.QUEST_ID
						WHERE
						KAQG.ASSIGN_QUEST_ID = :assign_quest_id
						GROUP BY KQR.INVENTORY_ID";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(array(
				':assign_quest_id'=>$assign_quest_id
			));
			$result = $statement->fetchAll(PDO::FETCH_ASSOC);
			foreach($result as $row){
				//Inventory transaction
				$query = "
				INSERT INTO 
					`KNP_INVENTORY_TRANSACTION`
						(
						`BENEFICIARY_UID`,
						`ASSIGN_QUEST_ID`,
						`INVENTORY_ID`,
						`UNIT_TRANSFER`,
						`TRANS_TYPE`,
						`COMMENTS`
						) 
					VALUES 
						( 
						:uid,
						:assign_quest_id,
						:inventory_id,
						:unit,
						'QUEST_REWARD',
						'Earned rewards on quest'
						);";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':uid' => $uid,
					':assign_quest_id' => $assign_quest_id,
					':inventory_id' => $row['INVENTORY_ID'],
					':unit' => $row['UNIT']
					));
				updateInventorySummary($uid,$row['INVENTORY_ID']," + ",$row['UNIT']);
			}
			$query = "
				UPDATE 
					`KAP_USER_MAIN` 
				SET 
					`XP`= XP + 100 
				WHERE 
					`UID`=:uid";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':uid' => $uid
				));
			//XP level
			$query = "
				SELECT XP FROM KAP_USER_MAIN WHERE UID = :uid;
					";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':uid' => $uid
				));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
			if(($res[0]['XP'] % 1000) == 0){
				$query = "
					UPDATE 
						`KAP_USER_MAIN` 
					SET 
						`LEVEL`= LEVEL + 1
					WHERE 
						`UID`=:uid";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':uid' => $uid
					));
			}
			else{
				$query = "
					SELECT (XP/1000) AS `LEVEL` FROM KAP_USER_MAIN WHERE UID = :uid;
						";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':uid' => $uid
					));
				$res = $statement->fetchAll(PDO::FETCH_ASSOC);
				$level = substr($res[0]['LEVEL'],0,strpos($res[0]['LEVEL'],"."));
				$query = "
					UPDATE 
						`KAP_USER_MAIN` 
					SET 
						`LEVEL`=:level,
						`ENERGY` = ENERGY - 100
					WHERE 
						`UID`=:uid";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':uid' => $uid,
					':level' => $level
					));
			}//END XP LEVEL
			
			$query = "
					UPDATE `KNP_ASSIGN_QUESTS` SET `STATUS` = :status, COMPLETION_TIME = NOW() WHERE `ASSIGN_QUEST_ID`=:assign_quest_id;
					";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':status' => 'COMPLETE',
				':assign_quest_id'=>$assign_quest_id
				));
			if($statement->rowCount() > 0)
			{
				$posts[] = array("Message"=>"Updated!");
				$query = "
					SELECT kqm.QUEST_NAME, GROUP_CONCAT(kiim.NAME, CONCAT(':',kqr.UNIT)) AS 'REWARDS' 
					FROM
					KNP_QUESTS_MAIN kqm, KNP_QUESTS_REWARDS kqr, KNP_INVENTORY_ITEMS_MAIN kiim
					WHERE
					kqr.QUEST_ID = kqm.QUEST_ID AND
					kqr.INVENTORY_ID = kiim.INVENTORY_ID AND
					kqm.QUEST_ID = :quest_id
					GROUP BY
					kqm.QUEST_ID";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(
					array(
						':quest_id' => $quest_id
						));
					$res = $statement->fetchAll(PDO::FETCH_ASSOC);
					//print_r($res);
					$counter = 0;
					foreach($res as $post){
						$posts[$counter]['QUEST_NAME'] = $post['QUEST_NAME'];
						$rewards = $post['REWARDS'];
						$reward = explode(",",$rewards);
						foreach($reward as $inventory){
						  $key_value = explode(":",$inventory);
						  $posts[$counter][$key_value[0]] = $key_value[1];
						}
					}
					//print_r($posts);
					//$posts[] = $posts;

			}
			else
				$posts[] = array("Message"=>"Something went wrong!");

			$records = $posts;
			
		}
		else{
			$posts[] = array("Message"=>"Updated!");
			$rewards = getQuestsRewards($assign_quest_id);
			foreach($rewards['REC'] as $inv_id => $units){
				updateInventorySummary($uid,$inv_id," + ",$units);
			}
			$query = "
				SELECT kqm.QUEST_NAME, GROUP_CONCAT(kiim.NAME, CONCAT(':',kqr.UNIT)) AS 'REWARDS' 
				FROM
				KNP_QUESTS_MAIN kqm, KNP_QUESTS_REWARDS kqr, KNP_INVENTORY_ITEMS_MAIN kiim
				WHERE
				kqr.QUEST_ID = kqm.QUEST_ID AND
				kqr.INVENTORY_ID = kiim.INVENTORY_ID AND
				kqm.QUEST_ID = :quest_id
				GROUP BY
				kqm.QUEST_ID";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':quest_id' => $quest_id
				));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
			//print_r($res);
			$counter = 0;
			foreach($res as $post){
				$posts[$counter]['QUEST_NAME'] = $post['QUEST_NAME'];
				$rewards = $post['REWARDS'];
				$reward = explode(",",$rewards);
				foreach($reward as $inventory){
				  $key_value = explode(":",$inventory);
				  $posts[$counter][$key_value[0]] = $key_value[1];
				}
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

function getQuestStatus($assign_quest_id){
	global $dbObj;
	$query = "SELECT `STATUS` FROM `KNP_ASSIGN_QUESTS` WHERE `ASSIGN_QUEST_ID` = '".$assign_quest_id."'";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute();
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	return $res[0]['STATUS'];
}

function getQuestsRewards($assign_quest_id){
	global $dbObj;
	$query = "
			SELECT 
				kaq.ASSIGN_QUEST_ID, kqm.QUEST_NAME, kqr.QUEST_ID,GROUP_CONCAT(kiim.INVENTORY_ID, CONCAT(':',kqr.UNIT)) AS 'REWARDS'
			FROM 
				KNP_ASSIGN_QUESTS kaq, KNP_QUESTS_MAIN kqm, KNP_QUESTS_REWARDS kqr, KNP_INVENTORY_ITEMS_MAIN kiim
			WHERE 
				kiim.INVENTORY_ID = kqr.INVENTORY_ID AND
				kaq.ASSIGN_QUEST_ID = :assign_quest_id
			GROUP BY 
				kaq.ASSIGN_QUEST_ID;";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':assign_quest_id' => $assign_quest_id
		));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	
	$counter = 0;
	foreach($res as $post){
		$posts[$counter]['ASSIGN_QUEST_ID'] = $post['ASSIGN_QUEST_ID'];
		$posts[$counter]['QUEST_NAME'] = $post['QUEST_NAME'];
		$posts[$counter]['QUEST_ID'] = $post['QUEST_ID'];
		$rewards = $post['REWARDS'];
		$reward = explode(",",$rewards);
		foreach($reward as $inventory){
		  $key_value = explode(":",$inventory);
		  $posts[$counter]['REC'][$key_value[0]] = $key_value[1];
		}
	}
	return $posts;
}
function updateInventorySummary($uid,$inv_id,$operation,$unit){
	global $dbObj;
	$query = "
		UPDATE 
			`KNP_INVENTORY_TRANSACTION_SUMMARY` 
		SET 
			`TOTAL_UNIT`= TOTAL_UNIT ".$operation." ".$unit." 
		WHERE 
			`UID`=:uid AND 
			`INV_ID`=:inv_id";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':uid' => $uid,
		':inv_id' => $inv_id
		));
	if($statement->rowCount() == 0){
		$query = "
		INSERT INTO 
			`KNP_INVENTORY_TRANSACTION_SUMMARY`
		(`UID`,`INV_ID`,`TOTAL_UNIT`,`CONSUMED_UNIT`)
		VALUES
		(:uid,:inv_id,:unit,'0')";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid' => $uid,
			':inv_id' => $inv_id,
			':unit' => $unit
			));
	}
}
?>