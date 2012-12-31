function bottombar(userinfojson,coin_info){
	//alert(coin_info.Record[0].TOTAL_UNIT)
	var view=Titanium.UI.createView({
		bottom:'0%',
		height:'10%',
		width:'100%',
		backgroundGradient:{
			type:'linear',
	  		colors:[' #3e9663','#2d6041'],
	  		startPoint:{x:'50%',y:'100%'},
	  		endPoint:{x:'50%',y:'0%'},
	  		backFillStart:false
  		}
		//backgroundColor:"pink"
	});
	var iconGold_imageview = Titanium.UI.createImageView({
		height:'100%',
		width:'11.3%',
		//bottom:'10%',
		left:'3.9%',
		image:'/assets/iconGold.png',
		
	});
	view.add(iconGold_imageview);
	
	var gold_quantity=Titanium.UI.createLabel({
		//coin_info.Record[0].TOTAL_UNIT
		text:coin_info.Record[0].TOTAL_UNIT,
		height:'100%',
		width:'auto',
		left:'16%',
		color:'gold'
	});
	view.add(gold_quantity);
	var level_text=Titanium.UI.createLabel({
		text:"LEVEL "+userinfojson.Record[0].LEVEL+"\n"+userinfojson.Record[0].GENDER,
		height:'100%',
		textAlign:'centre',
		color:"green",
		width:'auto',
		right:'46%'
	});
	view.add(level_text);
	var status_single=Titanium.UI.createLabel({
		text:userinfojson.Record[0].MARITIAL_STATUS,
		height:'100%',
		width:'auto',
		color:'green',
		right:'25%'
	});
	view.add(status_single);
	
	var bottom_coin=Titanium.UI.createImageView({
		height:'100%',
		width:'11.3%',
		//bottom:'10%',
		right:'15.9%',
		image:'/assets/iconMarrigeSingle.png',
	});
	view.add(bottom_coin);
	
	var days_label=Titanium.UI.createLabel({
		backgroundImage:'/assets/overlayCalender.png',
		text:"45\nDays",
		color:"black",
		right:"1%"
		
	});
	view.add(days_label);
	return view;
};
module.exports=bottombar;