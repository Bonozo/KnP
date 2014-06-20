function Inventoryscreen(userinfo) {
	// var view = Ti.UI.createView({
	// width : '100%',
	// height : '100%',
	// zIndex : 200
	// });

	var view = Titanium.UI.createView({
		top : "23%",
		height : "78%",
		width : "100%"

	});

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
	var main_view = Ti.UI.createView();

	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return winWidth * percent / 100;
		} else if (axis == 'y') {
			return winHeight * percent / 100;
		}
	}

	var activityIndicatorView = Titanium.UI.createView({
		backgroundColor : '#FFFFFF',
		borderRadius : 10,
		borderColor : '#333333',
		borderWidth : '5dip',
		visible : false,
		height : '8%',
		width : (screenWidth / 2),
		zIndex : 700
	});
	var activityIndicator = Ti.UI.createActivityIndicator({
		color : '#333333',
		font : {
			// fontFamily : 'Helvetica Neue',
			fontSize : '14dip',
			fontWeight : 'bold'
		},
		message : 'Loading...',
		style : (Ti.Platform.name === 'iPhone OS') ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK,
		height : '100%',
		width : '100%'
	});
	// activityIndicator.message = 'Loading...';
	activityIndicatorView.add(activityIndicator);
	view.add(activityIndicatorView);

	var iconbg_view = Ti.UI.createImageView({
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

	var gender = userinfo.Record[0].GENDER;
	view.addEventListener('load', function(e) {
	});

	var center_view = Ti.UI.createImageView({
		image : '/assets/itemWindow_001.png',
		opacity : '0.7',
		width : '90%',
		height : '25%',
		left : '5%',
		top : '10%',
		zIndex : 100
	});
	// view.add(center_view);

	var textat_label = Titanium.UI.createLabel({
		top : '12.3%',
		left : '44%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : 16,
			fontWeight : 'bold'
		},
		zIndex : 100

	});
	view.add(textat_label);

	var value_label = Titanium.UI.createLabel({
		top : '23.3%',
		right : '7.9%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '10dip'
		},
		zIndex : 100

	});
	view.add(value_label);

	var crafting_button = Titanium.UI.createButton({
		color : '#761f56',
		backgroundImage : '/assets/button_small_UP.png',
		title : 'Crafting',
		height : '7%',
		width : '24%',
		top : '27.5%',
		right : '30%',
		zIndex : 100,
		font : { fontSize: 14}
	});
	view.add(crafting_button);
	crafting_button.addEventListener('click', function(e) {

		activityIndicator.show();
		activityIndicatorView.visible = true;

		var inventorycrafting = require('ui/common/MenuScreen/inventorycrafting');
		var inventory = new inventorycrafting(userinfo);
		inventory.open();
		activityIndicator.hide();
		activityIndicatorView.visible = false;

	});
	var chest_imageview = Ti.UI.createImageView({
		image : '/assets/Chest.png',
		height : '45%',
		width : '86%',
		bottom : '0%',
		left : '7%',
		zIndex : 75
	});
	view.add(chest_imageview);
	//////
	var ScreenWidth = Titanium.Platform.displayCaps.platformWidth;
	var tableviewwidth_percent = 80;
	var view_per_row = 4;

	var tableViewWidth_Px = (tableviewwidth_percent / 100) * ScreenWidth;
	var ViewWidth_In_rowView = (tableViewWidth_Px / view_per_row) * 2;
	//view inner rowview width in px
	var selected_item = {};
	var osname = Ti.Platform.osname;
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	isTablet = true;
	var high_res_icons = "inv_128/";
	function CreateInventoryGrid(TableviewCallback) {
		var httpclientt = require('/ui/common/Functions/function');
		_url = "http://bonozo.com:8080/knp/get_all_inventories.php?uid=" + userinfo.Record[0].UID + "", httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				if (items_json.Record != undefined) {
					var tableviewData = [];
					var inventory_index = 0;
					for (var i = 0; i < (items_json.Record.length / view_per_row); i++) {
						if (i == 0) {
							textat_label.text = items_json.Record[inventory_index].NAME + "\n" + items_json.Record[inventory_index].TOTAL_UNIT + " Unit(s)";//items_json.Record[inventory_index].DESCRIPTION + "\nQty : " + items_json.Record[inventory_index].TOTAL_UNIT;
							value_label.text = 'Value: ' + items_json.Record[inventory_index].REQ_GOLD + ' Gold';
							curr_inv_image.image = '/assets/' + ((isTablet) ? high_res_icons : '') + items_json.Record[inventory_index].IMAGE + '.png';
							selected_item.id = items_json.Record[inventory_index].ID;
							selected_item.type = items_json.Record[inventory_index].CATEGORY;
							selected_item.name = items_json.Record[inventory_index].NAME;
						}

						var tablerowview = Titanium.UI.createTableViewRow({
							className : 'inventory' + i,
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
								image : '/assets/' + ((isTablet) ? high_res_icons : '') + '' + items_json.Record[inventory_index].IMAGE + '.png',
								zIndex : 100,
								width : ViewWidth_In_rowView - 2 + 'px',
								height : ViewWidth_In_rowView - 2 + 'px',
								left : view_left + 1,
								name : items_json.Record[inventory_index].NAME,
								description : items_json.Record[inventory_index].DESCRIPTION,
								req_gold : items_json.Record[inventory_index].REQ_GOLD,
								total_unit : items_json.Record[inventory_index].TOTAL_UNIT,
								id : items_json.Record[inventory_index].ID,
								type : items_json.Record[inventory_index].CATEGORY
								//name : items_json.Record[inventory_index].NAME
							});
							imageview.addEventListener('click', function(e) {
								textat_label.text = e.source.name + "\n" + e.source.total_unit + " Unit(s)";// + e.source.description + "\nQty : " + e.source.total_unit;
								value_label.text = 'Value: ' + e.source.req_gold + ' Gold';
								curr_inv_image.image = e.source.image;
								selected_item.id = e.source.id;
								selected_item.type = e.source.type;
								selected_item.name = e.source.name;
							});

							tablerowview.add(imageview);
							tablerowview.add(view_imageview);

							view_left = view_left + (ViewWidth_In_rowView / 2);
							inventory_index++;
							j++;
						}
						tableviewData.push(tablerowview);
					}
					var tableview = Ti.UI.createTableView({
						backgroundColor : 'transparent',
						separatorColor : 'transparent',

						data : tableviewData,
						zIndex : 100,
						separatorColor : 'transparent',
						width : tableviewwidth_percent + '%',
						height : '35%',
						bottom : '20%'
					});
					TableviewCallback(tableview);
					//view.add(tableview);
					var center_view = Ti.UI.createImageView({
						image : '/assets/itemWindow_001.png',
						opacity : '0.7',
						width : '90%',
						height : '25%',
						left : '5%',
						top : '10%',
					});
					view.add(center_view);

					var gift_button = Titanium.UI.createButton({
						color : '#761f56',
						backgroundImage : '/assets/button_small_UP.png',
						title : 'Gift',
						height : '7%',
						font : { fontSize: 14},
						width : '18%',
						top : '27.5%',
						right : '9%'
					});
					view.add(gift_button);
					gift_button.addEventListener('click', function(e) {
						var inventorygifting = require('ui/common/MenuScreen/InventoryGifting');
						var inventory = new inventorygifting(userinfo, selected_item);
						inventory.open({
							modal : true
						});

					});

				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : _url
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
	var curr_inv_image = Ti.UI.createImageView({
		height : '20%',
		width : '24.1%',
		top : '12.1%',
		left : '9%',
		zIndex : 100
	});
	curr_inv_image.addEventListener('load', function(e) {
		//hideLoader();
	});

	view.add(curr_inv_image);
	var knpstore = Titanium.UI.createButton({
		color : '#761f56',
		top : '33.5%',
		left : '6%',
		backgroundImage : '/assets/button_small_UP.png',
		height : "8%",
		zIndex : 5000,
		//size:"10dip",
		title : "K&P Store",
		width : "35%"
	});
	view.add(knpstore);

	knpstore.addEventListener('click', function(e) {
		activityIndicator.show();
		activityIndicatorView.visible = true;
		var KnPStore = require('ui/common/MenuScreen/KnPStore');
		var kandp = new KnPStore(userinfo);
		kandp.open();
			activityIndicator.hide();
			activityIndicatorView.visible = false;
	});

	return view;
};
module.exports = Inventoryscreen;
