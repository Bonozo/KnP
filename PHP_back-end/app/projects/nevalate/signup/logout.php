<?

include "include/session.php";
include "include/z_db.php"; // We must have db connection to change the status of plus_login
$q=mysql_query("update plus_login set status='OFF' where id='$_SESSION[id]'");

session_unset();
session_destroy();

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

echo "<center><font face='Verdana' size='2' >Successfully logged out. <br><br> </font></center>";
require "bottom.php";

?>

</body>

</html>