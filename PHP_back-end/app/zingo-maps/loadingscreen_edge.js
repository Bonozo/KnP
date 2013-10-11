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
            id:'Loading_Background',
            className:'stage_Loading_Background_id',
            type:'rect',
            tag:'div',
            rect:[0.83334350585938,1.0000203847885,1172,790],
            borderRadius:[0,0,0,0],
            fill:['rgba(83,83,83,1.00)'],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[[-9.00001,-10]]
        },
        {
            id:'loading',
            className:'stage_loading_id',
            type:'image',
            tag:'div',
            rect:[0,0,128,128],
            fill:['rgba(0,0,0,0)','images/loading.png'],
            transform:[[509.00003,348]]
        },
        {
            id:'Text',
            className:'stage_Text_id',
            type:'text',
            tag:'div',
            rect:[340.00006103516,500.00001525879,568,96],
            text:"WE ARE LOADING YOUR CONTENT...",
            font:["Arial Black, Gadget, sans-serif",24,"rgba(0,0,0,1)","normal","none",""],
            transform:[[-12,-23.99996]]
        }],
      symbolInstances: [
      ]
   },
   states: {
      "Base State": {
         "${_Loading_Background}": [
            ["color", "background-color", 'rgba(83,83,83,1.00)'],
            ["style", "border-top-left-radius", [0,0],{valueTemplate:'@@0@@px @@1@@px'}],
            ["transform", "translateX", '-9.00001px'],
            ["style", "border-bottom-right-radius", [0,0],{valueTemplate:'@@0@@px @@1@@px'}],
            ["style", "border-top-right-radius", [0,0],{valueTemplate:'@@0@@px @@1@@px'}],
            ["style", "width", '1172px'],
            ["style", "border-bottom-left-radius", [0,0],{valueTemplate:'@@0@@px @@1@@px'}],
            ["style", "overflow", 'hidden'],
            ["style", "height", '790px'],
            ["transform", "translateY", '-10px']
         ],
         "${_stage}": [
            ["style", "height", '768px'],
            ["style", "overflow", 'visible'],
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "width", '1148px']
         ],
         "${_Text}": [
            ["transform", "translateY", '-23.99996px'],
            ["transform", "translateX", '-12px'],
            ["style", "width", '568px']
         ],
         "${_loading}": [
            ["transform", "translateX", '509.00003px'],
            ["transform", "translateY", '348px'],
            ["transform", "rotateZ", '0deg']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 1000,
         labels: {

         },
         timeline: [
            { id: "eid359", tween: [ "transform", "${_loading}", "rotateZ", '360deg', { fromValue: '0deg'}], position: 0, duration: 1000 },
            { id: "eid5", tween: [ "style", "${_stage}", "width", '1148px', { fromValue: '1148px'}], position: 0, duration: 0 },
            { id: "eid6", tween: [ "style", "${_stage}", "height", '768px', { fromValue: '768px'}], position: 0, duration: 0 }]
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
})(jQuery, jQuery.Edge, "EDGE-44691064");
