function crafting(userinfojson) {

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var view = Titanium.UI.createWindow({
		navBarHidden : true,
		fullscreen : true,
		backgroundImage : '/assets/inventoryBackground.png',
		navBarHidden : true,
		fullscreen : true
	});
	var botombar = require('ui/common/menus/Footer');
	var bottom = new botombar(userinfojson);
	view.add(bottom);
	var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height : '6.4%',
		width : '100%',
		bottom : '94.6%'
	});
	view.add(top_imageview);
	var name_label = Titanium.UI.createLabel({
		text : 'Crafting',
		top : '0.8%',
		height : '3.1%',
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '14dip'
		}
	});
	view.add(name_label);

	var menu_label = Titanium.UI.createLabel({
		text : 'Back',
		top : '0.8%',
		height : '3.1%',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}
	});
	view.add(menu_label);

	var return_imageview = Titanium.UI.createImageView({
		width : '11.6%',
		top : '0.3%',
		right : '3%',
		image : '/assets/iconReturn.png'
	});
	view.add(return_imageview);
	return_imageview.addEventListener('click', function(e) {
		view.close();
	});

	var items_json = "";
	var items_length = 0;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var rowViewHeight = screenWidth * 0.15;
				var tabledata = [];

				for (var i = 0; i < items_json.Record.length; i++) {
					var rowView = Ti.UI.createTableViewRow({
						height : rowViewHeight,
						craft_ingredients : items_json.Record[i].INGREDIENTS,
						craft_name : items_json.Record[i].CRAFT_NAME
					});

					rowView.addEventListener('click', function(e) {
						//ShowCraftingRecipe

						// var ShowCraftingRecipe = require('ui/common/MenuScreen/ShowCraftingRecipe');
						// var showcraftingrecipe = new ShowCraftingRecipe(e.row.craft_name, e.row.craft_ingredients);
						// showcraftingrecipe.open({
							// modal : true
						// });

						// for (var key in e.row.craft_ingredients) {
							// // if(e.source.craft_ingredients.hasOwnP)
							// alert(key + " : " + e.row.craft_ingredients[key]);
						// }
					});
					var return_imageview = Titanium.UI.createImageView({
						image : '/assets/inv_128/' + items_json.Record[i].IMAGE + '.png',
						width : '13%',
						//top : '5px',
						left : '5px'
					});
					rowView.add(return_imageview);

					var rowviewtext_label = Ti.UI.createLabel({
						text : items_json.Record[i].CRAFT_NAME + "",// + "\n" + items_json.Record[i].CRAFT_DESCRIPTION,
						font : {
							fontSize : '14dip'
						},
						color : '#5afd9b',
						left : '15%',
						width : '45%'
					});
					rowView.add(rowviewtext_label);

					// var redflower_imageview = Titanium.UI.createImageView({
					// image : '/assets/redflower.png',
					// width : '9%',
					// top : '5px',
					// left : '62%'
					// });
					// rowView.add(redflower_imageview);

					// var plus_label = Ti.UI.createLabel({
					// text : '+',
					// font : {
					// fontSize : '13dip'
					// },
					// color : '#5afd9b',
					// left : '72%',
					// width : '3%'
					// });
					// rowView.add(plus_label);

					// var coins_imageview = Titanium.UI.createImageView({
					// image : '/assets/iconGold.png',
					// width : '7%',
					// top : '5px',
					// left : '78%'
					// });
					// rowView.add(coins_imageview);

					var details_button = Titanium.UI.createButton({
						color : '#761f56',
						backgroundImage : '/assets/button_small_UP.png',
						width : '20%',
						height : '60%',
						title : 'Details',
						craft_id : items_json.Record[i].CRAFT_ID,
						craft_name : items_json.Record[i].CRAFT_NAME,
						font : {
							fontSize : 14,
							fontWeight : "bold"
						},
						right : '22%',
						craft_ingredients : items_json.Record[i].INGREDIENTS,
						craft_name : items_json.Record[i].CRAFT_NAME,
						craft_description : items_json.Record[i].CRAFT_DESCRIPTION
					});
					rowView.add(details_button);
					details_button.addEventListener('click', function(e){

						var ShowCraftingRecipe = require('ui/common/MenuScreen/ShowCraftingRecipe');
						var showcraftingrecipe = new ShowCraftingRecipe(e.source.craft_name, e.source.craft_description, e.source.craft_ingredients);
						showcraftingrecipe.open({
							modal : true
						});
					});

					var crafting_button = Titanium.UI.createButton({
						color : '#761f56',
						backgroundImage : '/assets/button_small_UP.png',
						width : '20%',
						height : '60%',
						title : 'Craft',
						craft_id : items_json.Record[i].CRAFT_ID,
						craft_name : items_json.Record[i].CRAFT_NAME,
						font : {
							fontSize : 14,
							fontWeight : "bold"
						},
						right : '1%'
					});
					rowView.add(crafting_button);
					crafting_button.addEventListener('click', function(e) {
						var ConfirmationAlert = Titanium.UI.createAlertDialog({
							title : 'Click \'Yes\' to create ' + e.source.craft_name + '.',
							message : 'Sure?',
							buttonNames : ['Yes', 'No'],
							craft_id : e.source.craft_id,
							cancel : 1
						});

						ConfirmationAlert.addEventListener('click', function(e) {
							Titanium.API.info('e = ' + JSON.stringify(e));

							//Clicked cancel, first check is for iphone, second for android
							if (e.cancel === e.index || e.cancel === true) {
								return;
							}
							//now you can use parameter e to switch/case
							switch (e.index) {
								case 0:
									//actInd.show();
									var create_craft_url = "http://bonozo.com:8080/knp/create_craft.php?uid=" + userinfojson.Record[0].UID + "&craft_id=" + e.source.craft_id + "";

									var httpclientt = require('/ui/common/Functions/function');
									httpclientt.requestServer({
										success : function(e) {
											items_json = JSON.parse(this.responseText);
											if (items_json.Record != undefined) {
												if (items_json.Record.Message != undefined) {
													alert(items_json.Record.Message);
													Ti.App.fireEvent('update_inv_grid', {
													});
													//actInd.hide();
												} else if (items_json.Record.Error != undefined) {
													alert(items_json.Record.Error);
													//actInd.hide();
												}
											} else {
												alert('Something went wrong, please try again later.');
												//actInd.hide();
											}
										},
										method : 'GET',
										contentType : 'text/xml',
										url : create_craft_url,

									});

									break;

								//This will never be reached, if you specified cancel for index 1
								case 1:
									// alert('Clicked button 1 (NO)');
									break;

								default:
									break;

							}

						});

						ConfirmationAlert.show();
						//alert(e.source.craft_id);
					});

					tabledata.push(rowView);
				}//end of for loop

				var tableview = Ti.UI.createTableView({
					backgroundColor : 'transparent',
					separatorColor : 'transparent',

					data : tabledata,
					width : '100%',
					height : '70.3%',
					top : '8%'
				});
				view.add(tableview);
				//actInd.hide();
			}

		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_craft_ingredients.php",

	});
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			var userinfo = JSON.parse(this.responseText);
			if (userinfo.Record != undefined) {
				var Footer = require('ui/common/menus/Footer');
				var footer = new Footer(userinfo);
				view.add(footer);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + userinfojson.Record[0].UID + "",
	});

	/*
	 var UP_imageview = Titanium.UI.createImageView({
	 image : '/assets/iconControlArrowUp.png',
	 width : '12.5%',
	 top : '10.3%',
	 height : "10%",
	 left : '44.4%'
	 });
	 view.add(UP_imageview);

	 var down_imageview = Titanium.UI.createImageView({
	 image : '/assets/iconControlArrowDown.png',
	 width : '12.5%',
	 height : "10%",
	 top : '82%',
	 left : '44.4%'
	 });
	 view.add(down_imageview);
	 */
	view.addEventListener('android:back', function(e) {
		//alert("asd")
		view.close();
		view = null;
	});
	return view;
};
module.exports = crafting;