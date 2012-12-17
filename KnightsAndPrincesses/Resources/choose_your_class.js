// Ti.include('jsonrpc.js');
//Ti.App.GLBL_
Ti.include('func_app.js');
//ratioCalculation();
//	var originalWinWidth = $(window).width();
function removeAllContent() {
	win.remove(headerRowView);
	win.remove(horizonRowCharactersView);
	win.remove(horizonRowButtonView);
	win.remove(horizonRowDescriptionView);
	win.remove(inputNameView);
	win.remove(continueButtonView);

	horizonRowCharactersView.remove(leftColumnCharactersView);
	horizonRowCharactersView.remove(rightColumnCharactersView);
	horizonRowButtonView.remove(leftColumnButtonView);
	horizonRowButtonView.remove(rightColumnButtonView);

	inputNameView.remove(nameField);

	nameField = null;
	
	name = null;
	gender = null;

	url = null;
	Error = null;
	Message = null;
	xhr  = null;


	inputNameView = null;

	headerRowView = null;
	horizonRowCharactersView = null;
	leftColumnCharactersView = null;
	rightColumnCharactersView = null;
	maleImage = null;
	femaleImage = null;
	horizonRowButtonVie = null;
	leftColumnButtonView = null;
	rightColumnButtonView = null;
	maleButton = null;
	femaleButton = null;
	horizonRowDescriptionView = null;
	description = null;
	inputNameView = null;
	nameField = null;
	continueButtonView = null;
	continueButton = null;

	win = null;

}

var win = Titanium.UI.createWindow({
	title : "Using the Image View",
	width : '100%',
	navBarHidden : true,
	height : '100%',
	backgroundColor : "#D0C8B0",
	exitOnClose : true
});
win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

//Header view

var headerRowView = Titanium.UI.createView({
	height : inch(0.25),
	width : "100%",
	top : 0,
	left : 0,
	backgroundColor : "#000000",

});
//Textview for header description
headerRowView.add(Titanium.UI.createLabel({
	text : "CHOOSE YOUR CLASS",
	color : "#FFFFFF",
	font : {
		fontSize : 15,
		fontFamily : Ti.App.GLBL_default_font
	},
	textAlign : "center"
}));

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
	Ti.App.GLBL_character_image = "images/hdpi_male_character_bad.png", 
	description.text = 'You have selected Male!';
	maleButton.backgroundColor = "#50c0e8";
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
	Ti.App.GLBL_character_image = "images/hdpi_female_character_bad.png", 
	description.text = 'You have selected Female!';
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
	bottom : (getMarginNormal1()*7) + (buttonHeight()*4),
	height : buttonHeight()
});

//Name Box
var nameField = Titanium.UI.createTextField({
	width : "80%",
	height : buttonHeight(),
	borderRadius : 7,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText : "NAME",
	keyboardType : Titanium.UI.KEYBOARD_ASCII,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
inputNameView.add(nameField);


/*
//Horizontal row for Name Box
var inputEmailView = Titanium.UI.createView({
	width : "100%",
	bottom : (getMarginNormal1()*5) + (buttonHeight()*3),
	height : buttonHeight()
});

//Name Box
var emailField = Titanium.UI.createTextField({
	width : "80%",
	height : buttonHeight(),
	borderRadius : 7,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText : "EMAIL ADDRESS",
	keyboardType : Titanium.UI.KEYBOARD_ASCII,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
inputEmailView.add(emailField);



//Horizontal row for Name Box
var inputUsernameView = Titanium.UI.createView({
	width : "100%",
	bottom : (getMarginNormal1()*3) + (buttonHeight()*2),
	height : buttonHeight()
});

//Name Box
var usernameField = Titanium.UI.createTextField({
	width : "80%",
	height : buttonHeight(),
	borderRadius : 7,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText : "USERNAME",
	keyboardType : Titanium.UI.KEYBOARD_ASCII,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
inputUsernameView.add(usernameField);



//Horizontal row for Name Box
var inputPasswordView = Titanium.UI.createView({
	width : "100%",
	bottom : (getMarginNormal1()*2) + (buttonHeight()),
	height : buttonHeight()
});

//Name Box
var passwordField = Titanium.UI.createTextField({
	width : "80%",
	height : buttonHeight(),
	passwordMask:true,
	borderRadius : 7,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText : "PASSWORD",
	keyboardType : Titanium.UI.KEYBOARD_ASCII,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
inputPasswordView.add(passwordField);
*/
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

	/*var window1 = Titanium.UI.createWindow({
		url : 'make_friend_request.js'
	});
	window1.open();
	*/
	

	if (Ti.App.GLBL_gender == "") {
		alert("Please select gender firsts");
	} else if (nameField.value == "") {
		alert("Please enter your name");
	} else {
		Ti.App.GLBL_name = nameField.value;
		if (Ti.App.GLBL_gender == 'female') {
			setCharacterAsFemale();
		} else {
			setCharacterAsMale();
		}

		var window1 = Titanium.UI.createWindow({
				url : 'level1.js'
			});
		window1.open();
/*		var name = nameField.value;
		var email = emailField.value;
		var username = usernameField.value;
		var password = passwordField.value;
		var gender = (Ti.App.GLBL_gender == 'male')?'m':'f';




		var url = "http://justechinfo.com/kap_server/sign_up.php?username="+username+"&password="+password+"&name="+name+"&email="+email+"&gender="+gender;
		var Error,Message;
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				json = JSON.parse(this.responseText);
				if(json.Message != undefined){
					alert(json.Message);
					Titanium.UI.createWindow({
						url : 'level1.js'
						//url:'level2.js'
					}).open();
					removeAllContent();

				}
				else if(json.Error != undefined)
				{
					alert(json.Error);
				}
				else
				{
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
		
*/		
	}
	//win.close();
});
continueButtonView.add(continueButton);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'app.js'
	});
	window.open();
	removeAllContent();
});

win.add(headerRowView);
win.add(horizonRowCharactersView);
win.add(horizonRowButtonView);
win.add(horizonRowDescriptionView);
win.add(inputNameView);
win.add(continueButtonView);
win.addEventListener(Titanium.PAGE_LOADED, function() {
	alert("loaded");
}, false);
win.open();
