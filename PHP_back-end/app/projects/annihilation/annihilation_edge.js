
(function($,Edge,compId){var _=null,y=true,n=false,e34='${_special_menu}',e105='${_button_twitter}',x62='button_photos',e29='${_hitbox_vol_on}',e38='${_button_pressed_special}',e79='${_but_txt_interview}',x63='button_trouble',x25='rgba(255,0,0,1.00)',d='display',i='none',x21='rgba(192,192,192,1)',e36='${_but_txt_social}',x89='button_facebook',e43='${_button_pressed_about}',e40='${_button_home}',ta='text-align',e108='${_utton_txt_facebook}',xc='rgba(0,0,0,1)',x27='stage',c='color',e111='${_Youtube_icon_normal}',x23='rgba(0,42,255,1.00)',e47='${_but_txt_play}',e49='${_but_txt_website}',e81='${_button_trouble}',e32='${_music-volume-off-button}',e55='${_button_about}',x59='button_interview',x3='0.1.6',ty='translateY',x100='Youtube_icon_normal',p='px',o='opacity',x19='rgba(0,0,0,1.00)',e37='${_hitbox_home}',e82='${symbolSelector}',e42='${_loading}',e112='${_button_pressed_facebook}',x73='but_txt_badidea',e80='${_but_txt_trouble}',x4='0.11.0.150',e77='${_button_trailer}',e83='${_button_interview}',x60='button_badidea',a='Base State',x87='button_pressed_facebook',e48='${_atf-header}',e54='${_but_txt_about}',e50='${_Annihilation_Celebration_iPHONE_menu_screen_without_buttons}',x102='twitter_icon_normal',x31='rgba(255,255,255,1.00)',x69='but_txt_photos',x71='but_txt_trouble',x98='facebook_icon_normal',e28='${_music-volume-on-button}',x94='button_txt_twitter',lf='left',bg='background-color',e45='${_SocialMenu}',e56='${_atf-header-black}',x67='but_txt_trailer',e57='${_photo1}',e35='${_button_website}',x75='special_menu',e106='${_button_facebook}',e113='${_button_pressed_twitter}',x5='rgba(0,0,0,0)',e110='${_button_youtube}',e109='${_facebook_icon_normal}',e107='${_twitter_icon_normal}',g='image',po='center',x104='SocialMenu',x90='button_youtube',e33='${_Stage}',x96='utton_txt_facebook',b='block',dt='Default Timeline',x1='PakenhamFreeRegular',x='text',x88='button_pressed_youtube',e85='${_but_txt_trailer}',e51='${_button_pressed_website}',m='rect',x92='button_txt_youtube',h='height',e84='${_but_txt_badidea}',e114='${_button_pressed_youtube}',s='style',t='transform',e78='${_button_badidea}',e46='${_button_pressed_play}',tx='translateX',e39='${_button_social}',e76='${_button_photos}',e44='${_button_play}',x2='pt_sansregular',fs='font-size',x65='but_txt_interview',x64='rgba(255,255,255,1)',zy='scaleY',l='normal',x61='button_trailer',zx='scaleX',e53='${_button_pressed_social}',x12='18',e41='${_button_special}',w='width',x91='button_twitter',e52='${_but_txt_special}',e30='${_hitbox_vol_off}',ql='linear',x10='20',ff='font-family',x86='button_pressed_twitter',e58='${_aboutText}';var im='images/';var g18='atf-header.png',g101='Youtube%20icon%20normal.png',g6='Annihilation%20Celebration%20iPHONE%20menu%20screen%20without%20buttons.png',g24='music-volume-on-button.png',g20='House%20Button%20Normal.png',g103='twitter%20icon%20normal.png',g22='music-volume-off-button.png',g8='button%20normal%20view.png',g7='button%20pressed%20view.png',g26='loading.png',g99='facebook%20icon%20normal.png',g16='photo1.png';var s68="MOVIE TRAILER",s11="SPECIAL FEATURES",s70="PHOTOS",s9="PLAY MOVIE",s15="SOCIAL",s17="What began as a fun movie project for two high school friends, Jonathan Pierce and Doug Lee, has turned into a unique action packed short film by Thinkpierce Productions, reminiscent of Jet Lee and Jackie Chan movies.",s13="ABOUT THE FILM",s95="TWITTER",s93="YOUTUBE",s14="THINKPIERCE.COM",s72="CAR TROUBLE",s66="THE INTERVIEW",s74="A BAD IDEA",s97="FACEBOOK";var fonts={};fonts[x1]='<link rel=\"stylesheet\" href=\"stylesheet.css\" type=\"text/css\" media=\"screen\" title=\"\" charset=\"utf-8\" />';fonts[x2]='<link rel=\"stylesheet\" href=\"stylesheet.css\" type=\"text/css\" media=\"screen\" title=\"\" charset=\"utf-8\" />';var P=Edge.P,T=Edge.T,A=Edge.A;var resources=[];var symbols={"stage":{v:x3,b:x4,bS:a,iS:a,gpu:y,cn:{dom:[{id:'Annihilation_Celebration_iPHONE_menu_screen_without_buttons',t:g,r:[0,0,960,640],f:[x5,im+g6]},{id:'button_pressed_play',v:i,t:g,r:[179,130,487,122],f:[x5,im+g7],tf:[[-181,-46],[],[],[0.25,0.25]]},{id:'SocialMenu',v:i,t:m,r:[300,190,0,0]},{id:'button_pressed_special',v:i,t:g,r:[179,160,487,122],f:[x5,im+g7],tf:[[-181,-46],[],[],[0.25,0.25]]},{id:'button_pressed_about',v:i,t:g,r:[383,205,487,122],f:[x5,im+g7],tf:[[-387,-60],[],[],[0.25,0.25]]},{id:'button_pressed_website',v:i,t:g,r:[90,145,487,122],f:[x5,im+g7],tf:[[-94,29],[],[],[0.25,0.25]]},{id:'button_pressed_social',v:i,t:g,r:[61,130,487,122],f:[x5,im+g7],tf:[[-65,75],[],[],[0.25,0.25]]},{id:'button_social',t:g,r:[179,251,487,122],f:[x5,im+g8],tf:[[-182,-45],[],[],[0.25,0.25]]},{id:'button_about',t:g,r:[137,184,487,122],f:[x5,im+g8],tf:[[-141,-38],[],[],[0.25,0.25]]},{id:'button_special',t:g,r:[142,152,487,122],f:[x5,im+g8],tf:[[-146,-37],[],[],[0.25,0.25]]},{id:'button_website',t:g,r:[178,221,487,122],f:[x5,im+g8],tf:[[-182,-46],[],[],[0.25,0.25]]},{id:'button_play',t:g,r:[179,137,487,122],f:[x5,im+g8],tf:[[-182,-52],[],[],[0.25,0.25]]},{id:'but_txt_play',t:x,r:[190,136,95,16],text:s9,align:"center",n:[x1,x10,"rgba(255,255,255,1.00)",l,i,l]},{id:'but_txt_special',t:x,r:[191,167,104,17],text:s11,align:"center",n:[x1,x12,"rgba(255,255,255,1)",l,i,l]},{id:'but_txt_about',t:x,r:[191,196,104,17],text:s13,align:"center",n:[x1,x12,"rgba(255,255,255,1)",l,i,l]},{id:'but_txt_website',t:x,r:[191,228,104,17],text:s14,align:"center",n:[x1,x12,"rgba(255,255,255,1)",l,i,l]},{id:'but_txt_social',t:x,r:[191,257,96,17],text:s15,align:"center",n:[x1,x12,"rgba(255,255,255,1)",l,i,l]},{id:'special_menu',v:i,t:m,r:[301,130,0,0]},{id:'photo1',v:i,t:g,tag:'img',r:[16,15,960,640],f:[x5,im+g16],tf:[[-255,-175],[],[],[0.5,0.5]]},{id:'aboutText',v:i,t:x,r:[19,146,445,250],text:s17,align:"left",n:[x2,x10,"rgba(255,255,255,1)",l,i,l],tf:[[1,-112]]},{id:'atf-header',v:i,t:g,r:[169,126,960,41],f:[x5,im+g18],tf:[[-408,-130],[],[],[0.5,0.5]]},{id:'atf-header-black',v:i,t:m,r:[0,0,480,7],f:[x19],s:[0,xc,i]},{id:'button_home',v:i,t:g,r:[231,282,93,93],f:[x5,im+g20],tf:[[-263,-313],[],[],[0.25,0.25]]},{id:'hitbox_home',v:i,t:m,r:[0,0,50,39],f:[x21],s:[0,"rgb(0, 0, 0)",i]},{id:'music-volume-off-button',t:g,r:[453,3,93,93],f:[x5,im+g22],tf:[[-34,-34],[],[],[0.25,0.25]]},{id:'hitbox_vol_off',t:m,r:[428,0,50,46],f:[x23],s:[0,"rgb(0, 0, 0)",i],tf:[[2]]},{id:'music-volume-on-button',t:g,r:[445,7,93,93],f:[x5,im+g24],tf:[[-26,-38],[],[],[0.25,0.25]]},{id:'hitbox_vol_on',t:m,r:[427,0,51,45],f:[x25],s:[0,xc,i],tf:[]},{id:'loading',t:g,r:[0,0,480,320],f:[x5,im+g26]}],sI:[{id:'special_menu',sN:'special_menu'},{id:'SocialMenu',sN:'SocialMenu'}]},s:{},tl:{"Default Timeline":{fS:a,tS:"",d:1962000,a:y,l:{"Init":0,"Menu":3000,"Movie":300000,"Gallery":420000,"Special":900000,"Social":1200000,"About":1500000},tt:[]}}},"special_menu":{v:x3,b:x4,bS:a,iS:a,gpu:y,cn:{dom:[{r:[0,0,487,122],id:x59,tf:[[-182,-45],{},{},[0.25,0.25]],t:g,f:[x5,im+g8]},{r:[0,60,487,122],id:x60,tf:[[-182,-45],{},{},[0.25,0.25]],t:g,f:[x5,im+g8]},{r:[0,89,487,122],id:x61,tf:[[-182,-43],{},{},[0.25,0.25]],t:g,f:[x5,im+g8]},{r:[0,120,487,122],id:x62,tf:[[-182,-45],{},{},[0.25,0.25]],t:g,f:[x5,im+g8]},{r:[0,29,487,122],id:x63,tf:[[-182,-43],{},{},[0.25,0.25]],t:g,f:[x5,im+g8]},{n:[x1,20,x64,l,i,l],t:x,tf:{},id:x65,text:s66,align:po,r:[6,6,104,17]},{n:[x1,20,x64,l,i,l],t:x,tf:[[0,61]],id:x67,text:s68,align:po,r:[6,36,104,17]},{r:[6,127,104,17],n:[x1,20,x64,l,i,l],id:x69,text:s70,align:po,t:x},{n:[x1,20,x64,l,i,l],t:x,tf:[[0,1]],id:x71,text:s72,align:po,r:[6,36,104,17]},{n:[x1,20,x64,l,i,l],t:x,tf:[[0,31]],id:x73,text:s74,align:po,r:[6,36,104,17]}],sI:[]},s:{},tl:{"Default Timeline":{fS:a,tS:"",d:0,a:y,tt:[]}}},"SocialMenu":{v:x3,b:x4,bS:a,iS:a,gpu:y,cn:{dom:[{t:g,tf:[[-182,-45],{},{},[0.25,0.25]],v:i,r:[0,60,487,122],id:x86,f:[x5,im+g7]},{t:g,tf:[[-183,14],{},{},[0.25,0.25]],v:i,r:[0,-60,487,122],id:x87,f:[x5,im+g7]},{t:g,tf:[[-183,-46],{},{},[0.25,0.25]],v:i,r:[0,30,487,122],id:x88,f:[x5,im+g7]},{r:[0,0,487,122],id:x89,tf:[[-182,-45],{},{},[0.25,0.25]],t:g,f:[x5,im+g8]},{r:[0,37,487,122],id:x90,tf:[[-182,-51],{},{},[0.25,0.25]],t:g,f:[x5,im+g8]},{r:[0,62,487,122],id:x91,tf:[[-182,-45],{},{},[0.25,0.25]],t:g,f:[x5,im+g8]},{r:[31,37,81,17],n:[x1,20,x64,l,i,l],id:x92,text:s93,align:lf,t:x},{r:[31,68,80,17],n:[x1,20,x64,l,i,l],id:x94,text:s95,align:lf,t:x},{n:[x1,20,x64,l,i,l],t:x,tf:{},id:x96,text:s97,align:lf,r:[32,6,80,17]},{r:[10,15,69,69],id:x98,tf:[[-27,-34],{},{},[0.25,0.25]],t:g,f:[x5,im+g99]},{r:[8,38,68,68],id:x100,tf:[[-24,-25],{},{},[0.25,0.25]],t:g,f:[x5,im+g101]},{r:[8,69,68,68],id:x102,tf:[[-24,-25],{},{},[0.25,0.25]],t:g,f:[x5,im+g103]}],sI:[]},s:{},tl:{"Default Timeline":{fS:a,tS:"",d:0,a:y,tt:[]}}}};var S1=symbols[x27];var tl0=S1.tl[dt].tt,st1=S1.s[a]={},A1=A(_,tl0,st1);A1.A(e28).P(zx,0.25,t,_,"").P(zy,0.25,t).P(tx,-26.76,t,_,p).P(ty,-38.35,t);A1.A(e29).P(bg,x25,c).P(o,0,_,_,"");A1.A(e30).P(bg,x23,c).P(o,0,_,_,"").P(tx,2,t,_,p).P(w,50);A1.A(e32).P(zx,0.25,t,_,"").P(zy,0.25,t).P(tx,-34.18,t,_,p).P(ty,-34.18,t);A1.A(e33).P(bg,x19,c).P(h,320).P(w,480);A1.A(e34).P(tx,-0.83,t).T(900,-0.83).P(d,i).T(0,i).T(300,i).T(900,b).T(1200,i);A1.A(e35).P(zy,0.25,t,_,"").P(zx,0.25,t).P(ty,-46.45,t,_,p).P(tx,-182,t).P(d,b).T(300,i);A1.A(e36).P(d,b).T(300,i).T(900,b).T(1500,i);A1.A(e37).P(h,39).P(o,0,_,_,"").P(w,50,_,_,p).P(d,i).T(0,i).T(300,b).T(900,i).T(1500,b);A1.A(e38).P(zy,0.25,t,_,"").P(zx,0.25,t).P(ty,-46.12,t,_,p).P(tx,-181.83,t).P(d,i).T(0,i).T(1200,b).T(1500,i);A1.A(e39).P(zy,0.25,t).P(zx,0.25,t).P(ty,-45.45,t,_,p).P(tx,-182.83,t).P(d,b).T(300,i).T(900,i).T(1200,b).T(1500,i);A1.A(e40).P(zy,0.25,t,_,"").P(zx,0.25,t).P(ty,-313.16,t,_,p).P(tx,-263.01,t).P(d,i).T(0,i).T(300,b).T(900,i).T(1500,b);A1.A(e41).P(zy,0.25,t).P(zx,0.25,t).P(ty,-37.79,t,_,p).P(tx,-146.16,t).P(d,b).T(300,i).T(900,b).T(1200,i);A1.A(e42).P(d,b).T(3,i);A1.A(e43).P(zy,0.25,t,_,"").P(zx,0.25,t).P(ty,-60.62,t,_,p).P(tx,-387,t).P(d,i).T(0,i).T(900,b).T(1500,i);A1.A(e44).P(zy,0.25,t,_,"").P(zx,0.25,t).P(ty,-52.79,t,_,p).P(tx,-182.83,t).P(d,b).T(300,i);A1.A(e45).P(d,i).T(1200,b).T(1500,i);A1.A(e46).P(zy,0.25,t,_,"").P(zx,0.25,t).P(ty,-46.12,t,_,p).P(tx,-181.83,t).P(d,i).T(0,i).T(900,b).T(1500,i);A1.A(e47).P(c,x31,c).P(ta,po).P(fs,20).P(d,b).T(300,i).T(900,b).T(1500,i);A1.A(e48).P(tx,-408.33,t).P(zy,0.5,t,_,"").P(ty,-130.54,t,_,p).P(zx,0.5,t,_,"").P(d,i).T(1500,b);A1.A(e49).P(d,b).T(300,i).T(900,b).T(1500,i);A1.A(e50).P(tx,-240,t).T(5,-240).P(d,b).T(0,b).T(300,i).T(900,b).T(1500,i).P(zy,0.5,t,_,"").T(5,0.5).P(ty,-160,t,_,p).T(5,-160).P(zx,0.5,t,_,"").T(5,0.5);A1.A(e51).P(zy,0.25,t,_,"").P(zx,0.25,t).P(ty,29.37,t,_,p).P(tx,-94.5,t).P(d,i).T(0,i).T(900,b).T(1500,i);A1.A(e52).P(fs,18).P(d,b).T(300,i).T(900,b).T(1500,i);A1.A(e53).P(zy,0.25,t,_,"").P(zx,0.25,t).P(ty,75.37,t,_,p).P(tx,-65.33,t).P(d,i).T(0,i).T(900,b).T(1200,i);A1.A(e54).P(d,b).T(300,i).T(900,b).T(1500,i);A1.A(e55).P(zy,0.25,t,_,"").P(zx,0.25,t).P(ty,-38.95,t,_,p).P(tx,-141.16,t).P(d,b).T(300,i);A1.A(e56).P(bg,x19,c).P(d,i).T(1500,b);A1.A(e57).P(zy,0.5,t,_,"").P(zx,0.5,t).P(ty,-175,t,_,p).P(tx,-255.83,t).P(d,i).T(420,b).T(900,i);A1.A(e58).P(ta,lf).P(tx,1.33,t).P(ff,x2).P(d,i).T(1500,b).P(h,320).T(1500,320).P(ty,-145.83,t).T(1500,-587,462,ql).P(fs,12).T(1500,12);var S2=symbols[x75];var tl1=S2.tl[dt].tt,st2=S2.s[a]={},A2=A(_,tl1,st2);A2.A(e76).P(zx,0.25,t,_,"").P(tx,-182.33,t,_,p).P(ty,-45.45,t).P(zy,0.25,t,_,"");A2.A(e77).P(zx,0.25,t).P(tx,-182.33,t,_,p).P(ty,-43.95,t).P(zy,0.25,t,_,"");A2.A(e78).P(zx,0.25,t).P(tx,-182.33,t,_,p).P(ty,-45.62,t).P(zy,0.25,t,_,"");A2.A(e79).P(tx,0.83,t,_,p);A2.A(e80).P(ty,1.16,t);A2.A(e81).P(zx,0.25,t,_,"").P(tx,-182.33,t,_,p).P(ty,-43.95,t).P(zy,0.25,t,_,"");A2.A(e82).P(h,151.66,_,_,p).P(w,121.75);A2.A(e83).P(zx,0.25,t,_,"").P(tx,-182.33,t,_,p).P(ty,-45.62,t).P(zy,0.25,t,_,"");A2.A(e84).P(ty,31.16,t,_,p).P(tx,0.5,t);A2.A(e85).P(ty,61.33,t).P(tx,0.5,t);var S3=symbols[x104];var tl2=S3.tl[dt].tt,st3=S3.s[a]={},A3=A(_,tl2,st3);A3.A(e105).P(zx,0.25,t,_,"").P(ty,-45.29,t,_,p).P(zy,0.25,t,_,"").P(tx,-182.49,t,_,p);A3.A(e106).P(zx,0.25,t,_,"").P(ty,-45.62,t,_,p).P(zy,0.25,t,_,"").P(tx,-182.5,t,_,p);A3.A(e107).P(zx,0.25,t,_,"").P(ty,-25.64,t,_,p).P(zy,0.25,t,_,"").P(tx,-24.81,t,_,p);A3.A(e82).P(h,91.68).P(w,122.17);A3.A(e108).P(ta,lf).P(tx,-0.32,t);A3.A(e109).P(zx,0.25,t,_,"").P(ty,-34.62,t,_,p).P(zy,0.25,t,_,"").P(tx,-27.5,t,_,p);A3.A(e110).P(zx,0.25,t,_,"").P(ty,-51.29,t,_,p).P(zy,0.25,t,_,"").P(tx,-182.49,t,_,p);A3.A(e111).P(zx,0.25,t,_,"").P(ty,-25.81,t,_,p).P(zy,0.25,t,_,"").P(tx,-24.81,t,_,p);A3.A(e112).P(zy,0.25,t,_,"").P(zx,0.25,t).P(tx,-183.33,t,_,p).P(ty,14.37,t).P(d,i).T(0,i);A3.A(e113).P(zy,0.25,t,_,"").P(zx,0.25,t).P(tx,-182.5,t,_,p).P(ty,-45.45,t).P(d,i).T(0,i);A3.A(e114).P(zy,0.25,t,_,"").P(zx,0.25,t).P(tx,-183.08,t,_,p).P(ty,-46.45,t).P(d,i).T(0,i);Edge.registerCompositionDefn(compId,symbols,fonts,resources);$(window).ready(function(){Edge.launchComposition(compId);});})(jQuery,AdobeEdge,"EDGE-23165460");