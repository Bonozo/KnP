/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */

/**
 * Main Controller Class
 * @class This is the Main controller class, inherits from Controller. Main.home will be called by TiMVC by default.
 */
var Main = function() {
	/**
	 * @type Pointer
	 */
	var self = this;

	/**
	 * did you know? this class inherits from /mvc/components/controller.js
	 */

	/**
	 * place your actions here...
	 */

	/**
	 * home action -- DEFAULT ACTION OF APPLICATION
	 * @param {Object} r json request object sent by routing window
	 */
	this.home = function(r) {
		//build table data to be used in table ui
		var list = [];
		list.push({
			title : "Tab Example",
			route : "example/tabgroup",
			request : {},
			hasChild : true,
			newWindow : false,
			height : self.App.util.dP(50)
		});
		if (self.App.iPhone) {
			list.push({
				title : "iPhone Only Dashboard Example",
				route : "example/dashboard",
				request : {},
				hasChild : true,
				newWindow : true,
				height : self.App.util.dP(50)
			});
		}
		list.push({
			title : "Multi-Dashboard Example",
			route : "example/multidashboard",
			request : {},
			hasChild : true,
			newWindow : true,
			height : self.App.util.dP(50)
		});
		list.push({
			title : "Database Example",
			route : "example/database",
			request : {
				message : 'Hello from the database!'
			},
			hasChild : true,
			newWindow : true,
			height : self.App.util.dP(50)
		});

		//render /mvc/views/main/home.js view file with data
		self.render('home', {
			"list" : list
		});
	}
}