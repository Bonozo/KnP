function StatusMain(_args) {
	var self = Ti.UI.createWindow({
		exitOnClose : false,
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '50%',
				y : '100%'
			},
			endPoint : {
				x : '50%',
				y : '0%'
			},
			colors : [{
				color : '#000d44',
				offset : 0.0
			}, {
				color : '#1340a7',
				offset : 1.0
			}],
		}
	});

	// Create a Button.
	var aButton = Ti.UI.createButton({
		title : 'aButton',
		height : 30,
		bottom : 10
	});
	aButton.addEventListener('click', function() {
		alert('global_vars.uid: ' + _args.uid);
	});
	// self.add(aButton);	
	// Create a Label.
	var inProgress = Ti.UI.createLabel({
		text : 'In Progress...',
		color : '#000000',
		font : {fontSize:16},
		textAlign : 'center'
	});
	
	// Add to the parent view.
	self.add(inProgress);

	return self;

}

module.exports = StatusMain;