function testing() {
	/*

	[Hi BUG] Notifications (Task, Message, etc) are not working.
	[BUG] completing assigned quests- I can't complete the quests. Blue Hit boxes appear when I tap Start Quest and it's larger than area of box. When I tap on each to finish them, the pop up appears but timer continues and quest isn't cleared
	[BUG] when accepting quests from a friend, there are number of graphical issues:  "start quests" boxes overlap boxes to the left.  "time remaining" is overlapping box at the top. Box should be centered; currently it's shifted right.
	[BUG] In "Assign Quest" screen, fonts for the various quests are overlap each other.  The fonts for the quest names do not fit in box
	[Feature] need audio cue to alert player to when he earns gold (cha-Ching) adds inventory items and completes cooking quest (trumpet)  [these sound assets are already available in the build to use, I believe]
	[Feature] Show all items over Level * 100 gold in Price as Locked (small Lock icon)
	[Feature] For Buying Apples Task, show how many bought (ex. 0/4, 2/4, 3/4)
	[Feature] When purchasing, be able to set how many (up to max can afford) [Q: I believe this issue was reported before, curious, was there a reason we did not implement then, technically?]

	* Single Window Application Template:
	* A basic starting point for your application.  Mostly a blank canvas.
	*
	* In app.js, we generally take care of a few things:
	* - Bootstrap the application with any data we need
	* - Check for dependencies like device type, platform version or network connection
	* - Require and open our top-level UI component
	*
	*/

	//bootstrap and check dependencies
	if (Ti.version < 1.8) {
		alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
	}

	// This is a single context application with mutliple windows in a stack
	(function() {
		//determine platform and form factor and render approproate components
		var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
		Ti.App.Properties.setString('service_enabled', true);
		//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
		//yourself what you consider a tablet form factor for android
		var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

		var Window;
		/*	if (isTablet) {
		Window = require('ui/iphone/LoginWindow');
		}
		else {
		*/		// Android uses platform-specific properties to create windows.
		// All other platforms follow a similar UI pattern.
		// if (osname === 'iphone' || osname === 'ipad') {
		// //Window = require('ui/handheld/LoginWindow');
		// Window = require('ui/iphone/LoginWindow');
		// } else {
		// Window = require('ui/handheld/android/LoginWindow');
		// //Window=require('ui/common/MenuScreen/inventorycrafting');
		// //Window=require('ui/common/MenuScreen/FreindInfo');
		// }
		/*		else if (osname === 'iphone' || osname === 'ipad') {
		//Window = require('ui/handheld/LoginWindow');
		Window = require('ui/iphone/LoginWindow');
		}
		*///	}
		// var JoustinGamePlay = require('/ui/common/MenuScreen/JoustinGamePlay');
		// var joustingameplay = new JoustinGamePlay("","","");
		// joustingameplay.open();
		// return;
		Window = require('ui/common/prescreens/IntroSlides');
		var win1 = new Window();
		win1.open();
	})();
}

testing();
