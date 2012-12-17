function removeAllContent() {
	headerView.remove(headerAvatarHeaderIcon);
	headerView.remove(nameOfCharacter);
	levelView.remove(LVLlbl);
	headerView.remove(levelView);
	totalGoldView.remove(Goldlbl);
	headerView.remove(totalGoldView);
	headerView.remove(backButton);
	myQuestsHeader.remove(myQuestsLbl);
	myQuestsHeader.remove(completedLbl);
	freePlayView.remove(freePlayLbl);
	freePlayView.remove(lineBreakView3);
	freePlayView.remove(gameIconsView);
	gameIconsView.remove(horseRidingIconImage);
	gameIconsView.remove(archeryIconImage);
	gameIconsView.remove(paintingIconImage);
	gameIconsView.remove(cookingIconImage);
	gameIconsView.remove(playGamesMessageLbl);
	footerView.remove(lblSortBy);
	footerView.remove(myQuestsButton);
	footerView.remove(theirQuestsButton);
	footerView.remove(questsLogButton);
	questsLogMainWin.remove(bottomLogView);
	bottomLogView.remove(bottomHeaderLogView);
	bottomLogLogicalView.remove(challengeImage);
	bottomLogLogicalView.remove(avatarImage);
	bottomLogLogicalView.remove(questLogLbl);
	bottomLogLogicalView.remove(logStatisticsLbl);
	bottomLogLogicalView.remove(logStatisticsValuesLbl);
	bottomLogLogicalView.remove(friendsEarnedIconImage);
	bottomLogLogicalView.remove(friendsEarnedLbl);
	bottomLogLogicalView.remove(cancelBtn);
	win.remove(headerView);
	win.remove(myQuestsHeader);
	win.remove(lineBreakView1);
	win.remove(table);
	win.remove(lineBreakView2);
	win.remove(freePlayView);
	win.remove(footerView);
	win.remove(questsLogMainWin);
	win.remove(bottomLogLogicalView);

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
	myQuestsHeader = null;
	myQuestsLbl = null;
	completedLbl = null;
	lineBreakView1 = null;
	tableData = null;
	table = null;
	row = null;
	levelLbl = null;
	levelValueLbl = null;
	window1 = null;
	challengeMessage = null;
	lineBreakView2 = null;
	freePlayView = null;
	freePlayLbl = null;
	lineBreakView3 = null;
	gameIconsView = null;
	horseRidingIconImage = null;
	archeryIconImage = null;
	paintingIconImage = null;
	cookingIconImage = null;
	playGamesMessageLbl = null;
	footerView = null;
	lblSortBy = null;
	myQuestsButton = null;
	theirQuestsButton = null;
	questsLogButton = null;
	questsLogMainWin = null;
	bottomLogView = null;
	bottomBarView = null;
	bottomHeaderLogView = null;
	bottomLogLogicalView = null;
	challengeImage = null;
	avatarImage = null;
	questLogLbl = null;
	logStatisticsLbl = null;
	logStatisticsValuesLbl = null;
	friendsEarnedIconImage = null;
	friendsEarnedLbl = null;
	cancelBtn = null;
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
var chkArray = ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5', 'Value 6', 'Value 7', 'Value 8', 'Value 9', 'Value 10'];

function isChallengeComplete(is_ChallengeComplete) {
	if (is_ChallengeComplete == "false") {
		return 'images/unchecked.png';
	}
	return 'images/checked.png';
}

function getSwitchValue(i) {
	if ((i % 2) == 0) {
		return true;
	}
	return false;
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

function getAvatarSmallIconWidthHeight() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 30;
	} else if (winWidth < 480 && winHeight < 800) {
		return 15;
	}
}

function getRowHeight() {
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

function getContainerIconHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 32;
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
		return 20;
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

function getChallengeImageWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 78;
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
});











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
var myQuestsHeader = Ti.UI.createView({
	height : getHeaderHeight(),
	top : getHeaderHeight(),
	width : "100%",
	zIndex : 200
});

// My Quests in search section
var myQuestsLbl = Ti.UI.createLabel({
	text : 'MyQuests',
	color : '#E2E2E2',
	font : {
		fontSize : getNormalFontSize()
	},
	left : getMarginNormal1() * 2,
	textAlign : 'center'
});
myQuestsHeader.add(myQuestsLbl);

// Completed in search section
var completedLbl = Ti.UI.createLabel({
	text : 'Completed',
	color : '#E2E2E2',
	font : {
		fontSize : getNormalFontSize()
	},
	right : getMarginNormal1() * 2,
	textAlign : 'center'
});
myQuestsHeader.add(completedLbl);

// Line break
var lineBreakView1 = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 2,
	lef : getMarginNormal1() - (getMarginNormal1() / 2),
	top : getHeaderHeight() * 2,
	width : winWidth - getMarginNormal1() * 2
});

var tableData = [];
var table = Ti.UI.createTableView({
	objName : 'quests_home',
	height : winHeight - getHeaderHeight() - getHeaderHeight() - myQuestsHeader.height - getHeaderHeight() * 4,
	//window height - footer height - header height - (My quests and completed bar) height - free play games height
	top : myQuestsHeader.height + getHeaderHeight()
});

var url = "http://justechinfo.com/kap_server/get_assigned_quests_by_player.php?uid=" + Ti.App.GLBL_uid;
var xhr = Ti.Network.createHTTPClient({
	onload : function() {
		json = JSON.parse(this.responseText);
		if (json.Record != undefined) {
			var response_result = "";
			for (var i = 0; i < json.Record.length; i++) {
				rec = json.Record[i];
				//response_result = response_result + ", "+rec.UID;
				var row = Ti.UI.createTableViewRow({
					className : 'row',
					objName : 'row',
					touchEnabled : true,
					height : getRowHeight()
				});
			
				var enabledWrapperView = Ti.UI.createView({
					backgroundColor : '#3d3d3d',
					objName : 'enabledWrapperView',
					rowID : i,
					width : Ti.UI.FILL,
					height : '100%'
				});
			
				// Challenge Image
				var challengeImage = Ti.UI.createView({
					left : getMarginNormal1(),
					width : getChallengeImageWidth(),
					height : getChallengeImageWidth(),
					backgroundImage : 'images/quests_icon.png',
					zIndex : 50
				});
				enabledWrapperView.add(challengeImage);
			
				var avatarSmallImage = Ti.UI.createImageView({
					image : "images/avatar_small_icon.png",
					left : getChallengeImageWidth() + (getMarginNormal1() * 2),
					top : getMarginNormal1(),
					height : getAvatarSmallIconWidthHeight(),
					width : getAvatarSmallIconWidthHeight(),
					zIndex : 100
				});
				enabledWrapperView.add(avatarSmallImage);
			
				// Avatar Name
				var avatarNameLbl = Ti.UI.createLabel({
					text : rec.NAME,
					color : '#FFFFFF',
					font : {
						fontSize : getNormalFontSize()
					},
					top : getMarginNormal1(),
					left : avatarSmallImage.left + avatarSmallImage.width + getMarginNormal1(),
					textAlign : 'center'
				});
				enabledWrapperView.add(avatarNameLbl);
			
				// Create a Label.
				var numebrOfFriends = Ti.UI.createLabel({
					text : rec.NUM_OF_FRIENDS+' Friend(s)',
					color : '#D2D2D2',
					font : {
						fontSize : getSmallFontSize()
					},
					top : getMarginNormal1(),
					right : getMarginNormal1(),
					textAlign : 'right'
				});
				enabledWrapperView.add(numebrOfFriends);
			
				var friendsIconImage = Ti.UI.createImageView({
					image : "images/friends_icon.png",
					height : getFriendsIconHeight(),
					width : getFriendsIconWidth(),
					right : getHeaderHeight() + getMarginNormal1() * 4,
					top : getMarginNormal1()
				});
				enabledWrapperView.add(friendsIconImage);
			
				// Create a levelLbl.
				var levelLbl = Ti.UI.createLabel({
					text : 'LVL :',
					color : '#D2D2D2',
					font : {
						fontSize : getNormalFontSize()
					},
					top : getMarginNormal1(),
					right : friendsIconImage.right + friendsIconImage.width + getMarginNormal1() * 4,
					textAlign : 'left'
				});
				enabledWrapperView.add(levelLbl);
			
				// Create a levelLbl.
				var levelValueLbl = Ti.UI.createLabel({
					text : rec.LEVEL,
					color : '#FEFD05',
					font : {
						fontSize : getNormalFontSize()
					},
					top : getMarginNormal1(),
					right : friendsIconImage.right + friendsIconImage.width + getMarginNormal1() * 2,
					textAlign : 'left'
				});
				enabledWrapperView.add(levelValueLbl);
			
				//Checkbox
				var tickBox = Ti.UI.createButton({
					backgroundImage : isChallengeComplete(rec.IS_COMPLETED), //'images/unchecked.png',
					width : 28,
					height : 28,
					checkBok : "tick",
					assign_by_uid : rec.ASSIGN_BY_UID,
					customValue : "use your custom value",
					checked : rec.IS_COMPLETED,
					right : getMarginNormal1()
				});
			
				tickBox.addEventListener('click', function(e) {
					
					Ti.App.Properties.setString('assign_by_uid', e.source.assign_by_uid);
					
					if(e.source.checked == true){
						var window1 = Titanium.UI.createWindow({
							url : 'quests_completed_info.js'
						});
						window1.open();
						removeAllContent();
					}
					else{
						var window1 = Titanium.UI.createWindow({
							url : 'quests_incomplete.js'
						});
						window1.open();
						removeAllContent();
					}

					/*if ((i % 2 ) == 0) {
						//is unchecked / Incompleted
						var window1 = Titanium.UI.createWindow({
							url : 'quests_incomplete.js'
						});
						window1.open();
						removeAllContent();
			
					} else {
						//is checked / Completed
						var window1 = Titanium.UI.createWindow({
							url : 'quests_completed_info.js'
						});
						window1.open();
						removeAllContent();
					}
					*/
					
					/*
					 if (e.source.checkBok) {
					 if (e.source.checked) {
					 e.source.backgroundImage = 'images/unchecked.png';
					 e.source.checked = false;
					 } else {
					 e.source.backgroundImage = 'images/checked.png';
					 e.source.checked = true;
					 //alert(e.source.customValue);
					 }
					 }
					 */
				});
				enabledWrapperView.add(tickBox);
			
				//Time remaining
				var timeRemainingLbl = Ti.UI.createLabel({
					text : '1:00:01',
					color : '#FEFD05',
					font : {
						fontSize : getNormalFontSize()
					},
					right : getMarginNormal1(),
					bottom : getMarginNormal1() / 2,
					width : getHeaderHeight() + getMarginNormal1() * 2,
					textAlign : 'right'
				});
				enabledWrapperView.add(timeRemainingLbl);
			
				//Time remaining
				var timeRemainingMessageLbl = Ti.UI.createLabel({
					text : 'Hurry Up!',
					color : '#D2D2D2',
					font : {
						fontSize : getNormalFontSize()
					},
					right : timeRemainingLbl.width + getMarginNormal1() * 2,
					bottom : getMarginNormal1() / 2
				});
				enabledWrapperView.add(timeRemainingMessageLbl);
			
				//rewards
				/*
				var rewardsLbl = Ti.UI.createLabel({
					text : 'rewards',
					color : '#FEFD05',
					font : {
						fontSize : getNormalFontSize()
					},
					left : getChallengeImageWidth() + (getMarginNormal1() * 2),
					bottom : getMarginNormal1() / 2,
					width : getHeaderHeight() + getMarginNormal1() * 2,
					textAlign : 'left'
				});
				enabledWrapperView.add(rewardsLbl);
			
				// Container Icon View
				var containerIconView = Ti.UI.createView({
					backgroundImage : 'images/container_icon.png',
					width : getContainerIconWidth(),
					height : getContainerIconHeight(),
					left : getChallengeImageWidth() + rewardsLbl.width + (getMarginNormal1() * 2),
					bottom : getMarginNormal1(),
					zIndex : 75
				});
			
				enabledWrapperView.add(containerIconView);
			
				// Container Notification Icon View
				var containerNotificationIconView = Ti.UI.createView({
					backgroundImage : 'images/notification_black_square.png',
					width : getNotificationHeightWidth() + (2 / 3),
					height : getNotificationHeightWidth() + (2 / 3),
					left : getChallengeImageWidth() + rewardsLbl.width + (getMarginNormal1() * 2) + (containerIconView.width / 2),
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
			
				///////////////////////////////////////////////////////////////////
				// Flower Icon View
				var flowerIconView = Ti.UI.createView({
					backgroundImage : 'images/flower_icon.png',
					width : getContainerIconWidth(),
					height : getContainerIconHeight(),
					left : containerIconView.left + getChallengeImageWidth() - (getHeaderHeight() / 2),
					bottom : getMarginNormal1(),
					zIndex : 75
				});
			
				enabledWrapperView.add(flowerIconView);
			
				// Flower Notification Icon View
				var flowerNotificationIconView = Ti.UI.createView({
					backgroundImage : 'images/notification_black_square.png',
					width : getNotificationHeightWidth() + (2 / 3),
					height : getNotificationHeightWidth() + (2 / 3),
					left : flowerIconView.left + (getMarginNormal1() * 2), // + (flowerIconView.width / 2),
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
				///////////////////////////////////////////////////////////////////
			
				// Friends Icon View
				var friendsIconView = Ti.UI.createView({
					backgroundImage : 'images/friends_icon.png',
					width : getFriendsIconWidth(),
					height : getFriendsIconHeight(),
					left : flowerIconView.left + getChallengeImageWidth() - (getHeaderHeight() / 2),
					bottom : getMarginNormal1(),
					zIndex : 75
				});
			
				enabledWrapperView.add(friendsIconView);
			
				// Friends Notification Icon View
				var friendsNotificationIconView = Ti.UI.createView({
					backgroundImage : 'images/notification_black_square.png',
					width : getNotificationHeightWidth() + (2 / 3),
					height : getNotificationHeightWidth() + (2 / 3),
					left : friendsIconView.left + (getMarginNormal1() * 2), // + (flowerIconView.width / 2),
					bottom : 0,
					zIndex : 80
				});
			
				enabledWrapperView.add(friendsNotificationIconView);
			
				// Friends Notification
				var friendsNotification = Ti.UI.createLabel({
					text : '2',
					color : '#FFFFFF',
					font : {
						fontSize : getSmallFontSize()
					},
					textAlign : 'center'
				});
				friendsNotificationIconView.add(friendsNotification);
				
				*/
				
				var challengeMessage = Ti.UI.createLabel({
					text : rec.MESSAGE,//'You can do it!',
					color : '#6E6E6E',
					font : {
						fontSize : getNormalFontSize()
					},
					textAlign : 'center'
				});
				enabledWrapperView.add(challengeMessage);
			
				row.add(enabledWrapperView);
				tableData.push(row);
			}
			table.setData(tableData);
		} else if (json.Error != undefined) {
			if (json.Error.AuthException != undefined) {
				alert(json.Error.AuthException);
				var window = Titanium.UI.createWindow({
					url : 'friend_interactions.js'
				});
				window.open();
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

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Line break
var lineBreakView2 = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 2,
	lef : getMarginNormal1(),
	bottom : getHeaderHeight() * 4,
	width : winWidth - getMarginNormal1() * 2
});

// Create Free Play View.
var freePlayView = Ti.UI.createView({
	height : getHeaderHeight() * 3,
	bottom : getHeaderHeight()
});


// Free PlayLabel.
var freePlayLbl = Ti.UI.createLabel({
	text : 'Free Play',
	color : '#FFFFFF',
	font : {
		fontSize : getNormalFontSize()
	},
	height : getHeaderHeight() / 2,
	top : 0,
	left : getMarginNormal1(),
	textAlign : 'left'
});
freePlayView.add(freePlayLbl);
// Line break
var lineBreakView3 = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	height : 3,
	top : freePlayLbl.height,
	left : getMarginNormal1(),
	width : winWidth - getMarginNormal1() * 2
});
freePlayView.add(lineBreakView3);

//gameIconsView
var gameIconsView = Ti.UI.createView({
	top : lineBreakView3.top + 3,
	width : (getChallengeImageWidth() * 4) + (getMarginNormal1() * 5),
	zIndex : 200
});
freePlayView.add(gameIconsView);

//justechinfo.com/kap_server/assign_quests.php?assign_by_uid=10000001&assign_to_uid=10000001&quest_ids=,80000001,80000002&message=helloooooo
//Horse Riding Icon
var horseRidingIconImage = Ti.UI.createImageView({
	image : "images/quests_icon.png",
	left : getMarginNormal1(),
	top : getMarginNormal1(),
	height : getChallengeImageWidth(),
	width : getChallengeImageWidth()
});
gameIconsView.add(horseRidingIconImage);
horseRidingIconImage.addEventListener('click',function(){
	var url = "http://justechinfo.com/kap_server/assign_quests.php?assign_by_uid="+Ti.App.GLBL_uid+"&assign_to_uid="+Ti.App.GLBL_uid+"&quest_ids=80000003&message=Single Player Game";
	
	var Record;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				Ti.App.Properties.setString('assign_quest_id', rec.assign_quest_id);
				Ti.App.Properties.setString('quest_id', "80000003");
				Ti.App.Properties.setString('quest_name', "Joust");
				removeAllContent();
				Titanium.UI.createWindow({
					url : 'play_quests.js'
				}).open();
			} else {
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
	
});

//Archery Icon
var archeryIconImage = Ti.UI.createImageView({
	image : "images/archery_icon.png",
	left : horseRidingIconImage.left + horseRidingIconImage.width + getMarginNormal1(),
	top : getMarginNormal1(),
	height : getChallengeImageWidth(),
	width : getChallengeImageWidth()
});
				
gameIconsView.add(archeryIconImage);
archeryIconImage.addEventListener('click',function(){
	var url = "http://justechinfo.com/kap_server/assign_quests.php?assign_by_uid="+Ti.App.GLBL_uid+"&assign_to_uid="+Ti.App.GLBL_uid+"&quest_ids=80000001&message=Single Player Game";
	
	var Record;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				Ti.App.Properties.setString('assign_quest_id', rec.assign_quest_id);
				Ti.App.Properties.setString('quest_id', "80000001");
				Ti.App.Properties.setString('quest_name', "Archery");
				removeAllContent();
				Titanium.UI.createWindow({
					url : 'play_quests.js'
				}).open();
			} else {
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
	
});

//Painting Icon
var paintingIconImage = Ti.UI.createImageView({
	image : "images/Sonnet_icon.png",
	left : archeryIconImage.left + archeryIconImage.width + getMarginNormal1(),
	top : getMarginNormal1(),
	height : getChallengeImageWidth(),
	width : getChallengeImageWidth()
});
gameIconsView.add(paintingIconImage);
paintingIconImage.addEventListener('click',function(){
	var url = "http://justechinfo.com/kap_server/assign_quests.php?assign_by_uid="+Ti.App.GLBL_uid+"&assign_to_uid="+Ti.App.GLBL_uid+"&quest_ids=80000002&message=Single Player Game";
	
	var Record;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				Ti.App.Properties.setString('assign_quest_id', rec.assign_quest_id);
				Ti.App.Properties.setString('quest_id', "80000002");
				Ti.App.Properties.setString('quest_name', "Sonnet");
				removeAllContent();
				Titanium.UI.createWindow({
					url : 'play_quests.js'
				}).open();
			} else {
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
	
});

//Cooking Icon
var cookingIconImage = Ti.UI.createImageView({
	image : "images/cooking_icon.png",
	left : paintingIconImage.left + paintingIconImage.width + getMarginNormal1(),
	top : getMarginNormal1(),
	height : getChallengeImageWidth(),
	width : getChallengeImageWidth()
});
gameIconsView.add(cookingIconImage);

// Play Games Message Label.
var playGamesMessageLbl = Ti.UI.createLabel({
	text : 'play solo Quest Games for rewards and XP!',
	color : '#F7F808',
	font : {
		fontSize : getNormalFontSize()
	},
	bottom : getMarginNormal1(),
	textAlign : 'center'
});
gameIconsView.add(playGamesMessageLbl);

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

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

//My Quests Button
var myQuestsButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "My Quests",
	backgroundColor : "#3eaed6",
	borderColor : "#6992a8",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : getKnightButtonLeft(),
	borderRadius : 2
});
footerView.add(myQuestsButton);
myQuestsButton.addEventListener("click", function(e) {
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

//Their Quests Button
var theirQuestsButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Their Quests",
	backgroundColor : "#474747",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : myQuestsButton.left + myQuestsButton.width + getMarginNormal1(),
	borderRadius : 2
});
footerView.add(theirQuestsButton);
theirQuestsButton.addEventListener("click", function(e) {
	/*	var princesses_friend_home = Titanium.UI.createWindow({
	 url:'princesses_friend_home.js'
	 //url:'level2.js'
	 });
	 princesses_friend_home.open();

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

//Quests Log Button
var questsLogButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "QuestLog",
	backgroundColor : "#474747",
	font : {
		fontSize : getSmallFontSize()
	},
	height : getSmallButtonHeight(),
	width : getButtonWidth(),
	left : theirQuestsButton.left + theirQuestsButton.width + getMarginNormal1(),
	borderRadius : 2
});
footerView.add(questsLogButton);
questsLogButton.addEventListener("click", function(e) {
	questsLogMainWin.visible = true;
	bottomLogLogicalView.visible = true;
	/*	var friend_interactions = Titanium.UI.createWindow({
	 url:'friend_interactions.js'
	 });
	 friend_interactions.open();

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

var questsLogMainWin = Ti.UI.createView({
	visible : false,
	left : 0,
	top : 0,
	height : "100%",
	width : "100%",
	backgroundColor : "#000000",
	opacity : "0.7",
	zIndex : 500
});

var bottomLogView = Ti.UI.createView({
	backgroundColor : "#FFFFFF",
	opacity : "0.7",
	bottom : 0,
	height : getHeaderHeight() * 6
});
questsLogMainWin.add(bottomLogView);

var bottomHeaderLogView = Ti.UI.createView({
	backgroundColor : "#FF3737",
	height : getHeaderHeight(),
	top : 0,
	zIndex : 510,
	opacity : "0.7"
});
bottomLogView.add(bottomHeaderLogView);

var bottomLogLogicalView = Ti.UI.createView({
	visible : false,
	bottom : 0,
	height : getHeaderHeight() * 6,
	zIndex : 520
});

// Challenge Image
var challengeImage = Ti.UI.createView({
	left : getMarginNormal1(),
	top : getMarginNormal1(),
	width : getChallengeImageWidth(),
	height : getChallengeImageWidth(),
	backgroundImage : 'images/quests_icon.png',
	zIndex : 530
});
bottomLogLogicalView.add(challengeImage);

// Avatar Image
var avatarImage = Ti.UI.createView({
	left : getMarginNormal1(),
	top : challengeImage.top + challengeImage.height + getMarginNormal1(),
	width : getChallengeImageWidth(),
	height : getChallengeImageWidth(),
	backgroundImage : 'images/my_avatar.png',
	zIndex : 530
});
bottomLogLogicalView.add(avatarImage);

//Quest Log

// Create a Label.
var questLogLbl = Ti.UI.createLabel({
	text : 'Quest Log',
	color : '#FFFFFF',
	font : {
		fontSize : getHeadingFontSize(),
		fontWeight : 'bold'
	},
	textAlign : 'center',
	height : getHeaderHeight(),
	top : 0
});

bottomLogLogicalView.add(questLogLbl);

var logStatisticsLbl = Ti.UI.createLabel({
	top : questLogLbl.height + getMarginNormal1(),
	color : '#FFFFFF',
	left : avatarImage.width + (getMarginNormal1() * 2),
	font : {
		fontSize : getHeadingFontSize()
	},
	text : " Total Completed :\n Completed For Me:\n XP Earned:"
});
bottomLogLogicalView.add(logStatisticsLbl);

var logStatisticsValuesLbl = Ti.UI.createLabel({
	top : questLogLbl.height + getMarginNormal1(),
	color : '#FDFF06',
	right : getMarginNormal1(),
	font : {
		fontSize : getHeadingFontSize(),
		fontWeight : 'bold'
	},
	textAlign : 'right',
	text : "250\n70\n70\n45"
});
bottomLogLogicalView.add(logStatisticsValuesLbl);

var friendsEarnedIconImage = Ti.UI.createImageView({
	image : "images/friends_icon.png",
	top : logStatisticsLbl.top + (getHeaderHeight() * 2),
	left : avatarImage.width + (getMarginNormal1() * 2),
	height : getFriendsIconHeight(),
	width : getFriendsIconWidth()
	//text : "\n\n\n"
});
bottomLogLogicalView.add(friendsEarnedIconImage);

// Create a Label.
var friendsEarnedLbl = Ti.UI.createLabel({
	text : 'Earned:',
	color : '#FFFFFF',
	font : {
		fontSize : getHeadingFontSize()
	},
	top : friendsEarnedIconImage.top - (getMarginNormal1()),
	left : friendsEarnedIconImage.width + (getMarginNormal1() * 3) + avatarImage.width,
	textAlign : 'center'
});
bottomLogLogicalView.add(friendsEarnedLbl);

// Create a Button.
var cancelBtn = Ti.UI.createButton({
	title : 'Cancel',
	color : "#FFFFFF",
	backgroundColor : "#474747",
	height : getButtonHeight(),
	width : getButtonWidth(),
	borderRadius : 2,
	font : {
		fontFamily : "MagicalMedieval"
	},
	bottom : getHeaderHeight(),
	right : getMarginNormal1()
});
cancelBtn.addEventListener('click', function() {
	questsLogMainWin.visible = false;
	bottomLogLogicalView.visible = false;
});
bottomLogLogicalView.add(cancelBtn);

win.add(headerView);
win.add(myQuestsHeader);
win.add(lineBreakView1);
win.add(table);
win.add(lineBreakView2);
win.add(freePlayView);
win.add(footerView);
win.add(questsLogMainWin);
win.add(bottomLogLogicalView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'inventory.js'
	});
	window.open();
	removeAllContent();
});

win.open();
