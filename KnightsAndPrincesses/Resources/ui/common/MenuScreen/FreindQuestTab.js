function FreindQuestTab(userinfo, callback) {

	Ti.App.addEventListener('remove_friend_quest', function(data) {
		fq_tableview.deleteRow(data.index);
		//alert(data.message);
	});
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;

	var rowView = [];
	var rowHeight = screenWidth * 0.20;
	var row_counter = 0;
	var fq_items_json = "";
	var items_length = 0;
	var fq_tableview;
	var rowview_friends_icon = Titanium.UI.createImageView({
		image : '/assets/iconFriends.png'
	});
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			fq_items_json = JSON.parse(this.responseText);
			items_length = fq_items_json.Record.length;
			if (fq_items_json.Record != undefined) {
				var tabledata = [];
				for (var i = 0; i < fq_items_json.Record.length; i++) {
					rowView[row_counter] = Ti.UI.createTableViewRow({
						className : 'friend_quests',
						height : rowHeight,
						opacity : (fq_items_json.Record[i].STATUS == 'COMPLETE') ? '0' : '0.5'//,
					});
					rowView[row_counter].addEventListener('longclick', function(e) {
						Titanium.Media.vibrate();
						var RemoveQuest = require('/ui/common/MenuScreen/RemoveQuest');
						var removequest = new RemoveQuest(fq_items_json.Record[e.index].ASSIGN_QUEST_ID, e.index, 'ASSIGNER');
						removequest.open({
							modal : true
						});
					});


					var AvatarThumbnail = require('/ui/common/drawings/AvatarThumbnail');
					AvatarThumbnail({
						width : '13%',
						top : '2px',
						left : '5px'
					}, fq_items_json.Record[i].USER_APPEARANCE, fq_items_json.Record[i].GENDER, row_counter, function(avatar_imageview, callback_index) {
						rowView[callback_index].add(avatar_imageview);
					});


					var name = Ti.UI.createLabel({
						text : fq_items_json.Record[i].NAME,
						top : '2px',
						font : {
							fontSize : '16dip'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView[row_counter].add(name);

					var level = Ti.UI.createLabel({
						text : 'LVL ' + fq_items_json.Record[i].LEVEL,
						top : rowHeight * 35 / 100,
						font : {
							fontSize : '14dip'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView[row_counter].add(level);

					rowview_friends_icon.left = '30%';
					rowview_friends_icon.width = rowHeight / 3.5;
					rowview_friends_icon.height = rowHeight / 3.5;

					rowView[row_counter].add(rowview_friends_icon);

					// Create a Label.
					var num_of_friends = Ti.UI.createLabel({
						text : fq_items_json.Record[i].NUM_OF_FRIENDS,
						color : '#5afd9b',
						font : {
							fontSize : '14dip'
						},
						left : '38%',
						textAlign : 'center'
					});

					// Add to the parent view.
					rowView[row_counter].add(num_of_friends);

					if(fq_items_json.Record[i].STATUS == 'COMPLETE' || fq_items_json.Record[i].STATUS == 'EXPIRE'){
						
						// Create a Label.
						var status_label = Ti.UI.createLabel({
							text : fq_items_json.Record[i].STATUS,
							color : '#5afd9b',
							font : {fontSize:'16dip'},
							right : '5%',
							textAlign : 'center'
						});
						
						// Add to the parent view.
						rowView[row_counter].add(status_label);
						
					}
					else{
						var questTime = Ti.UI.createLabel({
							text : fq_items_json.Record[i].EXPIRED_TIME,
							top : '0%',
							color : '#5afd9b',
							font : {
								fontSize : '16dip'
							},
							right : '5%',
							textAlign : 'center'
						});
						rowView[row_counter].add(questTime);
					}



					// Create a Label.
					var rewards_lbl = Ti.UI.createLabel({
						text : 'REWARDS:',
						color : '#5afd9b',
						font : {
							fontSize : '12dip'
						},
						bottom : rowHeight * 10 / 100,
						right : '35%',
						textAlign : 'center'
					});

					// Add to the parent view.
					rowView[row_counter].add(rewards_lbl);

					// Create a Label.
					var num_of_quests_lbl = Ti.UI.createLabel({
						text : fq_items_json.Record[i].NUM_OF_QUESTS + ' QUEST(S)',
						color : '#5afd9b',
						font : {
							fontSize : '12dip'
						},
						top : rowHeight / 3,
						right : '35%',
						textAlign : 'center'
					});

					// Add to the parent view.
					rowView[row_counter].add(num_of_quests_lbl);

					tabledata.push(rowView[row_counter]);
				}//end of for loop

				fq_tableview =  Ti.UI.createTableView({		backgroundColor : 'transparent', 		separatorColor : 'transparent',
		
					data : tabledata,
					width : '100%',
					height : '100%',
					top : '2%'
				});
				//actInd.hide();
				callback(fq_tableview);

			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/knp_get_friend_quests.php?uid=" + userinfo.Record[0].UID,

	});


}

module.exports = FreindQuestTab;
