<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);

error_reporting(E_ALL);
ini_set('display_errors', 1);
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
		$sql = "SELECT ACTIVE_TASK FROM KAP_USER_MAIN WHERE UID = :uid";
		$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(
			':uid' => $uid
		));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		$task_id = getCurrentTaskID($uid);//$res[0]['ACTIVE_TASK'];
		
		
		$sql = "
			SELECT TM.TASK_ID, TM.NAME, TM.DESCRIPTION, TD.ID AS 'TASK_DETAIL_ID', TD.TASK, TD.SCREEN, TD.SCREEN_TYPE, TD.ICON_SHADE_LEFT
			FROM `TASK_MAIN` TM, `TASK_DETAILS` TD
			WHERE TM.TASK_ID = TD.TASK_ID
			AND TM.TASK_ID = :task_id
		";
		$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(
			':task_id' => $task_id
		));
		$posts = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		$counter = 0;
		$response = array();
		$details = array();
		foreach($posts as $post){
			$response['TASK_ID'] = $post['TASK_ID'];
			$response['NAME'] = $post['NAME'];
			$response['DESCRIPTION'] = $post['DESCRIPTION'];
			$sql = "SELECT `STATUS` FROM USER_TASK_DETAILS WHERE TASK_DETAIL_ID = '".$post['TASK_DETAIL_ID']."' AND UID = '".$uid."'";
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute();
			$status_info = $statement->fetchAll(PDO::FETCH_ASSOC);

			$details[$counter]['STATUS'] = (isset($status_info[0]['STATUS']))?$status_info[0]['STATUS']:"PENDING";
			
			$details[$counter]['ID'] = $post['TASK_ID'];
			if($post['TASK_DETAIL_ID'] == '3003'){
				$num_of_apples = getNumberOfApples($uid);
				$details[$counter]['TASK'] = $post['TASK'] . " (" . $num_of_apples . "/4)";
			}
			else{
				$details[$counter]['TASK'] = $post['TASK'];
			}
			$details[$counter]['SCREEN'] = $post['SCREEN'];
			$details[$counter]['SCREEN_TYPE'] = $post['SCREEN_TYPE'];
			$details[$counter]['ICON_SHADE_LEFT'] = $post['ICON_SHADE_LEFT'];
			$details[$counter]['TASK_DETAIL_ID'] = $post['TASK_DETAIL_ID'];
			$counter++;
		}
		$res = array();
		$res['TASK_DESCRIPTION'] = $response;
		$res['TASK_DETAILS'] = $details;
		$records = array('Record'=>$res);//$records = array('Error'=>$posts[0]);
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));
}
function getCurrentTaskID($uid){
	global $dbObj;
	$sql = "SELECT ACTIVE_TASK FROM KAP_USER_MAIN WHERE UID = :uid";
	$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(array(
		':uid' => $uid
	));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	$active_task_id = $res[0]['ACTIVE_TASK'];
	$sql = "
		SELECT 
			TD.ID, TM.`NAME` , TD.TASK
		FROM 
			TASK_DETAILS TD, TASK_MAIN TM
		WHERE 
			TM.TASK_ID = TD.TASK_ID AND
			TD.TASK_ID = '".$active_task_id."'
	";
	$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute();
	$task_ids_records = $statement->fetchAll(PDO::FETCH_ASSOC);
	$task_ids = array();
	foreach($task_ids_records as $task_ids_record){
		array_push($task_ids,$task_ids_record['ID']);
	}
	$num_of_tasks = sizeof($task_ids);
	$task_ids = implode("','",$task_ids);
	
	$sql = "
		SELECT 
			COUNT( `UID` ) AS 'COMPLETED_TASKS'
		FROM 
			`USER_TASK_DETAILS`
		WHERE 
			TASK_DETAIL_ID
			IN (
			'".$task_ids."'
			)
			AND UID = '".$uid."'
			AND `STATUS` = 'COMPLETED' 		
	";
	$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute();
	$completed_tasks_count = $statement->fetchAll(PDO::FETCH_ASSOC);
	if(($completed_tasks_count[0]['COMPLETED_TASKS']) == ($num_of_tasks)){
		$sql = "SELECT `TASK_ID` FROM `TASK_MAIN` ORDER BY TASK_ID DESC LIMIT 1";
		$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute();
		$last_task_id = $statement->fetchAll(PDO::FETCH_ASSOC);
		$last_task_id = ($last_task_id[0]['TASK_ID']);
		if($active_task_id <= $last_task_id){
			$active_task_id = $active_task_id +1;
			$sql = "UPDATE KAP_USER_MAIN SET ACTIVE_TASK = '".$active_task_id."' WHERE UID = '".$uid."';";
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute();
		}
	}
	return $active_task_id;
	
	//die("completed_tasks_count : ".$completed_tasks_count[0]['COMPLETED_TASKS']."\nnum_of_tasks:".$num_of_tasks);
}
function getNumberOfApples($uid){
	global $dbObj;
	$apple_inventory_id = 10060;
	$sql = 	"
			SELECT TOTAL_UNIT
			FROM `KNP_INVENTORY_TRANSACTION_SUMMARY`
			WHERE `INV_ID` = :apple_inventory_id
			AND `UID` = :uid
			";
	$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':apple_inventory_id' => $apple_inventory_id,
		':uid' => $uid
		));
	$num_of_apples = $statement->fetchAll(PDO::FETCH_ASSOC);
	if(sizeof($num_of_apples) < 1){
		return 0;
	}
	else{
		return $num_of_apples[0]['TOTAL_UNIT'];
	}
}
?>