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
	if(isset($uid)&&isset($user_id))
	{
		
		$query =   
		   "
			SELECT `UID`,`NAME`,`EMAIL`,`USER_ID` FROM KAP_USER_MAIN WHERE `UID` =:uid";

		$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$statement->execute(array(':uid'=>$uid));
		$res = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		//print_r($res);
		$records = $res;
		echo json_indent(json_encode($records));
				//$posts = array();

		foreach($res as $post){
		  $name = $post['NAME'];
		  $email = $post['EMAIL'];
		}
		/*** SETUP ***************************************************/
    $key        = "tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW";
    $username   = "test@email.com";
    $password   = "test";
    $channel    = "alert";
	$user_token_id	= $user_id;
	$name 		= $name;
    $message    = "You have recieved a Quest.";
    $title      = "KnP";
    $tmp_fname  = 'cookie.txt';
    $json       = '{"alert":"'. $message .'","title":"'. $title .'","vibrate":true,"sound":"default","icon":"appicon"}';
	 
		/*** PUSH NOTIFICATION ***********************************/
	 
		$post_array = array('login' => $username, 'password' => $password);
	 
		/*** INIT CURL *******************************************/
		$curlObj    = curl_init();
		$c_opt      = array(CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/users/login.json?key='.$key,
							CURLOPT_COOKIEJAR => $tmp_fname, 
							CURLOPT_COOKIEFILE => $tmp_fname, 
							CURLOPT_RETURNTRANSFER => true, 
							CURLOPT_POST => 1,
							CURLOPT_POSTFIELDS  =>  "login=".$username."&password=".$password,
							CURLOPT_FOLLOWLOCATION  =>  1,
							CURLOPT_TIMEOUT => 60);
	 
		/*** LOGIN **********************************************/
		curl_setopt_array($curlObj, $c_opt); 
		$session = curl_exec($curlObj);     
	 
		/*** SEND PUSH ******************************************/
		$c_opt[CURLOPT_URL]         = "https://api.cloud.appcelerator.com/v1/push_notification/notify.json?key=".$key."&to_ids=".$user_token_id; 
		$c_opt[CURLOPT_POSTFIELDS]  = "channel=".$channel."&payload=".$json; 
	 
		curl_setopt_array($curlObj, $c_opt); 
		$session = curl_exec($curlObj);     
	 
		/*** THE END ********************************************/
		curl_close($curlObj);
		$records = array("Message"=>"Sent!");
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
<?php 



?>