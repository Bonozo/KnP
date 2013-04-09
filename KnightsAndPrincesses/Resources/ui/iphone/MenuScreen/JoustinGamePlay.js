function JoustinGamePlay(quest_status, quest_id, userinfo) {
    var actInd = Titanium.UI.createActivityIndicator();
    actInd.message = 'Loading...';
    actInd.show();
    var window = Ti.UI.createWindow({
        orientation : Ti.UI.PORTRAIT,
        navBarHidden : true,
        fullscreen : true

    });
    var winWidth = Ti.Platform.displayCaps.platformWidth;
    var winHeight = Ti.Platform.displayCaps.platformHeight;
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
    var played = false;

    // Create game scene
    var scene = quicktigame2d.createScene();

    // add your scene to game view
    game.pushScene(scene);
    var timer = 0;
    var TOUCH_SCALE = 1;
    var sound = Titanium.Media.createSound({
        url : '/sounds/horse_gollap_noise.mp3',
        looping : true
    });
    var whoosh_sound = Titanium.Media.createSound({
        url : '/sounds/whoosh.mp3'
    });
    
    function getPixelFromPercent(axis, percent) {
        if (axis == 'x') {
            return winWidth * percent / 100;
        } else if (axis == 'y') {
            return winHeight * percent / 100;
        }
    }
    function ScaleSpriteFromPercentage(screen_size,image_size,req_percent) {
        var a = screen_size * req_percent/100;
        return (a/image_size);
    }

    var sky_image = quicktigame2d.createSprite({
        image : 'assets/games/jousting/sky_image.png',
        width : getPixelFromPercent('x',100),
        height : getPixelFromPercent('y',50),
        x : getPixelFromPercent('x',0),
        y : getPixelFromPercent('y',0)
    });
    scene.add(sky_image);
    var joust_avatar_right = quicktigame2d.createSprite({
        image : 'assets/joust_avatar_right.png',
        width : getPixelFromPercent('x',15),
        height : getPixelFromPercent('y',15),
        x : getPixelFromPercent('x',85),
        y : getPixelFromPercent('x',0),
        z : 5
    });
    scene.add(joust_avatar_right);
    var joust_avatar_left = quicktigame2d.createSprite({
        image : 'assets/joust_avatar_left.png',
        width : getPixelFromPercent('x',15),
        height : getPixelFromPercent('y',15),
        x : getPixelFromPercent('x',0),
        y : getPixelFromPercent('x',0),
        z : 5
    });
    scene.add(joust_avatar_left);
    var energy_bar_left = quicktigame2d.createSprite({
        image : 'assets/energy_bar.png',
        width : getPixelFromPercent('x',17),
        height : getPixelFromPercent('y',3),
        x : getPixelFromPercent('x',0),
        y : getPixelFromPercent('x',21),
        z : 5
    });
    scene.add(energy_bar_left);
    var energy_bar_right = quicktigame2d.createSprite({
        image : 'assets/energy_bar.png',
        width : getPixelFromPercent('x',17),
        height : getPixelFromPercent('y',3),
        x : getPixelFromPercent('x',85),
        y : getPixelFromPercent('x',21),
        z : 5
    });
    scene.add(energy_bar_right);

    var bg_image = quicktigame2d.createSpriteSheet({
        image : 'assets/games/jousting/spritesheet_grass.png',
        width : 400,
        height : 198,
        x : getPixelFromPercent('x',0),
        y : getPixelFromPercent('y',50),
    });
    var lance = quicktigame2d.createSprite({
        image : 'assets/Joust_TargetingOnTarget.png',
        width : getPixelFromPercent('x',30),
        height : getPixelFromPercent('y',30)
    });
    //scene.add(lance);

    var lance_green = quicktigame2d.createSprite({
        image : 'assets/games/jousting/lance.png',
        width : getPixelFromPercent('x',30),
        height : getPixelFromPercent('y',35),
        z : 6
    });
    //scene.add(lance_green);
    var knight_image = quicktigame2d.createSpriteSheet({
        image : 'assets/games/jousting/ldpi_horse_spritesheet.png',
        width : 196.25,
        height : 256,
        x : getPixelFromPercent('x',38),
        y : getPixelFromPercent('y',39.5),
        z : 0
    });
    function initknightSprite() {
        knight_image.scaleFromCenter(
            ScaleSpriteFromPercentage(winWidth,196.25,16),
            ScaleSpriteFromPercentage(winHeight,256,21), 
            0, 0);

        knight_image.x = getPixelFromPercent('x',38);// - ((percent * 256 / 100) / 2); 
        knight_image.y = getPixelFromPercent('y', 39.5);// - ((percent * 256 / 100) / 2);


        
    }
    
    var rails_image = quicktigame2d.createSpriteSheet({
        image : 'assets/games/jousting/spritesheet_rail.png',
        width : 200,
        height : 193,
        x : getPixelFromPercent('x',0),
        y : getPixelFromPercent('y',50),
        z : 2
    });
    
    // Onload event is called when the game is loaded.
    game.addEventListener('onload', function(e) {
        // We should calculate the view scale because game.size.width and height may be changed due to the parent layout.
        TOUCH_SCALE = game.screen.width / game.size.width;

        // Enable MultiTouch support
        game.registerForMultiTouch();
        actInd.hide();

        // Start the game
        game.start();
    });
            var _url = "http://therealmattharmon.com/knp/knp_assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "&" + "assign_to_uid=" + userinfo.Record[0].UID + "&" + "quest_ids=" + quest_id + 
            "&message=Single Player Game&num_of_hours=3&status=SINGLE_PLAYER_GAME";

        var items_json = "";
        var items_length = 0;
        var httpclientt = require('ui/iphone/Functions/function');
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
    
    var sprite_count = 0;
    game.addEventListener('onloadsprite', function(e) {
        sprite_count++;
        
        //alert('Sprite Load! '+sprite_count);  
    });
    var flag = 0;
    var flag2 = 0;
    
    window.addEventListener("open", function() {
        bg_image.scaleFromCenter(
            ScaleSpriteFromPercentage(winWidth,400,100),
            ScaleSpriteFromPercentage(winHeight,198,50), 
            0, 0);
        scene.add(bg_image);
        rails_image.scaleFromCenter(
            ScaleSpriteFromPercentage(winWidth,200,50),
            ScaleSpriteFromPercentage(winHeight,193,50), 
            0, 0);
        scene.add(rails_image);
        //var activity = window.activity;

       // Ti.App.addEventListener('resume', function(e) {
        //knight_image.scaleFromCenter(0.3, 0.3, 0, 0);
        scene.add(lance_green);
        lance_green.hide();

        scene.add(knight_image);
        knight_image.hide();
        bg_image.animate([0,1,2,3],150,-1,0);

        rails_image.animate([0,1,2,3],200,-1,0);
        knight_image.animate([0,1,2,3,4,5,6,7],50,-1,0);
        var transform_zoom = quicktigame2d.createTransform();
        transform_zoom.duration = 3000;
        transform_zoom.scale_centerX = 0;
        transform_zoom.scale_centerY = 0;
        
        transform_zoom.scaleX = ScaleSpriteFromPercentage(winWidth,196.25,85);
        transform_zoom.scaleY = ScaleSpriteFromPercentage(winHeight,256,72.37);


        var transform_move_down = quicktigame2d.createTransform();
        transform_move_down.duration = 3000;
        transform_move_down.move(-90, getPixelFromPercent('y',25));
        

        timer = setInterval(function(){
            initknightSprite();
            
            knight_image.show();
            knight_image.transform(transform_zoom);
            knight_image.transform(transform_move_down);
            sound.stop();
            //if(sprite_count>=6){
                sound.play();
            //}

            
        },3000);


      //  });
       Ti.App.addEventListener('resume', function(e) {
        timer = setInterval(function(){
            initknightSprite();
            
            knight_image.show();
            knight_image.transform(transform_zoom);
            knight_image.transform(transform_move_down);
            sound.stop();
            //if(sprite_count>=6){
                sound.play();
            //}

            
        },3000);
       });
      Titanium.App.addEventListener('pause',function(e){
            // alert('pause');
            sound.stop();
            whoosh_sound.stop();
            clearInterval(timer);
            timer = null;
        });
        Ti.App.addEventListener('destroy', function(e) {
            // alert('destroy');
            sound.stop();
            whoosh_sound.stop();
            clearInterval(timer);
            timer = null;
        });

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

    var onTouchStart = function(e) {


        for (var pointName in e.points) {
            if (flag2 == 0) {
                lance.x = e.points[pointName].x;
                lance.y = e.points[pointName].y;
                flag2++;
            }

            lance.z = 2;

            lance_green.x = e.points[pointName].x;
            lance_green.y = e.points[pointName].y;
            lance_green.z = 2;
            if (flag == 0) {
                scene.add(lance);
                lance_green.show();
                whoosh_sound.play();
                flag++;
            }
            if (e.type == 'touchmove') {
                scene.remove(lance);

                //lance.hide();

                lance_green.center = {
                    x : 32 + (e.points[pointName].x * TOUCH_SCALE),
                    y : 43 + (e.points[pointName].y * TOUCH_SCALE)
                };
            }

            lance.center = {
                x : e.points[pointName].x * TOUCH_SCALE,
                y : (e.points[pointName].y * TOUCH_SCALE)
            };
            lance_green.center = {
                x : 32 + (e.points[pointName].x * TOUCH_SCALE),
                y : 43 + (e.points[pointName].y * TOUCH_SCALE)
            };

        }
    };

    var onTouchEnd = function(e) {

        // On Android, 'touchend_pointer' event is called before firing 'touchend' event when multi touch is detected.

        Ti.API.info(e.type + ": " + JSON.stringify(e.points));

        scene.remove(lance);

        flag = 0; 


        for (var pointName in e.points) {

/*
            if ( typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
                Ti.API.info("Couldn't find touch: " + pointName);
                continue;
            }

            scene.remove(shapes[pointName]);

            shapes[pointName] = null;
            delete shapes[pointName];
*/
        }

        // clear all rectangles because all poiinters are gone
        if (e.type == 'touchend') {
/*
            for (var pointName in shapes) {
                if ( typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
                    continue;
                }
                scene.remove(shapes[pointName]);
                shapes[pointName] = null;
            }
            shapes.length = 0;
*/
        }
    };


    game.addEventListener('touchstart', onTouchStart);
    game.addEventListener('touchmove', onTouchStart);
    game.addEventListener('touchstart_pointer', onTouchStart);
    // Called only on Android

    game.addEventListener('touchend', onTouchEnd);
    game.addEventListener('touchend_pointer', onTouchEnd);
    // Called only on Android

    // Add your game view
    window.add(game);
    window.open({
        fullscreen : true,
        navBarHidden : true
    });
    return window;

}

module.exports = JoustinGamePlay;
