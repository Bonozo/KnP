function StatusMain(param){
	var self = Ti.UI.createWindow({
		navBarHidden : true,
		backgroundColor : '#CCC'
	});
	
	// Create an backgroundView.
	var backgroundView = Ti.UI.createView({
		backgroundColor : '#2A4B37'
	});
	self.add(backgroundView);
	// Create an ImageView.
	var characterImageView = Ti.UI.createImageView({
		image : 'images/hdpi_female_character_gray.png',
		width : "95%"
	});
	characterImageView.addEventListener('load', function() {
		Ti.API.info('Image loaded!');
	});
	// Add to the parent view.
	self.add(characterImageView);
	
	
	var current_top = 0;
	var leftBarView = Ti.UI.createView({
		width : 120,
		height : 480,
		top : current_top,
		left : 0		
	});
	self.add(leftBarView);
	current_top = 10;
	
	// Create a Label.
	var statusLabel = Ti.UI.createLabel({
		text : 'STATUS',
		color : '#5AFF9D',
		font : {fontSize:20,fontFamily : Ti.App.GLBL_default_font},
		top : current_top,
		textAlign : 'center'
	});
	leftBarView.add(statusLabel);
	current_top += 5;
	
	var crownImageView = Ti.UI.createImageView({
		image : 'images/status/iconStatus.png',
		left : 2,
		top : current_top,
		width : "100%",
		height : 100
	});
	leftBarView.add(crownImageView);
	current_top += 100;
	
	var inventoryImageView = Ti.UI.createImageView({
		image : 'images/status/iconInventory.png',
		top : current_top,
		left : 5,
		width : 54,
		height : 54
	});
	inventoryImageView.addEventListener('click',function(e){
		Titanium.UI.createWindow({
			url : 'inventory.js'
		}).open();
	});
	leftBarView.add(inventoryImageView);
	current_top += 60;

	var friendsImageView = Ti.UI.createImageView({
		image : 'images/status/iconFriends.png',
		top : current_top,
		left : 5,
		width : 54,
		height : 54
	});
	friendsImageView.addEventListener('click',function(e){
		Titanium.UI.createWindow({
			url : 'friend_interactions.js'
		}).open();
	});
	leftBarView.add(friendsImageView);
	current_top += 60;

	var questImageView = Ti.UI.createImageView({
		image : 'images/status/iconQuests.png',
		top : current_top,
		left : 5,
		width : 54,
		height : 54
	});
	questImageView.addEventListener('click',function(e){
		Titanium.UI.createWindow({
			url : 'quests_home.js'
		}).open();
	});
	leftBarView.add(questImageView);
	current_top += 60;

	var leaderBoardImageView = Ti.UI.createImageView({
		image : 'images/status/iconLeaderboards.png',
		top : current_top,
		left : 5,
		width : 54,
		height : 54
	});
	leftBarView.add(leaderBoardImageView);
	current_top += 60;

	var customizeBackgroundImageView = Ti.UI.createImageView({
		image : 'images/status/iconCustomizeBackground.png',
		top : current_top,
		left : 5,
		width : 54,
		height : 54
	});
	customizeBackgroundImageView.addEventListener('click',function(e){
		Titanium.UI.createWindow({
			url : 'level2.js'
		}).open();
	});
	leftBarView.add(customizeBackgroundImageView);
	current_top += 60;

	var optionsImageView = Ti.UI.createImageView({
		image : 'images/status/iconOptions.png',
		top : current_top,
		left : 5,
		width : 54,
		height : 54
	});
	leftBarView.add(optionsImageView);
	current_top += 60;
	
	current_top = 115;
	
	// Create a Label.
	var inventoryLabel = Ti.UI.createLabel({
		color : '#5aff9d',
		font : {fontSize:18,fontFamily : Ti.App.GLBL_default_font},
		height : 54,
		top : current_top ,
		left : 64,
		textAlign : 'center'
	});
	current_top += 60;
	leftBarView.add(inventoryLabel);
	
	var friendsLabel = Ti.UI.createLabel({
		color : '#5aff9d',
		font : {fontSize:18,fontFamily : Ti.App.GLBL_default_font},
		height : 54,
		top : current_top ,
		left : 64,
		textAlign : 'center'
	});
	current_top += 60;
	leftBarView.add(friendsLabel);
	
	var questLabel = Ti.UI.createLabel({
		color : '#5aff9d',
		font : {fontSize:18,fontFamily : Ti.App.GLBL_default_font},
		height : 54,
		top : current_top,
		left : 64,
		textAlign : 'center'
	});
	current_top += 60;
	leftBarView.add(questLabel);
	
	var leaderBoardLabel = Ti.UI.createLabel({
		color : '#5aff9d',
		font : {fontSize:18,fontFamily : Ti.App.GLBL_default_font},
		height : 54,
		top : current_top ,
		left : 64,
		textAlign : 'center'
	});
	current_top += 60;
	leftBarView.add(leaderBoardLabel);
	
	var customizeBackgroundLabel = Ti.UI.createLabel({
		color : '#5aff9d',
		font : {fontSize:18,fontFamily : Ti.App.GLBL_default_font},
		height : 54,
		top : current_top ,
		left : 64,
		textAlign : 'center'
	});
	current_top += 60;
	leftBarView.add(customizeBackgroundLabel);
	
	var optionLabel = Ti.UI.createLabel({
		color : '#5aff9d',
		font : {fontSize:18,fontFamily : Ti.App.GLBL_default_font},
		height : 54,
		top : current_top ,
		left : 64,
		textAlign : 'center'
	});
	leftBarView.add(optionLabel);
	
	current_top += 2*60;
	var requiredQuest = Ti.UI.createView({
		backgroundColor : '#000000',
		top : current_top,
		opacity : 0.5,
		height : 20,
		left : 0,
		width : 240 
	});
	var reuquireQuestsLbl = Ti.UI.createLabel({
		text : '12 QUESTS TO NEXT LEVEL',
		color : '#5aff9d',
		font : {fontSize:12,fontFamily : Ti.App.GLBL_default_font}
	});
	
	requiredQuest.add(reuquireQuestsLbl);
	self.add(requiredQuest);
	
	current_top += 50;
	var requiredFriends = Ti.UI.createView({
		backgroundColor : '#000000',
		top : current_top,
		opacity : 0.5,
		height : 20,
		left : 0,
		width : 240 
	});
	var requiredFriendsLbl = Ti.UI.createLabel({
		text : '12 FRIENDSTO NEXT LEVEL',
		opacity : 0.9,
		color : '#5aff9d',
		font : {fontSize:12,fontFamily : Ti.App.GLBL_default_font}
	}); 
	requiredFriends.add(requiredFriendsLbl);
	self.add(requiredFriends);
	current_top += 50;
	

	var GoldView = Ti.UI.createView({
		top : current_top,
		left : 0,
		height : 65,
		width : 130
	});
	self.add(GoldView);
	
	var goldImageView = Ti.UI.createImageView({
		left : 5,
		image : "images/status/iconGold.png",
		width : 60,
		height : 60
	});
	GoldView.add(goldImageView);
	

function getGold(callback) {
	//alert('Enter!');
	var url = "http://justechinfo.com/kap_server/get_golds.php?uid=" + Ti.App.GLBL_uid;
	var rec;
	//,UID;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				//alert(rec.TOTAL_UNIT);
				//Goldlbl.setText = rec.TOTAL_UNIT;
				//num_of_golds = rec.TOTAL_UNIT;

				callback(rec.TOTAL_UNIT);

			} else {
				alert('Some error occured!');
			}

		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			alert('There was an error retrieving the remote data. Try again.');
		},
		timeout : 5000
	});
	xhr.open("GET", url);
	xhr.send();
}
getGold(function(num_of_golds){
	var goldImageLbl = Ti.UI.createLabel({
		text : num_of_golds,
		color : '#ECB936',
		font : {fontSize:22,fontFamily : Ti.App.GLBL_default_font},
		left : 75,
		textAlign : 'center'
	});
	GoldView.add(goldImageLbl);
});


	var calendatView = Ti.UI.createView({
		top : current_top,
		right : 0,
		height : 65,
		width : 220
	});
	var calendarImageView = Ti.UI.createImageView({
		image : "images/status/overlayCalendar.png",
		right : 5,
		width : 60,
		height : 60
	});
	calendatView.add(calendarImageView);

	// Create a Label.
	var daysLbl = Ti.UI.createLabel({
		text : '12',
		color : '#00311f',
		font : {
			fontSize : 24
		},
		right : 25,
		bottom : 10,
		textAlign : 'center'
	});
	calendatView.add(daysLbl);

	var maritialImageView = Ti.UI.createImageView({
		image : "images/status/iconMarriageSingle.png",
		right : 70,
		width : 50,
		height : 50
	});
	calendatView.add(maritialImageView); 
	
	// Create a Label.
	var maritialStatusView = Ti.UI.createLabel({
		color : '#5AFF9D',
		font : {fontSize:20,fontFamily : Ti.App.GLBL_default_font},
		right : 120,
		textAlign : 'center'
	});
	
	// Add to the parent view.
	calendatView.add(maritialStatusView);
	self.add(calendatView);

	current_top += 65;


	var NameView = Ti.UI.createView({
		top : current_top,
		left : 0,
		height : 40,
		width : "100%"
	});
	self.add(NameView);
	current_top += 40;
	var avatarImageView = Ti.UI.createImageView({
		left : 5,
		image : "images/status/iconFemaleAvatarName.png",
		width : 40,
		height : 40
	});
	NameView.add(avatarImageView);
	// Create a Label.
	var nameLbl = Ti.UI.createLabel({
		color : '#5AFF9D',
		font : {fontSize:20},
		left : 50,
		textAlign : 'center'
	});
	NameView.add(nameLbl);
	// Create a Label.
	var genderLbl = Ti.UI.createLabel({
		color : '#5AFF9D',
		font : {fontSize:20},
		right : 5,
		textAlign : 'left'
	});
	NameView.add(genderLbl);

	current_top = 115;
	for(var i = 0; i < 7; i++){
		self.add(Ti.UI.createImageView({
			image : "images/status/iconBlank.png",
			top : current_top,
			right : 5,
			width : 55,
			height : 55
		}));
		current_top += 65;
	}
	/*
	 * Footer
	 */
	var footerView = Ti.UI.createView({
		backgroundImage : 'images/status/overlayPlayerInfo.png',
		height : 80,
		bottom : 0		
	});
	self.add(footerView);
	
	// Create a Label.
	var levelLabel = Ti.UI.createLabel({
		text : 'LEVEL 1',
		color : '#5aff9d',
		font : {fontSize:20,fontFamily : Ti.App.GLBL_default_font},
		top : 10,
		left : 10,
		textAlign : 'center'
	});
	
	// Add to the parent view.
	footerView.add(levelLabel);
	
	var levelBackgroundView = Ti.UI.createView({
		backgroundColor : '#060e09',
		height : 25,
		width : 290,
		top : 7,
		left : 95,
		zIndex : 50
	});
	footerView.add(levelBackgroundView);
	
	
	// Create a Label.
	var levelLabel = Ti.UI.createLabel({
		text : '',
		color : '#5AFF9D',
		font : {fontSize:20,fontFamily : Ti.App.GLBL_default_font},
		top : 7,
		right : 5,
		textAlign : 'center'
	});
	footerView.add(levelLabel);
	
	//XPBar
	var XPBarView = Ti.UI.createView({
		backgroundImage : 'images/status/XPBar.png',
		height : "100%",
		width : 0,
		left : 0,
		top : 0,
		zIndex : 100
	});
	levelBackgroundView.add(XPBarView);
	
	// Create a Label.
	var energyLabel = Ti.UI.createLabel({
		text : 'ENERGY',
		color : '#5aff9d',
		font : {fontSize:20,fontFamily : Ti.App.GLBL_default_font},
		top : 50,
		left : 10,
		textAlign : 'center'
	});
	
	// Add to the parent view.
	footerView.add(energyLabel);
	
	var energyBackgroundView = Ti.UI.createView({
		backgroundColor : '#060e09',
		height : 25,
		width : 290,
		top : 45,
		left : 95
	});
	footerView.add(energyBackgroundView);
	
	//XPBar
	var EnergyBarView = Ti.UI.createView({
		backgroundImage : 'images/status/ENERGYBar.png',
		height : "100%",
		width : 0,
		left : 0,
		top : 0,
		zIndex : 100
	});
	energyBackgroundView.add(EnergyBarView);
	
	
	// Create a Label.
	var energyLabel = Ti.UI.createLabel({
		text : '',
		color : '#5AFF9D',
		font : {fontSize:20,fontFamily : Ti.App.GLBL_default_font},
		top : 45,
		right : 5,
		textAlign : 'center'
	});
	
	// Add to the parent view.
	footerView.add(energyLabel);


	function getAvatarInfo() {
	//alert('Enter!');
	var url = "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + Ti.App.GLBL_uid;
	var rec;
	//,UID;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				friendsLabel.text  = rec.NUM_OF_FRIENDS;
				questLabel.text = rec.NUM_OF_QUESTS;
				// maritialImageView.image = '';
				maritialStatusView.text = rec.MARITIAL_STATUS;
				nameLbl.text = rec.NAME;
				genderLbl.text = rec.GENDER;
				inventoryLabel.text = rec.NUM_OF_INV;
				// alert(JSON.stringify(json));				//callback(rec.NUM_OF_FRIEND,rec.NUM_OF_QUESTS,'maritialImageView.image',rec.MARITIAL_STATUS,rec.NAME,rec.GENDER);
			} else {
				alert('Some error occured!');
			}
		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			alert('There was an error retrieving the remote data. Try again.');
		},
		timeout : 5000
	});
	xhr.open("GET", url);
	xhr.send();
}
getAvatarInfo();


function getXPAndEnergy(callback) {
	//alert('Enter!');
	var url = "http://justechinfo.com/kap_server/get_avatar_info.php?uid=" + Ti.App.GLBL_uid;
	var rec;
	//,UID;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			json = JSON.parse(this.responseText);
			if (json.Record != undefined) {
				rec = json.Record[0];
				callback(rec.XP, rec.ENERGY, rec.LEVEL);
			} else {
				alert('Some error occured!');
			}
		},
		onerror : function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR: " + e.error);
			alert('There was an error retrieving the remote data. Try again.');
		},
		timeout : 5000
	});
	xhr.open("GET", url);
	xhr.send();
}

//numberOfFriends
var numberOfFriends;
getXPAndEnergy(function(xp_val, energy_val, level_val) {
	var xp_max_val = level_val * 1000 + 1000, energy_max_val = level_val * 1000;
	XPBarView.width = "" + ((xp_val / xp_max_val) * 100) + "%";
	levelLabel.text = xp_val + "/" + xp_max_val;
	
	EnergyBarView.width = "" + ((energy_val / energy_max_val) * 100) + "%";
	energyLabel.text = "" + ((energy_val / energy_max_val) * 100) + "%";

});


	
	return self;
};