function FemaleAvatar(config) {
	function getImageView(image_src, z_index) {
		return Titanium.UI.createImageView({
			height : config.main_view.height,
			width : config.main_view.width,
			top : 0,
			left : 0,
			image : image_src,
			visible : true,
			zIndex : z_index
		});
	}

	function imageLoaded() {
		if (--num_of_images < 1)
			UnhideAll();
	}

	var view = Titanium.UI.createView();
	var num_of_images = 4;

	var body_imageview = getImageView(config.appearence.dress, 30);
	view.add(body_imageview);
	body_imageview.addEventListener('load', function(e) {
		imageLoaded();
	});

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

	var jewelery_imageview = getImageView(config.appearence.jewelery, 70);
	view.add(jewelery_imageview);
	jewelery_imageview.addEventListener('load', function(e) {
		imageLoaded();
	});

	var label = Titanium.UI.createLabel({
		text : 'loading...',
		visible : (config.thumb != undefined)?false:true
	});
	view.add(label);
	
	if(config.custom != undefined && config.custom == true){
		Ti.App.addEventListener('update_appearance', function(data) {
			if (data.gender == 'f') {
				switch(data.item) {
					case 'hair':
						hair_back_imageview.image = '/assets/princess/' + data.image + '-back.png';
						hair_front_imageview.image = '/assets/princess/' + data.image + '-front.png';
						hair_back_imageview.zIndex = 10;
						face_imageview.zIndex = 20;
						hair_front_imageview.zIndex = 30;
						break;
					case 'face':
						face_imageview.image = '/assets/princess/' + data.image + '.png';
						break;
					case 'dress':
						body_imageview.image = '/assets/princess/' + data.image + '.png';
						break;
					case 'jewelery':
						jewelery_imageview.image = '/assets/princess/' + data.image + '.png';
						break;
				}
			}
		});
	}

	function UnhideAll() {
		body_imageview.visible = true;
		hair_back_imageview.visible = true;
		face_imageview.visible = true;
		hair_front_imageview.visible = true;
		jewelery_imageview.visible = true;
		label.hide();
	}

	return view;

}

module.exports = FemaleAvatar;
