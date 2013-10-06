<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
include "config.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
//$union = array_unique(array_merge($a, $b));
$key = "tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW"; //APP KEY
$cloud_password = "admin";
$tmp_fname = 'cookie.txt';
/*
http://therealmattharmon.com/knp/knp_assign_quests.php?
assign_by_uid=10000002&
assign_to_uid=10000007&
quest_ids=80000001&
message=hello...&
num_of_hours=1&
status=INCOMPLETE
*/
$channel    = "alert";
$message    = "You have recieved a Quest from '";
$title      = "Knights And Princesses";
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid, $assign_quest_id, $inv_id, $qty))
	{
		$query = "
				INSERT INTO 
					`KNP_INVENTORY_TRANSACTION`
				(`BENEFICIARY_UID`,`ASSIGN_QUEST_ID`,`INVENTORY_ID`,`UNIT_TRANSFER`,`TRANS_TYPE`,`COMMENTS`)  
				VALUES 
				( :uid, :assign_quest_id, :inv_id, :qty,'QUEST_REWARD','Earned rewards in quest.');
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid' => $uid,
			':assign_quest_id' => $assign_quest_id,
			':inv_id' => $inv_id,
			':qty' => $qty			
			));
		
		$query = "
			UPDATE 
				`KNP_INVENTORY_TRANSACTION_SUMMARY` 
			SET 
				`TOTAL_UNIT`= TOTAL_UNIT + ".$qty." 
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
			(:uid,:inv_id,:qty,'0')";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':uid' => $uid,
				':inv_id' => $inv_id,
				':qty' => $qty
				));
		}
		$records = array("Message"=>"Successfully earned rewards!");
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
