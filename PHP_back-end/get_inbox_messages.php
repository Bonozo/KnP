<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";

$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
//$union = array_unique(array_merge($a, $b));
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
		$list1 = array();
		$list2 = array();

		$query = "
			SELECT `UID` FROM `KAP_USER_MAIN` WHERE `UID` = :uid
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid'=>$uid
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		if($res[0]['UID'] == ""){
			$records = array("Error" => "Username does not exists!");
		}
		else
		{
			$query = "
				SELECT DISTINCT RECEIVER_UID FROM KNP_MESSAGE_MAIN WHERE SENDER_UID = :uid 
			";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':uid'=>$uid
				));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	
			foreach($res as $post){
				array_push($list1,$post['RECEIVER_UID']);
			}
			//print_r($list1);
			
			$query = "
				SELECT DISTINCT SENDER_UID FROM KNP_MESSAGE_MAIN WHERE RECEIVER_UID = :uid 
			";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':uid'=>$uid
				));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	
			foreach($res as $post){
				array_push($list2,$post['SENDER_UID']);
			}
			//print_r($list2);
	
			$final_list = array_unique(array_merge($list1, $list2));
			$final_list = array_values($final_list);
			if(sizeof($final_list) <= 0){
				$records = array("Message" => "You have no messages!");
			}
			else
			{
			
				//print_r($final_list);
				$posts = array();
				$i = 0;
				foreach($final_list as $friend_uid){
					$query = "
					SELECT 
						`SENDER_UID`,`RECEIVER_UID`,`MESSAGE_TEXT`,`STATUS`,DATE_FORMAT(`TIMESTAMP`,'%b %d %Y %h: %i %p') AS DATETIME 
					FROM 
						KNP_MESSAGE_MAIN KMM
					WHERE
						(`SENDER_UID` = :uid AND
						`RECEIVER_UID` = :friend_uid) OR
						(`SENDER_UID` = :friend_uid AND
						`RECEIVER_UID` = :uid)
					ORDER BY `TIMESTAMP` DESC
					LIMIT 1
					";
					$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
					$statement->execute(
					array(
						':uid' => $uid,
						':friend_uid' => $friend_uid
						));
					$resultset = $statement->fetchAll(PDO::FETCH_ASSOC);
					
		
					foreach($resultset as $row){
						$row_friend_uid = "";
						if($row['SENDER_UID'] == $uid)
							$row_friend_uid = $row['RECEIVER_UID'];
						else
							$row_friend_uid = $row['SENDER_UID'];
						
						$query = "
							SELECT `UID`,`NAME` FROM `KAP_USER_MAIN` WHERE `UID` = :row_friend_uid
						";
						
						$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
						$statement->execute(
						array(
							':row_friend_uid' => $row_friend_uid
							));
						$friend_name = $statement->fetchAll(PDO::FETCH_ASSOC);
						
						
						$posts[$i]['FRIEND_UID'] = $friend_name[0]['UID'];
						$posts[$i]['NAME'] = $friend_name[0]['NAME'];
						foreach($row as $key => $value){
							$posts[$i][$key] = $value;
						}
						//array_push($list2,$post['SENDER_UID']);
					}
					$i++;
				}
				$records = $posts;
			}
		}
		
		
/*		$list1 = array();
		$list2 = array();
		$name_list = array();
		$query = "
			SELECT DISTINCT RECEIVER_UID FROM KNP_MESSAGE_MAIN WHERE SENDER_UID = :sender_id 
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':sender_id'=>$uid
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);

		foreach($res as $post){
			array_push($list1,$post['RECEIVER_UID']);
		}
		////////////////////////////////////////
		foreach($list1 as $get_name){
			$query = "
				SELECT `NAME` FROM KAP_USER_MAIN WHERE `UID`= :get_name";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':get_name'=>$get_name
				));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
			
			foreach($res as $post){
				array_push($name_list,$post['NAME']);
			}
			
		}

		//print_r($name_list);

		////////////////////////////////////////
		
		
		$query = "
			SELECT DISTINCT SENDER_UID FROM KNP_MESSAGE_MAIN WHERE RECEIVER_UID = :sender_id
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':sender_id'=>$uid
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		foreach($res as $post){
			array_push($list2,$post['SENDER_UID']);
		}

		
		$final_list = array_unique(array_merge($list1, $list2));
		$final_list = array_values($final_list);
		//print_r($list1);
		//print_r($list2);
		//print_r($final_list);
		
		$count = 0;
		foreach($final_list as $list){
			$query = "
				SELECT 
					`SENDER_UID`,`RECEIVER_UID`,`MESSAGE_TEXT`,`STATUS`,DATE_FORMAT(`TIMESTAMP`,'%b %d %Y %h: %i %p') AS DATETIME 
				FROM 
					KNP_MESSAGE_MAIN KMM
				WHERE
					(`SENDER_UID` = :sender_id AND
					`RECEIVER_UID` = :list) OR
					(`SENDER_UID` = :list AND
					`RECEIVER_UID` = :sender_id)
				ORDER BY `TIMESTAMP` DESC
				LIMIT 1
			";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(
			array(
				':sender_id'=>$uid,
				':list'=>$list,
				
				));
			
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
			foreach($res as $post){
			  $posts[] = $post;
			  
			}
			
			  foreach($posts as $index=>$val){  
				
				foreach($name_list as $name){
					$inbox = array(
					'NAME'=>$name,	
					'MESSAGE'=>$val['MESSAGE_TEXT'],
					'TIME'=>$val['DATETIME'],
					'STATUS'=>$val['STATUS']
					);
					$count++;
				
				}
				
			}
			$records = array('Record'=>$inbox);
		}
*/	}
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
?>