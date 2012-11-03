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

function getTableViewHeight(){
	if (winWidth >= 480 && winHeight >= 800) {
		return 270;
	} else if (winWidth < 480 && winHeight < 800) {
		return 120;
	}
}
function getCharacterHeight(){
	if (winWidth >= 480 && winHeight >= 800) {
		return 350;
	} else if (winWidth < 480 && winHeight < 800) {
		return 88;
	}
}
function getCharacterWidth(){
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

//headerAvatarHeaderIcon
var headerAvatarHeaderIcon = Titanium.UI.createImageView({
	image : "images/my_avatar.png",
	height : getAvatarHeaderIconHeight(),
	width : getAvatarHeaderIconHeight(),
	top : 0,
	left : 0
});
headerView.add(headerAvatarHeaderIcon);

//nameOfCharacter
var nameOfCharacter = Titanium.UI.createLabel({
	text : Ti.App.GLBL_name,
	left : getAvatarHeaderIconHeight() + getMarginNormal1(),
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getFontSizeNormal1()
	}
});
headerView.add(nameOfCharacter);

//levelView
var levelView = Titanium.UI.createView({
	backgroundColor : "#474747",
	height : "80%",
	right : getHeaderHeight() + 2 * getMarginNormal1() + 3 * getHeaderHeight(),
	width : 2 * getHeaderHeight()
});
//LVLlbl
var LVLlbl = Titanium.UI.createLabel({
	text : "LVL: 4",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getFontSizeNormal1()
	}
});
levelView.add(LVLlbl);
headerView.add(levelView);

/*
* Number of Golds remaining
*/
//totalGoldView
var totalGoldView = Titanium.UI.createView({
	backgroundColor : "#474747",
	height : "80%",
	right : getHeaderHeight() + getMarginNormal1(),
	width : 3 * getHeaderHeight()
});
//Goldlbl
var Goldlbl = Titanium.UI.createLabel({
	text : "Gold:  250",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getFontSizeNormal1()
	}
});
totalGoldView.add(Goldlbl);
headerView.add(totalGoldView);

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
		url : 'friend_interactions.js'
		//url:'level2.js'
	});
	inventory_win.open();
});
var findFriendsView = Ti.UI.createView({
	height : getHeaderHeight(),
	top : getHeaderHeight(),
	width : "100%",
	zIndex : 200
});

// Knights label in search section
var myFriendsLbl = Ti.UI.createLabel({
	text : 'MyFriends',
	color : '#828282',
	width : 2 * getHeaderHeight(),
	font : {
		fontSize : getNormalFontSize()
	},
	left : getMarginNormal1() * 2
});

// Add to the parent view.
findFriendsView.add(myFriendsLbl);

// Text field to enter knight's name
var nameLbl = Ti.UI.createLabel({
	text : 'LordAlmost',
	left : myFriendsLbl.width + getMarginNormal1(),
	font : {
		fontSize : getHeadingFontSize()
	},
	color : '#FFFFFF'
});
// Add to the parent view.
findFriendsView.add(nameLbl);

//Number of gold that is showing on right side
var goldView = Ti.UI.createView({
	width : getHeaderHeight() * 3 / 2,
	height : getHeaderHeight() * 3 / 2,
	top : getHeaderHeight(),
	right : getMarginNormal1(),
	backgroundColor : "#474747",
	zIndex : 500
});

var goldImageView = Ti.UI.createImageView({
	height : "40%",
	image : "images/coin_icon.png",
	top : 0
});
goldView.add(goldImageView);

var goldLbl = Ti.UI.createLabel({
	height : "50%",
	text : "600",
	color : '#FFE801',
	bottom : 0
});
goldView.add(goldLbl);

// Line break
var lineBreakView1 = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 2,
	lef : getMarginNormal1(),
	top : getHeaderHeight() * 2,
	width : winWidth - getMarginNormal1() * 2
});

// Create a Label.
var quotationLbl = Ti.UI.createLabel({
	text : "Let's make beautiful music together.",
	color : '#bbbbbb',
	font : {
		fontSize : getNormalFontSize()
	},
	height : getHeaderHeight() * 2 / 3,
	top : getHeaderHeight() * 2,
	left : getMarginNormal1(),
	textAlign : 'left'
});

//Level count that is showing on right side
var level1View = Ti.UI.createView({
	width : getHeaderHeight() * 3 / 2,
	height : getHeaderHeight() * 2 / 3,
	top : getHeaderHeight(),
	right : goldView.width + 2 * getMarginNormal1(),
	backgroundColor : "#474747",
	zIndex : 500
});

var level1Lbl = Ti.UI.createLabel({
	height : "50%",
	font : {
		fontSize : getSmallFontSize()
	},
	text : "LVL: 1",
	color : '#FFFFFF'
});
level1View.add(level1Lbl);

// Online Status Icon
var onlineStatusIcon = Ti.UI.createView({
	backgroundImage : 'images/online_icon.png',
	width : getOnlineIconWidthHeight(),
	height : getOnlineIconWidthHeight(),
	left : getMarginNormal1(),
	top : getHeaderHeight() * 2 + getHeaderHeight() * 2 / 3 + getMarginNormal1(),
	zIndex : 50
});

// Online Status Desctiption.
var onlineStatusDescription = Ti.UI.createLabel({
	text : 'Online',
	color : '#FFFFFF',
	font : {
		fontSize : getSmallFontSize()
	},
	top : getHeaderHeight() * 2 + getHeaderHeight() * 2 / 3 + getMarginNormal1(),
	left : onlineStatusIcon.width + getMarginNormal1() * 2,
	textAlign : 'left'
});

// Chat Icon
var chatIcon = Ti.UI.createView({
	backgroundImage : 'images/chat_icon.png',
	width : getChatIconWidthHeight(),
	height : getChatIconWidthHeight(),
	left : getHeaderHeight() * 2 + getMarginNormal1(),
	top : getHeaderHeight() * 2 + getHeaderHeight() * 2 / 3,
	zIndex : 50
});

// Message Icon
var messageIcon = Ti.UI.createView({
	backgroundImage : 'images/message_small_icon.png',
	width : getChatIconWidthHeight(),
	height : getChatIconWidthHeight(),
	left : getHeaderHeight() * 3 + getMarginNormal1(),
	top : getHeaderHeight() * 2 + getHeaderHeight() * 2 / 3,
	zIndex : 50
});
// Message Icon
var friendsBtn = Ti.UI.createButton({
	backgroundImage : 'images/btn_friends.png',
	title : "32 friends",
	font : {
		fontSize : getSmallFontSize()
	},
	color : "#FFFFFF",
	width : getFriendsWidth(),
	height : getFriendsHeight(),
	left : getHeaderHeight() * 4 + getMarginNormal1(),
	top : getHeaderHeight() * 2 + getHeaderHeight() * 2 / 3,
	zIndex : 50,
	textAlign : 'right'
});


// Create an ImageView.
var maleCharacterImage = Ti.UI.createImageView({
	image : 'images/hdpi_male_character_rotated.png',
	width : getCharacterWidth(),
	height : getCharacterHeight(),
	top : getHeaderHeight() * 2 + getHeaderHeight() * 2 / 3,
	right : getMarginNormal1(),
	zIndex : 1000
});



//findFriendsView.add(levelView);

/***************************************TABLE VIEW STARTED*****************************************/

var tableData = [];
var table = Ti.UI.createTableView({
	objName : 'inventort_craft',
	height : getTableViewHeight(), //winHeight - lineBreak2View.top - 4 * getHeaderHeight(), // 100%-header_height-footer height
	top : friendsBtn.top+friendsBtn.height+getMarginNormal1()
});

for (var i = 0; i <= 2; i++) {
	var row = Ti.UI.createTableViewRow({
		className : 'row',
		objName : 'row',
		touchEnabled : true,
		height : getTableViewHeight()/3
	});

	var enabledWrapperView1 = Ti.UI.createView({
		backgroundColor : '#3d3d3d',
		objName : 'enabledWrapperView1',
		rowID : i,
		width : Ti.UI.FILL,
		height : '100%'
	});

	// Display Image
	var displayImage = Ti.UI.createView({
		left : getMarginNormal1(),
		width : getListImageWidth(),
		height : getListImageWidth(),
		backgroundImage : 'images/question_icon.png',
		zIndex : 50
	});
	enabledWrapperView1.add(displayImage);

	// Create a Qestion label.
	var questTitleLbl = Ti.UI.createLabel({
		text : 'Write Poem',
		top : getMarginNormal1(),
		color : '#FFFFFF',
		font : {
			fontSize : getHeadingFontSize()
		},
		height : getHeadingFontSize() + getMarginNormal1(),
	});
	enabledWrapperView1.add(questTitleLbl);

	// Create a Qestion description label.
	var questDescriptionLbl = Ti.UI.createLabel({
		text : '(tap to choose)',
		top : questTitleLbl.height + getMarginNormal1(),
		color : '#BBBBBB',
		font : {
			fontSize : getNormalFontSize()
		},
		height : getNormalFontSize() + getMarginNormal1(),
	});
	enabledWrapperView1.add(questDescriptionLbl);
	
	row.add(enabledWrapperView1);
	tableData.push(row);
}
table.setData(tableData);
/*TABLE VIEW ENED*/

//friendshipMeterView 
var friendshipMeterView = Ti.UI.createView({
	height : 3*getHeaderHeight(),
	top : table.top+table.height+getMarginNormal1(),
	zIndex : 1000
});

//friendshipMeterHeading
var friendshipMeterHeading = Ti.UI.createLabel({
	top : getMarginNormal1(),
	font : {
		fontSize : getHeadingFontSize()
	},
	text : "Friendship Meter",
	color : "#FFFFFF",
});
friendshipMeterView.add(friendshipMeterHeading);

// Create a Qestion description label.
var questDescriptionLbl = Ti.UI.createLabel({
	text : '(tap to view stats)',
	top : 5*getMarginNormal1(),
	color : '#BBBBBB',
	font : {
		fontSize : getNormalFontSize()
	},
	height : 4*getMarginNormal1(),
});
friendshipMeterView.add(questDescriptionLbl);


// Create an ImageView.
var boyDpImageView = Ti.UI.createImageView({
	image : 'images/boy_dp.png',
	width : getHeaderHeight()*2,
	height : getHeaderHeight()*2,
	bottom : getMarginNormal1(),
	right : getMarginNormal1()
});

// Add to the parent view.
friendshipMeterView.add(boyDpImageView);

// Create an ImageView.
var girlDpImageView = Ti.UI.createImageView({
	image : 'images/girl_dp.png',
	width : getHeaderHeight()*2,
	height : getHeaderHeight()*2,
	bottom : getMarginNormal1(),
	left : getMarginNormal1()
});

// Add to the parent view.
friendshipMeterView.add(girlDpImageView);

// Create an ImageView.
var girlFuelImageView = Ti.UI.createImageView({
	image : 'images/girl_fuel.png',
	width : 218,
	height : 32,
	bottom : getMarginNormal1(),
	left : getMarginNormal1(),
	top : friendshipMeterView.top+friendshipMeterView.height
});

// Create an ImageView.
var boyFuelImageView = Ti.UI.createImageView({
	image : 'images/boy_fuel.png',
	width : 218,
	height : 32,
	bottom : getMarginNormal1(),
	right : getMarginNormal1(),
	top : friendshipMeterView.top+friendshipMeterView.height
});

// Add to the parent view.


// Create a Label.
var informationLbl = Ti.UI.createLabel({
	text : 'The Friendship Meter tracks how much you and this friend interact with one another. The more you do, the more your meter rises. When both bars are filled, you can raise your friend level by +1.',
	color : '#FFFFFF',
	font : {fontSize:getNormalFontSize()},
	top : friendshipMeterView.top+friendshipMeterView.height+32,
	textAlign : 'center'
});

// Add to the parent view.
win.add(informationLbl);

// Create a Label.
var currentLevelLbl = Ti.UI.createLabel({
	text : 'Friend Level -  2',
	color : '#FFFFFF',
	font : {fontSize:getHeadingFontSize()},
	bottom : getHeaderHeight()*2,
	textAlign : 'center'
});

// Add to the parent view.
win.add(currentLevelLbl);




//Summary
var summaryView = Titanium.UI.createView({
	height : getButtonHeight() + getMarginNormal1() * 2,
	width : "100%",
	bottom : getHeaderHeight()
});

//footerView
var footerView = Titanium.UI.createView({
	bottom : 0,
	height : getHeaderHeight(),
	width : "100%",
	backgroundColor : "#808080",
	zIndex : 0
});

win.add(findFriendsView);
win.add(goldView);
win.add(level1View);
win.add(lineBreakView1);
win.add(quotationLbl);
win.add(onlineStatusIcon);
win.add(onlineStatusDescription);
win.add(chatIcon);
win.add(messageIcon);
win.add(friendsBtn);
win.add(maleCharacterImage);
win.add(table);
win.add(friendshipMeterView);
win.add(girlFuelImageView);
win.add(boyFuelImageView);
win.add(headerView);
//win.add(summaryView);
win.add(footerView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'friend_interactions.js'
	});
	window.open();
});

win.open();
