<<<<<<< HEAD
function StatusScreen(userinfo) {

    var view = Ti.UI.createView({
        width : '100%',
        height : '100%',
        zIndex : 50

    });
    /*  var get_avatar_dress_url = "http://therealmattharmon.com/knp/get_avatar_dress.php?uid=" + userinfo.Record[0].UID;
     var httpclientt = require('/ui/common/Functions/function');
     httpclientt.requestServer({
     success : function(e) {
     items_json = JSON.parse(this.responseText);
     if (items_json.Record != undefined) {
     alert(JSON.stringify(items_json.Record));
     dress_imageview.image = '/assets/'+items_json.Record[3].IMAGE+'.png';
     face_imageview.image = '/assets/'+items_json.Record[1].IMAGE+'.png';
     hair_imageview.image = '/assets/'+items_json.Record[0].IMAGE+'.png';
     jwel_imageview.image = '/assets/'+items_json.Record[2].IMAGE+'.png';
     //alert(items_json.Record.Message);
     }
     //actInd.hide();

     },
     method : 'GET',
     contentType : 'text/xml',
     url : get_avatar_dress_url
     });
     */
    var letter_imageview = Titanium.UI.createImageView({
        url : '/assets/LargeScroll.png',
        height : '43.2%',
        width : '50%',
        top : '26.5%',
        right : '0%',
        opacity : '0.6'
    });
    view.add(letter_imageview);
    letter_imageview.addEventListener('load', function(e) {
        //hideLoader();
    });
    var letter_text_label = Titanium.UI.createLabel({
        text : 'Following Ruby \nDress \n+1 Aiming  \n+2 Charming',
        top : '33.6%',
        right : '10%',
        width : '26%',
        textAlign : 'center',
        color : '#4f2e5e',
        font : {
            fontSize : '14dip'
        }

    });
    view.add(letter_text_label);

    var gender = userinfo.Record[0].GENDER;

    var user_appearence_view = Ti.UI.createView({
        width : '55%',
        height : '76%',
        right : '50%',
        bottom : '0%',
        zIndex : 500

    });
    ////////////////////////////////////////////////
    if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {
        var dress_imageview = Titanium.UI.createImageView({
            height : '95%',
            width : '80%',
            bottom : '7%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(dress_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '24%',
            width : '80%',
            //top : '0%',
            bottom : '76%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '24%',
            width : '80%',
            //top : '0%',
            bottom : '76%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var jwel_imageview = Titanium.UI.createImageView({
            height : '24%',
            width : '80%',
            //top : '0%',
            bottom : '76%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(jwel_imageview);

    } else if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {
        var dress_imageview = Titanium.UI.createImageView({
            height : '95%',
            width : '95%',
            left : '0',
            bottom : '7%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(dress_imageview);
        var helmet_imageview = Titanium.UI.createImageView({
            height : '95%',
            width : '95%',
            left : '0',
            bottom : '7%',
            
            image : '/assets/knight/helmet1.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(helmet_imageview);
        var shield_imageview = Titanium.UI.createImageView({
            height : '55%',
            width : '95%',
            left : '0',
            bottom : '18%',
            
            image : '/assets/knight/shield.png',
            //bottom : '0%'
        });
        user_appearence_view.add(shield_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '15%',
            width : '95%',
            left : '0',
            top : '8%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '11.3%',
            width : '95%',
            left : '0',
            top : '6.1%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var weapon_imageview = Titanium.UI.createImageView({
            height : '90%',
            width : '90%',
            top : '0%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(weapon_imageview);

    } else {

        ///////////////////////////////////////////////
        var character_imageview = Titanium.UI.createImageView({
            bottom : '0%',
            image : (gender == 'm') ? '/assets/K_fullbody_bad.png' : '/assets/hdpi_female_character_Image2.png',
            height : '100%',
            width : '100%',
            zIndex : 500
        });
        user_appearence_view.add(character_imageview);
        character_imageview.addEventListener('load', function(e) {
            //hideLoader();
        });
        //alert((gender == 'm')?'/assets/K_fullbody_bad.png':'/assets/hdpi_female_character_Image2.png');
    }
    view.add(user_appearence_view);
    var selected_menu_label = Titanium.UI.createLabel({
        text : 'Status',
        top : '23%',
        left : '0%',
        textAlign : 'center',
        color : 'rgb(255,0,255)',
        font : {
            fontSize : '12dip'
        }
    });
    view.add(selected_menu_label);
    var iconbg_view = Titanium.UI.createImageView({
        url : '/assets/iconHighlight.png',
        height : '10%',
        width : '13.8%',
        top : '12%',
        left : '0%',
        zIndex : 50
    });
    iconbg_view.addEventListener('load', function(e) {
        //hideLoader();
    });

    //view.add(iconbg_view);

    var overlayProgressNotification1_imageview = Titanium.UI.createImageView({
        url : '/assets/overlayProgressNotification.png',
        right : '0',
        height : '5%',
        width : '50%',
        bottom : '12.8%',
    });
    view.add(overlayProgressNotification1_imageview);

    var quest_label = Titanium.UI.createLabel({
        text : '12 Quest to Next Level',
        bottom : '14%',
        right : '8%',
        textAlign : 'right',
        color : '#5afd9b',
        font : {
            fontSize : '10dip'
        }

    });
    view.add(quest_label);

    var overlayProgressNotification2_imageview = Titanium.UI.createImageView({
        url : '/assets/overlayProgressNotification.png',
        right : '0',
        height : '5%',
        width : '50%',
        bottom : '9.3%',

    });
    view.add(overlayProgressNotification2_imageview);

    var friends_label = Titanium.UI.createLabel({
        text : '15 Friends to Next Level',
        bottom : '10.5%',
        right : '8%',
        textAlign : 'right',
        color : '#5afd9b',
        font : {
            fontSize : '10dip'
        }
    });
    view.add(friends_label);
    var status_textbox = Titanium.UI.createTextField({
        hintText : 'Set your status here.',
        font : {
            fontSize : '13dip'
        },
        color : '#63c689',
        textAlign : 'left',
        borderRadius : 12,
        bottom : '22%',
        height : '10%',
        width : '50%',
        right : '2%',
        backgroundImage : '/assets/inputButton002_up.png',
        zIndex : 600
    });
    view.add(status_textbox);
    var set_status_btn = Titanium.UI.createButton({
        title : 'Set Status',
        height : '7%',
        bottom : '16%',
        right : '12%',
        textAlign : 'center',
        font : {
            fontSize : '12dip'
        }
    });
    view.add(set_status_btn);

    set_status_btn.addEventListener('click', function(e) {
        if (status_textbox.value != "") {
            var set_status_url = "http://therealmattharmon.com/knp/set_status_message.php?uid=" + userinfo.Record[0].UID + "&set_status=" + Ti.Network.encodeURIComponent(status_textbox.value);
            var httpclientt = require('/ui/common/Functions/function');
            httpclientt.requestServer({
                success : function(e) {
                    items_json = JSON.parse(this.responseText);
                    if (items_json.Record != undefined) {
                        //alert(items_json.Record.Message);
                    }
                    //actInd.hide();

                },
                method : 'GET',
                contentType : 'text/xml',
                url : set_status_url
            });

            status_textbox.value = '';
        }
    });

    /*
     var arrowUP_imageview = Titanium.UI.createImageView({
     url : '/assets/iconControlArrowUp.png',
     width : '8%',
     height : '5%',
     right : '16%',
     top : '26.4%',

     });
     view.add(arrowUP_imageview);

     arrowUP_imageview.addEventListener('load', function(e) {
     //hideLoader();
     });

     var arrowDown_imageview = Titanium.UI.createImageView({
     url : '/assets/iconControlArrowDown.png',
     width : '8%',
     height : '5%',
     right : '25%',
     top : '70.2%',

     });
     view.add(arrowDown_imageview);

     arrowDown_imageview.addEventListener('load', function(e) {
     //hideLoader();
     });
     */
    return view;

}

//make constructor function the public component interface
module.exports = StatusScreen;
=======
function StatusScreen(userinfo) {

    var view = Ti.UI.createView({
        width : '100%',
        height : '100%',
        zIndex : 50

    });
    /*  var get_avatar_dress_url = "http://therealmattharmon.com/knp/get_avatar_dress.php?uid=" + userinfo.Record[0].UID;
     var httpclientt = require('/ui/common/Functions/function');
     httpclientt.requestServer({
     success : function(e) {
     items_json = JSON.parse(this.responseText);
     if (items_json.Record != undefined) {
     alert(JSON.stringify(items_json.Record));
     dress_imageview.image = '/assets/'+items_json.Record[3].IMAGE+'.png';
     face_imageview.image = '/assets/'+items_json.Record[1].IMAGE+'.png';
     hair_imageview.image = '/assets/'+items_json.Record[0].IMAGE+'.png';
     jwel_imageview.image = '/assets/'+items_json.Record[2].IMAGE+'.png';
     //alert(items_json.Record.Message);
     }
     //actInd.hide();

     },
     method : 'GET',
     contentType : 'text/xml',
     url : get_avatar_dress_url
     });
     */
    var letter_imageview = Titanium.UI.createImageView({
        url : '/assets/LargeScroll.png',
        height : '43.2%',
        width : '50%',
        top : '26.5%',
        right : '0%',
        opacity : '0.6'
    });
    view.add(letter_imageview);
    letter_imageview.addEventListener('load', function(e) {
        //hideLoader();
    });
    var letter_text_label = Titanium.UI.createLabel({
        text : 'Following Ruby \nDress \n+1 Aiming  \n+2 Charming',
        top : '33.6%',
        right : '10%',
        width : '26%',
        textAlign : 'center',
        color : '#4f2e5e',
        font : {
            fontSize : '14dip'
        }

    });
    view.add(letter_text_label);

    var gender = userinfo.Record[0].GENDER;

    var user_appearence_view = Ti.UI.createView({
        width : '55%',
        height : '76%',
        right : '50%',
        bottom : '0%',
        zIndex : 500

    });
    ////////////////////////////////////////////////
    if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'f') {
        var dress_imageview = Titanium.UI.createImageView({
            height : '95%',
            width : '80%',
            bottom : '7%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(dress_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '24%',
            width : '80%',
            //top : '0%',
            bottom : '76%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '24%',
            width : '80%',
            //top : '0%',
            bottom : '76%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var jwel_imageview = Titanium.UI.createImageView({
            height : '24%',
            width : '80%',
            //top : '0%',
            bottom : '76%',
            image : '/assets/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        user_appearence_view.add(jwel_imageview);

    } else if (userinfo.Record[0].USER_APPEARANCE != undefined && userinfo.Record[0].USER_APPEARANCE != '' && userinfo.Record[0].GENDER == 'm') {
        var dress_imageview = Titanium.UI.createImageView({
            height : '95%',
            width : '95%',
            left : '0',
            bottom : '7%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[2].IMAGE + '.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(dress_imageview);
        var helmet_imageview = Titanium.UI.createImageView({
            height : '95%',
            width : '95%',
            left : '0',
            bottom : '7%',
            
            image : '/assets/knight/helmet1.png',
            //bottom : '0%'
            zIndex : 100
        });
        user_appearence_view.add(helmet_imageview);
        var shield_imageview = Titanium.UI.createImageView({
            height : '55%',
            width : '95%',
            left : '0',
            bottom : '18%',
            
            image : '/assets/knight/shield.png',
            //bottom : '0%'
        });
        user_appearence_view.add(shield_imageview);
        var face_imageview = Titanium.UI.createImageView({
            height : '15%',
            width : '95%',
            left : '0',
            top : '8%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[1].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        user_appearence_view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '11.3%',
            width : '95%',
            left : '0',
            top : '6.1%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[0].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(hair_imageview);
        var weapon_imageview = Titanium.UI.createImageView({
            height : '90%',
            width : '90%',
            top : '0%',
            image : '/assets/knight/' + userinfo.Record[0].USER_APPEARANCE[3].IMAGE + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        user_appearence_view.add(weapon_imageview);

    } else {

        ///////////////////////////////////////////////
        var character_imageview = Titanium.UI.createImageView({
            bottom : '0%',
            image : (gender == 'm') ? '/assets/K_fullbody_bad.png' : '/assets/hdpi_female_character_Image2.png',
            height : '100%',
            width : '100%',
            zIndex : 500
        });
        user_appearence_view.add(character_imageview);
        character_imageview.addEventListener('load', function(e) {
            //hideLoader();
        });
        //alert((gender == 'm')?'/assets/K_fullbody_bad.png':'/assets/hdpi_female_character_Image2.png');
    }
    view.add(user_appearence_view);
    var selected_menu_label = Titanium.UI.createLabel({
        text : 'Status',
        top : '23%',
        left : '0%',
        textAlign : 'center',
        color : 'rgb(255,0,255)',
        font : {
            fontSize : '12dip'
        }
    });
    view.add(selected_menu_label);
    var iconbg_view = Titanium.UI.createImageView({
        url : '/assets/iconHighlight.png',
        height : '10%',
        width : '13.8%',
        top : '12%',
        left : '0%',
        zIndex : 50
    });
    iconbg_view.addEventListener('load', function(e) {
        //hideLoader();
    });

    //view.add(iconbg_view);

    var overlayProgressNotification1_imageview = Titanium.UI.createImageView({
        url : '/assets/overlayProgressNotification.png',
        right : '0',
        height : '5%',
        width : '50%',
        bottom : '12.8%',
    });
    view.add(overlayProgressNotification1_imageview);

    var quest_label = Titanium.UI.createLabel({
        text : '12 Quest to Next Level',
        bottom : '14%',
        right : '8%',
        textAlign : 'right',
        color : '#5afd9b',
        font : {
            fontSize : '10dip'
        }

    });
    view.add(quest_label);

    var overlayProgressNotification2_imageview = Titanium.UI.createImageView({
        url : '/assets/overlayProgressNotification.png',
        right : '0',
        height : '5%',
        width : '50%',
        bottom : '9.3%',

    });
    view.add(overlayProgressNotification2_imageview);

    var friends_label = Titanium.UI.createLabel({
        text : '15 Friends to Next Level',
        bottom : '10.5%',
        right : '8%',
        textAlign : 'right',
        color : '#5afd9b',
        font : {
            fontSize : '10dip'
        }
    });
    view.add(friends_label);
    var status_textbox = Titanium.UI.createTextField({
        hintText : 'Set your status here.',
        font : {
            fontSize : '13dip'
        },
        color : '#63c689',
        textAlign : 'left',
        borderRadius : 12,
        bottom : '22%',
        height : '10%',
        width : '50%',
        right : '2%',
        backgroundImage : '/assets/inputButton002_up.png',
        zIndex : 600
    });
    view.add(status_textbox);
    var set_status_btn = Titanium.UI.createButton({
        title : 'Set Status',
        height : '7%',
        bottom : '16%',
        right : '12%',
        textAlign : 'center',
        font : {
            fontSize : '12dip'
        }
    });
    view.add(set_status_btn);

    set_status_btn.addEventListener('click', function(e) {
        if (status_textbox.value != "") {
            var set_status_url = "http://therealmattharmon.com/knp/set_status_message.php?uid=" + userinfo.Record[0].UID + "&set_status=" + Ti.Network.encodeURIComponent(status_textbox.value);
            var httpclientt = require('/ui/common/Functions/function');
            httpclientt.requestServer({
                success : function(e) {
                    items_json = JSON.parse(this.responseText);
                    if (items_json.Record != undefined) {
                        //alert(items_json.Record.Message);
                    }
                    //actInd.hide();

                },
                method : 'GET',
                contentType : 'text/xml',
                url : set_status_url
            });

            status_textbox.value = '';
        }
    });

    /*
     var arrowUP_imageview = Titanium.UI.createImageView({
     url : '/assets/iconControlArrowUp.png',
     width : '8%',
     height : '5%',
     right : '16%',
     top : '26.4%',

     });
     view.add(arrowUP_imageview);

     arrowUP_imageview.addEventListener('load', function(e) {
     //hideLoader();
     });

     var arrowDown_imageview = Titanium.UI.createImageView({
     url : '/assets/iconControlArrowDown.png',
     width : '8%',
     height : '5%',
     right : '25%',
     top : '70.2%',

     });
     view.add(arrowDown_imageview);

     arrowDown_imageview.addEventListener('load', function(e) {
     //hideLoader();
     });
     */
    return view;

}

//make constructor function the public component interface
module.exports = StatusScreen;
>>>>>>> New version
