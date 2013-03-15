<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid,$set_status))
	{
		$set_status = urldecode($set_status);
		$query1 = "UPDATE `KAP_USER_MAIN` SET STATUS_MESSAGE = '".$set_status."' WHERE `UID`= :uid";
		$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement1->execute(array(
		':uid'=>$uid
		));
		$records = array("Message"=>"Successfully updated!");//$posts;

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