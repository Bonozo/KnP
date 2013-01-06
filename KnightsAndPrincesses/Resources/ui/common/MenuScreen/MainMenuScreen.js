function openNewBody(userinfojson,activeScreen){
	var Body = require('ui/common/MenuScreen/'+activeScreen);
	return Body(userinfojson);
	Body = null;
}
function MainMenuScreen(userinfojson) {
	var active_screen = "StatusScreen";
	var MainScreen = [];
	
	
	var main_window = Titanium.UI.createWindow({
		backgroundImage : '/assets/inventoryBackground.png'
	});
	main_window.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	
	var images_counter = 0;
	function hideLoader(){
		images_counter++;
		if(images_counter >= 2){
			actInd.hide();
		}
	}
	
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading Main Screen...';//message will only shows in android.
	actInd.show();
	var httpclientt = require('/ui/common/Functions/function');
	
	httpclientt.requestServer({
		success : function(e) {
			var userinfojson = JSON.parse(this.responseText);

			var ProgressBar = require('ui/common/menus/ProgressBar');
			MainScreen.header = ProgressBar(userinfojson);
			ProgressBar = null;
			
			var Footer = require('ui/common/menus/Footer');
			MainScreen.footer = Footer(userinfojson);
			Footer = null;
			
			
			main_window.add(MainScreen.header);
			main_window.add(MainScreen.footer);
			
			hideLoader();
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + userinfojson.Record[0].UID + "",
	});
	
	MainScreen.body = openNewBody(userinfojson,active_screen); 
	main_window.add(MainScreen.body);
	
	var MenuIcons = require('ui/common/menus/MenuIcons');
	MainScreen.menuIcons  = MenuIcons(active_screen);
	MenuIcons = null;
	main_window.add(MainScreen.menuIcons);
	
	hideLoader();
	
	Ti.App.addEventListener('menu_active', function(data) {
		var loader = Titanium.UI.createActivityIndicator();
		loader.message = 'Loading Screen...';
		loader.show();
		main_window.remove(MainScreen.body);
		MainScreen.body = openNewBody(userinfojson, data.clicked_item);
		main_window.add(MainScreen.body);
		loader.hide();
	});
	

	main_window.addEventListener('open',function(e){
		hideLoader();
	});

/*
	main_window.addEventListener('android:back', function(e) {
		main_window.remove(MainScreen.header);
		MainScreen.header = null;

		main_window.remove(MainScreen.menuIcons);
		MainScreen.menuIcons = null;

		main_window.remove(MainScreen.body);
		MainScreen.body = null;

		main_window.remove(MainScreen.footer);
		MainScreen.footer = null;

		MainMenuScreen = null;
		main_window.close();
		
		main_window = null;
	});
*/
	//main_window.add(view);
	return main_window;

};
module.exports = MainMenuScreen; 