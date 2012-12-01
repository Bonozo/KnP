<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
$query =   
"SELECT `QUEST_ID`,`QUEST_NAME`, `QUEST_DESCRIPTION`,`KNIFE`,`CONTAINER`,`FLOWER`,`COIN`,`TIMESTAMP`
FROM
`KNP_QUESTS_MAIN`";

$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$statement->execute();
$res = $statement->fetchAll(PDO::FETCH_ASSOC);

foreach($res as $post){
$posts[] = $post;
}
$records = array('Record'=>$posts);//$records = array('Error'=>$posts);
echo json_indent(json_encode($records));


?>