// Ti.include('jsonrpc.js');
//Ti.App.GLBL_
Ti.include('func_app.js');
Ti.App.GLBL_default_font = 'MagicMedieval';
Ti.App.GLBL_gender = "";
Ti.App.GLBL_name = "";
Ti.App.GLBL_character_image = "";
Ti.App.GLBL_uid = "";

Ti.App.GLBL_skin_color = 'gray';

Ti.App.GLBL_hair_stlyes = ['Style1', 'Style2', 'Style3'];
Ti.App.GLBL_hair_color = ['gray', 'red'];
Ti.App.GLBL_hair_color_image_name = ['hdpi_male_character_bad.png', 'hdpi_male_character_good.png'];
Ti.App.GLBL_skin_tone = ['Tone1', 'Tone2', 'Tone3'];
Ti.App.GLBL_face = ['face1', 'face2', 'face3'];
Ti.App.GLBL_clothing = ['clothing1', 'clothing2', 'clothing3'];
Ti.App.GLBL_color_scheme = ['Color scheme1', 'Color scheme2', 'Color scheme3'];

Ti.App.GLBL_curr_hair_stlyes = 0;
Ti.App.GLBL_curr_hair_color = 0;
Ti.App.GLBL_curr_skin_tone = 0;
Ti.App.GLBL_curr_face = 0;
Ti.App.GLBL_curr_clothing = 0;
Ti.App.GLBL_curr_color_scheme = 0;
Ti.App.GLBL_character_created = false;
function foo() {
	randomnumber = Math.floor(Math.random() * 100);
	Ti.API.info("random: " + randomnumber);
}

//ratioCalculation();
//	var originalWinWidth = $(window).width();
function removeAllContent() {
		

	win.remove(headerRowView);
	win.remove(horizonRowCharactersView);
	win.remove(horizonRowButtonView);
	win.remove(inputemailView);
	win.remove(signInButtonView);
	win.remove(inputPasswordView);
	win.remove(signInStatusLbl);
	win.remove(tickBox);
	win.remove(rememberPasswordLbl);
	rememberPasswordLbl = null;

	signInStatusLbl = null;
	tickBox = null;

	inputPasswordView.remove(passwordField);
	passwordField = null;

	horizonRowCharactersView.remove(appLogoImageView);
	appLogoImageView = null;

	inputemailView.remove(emailField);
	emailField = null;

	headerRowView = null;
	horizonRowCharactersView = null;
	horizonRowButtonView = null;
	inputemailView = null;
	emailField = null;
	signInButtonView = null;
	signInButton = null;
	inputPasswordView = null;

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
headerRowView.add(Titanium.UI.createLabel({
	text : "WELCOME TO KNIGHTS AND PRINCESSES",
	color : "#FFFFFF",
	font : {
		fontSize : 15,
		fontFamily : Ti.App.GLBL_default_font
	},
	textAlign : "center"
}));
/*
* Header Ends
*/

//Horizontal row for male/female characters
var horizonRowCharactersView = Titanium.UI.createView({
	height : getImageHeight("female"),
	width : "100%",
	top : inch(0.30),
	left : 0
});

// Create an ImageView.
var appLogoImageView = Ti.UI.createImageView({
	image : 'images/app_logo.png',
	width : 293,
	height : 293
});
appLogoImageView.addEventListener('load', function() {
	Ti.API.info('Image loaded!');
});

// Add to the parent view.
horizonRowCharactersView.add(appLogoImageView);

//Horizontal row for male/female buttons
var horizonRowButtonView = Titanium.UI.createView({
	top : maleFemaleButtonY(),
	height : buttonHeight(),
	zIndex : 100,
	width : "100%",
});

//Sign Up Button
var signUpButton = Titanium.UI.createButton({
	backgroundColor : "#474747",
	color : "#FFFFFF",
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

horizonRowButtonView.add(signUpButton);
signUpButton.addEventListener("click", function(e) {
	Titanium.UI.createWindow({
	 url : 'choose_your_class.js'
	 //url:'level2.js'
	 }).open();
	 removeAllContent();
});

// Create a Label.
var signInStatusLbl = Ti.UI.createLabel({
	text : 'signInStatusLbl',
	color : '#474747',
	bottom : (getMarginNormal1() * 4) + (buttonHeight() * 3),
	textAlign : 'center',
	visible : false,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});

//Horizontal row for Name Box
var inputemailView = Titanium.UI.createView({
	width : "100%",
	bottom : (buttonHeight() * 3),
	height : buttonHeight()
});

//Name Box
var emailField = Titanium.UI.createTextField({
	width : "80%",
	height : buttonHeight(),
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

//Horizontal row for Name Box
var inputPasswordView = Titanium.UI.createView({
	width : "100%",
	bottom : (buttonHeight() * 2),
	height : buttonHeight()
});

//Name Box
var passwordField = Titanium.UI.createTextField({
	width : "80%",
	height : buttonHeight(),
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
////////////////////////////////////////////
var tickBox = Ti.UI.createButton({
	backgroundImage : 'images/unchecked_brown.png',
	width : 28,
	height : 28,
	checkBok : "tick",
	customValue : "use your custom value",
	checked : false,
	bottom : (buttonHeight()) + (getMarginNormal1() * 2),
	left : "10%"
});

tickBox.addEventListener('click', function(e) {
	if (e.source.checkBok) {
		if (e.source.checked) {
			e.source.backgroundImage = 'images/unchecked_brown.png';
			e.source.checked = false;
		} else {
			e.source.backgroundImage = 'images/checked_brown.png';
			e.source.checked = true;
			//alert(e.source.customValue);
		}
	}
});

// Create a Label.
var rememberPasswordLbl = Ti.UI.createLabel({
	text : 'Remember email address and password?',
	color : '#474747',
	font : {
		fontSize : getNormalFontSize()
	},
	bottom : (buttonHeight()) + (getMarginNormal1() * 2),
	textAlign : 'center'
});

////////////////////////////////////////////

//Creating a view for continue button
var signInButtonView = Titanium.UI.createView({
	bottom : 5,
	height : buttonHeight(),
	width : "100%",
	right : 0,
});

//Continue Button
var signInButton = Titanium.UI.createButton({
	backgroundColor : "#474747",
	color : "#FFFFFF",
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
/*
signInButton.addEventListener("click", function(e) {
	Ti.App.GLBL_uid = '10000001';
	Ti.App.Properties.setString('friend_request_uid','10000002');
	var message_room = Titanium.UI.createWindow({
		url : 'message_room.js'
	});
	message_room.open();
	removeAllContent();
});
*/
signInButton.addEventListener("click", function(e) {
	var email = emailField.value;
	var password = passwordField.value;
	//alert("email : "+email+"\nPassword : "+password);

	var url = "http://justechinfo.com/kap_server/index.php?email=" + email + "&password=" + password + "";
	var Record;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				Record = json.Record[0];
				//alert("Successfully signed in!");
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
				var window = Titanium.UI.createWindow({
					url : 'quests_home.js'//'level2.js'
				});
				window.open();
				//win.close();
				removeAllContent();
				//window = null;

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

win.add(headerRowView);
win.add(horizonRowCharactersView);
win.add(horizonRowButtonView);
win.add(signInStatusLbl);
win.add(inputemailView);
win.add(inputPasswordView);
win.add(tickBox);
win.add(rememberPasswordLbl);
win.add(signInButtonView);
win.addEventListener(Titanium.PAGE_LOADED, function() {
	alert("loaded");
}, false);
win.open();

/*

 */