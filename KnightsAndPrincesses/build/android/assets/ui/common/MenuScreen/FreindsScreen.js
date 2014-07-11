//http://bonozo.com:8080/knp/friendship_notifications_action.php?uid=10000005&friend_uid=10000007&action=DENIED
//http://bonozo.com:8080/knp/friendship_notifications_action.php?uid=10000005&friend_uid=10000007&action=FRIENDS
function FreindsScreen(userinfo) {
	var tabledata = [];
	var rowView = [];
	function releaseOldTable(callback){
		tabledata.length = 0;// [];
		rowView.length = 0;//  = [];
		// Ti.API.info('rowView.length : ' + rowView.length);
		// for (var i=0; i < rowView.length; i++) {
		  // var views = rowView[i].getChildren();
		  // rowView[i].removeAllChildren();
		  // Ti.API.info('views.length : ' + views.length);
		  // for (var j=0; j < views.length; j++) {
			// views[j] = null;
		  // }
		  // rowView[i] = null;
		// }
		callback();
	}
	function openNewTable(userinfojson, activeTable, callback) {
		releaseOldTable(function(){
			var TableView = require('ui/common/MenuScreen/' + activeTable);
			TableView(userinfojson, tabledata, rowView, function(Tableview) {
				callback(Tableview);
			});
		});
	}

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var activeTable = "AvatarByFriends";
	var lastActiveTable = activeTable; 
	var process_list = true;
	var main_table_view;
	var tableview;
	var view = Titanium.UI.createView({
		top : "23.5%",
		height : "78%",
		width : "100%"
	});
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
	var main_view = Ti.UI.createView();

	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return screenWidth * percent / 100;
		} else if (axis == 'y') {
			return screenHeight * percent / 100;
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
		left : getPixelFromPercent('x', 50) - (screenWidth / 4),
		top : getPixelFromPercent('x', 42),
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
	// activityIndicator.message = 'Loading...';
	activityIndicatorView.add(activityIndicator);
	view.add(activityIndicatorView);
	activityIndicator.show();
	activityIndicatorView.visible = true;
	///////////////////////////////////////////////////////////// end of icons bars //////
	///////////////////////////////////////////////////////////////////////////////////
	var subView = Ti.UI.createView({
		zIndex : 200,
		backgroundGradient : {
			type : 'linear',
			colors : ['#3258ad', '#010f49'],
			startPoint : {
				x : '50%',
				y : '0%'
			},
			endPoint : {
				x : '50%',
				y : '100%'
			},
			backFillStart : false
		},
		width : '100%',
		height : '100%'
	});
	openNewTable(userinfo, activeTable, function(tableview) {
		main_table_view = tableview;
		view.add(main_table_view);
		process_list = !process_list;
		activityIndicator.hide();
		activityIndicatorView.visible = false;
	});

	///////////////////////////////////////////////////////////////////////////////////

	var gift_notification = Titanium.UI.createButton({color: '#761f56',
		title : "Gift Notifications",
		backgroundImage : '/assets/button_smallLong_UP.png',
		left : "2%",
		top : "70%",
		font : {
			fontSize : '12dip'
		},
		zIndex : 600,
		width : "35%",
		height : "8%"
	});
	view.add(gift_notification);
	gift_notification.addEventListener('click', function(e) {
		var gift_notification = require('ui/common/MenuScreen/GiftNotifications');
		var GiftNotiFromFreind = new gift_notification(userinfo);
		GiftNotiFromFreind.open();
	});

	var req_notification = '';
	var new_request_imageview;
	var gift_imageview;
	var gift_icon = '';
	new_request_imageview = Titanium.UI.createImageView({
		image : '/assets/message_alert.png',
		width : '4%',
		height : getPixelFromPercent('x',4),
		right : '1.6%',
		bottom : '14.9%',
		zIndex : 900,
		visible : false
	});
	view.add(new_request_imageview);
	Ti.App.addEventListener('NEW_REQUEST',function(data){
		new_request_imageview.zIndex = 900;
		if(data.status)
			new_request_imageview.visible = true;
		else
			new_request_imageview.visible = false;
	});
	var get_notification_url = "http://bonozo.com:8080/knp/get_notifications.php?uid=" + userinfo.Record[0].UID;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				req_notification = items_json.Record[0].REQUEST;
				gift_icon = items_json.Record[0].GIFT;
				if (req_notification == 'NEW_REQUEST') {
					new_request_imageview.visible = true;
				}
				if (items_json.Record[0].GIFT == 'NEW_GIFT') {
					gift_imageview = Titanium.UI.createImageView({
						image : '/assets/message_alert.png',
						width : '4%',
						height : '4%',
						left : '2.7%',
						bottom : '27%',
						zIndex : 600
					});
					view.add(gift_imageview);

				}
			}

		},
		method : 'GET',
		contentType : 'text/xml',
		url : get_notification_url
	});
	//if(req_notification == "NEW_REQUEST"){
	Ti.App.addEventListener("request_send", function() {
		new_request_imageview.hide();
		//req_notification = "NO_REQUEST";

	});
	//}

	Ti.App.addEventListener("gift_Notification", function() {
		if (gift_icon == 'NEW_GIFT') {
			gift_imageview.hide();
		}
	});

	var request_button = Ti.UI.createButton({ color: '#761f56',
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'REQUEST',
		width : '17%',
		height : '6.5%',
		right : '2.7%',
		bottom : '15.1%',
		zIndex : 900
	});
	view.add(request_button);
	// Ti.App.addEventListener('data_removed',function(data){
	    // activeTable = data.new_table;
		// main_table_view.data = null;
		// view.remove(main_table_view);
		// main_table_view = null;
		// openNewTable(userinfo, activeTable, function(tableview) {
			// main_table_view = tableview;
			// view.add(main_table_view);
			// process_list = !process_list;
			// activityIndicator.hide();
			// activityIndicatorView.visible = false;
		// });
	// });
	function fireTableChangeEvent(newTable){
	    Ti.App.fireEvent('avatar_table_changed', {
	        release_table 	: activeTable,
	        new_table : newTable
	    });
	    activeTable = newTable;
		main_table_view.data = null;
		view.remove(main_table_view);
		main_table_view = null;
		openNewTable(userinfo, activeTable, function(tableview) {
			main_table_view = tableview;
			view.add(main_table_view);
			process_list = !process_list;
			activityIndicator.hide();
			activityIndicatorView.visible = false;
		});
	}
	// Ti.App.addEventListener('render_table',function(data){
		// main_table_view.data = null;
		// view.remove(main_table_view);
		// main_table_view = null;
		// openNewTable(userinfo, activeTable, function(tableview) {
			// main_table_view = tableview;
			// view.add(main_table_view);
			// process_list = !process_list;
			// activityIndicator.hide();
			// activityIndicatorView.visible = false;
		// });
	// });
	request_button.addEventListener('click', function(e) {
		if (!process_list) {
			activityIndicator.show();
			activityIndicatorView.visible = true;
			fireTableChangeEvent("AvatarByRequest");
			process_list = !process_list;
			// view.remove(main_table_view);
			// main_table_view = null;
			// activeTable = 'AvatarByRequest';
			// openNewTable(userinfo, activeTable, function(tableview) {
				// main_table_view = tableview;
				// view.add(main_table_view);
				// process_list = !process_list;
				// activityIndicator.hide();
				// activityIndicatorView.visible = false;
			// });
		}
	});

	var myfriend_button = Ti.UI.createButton({ color: '#761f56',
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'FRIENDS',
		width : '17%',
		height : '6.5%',
		right : '20.8%',
		bottom : '15.1%',
		zIndex : 900
	});
	view.add(myfriend_button);
	myfriend_button.addEventListener('click', function(e) {
		if (!process_list) {
			activityIndicator.show();
			activityIndicatorView.visible = true;
			fireTableChangeEvent("AvatarByFriends");
			process_list = !process_list;
			// view.remove(main_table_view);
			// main_table_view = null;
			// activeTable = 'AvatarByFriends';
			// openNewTable(userinfo, activeTable, function(tableview) {
				// main_table_view = tableview;
				// view.add(main_table_view);
				// process_list = !process_list;
				// activityIndicator.hide();
				// activityIndicatorView.visible = false;
			// });
		}
	});
	var female_button = Ti.UI.createButton({ color: '#761f56',
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'FEMALE',
		width : '17%',
		height : '6.5%',
		right : '37.9%',
		bottom : '15.1%',
		zIndex : 900
	});
	view.add(female_button);
	female_button.addEventListener('click', function(e) {
		if (!process_list) {
			activityIndicator.show();
			activityIndicatorView.visible = true;
			fireTableChangeEvent("AvatarByFemale");
			process_list = !process_list;
			// view.remove(main_table_view);
			// main_table_view = null;
			// activeTable = 'AvatarByFemale';
			// openNewTable(userinfo, activeTable, function(tableview) {
				// main_table_view = tableview;
				// view.add(main_table_view);
				// process_list = !process_list;
				// activityIndicator.hide();
				// activityIndicatorView.visible = false;
			// });
		}
	});

	var male_button = Ti.UI.createButton({ color: '#761f56',
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'MALE',
		width : '17%',
		height : '6.5%',
		right : '55%',
		bottom : '15.1%',
		zIndex : 900
	});
	view.add(male_button);
	male_button.addEventListener('click', function(e) {
		if (!process_list) {
			activityIndicator.show();
			activityIndicatorView.visible = true;
			fireTableChangeEvent("AvatarByMale");
			process_list = !process_list;
			// view.remove(main_table_view);
			// main_table_view = null;
			// activeTable = 'AvatarByMale';
			// openNewTable(userinfo, activeTable, function(tableview) {
				// main_table_view = tableview;
				// view.add(main_table_view);
				// process_list = !process_list;
				// activityIndicator.hide();
				// activityIndicatorView.visible = false;
			// });
		}
	});

	var online_button = Ti.UI.createButton({ color: '#761f56',
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'ONLINE',
		width : '17%',
		height : '6.5%',
		right : '2.7%',
		bottom : '21%',
		zIndex : 900
	});
	//view.add(online_button);

	var coin_button = Ti.UI.createButton({ color: '#761f56',
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'COIN',
		width : '17%',
		height : '6.5%',
		right : '2.7%',
		bottom : '21%',
		zIndex : 900
	});
	view.add(coin_button);
	coin_button.addEventListener('click', function(e) {
		if (!process_list) {
			activityIndicator.show();
			activityIndicatorView.visible = true;
			fireTableChangeEvent("AvatarByGold");
			process_list = !process_list;
			// view.remove(main_table_view);
			// main_table_view = null;
			// activeTable = 'AvatarByGold';
			// openNewTable(userinfo, activeTable, function(tableview) {
				// main_table_view = tableview;
				// view.add(main_table_view);
				// process_list = !process_list;
				// activityIndicator.hide();
				// activityIndicatorView.visible = false;
			// });
		}
	});

	var level_button = Ti.UI.createButton({ color: '#761f56',
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'LEVEL',
		width : '17%',
		height : '6.5%',
		right : '20.8%',
		bottom : '21%',
		zIndex : 900
	});
	view.add(level_button);
	level_button.addEventListener('click', function(e) {
		if (!process_list) {
			activityIndicator.show();
			activityIndicatorView.visible = true;
			fireTableChangeEvent("AvatarByLevel");
			process_list = !process_list;
			// view.remove(main_table_view);
			// main_table_view = null;
			// activeTable = 'AvatarByLevel';
			// openNewTable(userinfo, activeTable, function(tableview) {
				// main_table_view = tableview;
				// view.add(main_table_view);
				// process_list = !process_list;
				// activityIndicator.hide();
				// activityIndicatorView.visible = false;
			// });
		}
	});

	var sort_label = Ti.UI.createLabel({
		text : 'SORT',
		color : '#58fe9b',
		left : '10%',
		bottom : '18%',
		textAlign : 'right',
		font : {
			fontWeight : 'bold',
			fontSize : '14dip'
		}
	});
	// view.add(sort_label);
	Ti.App.addEventListener('update_friend_list', function(data) {
		view.remove(main_table_view);
		activeTable = data.activeScreen;
		openNewTable(userinfo, activeTable, function(tableview) {
			main_table_view = tableview;
			view.add(main_table_view);
		});
	});
	//// Event for sort

	return view;
};
module.exports = FreindsScreen;