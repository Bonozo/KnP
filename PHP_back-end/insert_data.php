<?php 
if(isset($_POST) && $_POST!= NULL)
{
	include "db/db.php";
	extract($_POST);
//	die($username);
	$statement = "INSERT INTO `KAP_USER_MAIN`(`USERNAME`,`PASSWORD`,`EMAIL`) VALUES ( '".$username."','".md5($password)."','".$email."');";
	$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'mohsin13_dev', 'reaction');
	if($dbObj->beginTransaction()){
		$dbObj->exec($statement);
	}

}

?>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sign Up</title>
<style type="text/css">
body {
	background-color: #D6D6D6;
}
</style>
</head>

<body>
<form id="form1" name="form1" method="post" action="">
<table width="100%" border="0" cellspacing="5" cellpadding="5">
  <tr>
    <th colspan="2" align="left" bgcolor="#CCCCCC" scope="row"><h2>Sign Up</h2></th>
    </tr>
  <tr>
    <th width="30%" align="right" scope="row">Username</th>
    <td width="70%"><label for="username"></label>
      <input type="text" required name="username" id="username" /></td>
  </tr>
  <tr>
    <th width="30%" align="right" scope="row">Password</th>
    <td width="70%"><label for="password"></label>
      <input type="password" required name="password" id="password" /></td>
  </tr>
  <tr>
    <th width="30%" align="right" scope="row">Email Address</th>
    <td width="70%"><label for="email"></label>
      <input type="email" required name="email" id="email" /></td>
  </tr>
  <tr>
    <th width="30%" align="right" scope="row">&nbsp;</th>
    <td width="70%">
      <input type="submit" required name="submit" id="submit" value="Submit" />
    </td>
  </tr>
</table>
</form>
</body>
</html>