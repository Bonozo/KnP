function JoustinGamePlay(quest_status, quest_id, userinfo) {
	var osname = Ti.Platform.osname;
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
	var horse_gollap_noise_sound = Titanium.Media.createSound({
		url : '/sounds/horse_gollap_noise.mp3',
		looping : true
	});
	var whoosh_sound = Titanium.Media.createSound({
		url : '/sounds/whoosh.mp3'
	});

	var shot_number = 0; var points = 0; var curr_points = 0;
	var played = false;
	var horizontal_bar_points_region;
	var vertical_bar_points_region;
	
	var scene = quicktigame2d.createScene();

	// add your scene to game view
	game.pushScene(scene);
	var timer = 0;
	var TOUCH_SCALE = 1;

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
		tag : "scoreboard",
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
		tag : "sky",
		x : getPixelFromPercent('x', 100),
		y : getPixelFromPercent('y', 100),
		z : 0
	});

	var bg_image = quicktigame2d.createSpriteSheet({
		image : 'assets/games/jousting/spritesheet_grass.png',
		width : 400,
		height : 197,
		tag : "spritesheet_grass",
		x : getPixelFromPercent('x', 0),
		y : getPixelFromPercent('y', 55),
		z : 1
	});

	var lanceImageRatio = 1.92517007;
	var lanceImageHeight = getPixelFromPercent('y', 10);
	var lanceImageWidth = getRespectiveWidth(lanceImageHeight, lanceImageRatio);
	var lance = quicktigame2d.createSprite({
		image : 'assets/Joust_TargetingOnTarget.png',
		width : lanceImageWidth, 
		height : lanceImageHeight, 
		tag : "lance",
		x : 0,
		y : 0,
		z : 6
	});
	var horizontal_bar = quicktigame2d.createSprite({
		image : 'assets/games/jousting/horizontal_bar.png',
		width : getPixelFromPercent('x', 5),
		height : getPixelFromPercent('x', 5),
		tag : "horizontal_bar",
		x : getPixelFromPercent('x', 100),//Math.random(0,winWidth),
		y : getPixelFromPercent('y', 100),
		z : 7
	});
	var vertical_bar = quicktigame2d.createSprite({
		image : 'assets/games/jousting/vertical_bar.png',
		width : getPixelFromPercent('x', 5),
		height : getPixelFromPercent('x', 5),
		tag : "vertical_bar",
		x : getPixelFromPercent('x', 100),
		y : getPixelFromPercent('y', 100),
		z : 7
	});
	var balance_bar = quicktigame2d.createSprite({
		image : 'assets/games/jousting/balance_bar.png',
		width : getPixelFromPercent('x', 35),
		height : getPixelFromPercent('x', 35),
		tag : "balance_bar",
		x : getPixelFromPercent('x', 90) - getPixelFromPercent('x', 35),
		y : getPixelFromPercent('y', 90) - getPixelFromPercent('x', 35),
		z : 7
	});
	var bar_button_down = quicktigame2d.createSprite({
		image : 'assets/games/jousting/bar_button_down.png',
		width : getPixelFromPercent('x', 10),
		height : getPixelFromPercent('x', 10),
		tag : "bar_button_down",
		x : getPixelFromPercent('x', 10),
		y : getPixelFromPercent('y', 10),
		z : 8
	});

	var bar_button_left = quicktigame2d.createSprite({
		image : 'assets/games/jousting/bar_button_left.png',
		width : getPixelFromPercent('x', 10),
		height : getPixelFromPercent('x', 10),
		tag : "bar_button_left",
		x : getPixelFromPercent('x', 100),
		y : getPixelFromPercent('y', 100),
		z : 8
	});

	var bar_button_right = quicktigame2d.createSprite({
		image : 'assets/games/jousting/bar_button_right.png',
		width : getPixelFromPercent('x', 10),
		height : getPixelFromPercent('x',10),
		tag : "bar_button_right",
		x : getPixelFromPercent('x', 100),
		y : getPixelFromPercent('y', 100),
		z : 8
	});

	var bar_button_up = quicktigame2d.createSprite({
		image : 'assets/games/jousting/bar_button_up.png',
		width : getPixelFromPercent('x', 10),
		height : getPixelFromPercent('x', 10),
		tag : "bar_button_up",
		x : getPixelFromPercent('x', 100),
		y : getPixelFromPercent('y', 100),
		z : 8
	});

	var lance_green = quicktigame2d.createSprite({
		image : 'assets/games/jousting/lance.png',
		width : 298,
		height : 534,
		tag : "lance_green",
		z : 7
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
		tag : "knight_image",
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
		tag : "rails_image",
		x : 0, //getPixelFromPercent('x', 0),
		y : getPixelFromPercent('y', 52),
		z : 3
	});
	var rail_highlight_image = quicktigame2d.createSprite({
		image : 'assets/games/jousting/rail_highlight.png',
		width : 200,
		height : 187,
		tag : "rail_highlight_image",
		x : 0, //getPixelFromPercent('x', 0),
		y : getPixelFromPercent('y', 52),
		z : 4
	});
	var knight_transformation = quicktigame2d.createTransform();
	var KnightRun = function() {
		rails_image.animate([0, 1, 2, 3], 100, -1, 0);
		bg_image.animate([0, 1, 2, 3], 100, -1, 0);
		knight_image.hide();
		knight_image.animate([0, 1, 2, 3, 4, 5, 6, 7], 50, -1, 0);
		var knight_image_respective_height = getPixelFromPercent('y', 10);
		var knight_image_respective_width = knight_image_respective_height * 0.765625;
		if (quicktigame2d == undefined || quicktigame2d == null)
			return;
		knight_image.scale((knight_image_respective_width / knightSprite.width), (knight_image_respective_height / knightSprite.height));//, 0, 0);
		if (shot_number > 4) {
			var p1 = (points / 500) * 100;
			var p2 = Math.ceil(5 * (p1 / 100));

			set_quest_complete(p2 * 50, function(quest_name, rewards) {
				if(p2 > 3)
					trumpet_win_sound.play();
				else
					trumpet_lose_sound.play();
					
				message.visible = false;
				// message.top -= getPixelFromPercent('y',5);
				// message.text = "You have earned " + points + "points.";
				// message.visible = true;
				alertView.visible = true;
				horizontal_bar.hide();
				vertical_bar.hide();
				balance_bar.hide();
				lance_green.hide();
				bar_button_down.hide();
				bar_button_left.hide();
				bar_button_right.hide();
				bar_button_up.hide();
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
		else{
			horizontal_bar.show();
			vertical_bar.show();
			balance_bar.show();
			bar_button_down.show();
			bar_button_left.show();
			bar_button_right.show();
			bar_button_up.show();
			knight_image.x = getPixelFromPercent('x', 52) - knight_image_respective_width;
			knight_image.y = getPixelFromPercent('y', 58) - knight_image_respective_height;
			move_sliders_randomly();
		}

		lance_hit = false;
		setTimeout(function() {
			if(!play_game)
				return;
			//lance_green.hide();
			if (shot_number > 4 || knight_image == undefined || knight_image == null || knight_image == "" || getPixelFromPercent == undefined || !loop)
				return;
			
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
		message.text = 'You have earned '+curr_points+' more points.\nGet ready for the next shot.';
		setTimeout(function(){
			if(!play_game)
				return;
			message.visible = true;
			alertView.visible = true;
			horizontal_bar.hide();
			vertical_bar.hide();
			balance_bar.hide();
			bar_button_down.hide();
			bar_button_left.hide();
			bar_button_right.hide();
			lance_green.hide();
			bar_button_up.hide();
			setTimeout(function(){
				if(!play_game)
					return;
				message.visible = false;
				alertView.visible = false;
				horizontal_bar.show();
				vertical_bar.show();
				balance_bar.show();
				bar_button_down.show();
				bar_button_left.show();
				bar_button_right.show();
				bar_button_up.show();
				lance_green.show();
			},3000);
		},3000);
	});
	// Onload event is called when the game is loaded.
	game.addEventListener('onload', function(e) {
		// We should calculate the view scale because game.size.width and height may be changed due to the parent layout.
		TOUCH_SCALE = game.screen.width / game.size.width;
		// Enable MultiTouch support
		game.registerForMultiTouch();
		//actInd.hide();
		game.start();
		

		lance_green.hide();
		scene.add(lance_green);

		sky_image.x = 0;
		sky_image.y = 0;
		sky_image.scaleFromCenter(ScaleSpriteFromPercentage(winHeight, 200, 55), ScaleSpriteFromPercentage(winHeight, 200, 55), 0, 0);
		scene.add(sky_image);
		
		var knight_image_respective_height = getPixelFromPercent('y', 20);
		var knight_image_respective_width = (knight_image_respective_height * 0.765625);
		
		knight_image.x = getPixelFromPercent('x', 52) - knight_image_respective_width;
		knight_image.y = getPixelFromPercent('y', 58) - knight_image_respective_height;
		knight_image.hide();
		knight_image.animate([0, 1, 2, 3, 4, 5, 6, 7], 50, -1, 0);
		scene.add(knight_image);
		
		balance_bar.x = getPixelFromPercent('x', 90) - getPixelFromPercent('x', 35);
		balance_bar.y = getPixelFromPercent('y', 90) - getPixelFromPercent('x', 35);
		scene.add(balance_bar);
		horizontal_bar_points_region = {
			x_left : balance_bar.x + (25 * balance_bar.width * balance_bar.scaleX / 100),
			x_right : balance_bar.x + (75 * balance_bar.width * balance_bar.scaleX / 100),
			x_width : (balance_bar.x + (75 * balance_bar.width * balance_bar.scaleX / 100)) - (balance_bar.x + (75 * balance_bar.width * balance_bar.scaleX / 100)) 
		};
		vertical_bar_points_region = {
			y_top : balance_bar.y + (25 * balance_bar.height * balance_bar.scaleY / 100),
			y_bottom : balance_bar.y + (75 * balance_bar.height * balance_bar.scaleY / 100),
			y_height : (balance_bar.y + (75 * balance_bar.height * balance_bar.scaleY / 100)) - (balance_bar.y + (25 * balance_bar.height * balance_bar.scaleY / 100))
		};
		
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
		vertical_bar.y = balance_bar.y;
		
		horizontal_bar.x = balance_bar.x;
		horizontal_bar.y = balance_bar.y + (balance_bar.height / 2) - (horizontal_bar.height / 2);

		scene.add(horizontal_bar);
		scene.add(vertical_bar);
		
		move_sliders_randomly();
		
		rails_image.animate([0, 1, 2, 3], 100, -1, 0);
		bg_image.animate([0, 1, 2, 3], 100, -1, 0);
		
		bg_image.scaleFromCenter(ScaleSpriteFromPercentage(winWidth, 400, 100), ScaleSpriteFromPercentage(winHeight, 197, 45), 0, 0);
		scene.add(bg_image);
		rail_highlight_image.alpha = 0.5;
		rail_highlight_image.scaleFromCenter(ScaleSpriteFromPercentage(winWidth, 200, 50), ScaleSpriteFromPercentage(winHeight, 187, 48), 0, 0);
		scene.add(rail_highlight_image);
		
		/*
		x : 0, //getPixelFromPercent('x', 0),
		y : getPixelFromPercent('y', 52),
		 */
		lance_green.x = 0;//getPixelFromPercent('x',10);
		lance_green.y = getPixelFromPercent('y', 40);
		lance_green.scaleFromCenter(ScaleSpriteFromPercentage(winWidth, 298, 64),ScaleSpriteFromPercentage(winHeight, 534, 64), 0, 0);
		lance_green.show();
		
		rails_image.scaleFromCenter(ScaleSpriteFromPercentage(winWidth, 200, 50), ScaleSpriteFromPercentage(winHeight, 187, 48), 0, 0);
		scene.add(rails_image);
		

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
	var sprites_tag = [
		"scoreboard",
		"sky",
		"spritesheet_grass",
		"lance",
		"horizontal_bar",
		"vertical_bar",
		"balance_bar",
		"bar_button_down",
		"bar_button_left",
		"bar_button_right",
		"bar_button_up",
		"lance_green",
		"knight_image",
		"rails_image",
		"rail_highlight_image"
	];
	var loaded_sprites = 0;
	
	var flag = 0;
	var flag2 = 0;
	var knight_image_ratio = 1.30612245;
	
	function randomXToY(minVal, maxVal) {
		var randVal = minVal + (Math.random() * (maxVal - minVal));
		return Math.round(randVal);
	}
	var current_random_slider_x = randomXToY(balance_bar.x, (balance_bar.x + balance_bar.width));
	var current_random_slider_y = randomXToY(balance_bar.y, (balance_bar.y + balance_bar.height));
	var slider_move_right = true;
	var slider_move_bottom = true;
	var smallest_move = 3;
	
	function get_random_x_value(){
		return (balance_bar.x + balance_bar.width);//randomXToY(balance_bar.x, (balance_bar.x + balance_bar.width));
	}
	function get_random_y_value(){
		return randomXToY(balance_bar.y, (balance_bar.y + balance_bar.height));
	}
	var lance_hit = false;
	var move_sliders_randomly = function(){
		setTimeout(function(){
			if(!play_game)
				return;
			if(slider_move_right){
				horizontal_bar.x += smallest_move;
				lance_green.x += smallest_move;
				Ti.API.info(horizontal_bar.x + ' >= ' + current_random_slider_x);
				if(horizontal_bar.x >= current_random_slider_x){
					slider_move_right = false;
					current_random_slider_x = randomXToY(balance_bar.x, (balance_bar.x + (balance_bar.width / 2)));
				}
			}
			else{
				horizontal_bar.x -= smallest_move;
				lance_green.x -= smallest_move;
				if(horizontal_bar.x <= current_random_slider_x){
					slider_move_right = true;
					current_random_slider_x = randomXToY(balance_bar.x + (balance_bar.width / 2), (balance_bar.x + balance_bar.width));
				}
			}
			if(slider_move_bottom){
				vertical_bar.y += smallest_move;
				lance_green.y += smallest_move;
				if(vertical_bar.y >= current_random_slider_y){
					slider_move_bottom = false;
					current_random_slider_y = randomXToY(balance_bar.y, (balance_bar.y + (balance_bar.height / 2)));
				}
			}
			else{
				vertical_bar.y -= smallest_move;
				lance_green.y -= smallest_move;
				if(vertical_bar.y <= current_random_slider_y){
					slider_move_bottom = true;
					current_random_slider_y = randomXToY(balance_bar.y + (balance_bar.height / 2), (balance_bar.y + balance_bar.height));
				}
			}
			
			var new_width = knight_image.width * knight_image.scaleX;
			var old_width = knight_image.width;
			var new_x = knight_image.x - (new_width - old_width) / 2;
			
			var new_height = knight_image.height * knight_image.scaleY;
			var old_height = knight_image.height;
			var new_y = knight_image.y - (new_height - old_height) / 2;

			var knight_params = {
				center_x : new_x + (knight_image.width * knight_image.scaleX / 2),
				center_y : new_y + (knight_image.height * knight_image.scaleY / 2)
			};
			if(
				knight_params.center_x >= (getPixelFromPercent('x', 5)) && 
				knight_params.center_x <= getPixelFromPercent('x',15) && 
				!lance_hit// &&
			   	// (knight_params.center_y >= (rail_highlight_image.y + (40 * (rail_highlight_image.height * rail_highlight_image.scaleY)/100)) && 
			   	// knight_params.center_y <= (rail_highlight_image.y + (60 * (rail_highlight_image.height * rail_highlight_image.scaleY)/100)))
			  ){
			  	lance_hit = true;
			  	whoosh_sound.play();
				knight_image.stop();
				horse_gollap_noise_sound.stop();
				knight_image.clearTransforms();
				curr_points = 0;
				if(horizontal_bar.x >= horizontal_bar_points_region.x_left && horizontal_bar.x <= horizontal_bar_points_region.x_right){
					//calculate for x
					if(horizontal_bar.x > (balance_bar.x + (balance_bar.width * balance_bar.scaleX / 2))){ // bar is on right side
						var a = balance_bar.x + (balance_bar.width * balance_bar.scaleX / 2);
						var b = (balance_bar.x + (balance_bar.width * balance_bar.scaleX));
						var c = horizontal_bar.x;
						var d = b - a;
						var e = c - a;
						var percentage = (e / d * 100) / 2;
						curr_points = curr_points + (50 - Math.round(percentage));
					}
					else{ // bar is on left side
						var a = balance_bar.x;
						var b = (balance_bar.x + (balance_bar.width * balance_bar.scaleX / 2));
						var c = horizontal_bar.x;
						var d = b - a;
						var e = c - a;
						var percentage = (e / d * 100) / 2;
						curr_points = curr_points + (Math.round(percentage));
					}
				}
				if(vertical_bar.y >= vertical_bar_points_region.y_top && vertical_bar.y <= vertical_bar_points_region.y_bottom){
					//calculate for y
					if(vertical_bar.y > (balance_bar.y + (balance_bar.height * balance_bar.scaleY / 2))){ // bar is on bottom side
						var a = balance_bar.y + (balance_bar.height * balance_bar.scaleY / 2);
						var b = (balance_bar.y + balance_bar.height * balance_bar.scaleY);
						var c = vertical_bar.y;
						var d = b - a;
						var e = c - a;
						var percentage = (e / d * 100) / 2;
						curr_points = curr_points + (50 - Math.round(percentage));
						// alert(Math.round(percentage));
					}
					else{ // bar is on top side
						var a = balance_bar.y;
						var b = (balance_bar.y + (balance_bar.height * balance_bar.scaleY / 2));
						var c = horizontal_bar.y;
						var d = b - a;
						var e = c - a;
						var percentage = (e / d * 100) / 2;
						curr_points = curr_points + (Math.round(percentage));
						// alert(Math.round(percentage));
					}
				}

				if(sound_settings == 'ON')
					metal_bang_sound.play();
				//points = curr_points;
				message.text = 'You have earned '+curr_points+' more points.\nGet ready for the next shot.';
				horizontal_bar.hide();
				vertical_bar.hide();
				balance_bar.hide();
				bar_button_down.hide();
				bar_button_left.hide();
				bar_button_right.hide();
				bar_button_up.hide();
				//lance_green.hide();
				
				setTimeout(function(){
					message.visible = true;
					alertView.visible = true;
					points_label.text = "Total points : " + (points += curr_points);
					knight_image.hide();
					setTimeout(function(){
						if(!play_game)
							return;
						message.visible = false;
						alertView.visible = false;
						KnightRun();
						
					},3000);
				},3000);
			}
			if(!lance_hit){
				move_sliders_randomly();
			}
		},100);
	}
	window.addEventListener("close",function(){
		play_game = false;
		jousting_battle_music.stop();
		horse_gollap_noise_sound.stop();
	});
	window.addEventListener("open", function() {
		if(osname === 'android'){
			var activity = window.activity;
			activity.addEventListener('resume', function(e) {
			});
			activity.addEventListener('pause', function(e) {
				play_game = false;
				jousting_battle_music.stop();
				horse_gollap_noise_sound.stop();
			});
			activity.addEventListener('destroy', function(e) {
			});
		}
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
		// if(sound_settings == 'ON')
			// whoosh_sound.play();
		// lance_green.x = e.x;
		// lance_green.y = e.y;
		
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

		if(isCollide(coordinates,bar_up_botton)){
			bar_up_botton_tapped = true;
			bar_button_up.x += 5;
			bar_button_up.y += 5;
			vertical_bar.y -= (smallest_move * 6);
			lance_green.y -= (smallest_move * 6);
			return;
		}
		if(isCollide(coordinates,bar_down_botton)){
			bar_button_down.x += 5;
			bar_button_down.y += 5;
			bar_down_botton_tapped = true;
			vertical_bar.y += (smallest_move * 6);
			lance_green.y += (smallest_move * 6);
			return;
		}
		if(isCollide(coordinates,bar_left_botton)){
			bar_button_left.x += 5;
			bar_button_left.y += 5;
			bar_left_botton_tapped = true;
			horizontal_bar.x -= (smallest_move * 6);
			lance_green.x -= (smallest_move * 6);
			return;
		}
		if(isCollide(coordinates,bar_right_botton)){
			bar_button_right.x += 5;
			bar_button_right.y += 5;
			bar_right_botton_tapped = true;
			horizontal_bar.x += (smallest_move * 6);
			lance_green.x += (smallest_move * 6);
			return;
		}
	});
	game.addEventListener('touchmove', function(e) {
	});
	game.addEventListener('touchend', function(e) {
		if(bar_up_botton_tapped){
			bar_button_up.x -= 5;
			bar_button_up.y -= 5;
			bar_up_botton_tapped = false;
		}
		if(bar_down_botton_tapped){
			bar_button_down.x -= 5;
			bar_button_down.y -= 5;
			bar_down_botton_tapped = false;
		}
		if(bar_left_botton_tapped){
			bar_button_left.x -= 5;
			bar_button_left.y -= 5;
			bar_left_botton_tapped = false;
		}
		if(bar_right_botton_tapped){
			bar_button_right.x -= 5;
			bar_button_right.y -= 5;
			bar_right_botton_tapped = false;
		}
	});
	var JoustingKnightSkinParams = require('/ui/common/games/JoustingKnightSkinParams');
	var knight_skin_params = new JoustingKnightSkinParams();

	var isCollide = function(lance_param, rectange) {
		if (lance_param.x >= rectange.left && lance_param.x <= (rectange.left + rectange.width) && (lance_param.y >= rectange.top && lance_param.y <= (rectange.top + rectange.height)))
			return true;
		return false;
	};
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
	var ok_button = Ti.UI.createButton({ color: '#761f56',
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
	});
	window.add(ok_button);
	function start_game(){
		
	};
	game.addEventListener('onloadsprite', function(e) {
		loaded_sprites++;
		if(loaded_sprites >= (sprites_tag.length - 1)){
			jousting_battle_music.play();
			jousting_battle_music.setLooping(true);
			KnightRun();
		}
		// for (var i=0; i < sprites_tag.length; i++) {
		  // if (e.tag == sprites_tag[i]) {
		  // }
		// };
	});

	window.add(game);
	window.open({
		fullscreen : true,
		navBarHidden : true
	});
	return window;

}

module.exports = JoustinGamePlay;
