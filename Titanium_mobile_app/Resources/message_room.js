function removeAllContent() {

	if(timer != "0")
		clearInterval(timer);

	win = null;
	winWidth = null;
	winHeight = null;
	headerView = null;
}

var win = Titanium.UI.createWindow({
	title : "Crafting Home",
	width : '100%',
	navBarHidden : true,
	height : '100%',
	backgroundColor : "#3d3d3d",
	exitOnClose : true,
	zIndex : 0
});
win.orientationModes = [Ti.UI.PORTRAIT];
var winWidth = Ti.Platform.displayCaps.platformWidth;
var winHeight = Ti.Platform.displayCaps.platformHeight;

function getTableViewHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 270;
	} else if (winWidth < 480 && winHeight < 800) {
		return 120;
	}
}

function getCharacterHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 350;
	} else if (winWidth < 480 && winHeight < 800) {
		return 88;
	}
}

function getCharacterWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 131;
	} else if (winWidth < 480 && winHeight < 800) {
		return 29;
	}
}

function getFriendsWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 100;
	} else if (winWidth < 480 && winHeight < 800) {
		return 43;
	}
}

function getFriendsHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 40;
	} else if (winWidth < 480 && winHeight < 800) {
		return 18;
	}
}

function getListImageWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 68;
	} else if (winWidth < 480 && winHeight < 800) {
		return 34;
	}
}

function getFriendsIconHeight() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 20;
	} else if (winWidth < 480 && winHeight < 800) {
		return 8;
	}
}

function getFriendsIconWidth() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 24;
	} else if (winWidth < 480 && winHeight < 800) {
		return 11;
	}
}

function getRawDefaultHeight() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 100;
	} else if (winWidth < 480 && winHeight < 800) {
		return 55;
	}
}

function getKnightButtonLeft() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 90;
	} else if (winWidth < 480 && winHeight < 800) {
		return 55;
	}
}

function getButtonWidth() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 90;
	} else if (winWidth < 480 && winHeight < 800) {
		return 55;
	}
}

function getSmallButtonWidth() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 75;
	} else if (winWidth < 480 && winHeight < 800) {
		return 45;
	}
}

function getNormalButtonWidth() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 110;
	} else if (winWidth < 480 && winHeight < 800) {
		return 45;
	}
}

function getSmallButtonHeight() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 30;
	} else if (winWidth < 480 && winHeight < 800) {
		return 12;
	}
}

function getButtonHeight() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 35;
	} else if (winWidth < 480 && winHeight < 800) {
		return 17;
	}
}

function getChatIconWidthHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 26;
	} else if (winWidth < 480 && winHeight < 800) {
		return 16;
	}
}

function getOnlineIconWidthHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 18;
	} else if (winWidth < 480 && winHeight < 800) {
		return 12;
	}
}

function getContainerIconHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 24;
	} else if (winWidth < 480 && winHeight < 800) {
		return 14;
	}
}

function getContainerIconWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 18;
	} else if (winWidth < 480 && winHeight < 800) {
		return 8;
	}
}

function getNotificationHeightWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 24;
	} else if (winWidth < 480 && winHeight < 800) {
		return 16;
	}
}

function getSmallFontSize() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 12;
	} else if (winWidth < 480 && winHeight < 800) {
		return 8;
	}
}

function getNormalFontSize() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 16;
	} else if (winWidth < 480 && winHeight < 800) {
		return 10;
	}
}

function getHeadingFontSize() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 24;
	} else if (winWidth < 480 && winHeight < 800) {
		return 14;
	}
}

function getAvatarImageWidthHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 82;
	} else if (winWidth < 480 && winHeight < 800) {
		return 34;
	}
}

function getHeaderHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 48;
	} else if (winWidth < 480 && winHeight < 800) {
		return 18;
	}
}

function getAvatarHeaderIconHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 48;
	} else if (winWidth < 480 && winHeight < 800) {
		return 18;
	}
}

function getFontSizeNormal1() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 24;
	} else if (winWidth < 480 && winHeight < 800) {
		return 12;
	}
}

function getMarginNormal1() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 8;
	} else if (winWidth < 480 && winHeight < 800) {
		return 4;
	}
}

function getInputBoxWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 200;
	} else if (winWidth < 480 && winHeight < 800) {
		return 24;
	}
}

function getBorderWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 6;
	} else if (winWidth < 480 && winHeight < 800) {
		return 2;
	}
}

//headerView
var headerView = Titanium.UI.createView({
	top : 0,
	height : getHeaderHeight(),
	width : "100%",
	backgroundColor : "#808080",
	zIndex : 0
});

var thread_avatars = Titanium.UI.createLabel({
	text : Ti.App.Properties.getString('friend_name')
});
headerView.add(thread_avatars);
/*
* Back Button
*/
//backButton
var backButton = Titanium.UI.createImageView({
	image : "images/back_button.png",
	height : "90%",
	right : 0,
	width : getHeaderHeight()
});
headerView.add(backButton);
backButton.addEventListener("click", function(e) {
	var inventory_win = Titanium.UI.createWindow({
		url : 'friend_vs_me_dashboard.js'
		//url:'level2.js'
	});
	inventory_win.open();
	removeAllContent();
});

var scrollView = Titanium.UI.createScrollView({
	top : getHeaderHeight(),
	left : 0,
	height : winHeight - (getHeaderHeight() * 3),
	backgroundColor : '#E2E2E2',
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true
});
win.add(scrollView);

var textArea = Ti.UI.createTextField({
	hintText : "Message",
	color : '#888',
	font : {
		fontSize : 20,
		fontWeight : 'bold'
	},
	keyboardType : Ti.UI.KEYBOARD_ASCII,
	textAlign : 'left',
	bottom : getMarginNormal1(),
	left : getMarginNormal1(),
	width : winWidth - (getHeaderHeight() * 3) + (getHeaderHeight() / 2),
	height : getHeaderHeight()
});
var url = "http://justechinfo.com/kap_server/get_thread_messages.php?sender_id="+Ti.App.GLBL_uid+"&receiver_id="+Ti.App.Properties.getString('friend_request_uid')+"";
// + Ti.App.GLBL_uid + "&receiver_id=10000002";//http://justechinfo.com/kap_server/friend_list.php?uid=" + Ti.App.GLBL_uid;
var xhr = Ti.Network.createHTTPClient({
	onload : function() {
		//alert(Ti.App.Properties.getString('friend_request_uid'));
		
		json = JSON.parse(this.responseText);
		if (json.Record != undefined) {
			for (var i = json.Record.length - 1; i > -1; i--) {
				rec = json.Record[i];
				if (rec.SENDER_UID == Ti.App.GLBL_uid)
					myMessage(rec.MESSAGE_TEXT);
				else
					friendMessage(rec.MESSAGE_TEXT);
			}
			//clientSocket.write(Ti.createBuffer("Hello"));
			scrollView.scrollTo(0, scrollView.getHeight());
		} else {
//			alert("No messages found!");
		}

	},
	onerror : function(e) {
		
	},
	timeout : 5000
});
xhr.open("GET", url);
xhr.send();

//Send Button
var sendButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Send",
	backgroundColor : "#50c0e8",
	borderWidth : 2,
	borderColor : "#ace0f2",
	height : getHeaderHeight(),
	width : getButtonWidth(),
	right : getMarginNormal1(),
	bottom : getMarginNormal1(),
	borderRadius : 2,
	font : {
		fontFamily : Ti.App.GLBL_default_font,
		fontSize : 20,
		fontWeight : 'bold'
	}
});
var current_top = 0;

function getCurrentTop(current_text_height) {
	var temp = current_top;
	//alert(current_text_height);
	if (temp == 0) {
		if (current_text_height == 32) {
			current_top = (getMarginNormal1() * 4) + current_text_height + 20;
		} else {
			current_top = (getMarginNormal1() * 4) + current_text_height;
		}
		return getMarginNormal1() * 2;
	} else {
		if (current_text_height == 32) {
			current_top = current_top + current_text_height + (getMarginNormal1() * 2) + 20;
		} else {
			current_top = current_top + current_text_height + (getMarginNormal1() * 2);
		}
	}

	return temp;
}

function myMessage(msg) {
	var label = Titanium.UI.createLabel({
		text : msg,
		font : {
			fontSize : 16,
			fontWeight : 'bold'
		},
		textAlign : 'left',
		left : getMarginNormal1() * 2,
		color : '#1C1C1C'
	});

	var floatToInt = function(float_value) {
		float_value = String(float_value);
		var index = float_value.indexOf('.');
		if (index > 0) {
			return float_value.substr(0, index);
		} else {
			return float_value;
		}
	};
	//number of characters per line
	var charsPerLn = 42;

	//number of characters in text
	var txtln = label.text.length;

	//number of lines
	var numlns = txtln / charsPerLn;
	numlns = floatToInt(numlns);
	numlns++;
	//if(numlns == 0) {numlns = 1;}
	//alert("txtln.size:" + txtln+"\nnumlns:"+numlns);

	var avatar_image = Titanium.UI.createImageView({
		image : "images/avatar_small_icon.png",
		left : getMarginNormal1(),
		top : getCurrentTop((getHeaderHeight() / 2) * numlns + (getMarginNormal1() * 2)),
		width : getHeaderHeight()
	});
	var newview = Titanium.UI.createView({
		top : avatar_image.top, // getCurrentTop(getHeaderHeight() * (2 / 3) * numlns),
		borderRadius : 12,
		left : (getMarginNormal1() * 2) + avatar_image.width,
		height : (getHeaderHeight() / 2) * numlns + (getMarginNormal1() * 2),
		width : getHeaderHeight() * 6 + (getMarginNormal1() * 2),
		backgroundColor : '#F2F5A9',
		borderColor : '#A4A4A4',
		borderWidth : 2
	});
	newview.add(label);

	scrollView.add(avatar_image);
	scrollView.add(newview);

}

function friendMessage(msg) {
	var label = Titanium.UI.createLabel({
		text : msg,
		font : {
			fontSize : 16,
			fontWeight : 'bold'
		},
		textAlign : 'right',
		right : getMarginNormal1() * 2,
		color : '#1C1C1C'
	});

	var floatToInt = function(float_value) {
		float_value = String(float_value);
		var index = float_value.indexOf('.');
		if (index > 0) {
			return float_value.substr(0, index);
		} else {
			return float_value;
		}
	};
	//number of characters per line
	var charsPerLn = 35;

	//number of characters in text
	var txtln = label.text.length;

	//number of lines
	var numlns = txtln / charsPerLn;
	numlns = floatToInt(numlns);
	numlns++;
	//if(numlns == 0) {numlns = 1;}
	//alert("txtln.size:" + txtln+"\nnumlns:"+numlns);

	var avatar_image = Titanium.UI.createImageView({
		image : "images/friend_avatar_small_icon.png",
		right : getMarginNormal1(),
		top : getCurrentTop((getHeaderHeight() / 2) * numlns + (getMarginNormal1() * 2)),
		width : getHeaderHeight()
	});
	var newview = Titanium.UI.createView({
		top : avatar_image.top, // getCurrentTop(getHeaderHeight() * (2 / 3) * numlns),
		borderRadius : 12,
		right : (getMarginNormal1() * 2) + avatar_image.width,
		height : (getHeaderHeight() / 2) * numlns + (getMarginNormal1() * 2),
		width : getHeaderHeight() * 6 + (getMarginNormal1() * 2),
		backgroundColor : '#F2F2F2',
		borderColor : '#A4A4A4',
		borderWidth : 2
	});
	newview.add(label);

	scrollView.add(avatar_image);
	scrollView.add(newview);

}

sendButton.addEventListener("click", function(e) {
	myMessage(textArea.value);
	var encoded_message = Ti.Network.encodeURIComponent(textArea.value);
	sendMessage(Ti.App.GLBL_uid,Ti.App.Properties.getString('friend_request_uid'),encoded_message)
	scrollView.scrollTo(0, scrollView.getHeight());
});
var timer = "0";
timer = setInterval(function(){
	var url = "http://www.justechinfo.com/kap_server/get_unread_messages.php?sender_id="+Ti.App.Properties.getString('friend_request_uid')+"&receiver_id="+Ti.App.GLBL_uid+"";
	var Record;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				for (var i = json.Record.length - 1; i > -1; i--) {
					rec = json.Record[i];
					friendMessage(rec.MESSAGE_TEXT);
				}
				//clientSocket.write(Ti.createBuffer("Hello"));
				scrollView.scrollTo(0, scrollView.getHeight());
			} else {
	//			alert("No messages found!");
			}
		},
		onerror : function(e) {
		},
		timeout : 5000
	});
	xhr.open("GET", url);
	xhr.send(); 

},5000);

function sendMessage(sender_id,receiver_id,message){
var url = "http://justechinfo.com/kap_server/send_message.php?sender_id="+sender_id+"&receiver_id="+receiver_id+"&message="+message;
// + Ti.App.GLBL_uid + "&receiver_id=10000002";//http://justechinfo.com/kap_server/friend_list.php?uid=" + Ti.App.GLBL_uid;
var xhr = Ti.Network.createHTTPClient({
	onload : function() {
		json = JSON.parse(this.responseText);
		if (json.Message == undefined) {
			alert("Something went wrong!");
		} 

	},
	onerror : function(e) {
		
	},
	timeout : 5000
});
xhr.open("GET", url);
xhr.send();
}

win.add(sendButton);
win.add(textArea);
win.add(headerView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'friend_vs_me_dashboard.js'
	});
	window.open();
	removeAllContent();
});

win.open();
