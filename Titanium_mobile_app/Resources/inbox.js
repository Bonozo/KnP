function removeAllContent() {
	headerView.remove(headerAvatarHeaderIcon);
	headerView.remove(nameOfCharacter);
	headerView.remove(backButton);
	headingRow.remove(storeLbl);
	headingRow.remove(lineBreak3View);
	win.remove(headingRow);
	win.remove(table);
	win.remove(headerView);
	win.remove(footerView);
	
	win = null;
	winWidth = null;
	winHeight = null;
	chkArray = null;
	headerView = null;
	headerAvatarHeaderIcon = null;
	nameOfCharacter = null;
	backButton = null;
	headingRow = null;
	storeLbl = null;
	lineBreak3View = null;
	lineBreak3View = null;
	tableData = null;
	table = null;
	footerView = null;
	window1 = null;
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

function getCoinIcon(goldRequired)//"images/listview_dateTimeView.png",
{
	if (goldRequired >= 110) {
		return "images/listview_coin_blur_icon.png";
	} else {
		return "images/listview_dateTimeView.png";
	}
}

function getLockedIconVisibility(goldRequired) {
	if (goldRequired >= 110) {
		return true;
	} else {
		return false;
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
	text : "asdas",//Ti.App.GLBL_name,
	left : getAvatarHeaderIconHeight() + getMarginNormal1(),
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getFontSizeNormal1()
	}
});
headerView.add(nameOfCharacter);

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
	text : 'INBOX',
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
var url = "http://justechinfo.com/kap_server/get_inbox_messages.php?uid="+Ti.App.GLBL_uid;// + Ti.App.GLBL_uid;
var rec;//,UID;
var xhr = Ti.Network.createHTTPClient({
	onload : function() {
		json = JSON.parse(this.responseText);
		
		if (json.Record != undefined) {
			//Record = json;
			//alert("Successfully signed in!");
			var response_result = "";
			for (var i = 0; i < json.Record.length; i++) {
				rec = json.Record[i];
				var row = Ti.UI.createTableViewRow({
					className : 'row',
					objName : 'row',
					touchEnabled : true,
					height : getRawDefaultHeight(),
					top : 0,
					UID : rec.FRIEND_UID,
					expanded : false
				});
				row.addEventListener('click', function(e) {
						var message_room = Titanium.UI.createWindow({
						    url:'message_room.js'
						    //url:'level2.js'
						});
						Ti.App.Properties.setString('friend_request_uid', e.row.UID);
						removeAllContent();
						message_room.open();
				});
			
				var enabledWrapperView = Ti.UI.createView({
					backgroundColor : '#3d3d3d',
					objName : 'enabledWrapperView',
					rowID : i,
					width : Ti.UI.FILL,
					top : 0,
					height : getRawDefaultHeight()
				});
			
				// friend_avatar_small_icon
				var friend_avatar_small_icon = Ti.UI.createView({
					top : getMarginNormal1(),
					left : getMarginNormal1(),
					width : getAvatarImageWidthHeight(),
					height : getAvatarImageWidthHeight(),
					backgroundImage : 'images/my_avatar.png',
					zIndex : 50
				});
				enabledWrapperView.add(friend_avatar_small_icon);
			
				// Create a friendNameLbl Label.
				var friendNameLbl = Ti.UI.createLabel({
					text : rec.NAME,
					color : '#FFFFFF',
					font : {
						fontSize : getNormalFontSize(),
						fontWeight : 'bold'
					},
					top : getMarginNormal1(),
					left : friend_avatar_small_icon.left + friend_avatar_small_icon.width + getMarginNormal1(),
					textAlign : 'center'
				});
				enabledWrapperView.add(friendNameLbl);
			
				// Create a Label.
				var shortMessageLbl = Ti.UI.createLabel({
					text : rec.MESSAGE_TEXT,
					color : '#787878',
					font : {
						fontSize : getNormalFontSize()
					},
					left : friend_avatar_small_icon.left + friend_avatar_small_icon.width + getMarginNormal1(),
					textAlign : 'center'
				});
				enabledWrapperView.add(shortMessageLbl);
			
				
				// Create a Label.
				var dateTimeLbl = Ti.UI.createLabel({
					text : rec.DATETIME,
					color : '#CCC',
					font : {fontSize : getSmallFontSize()},
					top : getMarginNormal1(),
					right : getMarginNormal1()
				});
				
				// Add to the parent view.
				enabledWrapperView.add(dateTimeLbl);
				
			
			
				row.add(enabledWrapperView);
				tableData.push(row);

			}
			table.setData(tableData);

		} else if (json.Error != undefined) {
			if (json.Error.AuthException != undefined) {
				alert(json.Error.AuthException);
			} else if (json.Error.Request) {
				alert(json.Error.Request);
			} else {
				alert("Unknown error occured!");
			}
		} else {
			alert("You have no friends yet!");
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

table.setData(tableData);

//footerView
var footerView = Titanium.UI.createView({
	bottom : 0,
	height : getHeaderHeight(),
	width : "100%",
	backgroundColor : "#808080",
	zIndex : 0
});




win.add(headingRow);
win.add(table);
win.add(headerView);
win.add(summaryView);
win.add(footerView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'friend_interactions.js'
	});
	window.open();
	removeAllContent();
});

win.open();
