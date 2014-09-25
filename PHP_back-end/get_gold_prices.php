<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
//include "config.php";
//$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
//$union = array_unique(array_merge($a, $b));

$query =   
	"SELECT * FROM KNP_GOLD_PRICES";

$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$statement->execute();
$res = $statement->fetchAll(PDO::FETCH_ASSOC);

foreach($res as $post){
  $posts[] = $post;
}
$records = array('Record'=>$posts);//$records = array('Error'=>$posts);
echo json_indent(json_encode($records));