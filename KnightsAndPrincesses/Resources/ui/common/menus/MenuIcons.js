function MenuIcons(active_screen) {
    var quest_screen_active = false;
    function clearQuestIntervals(){
        if(quest_screen_active){
            Ti.App.fireEvent('clear_quest_intervals', {
            });
            quest_screen_active = false;
        }
    }
	var view = Titanium.UI.createView({
		top : "12.5%",
		height : "11%",
		zIndex : 200
	});

	var iconstatus_imageview = Titanium.UI.createImageView({
		left : '0%',
		top : '0%',
		image : '/assets/iconStatus.png',
		height : '80%',
		width : '13.8%',
		zIndex : 100
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Status',
		bottom : '0%',
		left : '1.6%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '11dip'
		}
	});
	view.add(selected_menu_label);

	var friend_alert_bg = Titanium.UI.createImageView({
		left : '29.6%',
		bottom : '20%',
		image : '/assets/message_alert.png',
		height : '40%',
		width : '6.9%',
		visible : false,
		zIndex : 150
	});
	view.add(friend_alert_bg);
	var friend_gift_alert_bg = Titanium.UI.createImageView({
		left : '29.6%',
		bottom : '20%',
		image : '/assets/message_alert.png',
		height : '40%',
		width : '6.9%',
		visible : false,
		zIndex : 150
	});
	view.add(friend_gift_alert_bg);

	var quest_alert_bg = Titanium.UI.createImageView({
		left : '43.4%',
		bottom : '20%',
		image : '/assets/message_alert.png',
		height : '40%',
		width : '6.9%',
		visible : false,
		zIndex : 150
	});
	view.add(quest_alert_bg);
	var task_alert_bg = Titanium.UI.createImageView({
		left : '57.2%',
		bottom : '20%',
		image : '/assets/message_alert.png',
		height : '40%',
		width : '6.9%',
		visible : false,
		zIndex : 150
	});
	view.add(task_alert_bg);


	var iconstatus_imageview_bg = Titanium.UI.createImageView({
		left : '0%',
		top : '0%',
		image : '/assets/iconHighlight.png',
		height : '100%',
		width : '13.8%',
		zIndex : 50
	});
	view.add(iconstatus_imageview_bg);
	iconstatus_imageview.addEventListener('click', function() {
		iconstatus_imageview_bg.left = '0%';
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'StatusScreen'
		});
		clearQuestIntervals();
	});

	view.add(iconstatus_imageview);
	var iconInventory_imageview = Titanium.UI.createImageView({
		image : '/assets/iconInventory.png',
		height : '80%',
		width : '13.8%',
		top : '0%',
		left : '15.8%',
		zIndex : 100
	});
	view.add(iconInventory_imageview);
	iconInventory_imageview.addEventListener('click', function() {
		iconstatus_imageview_bg.left = '15.8%';
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'Inventoryscreen'
		});
		clearQuestIntervals();
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Inventory',
		bottom : '0%',
		left : '14.2%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '11dip'
		}

	});
	view.add(selected_menu_label);

	var iconFriends_imageview = Titanium.UI.createImageView({
		image : '/assets/iconFriends.png',
		height : '80%',
		width : '13.8%',
		top : '0%',
		left : '29.6%',
		zIndex : 100
	});
	view.add(iconFriends_imageview);
	iconFriends_imageview.addEventListener('click', function() {
		friend_alert_bg.visible = false;
		iconstatus_imageview_bg.left = '29.6%';
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'FreindsScreen'
		});
		clearQuestIntervals();
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Friends',
		bottom : '0%',
		left : '31%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '11dip'
		}
	});
	view.add(selected_menu_label);

	var iconQuests_imageview = Titanium.UI.createImageView({
		image : '/assets/iconQuests.png',
		height : '80%',
		width : '13.8%',
		top : '0%',
		left : '43.4%',
		zIndex : 100
	});
	view.add(iconQuests_imageview);
	iconQuests_imageview.addEventListener('click', function() {
		quest_alert_bg.visible = false;
		iconstatus_imageview_bg.left = '43.4%';
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'QuestsHome'
		});
		clearQuestIntervals();
        quest_screen_active = true;
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Quests',
		bottom : '0%',
		left : '45%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '11dip'
		},
		zIndex : 500
	});
	view.add(selected_menu_label);


	var iconTasks_imageview = Titanium.UI.createImageView({
		image : '/assets/iconTasks.png',
		height : '80%',
		width : '13.8%',
		top : '0%',
		left : '57.2%',
		zIndex : 100
	});
	view.add(iconTasks_imageview);
	iconTasks_imageview.addEventListener('click', function() {
		iconstatus_imageview_bg.left = '58%';
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'TasksMain'
		});
        clearQuestIntervals();
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Tasks',
		bottom : '0%',
		left : '59.2%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '11dip'
		}
	});
	view.add(selected_menu_label);


	var iconCustomizeBackground_imageview = Titanium.UI.createImageView({
		image : '/assets/iconCustomizeBackground.png',
		height : '80%',
		width : '13.8%',
		top : '0%',
		left : '71%',
		zIndex : 100
	});
	view.add(iconCustomizeBackground_imageview);
	iconCustomizeBackground_imageview.addEventListener('click', function() {
		iconstatus_imageview_bg.left = '71%';
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'SceneryCustomization'
		});
        clearQuestIntervals();
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Custom',
		bottom : '0%',
		left : '71%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '11dip'
		}

	});

	view.add(selected_menu_label);
	var iconOptions_imageview = Titanium.UI.createImageView({
		image : '/assets/iconOptions.png',
		height : '80%',
		width : '13.8%',
		top : '0%',
		left : '84.8%',
		zIndex : 100
		//opacity:'0.2'
	});
	view.add(iconOptions_imageview);
	iconOptions_imageview.addEventListener('click', function() {
		iconstatus_imageview_bg.left = '84.8%';
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'OptionsScreen'
		});
        clearQuestIntervals();
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Settings',
		bottom : '0%',
		left : '85.5%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '11dip'
		}

	});
	view.add(selected_menu_label);
	var new_request_beep = false, new_quest_beep = false, new_gift_beep = false, new_task_beep = false;
	Ti.App.addEventListener('NEW_REQUEST', function(data) {
		if (data.status == "NEW") {
			friend_alert_bg.visible = true;
			if (!new_request_beep) {
				var sound = Titanium.Media.createSound({
					url : '/sounds/message_bell.mp3'
				});
				if((Ti.App.Properties.getString('knp_sound') == 'ON'))
				sound.play();
				new_request_beep = !new_request_beep;
			}
		} else {
			new_request_beep = !new_request_beep;
			friend_alert_bg.visible = false;
		}
	});
    Ti.App.addEventListener('NEW_GIFT', function(data) {
        if (data.status == "NEW") {
            friend_gift_alert_bg.visible = true;
            if (!new_gift_beep) {
                var sound = Titanium.Media.createSound({
                    url : '/sounds/message_bell.mp3'
                });
                if((Ti.App.Properties.getString('knp_sound') == 'ON'))
                sound.play();
                new_gift_beep = !new_gift_beep;
            }
        } else {
            new_gift_beep = !new_gift_beep;
            friend_gift_alert_bg.visible = false;
        }
    });
	Ti.App.addEventListener('NEW_QUEST', function(data) {
		// alert(data.status);
		if (data.status == "NEW") {
			quest_alert_bg.visible = true;
			if (!new_quest_beep) {
				var sound = Titanium.Media.createSound({
					url : '/sounds/message_bell.mp3'
				});
				if((Ti.App.Properties.getString('knp_sound') == 'ON'))
				sound.play();
				new_quest_beep = !new_quest_beep;
			}
		} else {
			new_quest_beep = !new_quest_beep;
			quest_alert_bg.visible = false;
		}
	});
	Ti.App.addEventListener('NEW_TASK', function(data) {
		// alert(data.status);
		if (data.status == "NEW") {
			task_alert_bg.visible = true;
			if (!new_task_beep) {
				var sound = Titanium.Media.createSound({
					url : '/sounds/message_bell.mp3'
				});
				if((Ti.App.Properties.getString('knp_sound') == 'ON'))
				sound.play();
				new_task_beep = !new_task_beep;
			}
		} else {
			new_task_beep = !new_task_beep;
			task_alert_bg.visible = false;
		}
	});
	Ti.App.addEventListener('service_notification', function(data) {

		var httpclientt = require('/ui/common/Functions/function');
		_url = "http://bonozo.com:8080/knp/get_notifications.php?uid=" + data.uid;
		httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				if (items_json.Record != undefined) {
					 //alert(items_json.Record[0].REQUEST);
					if (items_json.Record[0].REQUEST == 'NEW_REQUEST') {
						 //alert('TRUE');
						Ti.App.fireEvent('NEW_REQUEST', {
							status : "NEW"
						});
					} else {
						 //alert('FALSE');
						Ti.App.fireEvent('NEW_REQUEST', {
							status : ""
						});
					}
                    if (items_json.Record[0].GIFT == 'NEW_GIFT') {
                         //alert('TRUE');
                        Ti.App.fireEvent('NEW_GIFT', {
                            status : "NEW"
                        });
                    } else {
                         //alert('FALSE');
                        Ti.App.fireEvent('NEW_GIFT', {
                            status : ""
                        });
                    }
					if (items_json.Record[0].QUEST_ASSIGN == 'NEW_QUEST') {
						Ti.App.fireEvent('NEW_QUEST', {
							status : "NEW"
						});
					} else {
						Ti.App.fireEvent('NEW_QUEST', {
							status : ""
						});
					}
					if (items_json.Record[0].TASKS == 'NEW_TASK') {
						Ti.App.fireEvent('NEW_TASK', {
							status : "NEW"
						});
					} else {
						Ti.App.fireEvent('NEW_TASK', {
							status : ""
						});
					}
				}
				Ti.App.fireEvent('update_xp', {
					clicked_item : 'StatusScreen'
				});
			},
			method : 'GET',
			contentType : 'text/xml',
			url : _url,
		});

		// alert(data.status);
	});

	return view;
}

module.exports = MenuIcons;
