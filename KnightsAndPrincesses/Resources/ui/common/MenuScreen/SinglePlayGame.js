function JoustGame(game, quest_id, userinfo) {
	var played = false;
	var _assign_quest_id = "";
	var images_counter = 0;
	function hideLoader(){
		images_counter++;
		if(images_counter >= 2){
			actInd.hide();
		}
	}
	
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';//message will only shows in android.
	actInd.show();
	
	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true
	});

	var _url = 
	"http://justechinfo.com/kap_server/assign_quests.php?" + 
	"assign_by_uid="+userinfo.Record[0].UID+"&" + 
	"assign_to_uid="+userinfo.Record[0].UID+"&" +
	"quest_ids="+quest_id+"&" +
	"message=Single Player Game";
	
	var items_json = "";
	var items_length = 0;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				_assign_quest_id = items_json.Record[0].assign_quest_id;
				hideLoader();
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : _url,

	});

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
		if(!played){
			_url =	"http://justechinfo.com/kap_server/set_quests_status.php?" +  
			 		"assign_quest_id=" + _assign_quest_id+ 
			 		"&status=COMPLETE"; 
			httpclientt.requestServer({
				success : function(e) {
					items_json = JSON.parse(this.responseText);
					if (items_json.Record != undefined) {
						if(items_json.Record[0].Message == 'Updated!'){
							alert('You have completed this quest.\nPress back button');
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
		}
		else{
			alert('You have already played this quest!\nPress back button');
		}
	});

	// Add to the parent view.
	self.add(gameImage);

	return self;
}

module.exports = JoustGame;
