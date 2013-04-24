<<<<<<< HEAD
/*
 Signing In:

 1.    Sign in to KAP DB - DONE
 2a.   Sign in to cloud and save his user id to variable "id"
 2b.   If user does not exists on cloud then repeat 2a
 3.    Cloud admin login
 4.    if "last_user" property is not empty then unsubscribe last user with this device token by admin
 5.    Subscribe "id" with this device token by admin
 6.    save "id" in "last_user" property
 */
var actInd = Titanium.UI.createActivityIndicator();

function LoginWindow() {
    var admin_login = false;
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

    function CloudLogout(callback) {
        Cloud.Users.logout(function(e) {
            if (e.success) {
                callback(true, "Successfully logout");
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudCreateUser(email_value, first_name_value, last_name_value, password_value, callback) {
        //actInd.message = 'Creating user...';
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
        // actInd.message = 'Searching user...';
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

    function CloudRemoveUser(callback) {
        Cloud.Users.remove(function(e) {
            if (e.success) {
                callback(true, 'Successfully removed');
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudSubscribeUser(email_value, channel_value, token_value, callback) {
         actInd.message = 'Configuring your device...';
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
                                    //debuggers.text += '\nsubscribe' + uid;
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

    function CloudUnsubscribeUser(user_id_value, channel_value, token_value, callback) {
        //actInd.message = 'Unsubscribing...';
        if (!admin_login) {
            //alert(token_value+":"+user_id_value);
            CloudLogin('admin@bonozo.com', 'admin', function(success, admin_id) {
                admin_login = true;
                 //actInd.message = 'logged in admin...'+user_id_value+':'+token_value;

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
           // actInd.message = 'Unsubscribingg Unsss...';
            Cloud.PushNotifications.unsubscribe({
                channel : channel_value,
                device_token : token_value,
                user_id : user_id_value
            }, function(e) {
                if (e.success) {
                	// actInd.message = 'successful Unsss...';
                    callback(true, 'Successfully unsubscribed');
                } else {
                        actInd.message = e.message;
                    callback(false, e.message);
                }
            });
        }
    }

    function ServerLogin(email_value, password_value, device_token_value, app_version_value, callback) {
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                var json = JSON.parse(this.responseText);
                if (json.Record != undefined) {
                    if (remember) {
                        Ti.App.Properties.setString('knp_email', emailField.value);
                        Ti.App.Properties.setString('knp_password', passwordField.value);
                    }
                    callback(true, json.Record);
                } else if (json.Error != undefined) {
                    if (json.Error.AuthException != undefined) {
                        callback(false, json.Error.AuthException);
                        actInd.hide();
                    } else if (json.Error.Request) {
                        callback(false, json.Error.Request);
                        actInd.hide();
                    } else {
                        callback(false, "Unknown error occured!");
                        actInd.hide();
                    }
                }
            },
            method : 'GET',
            contentType : 'text/xml',
            url : "http://therealmattharmon.com/knp/?email=" + email_value + "&password=" + password_value + "&version=" + app_version_value + "&device_token=" + device_token_value
        });
    }

    function InsertUidAndToken(email_value, uid, token, callback) {
        // actInd.message = 'inserting...';
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                var json = JSON.parse(this.responseText);
                if (json.Record[0] != undefined) {
                    if (remember) {
                        Ti.App.Properties.setString('knp_email', emailField.value);
                        Ti.App.Properties.setString('knp_password', passwordField.value);
                    }
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

    //load component dependencies
    var chooseClass;
    var remember = false;
    var actInd = Titanium.UI.createActivityIndicator();
    //actInd.message = 'Loading Main Screen...';
    actInd.message = 'Signing In...';
    //message will only shows in android.
    actInd.show();

    //    var HeaderView = require('ui/common/LoginScreen/HeaderView');
    var viewstack = 0;
    viewstack = Titanium.App.Properties.getString("viewstack");
    if (viewstack == 0) {
        Titanium.App.Properties.setString("viewstack", 0);
    }
    //create component instance
    var CloudPush = require('ti.cloudpush');
    CloudPush.debug = true;
    CloudPush.enabled = true;
    CloudPush.showTrayNotificationsWhenFocused = true;
    CloudPush.focusAppOnPush = false;

    var deviceToken;

    var Cloud = require('ti.cloud');
    Cloud.debug = true;

    var win = Ti.UI.createWindow({
        /*backgroundImage : "/assets/inventoryBackground.png"

         backgroundGradient : {
         type : 'linear',
         colors : ['#3258ad', '#010f49'],
         startPoint : {
         x : 0,
         y : 0
         },
         endPoint : {
         x : 2,
         y : 500
         },
         backFillStart : false
         }
         orientationModes: [
         Ti.UI.PORTRAIT,
         Ti.UI.UPSIDE_PORTRAIT
         ],*/
    });
    win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

    /*
     var headerView = new HeaderView();
     win.add(headerView);
     */

    var bgimageView = Ti.UI.createImageView({
        height : "100%",
        width : "100%",
        backgroundImage : "/assets/inventoryBackground.png"
    });
    win.add(bgimageView);
    var top_header = Titanium.UI.createImageView({
         height : "8.5%",
        width : "100%",
        bottom : '92.5%',
        image : '/assets/overlayTitleStarCurtains.png'
    });
    win.add(top_header);
    var header_label = Titanium.UI.createLabel({
        text : "SIGN IN",
        textAlign : 'center',
        color : '#4dd28f',
        font : {
            fontStyle : 'Century Gothic',
            fontSize : '16dip'
        },
        top : '1',
        height : '4.9%'
    });
    win.add(header_label);
    //creating mid image
    var imageView = Ti.UI.createImageView({
        top : "12%",
        height : "38%",
        width : "62%",
        left : '20.5%',
        image : "/assets/app_logo2.png"
    });
    win.add(imageView);

    // Create a Label.
    var debuggers = Ti.UI.createLabel({
        text : 'debuggers:',
        color : '#000000',
        font : {
            fontSize : 12
        },
        top : '12%',
        left : 0,
        textAlign : 'left'
    });
    //win.add(debuggers);

    var emailField = Titanium.UI.createTextField({
        height : 'auto',
        hintText : "Email",
        width : "75%",
        value : Ti.App.Properties.getString('knp_email'), //"robot1@email.com",
        left : "15%",
        top : "63%"
    });
    win.add(emailField);
    var passwordField = Titanium.UI.createTextField({
        height : 'auto',
        hintText : "Password",
        value : Ti.App.Properties.getString('knp_password'), //'test',
        width : "75%",
        left : "15%",
        top : "73%",
        passwordMask : true
    });
    win.add(passwordField);
    var rememberCheckBox = Ti.UI.createSwitch({
        top : "83%",
        style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        height : "5%",
        left : "1%",
        value : false
    });
    win.add(rememberCheckBox);
    rememberCheckBox.addEventListener("change", function(e) {
        remember = e.value;
    });
    var rememberlabel = Ti.UI.createLabel({
        top : "83%",
        text : "Remember email address and password?",
        height : "5%",
        left : "15%"
    });
    win.add(rememberlabel);
    var signInButton = Ti.UI.createButton({
        title : "SIGN IN",
        top : "90%",
        color : "white",
        width : "75%",
        left : "15%",
        height : "8%",
        backgroundImage : "/assets/overlayItemList.png"
    });
    win.add(signInButton);
    signInButton.addEventListener('touchstart', function(e) {
        // signInButton.color = "black";
    });

    signInButton.addEventListener('touchend', function(e) {
        // signInButton.color = "white";
    });
    actInd.hide();
    signInButton.addEventListener('click', function(e) {
        if (emailField.value == "" && passwordField.value == "") {
            alert('All fields are required!');
        } else {
            actInd.show();
            emailField.value = emailField.value.toLowerCase();

            getToken(function(success, token) {
                if (success) {
                    ServerLogin(emailField.value, passwordField.value, token, '0.3', function(success, json) {
                        if (success) {
                            if (json[0].LAST_USER == "NULL") {
                                CloudSubscribeUser(emailField.value, 'alert', token, function(success, uid) {
                                    /*
                                     //insert uid and device token in database
                                     */
                                    if (success) {
                                        /*
                                         actInd.message = 'Insert Uid and Token ...';
                                         */
                                        InsertUidAndToken(emailField.value, uid, token, function(success, message) {
                                            if (success) {
                                                //actInd.message = 'Yahooo...';
                                                CloudLogout(function(success, message) {
                                                    json = {
                                                        Record : json
                                                    };
                                                    var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
                                                    MainMenu = new MainMenuScreen(json);
                                                    MainMenu.open();
                                                    actInd.hide();
                                                });
                                            } else {
                                                alert(message);
                                            }
                                        });
                                    } else {
                                        alert(uid);
                                    }
                                });
                            } else if (json[0].LAST_USER == "ME") {
                                json = {
                                    Record : json
                                };
                                var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
                                MainMenu = new MainMenuScreen(json);
                                MainMenu.open();
                                actInd.hide();
                            } else if (json[0].LAST_USER == "OTHER") {
                                //alert("m in other"+json[0].DEVICE_TOKEN);
                                CloudSearchUser(json[0].EMAIL, function(success, last_user_id) {
                                    //var last_email = json[0].LAST_USER;
                                    //alert(last_user_id);
                                    CloudUnsubscribeUser(last_user_id, 'alert', json[0].DEVICE_TOKEN, function(success, message) {
                                        if (success) {
                                            CloudSubscribeUser(emailField.value, 'alert', token, function(success, uid) {
                                                InsertUidAndToken(emailField.value, uid, token, function(success, message) {
                                                    if (success) {
                                                        json = {
                                                            Record : json
                                                        };
                                                        var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
                                                        MainMenu = new MainMenuScreen(json);
                                                        MainMenu.open();
                                                        actInd.hide();
                                                    }
                                                });
                                            });

                                        }

                                    });

                                });

                            } else {
                                CloudSearchUser(json[0].LAST_USER, function(success, last_user_id) {
                                    var last_email = json[0].LAST_USER;
                                    CloudUnsubscribeUser(last_user_id, 'alert', token, function(success, message) {
                                        if (success) {
                                            CloudSubscribeUser(emailField.value, 'alert', token, function(success, uid) {
                                                /*
                                                //insert uid and device token in database
                                                *///alert(uid);
                                                //actInd.message = "Inserting uid" + uid+"::"+token+":"+emailField.value;
                                                InsertUidAndToken(emailField.value, uid, token, function(success, message) {
                                                    if (success) {
                                                        json = {
                                                            Record : json
                                                        };
                                                        InsertUidAndToken(last_email, "", "", function(success, message) {
                                                            if (success) {
                                                                var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
                                                                MainMenu = new MainMenuScreen(json);
                                                                MainMenu.open();
                                                                actInd.hide();
                                                            } else {
                                                                alert(message);
                                                            }
                                                        });
                                                    } else {
                                                        alert(message);
                                                    }
                                                });
                                            });
                                        }
                                    });
                                    //CloudUnsubscribeUser
                                });
                                //CloudSearchUser

                            }
                        } else {
                            alert(json);
                            actInd.hide();
                        }
                    });
                } else {
                    alert(token);
                    actInd.hide();
                }
            });
        }
    });
    actInd.hide();

    var newUserButton = Ti.UI.createButton({
        title : "New User?",
        color : "white",
        top : "50%",
        width : "75%",
        left : "15%",
        height : "10%",
        backgroundImage : "/assets/overlayItemList.png"
    });
    win.add(newUserButton);
    newUserButton.addEventListener('click', function(e) {

        var ChooseClass = require('/ui/common/MenuScreen/ChooseClass');
        chooseClass = new ChooseClass();
        chooseClass.open();

    });

    Ti.App.addEventListener('close_screen', function(data) {
        if (data.screen_name == 'choose_your_class' && chooseClass != null) {
            chooseClass.close();
            chooseClass = null;
        } else {
            var activity = Titanium.Android.currentActivity;
            activity.finish();
        }
    });

    win.addEventListener('android:back', function(e) {
        var activity = Titanium.Android.currentActivity;
        activity.finish();
    });

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

    return win;
}

//make constructor function the public component interface
module.exports = LoginWindow;
=======
/*
 Signing In:

 1.    Sign in to KAP DB - DONE
 2a.   Sign in to cloud and save his user id to variable "id"
 2b.   If user does not exists on cloud then repeat 2a
 3.    Cloud admin login
 4.    if "last_user" property is not empty then unsubscribe last user with this device token by admin
 5.    Subscribe "id" with this device token by admin
 6.    save "id" in "last_user" property
 */
var actInd = Titanium.UI.createActivityIndicator();

function LoginWindow() {
    var admin_login = false;
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

    function CloudLogout(callback) {
        Cloud.Users.logout(function(e) {
            if (e.success) {
                callback(true, "Successfully logout");
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudCreateUser(email_value, first_name_value, last_name_value, password_value, callback) {
        //actInd.message = 'Creating user...';
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
        // actInd.message = 'Searching user...';
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

    function CloudRemoveUser(callback) {
        Cloud.Users.remove(function(e) {
            if (e.success) {
                callback(true, 'Successfully removed');
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudSubscribeUser(email_value, channel_value, token_value, callback) {
         actInd.message = 'Configuring your device...';
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
                                    //debuggers.text += '\nsubscribe' + uid;
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

    function CloudUnsubscribeUser(user_id_value, channel_value, token_value, callback) {
        //actInd.message = 'Unsubscribing...';
        if (!admin_login) {
            //alert(token_value+":"+user_id_value);
            CloudLogin('admin@bonozo.com', 'admin', function(success, admin_id) {
                admin_login = true;
                 //actInd.message = 'logged in admin...'+user_id_value+':'+token_value;

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
           // actInd.message = 'Unsubscribingg Unsss...';
            Cloud.PushNotifications.unsubscribe({
                channel : channel_value,
                device_token : token_value,
                user_id : user_id_value
            }, function(e) {
                if (e.success) {
                	// actInd.message = 'successful Unsss...';
                    callback(true, 'Successfully unsubscribed');
                } else {
                        actInd.message = e.message;
                    callback(false, e.message);
                }
            });
        }
    }

    function ServerLogin(email_value, password_value, device_token_value, app_version_value, callback) {
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                var json = JSON.parse(this.responseText);
                if (json.Record != undefined) {
                    if (remember) {
                        Ti.App.Properties.setString('knp_email', emailField.value);
                        Ti.App.Properties.setString('knp_password', passwordField.value);
                    }
                    callback(true, json.Record);
                } else if (json.Error != undefined) {
                    if (json.Error.AuthException != undefined) {
                        callback(false, json.Error.AuthException);
                        actInd.hide();
                    } else if (json.Error.Request) {
                        callback(false, json.Error.Request);
                        actInd.hide();
                    } else {
                        callback(false, "Unknown error occured!");
                        actInd.hide();
                    }
                }
            },
            method : 'GET',
            contentType : 'text/xml',
            url : "http://therealmattharmon.com/knp/?email=" + email_value + "&password=" + password_value + "&version=" + app_version_value + "&device_token=" + device_token_value
        });
    }

    function InsertUidAndToken(email_value, uid, token, callback) {
        // actInd.message = 'inserting...';
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                var json = JSON.parse(this.responseText);
                if (json.Record[0] != undefined) {
                    if (remember) {
                        Ti.App.Properties.setString('knp_email', emailField.value);
                        Ti.App.Properties.setString('knp_password', passwordField.value);
                    }
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

    //load component dependencies
    var chooseClass;
    var remember = false;
    var actInd = Titanium.UI.createActivityIndicator();
    //actInd.message = 'Loading Main Screen...';
    actInd.message = 'Signing In...';
    //message will only shows in android.
    actInd.show();

    //    var HeaderView = require('ui/common/LoginScreen/HeaderView');
    var viewstack = 0;
    viewstack = Titanium.App.Properties.getString("viewstack");
    if (viewstack == 0) {
        Titanium.App.Properties.setString("viewstack", 0);
    }
    //create component instance
    var CloudPush = require('ti.cloudpush');
    CloudPush.debug = true;
    CloudPush.enabled = true;
    CloudPush.showTrayNotificationsWhenFocused = true;
    CloudPush.focusAppOnPush = false;

    var deviceToken;

    var Cloud = require('ti.cloud');
    Cloud.debug = true;

    var win = Ti.UI.createWindow({
        /*backgroundImage : "/assets/inventoryBackground.png"

         backgroundGradient : {
         type : 'linear',
         colors : ['#3258ad', '#010f49'],
         startPoint : {
         x : 0,
         y : 0
         },
         endPoint : {
         x : 2,
         y : 500
         },
         backFillStart : false
         }
         orientationModes: [
         Ti.UI.PORTRAIT,
         Ti.UI.UPSIDE_PORTRAIT
         ],*/
    });
    win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

    /*
     var headerView = new HeaderView();
     win.add(headerView);
     */

    var bgimageView = Ti.UI.createImageView({
        height : "100%",
        width : "100%",
        backgroundImage : "/assets/inventoryBackground.png"
    });
    win.add(bgimageView);
    var top_header = Titanium.UI.createImageView({
         height : "8.5%",
        width : "100%",
        bottom : '92.5%',
        image : '/assets/overlayTitleStarCurtains.png'
    });
    win.add(top_header);
    var header_label = Titanium.UI.createLabel({
        text : "SIGN IN",
        textAlign : 'center',
        color : '#4dd28f',
        font : {
            fontStyle : 'Century Gothic',
            fontSize : '16dip'
        },
        top : '1',
        height : '4.9%'
    });
    win.add(header_label);
    //creating mid image
    var imageView = Ti.UI.createImageView({
        top : "12%",
        height : "38%",
        width : "62%",
        left : '20.5%',
        image : "/assets/app_logo2.png"
    });
    win.add(imageView);

    // Create a Label.
    var debuggers = Ti.UI.createLabel({
        text : 'debuggers:',
        color : '#000000',
        font : {
            fontSize : 12
        },
        top : '12%',
        left : 0,
        textAlign : 'left'
    });
    //win.add(debuggers);

    var emailField = Titanium.UI.createTextField({
        height : 'auto',
        hintText : "Email",
        width : "75%",
        value : Ti.App.Properties.getString('knp_email'), //"robot1@email.com",
        left : "15%",
        top : "63%"
    });
    win.add(emailField);
    var passwordField = Titanium.UI.createTextField({
        height : 'auto',
        hintText : "Password",
        value : Ti.App.Properties.getString('knp_password'), //'test',
        width : "75%",
        left : "15%",
        top : "73%",
        passwordMask : true
    });
    win.add(passwordField);
    var rememberCheckBox = Ti.UI.createSwitch({
        top : "83%",
        style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        height : "5%",
        left : "1%",
        value : false
    });
    win.add(rememberCheckBox);
    rememberCheckBox.addEventListener("change", function(e) {
        remember = e.value;
    });
    var rememberlabel = Ti.UI.createLabel({
        top : "83%",
        text : "Remember email address and password?",
        height : "5%",
        left : "15%"
    });
    win.add(rememberlabel);
    var signInButton = Ti.UI.createButton({
        title : "SIGN IN",
        top : "90%",
        color : "white",
        width : "75%",
        left : "15%",
        height : "8%",
        backgroundImage : "/assets/overlayItemList.png"
    });
    win.add(signInButton);
    signInButton.addEventListener('touchstart', function(e) {
        // signInButton.color = "black";
    });

    signInButton.addEventListener('touchend', function(e) {
        // signInButton.color = "white";
    });
    actInd.hide();
    signInButton.addEventListener('click', function(e) {
        if (emailField.value == "" && passwordField.value == "") {
            alert('All fields are required!');
        } else {
            actInd.show();
            emailField.value = emailField.value.toLowerCase();

            getToken(function(success, token) {
                if (success) {
                    ServerLogin(emailField.value, passwordField.value, token, '0.3', function(success, json) {
                        if (success) {
                            if (json[0].LAST_USER == "NULL") {
                                CloudSubscribeUser(emailField.value, 'alert', token, function(success, uid) {
                                    /*
                                     //insert uid and device token in database
                                     */
                                    if (success) {
                                        /*
                                         actInd.message = 'Insert Uid and Token ...';
                                         */
                                        InsertUidAndToken(emailField.value, uid, token, function(success, message) {
                                            if (success) {
                                                //actInd.message = 'Yahooo...';
                                                CloudLogout(function(success, message) {
                                                    json = {
                                                        Record : json
                                                    };
                                                    var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
                                                    MainMenu = new MainMenuScreen(json);
                                                    MainMenu.open();
                                                    actInd.hide();
                                                });
                                            } else {
                                                alert(message);
                                            }
                                        });
                                    } else {
                                        alert(uid);
                                    }
                                });
                            } else if (json[0].LAST_USER == "ME") {
                                json = {
                                    Record : json
                                };
                                var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
                                MainMenu = new MainMenuScreen(json);
                                MainMenu.open();
                                actInd.hide();
                            } else if (json[0].LAST_USER == "OTHER") {
                                //alert("m in other"+json[0].DEVICE_TOKEN);
                                CloudSearchUser(json[0].EMAIL, function(success, last_user_id) {
                                    //var last_email = json[0].LAST_USER;
                                    //alert(last_user_id);
                                    CloudUnsubscribeUser(last_user_id, 'alert', json[0].DEVICE_TOKEN, function(success, message) {
                                        if (success) {
                                            CloudSubscribeUser(emailField.value, 'alert', token, function(success, uid) {
                                                InsertUidAndToken(emailField.value, uid, token, function(success, message) {
                                                    if (success) {
                                                        json = {
                                                            Record : json
                                                        };
                                                        var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
                                                        MainMenu = new MainMenuScreen(json);
                                                        MainMenu.open();
                                                        actInd.hide();
                                                    }
                                                });
                                            });

                                        }

                                    });

                                });

                            } else {
                                CloudSearchUser(json[0].LAST_USER, function(success, last_user_id) {
                                    var last_email = json[0].LAST_USER;
                                    CloudUnsubscribeUser(last_user_id, 'alert', token, function(success, message) {
                                        if (success) {
                                            CloudSubscribeUser(emailField.value, 'alert', token, function(success, uid) {
                                                /*
                                                //insert uid and device token in database
                                                *///alert(uid);
                                                //actInd.message = "Inserting uid" + uid+"::"+token+":"+emailField.value;
                                                InsertUidAndToken(emailField.value, uid, token, function(success, message) {
                                                    if (success) {
                                                        json = {
                                                            Record : json
                                                        };
                                                        InsertUidAndToken(last_email, "", "", function(success, message) {
                                                            if (success) {
                                                                var MainMenuScreen = require('/ui/common/MenuScreen/MainMenuScreen');
                                                                MainMenu = new MainMenuScreen(json);
                                                                MainMenu.open();
                                                                actInd.hide();
                                                            } else {
                                                                alert(message);
                                                            }
                                                        });
                                                    } else {
                                                        alert(message);
                                                    }
                                                });
                                            });
                                        }
                                    });
                                    //CloudUnsubscribeUser
                                });
                                //CloudSearchUser

                            }
                        } else {
                            alert(json);
                            actInd.hide();
                        }
                    });
                } else {
                    alert(token);
                    actInd.hide();
                }
            });
        }
    });
    actInd.hide();

    var newUserButton = Ti.UI.createButton({
        title : "New User?",
        color : "white",
        top : "50%",
        width : "75%",
        left : "15%",
        height : "10%",
        backgroundImage : "/assets/overlayItemList.png"
    });
    win.add(newUserButton);
    newUserButton.addEventListener('click', function(e) {

        var ChooseClass = require('/ui/common/MenuScreen/ChooseClass');
        chooseClass = new ChooseClass();
        chooseClass.open();

    });

    Ti.App.addEventListener('close_screen', function(data) {
        if (data.screen_name == 'choose_your_class' && chooseClass != null) {
            chooseClass.close();
            chooseClass = null;
        } else {
            var activity = Titanium.Android.currentActivity;
            activity.finish();
        }
    });

    win.addEventListener('android:back', function(e) {
        var activity = Titanium.Android.currentActivity;
        activity.finish();
    });

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

    return win;
}

//make constructor function the public component interface
module.exports = LoginWindow;
>>>>>>> New version
