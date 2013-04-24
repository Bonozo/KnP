function FriendQuest(userinfo, friend_uid,friend_quest_info,is_completed) {
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
	function hideLoader() {
		images_counter++;
		if (images_counter >= 3) {
			actInd.hide();
		}
	}
	var my_timer = '';
	var tableview;
	var httpclientt = require('ui/iphone/Functions/function');
	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;

	var view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundImage : '/assets/inventoryBackground.png'

	});
	self.add(view);
var countDown =  function(h, m , s, fn_tick, fn_end  ) {
    return {
        total_sec : h * 60 * 60 + m * 60 + s,
        timer:this.timer,
        set: function(h,m,s) {
                this.total_sec = parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
                this.time = {
                    h : h,
                    m : m,
                    s : s
                };
            return this;
        },
        start: function() {
            var self = this;
            this.timer = setInterval( function() {
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
                }
                else {
                    self.stop();
                    fn_end();
                }
                }, 1000 );
            return this;
        },
        stop: function() {
            clearInterval(this.timer)
                this.time = {
                    h : 0,
                    m : 0,
                    s : 0
                };
            this.total_sec = 0;
            return this;
        }
    }
}
	
	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height:'6.4%',
		width : '100%',
		bottom : '94.6%'
	});
	view.add(top_imageview);

	var friend_name = Titanium.UI.createLabel({
		text : '',
		top : '0',
		height : '3.1%',
		left : '5%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(friend_name);

	var screen_name = Titanium.UI.createLabel({
		text : 'QUESTS',
		top : '0',
		height : '3.1%',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(screen_name);

    var return_imageview = Ti.UI.createImageView({
        image : '/assets/iconReturn.png',
        height : '8%',
        width : '11.6%',
        top : '1%',
        right : '3%'
    });
    view.add(return_imageview);
	return_imageview.addEventListener('click', function(e) {
	    if(!is_completed)
	       my_timer.stop();
	    //clearInterval(my_timer);
	   // my_timer= null;
		self.close();
	});




	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var rowview_height = ScreenHeight * (12 / 100);

	//http://therealmattharmon.com/knp/get_all_assigned_quests.php?assign_by=10000002&assign_to=10000001

	function updateQuestsList() {
		httpclientt.requestServer({

			success : function(e) {
				var json = JSON.parse(this.responseText);
				for (var i = 0; i < json.Record.length; i++) {
					var rowView = Titanium.UI.createTableViewRow({
						height : rowview_height + 'px',
						backgroundImage : '/assets/rowview_bg.png',
					});
					var rowImg = Ti.UI.createImageView({
						image : '/assets/' + json.Record[i].QUEST_NAME + '.png',
						height : rowview_height / (1.5) + 'px',
						left : rowview_height / 4
					});
					rowView.add(rowImg);
					if (json.Record[i].STATUS == 'COMPLETE') {
						var row_label = Ti.UI.createLabel({
							text : 'COMPLETED',
							color : '#5AFD9B',
							font : {
								fontSize : '16dip'
							},
							left : rowview_height + (rowview_height / 2) + 'px'
						});
						rowView.add(row_label);
					} else if (json.Record[i].STATUS == 'EXPIRED') {
						var row_label = Ti.UI.createLabel({
							text : 'EXPIRED',
							color : '#5AFD9B',
							font : {
								fontSize : '16dip'
							},
							left : rowview_height + (rowview_height / 2) + 'px'
						});
						rowView.add(row_label);
					} else {
						var StartQuestButton = Ti.UI.createButton({
							backgroundImage : '/assets/button_small_UP.png',
							left : rowview_height + (rowview_height / 2) + 'px',
							width : rowview_height * 2,
							height : rowview_height / 2,
							title : 'Start Quest',
							font : {
								fontSize : '14dip'
							},
							quest_image : json.Record[i].QUEST_IMAGE,
							assign_quest_id : json.Record[i].ASSIGN_QUEST_ID,
							quest_id : json.Record[i].QUEST_ID
							
							
						});
						StartQuestButton.addEventListener('click', function(e) {
//							alert( e.source.quest_id+":"+ userinfo.Record[0].UID +":"+friend_uid+":"+friend_quest_info.ASSIGN_QUEST_ID);

							var PlayGame = require('ui/iphone/MenuScreen/PlayGame');
							var playgame = new PlayGame(e.source.quest_image,'INCOMLPETE',  e.source.quest_id,userinfo,friend_uid,friend_quest_info);
							playgame.open();
						});
						rowView.add(StartQuestButton);
					}

					tabledata.push(rowView);
				}

				tableview = Ti.UI.createTableView({
					separatorColor : 'transparent',
                        backgroundColor : 'transparent',
					data : tabledata,
					width : '70%',
					height : '40%',
					left : '0',
					top : '33%'
				});
				view.add(tableview);
			},
			onerror : function(e) {
				Ti.API.debug("STATUS: " + this.status);
				Ti.API.debug("TEXT: " + this.responseText);
				Ti.API.debug("ERROR: " + e.error);
				Ti.API.debug("URL: " + "http://therealmattharmon.com/knp/get_all_assigned_quests.php?assign_by=10000002&assign_to=10000001");
				alert('There was an error retrieving the remote data. Try again.');
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://therealmattharmon.com/knp/knp_get_friend_quest_games.php?assign_quest_id=" + friend_quest_info.ASSIGN_QUEST_ID
			//url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + 10000007 + "",

		});
	}

	updateQuestsList();

	Ti.App.addEventListener('game_played', function(e) {
		view.remove(tableview);
		tabledata = [];
		tableview = null;
		updateQuestsList();
	});

	httpclientt.requestServer({

		success : function(e) {
			var friend_json = JSON.parse(this.responseText);
			friendsstatus_label = friend_json.Record[0].STATUS_MESSAGE+' \N LVL 1';
			var friendsname_label = Titanium.UI.createLabel({
				text : '' + friend_json.Record[0].NAME,
				top : '5.5%',
				left : '4%',
				textAlign : 'left',
				color : '#ffffff',
				font : {
					fontSize : '16dip'
				}
			});
			view.add(friendsname_label);
			var character_imageview = Titanium.UI.createImageView({
				top : '12%',
				left : '60%',
				image : (friend_json.Record[0].GENDER == 'm')?'/assets/K_fullbody_bad.png':'/assets/hdpi_female_character.png',
				height : '75%',
				width :'45%',
				zIndex : 500
			});
			view.add(character_imageview);
			character_imageview.addEventListener('load', function(e) {
				hideLoader();
			});

		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			Ti.API.debug("URL: " + "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + friend_uid);
			alert('There was an error retrieving the remote data. Try again.');
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + friend_uid
		//url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + 10000007 + "",

	});

	var friendsstatus_label = Titanium.UI.createLabel({
		top : '10.1%',
		left : '4%',
		textAlign : 'left',
		color : '#5AFD9B',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(friendsstatus_label);

/*
	var viewFriends_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		top : '19.8%',
		left : '10%',
		width : '21.5%',
		height : '5%',
		title : 'View Freinds',
		font : {
			fontSize : '10dip'
		}
	});
	viewFriends_button.addEventListener('click', function(e) {
		self.close();
	});
	view.add(viewFriends_button);
*/


	var quests_status = Titanium.UI.createLabel({
		color : '#5afd9b',
		top : '25%',
		left : '2%'
	});
	view.add(quests_status);

	var get_quest_url = "http://therealmattharmon.com/knp/knp_get_friend_quest_games.php?assign_quest_id=" + friend_quest_info.ASSIGN_QUEST_ID;
	var httpclientt = require('ui/iphone/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			Ti.App.fireEvent('update_footer', {
				clicked_item : 'FreindQuest'
			});
			Ti.App.fireEvent('update_inv_grid', {
				clicked_item : 'FreindQuest'
			});

			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				if (items_json.Record.length >0) {
                    if(is_completed == 'COMPLETE'){
                        quests_status.text = 'QUESTS COMPLETED!'
                        
                    }
                    else{
                        var n = items_json.Record[0].EXPIRED_TIME.split(":");
                        my_timer = new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]),
                            function() {
                                quests_status.text = 'TIME REMAINING: '+my_timer.time.h+":"+my_timer.time.m+":"+my_timer.time.s;
                            },
                            function() {
                               // alert("The time is up!");
                            }
                        );
                        my_timer.start();                  
                    }

					actInd.hide();
				}
			}

		},
		method : 'GET',
		contentType : 'text/xml',
		url : get_quest_url
	});
 
	var isFriends = function(callback){
			var httpclientt = require('ui/iphone/Functions/function');
			_url = "http://therealmattharmon.com/knp/is_friend.php?uid1="+userinfo.Record[0].UID+"&uid2="+friend_uid; 
			httpclientt.requestServer({
				success : function(e) {
					items_json = JSON.parse(this.responseText);
					if (items_json.Record != undefined) {
						callback(items_json.Record);
					}
					Ti.App.fireEvent('update_xp', {
						clicked_item : 'StatusScreen'
					});
				},
				method : 'GET',
				contentType : 'text/xml',
				url : _url,

			});
	}
	isFriends(function(bool){
		var messages_button = Ti.UI.createButton({
			backgroundImage : '/assets/button_small_UP.png',
			top : '19.8%',
			left : '51.7%',
			width : '21.5%',
			height : '5%',
			visible : bool,
			title : 'Messages',
			zIndex : 510,
			font : {
				fontSize : '10dip'
			}
		});
		view.add(messages_button);
		messages_button.addEventListener('click', function(e) {
			var MessageScreen = require('ui/iphone/MenuScreen/MessageScreen');
			var messageScreen = new MessageScreen(userinfo, friend_uid);
			messageScreen.open({
				modal : true
			});
		});
	});


	var Message_imageview = Titanium.UI.createImageView({
		image : '/assets/iconReturn.png',
		height : '5.2%',
		top : '19.8%',
		left : '41.3%'
	});
	//view.add(Message_imageview);

	var images_counter = 0;

	var httpclientt = require('ui/iphone/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			var userinfojson = JSON.parse(this.responseText);

			var Footer = require('ui/iphone/menus/Footer');
			var footer = new Footer(userinfojson);
			view.add(footer);

			friend_name.text = userinfojson.Record[0].NAME;

			hideLoader();
		},
		method : 'GET', 
		contentType : 'text/xml',
		url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + userinfo.Record[0].UID + "",
	});


	return_imageview.addEventListener('load', function(e) {
		hideLoader();
	});
	Message_imageview.addEventListener('load', function(e) {
		hideLoader();
	});
    view.addEventListener('android:back', function(e) {
        my_timer.stop();
        //clearInterval(my_timer);
          // my_timer= null;
        
        activity.finish();
    });



	return self;
};
module.exports = FriendQuest;