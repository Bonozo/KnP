var osname = Ti.Platform.osname;

if (osname === 'iphone' || osname === 'ipad') {

	var run_service = function() {
		setTimeout(function() {
			if (Ti.App.Properties.getString('service_enabled')) {
				var _uid = Ti.App.Properties.getString('uid');
				Ti.App.fireEvent('service_notification', {
					uid : _uid
				});
				alert('run_service');
				run_service();
			}
		}, 5000);
	}
} else {
	var service = Titanium.Android.currentService;
	var intent = service.intent;
	var _uid = intent.getStringExtra("uid");
	Ti.App.fireEvent('service_notification', {
		uid : _uid
	});
}

