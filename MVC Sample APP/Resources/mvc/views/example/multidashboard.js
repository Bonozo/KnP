/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */

/**
 * Mutlidashboard View Class
 * @class This is the Multidashboard View class, inherits from View.
 * @param {TiMVC} app TiMVC class object
 * @param {Controller} controller Controller class object
 * @param {Object} data object data
 */
var Multidashboard = function(app, controller, data) {
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
	 * add content to view for use by layout
	 */
	this.addContent = function() {
		var settings = {
			width : self.App.util.dP(75),
			height : self.App.util.dP(85),
			margin : self.App.util.dP(10),
			padding : self.App.util.dP(6)
		};
		var clickHandler = function(e) {
			self.App.loadRoute(e.source.label, e.source.route, e.source.request);
		}
		self.App.loadComponent('scrollablegridview');
		var dashboard = new createScrollableGridView(self.data.items, settings, clickHandler);
		this.rootView = dashboard;
	}
	/**
	 * @constructor
	 */
	this._init = function() {
		this.addContent();
	}

	this._init();
}