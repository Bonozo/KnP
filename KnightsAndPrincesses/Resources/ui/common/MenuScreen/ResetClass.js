function ResetClass(userinfo) {
	var gender = 'm';
	var images_counter = 0;
	function hideLoader() {
		images_counter++;
		if (images_counter >= 4) {
			actInd.hide();
		}
	}

	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();

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
	next_arrow.addEventListener('click', function(e) {
		if (name_text.value == "") {
			alert('Please enter the Name!');
		} else {
			var httpclientt = require('/ui/common/Functions/function');
			httpclientt.requestServer({
				success : function(e) {
					var json = JSON.parse(this.responseText);
					if (json.Record != undefined) {
/*
						customizationscreen = new Customization(json, name_text.value);
						customizationscreen.open();
*/
						
						chooseclass_win.close();
						

					} else if (json.Error != undefined) {
						alert(json.Error);
					} else {
						alert("Something went wrong!");
					}

				},
				method : 'GET',
				contentType : 'text/xml',
				url : "http://justechinfo.com/kap_server/resetclass.php?uid=" + userinfo.Record[0].UID + "&name=" + Ti.Network.encodeURIComponent(name_text.value) + "&gender=" + gender
				//param : '<Device xmlns="http://schemas.datacontract.org/2004/07/CalendarConnect.Model">' + '<culture>' + Titanium.Platform.locale + '</culture>' + '<deviceToken>Have to Do</deviceToken>' + '<deviceType>' + deviceType + '</deviceType>' + '<modelDescription>' + Titanium.Platform.model + '</modelDescription>' + '<osVersion>' + Titanium.Platform.version + '</osVersion></Device>'
			});

		}

	});

	return chooseclass_win;
}

//make constructor function the public component interface
module.exports = ResetClass;
