<?php
/**
 * @category	Plugins
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */

// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

jimport( 'joomla.plugin.plugin' );

/**
 * Editor Jomsocial Photo Button
 *
 * @package Editors-xtd
 * @since 1.5
 */
class plgCommunityEditormyphotos extends JPlugin
{
		var $name		= 'editormyphotos';
		var $_name		= 'editormyphotos';
	/**
	 * Constructor
	 *
	 * For php4 compatability we must not use the __constructor as a constructor for plugins
	 * because func_get_args ( void ) returns a copy of all passed arguments NOT references.
	 * This causes problems with cross-referencing necessary for the observer design pattern.
	 *
	 * @param 	object $subject The object to observe
	 * @param 	array  $config  An array that holds the plugin configuration
	 * @since 1.5
	 */
	function plgCommunityEditormyphotos(& $subject, $config)
	{
		parent::__construct($subject, $config);
	}
	
	function onAppDisplay(){
		
		$field = JRequest::getCmd('e_name', null);
		
		// Include ajax file
		include_once( AZRUL_SYSTEM_PATH . '/pc_includes/ajax.php' );
		$jax = new JAX( AZRUL_SYSTEM_LIVE . '/pc_includes' );
		$jax->setReqURI( AZRUL_BASE_LIVE . '/index.php' );
		echo $jax->getScript();
		echo '<script type="text/javascript" src="' . JURI::root().'plugins/system/pc_includes/ajax_1.3.js"></script>';
		
		// Include css
		echo ( C_JOOMLA_15 ) ? '<link rel="stylesheet" href="' . JURI::root() .'plugins/community/editormyphotos/editormyphotos.css" type="text/css" />' 
							 : '<link rel="stylesheet" href="' . JURI::root() .'plugins/community/editormyphotos/editormyphotos/editormyphotos.css" type="text/css" />';
		
		// Content
		echo '<div id="iFrameContent">';
		echo $this->_getAlbumHTML($field);
		echo '</div>';
		
		exit;
	}
	
	function ajaxGetAlbumPhoto($response, $e_name, $albumId)
	{	
		//Include language file
		JPlugin::loadLanguage( 'plg_editormyphotos', JPATH_ADMINISTRATOR );
		
		// Generate back button
		$backButton = '<div class="button"><input type="button" name="Back" value="' . JText::_('BACK').'" onClick="jax.call(\'community\',\'plugins,editormyphotos,ajaxGetAlbum\',\'' . $e_name .'\')"></div>';
		// Generate Album title
		$album =& JTable::getInstance( 'Album' , 'CTable' );
		$album->load( $albumId );
		$content = '<div class="title">' . $backButton . $album->name.'</div>';

		// Generate photo listing
		$model	= CFactory::getModel('Photos');
		$photos = $model->getAllPhotos( $albumId);
		
		$oPhoto	=& JTable::getInstance( 'Photo' , 'CTable' );
		
		$content .= '<ul class="photoList">';
		foreach ($photos as $rows){
		
			// Get proper photo path
			$oPhoto->bind($rows);
			$image      = $oPhoto->getImageURI();
			$thumbnail  = $oPhoto->getThumbURI();
			
			$img = '<img src=\"' . $image .'\" border=\"0\" alt=\"' . $rows->caption .'\" />';
			
			$content .= '<li>';
			$content .= '<a href=\'#\' onClick=\'window.parent.jInsertEditorText("' . $img .'", "' . $e_name .'");window.parent.document.getElementById("sbox-window").close();return;\'>';
			$content .= '<img src="' . $thumbnail.'" alt="' . $rows->caption.'" border="0">';
			$content .= '</a>';
			$content .= '</li>';
		}
		$content .= '<div style="clear:both;"></div></div>';
		
		$response->addAssign('iFrameContent' , 'innerHTML' , $content);
		return $response;
	}
	
	function ajaxGetAlbum($response, $e_name)
	{
		$response->addAssign('iFrameContent' , 'innerHTML' , $this->_getAlbumHTML($e_name));
		return $response;
	
	}
	
	function _getAlbumHTML($e_name)
	{
		//Include language file
		JPlugin::loadLanguage( 'plg_editormyphotos', JPATH_ADMINISTRATOR );
		
		$user  = JFactory::getUser();
		$model = CFactory::getModel( 'photos' );
 		$albums	= $model->getAlbums( $user->id , true , true );
		$content = '<div class="title">' . JText::_('ALBUM_LIST') .'</div>';
		$content .= '<ul class="albumList">';
		if (count($albums) > 0) {
		
		    $i = 1;
			foreach ($albums as $rows){
	
				$strPhoto = $rows->count > 1 ? JText::sprintf('PHOTOS', $rows->count) : JText::sprintf('PHOTO', $rows->count);
	        
                if(($i)%2 == 0) { 
                    $content .= '<li class="albumLeft">'; 
                } else { 
                    $content .= '<li class="albumRght">'; 
                }
				
					$content .=	'<a href="#" onClick="jax.call(\'community\',\'plugins,editormyphotos,ajaxGetAlbumPhoto\', \''. $e_name .'\', \'' . $rows->id .'\')">';
                      $content .=	'<div class="inner">';
	                      $content .=	'<div class="picture">';
						  		$content .=	'<img src="' . $rows->thumbnail.'" alt="' . $rows->name.'" border="0">';
						  $content .=	'</div>';
							$content .=	'<div class="desc">';
								$content .=	'<div><b>'. $rows->name . '</b></div>';
								$content .=	'<div>'. $strPhoto .  '</div>';
							$content .=	'</div>';
							$content .= '<div style="clear: both;"></div>';
                        $content .= '</div>';
                    $content .= '</a>';
                            
				$content .= '</li>';
				
				$i++;
			}
			$content .='<li style="clear:both;"></li>';
		} else {
			$content .= '<li>'.JTEXT::_('ALBUM_EMPTY').'</li>';
		}
		$content .= '</ul>';
		
		$content .=  '<div style="clear:both;"></div>';
		
		return $content;
	}	
}
