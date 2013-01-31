function JoustinGamePlay() {
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
	var window = Ti.UI.createWindow({
		//backgroundImage : 'assets/joust_game.png'
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true

	});
	
	window.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	/*var htmlFile = 'triangle.html';
	var wv = Ti.UI.createWebView({
	    url: htmlFile,
	    zIndex : 500,
	    top:40
	});
 	*/

	// Obtain game module
	// Obtain game module
	var quicktigame2d = require('com.googlecode.quicktigame2d');

	// Create view for your game.
	// Note that game.screen.width and height are not yet set until the game is loaded
	var game = quicktigame2d.createGameView();

	// Frame rate can be changed (fps can not be changed after the game is loaded)
	game.fps = 30;

	// set initial background color to black
	game.color(0, 0, 0);

	game.debug = true;

	var shapes = new Array();

	// Create game scene
	var scene = quicktigame2d.createScene();
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	// add your scene to game view
	game.pushScene(scene);

	var TOUCH_SCALE = 1;

	var sound = Titanium.Media.createSound({
		// url : '/sounds/friendship_request_bell.mp3'
		url : '/sounds/horse_gollap_noise.mp3'
	});
	//	sound.setLooping(true);
	//	sound.play();
	var background = quicktigame2d.createSprite({
		image : 'assets/joust_game.png',
		width : winWidth,
		height : winHeight,
		x : 0,
		y : 0
	});
	scene.add(background);

	var lance = quicktigame2d.createSprite({
		image : 'assets/lance.png',
		width : 100,
		height : 160
	});
	var knightCharacter = quicktigame2d.createSpriteSheet({
		image : 'assets/games/jousting/knight_character.png',
		width : 211,
		height : 322
	});

	function initknightCharacter() {
		knightCharacter.x = 0;
		knightCharacter.y = 0;
		//knightCharacter.frame = 0;
		knightCharacter.scale(0.2);
	}

	//alert(game.screen.width+'hight'+game.screen.height);

	// knightCharacter.animate([0, 1, 2, 3, 4, 5], 150, -1, 0);

	var updateTimerID = 0;
	// Onload event is called when the game is loaded.
	game.addEventListener('onload', function(e) {

		TOUCH_SCALE = game.screen.width / game.size.width;

		game.registerForMultiTouch();
				initknightCharacter();
				
				var transform  = quicktigame2d.createTransform();
				transform.duration = 3000;
				transform.scale(1.5, 1.5);
				transform.easing = quicktigame2d.ANIMATION_CURVE_EASE_IN;
				transform.move(50, 200);
				actInd.hide();
				knightCharacter.transform(transform);

				if(sound != null)
					sound.play();

		/*
		 var sscale = game.size.height / 480;
		 game.screen = {
		 width : game.size.width / sscale,
		 height : game.size.height / sscale
		 };
		 */

		initknightCharacter();
		scene.add(knightCharacter);
		// Start the game
		game.start();
		
		// sound.play();
		
	});

	var onTouchStart = function(e) {

		Ti.API.info(e.type + ": " + JSON.stringify(e.points));

		for (var pointName in e.points) {

/*				if ( typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
			shapes[pointName] = quicktigame2d.createSprite({
					width : 64,
					height : 64
				});
				*/
					lance.x = e.points[pointName].x;
					lance.y = e.points[pointName].y;
					lance.z = 2;
				
				scene.add(lance);


/*				if (e.type == 'touchstart') {
					shapes[pointName].color(1, 0, 0);
					// draw red point when shape is created at touchstart
				} else if (e.type == 'touchmove') {
					shapes[pointName].color(0, 1, 0);
					// draw green point when shape is created at touchmove
				} else {
					shapes[pointName].color(0, 0, 1);
					// draw blue point when shape is created at touchstart__pointer
				}

				scene.add(shapes[pointName]);

			}
*/
				lance.center = {
				x : e.points[pointName].x * TOUCH_SCALE,
				y : 40 +(e.points[pointName].y * TOUCH_SCALE)
			};
		}
	};

	var onTouchEnd = function(e) {

		// On Android, 'touchend_pointer' event is called before firing 'touchend' event when multi touch is detected.

		Ti.API.info(e.type + ": " + JSON.stringify(e.points));
			scene.remove(lance);
/*
		for (var pointName in e.points) {

			if ( typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
				Ti.API.info("Couldn't find touch: " + pointName);
				continue;
			}

			scene.remove(shapes[pointName]);

			shapes[pointName] = null;
			delete shapes[pointName];
		}

		// clear all rectangles because all poiinters are gone
		if (e.type == 'touchend') {
				for (var pointName in shapes) {
					if ( typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
						continue;
					}
				scene.remove(shapes[pointName]);
				shapes[pointName] = null;
			}
			shapes.length = 0;
		}
*/	};

	game.addEventListener('touchstart', onTouchStart);
//	game.addEventListener('touchmove', onTouchStart);
	game.addEventListener('touchstart_pointer', onTouchStart);
	// Called only on Android

	game.addEventListener('touchend', onTouchEnd);
	game.addEventListener('touchend_pointer', onTouchEnd);

/*
	window.addEventListener('android:blur', function(e) {
		// sound.stop();
		alert('blur');
	});
	window.addEventListener('android:home', function(e) {
		// sound.stop();
		alert('home');
	});
*/

	/*
	Ti.Android.currentActivity.addEventListener('resume', function() {
	if (sound != undefined)
	sound.play();

	});
	*/
	// Called only on Android

	window.addEventListener("open", function() {
		var activity = window.activity;

		activity.addEventListener('resume', function(e) {
			// alert('resume');
			updateTimerID = setInterval(function() {
/*
				var sprite = quicktigame2d.createSprite({image:'/assets/games/jousting/knight_character.png'});
				sprite.scale(2); // scales up by twice
				scene.add(knightCharacter);				
*/
				initknightCharacter();
				
				var transform  = quicktigame2d.createTransform();
				transform.duration = 3000;
				transform.scale(1.5, 1.5);
				transform.easing = quicktigame2d.ANIMATION_CURVE_EASE_IN;
				transform.move(50, 200);
				actInd.hide();
				knightCharacter.transform(transform);

				if(sound != null)
					sound.play();
			}, 3000);
		});
		activity.addEventListener('pause', function(e) {
			// alert('pause');			// alert('pause');

			sound.stop();
			clearInterval(updateTimerID);
			updateTimerID = null;
		});

		activity.addEventListener('destroy', function(e) {
			// alert('destroy');
			sound.stop();
			clearInterval(updateTimerID);
			updateTimerID = null;
		}); 

	}); 
	// Add your game view
	window.add(game);
	window.open({
		fullscreen : true,
		navBarHidden : true
	});

/*
	window.addEventListener('android:back', function(e) {
		alert('back button');
		sound.stop();
		sound = null;
		window.remove(game);
		window.close();

	});
*/

//	window.add(wv);
	return window;

}

module.exports = JoustinGamePlay;
