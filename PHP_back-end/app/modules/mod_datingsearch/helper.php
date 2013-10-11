<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */

defined('_JEXEC') or die('Restricted access');

require_once( JPATH_ROOT . DS . 'components' . DS . 'com_community' . DS . 'helpers' . DS . 'string.php' );

class modDatingSearchHelper
{
	function getGenderValue( $fieldcode )
	{
		$db 	=& JFactory::getDBO();
			
	 	$sql 	= "SELECT " . $db->nameQuote("options") . " "
		 		. "FROM " . $db->nameQuote("#__community_fields") ." "
			 	. "WHERE " . $db->nameQuote("fieldcode") . " = " . $db->quote($fieldcode);
				
		$db->setQuery( $sql );
		$results = $db->loadResult();					

		if($db->getErrorNum()) {
			JError::raiseError( 500, $db->stderr() );
	    }
		
		$options = array();
		$options = explode("\n", $results);
		array_walk($options, array( 'JString' , 'trim' ) );
				
		return $options;
	}
	
	function getCountryValue( $fieldcode )
	{
		// retrieve field details
		$db 	=& JFactory::getDBO();
			
	 	$sql 	= "SELECT * FROM " . $db->nameQuote("#__community_fields") ." "
			 	. "WHERE " . $db->nameQuote("fieldcode") . " = " . $db->quote($fieldcode);
				
		$db->setQuery( $sql );
		$results = $db->loadObject();					

		if($db->getErrorNum()) {
			JError::raiseError( 500, $db->stderr() );
	    }
	    
		// load countries from xml
		jimport( 'joomla.filesystem.file' );
		$file	= JPATH_ROOT . DS . 'components' . DS . 'com_community' . DS . 'libraries' . DS . 'fields' . DS . 'countries.xml';
		
		$options = array();
		
		if( JFile::exists( $file ) )
		{
			$contents	= JFile::read( $file );
			$parser		=& JFactory::getXMLParser('Simple');
			$parser->loadFile( $file );
			$document	=& $parser->document;
	
			$element		=& $document->getElementByPath( 'countries' );
			$countries		= $element->children();  
			
			foreach($countries as $country )
			{
				$options[]	= $country->getElementByPath('name')->data();
			}
		}   

		array_walk($options, array( 'JString' , 'trim' ) );
				
		return $options;
	}
	
	function getFieldType($fieldcode)
	{
		$db 	=& JFactory::getDBO();
			
	 	$sql 	= "SELECT " . $db->nameQuote("type") . ", " . $db->nameQuote("fieldcode") . " "
		 		. "FROM " . $db->nameQuote("#__community_fields") ." ";
				
		$db->setQuery( $sql );
		$results = $db->loadObjectList();
		
		$type = new stdClass();
		
		foreach($fieldcode as $key=>$field)
		{
			foreach($results as $data)
			{
				if($field == $data->fieldcode)
				{
					$type->$key = $data->type;
				}
			}
		}
		
		return $type;
	}
}