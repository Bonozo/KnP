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

// Import Joomla! libraries
jimport('joomla.application.component.modellist');

class MobirateModelOnoff extends JModelList 
{
	/**
	 * Category stuff
	 * @var array
	 */
	protected $_item = null;
	protected $_children = null;
	
    /**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
     */
	protected function populateState()
	{
		// Initialise variables.
		$app = JFactory::getApplication('administrator');

		// Load the filter state.
		$categoryId = $app->getUserStateFromRequest($this->context.'.filter.category_id', 'filter_category_id', '');
		$this->setState('filter.category_id', $categoryId);

		$published = $app->getUserStateFromRequest($this->context.'filter.published', 'filter_published', '');
		$this->setState('filter.published', $published);

		$config = $app->getUserStateFromRequest($this->context.'.filter.config', 'filter_config', '');
		$this->setState('filter.config', $config);

		$language = $app->getUserStateFromRequest($this->context.'.filter.language', 'filter_language', '');
		$this->setState('filter.language', $language);

		// Load the parameters.
		$params = JComponentHelper::getParams('com_mobirate');
		$this->setState('params', $params);

		// List state information.
		parent::populateState('a.lft', 'asc');
	}


	/**
	 * Method to get a store id based on model configuration state.
	 *
	 * This is necessary because the model is used by the component and
	 * different modules that might need different sets of data or different
	 * ordering requirements.
	 *
	 * @param	string		$id	A prefix for the store id.
	 * @return	string		A store id.
	 */
	protected function getStoreId($id = '')
	{
		// Compile the store id.
		$id.= ':' . $this->getState('filter.category_id');
		$id.= ':' . $this->getState('filter.published');
		$id.= ':' . $this->getState('filter.config');
		$id.= ':' . $this->getState('filter.language');

		return parent::getStoreId($id);
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @return	JDatabaseQuery
	 */
	protected function getListQuery()
	{
		// Create a new query object.
		$db		= $this->getDbo();
		$query	= $db->getQuery(true);

		// Select the required fields from the table.
		$query->select(
			$this->getState(
				'list.select',
				'a.id, a.title, a.alias, a.note, a.published, a.access' .
				', a.checked_out, a.checked_out_time, a.created_user_id' .
				', a.path, a.parent_id, a.level, a.lft, a.rgt' .
				', a.language'
			)
		);
		$query->from('#__categories AS a');

		// Join over the mobirate onoff categories.
		$query->select('m.onoff AS mobirate_onoff');
		$query->join('LEFT', '#__mobirate_onoffcategory AS m ON a.id = m.cat_id');

		// Join over the language
		$query->select('l.title AS language_title');
		$query->join('LEFT', '`#__languages` AS l ON l.lang_code = a.language');

		// Join over the asset groups.
		$query->select('ag.title AS access_level');
		$query->join('LEFT', '#__viewlevels AS ag ON ag.id = a.access');

		// Filter by extension
		$query->where('a.extension = '.$db->quote('com_content'));
		
		// Filter by category parent id
		$parent_id = $this->getState('filter.category_id');
		if(is_numeric($parent_id)) {
			$query->where('a.parent_id = '.(int) $parent_id);
		} else {
			$query->where('a.parent_id = 1');
		}

		// Filter by published state
		$published = $this->getState('filter.published');
		if (is_numeric($published)) {
			$query->where('a.published = ' . (int) $published);
		}
		else if ($published === '') {
			$query->where('(a.published IN (0, 1))');
		}

		// Filter by configuration
		$config = $this->getState('filter.config');
		if (is_numeric($config)) {
			if($config == -1) {
				$query->where('m.onoff is NULL');
			} else {
				$query->where('m.onoff = ' . (int) $config);
			}
		}

		// Filter on the language.
		if ($language = $this->getState('filter.language')) {
			$query->where('a.language = '.$db->quote($language));
		}

		// Add the list ordering clause.
		$orderCol	= $this->getState('list.ordering', 'a.title');
		$orderDirn	= $this->getState('list.direction', 'ASC');
		$query->order($db->getEscaped($orderCol.' '.$orderDirn));

		//echo "<pre>".nl2br(str_replace('#__','jos16_',$query))."</pre>";
		return $query;
	}
	
	/**
	 *
	 */
	function getRootCategory() 
	{
		if (!is_object($this->_item)) {
			$options['countItems'] = 0;
			$categories = JCategories::getInstance('Content', $options);
			$this->_item = $categories->get('root');

			if (is_object($this->_item)) {
				$this->_children = $this->_item->getChildren();
			} else {
				$this->_children = false;
			}
		}

		return $this->_item;
	}

	/**
	 * Get the child categories.
	 *
	 * @return	mixed	An array of categories or false if an error occurs.
	 */
	function &getRootCategoryChildren()
	{
		if (!is_object($this->_item)) {
			$this->getRootCategory();
		}

		return $this->_children;
	}
}
?>