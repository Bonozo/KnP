function removeAllContent() {

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
		url : 'app.js'
		//url:'level2.js'
	});
	inventory_win.open();
	removeAllContent();
});

var scrollView = Titanium.UI.createScrollView({
	top : getHeaderHeight(),
	left : 0,
	height : winHeight - (getHeaderHeight()*3),
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:true
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
function getCurrentTop(){
	current_top
}
sendButton.addEventListener("click", function(e) {
	
	var label = Titanium.UI.createLabel({
		text : textArea.value
	});
	
	//number of characters per line
	var charsPerLn = 120; 
	
	//number of characters in text
	var txtln = label.length;
	
	//number of lines
	var numlns = txtln / charsPerLn;
	var sometext = Titanium.UI.createLabel({
		text : textArea.value
	});
	alert("label.size:"+label.size.height);
	/*var newview = Titanium.UI.createView({
		top : current_top,
		left : 0,
		height : getHeaderHeight()*8,
		backgroundColor : 'green',
	});
	newview.add(sometext);
	
	scrollView.add(newview);*/
	
});

win.add(sendButton);
win.add(textArea);
win.add(headerView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'app.js'
	});
	window.open();
});

win.open();
