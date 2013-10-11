<?
error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR);

$dbservertype='mysql';

$servername='www.gjmhrc.com';

$dbusername='gjmhrc_root';
$dbpassword='root123';

$dbname='gjmhrc_classschedule';



////////////////////////////////////////
////// DONOT EDIT BELOW  /////////
///////////////////////////////////////

connecttodb($servername,$dbname,$dbusername,$dbpassword);
function connecttodb($servername,$dbname,$dbuser,$dbpassword)
{
global $link;
$link=mysql_connect ("$servername","$dbuser","$dbpassword");
if(!$link){die("Could not connect to MySQL".mysql_error());}
mysql_select_db("$dbname",$link) or die ("could not open db".mysql_error());
}
?>