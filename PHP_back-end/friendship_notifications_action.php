<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
error_reporting(E_ALL);
$task_detail_id = 3004;   
$task_1 = 1001;
//uid=1001&friend_uid=1002&action=denied 
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid) && isset($friend_uid) && isset($action))
	{
		$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
		
		$query = 	"SELECT `STATUS` FROM `FRIENDSHIP_MAIN` 
					WHERE `UID` = :uid AND `FRIEND_UID` = :friend_uid
					";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid,':friend_uid'=>$friend_uid));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		$posts = NULL;
		
		foreach($res as $post){
		  $posts[] = $post;
		}
		if($posts != NULL){
			$query =   
			   "UPDATE 
				   `FRIENDSHIP_MAIN` 
			   SET 
				   `STATUS`=:action
			   WHERE 
				   `UID`=:uid AND 
				   `FRIEND_UID`=:friend_uid";
			
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			
			$error_code = "";
			try{
				$statement->execute(array(':action'=>$action,':uid'=>$uid,':friend_uid'=>$friend_uid));
			}catch(PDOException $pdoException){
				//echo $pdoException->getMessage();
				$error_code = $statement->errorCode();
				if($error_code != ""){
					$posts[] = "ERROR['".$error_code."']: Something went wrong!";
				}
			}
			
			if($error_code == ""){
				if($action == 'DENIED'){
					$posts = NULL;
					$posts[] = "Request denied!";
				}
				else{
					/*Checking for task 1*/
					UpdateUserTask($uid);
					UpdateUserTask($friend_uid);
				
					$posts = NULL;
					$posts[] = "Successfully added to your friendlist!";
				}
			}
		}
		else{
			$posts[] = "Something went wrong!";
			/*if(strcmp($posts[0],'FRIENDS') == 0){
				$posts = NULL;
				$posts[] = "This person is already your friend!";
			}
			else if(strcmp($posts[0],'REQUEST_PENDING') == 0){
				$posts = NULL;
				$posts[] = "Your friendship request is in pending!";
			}*/
		}
		
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);
		
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}
function UpdateUserTask($uid){
	global $dbObj;
	global $task_detail_id;
	global $task_1;

	$sql = "SELECT ACTIVE_TASK FROM KAP_USER_MAIN WHERE UID = :uid";
	$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':uid' => $uid
		));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	switch(intval($res[0]['ACTIVE_TASK'])){
		case $task_1:
			$sql = "
					SELECT COUNT(UID) AS 'EXISTS' FROM USER_TASK_DETAILS WHERE UID = :uid AND TASK_DETAIL_ID = :task_detail_id 
					";
			$params = array(
				':uid'=>$uid,
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

			
	}
}

?>