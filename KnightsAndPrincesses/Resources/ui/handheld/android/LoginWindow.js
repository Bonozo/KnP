//Login Window Component Constructor
function LoginWindow() {
 //load component dependencies

 var HeaderView = require('ui/common/LoginScreen/HeaderView');
 var ChooseClass = require('ui/common/MenuScreen/ChooseClass');
  var viewstack=0;
	viewstack=Titanium.App.Properties.getString("viewstack");
	if(viewstack==0)
	{
	Titanium.App.Properties.setString("viewstack",0);
	}
 //create component instance
 
 var self = Ti.UI.createWindow({
 		
 		backgroundGradient:{type:'linear',
		colors:['#3258ad','#010f49'],
		startPoint:{x:0,y:0},
		endPoint:{x:2,y:500},
		backFillStart:false},
 			 exitOnClose:true,
 });
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
 //construct UI
 var headerView = new HeaderView();
 self.add(headerView);

 //creating mid image
 var imageView = Ti.UI.createImageView({
  top:"12%",
  height:"40%",
  width:"75%",
  image:"/assets/app_logo.png"
 });
 self.add(imageView);
 
 

 var emailField = Titanium.UI.createTextField({ 
  height:'auto',
  hintText:"Email",
   width:"75%",
  left:"15%",
  top:"63%"
 });
 self.add(emailField);
 var passwordField = Titanium.UI.createTextField({ 
  height:'auto', 
  hintText:"Password",
   width:"75%",
  left:"15%",
  top:"73%",
  passwordMask:true
 });
 self.add(passwordField);
 var rememberCheckBox = Ti.UI.createSwitch({
  top:"83%",
     style:Ti.UI.Android.SWITCH_STYLE_CHECKBOX, 
     height:"5%",
     left:"1%",
     value:false
 });
 self.add(rememberCheckBox);
 var rememberlabel = Ti.UI.createLabel({
  top:"83%",
  text:"Remember email address and password?",
  height:"5%",
  left:"15%"
 });
 self.add(rememberlabel);
 var signInButton = Ti.UI.createButton({
  title:"SIGN IN",
  top:"90%",
  color:"white",
  width:"75%",
  left:"15%",
  height:"8%",
  backgroundImage:"/assets/overlayItemList.png"
 });
 self.add(signInButton);
 signInButton.addEventListener('click',function(e){
 	var coin_info
 	var httpclientt=require('/ui/common/Functions/function');
 	//var modulee=new httpclientt();
 	httpclientt.requestServer({
				success : function(e) {
					var json=JSON.parse(this.responseText);
					if (json.Record != undefined) {
						var	Record = json.Record[0];
				//alert("Successfully signed in!");
				//sTi.App.GLBL_uid = Record.UID;
				if (Record.GENDER == 'm') {
					/// Request to get user info
					
											httpclientt.requestServer({
											success : function(e) {
											var user_info_json=JSON.parse(this.responseText);
											if (user_info_json.Record != undefined) {
											//var	Record = user_info_json.Record[0];
											//alert(user_info_json.Record[0])
													httpclientt.requestServer({
														
											success : function(e) {
											coin_info=JSON.parse(this.responseText);
											if (coin_info.Record != undefined) {
														var status = require('/ui/common/MenuScreen/StatusScreen');
														var statusscreen = new status(user_info_json,coin_info);
														statusscreen.open();
													}
									
											},
											method : 'GET',
											contentType:'text/xml',
											url : "http://justechinfo.com/kap_server/get_golds.php?uid=" + user_info_json.Record[0].UID + "",
										
											
								});
												 	
														
														
													}
									
											},
											method : 'GET',
											contentType:'text/xml',
											url : "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + Record.UID + "",
											
								});
					//alert("do something for male");
					
					
					
					
				} else {
					//do something for female
				}
				}
				 else if (json.Error != undefined) {
				if (json.Error.AuthException != undefined) {
					alert(json.Error.AuthException);
				} else if (json.Error.Request) {
					alert(json.Error.Request);
				} else {
					alert("Unknown error occured!");
				}
				}	
				
				},
				method : 'GET',
				contentType:'text/xml',
				url : "http://justechinfo.com/kap_server/?email=" + emailField.value + "&password=" + passwordField.value + "",
				//param : '<Device xmlns="http://schemas.datacontract.org/2004/07/CalendarConnect.Model">' + '<culture>' + Titanium.Platform.locale + '</culture>' + '<deviceToken>Have to Do</deviceToken>' + '<deviceType>' + deviceType + '</deviceType>' + '<modelDescription>' + Titanium.Platform.model + '</modelDescription>' + '<osVersion>' + Titanium.Platform.version + '</osVersion></Device>'
			});
 });
 
 var newUserButton = Ti.UI.createButton({
  title:"New User?",
  color:"white",
  top:"50%",
  width:"75%",
  left:"15%",
  height:"10%",
  backgroundImage:"/assets/overlayItemList.png"
 });
 self.add(newUserButton);
 newUserButton.addEventListener('click',function(e){
 	//self.close();
  var chooseClass = new ChooseClass(self);
  self.add(chooseClass);
 });
 self.addEventListener('android:back',function(e){
	 	//alert(viewstack);
	if(viewstack==0)
  	{
       self.close();
      //self.hide();
     }
 });
 return self;
}

//make constructor function the public component interface
module.exports = LoginWindow;