function AvatarByLevel(userinfo, callback) {
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var items_json = "";
	var items_length = 0;
	var httpclientt = require('ui/iphone/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var rowViewHeight = screenWidth * 0.189;
				var tabledata = [];
				var bg_image = '';
				var avatar_image = "";

				for (var i = 0; i < items_json.Record.length; i++) {
					if (items_json.Record[i].GENDER == 'f') {
						bg_image = '/assets/freind_list_female.png'
						avatar_image = "female_icon";
					} else {
						bg_image = '/assets/freind_list_male.png'
						avatar_image = "male_icon";
					}
					var rowView = Ti.UI.createTableViewRow({
						height : rowViewHeight,
						uid : items_json.Record[i].UID,
						index : i,
						backgroundImage : bg_image,
						zIndex : 10
					});
					rowView.addEventListener('longclick', function(e) {
						Titanium.Media.vibrate();
						var SendFriendRequest = require('ui/iphone/MenuScreen/SendFriendRequest');
						var sendfriendrequest = new SendFriendRequest(userinfo, items_json.Record[e.row.index]);
						sendfriendrequest.open({
							modal : true
						});
					});
                    rowView.addEventListener('click', function(e) {
                        Titanium.Media.vibrate();
                        var SendFriendRequest = require('ui/iphone/MenuScreen/SendFriendRequest');
                        var sendfriendrequest = new SendFriendRequest(userinfo, items_json.Record[e.row.index]);
                        sendfriendrequest.open({
                            modal : true
                        });
                    });

					var return_imageview = Titanium.UI.createImageView({
						image : '/assets/' + avatar_image + '.png',
						width : '15%',
						top : '2px',
						right : '2%'
					});
					rowView.add(return_imageview);

					var level_label = Ti.UI.createLabel({
						text : 'LVL '+items_json.Record[i].LEVEL,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '20%',
						top : '5%'
					});
					rowView.add(level_label);

					var gold_imageview = Titanium.UI.createImageView({
						image : '/assets/miGoldWide_up.png',
						right : '22%',
						width : '12%',
						height : '32%',
						//zIndex : 100
					});
					rowView.add(gold_imageview);
					
					var gold_label = Ti.UI.createLabel({
						text :items_json.Record[i].NUM_OF_GOLDS,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '20%',
					});
					rowView.add(gold_label);


					var online_label = Ti.UI.createLabel({
						text : 'ONLINE',
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						bottom : '5%',
						right : '20%',
					});
					rowView.add(online_label);
					var name_label = Ti.UI.createLabel({
						text : items_json.Record[i].NAME,
						font : {
							fontSize : '16dip'
						},
						color : '#b3fad0',
						left : '8px',
						top : '5%',
						width : '45%'
					});
					rowView.add(name_label);
                    var status_message_label = Ti.UI.createLabel({
                        text : items_json.Record[i].STATUS_MESSAGE,
                        font : {
                            fontSize : '11dip'
                        },
                        color : '#b3fad0',
                        left : '8px',
                        width : '45%'
                    });
                    rowView.add(status_message_label);

					tabledata.push(rowView);
				}//end of for loop

				tableview =  Ti.UI.createTableView({		backgroundColor : 'transparent', 		separatorColor : 'transparent',
		
					separatorColor : 'transparent',
                        backgroundColor : 'transparent',
					data : tabledata,
					width : '100%',
					height : '56%',
					top : '13%'
				});
				actInd.hide();
				callback(tableview);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_avatar_list.php?uid=" + userinfo.Record[0].UID +"&gender=m&gold=0",

	});

}

module.exports = AvatarByLevel; 