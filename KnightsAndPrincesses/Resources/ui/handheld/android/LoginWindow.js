/*
 Signing In:

 1.    Sign in to KAP DB - DONE
 2a.   Sign in to cloud and save his user id to variable "id"
 2b.   If user does not exists on cloud then repeat 2a
 3.    Cloud admin login
 4.    if "last_user" property is not empty then unsubscribe last user with this device token by admin
 5.    Subscribe "id" with this device token by admin
 6.    save "id" in "last_user" property
 */

function LoginWindow() {

	var osname = Ti.Platform.osname;
	var admin_login = false;
	function getToken(callback) {
		if (osname === 'android') {
			CloudPush.retrieveDeviceToken({
				success : function deviceTokenSuccess(e) {
					callback(true, e.deviceToken);
				},
				error : function deviceTokenError(e) {
					callback(false, e.message);
				}
			});
			return;
		}
		// for iOS
		callback(true, Titanium.Network.remoteDeviceUUID);
	}

	function CloudLogin(login_value, password_value, callback) {
		// //actInd.message = 'Login admin...';

		Cloud.Users.login({
			login : login_value,
			password : password_value
		}, function(e) {
			if (e.success) {
				var user = e.users[0];
				callback(true, user.id);
			} else {
				callback(false, e.message);
			}
		});
	}

	function CloudLogout(callback) {
		Cloud.Users.logout(function(e) {
			if (e.success) {
				callback(true, "Successfully logout");
			} else {
				callback(false, e.message);
			}
		});
	}

	function CloudCreateUser(email_value, first_name_value, last_name_value, password_value, callback) {
		////actInd.message = 'Creating user...';
		Cloud.Users.create({
			email : email_value,
			username : email_value,
			password : password_value,
			password_confirmation : password_value
		}, function(e) {
			if (e.success) {
				var user = e.users[0];
				callback(true, user.id);
			} else {
				callback(false, e.message);
			}
		});
	}

	function CloudSearchUser(email_value, callback) {
		// //actInd.message = 'Searching user...';
		Cloud.Users.query({
			page : 1,
			per_page : 10,
			where : {
				email : email_value
			}
		}, function(e) {
			if (e.success) {
				// alert("'" + email_value + "' " + JSON.stringify(e));

				if (e.users.length > 0) {
					callback(true, e.users[0].id);
				} else
					callback(true, "");
			} else {
				callback(false, e.message);
			}
		});
	}

	function CloudRemoveUser(callback) {
		Cloud.Users.remove(function(e) {
			if (e.success) {
				callback(true, 'Successfully removed');
			} else {
				callback(false, e.message);
			}
		});
	}

	function CloudSubscribeUser(email_value, channel_value, token_value, callback) {
		//actInd.message = 'Configuring your device...';
		if (!admin_login) {
			CloudLogin('admin@bonozo.com', 'admin', function(success, admin_id) {
				if (success) {
					admin_login = true;

					CloudSearchUser(email_value, function(success, uid) {

						if (uid == "") {

							CloudCreateUser(email_value, "", "", "test", function(success, created_uid) {
								if (success) {

									Cloud.PushNotifications.subscribe({
										channel : channel_value,
										device_token : token_value,
										user_id : created_uid,
										type : 'android'
									}, function(e) {
										if (e.success) {
											callback(true, created_uid);
										} else {
											callback(false, e.message);
										}
									});
								} else {
									alert('131: created_uid=' + created_uid);
								}
							});
						} else {
							Cloud.PushNotifications.subscribe({
								channel : channel_value,
								device_token : token_value,
								user_id : uid,
								type : 'android'
							}, function(e) {
								if (e.success) {
									//debuggers.text += '\nsubscribe' + uid;
									callback(true, uid);
								} else {
									callback(false, e.message);
								}
							});
						}
					});
				} else {
					callback(false, admin_id);
				}

			});
		} else {
			/*
			 //actInd.message = 'Searching Cloud User...';
			 */
			CloudSearchUser(email_value, function(success, uid) {
				if (uid == "") {
					CloudCreateUser(email_value, "", "", "test", function(success, created_uid) {
						if (success) {
							Cloud.PushNotifications.subscribe({
								channel : channel_value,
								device_token : token_value,
								user_id : created_uid,
								type : 'android'
							}, function(e) {
								if (e.success) {
									callback(true, created_uid);
								} else {
									callback(false, e.message);
								}
							});
						} else {
							callback(false, created_uid);
						}
					});
				} else {
					Cloud.PushNotifications.subscribe({
						channel : channel_value,
						device_token : token_value,
						user_id : uid,
						type : 'android'
					}, function(e) {
						if (e.success) {
							callback(true, uid);
						} else {
							callback(false, e.message);
						}
					});

				}
			});
		}
	}

	function CloudUnsubscribeUser(user_id_value, channel_value, token_value, callback) {
		////actInd.message = 'Unsubscribing...';
		if (!admin_login) {
			//alert(token_value+":"+user_id_value);
			CloudLogin('admin@bonozo.com', 'admin', function(success, admin_id) {
				admin_login = true;
				////actInd.message = 'logged in admin...'+user_id_value+':'+token_value;

				Cloud.PushNotifications.unsubscribe({
					device_token : token_value,
					channel : channel_value,
					user_id : user_id_value
				}, function(e) {
					if (e.success) {
						////actInd.message = 'successful Unsss...';
						callback(true, 'Successfully unsubscribed');
					} else {
						//actInd.message = e.message;
						callback(false, e.message);
					}
				});
			});
		} else {
			// //actInd.message = 'Unsubscribingg Unsss...';
			Cloud.PushNotifications.unsubscribe({
				channel : channel_value,
				device_token : token_value,
				user_id : user_id_value
			}, function(e) {
				if (e.success) {
					// //actInd.message = 'successful Unsss...';
					callback(true, 'Successfully unsubscribed');
				} else {
					//actInd.message = e.message;
					callback(false, e.message);
				}
			});
		}
	}

	function ServerLogin(email_value, password_value, device_token_value, app_version_value, callback) {
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				var json = JSON.parse(this.responseText);
				if (json.Record != undefined) {
					if (remember) {
						Ti.App.Properties.setString('knp_email', emailField.value);
						Ti.App.Properties.setString('knp_password', passwordField.value);
						Ti.App.Properties.setString('knp_sound', (Ti.App.Properties.getString('knp_sound') == null) ? "ON" : "OFF");
					}
					callback(true, json.Record);
				} else if (json.Error != undefined) {
					if (json.Error.AuthException != undefined) {
						callback(false, json.Error.AuthException);
						//actInd.hide();
					} else if (json.Error.Request) {
						callback(false, json.Error.Request);
						//actInd.hide();
					} else {
						callback(false, "Unknown error occured!");
						//actInd.hide();
					}
				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://bonozo.com:8080/knp/?email=" + email_value + "&password=" + password_value + "&version=" + app_version_value + "&device_token=" + device_token_value
		});
	}

	function InsertUidAndToken(email_value, uid, token, callback) {
		// //actInd.message = 'inserting...';
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				var json = JSON.parse(this.responseText);
				if (json.Record[0] != undefined) {
					if (remember) {
						Ti.App.Properties.setString('knp_email', emailField.value);
						Ti.App.Properties.setString('knp_password', passwordField.value);
						if (!Ti.App.Properties.getString('knp_sound')) {
							Ti.App.Properties.setString('sound', 'ON')
						}
					}
					//alert(JSON.stringify(json.Record[0]));
					callback(true, json.Record[0]);
				} else if (json.Error != undefined) {
					if (json.Error.AuthException != undefined) {
						callback(false, json.Error.AuthException);
					} else if (json.Error.Request) {
						callback(false, json.Error.Request);
					} else {
						callback(false, "Unknown error occured!");
					}
				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://bonozo.com:8080/knp/insert_uid_token.php?email=" + email_value + "&uid=" + uid + "&token=" + token
		});
	}

	//load component dependencies
	var chooseClass;
	var remember = false;

	// The activity indicator must be added to a window or view for it to appear
	//message will only shows in android.

	//    var HeaderView = require('ui/common/LoginScreen/HeaderView');
	var viewstack = 0;
	viewstack = Titanium.App.Properties.getString("viewstack");
	if (viewstack == 0) {
		Titanium.App.Properties.setString("viewstack", 0);
	}
	//create component instance
	if (osname === 'android') {
		var CloudPush = require('ti.cloudpush');
		CloudPush.debug = true;
		CloudPush.enabled = true;
		CloudPush.showTrayNotificationsWhenFocused = true;
		CloudPush.focusAppOnPush = false;

		var deviceToken;

		var Cloud = require('ti.cloud');
		Cloud.debug = true;
	}

	var win = Ti.UI.createWindow();
	win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	var actInd = Titanium.UI.createActivityIndicator({
		color : '#333333',
		zIndex : 600
	});
	actInd.message = 'Signing In...';
	//win.add(actInd);

	var winWidth = Titanium.Platform.displayCaps.platformWidth;
	var winHeight = Titanium.Platform.displayCaps.platformHeight;

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
		width : (winWidth / 2),
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

	//actInd.show();

	/*
	 var headerView = new HeaderView();
	 win.add(headerView);
	 */

	var bgimageView = Ti.UI.createImageView({
		height : "100%",
		width : "100%",
		backgroundImage : "/assets/inventoryBackground.png"
	});
	win.add(bgimageView);
	var top_header = Titanium.UI.createImageView({
		height : "8.5%",
		width : "100%",
		bottom : '92.5%',
		image : '/assets/overlayTitleStarCurtains.png'
	});
	win.add(top_header);
	var header_label = Titanium.UI.createLabel({
		text : "SIGN IN",
		textAlign : 'center',
		color : '#4dd28f',
		font : {
			fontStyle : 'Century Gothic',
			fontSize : '16dip'
		},
		top : '1',
		height : '4.9%'
	});
	win.add(header_label);
	//creating mid image
	var logoImageView = Ti.UI.createImageView({
		top : "12%",
		height : "30%",
		width : "52%",
		image : "/assets/app_logo2.png"
	});
	win.add(logoImageView);

	// Create a Label.
	var debuggers = Ti.UI.createLabel({
		text : 'debuggers:',
		color : '#000000',
		font : {
			fontSize : 12
		},
		top : '12%',
		left : 0,
		textAlign : 'left'
	});
	//win.add(debuggers);
	var newUserButton = Ti.UI.createButton({
		color : '#761f56',
		title : "New User?",
		color : "white",
		top : "44%",
		width : "75%",
		// left : "15%",
		height : "10%",
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '0%',
				y : '0%'
			},
			endPoint : {
				x : '0%',
				y : '100%'
			},
			colors : [{
				color : '#21653d',
				offset : 0.0
			}, {
				color : '#00321f',
				offset : 0.25
			}, {
				color : '#21653d',
				offset : 1.0
			}],
		},

		/*backgroundGradient : {
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
		 },*/
		borderColor : '#b3fad0',
		borderRadius : '7',
		borderWidth : '1dip'
		// backgroundImage : "/assets/overlayItemList.png"
	});
	win.add(newUserButton);
	newUserButton.addEventListener('click', function(e) {
		var ChooseClass = require('/ui/common/MenuScreen/ChooseClass');
		chooseClass = new ChooseClass();
		chooseClass.open();
	});
	
	
	var emailField = Titanium.UI.createTextField({
		height : '10%',
		font : {
			fontSize : '12dip'
		},
		hintText : "Email",
		left : '12.5%',
		width : "75%",
		value : Ti.App.Properties.getString('knp_email'), //"robot1@email.com",
		borderRadius : 0,
		// backgroundColor : "#FFFFFF",
		borderColor : "#333333",
		// keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		// left : "15%",
		// backgroundColor : '#FFFFFF',
		// borderColor : "#333333",
		top : "55%"
	});
	win.add(emailField);
	if (osname === 'iphone' || osname === 'ipad') {
		emailField.addEventListener('focus', function() {
			win.animate({
				bottom : getPixelFromPercent('y', 30),
				duration : 500
			});
		});
		emailField.addEventListener('blur', function() {
			win.animate({
				bottom : 0,
				duration : 500
			});
		});
	}

	var passwordField = Titanium.UI.createTextField({
		// backgroundColor : "#FFFFFF",
		height : '10%',
		font : {
			fontSize : '12dip'
		},
		hintText : "Password",
		left : '12.5%',
		width : "75%",
		value : Ti.App.Properties.getString('knp_password'), //"robot1@email.com",
		borderRadius : 0,
		borderColor : "#333333",
		passwordMask : true,
		top : "65%"
		// height : '7%',
		// hintText : "Password",
		// backgroundColor : '#FFFFFF',
		// borderColor : "#333333",
		// // value : Ti.App.Properties.getString('knp_password'), //'test',
		// width : "75%",
		// // left : "15%",
		// top : "67%",
		// passwordMask : true
	});
	if (osname === 'iphone' || osname === 'ipad') {
		passwordField.addEventListener('focus', function() {
			win.animate({
				bottom : getPixelFromPercent('y', 30),
				duration : 500
			});
		});
		passwordField.addEventListener('blur', function() {
			win.animate({
				bottom : 0,
				duration : 500
			});
		});
	}
	if (osname !== 'android') {
		passwordField.borderRadius = '5';
		passwordField.backgroundColor = '#FFFFFF';
	} else {
		passwordField.value = Ti.App.Properties.getString('knp_password');
	}

	win.add(passwordField);
	var rememberCheckBox = Ti.UI.createSwitch({
		top : "73.5%",
		style : (osname === 'android') ? Ti.UI.Android.SWITCH_STYLE_CHECKBOX : "",
		height : 'auto',
		left : "12%",
		value : false
	});
	if (osname === 'android')
		win.add(rememberCheckBox);
	rememberCheckBox.addEventListener("change", function(e) {
		remember = e.value;
	});
	var rememberlabel = Ti.UI.createLabel({
		top : "68%",
		left : "26%",
		text : "Remember me",
		height : "20%",
		font : {
			fontSize : '14dip'
		},
	});
	if (osname === 'android')
		win.add(rememberlabel);

	// Create a Button.
	var forget_password_btn = Ti.UI.createButton({
		color : '#761f56',
		title : 'Forget Password',
		height : 'auto',
		width : "75%",
		color : '#FFF',
		top : '92%',
		// backgroundGradient : {
		// type : 'linear',
		// colors : ['#21653d', '#00321f'],
		// startPoint : {
		// x : '0%',
		// y : '0%'
		// },
		// endPoint : {
		// x : '0%',
		// y : '100%'
		// },
		// backFillStart : false
		// },
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '0%',
				y : '0%'
			},
			endPoint : {
				x : '0%',
				y : '100%'
			},
			colors : [{
				color : '#21653d',
				offset : 0.0
			}, {
				color : '#00321f',
				offset : 0.25
			}, {
				color : '#21653d',
				offset : 1.0
			}],
		},
		borderColor : '#b3fad0',
		borderRadius : '7',
		borderWidth : '1dip'
		// backgroundImage : "/assets/overlayItemList.png"
	});
	forget_password_btn.addEventListener('click', function() {
		if (emailField.value == "") {
			alert('Please enter your email address');
			return;
		}

		activityIndicator.show();
		activityIndicatorView.visible = true;
		activityIndicator.message = "Sending code...";
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				retreive_code_json = JSON.parse(this.responseText);

				activityIndicator.hide();
				activityIndicatorView.visible = false;

				if (retreive_code_json.Record.Error == 1) {
					alert(retreive_code_json.Record.Message);
					return;
				}
				var alertDialog = Titanium.UI.createAlertDialog({
					title : 'Password reset request',
					message : 'Password reset code has been sent to ' + emailField.value,
					buttonNames : ['OK']
				});
				alertDialog.show();
				alertDialog.addEventListener('click', function(e) {

					var ForgetPassword = require('/ui/common/MenuScreen/ForgetPassword');
					forgetpassword = new ForgetPassword(emailField.value);
					forgetpassword.open({
						modal : true
					});

				});
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://bonozo.com:8080/knp/get_password_reset_code.php?email=" + Ti.Network.encodeURIComponent(emailField.value),

		});

	});
	win.add(forget_password_btn);

	var signInButton = Ti.UI.createButton({
		color : '#761f56',
		title : "Sign In",
		top : "82%",
		color : "white",
		width : "75%",
		// left : "15%",
		height : "8%",
		// backgroundGradient : {
		// type : 'linear',
		// colors : ['#21653d', '#00321f'],
		// startPoint : {
		// x : '0%',
		// y : '0%'
		// },
		// endPoint : {
		// x : '0%',
		// y : '100%'
		// },
		// backFillStart : false
		// },
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '0%',
				y : '0%'
			},
			endPoint : {
				x : '0%',
				y : '100%'
			},
			colors : [{
				color : '#21653d',
				offset : 0.0
			}, {
				color : '#00321f',
				offset : 0.25
			}, {
				color : '#21653d',
				offset : 1.0
			}],
		},
		borderColor : '#b3fad0',
		borderRadius : '7',
		borderWidth : '1dip'
		// backgroundImage : "/assets/overlayItemList.png"
	});
	(function() {
		if (osname === 'iphone' || osname === 'ipad') {
			newUserButton.backgroundImage = "/assets/overlayItemList.png";
			forget_password_btn.backgroundImage = "/assets/overlayItemList.png";
			signInButton.backgroundImage = "/assets/overlayItemList.png";
			// signInButton.backgroundColor = '#21653d';
		}
	})();
	win.add(signInButton);
	signInButton.addEventListener('touchstart', function(e) {
		// signInButton.color = "black";
	});

	signInButton.addEventListener('touchend', function(e) {
		// signInButton.color = "white";
	});
	//   //actInd.hide();
	signInButton.addEventListener('click', function(e) {
		// JoustinGamePlay(quest_status, quest_id, userinfo);
		if (emailField.value == "" && passwordField.value == "") {
			alert('All fields are required!');
		} else {
			actInd.show();
			activityIndicator.show();
			activityIndicator.message = "Signing in...";
			activityIndicatorView.visible = true;
			emailField.value = emailField.value.toLowerCase();
			getToken(function(success, token) {
				// alert(token);return;
				if (success) {
					token = (osname === 'iphone' || osname === 'ipad') ? "" : token;

					ServerLogin(emailField.value, passwordField.value, token, '0.4.01', function(success, json) {
						if (osname === 'iphone' || osname === 'ipad') {
							Ti.App.Properties.setString('uid', json[0].UID);
							if (json[0].GENDER == 'r') {
								json = {
									Record : json
								};
								var ResetClass = require('/ui/common/MenuScreen/ResetClass');
								var ResetClassscreen = new ResetClass(json);
								ResetClassscreen.open();
								ResetClassscreen.addEventListener('open', function(e) {
									activityIndicator.hide();
									activityIndicatorView.visible = false;
								});
							} else {
								json = {
									Record : json
								};
								var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
								MainMenu = new MainMenuScreen(json);
								MainMenu.open();
								MainMenu.addEventListener('open', function(e) {
									activityIndicator.hide();
									activityIndicatorView.visible = false;
								});
							}
							return;
						}
						if (success) {
							if (json[0].LAST_USER == "NULL") {
								CloudSubscribeUser(emailField.value, 'alert', token, function(success, uid) {
									/*
									 //insert uid and device token in database
									 */
									if (success) {
										/*
										 //actInd.message = 'Insert Uid and Token ...';
										 */
										InsertUidAndToken(emailField.value, uid, token, function(success, message) {
											if (success) {
												CloudLogout(function(success, message) {
													json = {
														Record : json
													};
													rec = json;

													if (json.Record[0].GENDER == 'r') {
														var ResetClass = require('/ui/common/MenuScreen/ResetClass');
														var ResetClassscreen = new ResetClass(json);
														ResetClassscreen.open();
														ResetClassscreen.addEventListener('open', function(e) {
															activityIndicator.hide();
															activityIndicatorView.visible = false;
														});
													} else {
														var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
														MainMenu = new MainMenuScreen(json);
														MainMenu.open();
														MainMenu.addEventListener('open', function(e) {
															activityIndicator.hide();
															activityIndicatorView.visible = false;
														});
													}
													///////
												});
											} else {
												alert("565:" + message);
											}
										});
									} else {
										alert("569:" + uid);
									}
								});
							} else if (json[0].LAST_USER == "ME") {
								json = {
									Record : json
								};

								if (json.Record[0].GENDER == 'r') {
									var ResetClass = require('/ui/common/MenuScreen/ResetClass');
									var ResetClassscreen = new ResetClass(json);
									ResetClassscreen.open();
									ResetClassscreen.addEventListener('open', function(e) {
										activityIndicator.hide();
										activityIndicatorView.visible = false;
									});
								} else {
									var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
									MainMenu = new MainMenuScreen(json);
									MainMenu.open();
									MainMenu.addEventListener('open', function(e) {
										activityIndicator.hide();
										activityIndicatorView.visible = false;
									});
								}
								//actInd.hide();
							} else if (json[0].LAST_USER == "OTHER") {
								//alert("m in other"+json[0].DEVICE_TOKEN);
								CloudSearchUser(json[0].EMAIL, function(success, last_user_id) {
									//var last_email = json[0].LAST_USER;
									//alert(last_user_id);
									if (success) {
										CloudUnsubscribeUser(last_user_id, 'alert', json[0].DEVICE_TOKEN, function(success, message) {

											CloudSubscribeUser(emailField.value, 'alert', token, function(success, uid) {
												InsertUidAndToken(emailField.value, uid, token, function(success, message) {
													if (success) {
														json = {
															Record : json
														};

														if (json.Record[0].GENDER == 'r') {
															var ResetClass = require('/ui/common/MenuScreen/ResetClass');
															var ResetClassscreen = new ResetClass(json);
															ResetClassscreen.open();
															ResetClassscreen.addEventListener('open', function(e) {
																activityIndicator.hide();
																activityIndicatorView.visible = false;
															});
														} else {
															var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
															MainMenu = new MainMenuScreen(json);
															MainMenu.open();
															MainMenu.addEventListener('open', function(e) {
																activityIndicator.hide();
																activityIndicatorView.visible = false;
															});
														}
														//actInd.hide();
													} else {
														alert('629:' + message);
													}
												});
											});
										});
									} else {
										alert('635:' + last_user_id);
									}

								});

							} else {
								CloudSearchUser(json[0].LAST_USER, function(success, last_user_id) {
									var last_email = json[0].LAST_USER;
									CloudUnsubscribeUser(last_user_id, 'alert', token, function(success, message) {

										CloudSubscribeUser(emailField.value, 'alert', token, function(success, uid) {
											/*
											//insert uid and device token in database
											*///alert(uid);
											////actInd.message = "Inserting uid" + uid+"::"+token+":"+emailField.value;
											InsertUidAndToken(emailField.value, uid, token, function(success, message) {
												if (success) {
													json = {
														Record : json
													};
													InsertUidAndToken(last_email, "", "", function(success, message) {
														if (success) {

															if (json.Record[0].GENDER == 'r') {
																var ResetClass = require('/ui/common/MenuScreen/ResetClass');
																var ResetClassscreen = new ResetClass(json);
																ResetClassscreen.open();
																ResetClassscreen.addEventListener('open', function(e) {
																	activityIndicator.hide();
																	activityIndicatorView.visible = false;
																});
															} else {
																var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
																MainMenu = new MainMenuScreen(json);
																MainMenu.open();
																MainMenu.addEventListener('open', function(e) {
																	activityIndicator.hide();
																	activityIndicatorView.visible = false;
																});
															}
															//actInd.hide();
														} else {
															alert("677:" + message);
														}
													});
												} else {
													alert("681" + message);
												}
											});
										});

									});
									//CloudUnsubscribeUser
								});
								//CloudSearchUser

							}
						} else {
							alert("693:" + json);
							activityIndicator.hide();
							activityIndicatorView.visible = false;
							//actInd.hide();
						}
					});
				} else {
					alert("700:" + token);
					activityIndicator.hide();
					activityIndicatorView.visible = false;
					//actInd.hide();
				}
			});
		}
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
	win.addEventListener("open", function() {
		if (Ti.Platform.name === 'iPhone OS') {
			newUserButton.backgroundColor = '#1a3425';
			signInButton.backgroundColor = '#1a3425';
			forget_password_btn.backgroundColor = '#1a3425';
		}
	});
	if (osname === 'android') {
		CloudPush.addEventListener('callback', function(evt) {
			//alert(evt);
			//alert(evt.payload);
		});

		CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
			//Ti.API.info('Tray Click Launched App (app was not running)');
			//alert('Tray Click Launched App (app was not running');
		});

		CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
			//Ti.API.info('Tray Click Focused App (app was already running)');
			//alert('Tray Click Focused App (app was already running)');
		});
	}

	return win;
}

//make constructor function the public component interface
module.exports = LoginWindow;
