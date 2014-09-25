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

		$query = "
				SELECT 
					COUNT(M.UID) AS `NUM_OF_FRIENDS` 
				FROM 
					`FRIENDSHIP_MAIN` M 
				WHERE 
					(M.UID = :uid OR M.FRIEND_UID = :uid) AND 
					M.STATUS = 'FRIENDS' 
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':uid'=>$uid
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	
		$posts = array();
		foreach($res as $post){
			$posts[] = $post;
		}
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