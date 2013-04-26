function FreindInfo(userinfo, friendinfo) {

	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();

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
	
	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height:'6.4%',
		width : '100%',
		bottom : '94.6%'
	});
	view.add(top_imageview);

	var name_label = Titanium.UI.createLabel({
		text : userinfo.Record[0].NAME,
		top : '0',
		height : '3.1%',
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '12dip'
		}
	});
	view.add(name_label);

	var menu_label = Titanium.UI.createLabel({
		text : friendinfo.NAME,
		top : '0',
		height : '3.1%',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(menu_label);

	var return_imageview = Titanium.UI.createImageView({
		image : '/assets/iconReturn.png',
		//height:'12.4%',
		width : '11.6%',
		bottom : '88%',
		right : '3%'
	});
	view.add(return_imageview);
	
	return_imageview.addEventListener('click', function(e) {
		self.close();
	});

    var new_message_imageview;
	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var rowViewHeight = screenWidth * 0.119;

	var Infoview = Ti.UI.createView({
		width : '55%',
		top : '27%',
		left : '0%',
		height : rowViewHeight,
		backgroundColor : '#53e990'

	});

	var imageview = Titanium.UI.createImageView({
		backgroundImage : '/assets/rowview_bg.png',
		height : '96%',
		width : '100%'
	});
//	Infoview.add(imageview);

	var icon_image = Titanium.UI.createImageView({
		backgroundImage : '/assets/iconSonnet.png',
		height : '96%',
		left : '0%',
		width : '20%'
	});
//	Infoview.add(icon_image);

	var name_label = Titanium.UI.createLabel({
		text : 'Sonnet \n (TAP To CHOOSE)',
		textAlign : 'center',		
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
//	Infoview.add(name_label);
//	view.add(Infoview);


	var giftTradeView = Ti.UI.createView({
		width : '55%',
		top : '37%',
		left : '0%',
		height : rowViewHeight,
		backgroundColor : '#53e990'

	});

	var imageview = Titanium.UI.createImageView({
		backgroundImage : '/assets/rowview_bg.png',
		height : '96%',
		width : '100%'
	});
	giftTradeView.add(imageview);
	var icon_image_gift = Titanium.UI.createImageView({
		backgroundImage : '/assets/iconGift.png',
		height : '96%',
		left : '0%',
		width : '20%'
	});
	giftTradeView.add(icon_image_gift);

	var name_label = Titanium.UI.createLabel({
		text : 'GIFT OR TRADE \n (TAP To CHOOSE)',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});
	name_label.addEventListener('click', function(e) {
	var GiftFromFreindInfo = require('ui/iphone/MenuScreen/GiftFromMessage');
		var GiftFromFreind = new GiftFromFreindInfo(userinfo,friendinfo.UID);
		GiftFromFreind.open({
			modal : true
		});
	});
	giftTradeView.add(name_label);
	view.add(giftTradeView);

	var QuestView = Ti.UI.createView({
		width : '55%',
		top : '47%',
		left : '0%',
		height : rowViewHeight,
		backgroundColor : '#53e990'

	});

	var imageview = Titanium.UI.createImageView({
		backgroundImage : '/assets/rowview_bg.png',
		height : '96%',
		width : '100%'
	});
	
	QuestView.add(imageview);
	var icon_image_quest = Titanium.UI.createImageView({
		backgroundImage : '/assets/iconThickBook.png',
		height : '96%',
		left : '0%',
		width : '20%'
	});
	QuestView.add(icon_image_quest);


	var assign_quest_label = Titanium.UI.createLabel({
		text : 'ASSIGN QUESTS \n (TAP To CHOOSE)',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}

	});

	assign_quest_label.addEventListener('click', function(e) {
		var FriendQuest = require('ui/iphone/MenuScreen/FreindAssignQuest');
		var friendquest = FriendQuest(userinfo, friendinfo.UID);
		friendquest.open();
		
	});
		QuestView.add(assign_quest_label);
/*
	var choosequests_btn = Ti.UI.createButton({
		title : 'CHOOSE QUEST',
		font : {
			fontSize : '12dip'
		},
		backgroundColor : '#C977A5',
		borderColor : '#A62C77',
		borderRadius : 5,
		borderWidth : 1,
		friend_uid : friend_uid
	});

	choosequests_btn.addEventListener('click', function(e) {
		var FriendQuest = require('/ui/common/MenuScreen/FreindAssignQuest');
		var friendquest = FriendQuest(userinfo, friend_uid);
		friendquest.open();
	});
	QuestView.add(choosequests_btn);
*/
	view.add(QuestView);
	
    var friend_status_lbl;
	var gender;
	var httpclientt = require('ui/iphone/Functions/function');
	httpclientt.requestServer({

		success : function(e) {
			var friend_json = JSON.parse(this.responseText);
			friend_status_lbl = friend_json.Record[0].STATUS_MESSAGE+' \n LVL '+friend_json.Record[0].LEVEL;
            var friendsstatus_label = Titanium.UI.createLabel({
                text : friend_status_lbl,
                top : '10.1%',
                left : '4%',
                textAlign : 'left',
                color : '#5afd9b',
                font : {
                    fontSize : '10dip'
                }
        
            });
            view.add(friendsstatus_label);
			
			gender = friend_json.Record[0].GENDER;
				if(gender == 'm'){
					var male_character_imageview = Titanium.UI.createImageView({
						top : '12%',
						right : '0%',
						image : '/assets/K_fullbody_bad.png',
<<<<<<< HEAD
						width : '48%',
=======
>>>>>>> e105b5ec68096981140025cd6ae2dc1c7598964e
						height : '79.5%',
						zIndex : 500
					});
					view.add(male_character_imageview);
				}
				else if(gender == 'f'){
					var female_character_imageview = Titanium.UI.createImageView({
						top : '12%',
						right : '0%',
						image : '/assets/hdpi_female_character.png',
<<<<<<< HEAD
						height : '79.5%',
=======
						height : '75%',
>>>>>>> e105b5ec68096981140025cd6ae2dc1c7598964e
						width : '51%',
						zIndex : 500
					});
					view.add(female_character_imageview);
				}
                var messages_button = Ti.UI.createButton({
                    backgroundImage : '/assets/button_small_UP.png',
                    top : '19.8%',
                    left : '51.7%',
                    width : '21.5%',
                    height : '5%',
                    title : 'Messages',
                    zIndex : 510,
                    font : {
                        fontSize : '10dip'
                    }
                });
                view.add(messages_button);
                if(friendinfo.MESSAGE == 'NEW_MESSAGE'){
                    new_message_imageview = Titanium.UI.createImageView({
                        top : '18.8%',
                        left : '49.5%',
                        image : '/assets/message_alert.png',
                        height : '4%',
                        width : '6%',
                        zIndex : 600
                    });
                    view.add(new_message_imageview);
                    
                }
                messages_button.addEventListener('click', function(e) {
                    var MessageScreen = require('ui/iphone/MenuScreen/MessageScreen');
                    var messageScreen = new MessageScreen(userinfo, friendinfo.UID, gender,friendinfo.NAME);
                    messageScreen.open({
                        modal : true
                    });
                });

			var friendsname_label = Titanium.UI.createLabel({
				text : friend_json.Record[0].NAME,
				top : '5.5%',
				left : '4%',
				textAlign : 'left',
				color : '#ffffff',
				font : {
					fontSize : '16dip'
				}
			});
			view.add(friendsname_label);
			var Footer = require('ui/iphone/menus/Footer');
			var footer = new Footer(friend_json);
			view.add(footer);

				actInd.hide();
		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			Ti.API.debug("URL: " + "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + friendinfo.UID);
			alert('There was an error retrieving the remote data. Try again.');
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + friendinfo.UID
		//url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + 10000007 + "",

	});

	var friendsstatus_label = Titanium.UI.createLabel({
	    text : friend_status_lbl,
		top : '10.1%',
		left : '4%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(friendsstatus_label);

	var coin_count_label = Titanium.UI.createLabel({
		text : '1000',
		top : '15%',

		left : '10%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	// view.add(coin_count_label);
	var minicoin_imageview = Titanium.UI.createImageView({
		image : '/assets/iconGoldMini.png',
		width : '7%',
		top : '15%',
		left : '3%'
	});
	// view.add(minicoin_imageview);
	var onlineStatus_label = Titanium.UI.createLabel({
		text : 'Online',
		top : '17.4%',

		left : '4%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	//view.add(onlineStatus_label);

	var unFriends_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		top : '19.8%',
		left : '10%',
		width : '21.5%',
		height : '5%',
		title : 'Unfriend',
		font : {
			fontSize : '10dip'
		}
	});
	unFriends_button.addEventListener('click', function(e) {
	    
        var ConfirmationAlert = Titanium.UI.createAlertDialog({
            title : 'Do you want to Unfriend '+friendinfo.NAME +'?',
            message : 'Are you Sure?',
            buttonNames : ['Yes', 'No'],
            cancel : 1
        });
        ConfirmationAlert.show();
        ConfirmationAlert.addEventListener('click', function(e) {
            Titanium.API.info('e = ' + JSON.stringify(e));

            //Clicked cancel, first check is for iphone, second for android
            if (e.cancel === e.index || e.cancel === true) {
                return;
            }
            switch (e.index) {
                case 0:
                    actInd.show();
                    var unfriend_url = "http://therealmattharmon.com/knp/unfriend_friend.php?uid=" + userinfo.Record[0].UID+'&friend_uid='+friendinfo.UID;
                    var httpclientt = require('ui/iphone/Functions/function');
                    httpclientt.requestServer({
                        success : function(e) {
                            items_json = JSON.parse(this.responseText);
                            if (items_json.Record != undefined) {
                                if (items_json.Record[0].Message != '') {
                                    alert(items_json.Record[0].Message);
                                    actInd.hide();
                                    self.close();
                                }
                            }

                        },
                        method : 'GET',
                        contentType : 'text/xml',
                        url : unfriend_url
                    });

                    break;
                //This will never be reached, if you specified cancel for index 1
                case 1:
                    // alert('Clicked button 1 (NO)');
                    break;
                default:
                    break;

            }

        });

	});
	view.add(unFriends_button);

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
/*
	isFriends(function(bool){
	});
*/
	var Message_imageview = Titanium.UI.createImageView({
		image : '/assets/iconReturn.png',
		height : '5.2%',
		top : '19.8%',
		left : '41.3%'
	});
	//view.add(Message_imageview);

	var friendship_meter_label = Titanium.UI.createLabel({
		text : 'FREINDSHIP METER \N \nFRIEND LEVEL 2',
		top : '56.1%',
		left : '15.6%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(friendship_meter_label);
	if(friendinfo.MESSAGE == "NEW_MESSAGE"){
        Ti.App.addEventListener("message_status",function(){
           friendinfo.MESSAGE = "NO_MESSAGE";
            new_message_imageview.hide();
            NoMessage();
     /*
            Ti.App.fireEvent("message_read",{
                gender : friendinfo.GENDER
             });*/
     
    
            
        }); 
	    
	}
	function NoMessage(){
        Ti.App.fireEvent("message_read",{
           //uid : friendinfo.UID
        });
	    
	}

	var friendship_meter_label = Titanium.UI.createLabel({
		text : 'FREINDSHIP METER TRACKS HOW MUCH AND YOUR FRIEND HAVE INTERACTED WITH EACH OTHER.',
		bottom : '9.3%',
		width : '51.9%',
		left : '5%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '9dip'
		}

	});
	view.add(friendship_meter_label);

	var femChar_imageview = Titanium.UI.createImageView({
		image : '/assets/female_icon.png',
		height : '6.6%',
		width : '12.7%',
		top : '64.3%',
		left : '5%'
	});
	view.add(femChar_imageview);

	var fem_meter_view = Ti.UI.createView({
		backgroundImage : '/assets/female_meterBar.png',
		top : '64.3%',
		left : '20%',
		width : '37%',
		height : '4%'
	});
	view.add(fem_meter_view);

	var maleChar_imageview = Titanium.UI.createImageView({
		backgroundImage : '/assets/male_icon.png',
		height : '6.6%',
		width : '12.7%',
		top : '71.7%',
		left : '42.4%'
	});
	view.add(maleChar_imageview);
	var male_meter_view = Ti.UI.createView({
		backgroundImage : '/assets/male_meterBar.png',
		top : '71.7%',
		left : '5%',
		width : '37%',
		height : '4%'
	});
	view.add(male_meter_view);

	return self;
};
module.exports = FreindInfo;
