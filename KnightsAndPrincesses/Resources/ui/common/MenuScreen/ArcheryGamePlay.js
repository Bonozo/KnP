<<<<<<< HEAD
function ArcheryGamePlay(quest_status, quest_id, userinfo) {
    var actInd = Titanium.UI.createActivityIndicator();
    actInd.message = 'Loading...';
    //message will only shows in android.
   actInd.show();
    var window = Ti.UI.createWindow({
        //backgroundImage : 'assets/joust_game.png'
        orientation : Ti.UI.PORTRAIT,
        navBarHidden : true,
        fullscreen : true

    });
    var played = false;
    window.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
    /*var htmlFile = 'triangle.html';
    var wv = Ti.UI.createWebView({
        url: htmlFile,
        zIndex : 500,
        top:40
    });
    */

    // Obtain game module
    // Obtain game module
    var quicktigame2d = require('com.googlecode.quicktigame2d');

    // Create view for your game.
    // Note that game.screen.width and height are not yet set until the game is loaded
    var game = quicktigame2d.createGameView();

    // Frame rate can be changed (fps can not be changed after the game is loaded)
    game.fps = 30;

    // set initial background color to black
    game.color(0, 0, 0);

    game.debug = true;

    var shapes = new Array();

    // Create game scene
    var scene = quicktigame2d.createScene();
    var winWidth = Ti.Platform.displayCaps.platformWidth;
    var winHeight = Ti.Platform.displayCaps.platformHeight;
    // add your scene to game view
    game.pushScene(scene);

    var TOUCH_SCALE = 1;

/*
    var sound = Titanium.Media.createSound({
        // url : '/sounds/friendship_request_bell.mp3'
        url : '/sounds/horse_gollap_noise.mp3'

    });
*/
    //  sound.setLooping(true);
    //  sound.play();

/*
    var background = quicktigame2d.createSprite({
        image : 'assets/archery.png',
        width : 90,
        height : 130,
        x : 80,
        y : 180
    });
    scene.add(background);
*/

    var knightCharacter = quicktigame2d.createSprite({
        image : 'assets/123.png',
        width : winWidth,
        height : winHeight
        //x : 0,
       // y : 0
    });
    scene.add(knightCharacter);
    var background_attack = quicktigame2d.createSprite({
        image : 'assets/arch.png',
        width : 65,
        height : 200,
        x : 90,
        y : 225,
        z : 500
    });
    scene.add(background_attack);
    function initknightCharacter() {
        knightCharacter.x = 0;
        knightCharacter.y = 0;
        //knightCharacter.frame = 0;
        knightCharacter.scale(1);
    }
        var updateTimerID = 0;
    game.addEventListener('onload', function(e) {

        TOUCH_SCALE = game.screen.width / game.size.width;

        game.registerForMultiTouch();
                initknightCharacter();
                
                var transform  = quicktigame2d.createTransform();
                transform.duration = 3000;
                transform.scale(2, 2);
                transform.easing = quicktigame2d.ANIMATION_CURVE_EASE_IN;
                transform.move(0, 165);
                actInd.hide();
                knightCharacter.transform(transform);

            /*
                if(sound != null)
                                sound.play();
            */
            
        /*
         var sscale = game.size.height / 480;
         game.screen = {
         width : game.size.width / sscale,
         height : game.size.height / sscale
         };
         */

        initknightCharacter();
        scene.add(knightCharacter);

        // Start the game
        game.start();
        
        // sound.play();

        
    });
            var _url = "http://therealmattharmon.com/knp/knp_assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "&" + "assign_to_uid=" + userinfo.Record[0].UID + "&" + "quest_ids=" + quest_id + 
            "&message=Single Player Game&num_of_hours=3&status=SINGLE_PLAYER_GAME";

        var items_json = "";
        var items_length = 0;
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                items_json = JSON.parse(this.responseText);
                items_length = items_json.Record.length;
                if (items_json.Record != undefined) {
                    _assign_quest_id = items_json.Record[0].ASSIGN_QUEST_ID;
                    //hideLoader();
                }
            },
            method : 'GET',
            contentType : 'text/xml',
            url : _url,

        });

    game.addEventListener('click', function(e) {
        if (!played) {
            //alert(_assign_quest_id);

            _url = "http://therealmattharmon.com/knp/knp_set_quest_status.php?game_status=COMPLETE&quest_status=" + quest_status + "&assign_quest_id=" + _assign_quest_id + "&quest_id=" + quest_id + "&uid=" + userinfo.Record[0].UID + "&friend_uid=" + userinfo.Record[0].UID + "";
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
                                    window.close();
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
    window.addEventListener("open", function() {
        var activity = window.activity;

        activity.addEventListener('resume', function(e) {
            // alert('resume');

            updateTimerID = setInterval(function() {
/*
                var sprite = quicktigame2d.createSprite({image:'/assets/games/jousting/knight_character.png'});
                sprite.scale(2); // scales up by twice
                scene.add(knightCharacter);             
*/
                initknightCharacter();
                
                var transform  = quicktigame2d.createTransform();
                transform.duration = 3000;
                transform.scale(2, 2);
                transform.easing = quicktigame2d.ANIMATION_CURVE_EASE_IN;
                transform.move(0, 165);
                actInd.hide();
                knightCharacter.transform(transform);

     /*
                if(sound != null)
                         sound.play();*/
     
            }, 3000);
        });
        activity.addEventListener('pause', function(e) {
            // alert('pause');
            // alert('pause');


          //  sound.stop();
            clearInterval(updateTimerID);
            updateTimerID = null;
        });

        activity.addEventListener('destroy', function(e) {
            // alert('destroy');

            //sound.stop();
            clearInterval(updateTimerID);
            updateTimerID = null;
        }); 

    }); 

            //game.start();
    // Add your game view
    window.add(game);
    window.open({
        fullscreen : true,
        navBarHidden : true
    });

/*
    window.addEventListener('android:back', function(e) {
        alert('back button');
        sound.stop();
        sound = null;
        window.remove(game);
        window.close();

    });
*/

//  window.add(wv);
    return window;


}

module.exports = ArcheryGamePlay;
=======
function ArcheryGamePlay(quest_status, quest_id, userinfo) {
    var actInd = Titanium.UI.createActivityIndicator();
    actInd.message = 'Loading...';
    //message will only shows in android.
   actInd.show();
    var window = Ti.UI.createWindow({
        //backgroundImage : 'assets/joust_game.png'
        orientation : Ti.UI.PORTRAIT,
        navBarHidden : true,
        fullscreen : true

    });
    var played = false;
    window.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
    /*var htmlFile = 'triangle.html';
    var wv = Ti.UI.createWebView({
        url: htmlFile,
        zIndex : 500,
        top:40
    });
    */

    // Obtain game module
    // Obtain game module
    var quicktigame2d = require('com.googlecode.quicktigame2d');

    // Create view for your game.
    // Note that game.screen.width and height are not yet set until the game is loaded
    var game = quicktigame2d.createGameView();

    // Frame rate can be changed (fps can not be changed after the game is loaded)
    game.fps = 30;

    // set initial background color to black
    game.color(0, 0, 0);

    game.debug = true;

    var shapes = new Array();

    // Create game scene
    var scene = quicktigame2d.createScene();
    var winWidth = Ti.Platform.displayCaps.platformWidth;
    var winHeight = Ti.Platform.displayCaps.platformHeight;
    // add your scene to game view
    game.pushScene(scene);

    var TOUCH_SCALE = 1;

/*
    var sound = Titanium.Media.createSound({
        // url : '/sounds/friendship_request_bell.mp3'
        url : '/sounds/horse_gollap_noise.mp3'

    });
*/
    //  sound.setLooping(true);
    //  sound.play();

/*
    var background = quicktigame2d.createSprite({
        image : 'assets/archery.png',
        width : 90,
        height : 130,
        x : 80,
        y : 180
    });
    scene.add(background);
*/

    var knightCharacter = quicktigame2d.createSprite({
        image : 'assets/123.png',
        width : winWidth,
        height : winHeight
        //x : 0,
       // y : 0
    });
    scene.add(knightCharacter);
    var background_attack = quicktigame2d.createSprite({
        image : 'assets/arch.png',
        width : 65,
        height : 200,
        x : 90,
        y : 225,
        z : 500
    });
    scene.add(background_attack);
    function initknightCharacter() {
        knightCharacter.x = 0;
        knightCharacter.y = 0;
        //knightCharacter.frame = 0;
        knightCharacter.scale(1);
    }
        var updateTimerID = 0;
    game.addEventListener('onload', function(e) {

        TOUCH_SCALE = game.screen.width / game.size.width;

        game.registerForMultiTouch();
                initknightCharacter();
                
                var transform  = quicktigame2d.createTransform();
                transform.duration = 3000;
                transform.scale(2, 2);
                transform.easing = quicktigame2d.ANIMATION_CURVE_EASE_IN;
                transform.move(0, 165);
                actInd.hide();
                knightCharacter.transform(transform);

            /*
                if(sound != null)
                                sound.play();
            */
            
        /*
         var sscale = game.size.height / 480;
         game.screen = {
         width : game.size.width / sscale,
         height : game.size.height / sscale
         };
         */

        initknightCharacter();
        scene.add(knightCharacter);

        // Start the game
        game.start();
        
        // sound.play();

        
    });
            var _url = "http://therealmattharmon.com/knp/knp_assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "&" + "assign_to_uid=" + userinfo.Record[0].UID + "&" + "quest_ids=" + quest_id + 
            "&message=Single Player Game&num_of_hours=3&status=SINGLE_PLAYER_GAME";

        var items_json = "";
        var items_length = 0;
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                items_json = JSON.parse(this.responseText);
                items_length = items_json.Record.length;
                if (items_json.Record != undefined) {
                    _assign_quest_id = items_json.Record[0].ASSIGN_QUEST_ID;
                    //hideLoader();
                }
            },
            method : 'GET',
            contentType : 'text/xml',
            url : _url,

        });

    game.addEventListener('click', function(e) {
        if (!played) {
            //alert(_assign_quest_id);

            _url = "http://therealmattharmon.com/knp/knp_set_quest_status.php?game_status=COMPLETE&quest_status=" + quest_status + "&assign_quest_id=" + _assign_quest_id + "&quest_id=" + quest_id + "&uid=" + userinfo.Record[0].UID + "&friend_uid=" + userinfo.Record[0].UID + "";
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
                                    window.close();
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
    window.addEventListener("open", function() {
        var activity = window.activity;

        activity.addEventListener('resume', function(e) {
            // alert('resume');

            updateTimerID = setInterval(function() {
/*
                var sprite = quicktigame2d.createSprite({image:'/assets/games/jousting/knight_character.png'});
                sprite.scale(2); // scales up by twice
                scene.add(knightCharacter);             
*/
                initknightCharacter();
                
                var transform  = quicktigame2d.createTransform();
                transform.duration = 3000;
                transform.scale(2, 2);
                transform.easing = quicktigame2d.ANIMATION_CURVE_EASE_IN;
                transform.move(0, 165);
                actInd.hide();
                knightCharacter.transform(transform);

     /*
                if(sound != null)
                         sound.play();*/
     
            }, 3000);
        });
        activity.addEventListener('pause', function(e) {
            // alert('pause');
            // alert('pause');


          //  sound.stop();
            clearInterval(updateTimerID);
            updateTimerID = null;
        });

        activity.addEventListener('destroy', function(e) {
            // alert('destroy');

            //sound.stop();
            clearInterval(updateTimerID);
            updateTimerID = null;
        }); 

    }); 

            //game.start();
    // Add your game view
    window.add(game);
    window.open({
        fullscreen : true,
        navBarHidden : true
    });

/*
    window.addEventListener('android:back', function(e) {
        alert('back button');
        sound.stop();
        sound = null;
        window.remove(game);
        window.close();

    });
*/

//  window.add(wv);
    return window;


}

module.exports = ArcheryGamePlay;
>>>>>>> New version
