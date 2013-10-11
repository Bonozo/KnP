
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",300000,function(sym,e){if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");}
sym.$("music-volume-on-button").hide();sym.$("music-volume-off-button").hide();sym.$("hitbox_vol_on").hide();sym.$("hitbox_vol_off").hide();var movieName=sym.getParameter("movieName");sym.$("#"+movieName).css({"position":"absolute","top":"70px","width":"480px","height":"250px","overflow-x":"hidden","display":"block"});$('<script>document.getElementById("'+movieName+'").play();</script>').appendTo("#Stage");sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",900000,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.$("music-volume-on-button").hide();sym.$("music-volume-off-button").hide();sym.$("hitbox_vol_on").hide();sym.$("hitbox_vol_off").hide();music=1;$('<video src="movies/movie.mp4" id="movie"/>').appendTo("#Stage");sym.$("#movie").css({"width":"0px","height":"0px","overflow-x":"hidden"});$('<video src="movies/interview.mp4" id="interview"/>').appendTo("#Stage");sym.$("#interview").css({"width":"0px","height":"0px","overflow-x":"hidden"});$('<video src="movies/cartrouble.mp4" id="cartrouble"/>').appendTo("#Stage");sym.$("#cartrouble").css({"width":"0px","height":"0px","overflow-x":"hidden"});$('<video src="movies/badidea.mp4" id="badidea"/>').appendTo("#Stage");sym.$("#badidea").css({"width":"0px","height":"0px","overflow-x":"hidden"});$('<video src="movies/trailer.mp4" id="trailer"/>').appendTo("#Stage");sym.$("#trailer").css({"width":"0px","height":"0px","overflow-x":"hidden"});sym.setParameter("photo",1);sym.play();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",3000,function(sym,e){stage=1;sym.$("#movie").css({"width":"0px","height":"0px","overflow-x":"hidden"});sym.$("#interview").css({"width":"0px","height":"0px","overflow-x":"hidden"});sym.$("#cartrouble").css({"width":"0px","height":"0px","overflow-x":"hidden"});sym.$("#badidea").css({"width":"0px","height":"0px","overflow-x":"hidden"});sym.$("#trailer").css({"width":"0px","height":"0px","overflow-x":"hidden"});if(music>0)
{if(window.PhoneGap)
{loopSound("music-title","audio/menubackgroundaudio");}
sym.$("music-volume-on-button").show();sym.$("music-volume-off-button").hide();sym.$("hitbox_vol_on").show();sym.$("hitbox_vol_off").hide();}
else
{sym.$("music-volume-on-button").hide();sym.$("music-volume-off-button").show();sym.$("hitbox_vol_on").hide();sym.$("hitbox_vol_off").show();}
sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",1200000,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",420000,function(sym,e){stage=2;var photo=1;sym.setParameter("photo",photo);sym.$("photo1").attr("src","images/photo"+photo+".png");if(music>0)
{if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");loopSound("music-gallery","audio/photo-gallery-music");}
sym.$("music-volume-on-button").show();sym.$("music-volume-off-button").hide();sym.$("hitbox_vol_on").show();sym.$("hitbox_vol_off").hide();}
else
{sym.$("music-volume-on-button").hide();sym.$("music-volume-off-button").show();sym.$("hitbox_vol_on").hide();sym.$("hitbox_vol_off").show();}
sym.stop();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_photo1}","touchstart",function(sym,e){if(e.pageX==undefined)
{var touch=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];startTouchX=touch.pageX;}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_photo1}","touchend",function(sym,e){if(e.pageX==undefined)
{var touch=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];if(startTouchX<touch.pageX)
{playButtonSound();var photo=sym.getParameter("photo");photo=photo+1;if(photo>10)
{photo=1;}
sym.setParameter("photo",photo);sym.$("photo1").attr("src","images/photo"+photo+".png");}
else if(startTouchX>touch.pageX)
{playButtonSound();var photo=sym.getParameter("photo");photo=photo-1;if(photo<1)
{photo=10;}
sym.setParameter("photo",photo);sym.$("photo1").attr("src","images/photo"+photo+".png");}}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_pressed_special}","click",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
sym.play("Special");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_pressed_website}","click",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
window.open("http://thinkpierce.com","_self");});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",1500000,function(sym,e){stage=3;sym.$("music-volume-on-button").hide();sym.$("music-volume-off-button").hide();sym.$("hitbox_vol_on").hide();sym.$("hitbox_vol_off").hide();sym.setParameter("aboutY",146);sym.$("aboutText").css({"top":"146px"});window.readit=function()
{if(window.PhoneGap)
{playSound("about","audio/aboutthefilm")}
sym.play();}
if(window.PhoneGap)
{stopSound("music-title");}
sym.$("aboutText").html('<center><br><img src="images/about_the_film_logo.png" width="50%" height="50%"><br><img src="images/button%20normal%20view.png" width="122" height="31" ontouchstart=readit();><br></center><P STYLE="text-indent: 0.5in; margin-bottom: 0in">What began as a fun movie project for two high school friends, Jonathan Pierce and Doug Lee, has turned into a unique action packed short film by Thinkpierce Productions, reminiscent of Jet Lee and Jackie Chan movies.  </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in"><I>Annihilation Celebration</I>, which is now available as a movie app, as well as a standard movie download is the second short film produced by <A HREF="#" ontouchstart=openURL("http://thinkpierce.com");return false;>Thinkpierce.com</A> that not only cuts to the chase of the action but showcases a non-stop choreographed kick fest from start to finish.</P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">Although the two young filmmakers, Pierce and Lee, had no official fight training, they did have a fascination for the fight movie genre like few others. In addition to scouting out locations for the film, they spent hours choreographing each moment of the epic brawl. And, with the help of long time friend, Matt Minor, who volunteered his services as videographer, they mapped out a detailed plan to create an instant <A HREF="#" ontouchstart=openURL("http://thinkpierceproductions.com");return false;>Thinkpierce Productions</A> classic. The rest is fight film making history&hellip;</P> <P STYLE="margin-bottom: 0in"><BR> </P> <P ALIGN=CENTER STYLE="margin-bottom: 0in"><B>Enemy at the Garden Gates</B></P> <P STYLE="margin-bottom: 0in"><BR> </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">The first location of the film, which had been an obvious pick because of its aesthetic appeal, was a place known as Woodward Park in Tulsa, Oklahoma. A very scenic spot, it had an excellent lay out for the initial confrontation between the two mortal foes.   </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">As the young trio began filming the opening scenes, they intensified the conflict with each shot, pushing the envelope as far as they could. No place was off limits in Woodward as they combined their rehearsed choreography with improvised creativity, setting the stage for an epic showdown.   </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">The next setting of the film took them to an old abandoned house that Jonathan had spotted off the side of a country road outside Tulsa. It was a perfect location for some great fight scenes with its dilapidated appearance and near condemned condition. But, as is normally the case with all action films, they soon ran into a hurdle.</P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">During filming, someone driving by the property had called the police to report trespassing and fighting at the location. A police officer arrived and shut down the three-man film crew, keeping them from completing a critical part of the film.</P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">However, with the technical help of Brian Spratt, a long time friend and Thinkpierce.com veteran, who appeared in two of Jonathan&rsquo;s other films, <A HREF="#" ontouchstart=openURL("http://caichimovie.com");return false;>Cai Chi</A>, and <A HREF="#" ontouchstart=openURL("http://theturtleneckclubmovie.com");return false;>The Turtleneck Club</A>, they were able to make use of a rustic looking hallway at another location to maintain a consistent thematic effect. </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">From there, the film smoothly transitions on to the next group of locations, which would prove to be the riskiest yet for the young film crew.  </P> <P STYLE="margin-bottom: 0in"><BR> </P> <P ALIGN=CENTER STYLE="margin-bottom: 0in"><B>From Leaches to Death Defying Heights</B></P> <P STYLE="margin-bottom: 0in"><BR> </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">An explosive kick from Jonathan swiftly moves the scene from the hallway to another abandoned house near west Tulsa with crumbling walls and a rotting roof. The battle picks up with Jonathan and Doug fighting their way inside. They then struggle through the ruins, and exit the building near a small pond of water. Jonathan receives a kick to the stomach and falls into the stagnant water (which held some leaches that the actor actually had to remove after filming.)  </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">Next, the fighting transitions back to Woodward Park as Doug and Jonathan continue their epic battle in one of the park&rsquo;s fountains. The effect of fighting in water enabled Jonathan and Doug to amp up the choreography even more with furious kicks and blows as they force the action to a thrilling climax.  </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">This sets up the most dangerous scene up to that point: a shot of the two fighting with staffs on top of a metal awning. Not only were they now choreographing their fight scenes with weapons, they also had to maintain their balance on an unsteady and narrow structure. The scene ends with Doug striking Jonathan in the stomach and a quick transition to the final location&mdash;Tulsa&rsquo;s landmark Pedestrian Bridge on Riverside Drive.   </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">The bridge connects to a running trail across the Arkansas River and includes a concrete balcony that extends out to the middle of the water. The site&rsquo;s isolated industrial look was the perfect place to set the stage for the fight&rsquo;s grand finale. Camera operator, Matt Minor, had come up with the idea of wearing rollerblades for this scene to give the effect of an increased range of motion, plus, add another element of action as the fight intensified.  </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">The final scene was shot over two separate mornings, giving local walkers an unexpected surprise. What seemingly was a fight between two shirtless, barefoot warriors (not to mention, a skating camera man circling around them) was actually a finely crafted epic battle drawing to a close.    </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">The movie comes to an end with Jonathan&rsquo;s surrender. The camera captures Doug grabbing his neck and violently forcing him into submission against a backdrop of raging waters below. The danger is all too real, and Jonathan has no choice but to submit to defeat. The two bow to one another, and the action concludes.   </P> <P STYLE="margin-bottom: 0in"><BR> </P> <P ALIGN=CENTER STYLE="margin-bottom: 0in"><B>Bringing an Epic Back to Life</B></P> <P STYLE="margin-bottom: 0in"><BR> </P> <P STYLE="margin-bottom: 0in">At the time, Jonathan, who was a senior in high school, used Avid, the school&rsquo;s video production editing software to piece together what had ended up being a seventeen-minute fight movie.  </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">It was celebrated among various friends and family members and served as great entertainment at house parties. As the years passed, however, the original DV tape became mixed in with some of Jonathan&rsquo;s other projects and forgotten. In the beginning of 2011, Jonathan decided it was time to revive his long time website, Thinkpierce.com and re-edit 4 independent films he had created&mdash;One was <A HREF="#" ontouchstart=openURL("http://annihilationcelebrationmovie.com");return false;><I>Annihilation Celebration</I></A>.</P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">Giving the film a complete overhaul, Jonathan used the software, Final Cut Pro to import the original raw footage and start again from scratch. Jonathan edited a completely new audio experience, adding the sounds of punches, kicks, whooshes, falls, footsteps, grunts, as well as the sounds of trees and water in some scenes. Time was also spent selecting new edgy music tracks that fit perfectly with the fast action sequences.  </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">With a fresh new perspective, Jonathan was able to approach the film from a new angle and tighten up the film considerably. What had been a seventeen-minute short film, was now streamlined into a nine-minute, non-stop fight. Doug Lee, who just happened to be visiting from China, was able to join his old fighting partner in bringing <I>Annihilation Celebration</I> back to life and the two decided to film some short teaser spots for the upcoming release of the movie.  </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">Over the next couple of months, Jonathan tied up all the loose ends and organized the elements of the newly edited movie into an app format with the help of app builders, <A HREF="#" ontouchstart=openURL("http://bonozo.com");return false;>Bonozo LLC</A>.  </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">Jonathan&rsquo;s production company, <A HREF="#" ontouchstart=openURL("http://thinkpierceproductions.com");return false;>Thinkpierce Productions</A>, also released the movie on Amazon.com as a standard movie download&mdash;making it possible for anyone with virtually any device, to experience one of Thinkpierce.com&rsquo;s first films, known by a title that says it all&mdash;Annihilation Celebration.</P> <P STYLE="margin-bottom: 0in"><BR> </P> <P ALIGN=CENTER STYLE="margin-bottom: 0in"><B>About Thinkpierce.com</B></P> <P STYLE="margin-bottom: 0in"><BR> </P> <P STYLE="text-indent: 0.5in; margin-bottom: 0in">Thinkpierce is a pseudonym and entertainment branding of filmmaker, writer, musician, and artist, Jonathan Pierce. Jonathan&rsquo;s projects include the production of a variety of independent films and an innovative book app series, which are available for purchase on iTunes and Amazon.com. You can get a front row seat to the action by checking out Jonathan&rsquo;s updates, artwork, stories, and original products at <A HREF="#" ontouchstart=openURL("http://thinkpierce.com");return false;>Thinkpierce.com</A>.</P>');sym.stop();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_aboutText}","touchstart",function(sym,e){if(e.pageY==undefined)
{var touch=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];startTouchY=touch.pageY;}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_aboutText}","touchmove",function(sym,e){if(e.pageY==undefined)
{var touch=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];var aboutY=sym.getParameter("aboutY");aboutY=aboutY+touch.pageY-startTouchY;if(aboutY>146)
{aboutY=146;}
sym.$("aboutText").css({"top":aboutY+"px"});}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_aboutText}","touchend",function(sym,e){if(e.pageY==undefined)
{var touch=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];var aboutY=sym.getParameter("aboutY");aboutY=aboutY+touch.pageY-startTouchY;if(aboutY>146)
{aboutY=146;}
sym.$("aboutText").css({"top":aboutY+"px"});sym.setParameter("aboutY",aboutY);}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_but_txt_play}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.setParameter("movieName","movie");sym.play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_play}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.setParameter("movieName","movie");sym.play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_but_txt_special}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
sym.play("Special");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_special}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
sym.play("Special");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_but_txt_about}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
sym.play("About");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_about}","touchstart",function(sym,e){sym.play("About");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_but_txt_website}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://thinkpierce.com");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_website}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://thinkpierce.com");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_but_txt_social}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
sym.play("Social");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_social}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
sym.play("Social");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_pressed_play}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.setParameter("movieName","movie");sym.play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_pressed_about}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
sym.play("About");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_hitbox_home}","touchstart",function(sym,e){if(window.PhoneGap)
{stopSound("about");stopSound("music-gallery");playButtonSound();}
sym.play("Menu");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_hitbox_vol_on}","touchstart",function(sym,e){stopSound("music-title","audio/menubackgroundaudio");stopSound("music-gallery","audio/photo-gallery-music");sym.$("music-volume-on-button").hide();sym.$("music-volume-off-button").show();sym.$("hitbox_vol_on").hide();sym.$("hitbox_vol_off").show();music=0;});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_hitbox_vol_off}","touchstart",function(sym,e){if(stage==1)
{loopSound("music-title","audio/menubackgroundaudio");}
else
{loopSound("music-gallery","audio/photo-gallery-music");}
sym.$("music-volume-on-button").show();sym.$("music-volume-off-button").hide();sym.$("hitbox_vol_on").show();sym.$("hitbox_vol_off").hide();music=1;});
//Edge binding end
})("stage");
//=========================================================
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"${_but_txt_interview}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.getComposition().getStage().setParameter("movieName","interview");sym.getComposition().getStage().play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_interview}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.getComposition().getStage().setParameter("movieName","interview");sym.getComposition().getStage().play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_but_txt_trouble}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.getComposition().getStage().setParameter("movieName","cartrouble");sym.getComposition().getStage().play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_trouble}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.getComposition().getStage().setParameter("movieName","cartrouble");sym.getComposition().getStage().play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_but_txt_badidea}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.getComposition().getStage().setParameter("movieName","badidea");sym.getComposition().getStage().play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_badidea}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.getComposition().getStage().setParameter("movieName","badidea");sym.getComposition().getStage().play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_but_txt_trailer}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.getComposition().getStage().setParameter("movieName","trailer");sym.getComposition().getStage().play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_trailer}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
if(navigator.userAgent.toLowerCase().match(/android/))
{playMovie("movie");}
else
{sym.getComposition().getStage().setParameter("movieName","trailer");sym.getComposition().getStage().play("Movie");}});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_but_txt_photos}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
sym.getComposition().getStage().play("Gallery");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_photos}","touchstart",function(sym,e){if(window.PhoneGap)
{playButtonSound();}
sym.getComposition().getStage().play("Gallery");});
//Edge binding end
})("special_menu");
//Edge symbol: 'SocialMenu'
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"${_utton_txt_facebook}","touchstart",function(sym,e){if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://facebook.com/thinkpierce");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_facebook_icon_normal}","touchstart",function(sym,e){if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://facebook.com/thinkpierce");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_facebook}","touchstart",function(sym,e){if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://facebook.com/thinkpierce");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_txt_youtube}","touchstart",function(sym,e){if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://youtube.com/thinkpierce");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_Youtube_icon_normal}","touchstart",function(sym,e){if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://youtube.com/thinkpierce");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_youtube}","touchstart",function(sym,e){if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://youtube.com/thinkpierce");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_txt_twitter}","touchstart",function(sym,e){if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://twitter.com/thinkpierce");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_twitter_icon_normal}","touchstart",function(sym,e){if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://twitter.com/thinkpierce");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_button_twitter}","touchstart",function(sym,e){if(window.PhoneGap)
{stopSound("music-title","audio/menubackgroundaudio");}
openURL("http://twitter.com/thinkpierce");});
//Edge binding end
})("SocialMenu");
//Edge symbol end:'SocialMenu'
})(jQuery,AdobeEdge,"EDGE-23165460");