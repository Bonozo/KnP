function CookingGame(quest_status, quest_id, userinfo) {
    var played = false;
    var _assign_quest_id = "";
    var images_counter = 0;

	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
        backgroundImage : 'assets/inventoryBackground.png',
		navBarHidden : true,
		fullscreen : true
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
/*
    var self = Ti.UI.createWindow({
        orientation : Ti.UI.PORTRAIT,
        backgroundImage : 'assets/inventoryBackground.png',
        navBarHidden : true,
        fullscreen : true
    });
*/    
    var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height:'6.4%',
		width : '100%',
		bottom : '94.6%'
    });
    self.add(top_imageview);

    var name_label = Titanium.UI.createLabel({
        text : userinfo.Record[0].NAME,
        top : '0',
        height : '3.1%',
        left : '3%',
        textAlign : 'left',
        color : '#5afd9b',
        font : {
            fontWeight : 'bold',
            fontSize : '12dip'
        }
    });
    self.add(name_label);

    var txt_label = Titanium.UI.createLabel({
        text : 'back',
        top : '0',
        height : '3.1%',
        right : '8%',
        textAlign : 'left',
        color : '#5afd9b',
        font : {
            fontWeight : 'bold',
            fontSize : '12dip'
        }
    });
    self.add(txt_label);

    var return_imageview = Titanium.UI.createImageView({
        image : '/assets/iconReturn.png',
        height : '8%',
        width : '11.6%',
        top : '1%',
        right : '3%'
    });
    self.add(return_imageview);
    
    return_imageview.addEventListener('click', function(e) {
        self.close();
    });
	
	// Create a Label.
	var heading_label = Ti.UI.createLabel({
		text : 'Cooking',
		color : '#5afd9b',	
	    font : {
            fontWeight : 'bold',
            fontSize : '16dip'
          },
		top : '10%',
		left : '5%',
		textAlign : 'center'
	});
	
	// Add to the parent view.
	self.add(heading_label);
	
    
    // Create a Button.
    var userExistingRecipes = Ti.UI.createButton({ color: '#761f56',
        title : 'Use Existing Recipe',
        top : '20%',
        backgroundImage : '/assets/button_large_UP.png',
        height : '10%',
        width : '60%'
    });
    
    // Listen for click events.
    userExistingRecipes.addEventListener('click', function() {
        var CookingRecipes = require('/ui/common/games/CookingRecipes');
        var cookingrecipes = new CookingRecipes(userinfo);
        cookingrecipes.open();
    });
    
    // Add to the parent view.
    self.add(userExistingRecipes);
	
	//Time counter class
	var temp = '';
    var updateTimerID = 0
    var cooking_time = [];
    var status_counter = '';
    var update_counter = [];
    var countDown = function(h, m, s, _instance_index, fn_tick, fn_end) {
        return {
            total_sec : h * 60 * 60 + m * 60 + s,
            timer : this.timer,
            instance_index : _instance_index,
            set : function(h, m, s) {
                this.total_sec = parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
                this.time = {
                    h : h,
                    m : m,
                    s : s
                };
                return this;
            },
            start : function() {
                var self = this;
                this.timer = setInterval(function() {
                    //alert('running');
                    if (self.total_sec) {
                        self.total_sec--;
                        var hour = parseInt(self.total_sec / (60 * 60));
                        var min = (self.total_sec - (parseInt(hour * (60 * 60))) - (self.total_sec % 60)) / 60;

                        self.time = {
                            h : parseInt(self.total_sec / (60 * 60)),
                            m : parseInt(min),
                            s : (self.total_sec % 60)
                        };
                        fn_tick(self.time.h + ":" + self.time.m + ":" + self.time.s, self.instance_index);
                    } else {
                        self.stop();
                        fn_end();
                    }
                }, 1000);
                return this;
            },
            stop : function() {
                clearInterval(this.timer);
                this.time = {
                    h : 0,
                    m : 0,
                    s : 0
                };
                this.total_sec = 0;
                return this;
            }
        };
    };

    var _url = "http://bonozo.com:8080/knp/get_avatar_cookings.php?uid=" + userinfo.Record[0].UID;
    var items_json = "";
    var items_length = 0;
    var tabledata = [];
    var my_timer = [];
    var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
    var screenWidth = Titanium.Platform.displayCaps.platformWidth;
    var rowViewHeight = screenWidth * 0.225;
    var cooking_remaining_time = [];
    var tableview = "";

	    var httpclientt = require('/ui/common/Functions/function');
	    httpclientt.requestServer({
	        success : function(e) {
	            items_json = JSON.parse(this.responseText);
	            items_length = items_json.Record.length;
	            // alert(JSON.stringify(items_json));
	            if (items_json.Record != undefined) {
	                for (var i = 0; i < items_json.Record.length; i++) {
	                	
	                    var rowView = Ti.UI.createTableViewRow({
	                        height : rowViewHeight,
	                        className : 'active_cooking',
	                        uid : items_json.Record[i].ID,
	                        index : i,
	                        backgroundImage : '/assets/overlayItemList_highlight.png',
	                        zIndex : 10
	                    });
	                    var recipe_label = Ti.UI.createLabel({
	                        text : items_json.Record[i].NAME,// + ' sent you a '+items_json.Record[i].GIFT_NAME,
	                        font : {
	                            fontSize : '20dip'
	                        },
	                        color : '#b3fad0',
	                        left : '8%',
	                        top : '10%'
	                    });
	                    rowView.add(recipe_label);
	                    var description = Ti.UI.createLabel({
	                        text : items_json.Record[i].START_TIME,
	                        font : {
	                            fontSize : '16dip'
	                        },
	                        color : '#b3fad0',
	                        left : '8%',
	                        top : '60%'
	                    });
	                    rowView.add(description);
	                    
	                    cooking_remaining_time[items_json.Record[i].ID] = Ti.UI.createLabel({
	                        text : (items_json.Record[i].STATUS != 'COMPLETED') ? ('TIME LEFT ' + items_json.Record[i].REMAINING_TIME) : 'Item is in inventory.',
	                        font : {
	                            fontSize : '15dip'
	                        },
	                        color : '#b3fad0',
	                        right : '5%'
	                    });
	                    rowView.add(cooking_remaining_time[items_json.Record[i].ID]);
	                    
	                    if(items_json.Record[i].STATUS != 'COMPLETED' && items_json.Record[i].STATUS != 'EXPIRE'){
	                        var n = items_json.Record[i].REMAINING_TIME.split(":");
	                        my_timer[items_json.Record[i].ID] = 
	                        new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), items_json.Record[i].ID, function(curr_time, instance_index) {
	                            cooking_remaining_time[instance_index].text = 'TIME LEFT ' + curr_time;
	                        }, function() {
	                            //cooking_remaining_time[instance_index].text = 'Item is in inventory.';
	                        });
	                        my_timer[items_json.Record[i].ID].start();
	                    }
	                    tabledata.push(rowView);
	                }//end of for loop
					
	                tableview =  Ti.UI.createTableView({		backgroundColor : 'transparent', 		separatorColor : 'transparent',
		
	                    data : tabledata,
	                    width : '100%',
	                    height : '65%',
	                    top : '30%'
	                });
	                self.add(tableview);
	                //actInd.hide();
	            }
	        },
	        method : 'GET',
	        contentType : 'text/xml',
	        url : _url
	    });


	Ti.App.addEventListener('start_cooking',function(data){
		if(tableview != ""){
			self.remove(tableview);
			tableview = "";
		}
	    var httpclientt = require('/ui/common/Functions/function');
	    httpclientt.requestServer({
	        success : function(e) {
	            items_json = JSON.parse(this.responseText);
	            items_length = items_json.Record.length;
	            // alert(JSON.stringify(items_json));
	            if (items_json.Record != undefined) {
	                for (var i = 0; i < items_json.Record.length; i++) {
	                	
	                    var rowView = Ti.UI.createTableViewRow({
	                        height : rowViewHeight,
	                        uid : items_json.Record[i].ID,
	                        index : i,
	                        backgroundImage : '/assets/overlayItemList_highlight.png',
	                        zIndex : 10
	                    });
						
						/*
						rowView.addEventListener('click',function(e){
					        var CookingMainGame = require('/ui/common/games/CookingMainGame');
					        var cookingmaingame = new CookingMainGame(userinfo,e.row.uid);
					        cookingmaingame.open();
						});
						*/
	                    var recipe_label = Ti.UI.createLabel({
	                        text : items_json.Record[i].NAME,// + ' sent you a '+items_json.Record[i].GIFT_NAME,
	                        font : {
	                            fontSize : '20dip'
	                        },
	                        color : '#b3fad0',
	                        left : '8%',
	                        top : '10%'
	                    });
	                    rowView.add(recipe_label);
	                    var description = Ti.UI.createLabel({
	                        text : items_json.Record[i].START_TIME,
	                        font : {
	                            fontSize : '16dip'
	                        },
	                        color : '#b3fad0',
	                        left : '8%',
	                        top : '60%'
	                    });
	                    rowView.add(description);
	                    
	                    cooking_remaining_time[items_json.Record[i].ID] = Ti.UI.createLabel({
	                        text : (items_json.Record[i].STATUS != 'COMPLETED') ? ('TIME LEFT ' + items_json.Record[i].REMAINING_TIME) : 'Item is in inventory.',
	                        font : {
	                            fontSize : '15dip'
	                        },
	                        color : '#b3fad0',
	                        right : '5%'
	                    });
	                    rowView.add(cooking_remaining_time[items_json.Record[i].ID]);
	                    
	                    if(items_json.Record[i].STATUS != 'COMPLETED' && items_json.Record[i].STATUS != 'EXPIRE'){
	                        var n = items_json.Record[i].REMAINING_TIME.split(":");
	                        my_timer[items_json.Record[i].ID] = 
	                        new countDown(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), items_json.Record[i].ID, function(curr_time, instance_index) {
	                            cooking_remaining_time[instance_index].text = 'TIME LEFT ' + curr_time;
	                        }, function() {
	                            //alert("The time is up!");
	                        });
	                        my_timer[items_json.Record[i].ID].start();
	                    }
	
	
	                    tabledata.push(rowView);
	                }//end of for loop
	
	                tableview =  Ti.UI.createTableView({		backgroundColor : 'transparent', 		separatorColor : 'transparent',
		
	                    data : tabledata,
	                    width : '100%',
	                    height : '65%',
	                    top : '30%'
	                });
	                self.add(tableview);
	                //actInd.hide();
            		alert(data.message);

	            }
	        },
	        method : 'GET',
	        contentType : 'text/xml',
	        url : _url
	    });
	});
    

    self.open({
        fullscreen : true,
        navBarHidden : true
    });

	return self;
}

module.exports = CookingGame;