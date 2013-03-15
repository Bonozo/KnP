function ProgressBar(userinfo_json) {
	//alert(userinfo_json.LEVEL);
	function updateEnergyAndXP(userinfo_json) {
		var xp_max_val = userinfo_json.Record[0].LEVEL * 1000 + 1000, energy_max_val = userinfo_json.Record[0].LEVEL * 1000;
		var XPBar = ((userinfo_json.Record[0].XP / xp_max_val) * 100);
		XPBar_imageview.width = "" + ((XPBar / 100) * 45) + "%";
		xp_label.text = parseInt(userinfo_json.Record[0].XP) + "/" + xp_max_val;
		//var EnergyBar = "" + ((userinfo_json.Record[0].ENERGY / energy_max_val) * 100) + "%";
		var EnergyBar = ((userinfo_json.Record[0].ENERGY / energy_max_val) * 100);
		EnergyBar_imageview.width = "" + ((EnergyBar / 100) * 45) + "%";
		//alert("" + ((userinfo_json.Record[0].ENERGY / energy_max_val) * 100) + "%");
		energyscore_label.text = "" + parseInt((userinfo_json.Record[0].ENERGY / energy_max_val) * 100) + "%";
		level_label.text = 'LVL ' + userinfo_json.Record[0].LEVEL;
		statusmsg_label.text = userinfo_json.Record[0].STATUS_MESSAGE;
	}

	var view = Titanium.UI.createView({
		top : '0%',
		height : '12.4%',
		width : '100%',
		backgroundImage : '/assets/overlayPlayerInfo.png'
	});
	var name_label = Titanium.UI.createLabel({
		text : userinfo_json.Record[0].NAME,
		top : '0',
		height : '30.1%',
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '10dip'
		}
	});
	view.add(name_label);
        var gender;
        if(userinfo_json.Record[0].GENDER == 'm'){
            gender = 'KNIGHT';
        }
        else 
           gender = 'PRINCESS';

	var charactertype_label = Titanium.UI.createLabel({
		text : gender,
		top : '0',
		height : '30.1%',
		right : '3%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(charactertype_label);

	var Bar_Backdrop1_imageview = Titanium.UI.createButton({
		top : '30.9%',
		left : '22.9%',
		height : "20%",
		width : '45.1%',
		backgroundImage : '/assets/Bar_Backdrop.png'

	});
	view.add(Bar_Backdrop1_imageview);

	var XPBar_imageview = Titanium.UI.createButton({
		top : '30.9%',
		left : '22.9%',
		height : "20%",
		width : '25.1%',
		backgroundImage : '/assets/XPBar.png'

	});
	view.add(XPBar_imageview);
	var Bar_Backdrop2_imageview = Titanium.UI.createButton({
		//height:'43.5%',
		top : '60.3%',
		left : '22.9%',
		height : "20%",
		width : '45.1%',
		backgroundImage : '/assets/Bar_Backdrop.png'
	});
	view.add(Bar_Backdrop2_imageview);

	var EnergyBar_imageview = Titanium.UI.createButton({
		top : '60.3%',
		left : '22.9%',
		height : "20%",
		width : '35.1%',
		backgroundImage : '/assets/ENERGYBar.png'

	});
	view.add(EnergyBar_imageview);

	var statusmsg_label = Titanium.UI.createLabel({
		text : userinfo_json.Record[0].STATUS_MESSAGE,
		top : '80.1%',
		right : '7.9%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(statusmsg_label);

	var xp_label = Titanium.UI.createLabel({
		text : '1000/1000',
		top : '30.9%',
		right : '7%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(xp_label);

	var energyscore_label = Titanium.UI.createLabel({
		text : '1000/1000',
		top : '60.3%',
		//height:'2.1%',
		right : '7%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(energyscore_label);

	var level_label = Titanium.UI.createLabel({
		text : 'Level' + userinfo_json.Record[0].LEVEL,
		top : '30.9%',
		//height:'2.1%',
		left : '3%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(level_label);

	var energy_label = Titanium.UI.createLabel({
		text : 'Energy Level',
		top : '60.3%',
		//height:'2.1%',
		left : '3%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(energy_label);

	/*
	 var xp_max_val = userinfo_json.Record[0].LEVEL * 1000 + 1000, energy_max_val = userinfo_json.Record[0].LEVEL * 1000;
	 var XPBar = ((userinfo_json.Record[0].XP / xp_max_val) * 100);
	 XPBar_imageview.width = "" + ((XPBar / 100) * 45) + "%";
	 xp_label.text = parseInt(userinfo_json.Record[0].XP) + "/" + xp_max_val;
	 //var EnergyBar = "" + ((userinfo_json.Record[0].ENERGY / energy_max_val) * 100) + "%";
	 var EnergyBar = ((userinfo_json.Record[0].ENERGY / energy_max_val) * 100);
	 EnergyBar_imageview.width = "" + ((EnergyBar / 100) * 45) + "%";
	 //alert("" + ((userinfo_json.Record[0].ENERGY / energy_max_val) * 100) + "%");
	 energyscore_label.text = "" + parseInt((userinfo_json.Record[0].ENERGY / energy_max_val) * 100) + "%";
	 */
	updateEnergyAndXP(userinfo_json);

	Ti.App.addEventListener('update_xp', function(data) {
		var httpclientt = require('/ui/common/Functions/function');

		httpclientt.requestServer({
			success : function(e) {
				var userinfojson = JSON.parse(this.responseText);
				updateEnergyAndXP(userinfojson);
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + userinfo_json.Record[0].UID + "",
		});
	});
	return view;
};

module.exports = ProgressBar;
