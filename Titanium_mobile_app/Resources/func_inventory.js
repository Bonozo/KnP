var winWidth = Ti.Platform.displayCaps.platformWidth;
var winHeight = Ti.Platform.displayCaps.platformHeight;

var selected_item_index = 0;
function getThumbImage(image){
	if(image == "")
	{
		return "images/selected_inventory_item_pic.png";
	}
	//images/K_Feet_bad_crop_gray.png
	return "images/" + image + "_"+Ti.App.GLBL_skin_color+ ".png";
}
function setCraftItemVisibility(craftItem,visibility)
{
	switch(craftItem)
	{
		case "chestRedArmorImage":
			chestRedArmorImage.visible = visibility;
			return true;
		
		case "footRedArmorImage":
			footRedArmorImage.visible = visibility;
			return true;
		
		case "glovesArmorImage":
			glovesArmorImage.visible = visibility;
			return true;
		
		case "helmetArmorImage":
			helmetArmorImage.visible = visibility;
			return true;
		
		case "legsArmorImage":
			legsArmorImage.visible = visibility;
			return true;
		case "flowerImage":
			flowerImage.visible = visibility;
			return true;
	}
	return false;
}
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
	else if(Ti.App.GLBL_gender == 'female')
	{
		switch(craftItem)
		{
			case "flowerImage":
				return Ti.App.GLBL_items_visible[0];
		}
	}
	return false;
}
function getThumbImageWidth(imageName)
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		switch (imageName) 
		{
			case "K_ChestPlate_bad_crop":
				return 25;
			case "K_Feet_bad_crop":
				return 20;
			case "K_Gloves_bad_crop":
				return 24;
			case "K_Helmet_bad_crop":
				return 24;
			case "K_Legs_bad_crop":
				return 21;
			case "P_flower":
				return 24;
			case "":
				return 24;
		}
	}
	else
	{
		switch (imageName) 
		{
			case "K_ChestPlate_bad_crop":
				return 25;
			case "K_Feet_bad_crop":
				return 20;
			case "K_Gloves_bad_crop":
				return 24;
			case "K_Helmet_bad_crop":
				return 24;
			case "K_Legs_bad_crop":
				return 21;
			case "P_flower":
				return 15;
			case "":
				return 24;
		}
	}
	return 24;
	
}

function getThumbImageHeight(imageName)
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		switch (imageName) 
		{
			case "K_ChestPlate_bad_crop":
				return 24;
			case "K_Feet_bad_crop":
				return 24;
			case "K_Gloves_bad_crop":
				return 19;
			case "K_Helmet_bad_crop":
				return 24;
			case "K_Legs_bad_crop":
				return 24;
			case "P_flower":
				return 15;
			case "":
				return 24;
		}
	}
	else
	{
		switch (imageName) 
		{
			case "K_ChestPlate_bad_crop":
				return 24;
			case "K_Feet_bad_crop":
				return 24;
			case "K_Gloves_bad_crop":
				return 19;
			case "K_Helmet_bad_crop":
				return 24;
			case "K_Legs_bad_crop":
				return 24;
			case "P_flower":
				return 24;
			case "":
				return 24;
		}
	}
	return 24;
	
}

function setEquipRemove(){

	Ti.App.GLBL_items_visible[selected_item_index] = !Ti.App.GLBL_items_visible[selected_item_index];

	if(Ti.App.GLBL_gender == "male")
	{
		switch (Ti.App.GLBL_items_image[selected_item_index]) 
		{
			
			case Ti.App.GLBL_items_image[0]:
				chestRedArmorImage.visible = Ti.App.GLBL_items_visible[selected_item_index];
				break;
				
			case Ti.App.GLBL_items_image[1]:
				footRedArmorImage.visible = Ti.App.GLBL_items_visible[selected_item_index];
				break;
				
			case Ti.App.GLBL_items_image[2]:
				glovesArmorImage.visible = Ti.App.GLBL_items_visible[selected_item_index];
				break;
				
			case Ti.App.GLBL_items_image[3]:
				helmetArmorImage.visible = Ti.App.GLBL_items_visible[selected_item_index];
				break;
				
			case Ti.App.GLBL_items_image[4]:
				legsArmorImage.visible = Ti.App.GLBL_items_visible[selected_item_index];
				break;
		}
	}
	else if(Ti.App.GLBL_gender == "female")
	{
		switch (Ti.App.GLBL_items_image[selected_item_index]) 
		{
			case Ti.App.GLBL_items_image[0]:
				flowerImage.visible = Ti.App.GLBL_items_visible[selected_item_index];
				break;
		}
	}
	setEquipZoomView();
}
function setEquipZoomView(){
	if(Ti.App.GLBL_items_visible[selected_item_index])
	{
		equipButton.title = "Remove";
	}
	else
	{
		equipButton.title = "Equip";
	}
	lblItemNumberDescription.text = (selected_item_index + 1);
	selectedItemIcon.image = getThumbImage(Ti.App.GLBL_items_image[selected_item_index]);
	lblItemName.text = Ti.App.GLBL_items_title[selected_item_index];
	lblItemValue.text = "Value : " + Ti.App.GLBL_items_value[selected_item_index] + " gold";
	lblItemDescription.text = Ti.App.GLBL_items_description[selected_item_index];
}

function getInventoryDescriptionHeight()
{
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 170;
	}
	else
	{
		return 75;
	}
	return 0;
	
}
function getInventoryHeight()
{
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 445;
	}
	else
	{
		return 160;
	}
	return 0;
	
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
		return 30;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 15;
	}
}
function getButtonWidth()
{
	var winWidth = Ti.Platform.displayCaps.platformWidth;
	var winHeight = Ti.Platform.displayCaps.platformHeight;
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 90;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 30;
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
function getHeadingTextSize()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 22;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 12;
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
