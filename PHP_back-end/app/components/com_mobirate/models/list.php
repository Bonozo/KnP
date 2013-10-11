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

jimport('joomla.application.component.modellist');

JModel::addIncludePath(JPATH_SITE.DS.'components'.DS.'com_content'.DS.'models');


/**
 * MobiRate Component List Model
 *
 * @author      Magnus Häggström, Omicron Ceti AB
 * @package		Joomla
 * @subpackage	MobiRate
 * @since 1.5
 */
class MobirateModelList extends JModelList 
{

	/**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @since	2.0
	 */
	protected function populateState()
	{
		// Initialise variables.
		$app	= JFactory::getApplication();

		// List state information
		$limit = $app->getUserStateFromRequest('global.list.limit', 'limit', $app->getCfg('list_limit'));
		$this->setState('list.limit', $limit);

		$limitstart = JRequest::getVar('limitstart', 0, '', 'int');
		$this->setState('list.start', $limitstart);

		$orderCol	= JRequest::getCmd('filter_order', 'add_date');
		$this->setState('list.ordering', $orderCol);

		$listOrder	=  JRequest::getCmd('filter_order_Dir', 'DESC');
		$this->setState('list.direction', $listOrder);

		$id = JRequest::getVar('id', 0, '', 'int');
		$this->setState('content.id', $id);

		$this->setState('filter.state',	1);

		// Load the parameters.
		$params = $app->getParams();
		$this->setState('params', $params);
	}

	/**
	 * Method to build an SQL query to load the list data.
	 *
	 * @return	string	An SQL query
	 * @since	2.0
	 */
	protected function getListQuery()
	{
		$user	= JFactory::getUser();
		$groups	= implode(',', $user->authorisedLevels());
		
		$cid = $this->getState('content.id', '-1');

		// Create a new query object.
		$db		= $this->getDbo();
		$query	= $db->getQuery(true);

		// Select required fields from the categories.
		$query->select($this->getState('list.select', 'a.*'));
		$query->from('`#__mobirate` AS a');
		$query->where("(a.content_id IN (".
				"SELECT content_id FROM #__mobirate_binding ".
				"WHERE bind_id IN (".
        			"SELECT bind_id FROM #__mobirate_binding ".
        			"WHERE content_id = $cid))" .
				" OR a.content_id = $cid)");
		
		// Filter by published state
		$query->where('a.state = 1');
		

		// Add the list ordering clause.
		$query->order($db->getEscaped($this->getState('list.ordering', 'a.add_date')).' '.$db->getEscaped($this->getState('list.direction', 'DESC')));
		return $query;
	}
	
	/**
	 * Get content article from database
	 */
	function getContentItem() 
	{	
		$app = JFactory::getApplication();
		$appParams = $app->getParams();
		$item = false;
		$contentid = $this->getState('content.id', '-1');
		if((int)$contentid > -1) {
			$articleModel = JModel::getInstance('Article', 'ContentModel', array('ignore_request' => true));
			$articleModel->setState('params', $this->getState('params'));
			$articleModel->setState('filter.published', 1);
			$articleModel->setState('article.id', (int) $contentid);
			$item = $articleModel->getItem();
		}
		
		return $item;		
	}
    
}
