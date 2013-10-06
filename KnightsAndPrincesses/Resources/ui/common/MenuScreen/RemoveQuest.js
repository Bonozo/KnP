function RemoveQuest(assign_quest_id,index,remover){
	var in_process = false;
	var remove_window = Titanium.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
	var view = Ti.UI.createView({
		backgroundImage : '/assets/listFemaleInfo.png',
		width : '100%',
		height : '30%',
		top : '35%'
	});

	// Create a Label.
	var sure = Ti.UI.createLabel({
		text : 'Are you sure you want to remove \nthis quest?',
		color : '#FFFFFF',
		font : {
			fontSize : '14dp'
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	view.add(sure);
	var cancel_button = Ti.UI.createButton({
		title : 'Cancel',
		color : '#000000',
		textAlign : 'center',
		bottom : '10%',
		height : '20%',
		left : '10%',
		backgroundImage : '/assets/button_small_UP.png'
	});
	cancel_button.addEventListener('click', function(e) {
		remove_window.close();
	});
	view.add(cancel_button);
	
	var remove_button = Ti.UI.createButton({
		title : 'Remove',
		color : '#000000',
		textAlign : 'center',
		bottom : '10%',
		height : '20%',
		right : '10%',
		backgroundImage : '/assets/button_small_UP.png',
		zIndex : 100
	});
	remove_button.addEventListener('click', function() {
		// remove_button.
		if (!in_process) {
			in_process = !in_process;
			var _url = "http://bonozo.com:8080/knp/remove_quest.php?assign_quest_id=" + assign_quest_id + "&remover=" + remover;
			// alert(_url);
			var items_json = "";
			var items_length = 0;
			var httpclientt = require('/ui/common/Functions/function');
			httpclientt.requestServer({
				success : function(e) {
					items_json = JSON.parse(this.responseText);
					//alert(JSON.stringify(items_json));
					if (items_json.Record != undefined) {
						if(remover == 'ASSIGNEE'){
				            Ti.App.fireEvent('remove_my_quest', {
				            	index : index,
				            	message : items_json.Record.Message
				            });
						}
						else{
				            Ti.App.fireEvent('remove_friend_quest', {
				            	index : index,
				            	message : items_json.Record.Message
				            });
						}
			            alert(items_json.Record.Message);
						remove_window.close();
						in_process = !in_process;
					}
				},
				method : 'GET',
				contentType : 'text/xml',
				url : _url
			});
		}
		//actInd.show();
	});
	view.add(remove_button);
	remove_window.add(view);
	return remove_window;
	
}
module.exports = RemoveQuest;