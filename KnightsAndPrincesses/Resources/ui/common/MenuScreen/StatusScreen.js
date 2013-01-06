function StatusScreen(userinfo) {

	var view = Ti.UI.createView({
		width : '100%',
		height : '100%',
		zIndex : 50

	});
	var letter_imageview = Titanium.UI.createImageView({
		url : '/assets/LargeScroll.png',
		height : '43.2%',
		width : '50%',
		top : '28.5%',
		right : '0%',
		opacity : '0.6'
	});
	view.add(letter_imageview);
	letter_imageview.addEventListener('load', function(e) {
		//hideLoader();
	});

	var character_imageview = Titanium.UI.createImageView({
		url : '/assets/hdpi_female_character_Image2.png',
		height : '75%',
		//width:'93.8%',
		bottom : '0%',
		left : '0%'
	});
	view.add(character_imageview);
	character_imageview.addEventListener('load', function(e) {
		//hideLoader();
	});

	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Status',
		top : '23%',
		left : '0%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}
	});
	view.add(selected_menu_label);
	var iconbg_view = Titanium.UI.createImageView({
		url : '/assets/iconHighlight.png',
		height : '10%',
		width : '13.8%',
		top : '12%',
		left : '0%',
		zIndex : 50
	});
	iconbg_view.addEventListener('load', function(e) {
		//hideLoader();
	});

	//view.add(iconbg_view);

	var overlayProgressNotification1_imageview = Titanium.UI.createImageView({
		url : '/assets/overlayProgressNotification.png',
		right : '0',
		height : '5%',
		width : '50%',
		bottom : '16.8%',
	});
	view.add(overlayProgressNotification1_imageview);

	var quest_label = Titanium.UI.createLabel({
		text : '12 Quest to Next Level',
		bottom : '18%',
		right : '8%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(quest_label);

	var overlayProgressNotification2_imageview = Titanium.UI.createImageView({
		url : '/assets/overlayProgressNotification.png',
		right : '0',
		height : '5%',
		width : '50%',
		bottom : '10.9%',

	});
	view.add(overlayProgressNotification2_imageview);

	var friends_label = Titanium.UI.createLabel({
		text : '15 Friends to Next Level',
		bottom : '12%',
		right : '8%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}
	});
	view.add(friends_label);

	var letter_text_label = Titanium.UI.createLabel({
		text : 'Following Ruby \nDress \n+1 Aiming  \n+2 Charming',
		top : '35.6%',
		right : '10%',
		width : '26%',
		textAlign : 'center',
		color : '#4f2e5e',
		font : {
			fontSize : '14dip'
		}

	});
	view.add(letter_text_label);

	var arrowUP_imageview = Titanium.UI.createImageView({
		url : '/assets/iconControlArrowUp.png',
		width : '8%',
		height : '5%',
		right : '16%',
		top : '26.4%',

	});
	view.add(arrowUP_imageview);

	arrowUP_imageview.addEventListener('load', function(e) {
		//hideLoader();
	});

	var arrowDown_imageview = Titanium.UI.createImageView({
		url : '/assets/iconControlArrowDown.png',
		width : '8%',
		height : '5%',
		right : '25%',
		top : '70.2%',

	});
	view.add(arrowDown_imageview);

	arrowDown_imageview.addEventListener('load', function(e) {
		//hideLoader();
	});
	return view;

}

//make constructor function the public component interface
module.exports = StatusScreen;
