function Avatar(config) {
	var avatar_main_view = Ti.UI.createView(config.main_view);
	if(config.gender == 'm'){
		var MaleAvatar = require('/ui/common/drawings/MaleAvatar');
		var avatar = new MaleAvatar(config);
	}
	else{
		var FemaleAvatar = require('/ui/common/drawings/FemaleAvatar');
		var avatar = new FemaleAvatar(config);
	}
	avatar_main_view.add(avatar);
	return avatar_main_view;
}

module.exports = Avatar;