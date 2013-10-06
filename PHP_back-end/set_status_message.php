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
	if(isset($uid,$set_status))
	{
		$task_detail_id = 3002;
		$set_status = urldecode($set_status);
		$query1 = "UPDATE `KAP_USER_MAIN` SET STATUS_MESSAGE = '".$set_status."' WHERE `UID`= :uid";
		$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement1->execute(array(
		':uid'=>$uid
		));
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