function SceneryCustomization(userinfo) {
    var view = Titanium.UI.createView({
        top : "23%",
        height : "78%",
        width : "100%"
    });

    var gender = userinfo.Record[0].GENDER;

    var selected_menu_label = Titanium.UI.createLabel({
        text : 'Customize',
        top : '0%',
        left : '71%',
        textAlign : 'center',
        color : '#5afd9b',
        font : {
            fontSize : '12dip'
        }

    });

    view.add(selected_menu_label);
    var dress_counter = 1;
    var head_counter = 1;
    var hair_counter = 1;
    var jwel_counter = 1;
    var dress_button;
    var head_button;
    var hair_button;
    var jwel_button;
    var head_images = '';
    var dress_images = '';
    var hair_images = '';
    var jwel_images = '';

    if (gender == 'm') {
        head_images = 2;
        dress_images = 4;
        hair_images = 2;
        jwel_images = 2;

    } else {
        head_images = 2;
        dress_images = 5;
        hair_images = 2;
        jwel_images = 2;

    }
    if (gender == 'm') {
        var character_imageview1 = Titanium.UI.createImageView({
            height : '75.5%',
            width : '35%',
            top : '10%',
            left : '65%',
            image : '/assets/K_fullbody_bad.png',
            //bottom : '0%'
            //zIndex : 500
        });
        view.add(character_imageview1);
        character_imageview1.addEventListener('load', function(e) {
            //hideLoader();
        });

    } else {
        var character_imageview = Titanium.UI.createImageView({
            height : '75.5%',
            width : '38%',
            top : '10%',
            left : '65%',
            image : '/assets/dress' + dress_counter + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        view.add(character_imageview);
        character_imageview.addEventListener('load', function(e) {
            //hideLoader();
        });
        var face_imageview = Titanium.UI.createImageView({
            height : '75.5%',
            width : '38%',
            top : '10%',
            left : '65%',
            image : '/assets/face'+ head_counter + '.png',
            //bottom : '0%'
            //zIndex : 600
        });
        view.add(face_imageview);
        var hair_imageview = Titanium.UI.createImageView({
            height : '75.5%',
            width : '38%',
            top : '10%',
            left : '65%',
            image : '/assets/hair' + hair_counter + '.png',
            //bottom : '0%'
            //zIndex : 700
        });
        view.add(hair_imageview);
        var jwel_imageview = Titanium.UI.createImageView({
            height : '75.5%',
            width : '38%',
            top : '10%',
            left : '65%',
            image : '/assets/necklace' + jwel_counter + '.png',
            //bottom : '0%'
            //zIndex : 500
        });
        view.add(jwel_imageview);
        dress_button = Titanium.UI.createButton({
            backgroundImage : '/assets/button_small_UP.png',
            title : 'Dress ' + dress_counter,
            height : '6%',
            width : '35%',
            top : '15%',
            left : '3%'
        });
        view.add(dress_button);
        dress_button.addEventListener('click', function(e) {
            if (dress_counter == dress_images)
                dress_counter = 0;
            dress_counter++;
            dress_button.title = 'Dress ' + dress_counter;
            //alert(dress_counter);
            character_imageview.image = '/assets/dress' + dress_counter + '.png';

            // alert('/assets/dress'+dress_counter+'.png');

        });

        var counter = 10;
        head_button = Titanium.UI.createButton({
            backgroundImage : '/assets/button_small_UP.png',
            title : 'Head ' + head_counter,
            height : '6%',
            width : '35%',
            top : '26%',
            left : '3%'
        });
        view.add(head_button);
        head_button.addEventListener('click', function(e) {
            if (head_counter == head_images)
                head_counter = 0;
            //face_imageview.hide();
            head_counter++;
            head_button.title = 'Head ' + head_counter;
            face_imageview.image = '/assets/face'+ head_counter + '.png';
            //face_imageview.show();
            //face_imageview.zIndex += head_counter;
            //       face_imageview.zIndex = 600;
        });

        hair_button = Titanium.UI.createButton({
            backgroundImage : '/assets/button_small_UP.png',
            title : 'Hair ' + hair_counter,
            height : '6%',
            width : '35%',
            top : '36%',
            left : '3%'
        });
        view.add(hair_button);
        hair_button.addEventListener('click', function(e) {
            if (hair_counter == hair_images)
                hair_counter = 0;
            hair_counter++;
            hair_button.title = 'Hair ' + hair_counter;
            //alert(hair_counter);
            hair_imageview.image = '/assets/hair' + hair_counter + '.png';
        });

        jwel_button = Titanium.UI.createButton({
            backgroundImage : '/assets/button_small_UP.png',
            title : 'Jwelery ' + jwel_counter,
            height : '6%',
            width : '35%',
            top : '46%',
            left : '3%'
        });
        view.add(jwel_button);
        jwel_button.addEventListener('click', function(e) {
            if (jwel_counter == jwel_images)
                jwel_counter = 0;
            jwel_counter++;
            jwel_button.title = 'Jwelery ' + jwel_counter;
            jwel_imageview.image = '/assets/necklace' + jwel_counter + '.png';
        });

    }
    var decoration_label = Titanium.UI.createLabel({
        text : "DECORATION",
        textAlign : "center",
        left : "3%",
        top : "5%",
        width : "30%",
        height : "10%",

    });
    //view.add(decoration_label);
    var leftarrow_decoration = Titanium.UI.createButton({
        top : "15%",
        backgroundImage : "/assets/iconControlArrowRight.png",
        height : "6%",
        left : "1%",
        width : "8%"
    });
    //view.add(leftarrow_decoration);
    var rightarrow_decoration = Titanium.UI.createButton({
        top : "15%",
        backgroundImage : "/assets/iconControlArrowLeft.png",
        height : "6%",
        left : "30%",
        width : "8%"
    });
    //view.add(rightarrow_decoration);
    var style_label = Titanium.UI.createLabel({
        text : "Style",
        top : "22%",
        width : "30%",
        textAlign : "center",
        left : "3%",
        height : "10%",

    });
    //view.add(style_label);
    var leftarrow_style = Titanium.UI.createButton({
        top : "32%",
        backgroundImage : "/assets/iconControlArrowRight.png",
        height : "6%",
        left : "1%",
        width : "8%"
    });
    //view.add(leftarrow_style);
    var rightarrow_style = Titanium.UI.createButton({
        top : "32%",
        backgroundImage : "/assets/iconControlArrowLeft.png",
        height : "6%",
        left : "30%",
        width : "8%"
    });
    //view.add(rightarrow_style);
    var Color_label = Titanium.UI.createLabel({
        text : "Color Scheme",
        top : "40%",
        width : "30%",
        textAlign : "center",
        left : "3%",
        height : "10%",

    });
    //view.add(Color_label);
    var leftarrow_color = Titanium.UI.createButton({
        top : "50%",
        backgroundImage : "/assets/iconControlArrowRight.png",
        height : "6%",
        left : "1%",
        width : "8%"
    });
    //view.add(leftarrow_color);
    var rightarrow_color = Titanium.UI.createButton({
        top : "50%",
        backgroundImage : "/assets/iconControlArrowLeft.png",
        height : "6%",
        left : "30%",
        width : "8%"
    });
    //view.add(rightarrow_color);

    var kandptore = Titanium.UI.createButton({
        bottom : "16%",
        backgroundImage : "/assets/button_smallLong_HIGHLIGHTED.png",
        height : "8%",
        left : "16%",
        zIndex : 5000,
        //size:"10dip",
        title : "K&P Store",
        width : "25%"
    });
    view.add(kandptore);

    var chips = Titanium.UI.createButton({
        bottom : "15.5%",
        backgroundImage : "/assets/iconDiceRandom.png",
        height : "8%",
        left : "5%",
        width : "10%"
    });
    view.add(chips);
    /////////// Grid For decoration

    /*    var ScreenHeight = Titanium.Platform.displayCaps.platformHeight;
    var ScrolViewHeight = 15;
    //in percentage
    //var ScrolViewImageHeight = (ScrolViewHeight/100) * ScreenHeight;  //in px image should be SQUARE, height = width
    var ScrolViewImageHeight = "40";
    //alert(ScrolViewImageHeight);
    var ScrolView_Image_left = 0;
    var head_images;
    var dress_images;
    var hair_images;
    var jwel_images;
    if(gender == 'm'){
    head_images = 2;
    dress_images = 4;
    hair_images = 2;
    }
    else{
    head_images = 2;
    dress_images = 5;
    hair_images = 2;
    jwel_images = 2;

    }

    var color_scrol_view = Ti.UI.createScrollView({
    top : '5%',
    width : '60%',
    left : "1%",
    height : "3%",
    //borderColor : '#5afd9b',
    //borderRadius : '3',
    //borderWidth : '1',
    height : ScrolViewImageHeight + 'px',
    scrollType : 'horizontal'
    });
    view.add(color_scrol_view);

    for (var i = 1; i <= dress_images; i++) {
    var ImageView_InScroll = Ti.UI.createImageView({
    image : '/assets/dress'+i+'.png',
    left : ScrolView_Image_left,
    height : ScrolViewImageHeight + 'px',
    width : ScrolViewImageHeight + 'px'
    });
    color_scrol_view.add(ImageView_InScroll);
    ScrolView_Image_left +=  40;

    }
    ////////////////////////////////////////////////
    ScrolView_Image_left = 0;
    var head_scrol_view = Ti.UI.createScrollView({
    top : '22%',
    width : '60%',
    left : "1%",
    height : "3%",
    //borderColor : '#5afd9b',
    //borderRadius : '3',
    //borderWidth : '1',
    height : ScrolViewImageHeight + 'px',
    scrollType : 'horizontal'
    });
    view.add(head_scrol_view);

    for (var i = 0; i < head_images; i++) {
    var ImageView_InScroll = Ti.UI.createImageView({
    image : '/assets/face'+i+'.png',
    left : ScrolView_Image_left,
    height : ScrolViewImageHeight + 'px',
    width : ScrolViewImageHeight + 'px'
    });
    head_scrol_view.add(ImageView_InScroll);
    ScrolView_Image_left +=  40;

    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ScrolView_Image_left = 0;
    var style_scrol_view = Ti.UI.createScrollView({
    top : '40%',
    width : '60%',
    left : "1%",
    height : "3%",
    //borderColor : '#5afd9b',
    //borderRadius : '3',
    //borderWidth : '1',
    height : ScrolViewImageHeight + 'px',
    scrollType : 'horizontal'
    });
    view.add(style_scrol_view);

    for (var i = 0; i < hair_images; i++) {
    var ImageView_InScroll = Ti.UI.createImageView({
    image : '/assets/hair'+i+'.png',
    left : ScrolView_Image_left,
    height : ScrolViewImageHeight + 'px',
    width : ScrolViewImageHeight + 'px'
    });
    style_scrol_view.add(ImageView_InScroll);
    ScrolView_Image_left +=  40;

    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ScrolView_Image_left = 0;
    var decoration_scrol_view = Ti.UI.createScrollView({
    top : '57%',
    width : '60%',
    left : "1%",
    height : "3%",
    //borderColor : '#5afd9b',
    //borderRadius : '3',
    //borderWidth : '1',
    height : ScrolViewImageHeight + 'px',
    scrollType : 'horizontal'
    });
    view.add(decoration_scrol_view);

    for (var i = 0; i < jwel_images; i++) {
    var ImageView_InScroll = Ti.UI.createImageView({
    image : '/assets/necklace'+i+'.png',
    left : ScrolView_Image_left,
    height : ScrolViewImageHeight + 'px',
    width : ScrolViewImageHeight + 'px'
    });
    decoration_scrol_view.add(ImageView_InScroll);
    ScrolView_Image_left +=  40;

    }

    ////////////////////////////////////////////////

    ///    Grid For decoration
    ///Grid For Style
    var style_scrol_view = Ti.UI.createScrollView({
    bottom : '30%',
    width : '50%',
    left : "40%",
    height : "5%",
    height : ScrolViewImageHeight + 'px',
    scrollType : 'horizontal'
    });
    view.add(style_scrol_view);

    var ScrolView_Image_left = 0;
    var No_images = 8;
    /*
    for (var i = 0; i < No_images; i++) {
    var ImageView_InScroll = Ti.UI.createImageView({
    image : '/assets/' + i + '.png',
    left : ScrolView_Image_left,
    height : ScrolViewImageHeight + 'px',
    width : ScrolViewImageHeight + 'px'
    });
    style_scrol_view.add(ImageView_InScroll);

    ScrolView_Image_left = ScrolView_Image_left + ScrolViewImageHeight;
    }

    ///Grid For Style

    ////Grid for Color Scheme
    var color_scrol_view = Ti.UI.createScrollView({
    bottom : '40%',
    width : '50%',
    left : "40%",
    height : "5%",
    height : ScrolViewImageHeight + 'px',
    scrollType : 'horizontal'
    });
    view.add(color_scrol_view);

    var ScrolView_Image_left = 0;
    var No_images = 8;
    /*
    for (var i = 0; i < No_images; i++) {
    var ImageView_InScroll = Ti.UI.createImageView({
    image : '/assets/' + i + '.png',
    left : ScrolView_Image_left,
    height : ScrolViewImageHeight + 'px',
    width : ScrolViewImageHeight + 'px'
    });
    color_scrol_view.add(ImageView_InScroll);

    ScrolView_Image_left = ScrolView_Image_left + ScrolViewImageHeight;
    }
    */
    ////Grid for Color Scheme
    ////////// just for demo

    kandptore.addEventListener('click', function(e) {
        var kandpwindow = require('ui/common/MenuScreen/KandPscreen');
        var kandpp = new kandpwindow(userinfo);
        kandpp.open();
    });
    return view;
};
module.exports = SceneryCustomization;
