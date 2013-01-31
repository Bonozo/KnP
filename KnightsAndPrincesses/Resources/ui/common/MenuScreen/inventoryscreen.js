function Inventoryscreen(userinfo) {
	var view = Ti.UI.createView({
		width : '100%',
		height : '100%',

	});

	var view = Titanium.UI.createView({
		top : "23%",
		height : "78%",
		width : "100%"

	});

	var iconbg_view = Titanium.UI.createImageView({
		url : '/assets/iconHighlight.png',
		height : '10%',
		width : '14.2%',
		top : '0%',
		left : '15%',
		zIndex : 50
	});
	iconbg_view.addEventListener('load', function(e) {
		////hideLoader();
	});

	//view.add(iconbg_view);
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'INVENTORY',
		top : '0%',
		left : '15.0%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(selected_menu_label);

	var goldValue_label = Titanium.UI.createLabel({
		text : '229',
		bottom : '1.1%',
		left : '16.0%',
		textAlign : 'left',
		color : '#bf893b',
		font : {
			fontSize : '10dip',
			fontWeight : 'bold'
		}

	});
	view.add(selected_menu_label);

	var character_imageview = Titanium.UI.createImageView({
		url : '/assets/hdpi_female_character.png',
		height : '61.6%',
		//width:'51.9%',
		top : '2%',
		right : '0%'
	});
	view.add(character_imageview);
	character_imageview.addEventListener('load', function(e) {
		////hideLoader();
	});

	var center_view = Ti.UI.createView({
		backgroundColor : '#175c35',
		opacity : '0.7',
		width : '90%',
		height : '25%',
		left : '5%',
		top : '10%',
		borderRadius : 8,
		borderWidth : 3,
		borderColor : '#113825'
	});
	view.add(center_view);

	var textat_label = Titanium.UI.createLabel({
		top : '12.3%',
		left : '44%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(textat_label);

	var value_label = Titanium.UI.createLabel({
		top : '23.3%',
		right : '7.9%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		}

	});
	view.add(value_label);

	var gift_button = Titanium.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		title : 'Gift',
		height : '6%',
		width : '12.2%',
		top : '26.2%',
		right : '7.7%'
	});
	view.add(gift_button);
	gift_button.addEventListener('click', function(e) {
		alert("Gift Clicked")
	});
	var crafting_button = Titanium.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		title : 'Crafting',
		height : '6%',
		width : '22%',
		top : '26.2%',
		right : '25.7%'
	});
	view.add(crafting_button);
	crafting_button.addEventListener('click', function(e) {
		var inventorycrafting = require('ui/common/MenuScreen/inventorycrafting');
		var inventory = new inventorycrafting(userinfo);
		inventory.open({
			modal : true
		});
	});
	var chest_imageview = Titanium.UI.createImageView({
		image : '/assets/Chest.png',
		height : '45%',
		width : '86%',
		bottom : '0%',
		left : '7%'
	});
	view.add(chest_imageview);
	//////Grid
	var grid_imageview = Titanium.UI.createImageView({
		url : '/assets/grid.png',
		height : '35%',
		width : '68%',
		bottom : '20%',
		left : '16%'
	});
	grid_imageview.addEventListener('load', function(e) {
		//hideLoader();
	});

	//view.add(grid_imageview);
	var ScreenWidth = Titanium.Platform.displayCaps.platformWidth;
	var tableviewwidth_percent = 80;
	var view_per_row = 4;

	var tableViewWidth_Px = (tableviewwidth_percent / 100) * ScreenWidth;
	var ViewWidth_In_rowView = tableViewWidth_Px / view_per_row;
	//view inner rowview width in px

	function CreateInventoryGrid(TableviewCallback) {
		var httpclientt = require('/ui/common/Functions/function');
		_url = "http://justechinfo.com/kap_server/get_all_inventories.php?uid=" + userinfo.Record[0].UID + "", httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				if (items_json.Record != undefined) {
					var tableviewData = [];
					var inventory_index = 0;
					for (var i = 0; i < (items_json.Record.length / view_per_row); i++) {
						if(i==0){
							textat_label.text = items_json.Record[inventory_index].NAME + "\n" + items_json.Record[inventory_index].DESCRIPTION + "\nQty : " + items_json.Record[inventory_index].TOTAL_UNIT;
							value_label.text = 'Value: ' + items_json.Record[inventory_index].REQ_GOLD + ' Gold';
							curr_inv_image.image = '/assets/' + items_json.Record[inventory_index].IMAGE + '.png';
						}
						
						var tablerowview = Titanium.UI.createTableViewRow({
							height : ViewWidth_In_rowView + 'px'	//height of rowview should same as the width of single view
						});
						var view_left = 0;
						var j = 0;
						while (inventory_index < items_json.Record.length && j < 4) {
							var view_imageview = Ti.UI.createImageView({
								image : '/assets/singlebox.png',
								width : ViewWidth_In_rowView + 'px',
								height : ViewWidth_In_rowView + 'px',
								top : '0px',
								zIndex : 50,
								left : view_left
							});
							var imageview = Ti.UI.createImageView({
								image : '/assets/' + items_json.Record[inventory_index].IMAGE + '.png',
								zIndex : 100,
								width : ViewWidth_In_rowView - 2 + 'px',
								height : ViewWidth_In_rowView - 2 + 'px',
								left : view_left + 1,
								name : items_json.Record[inventory_index].NAME,
								description : items_json.Record[inventory_index].DESCRIPTION,
								req_gold : items_json.Record[inventory_index].REQ_GOLD,
								total_unit : items_json.Record[inventory_index].TOTAL_UNIT
							});
							imageview.addEventListener('click', function(e) {
								textat_label.text = e.source.name + "\n" + e.source.description + "\nQty : " + e.source.total_unit;
								value_label.text = 'Value: ' + e.source.req_gold + ' Gold';
								curr_inv_image.image = e.source.image;
							});
							tablerowview.add(imageview);
							tablerowview.add(view_imageview);

							view_left = view_left + ViewWidth_In_rowView;
							inventory_index++;
							j++;
						}

						tableviewData.push(tablerowview);

					}
					var tableview = Ti.UI.createTableView({
						data : tableviewData,
						separatorColor : 'transparent',
						width : tableviewwidth_percent + '%',
						height : '35%',
						bottom : '20%',
						left : '16%'
					});
					TableviewCallback(tableview);
					//view.add(tableview);
				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : _url,

		});

	}

	var grid = [];

	CreateInventoryGrid(function(TableviewCallback) {
		grid.TableviewCallback = TableviewCallback;
		view.add(grid.TableviewCallback);
	});
	Ti.App.addEventListener('update_inv_grid', function(data) {
		CreateInventoryGrid(function(TableviewCallback) {
			view.remove(grid.TableviewCallback);
			grid.TableviewCallback = null;
			grid.TableviewCallback = TableviewCallback;
			view.add(grid.TableviewCallback);
		});
	});
	////Grid
	var curr_inv_image = Titanium.UI.createImageView({
		height : '20%',
		width : '24.1%',
		top : '12.1%',
		left : '9%'
	});
	curr_inv_image.addEventListener('load', function(e) {
		//hideLoader();
	});

	view.add(curr_inv_image);
	var arrowUP_imageview = Titanium.UI.createImageView({
		url : '/assets/iconControlArrowUp.png',
		width : '10%',
		height : '8%',
		right : '48%',
		bottom : '55%',

	});
	view.add(arrowUP_imageview);

	var arrowDown_imageview = Titanium.UI.createImageView({
		url : '/assets/iconControlArrowDown.png',
		width : '10%',
		height : '8%',
		right : '48%',
		bottom : '15%'

	});
	view.add(arrowDown_imageview);
	arrowDown_imageview.addEventListener('load', function(e) {
		//hideLoader();
	});

	return view;
};
module.exports = Inventoryscreen;
