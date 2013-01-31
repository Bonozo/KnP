<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
//$union = array_unique(array_merge($a, $b));

if(isset($_GET))
{
	extract($_GET);
	if(isset($uid,$craft_id))
	{
		$name = "";
		$num_of_friends = "";
		$quest_id = "";
		$is_completed = "";
		
		$query = "
			SELECT 
			IF((SELECT 
					COUNT(kci.INGREDIENT_ID) AS 'AVAILABLE_INS'
				FROM 
					KNP_CRAFT_INGREDIENT kci
				LEFT JOIN 
					KNP_INVENTORY_TRANSACTION_SUMMARY kits 
				ON
					kits.INV_ID = kci.INVENTORY_ID 
				WHERE
					kci.CRAFT_ID = :craft_id AND
					kits.UID = :uid AND
					kci.UNIT <= kits.TOTAL_UNIT) 
				= 
				(SELECT 
					COUNT(INGREDIENT_ID) AS 'REQ_INVS' 
				FROM 
					KNP_CRAFT_INGREDIENT 
				WHERE 
					CRAFT_ID = :craft_id),
			'YES','NO') 
			AS 'ELIGIBLE'
			
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid' => $uid,
			':craft_id' => $craft_id
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		if($res[0]['ELIGIBLE'] == "YES"){
			$query = "SELECT INVENTORY_ID,UNIT FROM KNP_CRAFT_INGREDIENT WHERE CRAFT_ID = :craft_id";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':craft_id' => $craft_id,
				));
			$inv_res = $statement->fetchAll(PDO::FETCH_ASSOC);
			foreach($inv_res as $inv_id){
				$query = 
				"INSERT INTO 
					`KNP_INVENTORY_TRANSACTION`
					(`DONAR_UID`,`INVENTORY_ID`, `UNIT_TRANSFER`, `TRANS_TYPE`,`COMMENTS`) 
					VALUES 
					( :uid, :inv_id, :unit, 'CONSUME', 'Consumed inventory to create craft.');
				";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':uid' => $uid,
					':inv_id' => $inv_id['INVENTORY_ID'],
					':unit' => $inv_id['UNIT']
					));
				$query = "
						UPDATE 
							`KNP_INVENTORY_TRANSACTION_SUMMARY` 
						SET 
							TOTAL_UNIT = TOTAL_UNIT - ".$inv_id['UNIT']."
						WHERE
							uid = :uid AND
							inv_id = :inv_id";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':uid' => $uid,
					':inv_id' => $inv_id['INVENTORY_ID']
					));
				
				//Golds deduction
				$gold_units = intval($res[0]['TOTAL_UNIT']);
				$remaining_golds = (int)$gold_units - (int)$req_golds;

			}
			//BENEFICIARY debit entry
			$query = 
			"INSERT INTO 
				`KNP_INVENTORY_TRANSACTION`
				(`BENEFICIARY_UID`,`CRAFT_ID`, `UNIT_TRANSFER`, `TRANS_TYPE`,`COMMENTS`) 
				VALUES 
				( :uid, :craft_id, '1', 'CRAFT', 'Inventory crafted.');
			";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':uid' => $uid,
				':craft_id' => $craft_id
				));
			
			//update or add craft in summary account
			$query = "
			UPDATE 
				`KNP_CRAFT_TRANSACTION_SUMMARY` 
			SET 
				TOTAL_UNIT = TOTAL_UNIT + 1
			WHERE
				UID = :uid AND
				CRAFT_ID = :craft_id
			";
			
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':uid' => $uid,
				':craft_id' => $craft_id
				));

			if($statement->rowCount() == 0){
				$query = 
				"INSERT INTO KNP_CRAFT_TRANSACTION_SUMMARY 
				(`UID`,`CRAFT_ID`,`TOTAL_UNIT`,`CONSUMED_UNIT`) 
				VALUES 
				( :uid, :craft_id, '1', '0');
				";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':uid' => $uid,
					':craft_id' => $craft_id
					));
			}
			$posts = array('Message'=> "Craft created successfully!");
			
		}
		else{
			$posts = array('Error'=> "Insufficient inventories to create this craft!");
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
?>