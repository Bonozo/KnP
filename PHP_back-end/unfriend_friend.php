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
	if(isset($uid, $friend_uid))
	{
		$name = urldecode($name);
		$query = "
			DELETE FROM `FRIENDSHIP_MAIN`
			WHERE
			(UID = :uid AND FRIEND_UID = :friend_uid) OR (UID = :friend_uid AND FRIEND_UID = :uid);";
					//die($query);
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid,':friend_uid'=>$friend_uid));

		$posts[] = array("Message"=>"Successfully unfriend!");
		$records = $posts;
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
?>