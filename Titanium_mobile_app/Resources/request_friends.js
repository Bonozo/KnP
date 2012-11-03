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

function getFriendsIconHeight(){
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 20;
	} else if (winWidth < 480 && winHeight < 800) {
		return 8;
	}
}
function getFriendsIconWidth(){
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 24;
	} else if (winWidth < 480 && winHeight < 800) {
		return 11;
	}
}
function getRawDefaultHeight(){
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
backButton.addEventListener("click",function(e){
	var inventory_win = Titanium.UI.createWindow({
	    url:'inventory.js'
	    //url:'level2.js'
	});
	inventory_win.open();
});
var findFriends = Ti.UI.createView({
	height : getHeaderHeight(),
	top : getHeaderHeight(),
	width : "100%",
	zIndex : 200
});

// Request label in search section
var requestLbl = Ti.UI.createLabel({
	text : 'Friend requests',
	color : '#828282',
	font : {
		fontSize : getNormalFontSize()
	},
	left : getMarginNormal1() * 3,
	textAlign : 'center'
});

// Add to the parent view.
findFriends.add(requestLbl);

// Text field to enter knight's name
var findByName = Ti.UI.createImageView({
	image : "images/find_by_names.png"
});

// Add to the parent view.
findFriends.add(findByName);

var tableData = [];
var table = Ti.UI.createTableView({
	objName : 'inventort_craft',
	height : winHeight - getHeaderHeight() - 2 * getHeaderHeight() + findFriends.height, // 100%-header_height-footer height
	top : getHeaderHeight() + findFriends.height
});

for (var i = 0; i <= 20; i++) {
	var row = Ti.UI.createTableViewRow({
		className : 'row',
		objName : 'row',
		touchEnabled : true,
		height : getRawDefaultHeight(),
		top : 0,
		expanded : false
	});
	row.addEventListener('click', function(e) {
		var make_friend_request = Titanium.UI.createWindow({
		    url:'make_friend_request.js'
		    //url:'level2.js'
		});
		make_friend_request.open();
	});

	var enabledWrapperView = Ti.UI.createView({
		backgroundColor : '#3d3d3d',
		objName : 'enabledWrapperView',
		rowID : i,
		width : Ti.UI.FILL,
		top : 0,
		height : 300
	});
	//enabledWrapperView.addEventListener("click",checkAlert);

	// Create a CraftItem.
	var CraftItem = Ti.UI.createLabel({
		text : "LordValor",
		color : '#FFFFFF',
		font : {
			fontSize : getHeadingFontSize()
		},
		height : getHeadingFontSize() + getMarginNormal1(),
		top : getMarginNormal1(),
		left : getMarginNormal1()
	});
	// Add to the parent view.
	enabledWrapperView.add(CraftItem);

	// Craft Desctiption.
	var craftDescription = Ti.UI.createLabel({
		text : 'makes a good gift',
		color : '#7e7e7e',
		font : {
			fontSize : getNormalFontSize()
		},
		height : getNormalFontSize() + getMarginNormal1(),
		top : CraftItem.height + getMarginNormal1(),
		left : getMarginNormal1(),
		textAlign : 'center'
	});

	// Add to the parent view.
	enabledWrapperView.add(craftDescription);

	// Online Status Icon
	var onlineStatusIcon = Ti.UI.createView({
		backgroundImage : 'images/offline_icon.png',
		width : getOnlineIconWidthHeight(),
		height : getOnlineIconWidthHeight(),
		left : getMarginNormal1(),
		top : craftDescription.top+craftDescription.height+getMarginNormal1(),
		zIndex : 50
	});
	enabledWrapperView.add(onlineStatusIcon);

	// Online Status Desctiption.
	var onlineStatusDescription = Ti.UI.createLabel({
		text : 'Last online 1 day ago',
		color : '#7e7e7e',
		font : {
			fontSize : getSmallFontSize()
		},
		top : craftDescription.top+craftDescription.height+getMarginNormal1(),
		left : onlineStatusIcon.width + getMarginNormal1() * 2,
		textAlign : 'center'
	});

	// Add to the parent view.
	enabledWrapperView.add(onlineStatusDescription);

	// Avatar Image
	var avatarImage = Ti.UI.createView({
		top : getMarginNormal1(),
		right : getMarginNormal1(),
		width : getAvatarImageWidthHeight(),
		height : getAvatarImageWidthHeight(),
		backgroundImage : 'images/other_avatar.png',
		zIndex : 50
	});
	enabledWrapperView.add(avatarImage);

	// Level And Gold View
	var levelAndGoldView = Ti.UI.createView({
		top : getMarginNormal1(),
		right : avatarImage.width + 2 * getMarginNormal1(),
		width : getAvatarImageWidthHeight(),
		height : getAvatarImageWidthHeight(),
		zIndex : 50
	});
	enabledWrapperView.add(levelAndGoldView);

	var levelView = Ti.UI.createView({
		width : "100%",
		height : "30%",
		top : 0,
		backgroundColor : "#474747",
		zIndex : 50
	});
	levelAndGoldView.add(levelView);

	var levelLbl = Ti.UI.createLabel({
		text : 'LVL : ',
		color : '#FFFFFF',
		font : {
			fontSize : getNormalFontSize()
		},
		left : getMarginNormal1(),
		textAlign : 'center'
	});

	// Add to the parent view.
	levelView.add(levelLbl);

	var levelValueLbl = Ti.UI.createLabel({
		text : '4',
		color : '#FFE801',
		font : {
			fontSize : getNormalFontSize()
		},
		right : getMarginNormal1(),
		textAlign : 'center'
	});

	// Add to the parent view.
	levelView.add(levelValueLbl);

	var goldView = Ti.UI.createView({
		width : "100%",
		height : "65%",
		bottom : 0,
		backgroundColor : "#474747",
		zIndex : 50
	});
	levelAndGoldView.add(goldView);

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
	
	// numberOfFriendsIcon
	var numberOfFriendsIconImage = Ti.UI.createImageView({
		image : 'images/friends_icon.png',
		width : getFriendsIconWidth(),
		height : getFriendsIconHeight(),
		top : levelAndGoldView.height+2*getMarginNormal1()+getMarginNormal1()/2,
		right : avatarImage.width+getMarginNormal1()
	});
	// Add to the parent view.
	enabledWrapperView.add(numberOfFriendsIconImage);
	
	
	// numberOfFriendsLbl
	var numberOfFriendsLbl = Ti.UI.createLabel({
		text : '32 friends',
		color : '#FFFFFF',
		font : {fontSize:getSmallFontSize()},
		top : levelAndGoldView.height+3*getMarginNormal1(),
		right : getMarginNormal1()*4,
		textAlign : 'center'
	});
	
	// Add to the parent view.
	enabledWrapperView.add(numberOfFriendsLbl);
	//addFriendHeadingView
	var addFriendHeadingView = Ti.UI.createView({
		backgroundColor : "#626262",
		width : "100%",
		height : 25,
		top : numberOfFriendsIconImage.top+numberOfFriendsIconImage.height+getMarginNormal1(),
	});
	enabledWrapperView.add(addFriendHeadingView);
	
	// Create an ImageView.
	var addIconImage = Ti.UI.createImageView({
		image : 'images/add_friend_icon.png',
		width : getFriendsIconWidth()*2,
		height : getFriendsIconHeight()*2,
		top : numberOfFriendsIconImage.top+numberOfFriendsIconImage.height,
		left : getMarginNormal1()
	});

	// Add to the parent view.
	enabledWrapperView.add(addIconImage);
	// Create a Label.
	var addAsFriendLbl = Ti.UI.createLabel({
		text : 'Add LordValor as friend?',
		color : '#BABABA',
		font : {fontSize:getNormalFontSize()},
		textAlign : 'center'
	});
	// Add to the parent view.
	addFriendHeadingView.add(addAsFriendLbl);
	
	// infoLbl
	var infoLbl = Ti.UI.createLabel({
		text : 'LordValor may have Quests for you to complete',
		color : '#FFFFFF',
		font : {fontSize:getSmallFontSize()},
		top : addFriendHeadingView.top+addFriendHeadingView.height+getMarginNormal1(),
		textAlign : 'center'
	});
	// Add to the parent view.
	enabledWrapperView.add(infoLbl);

	var messageField = Titanium.UI.createTextField({
		width:"80%",
		borderRadius : 0,
		hintText:"type a message",
		top : addFriendHeadingView.top+addFriendHeadingView.height+getMarginNormal1()*4,
		height : getHeaderHeight(),
		backgroundColor : "#626262",
		borderColor : "#BBBBBB",
		borderWidth : 2,
		font : {fontSize : getNormalFontSize()},
		color : "#BBBBBB",
		keyboardType: Titanium.UI.KEYBOARD_ASCII 
	});
	enabledWrapperView.add(messageField);

	//Send Requests Button
	var sendRequestsButton = Titanium.UI.createButton({
		color : "#FFFFFF",
		title : "Send Request",
		backgroundColor : "#474747",
		font : {
			fontSize : getSmallFontSize()
		},
		top : messageField.top + messageField.height+getMarginNormal1(),
		height : getSmallButtonHeight(),
		width : getButtonWidth(),
		borderRadius : 2
	});
	enabledWrapperView.add(sendRequestsButton);


	row.add(enabledWrapperView);
	tableData.push(row);
}

table.setData(tableData);

function checkAlert(e) {
	alert(tableData[e]);

}

//Summary
var summaryView = Titanium.UI.createView({
	backgroundColor : "#3D3D3D",
	height : getButtonHeight() + getMarginNormal1() * 2,
	width : "100%",
	bottom : getHeaderHeight()
});

// Create a Button.
var LVLButton = Ti.UI.createButton({
	title : 'LVL',
	backgroundColor : "#474747",
	color : "#FFFFFF",
	height : getButtonHeight(),
	borderColor : "#404040",
	width : getButtonWidth(),
	left : getMarginNormal1() * 6,
	borderRadius : 2
});
// Add to the parent view.
summaryView.add(LVLButton);

// Create a Button.
var goldButton = Ti.UI.createButton({
	color : "#FFFFFF",
	backgroundImage : "images/coin_icon.png",
	height : getButtonHeight(),
	width : getButtonWidth(),
	borderRadius : 2
});
// Add to the parent view.
summaryView.add(goldButton);

// Create a Button.
var rightButton = Ti.UI.createButton({
	title : 'Online',
	color : "#FFFFFF",
	backgroundColor : "#474747",
	height : getButtonHeight(),
	borderColor : "#404040",
	width : getButtonWidth(),
	right : getMarginNormal1() * 6,
	borderRadius : 2
});
// Add to the parent view.
summaryView.add(rightButton);

//footerView
var footerView = Titanium.UI.createView({
	bottom : 0,
	height : getHeaderHeight(),
	width : "100%",
	backgroundColor : "#808080",
	zIndex : 0
});

// Sort by Label.
var lblSortBy = Ti.UI.createLabel({
	text : 'Sort By',
	color : '#FFFFFF',
	font : {
		fontSize : getNormalFontSize()
	},
	left : getMarginNormal1(),
	textAlign : 'center'
});

// Add to the parent view.
footerView.add(lblSortBy);

//Knight Button
var knightButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Kngiht",
	backgroundColor : "#474747",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : getKnightButtonLeft(),
	borderRadius : 2
});
footerView.add(knightButton);
knightButton.addEventListener("click", function(e) {
	var knights_friend_home = Titanium.UI.createWindow({
	    url:'knights_friend_home.js'
	    //url:'level2.js'
	});
	knights_friend_home.open();
/*
	knightButton.backgroundColor = "#3eaed6";
	knightButton.borderColor = "#6992a8";

	princessesButton.backgroundColor = "#474747";
	princessesButton.borderColor = "none";
	myFriendsButton.backgroundColor = "#474747";
	myFriendsButton.borderColor = "none";
	requestsButton.backgroundColor = "#474747";
	requestsButton.borderColor = "none";
*/
});

//Princesses Button
var princessesButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Princesses",
	backgroundColor : "#474747",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : knightButton.left + knightButton.width + getMarginNormal1(),
	borderRadius : 2
});
footerView.add(princessesButton);
princessesButton.addEventListener("click", function(e) {
	var princesses_friend_home = Titanium.UI.createWindow({
	    url:'princesses_friend_home.js'
	    //url:'level2.js'
	});
	princesses_friend_home.open();
/*
	princessesButton.backgroundColor = "#3eaed6";
	princessesButton.borderColor = "#6992a8";

	knightButton.backgroundColor = "#474747";
	knightButton.borderColor = "none";
	myFriendsButton.backgroundColor = "#474747";
	myFriendsButton.borderColor = "none";
	requestsButton.backgroundColor = "#474747";
	requestsButton.borderColor = "none";
*/
});

//MyFriends Button
var myFriendsButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "MyFriends",
	backgroundColor : "#474747",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : princessesButton.left + princessesButton.width + getMarginNormal1(),
	borderRadius : 2
});
footerView.add(myFriendsButton);
myFriendsButton.addEventListener("click", function(e) {
	var friend_interactions = Titanium.UI.createWindow({
	    url:'friend_interactions.js'
	});
	friend_interactions.open();
/*
	myFriendsButton.backgroundColor = "#3eaed6";
	myFriendsButton.borderColor = "#6992a8";

	knightButton.backgroundColor = "#474747";
	knightButton.borderColor = "none";
	princessesButton.backgroundColor = "#474747";
	princessesButton.borderColor = "none";
	requestsButton.backgroundColor = "#474747";
	requestsButton.borderColor = "none";
*/
});

//Requests Button
var requestsButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Requests",
	backgroundColor : "#3eaed6",
	borderColor : "#6992a8",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : myFriendsButton.left + myFriendsButton.width + getMarginNormal1(),
	borderRadius : 2
});
footerView.add(requestsButton);
requestsButton.addEventListener("click", function(e) {
/*
	requestsButton.backgroundColor = "#3eaed6";
	requestsButton.borderColor = "#6992a8";

	knightButton.backgroundColor = "#474747";
	knightButton.borderColor = "none";
	princessesButton.backgroundColor = "#474747";
	princessesButton.borderColor = "none";
	myFriendsButton.backgroundColor = "#474747";
	myFriendsButton.borderColor = "none";
*/
});

win.add(findFriends);
win.add(table);
win.add(headerView);
win.add(summaryView);
win.add(footerView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'inventory.js'
	});
	window.open();
});

win.open(); 