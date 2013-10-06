function Settings(){
    var winWidth = Ti.Platform.displayCaps.platformWidth;
    var winHeight = Ti.Platform.displayCaps.platformHeight;
	var desired_width_percent = 48;
	var desired_height_percent = 100;

	var desired_thumb_width_percent = 10;
	var desired_thumb_height_percent = 10;

    function getPixelFromPercent(axis, percent) {
        if (axis == 'x') {
            return winWidth * percent / 100;
        } else if (axis == 'y') {
            return winHeight * percent / 100;
        }
    }
	function getRespectiveHeight(width,ratio){
		return width * ratio;
	}
	function getRespectiveWidth(height,ratio){
		return height / ratio;
	}
	var avatar_propotions_ratio = 1.585;
	var avatar_thumb_propotions_ratio = 1.0;
	var desired_height_pixels = getPixelFromPercent('x',desired_height_percent);
	var desired_thumb_height_pixels = getPixelFromPercent('x',desired_thumb_height_percent);
	return {
		avatar_width : getRespectiveWidth(desired_height_pixels,avatar_propotions_ratio),
		avatar_height : desired_height_pixels,
		avatar_thumb_width : getRespectiveWidth(desired_thumb_height_pixels,avatar_thumb_propotions_ratio),
		avatar_thumb_height : desired_thumb_height_pixels
	};
};
module.exports = Settings;