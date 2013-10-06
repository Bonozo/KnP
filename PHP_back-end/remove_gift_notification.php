<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
if(isset($_GET))
{
	extract($_GET);
	if(isset($inv_trans_id))
	{
		$query1 = "UPDATE `KNP_INVENTORY_TRANSACTION` SET `STATUS` = 'REMOVED' WHERE `INV_TRANS_ID`= :inv_trans_id";
		$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement1->execute(array(
		':inv_trans_id'=>$inv_trans_id
		));
		$records = array("Message"=>"Notification successfully removed!");//$posts;
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