<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
include "config.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
//$union = array_unique(array_merge($a, $b));
$key = "tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW"; //APP KEY
$cloud_password = "admin";
$tmp_fname = 'cookie.txt';
$channel    = "alert";
$message    = "You have recieved a Quest from '";
$title      = "Knights And Princesses";
if(isset($_GET))
{
	extract($_GET);
	if(isset($assign_by_uid, $assign_to_uid, $quest_ids,$message,$num_of_hours,$status))
	{
		if(strcmp($assign_by_uid,$assign_to_uid) == 0){
			$query = "SELECT `ENERGY`	FROM KAP_USER_MAIN WHERE UID = :assign_by_uid";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(array(
				':assign_by_uid'=>$assign_by_uid
			));
			$result = $statement->fetchAll(PDO::FETCH_ASSOC);
			//print_r($result);//die();
			if($result[0]['ENERGY']>0){
				//die("enter");
				$message = urldecode($message);
			
					$timestamp = strtotime(date('Y-m-d H:i:s')) + ($num_of_hours * 60*60);
					$expired_time = date('Y-m-d H:i:s', $timestamp);
					$query = "
						INSERT INTO `KNP_ASSIGN_QUESTS`
							(
								ASSIGN_BY_UID, 
								ASSIGN_TO_UID, 
								MESSAGE, 
								EXPIRED_TIME, 
								STATUS
							)
							VALUES
							(	
								:assign_by_uid, 
								:assign_to_uid, 
								:message, 
								:expired_time, 
								:status
							)";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(
					array(
							':assign_by_uid' => $assign_by_uid, 
							':assign_to_uid' => $assign_to_uid, 
							':message' => $message, 
							':expired_time' => $expired_time, 
							':status' => $status
						));
					$assign_quest_id = NULL;
					$assign_quest_id = $dbObj->lastInsertId(); 
					if($assign_quest_id != NULL){
						$quest_ids = explode(",",$quest_ids);
						$quest_ids = array_filter($quest_ids);
						foreach($quest_ids as $quest_id){
							$query = "
								INSERT INTO `KNP_ASSIGN_QUEST_GAMES`
								(
										`ASSIGN_QUEST_ID`,
										`QUEST_ID`,
										`STATUS`
								) 
								VALUES
								( 
										'".$assign_quest_id."',
										'".$quest_id."',
										'INCOMPLETE'
								)
								";
							$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement->execute();
						}
						$posts[] = array("Message"=>"Quests Assigned!", "ASSIGN_QUEST_ID"=>$assign_quest_id);
						$records = $posts;
						
					}
					else{
						$records = array('Error'=>"Something went wrong, please try again later.");
					}
				/********Not required***********/
		/*		$query = "
				SELECT 
					COUNT(`STATUS`) AS 'REQUESTS' 
				FROM 
					`KNP_ASSIGN_QUESTS` 
				WHERE 
					`ASSIGN_BY_UID` = :assign_by_uid AND 
					`ASSIGN_TO_UID` = :assign_to_uid AND 
					(`STATUS` = 'INCOMPLETE_FRIEND' OR `STATUS` = 'INCOMPLETE');
				";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$statement->execute(
				array(
						':assign_by_uid' => $assign_by_uid, 
						':assign_to_uid' => $assign_to_uid
					));
				$res = $statement->fetchAll(PDO::FETCH_ASSOC);
				if($res[0]['REQUESTS'] == "0"){
					$message = urldecode($message);
			
					$timestamp = strtotime(date('Y-m-d H:i:s')) + ($num_of_hours * 60*60);
					$expired_time = date('Y-m-d H:i:s', $timestamp);
					$query = "
						INSERT INTO `KNP_ASSIGN_QUESTS`
							(
								ASSIGN_BY_UID, 
								ASSIGN_TO_UID, 
								MESSAGE, 
								EXPIRED_TIME, 
								STATUS
							)
							VALUES
							(	
								:assign_by_uid, 
								:assign_to_uid, 
								:message, 
								:expired_time, 
								:status
							)";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(
					array(
							':assign_by_uid' => $assign_by_uid, 
							':assign_to_uid' => $assign_to_uid, 
							':message' => $message, 
							':expired_time' => $expired_time, 
							':status' => $status
						));
					$assign_quest_id = NULL;
					$assign_quest_id = $dbObj->lastInsertId(); 
					if($assign_quest_id != NULL){
						$quest_ids = explode(",",$quest_ids);
						$quest_ids = array_filter($quest_ids);
						foreach($quest_ids as $quest_id){
							$query = "
								INSERT INTO `KNP_ASSIGN_QUEST_GAMES`
								(
										`ASSIGN_QUEST_ID`,
										`QUEST_ID`,
										`STATUS`
								) 
								VALUES
								( 
										'".$assign_quest_id."',
										'".$quest_id."',
										'INCOMPLETE'
								)
								";
							$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement->execute();
						}
						$posts[] = array("Message"=>"Quests Assigned!", "ASSIGN_QUEST_ID"=>$assign_quest_id);
						$records = $posts;
						
					}
					else{
						$records = array('Error'=>"Something went wrong, please try again later.");
					}
				}
				else{
					$posts[] = array("Message"=>"You have already assigned quest to this user!");
					$records = $posts;
				}*/
				/********Not required***********/
			}
			else{
				$posts[] = array("LOW_ENERGY"=>"You dont have sufficient enrgy to play quest.");
				$records = $posts;
			}
			

		}
		else{
			$query = "
		SELECT 
			COUNT(`STATUS`) AS 'REQUESTS' 
		FROM 
			`KNP_ASSIGN_QUESTS` 
		WHERE 
			`ASSIGN_BY_UID` = :assign_by_uid AND 
			`ASSIGN_TO_UID` = :assign_to_uid AND 
			(`STATUS` = 'INCOMPLETE_FRIEND' OR `STATUS` = 'INCOMPLETE');
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
				':assign_by_uid' => $assign_by_uid, 
				':assign_to_uid' => $assign_to_uid
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		if($res[0]['REQUESTS'] == "0"){
			$message = urldecode($message);
	
			$timestamp = strtotime(date('Y-m-d H:i:s')) + ($num_of_hours * 60*60);
			$expired_time = date('Y-m-d H:i:s', $timestamp);
			$query = "
				INSERT INTO `KNP_ASSIGN_QUESTS`
					(
						ASSIGN_BY_UID, 
						ASSIGN_TO_UID, 
						MESSAGE, 
						EXPIRED_TIME, 
						STATUS
					)
					VALUES
					(	
						:assign_by_uid, 
						:assign_to_uid, 
						:message, 
						:expired_time, 
						:status
					)";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
					':assign_by_uid' => $assign_by_uid, 
					':assign_to_uid' => $assign_to_uid, 
					':message' => $message, 
					':expired_time' => $expired_time, 
					':status' => $status
				));
			$assign_quest_id = NULL;
			$assign_quest_id = $dbObj->lastInsertId(); 
			if($assign_quest_id != NULL){
				$quest_ids = explode(",",$quest_ids);
				$quest_ids = array_filter($quest_ids);
				foreach($quest_ids as $quest_id){
					$query = "
						INSERT INTO `KNP_ASSIGN_QUEST_GAMES`
						(
								`ASSIGN_QUEST_ID`,
								`QUEST_ID`,
								`STATUS`
						) 
						VALUES
						( 
								'".$assign_quest_id."',
								'".$quest_id."',
								'INCOMPLETE'
						)
						";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute();
				}
				$posts[] = array("Message"=>"Quests Assigned!", "ASSIGN_QUEST_ID"=>$assign_quest_id);
				$records = $posts;
				if((strcmp($assign_by_uid,$assign_to_uid))!='0'){
					$query = "SELECT `EMAIL`,`NOTIFICATION`,`USER_ID`,`NAME` FROM KAP_USER_MAIN WHERE `UID` = :assign_to_uid";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(array(':assign_to_uid'=>$assign_to_uid));
					$res = $statement->fetchAll(PDO::FETCH_ASSOC);
					if($res[0]['NOTIFICATION']=='ON' && $res[0]['USER_ID']!=''){
						$message.= $res[0]['NAME']."'.";
$json       = '{"alert":"'. $message .'","title":"'. $title .'","vibrate":true,"sound":"default","icon":"appicon"}';
						
						//die('YES');
						list($status,$response) = CloudLogin(CLOUD_ADMIN,CLOUD_PASSWORD);
						if($status){
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
				
					
				}
				
			}
			else{
				$records = array('Error'=>"Something went wrong, please try again later.");
			}
		}
		else{
			$posts[] = array("Message"=>"You have already assigned quest to this user!");
			$records = $posts;
		}
			
		}
		
		
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