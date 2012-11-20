<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');

if(isset($_GET))
{
	extract($_GET);
	if(isset($sender_id) && isset($receiver_id) && isset($message))
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

echo json_indent(json_encode($records));
?>