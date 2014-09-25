<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";

$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
$query =   
   "SELECT 
		kcm.CRAFT_ID,kcm.CRAFT_NAME, kcm.CRAFT_DESCRIPTION, kcm.IMAGE,
		GROUP_CONCAT(kiim.NAME,CONCAT(':',kci.UNIT)) AS 'INGREDIENTS'
	FROM 
		KNP_CRAFT_MAIN kcm 
	LEFT JOIN 
		KNP_CRAFT_INGREDIENT kci 
	ON 
		kcm.CRAFT_ID = kci.CRAFT_ID
	LEFT JOIN
		KNP_INVENTORY_ITEMS_MAIN kiim
	ON 
		kiim.INVENTORY_ID = kci.INVENTORY_ID
	GROUP BY 
		kcm.CRAFT_ID;
	";

$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$statement->execute();
$res = $statement->fetchAll(PDO::FETCH_ASSOC);
$counter = 0;
foreach($res as $post){
  $posts[$counter]['CRAFT_ID'] = $post['CRAFT_ID'];
  $posts[$counter]['CRAFT_NAME'] = $post['CRAFT_NAME'];
  $posts[$counter]['IMAGE'] = $post['IMAGE'];
  $posts[$counter]['CRAFT_DESCRIPTION'] = $post['CRAFT_DESCRIPTION'];
  $rewards = $post['INGREDIENTS'];
  $reward = explode(",",$rewards);
  foreach($reward as $inventory){
	  $key_value = explode(":",$inventory);
	  $posts[$counter]['INGREDIENTS'][$key_value[0]] = $key_value[1];
  }
  $counter ++;
}
$records = array('Record'=>$posts);//$records = array('Error'=>$posts);

echo json_indent(json_encode($records));



?>