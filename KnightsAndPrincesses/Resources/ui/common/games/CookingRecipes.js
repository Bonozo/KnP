function CookingRecipes(userinfo){
    var self = Ti.UI.createWindow({
        orientation : Ti.UI.PORTRAIT,
        navBarHidden : true,
        fullscreen : true
    });
    self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

    var screenWidth = Titanium.Platform.displayCaps.platformWidth;

    var view = Titanium.UI.createView({
        width : '100%',
        height : '100%',
        backgroundImage : '/assets/inventoryBackground.png'

    });
    self.add(view);
    
    var top_imageview = Titanium.UI.createImageView({
		image : '/assets/overlayPlayerInfoCroped.png',
		height:'6.4%',
		width : '100%',
		bottom : '94.6%'
    });
    view.add(top_imageview);

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
    view.add(name_label);

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
    view.add(txt_label);

    var return_imageview = Titanium.UI.createImageView({
        image : '/assets/iconReturn.png',
        height : '8%',
        width : '11.6%',
        top : '1%',
        right : '3%'
    });
    view.add(return_imageview);
    
    return_imageview.addEventListener('click', function(e) {
        self.close();
    });
	
	// Create a Label.
	var heading_label = Ti.UI.createLabel({
		text : 'Existing recipes',
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
	view.add(heading_label);
	
    var new_message_imageview;
    var tabledata = [];
    var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
    var screenWidth = Titanium.Platform.displayCaps.platformWidth;
    var rowViewHeight = screenWidth * 0.119;
    var httpclientt = require('/ui/common/Functions/function');
    httpclientt.requestServer({
        success : function(e) {
            items_json = JSON.parse(this.responseText);
            items_length = items_json.Record.length;
            if (items_json.Record != undefined) {
                var rowViewHeight = screenWidth * 0.20;
                var bg_image = '';
                var avatar_image = "";
                    //alert(JSON.stringify(items_json.Record));   

                for (var i = 0; i < items_json.Record.length; i++) {
                	
                    var rowView = Ti.UI.createTableViewRow({
                        height : rowViewHeight,
                        uid : items_json.Record[i].RECIPE_ID,
                        index : i,
                        backgroundImage : '/assets/overlayItemList_highlight.png',
                        zIndex : 10
                    });
					rowView.addEventListener('click',function(e){
				        var CookingMainGame = require('/ui/common/games/CookingMainGame');
				        var cookingmaingame = new CookingMainGame(userinfo,e.row.uid);
				        cookingmaingame.open();
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
                        text : items_json.Record[i].DESCRIPTION,
                        font : {
                            fontSize : '16dip'
                        },
                        color : '#b3fad0',
                        left : '8%',
                        top : '40%'
                    });
                    rowView.add(description);
                    
                    var time_label = Ti.UI.createLabel({
                        text : 'at ',// + items_json.Record[i].DATETIME,
                        font : {
                            fontSize : '15dip'
                        },
                        color : '#b3fad0',
                        left : '14%',
                        bottom : '10%'
                    });
                    time_label = null;
                    //rowView.add(time_label); 


                    tabledata.push(rowView);
                }//end of for loop

                var tableview = Ti.UI.createTableView({
                    data : tabledata,
                    width : '100%',
                    height : '75%',
                    top : '20%'
                });
                view.add(tableview);
                //actInd.hide();
            }
        },
        method : 'GET',
        contentType : 'text/xml',
        url : "http://bonozo.com:8080/knp/get_all_recipes.php",

    });

    var Infoview = Ti.UI.createView({
        width : '55%',
        top : '27%',
        left : '0%',
        height : rowViewHeight,
        backgroundColor : '#53e990'

    });

    var imageview = Titanium.UI.createImageView({
        backgroundImage : '/assets/rowview_bg.png',
        height : '96%',
        width : '100%'
    });
//  Infoview.add(imageview);

    var icon_image = Titanium.UI.createImageView({
        backgroundImage : '/assets/iconSonnet.png',
        height : '96%',
        left : '0%',
        width : '20%'
    });
//  Infoview.add(icon_image);

    var name_label = Titanium.UI.createLabel({
        text : 'Sonnet \n (TAP To CHOOSE)',
        textAlign : 'center',       
        color : '#5afd9b',
        font : {
            fontSize : '14dip'
        }

    });
//  Infoview.add(name_label);
//  view.add(Infoview);



/*

    if(friendinfo.MESSAGE == "NEW_MESSAGE"){
        Ti.App.addEventListener("message_status",function(){
           friendinfo.MESSAGE = "NO_MESSAGE";
            new_message_imageview.hide();
            NoMessage();
     
    
            
        }); 
        
    }
    function NoMessage(){
        Ti.App.fireEvent("message_read",{
           //uid : friendinfo.UID
        });
        
    }
*/


    return self;

}
module.exports = CookingRecipes;
