<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
// no direct access
defined('_JEXEC') or die('Restricted access');

class modPhotoCommentsHelper
{
	function getList(&$params)
	{
		$db		=& JFactory::getDBO();
		
		$limit	= $params->get( 'count' , 5 );
		
		//Query for 150 to make sure comments are filtered
		$limit = 150; //limit can be set
		
		//privacy settings
		CFactory::load('libraries', 'privacy');
		$my		= CFactory::getUser();
		
		

		$query	= 'SELECT a.*,b.*,c.' . $db->nameQuote('type').' as phototype,c.' . $db->nameQuote('groupid')
				.' FROM ' . $db->nameQuote('#__community_wall').' AS a '
				.' INNER JOIN ' . $db->nameQuote('#__community_photos').' AS b '
				.' ON a.' . $db->nameQuote('contentid').'=b.' . $db->nameQuote('id')
				.' INNER JOIN ' . $db->nameQuote('#__community_photos_albums').' AS c '
				.' ON b.' . $db->nameQuote('albumid').'=c.' . $db->nameQuote('id')
				.' WHERE a.' . $db->nameQuote('type').' =' . $db->Quote('photos')
				.' ORDER BY a.' . $db->nameQuote('date').' DESC '
				.' LIMIT ' . $limit;
		$db->setQuery( $query );
		
		
		
		$comments	= $db->loadObjectList();
		
		//Once results are loaded, filter the count and the user premission level
		$counter = $params->get( 'count' , 5 );
		
		$filtered_comments = array();
		foreach($comments as $comment){
			$permission	= CPrivacy::getAccessLevel($my->id, $comment->creator);
			if($permission >= $comment->permissions){
				$filtered_comments[] = $comment;
				if(--$counter == 0){
					break;
				}
			}
		}
		
		return $filtered_comments; 
	}
}
