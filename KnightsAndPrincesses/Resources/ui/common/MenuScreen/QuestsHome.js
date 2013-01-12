function QuestsHome(userinfo) {
	var images_counter = 0;
	function hideLoader(){
		images_counter++;
		if(images_counter >= 2){
			actInd.hide();
		}
	}
	
	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading Main Screen...';//message will only shows in android.
	actInd.show();


	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var view = Ti.UI.createView({
		top : "23%",
		height : "78%",
		width : "100%"
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'Quests',
		top : '0%',
		left : '45%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	});
	view.add(selected_menu_label);

	var rowview_friends_icon = Titanium.UI.createImageView({
		image : '/assets/iconFriends.png'
	});
	var male_character_imageview = Titanium.UI.createImageView({
		image : '/assets/male_icon.png'
	});
	var female_character_imageview = Titanium.UI.createImageView({
		image : '/assets/female_icon.png'
	});
	///////////////////////////////////////////////////////////////////////////////////
	var rowViewHeight = screenWidth * 0.20;
	var items_json = "";
	var items_length = 0;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				
				var tabledata = [];
				for (var i = 0; i < items_json.Record.length; i++) {
					var rowView = Ti.UI.createTableViewRow({
						height : rowViewHeight//,
						//friend_uid : items_json.Record[i].ASSIGN_BY_UID
					});
					
/*
					rowView.addEventListener('click', function(e) {
						alert("Next :"+e.row.friend_uid);
					});
*/
					

					var avatar_image = "";
					if (items_json.Record[i].GENDER == 'm') {
						var return_imageview = male_character_imageview;
					} else {
						var return_imageview = female_character_imageview;
					}
					return_imageview.width = '13%';
					return_imageview.top = '2px';
					return_imageview.left = '5px';

					rowView.add(return_imageview);

					var rowview_name = Ti.UI.createLabel({
						text : items_json.Record[i].NAME,
						top : '2px',
						font : {
							fontSize : '16dip'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView.add(rowview_name);

					var rowview_level = Ti.UI.createLabel({
						text : 'LVL '+items_json.Record[i].LEVEL,
						top : rowViewHeight * 35/100,
						font : {
							fontSize : '14dip'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView.add(rowview_level);
					
					rowview_friends_icon.left = '30%';
					rowview_friends_icon.width = rowViewHeight/3.5;
					rowview_friends_icon.height = rowViewHeight/3.5;
					
					rowView.add(rowview_friends_icon);
					
					
					// Create a Label.
					var num_of_friends = Ti.UI.createLabel({
						text : items_json.Record[i].NUM_OF_FRIENDS,
						color : '#5afd9b',
						font : {
							fontSize : '14dip'
						},
						top : rowViewHeight * 35/100,
						left : '38%',
						textAlign : 'center'
					});
					
					// Add to the parent view.
					rowView.add(num_of_friends);
					
					
					
					var rowview_message = Ti.UI.createLabel({
						text : items_json.Record[i].MESSAGE,
						bottom : rowViewHeight * 10/100,
						font : {
							fontSize : '14dip'
						},
						color : '#5afd9b',
						left : '18%',
						width : '45%'
					});
					rowView.add(rowview_message);

					// Create a Label.
					var questStatus = Ti.UI.createLabel({
						text : (items_json.Record[i].IS_COMPLETED == 'true') ? 'Completed' : 'Incomplete',
						color : '#FFFFFF',
						font : {
							fontSize : '12dip'
						},
						right : '5%',
						textAlign : 'center'
					});
					
					// Add to the parent view.
					rowView.add(questStatus);
					
					
					// Create a Button.
					var choosequests_btn = Ti.UI.createButton({
						title : 'CHOOSE QUEST',
						height : rowViewHeight/3,
						top : rowViewHeight/3,
						font : {
							fontSize : '12dip'
						},
						right : '5px',
						backgroundColor : '#C977A5',
						borderColor : '#A62C77',
						borderRadius : 5, 
						borderWidth : 1,
						friend_uid : items_json.Record[i].ASSIGN_BY_UID
					});
					choosequests_btn.addEventListener('click', function(e) {
						var FriendQuest = require('/ui/common/MenuScreen/FriendQuest');
						var friendquest = FriendQuest(userinfo, e.source.friend_uid);
						friendquest.open();
					});
					rowView.add(choosequests_btn);
					
					
					// Create a Label.
					var rewards_lbl = Ti.UI.createLabel({
						text : 'REWARDS:',
						color : '#5afd9b',
						font : {
							fontSize : '12dip'
						},
						bottom : rowViewHeight * 10/100,
						right : '35%',
						textAlign : 'center'
					});
					
					// Add to the parent view.
					rowView.add(rewards_lbl);
					
					
					// Create a Label.
					var num_of_quests_lbl = Ti.UI.createLabel({
						text : items_json.Record[i].NUM_OF_QUESTS + ' QUEST(S)',
						color : '#5afd9b',
						font : {
							fontSize : '12dip'
						},
						top : rowViewHeight/3,
						right : '35%',
						textAlign : 'center'
					});
					
					// Add to the parent view.
					rowView.add(num_of_quests_lbl);
					

					tabledata.push(rowView);
				}//end of for loop
				actInd.hide();
				var tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '100%',
					height : '40%',
					top : '14%'
				});
				view.add(tableview);

			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://justechinfo.com/kap_server/get_assigned_quests_by_player.php?uid=" + userinfo.Record[0].UID,

	});

	
	// Create a Label.
	var freePlay_lbl = Ti.UI.createLabel({
		text : 'FREE PLAY: ',
		color : '#5afd9b',
		font : {fontSize:'16dip'},
		top : '70%',
		left : '5%',
		textAlign : 'center'
	});
	
	
	// Create an ImageView.
	var joustIcon = Ti.UI.createImageView({
		image : '/assets/joust_icon.png',
		width : rowViewHeight * (2/3),
		height : rowViewHeight * (2/3),
		top : '70%',
		left : '35%'
	});
	joustIcon.addEventListener('load', function() {
		Ti.API.info('Image loaded!');
	});
	view.add(joustIcon);
	joustIcon.addEventListener('click',function(e){
		var SinglePlayGame = require('/ui/common/MenuScreen/SinglePlayGame');
		var singleplaygame = new SinglePlayGame('joust_game',80000003,userinfo);
		singleplaygame.open();
	});
	
	// Create an ImageView.
	var sonnetIcon = Ti.UI.createImageView({
		image : '/assets/sonnet_icon.png',
		width : rowViewHeight * (2/3),
		height : rowViewHeight * (2/3),
		top : '70%',
		left : '52%'
	});
	sonnetIcon.addEventListener('click', function() {
		var SinglePlayGame = require('/ui/common/MenuScreen/SinglePlayGame');
		var singleplaygame = new SinglePlayGame('sonnet_game',80000002,userinfo);
		singleplaygame.open();
	});
	view.add(sonnetIcon);
	
	// Create an ImageView.
	var archeryIcon = Ti.UI.createImageView({
		image : '/assets/archery_icon.png',
		width : rowViewHeight * (2/3),
		height : rowViewHeight * (2/3),
		top : '70%',
		left : '69%'
	});
	archeryIcon.addEventListener('click', function() {
		var SinglePlayGame = require('/ui/common/MenuScreen/SinglePlayGame');
		var singleplaygame = new SinglePlayGame('archery_game',80000001,userinfo);
		singleplaygame.open();
	});
	view.add(archeryIcon);
	
	// Create an ImageView.
	var cookingIcon = Ti.UI.createImageView({
		image : '/assets/cooking_icon.png',
		width : rowViewHeight * (2/3),
		height : rowViewHeight * (2/3),
		top : '70%',
		left : '85%'
	});
	cookingIcon.addEventListener('click', function() {
		var SinglePlayGame = require('/ui/common/MenuScreen/SinglePlayGame');
		var singleplaygame = new SinglePlayGame('cooking_game',80000004,userinfo);
		singleplaygame.open();
	});
	view.add(cookingIcon);
	
	// Add to the parent view.
	view.add(freePlay_lbl);
	
	var UP_imageview = Titanium.UI.createImageView({
		url : '/assets/iconControlArrowUp.png',
		width : '12.5%',
		height : "10%",
		top : '3%',
		left : '44.4%'
	});
	view.add(UP_imageview);

	var down_imageview = Titanium.UI.createButton({
		backgroundImage : '/assets/iconControlArrowDown.png',
		width : '12.5%',
		top : '57%',
		height : "10%",
		left : '44.4%'
	});
	view.add(down_imageview);
	///////////////////////////////////////////////////////////////////////////////////

	return view;
}

module.exports = QuestsHome; 