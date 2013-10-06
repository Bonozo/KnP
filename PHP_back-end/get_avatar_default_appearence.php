<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";

if(isset($_GET))
{
	extract($_GET);
	if(isset($gender))
	{
		$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
		
		$query = "
				 SELECT uwt.WEAR_TYPE_NAME, uda.ID, uw.WEAR_ID, uw.WEAR_TYPE_ID, uw.NAME, uw.DESCRIPTION, uw.IMAGE
				 FROM `USER_DEFAULT_APPEARENCE` uda, `USER_WEAR` uw, `USER_WEAR_TYPE` uwt
				 WHERE 
				 uda.WEAR_ID = uw.WEAR_ID AND 
				 uw.WEAR_TYPE_ID = uwt.WEAR_TYPE_ID AND 
				 uda.GENDER = :gender  
				 ";
		$params = array(':gender'=>$gender);
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute($params);
		$recs = $statement->fetchAll(PDO::FETCH_ASSOC);
		$response = array();
		foreach($recs as $rec){
			$response[$rec['WEAR_TYPE_NAME']] = $rec;
		}
		$records = array('Record'=>$response);
		
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));
}
?>
