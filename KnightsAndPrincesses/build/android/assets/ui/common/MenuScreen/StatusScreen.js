function StatusScreen(userinfo) {
	var osname = Ti.Platform.osname;

	var winWidth = Titanium.Platform.displayCaps.platformWidth;
	var winHeight = Titanium.Platform.displayCaps.platformHeight;
	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return winWidth * percent / 100;
		} else if (axis == 'y') {
			return winHeight * percent / 100;
		}
	}

	var view = Ti.UI.createView({
		width : '100%',
		height : '100%',
		zIndex : 50

	});
	var letter_imageview = Ti.UI.createImageView({
		image : '/assets/large_scroll.png',
		height : '43.2%',
		width : '50%',
		top : '26.5%',
		right : '0%',
		opacity : '0.6'
	});
	view.add(letter_imageview);
	letter_imageview.addEventListener('load', function(e) {
		//hideLoader();
	});
	var letter_text_label = Titanium.UI.createLabel({
		text : 'Following Ruby \nDress \n+1 Aiming  \n+2 Charming',
		top : '33.6%',
		right : '10%',
		width : '26%',
		textAlign : 'center',
		color : '#4f2e5e',
		font : {
			fontSize : '14dip'
		}
	});
	view.add(letter_text_label);

	var gender = userinfo.Record[0].GENDER;

	var Avatar = require('/ui/common/drawings/Avatar');
	var Settings = require('/ui/common/drawings/Settings');
	var settings = new Settings();
	var avatar_config = {};
	avatar_config.gender = gender;
	avatar_config.main_view = {
		width : settings.avatar_width,
		height : settings.avatar_height,
		left : '0%',
		top : '25%'
	};
	// Ti.API.info(JSON.stringify(userinfo.Record[0].USER_APPEARANCE[0]));
	if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {
		avatar_config.appearence = {
			hair_back : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-back.png',
			face : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
			dress : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
			hair_front : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-front.png',
			jewelery : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png'

		};
		var avatar = new Avatar(avatar_config);
		view.add(avatar);
	} else if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {
		avatar_config.appearence = {
			dress : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
			helmet : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[4].IMAGE + '.png',
			shield : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[5].IMAGE + '.png',
			hair_back : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-back.png',
			face : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
			hair_front : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-front.png',
			weapon : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png'
		};
		var avatar = new Avatar(avatar_config);
		view.add(avatar);
	} else {
		if (userinfo.Record[0].GENDER == 'f') {
			// alert(JSON.stringify(callback_record));
			var Defaults = require('/ui/common/drawings/Defaults');
			var defaults = new Defaults('f', function(callback_record) {
				avatar_config.appearence = {
					hair_back : '/assets/princess/' + callback_record.hair.IMAGE + '-back.png',
					face : '/assets/princess/' + callback_record.face.IMAGE + '.png',
					dress : '/assets/princess/' + callback_record.dress.IMAGE + '.png',
					hair_front : '/assets/princess/' + callback_record.hair.IMAGE + '-front.png',
					jewelery : '/assets/princess/' + callback_record.jwelery.IMAGE + '.png'
				};
				var avatar = new Avatar(avatar_config);
				view.add(avatar);
			});
		} else {
			var Defaults = require('/ui/common/drawings/Defaults');
			var defaults = new Defaults('m', function(callback_record) {
				avatar_config.appearence = {
					dress : '/assets/knight/' + callback_record.dress.IMAGE + '.png',
					helmet : '/assets/knight/' + callback_record.helmet.IMAGE + '.png',
					shield : '/assets/knight/' + callback_record.shield.IMAGE + '.png',
					hair_back : '/assets/knight/' + callback_record.hair.IMAGE + '-back.png',
					face : '/assets/knight/' + callback_record.face.IMAGE + '.png',
					hair_front : '/assets/knight/' + callback_record.hair.IMAGE + '-front.png',
					weapon : '/assets/knight/' + callback_record.weapons.IMAGE + '.png'
				};
				var avatar = new Avatar(avatar_config);
				view.add(avatar);
			});
		}
	}
	
	

	var counter = 1;
	view.addEventListener('load', function(e) {
		//alert('1');
		if (counter == 3) {
			//appearanceView();
		}
		counter++;
	});

	var iconbg_view = Ti.UI.createImageView({
		url : '/assets/iconHighlight.png',
		height : '10%',
		width : '13.8%',
		top : '12%',
		left : '0%',
		zIndex : 50
	});
	iconbg_view.addEventListener('load', function(e) {
		//hideLoader();
	});

	var overlayProgressNotification1_imageview = Ti.UI.createImageView({
		image : '/assets/overlayProgressNotification.png',
		right : '0',
		height : '5%',
		width : '50%',
		bottom : '12.8%',
	});
	view.add(overlayProgressNotification1_imageview);

	var quest_label = Titanium.UI.createLabel({
		text : '12 Quest to Next Level',
		bottom : '14%',
		right : '8%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(quest_label);

	var overlayProgressNotification2_imageview = Ti.UI.createImageView({
		image : '/assets/overlayProgressNotification.png',
		right : '0',
		height : '5%',
		width : '50%',
		bottom : '9.3%',

	});
	view.add(overlayProgressNotification2_imageview);

	var friends_label = Titanium.UI.createLabel({
		text : '15 Friends to Next Level',
		bottom : '10.5%',
		right : '8%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}
	});
	view.add(friends_label);
	var status_textbox = Titanium.UI.createTextField({
		hintText : 'Set your status here.',
		font : {
			fontSize : '13dip'
		},
		color : '#63c689',
		textAlign : 'left',
		borderRadius : 12,
		paddingLeft : 10,
		bottom : '19%',
		returnKeyType:Titanium.UI.RETURNKEY_DONE,
		height : '10%',
		width : '50%',
		right : '2%',
		backgroundImage : '/assets/inputButton002_up.png',
		zIndex : 600
	});
	view.add(status_textbox);
	if (osname === 'iphone' || osname === 'ipad') {
		status_textbox.addEventListener('focus', function() {
			status_textbox.animate({
				bottom : getPixelFromPercent('y', 50),
				duration : 500
			});
		});
		status_textbox.addEventListener('blur', function() {
			status_textbox.animate({
				bottom : '19%',
				duration : 500
			});
		});
	}
	status_textbox.addEventListener('return',function(){
		if (status_textbox.value != "") {
			var set_status_url = "http://bonozo.com:8080/knp/set_status_message.php?uid=" + userinfo.Record[0].UID + "&set_status=" + Ti.Network.encodeURIComponent(status_textbox.value);
			var httpclientt = require('/ui/common/Functions/function');
			httpclientt.requestServer({
				success : function(e) {
					items_json = JSON.parse(this.responseText);
					if (items_json.Record != undefined) {
						//alert(items_json.Record.Message);
						userinfo.Record[0].STATUS_MESSAGE = status_textbox.value;
						Ti.App.fireEvent('update_xp',userinfo);
					}
				},
				method : 'GET',
				contentType : 'text/xml',
				url : set_status_url
			});

			status_textbox.value = '';
		}
	});
	return view;

}

//make constructor function the public component interface
module.exports = StatusScreen;