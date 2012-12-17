function ClassSelection(_args) {
	var curr_top = 0;
	var self = Ti.UI.createWindow({
		exitOnClose : true,
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			colors : [{
				color : '#000d44',
				offset : 0.0
			}, {
				color : '#1340a7',
				offset : 1.0
			}],
		}
	});

	var CurtainHeader = require('ui/common/CurtainHeader');
	var header = new CurtainHeader('CHOOSE YOUR CLASS');
	self.add(header.createHeader());
	curr_top += 45;

	var characterFemaleImage = Ti.UI.createView({
		top : curr_top,
		backgroundImage : 'http://justechinfo.com/kap_server/app_assets/images/hdpi_female_character.png',
		left : 0,
		width : '100%',
		height : '100%'
	});
	self.add(characterFemaleImage);

	var characterMaleImage = Ti.UI.createView({
		top : curr_top,
		backgroundImage : 'http://justechinfo.com/kap_server/app_assets/images/hdpi_male_character_gray.png',
		left : 300,
		width : '100%',
		height : '100%'
	});
	self.add(characterMaleImage);

	var next_icon = Ti.UI.createImageView({
		right : 30,
		image : 'images/iconControlArrowRight.png',
		height : 120,
		width : 120
	});
	next_icon.addEventListener('click', function(e) {
		var animation_right = Ti.UI.createAnimation();
		animation_right.delay = 1000;
		animation_right.left = -300;
		characterFemaleImage.animate(animation_right);

		var animation_left = Ti.UI.createAnimation();
		animation_left.delay = 1000;
		animation_left.left = 0;
		characterMaleImage.animate(animation_left);
	});
	self.add(next_icon);

	return self;
}

module.exports = ClassSelection; 