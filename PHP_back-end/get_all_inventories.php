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
		$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
		$query =   
		   "SELECT 
				'INV' AS 'CATEGORY', kits.INV_ID AS 'ID', kii.NAME,kii.DESCRIPTION, kii.REQ_GOLD,kii.IMAGE,kii.TYPE,kii.STATUS,kits.TOTAL_UNIT
			FROM 
				KNP_INVENTORY_TRANSACTION_SUMMARY kits,KAP_USER_MAIN kum, KNP_INVENTORY_ITEMS_MAIN kii 
			WHERE
				kits.UID = kum.UID AND
				kii.INVENTORY_ID = kits.INV_ID AND
				NOT kii.INVENTORY_ID = '10004' AND
				NOT kits.TOTAL_UNIT = '0' AND
				kits.UID = :uid
			UNION
			SELECT 
				'CRFT' AS 'CATEGORY', kcts.CRAFT_ID AS 'ID',
				kcm.CRAFT_NAME AS 'NAME', kcm.CRAFT_DESCRIPTION AS 'DESCRIPTION', 'N/A' AS 'REQ_GOLD',kcm.IMAGE, 
				kcm.TYPE, kcm.STATUS, kcts.TOTAL_UNIT 
			FROM 
				KNP_CRAFT_TRANSACTION_SUMMARY kcts, KNP_CRAFT_MAIN kcm
			WHERE
				kcts.CRAFT_ID = kcm.CRAFT_ID AND
				NOT kcts.TOTAL_UNIT = '0' AND
				kcts.UID = :uid";
		
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		$posts = array();
		$counter = 0;
		foreach($res as $post){
			foreach($post as $column_name => $value){
			  $posts[$counter][$column_name] = $value;
			}
			$counter ++;
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