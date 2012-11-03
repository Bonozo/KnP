<?php
//S83HSGGH5J
include "../db/db.php";
include "functions/misc.php";
ini_set('memory_limit', '256M');
$dbObj = new sdb("mysql:host=localhost;dbname=mohsin13_dev", 'root', '');
// prevent the server from timing out
set_time_limit(0);
$client_user_ids = array();
// include the web sockets server script (the server is started at the far bottom of this file)
require 'class.PHPWebSocket.php';

function sendToAll($clientID,$message){
	global $Server;
		foreach ( $Server->wsClients as $id => $client )
		{
			if ( $id != $clientID){
				
				$Server->wsSend($id, $message);
				$Server->log( "RCV_ID:" . $id);
			}
		}
}
// when a client sends data to the server
function wsOnMessage($clientID, $message, $messageLength, $binary) {

	$WS_OP_OPEN = "OPN";
	$WS_OP_MESSAGE = "MSG";
	$WS_HASH_CODE = "S83HSGGH5J";

	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );
	
	if ($messageLength == 0) {
		$Server->wsClose($clientID);
		return;
	}
	$Server->log( "$ip : " . $message);
	
	$parsed_message = new MessageParser($message,$WS_HASH_CODE);
	
	if(strcmp($parsed_message->getOperation(),$WS_OP_OPEN) == 0){
		$message = "NEW".$parsed_message->getUID();
		$Server->log("".$Server->wsGetClientSocket($clientID));
		sendToAll($clientID,$message);
	}
	elseif(strcmp($parsed_message->getOperation(),$WS_OP_MESSAGE) == 0){
		
		//$Server->log("RCV_ID = ".$parsed_message->getRecieverId());
		$reciever_id = $parsed_message->getRecieverId();
		$Server->log("reciever_id:".$reciever_id);
		if(in_array($reciever_id,$Server->client_user_ids))
		{
			$res_id = array_search($reciever_id, $Server->client_user_ids); 
			$Server->wsSend($res_id, $parsed_message->getMessage());
			$Server->log($res_id.":". $parsed_message->getMessage());
		}
		
	}
	
	
	
	//The speaker is the only person in the room. Don't let them feel lonely.
	
	if ( sizeof($Server->wsClients) == 1 ){}
		//$Server->wsSend($clientID, "There isn't anyone else in the room, but I'll still listen to you. --Your Trusty Server");
	else
	{
		
		//$parsed_message = new MessageParser($msg,$auth_hash_key);
		/*if(strcmp($parsed_message->getOperation(),OPEN) == 0){
			$client_user_ids[$clientID] = $parsed_message->getUID();
		}
		foreach($client_user_ids as $key => $value){
			$Server->log( "[".$key."] = ".$value);
		}*/
		//Send the message to everyone but the person who said it
		/*foreach ( $Server->wsClients as $id => $client )
		{
			if ( $id != $clientID){
				
				$Server->wsSend($id, $message);
			}
		}*/
		
	}
			
}

// when a client connects
function wsOnOpen($clientID)
{
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	$Server->log( "$ip ($clientID) has connected." );

	//Send a join notice to everyone but the person who joined
	foreach ( $Server->wsClients as $id => $client )
	{
		if ( $id != $clientID )
		{
			//$Server->wsSend($id, "Visitor $clientID ($ip) has joined the room.");
			//$client_user_ids[$clientID] = "";
		}
	}
}

// when a client closes or lost connection
function wsOnClose($clientID, $status) {
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	$Server->log( "$ip ($clientID) has disconnected." );

	//Send a user left notice to everyone in the room
	foreach ( $Server->wsClients as $id => $client ){
		$Server->wsSend($id, "Visitor $clientID ($ip) has left the room.");
		//unset($client_user_ids[$clientID]);
	}
		
}

// start the server
$Server = new PHPWebSocket();
$Server->bind('message', 'wsOnMessage');
$Server->bind('open', 'wsOnOpen');
$Server->bind('close', 'wsOnClose');
// for other computers to connect, you will probably need to change this to your LAN IP or external IP,
// alternatively use: gethostbyaddr(gethostbyname($_SERVER['SERVER_NAME']))
$Server->wsStartServer('192.168.0.100', 5000);

?>