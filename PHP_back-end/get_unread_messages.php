<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
		$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');

if(isset($_GET))
{
	extract($_GET);
	if(isset($sender_id) && isset($receiver_id))
	{
		$query = "
				SELECT 
					`SENDER_UID`,`RECEIVER_UID`,`MESSAGE_TEXT`,`STATUS` 
				FROM 
					KNP_MESSAGE_MAIN 
				WHERE
					`SENDER_UID` = :sender_id AND
					`RECEIVER_UID` = :receiver_id AND
					`STATUS` = 'UNREAD'
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':sender_id'=>$sender_id,':receiver_id'=>$receiver_id));
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);

		$res = $statement->fetchAll(PDO::FETCH_ASSOC);

		$query = "
		UPDATE `KNP_MESSAGE_MAIN` SET `STATUS`='READ' WHERE `SENDER_UID` = :sender_id AND `RECEIVER_UID` = :receiver_id
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(	':sender_id'=>$sender_id,
				':receiver_id'=>$receiver_id
			));
		
		foreach($result as $post){
		$posts[] = $post;
		}
		$records = array('Record'=>$posts);
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
?>