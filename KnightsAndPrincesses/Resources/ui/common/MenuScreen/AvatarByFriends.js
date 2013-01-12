function AvatarByFriends(userinfo, callback){
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';//message will only shows in android.
	actInd.show();
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
				
				for (var i = 0; i < items_json.Record.length; i++) {
					if(items_json.Record[i].GENDER == 'f'){
						bg_image = '/assets/row_view_bg_female.png'
						avatar_image = "female_icon";
					}
					else{
						bg_image = '/assets/row_view_bg_male.png'
						avatar_image = "male_icon";
					}
					var rowView = Ti.UI.createTableViewRow({
						height : rowViewHeight,
						uid : items_json.Record[i].UID,
						index : i,
						backgroundImage : bg_image,
						zIndex : 10
					});
/*
					rowView.addEventListener('longclick', function(e) {
						Titanium.Media.vibrate();
						var SendFriendRequest = require('/ui/common/MenuScreen/SendFriendRequest');
						var sendfriendrequest = new SendFriendRequest(userinfo, items_json.Record[e.row.index]);
						sendfriendrequest.open({modal : true});
					});
*/
					rowView.addEventListener('click', function(e) {
						var FreindInfo = require('/ui/common/MenuScreen/FreindInfo');
						var freindinfo = new FreindInfo(userinfo, e.row.uid);
						freindinfo.open();
					});
					
					
					var return_imageview = Titanium.UI.createImageView({
						image : '/assets/' + avatar_image + '.png',
						width : '15%',
						top : '2px',
						right : '2px'
					});
					rowView.add(return_imageview);

					var name_label = Ti.UI.createLabel({
						text : items_json.Record[i].NAME,
						font : {
							fontSize : '16dip'
						},
						color : '#b3fad0',
						left : '8px',
						top : '8px',
						width : '45%'
					});
					rowView.add(name_label);

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
		url : "http://justechinfo.com/kap_server/friends_list.php?uid=" + userinfo.Record[0].UID,

	});
};
module.exports = AvatarByFriends;