Ti.include("/ui/Functions/function.js");
function MenuScreen(CurrentWindow) {
	var viewstack;
	viewstack=Titanium.App.Properties.getString("viewstack");
	if(viewstack==2)
	
	{
		Titanium.App.Properties.setString("viewstack",2);
	}
	
	var self = Ti.UI.createView({
		backgroundGradient:{type:'linear',
		colors:['#3258ad','#010f49'],
		startPoint:{x:0,y:0},
		endPoint:{x:2,y:500},
		backFillStart:false},
	});
	var top_header=Titanium.UI.createImageView({
		top:'0%',
		//height:'8%',
		image:'/assets/overlayTitleStarCurtains.png'
		
	});
	self.add(top_header);
	
	var header_label=Titanium.UI.createLabel({
		text:"Choose Your Class",
		textAlign:'center',
		color:'#4dd28f',
		font:{fontStyle:'Century Gothic', fontSize:'16dip'},
		top:'1',
		height:'4.9%'
	});
	self.add(header_label);
	
	var male_image=Titanium.UI.createImageView({
		top:"15%",
		left:'0%',
		image:'/assets/K_fullbody_bad.png',
		//height:"85%"
	});
	self.add(male_image);
	var right_arrow=Titanium.UI.createButton({
		top:"40%",
		left:"60%",
		width:"25%",
		height:"20%",
		backgroundImage:"/assets/iconControlArrowLeft.png"
	});	
	self.add(right_arrow);
	
	
	var next_arrow=Titanium.UI.createButton({
		bottom:'0%',
		right:'0%',
		backgroundImage:'/assets/iconNextArrow.png',
		height:'10%',
		width:'35%'
	});
	self.add(next_arrow);
	var enter_name_label=Titanium.UI.createLabel({
		bottom:"23.5%",
		text:"Enter Your Name",
		backgroundColor:"black",
		color:"white",
		textAlign:'centre',
		opacity:'0.7'
	});
	self.add(enter_name_label);
	var namescroll=Titanium.UI.createImageView({
		left:"10%",
		top:"75%",
		width:"80%",
		height:"15%",
		image:'/assets/overlayNameScroll.png'
	});
	var name_text=Titanium.UI.createTextField({
		left:"25%",
		top:"73%",
		width:"70%",
		//hintText:"Carah99",
		height:"15%",
		paddingLeft:'3',
		backgroundColor:'transparent'
	});
	self.add(namescroll);
	self.add(name_text);
	var female_image=Titanium.UI.createImageView({
		top:"15%",
		right:0,
		image:'/assets/hdpi_female_character.png',
	});
	var previous_arrow=Titanium.UI.createButton({
		top:"40%",
		left:"10%",
		width:"25%",
		height:"20%",
		backgroundImage:"/assets/iconControlArrowRight.png"
	});
	right_arrow.addEventListener('click',function(e){
		male_image.image='/assets/hdpi_female_character.png';
		self.remove(right_arrow);
		self.add(previous_arrow);
		
	});
    previous_arrow.addEventListener('click',function(e){
    	male_image.image='/assets/K_fullbody_bad.png';
		self.remove(previous_arrow);
		self.add(right_arrow);
    });
	next_arrow.addEventListener('click',function(e){
	
		var Custom = require('/ui/common/MenuScreen/Customization');
		var customization = new Custom(CurrentWindow);
		CurrentWindow.add(customization);
		//CurrentWindow.remove(self);
		//self=null;
		// Titanium.UI.currentWindow.remove(self);
		//self.add(customization);
		//return customization;
			
	});
	
  CurrentWindow.addEventListener('android:back',function(e){
  	//alert(viewstack);
  	if(viewstack==1)
  	{
  		alert("in if")
       CurrentWindow.remove(self);
      self=null;
      //self.hide();
     }
 });
	return self;
}

//make constructor function the public component interface
module.exports = MenuScreen;