/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */

/**
 * Layout Class -- default layout class
 * @param {View} view view class object
 * @param {TiMVC} app TiMVC class object
 * @param {Controller} controller active controller class object
 */
var Layout = function(view,app,controller){
	/**
	 * @type View
	 */
	this.View = view;
	/**
	 * @type TiMVC
	 */
	this.App = app;
	/**
	 * @type Controller
	 */
	this.Controller = controller;
	/**
	 * used for layout positioning below
	 * @type Int
	 */
	this.currentTop = 0;
	/**
	 * @type Pointer
	 */
	var self = this;
	
	/**
	 * default you main layout functions here, you can access the active view class from self.View
	 */
	
	/**
	 * example of implementing a header into a layout
	 */
	
	/**
	 * add header to window
	 */
	this.addHeader = function(){
		var container = Titanium.UI.createView({
			backgroundColor:'#000',
			height:self.App.util.dP(65),
			top:0,
		});
		self.currentTop += 65;
		var logo = Titanium.UI.createImageView({
			image:self.App.config.resDir + self.App.config.imagePath + "layouts/banner.png",
			width:self.App.util.dP(300),
			height:self.App.util.dP(60),
			left:0,
			top:0
		})
		container.add(logo)
		var bar = Titanium.UI.createView({
			backgroundColor:'#C9C9C9',
			height:self.App.util.dP(5),
			top:logo.height,
		});
		container.add(bar);
		self.App.window.add(container);
	}
	
	/**
	 * add body content to window
	 */
	this.addBody = function(){
		self.View.rootView.top = self.App.util.dP(self.currentTop);
		self.App.window.add(self.View.rootView);
	}
	
	/**
	 * Add Content -- example add view content to window
	 */
	this.addContent = function(){
		if(!self.View.isTabs){
			if(!self.View.skipHeader){
				self.addHeader();
			}
			self.addBody();
		}		
	}
	
	/**
	 * Class init (construct)
	 * @constructor
	 */
	this._init = function(){
		self.addContent();
	}
	
	this._init();//(construct)
}
