<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
		$query =   
			"SELECT 
				COUNT(M.UID) AS `NUM_OF_FRIENDS` 
			FROM 
				`FRIENDSHIP_MAIN` M 
			WHERE 	
				(M.UID = :uid OR 
				M.FRIEND_UID = :uid) AND 	
				M.STATUS = 'FRIENDS'
			";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		////////////////////////////////////////////////////////////
		$query1 = "
			SELECT `UID`, `NAME`, `LAST_LOGIN`, `LEVEL`, `XP` FROM `KAP_USER_MAIN` WHERE UID = :uid
				";
		$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement1->execute(array(':uid'=>$uid));
		$res1 = $statement1->fetchAll(PDO::FETCH_ASSOC);
		
		$posts['NUM_OF_FRIENDS'] = $res[0]['NUM_OF_FRIENDS'];
		$posts['UID'] = $res1[0]['UID'];
		$posts['NAME'] = $res1[0]['NAME'];
		$posts['LAST_LOGIN'] = $res1[0]['LAST_LOGIN'];
		$posts['LEVEL'] = $res1[0]['LEVEL'];
		$posts['XP'] = $res1[0]['XP'];
		
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>