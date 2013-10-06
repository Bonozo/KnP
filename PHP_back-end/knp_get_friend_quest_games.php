<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
//$union = array_unique(array_merge($a, $b));
if(isset($_GET))
{
	extract($_GET);
	if(isset($assign_quest_id))
	{
		$query = "
SELECT TIMEDIFF(KAQ.EXPIRED_TIME,NOW()) AS 'EXPIRED_TIME', KAQG.QUEST_ID, KQM.QUEST_NAME,KQM.QUEST_IMAGE,KQM.QUEST_DESCRIPTION,KAQG.STATUS 
FROM KNP_ASSIGN_QUEST_GAMES KAQG
LEFT JOIN
KNP_QUESTS_MAIN KQM
ON
KQM.QUEST_ID = KAQG.QUEST_ID
LEFT JOIN
KNP_ASSIGN_QUESTS KAQ
ON
KAQ.ASSIGN_QUEST_ID = KAQG.ASSIGN_QUEST_ID
WHERE
KAQG.ASSIGN_QUEST_ID = :assign_quest_id

		
";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':assign_quest_id'=>$assign_quest_id
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	
		$posts = array();
		foreach($res as $post){
			$posts[] = $post;
		}
		$records = $posts;
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
}
else
{
	$records = array('Error'=>"Bad Request!");
}
$records = array('Record'=>$records);

echo json_indent(json_encode($records));
?>
