<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');

class modVideoCommentsHelper
{
	function getList(&$params)
	{
                $my			= CFactory::getUser();
                CFactory::load('libraries', 'privacy');

		$db		=& JFactory::getDBO();
		
		$query	= 'SELECT * FROM ' . $db->nameQuote('#__community_wall').' AS a '
				. ' INNER JOIN ' . $db->nameQuote('#__community_videos').' AS b '
				. ' ON a.' . $db->nameQuote('contentid').'=b.' . $db->nameQuote('id')
				. ' WHERE a.' . $db->nameQuote('type').' =' . $db->Quote('videos')
				. 'AND b.' . $db->nameQuote('status').' =' . $db->Quote('ready')
				. 'ORDER BY a.' . $db->nameQuote('date').' DESC '
				. 'LIMIT 150';
				
		$db->setQuery( $query );
		
		$comments	= $db->loadObjectList();

                $counter = $params->get( 'count' , 5 );
                    
                foreach($comments as $key=>$comment)
                {
                    if(CPrivacy::isAccessAllowed($my->id, $comment->creator, 'custom', $comment->permissions))
                    {
                        $data[] = $comment;
                    }
                   
                    if(--$counter == 0)
                    {
                        break;
                    }
                  }

		return $data;
	}
}
