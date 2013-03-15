function OptionsScreen(userinfo) {
	var view = Titanium.UI.createView({
		top : "23%",
		height : "78%",
		width : "100%",
		backgroundImage : '/assets/inventoryBackground.png'

	});
	var CloudPush = require('ti.cloudpush');
	CloudPush.debug = true;
	CloudPush.enabled = true;
	CloudPush.showTrayNotificationsWhenFocused = true;
	CloudPush.focusAppOnPush = false;

	var deviceToken;

	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	function getToken(callback) {
		CloudPush.retrieveDeviceToken({
			success : function deviceTokenSuccess(e) {
				callback(e.deviceToken);
				deviceToken = e.deviceToken
			},
			error : function deviceTokenError(e) {
				alert('Failed to register for push! ' + e.error);
			}
		});

	}

	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Options',
		top : '0%',
		left : '84.8%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(selected_menu_label);
	var version_label = Titanium.UI.createLabel({
		text : 'v0.3.22',
		bottom : '16%',
		left : '84.8%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(version_label);
	var gender = userinfo.Record[0].GENDER;
	var character_imageview = Titanium.UI.createImageView({
		height : '75%',
		width : '30%',
		top : "5%",
		left : '0%',
		image : (gender == 'm')?'/assets/K_fullbody_bad.png':'/assets/hdpi_female_character_Image2.png',
		//zIndex : 500
	});
	view.add(character_imageview);
	character_imageview.addEventListener('load', function(e) {
		//hideLoader();
	});
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.

	/*var topbar=require('ui/common/TopBar/ProgressBar');
	var bar=new topbar();
	view.add(bar);

	var buttonbar=require('ui/common/ButtonBar/bar');
	var button=new buttonbar();
	view.add(button);
	*/
	///ui for option screen

	var sound_button = Titanium.UI.createButton({
		top : "7%",
		right : "5%",
		height : "9%",
		title : "SOUND ON",
		width : "60%",
		borderColor : "#a42b76",
		borderRadius : 6,
		borderWidth : 3,
		backgroundGradient : {
			type : 'linear',
			colors : [' #e49cc9', '#a52b76'],
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			backFillStart : false
		}
	});
	view.add(sound_button);
	var Music_button = Titanium.UI.createButton({
		top : "19%",
		right : "5%",
		height : "9%",
		title : "MUSIC ON",
		width : "60%",
		borderColor : "#a42b76",
		borderRadius : 6,
		borderWidth : 3,
		backgroundGradient : {
			type : 'linear',
			colors : [' #e49cc9', '#a52b76'],
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			backFillStart : false
		}
	});
	view.add(Music_button);
	var Notification_button = Titanium.UI.createButton({
		top : "31%",
		right : "5%",
		height : "9%",
		title : "NOTIFICATION ON/OFF",
		textAlign : 'left',
		width : "60%",
		borderColor : "#a42b76",
		borderRadius : 6,
		borderWidth : 3,
		backgroundGradient : {
			type : 'linear',
			colors : [' #e49cc9', '#a52b76'],
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			backFillStart : false
		}
	});
	view.add(Notification_button);
	Notification_button.addEventListener('click', function(e) {

		var ConfirmationAlert = Titanium.UI.createAlertDialog({

			title : 'Click \'Yes\' Change settings.',
			message : 'Are you Sure?',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});
					ConfirmationAlert.show();

		ConfirmationAlert.addEventListener('click', function(e) {
			Titanium.API.info('e = ' + JSON.stringify(e));

		if (e.cancel === e.index || e.cancel === true) {
			return;
		}
		//now you can use parameter e to switch/case
		switch (e.index) {
			case 0:
				actInd.show();
				getToken(function(token) {
					var set_notification_url = "http://justechinfo.com/kap_server/set_notification.php?uid=" + userinfo.Record[0].UID + "&device_token=" + token;
					var httpclientt = require('/ui/common/Functions/function');
					httpclientt.requestServer({
						success : function(e) {
							items_json = JSON.parse(this.responseText);
							if (items_json.Message != undefined) {
								alert(items_json.Message[0]);
							}
							actInd.hide();

						},
						method : 'GET',
						contentType : 'text/xml',
						url : set_notification_url
					});
				});

				break;
			//This will never be reached, if you specified cancel for index 1
			case 1:
				// alert('Clicked button 1 (NO)');
				break;
			default:
				break;

		}

		});

	});

	var Report_button = Titanium.UI.createButton({
		top : "43%",
		right : "5%",
		height : "9%",
		title : "REPORT ABUSE",
		width : "60%",
		borderColor : "#a42b76",
		borderRadius : 6,
		borderWidth : 3,
		backgroundGradient : {
			type : 'linear',
			colors : [' #e49cc9', '#a52b76'],
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			backFillStart : false
		}//backgroundImage:"/assets/button_large_UP.png"
	});
	view.add(Report_button);
	var Reset_button = Titanium.UI.createButton({
		top : "55%",
		right : "5%",
		height : "9%",
		title : "RESET GAME",
		width : "60%",
		borderColor : "#a42b76",
		borderRadius : 6,
		borderWidth : 3,
		backgroundGradient : {
			type : 'linear',
			colors : [' #e49cc9', '#a52b76'],
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			backFillStart : false
		}
	});
	view.add(Reset_button);
	Reset_button.addEventListener('click', function(e) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'WARNING!',
			message : 'All the data will be Lost.',
			buttonNames : ['OK']
		});
		alertDialog.show();
		alertDialog.addEventListener('click', function(e) {
			ConfirmationAlert.show();
			//alert(userinfo.Record[0].UID);
		});

		var ConfirmationAlert = Titanium.UI.createAlertDialog({
			title : 'Click \'Yes\' to Reset Game.',
			message : 'Are you Sure?',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});

		ConfirmationAlert.addEventListener('click', function(e) {
			Titanium.API.info('e = ' + JSON.stringify(e));

			//Clicked cancel, first check is for iphone, second for android
			if (e.cancel === e.index || e.cancel === true) {
				return;
			}
			//now you can use parameter e to switch/case
			switch (e.index) {
				case 0:
					var ResetClass = require('/ui/common/MenuScreen/ResetClass');
					var ResetClassscreen = new ResetClass(userinfo);
					ResetClassscreen.open();

					actInd.show();
					var reset_option_url = "http://justechinfo.com/kap_server/reset_option.php?uid=" + userinfo.Record[0].UID;
					var httpclientt = require('/ui/common/Functions/function');
					httpclientt.requestServer({
						success : function(e) {
							Ti.App.fireEvent('update_footer', {
								clicked_item : 'OptionScreen'
							});

							items_json = JSON.parse(this.responseText);
							if (items_json.Record != undefined) {
								if (items_json.Record.Message != '') {
									alert(items_json.Record.Message);
									actInd.hide();
								}
							}

						},
						method : 'GET',
						contentType : 'text/xml',
						url : reset_option_url
					});

					break;
				//This will never be reached, if you specified cancel for index 1
				case 1:
					// alert('Clicked button 1 (NO)');
					break;
				default:
					break;

			}

		});

	});
	////ui for option screen
	/*
	//module for bottom bar
	var botombar=require('ui/common/BottomBar/bottom');
	var bottom=new botombar();
	view.add(bottom);
	*/
	//module for bottom bar
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

	return view;
};

module.exports = OptionsScreen;
