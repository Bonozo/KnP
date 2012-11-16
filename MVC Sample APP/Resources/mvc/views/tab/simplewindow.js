/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */


/**
 * Simplewindow View Class
 * @class This is the Simplewindow View class, inherits from View.
 * @param {TiMVC} app TiMVC class object
 * @param {Controller} controller Controller class object
 * @param {Object} data object data
 */
var Simplewindow = function(app,controller,data){
	/**
	 * @type TiMVC
	 */
	this.App = app;
	/**
	 * @type Controller
	 */
	this.Controller = controller;
	/**
	 * @type Object
	 */
	this.data = data;
	/**
	 * @type Poiner
	 */
	var self = this;
	
	/**
	 * add content to view for use by layout
	 */
	this.addContent = function(){
		
		self.skipHeader = true;//turn off header in layout example
		
		self.rootView = Titanium.UI.createView({backgroundColor:'#FFF'});
		var label = Titanium.UI.createLabel({text:self.data.labelText,left:10,top:10});
		self.rootView.add(label);
		
		var button = Titanium.UI.createButton({title:'Close Tab Group',height:40,top:30});
		button.addEventListener('click',function(e){
			Ti.App.fireEvent('closeTabs');
		});
		self.rootView.add(button);
	}
	
	/**
	 * @constructor
	 */
	this._init = function(){
		this.addContent();
	}
	this._init();
}