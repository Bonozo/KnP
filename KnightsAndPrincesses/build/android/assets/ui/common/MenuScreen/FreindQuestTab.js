function FreindQuestTab(userinfo, callback) {
	var AvatarThumbnail = require('/ui/common/drawings/AvatarThumbnail');
	var countDown = function(h, m, s, _instance_index, fn_tick, fn_end) {
		return {
			total_sec : h * 60 * 60 + m * 60 + s,
			timer : this.timer,
			instance_index : _instance_index,
			set : function(h, m, s) {
				this.total_sec = parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
				this.time = {
					h : h,
					m : m,
					s : s
				};
				return this;
			},
			start : function() {
				var self = this;
				this.timer = setInterval(function() {
					//alert('running');
					if (self.total_sec) {
						self.total_sec--;
						var hour = parseInt(self.total_sec / (60 * 60));
						var min = (self.total_sec - (parseInt(hour * (60 * 60))) - (self.total_sec % 60)) / 60;

						self.time = {
							h : parseInt(self.total_sec / (60 * 60)),
							m : parseInt(min),
							s : (self.total_sec % 60)
						};
						fn_tick(self.time.h + ":" + self.time.m + ":" + self.time.s, self.instance_index);
					} else {
						self.stop();
						fn_end(self.instance_index);
					}
				}, 1000);
				return this;
			},
			stop : function() {
				clearInterval(this.timer);
				this.time = {
					h : 0,
					m : 0,
					s : 0
				};
				this.total_sec = 0;
				return this;
			}
		};
	};
	function clearIntervals() {
		Ti.App.removeEventListener('clear_quest_intervals', clearIntervals);
		clearInterval(updateTimerID);
		updateTimerID = null;
		var t2 = '';
		for (var key in my_timer) {
			if (my_timer.hasOwnProperty(key)) {
				t2 += key + '::';
				if (my_timer[key] != undefined) {
					my_timer[key].stop();
				}
			}
		}
	}


	Ti.App.addEventListener('remove_friend_quest', function(data) {
		fq_tableview.deleteRow(data.index);
		//alert(data.message);
	});
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;

	var my_timer = [];
	var temp = '';
	var rowView = [];
	var rowHeight = screenWidth * 0.20;
	var row_counter = 0;
	var fq_items_json = "";
	var items_length = 0;
	var fq_tableview;

	var empty_quest_label = Ti.UI.createLabel({
		text : 'You have not assigned any Quest!',
		font : {
			fontWeight : 'bold',
			fontSize : '18dip'
		},
		color : '#b3fad0'
	}); 

	var questStatusIcon = [];
	var questTime = [];
	var avatar_images = [];
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
						backgroundImage : '/assets/quest_row_bg.png'
					});
					rowView[row_counter].addEventListener('longpress', function(e) {
						Titanium.Media.vibrate();
						var RemoveQuest = require('/ui/common/MenuScreen/RemoveQuest');
						var removequest = new RemoveQuest(fq_items_json.Record[e.index].ASSIGN_QUEST_ID, e.index, 'ASSIGNER');
						removequest.open({
							modal : true
						});
					});

					AvatarThumbnail({
						width : '13%',
						top : '2px',
						left : '5px'
					}, fq_items_json.Record[i].USER_APPEARANCE, fq_items_json.Record[i].GENDER, row_counter, function(avatar_imageview, callback_index) {
						avatar_images[callback_index] = avatar_imageview;
						rowView[callback_index].add(avatar_images[callback_index]);
					});

					var name = Ti.UI.createLabel({
						text : fq_items_json.Record[i].NAME,
						top : '10%',
						font : {
							fontSize : '18dip',
							fontWeight : 'bold'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView[row_counter].add(name);

					var level = Ti.UI.createLabel({
						text : 'LVL ' + fq_items_json.Record[i].LEVEL,
						top : '38%',
						font : {
							fontSize : '12dip'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView[row_counter].add(level);

					var num_of_friends = Ti.UI.createLabel({
						text : fq_items_json.Record[i].NUM_OF_FRIENDS,
						color : '#5afd9b',
						font : {
							fontSize : '14dip'
						},
						left : '38%',
						textAlign : 'center'
					});

					// rowView[row_counter].add(num_of_friends);

					if (fq_items_json.Record[i].STATUS == 'COMPLETE' || fq_items_json.Record[i].STATUS == 'EXPIRE') {
						var expired_label = Ti.UI.createLabel({
							text : (fq_items_json.Record[i].STATUS == 'COMPLETE') ? 'Completed' : 'Time Expired',
							top : '35%',
							color : '#5afd9b',
							font : {
								fontSize : '12dip'
							},
							right : rowHeight / 3,
							textAlign : 'right'
						});
						rowView[row_counter].add(expired_label);
						var queststatusicon = Ti.UI.createImageView({
							image : (fq_items_json.Record[i].STATUS == 'COMPLETE') ? '/assets/check_icon.png' : '/assets/cross_icon.png',
							top : '30%',
							right : '5px',
							height : rowHeight / 3.5,
							width : rowHeight / 3.5
						});
						rowView[row_counter].add(queststatusicon);

					} else {
						// var questTime = Ti.UI.createLabel({
						// text : fq_items_json.Record[i].EXPIRED_TIME,
						// top : '0%',
						// color : '#5afd9b',
						// font : {
						// fontSize : '16dip'
						// },
						// top : '50%',
						// right : '5%',
						// textAlign : 'center'
						// });
						// rowView[row_counter].add(questTime);

						questStatusIcon[fq_items_json.Record[i].ASSIGN_QUEST_ID] = Ti.UI.createImageView({
							image : '/assets/alarm_clock_icon.png',
							top : '40%',
							right : '5px',
							height : rowHeight / 3.5,
							width : rowHeight / 3.5
						});
						rowView[row_counter].add(questStatusIcon[fq_items_json.Record[i].ASSIGN_QUEST_ID]);

						questTime[fq_items_json.Record[i].ASSIGN_QUEST_ID] = Ti.UI.createLabel({
							text : fq_items_json.Record[i].EXPIRED_TIME,
							complete : true,
							top : '45%',
							color : '#5afd9b',
							font : {
								fontSize : '12dip'
							},
							right : rowHeight / 3,
							textAlign : 'right'
						});

						rowView[row_counter].add(questTime[fq_items_json.Record[i].ASSIGN_QUEST_ID]);

						if (fq_items_json.Record[i].STATUS != 'COMPLETE' && fq_items_json.Record[i].STATUS != 'EXPIRE') {
							temp += fq_items_json.Record[i].ASSIGN_QUEST_ID + ":";
							var n = fq_items_json.Record[i].EXPIRED_TIME.split(":");
							my_timer[fq_items_json.Record[i].ASSIGN_QUEST_ID] = new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), fq_items_json.Record[i].ASSIGN_QUEST_ID, function(curr_time, instance_index) {
								questTime[instance_index].text = curr_time;
							}, function(instance_index) {
								questStatusIcon[instance_index].image = '/assets/cross_icon.png';
								questTime[instance_index].text = 'Time Expired';
								questStatusIcon[instance_index].animate(Ti.UI.createAnimation({
									top : rowHeight / 3.5,
									duration : 500
								}));
								questTime[instance_index].animate(Ti.UI.createAnimation({
									top : rowHeight / 3,
									duration : 500
								}));
							});
							my_timer[fq_items_json.Record[i].ASSIGN_QUEST_ID].start();
						}

						/************************************************************************************************************/

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
					//rowView[row_counter].add(rewards_lbl);

					// Create a Label.
					var num_of_quests_lbl = Ti.UI.createLabel({
						text : fq_items_json.Record[i].NUM_OF_QUESTS + ' Quest(s)',
						color : '#5afd9b',
						font : {
							fontSize : '12dip',
							fontWeight : 'bold'
						},
						bottom : '8%',
						left : '18%',
						textAlign : 'center'
					});
					rowView[row_counter].add(num_of_quests_lbl);

					tabledata.push(rowView[row_counter]);
				}//end of for loop

				fq_tableview = Ti.UI.createTableView({
					backgroundColor : 'transparent',
					separatorColor : 'transparent',
					data : tabledata,
					width : '100%',
					height : '100%',
					top : '0%'
				});
				//actInd.hide();
				var main_view = Ti.UI.createView({
					backgroundColor : 'transparent',
					width : '100%',
					height : '100%',
					top : '2%'
				});
				main_view.add(fq_tableview);
				main_view.add(empty_quest_label);
				empty_quest_label.hide();
				if (fq_items_json.Record.length == 0) {
					empty_quest_label.show();
				}
				callback(main_view);

			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/knp_get_friend_quests.php?uid=" + userinfo.Record[0].UID,

	});

}

module.exports = FreindQuestTab;
