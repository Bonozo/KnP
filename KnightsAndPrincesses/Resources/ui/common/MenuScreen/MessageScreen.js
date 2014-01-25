function MessageScreen(userinfo, friend_uid, friend_gender, friend_name, friendinfo) {
	var osname = Ti.Platform.osname;
	var my_uid = userinfo.Record[0].UID;

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
	var AvatarMailThumbnail = require('/ui/common/drawings/AvatarThumbnail');

	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	/*
	 * Header start
	 */
	var view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundImage : '/assets/inventoryBackground.png'
	});
	self.add(view);

	var activityIndicatorView = Titanium.UI.createView({
		backgroundColor : '#FFFFFF',
		borderRadius : 10,
		borderColor : '#333333',
		borderWidth : '5dip',
		visible : false,
		height : '8%',
		width : (screenWidth / 2),
		zIndex : 700
	});
	var activityIndicator = Ti.UI.createActivityIndicator({
		color : '#333333',
		font : {
			// fontFamily : 'Helvetica Neue',
			fontSize : '14dip',
			fontWeight : 'bold'
		},
		message : 'Loading...',
		style : (Ti.Platform.name === 'iPhone OS') ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK,
		height : '100%',
		width : '100%'
	});
	activityIndicatorView.add(activityIndicator);
	view.add(activityIndicatorView);

	(function() {
		activityIndicator.show();
		activityIndicatorView.visible = true;
		activityIndicator.message = "Loading...";
	})();

	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height : '5.4%',
		width : '100%',
		top : '0%'
	});
	view.add(top_imageview);
	var return_imageview = Titanium.UI.createImageView({
		image : '/assets/iconReturn.png',
		height : '8%',
		width : '11.6%',
		top : '1%',
		right : '3%',
		zIndex : 700
	});
	view.add(return_imageview);
	return_imageview.addEventListener('click', function(e) {
		self.close();
	});

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
	Ti.App.fireEvent("message_status", {
		data : "null"
	});

	var menu_label = Titanium.UI.createLabel({
		text : friendinfo.Record[0].NAME,
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

	var friend_avatar_pic;
	var my_avatar_pic;
	var date_height = '';
	var tableview;
	var tabledata = [];
	var rowViewHeight = screenHeight * (0.042);
	var current_msg = "";
	var rowView = [];
	var avatar_images = [];
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var thread_temp_id = getRandomInt(1, 90000);

	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return screenWidth * percent / 100;
		} else if (axis == 'y') {
			return screenHeight * percent / 100;
		}
	}

	function AdjustMessage(id, message_text, date_time, is_my_message, callback) {
		//sendMessage(my_uid, friendinfo.Record[0].UID, text_feild.value, true);
		var line_height = 0;
		var message = message_text;
		// Messages_Thread.Record[i].MESSAGE_TEXT;
		var rowview_height = 0;
		formatMessage(id, message, 30, function(index, message, num_of_lines) {
			date_height = num_of_lines * rowViewHeight * 100;
			line_height = num_of_lines * rowViewHeight + (rowViewHeight);
			rowview_height = line_height + rowViewHeight;

			var commentBg = Ti.UI.createView({
				backgroundColor : '#72AE94',
				borderColor : '#376b54',
				borderWidth : 1,
				borderRadius : 5,
				height : line_height,
				top : '10%',
				bottom : '10%',
				left : ((is_my_message) ? '26%' : '4%'),
				width : '72%'
			});

			var chat_msg_label = Ti.UI.createLabel({
				text : message,
				textAlign : 'left',
				font : {
					fontSize : '14dip'
				},
				color : '#FFFFFF',
				left : '4%',
				top : '4%',
			});

			// Create a Label.
			//alert(date_height);
			var dateTime = Ti.UI.createLabel({
				text : '\n' + date_time,
				color : '#d0f6d9',
				font : {
					fontSize : '12dip'
				},
				bottom : '1%',
				left : '4%',
				textAlign : 'left'
			});

			// Add to the parent view.
			commentBg.add(chat_msg_label);
			commentBg.add(dateTime);
			callback(id, commentBg, rowview_height);
		});

	}

	/*
	 * Messages loading start
	 */
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			var Messages_Thread = JSON.parse(this.responseText);
			if (Messages_Thread.Record != undefined) {
				// alert(JSON.stringify(friendinfo));
				for (var i = Messages_Thread.Record.length - 1; i > -1; i--) {
					rowView[i] = Titanium.UI.createTableViewRow({
						className : (Messages_Thread.Record[i].SENDER_UID == my_uid) ? 'MyMessage' : 'FriendMessage',
						width : '100%',
						allowsSelection : false
					});

					AvatarMailThumbnail({
						width : '100',
						height : '100',
						top : -20,
						left : (Messages_Thread.Record[i].SENDER_UID == my_uid) ? 0 : '70%',
					}, (Messages_Thread.Record[i].SENDER_UID == my_uid) ? userinfo.Record[0].USER_APPEARANCE : friendinfo.Record[0].USER_APPEARANCE, (Messages_Thread.Record[i].SENDER_UID == my_uid) ? userinfo.Record[0].GENDER : friendinfo.Record[0].GENDER, i, function(avatar_imageview, index) {
						if (thread_temp_id != null) {
							avatar_images[index] = avatar_imageview;
							rowView[index].add(avatar_images[index]);
						}
					});
					var is_my_message = true;
					if (Messages_Thread.Record[i].SENDER_UID != my_uid) {
						is_my_message = false;
					}

					AdjustMessage(i, Messages_Thread.Record[i].MESSAGE_TEXT, Messages_Thread.Record[i].DATETIME, is_my_message, function(index, message_body, rowview_height) {
						rowView[index].add(message_body);
						rowView[index].height = rowview_height;
					});

					//
					// var line_height = 0;
					// var message = Messages_Thread.Record[i].MESSAGE_TEXT;
					// formatMessage(i, message, 30, function(index, message, num_of_lines) {
					// current_msg = message;
					// date_height = num_of_lines * rowViewHeight * 100;
					// line_height = num_of_lines * rowViewHeight + (rowViewHeight);
					// rowView[index].height = line_height + rowViewHeight;
					// });
					//
					// var dp;
					// var dp_left;
					// var chat_left;
					//
					// if (Messages_Thread.Record[i].SENDER_UID == my_uid) {
					// chat_left = '26%';
					// } else {
					// chat_left = '4%';
					// }
					//
					// var commentBg = Ti.UI.createView({
					// backgroundColor : '#72AE94',
					// borderColor : '#376b54',
					// borderWidth : 1,
					// borderRadius : 5,
					// height : line_height,
					// top : '10%',
					// bottom : '10%',
					// left : chat_left,
					// width : '72%'
					// });
					//
					// var chat_msg_label = Ti.UI.createLabel({
					// text : current_msg,
					// textAlign : 'left',
					// font : {
					// fontSize : '14dip'
					// },
					// color : '#FFFFFF',
					// left : '4%',
					// top : '4%',
					// });
					//
					// var dateTime = Ti.UI.createLabel({
					// text : '\n' + Messages_Thread.Record[i].DATETIME,
					// color : '#d0f6d9',
					// font : {
					// fontSize : '12dip'
					// },
					// bottom : '1%',
					// left : '4%',
					// textAlign : 'left'
					// });
					//
					// commentBg.add(chat_msg_label);
					// commentBg.add(dateTime);

					// rowView[i].add(commentBg);

					tabledata.push(rowView[i]);

				}

				tableview = Ti.UI.createTableView({
					backgroundColor : 'transparent',
					separatorColor : 'transparent',
					backgroundSelectedColor : 'transparent',
					top : '5.5%',
					left : '0%',
					height : '80%',
					width : '100%',
					data : tabledata,
					separatorColor : 'transparent',
				});

				view.add(tableview);

				activityIndicator.hide();
				activityIndicatorView.visible = false;
				tableview.scrollToIndex((Messages_Thread.Record.length - 1), {
					position : Titanium.UI.iPhone.TableViewScrollPosition.TOP,
					animated : true
				});

				//actInd.hide();
			}

		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			Ti.API.debug("URL: " + "http://bonozo.com:8080/knp/get_thread_messages.php?sender_id=" + userinfo.Record[0].UID + "&receiver_id=" + friendinfo.Record[0].UID);
			alert('There was an error retrieving the remote data. Try again.');
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_thread_messages.php?sender_id=" + userinfo.Record[0].UID + "&receiver_id=" + friendinfo.Record[0].UID,
		//url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + 10000007 + "",

	});

	// createThumbnail({
	// left : '78%',
	// width : '20%',
	// height : 'auto'
	// }, friendinfo, function(_friend_avatar_pic) {
	// friend_avatar_pic = _friend_avatar_pic;
	// createThumbnail({
	// left : '3%',
	// width : '20%',
	// height : 'auto'
	// }, userinfo, function(_my_avatar_pic) {
	// my_avatar_pic = _my_avatar_pic;
	// loadMessages();
	// // view.add(_friend_avatar_pic);
	// });
	// });

	function formatMessage(index, text, maximum_alphabets, callback) {
		var results = text.split(" ");
		//.match(re);
		var line_no = 1;
		var alphabets_in_line = 0;
		var msg = "";
		for (var i = 0; i < results.length; i++) {
			if ((alphabets_in_line + results[i].length + 1) >= maximum_alphabets) {
				msg += "\n";
				line_no++;
				alphabets_in_line = 0;
			}
			alphabets_in_line += results[i].length + 1;
			msg += results[i] + " ";

		};
		callback(index, msg, line_no);
	}

	/*
	 * Messages loading end
	 */
	var date = '';
	//my_uid, friendinfo.Record[0].UID, text_feild.value, true, ''
	function receiveMessage(my_uid, friend_uid, text, is_send, date_time) {
		var newRowView = Titanium.UI.createTableViewRow({
			className : 'FriendMessage',
			width : '100%',
			allowsSelection : false
		});
		var is_my_message = false;

		AvatarMailThumbnail({
			width : 100,
			height : 100,
			top : -20,
			left : '70%',
		}, friendinfo.Record[0].USER_APPEARANCE, friendinfo.Record[0].GENDER, 0, function(avatar_imageview, index) {
			if (thread_temp_id != null) {
				newRowView.add(avatar_imageview);
			}
		});

		AdjustMessage(0, text, date_time, is_my_message, function(index, message_body, rowview_height) {
			newRowView.add(message_body);
			newRowView.height = rowview_height;
			tabledata.push(newRowView);
			tableview.data = tabledata;
			tableview.scrollToIndex((tabledata.length - 1), {
				position : Titanium.UI.iPhone.TableViewScrollPosition.TOP,
				animated : true
			});
		});
		return;
	}

	function sendMessage(my_uid, friend_uid, text, is_send, date_time) {
		activityIndicator.show();
		activityIndicatorView.visible = true;
		activityIndicator.message = "Message sending...";

		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({

			success : function(e) {
				Message_info = JSON.parse(this.responseText);
				if (Message_info.Message != undefined) {
					date = Message_info.Message[0].DATETIME;
					var newRowView = Titanium.UI.createTableViewRow({
						className : 'MyMessage',
						width : '100%',
						allowsSelection : false
					});
					var is_my_message = true;

					AvatarMailThumbnail({
						width : 100,
						height : 100,
						top : -20,
						left : 0,
					}, userinfo.Record[0].USER_APPEARANCE, userinfo.Record[0].GENDER, 0, function(avatar_imageview, index) {
						if (thread_temp_id != null) {
							newRowView.add(avatar_imageview);
						}
					});

					AdjustMessage(0, text, date, is_my_message, function(index, message_body, rowview_height) {
						newRowView.add(message_body);
						newRowView.height = rowview_height;
						tabledata.push(newRowView);
						tableview.data = tabledata;
						tableview.scrollToIndex((tabledata.length - 1), {
							position : Titanium.UI.iPhone.TableViewScrollPosition.TOP,
							animated : true
						});
						activityIndicator.hide();
						activityIndicatorView.visible = false;
					});
				} else {
					alert('Oops... something went wrong.\nPlease restart game.');
				}

			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://bonozo.com:8080/knp/send_message.php?sender_id=" + my_uid + "&receiver_id=" + friend_uid + "&message=" + Ti.Network.encodeURIComponent(text) + "",

		});

		return;

	}

	/*
	 * Bottom area start
	 */
	var text_feild = Titanium.UI.createTextField({
		hintText : "Enter Message Here",
		backgroundImage : '/assets/inputButton002_up.png',
		paddingLeft : 10,
		bottom : "0%",
		height : "10%",
		width : "80%",
		right : "0%",
		zIndex : 600
	});
	view.add(text_feild);
	text_feild.addEventListener('focus', function(e) {
		text_feild.setHeight = "20%";
		if (osname === 'iphone' || osname === 'ipad') {
			text_feild.animate({
				bottom : "45%",
				duration : 500
			});
		}
	});
	text_feild.addEventListener('return', function(e) {
		if (osname === 'iphone' || osname === 'ipad') {
			text_feild.animate({
				bottom : "0%",
				duration : 500
			});
		}
		if (text_feild.value != "") {
			sendMessage(my_uid, friendinfo.Record[0].UID, text_feild.value, true, '');
		}
		text_feild.value = '';
	});

	var sendButton = Ti.UI.createImageView({
		image : '/assets/iconGift.png',
		height : '10%',
		width : '20%',
		bottom : '0%',
		left : '0%'
	});
	sendButton.addEventListener('click', function() {
		var GiftFromMessage = require('ui/common/MenuScreen/GiftFromMessage');
		var GiftFromMessage = new GiftFromMessage(userinfo, friendinfo.Record[0].UID);
		GiftFromMessage.open({
			modal : true
		});
		/*
		 if (text_feild.value != "")
		 sendMessage(my_uid, friendinfo.Record[0].UID, text_feild.value, true);
		 */
	});
	view.add(sendButton);
	/*
	 * Bottom area end
	 */

	/*
	 * Service for new incoming messages start
	 */
	var timer = "0";
	var unreadmessages;
	timer = setInterval(function() {
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({

			success : function(e) {
				unreadmessages = JSON.parse(this.responseText);
				if (unreadmessages.Record != undefined) {
					for (var i = unreadmessages.Record.length - 1; i > -1; i--) {
						receiveMessage(my_uid, friendinfo.Record[0].UID, unreadmessages.Record[i].MESSAGE_TEXT, false, unreadmessages.Record[i].DATETIME);
					}
					//alert("return");
				}

			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://bonozo.com:8080/knp/get_unread_messages.php?sender_id=" + friendinfo.Record[0].UID + "&receiver_id=" + my_uid + "",

		});

	}, 1000);
	/*
	 * Service for new incoming messages end
	 */

	/*
	 var activity = self.activity;
	 activity.addEventListener('destroy', function(e) {
	 clearInterval(timer);
	 timer = null;
	 });
	 */
	Ti.App.addEventListener('message_screen_closed', function(data) {
		if (data.thread_temp_id != thread_temp_id)
			return;
		// alert(JSON.stringify(data));
		thread_temp_id = null;
		clearInterval(timer);
		timer = null;
		//Ti.App.fireEvent('render_table', {});
	});

	var activity = self.activity;
	view.addEventListener('android:back', function(e) {
		clearInterval(timer);
		timer = null;
	});
	return self;
};
module.exports = MessageScreen;
