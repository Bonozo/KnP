function AvatarThumbnail(thumbnail_properties, userappearance, gender, index, callback) {
	var Avatar = require('/ui/common/drawings/Avatar');
	var Settings = require('/ui/common/drawings/Settings');
	var settings = new Settings();
	var avatar_config = {};
	var friend_thumbnail = Ti.UI.createView(thumbnail_properties);
	var thumbnail_id = Math.random(99, 99999) * 42;
	avatar_config.gender = gender;
	avatar_config.thumb = true;
	avatar_config.main_view = {
		width : 60, //settings.avatar_thumb_width,
		height : 60	//settings.avatar_thumb_height,
	};
	if (userappearance != '' && gender == 'f') {
		avatar_config.appearence = {
			hair_back : '/assets/princess/thumbnail/' + userappearance[0].IMAGE + '-back.png',
			face : '/assets/princess/thumbnail/' + userappearance[1].IMAGE + '.png',
			dress : '/assets/princess/thumbnail/' + userappearance[3].IMAGE + '.png',
			hair_front : '/assets/princess/thumbnail/' + userappearance[0].IMAGE + '-front.png',
			jewelery : '/assets/princess/thumbnail/' + userappearance[2].IMAGE + '.png'
		};
		var avatar = new Avatar(avatar_config);
		friend_thumbnail.add(avatar);
		callback(friend_thumbnail, index, thumbnail_id);
	} else if (userappearance != '' && gender == 'm') {
		avatar_config.appearence = {
			dress : '/assets/knight/thumbnail/' + userappearance[2].IMAGE + '.png',
			helmet : '/assets/knight/thumbnail/' + userappearance[4].IMAGE + '.png',
			shield : '/assets/knight/thumbnail/' + userappearance[5].IMAGE + '.png',
			hair_back : '/assets/knight/thumbnail/' + userappearance[0].IMAGE + '-back.png',
			face : '/assets/knight/thumbnail/' + userappearance[1].IMAGE + '.png',
			hair_front : '/assets/knight/thumbnail/' + userappearance[0].IMAGE + '-front.png',
			weapon : '/assets/knight/thumbnail/' + userappearance[3].IMAGE + '.png'
		};
		var avatar = new Avatar(avatar_config);
		friend_thumbnail.add(avatar);
		callback(friend_thumbnail, index, thumbnail_id);
	} else {
		if (gender == 'f') {
			var Defaults = require('/ui/common/drawings/Defaults');
			var defaults = new Defaults('f', function(callback_record) {
				avatar_config.appearence = {
					hair_back : '/assets/princess/thumbnail/' + callback_record.hair.IMAGE + '-back.png',
					face : '/assets/princess/thumbnail/' + callback_record.face.IMAGE + '.png',
					dress : '/assets/princess/thumbnail/' + callback_record.dress.IMAGE + '.png',
					hair_front : '/assets/princess/thumbnail/' + callback_record.hair.IMAGE + '-front.png',
					jewelery : '/assets/princess/thumbnail/' + callback_record.jwelery.IMAGE + '.png'
				};
				var avatar = new Avatar(avatar_config);
				friend_thumbnail.add(avatar);
				callback(friend_thumbnail, index, thumbnail_id);
			});
		} else {
			var Defaults = require('/ui/common/drawings/Defaults');
			var defaults = new Defaults('m', function(callback_record) {
				avatar_config.appearence = {
					dress : '/assets/knight/thumbnail/' + callback_record.dress.IMAGE + '.png',
					helmet : '/assets/knight/thumbnail/' + callback_record.helmet.IMAGE + '.png',
					shield : '/assets/knight/thumbnail/' + callback_record.shield.IMAGE + '.png',
					hair_back : '/assets/knight/thumbnail/' + callback_record.hair.IMAGE + '-back.png',
					face : '/assets/knight/thumbnail/' + callback_record.face.IMAGE + '.png',
					hair_front : '/assets/knight/thumbnail/' + callback_record.hair.IMAGE + '-front.png',
					weapon : '/assets/knight/thumbnail/' + callback_record.weapons.IMAGE + '.png'
				};
				var avatar = new Avatar(avatar_config);
				friend_thumbnail.add(avatar);
				callback(friend_thumbnail, index, thumbnail_id);
			});
		}
	}
	// Ti.App.addEventListener('avatar_table_changed',function(data){
	// friend_thumbnail.remove(avatar);
	// friend_thumbnail = null;
	// Ti.App.fireEvent('data_removed', data);
	// });
	return;
}

module.exports = AvatarThumbnail;
