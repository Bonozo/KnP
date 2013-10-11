<?php
/**
 * @category	Plugins
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
// no direct access
defined('_JEXEC') or die('Restricted access');

require_once( JPATH_BASE . DS . 'components' . DS . 'com_community' . DS . 'libraries' . DS . 'core.php');

class plgCommunityInputlink extends CApplications
{
	var $name		= 'inputlink';
	var $_name		= 'inputlink';

    function plgCommunityInputlink(& $subject, $config)
    {
		parent::__construct($subject, $config);
    }
	 	
	public function onWallDisplay( &$row )
	{
		// For wall contents, we need to ensure links will not be converted once again.
		CFactory::load( 'helpers' , 'videos' );
		
		$matches	= CVideosHelper::getVideoLinkMatches( $row->comment );
		
		if( empty( $matches ) )
		{
			$row->comment	= $this->_parse( $row->comment );
		}
	}
	
	public function onDiscussionDisplay( &$row )
	{
		CFactory::load( 'helpers' , 'string' );
		
		if( !CStringHelper::isHTML( $row->message ) )
		{
			$row->message	= $this->_parse( $row->message );
		}
	}
	
	public function onBulletinDisplay( &$row )
	{
		CFactory::load( 'helpers' , 'string' );
		
		if( !CStringHelper::isHTML( $row->message ) )
		{
			$row->message	= $this->_parse( $row->message );
		}
	}
	
	public function onMessageDisplay( &$row )
	{
		CFactory::load( 'helpers' , 'string' );
		
		if( !CStringHelper::isHTML( $row->body ) )
		{
			$row->body	= $this->_parse( $row->body );
		}
	}
	
	private function _parse( $text )
	{
		CFactory::load( 'helpers' , 'linkgenerator' );
		$text		= cGenerateURILinks( $text );

		return $text;
	}

}
