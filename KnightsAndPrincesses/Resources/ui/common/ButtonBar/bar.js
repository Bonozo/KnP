function buttonbarfunction(CurrentWindow,iconbgview,userinfojson,coininfo){
	
 		//var inventorywindow = require('ui/common/MenuScreen/inventoryscreen');
 		//var inventory = new inventorywindow();
 		//var scenerwindow = require('ui/common/MenuScreen/SecneryCustomization');
 		//var scenery = new scenerwindow();
 		//var freScreen = require('ui/common/MenuScreen/FreindsScreen');
 		//var fscreen = new freScreen();
 		//CurrentWindow.remove(iconbgview);
	var view=Titanium.UI.createView({
		top:"12%",
		height:"10%"
	});
	var iconbg_view = Titanium.UI.createImageView({
		url:'/assets/iconHighlight.png',
		height:'100%',
		width:'13.8%',
		top:'0%',
		left:'15.8%',
		zIndex:50
	});
	
	var iconstatus_imageview = Titanium.UI.createImageView({
		
		left:'0%',
		top:'0%',
		image:'/assets/iconStatus.png',
		height:'100%',
		width:'13.8%'
		
	});
	view.add(iconstatus_imageview);
	
	var iconInventory_imageview = Titanium.UI.createImageView({
		image:'/assets/iconInventory.png',
		height:'100%',
		width:'13.8%',
		top:'0%',
		left:'15.8%',
		zIndex:100
	});
	view.add(iconInventory_imageview);
	iconInventory_imageview.addEventListener('click',function(e){
		//CurrentWindow.remove(option);
		//CurrentWindow.remove(iconbgview);
		//iconbgview.remove(scenery);
		//iconbgview.remove(option);
		//inventory=new inventorywindow();
		//view.remove(iconbg_view);
		//iconbg_view.setLeft='15.8%';
		//view.add(iconbg_view);
		var inventorywindow = require('ui/common/MenuScreen/inventoryscreen');
 		var inventory = new inventorywindow(userinfojson,coininfo);
 		iconbgview.add(inventory);
		
	//iconbgview.add(iconbg_view);

 		//iconbgview.add(inventory);
	});
	var iconFriends_imageview = Titanium.UI.createImageView({
		image:'/assets/iconFriends.png',
		height:'100%',
		width:'13.8%',
		top:'0%',
		left:'29.6%',
		zIndex:100
	});
	view.add(iconFriends_imageview);
	iconFriends_imageview.addEventListener('click',function(e){
		/*
 		iconbgview.remove(inventory);
		iconbgview.remove(option);
		var fscreen = new freScreen();
 		iconbgview.add(fscreen);
 		*/
 		var freScreen = require('ui/common/MenuScreen/FreindsScreen');
 		var fscreen = new freScreen(userinfojson,coininfo);
 		iconbgview.add(fscreen);
 		
	});
	var iconQuests_imageview = Titanium.UI.createImageView({
		image:'/assets/iconQuests.png',
		height:'100%',
		width:'13.8%',
		top:'0%',
		left:'43.4%'
	});
	view.add(iconQuests_imageview);
	
	var iconLeaderboards_imageview = Titanium.UI.createImageView({
		image:'/assets/iconLeaderboards.png',
		height:'100%',
		width:'13.8%',
		top:'0%',
		left:'57.2%'
	});
	view.add(iconLeaderboards_imageview);
	
	var iconCustomizeBackground_imageview = Titanium.UI.createImageView({
		image:'/assets/iconCustomizeBackground.png',
		height:'100%',
		width:'13.8%',
		top:'0%',
		left:'71%',
		zIndex:100
	});
	    view.add(iconCustomizeBackground_imageview);
        iconCustomizeBackground_imageview.addEventListener('click',function(e){
		var scenerwindow = require('ui/common/MenuScreen/SecneryCustomization');
 		var scenery = new scenerwindow(userinfojson);
 		iconbgview.add(scenery);
		/*
		iconbgview.remove(inventory);
		iconbgview.remove(option);
		scenery=new scenerwindow();
 		iconbgview.add(scenery);
 		//view.add(scenery);
 		*/
});
	var iconOptions_imageview = Titanium.UI.createImageView({
		image:'/assets/iconOptions.png',
		height:'100%',
		width:'13.8%',
		top:'0%',
		left:'84.8%',
		//opacity:'0.2'
	});
	view.add(iconOptions_imageview);
	iconOptions_imageview.addEventListener('click',function(e){
		//CurrentWindow.remove(iconbgview);
		//CurrentWindow.remove(inventory);
		//iconbgview.remove(inventory);
		//iconbgview.remove(scenery);
		var optionwindow = require('ui/common/MenuScreen/OptionsScreen');
 		var option = new optionwindow(userinfojson);
	//view.add(iconbg_view);
		
 		iconbgview.add(option);
	});
	return view;
}
module.exports=buttonbarfunction;
