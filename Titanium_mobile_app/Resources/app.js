//Ti.App.GLBL_
Ti.include('func_app.js');
//ratioCalculation();
//	var originalWinWidth = $(window).width();

var osname = Ti.Platform.osname;
var os = function(/*Object*/map) {
	var def = map.def || null;
	//default function or value
	if (map[osname]) {
		if ( typeof map[osname] == 'function') {
			return map[osname]();
		} else {
			return map[osname];
		}
	} else {
		if ( typeof def == 'function') {
			return def();
		} else {
			return def;
		}
	}
};

var win = Titanium.UI.createWindow({
	title : "Using the Image View",
	width : '100%',
	navBarHidden : true,
	height : '100%',
	backgroundColor : "#F1F2D4",
	exitOnClose : true
});
win.orientationModes = [Ti.UI.PORTRAIT];

//Header view

var headerRowView = Titanium.UI.createView({
	height : inch(0.25),
	width : "100%",
	top : 0,
	left : 0,
	backgroundColor : "#000000",

});
//Textview for header description
var header = Titanium.UI.createLabel({
	text : "CHOOSE YOUR CLASS",
	color : "#FFFFFF",
	font : {
		fontSize : 15,
		fontFamily : Ti.App.GLBL_default_font
	},
	textAlign : "center"
});
headerRowView.add(header);

//Horizontal row for male/female characters
var horizonRowCharactersView = Titanium.UI.createView({
	height : getImageHeight("female"),
	width : "100%",
	top : inch(0.30),
	left : 0
});

//Horizontal row for male/female characters
var leftColumnCharactersView = Titanium.UI.createView({
	height : "100%",
	width : "50%",
	top : 0,
	left : 0,
});
var rightColumnCharactersView = Titanium.UI.createView({
	height : "100%",
	width : "50%",
	top : 0,
	right : 0,
});
horizonRowCharactersView.add(leftColumnCharactersView);
horizonRowCharactersView.add(rightColumnCharactersView);

//Male Image
var maleImage = Titanium.UI.createImageView({
	image : getImageName("male_character"),
	height : getImageHeight("male"),
	width : getImageWidth("male"),
	top : "0%"
	//left:"10%"
});

leftColumnCharactersView.add(maleImage);
//Female Image
var femaleImage = Titanium.UI.createImageView({
	image : getImageName("female_character"),
	height : getImageHeight("female"),
	width : getImageWidth("female"),
	top : "0%"
	//left:"75%"
});
rightColumnCharactersView.add(femaleImage);

/***********************************IMAGES END**************************************************/

//Horizontal row for male/female buttons
var horizonRowButtonView = Titanium.UI.createView({
	top : maleFemaleButtonY(),
	height : buttonHeight(),
	zIndex : 100,
	width : "100%",
});

//Horizontal row for male button
var leftColumnButtonView = Titanium.UI.createView({
	top : 0,
	left : 0,
	height : "100%",
	width : "50%"
});
//Horizontal row for female button
var rightColumnButtonView = Titanium.UI.createView({
	height : "100%",
	width : "50%",
	top : 0,
	right : 0
});

//Male Button
var maleButton = Titanium.UI.createButton({
	backgroundColor : "#474747",
	color : "#FFFFFF",
	title : "KNIGHT",
	height : "100%",
	width : maleFemaleButtonWidth(),
	top : 0,
	id : "MALE",
	borderRadius : 2,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}

});
maleButton.addEventListener("click", function(e) {
	Ti.App.GLBL_gender = "male";
	Ti.App.GLBL_character_image = "images/hdpi_male_character_bad.png", description.text = 'You have selected Male!';
	maleButton.backgroundColor = "#50c0e8";
	window.gender = 'male';
	maleButton.borderWidth = 2;
	maleButton.borderColor = "#ace0f2";
	femaleButton.backgroundColor = "#474747";
	femaleButton.borderWidth = 0;
});

//Female Button
var femaleButton = Titanium.UI.createButton({
	backgroundColor : "#474747",
	color : "#FFFFFF",
	title : "PRINCESS",
	height : "100%",
	width : maleFemaleButtonWidth(),
	top : 0,
	id : "MALE",
	borderRadius : 2,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
femaleButton.addEventListener("click", function(e) {
	Ti.App.GLBL_gender = "female";
	Ti.App.GLBL_character_image = "images/hdpi_female_character_bad.png", description.text = 'You have selected Female!';
	window.gender = 'female';
	femaleButton.backgroundColor = "#50c0e8";
	femaleButton.borderWidth = 2;
	femaleButton.borderColor = "#ace0f2";
	maleButton.backgroundColor = "#474747";
	maleButton.borderWidth = 0;
});

leftColumnButtonView.add(maleButton);
rightColumnButtonView.add(femaleButton);
horizonRowButtonView.add(leftColumnButtonView);
horizonRowButtonView.add(rightColumnButtonView);

//Horizontal row for description
var horizonRowDescriptionView = Titanium.UI.createView({
	height : getNormalTextHeight(),
	top : getTextDescriptionY(),
	width : "100%"
});

//Textview for description
var description = Titanium.UI.createLabel({
	text : "---Description of selected class  here---",
	color : "#333333",
	id : "DESCRIPTION",
	top : 0,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
horizonRowDescriptionView.add(description);

//Horizontal row for Name Box
var inputNameView = Titanium.UI.createView({
	width : "100%",
	top : getNameBoxY(),
});

//Name Box
var nameField = Titanium.UI.createTextField({
	width : "80%",
	borderRadius : 7,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText : "Name Box",
	keyboardType : Titanium.UI.KEYBOARD_ASCII,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
inputNameView.add(nameField);

//Textview for description
var version = Titanium.UI.createLabel({
	text : "Ver 0.0.21",
	color : "#474747",
	font : {
		fontSize : getButtonTextSize(),
		fontFamily : Ti.App.GLBL_default_font
	},
	id : "DESCRIPTION",
	bottom : 10 + buttonHeight()
});

//Creating a view for continue button
var continueButtonView = Titanium.UI.createView({
	bottom : 5,
	height : buttonHeight(),
	width : "100%",
	right : 0,
});

//Continue Button
var continueButton = Titanium.UI.createButton({
	backgroundColor : "#474747",
	color : "#FFFFFF",
	title : "CONTINUE",
	width : "80%",
	height : "100%",
	zIndex : 100,
	id : "CONTINUE",
	borderRadius : 2,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
continueButton.addEventListener("click", function(e) {
	Ti.App.GLBL_name = nameField.value;
	//window.open();
/*
	var window1 = Titanium.UI.createWindow({
	 url:'quests_home.js'
	 });
	 window1.open();
	*/ 
	if (Ti.App.GLBL_gender == "") {
		alert("Please select gender first");
	} else if (nameField.value == "") {
		alert("Please enter your name");
	} else {
		Ti.App.GLBL_name = nameField.value;
		if (Ti.App.GLBL_gender == 'female') {
			setCharacterAsFemale();
		} else {
			setCharacterAsMale();
		}

		window.open();

	}
	//win.close();
});
continueButtonView.add(continueButton);

win.add(version);
win.add(headerRowView);
win.add(horizonRowCharactersView);
win.add(horizonRowButtonView);
win.add(horizonRowDescriptionView);
win.add(inputNameView);
win.add(continueButtonView);
win.addEventListener(Titanium.PAGE_LOAD, function() {
	alert("loaded")
}, false)
win.open();
