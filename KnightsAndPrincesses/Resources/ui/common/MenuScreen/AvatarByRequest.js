<<<<<<< HEAD
function AvatarByRequest(userinfo, callback) {
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
	var gold_imageview = Titanium.UI.createImageView({
		image : '/assets/miGoldWide_up.png',
		width : '12%',
		height : '40%',
		zIndex : 500
	});

    var request_counter = 0;
	
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var items_json = "";
	var items_length = 0;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var rowViewHeight = screenWidth * 0.189;
				var tabledata = [];
				var bg_image = '';
				var avatar_image = "";
				gold_imageview.right = '25%';
					//rowView.add(gold_imageview);
				for (var i = 0; i < items_json.Record.length; i++) {
				    request_counter++;
				    
				    //alert(request_counter);
					if (items_json.Record[i].GENDER == 'f') {
						bg_image = '/assets/freind_request_male.png'
						avatar_image = "female_icon";
					} else {
						bg_image = '/assets/freind_request_male.png'
						avatar_image = "male_icon";
					}
					
					var rowView = Ti.UI.createTableViewRow({
						height : rowViewHeight,
						uid : items_json.Record[i].UID,
						index : i,
						backgroundImage : bg_image,
						zIndex : 10,
						user_info : items_json.Record[i]
					});
					rowView.addEventListener('longclick', function(e) {
						Titanium.Media.vibrate();
						var FriendRequestAction = require('/ui/common/MenuScreen/FriendRequestAction');
						var friendrequestaction = new FriendRequestAction(userinfo, items_json.Record[e.row.index]);
						friendrequestaction.open();
					});
					rowView.addEventListener('click', function(e) {
						var FriendRequestAction = require('/ui/common/MenuScreen/FriendRequestAction');
						var friendrequestaction = new FriendRequestAction(userinfo, items_json.Record[e.row.index]);
						friendrequestaction.open();

/*
						var FreindInfo = require('/ui/common/MenuScreen/FreindInfo');
						var freindinfo = new FreindInfo(userinfo, e.row.uid);
						freindinfo.open();
*/
<<<<<<< HEAD
					});

					var return_imageview = Titanium.UI.createImageView({
						image : '/assets/' + avatar_image + '.png',
						width : '15%',
						top : '2px',
						right : '2px'
					});
					rowView.add(return_imageview);
					var level_label = Ti.UI.createLabel({
						text : 'LVL '+items_json.Record[i].LEVEL,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '20%',
						top : '5%'
					});
					rowView.add(level_label);

					
					var gold_label = Ti.UI.createLabel({
						text :items_json.Record[i].NUM_OF_GOLDS,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '20%',
					});
					rowView.add(gold_label);


					var online_label = Ti.UI.createLabel({
						text : 'ONLINE',
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						bottom : '5%',
						right : '20%',
					});
					rowView.add(online_label);
					var name_label = Ti.UI.createLabel({
						text : items_json.Record[i].NAME,
						font : {
							fontSize : '16dip'
						},
						color : '#b3fad0',
						left : '8px',
						top : '5%',
						width : '45%'
					});
					rowView.add(name_label);
					var status_message_label = Ti.UI.createLabel({
						text : items_json.Record[i].STATUS_MESSAGE,
						font : {
							fontSize : '11dip'
						},
						color : '#b3fad0',
						left : '8px',
						width : '45%'
					});
					rowView.add(status_message_label);


					var request_label = Ti.UI.createLabel({
						text : 'NEW FREIND REQUEST!',
						font : {
							fontSize : '12dip'
						},
						color : '#B3FAD0',
						left : '12%',
						bottom : '10%',
						width : '45%'
					});
					rowView.add(request_label); 


					tabledata.push(rowView);
				}//end of for loop

				tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '100%',
					height : '56%',
					top : '13%'
				});
				actInd.hide();
				callback(tableview);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://therealmattharmon.com/knp/friendship_notifications.php?uid=" + userinfo.Record[0].UID,

	});
    //if(request_counter >0){
        Ti.App.addEventListener("request_check",function(){
            request_counter--;
            //alert(request_counter);
            if(request_counter<=0)
                sendCounterinfo();
        }); 
    //}
    function sendCounterinfo(){
        Ti.App.fireEvent('request_send', {
            count : '0'
        });
        
    }


}

=======
					});

					var return_imageview = Titanium.UI.createImageView({
						image : '/assets/' + avatar_image + '.png',
						width : '15%',
						top : '2px',
						right : '2px'
					});
					rowView.add(return_imageview);
					var level_label = Ti.UI.createLabel({
						text : 'LVL '+items_json.Record[i].LEVEL,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '20%',
						top : '5%'
					});
					rowView.add(level_label);

					
					var gold_label = Ti.UI.createLabel({
						text :items_json.Record[i].NUM_OF_GOLDS,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '20%',
					});
					rowView.add(gold_label);


					var online_label = Ti.UI.createLabel({
						text : 'ONLINE',
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						bottom : '5%',
						right : '20%',
					});
					rowView.add(online_label);
					var name_label = Ti.UI.createLabel({
						text : items_json.Record[i].NAME,
						font : {
							fontSize : '16dip'
						},
						color : '#b3fad0',
						left : '8px',
						top : '5%',
						width : '45%'
					});
					rowView.add(name_label);
					var status_message_label = Ti.UI.createLabel({
						text : items_json.Record[i].STATUS_MESSAGE,
						font : {
							fontSize : '11dip'
						},
						color : '#b3fad0',
						left : '8px',
						width : '45%'
					});
					rowView.add(status_message_label);


					var request_label = Ti.UI.createLabel({
						text : 'NEW FREIND REQUEST!',
						font : {
							fontSize : '12dip'
						},
						color : '#B3FAD0',
						left : '12%',
						bottom : '10%',
						width : '45%'
					});
					rowView.add(request_label); 


					tabledata.push(rowView);
				}//end of for loop

				tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '100%',
					height : '56%',
					top : '13%'
				});
				actInd.hide();
				callback(tableview);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://therealmattharmon.com/knp/friendship_notifications.php?uid=" + userinfo.Record[0].UID,

	});
    //if(request_counter >0){
        Ti.App.addEventListener("request_check",function(){
            request_counter--;
            //alert(request_counter);
            if(request_counter<=0)
                sendCounterinfo();
        }); 
    //}
    function sendCounterinfo(){
        Ti.App.fireEvent('request_send', {
            count : '0'
        });
        
    }


}

=======
function AvatarByRequest(userinfo, callback) {
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
	var gold_imageview = Titanium.UI.createImageView({
		image : '/assets/miGoldWide_up.png',
		width : '12%',
		height : '40%',
		zIndex : 500
	});

    var request_counter = 0;
	
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var items_json = "";
	var items_length = 0;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var rowViewHeight = screenWidth * 0.189;
				var tabledata = [];
				var bg_image = '';
				var avatar_image = "";
				gold_imageview.right = '25%';
					//rowView.add(gold_imageview);
				for (var i = 0; i < items_json.Record.length; i++) {
				    request_counter++;
				    
				    //alert(request_counter);
					if (items_json.Record[i].GENDER == 'f') {
						bg_image = '/assets/freind_request_male.png'
						avatar_image = "female_icon";
					} else {
						bg_image = '/assets/freind_request_male.png'
						avatar_image = "male_icon";
					}
					
					var rowView = Ti.UI.createTableViewRow({
						height : rowViewHeight,
						uid : items_json.Record[i].UID,
						index : i,
						backgroundImage : bg_image,
						zIndex : 10,
						user_info : items_json.Record[i]
					});
					rowView.addEventListener('longclick', function(e) {
						Titanium.Media.vibrate();
						var FriendRequestAction = require('/ui/common/MenuScreen/FriendRequestAction');
						var friendrequestaction = new FriendRequestAction(userinfo, items_json.Record[e.row.index]);
						friendrequestaction.open();
					});
					rowView.addEventListener('click', function(e) {
						var FriendRequestAction = require('/ui/common/MenuScreen/FriendRequestAction');
						var friendrequestaction = new FriendRequestAction(userinfo, items_json.Record[e.row.index]);
						friendrequestaction.open();

/*
						var FreindInfo = require('/ui/common/MenuScreen/FreindInfo');
						var freindinfo = new FreindInfo(userinfo, e.row.uid);
						freindinfo.open();
*/
					});

					var return_imageview = Titanium.UI.createImageView({
						image : '/assets/' + avatar_image + '.png',
						width : '15%',
						top : '2px',
						right : '2px'
					});
					rowView.add(return_imageview);
					var level_label = Ti.UI.createLabel({
						text : 'LVL '+items_json.Record[i].LEVEL,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '20%',
						top : '5%'
					});
					rowView.add(level_label);

					
					var gold_label = Ti.UI.createLabel({
						text :items_json.Record[i].NUM_OF_GOLDS,
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						right : '20%',
					});
					rowView.add(gold_label);


					var online_label = Ti.UI.createLabel({
						text : 'ONLINE',
						font : {
							fontSize : '12dip'
						},
						color : '#b3fad0',
						bottom : '5%',
						right : '20%',
					});
					rowView.add(online_label);
					var name_label = Ti.UI.createLabel({
						text : items_json.Record[i].NAME,
						font : {
							fontSize : '16dip'
						},
						color : '#b3fad0',
						left : '8px',
						top : '5%',
						width : '45%'
					});
					rowView.add(name_label);
					var status_message_label = Ti.UI.createLabel({
						text : items_json.Record[i].STATUS_MESSAGE,
						font : {
							fontSize : '11dip'
						},
						color : '#b3fad0',
						left : '8px',
						width : '45%'
					});
					rowView.add(status_message_label);


					var request_label = Ti.UI.createLabel({
						text : 'NEW FREIND REQUEST!',
						font : {
							fontSize : '12dip'
						},
						color : '#B3FAD0',
						left : '12%',
						bottom : '10%',
						width : '45%'
					});
					rowView.add(request_label); 


					tabledata.push(rowView);
				}//end of for loop

				tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '100%',
					height : '56%',
					top : '13%'
				});
				actInd.hide();
				callback(tableview);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://therealmattharmon.com/knp/friendship_notifications.php?uid=" + userinfo.Record[0].UID,

	});
    //if(request_counter >0){
        Ti.App.addEventListener("request_check",function(){
            request_counter--;
            //alert(request_counter);
            if(request_counter<=0)
                sendCounterinfo();
        }); 
    //}
    function sendCounterinfo(){
        Ti.App.fireEvent('request_send', {
            count : '0'
        });
        
    }


}

>>>>>>> New version
>>>>>>> e105b5ec68096981140025cd6ae2dc1c7598964e
module.exports = AvatarByRequest; 