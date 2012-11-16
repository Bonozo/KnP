/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */


/**
 * Database Class
 * @class This is the simple database class
 * @param {String} path database path, usally this is passed by TiMVC class
 * @param {Name} database filename, usally this is passed by TiMVC class
 */
function Database(path,name){
	/**
	 * database object
	 * @type Object
	 */
	this.conn;//database object
	/**
	 * save reference to this
	 * @type Pointer
	 */
	var self = this;
	
	
	/**
	 * Invoke database installation and/or connection
	 * @param {String} path path to database
	 * @param {String} name name of database
	 */
	this.open = function(path,name){
		this.connectInstallDatabase(path,name);
	}

	/**
	 * Install and connect database
	 * @param {String} path path to database
	 * @param {String} name name of database
	 * @private
	 */
	this.connectInstallDatabase = function(path,name){
		this.conn = Titanium.Database.install(path,name);
	}
	
	/**
	 * Close active database connection
	 */
	this.close = function(){
		this.conn.close();
	}
	
	/**
	 * Execute begin transaction statement
	 */
	this.beginTrans = function(){
		this.conn.execute('BEGIN IMMEDIATE TRANSACTION');
	}
	
	/**
	 * Execute end transaction statement
	 */
	this.endTrans = function(){
		this.conn.execute('END TRANSACTION');
	}
	
	/**
	 * @constructor
	 */
	this.open(path,name);//(construct)
	
}