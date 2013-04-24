<<<<<<< HEAD
function Footer(userinfojson) {
	function updateFooter(userinfojson) {
	    var gender;
	    if(userinfojson.Record[0].GENDER == 'm'){
	        gender = 'KNIGHT';
	    }
	    else 
	       gender = 'PRINCESS';
		level_text.text = "LEVEL " + userinfojson.Record[0].LEVEL + "\n" + gender;
		gold_quantity.text = userinfojson.Record[0].NUM_OF_GOLDS;
		status_single.text = userinfojson.Record[0].MARITIAL_STATUS;

	}
	var view = Titanium.UI.createView({
		bottom : '0%',
		height : '10%',
		width : '100%',
		backgroundImage :'/assets/footerSlim_001.png',
		zIndex : 100
		//backgroundColor:"pink"
	});
	var iconGold_imageview = Titanium.UI.createImageView({
		height : '100%',
		width : '11.3%',
		//bottom:'10%',
		left : '3.9%',
		image : '/assets/iconGold.png',

	});
	view.add(iconGold_imageview);

	var gold_quantity = Titanium.UI.createLabel({
		text : userinfojson.Record[0].NUM_OF_GOLDS,
		height : '100%',
		width : 'auto',
		left : '16%',
		color : 'gold'
	});
	view.add(gold_quantity);
	var level_text = Titanium.UI.createLabel({
		text : "LEVEL " + userinfojson.Record[0].LEVEL + "\n" + userinfojson.Record[0].GENDER,
		height : '100%',
		textAlign : 'centre',
		color : "green",
		width : 'auto',
		right : '46%'
	});
	view.add(level_text);
	var status_single = Titanium.UI.createLabel({
		text : userinfojson.Record[0].MARITIAL_STATUS,
		height : '100%',
		width : 'auto',
		color : 'green',
		right : '25%'
	});
	view.add(status_single);

	var bottom_coin = Titanium.UI.createImageView({
		height : '100%',
		width : '11.3%',
		//bottom:'10%',
		right : '15.9%',
		image : '/assets/iconMarrigeSingle.png',
	});
	view.add(bottom_coin);

	var days_label = Titanium.UI.createLabel({
		backgroundImage : '/assets/overlayCalender.png',
		text : "45\nDays",
		color : "black",
		right : "1%"

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
			url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + userinfojson.Record[0].UID + "",
		});
	});

	return view;
};
module.exports = Footer;
=======
function Footer(userinfojson) {
	function updateFooter(userinfojson) {
	    var gender;
	    if(userinfojson.Record[0].GENDER == 'm'){
	        gender = 'KNIGHT';
	    }
	    else 
	       gender = 'PRINCESS';
		level_text.text = "LEVEL " + userinfojson.Record[0].LEVEL + "\n" + gender;
		gold_quantity.text = userinfojson.Record[0].NUM_OF_GOLDS;
		status_single.text = userinfojson.Record[0].MARITIAL_STATUS;

	}
	var view = Titanium.UI.createView({
		bottom : '0%',
		height : '10%',
		width : '100%',
		backgroundImage :'/assets/footerSlim_001.png',
		zIndex : 100
		//backgroundColor:"pink"
	});
	var iconGold_imageview = Titanium.UI.createImageView({
		height : '100%',
		width : '11.3%',
		//bottom:'10%',
		left : '3.9%',
		image : '/assets/iconGold.png',

	});
	view.add(iconGold_imageview);

	var gold_quantity = Titanium.UI.createLabel({
		text : userinfojson.Record[0].NUM_OF_GOLDS,
		height : '100%',
		width : 'auto',
		left : '16%',
		color : 'gold'
	});
	view.add(gold_quantity);
	var level_text = Titanium.UI.createLabel({
		text : "LEVEL " + userinfojson.Record[0].LEVEL + "\n" + userinfojson.Record[0].GENDER,
		height : '100%',
		textAlign : 'centre',
		color : "green",
		width : 'auto',
		right : '46%'
	});
	view.add(level_text);
	var status_single = Titanium.UI.createLabel({
		text : userinfojson.Record[0].MARITIAL_STATUS,
		height : '100%',
		width : 'auto',
		color : 'green',
		right : '25%'
	});
	view.add(status_single);

	var bottom_coin = Titanium.UI.createImageView({
		height : '100%',
		width : '11.3%',
		//bottom:'10%',
		right : '15.9%',
		image : '/assets/iconMarrigeSingle.png',
	});
	view.add(bottom_coin);

	var days_label = Titanium.UI.createLabel({
		backgroundImage : '/assets/overlayCalender.png',
		text : "45\nDays",
		color : "black",
		right : "1%"

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
			url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + userinfojson.Record[0].UID + "",
		});
	});

	return view;
};
module.exports = Footer;
>>>>>>> New version
