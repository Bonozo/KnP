var winWidth = Ti.Platform.displayCaps.platformWidth;
var winHeight = Ti.Platform.displayCaps.platformHeight;

function getNormalFontSize() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 16;
	} else if (winWidth < 480 && winHeight < 800) {
		return 10;
	}
}

function getMarginNormal1() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 8;
	} else if (winWidth < 480 && winHeight < 800) {
		return 4;
	}
}
function getHeaderHeight() {
	if (winWidth >= 480 && winHeight >= 800) {
		return 48;
	} else if (winWidth < 480 && winHeight < 800) {
		return 18;
	}
}
function setCharacterAsFemale(){
	Ti.App.GLBL_items_visible = [false,false,false,false,false,false,false,false,false];
	Ti.App.GLBL_items_title = 
	['Flower',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_image = 
	['P_flower',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_description = 
	['Chest Plate description',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_value = [
	'10','45','30','50','80'];
}
function setCharacterAsMale(){
	Ti.App.GLBL_items_visible = [false,false,false,false,false,false,false,false,false];
	Ti.App.GLBL_items_title = 
	['Chest Plate',
	'Feet',
	'Gloves',
	'Helmet',
	'Legs',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_image = 
	['K_ChestPlate_bad_crop',
	'K_Feet_bad_crop',
	'K_Gloves_bad_crop',
	'K_Helmet_bad_crop',
	'K_Legs_bad_crop',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_description = 
	['Chest Plate description',
	'Feet description',
	'Gloves description',
	'Helmet description',
	'Legs description',
	'',
	'',
	'',
	''];
	Ti.App.GLBL_items_value = [
	'10','45','30','50','80'];
}
function getButtonTextSize()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 12;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 6;
	}
}
function getBorderSize()
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 6;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 3;
	}
}
function getNameBoxY()
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 320;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 175;
	}
}
function getTextDescriptionY()
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 440;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 175;
	}
}
function getNormalTextHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 35;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 20;
	}
}
function maleFemaleButtonY()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 370;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 130;
	}
}
function maleFemaleButtonWidth()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 130;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 70;
	}
}
function buttonHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 55;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 35;
	}
}
function inch(size)
{
    // default to 160 dpi if unavailable
    var height = size * 160.0; 

    try
    { 
        // compute header height based on screen density ... target .25" height
        height = size * Ti.Platform.displayCaps.dpi; 
    }
    catch(e) { warn("Error accessing display caps for screen density calculation: " + e); }

    return height;
}
function getImageName(imageName)
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return "images/hdpi_"+imageName+"_bad.png";
	}
	else
	{
		return "images/"+imageName+".png";
	}
	
}
function getImageHeight(imageName)
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		switch (imageName) 
		{
			case "female":
				return 293;
			case "male":
				return 293;
		}
	}
	else
	{
		switch (imageName) 
		{
			case "female":
				return 92;
			case "male":
				return 88;
		}
	}
	return 0;
	
}
function getImageWidth(imageName)
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		switch (imageName) 
		{
			case "female":
				return 186;
			case "male":
				return 110;
				
		}
	}
	else
	{
		switch (imageName) 
		{
			case "female":
				return 29;
			case "male":
				return 29;
				
		}
	}
	return 0;
	
}
