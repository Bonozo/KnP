<?php
/**
 * Joomla! 1.6 component MobiRate
 * 
 * This component is designed for mobile websites and enables user rating and comments.
 * 
 * @version $Id: $
 * @package Joomla
 * @subpackage MobiRate
 *
 * This program has been created by Omicron Ceti AB on behalf of 
 * Norrbottens county council, Piteå municipality, Region of Västerbotten, 
 * Robertsfors municipality, Skellefteå municipality, Umeå municipality, 
 * Västerbottens county council and the European Regional Development Found
 * 
 * @copyright Copyright (C) 2010 Municipality of Umea, Sweden
 * @author Magnus Häggström, Omicron Ceti AB
 * 
 * @license GNU/GPL v2
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */

// no direct access
defined('_JEXEC') or die('Restricted access');

jimport( 'joomla.application.component.view');
require_once(JPATH_SITE.DS.'components'.DS.'com_content'.DS.'helpers'.DS.'route.php');

/**
 * HTML View class for the MobiRate component
 */
class MobirateViewAddconfirm extends JView 
{
	var $article = null;
	var $rating = null;
	var $captchaurl = null;
	
	function display($tpl = null) 
	{	
		$app =& JFactory::getApplication();
		$model =& $this->getModel();
   		
		$return = $app->getUserStateFromRequest('com_mobirate.add.return', 'return', '', 'base64');
		$data = array();
		$data['content_id'] = JRequest::getInt('id', -1);
		$data['user'] = $app->getUserStateFromRequest('com_mobirate.add.user', 'user', '', 'string');
		$data['rating'] = $app->getUserStateFromRequest('com_mobirate.add.rating', 'rating', 0, 'int');
		$data['comment'] = $app->getUserStateFromRequest('com_mobirate.add.comment', 'comment', '', 'string');
		
   		$article = $model->getContentItem(null, $data['content_id']);
   		
		if (count($errors = $this->get('Errors')))
		{
			JError::raiseWarning(500, implode("\n", $errors));
			return false;
		}
		
		// Check the access to the article
		$access_view = $article->params->get('access-view');
		if(!$access_view) {
			JError::raiseWarning( 403, JText::_('JERROR_ALERTNOAUTHOR') );
			return;
		}
		
		$comment = htmlspecialchars($data['comment']);
		$comment = str_replace("\r\n", "<br />", $comment);
		$comment = str_replace("\n", "<br />", $comment);
		$data['comment_escaped'] = $comment;
   		
   		$this->assignRef('article', $article);
   		$this->assignRef('rating', $data);
   		$this->assignRef('return', $return);
		
		JHTML::_('stylesheet','com_mobirate/mobirate.css', array(), true);
   		
        parent::display($tpl);
    }
}
