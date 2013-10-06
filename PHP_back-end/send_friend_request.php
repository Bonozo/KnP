<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
include "config.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
$key = "tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW"; //APP KEY
$cloud_password = "admin";
$tmp_fname = 'cookie.txt';
$channel    = "alert";
$message    = "You have received a friend request from '";
$title      = "Knights And Princesses";

if(isset($_GET))
{
	extract($_GET);
	if(isset($uid,$friend_uid,$user_id))
	{


		$dbObj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$query = "SELECT kits.TOTAL_UNIT,kum.ENERGY,kum.NAME FROM KAP_USER_MAIN kum,KNP_INVENTORY_TRANSACTION_SUMMARY kits WHERE kits.UID = :uid AND kits.INV_ID = '10004' and kum.UID = :uid";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		$sender_name = $res[0]['NAME'];

		if($res[0]['TOTAL_UNIT']>=MIN_GOLD){
			if($res[0]['ENERGY']>=MIN_ENERGY){
				$query = "SELECT IF(
((SELECT `LEVEL` FROM `KAP_USER_MAIN` WHERE `UID` = :uid) >= (SELECT `LEVEL` FROM `KAP_USER_MAIN` WHERE `UID` = :friend_uid)),
'TRUE','FALSE') AS 'ELIGIBLE'
";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(array(':uid'=>$uid,':friend_uid'=>$friend_uid));
				$res = $statement->fetchAll(PDO::FETCH_ASSOC);
				if($res[0]['ELIGIBLE'] == 'TRUE'){
					$query = "SELECT `STATUS` FROM `FRIENDSHIP_MAIN` WHERE `UID` = :friend_uid AND FRIEND_UID = :uid OR `UID` = :uid AND FRIEND_UID = :friend_uid";
					
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					
					$statement->execute(array(':friend_uid'=>$friend_uid,':uid'=>$uid));
					$res = $statement->fetchAll(PDO::FETCH_ASSOC);
					$posts = NULL;
					foreach($res as $post){
					  if(strcmp($post['STATUS'],'FRIENDS') == 0){
						$posts[] = "This person is already your friend!";
					  }
					  else if(strcmp($post['STATUS'],'REQUEST_PENDING') == 0){
						$posts[] = "Your friendship request with this person has already initiated!";
					  }
					}
					//////////////////////////////////////////
					if($posts == NULL){
						$query =   "INSERT INTO `FRIENDSHIP_MAIN`(`UID`,`FRIEND_UID`,`STATUS`) VALUES ( :uid,:friend_uid,:status)";
						
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						
						$error_code = "";
						try{
							$statement->execute(array(':uid'=>$uid,':friend_uid'=>$friend_uid,':status'=>'REQUEST_PENDING'));
							$query1 = "UPDATE `KAP_USER_MAIN` SET ENERGY = ENERGY-100 WHERE `UID`= :uid";
							$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement1->execute(array(
								':uid'=>$uid
							));
							/*Consume Gold for Send Friend Request */
							$query1 = "UPDATE `KNP_INVENTORY_TRANSACTION_SUMMARY` SET TOTAL_UNIT = TOTAL_UNIT-'".MIN_GOLD."' WHERE `UID`= :uid AND INV_ID = '10004'";
							$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement1->execute(array(
								':uid'=>$uid
							));
							/*Transaction for consumed Gold*/
							$query = 
							"INSERT INTO 
								`KNP_INVENTORY_TRANSACTION`
								(`DONAR_UID`,`INVENTORY_ID`, `UNIT_TRANSFER`, `TRANS_TYPE`,`COMMENTS`) 
								VALUES 
								( :uid, '10004', '".MIN_GOLD."', 'CONSUME_FRIEND_REQUEST', 'Consumed on sending friend Request.');
							";
							$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement->execute(
							array(
								':uid' => $uid
								));
							

							$query = "SELECT `EMAIL`,`NOTIFICATION`,`NAME` FROM KAP_USER_MAIN WHERE `UID` = :friend_uid";
							$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement->execute(array(':friend_uid'=>$friend_uid));
							$res = $statement->fetchAll(PDO::FETCH_ASSOC);
			
							if($res[0]['NOTIFICATION']=='ON' && $res[0]['USER_ID']!=''){
								$message.= $sender_name.".";
$json       = '{"alert":"'. $message .'","title":"'. $title .'","vibrate":true,"sound":"default","icon":"appicon"}';
								
								list($status,$response) = CloudLogin(CLOUD_ADMIN,CLOUD_PASSWORD);
								if($status){
									//echo $user_id;
									//echo "asdasdasdasdasd";
									$curlObj    = curl_init();
									$c_opt      = array(CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/push_notification/notify.json?key='.$key."&to_ids=".$user_id,
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
						}catch(PDOException $pdoException){
							//echo $pdoException->getMessage();
							$error_code = $statement->errorCode();
							if($error_code != ""){
								if($error_code == 23000){
									$posts[] = "Your friendship request with this person has already initiated!";
								}
								else{
									$posts[] = "ERROR['".$error_code."']: Something went wrong on sending request!";
								}
							}
						}
						
						if($error_code == ""){
							$posts[] = "Request successfully sent.";
						}
					}
					
					/*$query = "SELECT `STATUS` FROM `FRIENDSHIP_MAIN` WHERE `UID` = :friend_uid AND FRIEND_UID = :uid";
					
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					
					$statement->execute(array(':friend_uid'=>$friend_uid,':uid'=>$uid));
					
					$res = $statement->fetchAll();
					$posts = NULL;
					foreach($res as $post){
					  if(strcmp($post,'FRIENDS') == 0){
						$posts[] = "He/She is already your friend!";
					  }
					  else if(strcmp($post,'REQUEST_PENDING') == 0){
						$posts[] = "He/She has already sent you friendship request!";
					  }
					}
					
					
					
					if($posts == NULL){
						$query =   "INSERT INTO `FRIENDSHIP_MAIN`(`UID`,`FRIEND_UID`,`STATUS`) VALUES ( :uid,:friend_uid,:status)";
						
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						
						$statement->execute(array(':uid'=>$uid,':friend_uid'=>$friend_uid,':status'=>'REQUEST_PENDING'));
						
						
						$error_code = "";
						$error_code = $statement->errorCode();
						if($error_code != ""){
							if($error_code == 1062){
								$posts[] = "You have already sent friendship request to him/her!";
							}
							else{
								$posts[] = "ERROR['".$error_code."']: Something went wrong on sending request!";
							}
						}
						else{
							$posts[] = "Request successfully sent.";
						}
					}
					*/

				}
				else{
					$posts[] = "You can only send request to the same or lower level.";

				}
			}
			else{
				$posts[] = "You have insufficient energy to send request.";
			}
		}
		else{
			$posts[] = "You have atleast 5 golds to send request.";
		}
		
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);
//die();		
				
		
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}
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
	$response = objectToArray(json_decode(curl_exec($curlObj)));//echo "CLOUD_LOGIN";print_r($response);///die();
	if($response['meta']['status'] == 'ok'){
		return array(true,$response['response']['users'][0]['id']);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}


?>0]['id']);
	} 
	else if($response['meta']['status'] == 'fail'){
		return array(false,$response['meta']['message']);
	}
	return array(false,'Unknown error');
}


?>