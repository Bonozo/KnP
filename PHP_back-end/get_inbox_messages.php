<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
//$union = array_unique(array_merge($a, $b));
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
		$list1 = array();
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
				$func = array('Record'=>$inbox);
				}
				
			}
			
			//print_r($inbox);
			
				//print_r("DATA".$posts);
	
		/*foreach($posts as $index=>$val){  
			/*foreach($val as $key => $value) {
  				$mes =  $val['MESSAGE_TEXT'];
				$sts = $val['STATUS'];
				$time = $val['DATETIME'];
				foreach($name_list as $name){
					$inbox = array(
					'NAME'=>$name,	
					'MESSAGE'=>$mes,
					'TIME'=>$val['DATETIME'],
					'STATUS'=>$val['STATUS']
					);
				print_r($inbox);
				}*/
			
/*			foreach($val as $key => $value) {
		
				$mes =  $val['MESSAGE_TEXT'];
				$sts = $val['STATUS'];
				$time = $val['DATETIME'];
				array_push($inbox,$value);
//				echo $value;
		
			}*/
		}
		
		
		
		$posts[] = "Successfully sent!";
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
echo json_indent(json_encode($func));
?>