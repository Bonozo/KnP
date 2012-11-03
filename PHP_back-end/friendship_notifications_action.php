<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
//uid=1001&friend_uid=1002&action=denied 
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid) && isset($friend_uid) && isset($action))
	{
		$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
		
		$query = 	"SELECT `STATUS` FROM `FRIENDSHIP_MAIN` 
					WHERE `UID` = :uid AND `FRIEND_UID` = :friend_uid
					";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid,':friend_uid'=>$friend_uid));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		$posts = NULL;
		
		foreach($res as $post){
		  $posts[] = $post;
		}
		if($posts != NULL){
			$query =   
			   "UPDATE 
				   `FRIENDSHIP_MAIN` 
			   SET 
				   `STATUS`=:action
			   WHERE 
				   `UID`=:uid AND 
				   `FRIEND_UID`=:friend_uid";
			
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			
			$error_code = "";
			try{
				$statement->execute(array(':action'=>$action,':uid'=>$uid,':friend_uid'=>$friend_uid));
			}catch(PDOException $pdoException){
				//echo $pdoException->getMessage();
				$error_code = $statement->errorCode();
				if($error_code != ""){
					$posts[] = "ERROR['".$error_code."']: Something went wrong!";
				}
			}
			
			if($error_code == ""){
				$posts = NULL;
				$posts[] = "Successfully added to your friendlist!";
			}
		}
		else{
			$posts[] = "Something went wrong!";
			/*if(strcmp($posts[0],'FRIENDS') == 0){
				$posts = NULL;
				$posts[] = "This person is already your friend!";
			}
			else if(strcmp($posts[0],'REQUEST_PENDING') == 0){
				$posts = NULL;
				$posts[] = "Your friendship request is in pending!";
			}*/
		}
		
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);
		
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>