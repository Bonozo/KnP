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
$message    = "You have received Gift from '";
$title      = "Knights And Princesses";

if(isset($_GET))
{
	extract($_GET);
	if(isset($sender_id,$receiver_id,$gift_type,$gift_id))//($sender_id,$receiver_id,$gift_type,$gift_id))
	{
		$query = "";
		if(strcmp($gift_type,'CRAFT') == 0){
			$query = "SELECT IF((SELECT TOTAL_UNIT FROM KNP_CRAFT_TRANSACTION_SUMMARY WHERE UID = :sender_id AND CRAFT_ID = :gift_id) > 0,
			'AVAILABLE','NOT_AVAILABLE') AS 'CRAFT'";
		}
		else if(strcmp($gift_type,'INVENTORY') == 0){
			$query = "SELECT IF((SELECT TOTAL_UNIT FROM KNP_INVENTORY_TRANSACTION_SUMMARY WHERE UID = :sender_id AND INV_ID = :gift_id) > 0,
			'AVAILABLE','NOT_AVAILABLE') AS 'INVENTORY'";
		}
		else if(strcmp($gift_type,'COOKING') == 0){
			$query = " SELECT IF( (
						SELECT UNIT
						FROM USER_COOKING_SUMMARY
						WHERE UID = :sender_id
						AND RECIPE_ID = :gift_id
						) >0, 'AVAILABLE', 'NOT_AVAILABLE' ) AS 'COOKING'";
		}
		
		if($query <> ""){
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(array(':sender_id'=>$sender_id,':gift_id'=>$gift_id));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);

			if(strcmp($res[0][$gift_type],'AVAILABLE') == 0){
				if(strcmp($gift_type,'CRAFT') == 0){
					/*
					 * CRAFT
					 */
					$query = "INSERT INTO
					 `KNP_INVENTORY_TRANSACTION`
					 (`DONAR_UID`,
					 `BENEFICIARY_UID`,
					 `CRAFT_ID`,
					 `UNIT_TRANSFER`,
					 `TRANS_TYPE`,
					 `COMMENTS`) 
					VALUES 
					 (:sender_id,
 					  :receiver_id,
					  :gift_id,
					 '1',
					 'GIFT_CRAFT',
					 'Craft send as gift')";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(array(
					':sender_id'=>$sender_id,
					':receiver_id'=>$receiver_id,
					':gift_id'=>$gift_id
					));
					if($dbObj->lastInsertId() != "" && $dbObj->lastInsertId() != NULL && $dbObj->lastInsertId() != 0){
						$query = "
						UPDATE 
							`KNP_CRAFT_TRANSACTION_SUMMARY` 
						SET 
							TOTAL_UNIT = TOTAL_UNIT - 1
						WHERE
							UID = :sender_id AND
							CRAFT_ID = :gift_id
						";
						
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':sender_id' => $sender_id,
							':gift_id' => $gift_id
							));
						
						$query = "
						UPDATE 
							`KNP_CRAFT_TRANSACTION_SUMMARY` 
						SET 
							TOTAL_UNIT = TOTAL_UNIT + 1
						WHERE
							UID = :receiver_id AND
							CRAFT_ID = :gift_id;
						";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':receiver_id' => $receiver_id,
							':gift_id' => $gift_id
							));

						if($statement->rowCount() == 0){
							$query = 
							"INSERT INTO KNP_CRAFT_TRANSACTION_SUMMARY 
							(`UID`,`CRAFT_ID`,`TOTAL_UNIT`,`CONSUMED_UNIT`) 
							VALUES 
							( :receiver_id, :gift_id, '1', '0');
							";
							$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement->execute(
							array(
								':receiver_id' => $receiver_id,
								':gift_id' => $gift_id
								));
							
						}
						$query = "
						INSERT INTO 
							`KNP_MESSAGE_MAIN`
								(`SENDER_UID`,
								`RECEIVER_UID`,
								`MESSAGE_TEXT`,
								`STATUS`) 
							VALUES 
								(:sender_id,
								 :receiver_id,
								 'I SENT YOU A GIFT!',
								 'UNREAD') 
						";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':sender_id' => $sender_id,
							':receiver_id' => $receiver_id
							));
						$records = array("Message"=>"Gift successfully sent!");
					}
					else{
						$records = array("Message"=>"Transaction NOT committed!");
					}  
				}
				else if(strcmp($gift_type,'INVENTORY') == 0){
					/*
					 * INVENTORY
					 */
					$task_detail_id = 3006;
					$apple_inv_id = 10060;

					$query = "INSERT INTO
					 `KNP_INVENTORY_TRANSACTION`
					 (`DONAR_UID`,
					 `BENEFICIARY_UID`,
					 `INVENTORY_ID`,
					 `UNIT_TRANSFER`,
					 `TRANS_TYPE`,
					 `COMMENTS`) 
					VALUES 
					 (:sender_id,
 					  :receiver_id,
					  :gift_id,
					 '1',
					 'GIFT_INVENTORY',
					 'Inventory send as gift')";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(array(
					':sender_id'=>$sender_id,
					':receiver_id'=>$receiver_id,
					':gift_id'=>$gift_id
					));
					if($dbObj->lastInsertId() != "" && $dbObj->lastInsertId() != NULL && $dbObj->lastInsertId() != 0){
						$query = "
						UPDATE 
							`KNP_INVENTORY_TRANSACTION_SUMMARY` 
						SET 
							TOTAL_UNIT = TOTAL_UNIT - 1
						WHERE
							UID = :sender_id AND
							INV_ID = :gift_id
						";
						
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':sender_id' => $sender_id,
							':gift_id' => $gift_id
							));
						
						$query = "
						UPDATE 
							`KNP_INVENTORY_TRANSACTION_SUMMARY` 
						SET 
							TOTAL_UNIT = TOTAL_UNIT + 1
						WHERE
							UID = :receiver_id AND
							INV_ID = :gift_id;
						";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':receiver_id' => $receiver_id,
							':gift_id' => $gift_id
							));

						if($statement->rowCount() == 0){
							$query = 
							"INSERT INTO KNP_INVENTORY_TRANSACTION_SUMMARY 
							(`UID`,`INV_ID`,`TOTAL_UNIT`,`CONSUMED_UNIT`) 
							VALUES 
							( :receiver_id, :gift_id, '1', '0');
							";
							$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement->execute(
							array(
								':receiver_id' => $receiver_id,
								':gift_id' => $gift_id
								));
							
						}
						$query = "
						INSERT INTO 
							`KNP_MESSAGE_MAIN`
								(`SENDER_UID`,
								`RECEIVER_UID`,
								`MESSAGE_TEXT`,
								`STATUS`) 
							VALUES 
								(:sender_id,
								 :receiver_id,
								 'I SENT YOU A GIFT!',
								 'UNREAD') 
						";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':sender_id' => $sender_id,
							':receiver_id' => $receiver_id
							));
						$query = "SELECT `NAME`,`GENDER` FROM KAP_USER_MAIN WHERE `UID` = :sender_id";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(array(':sender_id'=>$sender_id));
						$res = $statement->fetchAll(PDO::FETCH_ASSOC);
						$sender_name = $res[0]['NAME'];
						$static_message = ($res[0]['NAME'] == 'm')?"your knight has sent you a gift":"your prince has sent you a gift";
							
						$query = "SELECT `USER_ID`,`NOTIFICATION`,`NAME` FROM KAP_USER_MAIN WHERE `UID` = :receiver_id";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(array(':receiver_id'=>$receiver_id));
						$res = $statement->fetchAll(PDO::FETCH_ASSOC);
						if($res[0]['NOTIFICATION']=='ON' && $res[0]['USER_ID']!=''){
							//$message.= $sender_name."'.";
							$json       = '{"alert":"'. $static_message .'","title":"'. $title .'","vibrate":true,"sound":"default","icon":"appicon"}';
								
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
						if(strcmp($gift_id."",$apple_inv_id."") == 0){
							$sql = "
									SELECT COUNT(UID) AS 'EXISTS' FROM USER_TASK_DETAILS WHERE UID = '".$sender_id."' AND TASK_DETAIL_ID = '".$task_detail_id."' 
									";

							$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
							$statement->execute();
							$res = $statement->fetchAll(PDO::FETCH_ASSOC);
							if(strcmp($res[0]['EXISTS']."","0") == 0){

								$sql = "
										INSERT INTO `USER_TASK_DETAILS` (`UID`,`TASK_DETAIL_ID`,`STATUS`)
										VALUES
										( '".$sender_id."', '".$task_detail_id."', 'COMPLETED' )
										";
								$params = array(
									':uid' => $sender_id,
									':task_detail_id' => $task_detail_id,
									':status' => 'COMPLETED'
									);
								$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
								$statement->execute();
							}
						}

							
						$records = array("Message"=>"Gift successfully sent!");
					}
					else{
						$records = array("Message"=>"Transaction NOT committed!");
					}
				}
				else if(strcmp($gift_type,'COOKING') == 0){

					$task_detail_id = 3008;
					$apple_pie_cooking_id = 1001;
					/*
					 * COOKING
					 */
					$query = "INSERT INTO
					 `KNP_INVENTORY_TRANSACTION`
					 (`DONAR_UID`,
					 `BENEFICIARY_UID`,
					 `CRAFT_ID`,
					 `UNIT_TRANSFER`,
					 `TRANS_TYPE`,
					 `COMMENTS`) 
					VALUES 
					 (:sender_id,
 					  :receiver_id,
					  :gift_id,
					 '1',
					 'GIFT_COOKING',
					 'Cooking send as gift')";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(array(
					':sender_id'=>$sender_id,
					':receiver_id'=>$receiver_id,
					':gift_id'=>$gift_id
					));
					$query = "
					UPDATE 
						`USER_COOKING_SUMMARY` 
					SET 
						UNIT = UNIT - 1
					WHERE
						UID = :sender_id AND
						RECIPE_ID = :gift_id
					";
					
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(
					array(
						':sender_id' => $sender_id,
						':gift_id' => $gift_id
						));
					
					$query = "
					UPDATE 
						`USER_COOKING_SUMMARY` 
					SET 
						UNIT = UNIT + 1
					WHERE
						UID = :receiver_id AND
						RECIPE_ID = :gift_id;
					";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(
					array(
						':receiver_id' => $receiver_id,
						':gift_id' => $gift_id
						));

					if($statement->rowCount() == 0){
						$query = 
						"INSERT INTO USER_COOKING_SUMMARY 
						(`UID`,`RECIPE_ID`,`UNIT`,`CONSUMED_UNIT`) 
						VALUES 
						( :receiver_id, :gift_id, '1', '0');
						";
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':receiver_id' => $receiver_id,
							':gift_id' => $gift_id
							));
						
					}
					$query = "
					INSERT INTO 
						`KNP_MESSAGE_MAIN`
							(`SENDER_UID`,
							`RECEIVER_UID`,
							`MESSAGE_TEXT`,
							`STATUS`) 
						VALUES 
							(:sender_id,
							 :receiver_id,
							 'I SENT YOU A GIFT!',
							 'UNREAD') 
					"; 
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(
					array(
						':sender_id' => $sender_id,
						':receiver_id' => $receiver_id
						));
					//TASK #3 
					if($gift_id == $apple_pie_cooking_id){
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
					}
						
					$records = array("Message"=>"Gift successfully sent!");
				}
			}
			else{
				$records = array("Message"=>"You do not more longer this item to gift.");
			}
		}
		else
		{
			$records = array("Message"=>"Operation failed. Unknown gift type" . $query);
		}
	}
	else
	{
		$records = array("Request"=>"Bad Request!");
	}

}
else
{
	$records = array("Request"=>"Bad Request!");
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

function GiftCraft(){
	
}
?>