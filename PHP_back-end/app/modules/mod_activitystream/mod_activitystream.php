<?php
/**
 * @category	Model
 * @package		JomSocial
 * @subpackage	Groups 
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');

include_once(JPATH_BASE.DS.'components'.DS.'com_community'.DS.'defines.community.php');	
require_once(JPATH_BASE . DS . 'components' . DS . 'com_community' . DS . 'libraries' . DS . 'core.php');
include_once(COMMUNITY_COM_PATH.DS.'libraries'.DS.'activities.php');
include_once(COMMUNITY_COM_PATH.DS.'helpers'.DS.'time.php');

$document	= JFactory::getDocument();
$document->addStyleSheet( rtrim( JURI::root() , '/' ) . '/modules/mod_activitystream/style.css' );
//CAssets::attach('/modules/mod_activitystream/style.css', 'css');

$config	= CFactory::getConfig();
$js		= 'assets/script-1.2';
$js		.= ( $config->getBool('usepackedjavascript') ) ? '.pack.js' : '.js';
CAssets::attach($js, 'js');

$activities = new CActivityStream();
$maxEntry = $params->get('max_entry', 10);

$stream = $activities->getHTML('', '', null, $maxEntry, '', 'mod_', $params->get('show_content' , false ) );

require( JModuleHelper::getLayoutPath('mod_activitystream') );
