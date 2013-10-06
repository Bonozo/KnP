var service = Titanium.Android.currentService;
var intent = service.intent;
var _uid = intent.getStringExtra("uid");
Ti.App.fireEvent('service_notification', {
	uid : _uid
}); 