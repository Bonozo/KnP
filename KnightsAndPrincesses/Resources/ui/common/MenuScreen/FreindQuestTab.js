function FreindQuestTab(userinfo, callback) {
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var rowview_friends_icon = Titanium.UI.createImageView({
		image : '/assets/iconFriends.png'
	});
	var male_character_imageview = Titanium.UI.createImageView({
		image : '/assets/male_icon.png'
	});
	var female_character_imageview = Titanium.UI.createImageView({
		image : '/assets/female_icon.png'
	});

	var rowViewHeight = screenWidth * 0.20;
	var items_json = "";
	var items_length = 0;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var tabledata = [];
				for (var i = 0; i < items_json.Record.length; i++) {
					var rowView = Ti.UI.createTableViewRow({
						height : rowViewHeight,
						//backgroundColor : '#dbedbd',
						opacity : (items_json.Record[i].STATUS == 'COMPLETE') ? '0' : '0.5'//,
					});

					/*
					 rowView.addEventListener('click', function(e) {
					 alert("Next :"+e.row.friend_uid);
					 });
					 */

					var avatar_image = "";
					if (items_json.Record[i].GENDER == 'm') {
						var return_imageview = male_character_imageview;
					} else {
						var return_imageview = female_character_imageview;
					}
					return_imageview.width = '13%';
					return_imageview.top = '2px';
					return_imageview.left = '5px';

					rowView.add(return_imageview);

					var rowview_name = Ti.UI.createLabel({
						text : items_json.Record[i].NAME,
						top : '2px',
						font : {
							fontSize : '16dip'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView.add(rowview_name);

					var rowview_level = Ti.UI.createLabel({
						text : 'LVL ' + items_json.Record[i].LEVEL,
						top : rowViewHeight * 35 / 100,
						font : {
							fontSize : '14dip'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView.add(rowview_level);

					rowview_friends_icon.left = '30%';
					rowview_friends_icon.width = rowViewHeight / 3.5;
					rowview_friends_icon.height = rowViewHeight / 3.5;

					rowView.add(rowview_friends_icon);

					// Create a Label.
					var num_of_friends = Ti.UI.createLabel({
						text : items_json.Record[i].NUM_OF_FRIENDS,
						color : '#5afd9b',
						font : {
							fontSize : '14dip'
						},
						left : '38%',
						textAlign : 'center'
					});

					// Add to the parent view.
					rowView.add(num_of_friends);

					if(items_json.Record[i].STATUS == 'COMPLETE' || items_json.Record[i].STATUS == 'EXPIRE'){
						
						// Create a Label.
						var status_label = Ti.UI.createLabel({
							text : items_json.Record[i].STATUS,
							color : '#5afd9b',
							font : {fontSize:'16dip'},
							right : '5%',
							textAlign : 'center'
						});
						
						// Add to the parent view.
						rowView.add(status_label);
						
					}
					else{
						var questTime = Ti.UI.createLabel({
							text : items_json.Record[i].EXPIRED_TIME,
							top : '0%',
							color : '#5afd9b',
							font : {
								fontSize : '16dip'
							},
							right : '5%',
							textAlign : 'center'
						});
						rowView.add(questTime);
					}



					// Create a Label.
					var rewards_lbl = Ti.UI.createLabel({
						text : 'REWARDS:',
						color : '#5afd9b',
						font : {
							fontSize : '12dip'
						},
						bottom : rowViewHeight * 10 / 100,
						right : '35%',
						textAlign : 'center'
					});

					// Add to the parent view.
					rowView.add(rewards_lbl);

					// Create a Label.
					var num_of_quests_lbl = Ti.UI.createLabel({
						text : items_json.Record[i].NUM_OF_QUESTS + ' QUEST(S)',
						color : '#5afd9b',
						font : {
							fontSize : '12dip'
						},
						top : rowViewHeight / 3,
						right : '35%',
						textAlign : 'center'
					});

					// Add to the parent view.
					rowView.add(num_of_quests_lbl);

					tabledata.push(rowView);
				}//end of for loop

				var tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '100%',
					height : '100%',
					top : '8%'
				});
				actInd.hide();
				callback(tableview);

			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://justechinfo.com/kap_server/knp_get_friend_quests.php?uid=" + userinfo.Record[0].UID,

	});

}

module.exports = FreindQuestTab;
