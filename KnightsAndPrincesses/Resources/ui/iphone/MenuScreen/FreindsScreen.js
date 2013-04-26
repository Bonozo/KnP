//http://therealmattharmon.com/knp/friendship_notifications_action.php?uid=10000005&friend_uid=10000007&action=DENIED
//http://therealmattharmon.com/knp/friendship_notifications_action.php?uid=10000005&friend_uid=10000007&action=FRIENDS
function openNewTable(userinfojson, activeTable, callback) {
	var TableView = require('ui/iphone/MenuScreen/' + activeTable);
	TableView(userinfojson, function(Tableview) {
		callback(Tableview);
	});
}

function FreindsScreen(userinfo) {
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var activeTable = "AvatarByFriends";
	var main_table_view;
	var tableview;
	var view = Titanium.UI.createView({
		top : "23.5%",
		height : "78%",
		width : "100%"
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Friends',
		top : '0%',
		left : '29.6%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '12'
		}
	});
	view.add(selected_menu_label);
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
	});

	///////////////////////////////////////////////////////////////////////////////////

/*
	var UP_imageview = Titanium.UI.createImageView({
		url : '/assets/iconControlArrowUp.png',
		width : '12.5%',
		height : "10%",
		top : '2%',
		left : '44.4%'
	});
	view.add(UP_imageview);


	var down_imageview = Titanium.UI.createButton({
		backgroundImage : '/assets/iconControlArrowDown.png',
		width : '12.5%',
		top : '57%',
		height : "10%",
		left : '44.4%'
	});
	view.add(down_imageview);
	*/
	/*
	 var search_byname = Titanium.UI.createTextField({
	 hintText : "Find By Name",
	 top : "58%",
	 left : "5%",
	 width : "30%",
	 font : {
	 fontSize : '9dip'
	 },
	 height : "8%"
	 });
	 view.add(search_byname);
	 */
	var NewMail = Titanium.UI.createButton({
		title : "New Mail",
		backgroundImage : '/assets/button_smallLong_UP.png',
		right : "2%",
		top : "65%",
		font : {
			fontSize : '9'
		},
		width : "20%",
		height : "8%"
	});
	view.add(NewMail);
    var gift_notification = Titanium.UI.createButton({
        title : "Gifts Notifications",
        backgroundImage : '/assets/button_smallLong_UP.png',
        left : "2%",
        top : "65%",
        font : {
            fontSize : '11'
        },
        //width : "20%",
        height : "8%",
         width : '35%',
    });
    view.add(gift_notification);
    gift_notification.addEventListener('click', function(e) {
        var gift_notification = require('ui/iphone/MenuScreen/GiftNotifications');
        var GiftNotiFromFreind = new gift_notification(userinfo);
        GiftNotiFromFreind.open();
    });

	var req_notification = '';
	var new_request_imageview;
<<<<<<< HEAD
	var gift_imageview = null;
=======
	var gift_imageview;
>>>>>>> e105b5ec68096981140025cd6ae2dc1c7598964e
	var gift_icon = '';
    var get_notification_url = "http://therealmattharmon.com/knp/get_notifications.php?uid=" + userinfo.Record[0].UID;
    var httpclientt = require('ui/iphone/Functions/function');
    httpclientt.requestServer({
        success : function(e) {
            items_json = JSON.parse(this.responseText);
            if (items_json.Record != undefined) {
                req_notification = items_json.Record[0].REQUEST;
                gift_icon = items_json.Record[0].GIFT;
                if (req_notification == 'NEW_REQUEST') {
                    new_request_imageview = Titanium.UI.createImageView({
                        image : '/assets/message_alert.png',
                        width : '4%',
                        height : '4%',
                        right : '2.7%',
                        bottom : '16.4%',
                        zIndex : 600
                    });
                    view.add(new_request_imageview);
                    
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
        Ti.App.addEventListener("request_send",function(){
            //alert('hear');
            new_request_imageview.hide();
            //req_notification = "NO_REQUEST";
            
        }); 
    //}
    
    Ti.App.addEventListener("gift_Notification",function(){
<<<<<<< HEAD
		if (gift_icon && gift_imageview != null) {
=======
		if (gift_icon) {
>>>>>>> e105b5ec68096981140025cd6ae2dc1c7598964e
			gift_imageview.hide();
		}
    }); 
	
	var request_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9'
		},
		title : 'REQUEST',
		width : '17%',
		height : '6.5%',
		right : '2.7%',
		bottom : '15.1%'
	});
	view.add(request_button);

	request_button.addEventListener('click', function(e) {
		view.remove(main_table_view);
		activeTable = 'AvatarByRequest';
		openNewTable(userinfo, activeTable, function(tableview) {
			main_table_view = tableview;
			view.add(main_table_view);
		});
	});

	var myfriend_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9'
		},
		title : 'FRIENDS',
		width : '17%',
		height : '6.5%',
		right : '20.8%',
		bottom : '15.1%'
	});
	view.add(myfriend_button);
	myfriend_button.addEventListener('click', function(e) {
		view.remove(main_table_view);
		activeTable = 'AvatarByFriends';
		openNewTable(userinfo, activeTable, function(tableview) {
			main_table_view = tableview;
			view.add(main_table_view);
		});
	});
	var female_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9'
		},
		title : 'FEMALE',
		width : '17%',
		height : '6.5%',
		right : '37.9%',
		bottom : '15.1%'
	});
	view.add(female_button);
	female_button.addEventListener('click', function(e) {
		view.remove(main_table_view);
		activeTable = 'AvatarByFemale';
		openNewTable(userinfo, activeTable, function(tableview) {
			main_table_view = tableview;
			view.add(main_table_view);
		});
	});

	var male_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9'
		},
		title : 'MALE',
		width : '17%',
		height : '6.5%',
		right : '55%',
		bottom : '15.1%'
	});
	view.add(male_button);
	male_button.addEventListener('click', function(e) {
		view.remove(main_table_view);
		activeTable = 'AvatarByMale';
		openNewTable(userinfo, activeTable, function(tableview) {
			main_table_view = tableview;
			view.add(main_table_view);
		});
	});

	var online_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9'
		},
		title : 'ONLINE',
		width : '17%',
		height : '6.5%',
		right : '2.7%',
		bottom : '21%'
	});
	view.add(online_button);

	var coin_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9'
		},
		title : 'COIN',
		width : '17%',
		height : '6.5%',
		right : '20.8%',
		bottom : '21%'
	});
	view.add(coin_button);
	coin_button.addEventListener('click', function(e) {
		view.remove(main_table_view);
		activeTable = 'AvatarByGold';
		openNewTable(userinfo, activeTable, function(tableview) {
			main_table_view = tableview;
			view.add(main_table_view);
		});
	});

	var level_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9'
		},
		title : 'LEVEL',
		width : '17%',
		height : '6.5%',
		right : '37.9%',
		bottom : '21%'
	});
	view.add(level_button);
	level_button.addEventListener('click', function(e) {
		view.remove(main_table_view);
		activeTable = 'AvatarByLevel';
		openNewTable(userinfo, activeTable, function(tableview) {
			main_table_view = tableview;
			view.add(main_table_view);
		});
	});

	var sort_label = Ti.UI.createLabel({
		text : 'SORT',
		color : '#58fe9b',
		left : '10%',
		bottom : '21%',
		textAlign : 'right',
		font : {
			fontSize : '14'
		}
	});
	view.add(sort_label);
	Ti.App.addEventListener('update_friend_list', function(data) {
		view.remove(main_table_view);
		activeTable = data.activeScreen;
		openNewTable(userinfo, activeTable, function(tableview) {
			main_table_view = tableview;
			view.add(main_table_view);
		});
	});
	////event for sort
	request_button.addEventListener('click', function(e) {
		/*
		 view.remove(tableview);
		 tableview = null;
		 view.remove(UP_imageview);
		 UP_imageview = null;
		 view.remove(down_imageview);
		 down_imageview = null;
		 var sortbyrequest = require('ui/common/MenuScreen/FreindScreenSortByRequest');
		 var sort = new sortbyrequest(userinfo, coininfo);
		 view.add(sort);
		 */
	});
	//// Event for sort

	return view;
};
module.exports = FreindsScreen;
