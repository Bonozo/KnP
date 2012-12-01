function removeAllContent () {
	levelView.remove(LVLlbl); 
	headerView.remove(levelView); 
	totalGoldView.remove(Goldlbl); 
	headerView.remove(totalGoldView); 
	headerView.remove(backButton); 
	findFriends.remove(requestLbl);
	levelAndGoldView.remove(levelView);
	levelView.remove(levelValueLbl); 
	levelAndGoldView.remove(goldView);
	goldView.remove(goldImageView);
	goldView.remove(goldLbl);
	currentRewardsView.remove(currentRewardsLbl);
	currentRewardsView.remove(lineBreakView);
	 currentRewardsView.remove(currentRewardsLbl);	
	currentRewardsView.remove(collectionsContainerView);
	collectionsContainerView.remove(daggerIconView);
	collectionsContainerView.remove(daggerNotificationIconView);
	daggerNotificationIconView.remove(daggerNotificationLbl);
	collectionsContainerView.remove(containerIconView);
	collectionsContainerView.remove(containerNotificationIconView);
	containerNotificationIconView.remove(containerNotificationLbl);
	collectionsContainerView.remove(flowerIconView);
	collectionsContainerView.remove(flowerNotificationIconView);
	flowerNotificationIconView.remove(flowerNotificationLbl);
	collectionsContainerView.remove(coinIconView);
	collectionsContainerView.remove(coinNotificationIconView);
	coinNotificationIconView.remove(coinNotificationLbl);
	
	win.remove(headerView);
	win.remove(findFriends);
	win.remove(lineBreak3View);
	win.remove(enabledWrapperView);
	win.remove(lineBreakView0);
	win.remove(Quest);
	win.remove(numberOfQuests);
	win.remove(timeRemainingLbl);
	win.remove(timeLimit);
	win.remove(lineBreak2View);
	win.remove(table);
	win.remove(currentRewardsView);

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
	findFriends = null;
	requestLbl = null;
	lineBreak3View = null;
	levelView = null;
	levelLbl = null;
	levelValueLbl = null;
	goldView = null;
	goldImageView = null;
	goldLbl = null;
	numberOfFriendsIconImage = null;
	
	numberOfFriendsLbl = null;
	Quest = null;
	lineBreakView0 = null;
	numberOfQuests = null;
	timeRemainingLbl = null;
	timeLimit = null;
	flowerNotification = null;
	tableData = null;
	table = null;
} 
var win = Titanium.UI.createWindow({
	title : "Incomplete Quests",
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

function getDaggerIconWidthHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 24;
	} else if (winWidth < 480 && winHeight < 800) {
		return 8;
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
		url : 'quests_home.js'
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
	text : 'My Quests',
	color : '#828282',
	font : {
		fontSize : getNormalFontSize()
	},
	left : getMarginNormal1() * 3,
	textAlign : 'center'
});

// Add to the parent view.
findFriends.add(requestLbl);

// Line break
var lineBreak3View = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 3,
	zIndex : 200,
	top : (headerView.height) * 2// + findFriends.height - 3,
});

var enabledWrapperView = Ti.UI.createView({
	backgroundColor : '#3d3d3d',
	top : headerView.height + findFriends.height,
	height : 130
});
//enabledWrapperView.addEventListener("click",checkAlert);

// Create a myPicImage.
var myPicImage = Ti.UI.createImageView({
	image : "images/my_avatar_pink.png",
	height : getAvatarImageWidthHeight() + getMarginNormal1(),
	width : getAvatarImageWidthHeight() + getMarginNormal1(),
	top : getMarginNormal1(),
	left : getMarginNormal1()
});
// Add to the parent view.
enabledWrapperView.add(myPicImage);

// Create a Label.
var playerNameLbl = Ti.UI.createLabel({
	text : 'Player 1',
	color : '#FFFFFF',
	font : {
		fontSize : getHeadingFontSize()
	},
	top : getMarginNormal1(),
	left : myPicImage.left + myPicImage.width + getMarginNormal1(),
	textAlign : 'left'
});

// Add to the parent view.
enabledWrapperView.add(playerNameLbl);

// Avatar Image
var avatarImage = Ti.UI.createView({
	top : getMarginNormal1(),
	right : getMarginNormal1(),
	width : getAvatarImageWidthHeight(),
	height : getAvatarImageWidthHeight(),
	backgroundImage : 'images/my_avatar.png',
	zIndex : 50
});
enabledWrapperView.add(avatarImage);

// Level And Gold View
var levelAndGoldView = Ti.UI.createView({
	top : getMarginNormal1() + (getMarginNormal1() * 4),
	left : myPicImage.width + (getMarginNormal1() * 2),
	width : getAvatarImageWidthHeight(),
	height : getAvatarImageWidthHeight(),
	zIndex : 150
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
	top : myPicImage.height + 2 * getMarginNormal1() + getMarginNormal1() / 2,
	left : getMarginNormal1()
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
	top : myPicImage.height + 3 * getMarginNormal1(),
	left : getMarginNormal1() * 4,
	textAlign : 'center'
});

// Add to the parent view.
enabledWrapperView.add(numberOfFriendsLbl);

// Online Status Desctiption.
var Quest = Ti.UI.createLabel({
	text : 'Finish these to become my friend!',
	color : '#9B9B9B',
	font : {
		fontSize : getHeadingFontSize()
	},
	top : headerView.height + findFriends.height + enabledWrapperView.height,
	textAlign : 'center'
});

// Line break
var lineBreakView0 = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 5,
	top : Quest.top + (5 * getMarginNormal1())
});

//# of quests
var numberOfQuests = Ti.UI.createLabel({
	text : "QUESTS",
	color : '#E2E2E2',
	font : {
		fontSize : getNormalFontSize()
	},
	left : getMarginNormal1(),
	top : lineBreakView0.top + lineBreakView0.height + getMarginNormal1()
});

//Time remaining
var timeRemainingLbl = Ti.UI.createLabel({
	text : "1:00:01",
	color : '#F7DD05',
	font : {
		fontSize : getNormalFontSize()
	},
	top : lineBreakView0.top + lineBreakView0.height + getMarginNormal1()
});

//time Limit
var timeLimit = Ti.UI.createLabel({
	text : "3 of 5 completed?",
	color : '#E2E2E2',
	font : {
		fontSize : getNormalFontSize()
	},
	right : getMarginNormal1(),
	top : lineBreakView0.top + lineBreakView0.height + getMarginNormal1()
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
//Ti.App.Properties.setString('assign_by_uid', e.source.assign_by_uid);
var url = "http://justechinfo.com/kap_server/get_all_assigned_quests.php?assign_by="+Ti.App.Properties.getString('assign_by_uid')+"&assign_to="+Ti.App.GLBL_uid;

var xhr = Ti.Network.createHTTPClient({
	onload : function() {
		json = JSON.parse(this.responseText);
		if (json.Record != undefined) {
			var response_result = "";
			for (var i = 0; i < json.Record.length; i++) {
				rec = json.Record[i];
				var row = Ti.UI.createTableViewRow({
					className : 'row',
					objName : 'row',
					touchEnabled : true,
					height : 90
				});
			
				var enabledWrapperView1 = Ti.UI.createView({
					backgroundColor : '#3d3d3d',
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
				var winGameLbl = Ti.UI.createLabel({
					text : rec.MESSAGE,
					color : '#FFFFFF',
					font : {
						fontSize : getHeadingFontSize()
					},
					height : getHeadingFontSize() + getMarginNormal1()
				});
				enabledWrapperView1.add(winGameLbl);
			
				// Create a CraftItem.
				var tapToChooseLbl = Ti.UI.createLabel({
					text : '(tap to choose)',
					color : '#686868',
					font : {
						fontSize : getHeadingFontSize()
					},
					height : getHeadingFontSize() + getMarginNormal1(),
					bottom : getMarginNormal1()
				});
				enabledWrapperView1.add(tapToChooseLbl);
			
				// completedStatusLbl
				var completedStatusLbl = Ti.UI.createLabel({
					text : rec.STATUS,
					color : '#E2E2E2',
					font : {
						fontSize : getNormalFontSize()
					},
					top : 8 * getMarginNormal1(),
					right : getMarginNormal1()
				});
				// Add to the parent view.
				enabledWrapperView1.add(completedStatusLbl);
				
				function getChecked(status){
					if(status == "COMPLETE"){
						return 'images/checked.png';
					}
					else{
						return 'images/unchecked.png';
					}
					
				}
				//Checkbox
				var tickBox = Ti.UI.createButton({
					backgroundImage : getChecked(rec.STATUS),
					width : 28,
					height : 28,
					checkBok : "tick",
					customValue : "use your custom value",
					checked : false,
					status : rec.STATUS,
					assign_quest_id : rec.ASSIGN_QUEST_ID,
					quest_id : rec.QUEST_ID,
					right : getMarginNormal1(),
					zIndex : 4000
				});
			
				tickBox.addEventListener('click', function(e) {
					if(e.source.status == 'INCOMPLETE'){
						
						Ti.App.Properties.setString('assign_quest_id', e.source.assign_quest_id);
						Ti.App.Properties.setString('quest_id', e.source.quest_id);
						Ti.App.Properties.setString('quest_name', rec.QUEST_NAME);
						
						var window1 = Titanium.UI.createWindow({
							url : 'play_quests.js'
						});
						window1.open();
						removeAllContent();
					}
					else if(e.source.status == 'COMPLETE'){
						var window1 = Titanium.UI.createWindow({
							url : 'quests_completed_info.js'
						});
						window1.open();
					}
					else if(e.source.status == 'EXPIRED'){
						alert('This quest has been expired!');
					}
					
						
				});
				enabledWrapperView1.add(tickBox);
			
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




/*TABLE VIEW ENED*/

var currentRewardsView = Ti.UI.createView({
	bottom : 0,
	height : (getHeaderHeight() * 2)
});

// Current Rewards
var currentRewardsLbl = Ti.UI.createLabel({
	text : 'Current Rewards',
	color : '#8E8E8E',
	font : {
		fontSize : getNormalFontSize()
	},
	top : 0,
	left : getMarginNormal1(),
	height : getHeaderHeight() / 2,
	textAlign : 'left'
});
currentRewardsView.add(currentRewardsLbl);

// Line break
var lineBreakView = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 2,
	top : (getHeaderHeight() / 2)
});
currentRewardsView.add(lineBreakView);

// Current Rewards
var currentRewardsLbl = Ti.UI.createLabel({
	text : 'these are only collected if you complete the full quest',
	color : '#8E8E8E',
	font : {
		fontSize : getNormalFontSize()
	},
	top : currentRewardsLbl.height + lineBreakView.height,
	left : getMarginNormal1(),
	height : getHeaderHeight() / 2,
	textAlign : 'left'
});
currentRewardsView.add(currentRewardsLbl);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var collectionsContainerView = Ti.UI.createView({
	bottom : 0,
	width : (getMarginNormal1()*4) +  getDaggerIconWidthHeight() + (getHeaderHeight()*3) + (getContainerIconWidth()*3),
	height : getHeaderHeight()
});
currentRewardsView.add(collectionsContainerView);

var daggerIconView = Ti.UI.createView({
	backgroundImage : 'images/dagger_icon.png',
	height : getDaggerIconWidthHeight(),
	width : getDaggerIconWidthHeight(),
	left : getMarginNormal1(),
	bottom : getMarginNormal1()
});
collectionsContainerView.add(daggerIconView);

var daggerNotificationIconView = Ti.UI.createView({
	backgroundImage : 'images/notification_black_square.png',
	width : getNotificationHeightWidth() + (2 / 3),
	height : getNotificationHeightWidth() + (2 / 3),
	left : daggerIconView.left + daggerIconView.width / 2,
	bottom : 0,
	zIndex : 80
});
collectionsContainerView.add(daggerNotificationIconView);

// Dagger Notification
var daggerNotificationLbl = Ti.UI.createLabel({
	text : '2',
	color : '#FFFFFF',
	font : {
		fontSize : getSmallFontSize()
	},
	textAlign : 'center'
});
daggerNotificationIconView.add(daggerNotificationLbl);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var containerIconView = Ti.UI.createView({
	backgroundImage : 'images/container_icon.png',
	height : getContainerIconHeight(),
	width : getContainerIconWidth(),
	left : daggerIconView.left + daggerIconView.width + getHeaderHeight(),
	bottom : getMarginNormal1(),
});
collectionsContainerView.add(containerIconView);

var containerNotificationIconView = Ti.UI.createView({
	backgroundImage : 'images/notification_black_square.png',
	width : getNotificationHeightWidth() + (2 / 3),
	height : getNotificationHeightWidth() + (2 / 3),
	left : containerIconView.left + containerIconView.width / 2,
	bottom : 0,
	zIndex : 80
});
collectionsContainerView.add(containerNotificationIconView);

// container Notification
var containerNotificationLbl = Ti.UI.createLabel({
	text : '1',
	color : '#FFFFFF',
	font : {
		fontSize : getSmallFontSize()
	},
	textAlign : 'center'
});
containerNotificationIconView.add(containerNotificationLbl);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var flowerIconView = Ti.UI.createView({
	backgroundImage : 'images/flower_icon.png',
	height : getContainerIconHeight(),
	width : getContainerIconWidth(),
	left : containerIconView.left + containerIconView.width + getHeaderHeight(),
	bottom : getMarginNormal1(),
});
collectionsContainerView.add(flowerIconView);

var flowerNotificationIconView = Ti.UI.createView({
	backgroundImage : 'images/notification_black_square.png',
	width : getNotificationHeightWidth() + (2 / 3),
	height : getNotificationHeightWidth() + (2 / 3),
	left : flowerIconView.left + flowerIconView.width / 2,
	bottom : 0,
	zIndex : 80
});
collectionsContainerView.add(flowerNotificationIconView);

// flower Notification
var flowerNotificationLbl = Ti.UI.createLabel({
	text : '1',
	color : '#FFFFFF',
	font : {
		fontSize : getSmallFontSize()
	},
	textAlign : 'center'
});
flowerNotificationIconView.add(flowerNotificationLbl);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var coinIconView = Ti.UI.createView({
	backgroundImage : 'images/coin_icon.png',
	height : getDaggerIconWidthHeight(),
	width : getDaggerIconWidthHeight(),
	left : flowerIconView.left + flowerIconView.width + getHeaderHeight(),
	bottom : getMarginNormal1(),
});
collectionsContainerView.add(coinIconView);

var coinNotificationIconView = Ti.UI.createView({
	backgroundImage : 'images/notification_black_square.png',
	width : getNotificationHeightWidth() + (2 / 3),
	height : getNotificationHeightWidth() + (2 / 3),
	left : coinIconView.left + coinIconView.width / 2,
	bottom : 0,
	zIndex : 80
});
collectionsContainerView.add(coinNotificationIconView);

// coin Notification
var coinNotificationLbl = Ti.UI.createLabel({
	text : '1',
	color : '#F7F705',
	font : {
		fontSize : getSmallFontSize()
	},
	textAlign : 'center'
});
coinNotificationIconView.add(coinNotificationLbl);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

win.add(headerView);
win.add(findFriends);
win.add(lineBreak3View);
win.add(enabledWrapperView);
win.add(lineBreakView0);
win.add(Quest);
win.add(numberOfQuests);
win.add(timeRemainingLbl);
win.add(timeLimit);
win.add(lineBreak2View);
win.add(table);
win.add(currentRewardsView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'quests_home.js'
	});
	window.open();
	removeAllContent();
});

win.open();
