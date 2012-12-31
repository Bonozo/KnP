function statusscreen(userinfojson,coininfo)
{
	//alert(userinfojson.Record[0].XP)
	var status_window=Titanium.UI.createWindow({
		backgroundImage:'/assets/inventoryBackground.png',
		navBarHidden:true
	});
	var view = Ti.UI.createView({
		width:'100%',
		height:'100%',
		
		 	
		 });	
	status_window.add(view);
	var letter_imageview = Titanium.UI.createImageView({
		url:'/assets/LargeScroll.png',
		height:'43.2%',
		width:'50%',
		top:'28.5%',
		right:'0%',
		opacity:'0.6'
	});
	view.add(letter_imageview);
	
	var character_imageview = Titanium.UI.createImageView({
		url:'/assets/hdpi_female_character_Image2.png',
		height:'75%',
		//width:'93.8%',
		bottom:'0%',
		left:'0%'
	});
	view.add(character_imageview);
var selected_menu_label = Titanium.UI.createLabel({
		text:'Status',
		top:'23%',
		left:'0%',
		textAlign:'center',
		color:'#5afd9b',
		font:{fontSize:'12dip'}
		
	});
	view.add(selected_menu_label);
	var iconbg_view = Titanium.UI.createImageView({
		url:'/assets/iconHighlight.png',
		height:'10%',
		width:'13.8%',
		top:'12%',
		left:'0%'
	});
	view.add(iconbg_view);

	var overlayProgressNotification1_imageview = Titanium.UI.createImageView({
		url:'/assets/overlayProgressNotification.png',
		right:'0',
		height:'5%',
		width:'50%',
		bottom:'16.8%',		
	});
	view.add(overlayProgressNotification1_imageview);
	
	var quest_label = Titanium.UI.createLabel({
		text:'12 Quest to Next Level',
		bottom:'18%',
		right:'8%',
		textAlign:'right',
		color:'#5afd9b',
		font:{fontSize:'10dip'}
		
	});
	view.add(quest_label);
	
	var overlayProgressNotification2_imageview = Titanium.UI.createImageView({
		url:'/assets/overlayProgressNotification.png',
		right:'0',
		height:'5%',
		width:'50%',
		bottom:'10.9%',
		
	});
	view.add(overlayProgressNotification2_imageview);
	
	var friends_label = Titanium.UI.createLabel({
		text:'15 Friends to Next Level',
		bottom:'12%',
		right:'8%',
		textAlign:'right',
		color:'#5afd9b',
		font:{fontSize:'10dip'}
		
	});
	view.add(friends_label);
	
	var letter_text_label = Titanium.UI.createLabel({
		text:'Following Ruby \nDress \n+1 Aiming  \n+2 Charming',
		top:'35.6%',
		right:'10%',
		width:'26%',
		textAlign:'center',
		color:'#4f2e5e',
		font:{fontSize:'14dip'}
		
	});
	view.add(letter_text_label);	
	
	var arrowUP_imageview = Titanium.UI.createImageView({
		url:'/assets/iconControlArrowUp.png',
		width:'8%',
		height:'5%',
		right:'16%',
		top:'26.4%',
		
	});
	view.add(arrowUP_imageview);
	
	var arrowDown_imageview = Titanium.UI.createImageView({
		url:'/assets/iconControlArrowDown.png',
		width:'8%',
		height:'5%',
		right:'25%',
		top:'70.2%',
		
	});
	view.add(arrowDown_imageview);
	var topbar=require('ui/common/TopBar/ProgressBar');
	var bar=new topbar(userinfojson);
	status_window.add(bar);
	var buttonbar=require('ui/common/ButtonBar/bar');
	var button=new buttonbar(status_window,view,userinfojson,coininfo);
	status_window.add(button,coininfo);
	var botombar=require('ui/common/BottomBar/bottom');
	var bottom=new botombar(userinfojson,coininfo);
	status_window.add(bottom);
	status_window.addEventListener('android:back',function(e){
		status_window.remove(view);
		view=null;
		status_window.close();
	});
		return status_window;

};
module.exports= statusscreen;