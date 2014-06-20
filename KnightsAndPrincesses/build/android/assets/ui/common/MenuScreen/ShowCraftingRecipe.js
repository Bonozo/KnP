function ShowCraftingRecipe(item, description, recipe) {
	var main_table_view;
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var window = Titanium.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		height : '80%',
		width : '80%',
		navBarHidden : true,
		fullscreen : true
	});
	var view = Ti.UI.createView({
		backgroundImage : '/assets/inventoryBackground.png',
		width : '100%',
		height : '100%'
	});
	window.add(view);
	var headerView = Ti.UI.createView({
		zIndex : 50,
		height : '8%',
		top : 0,
		backgroundImage : "/assets/overlayTitleStarCurtains.png"
	});
	var return_imageview = Ti.UI.createImageView({
		image : '/assets/iconReturn.png',
		height : '8%',
		width : '11.6%',
		top : '1%',
		right : '3%',
		zIndex : 600
	});
	view.add(return_imageview);
	return_imageview.addEventListener('click', function(e) {
		window.close();
	});
	
	var craft_description = Ti.UI.createLabel({
		text : description,
		color : '#48d48d',
		font : {fontSize:14},
		top : '10%',
		textAlign : 'center'
	});
	view.add(craft_description);

	var headerLabel = Ti.UI.createLabel({
		text : item,
		font : {
			fontSize : 18,
			fontWeight : "bold"
		},
		color : "#48d48d",
		zIndex : 500
	});

	headerView.add(headerLabel);
	view.add(headerView);

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var rowViewHeight = screenWidth * 0.136;
	var tabledata = [];
	for (var key in recipe) {
		var rowView = Ti.UI.createTableViewRow({
			height : rowViewHeight,
			className : 'crafting_recipe_detail',
			zIndex : 500
		});

		// Create a Label.
		var item_label = Ti.UI.createLabel({
			font : {
				fontSize : '16dip',
				fontWeight : 'bold'
			},
			color : '#5afd9b',
			text : key,
			left : '5%'
		});
		rowView.add(item_label);

		// Create a Label.
		var quantity_label = Ti.UI.createLabel({
			text : recipe[key] + " Unit(s)",
			color : '#5afd9b',
			font : {
				fontSize : '14dip'
			},
			right : '10%'
		});
		rowView.add(quantity_label);
		tabledata.push(rowView);
	}
	var tableview = Ti.UI.createTableView({
		backgroundColor : 'transparent',
		separatorColor : '#5afd9b',
		data : tabledata,
		width : '100%',
		height : '72.3%',
		top : '20%'
	});
	view.add(tableview);

	return window;
}

module.exports = ShowCraftingRecipe;
