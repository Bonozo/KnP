<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
$key = "tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW"; //APP KEY
$cloud_password = "admin";
$tmp_fname = 'cookie.txt';
$channel    = "alert";
$static_message    = "You have received a new message from '";
$title      = "Knights And Princesses";

if(isset($_GET))
{
	extract($_GET);
	if(isset($sender_id,$receiver_id,$message))
	{
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
		$query = "SELECT `USER_ID`,`NOTIFICATION`,`NAME` FROM KAP_USER_MAIN WHERE `UID` = :receiver_id";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':receiver_id'=>$receiver_id));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		//print_r($res);die();
		if($res[0]['NOTIFICATION']=='ON' && $res[0]['USER_ID']!=''){
			$static_message.= $res[0]['NAME']."'.";
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