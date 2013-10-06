<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";

$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
extract($_GET);
$query = "
		SELECT RECIPE_ID,NAME,DESCRIPTION,TIME_DURATION,TYPE
		FROM `RECIPE_MAIN`
		WHERE STATUS = 'ACTIVE'
		";
$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_ASSOC);

foreach($result as $post){
	$posts[] = $post;
}
$records = array('Record'=>$posts);

echo json_indent(json_encode($records));
?>