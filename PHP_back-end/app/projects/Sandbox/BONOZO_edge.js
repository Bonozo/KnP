/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
var symbols = {
"stage": {
   version: "0.1.3",
   baseState: "Base State",
   initialState: "Base State",
   content: {
      dom: [
        {
            id:'Background',
            className:'stage_Background_id',
            type:'rect',
            tag:'div',
            rect:[-131,556,1053,798],
            fill:['rgba(0,200,255,1.00)'],
            stroke:[0,"rgba(0,0,0,1)","none"],
            transform:[[115.80003,-566.40005]]
        },
        {
            id:'Rectangle',
            className:'stage_Rectangle_id',
            type:'rect',
            tag:'div',
            rect:[116.39996337891,68.400001525879,116.40002441406,111.59998321533],
            opacity:0.29411764705882,
            fill:['rgba(255,0,0,1.00)'],
            stroke:[0,"rgb(0, 0, 0)","none"]
        },
        {
            id:'BonozoLogo_1280x720',
            className:'stage_BonozoLogo_1280x720_id',
            type:'image',
            tag:'div',
            rect:[0,0,1280,720],
            fill:['rgba(0,0,0,0)','images/BonozoLogo_1280x720.png'],
            transform:[[-135.76,47.80002],,,[0.63,0.63]]
        },
        {
            id:'HideTest',
            type:'rect',
            tag:'div',
            rect:[-32.400024414063,-21.600006103516,1069.4000244141,808.60000228882],
            opacity:0,
            fill:['rgba(192,192,192,1)'],
            stroke:[0,"rgba(0,0,0,1)","none"]
        }],
      symbolInstances: [
      ]
   },
   states: {
      "Base State": {
         "${_BonozoLogo_1280x720}": [
            ["transform", "scaleY", '0.63'],
            ["transform", "translateX", '-135.76px'],
            ["transform", "scaleX", '0.63'],
            ["style", "height", '714px'],
            ["style", "opacity", '1'],
            ["transform", "translateY", '47.80002px'],
            ["style", "width", '1297px']
         ],
         "${_HideTest}": [
            ["style", "opacity", '0']
         ],
         "${_Rectangle}": [
            ["color", "background-color", 'rgba(255,0,0,1.00)'],
            ["style", "opacity", '0.29411764705882']
         ],
         "${_stage}": [
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "height", '768px'],
            ["style", "width", '1024px']
         ],
         "${_Background}": [
            ["color", "background-color", 'rgba(0,200,255,1.00)'],
            ["transform", "translateX", '115.80003px'],
            ["style", "height", '798px'],
            ["transform", "translateY", '-566.40005px'],
            ["style", "width", '1053px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 4000,
         labels: {

         },
         timeline: [
            { id: "eid14", tween: [ "style", "${_BonozoLogo_1280x720}", "opacity", '0', { fromValue: '1'}], position: 0, duration: 2000 },
            { id: "eid15", tween: [ "style", "${_BonozoLogo_1280x720}", "opacity", '1', { fromValue: '0'}], position: 2000, duration: 2000 }]
      }
   }
}};

var comp;
Edge.registerCompositionDefn(compId, symbols);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     comp = new Edge.Composition(compId, {stage: "." + compId}, {});
	   /**
 * Adobe Edge Timeline Launch
 */
     comp.ready(function() {
         comp.play();
     });
});
})(jQuery, jQuery.Edge, "EDGE-175201358");
