<<<<<<< HEAD
function FreindAssignQuest(userinfo, friend_uid) {

	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();

	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var gender;
	var lvl;
	var freinds;
	var gold;

	var view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundImage : '/assets/inventoryBackground.png'

	});
	self.add(view);

	var header_view = Titanium.UI.createView({
		backgroundImage : '/assets/footerSlim_001.png',
		height : '8%',
		width : '100%',
		top : '0%'
	});
	view.add(header_view);

	var name_label = Titanium.UI.createLabel({
		text : userinfo.Record[0].NAME,
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '14dip'
		},
		zIndex : 100
	});
	header_view.add(name_label);

	var menu_label = Titanium.UI.createLabel({
		text : 'ASSIGN QUEST',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		},
		zIndex : 100
	});
	header_view.add(menu_label);

	var return_imageview = Ti.UI.createImageView({
		image : '/assets/iconReturn.png',
		width : '11.6%',
		top : '1%',
		right : '3%'
	});
	view.add(return_imageview);
	return_imageview.addEventListener('click', function(e) {
		self.close();
	});

	var Infoview = Ti.UI.createView({
		width : '100%',
		top : '9%',
		height : '16%',
		backgroundColor : '#53e990'

	});

	var imageview = Titanium.UI.createImageView({
		backgroundImage : '/assets/rowview_bg.png',
		height : '96%',
		width : '100%'
	});
	Infoview.add(imageview);

	var freind_name_label = Titanium.UI.createLabel({
		top : '0',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(freind_name_label);

	var text_label = Titanium.UI.createLabel({
		text : 'IM IN IT TO WIN IT',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(text_label);
	var bg_image;
	var freind_info = "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + friend_uid;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				if (items_json.Record.Message != '') {
					freind_name_label.text = items_json.Record[0].NAME
					gender = items_json.Record[0].GENDER;
					level_label.text = 'LVL ' + items_json.Record[0].LEVEL;
					freinds_label.text = items_json.Record[0].NUM_OF_FRIENDS;
					gold_label.text = items_json.Record[0].NUM_OF_GOLDS;
					user_id = items_json.Record[0].USER_ID;
					//actInd.hide();
				}
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : freind_info
	});

	var freinds_label = Titanium.UI.createLabel({
		bottom : '0',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(freinds_label);

	if (gender == 'f') {
		bg_image = '/assets/female_icon.png';
	} else {
		bg_image = '/assets/male_icon.png';
	}

	var freind_imageview = Titanium.UI.createImageView({
		image : bg_image,
		right : '0%',
		width : '20%'
	});
	Infoview.add(freind_imageview);

	var level_label = Titanium.UI.createLabel({
		top : '0',
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(level_label);

	var gold_label = Titanium.UI.createLabel({
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	var gold_imageview = Titanium.UI.createImageView({
		image : '/assets/miGoldWide_up.png',
		right : '30%',
		width : '12%',
		height : '40%'
	});
	Infoview.add(gold_imageview);

	Infoview.add(gold_label);
	gold_imageview.addEventListener("touchstart", function(e) {
		gold_imageview.image = '/assets/miGoldWide_down.png';
		//change background color to red
	});

	gold_imageview.addEventListener("touchend", function(e) {
		gold_imageview.image = '/assets/miGoldWide_up.png';
		//change background color to blue
	});

	var online_label = Titanium.UI.createLabel({
		text : 'ONLINE',
		bottom : '0%',
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(online_label);

	view.add(Infoview);

	var info_bar = Titanium.UI.createView({
		backgroundImage : '/assets/infoBarBG.png',
		top : '25%',
		height : '5.5%'
	});
	view.add(info_bar);

	var infobar_label = Titanium.UI.createLabel({
		text : 'ASSIGN QUESTS: MAKE THEM WORK FOR IT!',
		top : '26%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		},
		zIndex : 100
	});
	view.add(infobar_label);

	// Create a Quest Label.
	var questLabel = Ti.UI.createLabel({
		text : 'QUESTS',
		color : '#5AFD9B',
		font : {
			fontSize : '14dip'
		},
		top : '31%',
		left : '15%'
	});
	view.add(questLabel);

	// Create a Label.
	var num_of_quest = 0;
	var num_of_quest_label = Ti.UI.createLabel({
		text : num_of_quest,
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		top : '35%',
		left : '20%'
	});
	view.add(num_of_quest_label);

	// Create a Quest Label.
	var timeLimitLabel = Ti.UI.createLabel({
		text : 'TIME LIMIT',
		color : '#5AFD9B',
		font : {
			fontSize : '14dip'
		},
		top : '31%',
		right : '15%'
	});
	view.add(timeLimitLabel);

	var num_of_hours = 48;
	var timeLimitView = Ti.UI.createView({
		top : '35%',
		right : '8%',
		height : '7%',
		width : '35%'
	});
	view.add(timeLimitView);

	var leftArrowTimeLimit = Ti.UI.createImageView({
		image : '/assets/iconControlArrowLeft.png',
		right : 0,
		height : '100%'
	});
	timeLimitView.add(leftArrowTimeLimit);
	leftArrowTimeLimit.addEventListener('click', function(e) {
		timeLimitValueLabel.text = ++num_of_hours;
	});

	var rightArrowTimeLimit = Ti.UI.createImageView({
		image : '/assets/iconControlArrowRight.png',
		left : 0,
		height : '100%'
	});
	timeLimitView.add(rightArrowTimeLimit);
	rightArrowTimeLimit.addEventListener('click', function(e) {
		timeLimitValueLabel.text = (num_of_hours > 1) ? --num_of_hours : num_of_hours;
	});

	var timeLimitValueLabel = Ti.UI.createLabel({
		text : num_of_hours,
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		left : '25%',
		textAlign : 'center'
	});
	timeLimitView.add(timeLimitValueLabel);

	var hoursLabel = Ti.UI.createLabel({
		text : 'HOURS',
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		left : '40%',
		textAlign : 'center'
	});
	timeLimitView.add(hoursLabel);
	var counter = 1;
	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var rowViewHeight = screenWidth * 0.150;
	var selected_item = [];
	var httpclientt = require('/ui/common/Functions/function');
	var _url = "http://therealmattharmon.com/knp/get_all_quests.php";
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				for (var i = 0; i < items_json.Record.length; i++) {
					var rowView = Titanium.UI.createTableViewRow({
						backgroundImage : '/assets/listQuest001_up.png',
						height : rowViewHeight + 'px',
						quest_id : items_json.Record[i].QUEST_ID,
						backgroundColor : '#0b4129',
						quest_name : items_json.Record[i].QUEST_NAME,
						index : i,
						zIndex : 100,
						selected : false,
						touchEnabled : true
					});
					rowView.addEventListener('click', function(e) {
						// alert(e.row.quest_id+":"+e.row.selected);
						if (e.row.selected == true) {
							e.row.selected = false;
							//e.row.backgroundColor = '';
							delete selected_item[e.row.index];
							num_of_quest--;
						} else {
							e.row.selected = true;
							//e.row.backgroundColor = '#0b4129';
							selected_item[e.row.index] = e.row.quest_id;
							num_of_quest++;
						}
						num_of_quest_label.text = num_of_quest;

					});

					if(items_json.Record[i].QUEST_NAME == 'Archery'){
						quest_image = '/assets/iconArchery.png';
					}
					else if(items_json.Record[i].QUEST_NAME == 'Sonnet'){
						quest_image = '/assets/iconSonnet.png';
					}
					else if(items_json.Record[i].QUEST_NAME == 'Joust'){
						quest_image = '/assets/iconJoust.png';
					}
					else if(items_json.Record[i].QUEST_NAME == 'Cooking'){
						quest_image = '/assets/iconThickBook.png';
					}
					

					var rowImg = Ti.UI.createImageView({
						image : quest_image,
						height : rowViewHeight + 'px',
						left : '28%'
					});
					rowView.add(rowImg);
					var quest_counter = Ti.UI.createLabel({
						text : 'QUEST '+counter,
						color : '#083322',
						font : {
							fontSize : '12dip'
						},
						bottom : '0',
						left : '5%'
					});
					rowView.add(quest_counter);
					var questname_label = Ti.UI.createLabel({
						text : items_json.Record[i].QUEST_NAME,
						color : '#5AFD9B',
						font : {
							fontSize : '16dip'
						},
						top : '0',
						left : '50%'
					});
					rowView.add(questname_label);
					var questdesc_label = Ti.UI.createLabel({
						text : items_json.Record[i].QUEST_DESCRIPTION,
						color : '#5AFD9B',
						font : {
							fontSize : '16dip'
						},
						right : '0%'
					});
					rowView.add(questdesc_label);

					var tap_to_choose_label = Ti.UI.createLabel({
						text : '(TAP TO CHOOSE)',
						color : '#5AFD9B',
						font : {
							fontSize : '12dip'
						},
						bottom : '0',
						left : '45%'
					});
					rowView.add(tap_to_choose_label);
					counter++;
					tabledata.push(rowView);
				}

				var tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '100%',
					height : '28%',
					top : '41%',
					zIndex : 200
				});
				view.add(tableview);
				actInd.hide();
			}
			Ti.App.fireEvent('update_xp', {
				clicked_item : 'StatusScreen'
			});
		},
		method : 'GET',
		contentType : 'text/xml',
		url : _url
	});

	var namescroll = Titanium.UI.createImageView({
		left : "10%",
		top : "70%",
		width : "80%",
		height : "12%",
		image : '/assets/inputButton002_up.png'
	});
	var name_text = Titanium.UI.createTextField({
		color : '#5AFD9B',
		left : "25%",
		top : "70%",
		width : "70%",
		hintText : "Your Message",
		height : "12%",
		paddingLeft : '3',
		backgroundColor : 'transparent'
	});
	view.add(namescroll);
	view.add(name_text);


	var assign_quest = Ti.UI.createButton({
		backgroundGradient : {
			type : 'linear',
			colors : [' #A42B76', '#E39bc8'],
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			backFillStart : false
		},
		font : {
			fontSize : '9dip'
		},
		borderColor : '#A42B76',
		borderRadius : '2',
		font : {
			fontSize : '9dip'
		},
		title : 'ASSIGN QUESTS',
		height : '6.5%',
		bottom : '10%'
	});
	view.add(assign_quest);
	assign_quest.addEventListener('click', function(e) {
		var quest_ids = "";
		for (var i = 0; i < selected_item.length; i++) {
			if (selected_item[i] != "" && selected_item[i] != undefined) {
				quest_ids = quest_ids + "," + selected_item[i];
			}
		}
		if (quest_ids == '') {
			alert('Please Select atleast One Quest.');

		} else {

			var ConfirmationAlert = Titanium.UI.createAlertDialog({
				title : 'Click \'Yes\' to assign Quest.',
				message : 'Sure?',
				buttonNames : ['Yes', 'No'],
				cancel : 1
			});

			ConfirmationAlert.addEventListener('click', function(e) {
				Titanium.API.info('e = ' + JSON.stringify(e));

				//Clicked cancel, first check is for iphone, second for android
				if (e.cancel === e.index || e.cancel === true) {
					return;
				}

				switch (e.index) {
					case 0:
						actInd.show();
						//var assign_quest_url = "http://therealmattharmon.com/knp/assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "" + "&assign_to_uid=" + friendJson.UID + "" + "&quest_ids=" + e.source.quest_id + "&message=N/A";
						var assign_quest_url = "http://therealmattharmon.com/knp/knp_assign_quests.php?assign_by_uid=" + userinfo.Record[0].UID + 
						"&assign_to_uid=" + friend_uid + "&quest_ids=" + quest_ids + 
						"&message="+ Ti.Network.encodeURIComponent(name_text.value)	+"&num_of_hours="+num_of_hours+"&status=INCOMPLETE&user_id="+user_id+"";
						var httpclientt = require('/ui/common/Functions/function');
						httpclientt.requestServer({
							success : function(e) {
								items_json = JSON.parse(this.responseText);
								if (items_json.Record != undefined) {
									if (items_json.Record[0].Message != '') {

                                        var alertDialog = Titanium.UI.createAlertDialog({
                                            title : 'Assigned Quest.',
                                            message : items_json.Record[0].Message,
                                            buttonNames : ['OK']
                                        });
                                        alertDialog.show();
                                        alertDialog.addEventListener('click', function(e) {
                                            self.close();
                                        }); 

										name_text.value = '';
										
																			
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
						// alert('Clicked button 1 (NO)');
						break;
					default:
						break;

				}

			});
			ConfirmationAlert.show();

		}

	});


	var avatar_info = "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + userinfo.Record[0].UID;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				var Footer = require('ui/common/menus/Footer');
				var footer = Footer(items_json);
				view.add(footer);
					Ti.App.fireEvent('update_footer', {
						clicked_item : 'FriendRequestAction'
					});

			}

		},
		method : 'GET',
		contentType : 'text/xml',
		url : avatar_info
	});

	actInd.hide();

	return self;
}

module.exports = FreindAssignQuest;
=======
<<<<<<< HEAD
function FreindAssignQuest(userinfo, friend_uid) {

	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();

	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var gender;
	var lvl;
	var freinds;
	var gold;

	var view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundImage : '/assets/inventoryBackground.png'

	});
	self.add(view);

	var header_view = Titanium.UI.createView({
		backgroundImage : '/assets/footerSlim_001.png',
		height : '8%',
		width : '100%',
		top : '0%'
	});
	view.add(header_view);

	var name_label = Titanium.UI.createLabel({
		text : userinfo.Record[0].NAME,
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '14dip'
		},
		zIndex : 100
	});
	header_view.add(name_label);

	var menu_label = Titanium.UI.createLabel({
		text : 'ASSIGN QUEST',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		},
		zIndex : 100
	});
	header_view.add(menu_label);

	var return_imageview = Ti.UI.createImageView({
		image : '/assets/iconReturn.png',
		width : '11.6%',
		top : '1%',
		right : '3%'
	});
	view.add(return_imageview);
	return_imageview.addEventListener('click', function(e) {
		self.close();
	});

	var Infoview = Ti.UI.createView({
		width : '100%',
		top : '9%',
		height : '16%',
		backgroundColor : '#53e990'

	});

	var imageview = Titanium.UI.createImageView({
		backgroundImage : '/assets/rowview_bg.png',
		height : '96%',
		width : '100%'
	});
	Infoview.add(imageview);

	var freind_name_label = Titanium.UI.createLabel({
		top : '0',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(freind_name_label);

	var text_label = Titanium.UI.createLabel({
		text : 'IM IN IT TO WIN IT',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(text_label);
	var bg_image;
	var freind_info = "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + friend_uid;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				if (items_json.Record.Message != '') {
					freind_name_label.text = items_json.Record[0].NAME
					gender = items_json.Record[0].GENDER;
					level_label.text = 'LVL ' + items_json.Record[0].LEVEL;
					freinds_label.text = items_json.Record[0].NUM_OF_FRIENDS;
					gold_label.text = items_json.Record[0].NUM_OF_GOLDS;
					user_id = items_json.Record[0].USER_ID;
					//actInd.hide();
				}
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : freind_info
	});

	var freinds_label = Titanium.UI.createLabel({
		bottom : '0',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(freinds_label);

	if (gender == 'f') {
		bg_image = '/assets/female_icon.png';
	} else {
		bg_image = '/assets/male_icon.png';
	}

	var freind_imageview = Titanium.UI.createImageView({
		image : bg_image,
		right : '0%',
		width : '20%'
	});
	Infoview.add(freind_imageview);

	var level_label = Titanium.UI.createLabel({
		top : '0',
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(level_label);

	var gold_label = Titanium.UI.createLabel({
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	var gold_imageview = Titanium.UI.createImageView({
		image : '/assets/miGoldWide_up.png',
		right : '30%',
		width : '12%',
		height : '40%'
	});
	Infoview.add(gold_imageview);

	Infoview.add(gold_label);
	gold_imageview.addEventListener("touchstart", function(e) {
		gold_imageview.image = '/assets/miGoldWide_down.png';
		//change background color to red
	});

	gold_imageview.addEventListener("touchend", function(e) {
		gold_imageview.image = '/assets/miGoldWide_up.png';
		//change background color to blue
	});

	var online_label = Titanium.UI.createLabel({
		text : 'ONLINE',
		bottom : '0%',
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(online_label);

	view.add(Infoview);

	var info_bar = Titanium.UI.createView({
		backgroundImage : '/assets/infoBarBG.png',
		top : '25%',
		height : '5.5%'
	});
	view.add(info_bar);

	var infobar_label = Titanium.UI.createLabel({
		text : 'ASSIGN QUESTS: MAKE THEM WORK FOR IT!',
		top : '26%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		},
		zIndex : 100
	});
	view.add(infobar_label);

	// Create a Quest Label.
	var questLabel = Ti.UI.createLabel({
		text : 'QUESTS',
		color : '#5AFD9B',
		font : {
			fontSize : '14dip'
		},
		top : '31%',
		left : '15%'
	});
	view.add(questLabel);

	// Create a Label.
	var num_of_quest = 0;
	var num_of_quest_label = Ti.UI.createLabel({
		text : num_of_quest,
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		top : '35%',
		left : '20%'
	});
	view.add(num_of_quest_label);

	// Create a Quest Label.
	var timeLimitLabel = Ti.UI.createLabel({
		text : 'TIME LIMIT',
		color : '#5AFD9B',
		font : {
			fontSize : '14dip'
		},
		top : '31%',
		right : '15%'
	});
	view.add(timeLimitLabel);

	var num_of_hours = 48;
	var timeLimitView = Ti.UI.createView({
		top : '35%',
		right : '8%',
		height : '7%',
		width : '35%'
	});
	view.add(timeLimitView);

	var leftArrowTimeLimit = Ti.UI.createImageView({
		image : '/assets/iconControlArrowLeft.png',
		right : 0,
		height : '100%'
	});
	timeLimitView.add(leftArrowTimeLimit);
	leftArrowTimeLimit.addEventListener('click', function(e) {
		timeLimitValueLabel.text = ++num_of_hours;
	});

	var rightArrowTimeLimit = Ti.UI.createImageView({
		image : '/assets/iconControlArrowRight.png',
		left : 0,
		height : '100%'
	});
	timeLimitView.add(rightArrowTimeLimit);
	rightArrowTimeLimit.addEventListener('click', function(e) {
		timeLimitValueLabel.text = (num_of_hours > 1) ? --num_of_hours : num_of_hours;
	});

	var timeLimitValueLabel = Ti.UI.createLabel({
		text : num_of_hours,
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		left : '25%',
		textAlign : 'center'
	});
	timeLimitView.add(timeLimitValueLabel);

	var hoursLabel = Ti.UI.createLabel({
		text : 'HOURS',
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		left : '40%',
		textAlign : 'center'
	});
	timeLimitView.add(hoursLabel);
	var counter = 1;
	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var rowViewHeight = screenWidth * 0.150;
	var selected_item = [];
	var httpclientt = require('/ui/common/Functions/function');
	var _url = "http://therealmattharmon.com/knp/get_all_quests.php";
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				for (var i = 0; i < items_json.Record.length; i++) {
					var rowView = Titanium.UI.createTableViewRow({
						backgroundImage : '/assets/listQuest001_up.png',
						height : rowViewHeight + 'px',
						quest_id : items_json.Record[i].QUEST_ID,
						backgroundColor : '#0b4129',
						quest_name : items_json.Record[i].QUEST_NAME,
						index : i,
						zIndex : 100,
						selected : false,
						touchEnabled : true
					});
					rowView.addEventListener('click', function(e) {
						// alert(e.row.quest_id+":"+e.row.selected);
						if (e.row.selected == true) {
							e.row.selected = false;
							//e.row.backgroundColor = '';
							delete selected_item[e.row.index];
							num_of_quest--;
						} else {
							e.row.selected = true;
							//e.row.backgroundColor = '#0b4129';
							selected_item[e.row.index] = e.row.quest_id;
							num_of_quest++;
						}
						num_of_quest_label.text = num_of_quest;

					});

					if(items_json.Record[i].QUEST_NAME == 'Archery'){
						quest_image = '/assets/iconArchery.png';
					}
					else if(items_json.Record[i].QUEST_NAME == 'Sonnet'){
						quest_image = '/assets/iconSonnet.png';
					}
					else if(items_json.Record[i].QUEST_NAME == 'Joust'){
						quest_image = '/assets/iconJoust.png';
					}
					else if(items_json.Record[i].QUEST_NAME == 'Cooking'){
						quest_image = '/assets/iconThickBook.png';
					}
					

					var rowImg = Ti.UI.createImageView({
						image : quest_image,
						height : rowViewHeight + 'px',
						left : '28%'
					});
					rowView.add(rowImg);
					var quest_counter = Ti.UI.createLabel({
						text : 'QUEST '+counter,
						color : '#083322',
						font : {
							fontSize : '12dip'
						},
						bottom : '0',
						left : '5%'
					});
					rowView.add(quest_counter);
					var questname_label = Ti.UI.createLabel({
						text : items_json.Record[i].QUEST_NAME,
						color : '#5AFD9B',
						font : {
							fontSize : '16dip'
						},
						top : '0',
						left : '50%'
					});
					rowView.add(questname_label);
					var questdesc_label = Ti.UI.createLabel({
						text : items_json.Record[i].QUEST_DESCRIPTION,
						color : '#5AFD9B',
						font : {
							fontSize : '16dip'
						},
						right : '0%'
					});
					rowView.add(questdesc_label);

					var tap_to_choose_label = Ti.UI.createLabel({
						text : '(TAP TO CHOOSE)',
						color : '#5AFD9B',
						font : {
							fontSize : '12dip'
						},
						bottom : '0',
						left : '45%'
					});
					rowView.add(tap_to_choose_label);
					counter++;
					tabledata.push(rowView);
				}

				var tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '100%',
					height : '28%',
					top : '41%',
					zIndex : 200
				});
				view.add(tableview);
				actInd.hide();
			}
			Ti.App.fireEvent('update_xp', {
				clicked_item : 'StatusScreen'
			});
		},
		method : 'GET',
		contentType : 'text/xml',
		url : _url
	});

	var namescroll = Titanium.UI.createImageView({
		left : "10%",
		top : "70%",
		width : "80%",
		height : "12%",
		image : '/assets/inputButton002_up.png'
	});
	var name_text = Titanium.UI.createTextField({
		color : '#5AFD9B',
		left : "25%",
		top : "70%",
		width : "70%",
		hintText : "Your Message",
		height : "12%",
		paddingLeft : '3',
		backgroundColor : 'transparent'
	});
	view.add(namescroll);
	view.add(name_text);


	var assign_quest = Ti.UI.createButton({
		backgroundGradient : {
			type : 'linear',
			colors : [' #A42B76', '#E39bc8'],
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			backFillStart : false
		},
		font : {
			fontSize : '9dip'
		},
		borderColor : '#A42B76',
		borderRadius : '2',
		font : {
			fontSize : '9dip'
		},
		title : 'ASSIGN QUESTS',
		height : '6.5%',
		bottom : '10%'
	});
	view.add(assign_quest);
	assign_quest.addEventListener('click', function(e) {
		var quest_ids = "";
		for (var i = 0; i < selected_item.length; i++) {
			if (selected_item[i] != "" && selected_item[i] != undefined) {
				quest_ids = quest_ids + "," + selected_item[i];
			}
		}
		if (quest_ids == '') {
			alert('Please Select atleast One Quest.');

		} else {

			var ConfirmationAlert = Titanium.UI.createAlertDialog({
				title : 'Click \'Yes\' to assign Quest.',
				message : 'Sure?',
				buttonNames : ['Yes', 'No'],
				cancel : 1
			});

			ConfirmationAlert.addEventListener('click', function(e) {
				Titanium.API.info('e = ' + JSON.stringify(e));

				//Clicked cancel, first check is for iphone, second for android
				if (e.cancel === e.index || e.cancel === true) {
					return;
				}

				switch (e.index) {
					case 0:
						actInd.show();
						//var assign_quest_url = "http://therealmattharmon.com/knp/assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "" + "&assign_to_uid=" + friendJson.UID + "" + "&quest_ids=" + e.source.quest_id + "&message=N/A";
						var assign_quest_url = "http://therealmattharmon.com/knp/knp_assign_quests.php?assign_by_uid=" + userinfo.Record[0].UID + 
						"&assign_to_uid=" + friend_uid + "&quest_ids=" + quest_ids + 
						"&message="+ Ti.Network.encodeURIComponent(name_text.value)	+"&num_of_hours="+num_of_hours+"&status=INCOMPLETE&user_id="+user_id+"";
						var httpclientt = require('/ui/common/Functions/function');
						httpclientt.requestServer({
							success : function(e) {
								items_json = JSON.parse(this.responseText);
								if (items_json.Record != undefined) {
									if (items_json.Record[0].Message != '') {

                                        var alertDialog = Titanium.UI.createAlertDialog({
                                            title : 'Assigned Quest.',
                                            message : items_json.Record[0].Message,
                                            buttonNames : ['OK']
                                        });
                                        alertDialog.show();
                                        alertDialog.addEventListener('click', function(e) {
                                            self.close();
                                        }); 

										name_text.value = '';
										
																			
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
						// alert('Clicked button 1 (NO)');
						break;
					default:
						break;

				}

			});
			ConfirmationAlert.show();

		}

	});


	var avatar_info = "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + userinfo.Record[0].UID;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				var Footer = require('ui/common/menus/Footer');
				var footer = Footer(items_json);
				view.add(footer);
					Ti.App.fireEvent('update_footer', {
						clicked_item : 'FriendRequestAction'
					});

			}

		},
		method : 'GET',
		contentType : 'text/xml',
		url : avatar_info
	});

	actInd.hide();

	return self;
}

module.exports = FreindAssignQuest;
=======
function FreindAssignQuest(userinfo, friend_uid) {

	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();

	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var gender;
	var lvl;
	var freinds;
	var gold;

	var view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundImage : '/assets/inventoryBackground.png'

	});
	self.add(view);

	var header_view = Titanium.UI.createView({
		backgroundImage : '/assets/footerSlim_001.png',
		height : '8%',
		width : '100%',
		top : '0%'
	});
	view.add(header_view);

	var name_label = Titanium.UI.createLabel({
		text : userinfo.Record[0].NAME,
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '14dip'
		},
		zIndex : 100
	});
	header_view.add(name_label);

	var menu_label = Titanium.UI.createLabel({
		text : 'ASSIGN QUEST',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		},
		zIndex : 100
	});
	header_view.add(menu_label);

	var return_imageview = Ti.UI.createImageView({
		image : '/assets/iconReturn.png',
		width : '11.6%',
		top : '1%',
		right : '3%'
	});
	view.add(return_imageview);
	return_imageview.addEventListener('click', function(e) {
		self.close();
	});

	var Infoview = Ti.UI.createView({
		width : '100%',
		top : '9%',
		height : '16%',
		backgroundColor : '#53e990'

	});

	var imageview = Titanium.UI.createImageView({
		backgroundImage : '/assets/rowview_bg.png',
		height : '96%',
		width : '100%'
	});
	Infoview.add(imageview);

	var freind_name_label = Titanium.UI.createLabel({
		top : '0',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(freind_name_label);

	var text_label = Titanium.UI.createLabel({
		text : 'IM IN IT TO WIN IT',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(text_label);
	var bg_image;
	var freind_info = "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + friend_uid;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				if (items_json.Record.Message != '') {
					freind_name_label.text = items_json.Record[0].NAME
					gender = items_json.Record[0].GENDER;
					level_label.text = 'LVL ' + items_json.Record[0].LEVEL;
					freinds_label.text = items_json.Record[0].NUM_OF_FRIENDS;
					gold_label.text = items_json.Record[0].NUM_OF_GOLDS;
					user_id = items_json.Record[0].USER_ID;
					//actInd.hide();
				}
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : freind_info
	});

	var freinds_label = Titanium.UI.createLabel({
		bottom : '0',
		left : '2%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(freinds_label);

	if (gender == 'f') {
		bg_image = '/assets/female_icon.png';
	} else {
		bg_image = '/assets/male_icon.png';
	}

	var freind_imageview = Titanium.UI.createImageView({
		image : bg_image,
		right : '0%',
		width : '20%'
	});
	Infoview.add(freind_imageview);

	var level_label = Titanium.UI.createLabel({
		top : '0',
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(level_label);

	var gold_label = Titanium.UI.createLabel({
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	var gold_imageview = Titanium.UI.createImageView({
		image : '/assets/miGoldWide_up.png',
		right : '30%',
		width : '12%',
		height : '40%'
	});
	Infoview.add(gold_imageview);

	Infoview.add(gold_label);
	gold_imageview.addEventListener("touchstart", function(e) {
		gold_imageview.image = '/assets/miGoldWide_down.png';
		//change background color to red
	});

	gold_imageview.addEventListener("touchend", function(e) {
		gold_imageview.image = '/assets/miGoldWide_up.png';
		//change background color to blue
	});

	var online_label = Titanium.UI.createLabel({
		text : 'ONLINE',
		bottom : '0%',
		right : '22%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	Infoview.add(online_label);

	view.add(Infoview);

	var info_bar = Titanium.UI.createView({
		backgroundImage : '/assets/infoBarBG.png',
		top : '25%',
		height : '5.5%'
	});
	view.add(info_bar);

	var infobar_label = Titanium.UI.createLabel({
		text : 'ASSIGN QUESTS: MAKE THEM WORK FOR IT!',
		top : '26%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		},
		zIndex : 100
	});
	view.add(infobar_label);

	// Create a Quest Label.
	var questLabel = Ti.UI.createLabel({
		text : 'QUESTS',
		color : '#5AFD9B',
		font : {
			fontSize : '14dip'
		},
		top : '31%',
		left : '15%'
	});
	view.add(questLabel);

	// Create a Label.
	var num_of_quest = 0;
	var num_of_quest_label = Ti.UI.createLabel({
		text : num_of_quest,
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		top : '35%',
		left : '20%'
	});
	view.add(num_of_quest_label);

	// Create a Quest Label.
	var timeLimitLabel = Ti.UI.createLabel({
		text : 'TIME LIMIT',
		color : '#5AFD9B',
		font : {
			fontSize : '14dip'
		},
		top : '31%',
		right : '15%'
	});
	view.add(timeLimitLabel);

	var num_of_hours = 48;
	var timeLimitView = Ti.UI.createView({
		top : '35%',
		right : '8%',
		height : '7%',
		width : '35%'
	});
	view.add(timeLimitView);

	var leftArrowTimeLimit = Ti.UI.createImageView({
		image : '/assets/iconControlArrowLeft.png',
		right : 0,
		height : '100%'
	});
	timeLimitView.add(leftArrowTimeLimit);
	leftArrowTimeLimit.addEventListener('click', function(e) {
		timeLimitValueLabel.text = ++num_of_hours;
	});

	var rightArrowTimeLimit = Ti.UI.createImageView({
		image : '/assets/iconControlArrowRight.png',
		left : 0,
		height : '100%'
	});
	timeLimitView.add(rightArrowTimeLimit);
	rightArrowTimeLimit.addEventListener('click', function(e) {
		timeLimitValueLabel.text = (num_of_hours > 1) ? --num_of_hours : num_of_hours;
	});

	var timeLimitValueLabel = Ti.UI.createLabel({
		text : num_of_hours,
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		left : '25%',
		textAlign : 'center'
	});
	timeLimitView.add(timeLimitValueLabel);

	var hoursLabel = Ti.UI.createLabel({
		text : 'HOURS',
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		left : '40%',
		textAlign : 'center'
	});
	timeLimitView.add(hoursLabel);
	var counter = 1;
	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var rowViewHeight = screenWidth * 0.150;
	var selected_item = [];
	var httpclientt = require('/ui/common/Functions/function');
	var _url = "http://therealmattharmon.com/knp/get_all_quests.php";
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				for (var i = 0; i < items_json.Record.length; i++) {
					var rowView = Titanium.UI.createTableViewRow({
						backgroundImage : '/assets/listQuest001_up.png',
						height : rowViewHeight + 'px',
						quest_id : items_json.Record[i].QUEST_ID,
						backgroundColor : '#0b4129',
						quest_name : items_json.Record[i].QUEST_NAME,
						index : i,
						zIndex : 100,
						selected : false,
						touchEnabled : true
					});
					rowView.addEventListener('click', function(e) {
						// alert(e.row.quest_id+":"+e.row.selected);
						if (e.row.selected == true) {
							e.row.selected = false;
							//e.row.backgroundColor = '';
							delete selected_item[e.row.index];
							num_of_quest--;
						} else {
							e.row.selected = true;
							//e.row.backgroundColor = '#0b4129';
							selected_item[e.row.index] = e.row.quest_id;
							num_of_quest++;
						}
						num_of_quest_label.text = num_of_quest;

					});

					if(items_json.Record[i].QUEST_NAME == 'Archery'){
						quest_image = '/assets/iconArchery.png';
					}
					else if(items_json.Record[i].QUEST_NAME == 'Sonnet'){
						quest_image = '/assets/iconSonnet.png';
					}
					else if(items_json.Record[i].QUEST_NAME == 'Joust'){
						quest_image = '/assets/iconJoust.png';
					}
					else if(items_json.Record[i].QUEST_NAME == 'Cooking'){
						quest_image = '/assets/iconThickBook.png';
					}
					

					var rowImg = Ti.UI.createImageView({
						image : quest_image,
						height : rowViewHeight + 'px',
						left : '28%'
					});
					rowView.add(rowImg);
					var quest_counter = Ti.UI.createLabel({
						text : 'QUEST '+counter,
						color : '#083322',
						font : {
							fontSize : '12dip'
						},
						bottom : '0',
						left : '5%'
					});
					rowView.add(quest_counter);
					var questname_label = Ti.UI.createLabel({
						text : items_json.Record[i].QUEST_NAME,
						color : '#5AFD9B',
						font : {
							fontSize : '16dip'
						},
						top : '0',
						left : '50%'
					});
					rowView.add(questname_label);
					var questdesc_label = Ti.UI.createLabel({
						text : items_json.Record[i].QUEST_DESCRIPTION,
						color : '#5AFD9B',
						font : {
							fontSize : '16dip'
						},
						right : '0%'
					});
					rowView.add(questdesc_label);

					var tap_to_choose_label = Ti.UI.createLabel({
						text : '(TAP TO CHOOSE)',
						color : '#5AFD9B',
						font : {
							fontSize : '12dip'
						},
						bottom : '0',
						left : '45%'
					});
					rowView.add(tap_to_choose_label);
					counter++;
					tabledata.push(rowView);
				}

				var tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '100%',
					height : '28%',
					top : '41%',
					zIndex : 200
				});
				view.add(tableview);
				actInd.hide();
			}
			Ti.App.fireEvent('update_xp', {
				clicked_item : 'StatusScreen'
			});
		},
		method : 'GET',
		contentType : 'text/xml',
		url : _url
	});

	var namescroll = Titanium.UI.createImageView({
		left : "10%",
		top : "70%",
		width : "80%",
		height : "12%",
		image : '/assets/inputButton002_up.png'
	});
	var name_text = Titanium.UI.createTextField({
		color : '#5AFD9B',
		left : "25%",
		top : "70%",
		width : "70%",
		hintText : "Your Message",
		height : "12%",
		paddingLeft : '3',
		backgroundColor : 'transparent'
	});
	view.add(namescroll);
	view.add(name_text);


	var assign_quest = Ti.UI.createButton({
		backgroundGradient : {
			type : 'linear',
			colors : [' #A42B76', '#E39bc8'],
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			backFillStart : false
		},
		font : {
			fontSize : '9dip'
		},
		borderColor : '#A42B76',
		borderRadius : '2',
		font : {
			fontSize : '9dip'
		},
		title : 'ASSIGN QUESTS',
		height : '6.5%',
		bottom : '10%'
	});
	view.add(assign_quest);
	assign_quest.addEventListener('click', function(e) {
		var quest_ids = "";
		for (var i = 0; i < selected_item.length; i++) {
			if (selected_item[i] != "" && selected_item[i] != undefined) {
				quest_ids = quest_ids + "," + selected_item[i];
			}
		}
		if (quest_ids == '') {
			alert('Please Select atleast One Quest.');

		} else {

			var ConfirmationAlert = Titanium.UI.createAlertDialog({
				title : 'Click \'Yes\' to assign Quest.',
				message : 'Sure?',
				buttonNames : ['Yes', 'No'],
				cancel : 1
			});

			ConfirmationAlert.addEventListener('click', function(e) {
				Titanium.API.info('e = ' + JSON.stringify(e));

				//Clicked cancel, first check is for iphone, second for android
				if (e.cancel === e.index || e.cancel === true) {
					return;
				}

				switch (e.index) {
					case 0:
						actInd.show();
						//var assign_quest_url = "http://therealmattharmon.com/knp/assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "" + "&assign_to_uid=" + friendJson.UID + "" + "&quest_ids=" + e.source.quest_id + "&message=N/A";
						var assign_quest_url = "http://therealmattharmon.com/knp/knp_assign_quests.php?assign_by_uid=" + userinfo.Record[0].UID + 
						"&assign_to_uid=" + friend_uid + "&quest_ids=" + quest_ids + 
						"&message="+ Ti.Network.encodeURIComponent(name_text.value)	+"&num_of_hours="+num_of_hours+"&status=INCOMPLETE&user_id="+user_id+"";
						var httpclientt = require('/ui/common/Functions/function');
						httpclientt.requestServer({
							success : function(e) {
								items_json = JSON.parse(this.responseText);
								if (items_json.Record != undefined) {
									if (items_json.Record[0].Message != '') {

                                        var alertDialog = Titanium.UI.createAlertDialog({
                                            title : 'Assigned Quest.',
                                            message : items_json.Record[0].Message,
                                            buttonNames : ['OK']
                                        });
                                        alertDialog.show();
                                        alertDialog.addEventListener('click', function(e) {
                                            self.close();
                                        }); 

										name_text.value = '';
										
																			
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
						// alert('Clicked button 1 (NO)');
						break;
					default:
						break;

				}

			});
			ConfirmationAlert.show();

		}

	});


	var avatar_info = "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + userinfo.Record[0].UID;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				var Footer = require('ui/common/menus/Footer');
				var footer = Footer(items_json);
				view.add(footer);
					Ti.App.fireEvent('update_footer', {
						clicked_item : 'FriendRequestAction'
					});

			}

		},
		method : 'GET',
		contentType : 'text/xml',
		url : avatar_info
	});

	actInd.hide();

	return self;
}

module.exports = FreindAssignQuest;
>>>>>>> New version
>>>>>>> e105b5ec68096981140025cd6ae2dc1c7598964e
