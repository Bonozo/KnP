<<<<<<< HEAD
function OptionsScreen(userinfo) {
    var admin_login = false;

    var view = Titanium.UI.createView({
        top : "23%",
        height : "78%",
        width : "100%",
        backgroundImage : '/assets/inventoryBackground.png'

    });
    var CloudPush = require('ti.cloudpush');
    CloudPush.debug = true;
    CloudPush.enabled = true;
    CloudPush.showTrayNotificationsWhenFocused = true;
    CloudPush.focusAppOnPush = false;

    var deviceToken;
    var check_notification = '';

    var Cloud = require('ti.cloud');
    Cloud.debug = true;
    function getToken(callback) {
        CloudPush.retrieveDeviceToken({
            success : function deviceTokenSuccess(e) {
                callback(true, e.deviceToken);
            },
            error : function deviceTokenError(e) {
                callback(false, e.message);
            }
        });
    }

    function CloudLogin(login_value, password_value, callback) {
        // actInd.message = 'Login admin...';

        Cloud.Users.login({
            login : login_value,
            password : password_value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                callback(true, user.id);
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudCreateUser(email_value, first_name_value, last_name_value, password_value, callback) {
        // actInd.message = 'Creating user...';
        Cloud.Users.create({
            email : email_value,
            username : email_value,
            password : password_value,
            password_confirmation : password_value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                callback(true, user.id);
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudSearchUser(email_value, callback) {
        //actInd.message = 'Searching user...';
        Cloud.Users.query({
            page : 1,
            per_page : 10,
            where : {
                email : email_value
            }
        }, function(e) {
            if (e.success) {
                // alert("'" + email_value + "' " + JSON.stringify(e));

                if (e.users.length > 0)
                    callback(true, e.users[0].id);
                else
                    callback(true, "");
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudUnsubscribeUser(user_id_value, channel_value, token_value, callback) {
        //actInd.message = 'Unsubscribing...';
        if (!admin_login) {
            //alert(token_value+":"+user_id_value);
            CloudLogin('admin@bonozo.com', 'admin', function(success, admin_id) {
                admin_login = true;
                //actInd.message = 'logged in admin...';

                Cloud.PushNotifications.unsubscribe({
                    device_token : token_value,
                    channel : channel_value,
                    user_id : user_id_value
                }, function(e) {
                    if (e.success) {
                        //actInd.message = 'successful Unsss...';
                        callback(true, 'Successfully unsubscribed');
                    } else {
                        actInd.message = e.message;
                        callback(false, e.message);
                    }
                });
            });
        } else {
            //actInd.message = 'Unsubscribingg Unsss...';
            Cloud.PushNotifications.unsubscribe({
                channel : channel_value,
                device_token : token_value,
                user_id : user_id_value
            }, function(e) {
                if (e.success) {
                    callback(true, 'Successfully unsubscribed');
                } else {
                    callback(false, e.message);
                }
            });
        }
    }

    function CloudSubscribeUser(email_value, channel_value, token_value, callback) {
        //actInd.message = 'Subscribing...';
        if (!admin_login) {
            CloudLogin('admin@bonozo.com', 'admin', function(success, admin_id) {
                if (success) {
                    admin_login = true;

                    CloudSearchUser(email_value, function(success, uid) {

                        if (uid == "") {

                            CloudCreateUser(email_value, "", "", "test", function(success, created_uid) {
                                if (success) {

                                    Cloud.PushNotifications.subscribe({
                                        channel : channel_value,
                                        device_token : token_value,
                                        user_id : created_uid,
                                        type : 'android'
                                    }, function(e) {
                                        if (e.success) {
                                            callback(true, created_uid);
                                        } else {
                                            callback(false, e.message);
                                        }
                                    });
                                } else {
                                    alert('created_uid=' + created_uid);
                                }
                            });
                        } else {
                            Cloud.PushNotifications.subscribe({
                                channel : channel_value,
                                device_token : token_value,
                                user_id : uid,
                                type : 'android'
                            }, function(e) {
                                if (e.success) {
                                    // debuggers.text += '\nsubscribe' + uid;
                                    callback(true, uid);
                                } else {
                                    callback(false, e.message);
                                }
                            });
                        }
                    });
                } else {
                    callback(false, admin_id);
                }

            });
        } else {
            /*
             actInd.message = 'Searching Cloud User...';
             */
            CloudSearchUser(email_value, function(success, uid) {
                if (uid == "") {
                    CloudCreateUser(email_value, "", "", "test", function(success, created_uid) {
                        if (success) {
                            Cloud.PushNotifications.subscribe({
                                channel : channel_value,
                                device_token : token_value,
                                user_id : created_uid,
                                type : 'android'
                            }, function(e) {
                                if (e.success) {
                                    callback(true, created_uid);
                                } else {
                                    callback(false, e.message);
                                }
                            });
                        } else {
                            callback(false, created_uid);
                        }
                    });
                } else {
                    Cloud.PushNotifications.subscribe({
                        channel : channel_value,
                        device_token : token_value,
                        user_id : uid,
                        type : 'android'
                    }, function(e) {
                        if (e.success) {
                            callback(true, uid);
                        } else {
                            callback(false, e.message);
                        }
                    });

                }
            });
        }
    }

    function ServerLogin(device_token_value, user_id, callback) {
        var set_notification_url = "http://therealmattharmon.com/knp/set_notification.php?uid=" + userinfo.Record[0].UID + "&device_token=" + device_token_value + "&user_id=" + user_id;
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                items_json = JSON.parse(this.responseText);
                if (items_json.Message != undefined) {
                    check_notification = items_json.Message.NOTIFICATION;
                    Notification_button.title = "NOTIFICATION " + items_json.Message.NOTIFICATION;
                    //alert("Notification settings changed.");
                    callback(true, items_json.Message);

                }
                actInd.hide();

            },
            method : 'GET',
            contentType : 'text/xml',
            url : set_notification_url
        });
    }

    function InsertUidAndToken(email_value, uid, token, callback) {
        // actInd.message = 'inserting...';
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                var json = JSON.parse(this.responseText);
                if (json.Record[0] != undefined) {
                    //alert(JSON.stringify(json.Record[0]));
                    callback(true, json.Record[0]);
                } else if (json.Error != undefined) {
                    if (json.Error.AuthException != undefined) {
                        callback(false, json.Error.AuthException);
                    } else if (json.Error.Request) {
                        callback(false, json.Error.Request);
                    } else {
                        callback(false, "Unknown error occured!");
                    }
                }
            },
            method : 'GET',
            contentType : 'text/xml',
            url : "http://therealmattharmon.com/knp/insert_uid_token.php?email=" + email_value + "&uid=" + uid + "&token=" + token
        });
    }

    var Notification_button = '';
    var get_notification_set_url = "http://therealmattharmon.com/knp/get_notification_setting.php?uid=" + userinfo.Record[0].UID;
    //alert(set_avatar_appearance_url);
    var httpclientt = require('/ui/common/Functions/function');
    httpclientt.requestServer({
        success : function(e) {
            items_json = JSON.parse(this.responseText);
            if (items_json.Record != undefined) {
                Notification_button.title = 'NOTIFICATION ' + items_json.Record[0].NOTIFICATION;
                check_notification = items_json.Record[0].NOTIFICATION;

            }
            //actInd.hide();

        },
        method : 'GET',
        contentType : 'text/xml',
        url : get_notification_set_url
    });

    var selected_menu_label = Titanium.UI.createLabel({
        text : 'Options',
        top : '0%',
        left : '84.8%',
        textAlign : 'center',
        color : '#5afd9b',
        font : {
            fontSize : '12dip'
        }

    });
    view.add(selected_menu_label);
    var version_label = Titanium.UI.createLabel({
        text : 'v0.3.39',
        bottom : '16%',
        left : '84.8%',
        textAlign : 'center',
        color : '#5afd9b',
        font : {
            fontSize : '12dip'
        }

    });
    view.add(version_label);
    var gender = userinfo.Record[0].GENDER;
    var user_appearence_view = Ti.UI.createView({
        width : '35%',
        height : '76%',
        right : '60%',
        left : '0',
        top : '5%',
        zIndex : 500

    });
    if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {
        var dress_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(dress_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var jwel_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(jwel_imageview);
    } else     if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {
        var dress_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0%',
            top : '0%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(dress_imageview);
        var helmet_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0%',
            top : '0%',
            
            image : '/assets/knight/helmet1.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(helmet_imageview);
        var shield_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0%',
            top : '0%',
            
            image : '/assets/knight/shield.png',
            //bottom : '0%'
        });
        user_appearence_view.add(shield_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '18%',
            width : '100%',
            left : '0%',
            top : '7.5%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '17.8',
            width : '100%',
            left : '0%',
            top : '6.5%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var weapon_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            top : '0%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(weapon_imageview);
    } else {

        var character_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            top : "5%",
            left : '0%',
            image : (gender == 'm') ? '/assets/K_fullbody_bad.png' : '/assets/hdpi_female_character_Image2.png',
            //zIndex : 500
        });
        user_appearence_view.add(character_imageview);
    }
    view.add(user_appearence_view);
    var actInd = Titanium.UI.createActivityIndicator();
    actInd.message = 'Loading...';
    //message will only shows in android.

    /*var topbar=require('ui/common/TopBar/ProgressBar');
    var bar=new topbar();
    view.add(bar);

    var buttonbar=require('ui/common/ButtonBar/bar');
    var button=new buttonbar();
    view.add(button);
    */
    ///ui for option screen

    var sound_button = Titanium.UI.createButton({
        top : "7%",
        right : "5%",
        height : "9%",
        title : "SOUND ON",
        width : "60%",
        borderColor : "#a42b76",
        borderRadius : 6,
        borderWidth : 3,
        backgroundGradient : {
            type : 'linear',
            colors : [' #e49cc9', '#a52b76'],
            startPoint : {
                x : '50%',
                y : '100%'
            },
            endPoint : {
                x : '50%',
                y : '0%'
            },
            backFillStart : false
        }
    });
    view.add(sound_button);
    var Music_button = Titanium.UI.createButton({
        top : "19%",
        right : "5%",
        height : "9%",
        title : "MUSIC ON",
        width : "60%",
        borderColor : "#a42b76",
        borderRadius : 6,
        borderWidth : 3,
        backgroundGradient : {
            type : 'linear',
            colors : [' #e49cc9', '#a52b76'],
            startPoint : {
                x : '50%',
                y : '100%'
            },
            endPoint : {
                x : '50%',
                y : '0%'
            },
            backFillStart : false
        }
    });
    view.add(Music_button);
    Notification_button = Titanium.UI.createButton({
        top : "31%",
        right : "5%",
        height : "9%",
        title : "NOTIFICATION ",
        width : "60%",
        borderColor : "#a42b76",
        borderRadius : 6,
        borderWidth : 3,
        backgroundGradient : {
            type : 'linear',
            colors : [' #e49cc9', '#a52b76'],
            startPoint : {
                x : '50%',
                y : '100%'
            },
            endPoint : {
                x : '50%',
                y : '0%'
            },
            backFillStart : false
        }
    });
    view.add(Notification_button);
    Notification_button.addEventListener('click', function(e) {

        var ConfirmationAlert = Titanium.UI.createAlertDialog({

            title : 'Click \'Yes\' Change settings.',
            message : 'Are you Sure?',
            buttonNames : ['Yes', 'No'],
            cancel : 1
        });
        ConfirmationAlert.show();

        ConfirmationAlert.addEventListener('click', function(e) {
            Titanium.API.info('e = ' + JSON.stringify(e));

            if (e.cancel === e.index || e.cancel === true) {
                return;
            }
            //now you can use parameter e to switch/case
            switch (e.index) {
                case 0:
                    actInd.show();
                    getToken(function(success, token) {
                        if (check_notification == "ON") {//Do Unsubscribe
                            CloudSearchUser(userinfo.Record[0].EMAIL, function(success, last_user_id) {
                                if (success) {
                                    CloudUnsubscribeUser(last_user_id, 'alert', token, function(success, message) {
                                        ServerLogin(token, last_user_id, function(success, json) {
                                            actInd.hide();
                                            alert("Notification settings changed.");
                                        });

                                    });
                                }
                            });

                        } else if (check_notification == "OFF") {//Do Subscribe
                            CloudSubscribeUser(userinfo.Record[0].EMAIL, 'alert', token, function(success, uid) {
                                ServerLogin(token, uid, function(success, json) {
                                    actInd.hide();
                                    alert("Notification settings changed.");
                                });
                            });
                        }

                    });

                    break;
                //This will never be reached, if you specified cancel for index 1
                case 1:
                    // alert('Clicked button 1 (NO)');
                    break;
                default:
                    break;

            }

        });

    });

    var Report_button = Titanium.UI.createButton({
        top : "43%",
        right : "5%",
        height : "9%",
        title : "REPORT ABUSE",
        width : "60%",
        borderColor : "#a42b76",
        borderRadius : 6,
        borderWidth : 3,
        backgroundGradient : {
            type : 'linear',
            colors : [' #e49cc9', '#a52b76'],
            startPoint : {
                x : '50%',
                y : '100%'
            },
            endPoint : {
                x : '50%',
                y : '0%'
            },
            backFillStart : false
        }//backgroundImage:"/assets/button_large_UP.png"
    });
    view.add(Report_button);
    var Reset_button = Titanium.UI.createButton({
        top : "55%",
        right : "5%",
        height : "9%",
        title : "RESET GAME",
        width : "60%",
        borderColor : "#a42b76",
        borderRadius : 6,
        borderWidth : 3,
        backgroundGradient : {
            type : 'linear',
            colors : [' #e49cc9', '#a52b76'],
            startPoint : {
                x : '50%',
                y : '100%'
            },
            endPoint : {
                x : '50%',
                y : '0%'
            },
            backFillStart : false
        }
    });
    view.add(Reset_button);
    Reset_button.addEventListener('click', function(e) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title : 'WARNING!',
            message : 'All the data will be Lost.',
            buttonNames : ['OK']
        });
        alertDialog.show();
        alertDialog.addEventListener('click', function(e) {
            ConfirmationAlert.show();
            //alert(userinfo.Record[0].UID);
        });

        var ConfirmationAlert = Titanium.UI.createAlertDialog({
            title : 'Click \'Yes\' to Reset Game.',
            message : 'Are you Sure?',
            buttonNames : ['Yes', 'No'],
            cancel : 1
        });

        ConfirmationAlert.addEventListener('click', function(e) {
            Titanium.API.info('e = ' + JSON.stringify(e));

            //Clicked cancel, first check is for iphone, second for android
            if (e.cancel === e.index || e.cancel === true) {
                return;
            }
            //now you can use parameter e to switch/case
            switch (e.index) {
                case 0:
                    var ResetClass = require('/ui/common/MenuScreen/ResetClass');
                    var ResetClassscreen = new ResetClass(userinfo);
                    ResetClassscreen.open();

                    actInd.show();
                    var reset_option_url = "http://therealmattharmon.com/knp/reset_option.php?uid=" + userinfo.Record[0].UID;
                    var httpclientt = require('/ui/common/Functions/function');
                    httpclientt.requestServer({
                        success : function(e) {
                            Ti.App.fireEvent('update_footer', {
                                clicked_item : 'OptionScreen'
                            });

                            items_json = JSON.parse(this.responseText);
                            if (items_json.Record != undefined) {
                                if (items_json.Record.Message != '') {
                                    alert(items_json.Record.Message);
                                    actInd.hide();
                                }
                            }

                        },
                        method : 'GET',
                        contentType : 'text/xml',
                        url : reset_option_url
                    });

                    break;
                //This will never be reached, if you specified cancel for index 1
                case 1:
                    // alert('Clicked button 1 (NO)');
                    break;
                default:
                    break;

            }

        });

    });
    ////ui for option screen
    /*
    //module for bottom bar
    var botombar=require('ui/common/BottomBar/bottom');
    var bottom=new botombar();
    view.add(bottom);
    */
    //module for bottom bar
    CloudPush.addEventListener('callback', function(evt) {
        //alert(evt);
        //alert(evt.payload);
    });

    CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
        //Ti.API.info('Tray Click Launched App (app was not running)');
        //alert('Tray Click Launched App (app was not running');
    });

    CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
        //Ti.API.info('Tray Click Focused App (app was already running)');
        //alert('Tray Click Focused App (app was already running)');
    });

    return view;
};

module.exports = OptionsScreen;
=======
function OptionsScreen(userinfo) {
    var admin_login = false;

    var view = Titanium.UI.createView({
        top : "23%",
        height : "78%",
        width : "100%",
        backgroundImage : '/assets/inventoryBackground.png'

    });
    var CloudPush = require('ti.cloudpush');
    CloudPush.debug = true;
    CloudPush.enabled = true;
    CloudPush.showTrayNotificationsWhenFocused = true;
    CloudPush.focusAppOnPush = false;

    var deviceToken;
    var check_notification = '';

    var Cloud = require('ti.cloud');
    Cloud.debug = true;
    function getToken(callback) {
        CloudPush.retrieveDeviceToken({
            success : function deviceTokenSuccess(e) {
                callback(true, e.deviceToken);
            },
            error : function deviceTokenError(e) {
                callback(false, e.message);
            }
        });
    }

    function CloudLogin(login_value, password_value, callback) {
        // actInd.message = 'Login admin...';

        Cloud.Users.login({
            login : login_value,
            password : password_value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                callback(true, user.id);
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudCreateUser(email_value, first_name_value, last_name_value, password_value, callback) {
        // actInd.message = 'Creating user...';
        Cloud.Users.create({
            email : email_value,
            username : email_value,
            password : password_value,
            password_confirmation : password_value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                callback(true, user.id);
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudSearchUser(email_value, callback) {
        //actInd.message = 'Searching user...';
        Cloud.Users.query({
            page : 1,
            per_page : 10,
            where : {
                email : email_value
            }
        }, function(e) {
            if (e.success) {
                // alert("'" + email_value + "' " + JSON.stringify(e));

                if (e.users.length > 0)
                    callback(true, e.users[0].id);
                else
                    callback(true, "");
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudUnsubscribeUser(user_id_value, channel_value, token_value, callback) {
        //actInd.message = 'Unsubscribing...';
        if (!admin_login) {
            //alert(token_value+":"+user_id_value);
            CloudLogin('admin@bonozo.com', 'admin', function(success, admin_id) {
                admin_login = true;
                //actInd.message = 'logged in admin...';

                Cloud.PushNotifications.unsubscribe({
                    device_token : token_value,
                    channel : channel_value,
                    user_id : user_id_value
                }, function(e) {
                    if (e.success) {
                        //actInd.message = 'successful Unsss...';
                        callback(true, 'Successfully unsubscribed');
                    } else {
                        actInd.message = e.message;
                        callback(false, e.message);
                    }
                });
            });
        } else {
            //actInd.message = 'Unsubscribingg Unsss...';
            Cloud.PushNotifications.unsubscribe({
                channel : channel_value,
                device_token : token_value,
                user_id : user_id_value
            }, function(e) {
                if (e.success) {
                    callback(true, 'Successfully unsubscribed');
                } else {
                    callback(false, e.message);
                }
            });
        }
    }

    function CloudSubscribeUser(email_value, channel_value, token_value, callback) {
        //actInd.message = 'Subscribing...';
        if (!admin_login) {
            CloudLogin('admin@bonozo.com', 'admin', function(success, admin_id) {
                if (success) {
                    admin_login = true;

                    CloudSearchUser(email_value, function(success, uid) {

                        if (uid == "") {

                            CloudCreateUser(email_value, "", "", "test", function(success, created_uid) {
                                if (success) {

                                    Cloud.PushNotifications.subscribe({
                                        channel : channel_value,
                                        device_token : token_value,
                                        user_id : created_uid,
                                        type : 'android'
                                    }, function(e) {
                                        if (e.success) {
                                            callback(true, created_uid);
                                        } else {
                                            callback(false, e.message);
                                        }
                                    });
                                } else {
                                    alert('created_uid=' + created_uid);
                                }
                            });
                        } else {
                            Cloud.PushNotifications.subscribe({
                                channel : channel_value,
                                device_token : token_value,
                                user_id : uid,
                                type : 'android'
                            }, function(e) {
                                if (e.success) {
                                    // debuggers.text += '\nsubscribe' + uid;
                                    callback(true, uid);
                                } else {
                                    callback(false, e.message);
                                }
                            });
                        }
                    });
                } else {
                    callback(false, admin_id);
                }

            });
        } else {
            /*
             actInd.message = 'Searching Cloud User...';
             */
            CloudSearchUser(email_value, function(success, uid) {
                if (uid == "") {
                    CloudCreateUser(email_value, "", "", "test", function(success, created_uid) {
                        if (success) {
                            Cloud.PushNotifications.subscribe({
                                channel : channel_value,
                                device_token : token_value,
                                user_id : created_uid,
                                type : 'android'
                            }, function(e) {
                                if (e.success) {
                                    callback(true, created_uid);
                                } else {
                                    callback(false, e.message);
                                }
                            });
                        } else {
                            callback(false, created_uid);
                        }
                    });
                } else {
                    Cloud.PushNotifications.subscribe({
                        channel : channel_value,
                        device_token : token_value,
                        user_id : uid,
                        type : 'android'
                    }, function(e) {
                        if (e.success) {
                            callback(true, uid);
                        } else {
                            callback(false, e.message);
                        }
                    });

                }
            });
        }
    }

    function ServerLogin(device_token_value, user_id, callback) {
        var set_notification_url = "http://therealmattharmon.com/knp/set_notification.php?uid=" + userinfo.Record[0].UID + "&device_token=" + device_token_value + "&user_id=" + user_id;
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                items_json = JSON.parse(this.responseText);
                if (items_json.Message != undefined) {
                    check_notification = items_json.Message.NOTIFICATION;
                    Notification_button.title = "NOTIFICATION " + items_json.Message.NOTIFICATION;
                    //alert("Notification settings changed.");
                    callback(true, items_json.Message);

                }
                actInd.hide();

            },
            method : 'GET',
            contentType : 'text/xml',
            url : set_notification_url
        });
    }

    function InsertUidAndToken(email_value, uid, token, callback) {
        // actInd.message = 'inserting...';
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                var json = JSON.parse(this.responseText);
                if (json.Record[0] != undefined) {
                    //alert(JSON.stringify(json.Record[0]));
                    callback(true, json.Record[0]);
                } else if (json.Error != undefined) {
                    if (json.Error.AuthException != undefined) {
                        callback(false, json.Error.AuthException);
                    } else if (json.Error.Request) {
                        callback(false, json.Error.Request);
                    } else {
                        callback(false, "Unknown error occured!");
                    }
                }
            },
            method : 'GET',
            contentType : 'text/xml',
            url : "http://therealmattharmon.com/knp/insert_uid_token.php?email=" + email_value + "&uid=" + uid + "&token=" + token
        });
    }

    var Notification_button = '';
    var get_notification_set_url = "http://therealmattharmon.com/knp/get_notification_setting.php?uid=" + userinfo.Record[0].UID;
    //alert(set_avatar_appearance_url);
    var httpclientt = require('/ui/common/Functions/function');
    httpclientt.requestServer({
        success : function(e) {
            items_json = JSON.parse(this.responseText);
            if (items_json.Record != undefined) {
                Notification_button.title = 'NOTIFICATION ' + items_json.Record[0].NOTIFICATION;
                check_notification = items_json.Record[0].NOTIFICATION;

            }
            //actInd.hide();

        },
        method : 'GET',
        contentType : 'text/xml',
        url : get_notification_set_url
    });

    var selected_menu_label = Titanium.UI.createLabel({
        text : 'Options',
        top : '0%',
        left : '84.8%',
        textAlign : 'center',
        color : '#5afd9b',
        font : {
            fontSize : '12dip'
        }

    });
    view.add(selected_menu_label);
    var version_label = Titanium.UI.createLabel({
        text : 'v0.3.39',
        bottom : '16%',
        left : '84.8%',
        textAlign : 'center',
        color : '#5afd9b',
        font : {
            fontSize : '12dip'
        }

    });
    view.add(version_label);
    var gender = userinfo.Record[0].GENDER;
    var user_appearence_view = Ti.UI.createView({
        width : '35%',
        height : '76%',
        right : '60%',
        left : '0',
        top : '5%',
        zIndex : 500

    });
    if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {
        var dress_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(dress_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var jwel_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(jwel_imageview);
    } else     if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {
        var dress_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0%',
            top : '0%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(dress_imageview);
        var helmet_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0%',
            top : '0%',
            
            image : '/assets/knight/helmet1.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(helmet_imageview);
        var shield_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0%',
            top : '0%',
            
            image : '/assets/knight/shield.png',
            //bottom : '0%'
        });
        user_appearence_view.add(shield_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '18%',
            width : '100%',
            left : '0%',
            top : '7.5%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '17.8',
            width : '100%',
            left : '0%',
            top : '6.5%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var weapon_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            top : '0%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(weapon_imageview);
    } else {

        var character_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            top : "5%",
            left : '0%',
            image : (gender == 'm') ? '/assets/K_fullbody_bad.png' : '/assets/hdpi_female_character_Image2.png',
            //zIndex : 500
        });
        user_appearence_view.add(character_imageview);
    }
    view.add(user_appearence_view);
    var actInd = Titanium.UI.createActivityIndicator();
    actInd.message = 'Loading...';
    //message will only shows in android.

    /*var topbar=require('ui/common/TopBar/ProgressBar');
    var bar=new topbar();
    view.add(bar);

    var buttonbar=require('ui/common/ButtonBar/bar');
    var button=new buttonbar();
    view.add(button);
    */
    ///ui for option screen

    var sound_button = Titanium.UI.createButton({
        top : "7%",
        right : "5%",
        height : "9%",
        title : "SOUND ON",
        width : "60%",
        borderColor : "#a42b76",
        borderRadius : 6,
        borderWidth : 3,
        backgroundGradient : {
            type : 'linear',
            colors : [' #e49cc9', '#a52b76'],
            startPoint : {
                x : '50%',
                y : '100%'
            },
            endPoint : {
                x : '50%',
                y : '0%'
            },
            backFillStart : false
        }
    });
    view.add(sound_button);
    var Music_button = Titanium.UI.createButton({
        top : "19%",
        right : "5%",
        height : "9%",
        title : "MUSIC ON",
        width : "60%",
        borderColor : "#a42b76",
        borderRadius : 6,
        borderWidth : 3,
        backgroundGradient : {
            type : 'linear',
            colors : [' #e49cc9', '#a52b76'],
            startPoint : {
                x : '50%',
                y : '100%'
            },
            endPoint : {
                x : '50%',
                y : '0%'
            },
            backFillStart : false
        }
    });
    view.add(Music_button);
    Notification_button = Titanium.UI.createButton({
        top : "31%",
        right : "5%",
        height : "9%",
        title : "NOTIFICATION ",
        width : "60%",
        borderColor : "#a42b76",
        borderRadius : 6,
        borderWidth : 3,
        backgroundGradient : {
            type : 'linear',
            colors : [' #e49cc9', '#a52b76'],
            startPoint : {
                x : '50%',
                y : '100%'
            },
            endPoint : {
                x : '50%',
                y : '0%'
            },
            backFillStart : false
        }
    });
    view.add(Notification_button);
    Notification_button.addEventListener('click', function(e) {

        var ConfirmationAlert = Titanium.UI.createAlertDialog({

            title : 'Click \'Yes\' Change settings.',
            message : 'Are you Sure?',
            buttonNames : ['Yes', 'No'],
            cancel : 1
        });
        ConfirmationAlert.show();

        ConfirmationAlert.addEventListener('click', function(e) {
            Titanium.API.info('e = ' + JSON.stringify(e));

            if (e.cancel === e.index || e.cancel === true) {
                return;
            }
            //now you can use parameter e to switch/case
            switch (e.index) {
                case 0:
                    actInd.show();
                    getToken(function(success, token) {
                        if (check_notification == "ON") {//Do Unsubscribe
                            CloudSearchUser(userinfo.Record[0].EMAIL, function(success, last_user_id) {
                                if (success) {
                                    CloudUnsubscribeUser(last_user_id, 'alert', token, function(success, message) {
                                        ServerLogin(token, last_user_id, function(success, json) {
                                            actInd.hide();
                                            alert("Notification settings changed.");
                                        });

                                    });
                                }
                            });

                        } else if (check_notification == "OFF") {//Do Subscribe
                            CloudSubscribeUser(userinfo.Record[0].EMAIL, 'alert', token, function(success, uid) {
                                ServerLogin(token, uid, function(success, json) {
                                    actInd.hide();
                                    alert("Notification settings changed.");
                                });
                            });
                        }

                    });

                    break;
                //This will never be reached, if you specified cancel for index 1
                case 1:
                    // alert('Clicked button 1 (NO)');
                    break;
                default:
                    break;

            }

        });

    });

    var Report_button = Titanium.UI.createButton({
        top : "43%",
        right : "5%",
        height : "9%",
        title : "REPORT ABUSE",
        width : "60%",
        borderColor : "#a42b76",
        borderRadius : 6,
        borderWidth : 3,
        backgroundGradient : {
            type : 'linear',
            colors : [' #e49cc9', '#a52b76'],
            startPoint : {
                x : '50%',
                y : '100%'
            },
            endPoint : {
                x : '50%',
                y : '0%'
            },
            backFillStart : false
        }//backgroundImage:"/assets/button_large_UP.png"
    });
    view.add(Report_button);
    var Reset_button = Titanium.UI.createButton({
        top : "55%",
        right : "5%",
        height : "9%",
        title : "RESET GAME",
        width : "60%",
        borderColor : "#a42b76",
        borderRadius : 6,
        borderWidth : 3,
        backgroundGradient : {
            type : 'linear',
            colors : [' #e49cc9', '#a52b76'],
            startPoint : {
                x : '50%',
                y : '100%'
            },
            endPoint : {
                x : '50%',
                y : '0%'
            },
            backFillStart : false
        }
    });
    view.add(Reset_button);
    Reset_button.addEventListener('click', function(e) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title : 'WARNING!',
            message : 'All the data will be Lost.',
            buttonNames : ['OK']
        });
        alertDialog.show();
        alertDialog.addEventListener('click', function(e) {
            ConfirmationAlert.show();
            //alert(userinfo.Record[0].UID);
        });

        var ConfirmationAlert = Titanium.UI.createAlertDialog({
            title : 'Click \'Yes\' to Reset Game.',
            message : 'Are you Sure?',
            buttonNames : ['Yes', 'No'],
            cancel : 1
        });

        ConfirmationAlert.addEventListener('click', function(e) {
            Titanium.API.info('e = ' + JSON.stringify(e));

            //Clicked cancel, first check is for iphone, second for android
            if (e.cancel === e.index || e.cancel === true) {
                return;
            }
            //now you can use parameter e to switch/case
            switch (e.index) {
                case 0:
                    var ResetClass = require('/ui/common/MenuScreen/ResetClass');
                    var ResetClassscreen = new ResetClass(userinfo);
                    ResetClassscreen.open();

                    actInd.show();
                    var reset_option_url = "http://therealmattharmon.com/knp/reset_option.php?uid=" + userinfo.Record[0].UID;
                    var httpclientt = require('/ui/common/Functions/function');
                    httpclientt.requestServer({
                        success : function(e) {
                            Ti.App.fireEvent('update_footer', {
                                clicked_item : 'OptionScreen'
                            });

                            items_json = JSON.parse(this.responseText);
                            if (items_json.Record != undefined) {
                                if (items_json.Record.Message != '') {
                                    alert(items_json.Record.Message);
                                    actInd.hide();
                                }
                            }

                        },
                        method : 'GET',
                        contentType : 'text/xml',
                        url : reset_option_url
                    });

                    break;
                //This will never be reached, if you specified cancel for index 1
                case 1:
                    // alert('Clicked button 1 (NO)');
                    break;
                default:
                    break;

            }

        });

    });
    ////ui for option screen
    /*
    //module for bottom bar
    var botombar=require('ui/common/BottomBar/bottom');
    var bottom=new botombar();
    view.add(bottom);
    */
    //module for bottom bar
    CloudPush.addEventListener('callback', function(evt) {
        //alert(evt);
        //alert(evt.payload);
    });

    CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
        //Ti.API.info('Tray Click Launched App (app was not running)');
        //alert('Tray Click Launched App (app was not running');
    });

    CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
        //Ti.API.info('Tray Click Focused App (app was already running)');
        //alert('Tray Click Focused App (app was already running)');
    });

    return view;
};

module.exports = OptionsScreen;
>>>>>>> New version
