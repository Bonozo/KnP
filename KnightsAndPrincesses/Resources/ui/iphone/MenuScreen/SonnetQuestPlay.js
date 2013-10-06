function SonnetQuestPlay(quest_status, quest_id, userinfo, friend_uid, friend_quest_info) {
	var played = false;
	var _assign_quest_id = "";
	var images_counter = 0;
	function hideLoader() {
		images_counter++;
		if (images_counter >= 2) {
			actInd.hide();
		}
	}

	var actInd = Titanium.UI.createActivityIndicator();
	actInd.message = 'Loading...';
	//message will only shows in android.
	actInd.show();
    var screenWidth = Titanium.Platform.displayCaps.platformWidth;
	var self = Ti.UI.createWindow({
		orientation : Ti.UI.PORTRAIT,
		navBarHidden : true,
		fullscreen : true
	});
    self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
    var view = Titanium.UI.createView({
        width : '100%',
        height : '100%',
        backgroundImage : '/assets/inventoryBackground.png'

    });
    self.add(view);
/*
	var _url = "http://bonozo.com:8080/knp/knp_assign_quests.php?" + "assign_by_uid=" + userinfo.Record[0].UID + "&" + "assign_to_uid=" + userinfo.Record[0].UID + "&" + "quest_ids=" + quest_id + "&message=Single Player Game&num_of_hours=3&status=SINGLE_PLAYER_GAME";

	var items_json = "";
	var items_length = 0;
	var httpclientt = require('ui/iphone/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			items_length = items_json.Record.length;
			if (items_json.Record != undefined) {
				if (items_json.Record[0].LOW_ENERGY) {
					var alertDialog = Titanium.UI.createAlertDialog({
						title : 'Low Energy!',
						message : items_json.Record[0].LOW_ENERGY,
						buttonNames : ['OK']
					});
					alertDialog.show();
					alertDialog.addEventListener('click', function(e) {
						self.close();
					});
				} else {
					_assign_quest_id = items_json.Record[0].ASSIGN_QUEST_ID;
				}
				hideLoader();
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : _url,

	});
*/
	// Create an ImageView.
	var gameImage = Ti.UI.createImageView({
		image : '/assets/inventoryBackground.png',
		width : '100%',
		height : '100%',
	});
		view.add(gameImage);
		hideLoader();
	gameImage.addEventListener('load', function() {
		hideLoader();
	});
    var top_imageview = Titanium.UI.createImageView({
 		image : '/assets/overlayPlayerInfoCroped.png',
		height:'6.4%',
		width : '100%',
		bottom : '94.6%'
    });
    view.add(top_imageview);

    var name_label = Titanium.UI.createLabel({
        text : 'SONNET GAME',
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
        text : 'CREATE SONNET',
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
    var challenger_label = Titanium.UI.createLabel({
        text : 'CHALLENGER: FRIENDNAME03',
        top : '9%',
        left : '35%',
        textAlign : 'left',
        color : '#5afd9b',
        font : {
           // fontWeight : 'bold',
            fontSize : '9dip'
        }
    });
    view.add(challenger_label);
    
    var time_label = Titanium.UI.createLabel({
        text : 'TIME TO COMPLETE: 01:24:00',
        top : '27%',
        color : '#5afd9b',
        font : {
           // fontWeight : 'bold',
            fontSize : '9dip'
        }
    });
    view.add(time_label);
    var titlebg_imageview = Titanium.UI.createImageView({
        backgroundImage : '/assets/games/sonnet/title_bg.png',
        height : '10%',
        width : '100%',
        top : '15%',
    });
    view.add(titlebg_imageview);
	var commentBg = Ti.UI.createView({
		backgroundColor : '#72AE94',
		borderColor : '#376b54',
		borderWidth : 1,
		borderRadius : 5,
		height : '12%',
		top : '14%',
		left : '3%',
		width : '72%'
	});
    var sonnet_label = Titanium.UI.createLabel({
        text : 'WRITE A SONNET ABOUT:',
        top : '1%',
        left : '2%',
        textAlign : 'left',
        color : '#5afd9b',
        font : {
           // fontWeight : 'bold',
            fontSize : '10dip'
        }
    });
    commentBg.add(sonnet_label);
    var sonnet_desc_label = Titanium.UI.createLabel({
        text : 'THE BLACK PLAGUE',
        //top : '1%',
        //left : '2%',
        //textAlign : 'left',
        //color : '#5afd9b',
        font : {
            fontWeight : 'bold',
            fontSize : '13dip'
        }
    });
    commentBg.add(sonnet_desc_label);
	
    view.add(commentBg);
    var dp_imageview = Ti.UI.createImageView({
        image : '/assets/female_icon.png',
        width : '28%',
        right : '1%',
        height : '15%',
        top : '11%',
    });
    view.add(dp_imageview);
    var titledesc_imageview = Titanium.UI.createView({
        backgroundImage : '/assets/games/sonnet/desc_bg.png',
        height : '16%',
        width : '100%',
        top : '30%',
    });

    
    var icon_imageview = Titanium.UI.createImageView({
        backgroundImage : '/assets/iconSonnet.png',
        height : '25%',
        width : '10%',
        top : '1%',
        left : '1%'
    });
    titledesc_imageview.add(icon_imageview);
    var sonnet_desc_label = Titanium.UI.createLabel({
        text : '',
        top : '1%',
        left : '10%',
        //textAlign : 'left',
        color : '#5afd9b',
        font : {
            //fontWeight : 'bold',
            fontSize : '13dip'
        }
    });
    titledesc_imageview.add(sonnet_desc_label);
    
    view.add(titledesc_imageview);
    
    var writing_imageview = Titanium.UI.createImageView({
       image : '/assets/overlayNameScroll.png',
        height : '25%',
        width : '100%',
        top : '41%',
    });
    view.add(writing_imageview);
	var timeLimitLabel = Ti.UI.createLabel({
		text : 'RULE: WORD MUST BE ATLEAT 5 LETTERS',
		color : '#5AFD9B',
		font : {
			fontSize : '10'
		},
		top : '65%',
	});
	view.add(timeLimitLabel);

	var num_of_hours = 48;
	var timeLimitView = Ti.UI.createView({
		top : '68%',
		//right : '8%',
		height : '7%',
		width : '50%'
		
	});
	view.add(timeLimitView);

	var leftArrowTimeLimit = Ti.UI.createImageView({
		image : '/assets/iconControlArrowLeft.png',
		right : '8%',
		width: '20%',
		height : '100%'
	});
	timeLimitView.add(leftArrowTimeLimit);
	leftArrowTimeLimit.addEventListener('click', function(e) {
		timeLimitValueLabel.text = ++num_of_hours;
	});

	var rightArrowTimeLimit = Ti.UI.createImageView({
		image : '/assets/iconControlArrowRight.png',
		left : '10%',
		width: '20%',
		height : '100%'
	});
	timeLimitView.add(rightArrowTimeLimit);
	rightArrowTimeLimit.addEventListener('click', function(e) {
		timeLimitValueLabel.text = (num_of_hours > 1) ? --num_of_hours : num_of_hours;
	});

	var timeLimitValueLabel = Ti.UI.createLabel({
		text : 'SWAP RULE',//num_of_hours,
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		left : '25%',
		textAlign : 'center'
	});
	timeLimitView.add(timeLimitValueLabel);

	var hoursLabel = Ti.UI.createLabel({
		text : 'HOURS',
		color : '#5AFD9B',
		font : {
			fontSize : '12dip'
		},
		left : '40%',
		textAlign : 'center'
	});
	//timeLimitView.add(hoursLabel);
	var hintLabel = Ti.UI.createLabel({
		text : 'LETTERS FOR THIS WORD:',
		color : '#5AFD9B',
		font : {
			fontSize : '10dip'
		},
		//left : '40%',
		textAlign : 'center',
		top : '72%',
	});
	//timeLimitView.add(hintLabel);
	var lettersView = Ti.UI.createView({
		top : '70%',
		//right : '8%',
		height : '30%',
		width : '98%',
		left : '4%'
		
		
	});
	view.add(lettersView);
	var sonnet_text = Titanium.UI.createTextField({
		left : "25%",
		top : "45%",
		width : "70%",
		hintText : "Write a Sonnet",
		
		height : "15%",
		paddingLeft : '3',
		color : '#0B0909',
		backgroundColor : 'transparent'
		
	});
    view.add(sonnet_text);
    var undo_word = Titanium.UI.createButton({
        title : "UNDO WORD",
        backgroundImage : '/assets/button_smallLong_UP.png',
        left : "5%",
        top : "60%",
        color : '#0B0909',
        font : {
            fontSize : '11'
        },
        //width : "20%",
        height : "6%",
    });
	view.add(undo_word);
	function searchStringInArray (str, strArray) {
	    for (var j=0; j<strArray.length; j++) {
	        if (strArray[j].match(str)) return j;
	    }
	    return -1;
	}	
    var submit_word = Titanium.UI.createButton({
        title : "SUBMIT WORD",
        backgroundImage : '/assets/button_smallLong_UP.png',
        right : "5%",
        top : "60%",
        color : '#0B0909',
        font : {
            fontSize : '11'
        },
        //width : "20%",
        height : "6%",
    });
	view.add(submit_word);
	var correct_words = ['PLAGUE','KNIGHT','PRINCESS','GAMES','SONNET'];
	var counter = 0;
	var words = [];
		submit_word.addEventListener('click', function(e) {
			var txt = sonnet_text.value;
			//alert(correct_words.toString());
			if(txt.length < '5')
				alert('Word is too small.');
			else{
				
				var corr_res = searchStringInArray(txt,correct_words);
				//alert(corr_res);
				if(corr_res == '-1'){
					alert('You have entered a wrong word!');
					sonnet_text.value = "";
					counter++;
					if(counter == '3'){
						//alert('you lost the game');
							if (!played) {
								actInd.show();
								//alert(_assign_quest_id);
					var httpclientt = require('ui/iphone/Functions/function');
								 _url = "http://bonozo.com:8080/knp/knp_set_quest_status.php?game_status=LOSE&quest_status=" + quest_status + "&assign_quest_id=" + friend_quest_info.ASSIGN_QUEST_ID +
								  "&quest_id=" + quest_id + "&uid=" + userinfo.Record[0].UID + "&friend_uid=" + friend_uid;
								httpclientt.requestServer({
									success : function(e) {
										items_json = JSON.parse(this.responseText);
										if (items_json.Record != undefined) {
											if (items_json.Record[0].Message == 'Updated!') {
					
												var alertDialog = Titanium.UI.createAlertDialog({
													title : 'Sorry!',
													message : 'You lost the game!',
													buttonNames : ['OK']
												});
												alertDialog.show();
												alertDialog.addEventListener('click', function(e) {
													self.close();
												});
					
												//self.close();
					
											}
										}
										Ti.App.fireEvent('update_xp', {
											clicked_item : 'StatusScreen'
										});
									},
									method : 'GET',
									contentType : 'text/xml',
									url : _url,
					
								});
								played = true;
							} else {
								alert('You have already played this quest!\nPress back button');
							}
							







					}
				}
				else{
					var res = searchStringInArray(txt,words);
					if(res == '0'){
						alert('You have already enter this word!');
						sonnet_text.value = "";
					}
					if(res == '-1'){
						words.push(txt);
						sonnet_text.value = "";
						sonnet_desc_label.text += " "+txt;
						if(words.length >='3' ){
							if (!played) {
								actInd.show();
								//alert(_assign_quest_id);
					var httpclientt = require('ui/iphone/Functions/function');
								 _url = "http://bonozo.com:8080/knp/knp_set_quest_status.php?game_status=COMPLETE&quest_status=" + quest_status + "&assign_quest_id=" + friend_quest_info.ASSIGN_QUEST_ID +
								  "&quest_id=" + quest_id + "&uid=" + userinfo.Record[0].UID + "&friend_uid=" + friend_uid;
								httpclientt.requestServer({
									success : function(e) {
										items_json = JSON.parse(this.responseText);
										if (items_json.Record != undefined) {
											if (items_json.Record[0].Message == 'Updated!') {
												actInd.hide();
												Ti.App.fireEvent('game_played', {
													status : 'complete'
												});
												var index = 0;
												var quest_name = '';
												var rewards = '';
												for (var key in items_json.Record[0]) {
													if (items_json.Record[0].hasOwnProperty(key)) {
														var rewards_earned = key + " -> " + items_json.Record[0][key];
														if (index == 1) {
															quest_name = items_json.Record[0][key];
														} else if (index > 1) {
															rewards += '\n' + key + '(' + items_json.Record[0][key] + ')';
														}
					
													}
													index++;
												}
					
												var alertDialog = Titanium.UI.createAlertDialog({
													title : 'You have completed ' + quest_name + '.',
													message : 'Rewards earned:' + rewards,
													buttonNames : ['OK']
												});
												alertDialog.show();
												alertDialog.addEventListener('click', function(e) {
													self.close();
												});
					
												//self.close();
					
											}
										}
										Ti.App.fireEvent('update_xp', {
											clicked_item : 'StatusScreen'
										});
									},
									method : 'GET',
									contentType : 'text/xml',
									url : _url,
					
								});
								played = true;
							} else {
								alert('You have already played this quest!\nPress back button');
							}
							
							
							
						}
							//alert('You win the game!');
						
					}
				
					
				}
				
				//alert(res);
				
			}
			//alert(sonnet_text.value);
		});

	var characters;
	var ttop = 0;
	var lleft= 2;
	var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S'
					,'T','U','V','W','X','Y','Z'];
	for(var i= 0; i < letters.length; i++){
		if(i%8 == 0){
			ttop+=26;
			lleft = 2;
		}
			
		
	    characters = Titanium.UI.createButton({
	        title : letters[i],
	        backgroundImage : '/assets/button_smallLong_UP.png',
	        //color : '#A42B76',
	        left : lleft+'%',
	        top : ttop,
	        value : letters[i],
	        color : '#0B0909',
	        font : {
	            fontSize : '16'
	        },
	        width : "10%",
	        height : "25%",
	    });
		lettersView.add(characters);
		characters.addEventListener('click', function(e) {
			sonnet_text.value += e.source.value;//letters[i];
		});
		
		lleft+=11;
/*	    var characterss = Titanium.UI.createButton({
	        title : 'B',
	        backgroundImage : '/assets/button_smallLong_UP.png',
	        //color : '#A42B76',
	        left : lleft+'%',
	        top : "0%",
	        
	        font : {
	            fontSize : '16'
	        },
	        width : "10%",
	        height : "25%",
	    });
		lettersView.add(characterss);
		lleft+=10;
*/	}
/*	

	gameImage.addEventListener('click', function() {
		if (!played) {
			actInd.show();
			//alert(_assign_quest_id);

			_url = "http://bonozo.com:8080/knp/knp_set_quest_status.php?game_status=COMPLETE&quest_status=" + quest_status + "&assign_quest_id=" + _assign_quest_id + "&quest_id=" + quest_id + "&uid=" + userinfo.Record[0].UID + "&friend_uid=" + userinfo.Record[0].UID + "";
			httpclientt.requestServer({
				success : function(e) {
					items_json = JSON.parse(this.responseText);
					if (items_json.Record != undefined) {
						if (items_json.Record[0].Message == 'Updated!') {
							actInd.hide();
							Ti.App.fireEvent('game_played', {
								status : 'complete'
							});
							var index = 0;
							var quest_name = '';
							var rewards = '';
							for (var key in items_json.Record[0]) {
								if (items_json.Record[0].hasOwnProperty(key)) {
									var rewards_earned = key + " -> " + items_json.Record[0][key];
									if (index == 1) {
										quest_name = items_json.Record[0][key];
									} else if (index > 1) {
										rewards += '\n' + key + '(' + items_json.Record[0][key] + ')';
									}

								}
								index++;
							}

							var alertDialog = Titanium.UI.createAlertDialog({
								title : 'You have completed ' + quest_name + '.',
								message : 'Rewards earned:' + rewards,
								buttonNames : ['OK']
							});
							alertDialog.show();
							alertDialog.addEventListener('click', function(e) {
								self.close();
							});

							//self.close();

						}
					}
					Ti.App.fireEvent('update_xp', {
						clicked_item : 'StatusScreen'
					});
				},
				method : 'GET',
				contentType : 'text/xml',
				url : _url,

			});
			played = true;
		} else {
			alert('You have already played this quest!\nPress back button');
		}
	});
*/
	// Add to the parent view.


	return self;

}

module.exports = SonnetQuestPlay;
