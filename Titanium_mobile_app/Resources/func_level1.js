//var gender = Titanium.App.Properties.getString("gender");	
var winWidth = Ti.Platform.displayCaps.platformWidth;
var winHeight = Ti.Platform.displayCaps.platformHeight;

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getCharacterImage()
{
	return "images/hdpi_"+Ti.App.GLBL_gender+"_character_"+Ti.App.GLBL_skin_color+".png";
}

function setProperty(property_name,operation)
{
	switch (property_name) 
	{
		case "hair_stlyes":
			//alert("case : face");
			if(operation == 'plus' && Ti.App.GLBL_curr_hair_stlyes < 2)
				return (Ti.App.GLBL_hair_stlyes[++Ti.App.GLBL_curr_hair_stlyes]);
			if(operation == 'minus' && Ti.App.GLBL_curr_hair_stlyes > 0)
				return (Ti.App.GLBL_hair_stlyes[--Ti.App.GLBL_curr_hair_stlyes]);
			else
				return Ti.App.GLBL_hair_stlyes[Ti.App.GLBL_curr_hair_stlyes];
			
		case "hair_color":
			//alert("case : hair_color");
			if(operation == 'plus' && Ti.App.GLBL_curr_hair_color < 1)
				return (Ti.App.GLBL_hair_color[++Ti.App.GLBL_curr_hair_color]);
			if(operation == 'minus' && Ti.App.GLBL_curr_hair_color > 0)
				return (Ti.App.GLBL_hair_color[--Ti.App.GLBL_curr_hair_color]);
			else
				return Ti.App.GLBL_hair_color[Ti.App.GLBL_curr_hair_stlyes];
			
		case "skin_tone":
			//alert("case : skin_tone");
			if(operation == 'plus' && Ti.App.GLBL_curr_skin_tone < 2)
				return (Ti.App.GLBL_skin_tone[++Ti.App.GLBL_curr_skin_tone]);
			if(operation == 'minus' && Ti.App.GLBL_curr_skin_tone > 0)
				return (Ti.App.GLBL_skin_tone[--Ti.App.GLBL_curr_skin_tone]);
			else
				return Ti.App.GLBL_skin_tone[Ti.App.GLBL_curr_skin_tone];
			
		case "face":
			//alert("case : face");
			if(operation == 'plus' && Ti.App.GLBL_curr_face < 2)
				return (Ti.App.GLBL_face[++Ti.App.GLBL_curr_face]);
			if(operation == 'minus' && curr_face > 0)
				return (Ti.App.GLBL_face[--Ti.App.GLBL_curr_face]);
			else
				return Ti.App.GLBL_face[Ti.App.GLBL_curr_face];
			
		case "clothing":
			//alert("case : clothing");
			if(Ti.App.GLBL_operation == 'plus' && Ti.App.GLBL_curr_clothing < 2)
				return (Ti.App.GLBL_clothing[++Ti.App.GLBL_curr_clothing]);
			if(operation == 'minus' && curr_clothing > 0)
				return (Ti.App.GLBL_clothing[--Ti.App.GLBL_curr_clothing]);
			else
				return Ti.App.GLBL_clothing[Ti.App.GLBL_curr_clothing];
			
		case "color_scheme":
			//alert("case : color_scheme");
			if(operation == 'plus' && Ti.App.GLBL_curr_color_scheme < 2)
				return (Ti.App.GLBL_color_scheme[++Ti.App.GLBL_curr_color_scheme]);
			if(operation == 'minus' && Ti.App.GLBL_curr_color_scheme > 0)
				return (Ti.App.GLBL_color_scheme[--Ti.App.GLBL_curr_color_scheme]);
			else
				return Ti.App.GLBL_color_scheme[Ti.App.GLBL_curr_color_scheme];
	}
}

function getRandomNumber(minVal,maxVal)
{
	var randVal = minVal + (Math.random()*(maxVal-minVal));
	return Math.round(randVal);
}

function blankSpace()
{
	if(winWidth >= 480 && winHeight >= 800)
	{
		return getStylesRowHeight()/2;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 2;
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
function getButtonHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 35;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 17;
	}
}
function getImageWidth(imageName)
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		switch (imageName) 
		{
			case "female":
				return 254;
			case "male":
				return 152;
				
		}
	}
	else
	{
		switch (imageName) 
		{
			case "female":
				return 50;
			case "male":
				return "95%";
				
		}
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
				return 400;
			case "male":
				return 378;
				
		}
	}
	else
	{
		switch (imageName) 
		{
			case "female":
				return 405;
			case "male":
				return 203;
				
		}
	}
	return 0;
	
}
function getArrowImageX()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 8;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 4;
	}
}
function getArrowImageY()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 8;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 4;
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
		return 40;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 20;
	}
}
function getHairStyleRowY()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 30;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 0;
	}
}
function getStylesRowHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 60;
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
function getDescriptionTextHeight()
{
	//480×800
	if(winWidth >= 480 && winHeight >= 800)
	{
		return 70;
	}
	else if(winWidth < 480 && winHeight < 800)
	{
		return 26;
	}
}
