<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');

if(isset($_GET))
{
	extract($_GET);
	if(isset($uid))
	{
		$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
		if($gold == '1'){
			$query =   
				"SELECT 
				kup.`UID`,kup.`NAME`,kup.`EMAIL`,kup.`GENDER`,DATE_FORMAT(kup.`LAST_LOGIN`,'%b %d %Y, %h:%i %p') AS LAST_LOGIN, kits.TOTAL_UNIT
FROM KAP_USER_MAIN kup
				LEFT JOIN
					KNP_INVENTORY_TRANSACTION_SUMMARY kits
				ON
					kup.UID = kits.UID 
				WHERE kits.INV_ID = :inv_id 
				ORDER BY 
					kits.TOTAL_UNIT DESC

				";
				$params = array(':inv_id'=>'10004');
			
		}
		else{
			$query =   
				"SELECT `UID`,`NAME`,`EMAIL`,`GENDER` FROM KAP_USER_MAIN 
				WHERE 
				`UID` NOT IN (
				   SELECT FRIEND_UID FROM `FRIENDSHIP_MAIN` M WHERE M.UID = :uid AND M.STATUS = 'FRIENDS' AND friend_uid<>:uid
				) 
				AND UID <>:uid 
				AND UID NOT IN (
				   SELECT UID FROM `FRIENDSHIP_MAIN` M WHERE M.FRIEND_UID = :uid AND M.STATUS = 'FRIENDS'
				)
				";
			if(isset($gender)){
				$gender_clause = " AND `GENDER` = :gender ";
				$params = array(':uid'=>$uid,':gender'=>$gender);
			}
			else{
				$gender_clause = "";
				$params = array(':uid'=>$uid);
			}
			$query .= $gender_clause;
		}
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute($params);
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);

		foreach($res as $post){
		  $posts[] = $post;
		}
		$records = array('Record'=>$posts);//$records = array('Error'=>$posts);

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>