<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
include "config.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
$key = "tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW"; //APP KEY
$cloud_password = "test";
$cookies_file = 'cookies/';
if(isset($_GET))
{
	extract($_GET);
	if(isset($email,$password,$version,$device_token))
	{
		$email = strtolower($email);
		$cookies_file .= $email."1.txt";

/*		list($status,$response) = CloudLogin($email,$password);
		//echo $status."::".$error;die();
		list($status,$response) = DeleteCloudUser();
*/		
		if(isset($version)){
			if($version == VERSION){
				list($rec) = emailValidate($email,$password);//print_r($rec);
				
				if($rec != NULL)
				{
					$last_user_email = GetEmailByDeviceToken($device_token);
					if($last_user_email == NULL){
						//Nobody used this device before
						$last_user = "NULL";
					}
					else if(strcmp($last_user_email,$email) == 0){
						//Signed in user was the last user on this device
						$last_user = "ME";
					}
					else{
						//$last_user_email was the last user who used this device
						$last_user = $last_user_email;
					}

					list($status,$error) = RemoveUserTraces($email, $password);

					
					list($found,$last_email) = DeviceLastUserEmail($device_token);
					if($found){
						list($status,$error) = RemoveUserTraces($last_email, $password);
					}
					if(FindLastUserDevice($email,$device_token)){
						list($status,$error) = RemoveUserTraces($email, $password);
						
					}
					list($status,$response) = LogoutCloudUser($device_token);
					list($status,$response) = CreateCloudUser($email,$password); // response contain new cloud user id
					if($status){
						$user_id = $response; 
						list($status,$error) = SubscribeCloudUser($device_token);
						$query1 = 
						"UPDATE `KAP_USER_MAIN` 
						SET 
						`LAST_LOGIN`=NOW(), 
						`LOGIN_ATTEMPTS` = '0',
						`DEVICE_TOKEN`= '".$device_token."',
						`USER_ID` = '".$user_id."',
						`NOTIFICATION` = 'ON' 
						WHERE `email`= :email";
						$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement1->execute(array(
							':email'=>$email
						));
						$query = "SELECT `UID`,`NAME`,`EMAIL`,`GENDER`,`STATUS_MESSAGE`,`USER_ID` FROM KAP_USER_MAIN WHERE 
						`EMAIL` = :email";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':email' => $email,
						));
						$res = $statement->fetchAll(PDO::FETCH_ASSOC);//print_r($res);
					
						foreach($res as $post){
							$posts[] = $post;
						}

						list($status,$response) = LogoutCloudUser($device_token);
						
						$records = array("Record"=>$posts);//$records = array('Error'=>$posts);
					}
					else{
						$records = array("Record" => "Unable to create user : ".$response);
					}

				}
				else
				{
					$posts = array("AuthException"=>"Email address or password is invalid!");
					$records = array('Error'=>$posts);
					$query1 = "UPDATE `KAP_USER_MAIN` SET LOGIN_ATTEMPTS = LOGIN_ATTEMPTS+1,LAST_LOGIN_ATTEMPT = NOW() WHERE `email`= :email";
					$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement1->execute(array(
						':email'=>$email
					));

				}
			}
			else{
				$posts = array("AuthException"=>"New version is ".VERSION."\nPlease update your version.");
				$records = array('Error'=>$posts);
			}
		}
		else{
			$posts = array("AuthException"=>"New version is ".VERSION."\nPlease update your version.");
			$records = array('Error'=>$posts);
		}
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
function DeviceLastUserEmail($device_token){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $cookies_file;
	$curlObj = curl_init();
	$query = "SELECT `DEVICE_TOKEN`,`EMAIL` FROM `KAP_USER_MAIN` WHERE `DEVICE_TOKEN` = :device_token";
	$statement = $dbObj -> prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement -> execute(array(':device_token' => $device_token));
	$res = $statement -> fetchAll(PDO::FETCH_ASSOC);//print_r($res);
	if (sizeof($res) > 0){
		return array(true,$res[0]['EMAIL']);
	}
	return array(false,NULL);
}
function RemoveUserTraces($email, $password){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $cookies_file;

	list($status,$response) = CloudLogin($email,$password);
	//echo $status."::".$error;die();
	
	if($status == "1" || $status == 1){
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
function DeleteCloudUser(){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $cookies_file;
	$curlObj = curl_init();
	$c_opt = array( CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/users/delete.json?key=' . $key,
					CURLOPT_COOKIEJAR => $cookies_file, 
					CURLOPT_COOKIEFILE => $cookies_file, 
					CURLOPT_RETURNTRANSFER => true, 
					CURLOPT_POST => 0,
					//CURLOPT_POSTFIELDS  =>  "login=".$username."&password=".$password,
					CURLOPT_FOLLOWLOCATION  =>  1,
					CURLOPT_TIMEOUT => 60);
	
	curl_setopt_array($curlObj, $c_opt);
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "DELETE_CLOUD";//print_r($response);
	curl_close($curlObj);
	if($response['meta']['status'] == 'ok'){
		return array(true,$response['response']['users'][0]['id']);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}

function emailValidate($email,$password){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $cookies_file;
	$query = "SELECT `UID`,`NAME`,`EMAIL`,`GENDER`,`USER_ID` FROM KAP_USER_MAIN WHERE 
	`EMAIL` = :email AND `PASSWORD` = :password";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':email' => $email,
		':password' => md5($password)			
	));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);//print_r($res);

	foreach($res as $post){
		$posts[] = $post;
	}
	return $posts;
	
}
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
function CloudLogin($email,$password){
	global $key;
	global $cloud_password; 	
	global $cookies_file;
	$curlObj = curl_init();

	if($cloud_password != '')
		$password = $cloud_password;
	$c_opt = array( CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/users/login.json?key='.$key,
					CURLOPT_COOKIEJAR => $cookies_file, 
					CURLOPT_COOKIEFILE => $cookies_file, 
					CURLOPT_RETURNTRANSFER => true, 
					CURLOPT_POST => 1,
					CURLOPT_POSTFIELDS  =>  "login=".$email."&password=".$cloud_password,
					CURLOPT_FOLLOWLOCATION  =>  1,
					CURLOPT_TIMEOUT => 60);
	curl_setopt_array($curlObj, $c_opt);
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "CLOUD_LOGIN";//print_r($response);
	curl_close($curlObj);
	if($response['meta']['status'] == 'ok'){
		return array(true,$response['response']['users'][0]['id']);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}
function FindLastUserDevice($email,$device_token){
	global $dbObj;

//	SELECT `DEVICE_TOKEN` FROM KAP_USER_MAIN WHERE `EMAIL` = ''
	$query = "SELECT `DEVICE_TOKEN` FROM KAP_USER_MAIN WHERE `EMAIL` = :email";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':email' => $email,
	));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	if ($res[0]['DEVICE_TOKEN'] != NULL && $res[0]['DEVICE_TOKEN'] != '' && $res[0]['DEVICE_TOKEN'] != $device_token){
		//echo "DEVICE TOKEN::".$res[0]['DEVICE_TOKEN'] ;
		return true;
	}
	//echo "FALSEE";
	return false;

}
function LogoutCloudUser($device_token){
	$curlObj = curl_init();
	global $key;
	global $cloud_password;
	global $cookies_file;
	$c_opt = array( CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/users/logout.json?key='.$key,
					CURLOPT_COOKIEJAR => $cookies_file, 
					CURLOPT_COOKIEFILE => $cookies_file, 
					CURLOPT_RETURNTRANSFER => true, 
					CURLOPT_FOLLOWLOCATION  =>  1,
					CURLOPT_TIMEOUT => 60);
	curl_setopt_array($curlObj,$c_opt);
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "LOGOUT_CLOUD_USER";//print_r($response);
	curl_close($curlObj);
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
	global $cookies_file;
	$c_opt = array( CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/users/create.json?key='.$key,
					CURLOPT_COOKIEJAR => $cookies_file, 
					CURLOPT_COOKIEFILE => $cookies_file, 
					CURLOPT_RETURNTRANSFER => true, 
					CURLOPT_POST => 1,
					CURLOPT_POSTFIELDS  =>  "email=".$email."&username=".$email."&password=".$password."&password_confirmation=".$password,
					CURLOPT_FOLLOWLOCATION  =>  1,
					CURLOPT_TIMEOUT => 60);
	curl_setopt_array($curlObj,$c_opt);
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "CREATE_CLOUD_USER";//print_r($response);
	curl_close($curlObj);
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
	global $cookies_file;
	$curlObj = curl_init();
	$c_opt      = array(CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/push_notification/subscribe.json?key='.$key,
						CURLOPT_COOKIEJAR => $cookies_file, 
						CURLOPT_COOKIEFILE => $cookies_file, 
						CURLOPT_RETURNTRANSFER => true, 
						CURLOPT_POST => 1,
						CURLOPT_POSTFIELDS  =>  "type=android&channel=alert&device_token=".$device_token,
						CURLOPT_FOLLOWLOCATION  =>  1,
						CURLOPT_TIMEOUT => 60);
	curl_setopt_array($curlObj, $c_opt);
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "SUBSCRIBE_CLOUD_USER";//print_r($response);
	curl_close($curlObj);
	if($response['meta']['status'] == 'ok'){
		return array(true,true);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}
/*

$data['data'] =array("id"=>"dt120","description"=>"Hello World");
$arr = array('data'=>$data);
$data['data'] =array("id"=>"dt121","description"=>"Hello World1");
array_push($arr,$data['data']);//array('data'=>$data);
$data['data'] =array("id"=>"dt122","description"=>"Hello World2");
$arr = array('data'=>$data);
//$arr = array('data'=>$data);
					
echo json_indent(json_encode($arr));
*/
#########################################################################################################
#########################################################################################################
#########################################################################################################
#########################################################################################################
#########################################################################################################
#########################################################################################################
#########################################################################################################
#########################################################################################################
?>
<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
include "config.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
$key = "tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW"; //APP KEY
$cloud_password = "test";
$tmp_fname = 'cookie.txt';
$curlObj = curl_init();
if(isset($_GET))
{
	extract($_GET);
	if(isset($email,$password,$version,$device_token))
	{
		if(isset($version)){
			if($version == VERSION){
				list($rec) = emailValidate($email,$password);//print_r($rec);
				
				
				if($rec != NULL)
				{
					list($found,$last_email) = DeviceLastUserEmail($device_token);
					if($found){
						list($status,$error) = RemoveUserTraces($last_email, $password);
					}
					if(FindLastUserDevice($email,$device_token)){
						list($status,$error) = RemoveUserTraces($email, $password);
						
					}
					list($status,$response) = LogoutCloudUser($device_token);
					list($status,$response) = CreateCloudUser($email,$password); // response contain new cloud user id
					if($status){
						$user_id = $response; 
						list($status,$error) = SubscribeCloudUser($device_token);
						$query1 = "UPDATE `KAP_USER_MAIN` SET `LAST_LOGIN`=NOW(), `LOGIN_ATTEMPTS` = '0',`DEVICE_TOKEN`= '".$device_token."',`USER_ID` = '".$user_id."',`NOTIFICATION` = 'ON' WHERE `email`= :email";
						$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement1->execute(array(
							':email'=>$email
						));
						$query = "SELECT `UID`,`NAME`,`EMAIL`,`GENDER`,`STATUS_MESSAGE`,`USER_ID` FROM KAP_USER_MAIN WHERE 
						`EMAIL` = :email";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':email' => $email,
						));
						$res = $statement->fetchAll(PDO::FETCH_ASSOC);//print_r($res);
					
						foreach($res as $post){
							$posts[] = $post;
						}

						$records = array("Record"=>$posts);//$records = array('Error'=>$posts);
					}
					else{
						$records = array("Record" => "Unable to create user : ".$response);
					}

				}
				else
				{
					$posts = array("AuthException"=>"Email address or password is invalid!");
					$records = array('Error'=>$posts);
					$query1 = "UPDATE `KAP_USER_MAIN` SET LOGIN_ATTEMPTS = LOGIN_ATTEMPTS+1,LAST_LOGIN_ATTEMPT = NOW() WHERE `email`= :email";
					$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement1->execute(array(
						':email'=>$email
					));

				}
			}
			else{
				$posts = array("AuthException"=>"New version is ".VERSION."\nPlease update your version.");
				$records = array('Error'=>$posts);
			}
		}
		else{
			$posts = array("AuthException"=>"New version is ".VERSION."\nPlease update your version.");
			$records = array('Error'=>$posts);
		}
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
function DeviceLastUserEmail($device_token){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $tmp_fname;
	$curlObj = curl_init();
	$query = "SELECT `DEVICE_TOKEN`,`EMAIL` FROM `KAP_USER_MAIN` WHERE `DEVICE_TOKEN` = :device_token";
	$statement = $dbObj -> prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement -> execute(array(':device_token' => $device_token));
	$res = $statement -> fetchAll(PDO::FETCH_ASSOC);//print_r($res);
	if (sizeof($res) > 0){
		return array(true,$res[0]['EMAIL']);
	}
	return array(false,NULL);
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
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "DELETE_CLOUD";//print_r($response);
	if($response['meta']['status'] == 'ok'){
		return array(true,$response['response']['users'][0]['id']);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}

function emailValidate($email,$password){
	global $dbObj;
	global $key;
	global $cloud_password;
	global $tmp_fname;
	$curlObj = curl_init();
	$email = strtolower($email);
	$query = "SELECT `UID`,`NAME`,`EMAIL`,`GENDER`,`USER_ID` FROM KAP_USER_MAIN WHERE 
	`EMAIL` = :email AND `PASSWORD` = :password";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':email' => $email,
		':password' => md5($password)			
	));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);//print_r($res);

	foreach($res as $post){
		$posts[] = $post;
	}
	return $posts;
	
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
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "CLOUD_LOGIN";//print_r($response);
	if($response['meta']['status'] == 'ok'){
		return array(true,$response['response']['users'][0]['id']);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}
function FindLastUserDevice($email,$device_token){
	global $dbObj;

//	SELECT `DEVICE_TOKEN` FROM KAP_USER_MAIN WHERE `EMAIL` = ''
	$query = "SELECT `DEVICE_TOKEN` FROM KAP_USER_MAIN WHERE `EMAIL` = :email";
	$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$statement->execute(
	array(
		':email' => $email,
	));
	$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	if ($res[0]['DEVICE_TOKEN'] != NULL && $res[0]['DEVICE_TOKEN'] != '' && $res[0]['DEVICE_TOKEN'] != $device_token){
		//echo "DEVICE TOKEN::".$res[0]['DEVICE_TOKEN'] ;
		return true;
	}
	//echo "FALSEE";
	return false;

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
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "LOGOUT_CLOUD_USER";//print_r($response);
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
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "CREATE_CLOUD_USER";//print_r($response);
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
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "SUBSCRIBE_CLOUD_USER";//print_r($response);
	if($response['meta']['status'] == 'ok'){
		return array(true,true);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}
curl_close($curlObj);
/*

$data['data'] =array("id"=>"dt120","description"=>"Hello World");
$arr = array('data'=>$data);
$data['data'] =array("id"=>"dt121","description"=>"Hello World1");
array_push($arr,$data['data']);//array('data'=>$data);
$data['data'] =array("id"=>"dt122","description"=>"Hello World2");
$arr = array('data'=>$data);
//$arr = array('data'=>$data);
					
echo json_indent(json_encode($arr));
*/
?>