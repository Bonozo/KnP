function PlayGame(game, quest_status, quest_id, userinfo, friend_uid, friend_quest_info) {
    //http://therealmattharmon.com/knp/knp_set_quest_status.php?game_status=COMPLETE&quest_status=INCOMPLETE_FRIEND&assign_quest_id=90000250&quest_id=80000004&uid=10000007&friend_uid=10000011
	if (game == 'sonnet_game') {
        var SonnetGamePlay = require('ui/iphone/MenuScreen/SonnetQuestPlay');
        var sonnetgameplay = new SonnetGamePlay(quest_status, quest_id, userinfo, friend_uid, friend_quest_info);
        return sonnetgameplay;
    } else {
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
    var view = Titanium.UI.createView({
        width : '100%',
        height : '100%',
        //backgroundImage : '/assets/inventoryBackground.png'

    });
    self.add(view);

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

            var httpclientt = require('ui/iphone/Functions/function');
            _url = "http://therealmattharmon.com/knp/knp_set_quest_status.php?game_status=COMPLETE&quest_status=" + quest_status + "&assign_quest_id=" + friend_quest_info.ASSIGN_QUEST_ID + "&quest_id=" + quest_id + "&uid=" + userinfo.Record[0].UID + "&friend_uid=" + friend_uid;
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
                                self.close();
                            });
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
            Ti.App.fireEvent('game_played', {
                status : 'complete'
            });

        } else {
            alert('You have already played this quest!\nPress back button');
        }
    });

    // Add to the parent view.
    view.add(gameImage);

    return self;
    }
}

module.exports = PlayGame;
