function SceneryCustomization(userinfo) {
	var view = Titanium.UI.createView({
		top : "23%",
		height : "78%",
		width : "100%"
	});

	var gender = userinfo.Record[0].GENDER;

	var dress_counter = 1;
	var head_counter = 1;
	var hair_counter = 1;
	var jewel_counter = 1;
	var weapon_counter = 1;

	if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {
		var dress_split = userinfo.Record[0].USER_APPEARANCE[3].IMAGE.match(/\d/g);
		var hair_split = userinfo.Record[0].USER_APPEARANCE[0].IMAGE.match(/\d/g);
		var face_split = userinfo.Record[0].USER_APPEARANCE[1].IMAGE.match(/\d/g);
		var jewel_split = userinfo.Record[0].USER_APPEARANCE[2].IMAGE.match(/\d/g);
		dress_counter = dress_split;
		head_counter = face_split;
		hair_counter = hair_split;
		jewel_counter = jewel_split;
	} else if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {
		var dress_split = userinfo.Record[0].USER_APPEARANCE[2].IMAGE.match(/\d/g);
		var hair_split = userinfo.Record[0].USER_APPEARANCE[0].IMAGE.match(/\d/g);
		var face_split = userinfo.Record[0].USER_APPEARANCE[1].IMAGE.match(/\d/g);
		var weapon_split = userinfo.Record[0].USER_APPEARANCE[3].IMAGE.match(/\d/g);
		dress_counter = dress_split;
		head_counter = face_split;
		hair_counter = hair_split;
		weapon_counter = weapon_split;
	}


	var counter = 1;
	view.addEventListener('load', function(e) {
		if (counter == 1){
		}
		counter++;
	});
	
	var Avatar = require('/ui/common/drawings/Avatar');
	var Settings = require('/ui/common/drawings/Settings');
	var settings = new Settings();
	var avatar_config = {};
	var avatar_customization_config = {};
	avatar_config.gender = gender;
	avatar_config.custom = true;
	avatar_config.main_view = {
			width : settings.avatar_width,
			height : settings.avatar_height,
			right : 0,
			top : '0%'
	};
	var avatar_appearance = {};
	if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {
		avatar_config.appearence = {
			hair_back : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-back.png',
			face : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
			dress : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
			hair_front : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-front.png',
			jewelery : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png'
		};
		avatar_customization_config.btn_labels = {
			dress : userinfo.Record[0].USER_APPEARANCE[3].NAME,//'Dress ' + dress_counter,
			head : userinfo.Record[0].USER_APPEARANCE[1].NAME,//'Head ' + head_counter,
			hair : userinfo.Record[0].USER_APPEARANCE[0].NAME,//'Hair ' + hair_counter,
			jewelery : userinfo.Record[0].USER_APPEARANCE[2].NAME,//'Jewelery ' + jewel_counter
		};
		avatar_customization_config.wear_ids = {
			dress : userinfo.Record[0].USER_APPEARANCE[3].WEAR_ID,//'Dress ' + dress_counter,
			head : userinfo.Record[0].USER_APPEARANCE[1].WEAR_ID,//'Head ' + head_counter,
			hair : userinfo.Record[0].USER_APPEARANCE[0].WEAR_ID,//'Hair ' + hair_counter,
			jewelery : userinfo.Record[0].USER_APPEARANCE[2].WEAR_ID,//'Jewelery ' + jewel_counter
		};
		var avatar = new Avatar(avatar_config);
		view.add(avatar);
	
		var AvatarCustomization = require('/ui/common/functionality/AvatarCustomization');
		avatar_customization_config.gender = userinfo.Record[0].GENDER;
		avatar_customization_config.uid = userinfo.Record[0].UID;
		avatar_customization_config.main_view = {
			width : '35%',
			height : settings.avatar_height,
			left : 0,
			top : '8%'
		};
		avatarCustomization = new AvatarCustomization(avatar_customization_config);
		view.add(avatarCustomization);
	}
	else if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {
		avatar_config.appearence = {
			dress : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
			helmet : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[4].IMAGE + '.png',
			shield : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[5].IMAGE + '.png',
			hair_back : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-back.png',
			face : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
			hair_front : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '-front.png',
			weapon : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png'
		};
		avatar_customization_config.btn_labels = {
			hair : userinfo.Record[0].USER_APPEARANCE[0].NAME,//'Hair ' + hair_counter,
			head : userinfo.Record[0].USER_APPEARANCE[1].NAME,//'Head ' + head_counter,
			weapon : userinfo.Record[0].USER_APPEARANCE[3].NAME,//'Weapon ' + weapon_counter,
			dress : userinfo.Record[0].USER_APPEARANCE[2].NAME,//'Dress ' + dress_counter
			helmet : userinfo.Record[0].USER_APPEARANCE[4].NAME,//'Weapon ' + weapon_counter,
			shield : userinfo.Record[0].USER_APPEARANCE[5].NAME//'Dress ' + dress_counter
		};
		avatar_customization_config.wear_ids = {
			hair : userinfo.Record[0].USER_APPEARANCE[0].WEAR_ID,//'Hair ' + hair_counter,
			head : userinfo.Record[0].USER_APPEARANCE[1].WEAR_ID,//'Head ' + head_counter,
			weapon : userinfo.Record[0].USER_APPEARANCE[3].WEAR_ID,//'Weapon ' + weapon_counter,
			dress : userinfo.Record[0].USER_APPEARANCE[2].WEAR_ID,//'Dress ' + dress_counter
			helmet : userinfo.Record[0].USER_APPEARANCE[4].WEAR_ID,//'Weapon ' + weapon_counter,
			shield : userinfo.Record[0].USER_APPEARANCE[5].WEAR_ID//'Weapon ' + weapon_counter,
		};
		var avatar = new Avatar(avatar_config);
		view.add(avatar);
	
		var AvatarCustomization = require('/ui/common/functionality/AvatarCustomization');
		avatar_customization_config.gender = userinfo.Record[0].GENDER;
		avatar_customization_config.uid = userinfo.Record[0].UID;
		avatar_customization_config.main_view = {
			width : '35%',
			height : settings.avatar_height,
			left : 0,
			top : '5%'
		};
		avatarCustomization = new AvatarCustomization(avatar_customization_config);
		view.add(avatarCustomization);
	}
	else{
		if(userinfo.Record[0].GENDER == 'f'){
			var Defaults = require('/ui/common/drawings/Defaults');
			var defaults = new Defaults('f',function(callback_record){
				
				//alert(JSON.stringify(callback_record));
				avatar_config.appearence = {
					hair_back : '/assets/princess/'+callback_record.hair.IMAGE+'-back.png',
					face : '/assets/princess/'+callback_record.face.IMAGE+'.png',
					dress : '/assets/princess/'+callback_record.dress.IMAGE+'.png',
					hair_front : '/assets/princess/' + callback_record.hair.IMAGE + '-front.png',
					jewelery : '/assets/princess/' + callback_record.jwelery.IMAGE + '.png'
				};
				avatar_customization_config.btn_labels = {
					dress : callback_record.dress.NAME,
					head : callback_record.face.NAME,
					hair : callback_record.hair.NAME,
					jewelery : callback_record.jwelery.NAME
				};
				avatar_customization_config.wear_ids = {
					dress : callback_record.dress.WEAR_ID,
					head : callback_record.face.WEAR_ID,
					hair : callback_record.hair.WEAR_ID,
					jewelery : callback_record.jwelery.WEAR_ID
				};

				var avatar = new Avatar(avatar_config);
				view.add(avatar);
			
				var AvatarCustomization = require('/ui/common/functionality/AvatarCustomization');
				avatar_customization_config.gender = userinfo.Record[0].GENDER;
				avatar_customization_config.uid = userinfo.Record[0].UID;
				avatar_customization_config.main_view = {
					width : '35%',
					height : settings.avatar_height,
					left : 0,
					top : '5%'
				};
				avatarCustomization = new AvatarCustomization(avatar_customization_config);
				view.add(avatarCustomization);
				
			});
		}
		else{
			var Defaults = require('/ui/common/drawings/Defaults');
			var defaults = new Defaults('m',function(callback_record){
				
				avatar_customization_config.btn_labels = {
					hair : callback_record.hair.NAME,
					head : callback_record.face.NAME,
					weapon : callback_record.weapons.NAME,
					dress : callback_record.dress.NAME,
					helmet : callback_record.helmet.NAME,
					shield : callback_record.shield.NAME
				};
				avatar_customization_config.wear_ids = {
					hair : callback_record.hair.WEAR_ID,
					head : callback_record.face.WEAR_ID,
					weapon : callback_record.weapons.WEAR_ID,
					dress : callback_record.dress.WEAR_ID,
					helmet : callback_record.helmet.WEAR_ID,
					shield : callback_record.shield.WEAR_ID
				};
				avatar_config.appearence = {
					dress : '/assets/knight/' + callback_record.dress.IMAGE + '.png',
					helmet : '/assets/knight/' + callback_record.helmet.IMAGE + '.png',
					shield : '/assets/knight/' + callback_record.shield.IMAGE + '.png',
					hair_back : '/assets/knight/' + callback_record.hair.IMAGE + '-back.png',
					face : '/assets/knight/' + callback_record.face.IMAGE + '.png',
					hair_front : '/assets/knight/' + callback_record.hair.IMAGE + '-front.png',
					weapon : '/assets/knight/' + callback_record.weapons.IMAGE + '.png'
				};
				//alert(JSON.stringify(avatar_config));
				var avatar = new Avatar(avatar_config);
				view.add(avatar);
			
				var AvatarCustomization = require('/ui/common/functionality/AvatarCustomization');
				avatar_customization_config.gender = userinfo.Record[0].GENDER;
				avatar_customization_config.uid = userinfo.Record[0].UID;
				avatar_customization_config.main_view = {
					width : '35%',
					height : settings.avatar_height,
					left : 0,
					top : '5%'
				};
				//alert(JSON.stringify(avatar_customization_config));
				avatarCustomization = new AvatarCustomization(avatar_customization_config);
				view.add(avatarCustomization);
			});
		}
	}
    Ti.App.addEventListener('save_appearance', function(new_json) {
    	
    });

	var decoration_label = Titanium.UI.createLabel({
		text : "DECORATION",
		textAlign : "center",
		left : "3%",
		top : "5%",
		width : "30%",
		height : "10%",

	});
	//view.add(decoration_label);
	var leftarrow_decoration = Titanium.UI.createButton({color: '#761f56',
		top : "15%",
		backgroundImage : "/assets/iconControlArrowRight.png",
		height : "6%",
		left : "1%",
		width : "8%"
	});
	//view.add(leftarrow_decoration);
	var rightarrow_decoration = Titanium.UI.createButton({color: '#761f56',
		top : "15%",
		backgroundImage : "/assets/iconControlArrowLeft.png",
		height : "6%",
		left : "30%",
		width : "8%"
	});
	//view.add(rightarrow_decoration);
	var style_label = Titanium.UI.createLabel({
		text : "Style",
		top : "22%",
		width : "30%",
		textAlign : "center",
		left : "3%",
		height : "10%",

	});
	//view.add(style_label);
	var leftarrow_style = Titanium.UI.createButton({color: '#761f56',
		top : "32%",
		backgroundImage : "/assets/iconControlArrowRight.png",
		height : "6%",
		left : "1%",
		width : "8%"
	});
	//view.add(leftarrow_style);
	var rightarrow_style = Titanium.UI.createButton({color: '#761f56',
		top : "32%",
		backgroundImage : "/assets/iconControlArrowLeft.png",
		height : "6%",
		left : "30%",
		width : "8%"
	});
	//view.add(rightarrow_style);
	var Color_label = Titanium.UI.createLabel({
		text : "Color Scheme",
		top : "40%",
		width : "30%",
		textAlign : "center",
		left : "3%",
		height : "10%",

	});
	//view.add(Color_label);
	var leftarrow_color = Titanium.UI.createButton({color: '#761f56',
		top : "50%",
		backgroundImage : "/assets/iconControlArrowRight.png",
		height : "6%",
		left : "1%",
		width : "8%"
	});
	//view.add(leftarrow_color);
	var rightarrow_color = Titanium.UI.createButton({color: '#761f56',
		top : "50%",
		backgroundImage : "/assets/iconControlArrowLeft.png",
		height : "6%",
		left : "30%",
		width : "8%"
	});
	//view.add(rightarrow_color);
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
	var main_view = Ti.UI.createView();

    function getPixelFromPercent(axis, percent) {
        if (axis == 'x') {
            return winWidth * percent / 100;
        } else if (axis == 'y') {
            return winHeight * percent / 100;
        }
    }

	var activityIndicatorView = Titanium.UI.createView({
		backgroundColor : '#FFFFFF',
		borderRadius : 10,
		borderColor : '#333333',
		borderWidth : '5dip',
		visible : false,
		height : '8%',
		width : (screenWidth/2),
		zIndex : 700
	});
	var activityIndicator = Ti.UI.createActivityIndicator({
		color : '#333333',
		font : {
			// fontFamily : 'Helvetica Neue',
			fontSize : '14dip',
			fontWeight : 'bold'
		},
		message : 'Loading...',
		style : (Ti.Platform.name === 'iPhone OS')?Ti.UI.iPhone.ActivityIndicatorStyle.DARK:Ti.UI.ActivityIndicatorStyle.DARK,
		height : '100%',
		width : '100%'
	});
	// activityIndicator.message = 'Loading...';
	activityIndicatorView.add(activityIndicator);
	view.add(activityIndicatorView);

	return view;
};
module.exports = SceneryCustomization;
