function LoginWindow() {
	//load component dependencies
	var chooseClass;
	var remember = false;
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading Main Screen...';
	//message will only shows in android.
	actInd.show();


	var HeaderView = require('ui/common/LoginScreen/HeaderView');
	var viewstack = 0;
	viewstack = Titanium.App.Properties.getString("viewstack");
	if (viewstack == 0) {
		Titanium.App.Properties.setString("viewstack", 0);
	}
	//create component instance

	var win = Ti.UI.createWindow({
		backgroundImage : "/assets/inventoryBackground.png"
		/*
		backgroundGradient : {
			type : 'linear',
			colors : ['#3258ad', '#010f49'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 500
			},
			backFillStart : false
		}
		 orientationModes: [
		 Ti.UI.PORTRAIT,
		 Ti.UI.UPSIDE_PORTRAIT
		 ],*/
	});
	win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	//construct UI
	var headerView = new HeaderView();
	win.add(headerView);
/*
	var bgimageView = Ti.UI.createImageView({
		height : "100%",
		width : "100%",
		backgroundImage : "/assets/inventoryBackground.png"
	});
	win.add(bgimageView);
*/

	//creating mid image
	var imageView = Ti.UI.createImageView({
		top : "12%",
		height : "40%",
		width : "75%",
		image : "/assets/app_logo.png"
	});
	win.add(imageView);

	var emailField = Titanium.UI.createTextField({
		height : 'auto',
		hintText : "Email",
		width : "75%",
		value : Ti.App.Properties.getString('knp_email'),//"robot1@email.com",
		left : "15%",
		top : "63%"
	});
	win.add(emailField);
	var passwordField = Titanium.UI.createTextField({
		height : 'auto',
		hintText : "Password",
		value : Ti.App.Properties.getString('knp_password'),//'test',
		width : "75%",
		left : "15%",
		top : "73%",
		passwordMask : true
	});
	win.add(passwordField);
	var rememberCheckBox = Ti.UI.createSwitch({
		top : "83%",
		style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		height : "5%",
		left : "1%",
		value : false
	});
	win.add(rememberCheckBox);
	rememberCheckBox.addEventListener("change", function(e){
	    remember = e.value;
	});	
	var rememberlabel = Ti.UI.createLabel({
		top : "83%",
		text : "Remember email address and password?",
		height : "5%",
		left : "15%"
	});
	win.add(rememberlabel);
	var signInButton = Ti.UI.createButton({
		title : "SIGN IN",
		top : "90%",
		color : "white",
		width : "75%",
		left : "15%",
		height : "8%",
		backgroundImage : "/assets/overlayItemList.png"
	});
	win.add(signInButton);
	signInButton.addEventListener('touchstart', function(e) {
		// signInButton.color = "black";
	});
	
	signInButton.addEventListener('touchend', function(e) {
		// signInButton.color = "white";
	});

	signInButton.addEventListener('click', function(e) {
		if(emailField.value == "" && passwordField.value == ""){
			alert('All fields are required!');
		}
		else{
			var actInd = Titanium.UI.createActivityIndicator();
			actInd.message = 'Signing In...';
			//message will only shows in android.
			actInd.show();

			var httpclientt = require('/ui/common/Functions/function');
			httpclientt.requestServer({
				success : function(e) {
					var json = JSON.parse(this.responseText);
					//actInd.hide();
					if (json.Record != undefined) {
						if (remember) {
							Ti.App.Properties.setString('knp_email', emailField.value);
							Ti.App.Properties.setString('knp_password', passwordField.value);
						}
						var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
						MainMenu = new MainMenuScreen(json);
						MainMenu.open();
						actInd.hide();
						
	
					} else if (json.Error != undefined) {
						if (json.Error.AuthException != undefined) {
							alert(json.Error.AuthException);
						} else if (json.Error.Request) {
							alert(json.Error.Request);
						} else {
							alert("Unknown error occured!");
						}
					}
				},
				method : 'GET',
				contentType : 'text/xml',
				url : "http://justechinfo.com/kap_server/?email=" + emailField.value + "&password=" + passwordField.value + "",
				//param : '<Device xmlns="http://schemas.datacontract.org/2004/07/CalendarConnect.Model">' + '<culture>' + Titanium.Platform.locale + '</culture>' + '<deviceToken>Have to Do</deviceToken>' + '<deviceType>' + deviceType + '</deviceType>' + '<modelDescription>' + Titanium.Platform.model + '</modelDescription>' + '<osVersion>' + Titanium.Platform.version + '</osVersion></Device>'
			});
		}
	});
	actInd.hide();

	var newUserButton = Ti.UI.createButton({
		title : "New User?",
		color : "white",
		top : "50%",
		width : "75%",
		left : "15%",
		height : "10%",
		backgroundImage : "/assets/overlayItemList.png"
	});
	win.add(newUserButton);
	newUserButton.addEventListener('click', function(e) {
		var ChooseClass = require('/ui/common/MenuScreen/ChooseClass');
		chooseClass = new ChooseClass();
		chooseClass.open();
	});

	Ti.App.addEventListener('close_screen', function(data) {
		if (data.screen_name == 'choose_your_class' && chooseClass != null) {
			chooseClass.close();
			chooseClass = null;
		} else {
			var activity = Titanium.Android.currentActivity;
			activity.finish();
		}
	});

	win.addEventListener('android:back', function(e) {
		var activity = Titanium.Android.currentActivity;
		activity.finish();
	});
	return win;
}

//make constructor function the public component interface
module.exports = LoginWindow;
