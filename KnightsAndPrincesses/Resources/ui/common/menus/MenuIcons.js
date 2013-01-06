function MenuIcons(active_screen) {

	var view = Titanium.UI.createView({
		top : "12%",
		height : "10%",
		zIndex : 200
	});

	var iconstatus_imageview = Titanium.UI.createImageView({
		left : '0%',
		top : '0%',
		image : '/assets/iconStatus.png',
		height : '100%',
		width : '13.8%',
		zIndex : 100
	});
	iconstatus_imageview.addEventListener('click', function() {
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'StatusScreen'
		});
	});

	view.add(iconstatus_imageview);
	var iconInventory_imageview = Titanium.UI.createImageView({
		image : '/assets/iconInventory.png',
		height : '100%',
		width : '13.8%',
		top : '0%',
		left : '15.8%',
		zIndex : 100
	});
	view.add(iconInventory_imageview);
	iconInventory_imageview.addEventListener('click', function() {
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'Inventoryscreen'
		});
	});
	var iconFriends_imageview = Titanium.UI.createImageView({
		image : '/assets/iconFriends.png',
		height : '100%',
		width : '13.8%',
		top : '0%',
		left : '29.6%',
		zIndex : 100
	});
	view.add(iconFriends_imageview);
	iconFriends_imageview.addEventListener('click', function() {
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'FreindsScreen'
		});
	});
	var iconQuests_imageview = Titanium.UI.createImageView({
		image : '/assets/iconQuests.png',
		height : '100%',
		width : '13.8%',
		top : '0%',
		left : '43.4%'
	});
	view.add(iconQuests_imageview);
	iconQuests_imageview.addEventListener('click', function() {
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'QuestsHome'
		});

	});

	var iconLeaderboards_imageview = Titanium.UI.createImageView({
		image : '/assets/iconLeaderboards.png',
		height : '100%',
		width : '13.8%',
		top : '0%',
		left : '57.2%'
	});
	view.add(iconLeaderboards_imageview);
	iconLeaderboards_imageview.addEventListener('click', function() {
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'Leaderboards'
		});

	});

	var iconCustomizeBackground_imageview = Titanium.UI.createImageView({
		image : '/assets/iconCustomizeBackground.png',
		height : '100%',
		width : '13.8%',
		top : '0%',
		left : '71%',
		zIndex : 100
	});
	view.add(iconCustomizeBackground_imageview);
	iconCustomizeBackground_imageview.addEventListener('click', function() {
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'SceneryCustomization'
		});

	});
	var iconOptions_imageview = Titanium.UI.createImageView({
		image : '/assets/iconOptions.png',
		height : '100%',
		width : '13.8%',
		top : '0%',
		left : '84.8%',
		//opacity:'0.2'
	});
	view.add(iconOptions_imageview);
	iconOptions_imageview.addEventListener('click', function() {
		Ti.App.fireEvent('menu_active', {
			clicked_item : 'OptionsScreen'
		});

	});
	return view;
}

module.exports = MenuIcons;
