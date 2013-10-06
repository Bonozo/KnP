<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
error_reporting(E_ALL);
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{

		
		$query =   
		   "SELECT KIT.INV_TRANS_ID,KUM.NAME, KIIM.NAME AS 'INV_NAME',KCP.CRAFT_NAME, KIT.UNIT_TRANSFER,KIT.VIEWED, KIT.TRANS_TYPE, 
			DATE_FORMAT(KIT.TIMESTAMP,'%b %d %Y %h: %i %p') AS `DATETIME` 
			FROM 
			`KNP_INVENTORY_TRANSACTION` KIT
			LEFT JOIN 
			`KAP_USER_MAIN` KUM
			ON
			KIT.DONAR_UID = KUM.UID
			LEFT JOIN
			`KNP_INVENTORY_ITEMS_MAIN` KIIM
			ON
			KIT.INVENTORY_ID = KIIM.INVENTORY_ID
			LEFT JOIN
			KNP_CRAFT_MAIN KCP
			ON
			KIT.CRAFT_ID = KCP.CRAFT_ID
			
			WHERE KIT.`BENEFICIARY_UID` = '".$uid."' AND
			KIT.STATUS = 'ACTIVE'
			AND (KIT.TRANS_TYPE = 'GIFT_CRAFT' OR KIT.TRANS_TYPE = 'GIFT_INVENTORY') ORDER BY KIT.VIEWED DESC";
		  // die($query);
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute();
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		$posts = array();
		$counter = 0;
		foreach($res as $result){
			$posts[$counter]['INV_TRANS_ID'] = $result['INV_TRANS_ID'];
			$posts[$counter]['SENDER_NAME'] = $result['NAME'];
			$posts[$counter]['VIEWED'] = $result['VIEWED'];
			$posts[$counter]['DATETIME'] = $result['DATETIME'];
			if($result['TRANS_TYPE']== "GIFT_INVENTORY"){
				$posts[$counter]['GIFT_NAME'] = $result['INV_NAME'];
			}
			else{
				$posts[$counter]['GIFT_NAME'] = $result['CRAFT_NAME'];
			}
			$counter++;
		}
//print_r($res);die();		
		$query = "UPDATE KNP_INVENTORY_TRANSACTION SET VIEWED = 'SEEN' WHERE `BENEFICIARY_UID` = :uid AND `VIEWED` = 'UNSEEN'
AND (TRANS_TYPE = 'GIFT_CRAFT' OR TRANS_TYPE  LIKE '%GIFT%')";
		   
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts[0]);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}



?>