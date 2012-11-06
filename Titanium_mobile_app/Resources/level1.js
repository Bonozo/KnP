Ti.include('func_level1.js');
function removeAllContent() {
	headerRowView.remove(header);
	leftView.remove(characterImage);
	hairStyleRowView.remove(lblHairStyle);
	hairStyleRowView.remove(btnHairStyleMinus);
	hairStyleRowView.remove(btnHairStylePlus);
	rightView.remove(hairStyleRowView);
	hairColorRowView.remove(btnHairColorPlus);
	hairColorRowView.remove(btnHairColorMinus);
	hairColorRowView.remove(lblHairColor);
	rightView.remove(hairColorRowView);
	hairSkinColorRowView.remove(btnSkinTonePlus);
	hairSkinColorRowView.remove(btnSkinToneMinus);
	hairSkinColorRowView.remove(lblSkinTone);
	rightView.remove(hairSkinColorRowView);
	FaceRowView.remove(btnFacePlus);
	FaceRowView.remove(btnFaceMinus);
	FaceRowView.remove(lblFace);
	rightView.remove(FaceRowView);
	clothingRowView.remove(btnClothingPlus); 
	clothingRowView.remove(btnClothingMinus); 
	clothingRowView.remove(lblClothing);
	rightView.remove(clothingRowView);
	colorSchemeRowView.remove(btnColorSchemePlus);
	colorSchemeRowView.remove(btnColorSchemeMinus);
	colorSchemeRowView.remove(lblColorScheme);
	rightView.remove(colorSchemeRowView);
	rightView.remove(blankRowView);
	footer.remove(name);
	footer.remove(level);
	DoneAndDiceRowView.remove(doneButton);
	DoneAndDiceRowView.remove(diceButton);
	rightView.remove(DoneAndDiceRowView);
	contentView.remove(rightView);
	contentView.remove(leftView);
	win.remove(footer);
	win.remove(contentView);
	win.remove(descriptionRowView);
	win.remove(headerRowView);
	
	headerRowView = null;
	header = null;
	description = null;
	descriptionRowView = null;
	contentView = null;
	leftView = null;
	characterImage = null;
	rightView = null;
	hairStyleRowView = null;
	btnHairStylePlus = null;
	btnHairStyleMinus = null;
	lblHairStyle = null;
	hairColorRowView = null;
	btnHairColorPlus = null;
	btnHairColorMinus = null;
	lblHairColor = null;
	hairSkinColorRowView = null;
	btnSkinTonePlus = null;
	btnSkinToneMinus = null;
	lblSkinTone = null; null;
	FaceRowView = null;
	btnFacePlus = null;
	btnFaceMinus = null;
	lblFace = null;
	clothingRowView = null;
	btnClothingPlus = null;
	btnClothingMinus = null;
	lblClothing = null;
	colorSchemeRowView = null;
	btnColorSchemePlus = null;
	btnColorSchemeMinus = null;
	lblColorScheme = null;
	blankRowView = null;
	DoneAndDiceRowView = null;
	diceButton = null;
	doneButton = null;
	footer = null;
	name = null;
	level = null;
	win = null;
	window = null;
}


var win = Titanium.UI.createWindow({
	title:"Customize your hero",
    width: '100%',
    navBarHidden : true,
    height: '100%',
	backgroundColor:"#D0C8B0",
	exitOnClose:true
});
win.orientationModes = [Ti.UI.PORTRAIT];
var gender = Ti.API.info(win.gender);

//Header view
var headerRowView = Titanium.UI.createView({
	height:getHeaderHeight(),		
	width:"100%",	
	top:0,			
	left:0,
	backgroundColor : "#000000"
});
//Textview for header description 
var header = Titanium.UI.createLabel({
	text:"CUSTOMIZE YOUR CLASS",
	color : "#FFFFFF",
	textAlign:"center",
	font:{fontFamily : Ti.App.GLBL_default_font}
});
headerRowView.add(header);

//Description view
var descriptionRowView = Titanium.UI.createView({
	height:getDescriptionTextHeight(),		
	width:"100%",
	zIndex : 100, 	
	top:getHeaderHeight(),
	left:0		
});

//Textview for description 
var description = Titanium.UI.createLabel({
	text:"--- \"Choose your description here\" --",
	color : "#FFFFFF",
	//id : "DESCRIPTION",
	top : 0
});

//Content view
var contentView = Titanium.UI.createView({
	width:"100%",	
	top:getHeaderHeight()+getDescriptionTextHeight(),
	left:0,
	height : getHairStyleRowY()+(7*getStylesRowHeight())+(getStylesRowHeight())
});

//Left view
var leftView = Titanium.UI.createView({
	width:"40%",	
	top:0,
	left:0,
	height:getHairStyleRowY()+(7*getStylesRowHeight())+(getStylesRowHeight())
});

//Character Image
var characterImage = Titanium.UI.createImageView({
	image:getCharacterImage(),
	height:getImageHeight(Ti.App.GLBL_gender),
	width:getImageWidth(Ti.App.GLBL_gender)
	//left:"10%"
});
leftView.add(characterImage);

//Right view
var rightView = Titanium.UI.createView({
	width:"60%",	
	top:0,
	height:getHairStyleRowY()+(7*getStylesRowHeight())+(getStylesRowHeight()),
	right:0
});


//Hair Style row view
var hairStyleRowView = Titanium.UI.createView({
	height:getStylesRowHeight(),		
	width:"90%",	
	top:getHairStyleRowY(),
	backgroundColor : "#666666"
});
//btnHairStylePlus Button
var btnHairStylePlus = Titanium.UI.createButton({
	backgroundImage : "images/right_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	right : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnHairStylePlus.addEventListener("click", function(e){
	////alert(hair_stlyes[0]);
	//alert(curr_hair_stlyes);
	lblHairStyle.text = setProperty("hair_stlyes","plus");
	//alert(curr_hair_stlyes);
	//setProperty(property_name,operation)
});
//btnHairStyleMinus Button
var btnHairStyleMinus = Titanium.UI.createButton({
	backgroundImage : "images/left_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	left : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnHairStyleMinus.addEventListener("click", function(e){
	lblHairStyle.text = setProperty("hair_stlyes","minus");

});
//Hair Style 
var lblHairStyle = Titanium.UI.createLabel({
	text:"Hair Style",
	color : "#FFFFFF",
	width : "60%",
	//id : "hairstyle",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font:{fontFamily : Ti.App.GLBL_default_font}
});

hairStyleRowView.add(lblHairStyle);
hairStyleRowView.add(btnHairStyleMinus);
hairStyleRowView.add(btnHairStylePlus);
rightView.add(hairStyleRowView);


//Hair Color row view
var hairColorRowView = Titanium.UI.createView({
	height:getStylesRowHeight(),		
	width:"90%",	
	top:getHairStyleRowY()+getStylesRowHeight(),
	backgroundColor : "#666666"
});
//btnHairColorPlus Button
var btnHairColorPlus = Titanium.UI.createButton({
	backgroundImage : "images/right_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	right : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnHairColorPlus.addEventListener("click", function(e){
	if(Ti.App.GLBL_gender == 'male')
	{
		//lblHairColor.text = setProperty("hair_color","plus");
		var char_color = setProperty("hair_color","plus");
		lblHairColor.text = toTitleCase(char_color); 
		//Ti.App.GLBL_skin_color
		//'Gray','Red'
/*
		if(char_color == 'Gray'){
			Ti.App.GLBL_skin_color = 'gray'; 
		}
		else if(char_color == 'Red')
		{
			Ti.App.GLBL_skin_color = 'red';
		}
*/
		Ti.App.GLBL_skin_color = char_color; 
		var image_path = "images/hdpi_"+Ti.App.GLBL_gender+"_character_"+Ti.App.GLBL_skin_color+".png";

		//characterImage.height = getImageHeight(Ti.App.GLBL_gender),
		//characterImage.width = getImageWidth(Ti.App.GLBL_gender)
	
		characterImage.image = image_path; 
		Ti.App.GLBL_character_image = image_path;
	}
});
//btnHairColorMinus Button
var btnHairColorMinus = Titanium.UI.createButton({
	backgroundImage : "images/left_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	left : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnHairColorMinus.addEventListener("click", function(e){
	if(Ti.App.GLBL_gender == 'male')
	{
		//lblHairColor.text = setProperty("hair_color","plus");
		var char_color = setProperty("hair_color","minus");
		lblHairColor.text = toTitleCase(char_color); 
		//Ti.App.GLBL_skin_color
		//'Gray','Red'
/*
		if(char_color == 'Gray'){
			Ti.App.GLBL_skin_color = 'gray'; 
		}
		else if(char_color == 'Red')
		{
			Ti.App.GLBL_skin_color = 'red';
		}
*/
		Ti.App.GLBL_skin_color = char_color; 
		var image_path = "images/hdpi_"+Ti.App.GLBL_gender+"_character_"+Ti.App.GLBL_skin_color+".png";

		//characterImage.height = getImageHeight(Ti.App.GLBL_gender),
		//characterImage.width = getImageWidth(Ti.App.GLBL_gender)
	
		characterImage.image = image_path; 
		Ti.App.GLBL_character_image = image_path;
	}
});
//Hair Color 
var lblHairColor = Titanium.UI.createLabel({
	text:"Gray",
	color : "#FFFFFF",
	width : "60%",
	//id : "hairstyle",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font:{fontFamily : Ti.App.GLBL_default_font}
});


hairColorRowView.add(btnHairColorPlus);
hairColorRowView.add(btnHairColorMinus);
hairColorRowView.add(lblHairColor);
rightView.add(hairColorRowView);

//Skin Tone
var hairSkinColorRowView = Titanium.UI.createView({
	height:getStylesRowHeight(),		
	width:"90%",	
	top:getHairStyleRowY()+(2*getStylesRowHeight()),
	backgroundColor : "#666666"
});
//btnSkinTonePlus Button
var btnSkinTonePlus = Titanium.UI.createButton({
	backgroundImage : "images/right_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	right : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnSkinTonePlus.addEventListener("click", function(e){
	lblSkinTone.text = setProperty("skin_tone","plus");
});
//btnSkinToneMinus Button
var btnSkinToneMinus = Titanium.UI.createButton({
	backgroundImage : "images/left_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	left : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnSkinToneMinus.addEventListener("click", function(e){
	lblSkinTone.text = setProperty("skin_tone","minus");
});
//Hair Color 
var lblSkinTone = Titanium.UI.createLabel({
	text:"Skin Tone",
	color : "#FFFFFF",
	width : "60%",
	//id : "hairstyle",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font:{fontFamily : Ti.App.GLBL_default_font}
});

hairSkinColorRowView.add(btnSkinTonePlus);
hairSkinColorRowView.add(btnSkinToneMinus);
hairSkinColorRowView.add(lblSkinTone);
rightView.add(hairSkinColorRowView);

//Face
var FaceRowView = Titanium.UI.createView({
	height:getStylesRowHeight(),		
	width:"90%",	
	top:getHairStyleRowY()+(3*getStylesRowHeight()),
	backgroundColor : "#666666"
});
//btnFacePlus Button
var btnFacePlus = Titanium.UI.createButton({
	backgroundImage : "images/right_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	right : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnFacePlus.addEventListener("click", function(e){
	lblFace.text = setProperty("face","plus");
});
//btnFaceMinus Button
var btnFaceMinus = Titanium.UI.createButton({
	backgroundImage : "images/left_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	left : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnFaceMinus.addEventListener("click", function(e){
	lblFace.text = setProperty("face","minus");
});
//Face 
var lblFace = Titanium.UI.createLabel({
	text:"Face",
	color : "#FFFFFF",
	width : "60%",
	//id : "hairstyle",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font:{fontFamily : Ti.App.GLBL_default_font}
});

FaceRowView.add(btnFacePlus);
FaceRowView.add(btnFaceMinus);
FaceRowView.add(lblFace);
rightView.add(FaceRowView);

//Clothing
var clothingRowView = Titanium.UI.createView({
	height:getStylesRowHeight(),		
	width:"90%",	
	top:getHairStyleRowY()+(4*getStylesRowHeight()),
	backgroundColor : "#666666"
});
//btnClothingPlus Button
var btnClothingPlus = Titanium.UI.createButton({
	backgroundImage : "images/right_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	right : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnClothingPlus.addEventListener("click", function(e){
	lblClothing.text = setProperty("clothing","plus");
});
//btnClothingMinus Button
var btnClothingMinus = Titanium.UI.createButton({
	backgroundImage : "images/left_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	left : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnClothingMinus.addEventListener("click", function(e){
	lblClothing.text = setProperty("clothing","minus");
});
//lblClothing
var lblClothing = Titanium.UI.createLabel({
	text:"Clothing",
	color : "#FFFFFF",
	width : "60%",
	//id : "hairstyle",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font:{fontFamily : Ti.App.GLBL_default_font}
});

clothingRowView.add(btnClothingPlus); 
clothingRowView.add(btnClothingMinus); 
clothingRowView.add(lblClothing);
rightView.add(clothingRowView);

//Color Scheme
var colorSchemeRowView = Titanium.UI.createView({
	height:getStylesRowHeight(),		
	width:"90%",	
	top:getHairStyleRowY()+(5*getStylesRowHeight()),
	backgroundColor : "#666666"
});
//btnClothingPlus Button
var btnColorSchemePlus = Titanium.UI.createButton({
	backgroundImage : "images/right_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	right : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnColorSchemePlus.addEventListener("click", function(e){
	lblColorScheme.text = setProperty("color_scheme","plus");
});
//btnClothingMinus Button
var btnColorSchemeMinus = Titanium.UI.createButton({
	backgroundImage : "images/left_arrow.png",
	color : "#FFFFFF",
	width : getRightArrowImageWidth(),
	height : getRightArrowImageHeight(),
	top : getArrowImageY(),
	left : getArrowImageX(),
	//id : "MALE",
	borderRadius : 2
});
btnColorSchemeMinus.addEventListener("click", function(e){
	lblColorScheme.text = setProperty("color_scheme","minus");
});
//lblClothing
var lblColorScheme = Titanium.UI.createLabel({
	text:"Color Scheme",
	color : "#FFFFFF",
	width : "60%",
	//id : "hairstyle",
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER, 
	font:{fontFamily : Ti.App.GLBL_default_font}
});

colorSchemeRowView.add(btnColorSchemePlus);
colorSchemeRowView.add(btnColorSchemeMinus);
colorSchemeRowView.add(lblColorScheme);
rightView.add(colorSchemeRowView);

//Blank Space after fields
var blankRowView = Titanium.UI.createView({
	height: blankSpace(),		
	width:"90%",	
	top: getHairStyleRowY()+6*getStylesRowHeight(),
	backgroundColor : "#666666"
});

rightView.add(blankRowView);

//Done and Dice Scheme
var DoneAndDiceRowView = Titanium.UI.createView({
	height:getStylesRowHeight(),		
	width:"90%",	
	top:getHairStyleRowY()+(6*getStylesRowHeight())+(getStylesRowHeight()/2)
});


//Dice Button
var diceButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	backgroundImage : "images/btn_dice.png",
	height : getButtonHeight(),  
	width : getButtonWidth(),
	left : getArrowImageX(),
	//id : "dice",
	borderRadius : 2
});
diceButton.addEventListener("click", function(e){
	//alert(Titanium.App.Properties.getString("gender"));
	//alert(Ti.App.GLBL_gender);
	Ti.App.GLBL_curr_hair_stlyes = getRandomNumber(0,2);
	Ti.App.GLBL_curr_hair_color = getRandomNumber(0,2);
	Ti.App.GLBL_curr_skin_tone = getRandomNumber(0,2);
	Ti.App.GLBL_curr_face = getRandomNumber(0,2);
	Ti.App.GLBL_curr_clothing = getRandomNumber(0,2);
	Ti.App.GLBL_curr_color_scheme 	= getRandomNumber(0,2);
	
	lblHairStyle.text 	= Ti.App.GLBL_hair_stlyes[Ti.App.GLBL_curr_hair_stlyes];
	lblHairColor.text  	= Ti.App.GLBL_hair_color[Ti.App.GLBL_curr_hair_color];
	lblSkinTone.text  	= Ti.App.GLBL_skin_tone[Ti.App.GLBL_curr_skin_tone];
	lblFace.text  		= Ti.App.GLBL_face[Ti.App.GLBL_curr_face]; 
	lblClothing.text  	= Ti.App.GLBL_clothing[Ti.App.GLBL_curr_clothing]; 
	lblColorScheme.text = Ti.App.GLBL_color_scheme[Ti.App.GLBL_curr_color_scheme]; 	

});

//Done Button
var doneButton = Titanium.UI.createButton({
	color : "#FFFFFF",
	title : "DONE",
	backgroundColor : "#474747",
	height : getButtonHeight(),  
	width : getButtonWidth(),
	right : getArrowImageX(),
	//id : "dice",
	borderRadius : 2,
	font:{fontFamily : Ti.App.GLBL_default_font}
});
doneButton.addEventListener("click", function(e){
	var window = Titanium.UI.createWindow({
	    url:'sign_up.js'
	});
	window.open();
	removeAllContent();
	//win.close();
});

//Footer
var footer = Titanium.UI.createView({
	width:"100%",	
	top:(2*getHairStyleRowY())+(10*getStylesRowHeight()),
	zIndex : 1000
});

//Textview for Name 
var name = Titanium.UI.createLabel({
	text:"NAME: "+Ti.App.GLBL_name,
	top : 0,
	height : getHeaderHeight()/2,
	left : "10%",
	color : "#000000",
	font:{fontFamily : Ti.App.GLBL_default_font}
});
//Textview for Level 
var level = Titanium.UI.createLabel({
	text:"LEVEL: LVL 1",
	top : getHeaderHeight()/2,
	left : "10%",
	color : "#000000",
	font:{fontFamily : Ti.App.GLBL_default_font}
});
footer.add(name);
footer.add(level);


DoneAndDiceRowView.add(doneButton);
DoneAndDiceRowView.add(diceButton);
rightView.add(DoneAndDiceRowView);

contentView.add(rightView);
contentView.add(leftView);

win.addEventListener('android:back', function(e) {
	var window = Titanium.UI.createWindow({
	    url:'choose_your_class.js'
	});
	window.open();
	removeAllContent();
});



win.add(footer);
win.add(contentView);
win.add(descriptionRowView);
win.add(headerRowView);
win.open();