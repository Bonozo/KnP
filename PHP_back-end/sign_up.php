<?php 
header('Content-type: application/json');

include "db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
function Nameize($str,$a_char = array("'","-"," ")){   
    /*
	$str contains the complete raw name string....
	$a_char is an array containing the characters 
	we use as separators for capitalization. 
	If you don't pass anything, there are three in there as default.	 	
	*/
	$string = strtolower($str);
	foreach ($a_char as $temp)
	{
		$pos = strpos($string,$temp);
		if ($pos)
		{
			/*
			we are in the loop because we found one of the special characters in the array, 
			so lets split it up into chunks and capitalize each one.
			*/
			$mend = '';
			$a_split = explode($temp,$string);
			foreach ($a_split as $temp2)
			{
				/*
				capitalize each portion of the string which was separated at a special character				
				*/
				$mend .= ucfirst($temp2).$temp;
			}
			$string = substr($mend,0,-1);
		}   
	}
	return ucfirst($string);
}

if(isset($_GET))
{
	extract($_GET);
	if(isset($password) && isset($name) && isset($email) && isset($gender))
	{
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$records = array('Error'=>"Email address is not correct!");
		}
		else{
			$name = Nameize($name);
			$email = strtolower($email);
			$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
			$query = "SELECT `EMAIL` FROM `KAP_USER_MAIN` WHERE `EMAIL` = :email";
			$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
			$statement->execute(array(':email'=>$email));
			$res = $statement->fetchAll(PDO::FETCH_ASSOC);
	
			$search_for_email = is_value_exists($res,"EMAIL",$email);
	
			if(strcmp($gender,'m') != 0 && strcmp($gender,'f') != 0 ){
				$records = array('Error'=>"Gender must be `m` or `f`");
			}
			else if(strcmp($search_for_email,'-1') != 0){
				$records = array('Error'=>"Email address already exists.");
			} 
			else{
				$query = "INSERT INTO `KAP_USER_MAIN`(`PASSWORD`,`NAME`,`EMAIL`,`GENDER`) 
				VALUES ( :password,:name,:email,:gender);";
				$statement = $dbObj->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
				$result = $statement->execute(
				array(	':password'=>md5($password),
						':name'=>$name,
						':email'=>$email,
						':gender'=>$gender
					));
				$post[] = array("UID"=>$dbObj->lastInsertId(),"Record"=>"Successfully registered with email address '".$email."'!");
				
				$records = array('Record'=>$post);
			}
		}

	}
	else
	{
		$records = array('Error'=>"Bad Request!");
	}
	echo json_indent(json_encode($records));

}


?>