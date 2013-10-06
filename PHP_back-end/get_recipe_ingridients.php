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
	if(isset($recipe_id))
	{
		$query = "
				SELECT KIIM.INVENTORY_ID, RCI.AMMOUNT, RCI.CALC_UNIT, KIIM.NAME, KIIM.IMAGE
				FROM `RECIPE_INGRIDIENTS` RCI, `KNP_INVENTORY_ITEMS_MAIN` KIIM
				WHERE RCI.INGREDIENT_ID = KIIM.INVENTORY_ID
				AND RCI.RECIPE_ID = :recipe_id		
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':recipe_id'=>$recipe_id));
		$ingedients = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		foreach($ingedients as $ingedient){
			$posts[] = $ingedient;
		}
	
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts[0]);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>