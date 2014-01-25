function Footer(userinfojson) {
	function updateFooter(_userinfojson) {
		var gender;
		if (userinfojson.Record[0].GENDER == 'm') {
			gender = 'KNIGHT';
		} else
			gender = 'PRINCESS';
		userinfojson = _userinfojson;
		level_text.text = "LEVEL " + _userinfojson.Record[0].LEVEL;// + "\n" + gender;
		gold_quantity.text = _userinfojson.Record[0].NUM_OF_GOLDS;
		status_single.text = _userinfojson.Record[0].MARITIAL_STATUS;
		days_label.text = _userinfojson.Record[0].ACCOUNT_AGE + '\nDays';
	}

	var view = Titanium.UI.createView({
		bottom : '0%',
		height : '10%',
		width : '100%',
		backgroundImage : '/assets/footerSlim_001.png',
		zIndex : 100
	});
	var iconGold_imageview = Titanium.UI.createImageView({
		height : '100%',
		width : '11.3%',
		left : '3.9%',
		image : '/assets/iconGold.png',

	});
	view.add(iconGold_imageview);
	iconGold_imageview.addEventListener('click', function(e) {
		var KnPStore = require('ui/common/MenuScreen/KnPStore');
		var kandp = new KnPStore(userinfojson);
		kandp.open();
	});

	var gold_quantity = Titanium.UI.createLabel({
		text : userinfojson.Record[0].NUM_OF_GOLDS,
		height : '100%',
		width : 'auto',
		left : '16%',
		zIndex : 500,
		color : '#FFCC00',
		font : {
			fontWeight : 'bold',
			fontSize : 16
		}
	});
	view.add(gold_quantity);
	var level_text = Titanium.UI.createLabel({
		text : "LEVEL " + userinfojson.Record[0].LEVEL,// + "\n" + userinfojson.Record[0].GENDER,
		height : '100%',
		textAlign : 'centre',
		color : "#5afd9b",
		width : 'auto',
		right : '46%',
		font : {
			fontSize : '12dip'
		}
	});
	view.add(level_text);
	var status_single = Titanium.UI.createLabel({
		text : userinfojson.Record[0].MARITIAL_STATUS,
		height : '100%',
		width : 'auto',
		color : '#5afd9b',
		right : '25%',
		font : {
			fontSize : '12dip'
		}
	});
	view.add(status_single);

	var bottom_coin = Titanium.UI.createImageView({
		height : '100%',
		width : '11.3%',
		right : '15.9%',
		image : '/assets/overlayCalendar.png',
	});
	// view.add(bottom_coin);

	var days_label = Titanium.UI.createLabel({
		// backgroundImage : '/assets/.png',
		text : "0\nDays",
		right : "2%",
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '15dip'
		}

	});
	view.add(days_label);
	updateFooter(userinfojson);

	Ti.App.addEventListener('update_footer', function(data) {
		var httpclientt = require('/ui/common/Functions/function');

		httpclientt.requestServer({
			success : function(e) {
				var userinfojson = JSON.parse(this.responseText);
				updateFooter(userinfojson);
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + userinfojson.Record[0].UID + ""
		});
	});
	Ti.App.addEventListener('update_xp', function(data) {
		var httpclientt = require('/ui/common/Functions/function');

		httpclientt.requestServer({
			success : function(e) {
				var userinfojson = JSON.parse(this.responseText);
				updateFooter(userinfojson);
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + userinfojson.Record[0].UID + ""
		});
	});
	Ti.App.addEventListener('new_info', function(data) {
		updateFooter(data.userinfojson);
	});

	return view;
};
module.exports = Footer;
