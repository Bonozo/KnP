function GiftNotifications(userinfo) {

	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;

	var view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundImage : '/assets/inventoryBackground.png'

	});
	self.add(view);

	var gender = userinfo.Record[0].GENDER;

	var Avatar = require('/ui/common/drawings/Avatar');
	var Settings = require('/ui/common/drawings/Settings');
	var settings = new Settings();
	var avatar_config = {};
	avatar_config.gender = gender;
	avatar_config.main_view = {
		width : settings.avatar_width * 1.50,
		height : settings.avatar_height * 1.50
	};
	if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {
		avatar_config.appearence = {
			hair_back : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-back.png',
			face : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
			dress : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
			hair_front : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-front.png',
			jewelery : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png'

		};
		var avatar = new Avatar(avatar_config);
		view.add(avatar);
	} else if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {
		avatar_config.appearence = {
			dress : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
			helmet : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[4].IMAGE + '.png',
			shield : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[5].IMAGE + '.png',
			hair_back : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-back.png',
			face : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
			hair_front : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-front.png',
			weapon : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png'
		};
		var avatar = new Avatar(avatar_config);
		view.add(avatar);
	} else {
		if (userinfo.Record[0].GENDER == 'f') {
			//alert(JSON.stringify(callback_record));
			var Defaults = require('/ui/common/drawings/Defaults');
			var defaults = new Defaults('f', function(callback_record) {
				avatar_config.appearence = {
					hair_back : '/assets/princess/' + callback_record.hair.IMAGE + '-back.png',
					face : '/assets/princess/' + callback_record.face.IMAGE + '.png',
					dress : '/assets/princess/' + callback_record.dress.IMAGE + '.png',
					hair_front : '/assets/princess/' + callback_record.hair.IMAGE + '-front.png',
					jewelery : '/assets/princess/' + callback_record.jwelery.IMAGE + '.png'
				};
				var avatar = new Avatar(avatar_config);
				view.add(avatar);
			});
		} else {
			var Defaults = require('/ui/common/drawings/Defaults');
			var defaults = new Defaults('m', function(callback_record) {
				avatar_config.appearence = {
					dress : '/assets/knight/' + callback_record.dress.IMAGE + '.png',
					helmet : '/assets/knight/' + callback_record.helmet.IMAGE + '.png',
					shield : '/assets/knight/' + callback_record.shield.IMAGE + '.png',
					hair_back : '/assets/knight/' + callback_record.hair.IMAGE + '-back.png',
					face : '/assets/knight/' + callback_record.face.IMAGE + '.png',
					hair_front : '/assets/knight/' + callback_record.hair.IMAGE + '-front.png',
					weapon : '/assets/knight/' + callback_record.weapons.IMAGE + '.png'
				};
				var avatar = new Avatar(avatar_config);
				view.add(avatar);
			});
		}
	}

	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height : '6.4%',
		width : '100%',
		bottom : '94.6%'
	});
	view.add(top_imageview);

	var name_label = Titanium.UI.createLabel({
		text : userinfo.Record[0].NAME,
		top : '0',
		height : '3.1%',
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '12dip'
		}
	});
	view.add(name_label);

	var txt_label = Titanium.UI.createLabel({
		text : 'Gift Notifications',
		top : '0',
		height : '3.1%',
		right : '8%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '12dip'
		}
	});
	view.add(txt_label);

	var return_imageview = Titanium.UI.createImageView({
		image : '/assets/iconReturn.png',
		height : '8%',
		width : '11.6%',
		zIndex : 600,
		top : '1%',
		right : '3%'
	});
	view.add(return_imageview);

	return_imageview.addEventListener('click', function(e) {
		self.close();
	});

	var current_row;
	var new_message_imageview;
	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var rowViewHeight = screenWidth * 0.119;
	var httpclientt = require('/ui/common/Functions/function');
	function createDeleteView() {
		var view = Ti.UI.createView({
			backgroundColor : 'blue',
			width : '100%',
			height : '100%'
		});
		var aLabel = Ti.UI.createLabel({
			text : 'aLabel',
			color : '#000000',
			font : {
				fontSize : '12dp'
			},
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		view.add(aLabel);
		return view;
	}

	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var rowViewHeight = screenWidth * 0.119;
	var httpclientt = require('/ui/common/Functions/function');
	var items_json = "";

	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var rowViewHeight = screenWidth * 0.189;
				var bg_image = '';
				var avatar_image = "";

				Ti.App.fireEvent('gift_Notification', {
					count : '0'
				});

				for (var i = 0; i < items_json.Record.length; i++) {

					var action_view = createDeleteView();

					if (items_json.Record[i].VIEWED == 'UNSEEN') {
						var rowView = Ti.UI.createTableViewRow({
							className : 'gift_notification_unseen',
							height : rowViewHeight,
							uid : items_json.Record[i].INV_TRANS_ID,
							index : i,
							backgroundImage : '/assets/overlayItemList_highlight.png',
							zIndex : 10
						});

					} else {
						var rowView = Ti.UI.createTableViewRow({
							className : 'gift_notification_seen',
							height : rowViewHeight,
							uid : items_json.Record[i].INV_TRANS_ID,
							index : i,
							backgroundImage : '/assets/overlayItemList.png',
							zIndex : 10
						});
					}
					rowView.addEventListener('longclick', function(e) {

						Titanium.Media.vibrate();
						var RemoveNotification = require('/ui/common/MenuScreen/RemoveNotification');
						var removenotification = new RemoveNotification(items_json.Record[e.index].INV_TRANS_ID, e.index);
						removenotification.open({
							modal : true
						});
					});
					var gift_label = Ti.UI.createLabel({
						text : items_json.Record[i].SENDER_NAME, // + ' sent you a '+items_json.Record[i].GIFT_NAME,
						font : {
							fontSize : '20dip'
						},
						color : '#b3fad0',
						left : '8%',
						top : '10%'
					});
					rowView.add(gift_label);
					var gift_type = Ti.UI.createLabel({
						text : ' sent you a ' + items_json.Record[i].GIFT_NAME,
						font : {
							fontSize : '16dip'
						},
						color : '#b3fad0',
						left : '31%',
						top : '14.5%'
					});
					rowView.add(gift_type);

					var time_label = Ti.UI.createLabel({
						text : 'at ' + items_json.Record[i].DATETIME,
						font : {
							fontSize : '15dip'
						},
						color : '#b3fad0',
						left : '14%',
						bottom : '10%'
					});
					rowView.add(time_label);

					tabledata.push(rowView);
				}//end of for loop

				tableview =  Ti.UI.createTableView({		backgroundColor : 'transparent', 		separatorColor : 'transparent',
		
					data : tabledata,
					width : '100%',
					height : '90%',
					top : '10%'
				});
				view.add(tableview);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_gift_notification.php?uid=" + userinfo.Record[0].UID,

	});
	Ti.App.addEventListener('remove_gift_notification', function(data) {
		tableview.deleteRow(data.index);
		alert(data.message);
	});

	return self;
};
module.exports = GiftNotifications;
