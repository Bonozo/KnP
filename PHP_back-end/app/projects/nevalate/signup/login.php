<?

include "include/session.php";

include "include/z_db.php";

?>
<!doctype html public "-//w3c//dtd html 3.2//en">

<html>

<head>
<title>Class Schedule</title>

<meta name="GENERATOR" content="Arachnophilia 4.0">
<meta name="FORMATTER" content="Arachnophilia 4.0">
<link rel="stylesheet" type="text/css" href="../js/main.css">
<script src="../js/jquery.min.js" type="text/javascript"></script>
<script src="../js/jquery.validate.pack.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#loginform").validate();
});
</script>
</head>

<body bgcolor="#ffffff" text="#000000" link="#0000ff" vlink="#800080" alink="#ff0000">

<form action='loginck.php' method=post id="loginform">
  <table width='100%'  border='0' cellspacing='0' cellpadding='0'>
    <tr>
        <td align='center'><img src='class_schedule.png' border='0'/></td>
    </tr>
   </table>
       <?php 
        if($_REQUEST['error']=="true")
            echo "<div><center><font face='Verdana' size='2' color=red>Wrong Login. Use your correct Userid and Password and Try</center></div>";
        ?>  
    <br>
   <table border='0' cellspacing='0' cellpadding='0' align=center>
        <tr id='cat'>
        <tr> 
            <td bgcolor='#f1f1f1' >
                <font face='verdana, arial, helvetica' size='2' align='center'>  &nbsp;User Name  &nbsp; &nbsp;</font>
            </td> 
            <td bgcolor='#f1f1f1' align='center'>
                <font face='verdana, arial, helvetica' size='2' ><input type ='text'  name='userid' id="userid" class="required"></font>
            </td>
        </tr>

        <tr>
            <td bgcolor='#ffffff' >
                <font face='verdana, arial, helvetica' size='2' align='center'>  &nbsp;Password  </font>
            </td> 
            <td bgcolor='#ffffff' align='center'>
                <font face='verdana, arial, helvetica' size='2' > <input type ='password'  name='password' id="password"class="required"></font>
            </td>
        </tr>

        <tr> 
            <td bgcolor='#f1f1f1' colspan='2' align='center'>
                <div> <font face='verdana, arial, helvetica' size='2' align='center'>  <input type='submit' value='Submit'> <input type='reset' value='Reset'> </font></div>
            </td> 
        </tr>


        <tr> 
            <td bgcolor='#ffffff' >
                <font face='verdana, arial, helvetica' size='2' align='center'> &nbsp;<a href='signup.php'>New Member Sign UP</a></font>
            </td> 
            <td bgcolor='#ffffff' align='center'>
                <div> <font face='verdana, arial, helvetica' size='2' ><a href=forgot-password.php>Forgot Password</a> ?</font></div>
            </td>
        </tr>

        <tr> 
            <td bgcolor='#f1f1f1' colspan='2' align='center'><font face='verdana, arial, helvetica' size='2' align='center'>  
               &nbsp;</font>
            </td> 
        </tr>


</table>
</center>
</form>


</body>

</html>
