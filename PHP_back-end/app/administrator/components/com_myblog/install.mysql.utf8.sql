CREATE TABLE IF NOT EXISTS `#__myblog_categories` (
	`id` int(10) unsigned NOT NULL auto_increment,
	`name` varchar(50) NOT NULL default '',
	`default` varchar(5) NOT NULL default '',
	`slug` varchar(255) NOT NULL default '',
	PRIMARY KEY  (`id`),
	UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
	
	
CREATE TABLE IF NOT EXISTS `#__myblog_admin` (
	`sid` varchar(128) NOT NULL,
	`cid` int(10) NOT NULL,
	`date` datetime NOT NULL,
	PRIMARY KEY  (`sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `#__myblog_config` (
	`name` varchar(64) NOT NULL default '',
	`value` text NOT NULL,
	PRIMARY KEY  (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


CREATE TABLE  IF NOT EXISTS `#__myblog_permalinks` (
	`contentid` INTEGER UNSIGNED NOT NULL,
	`permalink` TEXT NOT NULL DEFAULT '',
	PRIMARY KEY(`contentid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `#__myblog_content_categories` (
	`id` int(10) unsigned NOT NULL auto_increment,
	`contentid` int(10) unsigned NOT NULL default '0',
	`category` int(10) unsigned NOT NULL default '0',
	PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


CREATE TABLE  IF NOT EXISTS `#__myblog_uploads` (
	`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`path` TEXT NOT NULL DEFAULT '',
	`contentid` INTEGER UNSIGNED NOT NULL DEFAULT 0,
	`approved` TINYINT UNSIGNED NOT NULL DEFAULT 1,
	`caption` TEXT NOT NULL DEFAULT '',
	PRIMARY KEY(`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


CREATE TABLE  IF NOT EXISTS `#__myblog_images` (
	`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`filename` TEXT NOT NULL DEFAULT '',
	`contentid` INTEGER UNSIGNED NOT NULL DEFAULT 0,
	`user_id` INTEGER UNSIGNED NOT NULL DEFAULT 0,
	PRIMARY KEY(`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__myblog_user` (
	`user_id` int(10) unsigned NOT NULL default '0',
	`description` text NOT NULL,
	`title` text NOT NULL,
	`feedburner` text NOT NULL,
	`style` text NOT NULL,
	`params` text NOT NULL,
	PRIMARY KEY  (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `#__myblog_bots` (
	`id` int(10) unsigned NOT NULL auto_increment,
	`name` text NOT NULL,
	`published` int(1) unsigned NOT NULL default '0',
	`ordering` int(10) unsigned NOT NULL default '0',
	`params` text NOT NULL,
	`filename` text NOT NULL,
	`folder` text NOT NULL,
	PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `#__myblog_tb_sent` (
	`id` int(10) unsigned NOT NULL auto_increment,
	`contentid` int(10) unsigned NOT NULL default '0',
	`url` text NOT NULL,
	PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `#__myblog_mambots` (
	`mambot_id` INT UNSIGNED NOT NULL DEFAULT '0',
	`my_published` INT( 1 ) UNSIGNED NOT NULL DEFAULT '0',
	PRIMARY KEY ( `mambot_id` )
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `#__myblog_redirect` (
	`contentid` int(11) NOT NULL,
	`permalink` text NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
