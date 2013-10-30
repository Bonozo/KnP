function Leaderboards(userinfo) {
	var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var view = Ti.UI.createView({
		top : "23%",
		height : "78%",
		width : "100%"
	});
	var tabledata = [];
	
    var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
    var screenWidth = Titanium.Platform.displayCaps.platformWidth;
    var rowViewHeight = screenWidth * 0.190;
	var get_avatar_tasks_url = "http://bonozo.com:8080/knp/get_avatar_tasks.php?uid=" + userinfo.Record[0].UID;
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);

			// Create a Label.
			var active_task_name = Ti.UI.createLabel({
				text : items_json.Record.TASK_DESCRIPTION.NAME,
				color : '#b3fad0',
				font : {fontSize:'20dip'},
				top : '5%',
				textAlign : 'center'
			});
			view.add(active_task_name);
			var incomplete = false;
			if (items_json.Record.TASK_DETAILS != undefined) {
				var tasks = items_json.Record.TASK_DETAILS;
			    for (var i = 0; i < tasks.length; i++) {
			    	var checkbox_image = "";
			    	if(tasks[i].STATUS == "PENDING"){
			    		incomplete = true;
			    		checkbox_image = "tradeToggle_no.png";
			            var rowView = Ti.UI.createTableViewRow({
			                height : rowViewHeight,	
			                className : 'task_list',	
			                index : i,
			                backgroundImage : '/assets/overlayItemList_highlight.png',
			                zIndex : 10
			            });
			    	}
			    	else{
			    		checkbox_image = "tradeToggle_yes.png";
			            var rowView = Ti.UI.createTableViewRow({
			                height : rowViewHeight,
			                className : 'task_list',
			                index : i,
			                backgroundImage : '/assets/overlayItemList.png',
			                zIndex : 10
			            });
			    	}
			    	
					// Create an ImageView.
					var checkboxImage = Ti.UI.createImageView({
						image : '/assets/' + checkbox_image,
						width : '10%',
						left : '2%'
					});
					rowView.add(checkboxImage);
					
			        var gift_label = Ti.UI.createLabel({
			            text : tasks[i].TASK,
			            font : {
			                fontSize : '16dip'
			            },
			            color : '#b3fad0',
			            width : '85%',
			            left : '15%'
			        });
			        rowView.add(gift_label);
			        
			        tabledata.push(rowView);
			    }//end of for loop
				
				if(incomplete){
				    var tableview =  Ti.UI.createTableView({		backgroundColor : 'transparent', 		separatorColor : 'transparent',
		
				        data : tabledata,
				        width : '100%',
				        height : '70%',
				        top : '15%'
				    });
				    view.add(tableview);
				}
				else{
					var task_completed_label = Ti.UI.createLabel({
						text : 'You have completed all the tasks. \nNew tasks are in under development.',
						color : '#b3fad0',
						font : {fontSize:'18dip'},
						textAlign : 'center'
					});
					view.add(task_completed_label);
					tabledata = [];
				}
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : get_avatar_tasks_url
	});

	return view;

}

module.exports = Leaderboards; 