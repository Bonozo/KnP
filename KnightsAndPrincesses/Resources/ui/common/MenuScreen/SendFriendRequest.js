function SendFriendRequest(userinfo, friendJson) {
	if (friendJson.GENDER == 'f') {
		var bg_image = '/assets/row_view_bg_female.png'
	} else {
		var bg_image = '/assets/row_view_bg_male.png'
	}

	var send_window = Titanium.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	var add_friend_view = Ti.UI.createView({
		backgroundImage : bg_image,
		width : '100%',
		height : '33%',
		top : '33%'
	});

	send_window.add(add_friend_view);
	var addfriend_label = Ti.UI.createLabel({
		text : 'ADD ' + friendJson.NAME + ' AS A FRIEND',
		font : {
			fontSize : '12dip'
		},
		color : '#abe6c7',
		top : '5%',
		left : '10%'
	});
	add_friend_view.add(addfriend_label);

	var sendmsg_textbox = Titanium.UI.createTextField({
		hintText : 'Send a Message to Your Friend \n (Optional)',
		font : {
			fontSize : '13dip'
		},
		color : '#63c689',
		textAlign : 'center',
		borderRadius : 12,
		top : '20%',
		height : '55%',
		width : '90%',
		left : '5%',
		backgroundColor : '#173f25'
	});
	add_friend_view.add(sendmsg_textbox);

	var send_button = Ti.UI.createButton({
		title : 'Send Request',
		color : '#5c2a64',
		textAlign : 'center',
		bottom : '03%',
		height : '20%',
		right : '10%',
		backgroundImage : '/assets/button_small_UP.png',
		zIndex : 100
	});
	add_friend_view.add(send_button);
	send_button.addEventListener('click', function(e) {
		var _url = "http://justechinfo.com/kap_server/send_friend_request.php?uid=" + userinfo.Record[0].UID + "&friend_uid=" + friendJson.UID + "";
		var items_json = "";
		var items_length = 0;
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				items_length = items_json.Record.length;
				if (items_json.Record != undefined) {
					// _assign_quest_id = items_json.Record[0].assign_quest_id;
					// hideLoader();					
					alert(items_json.Record[0]);
					send_window.close();
				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : _url,
		});
	});

	var cancel_button = Ti.UI.createButton({
		title : 'Cancel',
		color : '#5c2a64',
		textAlign : 'center',

		bottom : '03%',
		height : '20%',
		left : '10%',
		backgroundImage : '/assets/button_small_UP.png'
	});
	cancel_button.addEventListener('click', function(e) {
		send_window.close();
		// alert(JSON.stringify(friendJson));
	});
	add_friend_view.add(cancel_button);

	return send_window;
};
module.exports = SendFriendRequest;
