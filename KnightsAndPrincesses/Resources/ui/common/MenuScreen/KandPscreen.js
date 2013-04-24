function kandp(userinfo) {
    var actInd = Titanium.UI.createActivityIndicator();
    actInd.message = 'Loading...';
    //message will only shows in android.
    actInd.show();

    var view = Ti.UI.createWindow({
        // orientation : Ti.UI.PORTRAIT,
        backgroundImage : '/assets/inventoryBackground.png',
        navBarHidden : true,
        fullscreen : true
    });
    view.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

    var screenWidth = Titanium.Platform.displayCaps.platformWidth;

    var top_imageview = Ti.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height:'6.4%',
		width : '100%',
		bottom : '94.6%'
    });
    view.add(top_imageview);

    var name_label = Titanium.UI.createLabel({
        text : userinfo.Record[0].NAME,
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
        text : 'Store',
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

    var httpclientt = require('/ui/common/Functions/function');
    function getGold(callback) {
        var get_golds = "http://therealmattharmon.com/knp/get_golds.php?uid=" + userinfo.Record[0].UID;
        httpclientt.requestServer({
            success : function(e) {
                items_json = JSON.parse(this.responseText);
                if (items_json.Record != undefined) {
                    callback(items_json.Record[0]);
                }
            },
            method : 'GET',
            contentType : 'text/xml',
            url : get_golds,

        });
    }

    var selected_item = {};
    getGold(function(my_gold) {
        var _url = "http://therealmattharmon.com/knp/get_store_inventories.php";
        httpclientt.requestServer({
            success : function(e) {
                items_json = JSON.parse(this.responseText);
                if (items_json.Record != undefined) {
                    var rowViewHeight = screenWidth * 0.136;
                    var tabledata = [];
                    for (var i = 0; i < items_json.Record.length; i++) {
                        var rowView = Ti.UI.createTableViewRow({
                            height : rowViewHeight
                        });

                        var return_imageview = Ti.UI.createImageView({
                            image : '/assets/' + items_json.Record[i].IMAGE + '.png',
                            width : '13%',
                            top : '5px',
                            left : '5px'
                        });
                        rowView.add(return_imageview);
                        var req_gold = parseInt(items_json.Record[i].REQ_GOLD);
                        var total_unit = parseInt(my_gold.TOTAL_UNIT);
                        var rowviewtext_label = Ti.UI.createLabel({
                            text : items_json.Record[i].NAME + '\n' + items_json.Record[i].DESCRIPTION,
                            font : {
                                fontSize : '12dip'
                            },
                            color : '#5afd9b',
                            left : '15%',
                            width : '45%'
                        });
                        rowView.add(rowviewtext_label);

                        var boolLock;
                        var boolBuy;
                        if (total_unit < req_gold) {
                            boolLock = '/assets/itemLock.png';
                            boolBuy = 'UNLOCK'
                        } else {
                            boolLock = '';
                            boolBuy = 'Buy'
                        }

                        var lock_imageview = Ti.UI.createImageView({
                            image : boolLock,
                            width : '12%',
                            top : '5px',
                            left : '65%'
                        });
                        rowView.add(lock_imageview);

                        var buy_button = Titanium.UI.createButton({
                            //backgroundImage:'/assets/button_small_UP.png',
                            title : boolBuy,
                            width : '20%',
                            font : {
                                fontSize : '11dip'
                            },
                            inv_id : items_json.Record[i].INVENTORY_ID,
                            req_gold : items_json.Record[i].REQ_GOLD,
                            //size:"12px",
                            //height:'40%',
                            bottom : '10%',
                            left : '80%',
                            backgroundImage : '/assets/button_small_UP.png',
                            /*borderColor : "#a42b76",
                            borderRadius : 4,
                            borderWidth : 1,
                            backgroundGradient : {
                                type : 'linear',
                                colors : [' #e49cc9', '#a52b76'],
                                startPoint : {
                                    x : '50%',
                                    y : '100%'
                                },
                                endPoint : {
                                    x : '50%',
                                    y : '0%'
                                },
                                backFillStart : false
                            }*/
                        });
                        rowView.add(buy_button);
                        //alert(items_json.Record[i].INVENTORY_ID);
                        buy_button.addEventListener('click', function(e) {
                            selected_item.invID = e.source.inv_id;
                            selected_item.req_gold = e.source.req_gold;
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

                                        //alert(userinfo.Record[0].UID+"::"+selected_item.invID+"::"+selected_item.req_gold);

                                        actInd.show();
                                        var send_gift_url = "http://therealmattharmon.com/knp/purchase_inventory.php?uid=" + userinfo.Record[0].UID + "&inv_id=" + selected_item.invID + "&req_golds=" + selected_item.req_gold;
                                        var httpclientt = require('/ui/common/Functions/function');

                                        httpclientt.requestServer({
                                            success : function(e) {

                                                items_json = JSON.parse(this.responseText);
                                                if (items_json.Record != undefined) {
                                                    alert(items_json.Record.Message);
                                                    Ti.App.fireEvent('update_inv_grid', {
                                                        clicked_item : 'KandPscreen'

                                                    });

                                                    Ti.App.fireEvent('update_footer', {
                                                        clicked_item : 'KandPscreen'
                                                    });

                                                    //alert(items_json.Message);
                                                    actInd.hide();
                                                }

                                            },
                                            method : 'GET',
                                            contentType : 'text/xml',
                                            url : send_gift_url
                                            
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

                        });

                        var qty_label = Ti.UI.createLabel({
                            text : items_json.Record[i].REQ_GOLD, //'50',
                            top : '10%',
                            left : '90%',
                            font : {
                                fontSize : '10dip'
                            },
                            color : '#59fe9a'
                        });
                        rowView.add(qty_label);

                        var minicoins_imageview =Ti.UI.createImageView({
                            image : 'assets/iconGold.png',
                            top : '0%',
                            left : '80%',
                            width : '5%',
                        });
                        rowView.add(minicoins_imageview);

                        tabledata.push(rowView);

                    }
                    var tableview = Ti.UI.createTableView({
                        data : tabledata,
                        width : '100%',
                        height : '60.3%',
                        top : '15%'
                    });
                    view.add(tableview);
                    actInd.hide();
                }
            },
            method : 'GET',
            contentType : 'text/xml',
            url : _url,

        });

    });

    /*
     var UP_imageview = Titanium.UI.createImageView({
     url : '/assets/iconControlArrowUp.png',
     width : '12.5%',
     height : "10%",
     top : '10.3%',
     left : '44.4%'
     });
     view.add(UP_imageview);

     var down_imageview = Titanium.UI.createImageView({
     url : '/assets/iconControlArrowDown.png',
     width : '12.5%',
     height : "10%",
     top : '72%',
     left : '44.4%'
     });
     view.add(down_imageview);
     */

    var spell_button = Ti.UI.createButton({
        backgroundImage : '/assets/button_smallLong_UP.png',
        font : {
            fontSize : '9dip'
        },
        title : 'SPELLS',
        width : '16%',
        height : '4.5%',
        right : '2.7%',
        bottom : '10.3%'
    });
  //  view.add(spell_button);

    var armor_button = Ti.UI.createButton({
        backgroundImage : '/assets/button_smallLong_UP.png',
        font : {
            fontSize : '9dip'
        },
        title : 'ARMOR',
        width : '16%',
        height : '4.5%',
        right : '20.8%',
        bottom : '10.3%'
    });
//    view.add(armor_button);

    var supplies_button = Ti.UI.createButton({
        backgroundImage : '/assets/button_smallLong_UP.png',
        font : {
            fontSize : '9dip'
        },
        title : 'SUPPLIES',
        width : '16%',
        height : '4.5%',
        right : '37.9%',
        bottom : '10.3%'
    });
//    view.add(supplies_button);

    var gifts_button = Ti.UI.createButton({
        backgroundImage : '/assets/button_smallLong_UP.png',
        font : {
            fontSize : '9dip'
        },
        title : 'GIFTS',
        width : '16%',
        height : '4.5%',
        right : '55%',
        bottom : '10.3%'
    });
//    view.add(gifts_button);

    var sort_label = Ti.UI.createLabel({
        text : 'SORT',
        color : '#58fe9b',
        right : '73.1%',
        bottom : '10.3%',
        textAlign : 'right',
        font : {
            fontSize : '14dip'
        }
    });
 //   view.add(sort_label);

    var getmore_button = Ti.UI.createButton({
        backgroundColor : '#9c5b00',
        color : '#dcbf21',
        title : 'Get More Gold',
        height : '4.5%',
        right : '5%',
        bottom : '16.6%',
        borderColor : "#dcbf21",
        borderRadius : 5,
        borderWidth : 1

    });
    view.add(getmore_button);
    getmore_button.addEventListener('click', function(e) {
        var ConfirmationAlert = Titanium.UI.createAlertDialog({
            title : 'Click \'Yes\' to Purchase Gold.',
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

                    //alert(userinfo.Record[0].UID+"::"+selected_item.invID+"::"+selected_item.req_gold);

                    actInd.show();
                    var send_gift_url = "http://therealmattharmon.com/knp/purchase_gold.php?uid=" + userinfo.Record[0].UID + "&num_of_golds=400";
                    var httpclientt = require('/ui/common/Functions/function');

                    httpclientt.requestServer({
                        success : function(e) {

                            items_json = JSON.parse(this.responseText);
                            if (items_json.Message != '') {
                                alert('Successfully Purchased!');
                                Ti.App.fireEvent('update_inv_grid', {
                                    clicked_item : 'KandPscreen'

                                });

                                Ti.App.fireEvent('update_footer', {
                                    clicked_item : 'KandPscreen'
                                });

                                //alert(items_json.Message);
                                actInd.hide();
                            }

                        },
                        method : 'GET',
                        contentType : 'text/xml',
                        url : send_gift_url
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

    });

    var httpclientt = require('/ui/common/Functions/function');
    httpclientt.requestServer({
        success : function(e) {
            var userinfojson = JSON.parse(this.responseText);

            var Footer = require('ui/common/menus/Footer');
            var footer = new Footer(userinfojson);
            view.add(footer);

        },
        method : 'GET',
        contentType : 'text/xml',
        url : "http://therealmattharmon.com/knp/get_avatar_info.php?uid=" + userinfo.Record[0].UID + "",
    });

    return view;
};
module.exports = kandp;
