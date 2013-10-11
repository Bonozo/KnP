<?php
include "signup/include/z_db.php";


                        

$data =$_POST['course'];

$sql = "SELECT * FROM  course_list where  course='".$data."' ";


$query=mysql_query($sql);

while($row=mysql_fetch_array($query))
{
    $id=$row['id'];
    $data=$row['title'];
    echo '<input type="checkbox" name="courselist" value="'.$id.'" />'.$data.'<br />';
}

	
          
?>