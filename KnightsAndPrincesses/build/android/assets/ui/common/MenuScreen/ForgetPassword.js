function ForgetPassword(email_address) {
	var win = Ti.UI.createWindow({
		height : '100%',
		width : '100%',
		opacity : 0.75,
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return winWidth * percent / 100;
		} else if (axis == 'y') {
			return winHeight * percent / 100;
		}
	}

	var activityIndicatorView = Titanium.UI.createView({
		backgroundColor : '#FFFFFF',
		borderRadius : 10,
		borderColor : '#333333',
		borderWidth : '5dip',
		visible : false,
		height : '8%',
		width : (screenWidth / 2),
		zIndex : 700
	});
	var activityIndicator = Ti.UI.createActivityIndicator({
		color : '#333333',
		font : {
			// fontFamily : 'Helvetica Neue',
			fontSize : '14dip',
			fontWeight : 'bold'
		},
		message : 'Loading...',
		style : (Ti.Platform.name === 'iPhone OS') ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK,
		height : '100%',
		width : '100%'
	});
	activityIndicatorView.add(activityIndicator);
	win.add(activityIndicatorView);

	var main_view = Ti.UI.createView({
		height : '75%',
		width : '80%',
		backgroundGradient : {
			type : 'linear',
			colors : ['#21653d', '#00321f'],
			startPoint : {
				x : '0%',
				y : '0%'
			},
			endPoint : {
				x : '0%',
				y : '100%'
			},
			backFillStart : false
		},
		borderColor : '#b3fad0',
		borderRadius : '7',
		borderWidth : '1dip'

	});

	// Create a TextField.
	var emailTextField = Ti.UI.createTextField({
		height : 'auto',
		width : "75%",
		top : "5%",
		width : "85%",
		hintText : 'Email Address',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var osname = Ti.Platform.osname;
	if (osname === 'android')
		emailTextField.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;
	// Android only

	emailTextField.addEventListener('return', function(e) {
		emailTextField.blur();
	});
	//main_view.add(emailTextField);

	// Create a TextField.
	var validationCodeTextField = Ti.UI.createTextField({
		height : 'auto',
		width : "75%",
		top : "5%",
		width : "85%",
		hintText : 'Reset Code',
		keyboardType : Ti.UI.KEYBOARD_NAMEPHONE_PAD,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var osname = Ti.Platform.osname;
	if (osname === 'android')
		validationCodeTextField.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;
	// Android only

	validationCodeTextField.addEventListener('return', function(e) {
		validationCodeTextField.blur();
		// alert('Input was: ' + emailTextField.value);
	});
	main_view.add(validationCodeTextField);

	// Create a TextField.
	var passwordTextField = Ti.UI.createTextField({
		passwordMask : true,
		height : 'auto',
		width : "75%",
		top : "20%",
		width : "85%",
		hintText : 'Password',
		keyboardType : Ti.UI.KEYBOARD_APPEARANCE_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var osname = Ti.Platform.osname;
	if (osname === 'android')
		passwordTextField.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;
	// Android only

	passwordTextField.addEventListener('return', function(e) {
		passwordTextField.blur();
		alert('Input was: ' + emailTextField.value);
	});
	main_view.add(passwordTextField);

	// Create a TextField.
	var retypePasswordTextField = Ti.UI.createTextField({
		passwordMask : true,
		height : 'auto',
		width : "75%",
		top : "35%",
		width : "85%",
		hintText : 'Retype Password',
		keyboardType : Ti.UI.KEYBOARD_APPEARANCE_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var osname = Ti.Platform.osname;
	if (osname === 'android')
		retypePasswordTextField.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;
	// Android only

	retypePasswordTextField.addEventListener('return', function(e) {
		retypePasswordTextField.blur();
		// alert('Input was: ' + emailTextField.value);
	});
	main_view.add(retypePasswordTextField);

	var resetPasswordBtn = Ti.UI.createButton({ color: '#761f56',
		title : "Reset Password",
		top : "80%",
		color : "white",
		width : "80%",
		height : "15%",
		backgroundGradient : {
			type : 'linear',
			colors : ['#21653d', '#00321f'],
			startPoint : {
				x : '0%',
				y : '0%'
			},
			endPoint : {
				x : '0%',
				y : '100%'
			},
			backFillStart : false
		},
		opacity : 0.5,
		borderColor : '#b3fad0',
		borderRadius : '7',
		borderWidth : '1dip'
		// backgroundImage : "/assets/overlayItemList.png"
	});
	main_view.add(resetPasswordBtn);
	resetPasswordBtn.addEventListener('click', function() {
		if (validationCodeTextField.value == "" || passwordTextField.value == "" || retypePasswordTextField.value == "") {
			alert('All fields are required!');
			return;
		}
		if (passwordTextField.value != retypePasswordTextField.value) {
			alert('Password must be same!');

			return;
		}
		activityIndicator.show();
		activityIndicatorView.visible = true;
		activityIndicator.message = "Resetting password...";
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				retreive_code_json = JSON.parse(this.responseText);
				//alert(retreive_code_json.Record.Message);
				activityIndicator.hide();
				activityIndicatorView.visible = false;

				var alert_btns = (retreive_code_json.Record.Error == 0) ? ['Close'] : ['Close', 'Retry'];

				var ConfirmationAlert = Titanium.UI.createAlertDialog({
					title : 'Reset Password.',
					message : retreive_code_json.Record.Message,
					buttonNames : alert_btns,
					cancel : 1
				});
				ConfirmationAlert.show();
				ConfirmationAlert.addEventListener('click', function(e) {

					//now you can use parameter e to switch/case
					switch (e.index) {
						case 0:
							// Close
							ConfirmationAlert.hide();
							win.close();
							break;
						case 0:
							// Retry
							ConfirmationAlert.hide();
							break;
					}
				});
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://bonozo.com:8080/knp/reset_password.php?" + "email=" + Ti.Network.encodeURIComponent(email_address) + "&code=" + Ti.Network.encodeURIComponent(validationCodeTextField.value) + "&password=" + Ti.Network.encodeURIComponent(passwordTextField.value)
		});
	});
	var getCodeBtn = Ti.UI.createButton({ color: '#761f56',
		title : "Retreive Code",
		top : "80%",
		color : "white",
		width : "35%",
		right : "10%",
		height : "15%",
		backgroundGradient : {
			type : 'linear',
			colors : ['#21653d', '#00321f'],
			startPoint : {
				x : '0%',
				y : '0%'
			},
			endPoint : {
				x : '0%',
				y : '100%'
			},
			backFillStart : false
		},
		opacity : 0.5,
		borderColor : '#b3fad0',
		borderRadius : '7',
		borderWidth : '1dip'
		// backgroundImage : "/assets/overlayItemList.png"
	});
	var retreive_code_json;
	//main_view.add(getCodeBtn);
	getCodeBtn.addEventListener('click', function() {
		// activityIndicator.show();
		// activityIndicatorView.visible = true;
		// activityIndicator.message = "Retreiving code...";
		// var httpclientt = require('/ui/common/Functions/function');
		// httpclientt.requestServer({
		// success : function(e) {
		// retreive_code_json = JSON.parse(this.responseText);
		// alert(retreive_code_json.Record.Message);
		// activityIndicator.hide();
		// activityIndicatorView.visible = false;
		// },
		// method : 'GET',
		// contentType : 'text/xml',
		// url : "http://bonozo.com:8080/knp/get_password_reset_code.php?email=" + Ti.Network.encodeURIComponent(emailTextField.value),
		//
		// });
	});

	win.add(main_view);
	return win;
}

module.exports = ForgetPassword;
