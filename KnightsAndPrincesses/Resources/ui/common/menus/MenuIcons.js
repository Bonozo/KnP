<<<<<<< HEAD
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
		height : "10%",
		zIndex : 200
	});

	var iconstatus_imageview = Titanium.UI.createImageView({
		left : '0%',
		top : '0%',
		image : '/assets/iconStatus.png',
		height : '100%',
		width : '13.8%',
		zIndex : 100
	});
	var friend_alert_bg = Titanium.UI.createImageView({
		left : '29.6%',
		top : '0%',
		image : '/assets/iconHighlightAlert.png',
		height : '100%',
		width : '13.8%',
		visible : false,
		zIndex : 50
	});
	view.add(friend_alert_bg);
	var friend_gift_alert_bg = Titanium.UI.createImageView({
		left : '29.6%',
		top : '0%',
		image : '/assets/iconHighlightAlert.png',
		height : '100%',
		width : '13.8%',
		visible : false,
		zIndex : 50
	});
	view.add(friend_gift_alert_bg);

	var quest_alert_bg = Titanium.UI.createImageView({
		left : '43.4%',
		top : '0%',
		image : '/assets/iconHighlightAlert.png',
		height : '100%',
		width : '13.8%',
		visible : false,
		zIndex : 50
	});
	view.add(quest_alert_bg);

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
		height : '100%',
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
	var iconFriends_imageview = Titanium.UI.createImageView({
		image : '/assets/iconFriends.png',
		height : '100%',
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
	var iconQuests_imageview = Titanium.UI.createImageView({
		image : '/assets/iconQuests.png',
		height : '100%',
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

	var iconLeaderboards_imageview = Titanium.UI.createImageView({
		image : '/assets/iconLeaderboards.png',
		height : '100%',
		width : '13.8%',
		top : '0%',
		left : '57.2%',
		zIndex : 100
	});
	view.add(iconLeaderboards_imageview);
	iconLeaderboards_imageview.addEventListener('click', function() {
		iconstatus_imageview_bg.left = '58%';
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'Leaderboards'
		});
        clearQuestIntervals();
	});

	var iconCustomizeBackground_imageview = Titanium.UI.createImageView({
		image : '/assets/iconCustomizeBackground.png',
		height : '100%',
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
	var iconOptions_imageview = Titanium.UI.createImageView({
		image : '/assets/iconOptions.png',
		height : '100%',
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
	var new_request_beep = false, new_quest_beep = false, new_gift_beep = false;
	Ti.App.addEventListener('NEW_REQUEST', function(data) {
		if (data.status == "NEW") {
			friend_alert_bg.visible = true;
			if (!new_request_beep) {
				var sound = Titanium.Media.createSound({
					url : '/sounds/message_bell.mp3'
				});
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
				sound.play();
				new_quest_beep = !new_quest_beep;
			}
		} else {
			new_quest_beep = !new_quest_beep;
			quest_alert_bg.visible = false;
		}
	});
	Ti.App.addEventListener('service_notification', function(data) {

		var httpclientt = require('/ui/common/Functions/function');
		_url = "http://therealmattharmon.com/knp/get_notifications.php?uid=" + data.uid;
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
=======
<<<<<<< HEAD
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
		height : "10%",
		zIndex : 200
	});

	var iconstatus_imageview = Titanium.UI.createImageView({
		left : '0%',
		top : '0%',
		image : '/assets/iconStatus.png',
		height : '100%',
		width : '13.8%',
		zIndex : 100
	});
	var friend_alert_bg = Titanium.UI.createImageView({
		left : '29.6%',
		top : '0%',
		image : '/assets/iconHighlightAlert.png',
		height : '100%',
		width : '13.8%',
		visible : false,
		zIndex : 50
	});
	view.add(friend_alert_bg);
	var friend_gift_alert_bg = Titanium.UI.createImageView({
		left : '29.6%',
		top : '0%',
		image : '/assets/iconHighlightAlert.png',
		height : '100%',
		width : '13.8%',
		visible : false,
		zIndex : 50
	});
	view.add(friend_gift_alert_bg);

	var quest_alert_bg = Titanium.UI.createImageView({
		left : '43.4%',
		top : '0%',
		image : '/assets/iconHighlightAlert.png',
		height : '100%',
		width : '13.8%',
		visible : false,
		zIndex : 50
	});
	view.add(quest_alert_bg);

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
		height : '100%',
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
	var iconFriends_imageview = Titanium.UI.createImageView({
		image : '/assets/iconFriends.png',
		height : '100%',
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
	var iconQuests_imageview = Titanium.UI.createImageView({
		image : '/assets/iconQuests.png',
		height : '100%',
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

	var iconLeaderboards_imageview = Titanium.UI.createImageView({
		image : '/assets/iconLeaderboards.png',
		height : '100%',
		width : '13.8%',
		top : '0%',
		left : '57.2%',
		zIndex : 100
	});
	view.add(iconLeaderboards_imageview);
	iconLeaderboards_imageview.addEventListener('click', function() {
		iconstatus_imageview_bg.left = '58%';
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'Leaderboards'
		});
        clearQuestIntervals();
	});

	var iconCustomizeBackground_imageview = Titanium.UI.createImageView({
		image : '/assets/iconCustomizeBackground.png',
		height : '100%',
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
	var iconOptions_imageview = Titanium.UI.createImageView({
		image : '/assets/iconOptions.png',
		height : '100%',
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
	var new_request_beep = false, new_quest_beep = false, new_gift_beep = false;
	Ti.App.addEventListener('NEW_REQUEST', function(data) {
		if (data.status == "NEW") {
			friend_alert_bg.visible = true;
			if (!new_request_beep) {
				var sound = Titanium.Media.createSound({
					url : '/sounds/message_bell.mp3'
				});
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
				sound.play();
				new_quest_beep = !new_quest_beep;
			}
		} else {
			new_quest_beep = !new_quest_beep;
			quest_alert_bg.visible = false;
		}
	});
	Ti.App.addEventListener('service_notification', function(data) {

		var httpclientt = require('/ui/common/Functions/function');
		_url = "http://therealmattharmon.com/knp/get_notifications.php?uid=" + data.uid;
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
=======
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
		height : "10%",
		zIndex : 200
	});

	var iconstatus_imageview = Titanium.UI.createImageView({
		left : '0%',
		top : '0%',
		image : '/assets/iconStatus.png',
		height : '100%',
		width : '13.8%',
		zIndex : 100
	});
	var friend_alert_bg = Titanium.UI.createImageView({
		left : '29.6%',
		top : '0%',
		image : '/assets/iconHighlightAlert.png',
		height : '100%',
		width : '13.8%',
		visible : false,
		zIndex : 50
	});
	view.add(friend_alert_bg);
	var friend_gift_alert_bg = Titanium.UI.createImageView({
		left : '29.6%',
		top : '0%',
		image : '/assets/iconHighlightAlert.png',
		height : '100%',
		width : '13.8%',
		visible : false,
		zIndex : 50
	});
	view.add(friend_gift_alert_bg);

	var quest_alert_bg = Titanium.UI.createImageView({
		left : '43.4%',
		top : '0%',
		image : '/assets/iconHighlightAlert.png',
		height : '100%',
		width : '13.8%',
		visible : false,
		zIndex : 50
	});
	view.add(quest_alert_bg);

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
		height : '100%',
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
	var iconFriends_imageview = Titanium.UI.createImageView({
		image : '/assets/iconFriends.png',
		height : '100%',
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
	var iconQuests_imageview = Titanium.UI.createImageView({
		image : '/assets/iconQuests.png',
		height : '100%',
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

	var iconLeaderboards_imageview = Titanium.UI.createImageView({
		image : '/assets/iconLeaderboards.png',
		height : '100%',
		width : '13.8%',
		top : '0%',
		left : '57.2%',
		zIndex : 100
	});
	view.add(iconLeaderboards_imageview);
	iconLeaderboards_imageview.addEventListener('click', function() {
		iconstatus_imageview_bg.left = '58%';
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'Leaderboards'
		});
        clearQuestIntervals();
	});

	var iconCustomizeBackground_imageview = Titanium.UI.createImageView({
		image : '/assets/iconCustomizeBackground.png',
		height : '100%',
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
	var iconOptions_imageview = Titanium.UI.createImageView({
		image : '/assets/iconOptions.png',
		height : '100%',
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
	var new_request_beep = false, new_quest_beep = false, new_gift_beep = false;
	Ti.App.addEventListener('NEW_REQUEST', function(data) {
		if (data.status == "NEW") {
			friend_alert_bg.visible = true;
			if (!new_request_beep) {
				var sound = Titanium.Media.createSound({
					url : '/sounds/message_bell.mp3'
				});
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
				sound.play();
				new_quest_beep = !new_quest_beep;
			}
		} else {
			new_quest_beep = !new_quest_beep;
			quest_alert_bg.visible = false;
		}
	});
	Ti.App.addEventListener('service_notification', function(data) {

		var httpclientt = require('/ui/common/Functions/function');
		_url = "http://therealmattharmon.com/knp/get_notifications.php?uid=" + data.uid;
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
>>>>>>> New version
>>>>>>> e105b5ec68096981140025cd6ae2dc1c7598964e
