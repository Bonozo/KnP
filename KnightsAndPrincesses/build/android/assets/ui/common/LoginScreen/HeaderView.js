//FirstView Component Constructor
function HeaderView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

	var label = Ti.UI.createLabel({
		color : '#000000',
		text : "SIGN IN",
		color : "#48d48d",
		height : 'auto',
		width : 'auto',
		top : "0%",
		left : "40%",
		zIndex : 100,
		textAlign : 'centre'
	});

	var imageView = Ti.UI.createImageView({
		zIndex : 50,
		top : 0,
		image : "/assets/overlayTitleStarCurtains.png"
	});
	imageView.add(label);
	self.add(imageView);

	return self;
}

module.exports = HeaderView;