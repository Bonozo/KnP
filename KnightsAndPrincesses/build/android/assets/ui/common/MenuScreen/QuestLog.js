function QuestLog(userinfo, callback) {
	//var //actInd = Titanium.UI.createActivityIndicator();
	//actInd.message = 'Loading...';
	//message will only shows in android.
	//actInd.show();
	var view = Ti.UI.createView({
		top : "0%",
		height : "100%",
		width : "100%"
	});

	var QuestLog = Ti.UI.createLabel({
 		text : 'Quest Log',
		color : '#5afd9b',
		font : {
			fontSize : '13dip'
		},
		top : '15%',
		width : '100%',
		textAlign : 'center'
	});

	view.add(QuestLog);
	var QuestCompleted = Ti.UI.createLabel({
 		text : 'TOTAL QUESTS COMPLETED:',
		color : '#5afd9b',
		font : {
			fontSize : '13dip'
		},
		top : '30%',
		width : '100%',
		textAlign : 'center'
	});

	view.add(QuestCompleted);
	var QuestCompletedNum = Ti.UI.createLabel({
		color : '#5afd9b',
		font : {
			fontSize : '13dip'
		},
		top : '38%',
		width : '100%',
		textAlign : 'center'
	});

	view.add(QuestCompletedNum);
	var QuestCompletedMe = Ti.UI.createLabel({
 		text : 'QUESTS COMPLETED FOR ME:',
		color : '#5afd9b',
		font : {
			fontSize : '13dip'
		},
		top : '48%',
		width : '100%',
		textAlign : 'center'
	});

	view.add(QuestCompletedMe);
	var QuestCompletedMeNum = Ti.UI.createLabel({
		color : '#5afd9b',
		font : {
			fontSize : '13dip'
		},
		top : '56%',
		width : '100%',
		textAlign : 'center'
	});

	view.add(QuestCompletedMeNum);

	var XpEarned = Ti.UI.createLabel({
 		text : 'XP EARNED:',
		color : '#5afd9b',
		font : {
			fontSize : '13dip'
		},
		top : '66%',
		width : '100%',
		textAlign : 'center'
	});

	view.add(XpEarned);
	var XpEarnedNum = Ti.UI.createLabel({
		color : '#5afd9b',
		font : {
			fontSize : '13dip'
		},
		top : '74%',
		width : '100%',
		textAlign : 'center'
	});

	view.add(XpEarnedNum);
	var FreindsEarned = Ti.UI.createLabel({
		text : 'FREINDS EARNED:',
		color : '#5afd9b',
		font : {
			fontSize : '13dip'
		},
		top : '84%',
		width : '100%',
		textAlign : 'center'
	});

	view.add(FreindsEarned);
	var FreindsEarnedNum = Ti.UI.createLabel({
		color : '#5afd9b',
		font : {
			fontSize : '13dip'
		},
		top : '92%',
		width : '100%',
		textAlign : 'center'
	});

	view.add(FreindsEarnedNum);
	////actInd.hide();
	callback(view);
	////actInd.show();
	//http://bonozo.com:8080/knp/knp_quest_log.php?uid=10000007
	var reset_option_url = "http://bonozo.com:8080/knp/knp_quest_log.php?uid=" + userinfo.Record[0].UID;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			Ti.App.fireEvent('update_footer', {
				clicked_item : 'QuestLog'
			});

			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				if (items_json.Record.Message != '') {
					QuestCompletedNum.text = items_json.Record.TOTAL_QUESTS_COMPLETED;
					QuestCompletedMeNum.text = items_json.Record.QUESTS_COMPLETED_FOR_ME;
					//actInd.hide();
				}
			}

		},
		method : 'GET',
		contentType : 'text/xml',
		url : reset_option_url
	});

	var httpclientt = require('/ui/common/Functions/function');

	httpclientt.requestServer({
		success : function(e) {
			var userinfojson = JSON.parse(this.responseText);
			if (userinfojson.Record != undefined) {
					XpEarnedNum.text = userinfojson.Record[0].XP;
					FreindsEarnedNum.text = userinfojson.Record[0].NUM_OF_FRIENDS;
					//actInd.hide();
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_avatar_info.php?uid=" + userinfo.Record[0].UID + "",
	});


}

module.exports = QuestLog;
