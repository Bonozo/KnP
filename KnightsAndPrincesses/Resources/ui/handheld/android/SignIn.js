//Sign In Component Constructor
var winWidth = Ti.Platform.displayCaps.platformWidth;
var winHeight = Ti.Platform.displayCaps.platformHeight;

function getNormalFontSize() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 16;
	} else if (winWidth < 480 && winHeight < 800) {
		return 10;
	}
}

function getMarginNormal1() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 8;
	} else if (winWidth < 480 && winHeight < 800) {
		return 4;
	}
}
function getHeaderHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 48;
	} else if (winWidth < 480 && winHeight < 800) {
		return 18;
	}
}
function setCharacterAsFemale(){
	Ti.App.GLBL_items_visible = [false,false,false,false,false,false,false,false,false];
	Ti.App.GLBL_items_title = 
	['Flower',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_image = 
	['P_flower',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_description = 
	['Chest Plate description',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_value = [
	'10','45','30','50','80'];
}
function setCharacterAsMale(){
	Ti.App.GLBL_items_visible = [false,false,false,false,false,false,false,false,false];
	Ti.App.GLBL_items_title = 
	['Chest Plate',
	'Feet',
	'Gloves',
	'Helmet',
	'Legs',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_image = 
	['K_ChestPlate_bad_crop',
	'K_Feet_bad_crop',
	'K_Gloves_bad_crop',
	'K_Helmet_bad_crop',
	'K_Legs_bad_crop',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_description = 
	['Chest Plate description',
	'Feet description',
	'Gloves description',
	'Helmet description',
	'Legs description',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_value = [
	'10','45','30','50','80'];
}
function getButtonTextSize()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 12;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 6;
	}
}
function getBorderSize()
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 6;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 3;
	}
}
function getNameBoxY()
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 320;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 175;
	}
}
function getTextDescriptionY()
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 440;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 175;
	}
}
function getNormalTextHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 35;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 20;
	}
}
function maleFemaleButtonY()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 370;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 130;
	}
}
function maleFemaleButtonWidth()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 130;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 70;
	}
}
function buttonHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 55;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 35;
	}
}
function inch(size)
{
    // default to 160 dpi if unavailable
    var height = size * 160.0; 

    try
    { 
        // compute header height based on screen density ... target .25" height
        height = size * Ti.Platform.displayCaps.dpi; 
    }
    catch(e) { warn("Error accessing display caps for screen density calculation: " + e); }

    return height;
}
function getImageName(imageName)
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return "images/hdpi_"+imageName+"_bad.png";
	}
	else
	{
		return "images/"+imageName+".png";
	}
	
}
function getImageHeight(imageName)
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		switch (imageName) 
		{
			case "female":
				return 293;
			case "male":
				return 293;
		}
	}
	else
	{
		switch (imageName) 
		{
			case "female":
				return 92;
			case "male":
				return 88;
		}
	}
	return 0;
	
}
function getImageWidth(imageName)
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		switch (imageName) 
		{
			case "female":
				return 186;
			case "male":
				return 110;
				
		}
	}
	else
	{
		switch (imageName) 
		{
			case "female":
				return 29;
			case "male":
				return 29;
				
		}
	}
	return 0;
	
}

function SignIn() {
/**/
	var curr_top = 0;
	var self = Ti.UI.createWindow({
		exitOnClose : true,
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			colors : [{
				color : '#000d44',
				offset : 0.0
			}, {
				color : '#1340a7',
				offset : 1.0
			}],
		}
	});

	var CurtainHeader = require('ui/common/CurtainHeader');
	var header = new CurtainHeader('SIGN IN');
	self.add(header.createHeader());
	curr_top += 45;

	var logoImage = Ti.UI.createImageView({
		top : curr_top,
		image : 'http://justechinfo.com/kap_server/app_assets/images/appLogo.png',
		height : 300
	});
	self.add(logoImage);
	curr_top += 300;

	var horizonRowButtonView = Titanium.UI.createView({
		top : curr_top,
		height : 55,
		zIndex : 100,
		width : "100%",
	});

	//Sign Up Button
	var signUpButton = Titanium.UI.createButton({
		backgroundColor : "#045127",
		color : "#68E2A8",
		title : "NEW USER?",
		width : "80%",
		height : "100%",
		zIndex : 100,
		id : "SIGN_UP",
		borderRadius : 2,
		font : {
			fontFamily : Ti.App.GLBL_default_font
		}
	});
	signUpButton.addEventListener('click',function(e){
		var ClassSelection = require('/ui/handheld/android/ClassSelection');
		new ClassSelection(null).open();
	});

	horizonRowButtonView.add(signUpButton);
	self.add(horizonRowButtonView);
	curr_top += 355;

	// Create a Label.
	var signInStatusLbl = Ti.UI.createLabel({
		text : 'signInStatusLbl',
		color : '#474747',
		bottom : (8 * 4) + (55 * 3),
		textAlign : 'center',
		visible : false,
		font : {
			fontFamily : Ti.App.GLBL_default_font
		}
	});

	//Horizontal row for Name Box
	var inputemailView = Titanium.UI.createView({
		width : "100%",
		bottom : (55 * 3),
		height : 55
	});

	//Name Box
	var emailField = Titanium.UI.createTextField({
		width : "80%",
		height : 55,
		borderRadius : 7,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText : "EMAILS",
		keyboardType : Titanium.UI.KEYBOARD_ASCII,
		font : {
			fontFamily : Ti.App.GLBL_default_font
		},
		value : Ti.App.Properties.getString('email')
	});
	inputemailView.add(emailField);
	self.add(inputemailView);
	curr_top += 410;

	//Horizontal row for Name Box
	var inputPasswordView = Titanium.UI.createView({
		width : "100%",
		bottom : (55 * 2),
		height : 55
	});

	//Name Box
	var passwordField = Titanium.UI.createTextField({
		width : "80%",
		height : 55,
		passwordMask : true,
		borderRadius : 7,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText : "PASSWORD",
		keyboardType : Titanium.UI.KEYBOARD_ASCII,
		font : {
			fontFamily : Ti.App.GLBL_default_font
		},
		value : Ti.App.Properties.getString('password')
	});
	inputPasswordView.add(passwordField);
	self.add(inputPasswordView);
	curr_top += 465;

	var tickBox = Ti.UI.createButton({
		backgroundImage : '/images/unchecked_brown.png',
		width : 28,
		height : 28,
		checkBok : "tick",
		customValue : "use your custom value",
		checked : false,
		bottom : (55) + (8 * 2),
		left : "10%"
	});

	tickBox.addEventListener('click', function(e) {
		if (e.source.checkBok) {
			if (e.source.checked) {
				e.source.backgroundImage = '/images/unchecked_brown.png';
				e.source.checked = false;
			} else {
				e.source.backgroundImage = '/images/checked_brown.png';
				e.source.checked = true;
				//alert(e.source.customValue);
			}
		}
	});

	self.add(tickBox);

	var rememberPasswordLbl = Ti.UI.createLabel({
		text : 'Remember email address and password?',
		color : '#FFFFFF',
		font : {
			fontSize : 16
		},
		bottom : (55) + (8 * 2),
		textAlign : 'center'
	});
	self.add(rememberPasswordLbl);

	var signInButtonView = Titanium.UI.createView({
		bottom : 5,
		height : 55,
		width : "100%",
		right : 0,
	});

	var signInButton = Titanium.UI.createButton({
		backgroundColor : "#045127",
		color : "#68E2A8",
		title : "SIGN IN",
		width : "80%",
		height : "100%",
		zIndex : 100,
		id : "sign_in",
		borderRadius : 2,
		font : {
			fontFamily : Ti.App.GLBL_default_font
		}
	});

	signInButton.addEventListener("click", function(e) {
		var email = emailField.value;
		var password = passwordField.value;

		//var url = "http://justechinfo.com/kap_server/index.php?email=" + email + "&password=" + password + "";
		var url = "http://justechinfo.com/kap_server/?email=" + email + "&password=" + password + "";
		var Record;
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				json = JSON.parse(this.responseText);
				if (json.Record != undefined) {
					Record = json.Record[0];

					Ti.App.GLBL_uid = Record.UID;
					if (Record.GENDER == 'm') {
						setCharacterAsMale();
						Ti.App.GLBL_gender = 'male';
						Ti.App.GLBL_character_image = "images/hdpi_male_character_bad.png";
					} else {
						setCharacterAsFemale();
						Ti.App.GLBL_gender = 'female';
						Ti.App.GLBL_character_image = "images/hdpi_female_character_bad.png";
					}
	
					//remember email address and password
					if (tickBox.checked == true) {
						//alert('checked');
						Ti.App.GLBL_name = Record.NAME;
						Ti.App.Properties.setString('email', email);
						Ti.App.Properties.setString('password', password);
						//alert(Ti.App.Properties.getString('email')+Ti.App.Properties.getString('password'));
					}
					Ti.App.GLBL_character_created = true;
					Ti.App.GLBL_name = Record.NAME;

					var inventory = Titanium.UI.createWindow({
						url : 'inventory.js'
					});
					inventory.open();

					var _args = {};
					_args.uid = Record.UID;
					_args.name = Record.NAME;
					if (Record.GENDER == 'm') {// If mail
						_args.gender = 'male';
					} else {// If female
						_args.gender = 'female';
					}
					
					
					if (tickBox.checked == true) {
						Ti.App.Properties.setString('email', email);
						Ti.App.Properties.setString('password', password);
					}

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

	signInButtonView.add(signInButton);
	self.add(signInButtonView);

	return self;
}

module.exports = SignIn;
