/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */


var mainSpace = this;//save main namespace

/**
 * Model Class -- base controller class
 * @class This is the base Model class
 * @param {TiMVC} app TiMVC class object, usally this is passsed by the TiMVC class
 */
var Model = function(app){
	/**
	 * @type TiMVC
	 */
	this.App = app;
	/**
	 * save reference to this
	 * @type Pointer
	 */	
	var self = this;
	
	/**
	 * place you base model methods here to be inherited
	 */	
	
	
	/**
	 * Set Appliation Database Reference
	 * Database Class
	 * @param {Database} db database class object
	 */
	this.setDb = function(db){
		self.Db = db;
	}
	
	/**
	 * Show inheritance example
	 */
	this.showInherit = function(){
		alert('Hello from parent base model!');
	}
	
	/**
	 * Find Record by Primary Key
	 * @param {String} keyValue primary key
	 */
	this.findByPk = function(keyValue){
		var sql = "select * from " + this.dbTableName + " where " + this.primaryKey + " = ? ";
		return this.Db.conn.execute(sql,keyValue);
	}

	/**
	 * Delete Record by Primary Key
	 * @param {String} keyValue primary key
	 */	
	this.delByPk = function(keyValue){
		var sql = "delete from " + this.dbTableName + " where " + this.primaryKey + " = ? ";
		return this.Db.conn.execute(sql,keyValue);
	}
	
	/**
	 * Find All Records in Db table
	 * @param {Number} limit
	 */
	this.findAll = function(limit){ 
		var sql = "select * from " + this.dbTableName + " limit ?"
		return this.Db.conn.execute(sql,limit);
	}
	
	/**
	 * Class init (construct)
	 * @constructor
	 */
	this._init = function(){
		if(this.App.Db) this.setDb(this.App.Db);
		//this.showInherit();
	}
	
	this._init();//construct
}