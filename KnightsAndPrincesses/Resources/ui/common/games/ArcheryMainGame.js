function ArcheryMainGame(quest_status, quest_id, userinfo) {
	var osname = Ti.Platform.osname;
	var sound_settings = (Ti.App.Properties.getString('knp_sound') == undefined || Ti.App.Properties.getString('knp_sound') == '' || Ti.App.Properties.getString('knp_sound') == null) ? 'ON' : Ti.App.Properties.getString('knp_sound');
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

	var window = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	var trumpet_lose_sound = Titanium.Media.createSound({
		url : '/sounds/trumpet_lose.mp3'
	});
	var trumpet_win_sound = Titanium.Media.createSound({
		url : '/sounds/trumpet_win.mp3'
	});

	var played = false;
	window.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	var points_earned = 0;
	var total_points_earned = 0;
	var total_number_of_shots = 0;
	var rankingDialog;

	// Obtain game module
	var quicktigame2d = require('com.googlecode.quicktigame2d');

	var ambient_bird_chirps_sound = Titanium.Media.createSound({
		url : '/sounds/ambient_bird_chirps.mp3'
	});
	var game_play = true;
	var bird_chirps_first_run = true;
	var background_music_loop = function() {
		if (sound_settings == 'OFF')
			return;
		if (!bird_chirps_first_run)
			setTimeout(function() {
				if (!game_play || ambient_bird_chirps_sound == undefined || ambient_bird_chirps_sound == "" || ambient_bird_chirps_sound == null) {
					return;
				}
				ambient_bird_chirps_sound.stop();
				ambient_bird_chirps_sound.play();
				background_music_loop();
			}, 41000);
		else {
			if (!game_play || ambient_bird_chirps_sound == undefined || ambient_bird_chirps_sound == "" || ambient_bird_chirps_sound == null) {
				return;
			}
			bird_chirps_first_run = false;
			ambient_bird_chirps_sound.stop();
			ambient_bird_chirps_sound.play();
			background_music_loop();
		}
	};
	(function() {
		if (ambient_bird_chirps_sound == undefined || ambient_bird_chirps_sound == "" || ambient_bird_chirps_sound == null)
			return;
		ambient_bird_chirps_sound.play();

		background_music_loop();
	})();

	var arrow_draw_sound = Titanium.Media.createSound({
		url : '/sounds/arrow_draw.mp3'
	});
	var arrow_fly_sound = Titanium.Media.createSound({
		url : '/sounds/arrow_fly.mp3'
	});
	var arrow_hit_sound = Titanium.Media.createSound({
		url : '/sounds/arrow_hit.mp3'
	});
	var arrow_miss_sound = Titanium.Media.createSound({
		url : '/sounds/arrow_miss.mp3'
	});

	var game = quicktigame2d.createGameView();

	game.fps = 30;
	game.color(0, 0, 0);
	game.debug = true;
	var shapes = new Array();

	var scene = quicktigame2d.createScene();
	var winWidth;
	// = Ti.Platform.displayCaps.platformWidth;
	var winHeight;
	// = Ti.Platform.displayCaps.platformHeight;
	game.pushScene(scene);

	var TOUCH_SCALE = 1;

	var backgroundView = quicktigame2d.createSprite({
		image : 'assets/games/archery/background.png',
		width : winWidth,
		height : winHeight
	});
	scene.add(backgroundView);
	var bullsEyeWidth = getPixelFromPercent('x', 30);
	var bullsEyeImageView = quicktigame2d.createSprite({
		image : 'assets/games/archery/bullseye.png',
		width : bullsEyeWidth,
		height : bullsEyeWidth,
		x : getPixelFromPercent('x', 50) - (bullsEyeWidth / 2),
		y : getPixelFromPercent('y', 50) - (bullsEyeWidth / 2),
		z : 4
	});
	scene.add(bullsEyeImageView);

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
	var rating_width = getPixelFromPercent('x', 60);
	var rating_height = rating_width / 4.81818182;
	var rating_image = Ti.UI.createImageView({
		// image : 'assets/games/ratings/5_star_ratings.png',
		width : rating_width,
		height : rating_height,
		visible : false,
		zIndex : 990
	});
	window.add(rating_image);

	// var rating_image = quicktigame2d.createSpriteSheet({
	// image : 'assets/games/5_star_ratings.png',
	// width : 256,
	// height : 55,
	// x : getPixelFromPercent('x', 40) - (256/2),// - knight_image_respective_width, //39),
	// y : getPixelFromPercent('y', 50) - (55/2),// - knight_image_respective_height,
	// z : 9
	// });

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

	var bowImageRatio = 1.78515625;
	var bowImageWidth = getPixelFromPercent('x', 55);
	var bowImageHeight = getRespectiveHeight(bowImageWidth, bowImageRatio);
	var aim_initial_point_y = 0, aim_final_point_y = 40, aim_current_point_y = 20;
	var aim_initial_point_x = -40, aim_final_point_x = 0, aim_current_point_x = -20;
	var bowImageView = quicktigame2d.createSprite({
		image : 'assets/games/archery/bow.png',
		width : bowImageWidth,
		height : bowImageHeight,
		x : aim_current_point_x,
		y : winHeight - ((bowImageHeight * 3 / 4) + aim_current_point_y),
		z : 5
	});
	scene.add(bowImageView);

	var arrowImageRatio = 3.5555;
	var arrowImageWidth = getPixelFromPercent('x', 20);
	var arrowImageHeight = getRespectiveHeight(arrowImageWidth, arrowImageRatio);
	var arrowImageView = quicktigame2d.createSprite({
		image : 'assets/games/archery/arrow.png',
		width : arrowImageWidth,
		height : arrowImageHeight,
		x : getPixelFromPercent('x', 53) - (arrowImageWidth / 2) + aim_current_point_x,
		y : winHeight - ((arrowImageHeight * 3 / 4) + aim_current_point_y),
		z : 6
	});
	scene.add(arrowImageView);

	ambient_bird_chirps_sound.addEventListener('complete', function(e) {
		//ambient_bird_chirps_sound.play();
	});
	game.addEventListener('onload', function(e) {
		if (sound_settings == 'ON')
			ambient_bird_chirps_sound.play();
		winWidth = game.screen.width;
		// Ti.Platform.displayCaps.platformWidth;
		winHeight = game.screen.height;
		// Ti.Platform.displayCaps.platformHeight;
		//background_music_loop();
		TOUCH_SCALE = game.screen.width / game.size.width;

		game.registerForMultiTouch();
		game.start();

		backgroundView.width = winWidth;
		backgroundView.height = winHeight;

		bullsEyeWidth = getPixelFromPercent('x', 30);
		bullsEyeImageView.width = bullsEyeWidth;
		bullsEyeImageView.height = bullsEyeWidth;
		bullsEyeImageView.x = getPixelFromPercent('x', 50) - (bullsEyeWidth / 2);
		bullsEyeImageView.y = getPixelFromPercent('y', 50) - (bullsEyeWidth / 2);

		scoreboard_bg_imageview.height = getPixelFromPercent('y', 5);
		scoreboard_bg_imageview.width = getPixelFromPercent('x', 100);

		bowImageWidth = getPixelFromPercent('x', 55);
		bowImageHeight = getRespectiveHeight(bowImageWidth, bowImageRatio);
		bowImageView.width = bowImageWidth;
		bowImageView.height = bowImageHeight;
		bowImageView.x = aim_current_point_x;
		bowImageView.y = winHeight - ((bowImageHeight * 3 / 4) + aim_current_point_y);

		arrowImageWidth = getPixelFromPercent('x', 20);
		arrowImageHeight = getRespectiveHeight(arrowImageWidth, arrowImageRatio);
		arrowImageView.width = arrowImageWidth;
		arrowImageView.height = arrowImageHeight;
		arrowImageView.x = getPixelFromPercent('x', 53) - (arrowImageWidth / 2) + aim_current_point_x;
		arrowImageView.y = winHeight - ((arrowImageHeight * 3 / 4) + aim_current_point_y);

		aiming_current_point_y = arrowImageView.y;
		aiming_initial_point_y = arrowImageView.y;
		aiming_final_point_y = arrowImageView.y + 60;

		indicator_y_ImageHeight = getPixelFromPercent('y', 32);
		indicator_y_ImageWidth = getRespectiveWidth(indicator_y_ImageHeight, indicator_y_ImageRatio);
		indicator_y_bg.width = indicator_y_ImageWidth;
		indicator_y_bg.height = indicator_y_ImageHeight;
		indicator_y_bg.x = (winWidth - getPixelFromPercent('x', 6));
		indicator_y_bg.y = getPixelFromPercent('y', 15);

		indicator_pointer_ImageWidth = getPixelFromPercent('x', 10);
		indicator_pointer_ImageHeight = getRespectiveHeight(indicator_pointer_ImageWidth, indicator_pointer_ImageRatio);
		indicator_y_pointer.width = indicator_pointer_ImageWidth;
		indicator_y_pointer.height = indicator_pointer_ImageHeight;
		indicator_y_pointer.x = (winWidth - getPixelFromPercent('x', 10));
		indicator_y_pointer.y = indicator_y_bg.y + (indicator_y_bg.height / 2) - (indicator_pointer_ImageHeight / 2);

		indicator_x_ImageWidth = getPixelFromPercent('x', 50);
		indicator_x_ImageHeight = getRespectiveHeight(indicator_x_ImageWidth, indicator_x_ImageRatio);
		indicator_x_bg.width = indicator_x_ImageWidth;
		indicator_x_bg.height = indicator_x_ImageHeight;
		indicator_x_bg.x = getPixelFromPercent('x', 6);
		indicator_x_bg.y = (winHeight - getPixelFromPercent('y', 6));

		indicator_x_pointer.width = indicator_pointer_ImageWidth;
		indicator_x_pointer.height = indicator_pointer_ImageHeight;
		indicator_x_pointer.x = (getPixelFromPercent('x', 6) / 2) + indicator_x_ImageWidth;
		indicator_x_pointer.y = (winHeight - getPixelFromPercent('y', 6) - (indicator_pointer_ImageHeight / 2));

	});
	/*
	 * Assigning Qusts
	 *
	 */
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
				//hideLoader();
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : _url,

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


	game.addEventListener('click', function(e) {
		return;
	});
	var indicator_y_ImageRatio = 50.14285;
	var indicator_y_ImageHeight = getPixelFromPercent('y', 32);
	var indicator_y_ImageWidth = getRespectiveWidth(indicator_y_ImageHeight, indicator_y_ImageRatio);

	var indicator_y_bg = quicktigame2d.createSprite({
		image : 'assets/games/archery/indicator_y_bg.png',
		width : indicator_y_ImageWidth,
		height : indicator_y_ImageHeight,
		x : (winWidth - getPixelFromPercent('x', 6)),
		y : getPixelFromPercent('y', 15),
		z : 500
	});
	scene.add(indicator_y_bg);
	var indicator_pointer_ImageRatio = 1.084745;
	var indicator_pointer_ImageWidth = getPixelFromPercent('x', 10);
	var indicator_pointer_ImageHeight = getRespectiveHeight(indicator_pointer_ImageWidth, indicator_pointer_ImageRatio);
	// Create an ImageView.
	var someLabel = Ti.UI.createLabel({
		text : "(" + (winWidth - getPixelFromPercent('y', 4.5)) + ", " + getPixelFromPercent('x', 0.5) + "): " + indicator_pointer_ImageWidth + "x" + indicator_pointer_ImageHeight,
		color : '#000000',
		font : {
			fontSize : '14dip'
		},
		visible : false,
		top : 0,
		zIndex : 700
	});

	// Add to the parent view.
	window.add(someLabel);

	function is_object_clicked(x, y, object) {
		return (x >= object.x && x <= (object.x + object.width) && y >= object.y && y <= (object.y + object.height)) ? true : false;
	}

	var indicator_y_pointer = quicktigame2d.createSprite({
		image : 'assets/games/archery/indicator_pointer.png',
		width : indicator_pointer_ImageWidth,
		height : indicator_pointer_ImageHeight,
		x : (winWidth - getPixelFromPercent('x', 10)),
		y : indicator_y_bg.y + (indicator_y_bg.height / 2) - (indicator_pointer_ImageHeight / 2), //getPixelFromPercent('y', 4.5),
		z : 510
	});
	var indicator_y_min_value = indicator_y_bg.y - (indicator_y_pointer.height / 2);
	var indicator_y_max_value = indicator_y_bg.y + indicator_y_bg.height - (indicator_y_pointer.height / 2);
	var total_aiming_points = indicator_y_max_value - indicator_y_min_value;
	var modulus_value = total_aiming_points / aim_final_point_y;
	var movment_tolerence_rate = 0;

	scene.add(indicator_y_pointer);
	var indicator_y_pointer_tapped = false;
	someLabel.text = "(" + getPixelFromPercent('y', 4.5) + ", " + getPixelFromPercent('x', 10) + "): " + indicator_pointer_ImageWidth + "x" + indicator_pointer_ImageHeight;

	/*
	 * Indicator pointer 'x'
	 */
	var indicator_x_ImageRatio = 0.019943;
	var indicator_x_ImageWidth = getPixelFromPercent('x', 50);
	var indicator_x_ImageHeight = getRespectiveHeight(indicator_x_ImageWidth, indicator_x_ImageRatio);

	var indicator_x_bg = quicktigame2d.createSprite({
		image : 'assets/games/archery/indicator_x_bg.png',
		width : indicator_x_ImageWidth,
		height : indicator_x_ImageHeight,
		x : getPixelFromPercent('x', 6),
		y : (winHeight - getPixelFromPercent('y', 6)),
		z : 500
	});
	scene.add(indicator_x_bg);
	var indicator_x_pointer = quicktigame2d.createSprite({
		image : 'assets/games/archery/indicator_pointer.png',
		width : indicator_pointer_ImageWidth,
		height : indicator_pointer_ImageHeight,
		x : (getPixelFromPercent('x', 6) / 2) + indicator_x_ImageWidth,
		y : (winHeight - getPixelFromPercent('y', 6) - (indicator_pointer_ImageHeight / 2)), //getPixelFromPercent('y', 4.5),
		z : 510
	});
	var indicator_x_min_value = indicator_x_bg.x - (indicator_x_pointer.width / 2);
	var indicator_x_max_value = indicator_x_bg.x + indicator_x_bg.width - (indicator_x_pointer.width / 2);
	var total_aiming_points = indicator_x_max_value - indicator_x_min_value;
	var modulus_value = total_aiming_points / aim_final_point_y;
	var movment_tolerence_rate = 0;
	scene.add(indicator_x_pointer);
	var indicator_x_pointer_tapped = false;
	var aiming_tapped = false;
	var aiming_current_point_y;// = arrowImageView.y;
	var aiming_initial_point_y;// = arrowImageView.y;
	var aiming_final_point_y;// = arrowImageView.y + 60;
	var aiming_starting_point = {};
	var shot_fired = false;
	game.addEventListener('touchstart', function(e) {
		// someLabel.text = "(" + (winWidth - getPixelFromPercent('y', 4.5)) + ", " + getPixelFromPercent('x', 10) + "): " + indicator_pointer_ImageWidth + "x" + indicator_pointer_ImageHeight;
		//'touchstart : ' + e.x + ',' + e.y;
		// Ti.Platform.displayCaps.platformWidth;
		var _gameWidth = game.screen.width;
		var _gameHeight = game.screen.height;
		var _winWidth = Titanium.Platform.displayCaps.platformWidth;
		var _winHeight = Titanium.Platform.displayCaps.platformHeight;

		if (_gameWidth > _winWidth) {
			e.x = (_gameWidth / _winWidth) * e.x;
			e.y = (_gameHeight / _winHeight) * e.y;
		} else {
			e.x = (_winWidth / _gameWidth) * e.x;
			e.y = (_winHeight / _gameHeight) * e.y;
		}

		if (is_object_clicked(e.x, e.y, indicator_y_pointer)) {
			indicator_y_pointer_tapped = true;
		} else if (is_object_clicked(e.x, e.y, indicator_x_pointer)) {
			indicator_x_pointer_tapped = true;
		} else {
			if (!shot_fired) {
				shot_fired = true;
				aiming_tapped = true;
				aiming_starting_point.x = e.x;
				aiming_starting_point.y = e.y;
			}
		}

		//Ti.API.info(e.y);
		Ti.API.info(arrowImageView.y);
	});
	var last_moved_points = {};
	var arrow_position_points = 0;
	var aiming_power = 0;
	game.addEventListener('touchmove', function(e) {
		var _gameWidth = game.screen.width;
		var _gameHeight = game.screen.height;
		var _winWidth = Titanium.Platform.displayCaps.platformWidth;
		var _winHeight = Titanium.Platform.displayCaps.platformHeight;

		if (_gameWidth > _winWidth) {
			e.x = (_gameWidth / _winWidth) * e.x;
			e.y = (_gameHeight / _winHeight) * e.y;
		} else {
			e.x = (_winWidth / _gameWidth) * e.x;
			e.y = (_winHeight / _gameHeight) * e.y;
		}
		// someLabel.text = "(" + (winWidth - getPixelFromPercent('y', 4.5)) + ", " + getPixelFromPercent('x', 10) + "): " + indicator_pointer_ImageWidth + "x" + indicator_pointer_ImageHeight;
		/*
		* Indicator pointer 'y'
		*/
		// Ti.Platform.displayCaps.platformWidth;
		if (indicator_y_pointer_tapped && e.y >= indicator_y_min_value && e.y <= indicator_y_max_value) {
			if ((e.y % modulus_value) >= (-movment_tolerence_rate) || (e.y % modulus_value) < movment_tolerence_rate) {
				if (last_moved_points.y < e.y) {// Sliding down
					someLabel.text = aim_current_point_y + " > " + aim_initial_point_y + " > " + aim_final_point_y;
					if (aim_current_point_y > (aim_initial_point_y + 1)) {
						arrow_position_points--;
						aim_current_point_y--;
					}
				} else {// Sliding up
					if (aim_current_point_y < (aim_final_point_y - 1)) {
						aim_current_point_y++;
						arrow_position_points++;
					}
				}
			}
			bowImageView.y = winHeight - ((bowImageHeight * 3 / 4) + aim_current_point_y);
			//winHeight - (bowImageHeight + aim_current_point_y);
			arrowImageView.y = winHeight - ((arrowImageHeight * 3 / 4) + aim_current_point_y);
			indicator_y_pointer.y = e.y;

			aiming_current_point_y = arrowImageView.y;
			aiming_initial_point_y = arrowImageView.y;
			aiming_final_point_y = arrowImageView.y + 60;
			Ti.API.info("first");
		}
		/*
		 * Indicator pointer 'x'
		 */
		else if (indicator_x_pointer_tapped && e.x >= indicator_x_min_value && e.x <= indicator_x_max_value) {
			if ((e.x % modulus_value) >= (-movment_tolerence_rate) || (e.x % modulus_value) < movment_tolerence_rate) {
				if (last_moved_points.x < e.x) {// Sliding right
					if (aim_current_point_x < (aim_final_point_x + 1)) {
						aiming_power++;
						aim_current_point_x++;
					}
				} else {// Sliding left
					if (aim_current_point_x > (aim_initial_point_x - 1)) {
						aiming_power--;
						aim_current_point_x--;
					}
				}
				bowImageView.x = aim_current_point_x;
				// winWidth - ((bowImageHeight * 3 / 4) + aim_current_point_y);
				arrowImageView.x = getPixelFromPercent('x', 53) - (arrowImageWidth / 2) + aim_current_point_x;
				//winWidth - ((arrowImageHeight * 3 / 4) + aim_current_point_y);
			}
			someLabel.text = aim_current_point_x + " > " + aim_initial_point_x + " > " + aim_final_point_x;
			indicator_x_pointer.x = e.x;
			Ti.API.info("second");
		} else if (aiming_tapped && last_moved_points.y < e.y) {// Sliding aim down
			if (aiming_current_point_y < (aiming_final_point_y - 1)) {
				if (sound_settings == 'ON')
					arrow_draw_sound.play();
				aiming_power++;
				aiming_current_point_y++;
			}
			arrowImageView.y = aiming_current_point_y;
			someLabel.text = aiming_current_point_y + " :: " + aiming_initial_point_y + " :: " + aiming_final_point_y;
			Ti.API.info("third");
		} else if (aiming_tapped && last_moved_points.y > e.y) {// Sliding aim up
			if (aiming_current_point_y > (aiming_initial_point_y + 1)) {
				if (sound_settings == 'ON')
					arrow_draw_sound.play();
				aiming_current_point_y--;
				aiming_power--;
			}
			arrowImageView.y = aiming_current_point_y;
			someLabel.text = aiming_current_point_y + " :: " + aiming_initial_point_y + " :: " + aiming_final_point_y;
			Ti.API.info("fourth");
		} else {
			Ti.API.info("fifth");
			// aiming_tapped = false;
		}
		someLabel.text = bullsEyeImageView.collidesWith(arrowImageView);
		last_moved_points.x = e.x;
		last_moved_points.y = e.y;
		//Ti.API.info(arrowImageView.y);
	});
	game.addEventListener('touchend', function(e) {
		var _gameWidth = game.screen.width;
		var _gameHeight = game.screen.height;
		var _winWidth = Titanium.Platform.displayCaps.platformWidth;
		var _winHeight = Titanium.Platform.displayCaps.platformHeight;

		if (_gameWidth > _winWidth) {
			e.x = (_gameWidth / _winWidth) * e.x;
			e.y = (_gameHeight / _winHeight) * e.y;
		} else {
			e.x = (_winWidth / _gameWidth) * e.x;
			e.y = (_winHeight / _gameHeight) * e.y;
		}
		// someLabel.text = "(" + (winWidth - getPixelFromPercent('y', 4.5)) + ", " + getPixelFromPercent('x', 10) + "): " + indicator_pointer_ImageWidth + "x" + indicator_pointer_ImageHeight;
		if (indicator_y_pointer_tapped) {
			indicator_y_pointer_tapped = false;
		} else if (indicator_x_pointer_tapped) {
			indicator_x_pointer_tapped = false;
		} else if (aiming_tapped) {
			//alert('aiming_current_point_y = ' + aiming_current_point_y + '\naiming_power = ' + aiming_power + '\narrow_position_points = ' + arrow_position_points);
			aiming_tapped = false;
			var transformation = quicktigame2d.createTransform();
			transformation.duration = 200;
			//arrowImageView.y - (getPixelFromPercent('x', 40) * 3/2);
			transformation.scale_centerX = arrowImageView.width / 2;
			transformation.scale_centerY = 0;

			transformation.scale(0.3, 0.3);
			//transformation.height = arrowImageHeight / 3;
			transformation.easing = quicktigame2d.ANIMATION_CURVE_EASE_IN;

			transformation.y = (getPixelFromPercent('y', 30)) + ((winHeight - arrowImageView.y)) - (arrow_position_points * 4) - (aiming_power * 4);
			if (aiming_starting_point.x > e.x) {// Sliding left side
				transformation.x = arrowImageView.x + ((aiming_starting_point.x - e.x) * 2);
			} else {// Sliding right side
				transformation.x = arrowImageView.x - ((e.x - aiming_starting_point.x) * 2);
			}
			transformation.z = 4;
			arrowImageView.transform(transformation);
			someLabel.text = ((winHeight - aiming_current_point_y) * 7 / 5) + (getPixelFromPercent('x', 40));
			if (sound_settings == 'ON')
				arrow_fly_sound.play();
			setTimeout(function() {
				if (!game_play)
					return;
				total_number_of_shots++;
				arrow_fly_sound.stop();
				arrow_draw_sound.stop();
				someLabel.text = (arrowImageView.x + (arrowImageView.width / 2)) + ", " + arrowImageView.y;
				//(arrowImageView.y + (arrowImageView.y * 42/100));
				// arrowImageView.height = arrowImageHeight /3;
				var r_first_orbit = (bullsEyeWidth / 2) / 4;
				var hit = false;
				var a = bullsEyeImageView.x + (bullsEyeImageView.width / 2);
				var b = bullsEyeImageView.y + (bullsEyeImageView.height / 2);
				var last_radius = 0;
				var aiming_tolerence_rate = 30;
				for (var r = last_radius; r < r_first_orbit; r += 1) {
					last_radius = r;
					//if (is_hit_circle((arrowImageView.x + (arrowImageView.width / 2)), (arrowImageView.y + (arrowImageView.y * 42/100)), a, b, r, aiming_tolerence_rate)) {
					if (is_hit_circle((arrowImageView.x + (arrowImageView.width / 2)), arrowImageView.y, a, b, r, aiming_tolerence_rate)) {
						hit = true;
						break;
					}
				}
				if (hit)
					points_earned = 100;
				//alert('First Orbit');
				else {
					var r_second_orbit = (bullsEyeWidth / 2) / 2;
					var aiming_tolerence_rate = 70;
					for (var r = last_radius; r < r_second_orbit; r += 1) {
						last_radius = r;
						if (is_hit_circle((arrowImageView.x + (arrowImageView.width / 2)), arrowImageView.y, a, b, r, aiming_tolerence_rate)) {
							hit = true;
							break;
						}
					}
					if (hit)
						points_earned = 80;
					//alert('Second Orbit');
					else {
						var aiming_tolerence_rate = 80;
						var r_third_orbit = (bullsEyeWidth / 2) * 3 / 4;
						for (var r = last_radius; r < r_third_orbit; r += 1) {
							last_radius = r;
							if (is_hit_circle((arrowImageView.x + (arrowImageView.width / 2)), arrowImageView.y, a, b, r, aiming_tolerence_rate)) {
								hit = true;
								break;
							}
						}
						if (hit)
							points_earned = 50;
						//alert('Third Orbit');
						else {
							var aiming_tolerence_rate = 100;
							var r_fourth_orbit = (bullsEyeWidth / 2);
							for (var r = last_radius; r < r_fourth_orbit; r += 1) {
								last_radius = r;
								if (is_hit_circle((arrowImageView.x + (arrowImageView.width / 2)), arrowImageView.y, a, b, r, aiming_tolerence_rate)) {
									hit = true;
									break;
								}
							}
							if (hit)
								points_earned = 25;
						}
					}
				}
				if (sound_settings == 'ON') {
					if (hit)
						arrow_hit_sound.play();
					else
						arrow_miss_sound.play();
				}
				total_points_earned += points_earned;
				if (total_number_of_shots == 5) {
					var p1 = (total_points_earned / 500) * 100;
					var p2 = Math.ceil(5 * (p1 / 100));

					set_quest_complete(p2 * 50, function(quest_name, rewards) {
						if (p2 > 3)
							trumpet_win_sound.play();
						else
							trumpet_lose_sound.play();

						alertView.visible = true;
						//						alert("Star ranking : " + p2 + " out of 5.");
						switch(p2) {
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
						// rating_image.frame = (4 - (p2 - 1));
						// rating_image.scale(0.75);
						// rating_image.show();
						rating_image.visible = true;

						setTimeout(function() {
							window.close();
						}, 4000);
					});

					return;
				}
				setTimeout(function() {
					if (!game_play)
						return;
					alertView.visible = true;
					message.text = (points_earned != 0) ? ("You have earned " + points_earned + " more points!\nGet ready for the next shot.") : "You earned no point.\nGet ready for the next shot.";
					message.visible = true;
					// pointsDialog.show();
					setTimeout(function(e) {
						if (!game_play)
							return;
						alertView.visible = false;
						message.visible = false;
						points_label.text = "Total points : " + total_points_earned;
						shot_number_label.text = "Shot # " + total_number_of_shots;

						arrow_position_points = 0;
						aiming_power = 0;
						points_earned = 0;
						someLabel.text = bullsEyeImageView.collidesWith(arrowImageView);
						aim_initial_point_y = 0, aim_final_point_y = 40, aim_current_point_y = 20;
						aim_initial_point_x = -40, aim_final_point_x = 0, aim_current_point_x = -20;

						aiming_current_point_y = aiming_initial_point_y;

						bowImageView.y = winHeight - ((bowImageHeight * 3 / 4) + aim_current_point_y);
						bowImageView.x = aim_current_point_x;
						arrowImageView.z = 6;
						arrowImageView.scale(1);
						//winHeight - (bowImageHeight + aim_current_point_y);
						arrowImageView.x = getPixelFromPercent('x', 53) - (arrowImageWidth / 2) + aim_current_point_x;
						arrowImageView.y = winHeight - ((arrowImageHeight * 3 / 4) + aim_current_point_y);

						aiming_current_point_y = arrowImageView.y;
						aiming_initial_point_y = arrowImageView.y;
						aiming_final_point_y = arrowImageView.y + 60;
						reset.visible = false;
						shot_fired = false;
					}, 3000);
				}, 1000);

				// alert((points_earned != 0) ? ("You have earned " + points_earned + " points!") : "You earned no point.");
			}, 300);
			// arrowImageView.y = aiming_initial_point_y;
			// aiming_current_point_y = aiming_initial_point_y;

			// Create a Button.
			var reset = Ti.UI.createButton({
				color : '#761f56',
				title : 'Reset',
				top : getPixelFromPercent('y', 10),
				zIndex : 900
			});

			// Listen for click events.
			reset.addEventListener('click', function(e) {

				arrow_position_points = 0;
				aiming_power = 0;
				points_earned = 0;
				someLabel.text = bullsEyeImageView.collidesWith(arrowImageView);
				aim_initial_point_y = 0, aim_final_point_y = 40, aim_current_point_y = 20;
				aim_initial_point_x = -40, aim_final_point_x = 0, aim_current_point_x = -20;

				aiming_current_point_y = aiming_initial_point_y;

				bowImageView.y = winHeight - ((bowImageHeight * 3 / 4) + aim_current_point_y);
				bowImageView.x = aim_current_point_x;
				arrowImageView.z = 6;
				arrowImageView.scale(1);
				//winHeight - (bowImageHeight + aim_current_point_y);
				arrowImageView.x = getPixelFromPercent('x', 53) - (arrowImageWidth / 2) + aim_current_point_x;
				arrowImageView.y = winHeight - ((arrowImageHeight * 3 / 4) + aim_current_point_y);

				aiming_current_point_y = arrowImageView.y;
				aiming_initial_point_y = arrowImageView.y;
				aiming_final_point_y = arrowImageView.y + 60;
				reset.visible = false;
				shot_fired = false;
			});

			// Add to the parent view.
			//window.add(reset);

		}
		Ti.API.info(arrowImageView.y);
	});
	var gameloop_timeline = 0;
	window.addEventListener("close", function() {
		game_play = false;
		ambient_bird_chirps_sound.stop();
	});

	window.addEventListener("open", function() {
		// rating_image.hide();
		// scene.add(rating_image);

		if (osname === 'android') {
			var activity = window.activity;
			activity.addEventListener('resume', function(e) {
				// updateTimerID = setInterval(function() {
				// if ((gameloop_timeline % 41000) == 0)
				// ambient_bird_chirps_sound.play();
				// }, 1000);
			});
			activity.addEventListener('pause', function(e) {
				game_play = false;
				ambient_bird_chirps_sound.stop();
			});
			activity.addEventListener('destroy', function(e) {
				game_play = false;
				ambient_bird_chirps_sound.stop();
			});
		}
	});
	//var aiming_tolerence_rate = 65;

	function is_hit_circle(x, y, a, b, r, aiming_tolerence_rate) {
		Ti.API.info(x + ", " + y + ", " + a + ", " + b + ", " + r + ", " + aiming_tolerence_rate);
		var left_side = Math.pow((x - a), 2) + Math.pow((y - b), 2);
		var right_side = Math.pow(r, 2);
		//Ti.API.info(x + ", " + y + ", " + a + ", " + b + ", " + r);
		//Ti.API.info(left_side + ", " + right_side);
		return (left_side == right_side || (left_side >= right_side && left_side <= (right_side + aiming_tolerence_rate)
		) || (left_side < right_side && left_side >= (right_side - aiming_tolerence_rate)
		)
		) ? true : false;

		var y1 = b + Math.sqrt(Math.pow(r, 2) - Math.pow((x - a), 2));
		var y2 = b - Math.sqrt(Math.pow(r, 2) - Math.pow((x - a), 2));
		Ti.API.info(x + ", " + y + ", " + a + ", " + b + ", " + r + " :: " + y1 + ", " + y2);
		return ((y1 >= y && y1 <= (y + aiming_tolerence_rate)) || (y1 < y && y1 > (y - aiming_tolerence_rate)) || (y2 < y && y2 > (y - aiming_tolerence_rate)) || (y2 < y && y2 > (y - aiming_tolerence_rate)) ) ? true : false;
	}

	var scroll_width = getPixelFromPercent('x', 70);
	var scroll_height = scroll_height * 1.3;
	var alertView = Ti.UI.createImageView({
		image : '/assets/games/scroll.png',
		width : getPixelFromPercent('x', '85'),
		height : getRespectiveHeight(getPixelFromPercent('x', '85'), 1.3),
		zIndex : 890,
		visible : false
	});
	window.add(alertView);
	// Create a Label.
	var message = Ti.UI.createLabel({
		color : '#000000',
		font : {
			fontSize : '14dip',
			fontWeight : 'bold'
		},
		textAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		left : '22%',
		visible : false,
		width : '48%',
		height : '100%',
		zIndex : 900
	});
	window.add(message);

	window.add(game);

	window.open({
		fullscreen : true,
		navBarHidden : true
	});
	return window;
}

module.exports = ArcheryMainGame;
