Ti.App.GLBL_default_font = 'MagicMedieval';
Ti.App.GLBL_gender = "";
Ti.App.GLBL_name = "";
Ti.App.GLBL_character_image = "";
Ti.App.GLBL_uid = "";

Ti.App.GLBL_skin_color = 'gray';

Ti.App.GLBL_hair_stlyes = ['Style1', 'Style2', 'Style3'];
Ti.App.GLBL_hair_color = ['gray', 'red'];
Ti.App.GLBL_hair_color_image_name = ['hdpi_male_character_bad.png', 'hdpi_male_character_good.png'];
Ti.App.GLBL_skin_tone = ['Tone1', 'Tone2', 'Tone3'];
Ti.App.GLBL_face = ['face1', 'face2', 'face3'];
Ti.App.GLBL_clothing = ['clothing1', 'clothing2', 'clothing3'];
Ti.App.GLBL_color_scheme = ['Color scheme1', 'Color scheme2', 'Color scheme3'];

Ti.App.GLBL_curr_hair_stlyes = 0;
Ti.App.GLBL_curr_hair_color = 0;
Ti.App.GLBL_curr_skin_tone = 0;
Ti.App.GLBL_curr_face = 0;
Ti.App.GLBL_curr_clothing = 0;
Ti.App.GLBL_curr_color_scheme = 0;
Ti.App.GLBL_character_created = false;
/*
 * Knights and Princesses:
 * Social application.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
		/*	if (isTablet) {
				Window = require('ui/tablet/ApplicationWindow');
			}
			else {
		*/
		// Android uses platform-specific properties to create windows.
		// All other platforms follow a similar UI pattern.
	if (osname === 'android') {
		Window = require('ui/handheld/android/SignIn');
	}
	else {
		Window = require('ui/handheld/SignIn');
	}
	
//	}
	new Window().open();
})();
