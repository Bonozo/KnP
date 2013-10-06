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
	if(isset($uid,$recipe_id))
	{
		$query = "
				SELECT KIIM.INVENTORY_ID, RCI.AMMOUNT, RCI.CALC_UNIT, KIIM.NAME, KIIM.IMAGE
				FROM `RECIPE_INGRIDIENTS` RCI, `KNP_INVENTORY_ITEMS_MAIN` KIIM
				WHERE RCI.INGREDIENT_ID = KIIM.INVENTORY_ID
				AND RCI.RECIPE_ID = :recipe_id		
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':recipe_id'=>$recipe_id));
		$ingedients = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		$req_inventories = array();
		
		
		foreach($ingedients as $ingedient){
			$posts[] = $ingedient;
			$req_inventories[$ingedient['INVENTORY_ID']] = $ingedient['AMMOUNT'];
		}
		$available = true;
		//Verfication of ingredients' availablity
		foreach($req_inventories as $ingredient_id => $amount){
			$query = "SELECT IF((SELECT TOTAL_UNIT FROM KNP_INVENTORY_TRANSACTION_SUMMARY WHERE UID = :uid AND INV_ID = :ingredient_id) >= :amount,
				'AVAILABLE','NOT_AVAILABLE') AS 'INGREDIENT'";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(array(':uid'=>$uid, 'ingredient_id'=>$ingredient_id, 'amount'=>$amount));
			$result = $statement->fetchAll(PDO::FETCH_ASSOC);
			if(strcmp($result[0]['INGREDIENT'],'NOT_AVAILABLE') == 0){
				$available = false;
				break;
			}
		}
		if($available){
			foreach($req_inventories as $ingredient_id => $amount){
				$query = "INSERT INTO
				 `KNP_INVENTORY_TRANSACTION`
				 (`DONAR_UID`,
				  `INVENTORY_ID`,
				  `UNIT_TRANSFER`,
				  `TRANS_TYPE`,
				  `COMMENTS`) 
				VALUES 
				 (:uid,
				  :ingredient_id,
				  :amount,
				  'COOKING',
				  'Inventory consumed for cooking.')";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(array(
				':uid'=>$uid,
				':ingredient_id'=>$ingredient_id,
				':amount'=>$amount
				));
				if($dbObj->lastInsertId() != "" && $dbObj->lastInsertId() != NULL && $dbObj->lastInsertId() != 0){
					$query = "
					UPDATE 
						`KNP_INVENTORY_TRANSACTION_SUMMARY` 
					SET 
						TOTAL_UNIT = TOTAL_UNIT - ".$amount."
					WHERE
						UID = :uid AND
						INV_ID = :ingredient_id
					";
					
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(
					array(
						':uid' => $uid,
						':ingredient_id' => $ingredient_id
						));
				}
			}//End Foreach
			$query = "SELECT `NAME`,`TIME_DURATION` FROM `RECIPE_MAIN` WHERE `RECIPE_ID` = :recipe_id";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(array(':recipe_id'=>$recipe_id));
			$records = $statement->fetchAll(PDO::FETCH_ASSOC);
		
			$recipe_name = $records[0]['NAME'];
			$time_duration = $records[0]['TIME_DURATION'];
		
			$timestamp = strtotime(date('Y-m-d H:i:s')) + intval($time_duration);
			$completion_time = date('Y-m-d H:i:s', $timestamp);
			$query = "
					INSERT INTO `knp`.`USER_COOKING` (
					`UID` ,
					`RECIPE_ID` ,
					`END_TIME` ,
					`STATUS`
					)
					VALUES (
					:uid, 
					:recipe_id,
					:completion_time, 
					'ACTIVE'
					);
					";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
				array(
					':uid' => $uid,
					':recipe_id'=>$recipe_id,
					':completion_time' => $completion_time
					));
			$cooking_id = $dbObj->lastInsertId();
			$posts = array("Message"=>"Cooking started!", "COOKING_ID"=>$cooking_id, "RECIPE_NAME" => $recipe_name);
			$records = array('Record'=>$posts);//$records = array('Error'=>$posts[0]);
		}//end if
		else{
			$posts = array("Message"=>"Insufficient ingredients to bake this item!", "COOKING_ID"=>$cooking_id, "RECIPE_NAME" => $recipe_name);
			$records = array('Record'=>$posts);//$records = array('Error'=>$posts[0]);
		}
		//print_r($req_inventories);
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}
?>