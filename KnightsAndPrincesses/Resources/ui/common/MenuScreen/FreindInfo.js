function FreindInfo(userinfo, friend_uid) {

	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();

	var self = Ti.UI.createWindow({
		// orientation : Ti.UI.PORTRAIT,
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
	var Footer = require('ui/common/menus/Footer');
	var footer = new Footer(userinfo);
	view.add(footer);
	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		//height:'12.4%',
		width : '100%',
		top : '0%'
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

	var menu_label = Titanium.UI.createLabel({
		text : 'FRIENDS NAME 01 INFO',
		top : '0',
		height : '3.1%',
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
		//height:'12.4%',
		width : '11.6%',
		top : '1%',
		right : '3%'
	});
	view.add(return_imageview);

	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var rowViewHeight = screenWidth * 0.119;

	var male_character_imageview = Titanium.UI.createImageView({
		top : '12%',
		right : '0%',
		image : '/assets/K_fullbody_bad.png',
		height : '79.5%',
		zIndex : 500
	});
	view.add(male_character_imageview);

	var selected_item = [];
	var httpclientt = require('/ui/common/Functions/function');
	_url = "http://justechinfo.com/kap_server/get_all_quests.php";
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				for (var i = 0; i < items_json.Record.length; i++) {
					var rowView = Titanium.UI.createTableViewRow({
						height : rowViewHeight + 'px',
						backgroundImage : '/assets/rowview_bg.png',
						quest_id : items_json.Record[i].QUEST_ID,
						quest_name : items_json.Record[i].QUEST_NAME,
						index : i,
						selected : false
					});
					rowView.addEventListener('click', function(e) {

						var ConfirmationAlert = Titanium.UI.createAlertDialog({
							title : 'Click \'Yes\' to assign '+e.row.quest_name+' Quest.',
							message : 'Sure?',
							buttonNames : ['Yes', 'No'],
							quest_id : e.row.quest_id,
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
									actInd.show();
									var assign_quest_url = "http://justechinfo.com/kap_server/assign_quests.php?"+
									"assign_by_uid="+userinfo.Record[0].UID+""+
									"&assign_to_uid="+friend_uid+""+
									"&quest_ids="+e.source.quest_id+
									"&message=N/A";
									var httpclientt = require('/ui/common/Functions/function');
									httpclientt.requestServer({
										success : function(e) {
											items_json = JSON.parse(this.responseText);
											if (items_json.Record != undefined) {
												if(items_json.Record[0].Message != ''){
													alert('You have Successfully assigned Quest.');
													actInd.hide();
												}
											}
										},
										method : 'GET',
										contentType : 'text/xml',
										url : assign_quest_url,
								
									});
									
									break;

								//This will never be reached, if you specified cancel for index 1
								case 1:
									// alert('Clicked button 1 (NO)');									break;

								default:
									break;

							}

						});

						ConfirmationAlert.show(); 

						// alert(e.row.quest_id);
					});

					var rowImg = Ti.UI.createImageView({
						image : '/assets/iconThickBook.png',
						height : rowViewHeight + 'px',
						left : '0'
					});
					rowView.add(rowImg);

					var questname_label = Ti.UI.createLabel({
						text : items_json.Record[i].QUEST_NAME,
						color : '#5AFD9B',
						font : {
							fontSize : '16dip'
						},
						top : '0'
					});
					rowView.add(questname_label);
					var tap_to_choose_label = Ti.UI.createLabel({
						text : '(TAP TO CHOOSE)',
						color : '#5AFD9B',
						font : {
							fontSize : '12dip'
						},
						bottom : '0'
					});
					rowView.add(tap_to_choose_label);
					tabledata.push(rowView);
				}

				var tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '75%',
					height : '28%',
					left : '0',
					top : '27.3%',
					zIndex : 200
				});
				view.add(tableview);
				actInd.hide();
				/*
				 if(items_json.Record[0].Message == 'Updated!'){
				 alert('You have completed this quest.\nPress back button');
				 }
				 */
			}
			Ti.App.fireEvent('update_xp', {
				clicked_item : 'StatusScreen'
			});
		},
		method : 'GET',
		contentType : 'text/xml',
		url : _url,

	});

	httpclientt.requestServer({

		success : function(e) {
			var friend_json = JSON.parse(this.responseText);
			var friendsname_label = Titanium.UI.createLabel({
				text : friend_json.Record[0].NAME,
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
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(friendsstatus_label);

	var coin_count_label = Titanium.UI.createLabel({
		text : '1000',
		top : '15%',

		left : '10%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	// view.add(coin_count_label);
	var minicoin_imageview = Titanium.UI.createImageView({
		image : '/assets/iconGoldMini.png',
		width : '7%',
		top : '15%',
		left : '3%'
	});
	// view.add(minicoin_imageview);
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
					var messageScreen = new MessageScreen(Messages_Thread, userinfo, friend_uid);
					messageScreen.open({
						modal : true
					});
				}

			},
			onerror : function(e) {
				Ti.API.debug("STATUS: " + this.status);
				Ti.API.debug("TEXT: " + this.responseText);
				Ti.API.debug("ERROR: " + e.error);
				Ti.API.debug("URL: " + "http://justechinfo.com/kap_server/get_thread_messages.php?sender_id=" + userinfo.Record[0].UID + "&receiver_id=" + friend_uid);
				alert('There was an error retrieving the remote data. Try again.');
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://justechinfo.com/kap_server/get_thread_messages.php?sender_id=" + userinfo.Record[0].UID + "&receiver_id=" + friend_uid,
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

	var friendship_meter_label = Titanium.UI.createLabel({
		text : 'FREINDSHIP METER \N \nFRIEND LEVEL 2',
		top : '56.1%',

		left : '15.6%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(friendship_meter_label);

	var friendship_meter_label = Titanium.UI.createLabel({
		text : 'FREINDSHIP METER TRACKS HOW MUCH AND YOUR FRIEND HAVE INTERACTED WITH EACH OTHER.',
		bottom : '9.3%',
		width : '51.9%',
		left : '5%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '9dip'
		}

	});
	view.add(friendship_meter_label);

	var femChar_imageview = Titanium.UI.createImageView({
		url : '/assets/female_icon.png',
		height : '6.6%',
		width : '12.7%',
		top : '64.3%',
		left : '5%'
	});
	view.add(femChar_imageview);

	var fem_meter_view = Ti.UI.createView({
		backgroundImage : '/assets/female_meterBar.png',
		top : '64.3%',
		left : '20%',
		width : '37%',
		height : '4%'
	});
	view.add(fem_meter_view);

	var maleChar_imageview = Titanium.UI.createImageView({
		backgroundImage : '/assets/male_icon.png',
		height : '6.6%',
		width : '12.7%',
		top : '71.7%',
		left : '42.4%'
	});
	view.add(maleChar_imageview);

	var male_meter_view = Ti.UI.createView({
		backgroundImage : '/assets/male_meterBar.png',
		top : '71.7%',
		left : '5%',
		width : '37%',
		height : '4%'
	});
	view.add(male_meter_view);

	return self;
};
module.exports = FreindInfo;
