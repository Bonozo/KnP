function checkInternetConnection() {
	return Ti.Network.online;
}

exports.requestServer = function requestServer(e) {

	var httpClient = Ti.Network.createHTTPClient();
	httpClient.onload = e.success;
	httpClient.onerror = function(e) {
		Ti.API.info('Error Response: ' + this.responseText);
		// e.error;
		alert(e.error);
		//progress.hide();
	};
	httpClient.open(e.method, e.url);
	if (e.method == 'POST')
		httpClient.setRequestHeader('Content-Type', e.contentType);
	httpClient.autoEncodeUrl = false;
	if (checkInternetConnection()) {
		//progress.show();
		if (e.method == 'POST')
			httpClient.send(e.param);
		else
			httpClient.send();

	} else {
		alert('No Network.')
	}
}