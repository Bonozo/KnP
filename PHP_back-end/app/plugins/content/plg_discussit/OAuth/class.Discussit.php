<?php
include_once "OAuthStore.php";
include_once "OAuthRequester.php";

class discussit {
	var $store;
	var $apibase;

	function discussit($api = 'http://diapi.cloudapp.net/Discussit.svc/')
	{
		$this->apibase = $api;
	}
	
	function widget_list()
	{
		$request_uri = $this->apibase . 'widgets/get.xml';

		$req = new OAuthRequester($request_uri, 'POST', null);
		$result = $req->doRequest(1);
		$xmlObj = simplexml_load_string($result['body']);
		
		return $xmlObj;
	}
	
	function message_post($commentId, $widgetid, $url, $realurl, $identifier, $author, $author_ip, $author_email, $author_url, $msg_body, $replyid)
	{
		$request_uri = $this->apibase . 'messages/message/add.xml';
		$body = '<MessagePost xmlns=\'http://dis.cuss.it\' xmlns:i=\'http://www.w3.org/2001/XMLSchema-instance\'><Body>' . $msg_body . '</Body><Email>' . $author_email . '</Email><IP>' . $author_ip . '</IP><Identifier/><MessageIDLegacy>' . $commentId . '</MessageIDLegacy><Mug i:nil=\'true\'/><Nickname>' . $author . '</Nickname><Notify>false</Notify><ProfileURL>' . $author_url . '</ProfileURL><ReplyTo>' . $replyid . '</ReplyTo><ThreadID i:nil=\'true\'/><URL>' . $url . '</URL><URLReal>' . $realurl . '</URLReal><WidgetID>' . $widgetid . '</WidgetID></MessagePost>';
		$req = new OAuthRequester($request_uri, 'POST', null, $body);
		$result = $req->doRequest(1);
		$xmlObj = simplexml_load_string($result['body']);
		
		return $xmlObj;
	}
	
	function message_edit($commentId, $widgetid, $url, $msg_body, $status)
	{
		$request_uri = $this->apibase . 'messages/message/edit.xml';
		$body = '<MessageEdit xmlns=\'http://dis.cuss.it\' xmlns:i=\'http://www.w3.org/2001/XMLSchema-instance\'><Body>' . $msg_body . '</Body><MessageID></MessageID><MessageIDLegacy>' . $commentId . '</MessageIDLegacy><Status>' .$status . '</Status><URL>' . $url . '</URL><WidgetID>' . $widgetid . '</WidgetID></MessageEdit>';
		$req = new OAuthRequester($request_uri, 'POST', null, $body);
		$result = $req->doRequest(1);
		$xmlObj = simplexml_load_string($result['body']);
		
		return $xmlObj;
	}
	
	function thread_init($url, $widgetid)
	{
		$request_uri = $this->apibase . 'messages/thread/init.xml';
		$body = '<ArrayOfstring xmlns=\'http://schemas.microsoft.com/2003/10/Serialization/Arrays\' xmlns:i=\'http://www.w3.org/2001/XMLSchema-instance\'>
					<string>' . $url . '</string><string>' . $widgetid . '</string></ArrayOfstring>'; 
		$req = new OAuthRequester($request_uri, 'POST', null, $body);
		$result = $req->doRequest(1);
		$xmlObj = simplexml_load_string($result['body']);
		
		return $xmlObj;
	}	
	
	function thread_get($threadid, $modtype)
	{
		$request_uri = $this->apibase . 'messages/thread/getbyid.xml';
		$body = '<ArrayOfstring xmlns=\'http://schemas.microsoft.com/2003/10/Serialization/Arrays\' xmlns:i=\'http://www.w3.org/2001/XMLSchema-instance\'>
					<string>' . $threadid . '</string><string>' . $modtype . '</string></ArrayOfstring>'; 
		$req = new OAuthRequester($request_uri, 'POST', null, $body);
		$result = $req->doRequest(1);
		$xmlObj = simplexml_load_string($result['body']);
		
		return $xmlObj;
	}	
	
	function exportwp2di($xml)
	{
		$request_uri = $this->apibase . 'messages/import.xml';

		$req = new OAuthRequester($request_uri, 'POST', null, $xml);
		$result = $req->doRequest(1);
		$xmlObj = new SimpleXMLElement($result['body']);
		
		return $xmlObj;
	}
	
	function widget_get_recent($widgetid)
	{
		$anhourago = mktime(date("H")-1, date("i"), date("s"), date("m"), date("d"),   date("Y"));
		$request_uri = $this->apibase . 'widgets/recentmessages.xml';
		$body = '<ArrayOfstring xmlns=\'http://schemas.microsoft.com/2003/10/Serialization/Arrays\' xmlns:i=\'http://www.w3.org/2001/XMLSchema-instance\'>
					<string>' . $widgetid . '</string><string>' . date('Y\/m\/d H\:i\:s', $anhourago) . '</string><string>True</string></ArrayOfstring>'; 
		$req = new OAuthRequester($request_uri, 'POST', null, $body);
		$result = $req->doRequest(1);
		$xmlObj = new SimpleXMLElement($result['body']);
		
		return $xmlObj;
	}
	
}

?>