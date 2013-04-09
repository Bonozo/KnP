function CookingGame(quest_status, quest_id, userinfo) {
    var played = false;
    var _assign_quest_id = "";
    var images_counter = 0;
    function hideLoader() {
        images_counter++;
        if (images_counter >= 2) {
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

    var _url = "http://therealmattharmon.com/knp/knp_assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "&" + "assign_to_uid=" + userinfo.Record[0].UID + "&" + "quest_ids=" + quest_id + "&message=Single Player Game&num_of_hours=3&status=SINGLE_PLAYER_GAME";

    var items_json = "";
    var items_length = 0;
    var httpclientt = require('/ui/common/Functions/function');
    httpclientt.requestServer({
        success : function(e) {
            items_json = JSON.parse(this.responseText);
            items_length = items_json.Record.length;
            if (items_json.Record != undefined) {
                if (items_json.Record[0].LOW_ENERGY) {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title : 'Low Energy!',
                        message : items_json.Record[0].LOW_ENERGY,
                        buttonNames : ['OK']
                    });
                    alertDialog.show();
                    alertDialog.addEventListener('click', function(e) {
                        self.close();
                    });
                } else {
                    _assign_quest_id = items_json.Record[0].ASSIGN_QUEST_ID;
                }
                hideLoader();
            }
        },
        method : 'GET',
        contentType : 'text/xml',
        url : _url,

    });

    // Create an ImageView.
    var gameImage = Ti.UI.createImageView({
        image : '/assets/games/cooking/oven.png',
        width : '100%',
        height : '100%',
        top : 0,
        left : 0
    });
    hideLoader();

    gameImage.addEventListener('load', function() {
        hideLoader();
    });
    self.addEventListener('click', function() {
        if (!played) {
            actInd.show();
            //alert(_assign_quest_id);

            _url = "http://therealmattharmon.com/knp/knp_set_quest_status.php?game_status=COMPLETE&quest_status=" + quest_status + "&assign_quest_id=" + _assign_quest_id + "&quest_id=" + quest_id + "&uid=" + userinfo.Record[0].UID + "&friend_uid=" + userinfo.Record[0].UID + "";
            httpclientt.requestServer({
                success : function(e) {
                    items_json = JSON.parse(this.responseText);
                    if (items_json.Record != undefined) {
                        if (items_json.Record[0].Message == 'Updated!') {
                            actInd.hide();
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
    // Add to the parent view.
    self.add(gameImage);
    var panImage = Ti.UI.createImageView({
        image : '/assets/games/cooking/pan2.png',
        width : '40%',
        height : '40%',
        top : '42%',
        left : '27%',
        //zIndex : 10

    });
    self.add(panImage);
    var gooseImage = Ti.UI.createImageView({
        image : '/assets/games/cooking/goose2.png',
        width : '35%',
        height : '38%',
        top : '32.5%',
        left : '32%'
    });
    self.add(gooseImage);
    var cauldronImage = Ti.UI.createImageView({
        image : '/assets/games/cooking/cauldron.png',
        width : '45%',
        height : '29%',
        bottom : '0%',
        left : '25%'
    });
    self.add(cauldronImage);

    return self;
}

module.exports = CookingGame;
