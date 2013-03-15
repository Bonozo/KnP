function GiftFromMessage(userinfo,freind_uid) {
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	actInd.show();

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var view = Titanium.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});

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

/*
	function sendMessage(Loggedin_id, friend_uid,text_feild, is_send) {
		if(is_send){
			var Message_info;
			var httpclientt = require('/ui/common/Functions/function');
			httpclientt.requestServer({
	
				success : function(e) {
					Message_info = JSON.parse(this.responseText);
					if (Message_info.Message != undefined) {
						//alert("Sent Successfully");
					}
	
				},
				method : 'GET',
				contentType : 'text/xml',
				url : "http://justechinfo.com/kap_server/send_message.php?sender_id=" + Loggedin_id + "&receiver_id=" + friend_uid + "&message=" + text_feild + "",
	
			});
		}
*/

	var ScreenWidth = Titanium.Platform.displayCaps.platformWidth;
	var tableviewwidth_percent = 80;
	var view_per_row = 4;
	
	var tableViewWidth_Px = (tableviewwidth_percent / 100) * ScreenWidth;
	var ViewWidth_In_rowView = tableViewWidth_Px / view_per_row;
	//view inner rowview width in px
	var selected_item = {};
	function CreateInventoryGrid(TableviewCallback) {
		var httpclientt = require('/ui/common/Functions/function');
		_url = "http://justechinfo.com/kap_server/get_all_inventories.php?uid=" + userinfo.Record[0].UID + "", httpclientt.requestServer({
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
								type : items_json.Record[inventory_index].CATEGORY
							});
							imageview.addEventListener('click', function(e) {
								textat_label.text = e.source.name + "\n" + e.source.description + "\nQty : " + e.source.total_unit;
								value_label.text = 'Value: ' + e.source.req_gold + ' Gold';
								curr_inv_image.image = e.source.image;
								selected_item.id = e.source.id;
								selected_item.type = e.source.type;
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
						width : '16%',
						top : '26.2%',
						right : '7.7%'
					});
					view.add(gift_button);
					actInd.hide();
					
					gift_button.addEventListener('click', function(e) {
						var ConfirmationAlert = Titanium.UI.createAlertDialog({
							title : 'Click \'Yes\' to Send Gift.',
							message : 'Are you Sure?',
							buttonNames : ['Yes', 'No'],
							cancel : 1
						});
						ConfirmationAlert.show();

						ConfirmationAlert.addEventListener('click', function(e) {
							Titanium.API.info('e = ' + JSON.stringify(e));

							//Clicked cancel, first check is for iphone, second for android
							if (e.cancel === e.index || e.cancel === true) {
								return;
							}

							switch (e.index) {
								case 0:
								//alert(userinfo.Record[0].UID+":::"+selected_item.id);

									actInd.show();
									var send_gift_url = "http://justechinfo.com/kap_server/send_gift.php?sender_id=" + userinfo.Record[0].UID + "&receiver_id=" + freind_uid + "&gift_id=" + selected_item.id + "&gift_type=" + selected_item.type;
									var httpclientt = require('/ui/common/Functions/function');
									
									httpclientt.requestServer({
										success : function(e) {

											items_json = JSON.parse(this.responseText);
											if (items_json.Message != '') {
												Ti.App.fireEvent('update_inv_grid', {
													clicked_item : 'GiftFromMessage'
													
												});
					/*
												Ti.App.fireEvent('update_message', {
																		clicked_item : 'GiftFromMessage'
																	});
					*/
					
												
												//alert(items_json.Message);
												actInd.hide();
											}

										},
										method : 'GET',
										contentType : 'text/xml',
										url : send_gift_url
									});
									
									//
									

									break;
								//This will never be reached, if you specified cancel for index 1
								case 1:
									// alert('Clicked button 1 (NO)');
									break;
								default:
									break;
							}

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
module.exports = GiftFromMessage;
