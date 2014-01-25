function AvatarByRequest(userinfo, tabledata, rowView, callback) {
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var request_table_id = getRandomInt(1, 90000);
	var request_counter = 0;
	// var rowView = [];
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var items_json = "";
	var items_length = 0;
	var tableview = "";
	var avatar_images = [];
	var AvatarThumbnail = require('/ui/common/drawings/AvatarThumbnail');
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var rowViewHeight = screenWidth * 0.189;
				//var tabledata = [];
				var bg_image = '';
				for (var i = 0; i < items_json.Record.length; i++) {
					request_counter++;

					if (items_json.Record[i].GENDER == 'f') {
						bg_image = '/assets/freind_request_female.png';
					} else {
						bg_image = '/assets/freind_request_male.png';
					}

					rowView[i] = Ti.UI.createTableViewRow({
						className : 'friendship_request_list',
						height : rowViewHeight,
						uid : items_json.Record[i].UID,
						index : i,
						backgroundImage : bg_image,
						zIndex : 10,
						user_info : items_json.Record[i]
					});
					rowView[i].addEventListener('longpress', function(e) {
						Titanium.Media.vibrate();
						var FriendRequestAction = require('/ui/common/MenuScreen/FriendRequestAction');
						var friendrequestaction = new FriendRequestAction(userinfo, items_json.Record[e.row.index]);
						friendrequestaction.open();
					});
					rowView[i].addEventListener('click', function(e) {
						var FriendRequestAction = require('/ui/common/MenuScreen/FriendRequestAction');
						var friendrequestaction = new FriendRequestAction(userinfo, items_json.Record[e.row.index]);
						friendrequestaction.open();
					});

					AvatarThumbnail({
						width : '12%',
						height : '85.5%',
						top : '4.8px',
						right : '3%'
					}, items_json.Record[i].USER_APPEARANCE, items_json.Record[i].GENDER, i, function(avatar_imageview, index) {
						if(request_table_id != null){
							avatar_images[index] = avatar_imageview;
							rowView[index].add(avatar_images[index]);
						}
					});

					var level_label = Ti.UI.createLabel({
						text : 'LVL ' + items_json.Record[i].LEVEL,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '20%',
						top : '5%'
					});
					rowView[i].add(level_label);

					var gold_imageview = Titanium.UI.createImageView({
						image : '/assets/miGoldWide_up.png',
						visible : true,
						right : '30%',
						width : '6%',
						height : '16%'
					});
					rowView[i].add(gold_imageview);

					var gold_label = Ti.UI.createLabel({
						text : items_json.Record[i].NUM_OF_GOLDS,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '20%',
					});
					rowView[i].add(gold_label);

					var online_label = Ti.UI.createLabel({
						text : 'ONLINE',
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						bottom : '5%',
						right : '20%',
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
					//rowView[i].add(status_message_label);


					var request_label = Ti.UI.createLabel({
						text : 'NEW FREIND REQUEST!',
						font : {
							fontSize : '10dip'
						},
						color : '#ffffff',
						left : '8%',
						bottom : '10%',
						width : '45%'
					});
					//rowView[i].add(request_label);

					var datetime_label = Ti.UI.createLabel({
						text : items_json.Record[i].DATETIME,
						font : {
							fontWeight : 'bold',
							fontSize : '12dip'
						},
						color : '#000000',
						left : '8%',
						bottom : '10%',
						width : '45%'
					});
					rowView[i].add(datetime_label);

					tabledata.push(rowView[i]);
				}//end of for loop

				tableview = Ti.UI.createTableView({
					backgroundColor : 'transparent',
					separatorColor : 'transparent',

					data : tabledata,
					width : '100%',
					height : '66%',
					top : '2%'
				});
				if (items_json.Record.length > 0)
					callback(tableview);
				else {

					// Create a Label.
					var emptylistlabel = Ti.UI.createLabel({
						text : 'You have no friendship request!',
						font : {
							fontWeight : 'bold',
							fontSize : '18dip'
						},
						color : '#b3fad0'
					});

					// Add to the parent view.
					callback(emptylistlabel);
					AvatarThumbnail = null;
				}
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/friendship_notifications.php?uid=" + userinfo.Record[0].UID,

	});
	//if(request_counter >0){
	Ti.App.addEventListener("request_check", function() {
		request_counter--;
		//alert(request_counter);
		if (request_counter <= 0)
			sendCounterinfo();
	});
	//}
	function sendCounterinfo() {
		Ti.App.fireEvent('request_send', {
			count : '0'
		});

	}


	Ti.App.addEventListener('avatar_table_changed', function(data) {
		if (data.release_table != 'AvatarByRequest')
			return;
		//Ti.App.fireEvent('render_table', {});
		// alert(JSON.stringify(data));
		request_table_id = null;
	});

	return;

}

module.exports = AvatarByRequest;
