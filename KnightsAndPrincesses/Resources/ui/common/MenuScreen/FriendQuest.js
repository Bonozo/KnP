function FriendQuest(userinfo, friend_uid) {
	var tableview;
	var httpclientt = require('/ui/common/Functions/function');
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
	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		//height:'12.4%',
		width : '100%',
		top : '0%'
	});
	view.add(top_imageview);

	var friend_name = Titanium.UI.createLabel({
		text : '',
		top : '0',
		height : '3.1%',
		left : '5%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(friend_name);

	var screen_name = Titanium.UI.createLabel({
		text : 'QUESTS',
		top : '0',
		height : '3.1%',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(screen_name);

	var return_imageview = Titanium.UI.createImageView({
		image : '/assets/iconReturn.png',
		//height:'12.4%',
		width : '11.6%',
		top : '1%',
		right : '3%'
	});
	view.add(return_imageview);

	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var rowview_height = ScreenHeight * (12 / 100);

	//http://justechinfo.com/kap_server/get_all_assigned_quests.php?assign_by=10000002&assign_to=10000001

	function updateQuestsList() {
		httpclientt.requestServer({

			success : function(e) {
				var json = JSON.parse(this.responseText);
				for (var i = 0; i < json.Record.length; i++) {
					var rowView = Titanium.UI.createTableViewRow({
						height : rowview_height + 'px',
						backgroundImage : '/assets/rowview_bg.png',
					});
					var rowImg = Ti.UI.createImageView({
						image : '/assets/' + json.Record[i].QUEST_NAME + '.png',
						height : rowview_height / (1.5) + 'px',
						left : rowview_height / 4
					});
					rowView.add(rowImg);
					if (json.Record[i].STATUS == 'COMPLETE') {
						var row_label = Ti.UI.createLabel({
							text : 'COMPLETED',
							color : '#5AFD9B',
							font : {
								fontSize : '16dip'
							},
							left : rowview_height + (rowview_height / 2) + 'px'
						});
						rowView.add(row_label);
					} else if (json.Record[i].STATUS == 'EXPIRED') {
						var row_label = Ti.UI.createLabel({
							text : 'EXPIRED',
							color : '#5AFD9B',
							font : {
								fontSize : '16dip'
							},
							left : rowview_height + (rowview_height / 2) + 'px'
						});
						rowView.add(row_label);
					} else {
						var StartQuestButton = Ti.UI.createButton({
							backgroundImage : '/assets/button_small_UP.png',
							left : rowview_height + (rowview_height / 2) + 'px',
							width : rowview_height * 2,
							height : rowview_height / 2,
							title : 'Start Quest',
							font : {
								fontSize : '14dip'
							},
							quest_image : json.Record[i].QUEST_IMAGE,
							assign_quest_id : json.Record[i].ASSIGN_QUEST_ID
						});
						StartQuestButton.addEventListener('click', function(e) {
							var PlayGame = require('/ui/common/MenuScreen/PlayGame');
							var playgame = new PlayGame(e.source.quest_image, e.source.assign_quest_id);
							playgame.open();
						});
						rowView.add(StartQuestButton);
					}

					tabledata.push(rowView);
				}
				var tableviewheight = rowview_height * 3;

				tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '70%',
					height : '40%',
					left : '0',
					top : '27.3%'
				});
				view.add(tableview);
			},
			onerror : function(e) {
				Ti.API.debug("STATUS: " + this.status);
				Ti.API.debug("TEXT: " + this.responseText);
				Ti.API.debug("ERROR: " + e.error);
				Ti.API.debug("URL: " + "http://justechinfo.com/kap_server/get_all_assigned_quests.php?assign_by=10000002&assign_to=10000001");
				alert('There was an error retrieving the remote data. Try again.');
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://justechinfo.com/kap_server/get_all_assigned_quests.php?assign_by=" + friend_uid + "&assign_to=" + userinfo.Record[0].UID
			//url : "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + 10000007 + "",

		});
	}

	updateQuestsList();

	Ti.App.addEventListener('update_xp', function(e) {
		tabledata = [];
		view.remove(tableview);
		tableview = null;
		updateQuestsList();
	});
	var male_character_imageview = Titanium.UI.createImageView({
		image : '/assets/K_fullbody_bad.png',
		height : '79.5%',
		top : '12%',
		right : '0%'
	});
	view.add(male_character_imageview);

	httpclientt.requestServer({

		success : function(e) {
			var friend_json = JSON.parse(this.responseText);
			var friendsname_label = Titanium.UI.createLabel({
				text : '' + friend_json.Record[0].NAME,
				top : '5.5%',
				left : '4%',
				textAlign : 'left',
				color : '#ffffff',
				font : {
					fontSize : '16dip'
				}
			});
			view.add(friendsname_label);

		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			Ti.API.debug("URL: " + "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + friend_uid);
			alert('There was an error retrieving the remote data. Try again.');
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + friend_uid
		//url : "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + 10000007 + "",

	});

	var friendsstatus_label = Titanium.UI.createLabel({
		text : 'I M IN TO WIN \N LVL100',
		top : '10.1%',
		left : '4%',
		textAlign : 'left',
		color : '#5AFD9B',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(friendsstatus_label);

	var viewFriends_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		top : '19.8%',
		left : '10%',
		width : '21.5%',
		height : '5%',
		title : 'View Freinds',
		font : {
			fontSize : '10dip'
		}
	});
	viewFriends_button.addEventListener('click', function(e) {
		self.close();
	});
	view.add(viewFriends_button);

	var messages_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		top : '19.8%',
		left : '51.7%',
		width : '21.5%',
		height : '5%',
		title : 'Messages',
		font : {
			fontSize : '10dip'
		}
	});
	view.add(messages_button);
	messages_button.addEventListener('click', function(e) {
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({

			success : function(e) {
				var Messages_Thread = JSON.parse(this.responseText);
				if (Messages_Thread.Record != undefined) {
					//alert(Messages_Thread.Record[0].MESSAGE_TEXT);
					var MessageScreen = require('/ui/common/MenuScreen/MessageScreen');
					var messageScreen = new MessageScreen(Messages_Thread, userinfojson, friend_uid);
					messageScreen.open({
						modal : true
					});
				}

			},
			onerror : function(e) {
				Ti.API.debug("STATUS: " + this.status);
				Ti.API.debug("TEXT: " + this.responseText);
				Ti.API.debug("ERROR: " + e.error);
				Ti.API.debug("URL: " + "http://justechinfo.com/kap_server/get_thread_messages.php?sender_id=" + userinfojson.Record[0].UID + "&receiver_id=" + friend_uid);
				alert('There was an error retrieving the remote data. Try again.');
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://justechinfo.com/kap_server/get_thread_messages.php?sender_id=" + userinfojson.Record[0].UID + "&receiver_id=" + friend_uid,
			//url : "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + 10000007 + "",

		});

	});
	var Message_imageview = Titanium.UI.createImageView({
		url : '/assets/iconReturn.png',
		height : '5.2%',
		top : '19.8%',
		left : '41.3%'
	});
	//view.add(Message_imageview);

	return_imageview.addEventListener('load', function(e) {
		hideLoader();
	});
	male_character_imageview.addEventListener('load', function(e) {
		hideLoader();
	});
	Message_imageview.addEventListener('load', function(e) {
		hideLoader();
	});

	var images_counter = 0;
	function hideLoader() {
		images_counter++;
		if (images_counter >= 3) {
			actInd.hide();
		}
	}

	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			var userinfojson = JSON.parse(this.responseText);

			var Footer = require('ui/common/menus/Footer');
			var footer = new Footer(userinfojson);
			view.add(footer);

			friend_name.text = userinfojson.Record[0].NAME;

			hideLoader();
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + userinfo.Record[0].UID + "",
	});

	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();

	return self;
};
module.exports = FriendQuest;
