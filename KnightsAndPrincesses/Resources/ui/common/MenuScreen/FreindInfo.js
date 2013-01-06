function FreindInfo(userinfo, friend_uid) {

	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true
	});

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;

	var view = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundImage : '/assets/inventoryBackground.png'

	});
	self.add(view);
	var Footer = require('ui/common/menus/Footer');
	var footer = new Footer(userinfo);
	view.add(footer);
	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		//height:'12.4%',
		width : '100%',
		top : '0%'
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
		text : 'FRIENDS NAME 01 INFO',
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
		top : '1%',
		right : '3%'
	});
	view.add(return_imageview);

	var tabledata = [];
	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var rowview_height = ScreenHeight * (8.6 / 100);

	for (var i = 0; i < 3; i++) {
		var rowView = Titanium.UI.createTableViewRow({
			height : rowview_height + 'px',
			backgroundImage : '/assets/rowview_bg.png',
		});
		var rowImg = Ti.UI.createImageView({
			image : '/assets/iconThickBook.png',
			height : rowview_height + 'px',
			left : '0'
		});
		rowView.add(rowImg);

		var row_label = Ti.UI.createLabel({
			text : 'Assign Quest \n Tap to Choose',
			color : '#ffffff',
			font : {
				fontSize : '12dip'
			},
			left : rowview_height + 'px',
			top : '0'
		});
		rowView.add(row_label);

		tabledata.push(rowView);
	}
	var tableviewheight = rowview_height * 3;

	var tableview = Ti.UI.createTableView({
		data : tabledata,
		width : '100%',
		height : '28%',
		left : '0',
		top : '27.3%'
	});
	view.add(tableview);

	var male_character_imageview = Titanium.UI.createImageView({
		image : '/assets/K_fullbody_bad.png',
		height : '79.5%',
		top : '12%',
		right : '0%'
	});
	view.add(male_character_imageview);

	var friendsname_label = Titanium.UI.createLabel({
		text : 'FRIENDS NAME 01 ',
		top : '5.9%',

		left : '4%',
		textAlign : 'left',
		color : '#ffffff',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(friendsname_label);

	var friendsstatus_label = Titanium.UI.createLabel({
		text : 'I M IN TO WIN \N LVL100',
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
	view.add(coin_count_label);

	var minicoin_imageview = Titanium.UI.createImageView({
		image : '/assets/iconGoldMini.png',
		width : '7%',
		top : '15%',
		left : '3%'
	});
	view.add(male_character_imageview);

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
	view.add(onlineStatus_label);

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

	var messages_button = Ti.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		top : '19.8%',
		left : '51.7%',
		width : '21.5%',
		height : '5%',
		title : 'Messages',
		font : {
			fontSize : '10dip'
		}
	});
	view.add(messages_button);
	messages_button.addEventListener('click', function(e) {
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({

			success : function(e) {
				var Messages_Thread = JSON.parse(this.responseText);
				if (Messages_Thread.Record != undefined) {
					//alert(Messages_Thread.Record[0].MESSAGE_TEXT);
					var MessageScreen = require('/ui/common/MenuScreen/MessageScreen');
					var messageScreen = new MessageScreen(Messages_Thread, userinfo, friend_uid);
					messageScreen.open({
						modal : true
					});
				}

			},
			onerror : function(e) {
				Ti.API.debug("STATUS: " + this.status);
				Ti.API.debug("TEXT: " + this.responseText);
				Ti.API.debug("ERROR: " + e.error);
				Ti.API.debug("URL: " + "http://justechinfo.com/kap_server/get_thread_messages.php?sender_id=" + userinfo.Record[0].UID + "&receiver_id=" + friend_uid);
				alert('There was an error retrieving the remote data. Try again.');
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://justechinfo.com/kap_server/get_thread_messages.php?sender_id=" + userinfo.Record[0].UID + "&receiver_id=" + friend_uid,
			//url : "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + 10000007 + "",

		});

	});
	var Message_imageview = Titanium.UI.createImageView({
		url : '/assets/iconReturn.png',
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
		url : '/assets/female_icon.png',
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
