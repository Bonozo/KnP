<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
include "config.php";
$dbObj = new sdb("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);

if(isset($_GET))
{
	extract($_GET);
	if(isset($email) && isset($password))
	{
		//$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
		$query = "SELECT `UID`,`NAME`,`GENDER` FROM KAP_USER_MAIN WHERE 
		`EMAIL` = :email AND `PASSWORD` = :password";
		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(
		array(
			':email' => $email,
			':password' => md5($password)			
			));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		foreach($res as $post){
		  $posts[] = $post;
		}
		if($posts == NULL)
		{
			$posts = array("AuthException"=>"Email address or password is invalid!");
			$records = array('Error'=>$posts);
			$query1 = "UPDATE `KAP_USER_MAIN` SET LOGIN_ATTEMPTS = LOGIN_ATTEMPTS+1,LAST_LOGIN_ATTEMPT = NOW() WHERE `email`= :email";
			$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement1->execute(array(
				':email'=>$email
			));
		}
		else
		{
			
			$query1 = "UPDATE `KAP_USER_MAIN` SET `LAST_LOGIN`=NOW(), `LOGIN_ATTEMPTS` = '0' WHERE `email`= :email";
			$statement1 = $dbObj->prepare($query1, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement1->execute(array(
				':email'=>$email
			));
			$records = array('Record'=>$posts);//$records = array('Error'=>$posts);
		}
		
		//print_r($result );
		/*for($post = mysql_fetch_assoc($result)) {
		  $posts[] = array('post'=>$post);
		}*/
		//   echo json_indent(json_encode(array('posts'=>$posts)));
		//$result = $dbObj->queryFetchAllAssoc("SELECT * FROM KAP_USER_MAIN");
	//	print_r($result);
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

/*

$data['data'] =array("id"=>"dt120","description"=>"Hello World");
$arr = array('data'=>$data);
$data['data'] =array("id"=>"dt121","description"=>"Hello World1");
array_push($arr,$data['data']);//array('data'=>$data);
$data['data'] =array("id"=>"dt122","description"=>"Hello World2");
$arr = array('data'=>$data);
//$arr = array('data'=>$data);
					
echo json_indent(json_encode($arr));
*/
?>