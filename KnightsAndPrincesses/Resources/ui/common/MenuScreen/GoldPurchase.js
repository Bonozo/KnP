function GoldPurchase(userinfo) {
	var osname = Ti.Platform.osname;
	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return winWidth * percent / 100;
		} else if (axis == 'y') {
			return winHeight * percent / 100;
		}
	}

	var selected_num_of_golds = 0;

	if (osname === 'android') {
		(function() {
			alert('true');
		})();
		var InAppBilling = require('ti.inappbilling');
		var static_product_name = 'android.test.purchased';
		function NotifyMe(text) {
			Ti.API.info('< -- > ' + text);
			// Ti.UI.createNotification({
			// message : text,
			// duration : Ti.UI.NOTIFICATION_DURATION_SHORT
			// });//.show();
		}

		function ResponseString(responseCode) {
			switch (responseCode) {
				case InAppBilling.RESULT_OK:
					return 'OK';
				case InAppBilling.RESULT_USER_CANCELED:
					return 'USER CANCELED';
				case InAppBilling.RESULT_SERVICE_UNAVAILABLE:
					return 'SERVICE UNAVAILABLE';
				case InAppBilling.RESULT_BILLING_UNAVAILABLE:
					return 'BILLING UNAVAILABLE';
				case InAppBilling.RESULT_ITEM_UNAVAILABLE:
					return 'ITEM UNAVAILABLE';
				case InAppBilling.RESULT_DEVELOPER_ERROR:
					return 'DEVELOPER ERROR';
				case InAppBilling.RESULT_ERROR:
					return 'RESULT ERROR';
			}
			return '';
		}

		/*
		 *	InAppBilling verification constants
		 *
		 *	SIGNATURE_VERIFIED
		 *	NULL_DATA
		 *	SIGNATURE_ERROR
		 *	UNKNOWN_NONCE
		 *	PUBLIC_KEY_NULL
		 *
		 */
		function VerificationString(verificationCode) {
			switch (verificationCode) {
				case InAppBilling.SIGNATURE_VERIFIED:
					return 'SIGNATURE VERIFIED';
				case InAppBilling.NULL_DATA:
					return 'NULL DATA';
				case InAppBilling.SIGNATURE_ERROR:
					return 'SIGNATURE ERROR';
				case InAppBilling.UNKNOWN_NONCE:
					return 'UNKNOWN NONCE';
				case InAppBilling.PUBLIC_KEY_NULL:
					return 'PUBLIC KEY NULL';
			}
			return '';
		}

		function displaySynchronousResponseCodes(e) {
			var response = ResponseString(e.responseCode);

			//NotifyMe('Request Id: ' + e.requestId + '\n' + 'Response code: ' + e.responseCode);

			Ti.API.info('Request Id: ' + e.requestId);
			Ti.API.info('Response code: ' + e.responseCode);
		}


		InAppBilling.addEventListener(InAppBilling.ON_BIND_EVENT, function(e) {
			if (e.result == InAppBilling.SUCCESS) {
				NotifyMe('Billing Service Bound');
			} else {
				NotifyMe('Billing Service Bind Failed');
			}
		});

		InAppBilling.addEventListener(InAppBilling.ON_CONNECT_EVENT, function(e) {
			/*
			 * Enable disabled buttons
			 * They were disabled because sending messages to the service before it is connected, will cause errors.
			 */
			for (var i = 0; i < buy_button.length; i++) {
				buy_button[i].enabled = true;
			};
		});

		InAppBilling.addEventListener(InAppBilling.RESPONSE_EVENT, function(e) {
			// Events with (e.sync == true) are deprecated and will be removed. Use the event object that the methods return.
			if (!e.sync) {
				NotifyMe('RESPONSE CALLED ' + e.requestId + e.responseCode);
				Ti.API.info('RESPONSE CALLED \n' + 'Request Id:\n' + e.requestId + ' ' + '\nResponse Code:' + ResponseString(e.responseCode));
			}
		});

		InAppBilling.addEventListener(InAppBilling.PURCHASE_STATE_CHANGED_EVENT, function(e) {

			NotifyMe('PURCHASE STATE CHANGED CALLED ' + e.signedData + ' ' + e.signature + '\n' + 'SECURITY RESULT ' + e.result);

			Ti.API.info('PURCHASE STATE CHANGED CALLED');
			Ti.API.info('Signature Verification Result:\n' + VerificationString(e.result));
			Ti.API.info('Signed Data:\n' + e.signedData);

			if (e.signedData != null) {
				var response = JSON.parse(e.signedData);
				/*
				 * We are not guaranteed to have any orders returned so
				 * we need to make sure that this one exists before using it.
				 *
				 * If there is no notificationId then there is no need to confirmNotifications().
				 * This happens when restoreTransactions() triggers a PURCHASE_STATE_CHANGED_EVENT.
				 */
				if (response.orders[0] && response.orders[0].notificationId) {
					var synchronousResponse = InAppBilling.confirmNotifications({
						notificationIds : [response.orders[0].notificationId]
					});
					displaySynchronousResponseCodes(synchronousResponse);
				}

				var send_gift_url = "http://bonozo.com:8080/knp/purchase_gold.php?uid=" + userinfo.Record[0].UID + "&num_of_golds=" + selected_num_of_golds;
				var httpclientt = require('/ui/common/Functions/function');

				httpclientt.requestServer({
					success : function(e) {

						items_json = JSON.parse(this.responseText);
						if (items_json.Message != '') {
							alert('Successfully Purchased!');

							Ti.App.fireEvent('update_footer', {
								clicked_item : 'KnPStore'
							});
							//alert(items_json.Message);
						}
					},
					method : 'GET',
					contentType : 'text/xml',
					url : send_gift_url
				});

			}
		});

		InAppBilling.addEventListener(InAppBilling.NOTIFY_EVENT, function(e) {

			Ti.API.info('NOTIFY CALLED \n' + 'Notify Id:\n' + e.notifyId);

			var synchronousResponse = InAppBilling.getPurchaseInformation({
				notificationIds : [e.notifyId]
			});
			displaySynchronousResponseCodes(synchronousResponse);
		});

		/*
		 * Start the billing service after the event listeners are added
		 */
		InAppBilling.startBillingService();
	} else {// for iPhone
		var Storekit = require('ti.storekit');
		var verifyingReceipts = false;
		var _product = "";

		/*
		 Now let's define a couple utility functions. We'll use these throughout the app.
		 */
		var tempPurchasedStore = {};

		/**
		 * Keeps track (internally) of purchased products.
		 * @param identifier The identifier of the Ti.Storekit.Product that was purchased.
		 */
		function markProductAsPurchased(identifier) {
			Ti.API.info('Marking as purchased: ' + identifier);
			// Store it in an object for immediate retrieval.
			tempPurchasedStore[identifier] = true;
			// And in to Ti.App.Properties for persistent storage.
			Ti.App.Properties.setBool('Purchased-' + identifier, true);
		}

		/**
		 * Checks if a product has been purchased in the past, based on our internal memory.
		 * @param identifier The identifier of the Ti.Storekit.Product that was purchased.
		 */
		function checkIfProductPurchased(identifier) {
			Ti.API.info('Checking if purchased: ' + identifier);
			if (tempPurchasedStore[identifier] === undefined)
				tempPurchasedStore[identifier] = Ti.App.Properties.getBool('Purchased-' + identifier, false);
			return tempPurchasedStore[identifier];
		}

		/**
		 * Requests a product. Use this to get the information you have set up in iTunesConnect, like the localized name and
		 * price for the current user.
		 * @param identifier The identifier of the product, as specified in iTunesConnect.
		 * @param success A callback function.
		 * @return A Ti.Storekit.Product.
		 */
		function requestProduct(identifier, success) {
			Storekit.requestProducts([identifier], function(evt) {
				if (!evt.success) {
					alert('ERROR: We failed to talk to Apple!');
				} else if (evt.invalid) {
					alert('ERROR: We requested an invalid product!');
				} else {
					success(evt.products[0]);
				}
			});
		}

		/**
		 * Purchases a product.
		 * @param product A Ti.Storekit.Product (hint: use Storekit.requestProducts to get one of these!).
		 */
		Storekit.addEventListener('transactionState', function(evt) {
			switch (evt.state) {
				case Storekit.FAILED:
					if (evt.cancelled) {
						alert('Purchase cancelled');
					} else {
						alert('ERROR: Buying failed! ' + evt.message);
					}
					break;
				case Storekit.PURCHASED:
					if (verifyingReceipts) {
						Storekit.verifyReceipt(evt, function(e) {
							if (e.success) {
								if (e.valid) {
									alert('Thanks! Receipt Verified');
									markProductAsPurchased(evt.productIdentifier);
								} else {
									alert('Sorry. Receipt is invalid');
								}
							} else {
								alert(e.message);
							}
						});
					} else {
						alert('Thanks!');
						markProductAsPurchased(evt.productIdentifier);
					}
					break;
				case Storekit.PURCHASING:
					Ti.API.info("Purchasing " + evt.productIdentifier);
					var send_gift_url = "http://bonozo.com:8080/knp/purchase_gold.php?uid=" + userinfo.Record[0].UID + "&num_of_golds=" + selected_num_of_golds;
					var httpclientt = require('/ui/common/Functions/function');
	
					httpclientt.requestServer({
						success : function(e) {
	
							items_json = JSON.parse(this.responseText);
							if (items_json.Message != '') {
								alert('Successfully Purchased!');
	
								Ti.App.fireEvent('update_footer', {
									clicked_item : 'KnPStore'
								});
								//alert(items_json.Message);
							}
						},
						method : 'GET',
						contentType : 'text/xml',
						url : send_gift_url
					});
					break;
				case Storekit.RESTORED:
					// The complete list of restored products is sent with the `restoredCompletedTransactions` event
					Ti.API.info("Restored " + evt.productIdentifier);
					break;
			}
		});

		function purchaseProduct(product) {
			Storekit.purchase(product);
		}

		/**
		 * Restores any purchases that the current user has made in the past, but we have lost memory of.
		 */
		function restorePurchases() {
			Storekit.restoreCompletedTransactions();
		}


		Storekit.addEventListener('restoredCompletedTransactions', function(evt) {
			if (evt.error) {
				alert(evt.error);
			} else if (evt.transactions == null || evt.transactions.length == 0) {
				alert('There were no purchases to restore!');
			} else {
				for (var i = 0; i < evt.transactions.length; i++) {
					if (verifyingReceipts) {
						Storekit.verifyReceipt(evt.transactions[i], function(e) {
							if (e.valid) {
								markProductAsPurchased(e.productIdentifier);
							} else {
								Ti.API.error("Restored transaction is not valid");
							}
						});
					} else {
						markProductAsPurchased(evt.transactions[i].productIdentifier);
					}
				}
				alert('Restored ' + evt.transactions.length + ' purchases!');
			}
		});
		/*
		 1) Can the user make payments? Their device may be locked down, or this may be a simulator.
		 */
		if (!Storekit.canMakePayments)
			alert('This device cannot make purchases!');
		else {
			// /*
			// 2) Tracking what the user has purchased in the past.
			// */
			// var whatHaveIPurchased = Ti.UI.createButton({
			// color : '#761f56',
			// title : 'What Have I Purchased?',
			// top : 10,
			// left : 5,
			// right : 5,
			// height : 40
			// });
			// whatHaveIPurchased.addEventListener('click', function() {
			// alert({
			// 'Single Item' : checkIfProductPurchased('KnP_Gold') ? 'Purchased!' : 'Not Yet'//,
			// //'Subscription':checkIfProductPurchased('MonthlySodaPop') ? 'Purchased!' : 'Not Yet'
			// });
			// });
			// win.add(whatHaveIPurchased);

			/*
			 3) Buying a single item.
			 */
			requestProduct('KnP_Gold', function(product) {
				_product = product;
				// var buySingleItem = Ti.UI.createButton({
				// color : '#761f56',
				// title : 'Buy ' + product.title + ', ' + product.formattedPrice,
				// top : 60,
				// left : 5,
				// right : 5,
				// height : 40
				// });
				// buySingleItem.addEventListener('click', function() {
				// purchaseProduct(product);
				// });
				// win.add(buySingleItem);
			});

			/*
			4) Buying a subscription.
			*/

			// /*
			// 5) Restoring past purchases.
			// */
			// var restoreCompletedTransactions = Ti.UI.createButton({
			// color : '#761f56',
			// title : 'Restore Lost Purchases',
			// top : 160,
			// left : 5,
			// right : 5,
			// height : 40
			// });
			// restoreCompletedTransactions.addEventListener('click', function() {
			// restorePurchases();
			// });
			// win.add(restoreCompletedTransactions);

			// /*
			// 6) Receipt verification.
			// */
			// var view = Ti.UI.createView({
			// layout : 'horizontal',
			// top : 210,
			// left : 10,
			// width : 'auto',
			// height : 'auto'
			// });
			// var verifyingLabel = Ti.UI.createLabel({
			// text : 'Verify receipts:',
			// height : Ti.UI.SIZE || 'auto',
			// width : Ti.UI.SIZE || 'auto'
			// });
			// var onSwitch = Ti.UI.createSwitch({
			// value : false,
			// isSwitch : true,
			// left : 4,
			// height : Ti.UI.SIZE || 'auto',
			// width : Ti.UI.SIZE || 'auto'
			// });
			// onSwitch.addEventListener('change', function(e) {
			// verifyingReceipts = e.value;
			// });
			// view.add(verifyingLabel);
			// view.add(onSwitch);
			// win.add(view);
		}
	}

	var view = Ti.UI.createWindow({
		backgroundImage : '/assets/inventoryBackground.png',
		navBarHidden : true,
		fullscreen : true,
		zIndex : 200
	});
	view.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

	var top_imageview = Ti.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height : '6.4%',
		width : '100%',
		bottom : '94.6%'
	});
	view.add(top_imageview);

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
	var main_view = Ti.UI.createView();

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

	activityIndicator.show();
	activityIndicatorView.visible = true;

	var name_label = Titanium.UI.createLabel({
		text : 'Purchase Gold',
		top : '0',
		height : '3.1%',
		left : '3%',
		textAlign : 'left',
		color : '#5afd9b',
		font : {
			fontWeight : 'bold',
			fontSize : '12dip'
		}
	});
	view.add(name_label);

	var menu_label = Titanium.UI.createLabel({
		text : 'Back',
		top : '0',
		height : '3.1%',
		right : '15.6%',
		textAlign : 'right',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(menu_label);

	var return_imageview = Ti.UI.createImageView({
		image : '/assets/iconReturn.png',
		height : '8%',
		width : '11.6%',
		top : '1%',
		right : '3%'
	});
	view.add(return_imageview);
	return_imageview.addEventListener('click', function(e) {
		view.close();
	});
	var buy_button = [];
	var devPayload = '';

	var _url = "http://bonozo.com:8080/knp/get_gold_prices.php";
	var tabledata = [];
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			//if (items_json.Record != undefined) {
			var rowViewHeight = screenWidth * 0.136;
			for (var i = 0; i < items_json.Record.length; i++) {
				var rowView = Ti.UI.createTableViewRow({
					height : rowViewHeight,
					className : 'gold_prices',
					zIndex : 500
				});

				var return_imageview = Ti.UI.createImageView({
					image : '/assets/iconGoldMini.png',
					width : '13%',
					left : '5px'
				});
				rowView.add(return_imageview);
				var rowviewtext_label = Ti.UI.createLabel({
					text : items_json.Record[i].NUM_OF_GOLDS + ' Golds',
					font : {
						fontSize : '16dip'
					},
					color : '#5afd9b',
					left : '15%',
					width : '45%'
				});
				rowView.add(rowviewtext_label);

				buy_button[i] = Titanium.UI.createButton({
					title : '$' + items_json.Record[i].PRICE + '\nBuy',
					width : '25%',
					height : '80%',
					color : '#000000',
					font : {
						fontSize : '12dip'
					},
					// enabled : false,
					product_id : items_json.Record[i].PRODUCT_ID,
					num_of_golds : items_json.Record[i].NUM_OF_GOLDS,
					right : '5%',
					backgroundImage : '/assets/button_small_UP.png'
				});
				rowView.add(buy_button[i]);
				//alert(items_json.Record[i].INVENTORY_ID);
				buy_button[i].addEventListener('click', function(e) {

					var product_id = e.source.product_id;
					selected_num_of_golds = e.source.num_of_golds;

					var ConfirmationAlert = Titanium.UI.createAlertDialog({
						title : 'Click \'Yes\' to Purchase.',
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
								if (osname === 'android') {
									var synchronousResponse = InAppBilling.requestPurchase({
										productId : static_product_name//,
										// productType : '',
										// developerPayload : devPayload
									});
									displaySynchronousResponseCodes(synchronousResponse);
								} else {
									purchaseProduct(_product);
								}

								break;
							//This will never be reached, if you specified cancel for index 1
							case 1:
								break;
							default:
								break;
						}

					});

				});

				var qty_label = Ti.UI.createLabel({
					text : items_json.Record[i].PRICE, //'50',
					top : '10%',
					left : '90%',
					font : {
						fontSize : '10dip'
					},
					color : '#59fe9a'
				});
				// rowView.add(qty_label);

				tabledata.push(rowView);

			}
			var tableview = Ti.UI.createTableView({
				backgroundColor : 'transparent',
				separatorColor : 'transparent',

				data : tabledata,
				width : '100%',
				height : '72.3%',
				top : '10%'
			});
			view.add(tableview);
			activityIndicator.hide();
			activityIndicatorView.visible = false;
			//}
			//else{
			// 	alert('else');
			//}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : _url,
	});

	NotifyMe('Starting Billing Service');
	return view;
};
module.exports = GoldPurchase;
