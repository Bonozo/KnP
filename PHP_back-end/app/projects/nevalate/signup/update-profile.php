<?

include "include/session.php";
include "include/z_db.php";
//////////////////////////////


?>
<!doctype html public "-//w3c//dtd html 3.2//en">

<html>

<head>
<title>(Type a title for your page here)</title>

<meta name="GENERATOR" content="Arachnophilia 4.0">
<meta name="FORMATTER" content="Arachnophilia 4.0">
</head>

<body >
<?
// check the login details of the user and stop execution if not logged in
require "check.php";

// If member has logged in then below script will be execuated. 
// let us collect all data of the member 
$row=mysql_fetch_object(mysql_query("select * from user where userid='$_SESSION[userid]'"));

//Let us set the period button based on the data of the sex field

if($row->profile == "student"){
$ckb="<input type='radio' value=Student checked name='sex' checked>Student 
<input type='radio' value=Lecturer  name='sex'>Lecturer";}
else {$ckb="<input type='radio' value=Lecturer checked name='sex' >Lecturer 
<input type='radio' value=Student  name='sex' checked>Student";}

// One form with a hidden field is prepared with default values taken from field. 
echo "<form action='update-profileck.php' method=post>
<input type=hidden name=todo value=update-profile>

<table border='0' cellspacing='0' cellpadding='0' align=center width='30%'>
 <tr bgcolor='#ffffff' > <td colspan='2' align='center'>
<font face='verdana, arial, helvetica' size='2' align='center'>&nbsp;<b>Update Profile</b> 
</font></td> </tr>

<tr bgcolor='#f1f1f1'><td ><font face='Verdana' size='2' >&nbsp;Email</td>
<td  ><input type=text name=email value='$row->email'></td></tr>
<tr ><td >&nbsp;<font face='Verdana' size='2' >Name</td>
<td ><font face='Verdana' size='2'><input type=text name=name value='$row->name'></td></tr>

<tr bgcolor='#f1f1f1'><td >&nbsp;<font face='Verdana' size='2' >Sex</td>
<td ><font face='Verdana' size='2'>  $ckb</td></tr>
<tr bgcolor='#ffffff'><td align=center colspan=2><input type=submit value=Update></td></tr>


";


echo "</table>";
require "bottom.php";

?>

</body>

</html>
