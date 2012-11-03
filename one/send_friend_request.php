<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

if(isset($_GET))
{
	extract($_GET);
	if(isset($uid) && isset($friend_uid))
	{
		$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');

		$dbObj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		
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
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);
		
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>