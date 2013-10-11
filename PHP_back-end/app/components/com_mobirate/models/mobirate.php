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

jimport('joomla.application.component.modelitem');

JModel::addIncludePath(JPATH_SITE.DS.'components'.DS.'com_content'.DS.'models');


/**
 * MobiRate Component MobiRate Model
 *
 * @author      Magnus Häggström, Omicron Ceti AB
 * @package		Joomla
 * @subpackage	MobiRate
 * @since 1.5
 */
class MobirateModelMobirate extends JModelItem 
{
	var $articleModel = null;

	/**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @since	1.6
	 */
	protected function populateState()
	{
		$app = JFactory::getApplication('site');

		// Load state from the request.
		$pk = JRequest::getVar('id', 0, '', 'int');
		$this->setState('mobirate.id', $pk);
		
		$this->setState('filter.state', 1);

		// Load the parameters.
		$params = $app->getParams();
		$this->setState('params', $params);
	}

	/**
	 * Method to get mobirate data.
	 *
	 * @param	integer	The id of the mobirate.
	 *
	 * @return	mixed	Mobirate item data object on success, false on failure.
	 */
	public function &getItem($pk = null)
	{
		// Initialise variables.
		$pk = (!empty($pk)) ? $pk : (int) $this->getState('mobirate.id');

		if ($this->_item === null) {
			$this->_item = array();
		}
		
		if (!isset($this->_item[$pk])) {
			$this->_item[$pk] = false;

			// Get a level row instance.
			$table = JTable::getInstance('Mobirate', 'MobirateTable');

			// Attempt to load the row.
			if ($table->load($pk))
			{
				// Check published state.
				if ($published = $this->getState('filter.state'))
				{
					if ($table->state != $published) {
						return $this->_item[$pk];
					}
				}

				// Convert the JTable to a clean JObject.
				$this->_item[$pk] = JArrayHelper::toObject($table->getProperties(1), 'JObject');
			}
			else if ($error = $table->getError()) {
				$this->setError($error);
			}
		}

		return $this->_item[$pk];
		
		
		
		// Initialise variables.
/*		$pk = (!empty($pk)) ? $pk : (int) $this->getState('mobirate.id');

		if ($this->_item === null) {
			$this->_item = array();
		}

		if (!isset($this->_item[$pk])) {

			try {
				$db = $this->getDbo();
				$query = $db->getQuery(true);

				$query->select('a.*');
				$query->from('#__mobirate AS a');
				
				$query->where('a.id = ' . (int) $pk);

				// Filter by published state.
				$published = $this->getState('filter.published');
				if (is_numeric($published)) {
					$query->where('a.published = ' . (int) $published);
				}

				$db->setQuery($query);
				$data = $db->loadObject();

				if ($error = $db->getErrorMsg()) {
					throw new Exception($error);
				}

				if (empty($data)) {
					throw new JException(JText::_('COM_MOBIRATE_ERROR_MOBIRATE_NOT_FOUND'), 404);
				}

				// Check for published state if filter set.
				if (is_numeric($published) && $data->published != $published)
				{
					throw new JException(JText::_('COM_MOBIRATE_ERROR_MOBIRATE_NOT_FOUND'), 404);
				}

				$this->_item[$pk] = $data;
			}
			catch (JException $e)
			{
				$this->setError($e);
				$this->_item[$pk] = false;
			}
		}

		return $this->_item[$pk];*/
	}
    
    /**
     * Store MobiRate from request data
     * 
     * @param array Data from request
     */
    function store($data) 
    {    	
    	JTable::addIncludePath(JPATH_COMPONENT_ADMINISTRATOR.DS.'tables');
    	$table =& JTable::getInstance('Mobirate', 'MobirateTable');
    	
    	// Bind the form fields to the reply table
		if (!$table->save($data)) {
			$this->setError($table->getError());
			return false;
		}
		
		return $table;
    }

	/**
	 * Method to get content data binded mobirate.
	 *
	 * @param	integer	The id of the mobirate binded to content.
	 * @param	integer	Content id, null for content id from mobirate.
	 *
	 * @return	mixed	Content item data object on success, false on failure.
	 */
	function getContentItem($pk = null, $cid = null)
	{
		// Initialise variables.
		if($cid === null) {
			$mobirate =& $this->getItem($pk);
			if($mobirate) {
				$cid = $mobirate->content_id;
			} else {
				return false;
			}
		}
		
		if(empty($this->articleModel)) {
			$this->articleModel =& JModel::getInstance('Article', 'ContentModel', array('ignore_request' => true));
		}
		$this->articleModel->setState('params', $this->getState('params'));
		$this->articleModel->setState('filter.published', 1);
		$this->articleModel->setState('article.id', (int) $cid);
		$item = $this->articleModel->getItem();
		
		if($err = $this->articleModel->getError()) {
			$this->setError($err);
			return false;
		}
		return $item;
	}
    
    /**
     * 
	 * @param	integer	The id of the mobirate, null for request id.
	 * 
     * @return boolean True on ok, else false
     */
    function reportItem($pk=null) 
    {	
		$mobirate =& $this->getItem($pk);
		if(empty($mobirate)) {
			return false;
		}
		
		$date = JFactory::getDate();
		$date = $date->toMySQL();
    	
    	$db = $this->getDbo();
		
		$query = "INSERT INTO #__mobirate_reports (rateid,date) ";
		$query .= "VALUES('$mobirate->id','$date')";
		
		$db->setQuery($query);
		$db->query();
		
		if($db->getErrorNum() > 0) {
			$this->setError($db->getErrorMsg());
			return false;
		}
		
		return true;
    }
}
