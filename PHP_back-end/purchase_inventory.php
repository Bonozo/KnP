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
	if(isset($uid,$inv_id,$req_golds, $units))
	{
		$apple_inventory_id = 10060;
		$num_of_required_apple = 4;
		$task_detail_id = 3003;
		$task_1 = 1001;
		
		$name = "";
		$num_of_friends = "";
		$quest_id = "";
		$is_completed = "";
		
		$query = "
			SELECT IF((SELECT 
				kits.TOTAL_UNIT AS 'UNIT'
				FROM 
				KNP_INVENTORY_TRANSACTION_SUMMARY kits 
				WHERE 
				kits.UID = :uid AND 
				kits.INV_ID = '10004')
				>=
				:req_golds,
			'YES','NO') AS 'ELIGIBLE'
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid' => $uid,
			':req_golds' => $req_golds
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		if($res[0]['ELIGIBLE'] == "YES"){
			$query = 
			"INSERT INTO 
				`KNP_INVENTORY_TRANSACTION`
				(`DONAR_UID`,`INVENTORY_ID`, `UNIT_TRANSFER`, `TRANS_TYPE`,`COMMENTS`) 
				VALUES 
				( :uid,'10004',:req_golds, 'INVENTORY_PURCHASE',
				'Withdrew ".$req_golds." golds to purchase inventory');
			INSERT INTO
				`KNP_INVENTORY_TRANSACTION`
				(`BENEFICIARY_UID`,`INVENTORY_ID`,`UNIT_TRANSFER`,`TRANS_TYPE`,`COMMENTS`)
				VALUES 
				( :uid,:inv_id,:units,'INVENTORY_PURCHASE','Inventory Purchased');
			";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':uid' => $uid,
				':inv_id' => $inv_id,
				':units' => $units,
				':req_golds' => $req_golds
				));

			$query = "
					SELECT TOTAL_UNIT FROM `KNP_INVENTORY_TRANSACTION_SUMMARY` WHERE INV_ID = '10004' AND UID = :uid
					UNION
					SELECT TOTAL_UNIT FROM `KNP_INVENTORY_TRANSACTION_SUMMARY` WHERE INV_ID = :inv_id AND UID = :uid
					";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':inv_id' => $inv_id,
				':uid' => $uid
				));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
			
			//Golds deduction
			$gold_units = intval($res[0]['TOTAL_UNIT']);
			$remaining_golds = (int)$gold_units - (int)$req_golds;
			
			//UPDATE
			$query = "
			UPDATE 
				`KNP_INVENTORY_TRANSACTION_SUMMARY` 
			SET 
				`TOTAL_UNIT`=:remaining_golds
			WHERE 
				`UID`=:uid AND 
				`INV_ID` = '10004';
			";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':remaining_golds' => $remaining_golds,
				':uid' => $uid
				));

			//Inventory addition
			if(sizeof($res) == 1){
				//INSERT
				$query = "INSERT INTO 
					`KNP_INVENTORY_TRANSACTION_SUMMARY`
						(`UID`,`INV_ID`,`TOTAL_UNIT`,`CONSUMED_UNIT`) 
					VALUES 
						( :uid,:inv_id,:units,'0');";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':inv_id' => $inv_id,
					':units' => $units,
					':uid' => $uid
					));
				
			}
			else{
				$inv_units = intval($res[1]['TOTAL_UNIT']);
				$inv_units = (int)$inv_units + (int)$units;
				
				$query = "
				UPDATE 
					`KNP_INVENTORY_TRANSACTION_SUMMARY` 
				SET 
					`TOTAL_UNIT`=:inv_units
				WHERE 
					`UID`=:uid AND 
					`INV_ID` = :inv_id;
				";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':inv_units' => $inv_units,
					':inv_id' => $inv_id,
					':uid' => $uid
					));
			}
			/*Checking for task 1*/
			$sql = "SELECT ACTIVE_TASK FROM KAP_USER_MAIN WHERE UID = :uid";
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':uid' => $uid
				));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
			if(doubleval($res[0]['ACTIVE_TASK']) == $task_1){
				$sql = 	"
						SELECT COUNT( UID ) AS 'TASK_COMPLETED'
						FROM `KNP_INVENTORY_TRANSACTION_SUMMARY`
						WHERE `INV_ID` = :apple_inventory_id
						AND `UID` = :uid
						AND TOTAL_UNIT >= :num_of_required_apple
						";
				$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':apple_inventory_id' => $apple_inventory_id,
					':uid' => $uid,
					':num_of_required_apple' => $num_of_required_apple
					));
				$res = $statement->fetchAll(PDO::FETCH_ASSOC);
				if(intval($res[0]['TASK_COMPLETED']) == 1){ // apple purchased or already have it
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
				}
			}
			$posts = array('Message'=> "Successfully purchased!");
			$records = $posts;

		}
		else{
			$posts = array('Message'=> "Insufficient gold to purchase this inventory!");
		}
		$records = $posts;
	}
	else
	{
		$posts = array('Message'=>"Please upgrade your KnP version to purchase inventory!");
		$records = $posts;
	}
}
else
{
	$records = array('Error'=>"Bad Request!");
}
$records = array('Record'=>$records);

echo json_indent(json_encode($records));
?>