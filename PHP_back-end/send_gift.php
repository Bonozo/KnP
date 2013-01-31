<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
if(isset($_GET))
{
	extract($_GET);
	if(isset($sender_id,$receiver_id,$gift_type,$gift_id))//($sender_id,$receiver_id,$gift_type,$gift_id))
	{
		$query = "";
		if(strcmp($gift_type,'CRAFT') == 0){
			$query = "SELECT IF((SELECT TOTAL_UNIT FROM KNP_CRAFT_TRANSACTION_SUMMARY WHERE UID = :sender_id AND CRAFT_ID = :gift_id) > 0,
			'AVAILABLE','NOT_AVAILABLE') AS 'CRAFT'";
		}
		else if(strcmp($gift_type,'INVENTORY') == 0){
			$query = "SELECT IF((SELECT TOTAL_UNIT FROM KNP_INVENTORY_TRANSACTION_SUMMARY WHERE UID = :sender_id AND INV_ID = :gift_id) > 0,
			'AVAILABLE','NOT_AVAILABLE') AS 'INVENTORY'";
		}
		if($query <> ""){
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(array(':sender_id'=>$sender_id,':gift_id'=>$gift_id));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
			if(strcmp($res[0][$gift_type],'AVAILABLE') == 0){
				if(strcmp($gift_type,'CRAFT') == 0){
					/*
					 * CRAFT
					 */
					$query = "INSERT INTO
					 `KNP_INVENTORY_TRANSACTION`
					 (`DONAR_UID`,
					 `BENEFICIARY_UID`,
					 `CRAFT_ID`,
					 `UNIT_TRANSFER`,
					 `TRANS_TYPE`,
					 `COMMENTS`) 
					VALUES 
					 (:sender_id,
 					  :receiver_id,
					  :gift_id,
					 '1',
					 'GIFT_CRAFT',
					 'Craft send as gift')";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(array(
					':sender_id'=>$sender_id,
					':receiver_id'=>$receiver_id,
					':gift_id'=>$gift_id
					));
					if($dbObj->lastInsertId() != "" && $dbObj->lastInsertId() != NULL && $dbObj->lastInsertId() != 0){
						$query = "
						UPDATE 
							`KNP_CRAFT_TRANSACTION_SUMMARY` 
						SET 
							TOTAL_UNIT = TOTAL_UNIT - 1
						WHERE
							UID = :sender_id AND
							CRAFT_ID = :gift_id
						";
						
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':sender_id' => $sender_id,
							':gift_id' => $gift_id
							));
						
						$query = "
						UPDATE 
							`KNP_CRAFT_TRANSACTION_SUMMARY` 
						SET 
							TOTAL_UNIT = TOTAL_UNIT + 1
						WHERE
							UID = :receiver_id AND
							CRAFT_ID = :gift_id;
						";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':receiver_id' => $receiver_id,
							':gift_id' => $gift_id
							));

						if($statement->rowCount() == 0){
							$query = 
							"INSERT INTO KNP_CRAFT_TRANSACTION_SUMMARY 
							(`UID`,`CRAFT_ID`,`TOTAL_UNIT`,`CONSUMED_UNIT`) 
							VALUES 
							( :receiver_id, :gift_id, '1', '0');
							";
							$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement->execute(
							array(
								':receiver_id' => $receiver_id,
								':gift_id' => $gift_id
								));
							
						}
						$query = "
						INSERT INTO 
							`KNP_MESSAGE_MAIN`
								(`SENDER_UID`,
								`RECEIVER_UID`,
								`MESSAGE_TEXT`,
								`STATUS`) 
							VALUES 
								(:sender_id,
								 :receiver_id,
								 'YOUR FREIND HAS RECEIVED GIFT!',
								 'UNREAD') 
						";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':sender_id' => $sender_id,
							':receiver_id' => $receiver_id
							));
						$records = array("Message"=>"Gift successfully sent!");
					}
					else{
						$records = array("Message"=>"Transaction NOT committed!");
					}
				}
				else if(strcmp($gift_type,'INVENTORY') == 0){
					/*
					 * INVENTORY
					 */
					$query = "INSERT INTO
					 `KNP_INVENTORY_TRANSACTION`
					 (`DONAR_UID`,
					 `BENEFICIARY_UID`,
					 `INVENTORY_ID`,
					 `UNIT_TRANSFER`,
					 `TRANS_TYPE`,
					 `COMMENTS`) 
					VALUES 
					 (:sender_id,
 					  :receiver_id,
					  :gift_id,
					 '1',
					 'GIFT_INVENTORY',
					 'Inventory send as gift')";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(array(
					':sender_id'=>$sender_id,
					':receiver_id'=>$receiver_id,
					':gift_id'=>$gift_id
					));
					if($dbObj->lastInsertId() != "" && $dbObj->lastInsertId() != NULL && $dbObj->lastInsertId() != 0){
						$query = "
						UPDATE 
							`KNP_INVENTORY_TRANSACTION_SUMMARY` 
						SET 
							TOTAL_UNIT = TOTAL_UNIT - 1
						WHERE
							UID = :sender_id AND
							INV_ID = :gift_id
						";
						
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':sender_id' => $sender_id,
							':gift_id' => $gift_id
							));
						
						$query = "
						UPDATE 
							`KNP_INVENTORY_TRANSACTION_SUMMARY` 
						SET 
							TOTAL_UNIT = TOTAL_UNIT + 1
						WHERE
							UID = :receiver_id AND
							INV_ID = :gift_id;
						";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':receiver_id' => $receiver_id,
							':gift_id' => $gift_id
							));

						if($statement->rowCount() == 0){
							$query = 
							"INSERT INTO KNP_INVENTORY_TRANSACTION_SUMMARY 
							(`UID`,`INV_ID`,`TOTAL_UNIT`,`CONSUMED_UNIT`) 
							VALUES 
							( :receiver_id, :gift_id, '1', '0');
							";
							$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement->execute(
							array(
								':receiver_id' => $receiver_id,
								':gift_id' => $gift_id
								));
							
						}
						$query = "
						INSERT INTO 
							`KNP_MESSAGE_MAIN`
								(`SENDER_UID`,
								`RECEIVER_UID`,
								`MESSAGE_TEXT`,
								`STATUS`) 
							VALUES 
								(:sender_id,
								 :receiver_id,
								 'YOUR FREIND HAS RECEIVED GIFT!',
								 'UNREAD') 
						";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':sender_id' => $sender_id,
							':receiver_id' => $receiver_id
							));
						$records = array("Message"=>"Gift successfully sent!");
					}
					else{
						$records = array("Message"=>"Transaction NOT committed!");
					}
				}
			}
			else{
				$records = array("Message"=>"You do not more longer this item to gift.");
			}
		}
		else
		{
			$records = array("Message"=>"Operation failed. Unknown gift type");
		}
	}
	else
	{
		$records = array("Request"=>"Bad Request!");
	}

}
else
{
	$records = array("Request"=>"Bad Request!");
}

echo json_indent(json_encode($records));
function GiftCraft(){
	
}
?>