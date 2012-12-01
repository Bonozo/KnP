var winWidth = Ti.Platform.displayCaps.platformWidth;
var winHeight = Ti.Platform.displayCaps.platformHeight;


function getCraftItemVisibility(craftItem)
{
	if(Ti.App.GLBL_gender == 'male')
	{
		switch(craftItem)
		{
			case "chestRedArmorImage":
				return Ti.App.GLBL_items_visible[0];
			
			case "footRedArmorImage":
				return Ti.App.GLBL_items_visible[1];
			
			case "glovesArmorImage":
				return Ti.App.GLBL_items_visible[2];
			
			case "helmetArmorImage":
				return Ti.App.GLBL_items_visible[3];
			
			case "legsArmorImage":
				return Ti.App.GLBL_items_visible[4];
		}
	}
	else if(Ti.App.GLBL_gender == 'flowerImage')
	{
		switch(craftItem)
		{
			case "flower":
				return Ti.App.GLBL_items_visible[0];
		}
	}
	return false;
}
function getImageHeight(imageName)
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		switch (imageName) 
		{
			case "female":
				return 350;
			case "male":
				return 336;
				
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
				return 158;
			case "male":
				return 135;
				
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

function getButtonHeight()
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 50;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 24;
	}
}
function getButtonWidth()
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 130;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 60;
	}
}
function getZoomArmedDecorationIconHeight(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 96;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 32;
	}
}
function getZoomArmedDecorationIconWidth(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 96;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 32;
	}
}
function getArmedDecorationIconHeight(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 48;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 24;
	}
}
function getZoomBorderRadius(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 24;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 6;
	}
}
function getZoomBorderWidth(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 5;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 2;
	}
}
function getBorderRadius(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 9;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 4;
	}
}
function getBorderWidth(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 3;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 1;
	}
}
function getArmedCharacterHeight(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 350;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 56;
	}
}
function getArmedCharacterWidth(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 145;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 17;
	}
}
function getFirendsIconWidth(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 36;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 17;
	}
}
function getFirendsIconheight(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 32;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 14;
	}
}
function getAvatarWidth(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 75;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 48;
	}
}
function getAvatarHeight(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 75;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 48;
	}
}
function getCharPointsHeight(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 50;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 30;
	}
}
function getCharPointsWidth(){
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 50;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 30;
	}
}
function getGroupStatusHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return (getHeaderHeight()*3/2);
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return (getHeaderHeight()*3/2);
	}
}
function getIconWidthHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 62;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 30;
	}
}
function getHeaderHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 70;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 45;
	}
}
function getCoinHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 40;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 25;
	}
}

function getCompletedRequestsFontSize()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 10;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 6;
	}
}
function getSelectedIconNameTextSize()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 18;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 10;
	}
}
function getCharacterPartsTextSize()
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
function getButtonTextSize()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 16;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 8;
	}
}
function getHeaderButtonY()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 7;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 3;
	}
}
function getCoinTextY()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 2;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 3;
	}
}

function getHeaderButtonX()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 4;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 2;
	}
}
function getCoinButtonWidth()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 65;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 40;
	}
}
function getButtonTextSize()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 16;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 8;
	}
}
function getMsgsButtonWidth()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 55;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 30;
	}
}
function getGroupStatusY()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 4*getHeaderButtonY()+getCoinButtonWidth();
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 2*getHeaderButtonY()+getCoinButtonWidth();
	}
}
function setZoomPicture(picture){
	selectedIconImage.image = "images/arm_"+picture+"_icon.png";
}
function setZoomPictureName(picName){
	lblSelectedIconName.text = picName;
}
function setZoomPictureDesc(picDesc){
	lblSelectedIconDesc.text = picDesc;
}
