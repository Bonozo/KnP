function IntroSlides() {
	var osname = Ti.Platform.osname;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;

	function getRespectiveHeight(width, ratio) {
		return width * ratio;
	}

	function getRespectiveWidth(height, ratio) {
		return height / ratio;
	}

	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return screenWidth * percent / 100;
		} else if (axis == 'y') {
			return screenHeight * percent / 100;
		}
	}

	var win = Ti.UI.createWindow({
		backgroundImage : '/assets/inventoryBackground.png'
	});
	win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	
	var knight_thumb_dark = Ti.UI.createImageView({
		image : '/assets/knight_thumb_dark.png',
		width : '50%',
		left : '3%',
		opacity : 0,
		zIndex : 5
	});
	win.add(knight_thumb_dark);
	
	var princess_thumb_dark = Ti.UI.createImageView({
		image : '/assets/princess_thumb_dark.png',
		height : '45%',
		right : '3%',
		opacity : 0,
		zIndex : 5
	});
	win.add(princess_thumb_dark);


	var scroll_ratio = 1.3;
	var scroll_view = Ti.UI.createView({
		backgroundImage : '/assets/games/scroll.png',
		width : getPixelFromPercent('x', 80),
		height : getRespectiveHeight(getPixelFromPercent('x', 80), scroll_ratio),
		zIndex : 10,
		opacity : 0
	});

	var next_arrow = Titanium.UI.createImageView({
		bottom : '0%',
		right : '0%',
		image : '/assets/iconNextArrow.png',
		height : '10%',
		width : '35%',
		zIndex : 10,
		opacity : 0
	});


	win.add(scroll_view);
	win.add(next_arrow);
	
	var knight_thumb_light = Ti.UI.createImageView({
		image : '/assets/knight_thumb_light.png',
		height : '65%',
		opacity : 0,
		zIndex : 15
	});
	scroll_view.add(knight_thumb_light);
	
	var princess_thumb_light = Ti.UI.createImageView({
		image : '/assets/princess_thumb_light.png',
		height : '75%',
		opacity : 0,
		zIndex : 15
	});
	scroll_view.add(princess_thumb_light);
	
	var text1 = Ti.UI.createImageView({
		image : '/assets/intro/text1.png',
		width : '75%',
		opacity : 0,
		zIndex : 20
	});
	scroll_view.add(text1);
	
	var text2 = Ti.UI.createImageView({
		image : '/assets/intro/text2.png',
		width : '75%',
		opacity : 0,
		zIndex : 20
	});
	scroll_view.add(text2);
	
	var text3 = Ti.UI.createImageView({
		image : '/assets/intro/text3.png',
		width : '75%',
		opacity : 0,
		zIndex : 20
	});
	scroll_view.add(text3);
	
	var text4 = Ti.UI.createImageView({
		image : '/assets/intro/text4.png',
		width : '75%',
		opacity : 0,
		zIndex : 20
	});
	scroll_view.add(text4);
	
	var text5 = Ti.UI.createImageView({
		image : '/assets/intro/text5.png',
		width : '75%',
		opacity : 0,
		zIndex : 20
	});
	scroll_view.add(text5);
	
	var text6 = Ti.UI.createImageView({
		image : '/assets/intro/text6.png',
		width : '75%',
		opacity : 0,
		zIndex : 20
	});
	scroll_view.add(text6);
	
	
	/*
	 * Common animation objects
	 */
	
	var scroll_fade_in = Ti.UI.createAnimation({
		duration : 500,
		opacity : 100
	});

	var fade_in = Ti.UI.createAnimation({
		duration : 500,
		opacity : 100
	});

	var fade_out = Ti.UI.createAnimation({
		duration : 500,
		opacity : 0
	});
	var next_arrow_fade_in = Ti.UI.createAnimation({
		duration : 500,
		opacity : 100
	});
	var next_arrow_fade_out = Ti.UI.createAnimation({
		duration : 500,
		opacity : 0
	});
	/*
	 * Slide 1 started from here
	 */
	var scene_no = 0;
	setTimeout(function() {
		scroll_view.animate(scroll_fade_in);
	}, 500);
	scroll_fade_in.addEventListener('start', function() {
		Ti.API.info('Scroll is coming');
	});
	scroll_fade_in.addEventListener('complete', function() {
		Ti.API.info('Scroll have came');
		text1.animate(fade_in);
		scene_no = 1;
		Ti.API.info(scene_no);
	});
	
	fade_in.addEventListener('complete', function() {
		switch(scene_no){
			case 1:
				setTimeout(function() {
					text1.animate(fade_out);
				}, 1000);
				scene_no++;
				break;
			case 3:
				next_arrow.animate(next_arrow_fade_in);
				scene_no++;
				break;
			case 6:
				next_arrow.animate(next_arrow_fade_in);
				scene_no++;
				break;
			case 9:
				setTimeout(function(){
					text4.animate(fade_out);
					scroll_view.animate(fade_out);
				},3000);
				scene_no++;
				break;
			case 11:
				next_arrow.animate(next_arrow_fade_in);
				scene_no++;
				break;
			case 13:
				text5.animate(fade_in);
				scene_no++;
				break;
			case 14:
				setTimeout(function() {
					text5.animate(fade_out);
					scene_no++;
				}, 5000);
				break;
		}
		Ti.API.info(scene_no);
	});
	fade_out.addEventListener('complete', function() {
		switch(scene_no){
			case 2:
				text2.animate(fade_in);
				knight_thumb_light.animate(fade_in);
				scene_no++;
				break;
			case 5:
				text3.animate(fade_in);
				princess_thumb_light.animate(fade_in);
				scene_no++;
				break;
			case 8:
				text4.animate(fade_in);
				scene_no++;
				break;
			case 10:
				princess_thumb_dark.animate(fade_in);
				knight_thumb_dark.animate(fade_in);
				scene_no++;
				break;
			case 15:
				text6.animate(fade_in);
				next_arrow.animate(next_arrow_fade_in);
				scene_no++;
				break;
		}
		Ti.API.info(scene_no);
	});
	next_arrow.addEventListener('click', function(e) {
		switch(scene_no){
			case 4:
				next_arrow.animate(next_arrow_fade_out);
				text2.animate(fade_out);
				knight_thumb_light.animate(fade_out);
				scene_no++;
				break;
			case 7:
				next_arrow.animate(next_arrow_fade_out);
				text3.animate(fade_out);
				princess_thumb_light.animate(fade_out);
				scene_no++;
				break;
			case 12:
				next_arrow.animate(next_arrow_fade_out);
				princess_thumb_dark.animate(fade_out);
				knight_thumb_dark.animate(fade_out);
				scroll_view.animate(fade_in);
				scene_no++;
				break;
			case 16:
				win.close();
				Window = require('ui/handheld/android/LoginWindow');
				var win1 = new Window();
				win1.open();
				break;
			default:
				Window = require('ui/handheld/android/LoginWindow');
				var win1 = new Window();
				win1.open();
				break;
		}
		Ti.API.info(scene_no);
	});
	return win;
}

module.exports = IntroSlides;
