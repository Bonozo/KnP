function CurtainHeader(text) {
	this.text = text;
}

CurtainHeader.prototype.createHeader = function() {
	var header_view = Ti.UI.createView({
		top : 0,
		height : 45,
		backgroundImage : '/images/overlayTitleStarCurtains.png',
	});
	
	// Create a Label.
	var headerText = Ti.UI.createLabel({
		text : this.text,
		color : '#6EECB0',
		font : {fontSize:28},
		textAlign : 'center'
	});
	
	// Add to the parent view.
	header_view.add(headerText);
	return header_view; 
	
};

module.exports = CurtainHeader; 