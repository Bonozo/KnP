<?

include "include/session.php";
include "include/z_db.php";
//////////////////////////////

$userid=$_POST['userid'];
$password=$_POST['password'];
?>
<!doctype html public "-//w3c//dtd html 3.2//en">

<html>

<head>
<title>(Type a title for your page here)</title>
<meta name="GENERATOR" content="Arachnophilia 4.0">
<meta name="FORMATTER" content="Arachnophilia 4.0">
</head>

<body bgcolor="#ffffff" text="#000000" link="#0000ff" vlink="#800080" alink="#ff0000">
<?
$userid=mysql_real_escape_string($userid);
$password=mysql_real_escape_string($password);

if($rec=mysql_fetch_array(mysql_query("SELECT * FROM user WHERE user_name='$userid' AND password = '$password'")))
    {
	if(($rec['user_name']==$userid)&&($rec['password']==$password))
            {
                    include "include/newsession.php";
                    $tm=date("Y-m-d H:i:s");
?>
    
                    <script type="text/javascript" >
                        var name= "<?php  echo $rec['name']; ?>";
                    
                       localStorage.setItem('username',name); 
                   
                    </script>
<?php                    
                   $_SESSION['name'] = $rec['name'];
                    //$ip=@$REMOTE_ADDR; 
                    // The above line is commented and the line below is used for the servers where register_global=Off
                    $ip=$_SERVER['REMOTE_ADDR'];
                    $rt=mysql_query("insert into plus_login(id,userid,ip,tm) values('$_SESSION[id]','$_SESSION[userid]','$ip','$tm')");
                    header('Location: ../profile_set.html');
	    } 
  }	
else {
		session_unset();
                header('Location: ../signup/login.php?error=true');
  	
	}
?>
</body>
</html>
