<?php
/**
 * @category	Plugins
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */

// no direct access
defined('_JEXEC') or die('Restricted access');

require_once( JPATH_ROOT . DS . 'components' . DS . 'com_community' . DS . 'libraries' . DS . 'core.php');

if(!class_exists('plgCommunitySystem'))
{
	class plgCommunitySystem extends CApplications
	{
		var $name		= 'System';
		var $_name		= 'system';

	    function plgCommunitySystem(& $subject, $config)
	    {
			parent::__construct($subject, $config);
	    }
		 
		function onSystemStart() 
		{		
		
		}
	}
}

