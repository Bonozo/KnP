function sortfreind(userinfo, coininfo) {

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;

	var view = Titanium.UI.createView({
		height : '60.2%',
		top : '7%',
		height : '54.2%',

	});

	//////

	var rowViewHeight = screenWidth * 0.136;
	var tabledata = [];

	for (var i = 0; i < 6; i++) {
		var bgcolor;
		var ch_image;
		var status_text;
		var status_image;

		if (i % 2 == 0)//if even its female
		{
			bgcolor = '#662e53';
			ch_image = '/assets/female_icon.png';
			status_text = 'Online';
			status_image = '/assets/online.png'
		} else {
			bgcolor = '#346e9d';
			ch_image = '/assets/male_icon.png';
			status_text = 'Offline';
			status_image = '/assets/offline.png'
		}

		if (i < 3) {
			bgcolor = '#226442';
		}

		var rowView = Ti.UI.createTableViewRow({
			height : rowViewHeight,
			backgroundColor : bgcolor

		});

		var rowviewName_label = Ti.UI.createLabel({
			text : 'FRIENDS NAME 01 ',
			font : {
				fontSize : '10dip'
			},
			color : '#5afd9b',
			top : '0%',
			left : '2%',
			width : '55%',
			height : '33%'
		});
		rowView.add(rowviewName_label);

		var rowviewMessage_label = Ti.UI.createLabel({
			text : '"HEY LETS BE FRIEND"',
			font : {
				fontSize : '9dip'
			},
			color : '#5afd9b',
			//top:'33%',
			left : '2%',
			width : '55%',
			height : '33%'
		});
		rowView.add(rowviewMessage_label);

		var rowviewFriendReq_label = Ti.UI.createLabel({
			text : 'New Friend Request',
			font : {
				fontSize : '9dip'
			},
			color : '#5afd9b',
			top : '66%',
			left : '0%',
			width : '55%',
			height : '33%',
			//backgroundColor:'#2c925b'
		});
		rowView.add(rowviewFriendReq_label);
		/*
		 var level_label = Ti.UI.createLabel({
		 text:'LVL 100',
		 font:{fontSize:'10dip'},
		 color:'#5afd9b',
		 height:'33%',
		 top:'0%',
		 right:'20%',
		 textAlign:'right'

		 });
		 //rowView.add(level_label);

		 var qty_coin_label = Ti.UI.createLabel({
		 text:'1000',
		 font:{fontSize:'10dip'},
		 color:'#5afd9b',
		 height:'33%',
		 top:'33%',
		 right:'20%',
		 textAlign:'right'
		 });
		 //rowView.add(qty_coin_label);

		 var onlineStatus_label = Ti.UI.createLabel({
		 text:status_text,
		 font:{fontSize:'10dip'},
		 color:'#5afd9b',
		 height:'33%',
		 top:'66%',
		 right:'20%',
		 textAlign:'right'
		 });
		 //rowView.add(onlineStatus_label);

		 var miniCoin_imageview = Titanium.UI.createImageView({
		 url:'/assets/iconGoldMini.png',
		 height:'30%',
		 top:'33%',
		 right:'29%'
		 });
		 //rowView.add(miniCoin_imageview);

		 var onlineStatus_imageview = Titanium.UI.createImageView({
		 url:status_image,
		 height:'30%',
		 top:'66%',
		 right:'29%'
		 });
		 //rowView.add(onlineStatus_imageview);
		 */
		var character_imageview = Titanium.UI.createImageView({
			image : ch_image,
			width : '13%',
			top : '5px',
			right : '3%'
		});
		rowView.add(character_imageview);

		tabledata.push(rowView);
	}//end of for loop

	var tableview = Ti.UI.createTableView({
		data : tabledata,
		width : '100%'
	});
	view.add(tableview);
	tableview.addEventListener('click', function(e) {
		var status = require('ui/iphone/MenuScreen/FreindInfo');
		var statusscreen = new status(userinfo, coininfo);
		statusscreen.open({
			modal : true
		});
	});
	var UP_imageview = Titanium.UI.createImageView({
		image : '/assets/iconControlArrowUp.png',
		width : '12.5%',
		top : '2%',
		left : '44.4%'
	});
	//view.add(UP_imageview);

	var down_imageview = Titanium.UI.createImageView({
		image : '/assets/iconControlArrowDown.png',
		width : '12.5%',
		top : '44%',
		left : '44.4%'
	});
	//view.add(down_imageview);

	return view;
};
module.exports = sortfreind;
