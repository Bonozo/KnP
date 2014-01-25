function openNewTable(userinfojson, activeTable, callback) {
	var TableView = require('ui/common/MenuScreen/' + activeTable);
	TableView(userinfojson, function(Tableview) {
		callback(Tableview);
	});
}

function QuestsHome(userinfo) {
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var screenHeight = Titanium.Platform.displayCaps.platformHeight;
	var activeTable = "MyQuest";
	var main_table_view;
	var tableview;

	//var ////actInd = Titanium.UI.createActivityIndicator();
	////actInd.message = 'Loading Main Screen...';

	var images_counter = 0;
	function hideLoader() {
		images_counter++;
		if (images_counter >= 2) {
			////actInd.hide();
		}
	}

	//message will only shows in android.
	var rowViewHeight = screenWidth * 0.20;

	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var view = Ti.UI.createView({
		top : "23.5%",
		height : "78%",
		width : "100%"
	});
	var subView = Ti.UI.createView({
		zIndex : 200,
		backgroundGradient : {
			type : 'linear',
			colors : ['#3258ad', '#010f49'],
			startPoint : {
				x : '50%',
				y : '0%'
			},
			endPoint : {
				x : '50%',
				y : '100%'
			},
			backFillStart : false
		},
		width : '100%',
		height : '100%'
	});

	function getPixelFromPercent(axis, percent) {
		if (axis == 'x') {
			return screenWidth * percent / 100;
		} else if (axis == 'y') {
			return screenHeight * percent / 100;
		}
	}
	var activityIndicatorView = Titanium.UI.createView({
		backgroundColor : '#FFFFFF',
		borderRadius : 10,
		borderColor : '#333333',
		borderWidth : '5dip',
		visible : false,
		height : '8%',
		width : (screenWidth / 2),
		left : getPixelFromPercent('x', 50) - (screenWidth / 4),
		top : getPixelFromPercent('x', 42),
		zIndex : 700
	});
	var activityIndicator = Ti.UI.createActivityIndicator({
		color : '#333333',
		font : {
			// fontFamily : 'Helvetica Neue',
			fontSize : '14dip',
			fontWeight : 'bold'
		},
		message : 'Loading...',
		style : (Ti.Platform.name === 'iPhone OS') ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK,
		height : '100%',
		width : '100%'
	});
	// activityIndicator.message = 'Loading...';
	activityIndicatorView.add(activityIndicator);
	view.add(activityIndicatorView);
	activityIndicator.show();
	activityIndicatorView.visible = true;


	openNewTable(userinfo, activeTable, function(tableview) {
		main_table_view = tableview;
		main_table_view.height = '60%';
		view.add(main_table_view);
		activityIndicator.hide();
		activityIndicatorView.visible = false;
	});

	// Create a Label.
	var freePlay_lbl = Ti.UI.createLabel({
		text : 'FREE PLAY: ',
		color : '#5afd9b',
		font : {
			fontSize : '16dip'
		},
		top : '65%',
		left : '5%',
		textAlign : 'center'
	});

	// Create an ImageView.
	var joustIcon = Ti.UI.createImageView({
		image : '/assets/joust_icon.png',
		width : rowViewHeight * (2 / 3),
		height : rowViewHeight * (2 / 3),
		top : '65%',
		left : '35%'
	});
	joustIcon.addEventListener('load', function() {
		Ti.API.info('Image loaded!');
	});
	view.add(joustIcon);
	joustIcon.addEventListener('click', function(e) {
		var SinglePlayGame = require('/ui/common/MenuScreen/SinglePlayGame');
		var singleplaygame = new SinglePlayGame('joust_game', 'INCOMPLETE', 80000003, userinfo);
		singleplaygame.open();
	});

	// Create an ImageView.
	var sonnetIcon = Ti.UI.createImageView({
		image : '/assets/sonnet_icon.png',
		width : rowViewHeight * (2 / 3),
		height : rowViewHeight * (2 / 3),
		top : '65%',
		left : '52%'
	});
	sonnetIcon.addEventListener('click', function() {
		var SinglePlayGame = require('/ui/common/MenuScreen/SinglePlayGame');
		var singleplaygame = new SinglePlayGame('sonnet_game', 'INCOMPLETE', 80000002, userinfo);
		//singleplaygame.open();
	});
	view.add(sonnetIcon);

	// Create an ImageView.
	var archeryIcon = Ti.UI.createImageView({
		image : '/assets/archery_icon.png',
		width : rowViewHeight * (2 / 3),
		height : rowViewHeight * (2 / 3),
		top : '65%',
		left : '69%'
	});
	archeryIcon.addEventListener('click', function() {
		var SinglePlayGame = require('/ui/common/MenuScreen/SinglePlayGame');
		var singleplaygame = new SinglePlayGame('archery_game', 'INCOMPLETE', 80000001, userinfo);
		//////actInd.show();
		//singleplaygame.open();

	});
	view.add(archeryIcon);

	// Create an ImageView.
	var cookingIcon = Ti.UI.createImageView({
		image : '/assets/cooking_icon.png',
		width : rowViewHeight * (2 / 3),
		height : rowViewHeight * (2 / 3),
		top : '65%',
		left : '85%'
	});
	cookingIcon.addEventListener('click', function() {
		var SinglePlayGame = require('/ui/common/MenuScreen/SinglePlayGame');
		var singleplaygame = new SinglePlayGame('cooking_game', 'INCOMPLETE', 80000004, userinfo);
		//singleplaygame.open();
	});
	view.add(cookingIcon);

	// Add to the parent view.
	view.add(freePlay_lbl);

	var sortby_lbl = Ti.UI.createLabel({
		text : 'SORT BY: ',
		color : '#5afd9b',
		font : {
			fontSize : '16dip'
		},
		bottom : '15.1%',
		left : '2%',
		textAlign : 'center'
	});

	view.add(sortby_lbl);
	var my_quest = Ti.UI.createButton({
		color : '#761f56',
		font : {
			fontSize : '9dip'
		},
		backgroundImage : '/assets/button_small_UP.png',
		title : 'MY QUEST',
		height : '6.5%',
		left : '30%',
		bottom : '15.1%',
		width : '18%'
	});
	view.add(my_quest);
	my_quest.addEventListener('click', function(e) {
		activityIndicator.show();
		activityIndicatorView.visible = true;
		view.remove(main_table_view);
		main_table_view = null;
		activeTable = 'MyQuest';
		openNewTable(userinfo, activeTable, function(tableview) {
			main_table_view = tableview;
			main_table_view.height = '60%';
			view.add(main_table_view);
			activityIndicator.hide();
			activityIndicatorView.visible = false;
		});
	});

	var freind_quest = Ti.UI.createButton({
		color : '#761f56',
		font : {
			fontSize : '9dip'
		},
		backgroundImage : '/assets/button_small_UP.png',
		title : 'FRIEND QUEST',
		height : '6.5%',
		left : '50%',
		bottom : '15.1%',
		width : '24%'
	});
	view.add(freind_quest);
	freind_quest.addEventListener('click', function(e) {
		Ti.App.fireEvent('clear_quest_intervals', {
		});
		view.remove(main_table_view);
		main_table_view = null;
		activeTable = 'FreindQuestTab';
		activityIndicator.show();
		activityIndicatorView.visible = true;
		openNewTable(userinfo, activeTable, function(tableview) {
			activityIndicator.hide();
			activityIndicatorView.visible = false;
			main_table_view = tableview;
			main_table_view.height = '60%';
			view.add(main_table_view);
		});
	});

	var quest_log = Ti.UI.createButton({
		color : '#761f56',
		backgroundImage : '/assets/button_small_UP.png',
		font : {
			fontSize : '9dip'
		},
		title : 'QUEST LOG',
		height : '6.5%',
		left : '76%',
		bottom : '15.1%',
		width : '20%'
	});
	view.add(quest_log);
	quest_log.addEventListener('click', function(e) {
		activityIndicator.show();
		activityIndicatorView.visible = true;
		Ti.App.fireEvent('clear_quest_intervals', {
		});
		view.remove(main_table_view);
		main_table_view = null;
		activeTable = 'QuestLog';
		openNewTable(userinfo, activeTable, function(tableview) {
			activityIndicator.hide();
			activityIndicatorView.visible = false;
			main_table_view = tableview;
			main_table_view.height = '60%';
			view.add(main_table_view);
		});
	});

	///////////////////////////////////////////////////////////////////////////////////

	return view;

}

module.exports = QuestsHome;
