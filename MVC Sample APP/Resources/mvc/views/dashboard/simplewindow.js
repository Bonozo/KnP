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
	 * @type Pointer
	 */
	var self = this;
	
	/**
	 * did you know? this class inherits from /mvc/components/view.js
	 */
	
	/**
	 * Please note that the self.rootView must contain a Titanium.UI view used by the controller layout for rendering
	 */
	
	/**
	 * add content to view for use by layout
	 */
	this.addContent = function(){
		self.rootView = Titanium.UI.createView({backgroundColor:'#FFF'});
		var label = Titanium.UI.createLabel({text:self.data.labelText,left:10});
		self.rootView.add(label);
	}
	
	/**
	 * @constructor
	 */
	this._init = function(){
		this.addContent();
	}
	
	this._init();
}