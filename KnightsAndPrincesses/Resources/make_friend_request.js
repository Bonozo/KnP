function removeAllContent() {
	headerView.remove(headerAvatarHeaderIcon);
	headerView.remove(nameOfCharacter);
	levelView.remove(LVLlbl);
	headerView.remove(levelView);
	totalGoldView.remove(Goldlbl);
	headerView.remove(totalGoldView);
	headerView.remove(backButton);
	findFriends.remove(requestLbl);
	findFriends.remove(findByName);
	enabledWrapperView.remove(CraftItem);
	enabledWrapperView.remove(craftDescription);
	enabledWrapperView.remove(onlineStatusIcon);
	enabledWrapperView.remove(onlineStatusDescription);
	enabledWrapperView.remove(avatarImage);
	enabledWrapperView.remove(levelAndGoldView);
	levelAndGoldView.remove(levelView);
	levelView.remove(levelLbl);
	levelView.remove(levelValueLbl);
	levelAndGoldView.remove(goldView);
	goldView.remove(goldImageView);
	goldView.remove(goldLbl);
	enabledWrapperView.remove(numberOfFriendsIconImage);
	enabledWrapperView.remove(numberOfFriendsLbl);
	bottomButtonView1.remove(assignQuests);
	bottomButtonView1.remove(acceptRequestButton);
	bottomButtonView1.remove(declineRequestButton);
	win.remove(headerView);
	win.remove(findFriends);
	win.remove(enabledWrapperView);
	win.remove(Quest);
	win.remove(lineBreakView);
	win.remove(numberOfQuests);
	win.remove(timeLimit);
	win.remove(lineBreak2View);
	win.remove(table);
	win.remove(messageField);
	win.remove(bottomButtonView1);

	win = null;
	winWidth = null;
	winHeight = null;
	headerView = null;
	headerAvatarHeaderIcon = null;
	nameOfCharacter = null;
	levelView = null;
	LVLlbl = null;
	totalGoldView = null;
	Goldlbl = null;
	backButton = null;
	findFriends = null;
	requestLbl = null;
	findByName = null;
	lineBreak3View = null;
	enabledWrapperView = null;
	CraftItem = null;
	craftDescription = null;
	onlineStatusIcon = null;
	onlineStatusDescription = null;
	avatarImage = null;
	levelAndGoldView = null;
	levelView = null;
	levelLbl = null;
	levelValueLbl = null;
	goldView = null;
	goldImageView = null;
	goldLbl = null;
	numberOfFriendsIconImage = null;
	numberOfFriendsLbl = null;
	Quest = null;
	lineBreakView = null;
	numberOfQuests = null;
	timeLimit = null;
	lineBreak2View = null;
	tableData = null;
	table = null;
	row = null;
	enabledWrapperView1 = null;
	craftImage = null;
	numberOfCrafts = null;
	tapToChooseLbl = null;
	questionSelection = null;
	winningMode = null;
	roundMode = null;
	messageField = null;
	bottomButtonView1 = null;
	assignQuests = null;
	acceptRequestButton = null;
	declineRequestButton = null;
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

function getCraftImageWidth() {
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
	var inventory_win = Titanium.UI.createWindow({
		url : 'request_friends.js'
		//url:'level2.js'
	});
	inventory_win.open();
	removeAllContent();
});
var findFriends = Ti.UI.createView({
	height : getHeaderHeight(),
	top : getHeaderHeight(),
	width : "100%",
	zIndex : 200
});

// Request label in search section
var requestLbl = Ti.UI.createLabel({
	text : win.UID,
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

// Line break
var lineBreak3View = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 2,
	top : headerView.height + findFriends.height - 1,
});

var enabledWrapperView = Ti.UI.createView({
	backgroundColor : '#3d3d3d',
	top : headerView.height + findFriends.height,
	height : 130
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
	top : craftDescription.top + craftDescription.height + 5 * getMarginNormal1(),
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
	top : craftDescription.top + craftDescription.height + 5 * getMarginNormal1(),
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
	top : levelAndGoldView.height + 2 * getMarginNormal1() + getMarginNormal1() / 2,
	right : avatarImage.width + getMarginNormal1()
});
// Add to the parent view.
enabledWrapperView.add(numberOfFriendsIconImage);

// numberOfFriendsLbl
var numberOfFriendsLbl = Ti.UI.createLabel({
	text : '32 friends',
	color : '#FFFFFF',
	font : {
		fontSize : getSmallFontSize()
	},
	top : levelAndGoldView.height + 3 * getMarginNormal1(),
	right : getMarginNormal1() * 4,
	textAlign : 'center'
});

// Add to the parent view.
enabledWrapperView.add(numberOfFriendsLbl);

// Online Status Desctiption.
var Quest = Ti.UI.createLabel({
	text : 'Quest: Make them work for it!',
	color : '#e2e2e2',
	font : {
		fontSize : getHeadingFontSize()
	},
	top : headerView.height + findFriends.height + enabledWrapperView.height,
	left : onlineStatusIcon.width + getMarginNormal1() * 2,
	textAlign : 'center'
});

// Line break
var lineBreakView = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 5,
	top : Quest.top + 5 * getMarginNormal1()
});

//# of quests
var numberOfQuests = Ti.UI.createLabel({
	text : "# of Quests   3",
	color : '#e2e2e2',
	font : {
		fontSize : getNormalFontSize()
	},
	left : getMarginNormal1(),
	top : lineBreakView.top + lineBreakView.height + getMarginNormal1()
});

//time Limit
var timeLimit = Ti.UI.createLabel({
	text : "Time limit    3 hrs",
	color : '#e2e2e2',
	font : {
		fontSize : getNormalFontSize()
	},
	right : getMarginNormal1(),
	top : lineBreakView.top + lineBreakView.height + getMarginNormal1()
});

// Line break
var lineBreak2View = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 5,
	top : Quest.top + 10 * getMarginNormal1()
});

/***************************************TABLE VIEW STARTED*****************************************/

var tableData = [];
var table = Ti.UI.createTableView({
	objName : 'inventort_craft',
	height : winHeight - lineBreak2View.top - 4 * getHeaderHeight(), // 100%-header_height-footer height
	top : lineBreak2View.top + getMarginNormal1()
});
var selected_item = [];
var url = "http://justechinfo.com/kap_server/get_all_quests.php";
var Record;
var xhr = Ti.Network.createHTTPClient({
	onload : function() {

		json = JSON.parse(this.responseText);
		if (json.Record != undefined) {
			//alert("Successfully signed in!");
			var response_result = "";
			for (var i = 0; i < json.Record.length; i++) {
				rec = json.Record[i];

				var row = Ti.UI.createTableViewRow({
					backgroundColor : '#3d3d3d',
					quest_id : rec.QUEST_ID,
					className : 'row',
					objName : 'row',
					index : i,
					selected : false,
					touchEnabled : true,
					height : 90
				});
				row.addEventListener('click', function(e) {
					if(e.row.selected == true){
						e.row.selected = false;
						e.row.backgroundColor = "#3d3d3d";
						delete selected_item[e.row.index];
					}
					else if(e.row.selected == false){
						e.row.selected = true;
						e.row.backgroundColor = "#6F6F6F";
						selected_item[e.row.index] = e.row.quest_id;
					}
				});
				
				var enabledWrapperView1 = Ti.UI.createView({
					objName : 'enabledWrapperView1',
					rowID : i,
					width : Ti.UI.FILL,
					height : '100%'
				});

				// Craft Image
				var craftImage = Ti.UI.createView({
					left : getMarginNormal1() * 5,
					width : getCraftImageWidth(),
					height : getCraftImageWidth(),
					backgroundImage : 'images/'+rec.QUEST_NAME+'_icon.png',
					zIndex : 50
				});
				enabledWrapperView1.add(craftImage);

				// Number Of crafts.
				var numberOfCrafts = Ti.UI.createLabel({
					text : "Q" + (i + 1),
					color : '#FFFFFF',
					font : {
						fontSize : getHeadingFontSize()
					},
					top : getMarginNormal1(),
					left : getMarginNormal1(),
					zIndex : 100
				});

				// Add to the parent view.
				enabledWrapperView1.add(numberOfCrafts);

				// Create a CraftItem.
				var tapToChooseLbl = Ti.UI.createLabel({
					text : '(tap to choose)',
					color : '#FFFFFF',
					font : {
						fontSize : getHeadingFontSize()
					},
					height : getHeadingFontSize() + getMarginNormal1(),
				});
				enabledWrapperView1.add(tapToChooseLbl);
				// questionSelection
				var questionSelection = Ti.UI.createLabel({
					text : rec.QUEST_NAME,
					color : '#FFFFFF',
					font : {
						fontSize : getHeadingFontSize()
					},
					top : getMarginNormal1(),
					right : getMarginNormal1()
				});
				// Add to the parent view.
				enabledWrapperView1.add(questionSelection);

				// winningMode
				var winningMode = Ti.UI.createLabel({
					text : 'win1',
					color : '#5a5a5a',
					font : {
						fontSize : getNormalFontSize()
					},
					top : 5 * getMarginNormal1(),
					right : getMarginNormal1()
				});
				// Add to the parent view.
				enabledWrapperView1.add(winningMode);

				// roundMode
				var roundMode = Ti.UI.createLabel({
					text : 'round',
					color : '#5a5a5a',
					font : {
						fontSize : getNormalFontSize()
					},
					top : 8 * getMarginNormal1(),
					right : getMarginNormal1()
				});
				// Add to the parent view.
				enabledWrapperView1.add(roundMode);

				row.add(enabledWrapperView1);
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
			alert("Something went wrong!");
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
/*TABLE VIEW ENED*/

var messageField = Titanium.UI.createTextField({
	width : "70%",
	borderRadius : 0,
	hintText : "type a message",
	top : table.top + table.height + getMarginNormal1(),
	height : getHeaderHeight(),
	backgroundColor : "#626262",
	borderColor : "#BBBBBB",
	borderWidth : 2,
	font : {
		fontSize : getNormalFontSize()
	},
	color : "#BBBBBB",
	keyboardType : Titanium.UI.KEYBOARD_ASCII
});

var bottomButtonView1 = Ti.UI.createView({
	width : "70%",
	height : getHeaderHeight(),
	bottom : getMarginNormal1()
});

//Assign Button
var assignQuests = Titanium.UI.createButton({
	color : "#FFFFFF",
	backgroundColor : "#474747",
	title : "Assign Quests",
	left : 0,
	height : getButtonHeight(),
	font : {
		fontSize : getSmallFontSize()
	},
	width : getButtonWidth(),
	borderRadius : 2
});
assignQuests.addEventListener('click',function(e){
	var quest_ids = "";
	for (var i=0; i<selected_item.length; i++) {
		if(selected_item[i] != "" && selected_item[i] != undefined){
			quest_ids = quest_ids +","+selected_item[i];
		}
	}
	var url = "http://justechinfo.com/kap_server/assign_quests.php?assign_by_uid="+Ti.App.GLBL_uid+"&assign_to_uid="+Ti.App.Properties.getString('friend_request_uid')+"&quest_ids="+quest_ids+"&message="+messageField.value;
	
	var Record;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				Record = json.Record[0];
				alert(Record.Message);
				var window = Titanium.UI.createWindow({
					url : 'friend_interactions.js'
				});
				window.open();

			} else if (json.Error != undefined) {
				if (json.Error.AuthException != undefined) {
					alert(json.Error.AuthException);
				} else if (json.Error.Request) {
					alert(json.Error.Request);
				} else {
					alert("Unknown error occured!");
				}
			} else {
				alert("Something went wrong!");
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
	 
});
bottomButtonView1.add(assignQuests);

//Assign Quests
var acceptRequestButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	backgroundColor : "#474747",
	title : "Accept",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getButtonHeight(),
	width : getButtonWidth(),
	borderRadius : 2
});
acceptRequestButton.addEventListener("click", function(e) {
	var url = "http://justechinfo.com/kap_server/friendship_notifications_action.php?uid=" + Ti.App.Properties.getString('friend_request_uid') + "&friend_uid=" + Ti.App.GLBL_uid + "&action=FRIENDS";
	var Record;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				Record = json.Record[0];
				alert(Record);
			} else if (json.Error != undefined) {
				if (json.Error.AuthException != undefined) {
					alert(json.Error.AuthException);
				} else if (json.Error.Request) {
					alert(json.Error.Request);
				} else {
					alert("Unknown error occured!");
				}
			} else {
				alert("Something went wrong!");
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
});

bottomButtonView1.add(acceptRequestButton);

//Accept Button
var declineRequestButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	backgroundColor : "#474747",
	title : "Decline",
	right : 0,
	font : {
		fontSize : getSmallFontSize()
	},
	height : getButtonHeight(),
	width : getButtonWidth(),
	borderRadius : 2
});
declineRequestButton.addEventListener("click", function(e) {
	var url = "http://justechinfo.com/kap_server/friendship_notifications_action.php?uid=" + Ti.App.Properties.getString('friend_request_uid') + "&friend_uid=" + Ti.App.GLBL_uid + "&action=DENIED";
	var Record;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				Record = json.Record[0];
				alert(Record);
				var request_friends = Titanium.UI.createWindow({
					url : 'request_friends.js'
					//url:'level2.js'
				});

				request_friends.open();
				removeAllContent();
			} else if (json.Error != undefined) {
				if (json.Error.AuthException != undefined) {
					alert(json.Error.AuthException);
				} else if (json.Error.Request) {
					alert(json.Error.Request);
				} else {
					alert("Unknown error occured!");
				}
			} else {
				alert("Something went wrong!");
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
});

bottomButtonView1.add(declineRequestButton);

win.add(headerView);
win.add(findFriends);
win.add(enabledWrapperView);
win.add(Quest);
win.add(lineBreakView);
win.add(numberOfQuests);
win.add(timeLimit);
win.add(lineBreak2View);
win.add(table);
win.add(messageField);
win.add(bottomButtonView1);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'request_friends.js'
	});
	window.open();
	removeAllContent();
});

win.open();
