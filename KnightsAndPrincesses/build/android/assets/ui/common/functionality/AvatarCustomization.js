function AvatarCustomization(config) {
	function getCurrentIndexById(json, id) {
		for (var i = 0; i < json.length; i++) {
			if (json[i].WEAR_ID == id)
				return i;
		}
		return -1;
	}

	function getCurrentIdByIndex(json, index) {
		return (json[index] != undefined)?json[index].WEAR_ID:-1;  
	}

	var btns_enable = false;

	var view = Titanium.UI.createView(config.main_view);
	var record = {};
	var curr_index = {};
	var hair_button = Titanium.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		title : config.btn_labels.hair,
		height : '10%',
		width : '100%',
		top : 0,
		left : 0,
		font : {
			fontSize : 14
		},
		color : '#761f56'
	});

	var head_button = Titanium.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		title : config.btn_labels.head,
		height : '10%',
		width : '100%',
		top : '10.5%',
		left : 0,
		font : {
			fontSize : 14
		},
		color : '#761f56'
	});

	var dress_button = Titanium.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		title : config.btn_labels.dress,
		height : '10%',
		width : '100%',
		top : '21%',
		left : 0,
		font : {
			fontSize : 14
		},
		color : '#761f56'
	});

	var jewel_weapon_button = Titanium.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		title : (config.gender == 'm') ? config.btn_labels.weapon : config.btn_labels.jewelery,
		height : '10%',
		width : '100%',
		top : '31.5%',
		left : 0,
		font : {
			fontSize : 14
		},
		color : '#761f56'
	});
	
	if(config.gender == 'm'){
		var shield_button = Titanium.UI.createButton({
			backgroundImage : '/assets/button_small_UP.png',
			title : config.btn_labels.shield,
			height : '10%',
			width : '100%',
			top : '42%',
			left : 0,
			font : {
				fontSize : 14
			},
			color : '#761f56'
		});
		shield_button.addEventListener('click', function() {
			if (!btns_enable)
				return;
			if (curr_index.shield >= (record.shield.length - 1))
				curr_index.shield = 0;
			else
				curr_index.shield++;
			shield_button.title = record.shield[curr_index.shield].NAME;
			Ti.App.fireEvent('update_appearance', {
				item : 'shield',
				gender : config.gender,
				image : record.shield[curr_index.shield].IMAGE
			});
		});
	
		var helmet_button = Titanium.UI.createButton({
			backgroundImage : '/assets/button_small_UP.png',
			title : config.btn_labels.helmet,
			height : '10%',
			width : '100%',
			top : '52.5%',
			left : 0,
			font : {
				fontSize : 14
			},
			color : '#761f56'
		});
		helmet_button.addEventListener('click', function() {
			if (!btns_enable)
				return;
			if (curr_index.helmet >= (record.helmet.length - 1))
				curr_index.helmet = 0;
			else
				curr_index.helmet++;
			helmet_button.title = record.helmet[curr_index.helmet].NAME;
			Ti.App.fireEvent('update_appearance', {
				item : 'helmet',
				gender : config.gender,
				image : record.helmet[curr_index.helmet].IMAGE
			});
		});
		view.add(shield_button);
		view.add(helmet_button);
	
	}
	
	var chips = Titanium.UI.createImageView({
		top : "75%",
		image : "/assets/iconDiceRandom.png",
		height : "18%",
		left : '5%',
		width : "40%"
	});
	chips.addEventListener('click',function(e){
		RandomAppearance();
	});
	view.add(chips);

	var save_appearance_button = Titanium.UI.createButton({
		backgroundImage : '/assets/button_small_UP.png',
		title : 'Save',
		height : '10%',
		top : '64%',
		width : '100%',
		left : 0,
		font : {
			fontSize : 14
		},
		color : '#761f56'
	});
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			//alert("items_json>>" + JSON.stringify(items_json));
			if (items_json.Record != undefined) {
				record = items_json.Record;
				curr_index.dress = getCurrentIndexById(items_json.Record.dress, config.wear_ids.dress);
				curr_index.face = getCurrentIndexById(items_json.Record.face, config.wear_ids.head);
				curr_index.hair = getCurrentIndexById(items_json.Record.hair, config.wear_ids.hair);
				if (config.gender == 'f')
					curr_index.jewelery = getCurrentIndexById(items_json.Record.jwelery, config.wear_ids.jewelery);
				else{
					curr_index.weapon = getCurrentIndexById(items_json.Record.weapons, config.wear_ids.weapon);
					curr_index.shield = getCurrentIndexById(items_json.Record.shield, config.wear_ids.shield);
					curr_index.helmet = getCurrentIndexById(items_json.Record.helmet, config.wear_ids.helmet);
				}
				btns_enable = true;
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_avatar_appearance_info.php?gender=" + config.gender
	});
	
	function RandomAppearance(){
		//Hair 
		if (!btns_enable)
			return;
		// curr_index.hair = Math.floor(Math.random() * record.hair.length) + 0;
		curr_index.hair = getRandomInt(0,record.hair.length-1);
		
		hair_button.title = record.hair[curr_index.hair].NAME;
		Ti.App.fireEvent('update_appearance', {
			item : 'hair',
			gender : config.gender,
			image : record.hair[curr_index.hair].IMAGE
		});
		
		//Head
		if (!btns_enable)
			return;
		// curr_index.face = Math.floor(Math.random() * record.hair.length) + 0;
		curr_index.face = getRandomInt(0,record.face.length-1);

		head_button.title = record.face[curr_index.face].NAME;
		Ti.App.fireEvent('update_appearance', {
			item : 'face',
			gender : config.gender,
			image : record.face[curr_index.face].IMAGE
		});
		
		//Dress
		if (!btns_enable)
			return;
		// curr_index.dress = Math.floor(Math.random() * record.hair.length) + 0;
		curr_index.dress = getRandomInt(0,record.dress.length-1);

		dress_button.title = record.dress[curr_index.dress].NAME;
		Ti.App.fireEvent('update_appearance', {
			item : 'dress',
			gender : config.gender,
			image : record.dress[curr_index.dress].IMAGE
		});
		
		//Jewelry
		if (!btns_enable)
			return;
		if (config.gender == 'f') {
			curr_index.jewelery = getRandomInt(0,record.jwelery.length-1);
			jewel_weapon_button.title = record.jwelery[curr_index.jewelery].NAME;
		} else {
			// curr_index.weapon = Math.floor(Math.random() * record.hair.length) + 0;
			curr_index.weapon = getRandomInt(0,record.weapons.length-1);
			jewel_weapon_button.title = record.weapons[curr_index.weapon].NAME;
		}
		Ti.App.fireEvent('update_appearance', {
			item : (config.gender == 'm') ? 'weapon' : 'jewelery',
			gender : config.gender,
			image : (config.gender == 'm') ? record.weapons[curr_index.weapon].IMAGE : record.jwelery[curr_index.jewelery].IMAGE
		});
	}
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	/////////////////////////////////////////////////
	hair_button.addEventListener('click', function() {
		if (!btns_enable)
			return;
		if (curr_index.hair >= (record.hair.length - 1))
			curr_index.hair = 0;
		else
			curr_index.hair++;
		hair_button.title = record.hair[curr_index.hair].NAME;
		Ti.App.fireEvent('update_appearance', {
			item : 'hair',
			gender : config.gender,
			image : record.hair[curr_index.hair].IMAGE
		});
	});
	head_button.addEventListener('click', function() {
		if (!btns_enable)
			return;
		if (curr_index.face >= (record.face.length - 1))
			curr_index.face = 0;
		else
			curr_index.face++;
		head_button.title = record.face[curr_index.face].NAME;
		Ti.App.fireEvent('update_appearance', {
			item : 'face',
			gender : config.gender,
			image : record.face[curr_index.face].IMAGE
		});
	});
	dress_button.addEventListener('click', function() {
		if (!btns_enable)
			return;
		if (curr_index.dress >= (record.dress.length - 1))
			curr_index.dress = 0;
		else
			curr_index.dress++;
		dress_button.title = record.dress[curr_index.dress].NAME;
		Ti.App.fireEvent('update_appearance', {
			item : 'dress',
			gender : config.gender,
			image : record.dress[curr_index.dress].IMAGE
		});
	});
	jewel_weapon_button.addEventListener('click', function() {
		if (!btns_enable)
			return;
		if (config.gender == 'f') {
			if (curr_index.jewelery >= (record.jwelery.length - 1))
				curr_index.jewelery = 0;
			else
				curr_index.jewelery++;
			jewel_weapon_button.title = record.jwelery[curr_index.jewelery].NAME;
		} else {
			if (curr_index.weapon >= (record.weapons.length - 1))
				curr_index.weapon = 0;
			else
				curr_index.weapon++;
			jewel_weapon_button.title = record.weapons[curr_index.weapon].NAME;
		}

		Ti.App.fireEvent('update_appearance', {
			item : (config.gender == 'm') ? 'weapon' : 'jewelery',
			gender : config.gender,
			image : (config.gender == 'm') ? record.weapons[curr_index.weapon].IMAGE : record.jwelery[curr_index.jewelery].IMAGE
		});
	});
	save_appearance_button.addEventListener('click', function() {
		//alert(JSON.stringify(record));
		var new_json = {
			
		};
		new_json.hair = record.hair[curr_index.hair].WEAR_ID;// getCurrentIdByIndex(record.hair,curr_index.hair);
		new_json.face = record.face[curr_index.face].WEAR_ID;//getCurrentIdByIndex(record.face,curr_index.face);
		new_json.dress = record.dress[curr_index.dress].WEAR_ID;//getCurrentIdByIndex(record.dress,curr_index.dress);
		if (config.gender == 'f')
			new_json.jewelery = record.jwelery[curr_index.jewelery].WEAR_ID;//getCurrentIdByIndex(record.jwelery, curr_index.jewelery);
		else{
			new_json.weapon = record.weapons[curr_index.weapon].WEAR_ID;//getCurrentIdByIndex(record.weapons, curr_index.weapons);
			new_json.helmet = record.helmet[curr_index.helmet].WEAR_ID;//getCurrentIdByIndex(record.weapons, curr_index.weapons);
			new_json.shield = record.shield[curr_index.shield].WEAR_ID;//getCurrentIdByIndex(record.weapons, curr_index.weapons);
		}
 		//alert(new_json);
 		if(config.gender == 'f'){
			var set_avatar_appearance_url = 
			"http://bonozo.com:8080/knp/set_avatar_appearance.php?uid=" + config.uid + 
			"&gender=" + config.gender + 
			"&hair_id=" + new_json.hair + 
			"&face_id=" + new_json.face + 
			"&jewelery_id=" + new_json.jewelery +
			"&dress_id=" + new_json.dress + 
			"&weapon_id=0&helmet_id=0&shield_id=0";
 		}
 		else{
			var set_avatar_appearance_url = 
			"http://bonozo.com:8080/knp/set_avatar_appearance.php?" + 
			"uid=" + config.uid + 
			"&gender=" + config.gender + 
			"&hair_id=" + new_json.hair + 
			"&face_id=" + new_json.face + 
			"&jewelery_id=0" + 
			"&dress_id=" + new_json.dress + 
			"&weapon_id=" + new_json.weapon + 
			"&helmet_id=" + new_json.helmet + 
			"&shield_id=" + new_json.shield;
 		}
		var httpclientt = require('/ui/common/Functions/function');
		httpclientt.requestServer({
			success : function(e) {
				items_json = JSON.parse(this.responseText);
				if (items_json.Record != undefined) {
					Ti.App.fireEvent('new_info', {
						clicked_item : 'SceneryCustomization',
						userinfojson : items_json
					});
					Ti.API.info('URL : ' + set_avatar_appearance_url);
					alert("Successfully Updated!");
				}
			},
			method : 'GET',
			contentType : 'text/xml',
			url : set_avatar_appearance_url
		});

		Ti.App.fireEvent('save_appearance',new_json);
	});

	view.add(jewel_weapon_button);
	view.add(save_appearance_button);
	view.add(dress_button);
	view.add(hair_button);
	view.add(head_button);
	return view;
}

module.exports = AvatarCustomization;
