var win = Titanium.UI.createWindow();
win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

function getGameImage(){
	var quest_name = Ti.App.Properties.getString('quest_name');
	switch(quest_name){
		case 'Archery':
			return "archery_game";
		case 'Sonnet':
			return "sonnet_game";
		case 'Joust':
			return "joust_game";
		default:
			return "archery_game";
	} 
		
	
}

var game = Titanium.UI.createImageView({
	image : "images/"+getGameImage()+".png",
	height : '100%',
	width : '100%',
	top : 0,
	left : 0,
	zIndex : 100
});
game.addEventListener('click', function() {
	function getLevel(callback){
		var url = "http://justechinfo.com/kap_server/set_quests_status.php?assign_quest_id=" + Ti.App.Properties.getString('assign_quest_id') + "&status=COMPLETE";
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				callback();
			},
			onerror : function(e) {
				Ti.API.debug("STATUS: " + this.status);
				Ti.API.debug("TEXT: " + this.responseText);
				Ti.API.debug("ERROR: " + e.error);
				alert('There was an error retrieving the remote data. Try again.');
			},
			timeout : 5000
		});
		xhr.open("GET", url);
		xhr.send();
	}
	//numberOfFriends
	var numberOfFriends; 
	getLevel(function(){
		var window1 = Titanium.UI.createWindow({
			url : 'quests_completed_info.js'
		});
		window1.open();
	});
});
win.add(game);
win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'quests_incomplete.js'
	});
	window.open();
	removeAllContent();
});

win.open(); 