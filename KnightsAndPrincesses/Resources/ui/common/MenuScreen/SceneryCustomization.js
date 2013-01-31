function SceneryCustomization(userinfo) {
	var view = Titanium.UI.createView({
		top : "23%",
		height : "78%",
		width : "100%"
	});

	var character_imageview = Titanium.UI.createImageView({
		image : '/assets/hdpi_female_character.png',
		height : '61.6%',
		//width:'51.9%',
		top : '2%',
		right : '0%'
	});
	view.add(character_imageview);

	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Customize',
		top : '0%',
		left : '71%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(selected_menu_label);
	var decoration_label = Titanium.UI.createLabel({
		text : "DECORATION",
		textAlign : 'right',
		bottom : "20%",
		width : "30%",
		left : "1%",
		height : "10%",

	});
	view.add(decoration_label);
	var leftarrow_decoration = Titanium.UI.createButton({
		bottom : "22%",
		backgroundImage : "/assets/iconControlArrowRight.png",
		height : "6%",
		left : "31%",
		width : "8%"
	});
	view.add(leftarrow_decoration);
	var rightarrow_decoration = Titanium.UI.createButton({
		bottom : "22%",
		backgroundImage : "/assets/iconControlArrowLeft.png",
		height : "6%",
		right : "0%",
		width : "8%"
	});
	view.add(rightarrow_decoration);
	var style_label = Titanium.UI.createLabel({
		text : "Style",
		textAlign : "right",
		bottom : "30%",
		width : "30%",
		left : "1%",
		height : "10%",

	});
	view.add(style_label);
	var leftarrow_style = Titanium.UI.createButton({
		bottom : "32%",
		backgroundImage : "/assets/iconControlArrowRight.png",
		height : "6%",
		left : "31%",
		width : "8%"
	});
	view.add(leftarrow_style);
	var rightarrow_style = Titanium.UI.createButton({
		bottom : "32%",
		backgroundImage : "/assets/iconControlArrowLeft.png",
		height : "6%",
		right : "0%",
		width : "8%"
	});
	view.add(rightarrow_style);
	var Color_label = Titanium.UI.createLabel({
		text : "Color Scheme",
		textAlign : "right",
		bottom : "40%",
		width : "30%",
		left : "1%",
		height : "10%",

	});
	view.add(Color_label);
	var leftarrow_color = Titanium.UI.createButton({
		bottom : "42%",
		backgroundImage : "/assets/iconControlArrowRight.png",
		height : "6%",
		left : "31%",
		width : "8%"
	});
	view.add(leftarrow_color);
	var rightarrow_color = Titanium.UI.createButton({
		bottom : "42%",
		backgroundImage : "/assets/iconControlArrowLeft.png",
		height : "6%",
		right : "0%",
		width : "8%"
	});
	view.add(rightarrow_color);

	var kandptore = Titanium.UI.createButton({
		bottom : "52%",
		backgroundImage : "/assets/button_smallLong_HIGHLIGHTED.png",
		height : "8%",
		right : "5%",
		zIndex : 5000,
		//size:"10dip",
		title : "K&P Store",
		width : "25%"
	});
	view.add(kandptore);

	var chips = Titanium.UI.createButton({
		bottom : "52%",
		backgroundImage : "/assets/iconDiceRandom.png",
		height : "8%",
		right : "33%",
		width : "10%"
	});
	view.add(chips);
	/////////// Grid For decoration

	var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
	var ScrolViewHeight = 15;
	//in percentage
	//var ScrolViewImageHeight = (ScrolViewHeight/100) * ScreenHeight;	//in px image should be SQUARE, height = width
	var ScrolViewImageHeight = "60";
	//alert(ScrolViewImageHeight);

	var decoration_scrol_view = Ti.UI.createScrollView({
		bottom : '20%',
		width : '50%',
		left : "40%",
		height : "5%",
		height : ScrolViewImageHeight + 'px',
		scrollType : 'horizontal'
	});
	view.add(decoration_scrol_view);

	var ScrolView_Image_left = 0;
	var No_images = 8;
	/*
	for (var i = 0; i < No_images; i++) {
	var ImageView_InScroll = Ti.UI.createImageView({
	image : '/assets/' + i + '.png',
	left : ScrolView_Image_left,
	height : ScrolViewImageHeight + 'px',
	width : ScrolViewImageHeight + 'px'
	});
	decoration_scrol_view.add(ImageView_InScroll);

	ScrolView_Image_left = ScrolView_Image_left + ScrolViewImageHeight;
	}
	*/

	///    Grid For decoration
	///Grid For Style
	var style_scrol_view = Ti.UI.createScrollView({
		bottom : '30%',
		width : '50%',
		left : "40%",
		height : "5%",
		height : ScrolViewImageHeight + 'px',
		scrollType : 'horizontal'
	});
	view.add(style_scrol_view);

	var ScrolView_Image_left = 0;
	var No_images = 8;
	/*
	for (var i = 0; i < No_images; i++) {
	var ImageView_InScroll = Ti.UI.createImageView({
	image : '/assets/' + i + '.png',
	left : ScrolView_Image_left,
	height : ScrolViewImageHeight + 'px',
	width : ScrolViewImageHeight + 'px'
	});
	style_scrol_view.add(ImageView_InScroll);

	ScrolView_Image_left = ScrolView_Image_left + ScrolViewImageHeight;
	}
	*/
	///Grid For Style

	////Grid for Color Scheme
	var color_scrol_view = Ti.UI.createScrollView({
		bottom : '40%',
		width : '50%',
		left : "40%",
		height : "5%",
		height : ScrolViewImageHeight + 'px',
		scrollType : 'horizontal'
	});
	view.add(color_scrol_view);

	var ScrolView_Image_left = 0;
	var No_images = 8;
	/*
	for (var i = 0; i < No_images; i++) {
	var ImageView_InScroll = Ti.UI.createImageView({
	image : '/assets/' + i + '.png',
	left : ScrolView_Image_left,
	height : ScrolViewImageHeight + 'px',
	width : ScrolViewImageHeight + 'px'
	});
	color_scrol_view.add(ImageView_InScroll);

	ScrolView_Image_left = ScrolView_Image_left + ScrolViewImageHeight;
	}
	*/
	////Grid for Color Scheme
	////////// just for demo

	kandptore.addEventListener('click', function(e) {
		var kandpwindow = require('ui/common/MenuScreen/KandPscreen');
		var kandpp = new kandpwindow(userinfo);
		kandpp.open();
		//alert("Kaisa");
	});
	return view;
};
module.exports = SceneryCustomization;
