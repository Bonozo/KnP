function removeAllContent() {
	headerView.remove(headerAvatarHeaderIcon);
	headerView.remove(nameOfCharacter);
	levelView.remove(LVLlbl);
	headerView.remove(levelView);
	totalGoldView.remove(Goldlbl);
	headerView.remove(totalGoldView);
	headerView.remove(backButton);
	enabledWrapperView.remove(craftImage);
	craftImage.remove(craftNotificationView);
	craftImage.remove(numberOfCrafts);
	enabledWrapperView.remove(CraftItem);
	enabledWrapperView.remove(craftDescription);
	enabledWrapperView.remove(containerIconView);
	enabledWrapperView.remove(containerNotificationIconView);
	containerNotificationIconView.remove(containerNotification);
	enabledWrapperView.remove(flowerIconView);
	enabledWrapperView.remove(flowerNotificationIconView);
	flowerNotificationIconView.remove(flowerNotification);
	enabledWrapperView.remove(craftButton);
	row.remove(enabledWrapperView);
	win.remove(table);
	win.remove(headerView);
	win.remove(footerView);
	
	headerView = null;
	headerAvatarHeaderIcon = null;
	nameOfCharacter = null;
	levelView = null;
	LVLlbl = null;
	totalGoldView = null;
	Goldlbl = null;
	backButton = null;
	tableData = null;
	table = null;
	row = null;
	enabledWrapperView = null;
	craftImage = null;
	craftNotificationView = null;
	numberOfCrafts = null;
	CraftItem = null;
	craftDescription = null;
	containerIconView = null;
	containerNotificationIconView = null;
	containerNotification = null;
	flowerIconView = null;
	flowerNotificationIconView = null;
	flowerNotification = null;
	craftButton = null;
	footerView = null;
	win = null;

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
win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
var winWidth = Ti.Platform.displayCaps.platformWidth;
var winHeight = Ti.Platform.displayCaps.platformHeight;

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

function getCraftImageWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 68;
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
//LVLlbl
var LVLlbl;
function getLevel(callback){
	//alert('Enter!');
	var url = "http://justechinfo.com/kap_server/get_level.php?uid="+Ti.App.GLBL_uid;
	var rec;//,UID;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				callback(rec.LEVEL);
			}
			else{
				alert('Some error occured!');
			}
		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			alert('There was an error retrieving the remote data. Try again.');
		},
		timeout : 5000
	});
	xhr.open("GET", url);
	xhr.send();
}
//numberOfFriends
var numberOfFriends; 
getLevel(function(level){
	LVLlbl = Titanium.UI.createLabel({
		text : "LVL: "+level,
		color : "#FFFFFF",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : getFontSizeNormal1()
		}
	});
	levelView.add(LVLlbl);
	headerView.add(levelView);
});

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

function getGold(callback){
	//alert('Enter!');
	var url = "http://justechinfo.com/kap_server/get_golds.php?uid="+Ti.App.GLBL_uid;
	var rec;//,UID;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				
				callback(rec.TOTAL_UNIT);

			}
			else{
				alert('Some error occured!');
			}
	
			
		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			alert('There was an error retrieving the remote data. Try again.');
		},
		timeout : 5000
	});
	xhr.open("GET", url);
	xhr.send();
}
var Goldlbl;
getGold(function(gold){
	Goldlbl = Titanium.UI.createLabel({
		text : "Gold: "+gold,
		color : "#FFFFFF",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : getFontSizeNormal1()
		}
	});
	totalGoldView.add(Goldlbl);
});
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
	var window1 = Titanium.UI.createWindow({
		url : 'inventory.js'
		//url:'level2.js'
	});
	window1.open();
	removeAllContent();
});

var tableData = [];
var table = Ti.UI.createTableView({
	objName : 'inventort_craft',
	height : winHeight - getHeaderHeight() - getHeaderHeight(), // 100%-header_height-footer height
	top : getHeaderHeight()
});

for (var i = 0; i <= 20; i++) {
	var row = Ti.UI.createTableViewRow({
		className : 'row',
		objName : 'row',
		touchEnabled : true,
		height : 100
	});

	var enabledWrapperView = Ti.UI.createView({
		backgroundColor : '#3d3d3d',
		objName : 'enabledWrapperView',
		rowID : i,
		width : Ti.UI.FILL,
		height : '100%'
	});

	// Craft Image
	var craftImage = Ti.UI.createView({
		left : getMarginNormal1(),
		width : getCraftImageWidth(),
		backgroundImage : 'images/item_image.png',
		zIndex : 50
	});
	enabledWrapperView.add(craftImage);

	// Craft Notification
	var craftNotificationView = Ti.UI.createView({
		backgroundImage : 'images/notification_black.png',
		width : getNotificationHeightWidth(),
		height : getNotificationHeightWidth(),
		bottom : getMarginNormal1(),
		right : getMarginNormal1(),
		zIndex : 75
	});
	craftImage.add(craftNotificationView);

	// Number Of crafts.
	var numberOfCrafts = Ti.UI.createLabel({
		text : i,
		color : '#FFFFFF',
		font : {
			fontSize : getSmallFontSize()
		},
		bottom : (3 / 2) * getMarginNormal1(),
		right : 2 * getMarginNormal1(),
		zIndex : 100
	});

	// Add to the parent view.
	craftImage.add(numberOfCrafts);

	// Create a CraftItem.
	var CraftItem = Ti.UI.createLabel({
		text : 'New Item ' + (i + 1),
		color : '#FFFFFF',
		font : {
			fontSize : getHeadingFontSize()
		},
		height : getHeadingFontSize() + getMarginNormal1(),
		top : getMarginNormal1(),
		left : 2 * getMarginNormal1() + craftImage.width
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
		top : CraftItem.height + getMarginNormal1(),
		left : CraftItem.left,
		textAlign : 'center'
	});

	// Add to the parent view.
	enabledWrapperView.add(craftDescription);

	// Container Icon View
	var containerIconView = Ti.UI.createView({
		backgroundImage : 'images/container_icon.png',
		width : getContainerIconWidth(),
		height : getContainerIconHeight(),
		left : CraftItem.left,
		bottom : getMarginNormal1(),
		zIndex : 75
	});

	enabledWrapperView.add(containerIconView);

	// Container Notification Icon View
	var containerNotificationIconView = Ti.UI.createView({
		backgroundImage : 'images/notification_black_square.png',
		width : getNotificationHeightWidth() + (2 / 3),
		height : getNotificationHeightWidth() + (2 / 3),
		left : CraftItem.left + (containerIconView.width / 2),
		bottom : 0,
		zIndex : 80
	});

	enabledWrapperView.add(containerNotificationIconView);

	// Container Notification
	var containerNotification = Ti.UI.createLabel({
		text : '2',
		color : '#FFFFFF',
		font : {
			fontSize : getSmallFontSize()
		},
		textAlign : 'center'
	});

	// Add to the parent view.
	containerNotificationIconView.add(containerNotification);

	// Flower Icon View
	var flowerIconView = Ti.UI.createView({
		backgroundImage : 'images/flower_icon.png',
		width : getContainerIconWidth(),
		height : getContainerIconHeight(),
		left : containerIconView.left + craftImage.width,
		bottom : getMarginNormal1(),
		zIndex : 75
	});

	enabledWrapperView.add(flowerIconView);

	// Flower Notification Icon View
	var flowerNotificationIconView = Ti.UI.createView({
		backgroundImage : 'images/notification_black_square.png',
		width : getNotificationHeightWidth() + (2 / 3),
		height : getNotificationHeightWidth() + (2 / 3),
		left : flowerIconView.left + (containerIconView.width + 3 / 2),
		bottom : 0,
		zIndex : 80
	});

	enabledWrapperView.add(flowerNotificationIconView);

	// Flower Notification
	var flowerNotification = Ti.UI.createLabel({
		text : '2',
		color : '#FFFFFF',
		font : {
			fontSize : getSmallFontSize()
		},
		textAlign : 'center'
	});

	// Add to the parent view.
	flowerNotificationIconView.add(flowerNotification);

	//Craft Button
	var craftButton = Titanium.UI.createButton({
		color : "#FFFFFF",
		title : "CRAFT",
		backgroundColor : "#c1282d",
		height : getButtonHeight(),
		width : getButtonWidth(),
		right : 3 * getMarginNormal1(),
		borderRadius : 2
	});

	enabledWrapperView.add(craftButton);

	craftButton.addEventListener("click", function(e) {
		alert("Craft!");
	});

	row.add(enabledWrapperView);
	tableData.push(row);
}

table.setData(tableData);

//footerView
var footerView = Titanium.UI.createView({
	bottom : 0,
	height : getHeaderHeight(),
	width : "100%",
	backgroundColor : "#808080",
	zIndex : 0
});

win.add(table);
win.add(headerView);
win.add(footerView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'inventory.js'
	});
	window.open();
	removeAllContent();
});

win.open(); 