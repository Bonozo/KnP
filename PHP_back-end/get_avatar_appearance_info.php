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
	if(isset($gender))
	{
		$records = array();
		$sql = "
				SELECT *
				FROM `USER_WEAR_TYPE`
				";
		$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute();
		$recs = $statement->fetchAll(PDO::FETCH_ASSOC);
		foreach($recs as $rec){
			$sql = "SELECT 
						*
					FROM 
						`USER_WEAR`
					WHERE 
						`WEAR_TYPE_ID` = '".$rec['WEAR_TYPE_ID']."' AND
						gender = '".$gender."'
					";
					//echo $sql;
			$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute();
			$record = $statement->fetchAll(PDO::FETCH_ASSOC);
			if(sizeof($record) > 0)
				$records[$rec['WEAR_TYPE_NAME']] = $record;
			//array_push($records, $record);
			//echo $rec['WEAR_TYPE_ID'];
			//print_r(array_filter($records));
		}
	
		$records = array('Record'=>$records);//$records = array('Error'=>$posts[0]);
		//echo json_indent(json_encode($records));
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


