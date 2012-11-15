var win = Titanium.UI.createWindow();
win.orientationModes = [Ti.UI.PORTRAIT];

// Create a Button.
var completeQuests = Ti.UI.createButton({
	title : 'Click me to complete quest!',
	height : 200,
});

// Listen for click events.
completeQuests.addEventListener('click', function() {
	var url = "http://justechinfo.com/kap_server/set_quests_status.php?assign_quest_id=" + Ti.App.Properties.getString('assign_quest_id') + "&status=COMPLETE";
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
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
	///////////////////////////////////////////////////////////////
	var window1 = Titanium.UI.createWindow({
		url : 'quests_completed_info.js'
	});
	window1.open();


});

// Add to the parent view.
win.add(completeQuests);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
		url : 'quests_incomplete.js'
	});
	window.open();
	removeAllContent();
});

win.open(); 