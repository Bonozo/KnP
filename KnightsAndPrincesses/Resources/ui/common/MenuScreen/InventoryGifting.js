function openNewTable(userinfojson,selected_item,callback) {
	var TableView = require('ui/common/MenuScreen/FreindListForGift' );
	TableView(userinfojson,selected_item, function(Tableview) {
		callback(Tableview);
	});
}

function InventoryGifting(userinfojson,selected_item) {
/*
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
*/
	var main_table_view;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var window = Titanium.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	var view = Ti.UI.createView({
		backgroundImage : '/assets/inventoryBackground.png',
		width : '100%',
		height : '80%',
		top : '10%'
	});
	window.add(view);
	var headerView = Ti.UI.createView({
		zIndex : 50,
		height : '8%',
		top : 0,
		backgroundImage : "/assets/overlayTitleStarCurtains.png"
	});
	
	var headerLabel = Ti.UI.createLabel({
		color : '#000000',
		text : "SELECT FREIND TO GIFT",
		color : "#48d48d",
		zIndex : 500
	});
	
	headerView.add(headerLabel);
	view.add(headerView);
		openNewTable(userinfojson,selected_item,function(tableview) {
			main_table_view = tableview;
			main_table_view.height = "80%";
			view.add(main_table_view);
		});

	


	return window;
};
module.exports = InventoryGifting;
