function ArcheryMainGame(quest_status, quest_id, userinfo) {
	var window = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});

	var played = false;
	window.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	var points_earned = 0;

	// Obtain game module
	var quicktigame2d = require('com.googlecode.quicktigame2d');
	var updateTimerID = 0;

	var ambient_bird_chirps_sound = Titanium.Media.createSound({
		url : '/sounds/ambient_bird_chirps.mp3'
	});
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
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
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

	var updateTimerID = 0;

	game.addEventListener('onload', function(e) {

		TOUCH_SCALE = game.screen.width / game.size.width;

		game.registerForMultiTouch();
		// initObjects();
		//
		// bullsEyeImageView.transform(transform_bulseye);
		//
		// backgroundView.transform(background_transform);
		//
		// initObjects();
		// scene.add(backgroundView);
		//
		/* Start the game */
		game.start();

	});
	/*
	 * Assigning Qusts
	 *
	 */
	/* 	var _url = "http://bonozo.com:8080/knp/knp_assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "&" + "assign_to_uid=" + userinfo.Record[0].UID + "&" + "quest_ids=" + quest_id + "&message=Single Player Game&num_of_hours=3&status=SINGLE_PLAYER_GAME";

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
	 */
	game.addEventListener('click', function(e) {
		if (!played) {
			//alert(_assign_quest_id);
			return;
			return;
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

							var alertDialog = Titanium.UI.createAlertDialog({
								title : 'You have completed ' + quest_name + '.',
								message : 'Rewards earned:' + rewards,
								buttonNames : ['OK']
							});
							alertDialog.show();
							alertDialog.addEventListener('click', function(e) {
								window.close();
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
			played = true;
		} else {
			alert('You have already played this quest!\nPress back button');
		}

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
	var aiming_current_point_y = arrowImageView.y;
	var aiming_initial_point_y = arrowImageView.y;
	var aiming_final_point_y = arrowImageView.y + 60;
	var aiming_starting_point = {};
	var shot_fired = false;
	game.addEventListener('touchstart', function(e) {
		// someLabel.text = "(" + (winWidth - getPixelFromPercent('y', 4.5)) + ", " + getPixelFromPercent('x', 10) + "): " + indicator_pointer_ImageWidth + "x" + indicator_pointer_ImageHeight;
		//'touchstart : ' + e.x + ',' + e.y;
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

		Ti.API.info(e.y);
	});
	var last_moved_points = {};
	var arrow_position_points = 0;
	var aiming_power = 0;
	game.addEventListener('touchmove', function(e) {
		// someLabel.text = "(" + (winWidth - getPixelFromPercent('y', 4.5)) + ", " + getPixelFromPercent('x', 10) + "): " + indicator_pointer_ImageWidth + "x" + indicator_pointer_ImageHeight;
		/*
		 * Indicator pointer 'y'
		 */
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
		} else if (aiming_tapped && last_moved_points.y < e.y) {// Sliding aim down
			if (aiming_current_point_y < (aiming_final_point_y - 1)) {
				arrow_draw_sound.play();
				aiming_power++;
				aiming_current_point_y++;
			}
			arrowImageView.y = aiming_current_point_y;
			someLabel.text = aiming_current_point_y + " :: " + aiming_initial_point_y + " :: " + aiming_final_point_y;
		} else if (aiming_tapped && last_moved_points.y > e.y) {// Sliding aim up
			if (aiming_current_point_y > (aiming_initial_point_y + 1)) {
				arrow_draw_sound.play();
				aiming_current_point_y--;
				aiming_power--;
			}
			arrowImageView.y = aiming_current_point_y;
			someLabel.text = aiming_current_point_y + " :: " + aiming_initial_point_y + " :: " + aiming_final_point_y;
		} else {
			// aiming_tapped = false;
		}
		someLabel.text = bullsEyeImageView.collidesWith(arrowImageView);
		last_moved_points.x = e.x;
		last_moved_points.y = e.y;
	});
	game.addEventListener('touchend', function(e) {
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
			arrow_fly_sound.play();
			setTimeout(function() {
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
							//alert('Fourth Orbit');

						}
					}
				}
				if (hit)
					arrow_hit_sound.play();
				else
					arrow_miss_sound.play();
				alert((points_earned != 0) ? ("You have earned " + points_earned + " points!") : "You earned no point.");
			}, 300);
			// arrowImageView.y = aiming_initial_point_y;
			// aiming_current_point_y = aiming_initial_point_y;

			// Create a Button.
			var reset = Ti.UI.createButton({
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
			window.add(reset);

		}
	});
	var gameloop_timeline = 0;
	window.addEventListener("open", function() {
		var activity = window.activity;
		activity.addEventListener('resume', function(e) {
			updateTimerID = setInterval(function() {
				if ((gameloop_timeline % 41000) == 0)
					ambient_bird_chirps_sound.play();
				//initObjects();
				//bullsEyeImageView.transform(transform_bulseye);
				//backgroundView.transform(background_transform);
			}, 1000);
		});
		activity.addEventListener('pause', function(e) {
			clearInterval(updateTimerID);
			ambient_bird_chirps_sound.stop();
			updateTimerID = null;
		});
		activity.addEventListener('destroy', function(e) {
			clearInterval(updateTimerID);
			ambient_bird_chirps_sound.stop();
			updateTimerID = null;
		});
	});
	//var aiming_tolerence_rate = 65;

	function is_hit_circle(x, y, a, b, r, aiming_tolerence_rate) {
		var left_side = Math.pow((x - a), 2) + Math.pow((y - b), 2);
		var right_side = Math.pow(r, 2);
		Ti.API.info(x + ", " + y + ", " + a + ", " + b + ", " + r);
		Ti.API.info(left_side + ", " + right_side);
		return (left_side == right_side || (left_side >= right_side && left_side <= (right_side + aiming_tolerence_rate)
		) || (left_side < right_side && left_side >= (right_side - aiming_tolerence_rate)
		)
		) ? true : false;

		var y1 = b + Math.sqrt(Math.pow(r, 2) - Math.pow((x - a), 2));
		var y2 = b - Math.sqrt(Math.pow(r, 2) - Math.pow((x - a), 2));
		Ti.API.info(x + ", " + y + ", " + a + ", " + b + ", " + r + " :: " + y1 + ", " + y2);
		return ((y1 >= y && y1 <= (y + aiming_tolerence_rate)) || (y1 < y && y1 > (y - aiming_tolerence_rate)) || (y2 < y && y2 > (y - aiming_tolerence_rate)) || (y2 < y && y2 > (y - aiming_tolerence_rate)) ) ? true : false;
	}


	window.add(game);

	// Add to the parent view.

	window.open({
		fullscreen : true,
		navBarHidden : true
	});
	return window;
}

module.exports = ArcheryMainGame;
