function ProgressBar(userinfo_json) {
	//alert(userinfo_json.LEVEL);
	var countDown = function(h, m, s, _instance_index, fn_tick, fn_end) {
		return {
			total_sec : h * 60 * 60 + m * 60 + s,
			timer : this.timer,
			instance_index : _instance_index,
			set : function(h, m, s) {
				this.total_sec = parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
				this.time = {
					h : h,
					m : m,
					s : s
				};
				return this;
			},
			start : function() {
				var self = this;
				this.timer = setInterval(function() {
					//alert('running');
					if (self.total_sec) {
						self.total_sec--;
						var hour = parseInt(self.total_sec / (60 * 60));
						var min = (self.total_sec - (parseInt(hour * (60 * 60))) - (self.total_sec % 60)) / 60;

						self.time = {
							h : parseInt(self.total_sec / (60 * 60)),
							m : parseInt(min),
							s : (self.total_sec % 60)
						};
						fn_tick(self.time.h + ":" + self.time.m + ":" + self.time.s, self.instance_index);
					} else {
						self.stop();
						fn_end(self.instance_index);
					}
				}, 1000);
				return this;
			},
			stop : function() {
				clearInterval(this.timer);
				this.time = {
					h : 0,
					m : 0,
					s : 0
				};
				this.total_sec = 0;
				return this;
			}
		};
	};
	var current_energy = 0;
	function updateEnergyAndXP(userinfo_json) {
		var xp_max_val = userinfo_json.Record[0].LEVEL * 1000 + 1000, energy_max_val = userinfo_json.Record[0].LEVEL * 1000;
		var XPBar = ((userinfo_json.Record[0].XP / xp_max_val) * 100);
		XPBar_imageview.width = "" + ((XPBar / 100) * 45) + "%";
		xp_label.text = parseInt(userinfo_json.Record[0].XP) + "/" + xp_max_val;
		//var EnergyBar = "" + ((userinfo_json.Record[0].ENERGY / energy_max_val) * 100) + "%";
		var EnergyBar = ((userinfo_json.Record[0].ENERGY / energy_max_val) * 100);
		EnergyBar_imageview.width = "" + ((EnergyBar / 100) * 45) + "%";
		//alert("" + ((userinfo_json.Record[0].ENERGY / energy_max_val) * 100) + "%");
		current_energy = parseInt((userinfo_json.Record[0].ENERGY / energy_max_val) * 100);
		energyscore_label.text = current_energy + "%";
		level_label.text = 'LVL ' + userinfo_json.Record[0].LEVEL;
		statusmsg_label.text = userinfo_json.Record[0].STATUS_MESSAGE;
	}

	function updateProgressBar(new_userinfojson) {
		updateEnergyAndXP(new_userinfojson);
		name_label.text = new_userinfojson.Record[0].NAME;
		charactertype_label.text = (new_userinfojson.Record[0].GENDER == 'm') ? "KNIGHT" : "PRINCESS";
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
	if (userinfo_json.Record[0].GENDER == 'm') {
		gender = 'KNIGHT';
	} else
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
		top : '80%',
		right : '7.9%',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(statusmsg_label);

	var xp_label = Titanium.UI.createLabel({
		text : '1000/1000',
		top : '30.9%',
		left : '68%',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(xp_label);

	var energyscore_label = Titanium.UI.createLabel({
		text : '1000/1000',
		top : '60.3%',
		left : '68%',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}
	});
	view.add(energyscore_label);

	var energy_countdown_label = Titanium.UI.createLabel({
		text : '00:00:00',
		top : '60.3%',
		right : '6%',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}
	});
	view.add(energy_countdown_label);
	var energy_countdown = function() {
		var get_next_cron_time_url = "http://bonozo.com:8080/knp/get_next_cron_time.php?uid=" + userinfo_json.Record[0].UID;
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				var time_json = JSON.parse(this.responseText);
				if (time_json.Record != undefined && time_json.Record.COUNTDOWN != "NULL") {
					var n = time_json.Record.COUNTDOWN.split(":");
					var countdown = new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), 1, function(curr_time, instance_index) {
						energy_countdown_label.text = curr_time;
					}, function(instance_index) {
						energy_countdown_test();
					});
					countdown.start();
				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : get_next_cron_time_url
		});
	};
	var energy_countdown_test = function() {
		setTimeout(function() {
			if (current_energy < 100)
				energy_countdown();
			else
				energy_countdown_test();
		}, 1000);
	};
	(function() {
		energy_countdown_test();
	})();
	/*
	 new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), items_json.Record[i].ASSIGN_QUEST_ID, function(curr_time, instance_index) {
	 questTime[instance_index].text = curr_time;
	 }, function(instance_index) {
	 */
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

	updateEnergyAndXP(userinfo_json);
	Ti.App.addEventListener('new_info', function(data) {
		updateProgressBar(data.userinfojson);
	});

	Ti.App.addEventListener('update_xp', function(data) {
		var httpclientt = require('/ui/common/Functions/function');

		httpclientt.requestServer({
			success : function(e) {
				var userinfojson = JSON.parse(this.responseText);
				updateEnergyAndXP(userinfojson);
			},
			method : 'GET',
			contentType : 'text/xml',
			url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + userinfo_json.Record[0].UID + "",
		});
	});
	var osname = Ti.Platform.osname;
	if (osname === 'iphone' || osname === 'ipad') {
		var run_service = function() {
			setTimeout(function() {
				if (Ti.App.Properties.getString('service_enabled')) {
					var _uid = Ti.App.Properties.getString('uid');
					Ti.App.fireEvent('service_notification', {
						uid : _uid
					});
					run_service();
				}
				Ti.API.info("service run!");
			}, 5000);
		};
		run_service();
	}
	return view;
};

module.exports = ProgressBar;
