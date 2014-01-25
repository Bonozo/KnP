function MainMenuScreen(userinfojson) {
	function openNewBody(userinfojson, activeScreen) {
		var Body = require('ui/common/MenuScreen/' + activeScreen);
		return Body(userinfojson);
	}

	function isiOS4Plus() {
		if (Titanium.Platform.name == 'iPhone OS') {
			var version = Titanium.Platform.version.split(".");
			var major = parseInt(version[0]);
			// can only test this support on a 3.2+ device
			if (major >= 4) {
				return true;
			}
		}
		return false;
	}

	var osname = Ti.Platform.osname;
	var active_screen = "StatusScreen";
	var MainScreen = [];
	var json = userinfojson;

	var main_window = Titanium.UI.createWindow({
		// touchEnabled : false,
		backgroundImage : '/assets/inventoryBackground.png'
	});
	main_window.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	Ti.App.addEventListener('close_window', function() {
		main_window.close();
	});
	var images_counter = 0;
	function hideLoader() {
		images_counter++;
		if (images_counter >= 3) {
			//actInd.hide();
			if (userinfojson.Record[0].NAME == '') {
				var ResetClass = require('/ui/common/MenuScreen/ResetClass');
				var ResetClassscreen = new ResetClass(userinfojson);
				ResetClassscreen.open();
			}
			Ti.App.fireEvent("signed_in");
		}
	}
	Ti.App.Properties.setString('uid', userinfojson.Record[0].UID);

	if (osname === 'iphone' || osname === 'ipad') {
		if (isiOS4Plus()) {

			var service;
			Ti.App.Properties.setString('service_enabled', true);
			// service = Ti.App.iOS.registerBackgroundService({
				// url : 'notificationservice.js'
			// });
			// Ti.API.info("registered background service = " + service);
// 
			// Ti.App.iOS.addEventListener('notification', function(e) {
				// // You can use this event to pick up the info of the noticiation.
				// // Also to collect the 'userInfo' property data if any was set
				// Ti.API.info("local notification received: " + JSON.stringify(e));
			// });
// 
			// // fired when an app resumes from suspension
			// Ti.App.addEventListener('resume', function(e) {
				// Ti.API.info("app is resuming from the background");
			// });
			// Ti.App.addEventListener('pause', function(e) {
				// Ti.API.info("app has pause from foreground");
				// // this will unregister the service if the user just opened the app
				// // ie: not via the notification 'OK' button..
				// if (service != null) {
					// Ti.App.Properties.setString('service_enabled', false);
					// service.stop();
					// service.unregister();
				// }
				// //Titanium.UI.iPhone.appBadge = null;
			// });

			// Ti.App.addEventListener('pause', function(e) {
			// Ti.API.info("app was paused from the foreground");

			// });
		}

	} else {
		var SECONDS = 5;
		// every 5 seconds
		var service_intent = Titanium.Android.createServiceIntent({
			url : 'services/notificationservice.js'
		});
		service_intent.putExtra('interval', SECONDS * 1000);
		// Needs to be milliseconds
		service_intent.putExtra('uid', userinfojson.Record[0].UID);
		Titanium.Android.startService(service_intent);
	}

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
		top : (screenHeight / 2),
		left : (screenWidth / 4),
		height : '8%',
		width : (screenWidth / 2)
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
	// activityIndicator.message = 'Loading...';
	activityIndicatorView.add(activityIndicator);
	main_window.add(activityIndicatorView);
	// service_intent.putExtra('uid', userinfojson.Record[0].UID);
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			var userinfojson = JSON.parse(this.responseText);

			var ProgressBar = require('ui/common/menus/ProgressBar');
			MainScreen.header = ProgressBar(userinfojson);
			ProgressBar = null;

			var Footer = require('ui/common/menus/Footer');
			MainScreen.footer = Footer(userinfojson);
			Footer = null;
			main_window.add(MainScreen.header);
			main_window.add(MainScreen.footer);

			hideLoader();
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + userinfojson.Record[0].UID + "",
	});

	activityIndicator.show();
	activityIndicatorView.visible = true;

	MainScreen.body = openNewBody(userinfojson, active_screen);
	main_window.add(MainScreen.body);

	activityIndicator.hide();
	activityIndicatorView.visible = false;

	var MenuIcons = require('ui/common/menus/MenuIcons');
	MainScreen.menuIcons = MenuIcons(active_screen);
	MenuIcons = null;
	main_window.add(MainScreen.menuIcons);

	hideLoader();

	Ti.App.addEventListener('menu_active', function(data) {
		activityIndicator.show();
		activityIndicatorView.visible = true;

		main_window.remove(MainScreen.body);
		MainScreen.body = openNewBody(json, data.clicked_item);
		main_window.add(MainScreen.body);

		activityIndicator.hide();
		activityIndicatorView.visible = false;
	});
	Ti.App.addEventListener('new_info', function(data) {
		activityIndicator.show();
		activityIndicatorView.visible = true;

		main_window.remove(MainScreen.body);
		json = data.userinfojson;
		MainScreen.body = openNewBody(data.userinfojson, data.clicked_item);
		main_window.add(MainScreen.body);

		activityIndicator.hide();
		activityIndicatorView.visible = false;

	});
	Ti.App.addEventListener('game_played', function(updateduserjsoninfo) {
		//updateduserjsoninfo;
	});

	main_window.addEventListener('open', function(e) {
		hideLoader();
	});
	main_window.addEventListener('android:back', function(e) {
		Titanium.Android.stopService(service_intent);
		var activity = Titanium.Android.currentActivity;
		activity.finish();
	});

	//main_window.add(view);
	return main_window;

};
module.exports = MainMenuScreen;
