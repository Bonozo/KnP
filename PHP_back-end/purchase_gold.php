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
	if(isset($uid,$num_of_golds))
	{
		$query = "
				INSERT INTO 
					`KNP_INVENTORY_TRANSACTION`
				(`BENEFICIARY_UID`,`INVENTORY_ID`,`UNIT_TRANSFER`,`TRANS_TYPE`,`COMMENTS`)  
				
				VALUES 
				( :uid,'10004',:num_of_golds,'GOLD_PURCHASED','Purchase ".$num_of_golds." golds');
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid' => $uid,
			':num_of_golds' => $num_of_golds			
			));
			
		$query = "
				SELECT 
					TOTAL_UNIT 
				FROM 
					KNP_INVENTORY_TRANSACTION_SUMMARY 
				WHERE
					UID = :uid AND 
					INV_ID = '10004';";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid' => $uid
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(sizeof($res) == 0){
			$query = "
			INSERT INTO 
				`KNP_INVENTORY_TRANSACTION_SUMMARY`
			(`UID`,`INV_ID`,`TOTAL_UNIT`,`CONSUMED_UNIT`)
			VALUES
			(:uid,'10004',:num_of_golds,'0')";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':uid' => $uid,
				':num_of_golds' => $num_of_golds
				));
		}
		else{
			$golds = intval($res[0]['TOTAL_UNIT']);
			$golds = $golds + $num_of_golds;
			$query = "
			UPDATE 
				`KNP_INVENTORY_TRANSACTION_SUMMARY` 
			SET 
				`TOTAL_UNIT`=:golds 
			WHERE 
				`UID`=:uid AND 
				`INV_ID`='10004'"; 
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$updated_gold = (int)$golds + (int)$num_of_gold;
			$statement->execute(
			array(
				':uid' => $uid,
				':golds' => $golds
				));
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