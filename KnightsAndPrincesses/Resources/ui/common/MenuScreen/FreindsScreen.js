function freindScreen(userinfo,coininfo){
		
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	
	
	var view = Titanium.UI.createView({
		top:"23%",
		height:"78%",
		width:"100%",
		backgroundImage:'/assets/inventoryBackground.png'
  		
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text:'Freinds',
		top:'0%',
		left:'29.6%',
		textAlign:'center',
		color:'#5afd9b',
		font:{fontSize:'12dip'}
		
	});
	view.add(selected_menu_label);
	///////////////////////////////////////////////////////////// end of icons bars


//////	

	var rowViewHeight = screenWidth * 0.136;
	var tabledata = [];
	
	for(var i=0; i<17; i++)
	{
		var bgcolor;
		var ch_image;
		var status_text;
		var status_image;
		
		if(i%2 ==0)		//if even its female
		{
			bgcolor = '#662e53';
			ch_image = '/assets/female_icon.png';
			status_text = 'Online';
			status_image = '/assets/online.png';
		}
		else
		{
			bgcolor = '#346e9d';
			ch_image = '/assets/male_icon.png';
			status_text = 'Offline';
			status_image = '/assets/offline.png';
		}
		
		var rowView = Ti.UI.createTableViewRow({
			height:rowViewHeight,
			backgroundColor:bgcolor
			
		});		
		

		
		var rowviewtext_label = Ti.UI.createLabel({
			text:'FRIENDS NAME 01 \n I AM INIT TO WIN IT',
			font:{fontSize:'10dip'},
			color:'#5afd9b',
			left:'5%',
			width:'55%'
		});
		rowView.add(rowviewtext_label);
		
		var level_label = Ti.UI.createLabel({
			text:'LVL 100',
			font:{fontSize:'10dip'},
			color:'#5afd9b',
			height:'33%',
			top:'0%',
			right:'20%',
			textAlign:'right'
			
		});
		rowView.add(level_label);
		
		var qty_coin_label = Ti.UI.createLabel({
			text:'1000',
			font:{fontSize:'10dip'},
			color:'#5afd9b',
			height:'33%',
			top:'33%',
			right:'20%',
			textAlign:'right'
		});
		rowView.add(qty_coin_label);
		
		var onlineStatus_label = Ti.UI.createLabel({
			text:status_text,
			font:{fontSize:'10dip'},
			color:'#5afd9b',
			height:'33%',
			width:"auto",
			top:'66%',
			right:'20%',
			textAlign:'right'
		});
		rowView.add(onlineStatus_label);
	
		var miniCoin_imageview = Titanium.UI.createImageView({
			image:'/assets/iconGoldMini.png',
			height:'30%',
			top:'33%',
			width:"10%",
			right:'29%'
		});
		rowView.add(miniCoin_imageview);  
		
		var onlineStatus_imageview = Titanium.UI.createImageView({
			url:status_image,
			height:'30%',
			top:'66%',
			width:"10%",
			right:'29%'
		});
		rowView.add(onlineStatus_imageview);
		
		var character_imageview = Titanium.UI.createImageView({
			url:ch_image,
			width:'13%',
			top:'5px',
			right:'3%'
		});
		rowView.add(character_imageview);  
		
		
		
		tabledata.push(rowView);
	}			//end of for loop

	var tableview = Ti.UI.createTableView({
		data:tabledata,
		width:'100%',
		height:'50%',
		top:'7%'
	});
	view.add(tableview);
	tableview.addEventListener('click',function(e){
		//view.add(add_friend_view);
	//add_friend_view.open({modal:true});
	var sendrequest = require('ui/common/MenuScreen/SendRequest');
 		var send = new sendrequest();
 		send.open({modal:true});
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
	var search_byname=Titanium.UI.createTextField({
		hintText:"Find By Name",
		top:"58%",
		left:"5%",
		width:"30%",
				font:{fontSize:'9dip'},
		height:"8%"
	});
	view.add(search_byname);
	var NewMail=Titanium.UI.createButton({
		title:"New Mail",
		backgroundImage:'/assets/button_smallLong_UP.png',
		right:"2%",
		top:"58%",
				font:{fontSize:'9dip'},
		width:"20%",
		height:"8%"
	});
	view.add(NewMail);
	var request_button = Ti.UI.createButton({
		backgroundImage:'/assets/button_smallLong_UP.png',
		font:{fontSize:'9dip'},
		title:'REQUEST',
		width:'16%',
		height:'6.5%',
		right:'2.7%',
		bottom:'15.1%'
	});	
	view.add(request_button);
	
	var myfriend_button = Ti.UI.createButton({
		backgroundImage:'/assets/button_smallLong_UP.png',
		font:{fontSize:'9dip'},
		title:'MY FRND',
		width:'16%',
		height:'6.5%',
		right:'20.8%',
		bottom:'15.1%'
	});	
	view.add(myfriend_button);
	
	var female_button = Ti.UI.createButton({
		backgroundImage:'/assets/button_smallLong_UP.png',
		font:{fontSize:'9dip'},
		title:'FEMALE',
		width:'16%',
		height:'6.5%',
		right:'37.9%',
		bottom:'15.1%'
	});	
	view.add(female_button);
	
	var male_button = Ti.UI.createButton({
		backgroundImage:'/assets/button_smallLong_UP.png',
		font:{fontSize:'9dip'},
		title:'MALE',
		width:'16%',
		height:'6.5%',
		right:'55%',
		bottom:'15.1%'
	});	
	view.add(male_button);
	
	var online_button = Ti.UI.createButton({
		backgroundImage:'/assets/button_smallLong_UP.png',
		font:{fontSize:'9dip'},
		title:'ONLINE',
		width:'16%',
		height:'6.5%',
		right:'2.7%',
		bottom:'21%'
	});	
	view.add(online_button);
	
	var coin_button = Ti.UI.createButton({
		backgroundImage:'/assets/button_smallLong_UP.png',
		font:{fontSize:'9dip'},
		title:'COIN',
		width:'16%',
		height:'6.5%',
		right:'20.8%',
		bottom:'21%'
	});	
	view.add(coin_button);
	
	var level_button = Ti.UI.createButton({
		backgroundImage:'/assets/button_smallLong_UP.png',
		font:{fontSize:'9dip'},
		title:'LEVEL',
		width:'16%',
		height:'6.5%',
		right:'37.9%',
		bottom:'21%'
	});	
	view.add(level_button);
	
	

	var sort_label = Ti.UI.createLabel({
		text:'SORT',
		color:'#58fe9b',	
		right:'73.1%',
		bottom:'21%',
		textAlign:'right',
		font:{fontSize:'14dip'}
	});
	view.add(sort_label);   
	
	////event for sort
	request_button.addEventListener('click',function(e){
			view.remove(tableview);
			tableview=null;
			view.remove(UP_imageview);
			UP_imageview=null;
			view.remove(down_imageview);
			down_imageview=null;		
			var sortbyrequest = require('ui/common/MenuScreen/FreindScreenSortByRequest');
 			var sort = new sortbyrequest(userinfo,coininfo);
 			view.add(sort);
	});
	//// Event for sort
	
	return view;
	
};
module.exports=freindScreen;
