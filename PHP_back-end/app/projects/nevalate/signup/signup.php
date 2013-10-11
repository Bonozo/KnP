<?

include "include/z_db.php";// database connection details stored here

?>
<!doctype html public "-//w3c//dtd html 3.2//en">

<html>

<head>
<title>Class Schedule</title>
<script src="../js/jquery.min.js" type="text/javascript"></script>
<script src="../js/jquery.validate.pack.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#signupform").validate();
});


</script>

<meta name="GENERATOR" content="Arachnophilia 4.0">
<meta name="FORMATTER" content="Arachnophilia 4.0">
</head>

<body bgcolor="#ffffff" text="#000000" link="#0000ff" vlink="#800080" alink="#ff0000">

<table border='0' width='50%' cellspacing='0' cellpadding='0' align=center>
<form name="signupform" method=post action=signupck.php id="signupform"><input type=hidden name=todo value=post>

<tr bgcolor='#f1f1f1'><td align=center colspan=2><font face='Verdana' size='2' ><b>Signup</b></td></tr>
<tr ><td >&nbsp;<font face='Verdana' size='2' >User Name (alphanumeric  chars only)</td>
<td ><font face='Verdana' size='2'><input type=text name="userid" id="userid" class="required"></td></tr>

<tr bgcolor='#f1f1f1'><td >&nbsp;<font face='Verdana' size='2' >Password</td>
<td ><font face='Verdana' size='2'><input type=password name="password" id="password"class="required"></td></tr>

<tr ><td >&nbsp;<font face='Verdana' size='2' >Re-enter Password</td>
<td ><font face='Verdana' size='2'><input type=password name=password2 id="password2" class="required"></td></tr>


<tr bgcolor='#f1f1f1'><td ><font face='Verdana' size='2' >&nbsp;Email</td>
<td  ><input type=text name=email id="email"class="email"></td></tr>

<tr ><td >&nbsp;<font face='Verdana' size='2' >Name</td>
<td ><font face='Verdana' size='2'><input type=text name=name id="name" class="required"></td></tr>

<tr bgcolor='#f1f1f1'><td >&nbsp;<font face='Verdana' size='2' >Profile</td>
<td ><font face='Verdana' size='2'>  <input type='radio' value=Student checked name='sex'>Student <input type='radio' value=Lecturer  name='sex'>Lecturer</td></tr>

<tr ><td >&nbsp;<font face='Verdana' size='2' >I agree to terms and conditions</td>
<td ><font face='Verdana' size='2'><input type=checkbox name=agree value='yes'></td></tr>

<tr bgcolor='#f1f1f1'><td align=center colspan=2><input type=submit value=Signup></td></tr>
</table>


</body>

</html>
