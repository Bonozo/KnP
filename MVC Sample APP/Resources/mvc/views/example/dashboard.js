/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */

/**
 * Dashboard View Class
 * @class This is the Dashboard View class, inherits from View.
 * @param {TiMVC} app TiMVC class object
 * @param {Controller} controller Controller class object
 * @param {Object} data object data
 */
var Dashboard = function(app,controller,data){
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
	 * generate dashboard items
	 * @returns array of items
	 */
	this.genDashboardItems = function(){
		var list = [];
		for(var i=0;i<self.data.items.length;i++){
			list.push(
				Titanium.UI.createDashboardItem({
					label:self.data.items[i].label,
					image:self.data.items[i].image,
					selectedImage:self.data.items[i].selectedImage,
					route:self.data.items[i].route,
					request:self.data.items[i].request
				})
			);
		}	
		return list;
	}
	
	/**
	 * please note that self.rootView is required by controller layout for rendering
	 */
	
	/**
	 * add content to view for use by layout
	 */
	this.addContent = function(){
		var items = self.genDashboardItems();
		var dashboardView = Titanium.UI.createDashboardView({
			data:items,id:'dashboard1'
		});
		dashboardView.addEventListener('click',function(e){
			self.App.loadRoute(e.item.label,e.item.route,e.item.request);
		});
		
		self.rootView = dashboardView;
	}
	
	/**
	 * @constructor
	 */
	this._init = function(){
		this.addContent();
	}
	
	this._init();
}