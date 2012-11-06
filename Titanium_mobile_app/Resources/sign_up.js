// Ti.include('jsonrpc.js');
//Ti.App.GLBL_
Ti.include('func_app.js');
//ratioCalculation();
//	var originalWinWidth = $(window).width();
function removeAllContent() {
	win.remove(headerRowView);
	win.remove(inputemailView);
	win.remove(signInButtonView);
	win.remove(inputPasswordView);
	
	inputPasswordView.remove(passwordField);
	passwordField = null;
	
	headerRowView = null;
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
	text : "Create your ID",
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



//Horizontal row for Name Box
var inputemailView = Titanium.UI.createView({
	width : "100%",
	top : (getMarginNormal1()) + (buttonHeight()*2),
	height : buttonHeight()
});

//Name Box
var emailField = Titanium.UI.createTextField({
	width : "80%",
	height : buttonHeight(),
	borderRadius : 7,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText : "EMAIL",
	keyboardType : Titanium.UI.KEYBOARD_ASCII,
	font : {
		fontFamily : Ti.App.GLBL_default_font
	}
});
inputemailView.add(emailField);



//Horizontal row for Name Box
var inputPasswordView = Titanium.UI.createView({
	width : "100%",
	top : (getMarginNormal1()*2) + (buttonHeight()*3),
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
	title : "CREATE",
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
	//alert("email : "+email+"\nPassword : "+password);
	var gender = (Ti.App.GLBL_gender == 'male')?'m':'f';
	var url = "http://justechinfo.com/kap_server/sign_up.php?email="+email+"&password="+password+"&name="+Ti.App.GLBL_name+"&gender="+gender;
	
	//alert(Ti.App.GLBL_name);
	//http://justechinfo.com/kap_server/sign_up.php?username="+username+"&password="+password+"&name="+name+"&email="+email+"&gender="+gender;
	var Error,Message;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if(json.Message != undefined){
				alert(json.Message);
				Titanium.UI.createWindow({
					url : 'level2.js'
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
	
	
});
signInButtonView.add(signInButton);

win.add(headerRowView);
win.add(inputemailView);
win.add(inputPasswordView);
win.add(signInButtonView);
win.addEventListener(Titanium.PAGE_LOADED, function() {
	alert("loaded");
}, false);
win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
	    url:'level1.js'
	});
	window.open();
	removeAllContent();
});

win.open();

/*


 */