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

		
		$query = "SELECT COUNT(uid) AS NUM_OF_INV FROM KNP_INVENTORY_TRANSACTION_SUMMARY WHERE uid = :uid";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$num_of_inv = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		$query = "SELECT COUNT(ASSIGN_TO_UID) AS NUM_OF_QUESTS FROM KNP_ASSIGN_QUESTS WHERE ASSIGN_TO_UID = :uid";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$num_of_quests = $statement->fetchAll(PDO::FETCH_ASSOC);
		
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
		$num_of_friends = $statement->fetchAll(PDO::FETCH_ASSOC);
		////////////////////////////////////////////////////////////
		$query =   
			"SELECT TOTAL_UNIT FROM KNP_INVENTORY_TRANSACTION_SUMMARY WHERE UID = :uid AND INV_ID = '10004'";
		
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res5 = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		if(sizeof($res5) == 0){
			$res5[] = array("TOTAL_UNIT" => "0");
		}

		////////////////////////////////////////////////////////////
		$query1 = "
			SELECT `UID`, `NAME`, `GENDER`, `MARITIAL_STATUS`,  `LAST_LOGIN`, `LEVEL`, `XP`,`ENERGY` FROM `KAP_USER_MAIN` WHERE UID = :uid
				";
		$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement1->execute(array(':uid'=>$uid));
		$res1 = $statement1->fetchAll(PDO::FETCH_ASSOC);
		
		$posts[0]['UID'] = $res1[0]['UID'];
		$posts[0]['NAME'] = $res1[0]['NAME'];
		$posts[0]['GENDER'] = (strcmp($res1[0]['GENDER'],'m') == 0)?'KNIGHT':'PRINCESS';
		$posts[0]['MARITIAL_STATUS'] = $res1[0]['MARITIAL_STATUS'];
		$posts[0]['LAST_LOGIN'] = $res1[0]['LAST_LOGIN'];
		$posts[0]['LEVEL'] = $res1[0]['LEVEL'];
		$posts[0]['XP'] = $res1[0]['XP'];
		$posts[0]['ENERGY'] = $res1[0]['ENERGY'];
		$posts[0]['NUM_OF_QUESTS'] = $num_of_quests[0]['NUM_OF_QUESTS'];
		$posts[0]['NUM_OF_FRIENDS'] = $num_of_friends[0]['NUM_OF_FRIENDS'];
		$posts[0]['NUM_OF_INV'] = $num_of_inv[0]['NUM_OF_INV'];
		$posts[0]['NUM_OF_GOLDS'] = $res5[0]['TOTAL_UNIT'];
		
		
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts[0]);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>