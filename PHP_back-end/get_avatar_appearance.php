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
			   "SELECT uwi.`UID`,uwt.`WEAR_TYPE_ID`,uw.`WEAR_ID`,uwt.`WEAR_TYPE_NAME`,uw.`NAME`,uw.`IMAGE`
				FROM 
					`USER_WEAR_TYPE` uwt
				LEFT JOIN 
					`USER_WEAR` uw 
				ON 
					uwt.`WEAR_TYPE_ID`= uw.`WEAR_TYPE_ID`
				LEFT JOIN 
					`USER_WEAR_INFO` uwi
				ON 
					uwt.`WEAR_TYPE_ID` = uwi.`WEAR_TYPE_ID`
				AND 
					uw.`WEAR_ID` = uwi.`WEAR_ID`
				WHERE 
					uwi.UID = :uid";
		   
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		//print_r($res);
		
		$records = array('Record'=>$res);//$records = array('Error'=>$posts[0]);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}



?>