<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);

//$union = array_unique(array_merge($a, $b));
if(isset($_GET))
{
	extract($_GET);
	if(isset($quest_id))
	{
		$query = "
			SELECT kqm.QUEST_NAME, GROUP_CONCAT(kiim.NAME, CONCAT(':',kqr.UNIT)) AS 'REWARDS' 
			FROM
			KNP_QUESTS_MAIN kqm, KNP_QUESTS_REWARDS kqr, KNP_INVENTORY_ITEMS_MAIN kiim
			WHERE
			kqr.QUEST_ID = kqm.QUEST_ID AND
			kqr.INVENTORY_ID = kiim.INVENTORY_ID AND
			kqm.QUEST_ID = :quest_id
			GROUP BY
			kqm.QUEST_ID";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':quest_id' => $quest_id
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		$counter = 0;
		foreach($res as $post){
			$posts[$counter]['QUEST_NAME'] = $post['QUEST_NAME'];
			$rewards = $post['REWARDS'];
			$reward = explode(",",$rewards);
			foreach($reward as $inventory){
			  $key_value = explode(":",$inventory);
			  $posts[$counter][$key_value[0]] = $key_value[1];
			}
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
?> explode(":",$inventory);
			  $posts[$counter][$key_value[0]] = $key_value[1];
			}
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