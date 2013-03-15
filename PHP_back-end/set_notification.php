<?php
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
$key = "tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW"; //APP KEY
$cloud_password = "test";
$tmp_fname = 'cookie.txt';
if (isset($_GET)) {
    extract($_GET);
    if (isset($uid,$device_token)) {
		$query = "SELECT `EMAIL`,`NOTIFICATION` FROM KAP_USER_MAIN WHERE `UID` = :uid";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		if($res[0]['NOTIFICATION']=='ON'){
			list($status,$error) = RemoveUserTraces($res[0]['EMAIL'], $password);
			$records = array("Message"=>array("Your Notification settings turned off."));
		}
		else if($res[0]['NOTIFICATION']=='OFF'){
			list($status,$response) = CreateCloudUser($res[0]['EMAIL'],'test'); // response contain new cloud user id
			if($status){
				$user_id = $response; 
				list($status,$error) = SubscribeCloudUser($device_token);
				$query1 = "UPDATE `KAP_USER_MAIN` SET `DEVICE_TOKEN`= '".$device_token."',`USER_ID` = '".$user_id."',`NOTIFICATION` = 'ON' WHERE `UID`= :uid";
				$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement1->execute(array(
					':uid'=>$uid
				));
				$records = array("Message"=>array("Your Notification settings turned On."));

			}
	
			
		}


	
	}
	else {
        $records = array('Error' => "Bad Request!");
    }
} else {
	$records = array('Error' => "Bad Request!");
}
echo json_indent(json_encode($records));
function RemoveUserTraces($email, $password){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $tmp_fname;
	$curlObj = curl_init();

	list($status,$response) = CloudLogin($email,$password);
	
	if($status){
		list($status,$response) = DeleteCloudUser();
		if($status){
			$query = "UPDATE `KAP_USER_MAIN` SET `USER_ID` = '',`DEVICE_TOKEN` = '', `NOTIFICATION` = 'OFF' WHERE `EMAIL` = :email";
			$statement = $dbObj -> prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement -> execute(array(':email' => $email));
			return array(true,"");
		}
		else{
			return array(false,"Unable to delete user on cloud of email address.");
		}
	}
	else{
		return array(false,"Unable to log on to cloud from email address.");
	}
}

function CloudLogin($email,$password){
	global $key;
	global $cloud_password; 	
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
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "CLOUD_LOGIN";print_r($response);
	if($response['meta']['status'] == 'ok'){
		return array(true,$response['response']['users'][0]['id']);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}
function DeleteCloudUser(){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $tmp_fname;
	$curlObj = curl_init();
	$c_opt = array( CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/users/delete.json?key=' . $key,
					CURLOPT_COOKIEJAR => $tmp_fname, 
					CURLOPT_COOKIEFILE => $tmp_fname, 
					CURLOPT_RETURNTRANSFER => true, 
					CURLOPT_POST => 0,
					//CURLOPT_POSTFIELDS  =>  "login=".$username."&password=".$password,
					CURLOPT_FOLLOWLOCATION  =>  1,
					CURLOPT_TIMEOUT => 60);
	
	curl_setopt_array($curlObj, $c_opt);
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "DELETE_CLOUD";print_r($response);
	if($response['meta']['status'] == 'ok'){
		return array(true,$response['response']['users'][0]['id']);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}
function SubscribeCloudUser($device_token){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $tmp_fname;
	$curlObj = curl_init();
	$c_opt      = array(CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/push_notification/subscribe.json?key='.$key,
						CURLOPT_COOKIEJAR => $tmp_fname, 
						CURLOPT_COOKIEFILE => $tmp_fname, 
						CURLOPT_RETURNTRANSFER => true, 
						CURLOPT_POST => 1,
						CURLOPT_POSTFIELDS  =>  "type=android&channel=alert&device_token=".$device_token,
						CURLOPT_FOLLOWLOCATION  =>  1,
						CURLOPT_TIMEOUT => 60);
	curl_setopt_array($curlObj, $c_opt);
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "SUBSCRIBE_CLOUD_USER";print_r($response);
	if($response['meta']['status'] == 'ok'){
		return array(true,true);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}
function CreateCloudUser($email,$password){
	$curlObj = curl_init();
	global $key;
	global $cloud_password;
	global $tmp_fname;
	$c_opt = array( CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/users/create.json?key='.$key,
					CURLOPT_COOKIEJAR => $tmp_fname, 
					CURLOPT_COOKIEFILE => $tmp_fname, 
					CURLOPT_RETURNTRANSFER => true, 
					CURLOPT_POST => 1,
					CURLOPT_POSTFIELDS  =>  "email=".$email."&username=".$email."&password=".$password."&password_confirmation=".$password,
					CURLOPT_FOLLOWLOCATION  =>  1,
					CURLOPT_TIMEOUT => 60);
	curl_setopt_array($curlObj,$c_opt);
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "CREATE_CLOUD_USER";print_r($response);
	if($response['meta']['status'] == 'ok'){
		return array(true,$response['response']['users'][0]['id']);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}
