function messages(Message_Thread, userinfo, friend_uid) {
	var Loggedin_id = userinfo.Record[0].UID;
	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true
	});

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;

	var view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundImage : '/assets/inventoryBackground.png'

	});
	self.add(view);

	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height : '5.4%',
		width : '100%',
		top : '0%'
	});
	view.add(top_imageview);

	var name_label = Titanium.UI.createLabel({
		text : userinfo.Record[0].NAME,
		top : '0',
		height : '3.1%',
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '12dip'
		}
	});
	view.add(name_label);

	var menu_label = Titanium.UI.createLabel({
		text : 'FRIENDS NAME 01 INFO',
		top : '0',
		height : '3.1%',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(menu_label);

	var return_imageview = Titanium.UI.createImageView({
		image : '/assets/iconReturn.png',
		//height:'12.4%',
		width : '11.6%',
		top : '1%',
		right : '3%'
	});
	view.add(return_imageview);

	var rowViewHeight = screenHeight * (0.20);
	var tabledata = [];
	for (var i = Message_Thread.Record.length - 1; i > -1; i--) {
		var dp;
		var dp_left;
		var chat_left;
		if (Message_Thread.Record[i].SENDER_UID == Loggedin_id) {
			dp = '/assets/female_icon.png';
			dp_left = '3%';
			chat_left = '26%';
		} else {
			dp = '/assets/male_icon.png';
			dp_left = '78%'
			chat_left = '4%';
		}

		var rowView = Titanium.UI.createTableViewRow({
			height : 'auto'
		});

		var dp_imageview = Ti.UI.createImageView({
			image : dp,
			width : '20%',
			left : dp_left
		});
		rowView.add(dp_imageview);

		var chat_msg_label = Ti.UI.createLabel({
			text : Message_Thread.Record[i].MESSAGE_TEXT,
			left : chat_left,
			textAlign : 'center',
			font : {
				fontSize : '12dip'
			},
			width : '72%',
			color : '#ffffff',
			backgroundColor : '#72ae94',
			borderRadius : 9
		});
		rowView.add(chat_msg_label);

		tabledata.push(rowView);
	}

	var tableview = Ti.UI.createTableView({
		top : '15%',
		height : '75%',
		width : '100%',
		data : tabledata,
		separatorColor : 'transparent',
	});
	tableview.scrollToIndex(220)
	view.add(tableview);
	var text_feild = Titanium.UI.createTextField({
		hintText : "Enter Message Here",
		top : "90%",
		height : "10%",
		width : "100%",

	});
	view.add(text_feild);
	text_feild.addEventListener('focus', function(e) {
		text_feild.setHeight = "20%";
	});
	text_feild.addEventListener('return', function(e) {
		var Message_info;
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({

			success : function(e) {
				Message_info = JSON.parse(this.responseText);
				if (Message_info.Record != undefined) {
					alert("Sent Successfully");
				}

			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://justechinfo.com/kap_server/send_message.php?sender_id=" + Loggedin_id + "&receiver_id="+friend_uid+"&message=" + text_feild.value + "",

		});
		var rowView = Titanium.UI.createTableViewRow({
			height : 'auto'
		});

		var dp_imageview = Ti.UI.createImageView({
			width : '20%',
			image : '/assets/female_icon.png',
			left : '3%'
		});
		rowView.add(dp_imageview);

		var chat_msg_label = Ti.UI.createLabel({
			text : text_feild.value,
			left : '26%',
			textAlign : 'center',
			font : {
				fontSize : '12dip'
			},
			width : '72%',
			color : '#ffffff',
			backgroundColor : '#72ae94',
			borderRadius : 9
		});
		rowView.add(chat_msg_label);
		tabledata.push(rowView);
		tableview.data = tabledata;
		tableview.scrollToIndex(220)
		//alert("return");
	});
	var timer = "0";
	var unreadmessages;
	timer = setInterval(function() {
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({

			success : function(e) {
				unreadmessages = JSON.parse(this.responseText);
				if (unreadmessages.Record != undefined) {
					var rowView = Titanium.UI.createTableViewRow({
						height : 'auto'
					});
					for (var i = unreadmessages.Record.length - 1; i > -1; i--) {
						var dp_imageview = Ti.UI.createImageView({
							image : dp,
							width : '20%',
							left : dp_left
						});
						rowView.add(dp_imageview);

						var chat_msg_label = Ti.UI.createLabel({
							text : unreadmessages.Record[i].MESSAGE_TEXT,
							left : chat_left,
							textAlign : 'center',
							font : {
								fontSize : '12dip'
							},
							width : '72%',
							color : '#ffffff',
							backgroundColor : '#72ae94',
							borderRadius : 9
						});
						rowView.add(chat_msg_label);
						tabledata.push(rowView);
					}
					tableview.data = tabledata;
					tableview.scrollToIndex(220)
					//alert("return");
				}

			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://www.justechinfo.com/kap_server/get_unread_messages.php?sender_id="+friend_uid+"&receiver_id=" + Loggedin_id + "",

		});

	}, 1000);
	return self;
};
module.exports = messages;
