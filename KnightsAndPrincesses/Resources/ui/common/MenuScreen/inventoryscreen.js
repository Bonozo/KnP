function Inventoryscreen(userinfo)
{
	var view = Ti.UI.createView({
		width : '100%',
		height : '100%',

	});

	var view=Titanium.UI.createView({
		top:"23%",
		height:"78%",
		width:"100%"
		
	});

	var iconbg_view = Titanium.UI.createImageView({
		url : '/assets/iconHighlight.png',
		height : '10%',
		width : '14.2%',
		top : '0%',
		left : '15%',
		zIndex : 50
	});
	iconbg_view.addEventListener('load', function(e) {
		 ////hideLoader();	});

	//view.add(iconbg_view);
	var selected_menu_label = Titanium.UI.createLabel({
		text : 'INVENTORY',
		top : '0%',
		left : '15.0%',
		textAlign : 'center',
		color : '#5afd9b',
		font : {
			fontSize : '12dip'
		}

	}); 
	view.add(selected_menu_label);	


	var goldValue_label = Titanium.UI.createLabel({
		text:'229',
		bottom:'1.1%',
		left:'16.0%',
		textAlign:'left',
		color:'#bf893b',
		font:{fontSize:'10dip', fontWeight:'bold'}
		
	});
	view.add(selected_menu_label);

	var character_imageview = Titanium.UI.createImageView({
		url:'/assets/hdpi_female_character.png',
		height:'61.6%',
		//width:'51.9%',
		top:'2%',
		right:'0%'
	});
	view.add(character_imageview);		
	character_imageview.addEventListener('load', function(e) {
		 ////hideLoader();
	});

	
	var center_view = Ti.UI.createView({
		backgroundColor:'#175c35',
		opacity:'0.7',
		width:'90%',
		height:'21.6%',
		left:'5%',
		top:'11%',
		borderRadius:8,
		borderWidth:3,
		borderColor:'#113825'
	});
	view.add(center_view);
	
	var textat_label = Titanium.UI.createLabel({
		text:'Briar Rose \nCan be combined with Vase \nQuantity 3',
		top:'12.3%',
		left:'44%',
		textAlign:'left',
		color:'#5afd9b',
		font:{fontSize:'12dip'}
		
	});
	view.add(textat_label);
	
	var value_label = Titanium.UI.createLabel({
		text:'Value: 3 Gold',
		top:'23.3%',
		right:'7.9%',
		textAlign:'left',
		color:'#5afd9b',
		font:{fontSize:'10dip'}
		
	});
	view.add(textat_label);
	
	var gift_button = Titanium.UI.createButton({
		backgroundImage:'/assets/button_small_UP.png',
		title:'Gift',
		height:'6%',
		width:'12.2%',
		top:'25%',
		right:'7.7%'
	});
	view.add(gift_button);
	gift_button.addEventListener('click',function(e){
		alert("Gift Clicked")
	});
	var crafting_button = Titanium.UI.createButton({
		backgroundImage:'/assets/button_small_UP.png',
		title:'Crafting',
		height:'6%',
		width:'22%',
		top:'25%',
		right:'25.7%'
	});
	view.add(crafting_button);
	crafting_button.addEventListener('click',function(e){
			var inventorycrafting=require('ui/common/MenuScreen/inventorycrafting');
			var inventory=new inventorycrafting(userinfo);
			inventory.open({modal: true});
	});
	var chest_imageview = Titanium.UI.createImageView({
		image:'/assets/Chest.png',
		height:'45%',
		width:'86%',
		bottom:'0%',
		left:'7%'
	});
	view.add(chest_imageview);
	//////Grid 
	var grid_imageview = Titanium.UI.createImageView({
		url:'/assets/grid.png',
		height:'35%',
		width:'68%',
		bottom:'20%',
		left:'16%'
	});
	grid_imageview.addEventListener('load', function(e) {
		 //hideLoader();
	});

	//view.add(grid_imageview);
	var ScreenWidth = Titanium.Platform.displayCaps.platformWidth;
	var tableviewwidth_percent = 80;
	var view_per_row = 4;
	
	
	var tableViewWidth_Px = (tableviewwidth_percent/100) * ScreenWidth; 
	var ViewWidth_In_rowView = tableViewWidth_Px / view_per_row;  				//view inner rowview width in px 
	
	var tableviewData = [];
	
	for(var i = 0; i<6; i++)
	{
		var tablerowview = Titanium.UI.createTableViewRow({
			height:ViewWidth_In_rowView +'px'			//height of rowview should same as the width of single view
		});
		
		var view_left = 0;
		for(var j=0; j<view_per_row; j++)
		{
			var view_imageview = Ti.UI.createImageView({
				url:'/assets/singlebox.png',
				width:ViewWidth_In_rowView +'px',
				height:ViewWidth_In_rowView +'px',
				top:'0px',
				left:view_left+'px'
			});
			tablerowview.add(view_imageview);
			
			view_left = view_left + ViewWidth_In_rowView;
		}
		tableviewData.push(tablerowview);
	}
		
	var tableview = Ti.UI.createTableView({
		data:tableviewData,
		separatorColor:'transparent',
		width:tableviewwidth_percent +'%',
		height:'35%',
		bottom:'20%',
		left:'16%'
	});
	view.add(tableview);

	////Grid
	var flower_imageview = Titanium.UI.createImageView({
		image:'/assets/Rose.png',
		height:'20%',
		width:'24.1%',
		top:'10.1%',
		left:'9%'
	});
	flower_imageview.addEventListener('load', function(e) {
		 //hideLoader();
	});

	view.add(flower_imageview);
	var arrowUP_imageview = Titanium.UI.createImageView({
		url:'/assets/iconControlArrowUp.png',
		width:'10%',
		height:'8%',
		right:'48%',
		bottom:'55%',
		
	});
	view.add(arrowUP_imageview);
	
	var arrowDown_imageview = Titanium.UI.createImageView({
		url:'/assets/iconControlArrowDown.png',
		width:'10%',
		height:'8%',
		right:'48%',
		bottom:'15%'
		
	});
	view.add(arrowDown_imageview);
	arrowDown_imageview.addEventListener('load', function(e) {
		 //hideLoader();
	});


	return view;
};
module.exports=Inventoryscreen;