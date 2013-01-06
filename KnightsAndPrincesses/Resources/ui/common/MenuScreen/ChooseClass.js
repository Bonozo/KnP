function ChooseClass() {
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
	chooseclass_win.add(male_image);
	var right_arrow = Titanium.UI.createButton({
		top : "35%",
		left : "60%",
		width : "25%",
		height : "20%",
		backgroundImage : "/assets/iconControlArrowLeft.png"
	});
	chooseclass_win.add(right_arrow);

	var next_arrow = Titanium.UI.createButton({
		bottom : '0%',
		right : '0%',
		backgroundImage : '/assets/iconNextArrow.png',
		height : '10%',
		width : '35%'
	});
	chooseclass_win.add(next_arrow);



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
		hintText:"Name",
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
		hintText:"Email",
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
		hintText:"Password",
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
	var left_arrow = Titanium.UI.createButton({
		top : "40%",
		left : "10%",
		visible : false,
		width : "25%",
		height : "20%",
		backgroundImage : "/assets/iconControlArrowRight.png"
	});
	right_arrow.addEventListener('click', function(e) {
		male_image.image = '/assets/hdpi_female_character.png';
		right_arrow.hide();
		left_arrow.show();

	});
	chooseclass_win.add(left_arrow);
	left_arrow.hide();
	chooseclass_win.add(right_arrow);
	left_arrow.addEventListener('click', function(e) {
		male_image.image = '/assets/K_fullbody_bad.png';
		left_arrow.hide();
		right_arrow.show();
	});
	var Customization = require('/ui/common/MenuScreen/Customization');
	var customizationscreen = null;
	
	var alertDialog = Titanium.UI.createAlertDialog({
    title: 'Login Failed',
    message: 'User not found.',
    buttonNames: ['OK']
	});
	 
	alertDialog.addEventListener('click', function(e){
	            alertDialog.close();
	        }
	); 
	/////////////////////
	next_arrow.addEventListener('click', function(e) {
		if(email_text.value == "" || password_text.value == "" || name_text.value == ""){
			alert('All fields are required!');
		}
		else{
			var httpclientt = require('/ui/common/Functions/function');
			httpclientt.requestServer({
				success : function(e) {
					var json = JSON.parse(this.responseText);
					if (json.Record != undefined) {
						customizationscreen = new Customization(json,name_text.value);
						customizationscreen.open();
	
						var Record = json.Record[0];
						
					} else if (json.Error != undefined) {
						alert(json.Error);
					} else {
						alert("Something went wrong!");
					}
	
				},
				method : 'GET',
				contentType : 'text/xml',
			 url : "http://justechinfo.com/kap_server/sign_up.php?email="+email_text.value +"&password="+password_text.value +"&name="+name_text.value +"&gender=m"
				//param : '<Device xmlns="http://schemas.datacontract.org/2004/07/CalendarConnect.Model">' + '<culture>' + Titanium.Platform.locale + '</culture>' + '<deviceToken>Have to Do</deviceToken>' + '<deviceType>' + deviceType + '</deviceType>' + '<modelDescription>' + Titanium.Platform.model + '</modelDescription>' + '<osVersion>' + Titanium.Platform.version + '</osVersion></Device>'
			});
			
		}


	});
	chooseclass_win.addEventListener('android:back',  function(e) {
		Ti.App.fireEvent('close_screen', {
			screen_name : 'choose_your_class'
		});
	});
	Ti.App.addEventListener('customization', function(data) {
		if (customizationscreen != null) {
			customizationscreen.close();
			customizationscreen = null;
		}
		else{
			Ti.App.fireEvent('close_screen', {
				screen_name : 'choose_your_class'
			});
		}
	});


	return chooseclass_win;
}

//make constructor function the public component interface
module.exports = ChooseClass; 