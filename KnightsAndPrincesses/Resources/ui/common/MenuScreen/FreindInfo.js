function FreindInfo(userinfo, friendinfo) {

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
    function getPixelFromPercent(axis, percent) {
        if (axis == 'x') {
            return screenWidth * percent / 100;
        } else if (axis == 'y') {
            return screenHeight * percent / 100;
        }
    }

	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	var main_view = Ti.UI.createView();

	var activityIndicatorView = Titanium.UI.createView({
		backgroundColor : '#FFFFFF',
		borderRadius : 10,
		borderColor : '#333333',
		borderWidth : '5dip',
		visible : false,
		left : getPixelFromPercent('x', 50) - (screenWidth / 4),
		top : getPixelFromPercent('x', 42),
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
	self.add(activityIndicatorView);
	
	(function(){
		activityIndicator.show();
		activityIndicatorView.visible = true;
		activityIndicator.message = "Loading...";
	})();

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;

	var view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundImage : '/assets/inventoryBackground.png'

	});
	self.add(view);

	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height : '6.4%',
		width : '100%',
		bottom : '94.6%'
	});
	view.add(top_imageview);

	var name_label = Titanium.UI.createLabel({
		text : userinfo.Record[0].NAME,
		top : '1.5%',
		height : '3.5%',
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '12dip'
		}
	});
	view.add(name_label);

	var menu_label = Titanium.UI.createLabel({
		text : 'Back',
		top : '1.5%',
		height : '3.5%',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(menu_label);

	var return_imageview = Titanium.UI.createImageView({
		image : '/assets/iconReturn.png',
		width : '11.6%',
		top : '0.3%',
		right : '3%',
		zIndex : 500
	});
	view.add(return_imageview);

	return_imageview.addEventListener('click', function(e) {
		self.close();
	});

	var new_message_imageview;
	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var rowViewHeight = screenWidth * 0.119;

	var giftTradeView = Ti.UI.createView({
		width : '55%',
		top : '37%',
		left : '0%',
		zIndex : 10,
		height : rowViewHeight,
		backgroundColor : '#53e990'

	});

	var imageview = Titanium.UI.createImageView({
		backgroundImage : '/assets/rowview_bg.png',
		zIndex : 10,
		height : '96%',
		width : '100%'
	});
	giftTradeView.add(imageview);
	var icon_image_gift = Titanium.UI.createImageView({
		backgroundImage : '/assets/iconGift.png',
		height : '96%',
		left : '0%',
		zIndex : 10,
		width : '20%'
	});
	giftTradeView.add(icon_image_gift);

	var name_label = Titanium.UI.createLabel({
		text : 'GIFT OR TRADE \n (TAP To CHOOSE)',
		textAlign : 'right',
		zIndex : 10,
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	name_label.addEventListener('click', function(e) {
		activityIndicator.show();
		activityIndicatorView.visible = true;
		var GiftFromFreindInfo = require('ui/common/MenuScreen/GiftFromMessage');
		var GiftFromFreind = new GiftFromFreindInfo(userinfo, friendinfo.UID);
		GiftFromFreind.open({
			modal : true
		});
		GiftFromFreind.addEventListener('open',function(e){
			activityIndicator.hide();
			activityIndicatorView.visible = false;
		});
	});
	giftTradeView.add(name_label);
	view.add(giftTradeView);

	var QuestView = Ti.UI.createView({
		width : '55%',
		top : '44%',
		zIndex : 10,
		left : '0%',
		height : rowViewHeight,
		backgroundColor : '#53e990'

	});

	var imageview = Titanium.UI.createImageView({
		backgroundImage : '/assets/rowview_bg.png',
		zIndex : 10,
		height : '96%',
		width : '100%'
	});

	QuestView.add(imageview);
	var icon_image_quest = Titanium.UI.createImageView({
		backgroundImage : '/assets/iconThickBook.png',
		height : '96%',
		zIndex : 10,
		left : '0%',
		width : '20%'
	});
	QuestView.add(icon_image_quest);

	var assign_quest_label = Titanium.UI.createLabel({
		text : 'ASSIGN QUESTS \n (TAP To CHOOSE)',
		textAlign : 'right',
		zIndex : 10,
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});

	assign_quest_label.addEventListener('click', function(e) {
		var FriendQuest = require('/ui/common/MenuScreen/FreindAssignQuest');
		var friendquest = FriendQuest(userinfo, friendinfo.UID);
		friendquest.open();
	});
	QuestView.add(assign_quest_label);
	view.add(QuestView);

	var friend_status_lbl;
	var gender;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({

		success : function(e) {
			activityIndicator.hide();
			activityIndicatorView.visible = false;

			var friend_json = JSON.parse(this.responseText);
			friend_status_lbl = friend_json.Record[0].STATUS_MESSAGE + ' \n LVL ' + friend_json.Record[0].LEVEL;
			var friendsstatus_label = Titanium.UI.createLabel({
				text : friend_status_lbl,
				top : '10.1%',
				left : '4%',
				textAlign : 'left',
				color : '#5afd9b',
				font : {
					fontSize : '10dip'
				}
			});
			view.add(friendsstatus_label);

			gender = friend_json.Record[0].GENDER;
			createAvatarPicture(friend_json, {}, function(avatar_picture) {
				view.add(avatar_picture);
			});
			var messages_button = Ti.UI.createButton({ color: '#761f56',
				backgroundImage : '/assets/button_small_UP.png',
				top : '30%',
				right : '5%',
				width : '21.5%',
				height : '5%',
				title : 'Messages',
				zIndex : 510,
				font : {
					fontSize : '10dip'
				}
			});
			view.add(messages_button);
			if (friendinfo.MESSAGE == 'NEW_MESSAGE') {
				new_message_imageview = Titanium.UI.createImageView({
					top : '18.8%',
					left : '49.5%',
					image : '/assets/message_alert.png',
					height : '4%',
					width : '6%',
					zIndex : 600
				});
				view.add(new_message_imageview);

			}
			messages_button.addEventListener('click', function(e) {
				activityIndicator.show();
				activityIndicatorView.visible = true;
				var MessageScreen = require('/ui/common/MenuScreen/MessageScreen');
				var messageScreen = new MessageScreen(userinfo, friendinfo.UID, gender, friendinfo.NAME, friend_json);
				messageScreen.open({
					modal : true
				});
				messageScreen.addEventListener('open',function(e){
					activityIndicator.hide();
					activityIndicatorView.visible = false;
				});
			});

			var coin_count_label = Titanium.UI.createLabel({
				text : friend_json.Record[0].NUM_OF_GOLDS,
				top : '15.5%',
				left : '12.5%',
				textAlign : 'left',
				color : '#FFCC00',
				font : {
					fontWeight : 'bold',
					fontSize : '12dip'
				}

			});
			view.add(coin_count_label);
			var minicoin_imageview = Titanium.UI.createImageView({
				image : '/assets/iconGoldMini.png',
				width : '7%',
				top : '15.5%',
				left : '3%'
			});
			view.add(minicoin_imageview);

			var friendsname_label = Titanium.UI.createLabel({
				text : friend_json.Record[0].NAME,
				top : '5.7%',
				left : '4%',
				textAlign : 'left',
				color : '#5afd9b',
				font : {
					fontSize : '18dip'
				}
			});
			view.add(friendsname_label);
			var Footer = require('ui/common/menus/Footer');
			var footer = new Footer(userinfo);
			view.add(footer);

		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			Ti.API.debug("URL: " + "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + friendinfo.UID);
			alert('There was an error retrieving the remote data. Try again.');
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + friendinfo.UID
		//url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + 10000007 + "",

	});

	var friendsstatus_label = Titanium.UI.createLabel({
		text : friend_status_lbl,
		top : '10.1%',
		left : '4%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(friendsstatus_label);
	var onlineStatus_label = Titanium.UI.createLabel({
		text : 'Online',
		top : '17.4%',

		left : '4%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	//view.add(onlineStatus_label);

	var unFriends_button = Ti.UI.createButton({ color: '#761f56',
		backgroundImage : '/assets/button_small_UP.png',
		top : '22%',
		right : '5%',
		width : '21.5%',
		height : '5%',
		title : 'Unfriend',
		font : {
			fontSize : '10dip'
		},
		zIndex : 50
	});
	unFriends_button.addEventListener('click', function(e) {

		var ConfirmationAlert = Titanium.UI.createAlertDialog({
			title : 'Do you want to Unfriend ' + friendinfo.NAME + '?',
			message : 'Are you Sure?',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});
		ConfirmationAlert.show();
		ConfirmationAlert.addEventListener('click', function(e) {
			Titanium.API.info('e = ' + JSON.stringify(e));

			//Clicked cancel, first check is for iphone, second for android
			if (e.cancel === e.index || e.cancel === true) {
				return;
			}
			switch (e.index) {
				case 0:
					//actInd.show();
					var unfriend_url = "http://bonozo.com:8080/knp/unfriend_friend.php?uid=" + userinfo.Record[0].UID + '&friend_uid=' + friendinfo.UID;
					var httpclientt = require('/ui/common/Functions/function');
					httpclientt.requestServer({
						success : function(e) {
							items_json = JSON.parse(this.responseText);
							if (items_json.Record != undefined) {
								if (items_json.Record[0].Message != '') {
									alert(items_json.Record[0].Message);
									//actInd.hide();
									self.close();
								}
							}

						},
						method : 'GET',
						contentType : 'text/xml',
						url : unfriend_url
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
	var friends_button = Ti.UI.createButton({ color: '#761f56',
		backgroundImage : '/assets/button_small_UP.png',
		top : '22%',
		right : '5%',
		width : '32%',
		height : '5%',
		title : 'Add friend',
		font : {
			fontSize : '10dip'
		},
		zIndex : 50
	});
	friends_button.addEventListener('click', function(e) {

		var ConfirmationAlert = Titanium.UI.createAlertDialog({
			title : 'You must have atleast 5 golds to send request.',
			message : 'Are you Sure?',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});

		//actInd.show();
		var _url = "http://bonozo.com:8080/knp/send_friend_request.php?uid=" + userinfo.Record[0].UID + "&friend_uid=" + friendinfo.UID + "&user_id=" + friendinfo.USER_ID + "";
		var items_json = "";
		var items_length = 0;
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				items_length = items_json.Record.length;
				if (items_json.Record != undefined) {
					//alert(userinfo.Record[0].EMAIL+":"+userinfo.Record[0].NAME+":"+user_id);

					//actInd.hide();

					// _assign_quest_id = items_json.Record[0].assign_quest_id;
					// hideLoader();
					var ConfirmationAlert = Titanium.UI.createAlertDialog({
						title : 'Message',
						message : items_json.Record[0],
						buttonNames : ['OK'],
						cancel : 0
					});
					ConfirmationAlert.addEventListener('click', function(e) {
						self.close();
					});
					ConfirmationAlert.show();
				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : _url,
		});

	});

	var isFriends = function(callback) {
		var httpclientt = require('/ui/common/Functions/function');
		_url = "http://bonozo.com:8080/knp/is_friend.php?uid1=" + userinfo.Record[0].UID + "&uid2=" + friendinfo.UID;
		httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				if (items_json.Record != undefined) {
					callback(items_json.Record);
				}
				Ti.App.fireEvent('update_xp', {
					clicked_item : 'StatusScreen'
				});
			},
			method : 'GET',
			contentType : 'text/xml',
			url : _url,

		});
	};
	(function(){
	 isFriends(function(is_friend){
	 	if(is_friend == "true"){
			view.add(unFriends_button);
	 	}
	 	else{
			view.add(friends_button);
	 	}
	 });
	})();

	var Message_imageview = Titanium.UI.createImageView({
		url : '/assets/iconReturn.png',
		height : '5.2%',
		top : '19.8%',
		left : '41.3%'
	});
	//view.add(Message_imageview);

	var friendship_meter_label = Titanium.UI.createLabel({
		text : 'FREINDSHIP METER \N \nFRIEND LEVEL 2',
		top : '56.1%',
		left : '15.6%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		},
		zIndex : 50

	});
	view.add(friendship_meter_label);
	if (friendinfo.MESSAGE == "NEW_MESSAGE") {
		Ti.App.addEventListener("message_status", function() {
			friendinfo.MESSAGE = "NO_MESSAGE";
			new_message_imageview.hide();
			NoMessage();
		});

	}
	function NoMessage() {
		Ti.App.fireEvent("message_read", {
			//uid : friendinfo.UID
		});

	}

	var friendship_meter_label = Titanium.UI.createLabel({
		text : 'FREINDSHIP METER TRACKS HOW MUCH AND YOUR FRIEND HAVE INTERACTED WITH EACH OTHER.',
		bottom : '9.3%',
		width : '51.9%',
		left : '5%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '9dip'
		},
		zIndex : 50

	});
	view.add(friendship_meter_label);

	var AvatarThumbnail = require('/ui/common/drawings/AvatarThumbnail');
	AvatarThumbnail({
		height : '9%',
		width : '12.7%',
		top : '62.5%',
		left : '5%'
	}, userinfo.Record[0].USER_APPEARANCE, userinfo.Record[0].GENDER, 0, function(avatar_imageview, index) {
		view.add(avatar_imageview);
		//rowView[index] = null;
	});

	// var femChar_imageview = Titanium.UI.createImageView({
	// url : '/assets/female_icon.png',
	// height : '6.6%',
	// width : '12.7%',
	// top : '64.3%',
	// left : '5%'
	// });
	// view.add(femChar_imageview);

	var fem_meter_view = Ti.UI.createView({
		backgroundImage : '/assets/female_meterBar.png',
		top : '63.7%',
		left : '20%',
		width : '37%',
		zIndex : 10,
		height : '5%'
	});
	view.add(fem_meter_view);

	AvatarThumbnail({
		height : '8%',
		width : '12.7%',
		zIndex : 10,
		top : '70%',
		left : '42.4%'
	}, friendinfo.USER_APPEARANCE, friendinfo.GENDER, 0, function(avatar_imageview, index) {
		view.add(avatar_imageview);
	});

	// var maleChar_imageview = Titanium.UI.createImageView({
	// backgroundImage : '/assets/male_icon.png',
	// height : '6.6%',
	// width : '12.7%',
	// zIndex : 10,
	// top : '71.7%',
	// left : '42.4%'
	// });
	// view.add(maleChar_imageview);

	var male_meter_view = Ti.UI.createView({
		backgroundImage : '/assets/male_meterBar.png',
		top : '71.7%',
		zIndex : 10,
		left : '5%',
		width : '37%',
		height : '4%'
	});
	view.add(male_meter_view);
	function createAvatarPicture(_userjsoninfo, initjson, callback) {
		var avatar_view = Ti.UI.createView({
			// bottom : '3%',
			// height : '80%',
			// right : '0%',
			zIndex : 1
		});
		var Avatar = require('/ui/common/drawings/Avatar');
		var Settings = require('/ui/common/drawings/Settings');
		var settings = new Settings();
		var avatar_config = {};
		avatar_config.gender = _userjsoninfo.Record[0].GENDER;
		avatar_config.main_view = {
			width : settings.avatar_width * 1.50,
			height : settings.avatar_height * 1.50,
			right : '0%',
			top : '8%'
		};
		if (_userjsoninfo.Record != undefined && _userjsoninfo.Record[0].USER_APPEARANCE != '' && _userjsoninfo.Record[0].GENDER == 'f') {
			avatar_config.appearence = {
				hair_back : '/assets/princess/' + _userjsoninfo.Record[0].USER_APPEARANCE[0].IMAGE + '-back.png',
				face : '/assets/princess/' + _userjsoninfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
				dress : '/assets/princess/' + _userjsoninfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
				hair_front : '/assets/princess/' + _userjsoninfo.Record[0].USER_APPEARANCE[0].IMAGE + '-front.png',
				jewelery : '/assets/princess/' + _userjsoninfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png'

			};
			var avatar = new Avatar(avatar_config);
			avatar_view.add(avatar);
			callback(avatar_view);
		} else if (_userjsoninfo.Record != undefined && _userjsoninfo.Record[0].USER_APPEARANCE != '' && _userjsoninfo.Record[0].GENDER == 'm') {
			avatar_config.appearence = {
				dress : '/assets/knight/' + _userjsoninfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
				helmet : '/assets/knight/' + _userjsoninfo.Record[0].USER_APPEARANCE[4].IMAGE + '.png',
				shield : '/assets/knight/' + _userjsoninfo.Record[0].USER_APPEARANCE[5].IMAGE + '.png',
				hair_back : '/assets/knight/' + _userjsoninfo.Record[0].USER_APPEARANCE[0].IMAGE + '-back.png',
				face : '/assets/knight/' + _userjsoninfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
				hair_front : '/assets/knight/' + _userjsoninfo.Record[0].USER_APPEARANCE[0].IMAGE + '-front.png',
				weapon : '/assets/knight/' + _userjsoninfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png'
			};
			var avatar = new Avatar(avatar_config);
			avatar_view.add(avatar);
			callback(avatar_view);
		} else {
			if (_userjsoninfo.Record[0].GENDER == 'f') {
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
					avatar_view.add(avatar);
					callback(avatar_view);
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
					avatar_view.add(avatar);
					callback(avatar_view);
				});
			}
		}
	}

	return self;
}

module.exports = FreindInfo;
