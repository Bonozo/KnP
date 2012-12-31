function optionscreen()
{
	var option_window=Titanium.UI.createView({
		top:"23%",
		height:"78%",
		width:"100%",
		backgroundImage:'/assets/inventoryBackground.png'
		
	});
	var selected_menu_label = Titanium.UI.createLabel({
		text:'Options',
		top:'0%',
		left:'84.8%',
		textAlign:'center',
		color:'#5afd9b',
		font:{fontSize:'12dip'}
		
	});
	option_window.add(selected_menu_label);	
	var male_image=Titanium.UI.createImageView({
		top:"2%",
		left:'0%',
		image:'/assets/hdpi_female_character_Image2.png',
		//height:"85%"
	});
	option_window.add(male_image);
	/*var topbar=require('ui/common/TopBar/ProgressBar');
	var bar=new topbar();
	option_window.add(bar);
	
	var buttonbar=require('ui/common/ButtonBar/bar');
	var button=new buttonbar();
	option_window.add(button);
*/
///ui for option screen


	var sound_button=Titanium.UI.createButton({
			top:"7%",
			right:"5%",
			height:"9%",
			title:"SOUND ON",
			width:"60%"	,
			borderColor : "#a42b76",
 			borderRadius : 6,
			 borderWidth : 3,
			 backgroundGradient:{
			type:'linear',
	  		colors:[' #e49cc9','#a52b76'],
	  		startPoint:{x:'50%',y:'100%'},
	  		endPoint:{x:'50%',y:'0%'},
	  		backFillStart:false
  		}
	});
	option_window.add(sound_button);
	var Music_button=Titanium.UI.createButton({
			top:"19%",
			right:"5%",
			height:"9%",
			title:"MUSIC ON",
			width:"60%",
			borderColor : "#a42b76",
			borderRadius : 6,
			 borderWidth : 3,
			 backgroundGradient:{
			type:'linear',
	  		colors:[' #e49cc9','#a52b76'],
	  		startPoint:{x:'50%',y:'100%'},
	  		endPoint:{x:'50%',y:'0%'},
	  		backFillStart:false
  		}
	});
	option_window.add(Music_button);
	var Notification_button=Titanium.UI.createButton({
			top:"31%",
			right:"5%",
			height:"9%",
			title:"NOTIFICATIONS ON",
			width:"60%"	,
			borderColor : "#a42b76",
			borderRadius : 6,
			 borderWidth : 3,
			 backgroundGradient:{
			type:'linear',
	  		colors:[' #e49cc9','#a52b76'],
	  		startPoint:{x:'50%',y:'100%'},
	  		endPoint:{x:'50%',y:'0%'},
	  		backFillStart:false
  		}
	});
	option_window.add(Notification_button);
	var Report_button=Titanium.UI.createButton({
			top:"43%",
			right:"5%",
			height:"9%",
			title:"REPORT ABUSE",
			width:"60%",
			borderColor : "#a42b76",
			borderRadius : 6,
			 borderWidth : 3,
			 backgroundGradient:{
			type:'linear',
	  		colors:[' #e49cc9','#a52b76'],
	  		startPoint:{x:'50%',y:'100%'},
	  		endPoint:{x:'50%',y:'0%'},
	  		backFillStart:false
			}//backgroundImage:"/assets/button_large_UP.png"		
	});
	option_window.add(Report_button);
	var Reset_button=Titanium.UI.createButton({
			top:"55%",
			right:"5%",
			height:"9%",
			title:"RESET GAME",
			width:"60%"	,
			borderColor : "#a42b76",
			borderRadius : 6,
			 borderWidth : 3,
			 backgroundGradient:{
			type:'linear',
	  		colors:[' #e49cc9','#a52b76'],
	  		startPoint:{x:'50%',y:'100%'},
	  		endPoint:{x:'50%',y:'0%'},
	  		backFillStart:false
  		}
	});
	option_window.add(Reset_button);
	
////ui for option screen
/*
//module for bottom bar
var botombar=require('ui/common/BottomBar/bottom');
var bottom=new botombar();
option_window.add(bottom);
*/
//module for bottom bar
return option_window;
};

module.exports=optionscreen;