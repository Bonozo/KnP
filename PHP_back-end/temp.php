<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
		/*
		
10000005, 10000006, 10000009,10000010,10000011,10000012,10000013,
10000024, 10000025,10000026,10000027,10000029,10000030,10000031,10000032
10000035, 10000038, 10000039, 10000042, 10000043,10000044 ,10000045
		*/
		$arr = array(
		10000005, 10000006, 10000009, 10000010, 10000011, 10000012, 10000013, 
		10000024, 10000025, 10000026, 10000027, 10000029, 10000030, 10000031,
		10000032, 10000035, 10000038, 10000039, 10000042, 10000043, 10000044);
		
		$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
		foreach($arr as $value){
		$query =   
		   "
			INSERT INTO KNP_INVENTORY_TRANSACTION_SUMMARY 
				(UID, 
				INV_ID, 
				TOTAL_UNIT, 
				CONSUMED_UNIT
				
				)
				VALUES
				(".$value.", 
				'10004', 
				'0', 
				'0'
				
				);
		   ";
		   
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute();
		}

		
		

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>