function removeAllContent () {
 	headerView.remove(headerAvatarHeaderIcon); 
	headerView.remove(nameOfCharacter); 
	levelView.remove(LVLlbl); 
	headerView.remove(levelView); 
	totalGoldView.remove(Goldlbl); 
	headerView.remove(totalGoldView); 
	headerView.remove(backButton); 
	headingRow.remove(storeLbl); 
	headingRow.remove(lineBreak3View);
	enabledWrapperView.remove(goldTrayView);
	storeItemInfo.remove(coin_icon);
	goldTrayView.remove(numberOfGoldsLbl);
	enabledWrapperView.remove(storeItemDescriptionLbl);
	storeItemInfo.remove(storeIconWorth);
	storeItemInfo.remove(buyButton);
	enabledWrapperView.remove(storeItemInfo);
	summaryView.remove(getGoldButton);
	footerView.remove(lblSortBy);
	footerView.remove(giftsButton);
	footerView.remove(suppliesButton);
	footerView.remove(armorButton);
	footerView.remove(spellsButton);
	win.remove(headingRow);
	win.remove(table);
	win.remove(headerView);
	win.remove(summaryView);
	win.remove(footerView);
	
	win = null;
	winWidth = null;
	winHeight = null;
	chkArray = null;
	headerView = null;
	headerAvatarHeaderIcon = null;
	nameOfCharacter = null;
	levelView = null;
	LVLlbl = null;	
	totalGoldView = null;
	Goldlbl = null;
	backButton = null;
	headingRow = null;
	storeLbl = null;
	lineBreak3View = null;
	tableData = null;
	table = null;
	enabledWrapperView = null;
	row = null;
	goldTrayView = null;
	coin_icon = null;
	numberOfGoldsLbl = null;
	storeItemDescriptionLbl = null;
	storeItemInfo = null;
	storeIconWorth
	buyButton = null;
	summaryView = null;
	getGoldButton = null;
	footerView = null;
	lblSortBy = null;
	giftsButton = null;
	suppliesButton = null;
	armorButton = null;	
	spellsButton = null; 
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

function getStoreItemInfoWidth() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 170;
	} else if (winWidth < 480 && winHeight < 800) {
		return 74;
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
		url : 'inventory.js'
		//url:'level2.js'
	});
	inventory_win.open();
	removeAllContent();
});
var headingRow = Ti.UI.createView({
	height : getHeaderHeight(),
	top : getHeaderHeight(),
	width : "100%",
	zIndex : 200
});

// Knights label in search section
var storeLbl = Ti.UI.createLabel({
	text : 'STORE',
	color : '#FFFFFF',
	font : {
		fontWeight : 'bold',
		fontSize : getHeadingFontSize()
	},
	textAlign : 'center'
});
headingRow.add(storeLbl);

// Line break
var lineBreak3View = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 2,
	zIndex : 200,
	bottom : 1,
	left : getMarginNormal1(),
	width : winWidth - (getMarginNormal1() * 2)
});
headingRow.add(lineBreak3View);

var tableData = [];
var table = Ti.UI.createTableView({
	objName : 'inventort_craft',
	height : winHeight - getHeaderHeight() - 2 * getHeaderHeight() + headingRow.height, // 100%-header_height-footer height
	top : getHeaderHeight() + headingRow.height
});

for (var i = 0; i < 4; i++) {
	var row = Ti.UI.createTableViewRow({
		className : 'row',
		objName : 'row',
		touchEnabled : true,
		height : getRawDefaultHeight(),
		top : 0,
		expanded : false
	});

	var enabledWrapperView = Ti.UI.createView({
		backgroundColor : '#3d3d3d',
		objName : 'enabledWrapperView',
		rowID : i,
		width : Ti.UI.FILL,
		top : 0,
		height : getRawDefaultHeight()
	});

	// Store Image
	var goldTrayView = Ti.UI.createView({
		top : getMarginNormal1(),
		left : getMarginNormal1(),
		width : getAvatarImageWidthHeight(),
		height : getAvatarImageWidthHeight(),
		borderRadius : 20,
		borderWidth : 1,
		borderColor : "#FFFFFF",
		zIndex : 50
	});
	enabledWrapperView.add(goldTrayView);

	var coin_icon = Ti.UI.createImageView({
		image : "images/listview_coin_icon.png",
		top : getMarginNormal1(),
		width : 50,
		height : 23
	});
	goldTrayView.add(coin_icon);

	
	// Create a Label.
	var numberOfGoldsLbl = Ti.UI.createLabel({
		text : (i*2)+(i+2)+(i+1) + 100,
		color : '#FFFFFF',
		font : {fontSize:getNormalFontSize(), fontWeight : 'bold'},
		bottom : getMarginNormal1(),
		textAlign : 'center'
	});
	goldTrayView.add(numberOfGoldsLbl);
	
	// Create a Description Label.
	var storeItemDescriptionLbl = Ti.UI.createLabel({
		text : 'Signifies friendship; "I care"',
		color : '#787878',
		font : {
			fontSize : getNormalFontSize()
		},
		left : goldTrayView.left + goldTrayView.width + getMarginNormal1(),
		textAlign : 'center'
	});
	enabledWrapperView.add(storeItemDescriptionLbl);
	
	var storeItemInfo = Ti.UI.createView({
		right : 0,
		width : getStoreItemInfoWidth(),
		height : "100%"
		
	});
	
	
	// Create a Label.
	var storeIconWorth = Ti.UI.createLabel({
		text : 'USD\n$'+(i+0.99),
		color : '#FFFFFF',
		font : {fontSize:getNormalFontSize(), fontWeight : 'bold'},
		top : getMarginNormal1(),
		width : 50,
		right : (getMarginNormal1()*3),
		textAlign : 'center'
	});
	storeItemInfo.add(storeIconWorth);
	
	
	// Create a Button.
	var buyButton = Ti.UI.createButton({
		title : 'BUY',
		height : getButtonHeight(),
		width : getButtonWidth(),
		bottom : getMarginNormal1(),
		right : getMarginNormal1(),
		font : {
			fontSize : getNormalFontSize()
		},
		backgroundColor : "#38B414",
		color : "#FFFFFF"
	});
	
	// Listen for click events.
	buyButton.addEventListener('click', function() {
		alert('\'buyButton\' was clicked!');
	});
	storeItemInfo.add(buyButton);
	
	enabledWrapperView.add(storeItemInfo);

	row.add(enabledWrapperView);
	tableData.push(row);
}

table.setData(tableData);
//Summary
var summaryView = Titanium.UI.createView({
	backgroundColor : "#3D3D3D",
	height : getButtonHeight() + getMarginNormal1() * 2,
	width : "100%",
	bottom : getHeaderHeight()
});


// Create a Button.
var getGoldButton = Ti.UI.createButton({
	color : "#FFFFFF",
	title : "GET GOLD",
	backgroundColor : "#474747",
	borderColor : "#333333",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	borderRadius : 2
});
// Add to the parent view.
summaryView.add(getGoldButton);


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

//Gifts Button
var giftsButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Gifts",
	backgroundColor : "#474747",
	borderColor : "#6992a8",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : getKnightButtonLeft(),
	borderRadius : 2
});
footerView.add(giftsButton);
giftsButton.addEventListener("click", function(e) {
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

//Supplies Button
var suppliesButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Supplies",
	backgroundColor : "#474747",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : giftsButton.left + giftsButton.width + getMarginNormal1(),
	borderRadius : 2
});
footerView.add(suppliesButton);
suppliesButton.addEventListener("click", function(e) {
	// var princesses_friend_home = Titanium.UI.createWindow({
		// url : 'princesses_friend_home.js'
		// //url:'level2.js'
	// });
	// princesses_friend_home.open();

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

//Armor Button
var armorButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Armor",
	backgroundColor : "#474747",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : suppliesButton.left + suppliesButton.width + getMarginNormal1(),
	borderRadius : 2
});
footerView.add(armorButton);
armorButton.addEventListener("click", function(e) {
	// var friend_interactions = Titanium.UI.createWindow({
		// url : 'friend_interactions.js'
	// });
	// friend_interactions.open();

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

//Spells Button
var spellsButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Spells",
	backgroundColor : "#474747",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : armorButton.left + armorButton.width + getMarginNormal1(),
	borderRadius : 2
});
footerView.add(spellsButton);
spellsButton.addEventListener("click", function(e) {
	// var request_friends = Titanium.UI.createWindow({
		// url : 'request_friends.js'
		// //url:'level2.js'
	// });
	// request_friends.open();

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

win.add(headingRow);
win.add(table);
win.add(headerView);
win.add(summaryView);
win.add(footerView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'store_home.js'
	});
	window.open();
	removeAllContent();
});

win.open();
