function MyQuest(userinfo, callback) {
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var male_character_imageview = Titanium.UI.createImageView({
		image : '/assets/male_icon.png'
	});
	var female_character_imageview = Titanium.UI.createImageView({
		image : '/assets/female_icon.png'
	});
	var updateTimerID = 0;
	var status_counter = '';
	var update_counter = [];
	var row_counter = 0;
	var rowView = [];

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

	var rowHeight = screenWidth * 0.20;
	var items_json = "";
	var items_length = 0;
	var temp = '';
	var expired_label;
	var rewards_lbl;
	var num_of_quests_lbl;
	var tabledata = [];

	var no_quest = true;
	var tableview = Ti.UI.createTableView({
		backgroundColor : 'transparent',
		separatorColor : 'transparent',
		width : '100%',
		height : '100%',
		top : 0
	});
	var check_status = {};
	var my_timer = [];
	var questTime = [];
	var questStatusIcon = [];
	var choosequests_btns = [];
	var avatar_images = [];
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				//alert(JSON.stringify(items_json.Record));
				var bg_image = "";
				for (var i = 0; i < items_json.Record.length; i++) {
					no_quest = false;
					bg_image = '/assets/freind_list' + ((items_json.Record[i].GENDER == 'f') ? '_female' : '_male') + '.png';
					check_status[items_json.Record[i].ASSIGN_QUEST_ID] = items_json.Record[i].STATUS;
					rowView[row_counter] = Ti.UI.createTableViewRow({
						className : 'my_quests',
						index : i,
						height : rowHeight,
						backgroundImage : '/assets/quest_row_bg.png',
						// opacity : (items_json.Record[i].STATUS == 'COMPLETE') ? '0' : '0.5'//,
					});
					rowView[row_counter].addEventListener('longpress', function(e) {
						Titanium.Media.vibrate();
						var RemoveQuest = require('/ui/common/MenuScreen/RemoveQuest');
						var removequest = new RemoveQuest(items_json.Record[e.index].ASSIGN_QUEST_ID, e.index, 'ASSIGNEE');
						removequest.open({
							modal : true
						});
					});

					var rowview_name = Ti.UI.createLabel({
						text : items_json.Record[i].NAME,
						top : '10%',
						font : {
							fontSize : '18dip',
							fontWeight : 'bold'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView[row_counter].add(rowview_name);

					var rowview_level = Ti.UI.createLabel({
						text : 'LVL ' + items_json.Record[i].LEVEL,
						top : '38%',
						font : {
							fontSize : '12dip'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView[row_counter].add(rowview_level);

					AvatarThumbnail({
						width : '13%',
						top : '2px',
						left : '5px'
					}, items_json.Record[i].USER_APPEARANCE, items_json.Record[i].GENDER, row_counter, function(avatar_imageview, callback_index) {
						avatar_images[callback_index] = avatar_imageview;
						rowView[callback_index].add(avatar_images[callback_index]);

						//rowView[callback_index].add(avatar_imageview);
					});

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
					//rowView[row_counter].add(num_of_friends);

					if (items_json.Record[i].STATUS == 'EXPIRE' || items_json.Record[i].STATUS == 'COMPLETE') {//quest expired or completed
						expired_label = Ti.UI.createLabel({
							text : (items_json.Record[i].STATUS == 'COMPLETE') ? 'Completed' : 'Time Expired',
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
							image : (items_json.Record[i].STATUS == 'COMPLETE') ? '/assets/check_icon.png' : '/assets/cross_icon.png',
							top : '30%',
							right : '5px',
							height : rowHeight / 3.5,
							width : rowHeight / 3.5
						});
						rowView[row_counter].add(queststatusicon);

					} else {//active
						choosequests_btns[items_json.Record[i].ASSIGN_QUEST_ID] = Ti.UI.createButton({
							color : '#761f56',
							title : 'CHOOSE QUEST',
							height : rowHeight / 3,
							top : '50%',
							width : rowHeight * 1.75,
							font : {
								fontSize : '12dip'
							},
							opacity : 100,
							right : '5px',
							backgroundColor : '#C977A5',
							borderColor : '#A62C77',
							borderRadius : 5,
							borderWidth : 1,
							friend_uid : items_json.Record[i].ASSIGN_BY_UID,
							is_completed : items_json.Record[i].STATUS,
							friend_quest_info : items_json.Record[i]
						});
						choosequests_btns[items_json.Record[i].ASSIGN_QUEST_ID].addEventListener('click', function(e) {
							var FriendQuest = require('/ui/common/MenuScreen/FriendQuest');
							var friendquest = FriendQuest(userinfo, e.source.friend_uid, e.source.friend_quest_info, e.source.is_completed);
							friendquest.open();
						});
						rowView[row_counter].add(choosequests_btns[items_json.Record[i].ASSIGN_QUEST_ID]);

						questStatusIcon[items_json.Record[i].ASSIGN_QUEST_ID] = Ti.UI.createImageView({
							image : '/assets/alarm_clock_icon.png',
							top : '10%',
							right : '5px',
							height : rowHeight / 3.5,
							width : rowHeight / 3.5
						});
						rowView[row_counter].add(questStatusIcon[items_json.Record[i].ASSIGN_QUEST_ID]);

						questTime[items_json.Record[i].ASSIGN_QUEST_ID] = Ti.UI.createLabel({
							text : items_json.Record[i].EXPIRED_TIME,
							complete : true,
							top : '12%',
							color : '#5afd9b',
							font : {
								fontSize : '12dip'
							},
							right : rowHeight / 3,
							textAlign : 'right'
						});

						rowView[row_counter].add(questTime[items_json.Record[i].ASSIGN_QUEST_ID]);

						if (items_json.Record[i].STATUS != 'COMPLETE' && items_json.Record[i].STATUS != 'EXPIRE') {
							temp += items_json.Record[i].ASSIGN_QUEST_ID + ":";
							var n = items_json.Record[i].EXPIRED_TIME.split(":");
							my_timer[items_json.Record[i].ASSIGN_QUEST_ID] = new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), items_json.Record[i].ASSIGN_QUEST_ID, function(curr_time, instance_index) {
								questTime[instance_index].text = curr_time;
							}, function(instance_index) {
								questStatusIcon[instance_index].image = '/assets/cross_icon.png';
								questTime[instance_index].text = 'Time Expired';
								choosequests_btns[instance_index].animate(Ti.UI.createAnimation({
									opacity : 0,
									duration : 500
								}), function() {
									questStatusIcon[instance_index].animate(Ti.UI.createAnimation({
										top : rowHeight / 3.5,
										duration : 500
									}));
									questTime[instance_index].animate(Ti.UI.createAnimation({
										top : rowHeight / 3,
										duration : 500
									}));
								});
							});
							my_timer[items_json.Record[i].ASSIGN_QUEST_ID].start();
						}

					}
					/******************************************************/
					// Create a Label.
					rewards_lbl = Ti.UI.createLabel({
						text : 'Rewards:',
						color : '#5afd9b',
						font : {
							fontSize : '12dip'
						},
						bottom : rowHeight * 10 / 100,
						right : '35%',
						textAlign : 'center'
					});

					// Add to the parent view.
					// rowView[row_counter].add(rewards_lbl);

					// Create a Label.
					num_of_quests_lbl = Ti.UI.createLabel({
						text : items_json.Record[i].NUM_OF_QUESTS + ' Quest(s)',
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
					row_counter++;
				}//end of for loop
				tableview.data = tabledata;

				var main_view = Ti.UI.createView({
					backgroundColor : 'transparent',
					separatorColor : 'transparent',
					width : '100%',
					height : '100%',
					top : '2%'
				});
				main_view.add(tableview);
				var empty_quest_label = Ti.UI.createLabel({
					text : 'You have no Quests!',
					font : {
						fontWeight : 'bold',
						fontSize : '18dip'
					},
					color : '#b3fad0'
				});
				main_view.add(empty_quest_label);
				
				empty_quest_label.hide();

				if (no_quest) {
					empty_quest_label.show();
				}
				callback(main_view);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/knp_get_my_quests.php?uid=" + userinfo.Record[0].UID
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
		Ti.API.info(check_status_url);
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				update_items_json = JSON.parse(this.responseText);
				Ti.API.info(JSON.stringify(update_items_json));
				//alert(JSON.stringify(update_items_json));
				if (update_items_json.Record != undefined) {
					if (update_items_json.Record.NEW.length > 0) {
						if (no_quest) {
							empty_quest_label.hide();
						}
						Ti.App.fireEvent('NEW_QUEST', {
							status : "NEW"
						});
						var bg_image = "";
						for (var i = 0; i < update_items_json.Record.NEW.length; i++) {
							bg_image = '/assets/freind_list' + ((items_json.Record[i].GENDER == 'f') ? '_female' : '_male') + '.png';
							check_status[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID] = update_items_json.Record.NEW[i].STATUS;
							rowView[row_counter] = Ti.UI.createTableViewRow({
								index : i,
								height : rowHeight,
								backgroundImage : '/assets/quest_row_bg.png',
								//opacity : (update_items_json.Record.NEW[i].STATUS == 'COMPLETE') ? '0' : '0.5',
								className : 'my_quests'
							});

							var avatar_image = "";

							var rowview_name = Ti.UI.createLabel({
								text : update_items_json.Record.NEW[i].NAME,
								top : '10%',
								font : {
									fontSize : '18dip',
									fontWeight : 'bold'

								},
								color : '#5afd9b',
								left : '18%',
								width : '45%'
							});
							rowView[row_counter].add(rowview_name);

							var rowview_level = Ti.UI.createLabel({
								text : 'LVL ' + update_items_json.Record.NEW[i].LEVEL,
								top : '38%',
								font : {
									fontSize : '12dip'
								},
								color : '#5afd9b',
								left : '18%',
								width : '45%'
							});
							rowView[row_counter].add(rowview_level);

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
							//rowView[row_counter].add(num_of_friends);

							if (update_items_json.Record.NEW[i].STATUS == 'EXPIRE') {//quest expired
								expired_label = Ti.UI.createLabel({
									text : 'Time Expired',
									top : '35%',
									color : '#5afd9b',
									font : {
										fontSize : '12dip'
									},
									right : rowHeight / 3,

									// color : '#5afd9b',
									// right : '5px',
									// font : {
									// fontSize : '16dip'
									// },
									// top : '5%',
									textAlign : 'right'
								});
								rowView[row_counter].add(expired_label);
								var queststatusicon = Ti.UI.createImageView({
									image : '/assets/cross_icon.png',
									top : '30%',
									right : '5px',
									height : rowHeight / 3.5,
									width : rowHeight / 3.5
								});
								rowView[row_counter].add(queststatusicon);

								// expired_label = Ti.UI.createLabel({
								// text : 'TIME\nEXPIRED',
								// color : '#A6AD2C',
								// right : '5px',
								// font : {
								// fontSize : '16dip'
								// },
								// top : '5%',
								// textAlign : 'right'
								// });
								// rowView[row_counter].add(expired_label);
							} else {//not expired
								choosequests_btns[items_json.Record[i].ASSIGN_QUEST_ID] = Ti.UI.createButton({
									color : '#761f56',
									title : 'CHOOSE QUEST',
									width : rowHeight * 1.75,
									height : rowHeight / 3,
									top : '50%',
									font : {
										fontSize : '12dip',

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
								choosequests_btns[items_json.Record[i].ASSIGN_QUEST_ID].addEventListener('click', function(e) {
									var FriendQuest = require('/ui/common/MenuScreen/FriendQuest');
									var friendquest = FriendQuest(userinfo, e.source.friend_uid, e.source.friend_quest_info, e.source.is_completed);
									friendquest.open();
								});
								rowView[row_counter].add(choosequests_btns[items_json.Record[i].ASSIGN_QUEST_ID]);

								questStatusIcon[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID] = Ti.UI.createImageView({
									image : (items_json.Record[i].STATUS != 'COMPLETE') ? '/assets/alarm_clock_icon.png' : '/assets/check_icon.png',
									top : '10%',
									right : '5px',
									height : rowHeight / 3.5,
									width : rowHeight / 3.5
								});
								rowView[row_counter].add(questStatusIcon[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID]);

								questTime[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID] = Ti.UI.createLabel({
									text : (update_items_json.Record.NEW[i].STATUS != 'COMPLETE') ? update_items_json.Record.NEW[i].REMAINING_TIME : '', // (items_json.Record[i].STATUS != 'COMPLETE') ? items_json.Record[i].EXPIRED_TIME : '',
									complete : true,
									top : '12%',
									color : '#5afd9b',
									font : {
										fontSize : '12dip'
									},
									right : rowHeight / 3,
									textAlign : 'right'
								});
								rowView[row_counter].add(questTime[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID]);

								// questTime[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID] = Ti.UI.createLabel({
								// text : (update_items_json.Record.NEW[i].STATUS != 'COMPLETE') ? 'TIME LEFT ' + update_items_json.Record.NEW[i].REMAINING_TIME : 'COMPLETE',
								// complete : true,
								// top : '0%',
								// color : '#5afd9b',
								// font : {
								// fontSize : '12dip'
								// },
								// right : '5px',
								// textAlign : 'right'
								// });
								//
								// rowView[row_counter].add(questTime[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID]);
								if (update_items_json.Record.NEW[i].STATUS != 'COMPLETE') {
									var n = update_items_json.Record.NEW[i].REMAINING_TIME.split(":");
									my_timer[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID] = new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), update_items_json.Record.NEW[i].ASSIGN_QUEST_ID, function(curr_time, instance_index) {
										questTime[instance_index].text = curr_time;
									}, function(instance_index) {
										questStatusIcon[instance_index].image = '/assets/cross_icon.png';
										questTime[instance_index].text = 'Time Expired';
										choosequests_btns[instance_index].animate(Ti.UI.createAnimation({
											opacity : 0,
											duration : 500
										}), function() {
											questStatusIcon[instance_index].animate(Ti.UI.createAnimation({
												top : rowHeight / 3.5,
												duration : 500
											}));
											questTime[instance_index].animate(Ti.UI.createAnimation({
												top : rowHeight / 3,
												duration : 500
											}));
										});

										//alert("The time is up!");
									});
									my_timer[update_items_json.Record.NEW[i].ASSIGN_QUEST_ID].start();
								}

							}

							// Create a Label.
							rewards_lbl = Ti.UI.createLabel({
								text : 'Rewards:',
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
							num_of_quests_lbl = Ti.UI.createLabel({
								text : update_items_json.Record.NEW[i].NUM_OF_QUESTS + ' Quest(s)',
								color : '#5afd9b',
								font : {
									fontSize : '12dip',
									fontWeight : 'bold'
								},
								bottom : '8%',
								left : '18%',
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
								questStatusIcon[key].image = (update_items_json.Record.UPDATE[key] == 'COMPLETE') ? '/assets/check_icon.png' : '/assets/cross_icon.png';
								questTime[key].text = (update_items_json.Record.UPDATE[key] == 'COMPLETE') ? 'Completed' : 'Expired';
								choosequests_btns[key].animate(Ti.UI.createAnimation({
									opacity : 0,
									duration : 500
								}), function() {
									questStatusIcon[key].animate(Ti.UI.createAnimation({
										top : rowHeight / 3.5,
										duration : 500
									}));
									questTime[key].animate(Ti.UI.createAnimation({
										top : rowHeight / 3,
										duration : 500
									}));
								});

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
