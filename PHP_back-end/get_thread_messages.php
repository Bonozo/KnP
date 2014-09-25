<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);

if(isset($_GET))
{
	extract($_GET);
	if(isset($sender_id) && isset($receiver_id))
	{
		$query = "
		SELECT `SENDER_UID`,`RECEIVER_UID`,`MESSAGE_TEXT`,DATE_FORMAT(`TIMESTAMP`,'%b %d %Y %h: %i %p') AS DATETIME 
		FROM KNP_MESSAGE_MAIN 
		WHERE 
		(SENDER_UID = :sender_id AND RECEIVER_UID = :receiver_id ) OR 
		(SENDER_UID = :receiver_id AND RECEIVER_UID = :sender_id ) AND `STATUS` = 'READ' ORDER BY `TIMESTAMP` DESC
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':sender_id'=>$sender_id,':receiver_id'=>$receiver_id));
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);

		$res = $statement->fetchAll(PDO::FETCH_ASSOC);

/*		$query = "
		UPDATE `KNP_MESSAGE_MAIN` SET `STATUS`='READ' WHERE `SENDER_UID` = :sender_id AND `RECEIVER_UID` = :receiver_id
		";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(	':sender_id'=>$sender_id,
				':receiver_id'=>$receiver_id
			));
*/		$posts = array();
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