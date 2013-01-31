function Leaderboards(userinfo) {
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var view = Ti.UI.createView({
		top : "23%",
		height : "78%",
		width : "100%"
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Leaderboards',
		top : '0%',
		left : '55.2%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(selected_menu_label);

	// Create a Label.
	var notAvailable = Ti.UI.createLabel({
		text : 'Not available...',
		color : '#FFFFFF',
		font : {
			fontSize : '16dip'
		},
		textAlign : 'center'
	});

	// Add to the parent view.
	view.add(notAvailable);

	return view;

}

module.exports = Leaderboards; 