/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */


/**
 * Home View Class
 * @class This is the Home View class, inherits from View. This is an example of a view class.
 * @param {TiMVC} app TiMVC class object
 * @param {Controller} controller active controller object
 * @param {Object} data object passed from active controller action 
 */
var Home = function(app,controller,data){
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
	this.addContent = function(){
		self.rootView = Titanium.UI.createTableView({
			data:self.data.list
		});
		self.rootView.addEventListener('click',function(e){
			if(e.rowData.newWindow){
				self.App.loadRoute(e.rowData.title,e.rowData.route,e.rowData.request);
			}else{
				self.App.setWindowRoute(e.rowData.route,e.rowData.request);
				self.App.routeWindow();
			}
		});
	}
	
	/**
	 * @constructor
	 */
	this._init = function(){
		this.addContent();
	}
	
	this._init();
}