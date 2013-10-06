<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
$key = "tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW"; //APP KEY
$cloud_password = "admin";
$tmp_fname = 'cookie.txt';
$channel    = "alert";
$static_message    = "Your prince has sent you a message";
$title      = "Knights And Princesses";

if(isset($_GET))
{
	extract($_GET);
	if(isset($sender_id,$receiver_id,$message))
	{
		$task_detail_id = 3005;
		$message = urldecode($message);
		
		$query = "
		INSERT INTO KNP_MESSAGE_MAIN (`SENDER_UID`,`RECEIVER_UID`,`MESSAGE_TEXT`,`STATUS`) VALUES ( 		
		:sender_id,:receiver_id,:message,'UNREAD');
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':sender_id'=>$sender_id,
			':receiver_id'=>$receiver_id,
			':message'=>$message
			));

		$posts[] = array("ALERT" =>"Successfully sent!","DATETIME"=>date('M j Y h: i A'));
		$query = "SELECT `NAME`,`GENDER` FROM KAP_USER_MAIN WHERE `UID` = :sender_id";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':sender_id'=>$sender_id));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		$sender_name = $res[0]['NAME'];
		$static_message = ($res[0]['NAME'] == 'm')?"your knight has sent you a message":"your prince has sent you a message";

		$query = "SELECT `USER_ID`,`NOTIFICATION`,`NAME` FROM KAP_USER_MAIN WHERE `UID` = :receiver_id";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':receiver_id'=>$receiver_id));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		//print_r($res);die();
		if($res[0]['NOTIFICATION']=='ON' && $res[0]['USER_ID']!=''){
			//$static_message.= $sender_name."'.";
			$json = '{"alert":"'. $static_message .'","title":"'. $title .'","vibrate":true,"sound":"default","icon":"appicon"}';
			
		list($status,$response) = CloudLogin('admin@bonozo.com',$cloud_password);
//		die($response);
			if($status){
				//die($res[0]['USER_ID']);
				$curlObj    = curl_init();
				$c_opt      = array(CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/push_notification/notify.json?key='.$key."&to_ids=".$res[0]['USER_ID'],
									CURLOPT_COOKIEJAR => $tmp_fname, 
									CURLOPT_COOKIEFILE => $tmp_fname, 
									CURLOPT_RETURNTRANSFER => true, 
									CURLOPT_POST => 1,
									CURLOPT_POSTFIELDS  => "channel=".$channel."&payload=".$json,
									CURLOPT_FOLLOWLOCATION  =>  1,
									CURLOPT_TIMEOUT => 60);
				curl_setopt_array($curlObj, $c_opt); 
				$session = curl_exec($curlObj);//print_r($session);
				curl_close($curlObj);
			}
		}
		$sql = "
				SELECT COUNT(UID) AS 'EXISTS' FROM USER_TASK_DETAILS WHERE UID = :uid AND TASK_DETAIL_ID = :task_detail_id 
				";
		$params = array(
			':uid '=>$sender_id,
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
				':uid' => $sender_id,
				':task_detail_id' => $task_detail_id,
				':status' => 'COMPLETED'
				);
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute($params);
		}


		$records = array('Message'=>$posts);//$records = array('Error'=>$posts);
		


	}
	else
	{
		$posts = array("Request"=>"Bad Request!");
		$records = array('Error'=>$posts);
	}

}
else
{
	$posts = array("Request"=>"Bad Request!");
	$records = array('Error'=>$posts);
}

echo json_indent(json_encode($records));
function CloudLogin($email,$password){
	global $key;
	global $cloud_password; 	
	global $tmp_fname; 	
	$curlObj = curl_init();

	if($cloud_password != '')
		$password = $cloud_password;
	$c_opt = array( CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/users/login.json?key='.$key,
					CURLOPT_COOKIEJAR => $tmp_fname, 
					CURLOPT_COOKIEFILE => $tmp_fname, 
					CURLOPT_RETURNTRANSFER => true, 
					CURLOPT_POST => 1,
					CURLOPT_POSTFIELDS  =>  "login=".$email."&password=".$password,
					CURLOPT_FOLLOWLOCATION  =>  1,
					CURLOPT_TIMEOUT => 60);
	curl_setopt_array($curlObj, $c_opt);
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "CLOUD_LOGIN";print_r($response);//die();
	if($response['meta']['status'] == 'ok'){
		return array(true,$response['response']['users'][0]['id']);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}

?>