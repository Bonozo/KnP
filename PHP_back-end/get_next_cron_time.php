<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
//$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
//$union = array_unique(array_merge($a, $b));

date_default_timezone_set("UTC");
if($_GET['test']){
	echo date("H:i:s", time()). "\n";
	echo date("H:i:s", strtotime("+15 minutes"));
}
if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
		$sql = "SELECT IF(NEXT_CRON_UPDATE != '00:00:00',
					TIMEDIFF(NEXT_CRON_UPDATE, '" . date("H:i:s", time()) . "'),
					'NULL')  AS 'CRON_COUNTDOWN' FROM KAP_USER_MAIN WHERE UID = '" . $uid . "'";
		$sql = "SELECT TIMEDIFF(NEXT_JOB_TIME, '" . date("H:i:s", time()) . "') AS CRON_COUNTDOWN FROM CRON_JOB ORDER BY JOB_ID DESC LIMIT 1";
		$statement = $dbObj->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute();
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		$time = explode(":",$res[0]['CRON_COUNTDOWN']);
		$records = 
		array('COUNTDOWN' => $res[0]['CRON_COUNTDOWN']);
		
	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
}
$records = array('Record'=>$records);

echo json_indent(json_encode($records));

