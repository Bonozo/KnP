var winWidth = Ti.Platform.displayCaps.platformWidth;
var winHeight = Ti.Platform.displayCaps.platformHeight;
var curr_bg_color = 0;

var bg_colors = ['Green','Red','Blue'];
var bg_color_codes = ['#8dc73f','#dd0a0a','#0a22dd'];

var curr_bg_image = 0;

var bg_images = ['BG 1','BG 2','BG 3'];
var bg_image_name = ['images/home_image_1.png','images/home_image_2.png','images/home_image_3.png'];

function getBGName()
{
	return bg_images[curr_bg_image]; 
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
function getBGPath(operation)
{
	switch (operation) 
	{
		case "plus":
			if(curr_bg_image < 2)
				return (bg_image_name[++curr_bg_image]);
			return (bg_image_name[curr_bg_image]);
			
		case "minus":
			if(curr_bg_image > 0)
				return (bg_image_name[--curr_bg_image]);
			return (bg_image_name[curr_bg_image]);
			
	}
}

function getColorName()
{
	return bg_colors[curr_bg_color]; 
}

function getColorCode(operation)
{
	switch (operation) 
	{
		case "plus":
			if(curr_bg_color < 2)
				return (bg_color_codes[++curr_bg_color]);
			return (bg_color_codes[curr_bg_color]);
			
		case "minus":
			if(curr_bg_color > 0)
				return (bg_color_codes[--curr_bg_color]);
			return (bg_color_codes[curr_bg_color]);
			
	}
}


function getButtonWidth()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 90;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 55;
	}
}
function getLabelWidth()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 145;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 75;
	}
}

function getRightArrowImageHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 45;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 22;
	}
}
function getRightArrowImageWidth()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 48;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 20;
	}
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
function getCrossHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 52;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 25;
	}
}
function getCrossWidth()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 56;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 28;
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
function getBottomPortionHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return ((winHeight/100)*30);
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return ((winHeight/100)*45);
	}
}

function getCustomizeOptionsHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return ((winHeight/100)*22);
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return ((winHeight/100)*42);
	}
}


