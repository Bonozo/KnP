/*
 * @fileoverview This file contains the Main controller class, this is the default controller for the app
 * @project MVC sample application
 */

/**
 * Setting Model Class, this is an example of a model class
 * @class This is the setting Model class, inherits from Model.
 * @param {TiMVC} app TiMVC class object
 */
var Setting = function(app){
	/**
	 * @type TiMVC
	 */
	this.App = app;
	/**
	 * @type string
	 */
	this.dbTableName = 'setting';
	/**
	 * @type Array
	 */	
	this.attributeNames = ['key','value'];
	/**
	 * @String
	 */
	this.primaryKey = 'key';
	/**
	 * @type Pointer
	 */
	var self = this;
	
	/**
	 * did you know? this class inherits from /mvc/components/model.js
	 */
	
	/**
	 * get value from setting table by key
	 * @param {String} key
	 * @returns value from setting table or null if not found
	 */
	this.getSetting = function(key){
		var r = self.findByPk(key);
		var value =  r.rowCount>0 ? r.fieldByName('value') : null;
		r.close();
		return value;
	}

	/**
	 * set value from setting table by key
	 * @param {String} key
	 * @param {String} value
	 */
	this.setSetting = function(key,value){
		if(self.getSetting(key)==null){//insert as new setting
			var sql = "insert into " + self.dbTableName + " (key,value) values (?,?)";
			self.Db.conn.execute(sql,key,value);
			return;
		}
		var sql = "update " + self.dbTableName + " set value = ? where key = ?";
		self.Db.conn.execute(sql,value,key);
	}
	
	/**
	 * Deletes value from setting table by key
	 * @param {String} key
	 */
	this.delSetting = function(key){
		self.delByPk(key);
	}
}