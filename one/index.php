<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
if(isset($_GET))
{
	extract($_GET);
	if(isset($email) && isset($password))
	{
		$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
		if($dbObj->beginTransaction()){
			$query = "SELECT `UID`,`NAME`,`GENDER` FROM KAP_USER_MAIN WHERE 
			`EMAIL` = '".$email."' AND `PASSWORD` = '".md5($password)."'";
			//echo "BEGIN!";
			$result = $dbObj->queryFetchAllAssoc($query);
			foreach($result as $post){
			  $posts[] = $post;
			}
			if($posts == NULL)
			{
				$posts = array("AuthException"=>"Email address or password is invalid!");
				$records = array('Error'=>$posts);
			}
			else
			{
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
		else{
			$records = array('Error'=>"Cannot connect to server");
		}
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