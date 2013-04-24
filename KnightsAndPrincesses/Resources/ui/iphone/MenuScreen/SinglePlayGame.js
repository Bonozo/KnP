function JoustGame(game, quest_status, quest_id, userinfo) {
    if (game == 'joust_game') {
        var JoustinGamePlay = require('/ui/iphone/MenuScreen/JoustinGamePlay');
        var joustingameplay = new JoustinGamePlay('INCOMPLETE', 80000003, userinfo);
        return joustingameplay;
    } else if (game == 'archery_game') {
        var ArcheryGamePlay = require('/ui/iphone/MenuScreen/ArcheryGamePlay');
        var archerygameplay = new ArcheryGamePlay('INCOMPLETE', 80000001, userinfo);
        return archerygameplay;
    } else if (game == 'cooking_game') {
        var CookingGamePlay = require('/ui/iphone/MenuScreen/CookingGame');
        var cookinggameplay = new CookingGamePlay('INCOMPLETE', 80000004, userinfo);
        return cookinggameplay;
    } else if (game == 'sonnet_game') {
        var SonnetGamePlay = require('ui/iphone/MenuScreen/SonnetGamePlay');
        var sonnetgameplay = new SonnetGamePlay('INCOMPLETE', 80000002, userinfo);
        return sonnetgameplay;
    } else {
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
            navBarHidden : true
        });
    self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

        var _url = "http://therealmattharmon.com/knp/knp_assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "&" + "assign_to_uid=" + userinfo.Record[0].UID + "&" + "quest_ids=" + quest_id + "&message=Single Player Game&num_of_hours=3&status=SINGLE_PLAYER_GAME";

        var items_json = "";
        var items_length = 0;
        var httpclientt = require('ui/iphone/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                items_json = JSON.parse(this.responseText);
                items_length = items_json.Record.length;
                if (items_json.Record != undefined) {
                    if(items_json.Record[0].LOW_ENERGY){
                        var alertDialog = Titanium.UI.createAlertDialog({
                            title : 'Low Energy!',
                            message : items_json.Record[0].LOW_ENERGY,
                            buttonNames : ['OK']
                        });
                        alertDialog.show();
                        alertDialog.addEventListener('click', function(e) {
                            self.close();
                        });
                    }
                    else{
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

        return self;
    }
}

module.exports = JoustGame;
