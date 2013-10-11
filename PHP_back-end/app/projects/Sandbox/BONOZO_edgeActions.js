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

Symbol.bindTimelineAction(compId, symbolName, "Default Timeline", "complete", function(e) {
// play the timeline from the given position (ms or label)
this.play(0);

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Rectangle}", "mouseover", function(e) {
// insert code for mouse enter here
$(this.lookupSelector("Rectangle")).css('cursor','pointer');

$(this.lookupSelector("Rectangle")).animate({"opacity": "1"}, "fast");
});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_Rectangle}", "mouseout", function(e) {
// insert code for mouse leave here
$(this.lookupSelector("Rectangle")).animate({"opacity": ".3"}, "fast");

});
//Edge binding end

Symbol.bindElementAction(compId, symbolName, "${_HideTest}", "click", function(e) {
$(this.lookupSelector("HideTest")).hide();
});
//Edge binding end

})("stage");
//Edge symbol end:'stage'

})(jQuery, jQuery.Edge, "EDGE-175201358");