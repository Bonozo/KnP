function MyQuest(userinfo, callback) {
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
	var updateTimerID = 0
	var status_counter = '';
	var update_counter = [];
	var row_counter = 0;
	var rowView = [];

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
						fn_end();
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

	var rowHeight = screenWidth * 0.20;
	var items_json = "";
	var items_length = 0;
	var temp = '';
	var expired_label;
	var rewards_lbl;
	var choosequests_btn;
	var num_of_quests_lbl;
	var tabledata = [];
	var tableview = Ti.UI.createTableView({
		backgroundColor : 'transparent',
		separatorColor : 'transparent',
		width : '100%',
		height : '100%',
		top : '2%'
	});
	var check_status = {};
	var my_timer = [];
	var questTime = [];
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				//alert(JSON.stringify(items_json.Record));
				for (var i = 0; i < items_json.Record.length; i++) {
					check_status[items_json.Record[i].ASSIGN_QUEST_ID] = items_json.Record[i].STATUS;
					rowView[row_counter] = Ti.UI.createTableViewRow({
						className : 'my_quests',
						index : i,
						height : rowHeight,
						opacity : (items_json.Record[i].STATUS == 'COMPLETE') ? '0' : '0.5'//,
					});
					rowView[row_counter].addEventListener('longclick', function(e) {
						Titanium.Media.vibrate();
						var RemoveQuest = require('/ui/common/MenuScreen/RemoveQuest');
						var removequest = new RemoveQuest(items_json.Record[e.index].ASSIGN_QUEST_ID, e.index, 'ASSIGNEE');
						removequest.open({
							modal : true
						});
					});

					var avatar_image = "";
					if (items_json.Record[i].GENDER == 'm') {
						var return_imageview = male_character_imageview;
					} else {
						var return_imageview = female_character_imageview;
					}

					return_imageview.width = '13%';
					return_imageview.top = '2px';
					return_imageview.left = '5px';

					//rowView[row_counter].add(return_imageview);

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
					rowView[row_counter].add(rowview_name);

					var rowview_level = Ti.UI.createLabel({
						text : 'LVL ' + items_json.Record[i].LEVEL,
						top : rowHeight * 35 / 100,
						font : {
							fontSize : '14dip'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView[row_counter].add(rowview_level);

					rowview_friends_icon.left = '30%';
					rowview_friends_icon.width = rowHeight / 3.5;
					rowview_friends_icon.height = rowHeight / 3.5;

					rowView[row_counter].add(rowview_friends_icon);

					var AvatarThumbnail = require('/ui/common/drawings/AvatarThumbnail');
					AvatarThumbnail({
						width : '13%',
						top : '2px',
						left : '5px'
					}, items_json.Record[i].USER_APPEARANCE, items_json.Record[i].GENDER, row_counter, function(avatar_imageview, callback_index) {
						rowView[callback_index].add(avatar_imageview);
					});

					// Create a Label.
					var num_of_friends = Ti.UI.createLabel({
						color : '#5afd9b',
						font : {
							fontSize : '14dip'
						},
						top : rowHeight * 35 / 100,
						left : '38%',
						textAlign : 'center',
						text : items_json.Record[i].NUM_OF_FRIENDS
					});
					rowView[row_counter].add(num_of_friends);

					if (items_json.Record[i].STATUS == 'EXPIRE') {//quest expired
						expired_label = Ti.UI.createLabel({
							text : 'TIME\nEXPIRED',
							color : '#A6AD2C',
							right : '5px',
							font : {
								fontSize : '16dip'
							},
							top : '5%',
							textAlign : 'right'
						});
						rowView[row_counter].add(expired_label);
					} else {//not expired
						choosequests_btn = Ti.UI.createButton({ color: '#761f56',
							title : 'CHOOSE QUEST',
							height : rowHeight / 3,
							top : rowHeight / 3,
							font : {
								fontSize : '12dip'
							},
							right : '5px',
							backgroundColor : '#C977A5',
							borderColor : '#A62C77',
							borderRadius : 5,
							borderWidth : 1,
							friend_uid : items_json.Record[i].ASSIGN_BY_UID,
							is_completed : items_json.Record[i].STATUS,
							friend_quest_info : items_json.Record[i]
						});
						choosequests_btn.addEventListener('click', function(e) {
							var FriendQuest = require('/ui/common/MenuScreen/FriendQuest');
							var friendquest = FriendQuest(userinfo, e.source.friend_uid, e.source.friend_quest_info, e.source.is_completed);
							friendquest.open();
						});
						rowView[row_counter].add(choosequests_btn);

						questTime[items_json.Record[i].ASSIGN_QUEST_ID] = Ti.UI.createLabel({
							text : (items_json.Record[i].STATUS != 'COMPLETE') ? 'TIME LEFT ' + items_json.Record[i].EXPIRED_TIME : 'COMPLETE',
							complete : true,
							top : '0%',
							color : '#5afd9b',
							font : {
								fontSize : '12dip'
							},
							right : '5px',
							textAlign : 'right'
						});

						rowView[row_counter].add(questTime[items_json.Record[i].ASSIGN_QUEST_ID]);

						if (items_json.Record[i].STATUS != 'COMPLETE' && items_json.Record[i].STATUS != 'EXPIRE') {
							temp += items_json.Record[i].ASSIGN_QUEST_ID + ":";
							var n = items_json.Record[i].EXPIRED_TIME.split(":");
							my_timer[items_json.Record[i].ASSIGN_QUEST_ID] = new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), items_json.Record[i].ASSIGN_QUEST_ID, function(curr_time, instance_index) {
								questTime[instance_index].text = 'TIME LEFT ' + curr_time;
							}, function() {
								//alert("The time is up!");
							});
							my_timer[items_json.Record[i].ASSIGN_QUEST_ID].start();
						}

					}
					/******************************************************/
					// Create a Label.
					rewards_lbl = Ti.UI.createLabel({
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
					num_of_quests_lbl = Ti.UI.createLabel({
						text : items_json.Record[i].NUM_OF_QUESTS + ' QUEST(S)',
						color : '#5afd9b',
						font : {
							fontSize : '12dip'
						},
						top : rowHeight / 3,
						right : '35%',
						textAlign : 'center'
					});
					rowView[row_counter].add(num_of_quests_lbl);

					tabledata.push(rowView[row_counter]);
					row_counter++;
				}//end of for loop
				tableview.data = tabledata;
				callback(tableview);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/knp_get_my_quests.php?uid=" + userinfo.Record[0].UID,

	});
	Ti.App.addEventListener('remove_my_quest', function(data) {
		tableview.deleteRow(data.index);
		//alert(data.message);
	});
	var index = 0;
	var quest_name = '';
	var rewards = '';
	var getProperty = function(propertyName) {
		return check_status[propertyName];
	};

	Ti.App.addEventListener('clear_quest_intervals', clearIntervals);

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

	var flag = false;
	updateTimerID = setInterval(function() {
		status_counter = '';
		for (var key in check_status) {
			if (check_status.hasOwnProperty(key)) {
				status_counter += key + ':' + check_status[key] + ',';
			}
		}
		var check_status_url = "http://bonozo.com:8080/knp/check_quest_status.php?uid=" + userinfo.Record[0].UID + "&assign_quest_id=" + status_counter;
		if (!flag) {
			//alert(check_status_url);
			flag = true;
		}
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				update_items_json = JSON.parse(this.responseText);
				//alert(JSON.stringify(update_items_json));
				if (update_items_json.Record != undefined) {
					if (update_items_json.Record.NEW.length > 0) {
						Ti.App.fireEvent('NEW_QUEST', {
							status : "NEW"
						});
						for (var i = 0; i < update_items_json.Record.NEW.length; i++) {
							check_status[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID] = update_items_json.Record.NEW[i].STATUS;
							rowView[row_counter] = Ti.UI.createTableViewRow({
								index : i,
								height : rowHeight,
								opacity : (items_json.Record[i].STATUS == 'COMPLETE') ? '0' : '0.5',
								className : 'my_quests'
							});

							var avatar_image = "";

							var rowview_name = Ti.UI.createLabel({
								text : update_items_json.Record.NEW[i].NAME,
								top : '2px',
								font : {
									fontSize : '16dip'
								},
								color : '#5afd9b',
								left : '18%',
								width : '45%'
							});
							rowView[row_counter].add(rowview_name);

							var rowview_level = Ti.UI.createLabel({
								text : 'LVL ' + update_items_json.Record.NEW[i].LEVEL,
								top : rowHeight * 35 / 100,
								font : {
									fontSize : '14dip'
								},
								color : '#5afd9b',
								left : '18%',
								width : '45%'
							});
							rowView[row_counter].add(rowview_level);

							rowview_friends_icon.left = '30%';
							rowview_friends_icon.width = rowHeight / 3.5;
							rowview_friends_icon.height = rowHeight / 3.5;

							rowView[row_counter].add(rowview_friends_icon);

							var AvatarThumbnail = require('/ui/common/drawings/AvatarThumbnail');
							AvatarThumbnail({
								width : '13%',
								top : '2px',
								left : '5px'
							}, update_items_json.Record.NEW[i].USER_APPEARANCE, update_items_json.Record.NEW[i].GENDER, row_counter, function(avatar_imageview, callback_index) {
								rowView[callback_index].add(avatar_imageview);
							});

							//Create a Label.
							var num_of_friends = Ti.UI.createLabel({
								color : '#5afd9b',
								font : {
									fontSize : '14dip'
								},
								top : rowHeight * 35 / 100,
								left : '38%',
								textAlign : 'center',
								text : update_items_json.Record.NEW[i].NUM_OF_FRIENDS
							});
							rowView[row_counter].add(num_of_friends);

							if (update_items_json.Record.NEW[i].STATUS == 'EXPIRE') {//quest expired
								expired_label = Ti.UI.createLabel({
									text : 'TIME\nEXPIRED',
									color : '#A6AD2C',
									right : '5px',
									font : {
										fontSize : '16dip'
									},
									top : '5%',
									textAlign : 'right'
								});
								rowView[row_counter].add(expired_label);
							} else {//not expired
								choosequests_btn = Ti.UI.createButton({ color: '#761f56',
									title : 'CHOOSE QUEST',
									height : rowHeight / 3,
									top : rowHeight / 3,
									font : {
										fontSize : '12dip'
									},
									right : '5px',
									backgroundColor : '#C977A5',
									borderColor : '#A62C77',
									borderRadius : 5,
									borderWidth : 1,
									friend_uid : update_items_json.Record.NEW[i].ASSIGN_BY_UID,
									is_completed : update_items_json.Record.NEW[i].STATUS,
									friend_quest_info : update_items_json.Record.NEW[i]
								});
								choosequests_btn.addEventListener('click', function(e) {
									var FriendQuest = require('/ui/common/MenuScreen/FriendQuest');
									var friendquest = FriendQuest(userinfo, e.source.friend_uid, e.source.friend_quest_info, e.source.is_completed);
									friendquest.open();
								});
								rowView[row_counter].add(choosequests_btn);

								questTime[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID] = Ti.UI.createLabel({
									text : (update_items_json.Record.NEW[i].STATUS != 'COMPLETE') ? 'TIME LEFT ' + update_items_json.Record.NEW[i].REMAINING_TIME : 'COMPLETE',
									complete : true,
									top : '0%',
									color : '#5afd9b',
									font : {
										fontSize : '12dip'
									},
									right : '5px',
									textAlign : 'right'
								});

								rowView[row_counter].add(questTime[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID]);
								if (update_items_json.Record.NEW[i].STATUS != 'COMPLETE') {
									var n = update_items_json.Record.NEW[i].REMAINING_TIME.split(":");
									my_timer[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID] = new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), update_items_json.Record.NEW[i].ASSIGN_QUEST_ID, function(curr_time, instance_index) {
										questTime[instance_index].text = 'TIME LEFT ' + curr_time;
									}, function() {
										//alert("The time is up!");
									});
									my_timer[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID].start();
								}

							}

							// Create a Label.
							rewards_lbl = Ti.UI.createLabel({
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
							num_of_quests_lbl = Ti.UI.createLabel({
								text : update_items_json.Record.NEW[i].NUM_OF_QUESTS + ' QUEST(S)',
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
							row_counter++;

						}//end of for loop
						tableview.data = tabledata;
						callback(tableview);

					}
					if (update_items_json.Record.UPDATE != '') {
						for (var key in update_items_json.Record.UPDATE) {
							if (update_items_json.Record.UPDATE.hasOwnProperty(key)) {
								if (check_status[key] == key)
									check_status[key] = update_items_json.Record.UPDATE[key];
								//alert(update_items_json.Record.UPDATE[key] + "::" + key);
								questTime[key].text = update_items_json.Record.UPDATE[key];
								my_timer[key].stop();
							}
						}
						var t = "";
						for (var key in update_counter) {
							if (update_counter.hasOwnProperty(key)) {
								t += key + ":" + update_counter[key] + "\n";
							}
						}
					}
				}

			},
			method : 'GET',
			contentType : 'text/xml',
			url : check_status_url
		});
	}, 6000);

}

module.exports = MyQuest;
