<?php
header('Content-type: application/json');
include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

if(isset($_GET))
{
	$dbObj = new sdb("mysql:host=174.132.165.194;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
	extract($_GET);
	if(isset($uid))
	{
		$query = "
				SELECT 
					IF((
						SELECT 
							COUNT(`MESSAGE_ID`)
						FROM 
							`KNP_MESSAGE_MAIN` 
						WHERE 
							`RECEIVER_UID` = :uid AND 
							`STATUS` = 'UNREAD') > 0,
						'NEW_MESSAGE',
						'NO_MESSAGE')
					AS 
						'MESSAGE', 
					IF((
						SELECT 
							COUNT(`STATUS`)
						FROM
							`FRIENDSHIP_MAIN`
						WHERE
							`FRIEND_UID` = :uid	AND
							`STATUS` = 'REQUEST_PENDING')>0,
							'NEW_REQUEST',
							'NO_REQUEST') 
					AS 
						'REQUEST'
				";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);

		foreach($result as $post){
		$posts[] = $post;
		}
		$records = array('Record'=>$posts);
	}
	else
	{
		$posts = array("Request"=>"Bad Request!");
		$records = array('Error'=>$posts);
	}

}
else
{
	$posts = array("Request"=>"Bad Request!");
	$records = array('Error'=>$posts);
}

echo json_indent(json_encode($records));
?>