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
    function ServerSignup(name_value, email_value, password_value, gender_value,device_token_value , callback) {
        var httpclientt = require('/ui/iphone/Functions/function');
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

	var deviceToken;


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
        height : "8.5%",
        width : "100%",
        bottom : '92.5%',
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
    var return_imageview = Ti.UI.createImageView({
        image : '/assets/iconReturn.png',
        width : '11.6%',
        bottom : '88%',
        right : '3%'
    });
    chooseclass_win.add(return_imageview);
    return_imageview.addEventListener('click', function(e) {
        chooseclass_win.close();
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
/*    function getToken(callback) {
        CloudPush.retrieveDeviceToken({
            success : function deviceTokenSuccess(e) {
                callback(true, e.deviceToken);
            },
            error : function deviceTokenError(e) {
                callback(false, e.message);
            }
        });
    }

*/
	next_arrow.addEventListener('click', function(e) {
		if (email_text.value == "" || password_text.value == "" || name_text.value == "") {
			alert('All fields are required!');
		} else {
			actInd.show();
			email_text.value = email_text.value.toLowerCase();
			
        var httpclientt = require('/ui/iphone/Functions/function');
        httpclientt.requestServer({
            success : function(e) {
                var json = JSON.parse(this.responseText);
                if (json.Record != undefined) {
                   // actInd.hide();
                   var MainMenuScreen = require('ui/iphone/MenuScreen/MainMenuScreen');
                                                    MainMenu = new MainMenuScreen(json);
                                                    MainMenu.open();


                } else if (json.Error != undefined) {
                    alert(json.Error);
                } else {
                    alert("Something went wrong!");
                }

            },
            method : 'GET',
            contentType : 'text/xml',
            url : "http://therealmattharmon.com/knp/sign_up.php?email=" + email_text.value + "&password=" +password_text.value+ "&name=" + name_text.value + "&gender=" + gender+"&device_token="
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

	return chooseclass_win;
}

//make constructor function the public component interface
module.exports = ChooseClass;
