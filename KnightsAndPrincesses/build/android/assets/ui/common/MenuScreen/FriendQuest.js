function FriendQuest(userinfo, friend_uid, friend_quest_info, is_completed) {
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
	function createAvatarPicture(_userjsoninfo, callback) {
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
			top : '8%',
			zIndex : 1
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

	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return screenWidth * percent / 100;
		} else if (axis == 'y') {
			return screenHeight * percent / 100;
		}
	}
	var images_counter = 0;
	function hideLoader() {
		images_counter++;
		if (images_counter >= 2) {
			activityIndicator.show();
			activityIndicatorView.visible = true;
		}
	}

	var my_timer = '';
	var tableview;
	var httpclientt = require('/ui/common/Functions/function');
	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	var view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundImage : '/assets/inventoryBackground.png'

	});
	self.add(view);

	var activityIndicatorView = Titanium.UI.createView({
		backgroundColor : '#FFFFFF',
		borderRadius : 10,
		borderColor : '#333333',
		borderWidth : '5dip',
		left : getPixelFromPercent('x', 50) - (screenWidth / 4),
		top : getPixelFromPercent('x', 42),
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
	self.add(activityIndicatorView);

	(function() {
		activityIndicator.show();
		activityIndicatorView.visible = true;
		activityIndicator.message = "Loading...";
	})();

	var countDown = function(h, m, s, fn_tick, fn_end) {
		return {
			total_sec : h * 60 * 60 + m * 60 + s,
			timer : this.timer,
			set : function(h, m, s) {
				this.total_sec = parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
				this.time = {
					h : h,
					m : m,
					s : s
				};
				return this;
			},
			start : function() {
				var self = this;
				this.timer = setInterval(function() {
					if (self.total_sec) {
						self.total_sec--;
						var hour = parseInt(self.total_sec / (60 * 60));
						var min = (self.total_sec - (parseInt(hour * (60 * 60))) - (self.total_sec % 60)) / 60;

						self.time = {
							h : parseInt(self.total_sec / (60 * 60)),
							m : parseInt(min),
							s : (self.total_sec % 60)
						};
						fn_tick(self.time.h + ":" + self.time.m + ":" + self.time.s, self.instance_index);
					} else {
						self.stop();
						fn_end();
					}
				}, 1000);
				return this;
			},
			stop : function() {
				clearInterval(this.timer);
				this.time = {
					h : 0,
					m : 0,
					s : 0
				};
				this.total_sec = 0;
				return this;
			}
		};
	};
	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height : '6.4%',
		width : '100%',
		bottom : '94.6%',
		zIndex : 100
	});
	view.add(top_imageview);

	var screen_name = Titanium.UI.createLabel({
		text : 'Assigned Quest',
		top : '1.75%',
		height : '3.1%',
		left : '3%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		},
		zIndex : 200
	});
	view.add(screen_name);

	var back_button_label = Titanium.UI.createLabel({
		text : 'Back',
		top : '1.75%',
		height : '3.1%',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		},
		zIndex : 200
	});
	view.add(back_button_label);

	var friend_name = Titanium.UI.createLabel({
		top : '7%',
		height : '3.5%',
		text : 'Some Name',
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '16dip'
		},
		zIndex : 500
	});
	view.add(friend_name);
	var friendsstatus_label = Titanium.UI.createLabel({
		top : '10.1%',
		left : '4%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		},
		zIndex : 50
	});
	view.add(friendsstatus_label);
	var messages_button = Ti.UI.createButton({
		color : '#761f56',
		backgroundImage : '/assets/button_small_UP.png',
		top : '10%',
		right : '10%',
		width : '21.5%',
		height : '5%',
		title : 'Messages',
		zIndex : 510,
		font : {
			fontSize : '10dip'
		},
		zIndex : 50
	});

	var return_imageview = Titanium.UI.createImageView({
		image : '/assets/iconReturn.png',
		//height:'12.4%',
		width : '11.6%',
		top : '1%',
		right : '3%',
		zIndex : 300
	});
	view.add(return_imageview);
	return_imageview.addEventListener('click', function(e) {
		if (!is_completed)
			my_timer.stop();
		//clearInterval(my_timer);
		// my_timer= null;
		self.close();
	});

	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var rowview_height = ScreenHeight * (12 / 100);
	function updateQuestsList() {
		httpclientt.requestServer({

			success : function(e) {
				var json = JSON.parse(this.responseText);
				for (var i = 0; i < json.Record.length; i++) {
					var rowView = Titanium.UI.createTableViewRow({
						height : (rowview_height * 1.5) + 'px',
						backgroundImage : '/assets/quest_row_bg.png',
						zIndex : 400
					});
					rowView.addEventListener('longpress', function(e) {
						Titanium.Media.vibrate();
						var RemoveQuest = require('/ui/common/MenuScreen/RemoveQuest');
						var removequest = new RemoveQuest(json.Record[e.index].ASSIGN_QUEST_ID, e.index, 'ASSIGNER');
						removequest.open({
							modal : true
						});
					});

					var rowImg = Ti.UI.createImageView({
						image : '/assets/' + json.Record[i].QUEST_NAME + '.png',
						height : '80%',
						zIndex : 500,
						left : '10%'
					});
					rowView.add(rowImg);
					if (json.Record[i].STATUS == 'COMPLETE') {
						var row_label = Ti.UI.createLabel({
							text : 'Completed',
							color : '#5AFD9B',
							font : {
								fontSize : '16dip'
							},
							zIndex : 500,
							left : '30%'
						});
						rowView.add(row_label);
					} else if (json.Record[i].STATUS == 'EXPIRED') {
						var row_label = Ti.UI.createLabel({
							text : 'Expired',
							color : '#5AFD9B',
							zIndex : 500,
							font : {
								fontSize : '16dip'
							},
							left : '30%'
						});
						rowView.add(row_label);
					} else {
						var StartQuestButton = Ti.UI.createButton({
							color : '#761f56',
							backgroundImage : '/assets/button_small_UP.png',
							right : '10%',
							zIndex : 500,
							width : '40%',
							height : '70%',
							title : 'Start Quest',
							font : {
								fontSize : '12dip'
							},
							quest_image : json.Record[i].QUEST_IMAGE,
							assign_quest_id : json.Record[i].ASSIGN_QUEST_ID,
							quest_id : json.Record[i].QUEST_ID
						});
						StartQuestButton.addEventListener('click', function(e) {
							var MultiPlayerGame = require('/ui/common/MenuScreen/MultiPlayerGame');
							var multiplayergame = new MultiPlayerGame(userinfo, e.source.quest_image, friend_quest_info.ASSIGN_QUEST_ID);//e.source.quest_image, 
														// 'INCOMLPETE', 
														// e.source.quest_id, 
														// userinfo, 
														// friend_uid, 
														// friend_quest_info);
							//playgame.open();
						});
						rowView.add(StartQuestButton);
					}

					tabledata.push(rowView);
				}

				tableview = Ti.UI.createTableView({
					backgroundColor : 'transparent',
					separatorColor : 'transparent',
					data : tabledata,
					width : '70%',
					height : '40%',
					left : '0',
					top : '45%',
					zIndex : 400
				});
				view.add(tableview);
			},
			onerror : function(e) {
				Ti.API.debug("STATUS: " + this.status);
				Ti.API.debug("TEXT: " + this.responseText);
				Ti.API.debug("ERROR: " + e.error);
				Ti.API.debug("URL: " + "http://bonozo.com:8080/knp/get_all_assigned_quests.php?assign_by=10000002&assign_to=10000001");
				alert('There was an error retrieving the remote data. Try again.');
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://bonozo.com:8080/knp/knp_get_friend_quest_games.php?assign_quest_id=" + friend_quest_info.ASSIGN_QUEST_ID
			//url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + 10000007 + "",

		});
	}


	Ti.App.addEventListener('remove_friend_quest', function(data) {
		tableview.deleteRow(data.index);
		//alert(data.message);
	});

	updateQuestsList();

	Ti.App.addEventListener('game_played', function(e) {
		view.remove(tableview);
		tabledata = [];
		tableview = null;
		updateQuestsList();
	});

	httpclientt.requestServer({

		success : function(e) {
			var friend_json = JSON.parse(this.responseText);

			friendsstatus_label.text = friend_json.Record[0].STATUS_MESSAGE + ' \nLVL ' + friend_json.Record[0].LEVEL;
			friend_name.text = friend_json.Record[0].NAME;
			coin_count_label.text = friend_json.Record[0].NUM_OF_GOLDS;

			view.add(messages_button);
			messages_button.addEventListener('click', function(e) {
		//		activityIndicator.show();
		//		activityIndicatorView.visible = true;
				var MessageScreen = require('/ui/common/MenuScreen/MessageScreen');
				var messageScreen = new MessageScreen(userinfo, '', '', '', friend_json);
				messageScreen.open({
					modal : true
				});
		//		messageScreen.addEventListener('open',function(e){
		//			activityIndicator.hide();
		//			activityIndicatorView.visible = false;
		//		});
			});

			createAvatarPicture(friend_json, function(avatar_imageview) {
				view.add(avatar_imageview);
				activityIndicator.hide();
				activityIndicatorView.visible = false;
			});

		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			Ti.API.debug("URL: " + "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + friend_uid);
			alert('There was an error retrieving the remote data. Try again.');
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + friend_uid
	});

	var friendsstatus_label = Titanium.UI.createLabel({
		top : '10.1%',
		left : '4%',
		textAlign : 'left',
		color : '#5AFD9B',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(friendsstatus_label);
	var minicoin_imageview = Titanium.UI.createImageView({
		image : '/assets/iconGoldMini.png',
		width : '7%',
		top : '15.5%',
		left : '3%'
	});
	view.add(minicoin_imageview);
	var coin_count_label = Titanium.UI.createLabel({
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

	
	// Create an ImageView.
	var timer_bg_imageview = Ti.UI.createView({
		backgroundImage : '/assets/quest_row_bg.png',
		width : '70%',
		height : (rowview_height * 2) + 'px',
		top : '30%',
		left : 0,
		zIndex : 450
	});
	view.add(timer_bg_imageview);
	
	var quests_status = Titanium.UI.createLabel({
		color : '#5afd9b',
		zIndex : 500
	});
	timer_bg_imageview.add(quests_status);

	var get_quest_url = "http://bonozo.com:8080/knp/knp_get_friend_quest_games.php?assign_quest_id=" + friend_quest_info.ASSIGN_QUEST_ID;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			Ti.App.fireEvent('update_footer', {
				clicked_item : 'FreindQuest'
			});

			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				if (items_json.Record.length > 0) {
					if (is_completed == 'COMPLETE') {
						quests_status.text = 'QUESTS COMPLETED!';

					} else {
						var n = items_json.Record[0].EXPIRED_TIME.split(":");
						my_timer = new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), function() {
							quests_status.text = 'Time remaining: ' + my_timer.time.h + ":" + my_timer.time.m + ":" + my_timer.time.s;
						}, function() {
							// alert("The time is up!");
						});
						my_timer.start();
					}
				}
			}

		},
		method : 'GET',
		contentType : 'text/xml',
		url : get_quest_url
	});

	var isFriends = function(callback) {
		var httpclientt = require('/ui/common/Functions/function');
		_url = "http://bonozo.com:8080/knp/is_friend.php?uid1=" + userinfo.Record[0].UID + "&uid2=" + friend_uid;
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
	/*	isFriends(function(bool) {
	 var messages_button = Ti.UI.createButton({ color: '#761f56',
	 backgroundImage : '/assets/button_small_UP.png',
	 top : '19.8%',
	 left : '51.7%',
	 width : '21.5%',
	 height : '5%',
	 visible : bool,
	 title : 'Messages',
	 zIndex : 510,
	 font : {
	 fontSize : '10dip'
	 }
	 });
	 view.add(messages_button);
	 messages_button.addEventListener('click', function(e) {
	 var MessageScreen = require('/ui/common/MenuScreen/MessageScreen');
	 var messageScreen = new MessageScreen(userinfo, friend_uid);
	 messageScreen.open({
	 modal : true
	 });
	 });
	 });
	 */
	var Message_imageview = Titanium.UI.createImageView({
		url : '/assets/iconReturn.png',
		height : '5.2%',
		top : '19.8%',
		left : '41.3%'
	});
	//view.add(Message_imageview);
	var Footer = require('ui/common/menus/Footer');
	var footer = new Footer(userinfo);
	view.add(footer);


	/*	var httpclientt = require('/ui/common/Functions/function');
	 httpclientt.requestServer({
	 success : function(e) {
	 var userinfojson = JSON.parse(this.responseText);

	 friend_name.text = userinfojson.Record[0].NAME;

	 hideLoader();
	 },
	 method : 'GET',
	 contentType : 'text/xml',
	 url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + userinfo.Record[0].UID + "",
	 });
	 */
	view.addEventListener('android:back', function(e) {
		my_timer.stop();
		//clearInterval(my_timer);
		// my_timer= null;		activity.finish();
	});

	return self;
};
module.exports = FriendQuest;
