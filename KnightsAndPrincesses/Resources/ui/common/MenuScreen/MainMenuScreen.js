function openNewBody(userinfojson, activeScreen) {
    var Body = require('ui/common/MenuScreen/' + activeScreen);
    return Body(userinfojson);
}

function MainMenuScreen(userinfojson) {
    var active_screen = "StatusScreen";
    var MainScreen = [];
    var json = userinfojson;

    var main_window = Titanium.UI.createWindow({
        backgroundImage : '/assets/inventoryBackground.png'
    });
    main_window.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

    var images_counter = 0;
    function hideLoader() {
        images_counter++;
        if (images_counter >= 3) {
            actInd.hide();
            if (userinfojson.Record[0].NAME == '') {
                var ResetClass = require('/ui/common/MenuScreen/ResetClass');
                var ResetClassscreen = new ResetClass(userinfojson);
                ResetClassscreen.open();
            }

        }

    }

    var actInd = Titanium.UI.createActivityIndicator();
   actInd.message = 'Loading...';
    //message will only shows in android.
    actInd.show();

    var SECONDS = 5;
    // every 5 seconds
    var service_intent = Titanium.Android.createServiceIntent({
        url : 'services/notificationservice.js'
    });
    service_intent.putExtra('interval', SECONDS * 1000);
    // Needs to be milliseconds
    service_intent.putExtra('uid', userinfojson.Record[0].UID);
    Titanium.Android.startService(service_intent);

    // service_intent.putExtra('uid', userinfojson.Record[0].UID);
    var httpclientt = require('/ui/common/Functions/function');
    httpclientt.requestServer({
        success : function(e) {
            var userinfojson = JSON.parse(this.responseText);

            var ProgressBar = require('ui/common/menus/ProgressBar');
            MainScreen.header = ProgressBar(userinfojson);
            ProgressBar = null;

            var Footer = require('ui/common/menus/Footer');
            MainScreen.footer = Footer(userinfojson);
            Footer = null;

            main_window.add(MainScreen.header);
            main_window.add(MainScreen.footer);

            hideLoader();
        },
        method : 'GET',
        contentType : 'text/xml',
        url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + userinfojson.Record[0].UID + "",
    });

    MainScreen.body = openNewBody(userinfojson, active_screen);
    main_window.add(MainScreen.body);

    var MenuIcons = require('ui/common/menus/MenuIcons');
    MainScreen.menuIcons = MenuIcons(active_screen);
    MenuIcons = null;
    main_window.add(MainScreen.menuIcons);

    hideLoader();

    Ti.App.addEventListener('menu_active', function(data) {
        var loader = Titanium.UI.createActivityIndicator();
        loader.message = 'Loading...';
        loader.show();
        main_window.remove(MainScreen.body);
        MainScreen.body = openNewBody(json, data.clicked_item);
        main_window.add(MainScreen.body);
        loader.hide();
    });
    Ti.App.addEventListener('new_info', function(data) {
        var loader = Titanium.UI.createActivityIndicator();
        loader.message = 'Loading...';
        loader.show();
        main_window.remove(MainScreen.body);
        json = data.userinfojson;
        MainScreen.body = openNewBody(data.userinfojson, data.clicked_item);
        main_window.add(MainScreen.body);
        loader.hide();

    });

    main_window.addEventListener('open', function(e) {
        hideLoader();
    });
    main_window.addEventListener('android:back', function(e) {
        Titanium.Android.stopService(service_intent);
        var activity = Titanium.Android.currentActivity;
        activity.finish();
    });

    //main_window.add(view);
    return main_window;

};
module.exports = MainMenuScreen;
