Ti.include('func_level2.js');

Titanium.UI.currentWindow.addEventListener('show_options', function(e) {
	optionsWindow.visible = true;
});
function removeAllContent() {
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
	customizeHomeHeaderView.remove(lblCustomizeHome);
	customizeHomeHeaderView.remove(customizeHomeCloseIcon);
	customizeHomeView.remove(customizeHomeRow1View);
	colorlblView.remove(lblColor);
	customizeHomeRow2View.remove(diceButton);
	customizeHomeRow2View.remove(colorlblView);
	customizeHomeRow2View.remove(btnColorPlus);
	customizeHomeRow2View.remove(btnColorMinus);
	customizeHomeView.remove(customizeHomeRow2View);
	customizeHomeView.remove(customizeHomeRow3View);
	customizeHomeRow4View.remove(storeButton);
	customizeHomeRow4View.remove(themeslblView);
	customizeHomeRow4View.remove(btnThemesPlus);
	customizeHomeRow4View.remove(btnThemesMinus);
	customizeHomeView.remove(customizeHomeRow4View);
	customizeHomeView.remove(customizeHomeRow5View);
	customizeHomeRow6View.remove(btnDecoMinus);
	customizeHomeRow6View.remove(btnDeco1);
	customizeHomeRow6View.remove(btnDeco2);
	customizeHomeRow6View.remove(btnDeco3);
	customizeHomeRow6View.remove(btnLock);
	customizeHomeRow6View.remove(btnDecoPlus);
	customizeHomeView.remove(customizeHomeRow6View);
	backgroundUpView.remove(armedCharacterView);
	armedCharacterView.remove(armedCharacterImage);
	armedCharacterView.remove(flowerImage);
	armedCharacterView.remove(chestRedArmorImage);
	armedCharacterView.remove(footRedArmorImage);
	armedCharacterView.remove(glovesArmorImage);
	armedCharacterView.remove(helmetArmorImage);
	armedCharacterView.remove(legsArmorImage);
	backgroundView.remove(backgroundDownView);
	backgroundView.remove(backgroundUpView);
	customizeHomeView.remove(customizeHomeHeaderView);
	optionsWindow.remove(header);
	header.remove(optionsCloseButton);
	optionsWindow.remove(reset_game);
	optionsWindow.remove(report_on);
	optionsWindow.remove(notification_on);
	optionsWindow.remove(music_on);
	optionsWindow.remove(sound_on);
	header.remove(optionlbl);
	win.remove(optionsWindow);
	win.remove(optionsView);
	win.remove(customizeHomeView);
	win.remove(headerRowView);
	win.remove(backgroundView);
	win.remove(mainBackgroundView);
	themeslblView.remove(lblThemes);
	mainBackgroundView = null;
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
	backgroundView = null;
	backgroundUpView = null;
	backgroundDownView = null;
	customizeHomeView = null;
	customizeHomeHeaderView = null;
	customizeHomeCloseIcon = null;
	lblCustomizeHome = null;
	customizeHomeRow2View = null;
	btnColorMinus = null;
	colorlblView = null;
	lblColor = null;
	btnColorPlus = null;
	diceButton = null;
	customizeHomeRow3View = null;
	customizeHomeRow4View = null;
	btnThemesMinus = null;
	themeslblView = null;
	lblThemes = null;
	btnThemesPlus = null;
	storeButton = null;
	customizeHomeRow5View = null;
	customizeHomeRow6View = null;
	btnDecoMinus = null;
	btnDeco1 = null;
	btnDeco2 = null;
	btnDeco3 = null;
	btnLock = null;
	btnDecoPlus = null;
	armedCharacterView = null;
	optionsView = null;
	armedCharacterImage = null;
	flowerImage = null;
	chestRedArmorImage = null;
	footRedArmorImage = null;
	glovesArmorImage = null;
	helmetArmorImage = null;
	legsArmorImage = null;
	optionsWindow = null;
	header = null;
	sound_on = null;
	music_on = null;
	notification_on = null;
	report_on = null;
	reset_game = null;
	optionsCloseButton = null;
	optionlbl = null;
	win = null;
}
var winWidth = Ti.Platform.displayCaps.platformWidth;
var winHeight = Ti.Platform.displayCaps.platformHeight;
var win = Titanium.UI.createWindow({
	title : "Customize Home",
	width : '100%',
	navBarHidden : true,
	height : '100%',
	backgroundColor : "#8dc73f",
	exitOnClose : true,
	zIndex : 0,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
win.orientationModes = [Ti.UI.PORTRAIT];
//Background
var mainBackgroundView = Titanium.UI.createView({
	width : "100%",
	left : 0,
	top : 0,
	height : "100%",
	zIndex : 1
	//zIndex : 130
});

//Header view
var headerRowView = Titanium.UI.createView({
	top : getHeaderButtonY(),
	left : 0,
	height : getHeaderHeight(),
	width : "100%",
	zIndex : 2
});

//Coin View
var coinView = Titanium.UI.createView({
	top : 0,
	right : getHeaderButtonX(),
	backgroundColor : "#474747",
	width : getCoinButtonWidth()
});

//Coin Image
var coinImage = Titanium.UI.createImageView({
	image : "images/coin_icon.png",
	height : getCoinHeight(),
	top : getHeaderButtonY()
});
coinView.add(coinImage);

//Coin Text
var lblCoin = Titanium.UI.createLabel({
	text : "250",
	bottom : getCoinTextY(),
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : Ti.App.GLBL_default_font
	}
});
coinView.add(lblCoin);

//Msgs View
var msgsView = Titanium.UI.createView({
	top : 0,
	height : "65%",
	right : (2 * getHeaderButtonX()) + getCoinButtonWidth(),
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
		fontFamily : Ti.App.GLBL_default_font
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
	right : (3 * getHeaderButtonX()) + getMsgsButtonWidth() + (getCoinButtonWidth()),
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
		fontFamily : Ti.App.GLBL_default_font
	}
});

leadrView.add(lblLeadr);

//quests View
var questsView = Titanium.UI.createView({
	top : 0,
	height : "65%",
	right : (4 * getHeaderButtonX()) + (2 * getMsgsButtonWidth()) + (getCoinButtonWidth()),
	backgroundColor : "#474747",
	width : getMsgsButtonWidth()
});
//quests Text
var lblQuests = Titanium.UI.createLabel({
	text : "quests!",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : Ti.App.GLBL_default_font
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
	right : (5 * getHeaderButtonX()) + (3 * getMsgsButtonWidth()) + (getCoinButtonWidth()),
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
		fontFamily : Ti.App.GLBL_default_font
	}
});

frndsView.add(lblfrnds);
frndsView.addEventListener("click", function(e) {
	var window1 = Titanium.UI.createWindow({
		url : 'friend_interactions.js'
		//url:'level2.js'
	});
	window1.open();
	removeAllContent();
});
//Inv. View
var invView = Titanium.UI.createView({
	top : 0,
	height : "65%",
	right : (6 * getHeaderButtonX()) + (4 * getMsgsButtonWidth()) + (getCoinButtonWidth()),
	backgroundColor : "#474747",
	width : getMsgsButtonWidth()
});
invView.addEventListener("click", function(e) {
	var inventory_win = Titanium.UI.createWindow({
		url : 'inventory.js'
		//url:'level2.js'
	});
	inventory_win.open();
	removeAllContent();
});
//inv. Text
var lblInv = Titanium.UI.createLabel({
	text : "inv.",
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : Ti.App.GLBL_default_font
	}
});

invView.add(lblInv);
//Status View
var statusView = Titanium.UI.createView({
	top : 0,
	height : "65%",
	right : (7 * getHeaderButtonX()) + (5 * getMsgsButtonWidth()) + (getCoinButtonWidth()),
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
		fontFamily : Ti.App.GLBL_default_font
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

//Main contatiner
var backgroundView = Titanium.UI.createView({
	top : getHeaderButtonY() + getHeaderHeight(),
	height : winHeight - (getHeaderButtonY() + getHeaderHeight()),
	width : "100%",
	zIndex : 3
});

//Main-Top contatiner
var backgroundUpView = Titanium.UI.createView({
	top : 0,
	height : winHeight - (getHeaderButtonY() + getHeaderHeight()) - ((winHeight / 100) * 40),
	width : "100%"
});

//Main-Bottom container
var backgroundDownView = Titanium.UI.createView({
	height : getBottomPortionHeight(), //((winHeight/100)*30),
	bottom : 0,
	width : "100%",
	backgroundColor : "#474747",
	opacity : "0.5"
});

//customize home View
var customizeHomeView = Titanium.UI.createView({
	height : getCustomizeOptionsHeight(), //((winHeight/100)*22),
	left : "20%",
	width : "75%",
	bottom : 2 * getHeaderButtonY(),
	backgroundColor : "#666666",
	zIndex : 100,
	text : "Options",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
//customize home View
var customizeHomeHeaderView = Titanium.UI.createView({
	height : getHeaderHeight() / 2, // ((winHeight/100)*20),
	width : "100%",
	top : 0,
	//backgroundColor : "#FFFFFF",
	zIndex : 110,
	text : "Options",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
var customizeHomeCloseIcon = Titanium.UI.createImageView({
	image : "images/customize_home_cross.png",
	height : "100%", //getCrossHeight(),
	//width : getCrossWidth(),
	right : 0,
	textAlign : "center"
});

customizeHomeCloseIcon.addEventListener("click", function(e) {
	//backgroundDownView.opacity = 0;
	//customizeHomeView.opacity = 0;

});

//Customize Home label
var lblCustomizeHome = Titanium.UI.createLabel({
	text : "Customize Home",
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : Ti.App.GLBL_default_font
	},
	color : "#FFFFFF",
});
customizeHomeHeaderView.add(lblCustomizeHome);
customizeHomeHeaderView.add(customizeHomeCloseIcon);

//customize home row1
var customizeHomeRow1View = Titanium.UI.createView({
	height : getHeaderHeight() / 6, // ((winHeight/100)*20),
	width : "100%",
	top : (getHeaderHeight() / 2),
	//backgroundColor : "#CCCCCC",
	zIndex : 120,
	text : "Options",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
customizeHomeView.add(customizeHomeRow1View);

//customize home row2
var customizeHomeRow2View = Titanium.UI.createView({
	height : getHeaderHeight() / 2, // ((winHeight/100)*20),
	width : "100%",
	top : (getHeaderHeight() / 6) + (getHeaderHeight() / 2),
	//backgroundColor : "#FFFFFF",
	zIndex : 130,
	text : "Options",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
//btnColorMinus Button
var btnColorMinus = Titanium.UI.createButton({
	backgroundImage : "images/left_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	left : (getHeaderButtonX()),
	//id : "MALE",
	borderRadius : 2
});
btnColorMinus.addEventListener("click", function(e) {
	var color = getColorCode("minus");
	//headerRowView.backgroundColor = color;
	//backgroundView.backgroundColor = color;
	mainBackgroundView.opacity = '1';
	mainBackgroundView.backgroundColor = color;
	//win.backgroundColor = color;
	lblColor.text = getColorName();
});

//Color label view
var colorlblView = Titanium.UI.createView({
	width : getMsgsButtonWidth() * 2,
	left : (getHeaderButtonX()) + getRightArrowImageWidth(),
	//zIndex : 130
});

//Home Color
var lblColor = Titanium.UI.createLabel({
	text : getColorName(),
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : Ti.App.GLBL_default_font
	},
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,

});
//btnColorPlus Button
var btnColorPlus = Titanium.UI.createButton({
	backgroundImage : "images/right_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	left : (getHeaderButtonX()) + getRightArrowImageWidth() + (getMsgsButtonWidth() * 2),
	//id : "MALE",
	borderRadius : 2
});
colorlblView.add(lblColor);
btnColorPlus.addEventListener("click", function(e) {
	var color = getColorCode("plus");
	//headerRowView.backgroundColor = color;
	//backgroundView.backgroundColor = color;
	mainBackgroundView.opacity = '1';
	mainBackgroundView.backgroundColor = color;
	//win.backgroundColor = color;
	lblColor.text = getColorName();
});

//Dice Button
var diceButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	backgroundImage : "images/btn_dice.png",
	width : getButtonWidth(),
	right : (getHeaderButtonX()),
	//id : "dice",
	borderRadius : 2
});

customizeHomeRow2View.add(diceButton);
customizeHomeRow2View.add(colorlblView);
customizeHomeRow2View.add(btnColorPlus);
customizeHomeRow2View.add(btnColorMinus);
customizeHomeView.add(customizeHomeRow2View);

//customize home row3
var customizeHomeRow3View = Titanium.UI.createView({
	height : getHeaderHeight() / 6, // ((winHeight/100)*20),
	width : "100%",
	top : (getHeaderHeight()) + (getHeaderHeight() / 6),
	//backgroundColor : "#CCCCCC",
	zIndex : 130,
	text : "Options",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
customizeHomeView.add(customizeHomeRow3View);

//customize home row4
var customizeHomeRow4View = Titanium.UI.createView({
	height : getHeaderHeight() / 2, // ((winHeight/100)*20),
	width : "100%",
	top : (getHeaderHeight()) + 2 * (getHeaderHeight() / 6),
	//backgroundColor : "#FFFFFF",
	zIndex : 140,
	text : "Options",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});

//btnThemesMinus Button
var btnThemesMinus = Titanium.UI.createButton({
	backgroundImage : "images/left_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	left : (getHeaderButtonX()),
	//id : "MALE",
	borderRadius : 2
});
btnThemesMinus.addEventListener("click", function(e) {
	var image = getBGPath("minus");
	//headerRowView.backgroundColor = color;
	//backgroundView.backgroundColor = color;
	lblThemes.text = getBGName();
	win.backgroundImage = image;
	mainBackgroundView.opacity = '0';
	themeslblView.text = getBGName();
});

//Themes label view
var themeslblView = Titanium.UI.createView({
	width : getMsgsButtonWidth() * 2,
	left : (getHeaderButtonX()) + getRightArrowImageWidth(),
	//zIndex : 130
});

//Home Themes
var lblThemes = Titanium.UI.createLabel({
	text : "Themes",
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : Ti.App.GLBL_default_font
	},
	color : "#FFFFFF",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
});
//btnThemesPlus Button
var btnThemesPlus = Titanium.UI.createButton({
	backgroundImage : "images/right_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	left : (getHeaderButtonX()) + getRightArrowImageWidth() + (getMsgsButtonWidth() * 2),
	//id : "MALE",
	borderRadius : 2
});
btnThemesPlus.addEventListener("click", function(e) {
	var image = getBGPath("plus");
	//headerRowView.backgroundColor = color;
	//backgroundView.backgroundColor = color;
	win.backgroundImage = image;
	lblThemes.text = getBGName();
	mainBackgroundView.opacity = '0';
	themeslblView.text = getBGName();
});
themeslblView.add(lblThemes);

//Store Button
var storeButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "Store",
	backgroundColor : "#474747",
	height : "100%",
	width : getButtonWidth(),
	right : (getHeaderButtonX()),
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : Ti.App.GLBL_default_font
	},
	borderRadius : 2
});
storeButton.addEventListener("click", function(e) {
	//alert(Ti.App.GLBL_gender);
	var window = Titanium.UI.createWindow({
		url : 'store_home.js'
	});
	//window.open();
	//removeAllContent();
	//win.close();
});
customizeHomeRow4View.add(storeButton);
customizeHomeRow4View.add(themeslblView);
customizeHomeRow4View.add(btnThemesPlus);
customizeHomeRow4View.add(btnThemesMinus);
customizeHomeView.add(customizeHomeRow4View);

//customize home row5
var customizeHomeRow5View = Titanium.UI.createView({
	height : getHeaderHeight() / 6, // ((winHeight/100)*20),
	width : "100%",
	top : (getHeaderHeight()) + 2 * (getHeaderHeight() / 6) + (getHeaderHeight() / 2),
	//backgroundColor : "#CCCCCC",
	zIndex : 150,
	text : "Options",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
customizeHomeView.add(customizeHomeRow5View);

//customize home row6
var customizeHomeRow6View = Titanium.UI.createView({
	height : getHeaderHeight() / 2, // ((winHeight/100)*20),
	width : "100%",
	top : (getHeaderHeight()) + 3 * (getHeaderHeight() / 6) + (getHeaderHeight() / 2),
	//backgroundColor : "#FFFFFF",
	zIndex : 160,
	text : "Options",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
//btnDecoMinus Button
var btnDecoMinus = Titanium.UI.createButton({
	backgroundImage : "images/left_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	left : (getHeaderButtonX()),
	//id : "MALE",
	borderRadius : 2
});

//btnDeco1 Button
var btnDeco1 = Titanium.UI.createButton({
	backgroundImage : "images/deco_1.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	left : (2 * getHeaderButtonX()) + getRightArrowImageWidth(),
	//id : "MALE",
	borderRadius : 2
});
btnDeco1.addEventListener("click", function(e) {
	mainBackgroundView.opacity = '0';
	mainBackgroundView.opacity = '0';
	//headerRowView.backgroundColor = "#8dc73f",//#8dc73f','#dd0a0a','#0a22dd
	//backgroundView.backgroundColor	= "#8dc73f"//#8dc73f','#dd0a0a','#0a22dd
});

//btnDeco2 Button
var btnDeco2 = Titanium.UI.createButton({
	backgroundImage : "images/deco_2.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	left : (3 * getHeaderButtonX()) + (2 * getRightArrowImageWidth()),
	//id : "MALE",
	borderRadius : 2
});
btnDeco2.addEventListener("click", function(e) {
	mainBackgroundView.opacity = '0.5';
	mainBackgroundView.backgroundColor = "#8dc73f"//#8dc73f','#dd0a0a','#0a22dd
});

//btnDeco3 Button
var btnDeco3 = Titanium.UI.createButton({
	backgroundImage : "images/deco_3.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	left : (4 * getHeaderButtonX()) + (3 * getRightArrowImageWidth()),
	//id : "MALE",
	borderRadius : 2
});
btnDeco3.addEventListener("click", function(e) {
	mainBackgroundView.opacity = '0.5';
	mainBackgroundView.backgroundColor = "#dd0a0a";
	//#8dc73f','#dd0a0a','#0a22dd
});

//btnLock Button
var btnLock = Titanium.UI.createButton({
	backgroundImage : "images/lock_img.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	left : (5 * getHeaderButtonX()) + (4 * getRightArrowImageWidth()),
	//id : "MALE",
	borderRadius : 2
});

//btnDecoPlus Button
var btnDecoPlus = Titanium.UI.createButton({
	backgroundImage : "images/right_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	left : (6 * getHeaderButtonX()) + (5 * getRightArrowImageWidth()),
	//id : "MALE",
	borderRadius : 2
});

customizeHomeRow6View.add(btnDecoMinus);
customizeHomeRow6View.add(btnDeco1);
customizeHomeRow6View.add(btnDeco2);
customizeHomeRow6View.add(btnDeco3);
customizeHomeRow6View.add(btnLock);
customizeHomeRow6View.add(btnDecoPlus);
customizeHomeView.add(customizeHomeRow6View);

//Options View
var optionsView = Titanium.UI.createButton({
	color : "#FFFFFF",
	backgroundColor : "#474747",
	height : (getHeaderHeight() / 100) * 70,
	width : "18%",
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : Ti.App.GLBL_default_font
	},
	bottom : 2 * getHeaderButtonY(),
	left : getHeaderButtonY(),
	title : "Options",
	zIndex : 100
});
optionsView.addEventListener("click", function(e) {
	optionsWindow.visible = true;
	//backgroundDownView.opacity = 0.5;
	//customizeHomeView.opacity = 1;
});

//characterView
var armedCharacterView = Titanium.UI.createView({
	top : getHeaderHeight(), //6 * getHeaderButtonY() + getCoinButtonWidth() + (getHeaderHeight() * 3 / 2) + getHeaderHeight(),
	height : getImageHeight(Ti.App.GLBL_gender),
	zIndex : 100,
	width : getImageWidth(Ti.App.GLBL_gender),
	left : getHeaderHeight(),//(winWidth * 2.5 / 100)
});
backgroundUpView.add(armedCharacterView);
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
	zIndex : 20
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

//backgroundUpView.add(characterImage);
backgroundView.add(backgroundDownView);
backgroundView.add(backgroundUpView);

customizeHomeView.add(customizeHomeHeaderView);

//Options
var optionsWindow = Titanium.UI.createView({
	visible : false,
	width : "100%",
	height : "100%",
	backgroundColor : "#000000",
	opacity : "0.7",
	zIndex : 600
});
var header = Titanium.UI.createView({
	top : 0,
	height : getHeaderHeight(),
	width : "100%",
	backgroundColor : "#FFFFFF",
	opacity : "1"
});
optionsWindow.add(header);
var sound_on = Titanium.UI.createTextField({
	top : 3 * getHeaderHeight(),
	width : "80%",
	hintText : "Sound on",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
var music_on = Titanium.UI.createTextField({
	width : "80%",
	top : 4 * getHeaderHeight(),
	hintText : "Music on",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
var notification_on = Titanium.UI.createTextField({
	width : "80%",
	top : 5 * getHeaderHeight(),
	hintText : "Notification on",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
var report_on = Titanium.UI.createTextField({
	width : "80%",
	top : 6 * getHeaderHeight(),
	hintText : "Report Abuse",
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});

var reset_game = Titanium.UI.createButton({
	top : 7 * getHeaderHeight(),
	color : "#FFFFFF",
	backgroundColor : "#474747",
	height : getHeaderHeight(),
	title : "Reset Game",
	width : "80%",
	borderRadius : 2,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});

var optionsCloseButton = Titanium.UI.createImageView({
	image : "images/customize_home_cross.png",
	height : "100%", //getCrossHeight(),
	//width : getCrossWidth(),
	right : 0,
	textAlign : "center"
});
optionsCloseButton.addEventListener("click", function(e) {
	optionsWindow.visible = false;
});

header.add(optionsCloseButton);
optionsWindow.add(reset_game);
optionsWindow.add(report_on);
optionsWindow.add(notification_on);
optionsWindow.add(music_on);
optionsWindow.add(sound_on);
var optionlbl = Titanium.UI.createLabel({
	text : "Options",
	color : "#000000"
});
header.add(optionlbl);

win.add(optionsWindow);
win.add(optionsView);
win.add(customizeHomeView);
win.add(headerRowView);
win.add(backgroundView);
win.add(mainBackgroundView);

win.open(); 