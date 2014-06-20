function AvatarByFriends(userinfo, tabledata, rowView, callback) {
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var friends_table_id = getRandomInt(1, 90000);
	var gender = '';
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var items_json = "";
	var items_length = 0;
	var tableview = "";
	// var rowView = [];
	//var tabledata = [];
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
	var main_view = Ti.UI.createView();
	var avatar_images = [];
	var AvatarThumbnail = require('/ui/common/drawings/AvatarThumbnail');

	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return winWidth * percent / 100;
		} else if (axis == 'y') {
			return winHeight * percent / 100;
		}
	}

	// var activityIndicatorView = Titanium.UI.createView({
	// backgroundColor : '#FFFFFF',
	// borderRadius : 10,
	// borderColor : '#333333',
	// borderWidth : '5dip',
	// visible : false,
	// height : '8%',
	// width : (screenWidth/2),
	// zIndex : 700
	// });
	// var activityIndicator = Ti.UI.createActivityIndicator({
	// color : '#333333',
	// font : {
	// // fontFamily : 'Helvetica Neue',
	// fontSize : '14dip',
	// fontWeight : 'bold'
	// },
	// message : 'Loading...',
	// style : (Ti.Platform.name === 'iPhone OS')?Ti.UI.iPhone.ActivityIndicatorStyle.DARK:Ti.UI.ActivityIndicatorStyle.DARK,
	// height : '100%',
	// width : '100%'
	// });
	// // activityIndicator.message = 'Loading...';
	// activityIndicatorView.add(activityIndicator);
	// main_view.add(activityIndicatorView);

	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var rowViewHeight = screenWidth * 0.189;
				var bg_image = '';
				var avatar_image = "";

				for (var i = 0; i < items_json.Record.length; i++) {
					gender = items_json.Record[i].GENDER;
					bg_image = '/assets/freind_list' + ((gender == 'f') ? '_female' : '_male') + '.png';
					//((items_json.Record[i].MESSAGE =='NEW_MESSAGE')?'_message':'') + '.png';
					avatar_image = ((gender == 'f') ? 'female_icon' : 'male_icon');

					rowView[i] = Ti.UI.createTableViewRow({
						height : rowViewHeight,
						uid : items_json.Record[i].UID,
						className : 'FriendFriendlist',
						genes : items_json.Record[i].GENDER,
						index : i,
						backgroundImage : bg_image,
						//zIndex : 10
					});
					rowView[i].addEventListener('click', function(e) {
						// alert(items_json.Record[e.row.index]);

						// activityIndicator.show();
						// activityIndicatorView.visible = true;

						Ti.App.addEventListener("message_read", function(data) {
							backgroundImage = '/assets/freind_list' + ((e.row.genes == 'f') ? '_female' : '_male') + '.png';

						});
						var FreindInfo = require('/ui/common/MenuScreen/FreindInfo');
						var freindinfo = new FreindInfo(userinfo, items_json.Record[e.row.index]);
						freindinfo.open();
						freindinfo.addEventListener('open', function(e) {
							// activityIndicator.hide();
							// activityIndicatorView.visible = false;
						});
					});
					AvatarThumbnail({
						width : '12%',
						height : '85.5%',
						top : '4.8px',
						right : '3%'
					}, items_json.Record[i].USER_APPEARANCE, items_json.Record[i].GENDER, i, function(avatar_imageview, index) {
						if (friends_table_id != null) {
							avatar_images[index] = avatar_imageview;
							rowView[index].add(avatar_images[index]);
						}
					});

					var row_imageview = Titanium.UI.createImageView({
						image : '/assets/' + avatar_image + '.png',
						width : '15%',
						top : '2px',
						right : '2%'
					});
					//rowView[i].add(row_imageview);

					var level_label = Ti.UI.createLabel({
						text : 'LVL ' + items_json.Record[i].LEVEL,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '17%',
						top : '5%'
					});
					rowView[i].add(level_label);

					var gold_imageview = Titanium.UI.createImageView({
						image : '/assets/miGoldWide_up.png',
						visible : true,
						right : '30%',
						width : '11%',
						height : '32%'
					});
					rowView[i].add(gold_imageview);

					var gold_label = Ti.UI.createLabel({
						text : items_json.Record[i].NUM_OF_GOLDS,
						font : {
							fontSize : '14dip'
						},
						color : '#FFCC00',
						right : '17%',
					});
					rowView[i].add(gold_label);

					var online_label = Ti.UI.createLabel({
						text : 'ONLINE',
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						bottom : '5%',
						right : '17%',
					});
					rowView[i].add(online_label);
					var name_label = Ti.UI.createLabel({
						text : items_json.Record[i].NAME,
						font : {
							fontWeight : 'bold',
							fontSize : '18dip'
						},
						color : '#b3fad0',
						left : '8px',
						top : '20%',
						width : '45%'
					});
					rowView[i].add(name_label);
					var status_message_label = Ti.UI.createLabel({
						text : items_json.Record[i].STATUS_MESSAGE,
						font : {
							fontSize : '12dip'
						},
						top : '55%',
						color : '#b3fad0',
						left : '8px',
						width : '45%'
					});
					rowView[i].add(status_message_label);

					tabledata.push(rowView[i]);
				}//end of for loop

				tableview = Ti.UI.createTableView({
					backgroundColor : 'transparent',
					separatorColor : 'transparent',

					zIndex : 300,
					data : tabledata,
					width : '100%',
					height : '66%',
					top : '2%'
				});
				if (items_json.Record.length > 0) {
					main_view.add(tableview);
					callback(main_view);
				} else {
					var emptylistlabel = Ti.UI.createLabel({
						text : 'You have no friends!',
						font : {
							fontWeight : 'bold',
							fontSize : '18dip'
						},
						color : '#b3fad0'
					});
					main_view.add(emptylistlabel);
					callback(main_view);
					// AvatarThumbnail = null;
				}
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/friends_list.php?uid=" + userinfo.Record[0].UID
	});

	Ti.App.addEventListener('avatar_table_changed', function(data) {
		if (data.release_table != 'AvatarByFriends')
			return;
		//Ti.App.fireEvent('render_table', {});
		// alert(JSON.stringify(data));
		friends_table_id = null;
	});

	return;
};
module.exports = AvatarByFriends;
