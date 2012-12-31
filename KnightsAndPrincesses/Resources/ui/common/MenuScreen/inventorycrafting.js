function crafting(userinfojson,coininfo){
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var view=Titanium.UI.createWindow({
		backgroundImage:'/assets/inventoryBackground.png',
		navBarHidden:true
 		
	});
	var botombar=require('ui/common/BottomBar/bottom');
	var bottom=new botombar(userinfojson,coininfo);
	view.add(bottom);
	var top_imageview = Titanium.UI.createImageView({
		image:'/assets/overlayPlayerInfoCroped.png',
		//height:'12.4%',
		width:'100%',
		top:'0%'
	});
	view.add(top_imageview);
	var name_label = Titanium.UI.createLabel({
		text:userinfojson.Record[0].NAME,
		top:'0',
		height:'3.1%',
		left:'3%',
		textAlign:'left',
		color:'#5afd9b',
		font:{fontWeight:'bold', fontSize:'12dip'}
	});
	view.add(name_label);
	
	var menu_label = Titanium.UI.createLabel({
		text:'Crafting',
		top:'0',
		height:'3.1%',
		right:'15.6%',
		textAlign:'right',
		color:'#5afd9b',
		font:{fontSize:'12dip'}
		
	});
	view.add(menu_label);

	var return_imageview = Titanium.UI.createImageView({
		height:'10%',
		width:'11.6%',
		top:'0%',
		right:'3%',
		image:'/assets/iconReturn.png'
		//height:'12.4%',
		
	});
	view.add(return_imageview);	
											var items_json="";
											var items_length=0;
											var httpclientt=require('/ui/common/Functions/function');
											httpclientt.requestServer({
											success : function(e) {
											items_json=JSON.parse(this.responseText);
											items_length=items_json.Record.length;
											if (items_json.Record != undefined) {
											//var	Record = user_info_json.Record[0];
											//alert(user_info_json.Record[0])
													var rowViewHeight = screenWidth * 0.136;
	var tabledata = [];
	alert(items_length);
	for(var i=0; i<items_json.Record.length; i++)
	{
		var rowView = Ti.UI.createTableViewRow({
			height:rowViewHeight
		});		
		
		var return_imageview = Titanium.UI.createImageView({
			image:'/assets/flowerpot.png',
			width:'13%',
			top:'5px',
			left:'5px'
		});
		rowView.add(return_imageview); 
		
		var rowviewtext_label = Ti.UI.createLabel({
			text:items_json.Record[i].CRAFT_NAME+"\n"+items_json.Record[i].CRAFT_DESCRIPTION ,
			font:{fontSize:'10dip'},
			color:'#5afd9b',
			left:'15%',
			width:'45%'
		});
		rowView.add(rowviewtext_label);
		
		var redflower_imageview = Titanium.UI.createImageView({
			image:'/assets/redflower.png',
			width:'9%',
			top:'5px',
			left:'62%'
		});
		rowView.add(redflower_imageview);
		
		var plus_label = Ti.UI.createLabel({
			text:'+',
			font:{fontSize:'13dip'},
			color:'#5afd9b',
			left:'72%',
			width:'3%'
		});
		rowView.add(plus_label);
		
		var coins_imageview = Titanium.UI.createImageView({
			image:'/assets/iconGold.png',
			width:'7%',
			top:'5px',
			left:'78%'
		});
		rowView.add(coins_imageview);

		var craft_imageview = Titanium.UI.createImageView({
			image:'/assets/buttonCraftEXAMPLE.png',
			width:'10%',
			//height:'60px',
			top:'15px',
			left:'86%'
		});
		rowView.add(craft_imageview);
		
		tabledata.push(rowView);
	}			//end of for loop

	var tableview = Ti.UI.createTableView({
		data:tabledata,
		width:'100%',
		height:'70.3%',
		top:'15%'
	});
	view.add(tableview);
												
												 	
												}
											},
											method : 'GET',
											contentType:'text/xml',
											url : "http://justechinfo.com/kap_server/get_craft_ingredients.php",
											
											});
	
	var UP_imageview = Titanium.UI.createImageView({
		image:'/assets/iconControlArrowUp.png',
		width:'12.5%',
		top:'10.3%',
		height:"10%",
		left:'44.4%'
	});
	view.add(UP_imageview);
	
	var down_imageview = Titanium.UI.createImageView({
		image:'/assets/iconControlArrowDown.png',
		width:'12.5%',
		height:"10%",
		top:'82%',
		left:'44.4%'
	});
	view.add(down_imageview);
	view.addEventListener('android:back',function(e){
		alert("asd")
		view.close();
		view=null;
	});
	return view;
};
module.exports=crafting;
