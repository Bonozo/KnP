function FreindsScreen(userinfo) {
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;

	var view = Titanium.UI.createView({
		top : "23%",
		height : "78%",
		width : "100%"
	});

	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Freinds',
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
	var items_json = "";
	var items_length = 0;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var rowViewHeight = screenWidth * 0.136;
				var tabledata = [];
				for (var i = 0; i < items_json.Record.length; i++) {
					var rowView = Ti.UI.createTableViewRow({
						height : rowViewHeight,
						uid : items_json.Record[i].UID
					});
					rowView.addEventListener('click', function(e) {
						var FreindInfo = require('/ui/common/MenuScreen/FreindInfo');
						var freindinfo = new FreindInfo(userinfo, e.row.uid);
						freindinfo.open();

					});

					var avatar_image = "";
					if (items_json.Record[i].GENDER == 'm') {
						avatar_image = "male_icon";
					} else {
						avatar_image = "female_icon";
					}
					var return_imageview = Titanium.UI.createImageView({
						image : '/assets/' + avatar_image + '.png',
						width : '13%',
						top : '5px',
						left : '5px'
					});
					rowView.add(return_imageview);

					var rowviewtext_label = Ti.UI.createLabel({
						text : items_json.Record[i].NAME,
						font : {
							fontSize : '12dip'
						},
						color : '#5afd9b',
						left : '20%',
						width : '45%'
					});
					rowView.add(rowviewtext_label);

					tabledata.push(rowView);
				}//end of for loop

				var tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '100%',
					height : '70.3%',
					top : '15%'
				});
				view.add(tableview);

			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://justechinfo.com/kap_server/friends_list.php?uid=" + userinfo.Record[0].UID,

	});

	///////////////////////////////////////////////////////////////////////////////////

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
	var NewMail = Titanium.UI.createButton({
		title : "New Mail",
		backgroundImage : '/assets/button_smallLong_UP.png',
		right : "2%",
		top : "58%",
		font : {
			fontSize : '9dip'
		},
		width : "20%",
		height : "8%"
	});
	view.add(NewMail);
	var request_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'REQUEST',
		width : '16%',
		height : '6.5%',
		right : '2.7%',
		bottom : '15.1%'
	});
	view.add(request_button);

	var myfriend_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'MY FRND',
		width : '16%',
		height : '6.5%',
		right : '20.8%',
		bottom : '15.1%'
	});
	view.add(myfriend_button);

	var female_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'FEMALE',
		width : '16%',
		height : '6.5%',
		right : '37.9%',
		bottom : '15.1%'
	});
	view.add(female_button);

	var male_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'MALE',
		width : '16%',
		height : '6.5%',
		right : '55%',
		bottom : '15.1%'
	});
	view.add(male_button);

	var online_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'ONLINE',
		width : '16%',
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
		width : '16%',
		height : '6.5%',
		right : '20.8%',
		bottom : '21%'
	});
	view.add(coin_button);

	var level_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_smallLong_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'LEVEL',
		width : '16%',
		height : '6.5%',
		right : '37.9%',
		bottom : '21%'
	});
	view.add(level_button);

	var sort_label = Ti.UI.createLabel({
		text : 'SORT',
		color : '#58fe9b',
		right : '73.1%',
		bottom : '21%',
		textAlign : 'right',
		font : {
			fontSize : '14dip'
		}
	});
	view.add(sort_label);

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
