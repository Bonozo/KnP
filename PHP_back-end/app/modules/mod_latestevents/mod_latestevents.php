<?php
/**
 * @package		Upcoming Events Module
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');

require_once( JPATH_ROOT . DS . 'components' . DS . 'com_community' . DS . 'libraries' . DS . 'core.php' );
CFactory::load( 'helpers' , 'event' );
CFactory::load( 'helpers' , 'string' );

// Reuse existing language file from JomSocial
$language	= JFactory::getLanguage();
$language->load( 'com_community' , JPATH_ROOT );

$model		= CFactory::getModel( 'Events' );
$rows		= $model->getEvents( null , null , $params->get( 'ordering' , 'latest' ) , null , (bool) $params->get( 'past' , false ) , false , null , null , $params->get( 'type' , CEventHelper::ALL_TYPES ) , 0 , $params->get( 'total' , 10 ) );
$events		= array();
$config		= CFactory::getConfig();

$document	= JFactory::getDocument();
$document->addStyleSheet( rtrim( JURI::root() , '/' ) . '/modules/mod_latestevents/style.css' );

foreach( $rows as $event )
{
	$table		= JTable::getInstance( 'Event' , 'CTable' );
	$table->bind( $event );
	$events[]	= $table;
}

require( JModuleHelper::getLayoutPath( 'mod_latestevents' ) );
