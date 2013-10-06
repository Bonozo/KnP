<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
//include "config.php";
//$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
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
			UPDATE 
				`KNP_INVENTORY_TRANSACTION_SUMMARY` 
			SET 
				`TOTAL_UNIT`= TOTAL_UNIT + ".$num_of_golds." 
			WHERE 
				`UID`=:uid AND 
				`INV_ID`='10004'";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid' => $uid
			));
		if($statement->rowCount() == 0){
		//if(sizeof($res) == 0){
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

		$records = array("Message"=>"Successfully purchased!");//$posts;
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
?>'=>$records);
echo json_indent(json_encode($records));
?>