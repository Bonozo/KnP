function MessageScreen(userinfo, friend_uid, friend_gender,friend_name) {
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
	var Loggedin_id = userinfo.Record[0].UID;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;

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

	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height:'5.4%',
		width : '100%',
		bottom : '94.6%'
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
    Ti.App.fireEvent("message_status",{
       data :"null"
    });

	var menu_label = Titanium.UI.createLabel({
		text : friend_name,
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
    var return_imageview = Ti.UI.createImageView({
        image : '/assets/iconReturn.png',
        height : '8%',
        width : '11.6%',
        top : '1%',
        right : '3%'
    });
    view.add(return_imageview);
    return_imageview.addEventListener('click', function(e) {
        self.close();
    });
	
	/*
	 * Header end
	 */

	function formatMessage(text, maximum_alphabets, callback) {
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
		callback(msg, line_no);
	}

	/*
	 * Messages loading start
	 */
	var date_height = '';
	var tableview;
	var tabledata = [];
	var httpclientt = require('/ui/iphone/Functions/function');
	var rowViewHeight = screenHeight * (0.042);
	var current_msg = "";
	httpclientt.requestServer({
		success : function(e) {
			var Messages_Thread = JSON.parse(this.responseText);
			if (Messages_Thread.Record != undefined) {

				for (var i = Messages_Thread.Record.length - 1; i > -1; i--) {
                    var rowView = Titanium.UI.createTableViewRow({
                        //height : rowViewHeight
                    });
					
					//sendMessage(Loggedin_id, friend_uid, text_feild.value, true);
					//var i = 0;
					var line_height = 0;
					var message = Messages_Thread.Record[i].MESSAGE_TEXT
					formatMessage(message, 30, function(message, num_of_lines) {
						current_msg = message;
						// line_height = line_no * 1.20;
						date_height = num_of_lines * rowViewHeight * 100;
						line_height = num_of_lines * rowViewHeight + (rowViewHeight);
						rowView.height = line_height+ rowViewHeight;
                      //date_height = line_height  * rowViewHeight + (rowViewHeight);

					});
					//current_msg = Messages_Thread.Record[i].MESSAGE_TEXT;

					var dp;
					var dp_left;
					var chat_left;
                    if (Messages_Thread.Record[i].SENDER_UID == Loggedin_id) {/*If sender is me*/
                        if (userinfo.Record[0].GENDER == 'm') {
                            dp = '/assets/male_icon.png';

                        } else if (userinfo.Record[0].GENDER == 'f') {
                            dp = '/assets/female_icon.png';
                        }
                        dp_left = '3%';
                        chat_left = '26%';
                    }
                    else{/*If sender is not me*/
                        if (friend_gender == 'm') {
                            dp = '/assets/male_icon.png';

                        } else if (friend_gender == 'f') {
                            dp = '/assets/female_icon.png';
                        }
                        dp_left = '78%'
                        chat_left = '4%';
                    }


                    var dp_imageview = Ti.UI.createImageView({
                        image : dp,
                        width : '20%',
                        left : dp_left,
                        height : 'auto',
                        top : '10%',
                        bottom : '10%'
                    });
                    rowView.add(dp_imageview);

					var commentBg = Ti.UI.createView({
						backgroundColor : '#72AE94',
						borderColor : '#376b54',
						borderWidth : 1,
						borderRadius : 5,
						height : line_height,
						top : '10%',
						bottom : '10%',
						left : chat_left,
						width : '72%'
					});

					var chat_msg_label = Ti.UI.createLabel({
						text : current_msg,
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
					 text : '\n'+Messages_Thread.Record[i].DATETIME,
					 color : '#d0f6d9',
					 font : {
					 fontSize : '12dip'
					 },
					 //bottom : '1%',
					 bottom : '1%',
					 left : '4%',
					 //width : '90%',
					 //height: '10%',
					 textAlign : 'left'
					 });

					 // Add to the parent view.
                    commentBg.add(chat_msg_label);
                    commentBg.add(dateTime);
					
					rowView.add(commentBg);

					tabledata.push(rowView);

				}

				tableview = Ti.UI.createTableView({
					separatorColor : 'transparent',
                        backgroundColor : 'transparent',
					top : '5.5%',
					height : '80%',
					width : '100%',
					data : tabledata,
					separatorColor : 'transparent',
				});
				tableview.scrollToIndex(220)
				view.add(tableview);

				actInd.hide();
			}

		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			Ti.API.debug("URL: " + "http://therealmattharmon.com/knp/get_thread_messages.php?sender_id=" + userinfo.Record[0].UID + "&receiver_id=" + friend_uid);
			alert('There was an error retrieving the remote data. Try again.');
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://therealmattharmon.com/knp/get_thread_messages.php?sender_id=" + userinfo.Record[0].UID + "&receiver_id=" + friend_uid,
		//url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + 10000007 + "",

	});
	/*
	 * Messages loading end
	 */
   var date = '';
	function sendMessage(Loggedin_id, friend_uid, text_feild, is_send,date_time) {
        date = date_time;
        if (is_send) {
            if(userinfo.Record[0].GENDER == 'm'){
                dp = '/assets/male_icon.png';
                
            }
            else if(userinfo.Record[0].GENDER == 'f'){
                dp = '/assets/female_icon.png';
            }
            dp_left = '3%';
            chat_left = '26%';
        }
        else{
            if(friend_gender == 'm'){
                dp = '/assets/male_icon.png';
                
            }
            else if(friend_gender == 'f'){
                dp = '/assets/female_icon.png';
            }
            dp_left = '78%'
            chat_left = '4%';
        }
		if(is_send){
			var Message_info;
			var httpclientt = require('ui/iphone/Functions/function');
			httpclientt.requestServer({
	
				success : function(e) {
					Message_info = JSON.parse(this.responseText);
					if (Message_info.Message != undefined) {
						date = Message_info.Message[0].DATETIME;
						//alert("Sent Successfully");
					}
	
				},
				method : 'GET',
				contentType : 'text/xml',
				url : "http://therealmattharmon.com/knp/send_message.php?sender_id=" + Loggedin_id + "&receiver_id=" + friend_uid + "&message=" + Ti.Network.encodeURIComponent(text_feild)+ "",
	
			});
		}
		
		var rowView = Titanium.UI.createTableViewRow({
			//height : 'auto'
		});

		var line_height = 0;
		formatMessage(text_feild, 30, function(message, num_of_lines) {
			current_msg = message;
			line_height = num_of_lines * rowViewHeight + (rowViewHeight);
		});

		var dp;
		var dp_left;
		var chat_left;



        var dp_imageview = Ti.UI.createImageView({
            image : dp,
            width : '20%',
            left : dp_left,
            height : 'auto',
            top : '10%',
            bottom : '10%'
        });
        rowView.add(dp_imageview);

		var commentBg = Ti.UI.createView({
			backgroundColor : '#72AE94',
			borderColor : '#376b54',
			borderWidth : 1,
			borderRadius : 5,
			height : line_height,
			top : '10%',
			bottom : '10%',
			left : chat_left,
			width : '72%'
		});

		var chat_msg_label = Ti.UI.createLabel({
			text : current_msg,
			textAlign : 'left',
			font : {
				fontSize : '14dip'
			},
			color : '#FFFFFF',
			left : '4%',
			top : '4%',
			width : '92%'
		});

		commentBg.add(chat_msg_label);
        
        var dateTime = Ti.UI.createLabel({
            text : date,
            color : '#d0f6d9',
            font : {
                fontSize : '12dip'
            },
            //bottom : '1%',
            bottom : '1%',
            left : '4%',
            //width : '90%',
            //height: '10%',
            textAlign : 'left'
        });
        commentBg.add(dateTime);
		
		rowView.add(commentBg);

		tabledata.push(rowView);
		tableview.data = tabledata;
		tableview.scrollToIndex(220)
	}

	/*
	 * Bottom area start
	 */
	var text_feild = Titanium.UI.createTextField({
		hintText : "Enter Message Here",
		bottom : "0%",
		height : "10%",
		width : "80%",
		right : "0%"
	});
	view.add(text_feild);
 
	text_feild.addEventListener('focus', function(e) {
   view.animate({bottom:225, duration:500}); 
		text_feild.setHeight = "20%";
	});
	text_feild.addEventListener('return', function(e) {
		if (text_feild.value != "")
			sendMessage(Loggedin_id, friend_uid, text_feild.value, true,'');
			text_feild.value = '';
	});
	text_feild.addEventListener('blur', function() { 
	    view.animate({bottom: 0, duration:500}); 
	});

	var sendButton = Ti.UI.createImageView({
		image :  '/assets/iconGift.png',
		height : '10%',
		width : '20%',
		bottom : '0%',
		left : '0%'
	});
	sendButton.addEventListener('click', function() {
		var GiftFromMessage = require('ui/iphone/MenuScreen/GiftFromMessage');
		var GiftFromMessage = new GiftFromMessage(userinfo,friend_uid);
		GiftFromMessage.open({
			modal : true
		});
/*
		if (text_feild.value != "")
			sendMessage(Loggedin_id, friend_uid, text_feild.value, true);
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
		var httpclientt = require('ui/iphone/Functions/function');
		httpclientt.requestServer({

			success : function(e) {
				unreadmessages = JSON.parse(this.responseText);
				if (unreadmessages.Record != undefined) {
					for (var i = unreadmessages.Record.length - 1; i > -1; i--) {
						sendMessage(Loggedin_id, friend_uid, unreadmessages.Record[i].MESSAGE_TEXT, false,unreadmessages.Record[i].DATETIME);
					}
					//alert("return");
				}

			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://therealmattharmon.com/knp/get_unread_messages.php?sender_id=" + friend_uid + "&receiver_id=" + Loggedin_id + "",

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

	var activity = self.activity;
	view.addEventListener('android:back', function(e) {
		clearInterval(timer);
		timer = null;
	}); 
	return self;
};
module.exports = MessageScreen;
