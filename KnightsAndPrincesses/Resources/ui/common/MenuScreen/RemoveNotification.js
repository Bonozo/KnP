function RemoveNotification(inv_trans_id,index) {

	var in_process = false;
	var remove_window = Titanium.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	var view = Ti.UI.createView({
		backgroundImage : '/assets/listFemaleInfo.png',
		width : '100%',
		height : '30%',
		top : '35%'
	});

	// Create a Label.
	var sure = Ti.UI.createLabel({
		text : 'Are you sure you want to remove \nthis notification?',
		color : '#FFFFFF',
		font : {
			fontSize : '14dp'
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	view.add(sure);
	var cancel_button = Ti.UI.createButton({
		title : 'Cancel',
		color : '#000000',
		textAlign : 'center',
		bottom : '10%',
		height : '20%',
		left : '10%',
		backgroundImage : '/assets/button_small_UP.png'
	});
	cancel_button.addEventListener('click', function(e) {
		remove_window.close();
	});
	view.add(cancel_button);
	
	showMessageTimeout = function(customMessage, interval) {
		// window container
		indWin = Titanium.UI.createWindow();

		//  view
		var indView = Titanium.UI.createView({
			height : 150,
			width : 250,
			borderRadius : 10,
			backgroundColor : '#aaa',
			opacity : .7
		});

		indWin.add(indView);

		// message
		var message = Titanium.UI.createLabel({
			text : customMessage && typeof (customMessage !== 'undefined') ? customMessage : L('please_wait'),
			color : '#fff',
			width : 'auto',
			height : 'auto',
			textAlign : 'center',
			font : {
				fontFamily : 'Helvetica Neue',
				fontSize : 12,
				fontWeight : 'bold'
			}
		});

		indView.add(message);
		indWin.open();

		interval = interval ? interval : 3000;
		setTimeout(function() {
			indWin.close({
				opacity : 0,
				duration : 1000
			});
		}, interval);
	}
	
	var remove_button = Ti.UI.createButton({
		title : 'Remove',
		color : '#000000',
		textAlign : 'center',
		bottom : '10%',
		height : '20%',
		right : '10%',
		backgroundImage : '/assets/button_small_UP.png',
		zIndex : 100
	});
	remove_button.addEventListener('click', function() {
		// remove_button.
		if (!in_process) {
			in_process = !in_process;
			var _url = "http://bonozo.com:8080/knp/remove_gift_notification.php?inv_trans_id=" + inv_trans_id;
			var items_json = "";
			var items_length = 0;
			var httpclientt = require('/ui/common/Functions/function');
			httpclientt.requestServer({
				success : function(e) {
					items_json = JSON.parse(this.responseText);
					items_length = items_json.Record.length;
					if (items_json.Record != undefined) {
						remove_window.close();
			            Ti.App.fireEvent('remove_gift_notification', {
			            	index : index,
			            	message : items_json.Record.Message
			            });
						in_process = !in_process;
					}
				},
				method : 'GET',
				contentType : 'text/xml',
				url : _url,
			});
		}
		//actInd.show();
	});
	view.add(remove_button);
	remove_window.add(view);
	return remove_window;

}

module.exports = RemoveNotification; 