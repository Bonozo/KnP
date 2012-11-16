/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */

/**
 * Tab Controller Class
 * @class This is the Tab controller class, inherits from Controller.
 */
var Tab = function(){
	/**
	 * @type Pointer
	 */
	var self = this;
	
	/**
	 * did you know? this class inherits from /mvc/components/controller.js
	 */
	
	/**
	 * Place your actions here...
	 */
	
	/**
	 * window1 action
	 * @param {Object} r json request object sent by routing window
	 */
	this.window1 = function(r){
		self.render('simplewindow',{labelText:"Hello from tab window one!"});
	}
	
	/**
	 * window2 action
	 * @param {Object} r json request object sent by routing window
	 */
	this.window2 = function(r){
		self.render('simplewindow',{labelText:"Hello from tab window two!"});
	}
	
	/**
	 * window3 action
	 * @param {Object} r json request object sent by routing window
	 */
	this.window3 = function(r){
		self.render('simplewindow',{labelText:"Hello from tab window three!"});
	}
	
	
}