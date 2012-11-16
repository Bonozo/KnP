/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */

/**
 * Dashboard Controller -- Example Controller Class
 * @class This is the Dashboard controller class, inherits from Controller
 */
var Dashboard = function(){
	/**
	 * @type Poitner
	 */
	var self = this;
	
	//this.layout = "default";//override default layout
	
	/**
	 * did you know? this class inherits from /mvc/components/controller.js
	 */
	
	/**
	 * place your action functions here...
	 */
	
	/**
	 * test action example that renders a hello world style message from the /mvc/views/dashboard/simplewindow.js view file
	 * @param {Object} r json request object sent by routing window
	 */
	this.test = function(r){
		//self.layout = "altlayout";//override default layout (if needed)
		
		/*
		 * alternativly you can specify the path to the view
		 * self.render('//tabs/simplewindow',{labelText:"Hello from "+r.name+" window!"});
		 */
		
		self.render('simplewindow',{labelText:"Hello from "+r.name+" window!"});
		
	}
	
}