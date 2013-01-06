function QuestsHome(userinfo){
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var view = Ti.UI.createView({
		top:"23%",
		height:"78%",
		width:"100%"
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text:'Quests',
		top:'0%',
		left:'45%',
		textAlign:'center',
		color:'#5afd9b',
		font:{fontSize:'12dip'}
		
	});
	view.add(selected_menu_label);

///////////////////////////////////////////////////////////////////////////////////
	var items_json = "";
	var items_length = 0;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				var rowViewHeight = screenWidth * 0.136;
				var tabledata = [];
				for (var i = 0; i < items_json.Record.length; i++) {
					var rowView = Ti.UI.createTableViewRow({
						height : rowViewHeight,
						uid : items_json.Record[i].UID
					});
					rowView.addEventListener('click', function(e) {
						alert("Next screen is under construction");
						
						/*
						var FreindInfo = require('/ui/common/MenuScreen/FreindInfo');
						var freindinfo = new FreindInfo(userinfo,e.row.uid);
						freindinfo.open();*/


						
					});
					
					var avatar_image = "";
					if(items_json.Record[i].GENDER == 'm'){
						avatar_image = "male_icon";
					}
					else{
						avatar_image = "female_icon";
					}
					var return_imageview = Titanium.UI.createImageView({
						image : '/assets/'+avatar_image+'.png',
						width : '13%',
						top : '5px',
						left : '5px'
					});
					rowView.add(return_imageview);

					var rowviewtext_label = Ti.UI.createLabel({
						text : items_json.Record[i].NAME ,
						font : {
							fontSize : '12dip'
						},
						color : '#5afd9b',
						left : '20%',
						width : '45%'
					});
					rowView.add(rowviewtext_label);
					
					
					// Create a Label.
					var questStatus = Ti.UI.createLabel({
						text : (items_json.Record[i].IS_COMPLETED == 'true')?'Completed':'Incomplete',
						color : '#FFFFFF',
						font : {fontSize:'12dip'},
						right : '5%',
						textAlign : 'center'
					});
	
					var UP_imageview = Titanium.UI.createImageView({
						url:'/assets/iconControlArrowUp.png',
						width:'12.5%',
						height:"10%",
						top:'2%',
						left:'44.4%'
					});
					view.add(UP_imageview);
					
					var down_imageview = Titanium.UI.createButton({
						backgroundImage:'/assets/iconControlArrowDown.png',
						width:'12.5%',
						top:'57%',
						height:"10%",
						left:'44.4%'
					});
					view.add(down_imageview);
					
					// Add to the parent view.
					rowView.add(questStatus);

					tabledata.push(rowView);
				}//end of for loop

				var tableview = Ti.UI.createTableView({
					data : tabledata,
					width : '100%',
					height : '70.3%',
					top : '15%'
				});
				view.add(tableview);

			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://justechinfo.com/kap_server/get_assigned_quests_by_player.php?uid="+userinfo.Record[0].UID,

	});
	
///////////////////////////////////////////////////////////////////////////////////

	return view;
}
module.exports = QuestsHome;