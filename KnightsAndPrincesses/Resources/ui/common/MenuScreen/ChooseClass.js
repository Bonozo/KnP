function ChooseClass() {
    var admin_login = false;
	var gender = 'm';
	var images_counter = 0;
	function hideLoader() {
		images_counter++;
		if (images_counter >= 5) {
			actInd.hide();
		}
	}
    function CloudLogin(login_value, password_value, callback) {
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
/*
        actInd.message = 'Try to Create User on Cloud...';
*/
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
        Cloud.Users.query({
            page : 1,
            per_page : 10,
            where : {
                email : email_value
            }
        }, function(e) {
            if (e.success) {
/*
                alert("'"+email_value+"' "+JSON.stringify(e));
*/
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
/*
        actInd.message = 'Try to Remove User...';
*/
        Cloud.Users.remove(function(e) {
            if (e.success) {
                callback(true, 'Successfully removed');
            } else {
                callback(false, e.message);
            }
        });
    }

    function CloudSubscribeUser(email_value, channel_value, token_value, callback) {
        if (!admin_login) {
/*
            actInd.message = 'admin logging...';
*/

            CloudLogin('admin@bonozo.com', 'admin', function(success, admin_id) {

                if(success){
                    admin_login = true;
/*
                    actInd.message = 'Cloud Search User...';
*/
                    alert(email_value);

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
                                           // actInd.hide();
                                            callback(false, e.message);
                                        }
                                    });
                                }
                                else{
                                    alert('created_uid='+created_uid);
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
                else{
                    callback(false, admin_id);
                }
                
            });
        } else {
            CloudSearchUser(email_value, function(success, uid) {
                if (uid == "") {
/*
                    actInd.message = 'Creating Cloud User...';
*/
                    CloudCreateUser(email_value, "", "", "test", function(success, created_uid) {
/*
                        actInd.message = 'Subscribing Cloud User...'+created_uid;
*/
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
                        }
                        else{
                            callback(false, created_uid);
                        }
                    });
                }
                else{
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
        if (!admin_login) {
/*
            actInd.message = 'Admin Cloud Login For Unsubscribing...';
*/
            CloudLogin('admin@bonozo.com', 'admin', function(success, admin_id) {
                admin_login = true;
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
            });
        } else {
/*
            actInd.message = '<ALREADY SIGN IN>UnSubscribing for Push...';
*/
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
    function ServerSignup(name_value, email_value, password_value, gender_value,device_token_value , callback) {
        var httpclientt = require('/ui/common/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                var json = JSON.parse(this.responseText);
                if (json.Record != undefined) {
                   // actInd.hide();
                    callback(true, json.Record);


                } else if (json.Error != undefined) {
                    alert(json.Error);
                } else {
                    alert("Something went wrong!");
                }

            },
            method : 'GET',
            contentType : 'text/xml',
            url : "http://therealmattharmon.com/knp/sign_up.php?email=" + email_value + "&password=" +password_value + "&name=" + name_value + "&gender=" + gender_value+"&device_token="+device_token_value
        });
    }
    function InsertUidAndToken(email_value,uid,token,callback){
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

	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
	var CloudPush = require('ti.cloudpush');
	CloudPush.debug = true;
	CloudPush.enabled = true;
	CloudPush.showTrayNotificationsWhenFocused = true;
	CloudPush.focusAppOnPush = false;

	var deviceToken;

	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	var chooseclass_win = Ti.UI.createWindow({
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
		},
		height : "100%",
		width : "100%"
	});
	var SignUpScreen = [];
	var top_header = Titanium.UI.createImageView({
		top : '0%',
		image : '/assets/overlayTitleStarCurtains.png'
	});
	SignUpScreen.header = top_header;
	top_header.addEventListener('load', function(e) {
		hideLoader();
	});

	chooseclass_win.add(top_header);

	var header_label = Titanium.UI.createLabel({
		text : "Choose Your Class",
		textAlign : 'center',
		color : '#4dd28f',
		font : {
			fontStyle : 'Century Gothic',
			fontSize : '16dip'
		},
		top : '1',
		height : '4.9%'
	});
	SignUpScreen.header_label = header_label;

	chooseclass_win.add(header_label);

	var male_image = Titanium.UI.createImageView({
		top : "15%",
		image : '/assets/K_fullbody_bad.png',
		//height:"85%"
	});
	male_image.addEventListener('load', function(e) {
		hideLoader();
	});

	chooseclass_win.add(male_image);
	var right_arrow = Titanium.UI.createImageView({
		top : "35%",
		left : "60%",
		width : "25%",
		height : "20%",
		image : "/assets/iconControlArrowLeft.png"
	});
	chooseclass_win.add(right_arrow);
	right_arrow.addEventListener('load', function(e) {
		hideLoader();
	});

	var next_arrow = Titanium.UI.createImageView({
		bottom : '0%',
		right : '0%',
		image : '/assets/iconNextArrow.png',
		height : '10%',
		width : '35%'
	});
	chooseclass_win.add(next_arrow);
	next_arrow.addEventListener('load', function(e) {
		hideLoader();
	});

	var namescroll = Titanium.UI.createImageView({
		left : "10%",
		top : "56%",
		width : "80%",
		height : "15%",
		image : '/assets/overlayNameScroll.png'
	});
	var name_text = Titanium.UI.createTextField({
		left : "25%",
		top : "56%",
		width : "70%",
		hintText : "Name",
		height : "15%",
		paddingLeft : '3',
		backgroundColor : 'transparent'
	});
	chooseclass_win.add(namescroll);
	chooseclass_win.add(name_text);

	var emailscroll = Titanium.UI.createImageView({
		left : "10%",
		top : "65.5%",
		width : "80%",
		height : "15%",
		image : '/assets/overlayNameScroll.png'
	});
	var email_text = Titanium.UI.createTextField({
		left : "25%",
		top : "65.5%",
		width : "70%",
		hintText : "Email",
		height : "15%",
		paddingLeft : '3',
		backgroundColor : 'transparent'
	});
	chooseclass_win.add(emailscroll);
	chooseclass_win.add(email_text);

	var passwordscroll = Titanium.UI.createImageView({
		left : "10%",
		top : "75%",
		width : "80%",
		height : "15%",
		image : '/assets/overlayNameScroll.png'
	});
	var password_text = Titanium.UI.createTextField({
		left : "25%",
		top : "75%",
		width : "70%",
		hintText : "Password",
		height : "15%",
		paddingLeft : '3',
		passwordMask : true,
		backgroundColor : 'transparent'
	});
	chooseclass_win.add(passwordscroll);
	chooseclass_win.add(password_text);
	var female_image = Titanium.UI.createImageView({
		top : "15%",
		right : 0,
		image : '/assets/hdpi_female_character.png',
	});
	var left_arrow = Titanium.UI.createImageView({
		top : "40%",
		left : "10%",
		visible : false,
		width : "25%",
		height : "20%",
		image : "/assets/iconControlArrowRight.png"
	});
	left_arrow.addEventListener('load', function(e) {
		hideLoader();
	});
	right_arrow.addEventListener('click', function(e) {
		male_image.image = '/assets/hdpi_female_character.png';
		gender = 'f';
		right_arrow.hide();
		left_arrow.show();

	});
	chooseclass_win.add(left_arrow);
	left_arrow.hide();
	chooseclass_win.add(right_arrow);
	left_arrow.addEventListener('click', function(e) {
		male_image.image = '/assets/K_fullbody_bad.png';
		gender = 'm';
		left_arrow.hide();
		right_arrow.show();
	});
	var Customization = require('/ui/common/MenuScreen/Customization');
	var customizationscreen = null;

	var alertDialog = Titanium.UI.createAlertDialog({
		title : 'Login Failed',
		message : 'User not found.',
		buttonNames : ['OK']
	});

	alertDialog.addEventListener('click', function(e) {
		alertDialog.close();
	});
	/////////////////////
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


	next_arrow.addEventListener('click', function(e) {
		if (email_text.value == "" || password_text.value == "" || name_text.value == "") {
			alert('All fields are required!');
		} else {
			actInd.show();
			email_text.value = email_text.value.toLowerCase();
			getToken(function(success, token) {
			    if(success){
			        actInd.message = 'Authentication...';
			        ServerSignup(name_text.value,email_text.value, password_text.value,gender, token, function(success, json) {
			            if(success){
                            if (json[0].LAST_USER == "NULL") {
/*
                                actInd.message = 'Subscribing device for ' + email_text.value + '...';
*/
                                CloudSubscribeUser(email_text.value, 'alert', token, function(success, uid) {
                                    if(success){
                                        InsertUidAndToken(email_text.value,uid,token,function(success,message){
                                            if(success){
                                                CloudLogout(function(success,message){
                                                    json = {Record:json};
                                                    var Customization = require('/ui/common/MenuScreen/Customization');
                                                    customization = new Customization(json);
                                                    customization.open();
                                                    actInd.hide();
                                                });
                                            }
                                            else{
                                                alert(message);
                                            }
                                        });
                                    }
                                    else{
                                        alert(uid);
                                    }
                                });
                            }
                            else{
                                CloudSearchUser(json[0].LAST_USER, function(success, last_user_id) {
                                    var last_email = json[0].LAST_USER;
                                    CloudUnsubscribeUser(last_user_id, 'alert', token, function(success, message) {
                                        if (success) {
                                            CloudSubscribeUser(email_text.value, 'alert', token, function(success, uid) {
/*
                                                insert uid and device token in database
*/
                                                InsertUidAndToken(email_text.value,uid,token,function(success,message){
                                                    if(success){
                                                        json = {Record:json};
                                                        InsertUidAndToken(last_email,"","",function(success,message){
                                                            if(success){
                                                                var Customization = require('/ui/common/MenuScreen/Customization');
                                                                customization = new Customization(json);
                                                                customization.open();
                                                                actInd.hide();
                                                            }
                                                            else{
                                                                alert(message);
                                                            }
                                                        });
                                                    }
                                                    else{
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
			            }
			        });
			        
			    }
			});
		}

	});
	chooseclass_win.addEventListener('android:back', function(e) {
		Ti.App.fireEvent('close_screen', {
			screen_name : 'choose_your_class'
		});
	});
	Ti.App.addEventListener('customization', function(data) {
		if (customizationscreen != null) {
			customizationscreen.close();
			customizationscreen = null;
		} else {
			Ti.App.fireEvent('close_screen', {
				screen_name : 'choose_your_class'
			});
		}
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

	return chooseclass_win;
}

//make constructor function the public component interface
module.exports = ChooseClass;
