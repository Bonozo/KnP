/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */


/**
 * View Class
 * @class This is the View base class
 * @param {TiMVC} app class app object for TiMVC
 * @param {Controller} controller controller class object
 */
var View = function(app,controller,data){
	/**
	 * save reference to this
	 * @type Pointer
	 */
	var self = this;
	/**
	 * root view used by layout. eg. Titanium.UI.View, required by layout
	 * @type Titanium.UI.View
	 */
	this.rootView = null;
	
	/**
	 * place you base view methods here to be inherited
	 */
	
	/**
	 * Returns root view object, called by layout class
	 * @returns self.rootView of View class
	 */
	this.getContent = function(){
		return this.rootView;
	}
	
	/**
	 * Start object (construct)
	 * @constructor
	 */
	this._start = function(){
		//do something....
	}
	
	this._start();//(construct)
	
}