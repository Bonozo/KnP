<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
$query =   
   "SELECT 
		`INVENTORY_ID`, `NAME`, `DESCRIPTION`, `REQ_GOLD`, `IMAGE`
	FROM
		`KNP_INVENTORY_ITEMS_MAIN`
	WHERE
		NOT `INVENTORY_ID` = '10004'
	";

$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$statement->execute();
$res = $statement->fetchAll(PDO::FETCH_ASSOC);

foreach($res as $post){
  $posts[] = $post;
}

$records = array('Record'=>$posts);//$records = array('Error'=>$posts);
echo json_indent(json_encode($records));



?>