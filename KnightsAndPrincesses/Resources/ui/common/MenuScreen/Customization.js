//Login Window Component Constructor
function Customization(CurrentWindow) {
	var viewstack;
	viewstack=Titanium.App.Properties.getString("viewstack");
	if(viewstack==2)
	{
	Titanium.App.Properties.setString("viewstack",4);
	}
	var self = Ti.UI.createView({
		title:"title",
		backgroundGradient:{type:'linear',
		colors:['#3258ad','#010f49'],
		startPoint:{x:0,y:0},
		endPoint:{x:2,y:500},
		backFillStart:false},
	});
	
	var upperbg = Titanium.UI.createView({
		width:'100%',
		backgroundColor:'#213b6e',
		top:'0%',
		height:'12.6%'
	});
	self.add(upperbg);
	
	var curtain_image = Titanium.UI.createImageView({
		width:'100%',
		//height:'4.9%',
		url:'/assets/overlayTitleStarCurtains.png',
		top:'0%'
	});
	self.add(curtain_image);
	
	var label_title = Titanium.UI.createLabel({
		text:'CUSTOMIZATION',
		textAlign:'center',
		color:'#4dd28f',
		font:{fontStyle:'Century Gothic', fontSize:'16dip'},
		top:'1',
		height:'4.9%'
	});
	self.add(label_title);
	
	var label_title = Titanium.UI.createLabel({
		text:'HAIRSTYLE \n "THE DEBUTANTE"',
		textAlign:'center',
		color:'#4dd28f',
		font:{fontStyle:'Century Gothic', fontSize:'14dip'},
		top:'5.5%',
		height:'6.9%'
	});
	self.add(label_title);
	
	
	
	var character_image = Titanium.UI.createImageView({
		width:'92.1%',
		height:'77.4%',
		right:'0%',
		url:'/assets/hdpi_female_character_zoom.png',
		bottom:'0%'
	});
	self.add(character_image);
	var namescroll=Titanium.UI.createImageView({
		left:"10%",
		top:"75%",
		width:"80%",
		height:"15%",
		image:'/assets/overlayNameScroll.png'
	});
	var name_text=Titanium.UI.createLabel({
		left:"25%",
		top:"73%",
		//width:"70%",
		text:"Carah99 \n Princess Level 1",
		height:"15%",
		textAlign:'centre',
		backgroundColor:'transparent',
		color:"black"
	});
	self.add(namescroll);
	self.add(name_text);
	var change_name_label=Titanium.UI.createLabel({
		bottom:"23.5%",
		text:"Change Name",
		backgroundColor:"black",
		color:"white",
		textAlign:'centre',
		opacity:'0.7'
	});
	self.add(change_name_label);
	var left_arrow_image = Titanium.UI.createImageView({
		width:'18.4%',
		height:'8.4%',
		left:'4.1%',
		top:'36.6%',
		url:'/assets/iconControlArrowRight.png'
		
	});
	self.add(left_arrow_image);
	left_arrow_image.addEventListener('click',function(e){
		alert("Left Arrow Clicked");
	});
	var right_arrow_image = Titanium.UI.createImageView({
		width:'26.3%',
		height:'12.7%',
		right:'4.1%',
		top:'34.4%',
		url:'/assets/iconControlArrowLeft.png'
		
	});
	self.add(right_arrow_image);
	right_arrow_image.addEventListener('click',function(e){
		alert("Right Arrow Clicked");
	});
	var top_arrow_image = Titanium.UI.createImageView({
		width:'17.4%',
		height:'10.2%',
		left:'42.4%',
		top:'13.8%',
		url:'/assets/iconControlArrowUp.png'
		
	});
	self.add(top_arrow_image);
	top_arrow_image.addEventListener('click',function(e){
		alert("top Arrow Clicked");
	});
	
	var down_arrow_image = Titanium.UI.createImageView({
		width:'14%',
		height:'11.2%',
		left:'43.2%',
		top:'57%',
		url:'/assets/iconControlArrowDown.png'
		
	});
	self.add(down_arrow_image);
	down_arrow_image.addEventListener('click',function(e){
		alert("down arrow clicked")
	});
	var next_arrow_image = Titanium.UI.createButton({
		bottom:'0%',
		right:'0%',
		backgroundImage:'/assets/iconNextArrow.png',
		height:'10%',
		width:'35%'
	});
	
	self.add(next_arrow_image);
	next_arrow_image.addEventListener('click',function(e){
		var status = require('/ui/common/MenuScreen/StatusScreen');
		var statusscreen = new status();
		statusscreen.open({modal:true});
			//self.close();
	});
	
	var coins_image = Titanium.UI.createImageView({
		width:'15.2%',
		height:'9.9%',
		right:'6.5%',
		top:'14.6%',
		url:'/assets/iconDiceRandom.png'
		
	});
	self.add(coins_image);
	coins_image.addEventListener('click',function(e){
		alert("coins clicked")
	});
	 CurrentWindow.addEventListener('android:back',function(e){
	 	//alert(viewstack);
	if(viewstack==2)
  	{
  	   Titanium.App.Properties.setString("viewstack",3);
       CurrentWindow.remove(self);
       self=null;
      //self.hide();
     }
 });
	return self;
}

//make constructor function the public component interface
module.exports = Customization;