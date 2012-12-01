<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

if(isset($_GET))
{
	extract($_GET);
	if(isset($gender) && isset($uid))
	{
		$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
		$query =   
			"SELECT `UID`,`NAME`,`EMAIL`,`GENDER` FROM KAP_USER_MAIN 
			WHERE 
			`UID` NOT IN (
			   SELECT FRIEND_UID FROM `FRIENDSHIP_MAIN` M WHERE M.UID = :uid AND M.STATUS = 'FRIENDS' AND friend_uid<>:uid
			) 
			AND UID <>:uid 
			AND UID NOT IN (
			   SELECT UID FROM `FRIENDSHIP_MAIN` M WHERE M.FRIEND_UID = :uid AND M.STATUS = 'FRIENDS'
			)
			AND `GENDER` = :gender";
		
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid,':gender'=>$gender));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);

		foreach($res as $post){
		  $posts[] = $post;
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