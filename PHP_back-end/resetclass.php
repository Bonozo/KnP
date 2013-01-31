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
	if(isset($uid, $name, $gender))
	{
		$name = urldecode($name);
		$query = "
			UPDATE KAP_USER_MAIN 
			SET
					NAME = :name , 
					NICK_NAME = :name , 
					GENDER = :gender , 
					MARITIAL_STATUS = 'SINGLE'
			WHERE
					UID = :uid ;
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':name'=>$name,':gender'=>$gender,':uid'=>$uid));

		$posts[] = array("Message"=>"Class choosed");
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