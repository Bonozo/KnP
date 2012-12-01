Ti.include('func_level3.js');
function removeAllContent()
{
	if(timer != "0")
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
	levelAndCurrentStatusView.remove(levelStatusView);
	levelStatusView.remove(upLevelStatus);
	upLevelStatus.remove(lblUpLevelStatus);
	levelStatusView.remove(downLevelStatus);
	downLevelStatus.remove(lblDownLevelStatus);
	upLevelStatus.remove(lblUpLevelStatus);
	levelAndCurrentStatusView.remove(currentStatusView);
	currentStatusView.remove(lblCurrentStatus);
	armedCharacterPlaceholderView.remove(armedCharacterView);
	armedCharacterView.remove(armedCharacterImage);
	armedCharacterView.remove(flowerImage);
	armedCharacterView.remove(chestRedArmorImage);
	armedCharacterView.remove(footRedArmorImage);
	armedCharacterView.remove(glovesArmorImage);
	armedCharacterView.remove(helmetArmorImage);
	armedCharacterView.remove(legsArmorImage);
	armedCharacterPlaceholderView.remove(armedHeadView);
	armedHeadView.remove(armedHeadIcon);
	armedHeadView.remove(lblArmedHeadIcon);
	armedCharacterPlaceholderView.remove(armedChestView);
	armedChestView.remove(armedChestIcon);
	armedChestView.remove(lblArmedChestIcon);
	armedCharacterPlaceholderView.remove(armedHandsView);
	armedHandsView.remove(armedHandsIcon);
	armedHandsView.remove(lblArmedHandsIcon);
	armedCharacterPlaceholderView.remove(armedLegsView);
	armedLegsView.remove(armedLegsIcon);
	armedLegsView.remove(lblArmedLegsIcon);
	armedCharacterPlaceholderView.remove(armedFootsView);
	armedFootsView.remove(armedFootsIcon);
	armedFootsView.remove(lblArmedFootsIcon);
	armedCharacterPlaceholderView.remove(armedWeaponView);
	armedWeaponView.remove(armedWeaponIcon);
	armedWeaponView.remove(lblArmedWeaponIcon);
	armedCharacterPlaceholderView.remove(armedMagicView);
	armedMagicView.remove(armedMagicIcon);
	armedMagicView.remove(lblArmedMagicIcon);
	armedIconZoomView.remove(lblSelectedIconName);
	armedIconZoomView.remove(selectedIconImage);
	armedIconZoomView.remove(lblSelectedIconDesc);
	win.remove(optionsButton);
	win.remove(changeBGButton);
	win.remove(armedIconZoomView);
	win.remove(armedCharacterPlaceholderView);
	win.remove(footerShadeView);
	win.remove(levelAndCurrentStatusView);
	win.remove(groupStatusView);
	win.remove(headerRowView);
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
	armedCharacterPlaceholderView = null;
	armedCharacterView = null;
	armedCharacterImage = null;
	flowerImage = null;
	chestRedArmorImage = null;
	footRedArmorImage = null;
	glovesArmorImage = null;
	helmetArmorImage = null;
	legsArmorImage = null;
	armedHeadView = null;
	armedHeadIcon = null;
	lblArmedHeadIcon = null;
	armedChestView = null;
	armedChestIcon = null;
	lblArmedChestIcon = null;
	armedHandsView = null;
	armedHandsIcon = null;
	lblArmedHandsIcon = null;
	armedLegsView = null;
	armedLegsIcon = null;
	lblArmedLegsIcon = null;
	armedFootsView = null;
	armedFootsIcon = null;
	lblArmedFootsIcon = null;
	armedWeaponView = null;
	armedWeaponIcon = null;
	lblArmedWeaponIcon = null;
	armedMagicView = null;
	armedMagicIcon = null;
	lblArmedMagicIcon = null;
	armedIconZoomView = null;
	lblSelectedIconName = null;
	selectedIconImage = null;
	lblSelectedIconDesc = null;
	optionsButton = null;
	changeBGButton = null;
	footerShadeView = null;
	win = null;

}

var win = Titanium.UI.createWindow({
	title:"Customize Home",
    width: '100%',
    navBarHidden : true,
    height: '100%',
	backgroundColor : "#FFFFFF",
	exitOnClose:true,
	zIndex : 0
});
//Header view
var headerRowView = Titanium.UI.createView({
	top:getHeaderButtonY(),
	left:0,
	height:getHeaderHeight(),		
	width:"100%",
	zIndex : 2
});


var timer = "0";
var friend_request_found = false;
var new_message_found = false;
timer = setInterval(function(){
	var url = "http://justechinfo.com/kap_server/get_notifications.php?uid="+Ti.App.GLBL_uid+"";
	var Record;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			Ti.API.info("url: " + url);
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				if(rec.MESSAGE == "NEW_MESSAGE"){
					Ti.API.info("rec.MESSAGE : Message found!");
					if(new_message_found == false){
						Ti.API.info("BEEEEP");
						var sound = Titanium.Media.createSound({url:'sounds/message_bell.mp3'});
						sound.play();
						msgAlertImageView.visible = true;
						new_message_found = true;
						if(friend_request_found == true)
							clearInterval(timer);
					}
				}
				else{
					Ti.API.info("rec.MESSAGE : No message!");
					msgAlertImageView.visible = false;
				}
				if(rec.REQUEST == "NEW_REQUEST"){
					Ti.API.info("rec.REQUEST : Request found!");
					if(friend_request_found == false){
						Ti.API.info("BEEEEP");
						var sound = Titanium.Media.createSound({url:'sounds/friendship_request_bell.mp3'});
						sound.play();
						friendshipRequestAlertImageView.visible = true;
						friend_request_found = true;
						if(new_message_found == true)
							clearInterval(timer);
					}
				}
				else{
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
	xhr.open("GET", url);
	xhr.send(); 

},1000);
// Create an ImageView.
var msgAlertImageView = Ti.UI.createImageView({
	image : 'images/warning_icon.png',
	visible : false,
	top : 0,
	right : (2 * getHeaderButtonX()) + getCoinButtonWidth(),
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
	right : (5 * getHeaderButtonX()) + (3 * getMsgsButtonWidth()) + (getCoinButtonWidth()),
	height : 16,
	width : 16,
	zIndex : 10000
});
// Add to the parent view.
headerRowView.add(friendshipRequestAlertImageView);



//Coin View
var coinView = Titanium.UI.createView({
	top:0,
	right:getHeaderButtonX(),
	backgroundColor : "#474747",
	width:getCoinButtonWidth()
});

//Coin Image
var coinImage = Titanium.UI.createImageView({
	image:"images/coin_icon.png",
	height:getCoinHeight(),
	top : getHeaderButtonY()
});
coinView.add(coinImage);

//Coin Text
var lblCoin = Titanium.UI.createLabel({
	text:"250",
	bottom : getCoinTextY(),
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font : {fontSize : getButtonTextSize()}
});
coinView.add(lblCoin);

//Msgs View
var msgsView = Titanium.UI.createView({
	top:0,
	height : "65%",
	right:(2*getHeaderButtonX())+getCoinButtonWidth(),
	backgroundColor : "#474747",
	width:getMsgsButtonWidth()
});
//Msgs Text
var lblMsgs = Titanium.UI.createLabel({
	text:"msgs",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font : {fontSize : getButtonTextSize()}
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
	top:0,
	height : "65%",
	right:(3*getHeaderButtonX())+getMsgsButtonWidth()+(getCoinButtonWidth()),
	backgroundColor : "#474747",
	width:getMsgsButtonWidth()
});
//leadr Text
var lblLeadr = Titanium.UI.createLabel({
	text:"leadr",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font : {fontSize : getButtonTextSize()}
});

leadrView.add(lblLeadr);

//quests View
var questsView = Titanium.UI.createView({
	top:0,
	height : "65%",
	right:(4*getHeaderButtonX())+(2*getMsgsButtonWidth())+(getCoinButtonWidth()),
	backgroundColor : "#474747",
	width:getMsgsButtonWidth()
});
//quests Text
var lblQuests = Titanium.UI.createLabel({
	text:"quests",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font : {fontSize : getButtonTextSize()}
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
	top:0,
	height : "65%",
	right:(5*getHeaderButtonX())+(3*getMsgsButtonWidth())+(getCoinButtonWidth()),
	backgroundColor : "#474747",
	width:getMsgsButtonWidth()
});
//frnds Text
var lblfrnds = Titanium.UI.createLabel({
	text:"frnds",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font : {fontSize : getButtonTextSize()}
});
frndsView.addEventListener("click",function(e){
	var window1 = Titanium.UI.createWindow({
	    url:'friend_interactions.js'
	    //url:'level2.js'
	});
	window1.open();
	removeAllContent();
});
frndsView.add(lblfrnds);
//Inv. View
var invView = Titanium.UI.createView({
	top:0,
	height : "65%",
	right:(6*getHeaderButtonX())+(4*getMsgsButtonWidth())+(getCoinButtonWidth()),
	backgroundColor : "#474747",
	width:getMsgsButtonWidth()
});
//inv. Text
var lblInv = Titanium.UI.createLabel({
	text:"inv.",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font : {fontSize : getButtonTextSize()}
});

invView.add(lblInv);
invView.addEventListener("click",function(e){
	var inventory_win = Titanium.UI.createWindow({
	    url:'inventory.js'
	    //url:'level2.js'
	});
	inventory_win.open();
	removeAllContent();
});
//Status View
var statusView = Titanium.UI.createView({
	top:0,
	height : "100%",
	right:(7*getHeaderButtonX())+(5*getMsgsButtonWidth())+(getCoinButtonWidth()),
	backgroundColor : "#474747",
	width:getMsgsButtonWidth()
});
//Status Text
var lblStatus = Titanium.UI.createLabel({
	text:"status",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font : {fontSize : getButtonTextSize()}
});

statusView.add(lblStatus);

headerRowView.add(questsView);
headerRowView.add(frndsView);
headerRowView.add(invView);
headerRowView.add(statusView);
headerRowView.add(leadrView);
headerRowView.add(msgsView);
headerRowView.add(coinView);
/**************************************************************************************/
/*********************************HEADER COMPLETED*************************************/
/**************************************************************************************/

//Group Status View
var groupStatusView = Titanium.UI.createView({
	top:4*getHeaderButtonY()+getCoinButtonWidth(),
	height : (getHeaderHeight()*3/2),
	backgroundColor : "#999999",
	width:(winWidth*95/100)
});
//Other Avatar Icon
var otherAvatarImage = Titanium.UI.createImageView({
	image:"images/other_avatar.png",
	right : getHeaderButtonY()/2,
	top : getHeaderButtonY()/2,
	height : getAvatarHeight(),
	width : getAvatarWidth()
	//left:"10%"
});
//My Avatar Icon
var myAvatarImage = Titanium.UI.createImageView({
	image:"images/my_avatar.png",
	right : getHeaderButtonY()+getAvatarWidth(),
	top : getHeaderButtonY()/2,
	height : getAvatarHeight(),
	width : getAvatarWidth()
	//left:"10%"
});

//groupStatusView
var avatarIconBottomView = Titanium.UI.createView({
	right : 0,
	bottom : 0,
	height : (getHeaderHeight()*3/2)-getAvatarHeight()-(getHeaderButtonY()/2),
	width : getHeaderButtonY()+(2*getAvatarWidth())
	//backgroundColor : "#00f850"
	//left:"10%"
});
//Group Status Text 
var lblGroupStatusText = Titanium.UI.createLabel({
	text:"Group Status",
	font : {fontSize : getButtonTextSize()},
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
});
avatarIconBottomView.add(lblGroupStatusText);
//nameOfCharacterView
var nameOfCharacterView = Titanium.UI.createView({
	left : 0,
	top : 0,
	height : (getHeaderHeight()*3/2)-getAvatarHeight()-(getHeaderButtonY()/2),
	width : (winWidth*95/100)-(getHeaderButtonY()+(2*getAvatarWidth()))
});
//lblNameOfCharacter 
var lblNameOfCharacter = Titanium.UI.createLabel({
	text:Ti.App.GLBL_name,
	font : {fontSize : getButtonTextSize()+2},
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
});
nameOfCharacterView.add(lblNameOfCharacter);

//xpFuelView
var xpFuelView = Titanium.UI.createView({
	left : getHeaderButtonY()*3,
	top : (getHeaderButtonY())+(getHeaderHeight()*3/2)-getAvatarHeight()-(getHeaderButtonY()/2),
	height : (getHeaderButtonY()*2),
	width : (winWidth*95/100)-(getHeaderButtonY()+(2*getAvatarWidth()))-((getHeaderHeight()*3/2)-getAvatarHeight()-(getHeaderButtonY()/2)), //getHeaderButtonY()+(2*getAvatarWidth())
	backgroundImage : "images/xp_fuel_63.png"
	//left:"10%"
});

//energyFuelView
var energyFuelView = Titanium.UI.createView({
	left : getHeaderButtonY()*3,
	top : (getHeaderButtonY())+(getHeaderHeight()*3/2)-getAvatarHeight()-(getHeaderButtonY()/2)+((getHeaderButtonY()*2))+(getHeaderButtonY()),
	height : (getHeaderButtonY()*2),
	width : (winWidth*95/100)-(getHeaderButtonY()+(2*getAvatarWidth()))-((getHeaderHeight()*3/2)-getAvatarHeight()-(getHeaderButtonY()/2)),
	backgroundImage : "images/energy_fuel.png"
	//left:"10%"
});

//groupStatusLastRow
var groupStatusLastRow = Titanium.UI.createView({
	left : getHeaderButtonY()*3,
	top : (4*getHeaderButtonY())+(getHeaderHeight()*3/2)-getAvatarHeight()-(getHeaderButtonY()/2)+((getHeaderButtonY()*2))+(getHeaderButtonY()),
	width : (winWidth*95/100)-(getHeaderButtonY()+(2*getAvatarWidth()))-((getHeaderHeight()*3/2)-getAvatarHeight()-(getHeaderButtonY()/2))
});

//firendsIcon
var firendsIconImage = Titanium.UI.createImageView({
	image:"images/friends_icon.png",
	width : getFirendsIconWidth(),
	height : getFirendsIconheight(),
	left : 0,
	top : 0
});
groupStatusLastRow.add(firendsIconImage);

//numberOfFriends
var numberOfFriends = Titanium.UI.createLabel({
	left : getFirendsIconWidth()+getHeaderButtonY(),
	font : {fontSize : getButtonTextSize()-4},
	color : "#FFFFFF",
	text : "32 friends"
});

groupStatusLastRow.add(numberOfFriends);

//completedRequests
var completedRequests = Titanium.UI.createLabel({
	font : {fontSize : getCompletedRequestsFontSize()},
	color : "#FFFFFF",
	right : 0,
	bottom : 0,
	text : "75 requests completed"
});

groupStatusLastRow.add(completedRequests);

//numberOfDays
var numberOfDays = Titanium.UI.createLabel({
	font : {fontSize : getCompletedRequestsFontSize()},
	color : "#FFFFFF",
	right : 0,
	top : 0,
	text : "45 days,"
});

groupStatusLastRow.add(numberOfDays);

//characterPointsView
var characterPointsView = Titanium.UI.createView({
	left : (winWidth*2/100),
	top : (4*getHeaderButtonY()+getCoinButtonWidth())+(getHeaderHeight()*3/2)-getAvatarHeight()-(getHeaderButtonY()),
	height : getCharPointsHeight(),
	width : getCharPointsWidth(),
	zIndex : 100
});

//characterPointsImage
var characterPointsImage = Titanium.UI.createImageView({
	image:"images/character_points.png",
	height : "100%",
	width : "100%",
	//left:"10%"
});
//lblCharacterPoints 
var lblCharacterPoints = Titanium.UI.createLabel({
	text : "4",
	font : {fontSize : getButtonTextSize()+4},
	color : "#FFFFFF",
	zIndex : 200,
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
characterPointsImage.add(lblCharacterPoints);
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
	top:5*getHeaderButtonY()+getCoinButtonWidth()+(getHeaderHeight()*3/2),
	height : getHeaderHeight(),
	width:(winWidth*95/100)
});

//levelStatusView
var levelStatusView = Titanium.UI.createView({
	top:0,
	left : 0,
	height : getHeaderHeight(),
	width:(winWidth*30/100)
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
	width:"95%"
});
levelStatusView.add(upLevelStatus);

//lblUpLevelStatus
var lblUpLevelStatus = Titanium.UI.createLabel({
	text : "15___ to next LVL",
	font : {fontSize : getButtonTextSize()},
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});

upLevelStatus.add(lblUpLevelStatus);

//downLevelStatus
var downLevelStatus = Titanium.UI.createView({
	bottom:0,
	left : 0,
	height : "43%",
	backgroundColor : "#b3b3b3",
	borderColor : "#474747",
	borderWidth : 1,
	width:"95%"
});
levelStatusView.add(downLevelStatus);

//lblDownLevelStatus
var lblDownLevelStatus = Titanium.UI.createLabel({
	text : "12___ to next LVL",
	font : {fontSize : getButtonTextSize()},
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
downLevelStatus.add(lblDownLevelStatus);
upLevelStatus.add(lblUpLevelStatus);


//currentStatusView
var currentStatusView = Titanium.UI.createView({
	right:0,
	top : 0,
	height : getHeaderHeight(),
	width:(winWidth*65/100),
	borderColor : "#474747",
	borderWidth : 1	
});

levelAndCurrentStatusView.add(currentStatusView);

//lblCurrentStatus
var lblCurrentStatus = Titanium.UI.createLabel({
	text : "This is where my current status message goes",
	font : {fontSize : getButtonTextSize()},
	color : "#000000",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
currentStatusView.add(lblCurrentStatus);

/**************************************************************************************/
/*********************************CURRENT STATUS COMPLETED*****************************/
/**************************************************************************************/

//characterView
var armedCharacterPlaceholderView = Titanium.UI.createView({
	top : 6 * getHeaderButtonY() + getCoinButtonWidth() + (getHeaderHeight() * 3 / 2) + getHeaderHeight(),
	height : winHeight-(6*getHeaderButtonY()+getCoinButtonWidth()+(getHeaderHeight()*3/2)+getHeaderHeight())-(2*getHeaderHeight()),
	zIndex : 100,
	width:(winWidth*50/100),//width : getImageWidth(Ti.App.GLBL_gender),
	left : (winWidth * 2.5 / 100)
});



//characterView
var armedCharacterView = Titanium.UI.createView({
	top : 0,//6 * getHeaderButtonY() + getCoinButtonWidth() + (getHeaderHeight() * 3 / 2) + getHeaderHeight(),
	height : getImageHeight(Ti.App.GLBL_gender),
	zIndex : 100,
	width : getImageWidth(Ti.App.GLBL_gender),
	left : 0,//(winWidth * 2.5 / 100)
});
armedCharacterPlaceholderView.add(armedCharacterView);
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
	visible : getCraftItemVisibility("flowerImage"),// false,
	image : 'images/P_flower_gray.png',
	width : 48,
	height : 30,
	top : 165,
	left : 100,
	zIndex : 20
});
armedCharacterView.add(flowerImage);
//chestRedArmorImage
var chestRedArmorImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("chestRedArmorImage"),//false & Ti.App.GLBL_items_visible[0],
	image : 'images/k_chestplate_bad_crop_'+Ti.App.GLBL_skin_color +'.png',
	width : 95,
	height : 101,
	top : 50,
	left : 5,
	zIndex : 20
});
armedCharacterView.add(chestRedArmorImage);

//footRedArmorImage
var footRedArmorImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("footRedArmorImage"),//Ti.App.GLBL_items_visible[1],
	image : 'images/K_Feet_bad_crop_'+Ti.App.GLBL_skin_color +'.png',
	width : 88,
	height : 104,
	bottom : 0,
	left : 30,
	zIndex : 20
});
armedCharacterView.add(footRedArmorImage);

//glovesArmorImage
var glovesArmorImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("glovesArmorImage"),//Ti.App.GLBL_items_visible[2],
	image : 'images/K_Gloves_bad_crop_'+Ti.App.GLBL_skin_color +'.png',
	width : 60,
	height : 47,
	top : 70,
	left : 55,
	zIndex : 20
});
armedCharacterView.add(glovesArmorImage);

//helmetArmorImage
var helmetArmorImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("helmetArmorImage"),//Ti.App.GLBL_items_visible[3],
	image : 'images/K_Helmet_bad_crop_'+Ti.App.GLBL_skin_color +'.png',
	width : 63,
	height : 63,
	top : 9,
	left : 20,
	zIndex : 25
});
armedCharacterView.add(helmetArmorImage);

//legsArmorImage
var legsArmorImage = Titanium.UI.createImageView({
	visible : getCraftItemVisibility("legsArmorImage"),//Ti.App.GLBL_items_visible[4],
	image : 'images/K_Legs_bad_crop_'+Ti.App.GLBL_skin_color +'.png',
	width : 64,
	height : 74,
	top : 140,
	left : 55,
	zIndex : 25
});
armedCharacterView.add(legsArmorImage);




///////////////////////////////////////////
///////////////////////////////////////////
//armedHeadView
var armedHeadView = Titanium.UI.createView({
	right : 0,
	top : getHeaderButtonY(),
	borderRadius : getBorderRadius(),
	borderWidth : getBorderWidth(),
	borderColor : "#6a6a6a",
	height : getIconWidthHeight(),
	width : getIconWidthHeight()
});
armedHeadView.addEventListener("click", function(e){
	setZoomPicture("Head");
	setZoomPictureName("head");
	setZoomPictureDesc("Description and features of head");	
});
armedCharacterPlaceholderView.add(armedHeadView);

//armedHeadIcon
var armedHeadIcon = Titanium.UI.createImageView({
	image:"images/arm_head_icon.png",
	top : 0,
	height : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2,
	width : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2
});

armedHeadView.add(armedHeadIcon);

//lblArmedHeadIcon
var lblArmedHeadIcon = Titanium.UI.createLabel({
	text : "Head",
	bottom : 0,
	font : {fontSize : getCharacterPartsTextSize()},
	color : "#6a6a6a",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
armedHeadView.add(lblArmedHeadIcon);

///////////////////////////////////////////
///////////////////////////////////////////
//armedChestView
var armedChestView = Titanium.UI.createView({
	right : 0,
	top : getIconWidthHeight()+2*getHeaderButtonY(),
	borderRadius : getBorderRadius(),
	borderWidth : getBorderWidth(),
	borderColor : "#6a6a6a",
	height : getIconWidthHeight(),
	width : getIconWidthHeight()
});
armedChestView.addEventListener("click", function(e){
	setZoomPicture("Chest");
	setZoomPictureName("chest");
	setZoomPictureDesc("Description and features of chest");	
});
armedCharacterPlaceholderView.add(armedChestView);

//armedChestIcon
var armedChestIcon = Titanium.UI.createImageView({
	image:"images/arm_chest_icon.png",
	top : 0,
	height : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2,
	width : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2
});

armedChestView.add(armedChestIcon);

//lblArmedChestIcon
var lblArmedChestIcon = Titanium.UI.createLabel({
	text : "Chest",
	bottom : 0,
	font : {fontSize : getCharacterPartsTextSize()},
	color : "#6a6a6a",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
armedChestView.add(lblArmedChestIcon);

///////////////////////////////////////////
///////////////////////////////////////////

//armedHandsView
var armedHandsView = Titanium.UI.createView({
	right : 0,
	top : 2*(getIconWidthHeight())+(3*getHeaderButtonY()),
	borderRadius : getBorderRadius(),
	borderWidth : getBorderWidth(),
	borderColor : "#6a6a6a",
	height : getIconWidthHeight(),
	width : getIconWidthHeight()
});
armedHandsView.addEventListener("click", function(e){
	setZoomPicture("hands");
	setZoomPictureName("Hands");
	setZoomPictureDesc("Description and features of hands");	
});
armedCharacterPlaceholderView.add(armedHandsView);

//armedHandsIcon
var armedHandsIcon = Titanium.UI.createImageView({
	image:"images/arm_hands_icon.png",
	top : 0,
	height : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2,
	width : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2
});

armedHandsView.add(armedHandsIcon);

//lblArmedHandsIcon
var lblArmedHandsIcon = Titanium.UI.createLabel({
	text : "Hands",
	bottom : 0,
	font : {fontSize : getCharacterPartsTextSize()},
	color : "#6a6a6a",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
armedHandsView.add(lblArmedHandsIcon);

///////////////////////////////////////////
///////////////////////////////////////////

//armedLegsView
var armedLegsView = Titanium.UI.createView({
	right : 0,
	top : 3*(getIconWidthHeight())+(4*getHeaderButtonY()),
	borderRadius : getBorderRadius(),
	borderWidth : getBorderWidth(),
	borderColor : "#6a6a6a",
	height : getIconWidthHeight(),
	width : getIconWidthHeight()
});
armedLegsView.addEventListener("click", function(e){
	setZoomPicture("legs");
	setZoomPictureName("Legs");
	setZoomPictureDesc("Description and features of legs");	
});
armedCharacterPlaceholderView.add(armedLegsView);

//armedLegsIcon
var armedLegsIcon = Titanium.UI.createImageView({
	image:"images/arm_legs_icon.png",
	top : 0,
	height : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2,
	width : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2
});

armedLegsView.add(armedLegsIcon);

//lblArmedHandsIcon
var lblArmedLegsIcon = Titanium.UI.createLabel({
	text : "Hands",
	bottom : 0,
	font : {fontSize : getCharacterPartsTextSize()},
	color : "#6a6a6a",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
armedLegsView.add(lblArmedLegsIcon);

///////////////////////////////////////////
///////////////////////////////////////////

//armedFootsView
var armedFootsView = Titanium.UI.createView({
	right : 0,
	top : 4*(getIconWidthHeight())+(6*getHeaderButtonY()),
	borderRadius : getBorderRadius(),
	borderWidth : getBorderWidth(),
	borderColor : "#6a6a6a",
	height : getIconWidthHeight(),
	width : getIconWidthHeight()
});
armedFootsView.addEventListener("click", function(e){
	setZoomPicture("foots");
	setZoomPictureName("Foots");
	setZoomPictureDesc("Description and features of foots");	
});
armedCharacterPlaceholderView.add(armedFootsView);

//armedFootsIcon
var armedFootsIcon = Titanium.UI.createImageView({
	image:"images/arm_foots_icon.png",
	top : 0,
	height : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2,
	width : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2
});

armedFootsView.add(armedFootsIcon);

//lblArmedFootsIcon
var lblArmedFootsIcon = Titanium.UI.createLabel({
	text : "Foots",
	bottom : 0,
	font : {fontSize : getCharacterPartsTextSize()},
	color : "#6a6a6a",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
armedFootsView.add(lblArmedFootsIcon);

///////////////////////////////////////////
///////////////////////////////////////////
//armedWeaponView
var armedWeaponView = Titanium.UI.createView({
	right : 0,
	top : 5*(getIconWidthHeight())+(7*getHeaderButtonY()),
	borderRadius : getBorderRadius(),
	borderWidth : getBorderWidth(),
	borderColor : "#6a6a6a",
	height : getIconWidthHeight(),
	width : getIconWidthHeight()
});
armedWeaponView.addEventListener("click", function(e){
	setZoomPicture("weapon");
	setZoomPictureName("Weapon");
	setZoomPictureDesc("Description and features of weapon");	
});
armedCharacterPlaceholderView.add(armedWeaponView);

//armedWeaponIcon
var armedWeaponIcon = Titanium.UI.createImageView({
	image:"images/arm_weapon_icon.png",
	top : 0,
	height : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2,
	width : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2
});

armedWeaponView.add(armedWeaponIcon);

//lblArmedWeaponIcon
var lblArmedWeaponIcon = Titanium.UI.createLabel({
	text : "Weapon",
	bottom : 0,
	font : {fontSize : getCharacterPartsTextSize()},
	color : "#6a6a6a",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
armedWeaponView.add(lblArmedWeaponIcon);

///////////////////////////////////////////
///////////////////////////////////////////

//armedMagicView
var armedMagicView = Titanium.UI.createView({
	right : getIconWidthHeight()+getHeaderButtonY(),
	top : 5*(getIconWidthHeight())+(7*getHeaderButtonY()),
	borderRadius : getBorderRadius(),
	borderWidth : getBorderWidth(),
	borderColor : "#6a6a6a",
	height : getIconWidthHeight(),
	width : getIconWidthHeight()
});
armedMagicView.addEventListener("click", function(e){
	setZoomPicture("magic");
	setZoomPictureName("Magic");
	setZoomPictureDesc("Description and features of magic");	
});
armedCharacterPlaceholderView.add(armedMagicView);

//armedMagicIcon
var armedMagicIcon = Titanium.UI.createImageView({
	image:"images/arm_magic_icon.png",
	top : 0,
	height : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2,
	width : getArmedDecorationIconHeight(),//getIconWidthHeight()*3/2
});

armedMagicView.add(armedMagicIcon);

//lblArmedMagicIcon
var lblArmedMagicIcon = Titanium.UI.createLabel({
	text : "Magic",
	bottom : 0,
	font : {fontSize : getCharacterPartsTextSize()},
	color : "#6a6a6a",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
armedMagicView.add(lblArmedMagicIcon);

///////////////////////////////////////////
///////////////////////////////////////////


/**************************************************************************************/
/*********************************ARMOUR DECORATION LEFT SIDE ENDED********************/
/**************************************************************************************/

//armedIconZoomView
var armedIconZoomView = Titanium.UI.createView({
	top:6*getHeaderButtonY()+getCoinButtonWidth()+(getHeaderHeight()*3/2)+getHeaderHeight()+getIconWidthHeight(),
	height : getIconWidthHeight()*4,//winHeight-(6*getHeaderButtonY()+getCoinButtonWidth()+(getHeaderHeight()*3/2)+getHeaderHeight())-(2*getHeaderHeight()),
	zIndex : 100,
	width:(winWidth*45/100)-getHeaderButtonY(),
	right : "2.5%",
	borderRadius : getZoomBorderRadius(),
	borderWidth : getZoomBorderWidth(),
	borderColor : "#6a6a6a"
});

//lblSelectedIconName
var lblSelectedIconName = Titanium.UI.createLabel({
	top : getHeaderButtonY(),
	text : "Hands",
	height : getHeaderHeight()/2,
	bottom : 0,
	font : {fontSize : getSelectedIconNameTextSize()},
	color : "#6a6a6a",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
armedIconZoomView.add(lblSelectedIconName);

//selectedIconImage
var selectedIconImage = Titanium.UI.createImageView({
	image:"images/arm_hands_icon.png",
	top : getHeaderButtonY()+(getHeaderHeight()/2),
	height : getZoomArmedDecorationIconHeight(),//getIconWidthHeight()*3/2,
	width : getZoomArmedDecorationIconWidth(),//getIconWidthHeight()*3/2
});
armedIconZoomView.add(selectedIconImage);

//lblSelectedIconDesc
var lblSelectedIconDesc = Titanium.UI.createLabel({
	top : getHeaderButtonY()+(getHeaderHeight()/2)+getZoomArmedDecorationIconHeight()+getHeaderButtonY(),
	text : "Features and description here...",
	bottom : 0,
	font : {fontSize : getButtonTextSize()},
	color : "#6a6a6a",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
armedIconZoomView.add(lblSelectedIconDesc);


//optionsButton
var optionsButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Options",
	backgroundColor : "#474747",
	font : {fontSize : getButtonTextSize()},
	height : getButtonHeight(),  
	width : getButtonWidth(),
	left : getHeaderButtonY(),
	bottom : getHeaderButtonY(),
	borderRadius : 2,
	zIndex : 100
});
optionsButton.addEventListener("click",function(e){
	var window = Titanium.UI.createWindow({
	    url:'level2.js'
	});
	window.open();removeAllContent();
	window.fireEvent('show_options',{a:'b'});
});

//changeBGButton
var changeBGButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Change BG!",
	backgroundColor : "#474747",
	font : {fontSize : getButtonTextSize()},
	height : getButtonHeight(),  
	width : getButtonWidth(),
	right : getHeaderButtonY(),
	bottom : getHeaderButtonY(),
	borderRadius : 2,
	zIndex : 100
});
changeBGButton.addEventListener("click",function(e){

	var window = Titanium.UI.createWindow({
	    url:'level2.js'
	});
	window.open();
	removeAllContent();
});




//footerShade
var footerShadeView = Titanium.UI.createView({
	bottom : 0,
	height : getHeaderHeight()*3,
	width:"100%",
	backgroundColor : "#d8d8d8",
	zIndex : 0
});

win.add(optionsButton);
win.add(changeBGButton);
win.add(armedIconZoomView);
win.add(armedCharacterPlaceholderView);
win.add(footerShadeView);
win.add(levelAndCurrentStatusView);
win.add(groupStatusView);
win.add(headerRowView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
	    url:'level2.js'
	});
	window.open();
	removeAllContent();
});


win.open();