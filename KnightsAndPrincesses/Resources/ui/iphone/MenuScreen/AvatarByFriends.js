function AvatarByFriends(userinfo, callback) {
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
    var message_imageview = Titanium.UI.createImageView({
        image: '/assets/new_mail.png',
        left :'8px',
        width :'8%',
        height :'30%',
        bottom : '5%',
        zIndex : 600
    });
    var gender = '';
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var items_json = "";
	var items_length = 0;
	var httpclientt = require('ui/iphone/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var rowViewHeight = screenWidth * 0.189;
				var tabledata = [];
				var bg_image = '';
				var avatar_image = "";
				

				for (var i = 0; i < items_json.Record.length; i++) {
				    gender =items_json.Record[i].GENDER ;
                    bg_image = '/assets/freind_list' + 
                    ((gender == 'f')?'_female':'_male') + '.png';
                    //((items_json.Record[i].MESSAGE =='NEW_MESSAGE')?'_message':'') + '.png';
                    avatar_image =((gender == 'f')?'female_icon':'male_icon');

                   
				    
/*
					if (items_json.Record[i].GENDER == 'f' && items_json.Record[i].MESSAGE =='NEW_MESSAGE') {
						avatar_image = "female_icon";
                        bg_image = '/assets/freind_list_female_message.png'
					} else {
						//bg_image = '/assets/freind_list_male.png'
						avatar_image = "male_icon";
					}
*/
					var rowView = Ti.UI.createTableViewRow({
						height : rowViewHeight,
						uid : items_json.Record[i].UID,
						genes : items_json.Record[i].GENDER,
						index : i,
						backgroundImage : bg_image,
						//zIndex : 10
					});
					/*
					 rowView.addEventListener('longclick', function(e) {
					 Titanium.Media.vibrate();
					 var SendFriendRequest = require('/ui/common/MenuScreen/SendFriendRequest');
					 var sendfriendrequest = new SendFriendRequest(userinfo, items_json.Record[e.row.index]);
					 sendfriendrequest.open({modal : true});
					 });
					 */
					//alert(JSON.stringify(items_json.Record[i]));
					//alert(items_json.Record[i]);
					rowView.addEventListener('click', function(e) {
					   // alert(items_json.Record[e.row.index]);

                        Ti.App.addEventListener("message_read", function(data) {
                            backgroundImage = '/assets/freind_list' + ((e.row.genes == 'f') ? '_female' : '_male') + '.png';
        
                        });
						var FreindInfo = require('ui/iphone/MenuScreen/FreindInfo');
						var freindinfo = new FreindInfo(userinfo, items_json.Record[e.row.index]);
						freindinfo.open();
					});

					var row_imageview = Titanium.UI.createImageView({
						image : '/assets/' + avatar_image + '.png',
						width : '15%',
						top : '2px',
						right : '2%'
					});
					rowView.add(row_imageview);

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

					var gold_imageview = Titanium.UI.createImageView({
						image : '/assets/miGoldWide_up.png',
						right : '22%',
						width : '12%',
						height : '32%',
						//zIndex : 100
					});
					rowView.add(gold_imageview);
					
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
                    //rowView.add(message_imageview);

					tabledata.push(rowView);
				}//end of for loop

				tableview = Ti.UI.createTableView({
					separatorColor : 'transparent',
                        backgroundColor : 'transparent',
					data : tabledata,
					width : '100%',
					height : '56%',
					top : '11%'
				});
				actInd.hide();
				callback(tableview);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://therealmattharmon.com/knp/friends_list.php?uid=" + userinfo.Record[0].UID,

	});
};
module.exports = AvatarByFriends; 