<?php
header('Content-type: application/json');
/*function lossless_array_merge() {
  $arrays = func_get_args();
  $data = array();
  foreach ($arrays as $a) {
      $data[$k][] = $v;
  }
  return $data;
}

$a = array(1,2,3);
$b = array(1,7,8,9,10);
$union = array_unique(array_merge($a, $b));
print_r($union);
*/

?> 
<?php
$count = 0; 
echo ++$count;

echo "Here we'll see how to create a multi-dimensional array.\n";
$a=array('fruits'=>array('a'=>'orange',
                      'b'=>'grape',c=>'apple'),
            'numbers'=>array(1,2,3,4,5,6),
            'holes'=>array('first',5=>'second',
                                                          'third')
            );
foreach($a as $list=>$things){
	echo $things."\n\n\n";
    foreach($things as $newlist=>$counter){
    echo $counter."\n";
    }
}
?>