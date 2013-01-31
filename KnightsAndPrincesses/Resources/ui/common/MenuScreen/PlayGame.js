function PlayGame(game, assign_quest_id) {
	var played = false;
	var images_counter = 0;
	function hideLoader() {
		images_counter++;
		if (images_counter >= 1) {
			actInd.hide();
		}
	}

	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();

	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	// Create an ImageView.
	var gameImage = Ti.UI.createImageView({
		image : '/assets/' + game + '.png',
		width : '100%',
		height : '100%',
		top : 0,
		left : 0
	});
	gameImage.addEventListener('load', function() {
		hideLoader();
	});
	gameImage.addEventListener('click', function() {
		if (!played) {
			var httpclientt = require('/ui/common/Functions/function');
			_url = "http://justechinfo.com/kap_server/set_quests_status.php?" + "assign_quest_id=" + assign_quest_id + "&status=COMPLETE";
			httpclientt.requestServer({
				success : function(e) {
					items_json = JSON.parse(this.responseText);
					if (items_json.Record != undefined) {
						if (items_json.Record[0].Message == 'Updated!') {
							Ti.App.fireEvent('game_played', {
								status: 'complete'
							});
							self.close();
							//alert('You have completed this quest.\nPress back button');
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
			Ti.App.fireEvent('game_played', {});

		} else {
			alert('You have already played this quest!\nPress back button');
		}
	});

	// Add to the parent view.
	self.add(gameImage);

	return self;
}

module.exports = PlayGame;
