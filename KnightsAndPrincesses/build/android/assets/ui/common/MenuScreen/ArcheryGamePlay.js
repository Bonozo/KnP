function ArcheryGamePlay(quest_status, quest_id, userinfo) {
	var window = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true

	});
	var played = false;
	window.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	// Obtain game module
	var quicktigame2d = require('com.googlecode.quicktigame2d');

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
	var bullsEyeWidth = getPixelFromPercent('x',30);
	var bullsEyeImageView = quicktigame2d.createSprite({
		image : 'assets/games/archery/bullseye.png',
		width : bullsEyeWidth,
		height : bullsEyeWidth,
		x : getPixelFromPercent('x',50)-(bullsEyeWidth/2),
		y : getPixelFromPercent('y',50)-(bullsEyeWidth/2),
		z : 400
	});
	scene.add(bullsEyeImageView);
	var bowImageRatio = 1.78515625;
	var bowImageWidth = getPixelFromPercent('x', 55);
	var bowImageHeight = getRespectiveHeight(bowImageWidth,bowImageRatio);
	var bowImageView = quicktigame2d.createSprite({
		image : 'assets/games/archery/bow.png',
		width : bowImageWidth,
		height : bowImageHeight,
		x : 0,
		y : winHeight - bowImageHeight,
		z : 500
	});
	scene.add(bowImageView);
	
	var arrowImageRatio = 3.5555;
	var arrowImageWidth = getPixelFromPercent('x', 20);
	var arrowImageHeight = getRespectiveHeight(arrowImageWidth,arrowImageRatio);
	var arrowImageView = quicktigame2d.createSprite({
		image : 'assets/games/archery/arrow.png',
		width : arrowImageWidth,
		height : arrowImageHeight,
		x : getPixelFromPercent('x',53)-(arrowImageWidth/2),
		y : winHeight - arrowImageHeight,
		z : 500
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
	function getRespectiveHeight(width,ratio){
		return width * ratio;
	}
	function getRespectiveWidth(height,ratio){
		return height / ratio;
	}


	function initObjects() {
		bowImageView.x = 0;
		bowImageView.y = winHeight - bowImageHeight;
		bowImageView.height = bowImageHeight;
		bowImageView.width = bowImageWidth;
		
		//bullsEyeImageView.scaleFromCenter(ScaleSpriteFromPercentage(winWidth,237,75),ScaleSpriteFromPercentage(winWidth,256,25),0,0);
		
		bullsEyeImageView.scale(1);// = bullsEyeWidth;
		bullsEyeImageView.x = getPixelFromPercent('x',50)-(bullsEyeWidth/2);
		bullsEyeImageView.y = getPixelFromPercent('y',50)-(bullsEyeWidth/2);

		arrowImageView.width = arrowImageWidth;
		arrowImageView.height = arrowImageHeight;
		arrowImageView.x = getPixelFromPercent('x',53)-(arrowImageWidth/2);
		arrowImageView.y = winHeight - arrowImageHeight;
		
		backgroundView.x = 0;
		backgroundView.y = 0;
		backgroundView.scale(1);
	}

	var updateTimerID = 0;
	
	var background_transform = quicktigame2d.createTransform();
		background_transform.duration = 3000;
		background_transform.scale(2, 2);

	var transform_bulseye = quicktigame2d.createTransform();
		transform_bulseye.duration = 3000;
		transform_bulseye.scale(2, 2);

	game.addEventListener('onload', function(e) {

		TOUCH_SCALE = game.screen.width / game.size.width;

		game.registerForMultiTouch();
		initObjects();

		bullsEyeImageView.transform(transform_bulseye);

		backgroundView.transform(background_transform);

		initObjects();
		scene.add(backgroundView);

		// Start the game
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
				//hideLoader();
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : _url,

	});

	game.addEventListener('click', function(e) {
		if (!played) {
			//alert(_assign_quest_id);

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
	window.addEventListener("open", function() {
		var activity = window.activity;

		activity.addEventListener('resume', function(e) {
			// alert('resume');

			updateTimerID = setInterval(function() {
				initObjects();
				bullsEyeImageView.transform(transform_bulseye);
				backgroundView.transform(background_transform);

			}, 3000);
		});
		activity.addEventListener('pause', function(e) {
			clearInterval(updateTimerID);
			updateTimerID = null;
		});

		activity.addEventListener('destroy', function(e) {
			clearInterval(updateTimerID);
			updateTimerID = null;
		});

	});

	window.add(game);
	window.open({
		fullscreen : true,
		navBarHidden : true
	});

	return window;

}

module.exports = ArcheryGamePlay;
