/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */

/**
 * CONFIG object required by TiMVC class. 
 * @type Object 
 */
var CONFIG = {
	/**
	 * Main application name to be displayed in main application window title (if needed)
	 * @type String
	 */
	appName: "TiMVC Framework",//main appliation window title
	/**
	 * Path to resources directory
	 * @type String
	 */
	resDir: Titanium.Filesystem.getResourcesDirectory(),
	/**
	 * Base path to MVC 
	 * @type string
	 */
	basePath: "mvc/",
	/**
	 * Core path to MVC
	 * @type String
	 */
	corePath: "mvc/core/",
	/**
	 * Controller path
	 * @type String
	 */
	controllerPath: "mvc/controllers/",
	/**
	 * Model path
	 * @type String
	 */
	modelPath: "mvc/models/",
	/**
	 * View path
	 * @Type String
	 */
	viewPath: "mvc/views/",
	/**
	 * Component path
	 * @type String
	 */
	componentPath: "mvc/components/",
	/**
	 * Asset path
	 * @type String
	 */
	assetPath: "mvc/assets/",
	/**
	 * Image path
	 * @type String
	 */
	imagePath: "mvc/assets/images/",
	/**
	 * Database folder path
	 * @type String
	 */
	databasePath: "mvc/assets/databases/",
	 /**
	 * Database filename object
	 * @type {Object}
	 */
	database: {
		/**
		 * filename of database
		 * @type String
		 */
		name: "app.sqlite",//database name
	},
	/**
	 * Optional params to global use in App class files (e.g. self.App.config.params)
	 * @type {Object}
	 */
	params: {
		fooBar1: 'store you global params here',
		fooBar2: 'store your global params here'
	},
}

/**
 * Where to go from here? Try the default controller file /mvc/controllers/main.js. The Main.home function is the default action.
 */


//bootstrap TiMVC framework!
Titanium.include(CONFIG.resDir + CONFIG.corePath + "timvc.js");

