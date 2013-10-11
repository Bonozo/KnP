
CREATE TABLE  IF NOT EXISTS `#__mobirate_binding` (
  `bind_id` int(11) NOT NULL auto_increment,
  `content_id` int(11) NOT NULL,
  PRIMARY KEY  (`bind_id`,`content_id`)
);
