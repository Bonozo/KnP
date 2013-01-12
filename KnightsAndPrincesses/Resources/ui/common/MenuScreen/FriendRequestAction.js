function FriendRequestAction(userinfo, friendJson) {
	if(friendJson.GENDER == 'f'){
		var bg_image = '/assets/row_view_bg_female.png'
	}
	else{
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
	//view.add(add_friend_view);
	send_window.add(add_friend_view);

	var sendmsg_textbox = Titanium.UI.createLabel({
		text : friendJson.NAME + ' wants to add as a friend.',
		font : {
			fontSize : '18dip'
		},
		color : '#63c689',
		textAlign : 'center',
		borderRadius : 12,
		top : '20%',
		height : '55%',
		width : '90%',
		left : '5%'
	});
	add_friend_view.add(sendmsg_textbox);

	var accept_button = Ti.UI.createButton({
		title : 'Accept',
		color : '#5c2a64',
		textAlign : 'center',
		bottom : '03%',
		height : '20%',
		right : '10%',
		backgroundImage : '/assets/button_small_UP.png'
	});
	add_friend_view.add(accept_button);
	accept_button.addEventListener('click',function(e){

		var actInd = Titanium.UI.createActivityIndicator();
		actInd.message = 'Loading...';//message will only shows in android.
		actInd.show();
		var _url = 
		"http://justechinfo.com/kap_server/friendship_notifications_action.php?uid="+friendJson.UID+"&friend_uid="+userinfo.Record[0].UID+"&action=FRIENDS";//&="+friendJson.UID+"";
		//
		var items_json = "";
		var items_length = 0;
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				if (items_json.Record != undefined) {
					actInd.hide();
					Ti.App.fireEvent('update_friend_list', {
						activeScreen : 'AvatarByLevel'
					});
					alert(items_json.Record[0]);
				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : _url,
		});
	});

	var decline_button = Ti.UI.createButton({
		title : 'Denied',
		color : '#5c2a64',
		textAlign : 'center',

		bottom : '03%',
		height : '20%',
		left : '10%',
		backgroundImage : '/assets/button_small_UP.png'
	});
	decline_button.addEventListener('click',function(e){

		var actInd = Titanium.UI.createActivityIndicator();
		actInd.message = 'Loading...';//message will only shows in android.
		actInd.show();
		var _url = 
		"http://justechinfo.com/kap_server/friendship_notifications_action.php?uid="+friendJson.UID+"&friend_uid="+userinfo.Record[0].UID+"&action=DENIED";//&="+friendJson.UID+"";
		var items_json = "";
		var items_length = 0;
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				if (items_json.Record != undefined) {
					actInd.hide();
					Ti.App.fireEvent('update_friend_list', {
						activeScreen : 'AvatarByLevel'
					});
					alert(items_json.Record[0]);
				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : _url,
		});
	});
	add_friend_view.add(decline_button);

	return send_window;
}
module.exports = FriendRequestAction;