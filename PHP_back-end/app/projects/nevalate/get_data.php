<?php
include "signup/include/z_db.php";


                        
$table =$_POST['table'];
$data =$_POST['data'];

$sql = "SELECT * FROM  ".$table." ";
switch($table)
{
    case "institution":
           $sql .= "where country ='".$data."' ";
    break;
   case "faculty":
           $sql .= "where institution ='".$data."'";
    break;
  case "course":
           $val = split('-',$data);
           $status = $val[0];
           $faculty = $val[1];
           $sql .= "where faculty ='".$faculty."' and status='".$status."'";
    break;
    
}

$query=mysql_query($sql);
echo '<option value=N/A>select</option>';
  while($row=mysql_fetch_array($query))
{
$id=$row['id'];
$data=$row['name'];
echo '<option value="'.$data.'">'.$data.'</option>';
}

	
          
?>