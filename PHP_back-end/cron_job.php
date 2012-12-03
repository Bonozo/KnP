<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);

$query =   
	   "UPDATE 
			`KAP_USER_MAIN` 
		SET 
			ENERGY = ENERGY + 10
		WHERE 
			ENERGY <= ((1000 * `LEVEL`) - 10)";

$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$statement->execute();
$query =   
	   "UPDATE 
			`KAP_USER_MAIN` 
		SET 
			ENERGY = (1000 * `LEVEL`)
		WHERE 
			ENERGY > ((1000 * `LEVEL`) - 10) AND NOT ENERGY = (1000 * `LEVEL`)";

$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$statement->execute();

?>