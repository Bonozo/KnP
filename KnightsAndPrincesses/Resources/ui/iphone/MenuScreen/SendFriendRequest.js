function SendFriendRequest(userinfo, friendJson) {
	if (friendJson.GENDER == 'f') {
		var bg_image = '/assets/listFemaleInfo.png'
	} else {
		var bg_image = '/assets/listMaleInfo.png'
	}
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading Main Screen...';

	var send_window = Titanium.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	var user_id;
	var view = Ti.UI.createView({
		backgroundImage : bg_image,
		width : '100%',
		height : '60%',
		top : '15%'
	});

	send_window.add(view);
	var Infoview = Ti.UI.createView({
		width : '100%',
		top : '4%',
		height : '22%'

	});

	var imageview = Titanium.UI.createImageView({
		height : '96%',
		width : '100%'
	});
	Infoview.add(imageview);

	var name_label = Titanium.UI.createLabel({
		text : friendJson.NAME,
		top : '0',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(name_label);

	var text_label = Titanium.UI.createLabel({
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(text_label);

	var freind_info = "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + friendJson.UID;
	var httpclientt = require('ui/iphone/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				if (items_json.Record.Message != '') {
					gender = items_json.Record[0].GENDER;
					level_label.text = 'LVL ' + items_json.Record[0].LEVEL;
					freinds_label.text = items_json.Record[0].NUM_OF_FRIENDS;
					gold_label.text = items_json.Record[0].NUM_OF_GOLDS;
					user_id = items_json.Record[0].USER_ID;
					text_label = items_json.Record[0].STATUS_MESSAGE;
				}
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : freind_info
	});

	var freinds_label = Titanium.UI.createLabel({
		bottom : '0',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(freinds_label);

	if (friendJson.GENDER == 'f') {
		bg_image = '/assets/female_icon.png'
		avatar_image = "female_icon";
	} else {
		bg_image = '/assets/male_icon.png'
		avatar_image = "male_icon";
	}

	var freind_imageview = Titanium.UI.createImageView({
		image : bg_image,
		right : '0%',
		width : '20%'
	});
	Infoview.add(freind_imageview);

	var level_label = Titanium.UI.createLabel({
		top : '0',
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(level_label);

	var gold_label = Titanium.UI.createLabel({
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	var gold_imageview = Titanium.UI.createImageView({
		image : '/assets/miGoldWide_up.png',
		right : '25%',
		width : '12%',
		height : '40%'
	});
	Infoview.add(gold_imageview);

	Infoview.add(gold_label);
	gold_imageview.addEventListener("touchstart", function(e) {
		gold_imageview.image = '/assets/miGoldWide_down.png';
		//change background color to red
	});

	gold_imageview.addEventListener("touchend", function(e) {
		gold_imageview.image = '/assets/miGoldWide_up.png';
		//change background color to blue
	});

	var online_label = Titanium.UI.createLabel({
		text : 'ONLINE',
		bottom : '0%',
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(online_label);

	view.add(Infoview);
	var addfriend_label = Ti.UI.createLabel({
		text : 'ADD ' + friendJson.NAME + ' AS A FRIEND?',
		font : {
			fontSize : '16dip'
		},
		color : '#abe6c7',
		top : '32%',
		left : '5%'
	});
	view.add(addfriend_label);

	var sendmsg_textbox = Titanium.UI.createTextField({
		hintText : 'Send a Message to Your Friend \n (Optional)',
		font : {
			fontSize : '13dip'
		},
		color : '#63c689',
		textAlign : 'left',
		borderRadius : 12,
		top : '42%',
		height : '35%',
		width : '90%',
		backgroundImage : '/assets/inputButton002_up.png'
	});
	view.add(sendmsg_textbox);

	var cancel_button = Ti.UI.createButton({
		title : 'Cancel',
		color : '#5c2a64',
		textAlign : 'center',

		bottom : '4%',
		height : '11%',
		left : '10%',
		backgroundImage : '/assets/button_small_UP.png'
	});
	cancel_button.addEventListener('click', function(e) {
		send_window.close();
		// alert(JSON.stringify(friendJson));
	});
	view.add(cancel_button);

	var send_button = Ti.UI.createButton({
		title : 'Send Request',
		color : '#5c2a64',
		textAlign : 'center',
		bottom : '4%',
		height : '11%',
		right : '10%',
		backgroundImage : '/assets/button_small_UP.png',
		zIndex : 100
	});
	view.add(send_button);
	send_button.addEventListener('click', function(e) {
        var ConfirmationAlert = Titanium.UI.createAlertDialog({
            title : 'You have atleast 5 golds to send request.',
            message : 'Are you Sure?',
            buttonNames : ['Yes', 'No'],
            cancel : 1
        });
	    
	    
		actInd.show();
		var _url = "http://therealmattharmon.com/knp/send_friend_request.php?uid=" + userinfo.Record[0].UID + "&friend_uid=" + friendJson.UID + "&user_id="+user_id+"";
		var items_json = "";
		var items_length = 0;
		var httpclientt = require('ui/iphone/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				items_length = items_json.Record.length;
				if (items_json.Record != undefined) {
					//alert(userinfo.Record[0].EMAIL+":"+userinfo.Record[0].NAME+":"+user_id);

					
						actInd.hide();

					// _assign_quest_id = items_json.Record[0].assign_quest_id;
					// hideLoader();
					var ConfirmationAlert = Titanium.UI.createAlertDialog({
						title : 'Message',
						message : items_json.Record[0],
						buttonNames : ['OK'],
						cancel : 0
					});
					ConfirmationAlert.addEventListener('click', function(e) {
						send_window.close();
					});
					ConfirmationAlert.show();
				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : _url,
		});

		
	});

	/*
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
	 var _url = "http://therealmattharmon.com/knp/send_friend_request.php?uid=" + userinfo.Record[0].UID + "&friend_uid=" + friendJson.UID + "";
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
	 var ConfirmationAlert = Titanium.UI.createAlertDialog({
	 title : 'Message',
	 message : items_json.Record[0],
	 buttonNames : ['OK'],
	 cancel : 0
	 });
	 ConfirmationAlert.addEventListener('click', function(e) {
	 send_window.close();
	 });
	 ConfirmationAlert.show();
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
	 */

	return send_window;
};
module.exports = SendFriendRequest;