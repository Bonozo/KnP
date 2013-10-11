
CREATE TABLE  IF NOT EXISTS `#__mobirate` (
  `id` int(11) NOT NULL auto_increment,
  `content_id` int(11) NOT NULL default '-1',
  `add_date` datetime NOT NULL default '0000-00-00 00:00:00',
  `user` varchar(100) NOT NULL default '',
  `rating` int(11) NOT NULL default '0',
  `comment` varchar(200) NOT NULL default '',
  `state` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY  (`id`)
);

CREATE TABLE  IF NOT EXISTS `#__mobirate_onoffcategory` (
  `cat_id` int(11) NOT NULL,
  `onoff` bool NOT NULL default FALSE,
  PRIMARY KEY  (`cat_id`)
);

CREATE TABLE  IF NOT EXISTS `#__mobirate_onoffcontent` (
  `content_id` int(11) NOT NULL,
  `onoff` bool NOT NULL default FALSE,
  PRIMARY KEY  (`content_id`)
);

CREATE TABLE  IF NOT EXISTS `#__mobirate_reports` (
  `id` int(11) NOT NULL auto_increment,
  `rateid` int(11) NOT NULL,
  `date` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`id`)
);

CREATE TABLE  IF NOT EXISTS `#__mobirate_binding` (
  `bind_id` int(11) NOT NULL auto_increment,
  `content_id` int(11) NOT NULL,
  PRIMARY KEY  (`bind_id`,`content_id`)
);

CREATE INDEX `#__mobirate_binding_content_id_idx` ON `#__mobirate_binding` (`content_id`);

