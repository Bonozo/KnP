<?php 
/*** SETUP ***************************************************/
    $key        = "a8OaWFJXctl0XXqz1SWMTAGVWwti735p";
    $username   = "mohsin@gmail.com";
    $password   = "test";
    $channel    = "alert";
    $message    = "Testing Push Notification : 2:40";
    $title      = "KnP";
    $tmp_fname  = 'cookie.txt';
//    $json       = '{"alert":"'. $message .'","title":"'. $title .'","vibrate":true,"sound":"default","icon":"appicon"}';
 	$json 		= 'where={"username":"robot1@email.com"}';
    /*** PUSH NOTIFICATION ***********************************/
 
    $post_array = array('login' => $username, 'password' => $password);
 
    /*** INIT CURL *******************************************/
    $curlObj    = curl_init();
    $c_opt      = array(CURLOPT_URL => 'https://api.cloud.appcelerator.com/v1/users/login.json?key='.$key,
                        CURLOPT_COOKIEJAR => $tmp_fname, 
                        CURLOPT_COOKIEFILE => $tmp_fname, 
                        CURLOPT_RETURNTRANSFER => true, 
                        CURLOPT_POST => 1,
                        CURLOPT_POSTFIELDS  =>  "login=".$username."&password=".$password,
                        CURLOPT_FOLLOWLOCATION  =>  1,
                        CURLOPT_TIMEOUT => 60);
 
    /*** LOGIN **********************************************/
    curl_setopt_array($curlObj, $c_opt); 
    $session = curl_exec($curlObj);     
 
    /*** SEND PUSH ******************************************/
    $c_opt[CURLOPT_URL]         = "http://cloud.appcelerator.com/docs/api/v1/users/showme"; 
    $c_opt[CURLOPT_POSTFIELDS]  = "channel=".$channel."&payload=".$json; 
 
    curl_setopt_array($curlObj, $c_opt); 
    $session = curl_exec($curlObj);     
 	print_r($session);
    /*** THE END ********************************************/
    curl_close($curlObj);



?>