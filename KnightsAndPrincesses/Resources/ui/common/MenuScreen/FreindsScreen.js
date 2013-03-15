//http://justechinfo.com/kap_server/friendship_notifications_action.php?uid=10000005&friend_uid=10000007&action=DENIED
//http://justechinfo.com/kap_server/friendship_notifications_action.php?uid=10000005&friend_uid=10000007&action=FRIENDS
function openNewTable(userinfojson, activeTable, callback) {
	var TableView = require('ui/common/MenuScreen/' + activeTable);
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
			fontSize : '12dip'
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
			fontSize : '9dip'
		},
		width : "20%",
		height : "8%"
	});
	view.add(NewMail);
	var req_notification = '';
	var new_request_imageview;
    var get_notification_url = "http://justechinfo.com/kap_server/get_notifications.php?uid=" + userinfo.Record[0].UID;
    var httpclientt = require('/ui/common/Functions/function');
    httpclientt.requestServer({
        success : function(e) {
            items_json = JSON.parse(this.responseText);
            if (items_json.Record != undefined) {
                req_notification = items_json.Record[0].REQUEST;
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
            }

        },
        method : 'GET',
        contentType : 'text/xml',
        url : get_notification_url
    });
    //if(req_notification == "NEW_REQUEST"){
        Ti.App.addEventListener("request_send",function(){
            alert('hear');
            new_request_imageview.hide();
            //req_notification = "NO_REQUEST";
            
        }); 
    //}
    
	
	var request_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
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
			fontSize : '9dip'
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
			fontSize : '9dip'
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
			fontSize : '9dip'
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
			fontSize : '9dip'
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
			fontSize : '9dip'
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
			fontSize : '9dip'
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
			fontSize : '14dip'
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
