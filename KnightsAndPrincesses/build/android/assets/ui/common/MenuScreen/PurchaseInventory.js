function PurchaseInventory(userinfo, inventory) {
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return screenWidth * percent / 100;
		} else if (axis == 'y') {
			return screenHeight * percent / 100;
		}
	}

	var win = Ti.UI.createWindow({
		backgroundImage : '/assets/itemWindow_001.png',
		opacity : '0.7',
		width : '90%',
		height : '25%',
		left : '5%',
		top : '10%',
		zIndex : 1,
		navBarHidden : true,
		fullscreen : true
	});
	win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	// Create an ImageView.
	var inventory_imageview = Ti.UI.createImageView({
		image : '/assets/inv_128/' + inventory.IMAGE + '.png',
		width : getPixelFromPercent('y', 10),
		height : getPixelFromPercent('y', 10),
		top : '5%',
		left : '3%'
	});
	win.add(inventory_imageview);

	var inventory_name_label = Titanium.UI.createLabel({
		text : inventory.NAME,
		top : '5%',
		left : getPixelFromPercent('y', 13),
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '16dip'
		}
	});
	win.add(inventory_name_label);

	var inventory_cost_label = Titanium.UI.createLabel({
		text : 'Req. Gold unit(s) : ' + inventory.REQ_GOLD,
		top : '18%',
		left : getPixelFromPercent('y', 13),
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}
	});
	win.add(inventory_cost_label);

	var can_buy_maximum = Titanium.UI.createLabel({
		text : 'Max. purchase unit(s): ' + parseInt(userinfo.Record[0].NUM_OF_GOLDS / inventory.REQ_GOLD),
		top : '30%',
		left : getPixelFromPercent('y', 13),
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '14dip'
		}
	});
	win.add(can_buy_maximum);

	var num_of_units = 1;
	var max_num_of_units = parseInt(userinfo.Record[0].NUM_OF_GOLDS / inventory.REQ_GOLD);

	if (max_num_of_units < 1) {
		var purchase_golds_label = Ti.UI.createLabel({
			text : 'You does not have sufficient gold to purchase ' + inventory.NAME + '.\nPress unlock to get more golds.',
			color : '#5afd9b',
			font : {
				fontSize : '10dip'
			},
			top : '45%',
			textAlign : 'center'
		});
		win.add(purchase_golds_label);

		var unlock_button = Titanium.UI.createButton({
			color : '#761f56',
			backgroundImage : '/assets/button_small_UP.png',
			width : '25%',
			height : '18%',
			title : 'Unlock',
			font : {
				fontSize : '14dip',
				fontWeight : "bold"
			},
			right : '10%',
			bottom : '5%'
		});
		win.add(unlock_button);
		unlock_button.addEventListener('click', function(e){
			var GoldPurchase = require('/ui/common/MenuScreen/GoldPurchase');
			var goldpurchase = new GoldPurchase(userinfo);
			goldpurchase.open();
			win.close();
		});

		return win;
	}
	var timeLimitView = Ti.UI.createView({
		top : '50%',
		height : '22%',
		width : '40%'
	});
	win.add(timeLimitView);

	var leftArrowTimeLimit = Ti.UI.createImageView({
		image : '/assets/iconControlArrowLeft.png',
		right : 0,
		height : '100%'
	});
	timeLimitView.add(leftArrowTimeLimit);
	leftArrowTimeLimit.addEventListener('click', function(e) {
		selectedNumberOfInventories.text = (num_of_units < max_num_of_units) ? (++num_of_units) : num_of_units;
	});

	var rightArrowTimeLimit = Ti.UI.createImageView({
		image : '/assets/iconControlArrowRight.png',
		left : 0,
		height : '100%'
	});
	timeLimitView.add(rightArrowTimeLimit);
	rightArrowTimeLimit.addEventListener('click', function(e) {
		selectedNumberOfInventories.text = (num_of_units > 1) ? --num_of_units : num_of_units;
	});

	var selectedNumberOfInventories = Ti.UI.createLabel({
		text : num_of_units, // + ' HOURS',
		color : '#5AFD9B',
		font : {
			fontSize : '12dip',
			fontWeight : 'bold'
		},
		textAlign : 'center'
	});
	timeLimitView.add(selectedNumberOfInventories);

	var cancel_button = Titanium.UI.createButton({
		color : '#761f56',
		backgroundImage : '/assets/button_small_UP.png',
		width : '25%',
		height : '18%',
		title : 'Cancel',
		font : {
			fontSize : '16dip',
			fontWeight : "bold"
		},
		left : '10%',
		bottom : '5%'
	});
	win.add(cancel_button);
	cancel_button.addEventListener('click', function(e) {
		win.close();
	});

	var confirm_button = Titanium.UI.createButton({
		color : '#761f56',
		backgroundImage : '/assets/button_small_UP.png',
		width : '25%',
		height : '18%',
		title : 'Confirm',
		font : {
			fontSize : '14dip',
			fontWeight : "bold"
		},
		right : '10%',
		bottom : '5%'
	});
	win.add(confirm_button);
	confirm_button.addEventListener('click', function(e) {
		var purchase_inventory_url = "http://bonozo.com:8080/knp/purchase_inventory.php?uid=" + userinfo.Record[0].UID + "&inv_id=" + inventory.INVENTORY_ID + "&req_golds=" + parseInt(inventory.REQ_GOLD * parseInt(selectedNumberOfInventories.text)) + "&units=" + selectedNumberOfInventories.text;
		//return;
		var httpclientt = require('/ui/common/Functions/function');

		httpclientt.requestServer({
			success : function(e) {

				items_json = JSON.parse(this.responseText);
				if (items_json.Record != undefined) {
					alert(items_json.Record.Message);
					win.close();

					Ti.App.fireEvent('update_footer', {
						clicked_item : 'KnPStore'
					});
					Ti.App.fireEvent('update_userjsoninfo', {
						UID : userinfo.Record[0].UID
					});

				}

			},
			method : 'GET',
			contentType : 'text/xml',
			url : purchase_inventory_url

		});
	});

	var return_imageview = Titanium.UI.createImageView({
		image : '/assets/iconReturn.png',
		width : '11.6%',
		top : '0%',
		right : '0%',
		zIndex : 2
	});
	win.add(return_imageview);

	return_imageview.addEventListener('click', function(e) {
		win.close();
	});

	return win;
}

module.exports = PurchaseInventory;
