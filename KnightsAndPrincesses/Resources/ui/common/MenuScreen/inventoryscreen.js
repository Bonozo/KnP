<<<<<<< HEAD
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

	var gender = userinfo.Record[0].GENDER;
	var user_appearence_view = Ti.UI.createView({
		width : '42%',
		height : '62%',
		//right : '55%',
		top : '2%',

	});
	var counter = 1;
	view.addEventListener('load', function(e) {
		//alert('1');
		if (counter == 19)
			appearanceView();
		counter++;
	});
	function appearanceView() {
		if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {
			var back_hair_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				top : '0%',
				image : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '_back.png',
				visible : false, 
				//zIndex : 700
			});
			user_appearence_view.add(back_hair_imageview);

			var dress_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				top : '0%',
				image : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
				visible : false, 
				zIndex : 500
			});
			user_appearence_view.add(dress_imageview);
			var face_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				top : '0%',
				image : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
				visible : false, 
				//zIndex : 600
			});
			user_appearence_view.add(face_imageview);
			var hair_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				top : '0%',
				image : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '_front.png',
				visible : false, 
				//zIndex : 700
			});
			user_appearence_view.add(hair_imageview);
			var jwel_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				top : '0%',
				image : '/assets/princess/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
				visible : false, 
				//zIndex : 500
			});
			user_appearence_view.add(jwel_imageview);
			var label  = Titanium.UI.createLabel({
				text : 'Loading...'
			});
			user_appearence_view.add(label);
			if(counter >= 19){
				back_hair_imageview.visible = true;
				dress_imageview.visible = true;
				face_imageview.visible = true;
				hair_imageview.visible = true;
				jwel_imageview.visible = true;
				label.hide();
			}
		} else if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {

			var dress_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				left : '0',
				top : '0%',
				image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
				visible : false, 
				zIndex : 100
			});
			user_appearence_view.add(dress_imageview);
			var helmet_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				left : '0%',
				top : '0%',

				image : '/assets/knight/helmet1.png',
				visible : false, 
				zIndex : 100
			});
			user_appearence_view.add(helmet_imageview);
			var shield_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				left : '0%',
				top : '0%',

				image : '/assets/knight/shield.png',
				visible : false, 
			});
			user_appearence_view.add(shield_imageview);
			var back_hair_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				left : '0',
				top : '0%',
				image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '_back.png',
				visible : false, 
				//zIndex : 700
			});
			user_appearence_view.add(back_hair_imageview);
			var face_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				left : '0',
				top : '0%',
				image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
				visible : false, 
				//zIndex : 600
			});
			user_appearence_view.add(face_imageview);
			var hair_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				left : '0',
				top : '0%',
				image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '_front.png',
				visible : false, 
				//zIndex : 700
			});
			user_appearence_view.add(hair_imageview);
			var weapon_imageview = Ti.UI.createImageView({
				height : '100%',
				width : '100%',
				top : '0%',
				image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
				visible : false, 
				//zIndex : 700
			});
			user_appearence_view.add(weapon_imageview);
			var label  = Titanium.UI.createLabel({
				text : 'Loading...'
			});
			if(counter >= 1){
				dress_imageview.visible = true;
				helmet_imageview.visible = true;
				shield_imageview.visible = true;
				face_imageview.visible = true;
				hair_imageview.visible = true;
				weapon_imageview.visible = true;
				back_hair_imageview.visible = true;
				label.hide();
			}
		} else {

			///////////////////////////////////////////////
			var character_imageview = Ti.UI.createImageView({
				width : '95%',
				height : '100%',
				//right : '55%',
				top : '2%',
				image : (gender == 'm') ? '/assets/knight/knight_default.png' : '/assets/hdpi_female_character_Image2.png',
			});
			user_appearence_view.add(character_imageview);
			character_imageview.addEventListener('load', function(e) {
				//hideLoader();
			});
			//alert((gender == 'm')?'/assets/K_fullbody_bad.png':'/assets/hdpi_female_character_Image2.png');
		}
	}


	view.add(user_appearence_view);

	/*
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

	 */
	var center_view = Ti.UI.createImageView({
		image : '/assets/itemWindow_001.png',
		opacity : '0.7',
		width : '90%',
		height : '25%',
		left : '5%',
		top : '10%',
	});
	// view.add(center_view);

	var textat_label = Titanium.UI.createLabel({
		top : '12.3%',
		left : '44%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
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
		backgroundImage : '/assets/button_small_UP.png',
		title : 'Crafting',
		height : '6%',
		width : '24%',
		top : '26.2%',
		right : '25.7%',
		zIndex : 100
	});
	view.add(crafting_button);
	crafting_button.addEventListener('click', function(e) {
		var inventorycrafting = require('ui/common/MenuScreen/inventorycrafting');
		var inventory = new inventorycrafting(userinfo);
		inventory.open({
			modal : true
		});
	});
	var chest_imageview = Ti.UI.createImageView({
		image : '/assets/Chest.png',
		height : '45%',
		width : '86%',
		bottom : '0%',
		left : '7%'
	});
	view.add(chest_imageview);
	//////Grid
	var grid_imageview = Ti.UI.createImageView({
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
	var selected_item = {};
	function CreateInventoryGrid(TableviewCallback) {
		var httpclientt = require('/ui/common/Functions/function');
		_url = "http://therealmattharmon.com/knp/get_all_inventories.php?uid=" + userinfo.Record[0].UID + "", httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				if (items_json.Record != undefined) {
					var tableviewData = [];
					var inventory_index = 0;
					for (var i = 0; i < (items_json.Record.length / view_per_row); i++) {
						if (i == 0) {
							textat_label.text = items_json.Record[inventory_index].NAME + "\n" + items_json.Record[inventory_index].DESCRIPTION + "\nQty : " + items_json.Record[inventory_index].TOTAL_UNIT;
							value_label.text = 'Value: ' + items_json.Record[inventory_index].REQ_GOLD + ' Gold';
							curr_inv_image.image = '/assets/' + items_json.Record[inventory_index].IMAGE + '.png';
							selected_item.id = items_json.Record[inventory_index].ID;
							selected_item.type = items_json.Record[inventory_index].CATEGORY;
							selected_item.name = items_json.Record[inventory_index].NAME;
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
								total_unit : items_json.Record[inventory_index].TOTAL_UNIT,
								id : items_json.Record[inventory_index].ID,
								type : items_json.Record[inventory_index].CATEGORY,
								//name : items_json.Record[inventory_index].NAME
							});
							imageview.addEventListener('click', function(e) {
								textat_label.text = e.source.name + "\n" + e.source.description + "\nQty : " + e.source.total_unit;
								value_label.text = 'Value: ' + e.source.req_gold + ' Gold';
								curr_inv_image.image = e.source.image;
								selected_item.id = e.source.id;
								selected_item.type = e.source.type;
								selected_item.name = e.source.name;
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
						backgroundImage : '/assets/button_small_UP.png',
						title : 'Gift',
						height : '6%',
						width : '16.2%',
						top : '26.2%',
						right : '7.7%'
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
	/*
	 var arrowUP_imageview = Ti.UI.createImageView({
	 url : '/assets/iconControlArrowUp.png',
	 width : '10%',
	 height : '8%',
	 right : '48%',
	 bottom : '55%',

	 });
	 view.add(arrowUP_imageview);

	 var arrowDown_imageview = Ti.UI.createImageView({
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
	 */

	return view;
};
module.exports = Inventoryscreen;
=======
<<<<<<< HEAD
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

    var gender = userinfo.Record[0].GENDER;
    var user_appearence_view = Ti.UI.createView({
        width : '42%',
        height : '62%',
        //right : '55%',
        top : '2%',

    });
    if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {

        var dress_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(dress_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var jwel_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(jwel_imageview);
    } else if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {

        var dress_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0',
            top : '0%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(dress_imageview);
        var helmet_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0%',
            top : '0%',
            
            image : '/assets/knight/helmet1.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(helmet_imageview);
        var shield_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0%',
            top : '0%',
            
            image : '/assets/knight/shield.png',
            //bottom : '0%'
        });
        user_appearence_view.add(shield_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '18%',
            width : '100%',
            left : '0',
            top : '7%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '14.8%',
            width : '100%',
            left : '0',
            top : '5.5%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var weapon_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            top : '0%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(weapon_imageview);
    } else {

        ///////////////////////////////////////////////
        var character_imageview = Titanium.UI.createImageView({
            width : '95%',
            height : '100%',
            //right : '55%',
            top : '2%',
            image : (gender == 'm') ? '/assets/K_fullbody_bad.png' : '/assets/hdpi_female_character_Image2.png',
        });
        user_appearence_view.add(character_imageview);
        character_imageview.addEventListener('load', function(e) {
            //hideLoader();
        });
        //alert((gender == 'm')?'/assets/K_fullbody_bad.png':'/assets/hdpi_female_character_Image2.png');
    }
    view.add(user_appearence_view);

    /*
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

     */
    var center_view = Ti.UI.createImageView({
        image : '/assets/itemWindow_001.png',
        opacity : '0.7',
        width : '90%',
        height : '25%',
        left : '5%',
        top : '10%',
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
    var selected_item = {};
    function CreateInventoryGrid(TableviewCallback) {
        var httpclientt = require('/ui/common/Functions/function');
        _url = "http://therealmattharmon.com/knp/get_all_inventories.php?uid=" + userinfo.Record[0].UID + "", httpclientt.requestServer({
            success : function(e) {
                items_json = JSON.parse(this.responseText);
                if (items_json.Record != undefined) {
                    var tableviewData = [];
                    var inventory_index = 0;
                    for (var i = 0; i < (items_json.Record.length / view_per_row); i++) {
                        if (i == 0) {
                            textat_label.text = items_json.Record[inventory_index].NAME + "\n" + items_json.Record[inventory_index].DESCRIPTION + "\nQty : " + items_json.Record[inventory_index].TOTAL_UNIT;
                            value_label.text = 'Value: ' + items_json.Record[inventory_index].REQ_GOLD + ' Gold';
                            curr_inv_image.image = '/assets/' + items_json.Record[inventory_index].IMAGE + '.png';
                            selected_item.id = items_json.Record[inventory_index].ID;
                            selected_item.type = items_json.Record[inventory_index].CATEGORY;
                            selected_item.name = items_json.Record[inventory_index].NAME;
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
                                total_unit : items_json.Record[inventory_index].TOTAL_UNIT,
                                id : items_json.Record[inventory_index].ID,
                                type : items_json.Record[inventory_index].CATEGORY,
                                //name : items_json.Record[inventory_index].NAME
                            });
                            imageview.addEventListener('click', function(e) {
                                textat_label.text = e.source.name + "\n" + e.source.description + "\nQty : " + e.source.total_unit;
                                value_label.text = 'Value: ' + e.source.req_gold + ' Gold';
                                curr_inv_image.image = e.source.image;
                                selected_item.id = e.source.id;
                                selected_item.type = e.source.type;
                                selected_item.name = e.source.name;
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
    /*
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
     */

    return view;
};
module.exports = Inventoryscreen;
=======
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

    var gender = userinfo.Record[0].GENDER;
    var user_appearence_view = Ti.UI.createView({
        width : '42%',
        height : '62%',
        //right : '55%',
        top : '2%',

    });
    if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {

        var dress_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(dress_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var jwel_imageview = Titanium.UI.createImageView({
            height : '25%',
            width : '100%',
            top : '0%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(jwel_imageview);
    } else if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {

        var dress_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0',
            top : '0%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(dress_imageview);
        var helmet_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0%',
            top : '0%',
            
            image : '/assets/knight/helmet1.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(helmet_imageview);
        var shield_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            left : '0%',
            top : '0%',
            
            image : '/assets/knight/shield.png',
            //bottom : '0%'
        });
        user_appearence_view.add(shield_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '18%',
            width : '100%',
            left : '0',
            top : '7%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '14.8%',
            width : '100%',
            left : '0',
            top : '5.5%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var weapon_imageview = Titanium.UI.createImageView({
            height : '100%',
            width : '100%',
            top : '0%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(weapon_imageview);
    } else {

        ///////////////////////////////////////////////
        var character_imageview = Titanium.UI.createImageView({
            width : '95%',
            height : '100%',
            //right : '55%',
            top : '2%',
            image : (gender == 'm') ? '/assets/K_fullbody_bad.png' : '/assets/hdpi_female_character_Image2.png',
        });
        user_appearence_view.add(character_imageview);
        character_imageview.addEventListener('load', function(e) {
            //hideLoader();
        });
        //alert((gender == 'm')?'/assets/K_fullbody_bad.png':'/assets/hdpi_female_character_Image2.png');
    }
    view.add(user_appearence_view);

    /*
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

     */
    var center_view = Ti.UI.createImageView({
        image : '/assets/itemWindow_001.png',
        opacity : '0.7',
        width : '90%',
        height : '25%',
        left : '5%',
        top : '10%',
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
    var selected_item = {};
    function CreateInventoryGrid(TableviewCallback) {
        var httpclientt = require('/ui/common/Functions/function');
        _url = "http://therealmattharmon.com/knp/get_all_inventories.php?uid=" + userinfo.Record[0].UID + "", httpclientt.requestServer({
            success : function(e) {
                items_json = JSON.parse(this.responseText);
                if (items_json.Record != undefined) {
                    var tableviewData = [];
                    var inventory_index = 0;
                    for (var i = 0; i < (items_json.Record.length / view_per_row); i++) {
                        if (i == 0) {
                            textat_label.text = items_json.Record[inventory_index].NAME + "\n" + items_json.Record[inventory_index].DESCRIPTION + "\nQty : " + items_json.Record[inventory_index].TOTAL_UNIT;
                            value_label.text = 'Value: ' + items_json.Record[inventory_index].REQ_GOLD + ' Gold';
                            curr_inv_image.image = '/assets/' + items_json.Record[inventory_index].IMAGE + '.png';
                            selected_item.id = items_json.Record[inventory_index].ID;
                            selected_item.type = items_json.Record[inventory_index].CATEGORY;
                            selected_item.name = items_json.Record[inventory_index].NAME;
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
                                total_unit : items_json.Record[inventory_index].TOTAL_UNIT,
                                id : items_json.Record[inventory_index].ID,
                                type : items_json.Record[inventory_index].CATEGORY,
                                //name : items_json.Record[inventory_index].NAME
                            });
                            imageview.addEventListener('click', function(e) {
                                textat_label.text = e.source.name + "\n" + e.source.description + "\nQty : " + e.source.total_unit;
                                value_label.text = 'Value: ' + e.source.req_gold + ' Gold';
                                curr_inv_image.image = e.source.image;
                                selected_item.id = e.source.id;
                                selected_item.type = e.source.type;
                                selected_item.name = e.source.name;
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
    /*
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
     */

    return view;
};
module.exports = Inventoryscreen;
>>>>>>> New version
>>>>>>> e105b5ec68096981140025cd6ae2dc1c7598964e
