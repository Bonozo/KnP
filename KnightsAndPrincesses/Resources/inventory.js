var json_inventories;
var active_inventory_id = "";
var active_inventory_cat = "";

function removeAllContent() {
	if (timer != "0")
		clearInterval(timer);

	coinView.remove(coinImage);
	coinView.remove(lblCoin);
	msgsView.remove(lblMsgs);
	leadrView.remove(lblLeadr);
	questsView.remove(lblQuests);
	frndsView.remove(lblfrnds);
	invView.remove(lblInv);
	statusView.remove(lblStatus);
	headerRowView.remove(questsView);
	headerRowView.remove(frndsView);
	headerRowView.remove(invView);
	headerRowView.remove(statusView);
	headerRowView.remove(leadrView);
	headerRowView.remove(msgsView);
	headerRowView.remove(coinView);
	avatarIconBottomView.remove(lblGroupStatusText);
	nameOfCharacterView.remove(lblNameOfCharacter);
	groupStatusLastRow.remove(firendsIconImage);
	groupStatusLastRow.remove(numberOfFriends);
	groupStatusLastRow.remove(completedRequests);
	groupStatusLastRow.remove(numberOfDays);
	characterPointsImage.remove(lblCharacterPoints);
	characterPointsView.remove(characterPointsImage);
	win.remove(characterPointsView);
	groupStatusView.remove(groupStatusLastRow);
	groupStatusView.remove(energyFuelView);
	groupStatusView.remove(xpFuelView);
	groupStatusView.remove(nameOfCharacterView);
	groupStatusView.remove(avatarIconBottomView);
	groupStatusView.remove(myAvatarImage);
	groupStatusView.remove(otherAvatarImage);
	levelStatusView.remove(upLevelStatus);
	upLevelStatus.remove(lblUpLevelStatus);
	levelAndCurrentStatusView.remove(levelStatusView);
	levelStatusView.remove(downLevelStatus);
	downLevelStatus.remove(lblDownLevelStatus);
	upLevelStatus.remove(lblUpLevelStatus);
	levelAndCurrentStatusView.remove(currentStatusView);
	currentStatusView.remove(lblCurrentStatus);
	armedCharacterView.remove(armedCharacterImage);
	armedCharacterView.remove(flowerImage);
	armedCharacterView.remove(chestRedArmorImage);
	armedCharacterView.remove(footRedArmorImage);
	armedCharacterView.remove(glovesArmorImage);
	armedCharacterView.remove(helmetArmorImage);
	armedCharacterView.remove(legsArmorImage);
	inventoryItemsView.remove(lblInventoryItems);
	inventoryItemsView.remove(itemDescriptionView);
	itemDescriptionView.remove(lblItemNumberDescription);
	itemDescriptionView.remove(selectedItemIcon);
	itemDescriptionView.remove(lblItemName);
	itemDescriptionView.remove(lblItemValue);
	itemDescriptionView.remove(lblItemDescription);
	itemDescriptionView.remove(giftButton);
	itemDescriptionView.remove(equipButton);
	itemDescriptionView.remove(useButton);
	inventoryItemsView.remove(itemsGridView);
	itemsGridView.remove(craftingButton);
	win.remove(optionsButton);
	win.remove(inventoryItemsView);
	win.remove(armedCharacterView);
	win.remove(levelAndCurrentStatusView);
	win.remove(groupStatusView);
	win.remove(headerRowView);
	win.remove(footerShadeView);

	win = null;
	headerRowView = null;
	coinView = null;
	coinImage = null;
	lblCoin = null;
	msgsView = null;
	lblMsgs = null;
	leadrView = null;
	lblLeadr = null;
	questsView = null;
	lblQuests = null;
	frndsView = null;
	lblfrnds = null;
	invView = null;
	lblInv = null;
	statusView = null;
	lblStatus = null;
	groupStatusView = null;
	otherAvatarImage = null;
	myAvatarImage = null;
	avatarIconBottomView = null;
	lblGroupStatusText = null;
	nameOfCharacterView = null;
	lblNameOfCharacter = null;
	xpFuelView = null;
	energyFuelView = null;
	groupStatusLastRow = null;
	firendsIconImage = null;
	numberOfFriends = null;
	completedRequests = null;
	numberOfDays = null;
	characterPointsView = null;
	characterPointsImage = null;
	lblCharacterPoints = null;
	levelAndCurrentStatusView = null;
	levelStatusView = null;
	upLevelStatus = null;
	lblUpLevelStatus = null;
	downLevelStatus = null;
	lblDownLevelStatus = null;
	currentStatusView = null;
	lblCurrentStatus = null;
	armedCharacterView = null;
	armedCharacterImage = null;
	flowerImage = null;
	chestRedArmorImage = null;
	footRedArmorImage = null;
	glovesArmorImage = null;
	helmetArmorImage = null;
	legsArmorImage = null;
	inventoryItemsView = null;
	lblInventoryItems = null;
	itemDescriptionView = null;
	lblItemNumberDescription = null;
	selectedItemIcon = null;
	lblItemName = null;
	lblItemValue = null;
	lblItemDescription = null;
	giftButton = null;
	equipButton = null;
	useButton = null;
	itemsGridView = null;
	craftingButton = null;
	optionsButton = null;
	footerShadeView = null;
}

Ti.include('func_inventory.js');
var num_of_pages_in_inventory = 0;
var win = Titanium.UI.createWindow({
	title : "Customize Home",
	width : '100%',
	navBarHidden : true,
	height : '100%',
	backgroundColor : "#FFFFFF",
	exitOnClose : true,
	zIndex : 0,
	font : {
		fontFamily : "MagicalMedieval"
	}
});
win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
//Header view
var headerRowView = Titanium.UI.createView({
	top : getHeaderButtonY(),
	left : 0,
	height : getHeaderHeight(),
	width : "100%",
	zIndex : 2
});

var timer = "0";
var friend_request_found = false;
var new_message_found = false;
timer = setInterval(function() {
	var get_notifications_url = "http://justechinfo.com/kap_server/get_notifications.php?uid=" + Ti.App.GLBL_uid + "";
	var Record;
	var get_notifications_xhr = Ti.Network.createHTTPClient({
		onload : function() {
			Ti.API.info("url: " + get_notifications_url);
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				if (rec.MESSAGE == "NEW_MESSAGE") {
					Ti.API.info("rec.MESSAGE : Message found!");
					if (new_message_found == false) {
						Ti.API.info("BEEEEP");
						var sound = Titanium.Media.createSound({
							url : 'sounds/message_bell.mp3'
						});
						sound.play();
						msgAlertImageView.visible = true;
						new_message_found = true;
						if (friend_request_found == true)
							clearInterval(timer);
					}
				} else {
					Ti.API.info("rec.MESSAGE : No message!");
					msgAlertImageView.visible = false;
				}
				if (rec.REQUEST == "NEW_REQUEST") {
					Ti.API.info("rec.REQUEST : Request found!");
					if (friend_request_found == false) {
						Ti.API.info("BEEEEP");
						var sound = Titanium.Media.createSound({
							url : 'sounds/friendship_request_bell.mp3'
						});
						sound.play();
						friendshipRequestAlertImageView.visible = true;
						friend_request_found = true;
						if (new_message_found == true)
							clearInterval(timer);
					}
				} else {
					Ti.API.info("rec.REQUEST : No request!");
					friendshipRequestAlertImageView.visible = false;
				}

			} else {
				//			alert("No messages found!");
			}
		},
		onerror : function(e) {
		},
		timeout : 1000
	});
	get_notifications_xhr.open("GET", get_notifications_url);
	get_notifications_xhr.send();

}, 1000);

//Coin View
var coinView = Titanium.UI.createView({
	top : 0,
	right : (getMarginNormal1() / 2),
	backgroundColor : "#474747",
	width : getMsgsButtonWidth()
});

//Coin Image
var coinImage = Titanium.UI.createImageView({
	image : "images/coin_icon.png",
	height : getCoinHeight(),
	top : getHeaderButtonY()
});
coinView.add(coinImage);

function getGold(callback) {
	//alert('Enter!');
	var url = "http://justechinfo.com/kap_server/get_golds.php?uid=" + Ti.App.GLBL_uid;
	var rec;
	//,UID;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				//alert(rec.TOTAL_UNIT);
				//Goldlbl.setText = rec.TOTAL_UNIT;
				//num_of_golds = rec.TOTAL_UNIT;

				callback(rec.TOTAL_UNIT);

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
}

var lblCoin;
getGold(function(gold) {
	lblCoin = Titanium.UI.createLabel({
		text : gold,
		bottom : getCoinTextY(),
		color : "#FFFFFF",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : getButtonTextSize()
		}
	});
	coinView.add(lblCoin);
});

//Coin Text

//Msgs View
var msgsView = Titanium.UI.createView({
	top : 0,
	height : "65%",
	right : coinView.width + coinView.right + (getMarginNormal1() / 2),
	backgroundColor : "#474747",
	width : getMsgsButtonWidth()
});
//Msgs Text
var lblMsgs = Titanium.UI.createLabel({
	text : "msgs",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	}
});

msgsView.add(lblMsgs);
msgsView.addEventListener("click", function(e) {
	var inbox = Titanium.UI.createWindow({
		url : 'inbox.js'
	});
	inbox.open();
	removeAllContent();

});

//Leadr View
var leadrView = Titanium.UI.createView({
	top : 0,
	height : "65%",
	right : msgsView.right + msgsView.width + (getMarginNormal1() / 2),
	backgroundColor : "#474747",
	width : getMsgsButtonWidth()
});
//leadr Text
var lblLeadr = Titanium.UI.createLabel({
	text : "leadr",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	}
});

leadrView.add(lblLeadr);

//quests View
var questsView = Titanium.UI.createView({
	top : 0,
	height : "65%",
	right : leadrView.right + leadrView.width + (getMarginNormal1() / 2),
	backgroundColor : "#474747",
	width : getMsgsButtonWidth()
});
//quests Text
var lblQuests = Titanium.UI.createLabel({
	text : "quests",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	}
});

questsView.add(lblQuests);
questsView.addEventListener("click", function(e) {
	var quests_home = Titanium.UI.createWindow({
		url : 'quests_home.js'
	});
	quests_home.open();
	removeAllContent();

});

//frnds View
var frndsView = Titanium.UI.createView({
	top : 0,
	height : "65%",
	right : questsView.right + questsView.width + (getMarginNormal1() / 2),
	backgroundColor : "#474747",
	width : getMsgsButtonWidth()
});
//frnds Text
var lblfrnds = Titanium.UI.createLabel({
	text : "frnds",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	}
});

frndsView.add(lblfrnds);
frndsView.addEventListener("click", function(e) {

	if (friendshipRequestAlertImageView.visible) {
		Titanium.UI.createWindow({
			url : 'request_friends.js'
		}).open();
		removeAllContent();
	} else {
		Titanium.UI.createWindow({
			url : 'friend_interactions.js'
		}).open();
		removeAllContent();
	}
});
//Inv. View
var invView = Titanium.UI.createView({
	top : 0,
	height : "100%",
	right : frndsView.right + frndsView.width + (getMarginNormal1() / 2),
	backgroundColor : "#474747",
	width : getMsgsButtonWidth()
});
//inv. Text
var lblInv = Titanium.UI.createLabel({
	text : "inv.",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	}
});

invView.add(lblInv);
//Status View
var statusView = Titanium.UI.createView({
	top : 0,
	height : "65%",
	right : invView.right + invView.width + (getMarginNormal1() / 2),
	backgroundColor : "#474747",
	width : getMsgsButtonWidth()
});
//Status Text
var lblStatus = Titanium.UI.createLabel({
	text : "status",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	}
});
statusView.addEventListener("click", function(e) {
	var inventory_win = Titanium.UI.createWindow({
		url : 'level3.js'
		//url:'level2.js'
	});
	inventory_win.open();
	removeAllContent();
});

statusView.add(lblStatus);

/////////////////////////////////////////////////////////////////
//Store View
var storeView = Titanium.UI.createView({
	top : 0,
	height : "65%",
	right : statusView.right + statusView.width + (getMarginNormal1() / 2),
	backgroundColor : "#474747",
	width : getMsgsButtonWidth()
});
//Store Text
var lblStore = Titanium.UI.createLabel({
	text : "store",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	}
});
storeView.addEventListener("click", function(e) {
	var store_home = Titanium.UI.createWindow({
		url : 'store_home.js'
		//url:'level2.js'
	});
	store_home.open();
	removeAllContent();
});

storeView.add(lblStore);

headerRowView.add(storeView);
headerRowView.add(questsView);
headerRowView.add(frndsView);
headerRowView.add(invView);
headerRowView.add(statusView);
headerRowView.add(leadrView);
headerRowView.add(msgsView);
headerRowView.add(coinView);

// Create an ImageView.
var msgAlertImageView = Ti.UI.createImageView({
	image : 'images/warning_icon.png',
	visible : false,
	top : 0,
	right : coinView.width + coinView.right + (getMarginNormal1() / 2),
	height : 16,
	width : 16,
	zIndex : 10000
});
headerRowView.add(msgAlertImageView);
// Create an ImageView.
var friendshipRequestAlertImageView = Ti.UI.createImageView({
	image : 'images/warning_icon.png',
	visible : false,
	top : 0,
	right : questsView.right + questsView.width + (getMarginNormal1() / 2),
	height : 16,
	width : 16,
	zIndex : 10000
});
// Add to the parent view.
headerRowView.add(friendshipRequestAlertImageView);

/**************************************************************************************/
/*********************************HEADER COMPLETED*************************************/
/**************************************************************************************/

//Group Status View
var groupStatusView = Titanium.UI.createView({
	top : 4 * getHeaderButtonY() + getCoinButtonWidth(),
	height : (getHeaderHeight() * 3 / 2),
	backgroundColor : "#999999",
	width : (winWidth * 95 / 100)
});
//Other Avatar Icon
var otherAvatarImage = Titanium.UI.createImageView({
	image : "images/other_avatar.png",
	right : getHeaderButtonY() / 2,
	top : getHeaderButtonY() / 2,
	height : getAvatarHeight(),
	width : getAvatarWidth()
	//left:"10%"
});
//My Avatar Icon
var myAvatarImage = Titanium.UI.createImageView({
	image : "images/my_avatar.png",
	right : getHeaderButtonY() + getAvatarWidth(),
	top : getHeaderButtonY() / 2,
	height : getAvatarHeight(),
	width : getAvatarWidth()
	//left:"10%"
});

//groupStatusView
var avatarIconBottomView = Titanium.UI.createView({
	right : 0,
	bottom : 0,
	height : (getHeaderHeight() * 3 / 2) - getAvatarHeight() - (getHeaderButtonY() / 2),
	width : getHeaderButtonY() + (2 * getAvatarWidth())
	//backgroundColor : "#00f850"
	//left:"10%"
});
//Group Status Text
var lblGroupStatusText = Titanium.UI.createLabel({
	text : "Group Status",
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	},
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
});
avatarIconBottomView.add(lblGroupStatusText);
//nameOfCharacterView
var nameOfCharacterView = Titanium.UI.createView({
	left : 0,
	top : 0,
	height : (getHeaderHeight() * 3 / 2) - getAvatarHeight() - (getHeaderButtonY() / 2),
	width : (winWidth * 95 / 100) - (getHeaderButtonY() + (2 * getAvatarWidth()))
});
//lblNameOfCharacter
var lblNameOfCharacter = Titanium.UI.createLabel({
	text : Ti.App.GLBL_name,
	font : {
		fontSize : getButtonTextSize() + 2,
		fontFamily : "MagicalMedieval"
	},
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
});
nameOfCharacterView.add(lblNameOfCharacter);

//xpFuelView
var xpFuelView = Titanium.UI.createView({
	left : getHeaderButtonY() * 3,
	top : (getHeaderButtonY()) + (getHeaderHeight() * 3 / 2) - getAvatarHeight() - (getHeaderButtonY() / 2),
	height : (getHeaderButtonY() * 2),
	width : (winWidth * 95 / 100) - (getHeaderButtonY() + (2 * getAvatarWidth())) - ((getHeaderHeight() * 3 / 2) - getAvatarHeight() - (getHeaderButtonY() / 2)), //getHeaderButtonY()+(2*getAvatarWidth())
	backgroundColor : "#4d4d4d"
	//left:"10%"
});
var xpFuelFilledView = Titanium.UI.createView({
	left : 0,
	top : 0,
	height : "100%",
	width : "0%",
	backgroundColor : "#FE1D25"
	//left:"10%"
});
xpFuelView.add(xpFuelFilledView);

// Create a Label.
var xpFuelPercentLbl = Ti.UI.createLabel({
	text : '',
	color : '#FFFFFF',
	font : {
		fontSize : 12
	},
	textAlign : 'center'
});
xpFuelView.add(xpFuelPercentLbl);

// Create a Label.
var xpFuelLbl = Ti.UI.createLabel({
	text : 'XP',
	color : '#FFFFFF',
	right : 8,
	font : {
		fontSize : 12
	},
	textAlign : 'center'
});
xpFuelView.add(xpFuelLbl);

//energyFuelView
var energyFuelView = Titanium.UI.createView({
	left : getHeaderButtonY() * 3,
	top : (getHeaderButtonY()) + (getHeaderHeight() * 3 / 2) - getAvatarHeight() - (getHeaderButtonY() / 2) + ((getHeaderButtonY() * 2)) + (getHeaderButtonY()),
	height : (getHeaderButtonY() * 2),
	width : (winWidth * 95 / 100) - (getHeaderButtonY() + (2 * getAvatarWidth())) - ((getHeaderHeight() * 3 / 2) - getAvatarHeight() - (getHeaderButtonY() / 2)),
	backgroundColor : "#4d4d4d"
	//left:"10%"
});

var energyFuelFilledView = Titanium.UI.createView({
	left : 0,
	top : 0,
	height : "100%",
	width : "0%",
	backgroundColor : "#C001FF"
	//left:"10%"
});
energyFuelView.add(energyFuelFilledView);

// Create a Label.
var energyFuelPercentLbl = Ti.UI.createLabel({
	text : '',
	color : '#FFFFFF',
	font : {
		fontSize : 12
	},
	textAlign : 'center'
});
energyFuelView.add(energyFuelPercentLbl);

// Create a Label.
var energyFuelLbl = Ti.UI.createLabel({
	text : 'Energy',
	color : '#FFFFFF',
	right : 8,
	font : {
		fontSize : 12
	},
	textAlign : 'center'
});
energyFuelView.add(energyFuelLbl);

function getXPAndEnergy(callback) {
	//alert('Enter!');
	var url = "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + Ti.App.GLBL_uid;
	var rec;
	//,UID;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				callback(rec.XP, rec.ENERGY, rec.LEVEL);
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
}

//numberOfFriends
var numberOfFriends;
getXPAndEnergy(function(xp_val, energy_val, level_val) {
	var xp_max_val = level_val * 1000 + 1000, energy_max_val = level_val * 1000;
	xpFuelFilledView.width = "" + ((xp_val / xp_max_val) * 100) + "%";
	xpFuelPercentLbl.text = xp_val + "/" + xp_max_val;
	energyFuelFilledView.width = "" + ((energy_val / energy_max_val) * 100) + "%";
	energyFuelPercentLbl.text = "" + ((energy_val / energy_max_val) * 100) + "%";

});

//groupStatusLastRow
var groupStatusLastRow = Titanium.UI.createView({
	left : getHeaderButtonY() * 3,
	top : (4 * getHeaderButtonY()) + (getHeaderHeight() * 3 / 2) - getAvatarHeight() - (getHeaderButtonY() / 2) + ((getHeaderButtonY() * 2)) + (getHeaderButtonY()),
	width : (winWidth * 95 / 100) - (getHeaderButtonY() + (2 * getAvatarWidth())) - ((getHeaderHeight() * 3 / 2) - getAvatarHeight() - (getHeaderButtonY() / 2))
});

//firendsIcon
var firendsIconImage = Titanium.UI.createImageView({
	image : "images/friends_icon.png",
	width : getFirendsIconWidth(),
	height : getFirendsIconheight(),
	left : 0,
	top : 0
});
groupStatusLastRow.add(firendsIconImage);

function getNumberOfFriends(callback) {
	//alert('Enter!');
	var url = "http://justechinfo.com/kap_server/get_avatar_friend_count.php?uid=" + Ti.App.GLBL_uid;
	var rec;
	//,UID;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				callback(rec.NUM_OF_FRIENDS);
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
}

//numberOfFriends
var numberOfFriends;
getNumberOfFriends(function(num_of_friends) {
	numberOfFriends = Titanium.UI.createLabel({
		left : getFirendsIconWidth() + getHeaderButtonY(),
		font : {
			fontSize : getButtonTextSize() - 4,
			fontFamily : "MagicalMedieval"
		},
		color : "#FFFFFF",
		text : num_of_friends + " friends"
	});

	groupStatusLastRow.add(numberOfFriends);
});

//completedRequests
var completedRequests = Titanium.UI.createLabel({
	font : {
		fontSize : getCompletedRequestsFontSize(),
		fontFamily : "MagicalMedieval"
	},
	color : "#FFFFFF",
	right : 0,
	bottom : 0,
	visible : false,
	text : "75 requests completed"
});

groupStatusLastRow.add(completedRequests);

//numberOfDays
var numberOfDays = Titanium.UI.createLabel({
	font : {
		fontSize : getCompletedRequestsFontSize(),
		fontFamily : "MagicalMedieval"
	},
	color : "#FFFFFF",
	right : 0,
	top : 0,
	text : "45 days,"
});

groupStatusLastRow.add(numberOfDays);

//characterPointsView
var characterPointsView = Titanium.UI.createView({
	left : (winWidth * 2 / 100),
	top : (4 * getHeaderButtonY() + getCoinButtonWidth()) + (getHeaderHeight() * 3 / 2) - getAvatarHeight() - (getHeaderButtonY()),
	height : getCharPointsHeight(),
	width : getCharPointsWidth(),
	zIndex : 100
});

//characterPointsImage
var characterPointsImage = Titanium.UI.createView({
	backgroundImage : "images/character_points.png",
	height : "100%",
	width : "100%",
	//left:"10%"
});
//lblCharacterPoints
var lblCharacterPoints;
function getLevel(callback) {
	//alert('Enter!');
	var url = "http://justechinfo.com/kap_server/get_level.php?uid=" + Ti.App.GLBL_uid;
	var rec;
	//,UID;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				callback(rec.LEVEL);
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
}

//numberOfFriends
var numberOfFriends;
getLevel(function(level) {
	lblCharacterPoints = Titanium.UI.createLabel({
		text : level,
		font : {
			fontSize : getButtonTextSize() + 4,
		},
		color : "#FFFFFF",
		zIndex : 200,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
	});
	characterPointsImage.add(lblCharacterPoints);
});

characterPointsView.add(characterPointsImage);
win.add(characterPointsView);

groupStatusView.add(groupStatusLastRow);
groupStatusView.add(energyFuelView);
groupStatusView.add(xpFuelView);
groupStatusView.add(nameOfCharacterView);
groupStatusView.add(avatarIconBottomView);
groupStatusView.add(myAvatarImage);
groupStatusView.add(otherAvatarImage);
/*********************************************************************************************************/
/*************************************GROUP STATUS VIEW ENDED*********************************************/
/*********************************************************************************************************/

//levelAndCurrentStatusView
var levelAndCurrentStatusView = Titanium.UI.createView({
	top : 5 * getHeaderButtonY() + getCoinButtonWidth() + (getHeaderHeight() * 3 / 2),
	height : getHeaderHeight(),
	width : (winWidth * 95 / 100)
});

//levelStatusView
var levelStatusView = Titanium.UI.createView({
	top : 0,
	left : 0,
	height : getHeaderHeight(),
	width : (winWidth * 30 / 100)
});

levelAndCurrentStatusView.add(levelStatusView);

//upLevelStatus
var upLevelStatus = Titanium.UI.createView({
	top : 0,
	left : 0,
	height : "43%",
	backgroundColor : "#b3b3b3",
	borderColor : "#474747",
	borderWidth : 1,
	width : "95%"
});
levelStatusView.add(upLevelStatus);

//lblUpLevelStatus
var lblUpLevelStatus = Titanium.UI.createLabel({
	text : "15___ to next LVL",
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	},
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});

upLevelStatus.add(lblUpLevelStatus);

//downLevelStatus
var downLevelStatus = Titanium.UI.createView({
	bottom : 0,
	left : 0,
	height : "43%",
	backgroundColor : "#b3b3b3",
	borderColor : "#474747",
	borderWidth : 1,
	width : "95%"
});
levelStatusView.add(downLevelStatus);

//lblDownLevelStatus
var lblDownLevelStatus = Titanium.UI.createLabel({
	text : "12___ to next LVL",
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	},
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
downLevelStatus.add(lblDownLevelStatus);
upLevelStatus.add(lblUpLevelStatus);

//currentStatusView
var currentStatusView = Titanium.UI.createView({
	right : 0,
	top : 0,
	height : getHeaderHeight(),
	width : (winWidth * 65 / 100),
	borderColor : "#474747",
	borderWidth : 1
});

levelAndCurrentStatusView.add(currentStatusView);

//lblCurrentStatus
var lblCurrentStatus = Titanium.UI.createLabel({
	text : "This is where my current status message goes",
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	},
	color : "#000000",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
currentStatusView.add(lblCurrentStatus);

/**************************************************************************************/
/*********************************CURRENT STATUS COMPLETED*****************************/
/**************************************************************************************/

//characterView
var armedCharacterView = Titanium.UI.createView({
	top : 6 * getHeaderButtonY() + getCoinButtonWidth() + (getHeaderHeight() * 3 / 2) + getHeaderHeight(),
	height : getImageHeight(Ti.App.GLBL_gender),
	zIndex : 100,
	width : getImageWidth(Ti.App.GLBL_gender),
	left : (winWidth * 2.5 / 100)
});

//characterImage
var armedCharacterImage = Titanium.UI.createImageView({
	image : Ti.App.GLBL_character_image,
	left : 0,
	top : 0,
	height : getImageHeight(Ti.App.GLBL_gender),
	width : getImageWidth(Ti.App.GLBL_gender),
	zIndex : 10
});
armedCharacterView.add(armedCharacterImage);

//flowerImage
var flowerImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("flowerImage"), // false,
	image : 'images/P_flower_gray.png',
	width : 48,
	height : 30,
	top : 165,
	left : 100,
	zIndex : 200
});
armedCharacterView.add(flowerImage);
//chestRedArmorImage
var chestRedArmorImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("chestRedArmorImage"), //false & Ti.App.GLBL_items_visible[0],
	image : 'images/k_chestplate_bad_crop_' + Ti.App.GLBL_skin_color + '.png',
	width : 95,
	height : 101,
	top : 50,
	left : 5,
	zIndex : 20
});
armedCharacterView.add(chestRedArmorImage);

//footRedArmorImage
var footRedArmorImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("footRedArmorImage"), //Ti.App.GLBL_items_visible[1],
	image : 'images/K_Feet_bad_crop_' + Ti.App.GLBL_skin_color + '.png',
	width : 88,
	height : 104,
	bottom : 0,
	left : 30,
	zIndex : 20
});
armedCharacterView.add(footRedArmorImage);

//glovesArmorImage
var glovesArmorImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("glovesArmorImage"), //Ti.App.GLBL_items_visible[2],
	image : 'images/K_Gloves_bad_crop_' + Ti.App.GLBL_skin_color + '.png',
	width : 60,
	height : 47,
	top : 70,
	left : 55,
	zIndex : 20
});
armedCharacterView.add(glovesArmorImage);

//helmetArmorImage
var helmetArmorImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("helmetArmorImage"), //Ti.App.GLBL_items_visible[3],
	image : 'images/K_Helmet_bad_crop_' + Ti.App.GLBL_skin_color + '.png',
	width : 63,
	height : 63,
	top : 9,
	left : 20,
	zIndex : 25
});
armedCharacterView.add(helmetArmorImage);

//legsArmorImage
var legsArmorImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("legsArmorImage"), //Ti.App.GLBL_items_visible[4],
	image : 'images/K_Legs_bad_crop_' + Ti.App.GLBL_skin_color + '.png',
	width : 64,
	height : 74,
	top : 140,
	left : 55,
	zIndex : 25
});
armedCharacterView.add(legsArmorImage);

/**************************************************************************************/
/*********************************INVENTORY ITEMS *************************************/
/**************************************************************************************/

//inventoryItemsView
var inventoryItemsView = Titanium.UI.createView({
	top : 6 * getHeaderButtonY() + getCoinButtonWidth() + (getHeaderHeight() * 3 / 2) + getHeaderHeight(),
	height : getInventoryHeight(), //winHeight-(6*getHeaderButtonY()+getCoinButtonWidth()+(getHeaderHeight()*3/2)+getHeaderHeight())-(2*getHeaderHeight()),
	zIndex : 100,
	width : winWidth - (winWidth * 5 / 100) - getImageWidth(Ti.App.GLBL_gender) - getHeaderButtonY(),
	backgroundColor : "#666666",
	right : (winWidth * 2.5 / 100)
});

//lblInventoryItems
var lblInventoryItems = Titanium.UI.createLabel({
	text : "INVENTORY ITEMS",
	font : {
		fontSize : getHeadingTextSize(),
		fontFamily : "MagicalMedieval"
	},
	color : "#FFFFFF",
	top : getHeaderButtonY()
});
inventoryItemsView.add(lblInventoryItems);

//itemDescriptionView
var itemDescriptionView = Titanium.UI.createView({
	top : 2 * getHeaderButtonY() + getHeadingTextSize(),
	height : getInventoryDescriptionHeight(), //winHeight-(6*getHeaderButtonY()+getCoinButtonWidth()+(getHeaderHeight()*3/2)+getHeaderHeight())-(2*getHeaderHeight()),
	zIndex : 100,
	width : "95%",
	backgroundColor : "#e6e6e6",
	borderRadius : getBorderRadius(),
	borderWidth : getBorderWidth(),
	borderColor : "#979797"
});
inventoryItemsView.add(itemDescriptionView);

//lblItemNumberDescription
var lblItemNumberDescription = Titanium.UI.createLabel({
	top : getHeaderButtonY(),
	left : getHeaderButtonY(),
	text : '', //(selected_item_index + 1),
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	},
	color : "#000000"
});
itemDescriptionView.add(lblItemNumberDescription);

//selectedItemIcon
var selectedItemIcon = Titanium.UI.createImageView({
	image : '', // "images/" + Ti.App.GLBL_items_image[selected_item_index] + "_" + Ti.App.GLBL_skin_color + ".png", //"images/K_ChestPlate_bad_crop.png",
	top : getHeaderButtonY(),
	left : 4 * getHeaderButtonY(),
	width : (getThumbImageWidth(Ti.App.GLBL_items_image[selected_item_index]) * 2),
	height : (getThumbImageHeight(Ti.App.GLBL_items_image[selected_item_index]) * 2)
});
itemDescriptionView.add(selectedItemIcon);

//lblItemName
var lblItemName = Titanium.UI.createLabel({
	top : getHeaderButtonY(),
	left : 5 * getHeaderButtonY() + getHeaderHeight() * (3 / 4),
	text : 'N/A', //Ti.App.GLBL_items_title[selected_item_index],
	font : {
		fontSize : getButtonTextSize()
	},
	color : "#000000"
});
itemDescriptionView.add(lblItemName);

//lblItemValue
var lblItemValue = Titanium.UI.createLabel({
	top : (2 * getHeaderButtonY()) + getButtonTextSize(),
	left : 5 * getHeaderButtonY() + getHeaderHeight() * (3 / 4),
	text : '', //"Value : " + Ti.App.GLBL_items_value[0] + " gold", //"Value : 3 gold",
	font : {
		fontSize : getCompletedRequestsFontSize()
	},
	color : "#000000"
});
itemDescriptionView.add(lblItemValue);

//lblItemDescription
var lblItemDescription = Titanium.UI.createLabel({
	top : getHeaderButtonY() + getHeaderHeight() * (3 / 4),
	left : 3 * getHeaderButtonY(),
	text : '', //Ti.App.GLBL_items_description[selected_item_index], //"makes a great gift, can be combined with _____ in crafting to increase its value",
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : "MagicalMedieval"
	},
	color : "#000000"
});
itemDescriptionView.add(lblItemDescription);

//Gift Button
var giftButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Gift",
	font : {
		fontSize : getButtonTextSize() - 4,
		fontFamily : "MagicalMedieval"
	},
	backgroundColor : "#474747",
	height : getButtonHeight(),
	width : getButtonWidth(),
	left : getHeaderButtonY(),
	bottom : getHeaderButtonY(),
	borderRadius : 2
});
giftButton.addEventListener("click", function(e) {

	if (active_inventory_cat == '' || active_inventory_id == '') {
		alert('Please select some inventory first!');
	} else {
		Ti.App.Properties.setString('active_inventory_cat', active_inventory_cat);
		Ti.App.Properties.setString('active_inventory_id', active_inventory_id);

		Titanium.UI.createWindow({
			url : 'friends_list.js'
		}).open();
		removeAllContent();
	}
	/*
	 giftButton.backgroundColor = "#474747";
	 giftButton.color = "#FFFFFF";
	 equipButton.backgroundColor = "#b6b6b6";
	 equipButton.color = "#eeeeee";
	 useButton.backgroundColor = "#b6b6b6";
	 useButton.color = "#eeeeee";
	 */
});
itemDescriptionView.add(giftButton);

//Equip Button
var equipButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Equip",
	font : {
		fontSize : getButtonTextSize() - 4
	},
	backgroundColor : "#474747",
	height : getButtonHeight(),
	width : getButtonWidth(),
	bottom : getHeaderButtonY(),
	borderRadius : 2
});
itemDescriptionView.add(equipButton);
equipButton.addEventListener("click", function(e) {
	setEquipRemove();
	/*
	 equipButton.backgroundColor = "#474747";
	 equipButton.color = "#FFFFFF";
	 giftButton.backgroundColor = "#b6b6b6";
	 giftButton.color = "#eeeeee";
	 useButton.backgroundColor = "#b6b6b6";
	 useButton.color = "#eeeeee";
	 */
});

//Use Button
var useButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Use",
	font : {
		fontSize : getButtonTextSize() - 4
	},
	backgroundColor : "#474747",
	height : getButtonHeight(),
	width : getButtonWidth(),
	right : getHeaderButtonY(),
	bottom : getHeaderButtonY(),
	borderRadius : 2
});
itemDescriptionView.add(useButton);
useButton.addEventListener("click", function(e) {
	/*
	 useButton.backgroundColor = "#474747";
	 useButton.color = "#FFFFFF";
	 equipButton.backgroundColor = "#b6b6b6";
	 equipButton.color = "#eeeeee";
	 giftButton.backgroundColor = "#b6b6b6";
	 giftButton.color = "#eeeeee";
	 */
});

/*
* Buttons grid started
*/
//itemsGridView
var itemsGridView = Titanium.UI.createView({
	top : (3 * getHeaderButtonY()) + getHeadingTextSize() + getInventoryDescriptionHeight(), //0,//3*getHeaderButtonY()+getHeadingTextSize()+(getInventoryDescriptionHeight()),
	width : "60%",
	height : getInventoryHeight() - ((4 * getHeaderButtonY()) + getHeadingTextSize() + getInventoryDescriptionHeight())
});
inventoryItemsView.add(itemsGridView);

var active_page = 1;
function renderInventoryPerPage(page_no) {
	var counter;
	active_page = page_no;
	if (page_no == 1) {
		counter = 0;
	} else {
		counter = (9 * (page_no - 1));
	}
	//alert('counter:'+counter);
	num_of_pages_in_inventory = parseInt(json_inventories.Record.length / 9);
	if ((json_inventories.Record.length % 9) != 0)
		num_of_pages_in_inventory++;
	var rec_inventory;
	var inv_icon_views = [];
	var inv_icon_buttons = [];
	var gridItem1Icon;
	var inv_index = 0;
	var active_inv_set = false;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (json_inventories.Record[counter] == undefined) {
				rec_inventory = {
					IMAGE : ''
				};
				Ti.API.info('IMAGE: ');
			} else {
				Ti.API.info('IMAGE: ' + json_inventories.Record[counter]);
				rec_inventory = json_inventories.Record[counter];
				//alert(rec);
			}
			if (active_inv_set) {
				lblItemName.text = rec_inventory.NAME;
				lblItemValue.text = "Value : " + rec_inventory.REQ_GOLD + " gold";
				lblItemNumberDescription.text = rec_inventory.TOTAL_UNIT;
				selectedItemIcon.image = getThumbImage(rec_inventory.IMAGE);
				lblItemDescription.text = rec_inventory.DESCRIPTION;
				active_inv_set = false;
				active_inventory_id = rec_inventory.ID;
				active_inventory_cat = rec_inventory.CATEGORY;
			}

			inv_icon_views[inv_index] = Titanium.UI.createView({
				left : (j + 1) * getHeaderButtonY() + j * getMsgsButtonWidth(),
				top : (i + 1) * getHeaderButtonY() + i * getMsgsButtonWidth(),
				borderRadius : getBorderRadius(),
				borderWidth : getBorderWidth(),
				borderColor : "#CCCCCC",
				backgroundColor : "#808080",
				width : getMsgsButtonWidth(),
				height : getMsgsButtonWidth()
			});
			inv_icon_buttons[inv_index] = Titanium.UI.createButton({
				width : 50,
				height : 50,
				backgroundImage : getThumbImage(rec_inventory.IMAGE),
				id : rec_inventory.ID,
				name : rec_inventory.NAME,
				category : rec_inventory.CATEGORY,
				image : rec_inventory.IMAGE,
				req_gold : rec_inventory.REQ_GOLD,
				description : rec_inventory.DESCRIPTION,
				qty : rec_inventory.TOTAL_UNIT
			});

			inv_icon_views[inv_index].add(inv_icon_buttons[inv_index]); ( function(inv_item) {
					inv_item.addEventListener("click", function(e) {
						if (Ti.App.GLBL_items_image[counter] != "") {
							lblItemName.text = e.source.name;
							lblItemValue.text = "Value : " + e.source.req_gold + " gold";
							lblItemNumberDescription.text = e.source.qty;
							selectedItemIcon.image = getThumbImage(e.source.image);
							lblItemDescription.text = e.source.description;
							active_inventory_cat = e.source.category;
							active_inventory_id = e.source.id;
						}
					});
				}(inv_icon_buttons[inv_index]));

			//gridItem1Icon
			gridItem1Icon = Titanium.UI.createImageView({
				image : getThumbImage(rec_inventory.IMAGE),
				width : 50,
				height : 50
			});
			//inv_icon_views[inv_index].add(gridItem1Icon);

			itemsGridView.add(inv_icon_views[inv_index]);
			counter++;
		}
	}

}

var url = "http://justechinfo.com/kap_server/get_all_inventories.php?uid=" + Ti.App.GLBL_uid;
var rec;
//,UID;
var Record;
var xhr = Ti.Network.createHTTPClient({
	onload : function() {
		Ti.API.info("url: " + url);
		json_inventories = JSON.parse(this.responseText);
		if (json_inventories.Record != undefined) {
			renderInventoryPerPage(1);
		} else {
			alert(' Please reload this page, Something went wrong.');
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

var scrollUpButton = Ti.UI.createImageView({
	title : '',
	height : '90',
	width : '50',
	image : 'images/inventory_grid_items_up_arrow.png',
	top : (3 * getHeaderButtonY()) + getHeadingTextSize() + getInventoryDescriptionHeight(),
	right : getMarginNormal1()
});

// Listen for click events.
scrollUpButton.addEventListener('click', function() {
	if (active_page != 1) {
		renderInventoryPerPage(--active_page);
	}
});

// Add to the parent view.
inventoryItemsView.add(scrollUpButton);

// Create a Button.
var scrollDownButton = Ti.UI.createImageView({
	title : '',
	height : '90',
	width : '50',
	image : 'images/inventory_grid_items_down_arrow.png',
	top : (3 * getHeaderButtonY()) + getHeadingTextSize() + getInventoryDescriptionHeight() + getMarginNormal1() + 90,
	right : getMarginNormal1()
});

// Listen for click events.
scrollDownButton.addEventListener('click', function() {
	if (active_page < num_of_pages_in_inventory) {
		renderInventoryPerPage(++active_page);
	}
});

// Add to the parent view.
inventoryItemsView.add(scrollDownButton);

//Crafting Button
var craftingButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Crafting",
	font : {
		fontSize : getButtonTextSize() - 4,
		fontFamily : "MagicalMedieval"
	},
	backgroundColor : "#474747",
	height : getButtonHeight(),
	width : "100%",
	bottom : 0,
	borderRadius : 2
});
craftingButton.addEventListener("click", function(e) {
	alert('Screen is under construction!');
	/*var window = Titanium.UI.createWindow({
	 url : 'craft_home.js'
	 });
	 window.open();
	 removeAllContent();
	 */
});

itemsGridView.add(craftingButton);

//Options Button
var optionsButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Options",
	font : {
		fontSize : getButtonTextSize() - 4,
		fontFamily : "MagicalMedieval"
	},
	backgroundColor : "#474747",
	height : getButtonHeight(),
	bottom : getHeaderButtonY(),
	left : getHeaderButtonY(),
	borderRadius : 2
});
optionsButton.addEventListener("click", function(e) {
	var window = Titanium.UI.createWindow({
		url : 'level2.js'
	});
	window.open();
	removeAllContent();
	window.fireEvent('show_options', {
		a : 'b'
	});
});
//footerShade
var footerShadeView = Titanium.UI.createView({
	bottom : 0,
	height : getHeaderHeight() * 3,
	width : "100%",
	backgroundColor : "#d8d8d8",
	zIndex : 0
});

win.add(optionsButton);
win.add(inventoryItemsView);
win.add(armedCharacterView);
win.add(levelAndCurrentStatusView);
win.add(groupStatusView);
win.add(headerRowView);
win.add(footerShadeView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'app.js'
	});
	window.open();
	removeAllContent();
});

win.open();