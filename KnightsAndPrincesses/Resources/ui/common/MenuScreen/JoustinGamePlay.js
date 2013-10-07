function JoustinGamePlay(quest_status, quest_id, userinfo) {
	var sound_settings = (Ti.App.Properties.getString('knp_sound') == undefined || Ti.App.Properties.getString('knp_sound') == '' || Ti.App.Properties.getString('knp_sound') == null)?'ON':Ti.App.Properties.getString('knp_sound');
	var window = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true

	});
	window.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	var play_game = true;
	var knight_running = false;
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	var quicktigame2d = require('com.googlecode.quicktigame2d');

	// Create view for your game.
	// Note that game.screen.width and height are not yet set until the game is loaded
	var game = quicktigame2d.createGameView();
	game.fps = 60;
	game.color(0, 0, 0);
	game.debug = true;
	var loop = true;

	var jousting_battle_music = Titanium.Media.createSound({
		url : '/sounds/jousting_battle_music.mp3'
	});
	var metal_bang_sound = Titanium.Media.createSound({
		url : '/sounds/metal_bang.mp3'
	});
	var trumpet_lose_sound = Titanium.Media.createSound({
		url : '/sounds/trumpet_lose.mp3'
	});

	var trumpet_win_sound = Titanium.Media.createSound({
		url : '/sounds/trumpet_win.mp3'
	});

	var shot_number = 0; var points = 0; var curr_points = 0;
	var shapes = new Array();
	var played = false;

	var scene = quicktigame2d.createScene();

	// add your scene to game view
	game.pushScene(scene);
	var timer = 0;
	var TOUCH_SCALE = 1;
	var horse_gollap_noise_sound = Titanium.Media.createSound({
		url : '/sounds/horse_gollap_noise.mp3',
		looping : true
	});
	var whoosh_sound = Titanium.Media.createSound({
		url : '/sounds/whoosh.mp3'
	});

	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return winWidth * percent / 100;
		} else if (axis == 'y') {
			return winHeight * percent / 100;
		}
	}

	function ScaleSpriteFromPercentage(screen_size, image_size, req_percent) {
		var a = screen_size * req_percent / 100;
		return (a / image_size);
	}

	function getRespectiveHeight(width, ratio) {
		return width * ratio;
	}

	function getRespectiveWidth(height, ratio) {
		return height / ratio;
	}

	// Create an ImageView.
	var scoreboard_bg_imageview = quicktigame2d.createSprite({
		image : 'assets/XPBar.png',
		height : getPixelFromPercent('y', 5),
		width : getPixelFromPercent('x', 100),
		x : 0,
		y : 0,
		z : 4
	});
	scene.add(scoreboard_bg_imageview);

	var shot_number_label = Ti.UI.createLabel({
		text : 'Shot # 0',
		color : '#000000',
		font : {
			fontSize : '16dip'
		},
		left : '2%',
		top : '1%',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		zIndex : 600
	});
	window.add(shot_number_label);

	var points_label = Ti.UI.createLabel({
		text : 'Total points : 0',
		color : '#000000',
		font : {
			fontSize : '16dip'
		},
		right : '5%',
		top : '1%',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		zIndex : 600
	});
	window.add(points_label);

	var sky_image = quicktigame2d.createSprite({
		image : 'assets/games/jousting/sky_image.png',
		width : 400,//getPixelFromPercent('x', 100),
		height : 200,//getPixelFromPercent('y', 55),
		x : getPixelFromPercent('x', 100),
		y : getPixelFromPercent('y', 100),
		z : 0
	});

	var bg_image = quicktigame2d.createSpriteSheet({
		image : 'assets/games/jousting/spritesheet_grass.png',
		width : 400,
		height : 197,
		x : getPixelFromPercent('x', 0),
		y : getPixelFromPercent('y', 55),
		z : 1
	});

	var lanceImageRatio = 1.92517007;
	var lanceImageHeight = getPixelFromPercent('y', 10);
	var lanceImageWidth = getRespectiveWidth(lanceImageHeight, lanceImageRatio);
	var lance = quicktigame2d.createSprite({
		image : 'assets/Joust_TargetingOnTarget.png',
		width : lanceImageWidth, // getPixelFromPercent('x', 30),
		height : lanceImageHeight, // getPixelFromPercent('y', 30)
		x : 0,
		y : 0,
		z : 6
	});
	var horizontal_bar = quicktigame2d.createSprite({
		image : 'assets/games/jousting/horizontal_bar.png',
		width : getPixelFromPercent('x', 5),
		height : getPixelFromPercent('x', 5),
		x : getPixelFromPercent('x', 2.5),//Math.random(0,winWidth),
		y : getPixelFromPercent('y', 5),
		z : 6
	});

	var vertical_bar = quicktigame2d.createSprite({
		image : 'assets/games/jousting/vertical_bar.png',
		width : getPixelFromPercent('x', 5),
		height : getPixelFromPercent('x', 5),
		x : winWidth - getPixelFromPercent('x', 2.5),
		y : getPixelFromPercent('y', 5),
		z : 6
	});
	var balance_bar = quicktigame2d.createSprite({
		image : 'assets/games/jousting/balance_bar.png',
		width : getPixelFromPercent('x', 35),
		height : getPixelFromPercent('x', 35),
		x : getPixelFromPercent('x', 90) - getPixelFromPercent('x', 35),
		y : getPixelFromPercent('y', 90) - getPixelFromPercent('x', 35),
		z : 6
	});
	var bar_button_down = quicktigame2d.createSprite({
		image : 'assets/games/jousting/bar_button_down.png',
		width : getPixelFromPercent('x', 10),
		height : getPixelFromPercent('x', 10),
		x : getPixelFromPercent('x', 10),
		y : getPixelFromPercent('y', 10),
		z : 6
	});

	var bar_button_left = quicktigame2d.createSprite({
		image : 'assets/games/jousting/bar_button_left.png',
		width : getPixelFromPercent('x', 10),
		height : getPixelFromPercent('x', 10),
		x : getPixelFromPercent('x', 100),
		y : getPixelFromPercent('y', 100),
		z : 6
	});

	var bar_button_right = quicktigame2d.createSprite({
		image : 'assets/games/jousting/bar_button_right.png',
		width : getPixelFromPercent('x', 10),
		height : getPixelFromPercent('x',10),
		x : getPixelFromPercent('x', 100),
		y : getPixelFromPercent('y', 100),
		z : 6
	});

	var bar_button_up = quicktigame2d.createSprite({
		image : 'assets/games/jousting/bar_button_up.png',
		width : getPixelFromPercent('x', 10),
		height : getPixelFromPercent('x', 10),
		x : getPixelFromPercent('x', 100),
		y : getPixelFromPercent('y', 100),
		z : 6
	});

	var lance_green = quicktigame2d.createSprite({
		image : 'assets/games/jousting/lance.png',
		width : getPixelFromPercent('x', 30),
		height : getPixelFromPercent('y', 35),
		z : 6
	});

	var knightImageRatio = 1.30612245;
	var knightImageWidth = getPixelFromPercent('x', 20);
	var knightImageHeight = getRespectiveHeight(knightImageWidth, knightImageRatio);
	var knightSprite = {
		width : 196,
		height : 256
	};
	var knight_image_respective_height = getPixelFromPercent('y', 20);
	var knight_image_respective_width = knight_image_respective_height * 0.765625;

	var knight_image = quicktigame2d.createSpriteSheet({
		image : 'assets/games/jousting/ldpi_horse_spritesheet.png',
		width : knightSprite.width,
		height : knightSprite.height,
		x : getPixelFromPercent('x', 100),// - knight_image_respective_width, //39),
		y : getPixelFromPercent('y', 100),// - knight_image_respective_height,
		z : 2
	});
	
	// Create an ImageView.
	var rating_width = getPixelFromPercent('x', 30);
	var rating_height = rating_width / 4.81818182;
	var rating_image = Ti.UI.createImageView({
		// image : 'assets/games/ratings/5_star_ratings.png',
		width : rating_width,
		height : rating_height,

		left :  getPixelFromPercent('x', '34'),
		top : getPixelFromPercent('x', '15') + ((getRespectiveHeight(getPixelFromPercent('x', '50'),1.3)) / 2),

		visible : false,
		zIndex : 990
	});
	window.add(rating_image);
	var rails_image = quicktigame2d.createSpriteSheet({
		image : 'assets/games/jousting/spritesheet_rail.png',
		width : 200,
		height : 187,
		x : 0, //getPixelFromPercent('x', 0),
		y : getPixelFromPercent('y', 52),
		z : 3
	});
	var rail_highlight_image = quicktigame2d.createSprite({
		image : 'assets/games/jousting/rail_highlight.png',
		width : 200,
		height : 187,
		x : 0, //getPixelFromPercent('x', 0),
		y : getPixelFromPercent('y', 52),
		z : 4
	});
	var knight_transformation = quicktigame2d.createTransform();
	var KnightRun = function() {
		setTimeout(function() {
			if(!play_game)
				return;
			lance_green.hide();
			move_sliders_randomly();
			
			if (shot_number > 4) {
				var p1 = (points / 500) * 100;
				var p2 = Math.ceil(5 * (p1 / 100));

					// message.text = "Star ranking : " + p2 + " out of 5.";

				set_quest_complete(p2 * 50, function(quest_name, rewards) {
					if(p2 > 3)
						trumpet_win_sound.play();
					else
						trumpet_lose_sound.play();
						
					message.visible = false;
					alertView.visible = true;
//					alert("Star ranking : " + p2 + " out of 5.");
					switch(p2){
						case 0:
							rating_image.image = '/assets/games/ratings/5_star_ratings_1.png';
							break;
						case 1:
							rating_image.image = '/assets/games/ratings/5_star_ratings_1.png';
							break;
						case 2:
							rating_image.image = '/assets/games/ratings/5_star_ratings_2.png';
							break;
						case 3:
							rating_image.image = '/assets/games/ratings/5_star_ratings_3.png';
							break;
						case 4:
							rating_image.image = '/assets/games/ratings/5_star_ratings_4.png';
							break;
						case 5:
							rating_image.image = '/assets/games/ratings/5_star_ratings_5.png';
							break;
					}
					rating_image.visible = true;

					setTimeout(function(){
						window.close();
					}, 4000);
				});

				knight_image.stop();
				knight_image.clearTransforms();
				bg_image.stop();
				rails_image.stop();

				return;
			}
			if (shot_number > 4 || knight_image == undefined || knight_image == null || knight_image == "" || getPixelFromPercent == undefined || !loop)
				return;

			rails_image.animate([0, 1, 2, 3], 100, -1, 0);
			bg_image.animate([0, 1, 2, 3], 100, -1, 0);
			knight_image.animate([0, 1, 2, 3, 4, 5, 6, 7], 50, -1, 0);
			var knight_image_respective_height = getPixelFromPercent('y', 10);
			var knight_image_respective_width = knight_image_respective_height * 0.765625;
			if (quicktigame2d == undefined || quicktigame2d == null)
				return;
			knight_image.scale((knight_image_respective_width / knightSprite.width), (knight_image_respective_height / knightSprite.height));//, 0, 0);

			knight_image.x = getPixelFromPercent('x', 52) - knight_image_respective_width;
			knight_image.y = getPixelFromPercent('y', 58) - knight_image_respective_height;

			var new_width = knight_image.width * knight_image.scaleX;
			var old_width = knight_image.width;
			
			if(new_width < old_width)
				var new_x = knight_image.x - (old_width - new_width) / 2;
			else if(new_width > old_width)
				var new_x = knight_image.x + (new_width - old_width) / 2;
			
			var new_height = knight_image.height * knight_image.scaleY;
			var old_height = knight_image.height;
			if(new_height < old_height)
				var new_y = knight_image.y - (old_height - new_height) / 2;
			else if(new_height > old_height)
				var new_y = knight_image.y + (new_height - old_height) / 2;
			
			if(old_height != new_height){
				knight_image.x = new_x;
				knight_image.y = new_y;
			}

			if (shot_number == 0)
				knight_image.show();
			
			
			knight_transformation.duration = 3000;
			knight_transformation.easing = quicktigame2d.ANIMATION_CURVE_EASE_IN;
			knight_image_respective_height = getPixelFromPercent('y', 90);
			knight_image_respective_width = knight_image_respective_height * 0.765625;
			
			knight_transformation.scaleX = (knight_image_respective_width / knightSprite.width) * 1.5;
			knight_transformation.scaleY = (knight_image_respective_height / knightSprite.height) * 1.5;

			knight_transformation.move(getPixelFromPercent('x', 0) - knight_image_respective_width, getPixelFromPercent('y', 55));
			if(sound_settings == 'ON'){
				horse_gollap_noise_sound.play();
				horse_gollap_noise_sound.setLooping(true);
			}
				
			knight_image.transform(knight_transformation);
			shot_number++;
			shot_number_label.text = "Shot # " + shot_number;
		}, 3000);
	};
	knight_transformation.addEventListener('complete', function(e) {
		knight_image.stop();
		knight_image.clearTransforms();
		horse_gollap_noise_sound.stop();
		rails_image.stop();
		bg_image.stop();
		message.visible = true;
		alertView.visible = true;
		message.text = 'You have earned '+curr_points+' more points.\nGet ready for the next shot.';
		setTimeout(function(){
			if(!play_game)
				return;
			message.visible = true;
			alertView.visible = true;
			setTimeout(function(){
				if(!play_game)
					return;
				message.visible = false;
				alertView.visible = false;
				KnightRun();
			},3000);
		},1000);
	});
	// Onload event is called when the game is loaded.
	game.addEventListener('onload', function(e) {
		// We should calculate the view scale because game.size.width and height may be changed due to the parent layout.
		TOUCH_SCALE = game.screen.width / game.size.width;
		// Enable MultiTouch support
		game.registerForMultiTouch();
		//actInd.hide();
		game.start();
	});

	var _url = "http://bonozo.com:8080/knp/knp_assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "&" + "assign_to_uid=" + userinfo.Record[0].UID + "&" + "quest_ids=" + quest_id + "&message=Single Player Game&num_of_hours=3&status=SINGLE_PLAYER_GAME";
	var items_json = "";
	var items_length = 0;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				_assign_quest_id = items_json.Record[0].ASSIGN_QUEST_ID;
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : _url
	});

	var sprite_count = 0;
	game.addEventListener('onloadsprite', function(e) {
		sprite_count++;
		//alert('Sprite Load! '+sprite_count);
	});
	
	var flag = 0;
	var flag2 = 0;
	var knight_image_ratio = 1.30612245;
	
	var horizontal_bar_left_to_right = quicktigame2d.createTransform();
	var horizontal_bar_right_to_left = quicktigame2d.createTransform();
	var vertical_bar_top_to_bottom = quicktigame2d.createTransform();
	var vertical_bar_bottom_to_top = quicktigame2d.createTransform();

	
	var bar_move_first_iteration = true;

	function randomXToY(minVal, maxVal) {
		var randVal = minVal + (Math.random() * (maxVal - minVal));
		return Math.round(randVal);
	}
	var current_random_slider_x;
	var current_random_slider_y;
	var slider_move_right = true;
	var slider_move_left = true;
	
	function get_random_x_value(){
		current_random_slider_x = randomXToY(0,balance_bar.width);
	}
	function get_random_y_value(){
		current_random_slider_y = randomXToY(0,balance_bar.height);
	}
	var move_sliders_randomly = function(){
		setTimeout(function(){
			if(!play_game)
				return;
			horizontal_bar.x = (slider_move_right)
			
		},25);
		
		balance_bar.x = getPixelFromPercent('x', 90) - getPixelFromPercent('x', 35);
		balance_bar.y = getPixelFromPercent('y', 90) - getPixelFromPercent('x', 35);
		
		horizontal_bar.y = balance_bar.y + (balance_bar.height / 2) - (horizontal_bar.height / 2);
		vertical_bar.x = balance_bar.x + (balance_bar.width / 2) - (vertical_bar.width / 2);
		horizontal_bar.x = balance_bar.x;
		vertical_bar.y = balance_bar.y;

		bar_button_down.x = balance_bar.x + (balance_bar.width / 2) - (bar_button_down.width / 2);
		bar_button_down.y = balance_bar.y + balance_bar.height - (bar_button_down.height / 2);
		
		bar_button_up.x = balance_bar.x + (balance_bar.width / 2) - (bar_button_up.width / 2);
		bar_button_up.y = balance_bar.y - (bar_button_down.height / 2);
		
		bar_button_left.x = balance_bar.x - (bar_button_left.width / 2);
		bar_button_left.y = balance_bar.y + (balance_bar.height / 2) - (bar_button_left.height / 2);
		
		bar_button_right.x = balance_bar.x + balance_bar.width - (bar_button_right.width / 2);
		bar_button_right.y = balance_bar.y + (balance_bar.height / 2) - (bar_button_right.height / 2);
		
		var new_x = balance_bar.x + randomXToY((balance_bar.width / 2),balance_bar.width);
		horizontal_bar_left_to_right.duration = (new_x - horizontal_bar.x) * 5;
		horizontal_bar_left_to_right.x = new_x;
		horizontal_bar.transform(horizontal_bar_left_to_right);

		var new_y = balance_bar.y + randomXToY((balance_bar.height / 2),balance_bar.height);
		vertical_bar_top_to_bottom.duration = (vertical_bar.y - new_y) * 5;
		vertical_bar_top_to_bottom.y = balance_bar.y + balance_bar.height - randomXToY(0,(balance_bar.height / 2));//Math.ceil(Math.random(0, (balance_bar.height / 2)));
		vertical_bar.transform(vertical_bar_top_to_bottom);

	}
	horizontal_bar_left_to_right.addEventListener('complete',function(){
		var new_x = balance_bar.x + balance_bar.width;//randomXToY(0,balance_bar.width);
		horizontal_bar_right_to_left.duration = ((horizontal_bar.x > new_x))?(horizontal_bar.x - new_x) * 5 : (new_x - horizontal_bar.x) * 50;
		horizontal_bar_right_to_left.x = new_x;// balance_bar.x + randomXToY(0,(balance_bar.width / 2));//Math.ceil(Math.random(0, (balance_bar.width / 2)));
		horizontal_bar.transform(horizontal_bar_right_to_left);
	});
	horizontal_bar_right_to_left.addEventListener('complete',function(){
		var new_x = balance_bar.x;// + randomXToY(0,balance_bar.width);
		horizontal_bar_left_to_right.duration = ((horizontal_bar.x > new_x))?(horizontal_bar.x - new_x) * 5 : (new_x - horizontal_bar.x) * 5;
		horizontal_bar_left_to_right.x = new_x;
		horizontal_bar.transform(horizontal_bar_left_to_right);
	});
	vertical_bar_top_to_bottom.addEventListener('complete',function(){
		var new_y = balance_bar.y + balance_bar.height;// randomXToY(0, balance_bar.height);
		vertical_bar_bottom_to_top.duration = (vertical_bar.y > new_y)?(vertical_bar.y - new_y) * 5 : (new_y - vertical_bar.y) * 5;
		vertical_bar_bottom_to_top.y = new_y;
		vertical_bar.transform(vertical_bar_bottom_to_top);
	});
	vertical_bar_bottom_to_top.addEventListener('complete',function(){
		var new_y = balance_bar.y;// + randomXToY(0, balance_bar.height);
		vertical_bar_top_to_bottom.duration = (vertical_bar.y > new_y)?(vertical_bar.y - new_y) * 10 : (new_y - vertical_bar.y) * 10;
		vertical_bar_top_to_bottom.y = new_y;
		vertical_bar.transform(vertical_bar_top_to_bottom);
	});
	window.addEventListener("open", function() {

		
		jousting_battle_music.play();
		jousting_battle_music.setLooping(true);

		lance_green.hide();
		scene.add(lance_green);
		 
		var sky_image_respective_height = getPixelFromPercent('y', 55);
		var sky_image_respective_width = knight_image_respective_height * 2;
		
		sky_image.x = 0;//- (sky_image_respective_width - winWidth) / 2;
		sky_image.y = 0;
		sky_image.scaleFromCenter(ScaleSpriteFromPercentage(winHeight, 200, 55), ScaleSpriteFromPercentage(winHeight, 200, 55), 0, 0);
		scene.add(sky_image);
		
		var knight_image_respective_height = getPixelFromPercent('y', 20);
		var knight_image_respective_width = knight_image_respective_height * 0.765625;
		
		knight_image.x = getPixelFromPercent('x', 52) - knight_image_respective_width;
		knight_image.y = getPixelFromPercent('y', 58) - knight_image_respective_height;
		knight_image.hide();
		knight_image.animate([0, 1, 2, 3, 4, 5, 6, 7], 50, -1, 0);
		scene.add(knight_image);
		
		move_sliders_randomly();
		//move_bars_randomly();
		balance_bar.x = getPixelFromPercent('x', 90) - getPixelFromPercent('x', 35);
		balance_bar.y = getPixelFromPercent('y', 90) - getPixelFromPercent('x', 35);
		scene.add(balance_bar);
		
		bar_button_down.x = balance_bar.x + (balance_bar.width / 2) - (bar_button_down.width / 2);
		bar_button_down.y = balance_bar.y + balance_bar.height - (bar_button_down.height / 2);
		scene.add(bar_button_down);
		
		bar_button_up.x = balance_bar.x + (balance_bar.width / 2) - (bar_button_up.width / 2);
		bar_button_up.y = balance_bar.y - (bar_button_down.height / 2);
		scene.add(bar_button_up);
		
		bar_button_left.x = balance_bar.x - (bar_button_left.width / 2);
		bar_button_left.y = balance_bar.y + (balance_bar.height / 2) - (bar_button_left.height / 2);
		scene.add(bar_button_left);
		
		bar_button_right.x = balance_bar.x + balance_bar.width - (bar_button_right.width / 2);
		bar_button_right.y = balance_bar.y + (balance_bar.height / 2) - (bar_button_right.height / 2);
		scene.add(bar_button_right);
		
		vertical_bar.x = balance_bar.x + (balance_bar.width / 2) - (vertical_bar.width / 2);
		horizontal_bar.y = balance_bar.y + (balance_bar.height / 2) - (horizontal_bar.height / 2);

		scene.add(horizontal_bar);
		scene.add(vertical_bar);

		KnightRun();
		rails_image.animate([0, 1, 2, 3], 100, -1, 0);
		bg_image.animate([0, 1, 2, 3], 100, -1, 0);
		
		bg_image.scaleFromCenter(ScaleSpriteFromPercentage(winWidth, 400, 100), ScaleSpriteFromPercentage(winHeight, 197, 45), 0, 0);
		scene.add(bg_image);
		rail_highlight_image.alpha = 0.5;
		rail_highlight_image.scaleFromCenter(ScaleSpriteFromPercentage(winWidth, 200, 50), ScaleSpriteFromPercentage(winHeight, 187, 48), 0, 0);
		scene.add(rail_highlight_image);
		
		rails_image.scaleFromCenter(ScaleSpriteFromPercentage(winWidth, 200, 50), ScaleSpriteFromPercentage(winHeight, 187, 48), 0, 0);
		scene.add(rails_image);
		var activity = window.activity;
		
		activity.addEventListener('resume', function(e) {
		});
		activity.addEventListener('pause', function(e) {
			play_game = false;
			jousting_battle_music.stop();
			horse_gollap_noise_sound.stop();
			KnightRun = function() {
			};
		});
		activity.addEventListener('destroy', function(e) {
		});
	});
	game.addEventListener('click', function(e) {
		return;

		if (!played) {
			alert(_assign_quest_id);
		} else {
			alert('You have already played this quest!\nPress back button');
		}
	});
	function set_quest_complete(num_of_golds, callback) {
		_url = "http://bonozo.com:8080/knp/knp_set_quest_status.php?game_status=COMPLETE&quest_status=" + quest_status + "&assign_quest_id=" + _assign_quest_id + "&quest_id=" + quest_id + "&uid=" + userinfo.Record[0].UID + "&friend_uid=" + userinfo.Record[0].UID + "";
		httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				if (items_json.Record != undefined) {
					if (items_json.Record[0].Message == 'Updated!') {
						Ti.App.fireEvent('game_played', {
							status : 'complete'
						});
						var index = 0;
						var quest_name = '';
						var rewards = '';
						for (var key in items_json.Record[0]) {
							if (items_json.Record[0].hasOwnProperty(key)) {
								var rewards_earned = key + " -> " + items_json.Record[0][key];
								if (index == 1) {
									quest_name = items_json.Record[0][key];
								} else if (index > 1) {
									rewards += '\n' + key + '(' + items_json.Record[0][key] + ')';
								}
							}
							index++;
						}
						_url = "http://bonozo.com:8080/knp/earned_quest_rewards.php?uid=" + userinfo.Record[0].UID + "&assign_quest_id=" + _assign_quest_id + "&inv_id=10004&qty=" + num_of_golds + "";
						httpclientt.requestServer({
							success : function(e) {
								items_json = JSON.parse(this.responseText);
								if (items_json.Record != undefined) {
									if (items_json.Record.Message != "") {
										callback(quest_name, rewards);
										//self.close();
									}
								}
								Ti.App.fireEvent('update_xp', {
									clicked_item : 'StatusScreen'
								});
							},
							method : 'GET',
							contentType : 'text/xml',
							url : _url,
						});
						//self.close();
					}
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

	// Create a Label.
	var somelabel = Ti.UI.createLabel({
		text : 'somelabel',
		visible : false,
		color : '#000000',
		font : {
			fontSize : '14dp'
		},
		top : 0,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		zIndex : 500
	});

	// Add to the parent view.
	window.add(somelabel);

	var tapped = false;
	var bar_up_botton_tapped = false;
	var bar_down_botton_tapped = false;
	var bar_left_botton_tapped = false;
	var bar_right_botton_tapped = false;
	game.addEventListener('touchstart', function(e) {
		if(sound_settings == 'ON')
			whoosh_sound.play();
		lance_green.x = e.x;
		lance_green.y = e.y;
		
		tapped = false;
		var coordinates = {
			x : e.x, 
			y : e.y
		};

		var bar_up_botton = {
			left : bar_button_up.x,
			top : bar_button_up.y,
			width : bar_button_up.width,
			height : bar_button_up.height
		};
		var bar_down_botton = {
			left : bar_button_down.x,
			top : bar_button_down.y,
			width : bar_button_down.width,
			height : bar_button_down.height
		};
		var bar_left_botton = {
			left : bar_button_left.x,
			top : bar_button_left.y,
			width : bar_button_left.width,
			height : bar_button_left.height
		};
		var bar_right_botton = {
			left : bar_button_right.x,
			top : bar_button_right.y,
			width : bar_button_right.width,
			height : bar_button_right.height
		};
		var transform  = quicktigame2d.createTransform();
		transform.duration = 200;

		if(isCollide(coordinates,bar_up_botton)){
			transform.y = vertical_bar.y - 5;
			vertical_bar.transform(transform);
			return;
		}
		if(isCollide(coordinates,bar_down_botton)){
			transform.y = vertical_bar.y + 5;
			vertical_bar.transform(transform);
			return;
		}
		if(isCollide(coordinates,bar_left_botton)){
			transform.x = vertical_bar.x - 5;
			horizontal_bar.transform(transform);
			return;
		}
		if(isCollide(coordinates,bar_right_botton)){
			transform.x = vertical_bar.x + 5;
			horizontal_bar.transform(transform);
			return;
		}
		
		return;
		if (knight_image.contains(e.x, e.y)) {
			
			var new_width = knight_image.width * knight_image.scaleX;
			var old_width = knight_image.width;
			var new_x = knight_image.x - (new_width - old_width) / 2;
						
			var new_height = knight_image.height * knight_image.scaleY;
			var old_height = knight_image.height;
			var new_y = knight_image.y - (new_height - old_height) / 2;

			if(old_width == new_width){
				var new_x = knight_image.x;
				var new_y = knight_image.y;
			}
			somelabel.text = "(" + new_x + ", " + new_y + ")";
			var knight_params = {
				x : new_x,
				y : new_y,
				width : knight_image.width * knight_image.scaleX,
				height : knight_image.height * knight_image.scaleY
			};
			somelabel.text = "(" + lance_green.x + ", " + lance_green.y + ")";
			var lance_params = {
				x : lance_green.x,
				y : lance_green.y
			};
			knight_image.stop();
			rails_image.stop();
			bg_image.stop();
			knight_image.stop();
			horse_gollap_noise_sound.stop();
			knight_image.clearTransforms();
			collisionDetection_knight_lance(knight_params, lance_params);
		}
		return;
		tapped = true;
		lance_green.x = e.x - (lance_green.width / 2);
		lance_green.y = e.y - (lance_green.height / 2);
		lance_green.show();
		somelabel.text = "(" + lance_green.x + ", " + lance_green.y + ")";
	});
	game.addEventListener('touchmove', function(e) {
	});
	game.addEventListener('touchend', function(e) {
	});
	var JoustingKnightSkinParams = require('/ui/common/games/JoustingKnightSkinParams');
	var knight_skin_params = new JoustingKnightSkinParams();

	var isCollide = function(lance_param, rectange) {
		if (lance_param.x >= rectange.left && lance_param.x <= (rectange.left + rectange.width) && (lance_param.y >= rectange.top && lance_param.y <= (rectange.top + rectange.height)))
			return true;
		return false;
	};
	var collisionDetection_knight_lance = function(_knight_params, lance_params) {
		var current_knight_head_params = {
			left : _knight_params.x + (knight_skin_params.head.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.head.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.head.width / 100),
			height : (_knight_params.height * knight_skin_params.head.height / 100)
		};
		var current_knight_shoulder_left_params = {
			left : _knight_params.x + (knight_skin_params.shoulder_left.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.shoulder_left.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.shoulder_left.width / 100),
			height : (_knight_params.height * knight_skin_params.shoulder_left.height / 100)
		};
		var current_knight_shoulder_right_params = {
			left : _knight_params.x + (knight_skin_params.shoulder_right.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.shoulder_right.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.shoulder_right.width / 100),
			height : (_knight_params.height * knight_skin_params.shoulder_right.height / 100)
		};
		var current_knight_arm_right_params = {
			left : _knight_params.x + (knight_skin_params.arm_right.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.arm_right.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.arm_right.width / 100),
			height : (_knight_params.height * knight_skin_params.arm_right.height / 100)
		};
		var current_knight_shield_1_params = {
			left : _knight_params.x + (knight_skin_params.shield_1.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.shield_1.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.shield_1.width / 100),
			height : (_knight_params.height * knight_skin_params.shield_1.height / 100)
		};
		var current_knight_shield_2_params = {
			left : _knight_params.x + (knight_skin_params.shield_2.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.shield_2.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.shield_2.width / 100),
			height : (_knight_params.height * knight_skin_params.shield_2.height / 100)
		};
		var current_knight_shield_3_params = {
			left : _knight_params.x + (knight_skin_params.shield_3.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.shield_3.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.shield_3.width / 100),
			height : (_knight_params.height * knight_skin_params.shield_3.height / 100)
		};
		var current_knight_shield_4_params = {
			left : _knight_params.x + (knight_skin_params.shield_4.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.shield_4.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.shield_4.width / 100),
			height : (_knight_params.height * knight_skin_params.shield_4.height / 100)
		};
		var current_knight_leg_left_params = {
			left : _knight_params.x + (knight_skin_params.leg_left.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.leg_left.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.leg_left.width / 100),
			height : (_knight_params.height * knight_skin_params.leg_left.height / 100)
		};
		var current_knight_leg_right_1_params = {
			left : _knight_params.x + (knight_skin_params.leg_right_1.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.leg_right_1.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.leg_right_1.width / 100),
			height : (_knight_params.height * knight_skin_params.leg_right_1.height / 100)
		};
		var current_knight_leg_right_2_params = {
			left : _knight_params.x + (knight_skin_params.leg_right_2.left * _knight_params.width / 100),
			top : _knight_params.y + (knight_skin_params.leg_right_2.top * _knight_params.height / 100),
			width : (_knight_params.width * knight_skin_params.leg_right_2.width / 100),
			height : (_knight_params.height * knight_skin_params.leg_right_2.height / 100)
		};

		if (isCollide(lance_params, current_knight_head_params)) {
			points_label.text = "Total points : " + (points += 50);
			curr_points = 50;
			message.text = 'You have earned '+curr_points+' more points.\nGet ready for the next shot.';
		} else if (isCollide(lance_params, current_knight_shoulder_left_params) || isCollide(lance_params, current_knight_shoulder_right_params) || isCollide(lance_params, current_knight_arm_right_params)) {
			points_label.text = "Total points : " + (points += 75);
			curr_points = 75;
			message.text = 'You have earned '+curr_points+' more points.\nGet ready for the next shot.';
		} else if (isCollide(lance_params, current_knight_shield_1_params) || isCollide(lance_params, current_knight_shield_2_params) || isCollide(lance_params, current_knight_shield_3_params) || isCollide(lance_params, current_knight_shield_4_params)) {
			points_label.text = "Total points : " + (points += 100);
			if(sound_settings == 'ON')
				metal_bang_sound.play();
			curr_points = 100;
			message.text = 'You have earned '+curr_points+' more points.\nGet ready for the next shot.';
		} else if (isCollide(lance_params, current_knight_leg_left_params) || isCollide(lance_params, current_knight_leg_right_1_params) || isCollide(lance_params, current_knight_leg_right_2_params)) {
			points_label.text = "Total points : " + (points += 25);
			curr_points = 25;
			message.text = 'You have earned '+curr_points+' more points.\nGet ready for the next shot.';
		}
		else{
			message.text = 'You earned no more points.\nGet ready for the next shot.';
		}
		setTimeout(function(){
			if(!play_game)
				return;
			message.visible = true;
			alertView.visible = true;
			setTimeout(function(){
				if(!play_game)
					return;
				message.visible = false;
				alertView.visible = false;
				KnightRun();
			},3000);
		},1000);
		
	};
	
	// var scroll_width = getPixelFromPercent('x', 70);
	// var scroll_height = scroll_height * 1.3;
	var alertView = Ti.UI.createImageView({
		image : '/assets/games/scroll.png',
		width : getPixelFromPercent('x', '50'),
		height :getRespectiveHeight(getPixelFromPercent('x', '50'),1.3),
		visible : false,
		top : '10%',
		zIndex : 900
	});
	window.add(alertView);
	// Create a Label.
	var message = Ti.UI.createLabel({
		color : '#000000',
		font : {
			fontSize : '12dip',
			fontWeight : 'bold'
		},
		textAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		left :  getPixelFromPercent('x', '30'),
		top : '15%',
		visible : false,
		width : getPixelFromPercent('x', '40'),
		height : getRespectiveHeight(getPixelFromPercent('x', '40'),1.3),
		zIndex : 950
	});
	window.add(message);
	var ok_button = Ti.UI.createButton({
		title : 'Ok',
		color : '#000000',
		textAlign : 'center',
		bottom : '10%',
		height : '20%',
		width : '33%',
		visible : false,
		left : '33%',
		backgroundImage : '/assets/button_small_UP.png'
	});
	ok_button.addEventListener('click', function(e) {
		KnightRun();
	});
	window.add(ok_button);

	window.add(game);
	window.open({
		fullscreen : true,
		navBarHidden : true
	});
	return window;

}

module.exports = JoustinGamePlay;
