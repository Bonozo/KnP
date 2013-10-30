function CookingMainGame(userinfo,recipe_id){
    var self = Ti.UI.createWindow({
        orientation : Ti.UI.PORTRAIT,
        navBarHidden : true,
        fullscreen : true
    });
    self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	var clicked = false;
    var screenWidth = Titanium.Platform.displayCaps.platformWidth;

    var view = Titanium.UI.createView({
        width : '100%',
        height : '100%',
        backgroundImage : '/assets/games/cooking/oven.png'
    });
    self.add(view);
    
	var ingredients_bg = Ti.UI.createImageView({
		image : '/assets/itemWindow_001.png',
		opacity : '0.7',
		width : '80%',
		height : '15%',
		left : '2%',
		bottom : '5%'
	});
    view.add(ingredients_bg);
    
    // Create a Label.
    var ingredients_label = Ti.UI.createLabel({
        text : 'Ingredients',
		color : '#FFF',
		font : {fontSize:'22dip'},
		bottom : '18%',
		left : '5%',
		textAlign : 'center'
    });
    
    // Add to the parent view.
    view.add(ingredients_label);

    var items_json = [];
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			//alert("items_json>>" + JSON.stringify(items_json));
			if (items_json.Record != undefined) {
				var left_percentage = 5;
				for(var i = 0; i < items_json.Record.length; i++){
					
					// Create a Label.
					var name_qty_ing_label = Ti.UI.createLabel({
						text : items_json.Record[i].AMMOUNT + ' ' + items_json.Record[i].NAME,
						color : '#FFF',
						font : {fontSize:'16dip'},
						bottom : '14%',
						left : left_percentage + '%',
						textAlign : 'center'
					});
					view.add(name_qty_ing_label);
					
					// Create an ImageView.
					var ingredient_info_imageview = Ti.UI.createImageView({
						image : '/assets/'+items_json.Record[i].IMAGE+'.png',
						width : '10%',
						height : '10%',
						bottom : '5%',
						left : (left_percentage++)+'%'
					});
					ingredient_info_imageview.addEventListener('load', function() {
						Ti.API.info('Image loaded!');
					});
					view.add(ingredient_info_imageview);
					
				}
				
				// Create a Button.
				var bake_button = Ti.UI.createButton({ color: '#761f56',
			        title : 'Bake',
			        bottom : '12%',
			        right : '10%',
			        backgroundImage : '/assets/button_large_UP.png',
			        height : '10%',
			        width : '30%'
				});
				
				// Listen for click events.
				bake_button.addEventListener('click', function() {
					if(clicked)return;
					clicked = true;
					httpclientt.requestServer({
						success : function(e) {
							items_json = JSON.parse(this.responseText);
							//alert("items_json>>" + JSON.stringify(items_json));
							if (items_json.Record != undefined) {
								clicked = false;
	                            Ti.App.fireEvent('start_cooking', {
	                                cooking_id 	: items_json.Record.COOKING_ID,
	                                recipe_name : items_json.Record.RECIPE_NAME,
	                                message : items_json.Record.Message
	                            });
							}
							self.close();
						},
						method : 'GET',
						contentType : 'text/xml',
						url : "http://bonozo.com:8080/knp/start_cooking.php?uid="+userinfo.Record[0].UID+"&recipe_id="+recipe_id
					});
				});
				// Add to the parent view.
				view.add(bake_button);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_recipe_ingridients.php?recipe_id=" + recipe_id
	});
    
	return self;
}
module.exports = CookingMainGame;