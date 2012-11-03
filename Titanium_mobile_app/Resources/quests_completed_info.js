var win = Titanium.UI.createWindow({
	title : "Incomplete Quests",
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



function getChallengeImageWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 78;
	} else if (winWidth < 480 && winHeight < 800) {
		return 34;
	}
}

function getDaggerIconWidthHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 24;
	} else if (winWidth < 480 && winHeight < 800) {
		return 8;
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

function getCraftImageWidth() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 68;
	} else if (winWidth < 480 && winHeight < 800) {
		return 34;
	}
}

function getFriendsIconNormalHeight() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 26;
	} else if (winWidth < 480 && winHeight < 800) {
		return 8;
	}
}

function getFriendsIconNormalWidth() {
	//480×800
	if (winWidth >= 480 && winHeight >= 800) {
		return 36;
	} else if (winWidth < 480 && winHeight < 800) {
		return 11;
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
		return 28;
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
		url : 'quests_home.js'
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

// Create a congratsMessageLbl.
var congratsMessageLbl = Ti.UI.createLabel({
	text : "Congratulations!\nYou are now friends!",
	color : "#F7F705",
	font : {
			fontSize : getNormalFontSize(),
			},
	top : getMarginNormal1(),
	right : getMarginNormal1(),
	textAlign : "center"
	 
});
// Add to the parent view.
enabledWrapperView.add(congratsMessageLbl);

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


// Online Status Icon
var onlineStatusIcon = Ti.UI.createView({
	backgroundImage : 'images/online_icon.png',
	width : getOnlineIconWidthHeight(),
	height : getOnlineIconWidthHeight(),
	left : levelAndGoldView.left + levelAndGoldView.width + getMarginNormal1(),
	top : myPicImage.top + myPicImage.height + (getHeaderHeight() * 2),// myPicImage.height + 2 * getMarginNormal1() + getMarginNormal1() / 2,
	zIndex : 50
});

// Online Status Desctiption.
var onlineStatusDescription = Ti.UI.createLabel({
	text : 'Online',
	color : '#FFFFFF',
	font : {
		fontSize : getSmallFontSize()
	},
	top : myPicImage.top + myPicImage.height + (getHeaderHeight() * 2),// myPicImage.height + 2 * getMarginNormal1() + getMarginNormal1() / 2,
	left : onlineStatusIcon.left +  onlineStatusIcon.width + getMarginNormal1(),
	textAlign : 'left'
});

// Chat Icon
var chatIcon = Ti.UI.createView({
	backgroundImage : 'images/chat_icon.png',
	width : getChatIconWidthHeight(),
	height : getChatIconWidthHeight(),
	left : onlineStatusDescription.left + getHeaderHeight() * 3 + getMarginNormal1(),
	top : myPicImage.top + myPicImage.height + (getHeaderHeight() * 2),// myPicImage.height + 2 * getMarginNormal1() + getMarginNormal1() / 2,
	zIndex : 50
});

// Message Icon
var messageIcon = Ti.UI.createView({
	backgroundImage : 'images/message_small_icon.png',
	width : getChatIconWidthHeight(),
	height : getChatIconWidthHeight(),
	left : chatIcon.left + chatIcon.width + getMarginNormal1(),
	top : myPicImage.top + myPicImage.height + (getHeaderHeight() * 2),// myPicImage.height + 2 * getMarginNormal1() + getMarginNormal1() / 2,
	zIndex : 50
});



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
	left : getMarginNormal1() * 5,
	textAlign : 'center'
});

// Add to the parent view.
enabledWrapperView.add(numberOfFriendsLbl);

// Online Status Desctiption.
var Quest = Ti.UI.createLabel({
	text : 'Quests Completed!',
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

var challengesCompletedView = Ti.UI.createView({
	top : Quest.top + getHeaderHeight(),
	left : getMarginNormal1(),
	width : winWidth - (getMarginNormal1()*2),
	height : (getHeaderHeight() * 2)
});

// Create a Label.
var completeChallengesLbl = Ti.UI.createLabel({
	text : '4 of 4\nCompleted',
	color : '#FFFFFF',
	font : {fontSize:getNormalFontSize()},
	top : getMarginNormal1(),
	left : getMarginNormal1(),
	textAlign : 'center'
});
challengesCompletedView.add(completeChallengesLbl);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create Free Play View.
var freePlayView = Ti.UI.createView({
	height : getHeaderHeight() * 2,
	top : getMarginNormal1(),
	right : getMarginNormal1()
});
challengesCompletedView.add(freePlayView);

//gameIconsView
var gameIconsView = Ti.UI.createView({
	top : 0,
	width : (getChallengeImageWidth() * 4) + (getMarginNormal1() * 5),
	zIndex : 200,
	right : getMarginNormal1()
});
freePlayView.add(gameIconsView);

//Horse Riding Icon
var horseRidingIconImage = Ti.UI.createImageView({
	image : "images/question_icon.png",
	left : getMarginNormal1(),
	top : getMarginNormal1(),
	height : getChallengeImageWidth(),
	width : getChallengeImageWidth()
});
gameIconsView.add(horseRidingIconImage);

//Archery Icon
var archeryIconImage = Ti.UI.createImageView({
	image : "images/archery_icon.png",
	left : horseRidingIconImage.left + horseRidingIconImage.width + getMarginNormal1(),
	top : getMarginNormal1(),
	height : getChallengeImageWidth(),
	width : getChallengeImageWidth()
});
gameIconsView.add(archeryIconImage);

//Painting Icon
var paintingIconImage = Ti.UI.createImageView({
	image : "images/painting_icon.png",
	left : archeryIconImage.left + archeryIconImage.width + getMarginNormal1(),
	top : getMarginNormal1(),
	height : getChallengeImageWidth(),
	width : getChallengeImageWidth()
});
gameIconsView.add(paintingIconImage);

//Cooking Icon
var cookingIconImage = Ti.UI.createImageView({
	image : "images/cooking_icon.png",
	left : paintingIconImage.left + paintingIconImage.width + getMarginNormal1(),
	top : getMarginNormal1(),
	height : getChallengeImageWidth(),
	width : getChallengeImageWidth()
});
gameIconsView.add(cookingIconImage);


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//Rewards earned
var rewardsEarnedView = Ti.UI.createView({
	top : challengesCompletedView.top + challengesCompletedView.height,
	height : getHeaderHeight() * 3
});


// Create a Label.
var rewardsEarnedLblView = Ti.UI.createView({
	height : getHeaderHeight() + (getHeaderHeight() / 2),
	top : getMarginNormal1()
});
rewardsEarnedView.add(rewardsEarnedLblView);


// Create a Label.
var rewardsEarnedLbl = Ti.UI.createLabel({
	text : 'Rewards Earned!',
	color : '#CCCCCC',
	font : {fontSize:(getHeadingFontSize()*2)},
	textAlign : 'center'
});
rewardsEarnedLblView.add(rewardsEarnedLbl);

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
var collectionsContainerView = Ti.UI.createView({
	bottom : 0,
	width : (getMarginNormal1()*4) +  getDaggerIconWidthHeight() + (getHeaderHeight()*3) + (getContainerIconWidth()*3),
	height : getHeaderHeight()
});
rewardsEarnedView.add(collectionsContainerView);

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
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


var bottomBarView = Ti.UI.createView({
	top : rewardsEarnedView.top + rewardsEarnedView.height + getHeaderHeight() + getMarginNormal1(),
	height : getHeaderHeight()
});

// Create a New Friends Icon 
var newFriendsIconImage =  Ti.UI.createImageView({
	left : getMarginNormal1() * 2,
	top : getMarginNormal1(),
	image : "images/friends_icon.png",
	height : getFriendsIconNormalHeight(),
	width : getFriendsIconNormalWidth()
});
bottomBarView.add(newFriendsIconImage);


// Create a New Friends Label.
var newFriendsLbl = Ti.UI.createLabel({
	text : 'New Friends',
	color : '#FFFFFF',
	font : {fontSize:(getSmallFontSize() - 1)},
	bottom : 1,
	left : getMarginNormal1(),
	textAlign : 'center'
});
bottomBarView.add(newFriendsLbl);


// XP Level.
var xpLevelLbl = Ti.UI.createLabel({
	text : '45 XP',
	color : '#FFFFFF',
	font : {fontSize:getHeadingFontSize()},
	right : getMarginNormal1(),
	textAlign : 'center'
});
bottomBarView.add(xpLevelLbl);


// Line break
var lineBreakView1 = Ti.UI.createView({
	backgroundImage : 'images/line_break_big.png',
	width : winWidth - getMarginNormal1() * 2,
	height : 2,
	bottom : 0,
	left : getMarginNormal1()
});
bottomBarView.add(lineBreakView1);



win.add(headerView);
win.add(findFriends);
win.add(lineBreak3View);
win.add(enabledWrapperView);
win.add(onlineStatusIcon);
win.add(onlineStatusDescription);
win.add(chatIcon);
win.add(messageIcon);
win.add(lineBreakView0);
win.add(Quest);
win.add(challengesCompletedView);
win.add(rewardsEarnedView);
win.add(bottomBarView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'quests_home.js'
	});
	window.open();
});

win.open();
