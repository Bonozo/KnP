<?php
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
$key = "tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW"; //APP KEY
$cloud_password = "test";
$tmp_fname = 'cookie.txt';
if (isset($_GET)) {
    extract($_GET);
    if (isset($name, $email, $password, $gender, $device_token)) {
		$name = Nameize($name);
		
		$email_validation = emailValidation($email);
		
		switch($email_validation){
			case '-1':
				/*list($found,$last_email) = DeviceLastUserEmail($device_token);
				
				if($found){
					list($status,$error) = RemoveUserTraces($last_email, $password);
				}
				
				list($status,$response) = LogoutCloudUser($device_token);
				list($status,$response) = CreateCloudUser($email,$password); // response contain new cloud user id
				if($status){
					$user_id = $response; 
					list($status,$error) = SubscribeCloudUser($device_token);
					$records = InsertUserOnDB($name, $email, $password, $gender, $device_token, $user_id);
				}
				else{
					$records = array("Record" => "Unable to create user : ".$response);
				}*/
				$last_user_email = GetEmailByDeviceToken($device_token);
				if($last_user_email == NULL){
					//Nobody used this device before
					$last_user = "NULL";
				}
				else{
					//$last_user_email was the last user who used this device
					$last_user = $last_user_email;
				}
				$new_uid = InsertUserOnDB($name, $email, $password, $gender);
				$query = "SELECT `UID`,`NAME`,`EMAIL`,`GENDER`,`STATUS_MESSAGE`,`USER_ID`,DATEDIFF(NOW(),`TIMESTAMP`) AS 'ACCOUNT_AGE' FROM KAP_USER_MAIN WHERE `UID` = :new_uid";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
					':new_uid' => $new_uid,
				));
				$res = $statement->fetchAll(PDO::FETCH_ASSOC);//print_r($res);
			
				foreach($res as $post){
					$posts[0]["UID"] = $post["UID"];
					$posts[0]['ACCOUNT_AGE'] = $post['ACCOUNT_AGE'];
					$posts[0]["NAME"] = $post["NAME"];
					$posts[0]["EMAIL"] = $post["EMAIL"];
					$posts[0]["GENDER"] = $post["GENDER"];
					$posts[0]["STATUS_MESSAGE"] = $post["STATUS_MESSAGE"];
					$posts[0]["USER_ID"] = $post["USER_ID"];
					$posts[0]["LAST_USER"] = $last_user;
					$posts[0]["DEVICE_TOKEN"] = $device_token;


/*					$posts[0]["UID"] = $post["UID"];
					$posts[0]["NAME"] = $post["NAME"];
					$posts[0]["EMAIL"] = $post["EMAIL"];
					$posts[0]["GENDER"] = $post["GENDER"];
					$posts[0]["STATUS_MESSAGE"] = $post["STATUS_MESSAGE"];
					$posts[0]["LAST_USER"] = $last_user;
*/				}
				$query =   
					   "SELECT uwt.`WEAR_TYPE_ID`,uw.`WEAR_ID`,uw.`IMAGE`,uw.`NAME`
						FROM 
							`USER_WEAR_TYPE` uwt
						LEFT JOIN 
							`USER_WEAR` uw 
						ON 
							uwt.`WEAR_TYPE_ID`= uw.`WEAR_TYPE_ID`
						LEFT JOIN 
							`USER_WEAR_INFO` uwi
						ON 
							uwt.`WEAR_TYPE_ID` = uwi.`WEAR_TYPE_ID`
						AND 
							uw.`WEAR_ID` = uwi.`WEAR_ID`
						WHERE 
							uwi.UID = :uid
						ORDER BY
							uwt.WEAR_TYPE_ID ASC
						";
   
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(array(':uid'=>$new_uid));
				$result = $statement->fetchAll(PDO::FETCH_ASSOC);//print_r($result);
				$posts[0]["USER_APPEARANCE"] = $result;
				
				$records = array("Record"=>$posts);//$records = array('Error'=>$posts);

				break;
			case '-2':
				$records = array('Error' => "Email address is not correct");
				break;
			default://On email validate successfully
				$records = array('Error' => "Email address already exists");
				break;
		}//switch end
    } else {
        $records = array('Error' => "Bad Request!");
    }

} else {
	$records = array('Error' => "Bad Request!");
}
echo json_indent(json_encode($records));
function GetEmailByDeviceToken($token){
	global $dbObj;
	$query = "SELECT `EMAIL` FROM `KAP_USER_MAIN` WHERE `DEVICE_TOKEN` = :token";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':token' => $token
	));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);//print_r($res);
	if(sizeof($res) > 0)
		return $res[0]['EMAIL'];
	return NULL;
}

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
			$query = "UPDATE `KAP_USER_MAIN` SET `USER_ID` = '',`DEVICE_TOKEN` = '', `NOTIFICATION` = 'OFF' WHERE `EMAIL` = :last_email";
			$statement = $dbObj -> prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement -> execute(array(':last_email' => $email));
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
function LogoutCloudUser($device_token){
	$curlObj = curl_init();
	global $key;
	global $cloud_password;
	global $tmp_fname;
	$c_opt = array( CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/users/logout.json?key='.$key,
					CURLOPT_COOKIEJAR => $tmp_fname, 
					CURLOPT_COOKIEFILE => $tmp_fname, 
					CURLOPT_RETURNTRANSFER => true, 
					CURLOPT_FOLLOWLOCATION  =>  1,
					CURLOPT_TIMEOUT => 60);
	curl_setopt_array($curlObj,$c_opt);
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "LOGOUT_CLOUD_USER";print_r($response);
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
function DeviceLastUserEmail($device_token){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $tmp_fname;
	$curlObj = curl_init();
	$query = "SELECT `DEVICE_TOKEN`,`EMAIL` FROM `KAP_USER_MAIN` WHERE `DEVICE_TOKEN` = :device_token";
	$statement = $dbObj -> prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement -> execute(array(':device_token' => $device_token));
	$res = $statement -> fetchAll(PDO::FETCH_ASSOC);
	if (sizeof($res) > 0){
		return array(true,$res[0]['EMAIL']);
	}
	return array(false,NULL);
}
function InsertUserOnDB($name, $email, $password, $gender){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $tmp_fname;
	$curlObj = curl_init();
    $query = "INSERT INTO `KAP_USER_MAIN`(`PASSWORD`,`NAME`,`EMAIL`,`GENDER`,`NOTIFICATION`) 
	VALUES ( :password,:name,:email,:gender,:notification);";
	$statement = $dbObj -> prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$result = $statement -> execute(array(':password' => md5($password), ':name' => $name, ':email' => $email, ':gender' => $gender,   ':notification' => 'ON'));

	$uid = $dbObj -> lastInsertId();
	/*$query = "SELECT `UID`,`NAME`,`EMAIL`,`GENDER` FROM KAP_USER_MAIN WHERE `UID` =:uid";

	$statement = $dbObj -> prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement -> execute(array(':uid' => $uid));
	$res = $statement -> fetchAll(PDO::FETCH_ASSOC);
	foreach ($res as $post) {
		$posts[] = $post;
	}

	$records = array("Record" => $posts);*/
	return $uid;
}
function Nameize($str, $a_char = array("'","-"," ")) {
    /*
     $str contains 0the complete raw name string....
     $a_char is an array containing the characters
     we use as separators for capitalization.
     If you don't pass anything, there are three in there as default.
     */
    $string = strtolower($str);
    foreach ($a_char as $temp) {
        $pos = strpos($string, $temp);
        if ($pos) {

            /*
             we are in the loop because we found one of the special characters in the array,
             so lets split it up into chunks and capitalize each one.
             */
            $mend = '';
            $a_split = explode($temp, $string);
            foreach ($a_split as $temp2) {
                /*
                 capitalize each portion of the string which was separated at a special character
                 */
                $mend .= ucfirst($temp2) . $temp;
            }
            $string = substr($mend, 0, -1);
        }
    }
    return ucfirst($string);
}
function emailValidation($email){
	global $dbObj;
	if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$email = strtolower($email);
		/*
		 * Check for Email already exist
		 */
		$query = "SELECT `EMAIL` FROM `KAP_USER_MAIN` WHERE `EMAIL` = :email";
		$statement = $dbObj -> prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement -> execute(array(':email' => $email));
		$res = $statement -> fetchAll(PDO::FETCH_ASSOC);
	
		return is_value_exists($res, "EMAIL", $email);
	}
	return '-2';
}
?>