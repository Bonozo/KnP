function MaleAvatar(config) {
	function getImageView(image_src, z_index) {
		return Titanium.UI.createImageView({
			height : config.main_view.height,
			width : config.main_view.width,
			top : 0,
			left : 0,
			image : image_src,
			visible : (config.thumb != undefined) ? true : false,
			zIndex : z_index
		});
	}

	function imageLoaded() {
		if (--num_of_images < 1) {
			UnhideAll();
		}
	}

	var view = Titanium.UI.createView();
	if (config.thumb != undefined) {
		var num_of_images = 5;
	} else {
		var num_of_images = 7;
	}

	var body_imageview = getImageView(config.appearence.dress, 30);
	view.add(body_imageview);
	body_imageview.addEventListener('load', function(e) {
		imageLoaded();
	});

	var helmet_imageview = getImageView(config.appearence.helmet, 50);
	view.add(helmet_imageview);
	helmet_imageview.addEventListener('load', function(e) {
		imageLoaded();
	});

	if (config.thumb == undefined) {
		var shield_imageview = getImageView(config.appearence.shield, 40);
		view.add(shield_imageview);
		shield_imageview.addEventListener('load', function(e) {
			imageLoaded();
		});
	}

	var hair_back_imageview = getImageView(config.appearence.hair_back, 10);
	view.add(hair_back_imageview);
	hair_back_imageview.addEventListener('load', function(e) {
		imageLoaded();
	});

	var face_imageview = getImageView(config.appearence.face, 20);
	view.add(face_imageview);
	face_imageview.addEventListener('load', function(e) {
		imageLoaded();
	});

	var hair_front_imageview = getImageView(config.appearence.hair_front, 60);
	view.add(hair_front_imageview);
	hair_front_imageview.addEventListener('load', function(e) {
		imageLoaded();
	});

	if (config.thumb == undefined) {
		var weapon_imageview = getImageView(config.appearence.weapon, 70);
		view.add(weapon_imageview);
		weapon_imageview.addEventListener('load', function(e) {
			imageLoaded();
		});
	}

	var label = Titanium.UI.createLabel({
		text : 'loading...'//,
		//visible : (config.thumb != undefined)?false:true
	});
	view.add(label);

	if (config.custom != undefined && config.custom == true) {
		Ti.App.addEventListener('update_appearance', function(data) {
			//alert(JSON.stringify(data));
			if (data.gender == 'm') {
				switch(data.item) {
					case 'hair':
						hair_back_imageview.image = '/assets/knight/' + data.image + '-back.png';
						hair_front_imageview.image = '/assets/knight/' + data.image + '-front.png';
						hair_back_imageview.zIndex = 10;
						face_imageview.zIndex = 20;
						hair_front_imageview.zIndex = 30;
						//hair_back_imageview.animate({zIndex:10});
						//face_imageview.animate({zIndex:30});
						break;
					case 'face':
						face_imageview.image = '/assets/knight/' + data.image + '.png';
						break;
					case 'dress':
						body_imageview.image = '/assets/knight/' + data.image + '.png';
						break;
					case 'weapon':
						weapon_imageview.image = '/assets/knight/' + data.image + '.png';
						break;
					case 'shield':
						shield_imageview.image = '/assets/knight/' + data.image + '.png';
						break;
					case 'helmet':
						helmet_imageview.image = '/assets/knight/' + data.image + '.png';
						break;
				}
			}
		});
	}

	function UnhideAll() {
		body_imageview.visible = true;
		helmet_imageview.visible = true;
		if (config.thumb == undefined) {
			shield_imageview.visible = true;
		}
		hair_back_imageview.visible = true;
		face_imageview.visible = true;
		hair_front_imageview.visible = true;
		if (config.thumb == undefined) {
			weapon_imageview.visible = true;
		}
		label.hide();
	}

	return view;

}

module.exports = MaleAvatar;