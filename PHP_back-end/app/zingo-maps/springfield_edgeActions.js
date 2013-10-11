/***********************
* Adobe Edge Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

//Edge symbol: 'stage'
(function(symbolName) {

Symbol.bindTimelineAction(compId, symbolName, "Default Timeline", "play", function(e) {
// Hide an Element.
//  (lookupSelector resolves an Edge element name to a DOM
//  selector that can be used with jQuery)
$(this.lookupSelector("Building_Sonic_hover")).hide();
$(this.lookupSelector("Building_Jiffy_hover")).hide();
$(this.lookupSelector("Building_Ukes_hover")).hide();
$(this.lookupSelector("Building_Vivs_hover")).hide();
$(this.lookupSelector("Building_Vance_hover")).hide();
$(this.lookupSelector("Building_Trips_hover")).hide();
$(this.lookupSelector("Building_Tractor_hover")).hide();
$(this.lookupSelector("Building_Subway_hover")).hide();
$(this.lookupSelector("Building_Roxy_hover")).hide();
$(this.lookupSelector("Building_QT_hover")).hide();
$(this.lookupSelector("Building_PostOffice_hover")).hide();
$(this.lookupSelector("Building_PigglyWiggly_hover")).hide();
$(this.lookupSelector("Building_Monument_hover")).hide();
$(this.lookupSelector("Building_Mills_hover")).hide();
$(this.lookupSelector("Building_MethodistChurch_hover")).hide();
$(this.lookupSelector("Building_HistCenter_hover")).hide();
$(this.lookupSelector("Building_Highschool_hover")).hide();
$(this.lookupSelector("Building_GradeSchool_hover")).hide();
$(this.lookupSelector("Building_Ellis_hover")).hide();
$(this.lookupSelector("Building_Coop_hover")).hide();
$(this.lookupSelector("Building_CinoccaLaw_hover")).hide();
$(this.lookupSelector("Building_Chubby_hover")).hide();
$(this.lookupSelector("Building_Chamber_hover")).hide();
$(this.lookupSelector("Building_Brown_hover")).hide();
$(this.lookupSelector("Building_Braums_hover")).hide();
$(this.lookupSelector("Building_Booster_hover")).hide();
$(this.lookupSelector("Building_Bookstore_hover")).hide();
$(this.lookupSelector("Building_BlvdDiner_hover")).hide();
$(this.lookupSelector("Building_BaitBox_hover")).hide();
$(this.lookupSelector("Building_Baptist_hover")).hide();
$(this.lookupSelector("Building_AutoWorld_hover")).hide();
$(this.lookupSelector("Building_Annies_hover")).hide();


});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Annies}", "mouseover", function(e) {

//mouseover
$(this.lookupSelector("Building_Annies")).hide();
$(this.lookupSelector("Building_Annies_hover")).show();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Annies}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Annies")).show();
$(this.lookupSelector("Building_Annies_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_BaitBox}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_BaitBox")).hide();
$(this.lookupSelector("Building_BaitBox_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_BaitBox}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_BaitBox")).show();
$(this.lookupSelector("Building_BaitBox_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_GradeSchool}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_GradeSchool")).hide();
$(this.lookupSelector("Building_GradeSchool_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_GradeSchool}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_GradeSchool")).show();
$(this.lookupSelector("Building_GradeSchool_hover")).hide();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_PigglyWiggly}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_PigglyWiggly")).hide();
$(this.lookupSelector("Building_PigglyWiggly_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_PigglyWiggly}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_PigglyWiggly")).show();
$(this.lookupSelector("Building_PigglyWiggly_hover")).hide();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_MethodistChurch}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_MethodistChurch")).hide();
$(this.lookupSelector("Building_MethodistChurch_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_MethodistChurch}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_MethodistChurch")).show();
$(this.lookupSelector("Building_MethodistChurch_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Braums}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Braums")).hide();
$(this.lookupSelector("Building_Braums_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Braums}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Braums")).show();
$(this.lookupSelector("Building_Braums_hover")).hide();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_AutoWorld}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_AutoWorld")).hide();
$(this.lookupSelector("Building_AutoWorld_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_AutoWorld}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_AutoWorld")).show();
$(this.lookupSelector("Building_AutoWorld_hover")).hide();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Vivs}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Vivs")).hide();
$(this.lookupSelector("Building_Vivs_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Vivs}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Vivs")).show();
$(this.lookupSelector("Building_Vivs_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_CinoccaLaw}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_CinoccaLaw")).hide();
$(this.lookupSelector("Building_CinoccaLaw_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_CinoccaLaw}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_CinoccaLaw")).show();
$(this.lookupSelector("Building_CinoccaLaw_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_BlvdDiner}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_BlvdDiner")).hide();
$(this.lookupSelector("Building_BlvdDiner_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_BlvdDiner}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_BlvdDiner")).show();
$(this.lookupSelector("Building_BlvdDiner_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Sonic}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Sonic")).hide();
$(this.lookupSelector("Building_Sonic_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Sonic}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Sonic")).show();
$(this.lookupSelector("Building_Sonic_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Jiffy}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Jiffy")).hide();
$(this.lookupSelector("Building_Jiffy_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Jiffy}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Jiffy")).show();
$(this.lookupSelector("Building_Jiffy_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Baptist}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Baptist")).hide();
$(this.lookupSelector("Building_Baptist_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Baptist}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Baptist")).show();
$(this.lookupSelector("Building_Baptist_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Highschool}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Highschool")).hide();
$(this.lookupSelector("Building_Highschool_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Highschool}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Highschool")).show();
$(this.lookupSelector("Building_Highschool_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Ukes}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Ukes")).hide();
$(this.lookupSelector("Building_Ukes_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Ukes}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Ukes")).show();
$(this.lookupSelector("Building_Ukes_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Roxy}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Roxy")).hide();
$(this.lookupSelector("Building_Roxy_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Roxy}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Roxy")).show();
$(this.lookupSelector("Building_Roxy_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Booster}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Booster")).hide();
$(this.lookupSelector("Building_Booster_hover")).show();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Booster}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Booster")).show();
$(this.lookupSelector("Building_Booster_hover")).hide();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Mills}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Mills")).hide();
$(this.lookupSelector("Building_Mills_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Mills}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Mills")).show();
$(this.lookupSelector("Building_Mills_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Bookstore}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Bookstore")).hide();
$(this.lookupSelector("Building_Bookstore_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Bookstore}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Bookstore")).show();
$(this.lookupSelector("Building_Bookstore_hover")).hide();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Trips}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Trips")).hide();
$(this.lookupSelector("Building_Trips_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Trips}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Trips")).show();
$(this.lookupSelector("Building_Trips_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_PostOffice}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_PostOffice")).hide();
$(this.lookupSelector("Building_PostOffice_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_PostOffice}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_PostOffice")).show();
$(this.lookupSelector("Building_PostOffice_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Chubby}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Chubby")).hide();
$(this.lookupSelector("Building_Chubby_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Chubby}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Chubby")).show();
$(this.lookupSelector("Building_Chubby_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Subway}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Subway")).hide();
$(this.lookupSelector("Building_Subway_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Subway}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Subway")).show();
$(this.lookupSelector("Building_Subway_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Ellis}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Ellis")).hide();
$(this.lookupSelector("Building_Ellis_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Ellis}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Ellis")).show();
$(this.lookupSelector("Building_Ellis_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Chamber}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Chamber")).hide();
$(this.lookupSelector("Building_Chamber_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Chamber}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Chamber")).show();
$(this.lookupSelector("Building_Chamber_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Monument}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Monument")).hide();
$(this.lookupSelector("Building_Monument_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Monument}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Monument")).show();
$(this.lookupSelector("Building_Monument_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Tractor}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Tractor")).hide();
$(this.lookupSelector("Building_Tractor_hover")).show();


});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Tractor}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Tractor")).show();
$(this.lookupSelector("Building_Tractor_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_QT}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_QT")).hide();
$(this.lookupSelector("Building_QT_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_QT}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_QT")).show();
$(this.lookupSelector("Building_QT_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_HistCenter}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_HistCenter")).hide();
$(this.lookupSelector("Building_HistCenter_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_HistCenter}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_HistCenter")).show();
$(this.lookupSelector("Building_HistCenter_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Vance}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Vance")).hide();
$(this.lookupSelector("Building_Vance_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Vance}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Vance")).show();
$(this.lookupSelector("Building_Vance_hover")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Coop}", "mouseover", function(e) {
//mouseover
$(this.lookupSelector("Building_Coop")).hide();
$(this.lookupSelector("Building_Coop_hover")).show();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Coop}", "mouseout", function(e) {
//mouseout
$(this.lookupSelector("Building_Coop")).show();
$(this.lookupSelector("Building_Coop_hover")).hide();
});
//Edge binding end

Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3000, function(e) {
// stop the timeline at the current position
this.stop();

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Skrim_Black}", "click", function(e) {
// stop the timeline at the given position (ms or label)
this.stop(1650);
$(this.lookupSelector("Rectangle")).animate({"opacity": "0"}, "fast");
$(this.lookupSelector("Popup_Jiffy")).hide();
$(this.lookupSelector("Popup_AutoWorld")).hide();
$(this.lookupSelector("Popup_Roxy")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Jiffy}", "click", function(e) {

this.play(4000);
$(this.lookupSelector("Popup_Jiffy")).show();
$(this.lookupSelector("Popup_Jiffy")).animate({"opacity": "1"}, "fast");



});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_AutoWorld}", "click", function(e) {


this.play(4000);
$(this.lookupSelector("Popup_AutoWorld")).show();
$(this.lookupSelector("Popup_AutoWorld")).animate({"opacity": "1"}, "fast");



});
//Edge binding end

Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3915, function(e) {
// stop the timeline at the current position
this.stop();

});
//Edge binding end

Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 5060, function(e) {
// stop the timeline at the current position
this.stop();

});
//Edge binding end

Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 40, function(e) {
// insert code here
$(this.lookupSelector("Popup_Jiffy")).hide();
$(this.lookupSelector("Popup_AutoWorld")).hide();
$(this.lookupSelector("Popup_Roxy")).hide();
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Trigger_Roxy}", "click", function(e) {
this.play(4000);
$(this.lookupSelector("Popup_Roxy")).show();
$(this.lookupSelector("Popup_Roxy")).animate({"opacity": "1"}, "fast");


});
//Edge binding end

})("stage");
//Edge symbol end:'stage'

})(jQuery, jQuery.Edge, "EDGE-95877860");