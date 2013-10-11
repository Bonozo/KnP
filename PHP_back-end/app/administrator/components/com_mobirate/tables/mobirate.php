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

// Include library dependencies
jimport('joomla.filter.input');

/**
* Table class
*
* @package          Joomla
* @subpackage		MobiRate
*/
class MobirateTableMobirate extends JTable {


    /**
	 * Constructor
	 *
	 * @param object Database connector object
	 * @since 1.0
	 */
	function __construct(& $db) {
		parent::__construct('#__mobirate', 'id', $db);
	}


	/**
	 * Overload the bind method for the Mobirate table.
	 *
	 * @param	boolean	Toggle whether null values should be updated.
	 * @return	boolean	True on success, false on failure.
	 * @since	1.6
	 */
	public function bind($src, $ignore = array())
	{
		$user =& JFactory::getUser();
		
		if(empty($src['user'])) {
			$src['user'] = $user->get('username');
		}
		
		// Attempt to store the user data.
		return parent::bind($src, $ignore);
	}


	/**
	 * Overload the store method for the Mobirate table.
	 *
	 * @param	boolean	Toggle whether null values should be updated.
	 * @return	boolean	True on success, false on failure.
	 * @since	1.6
	 */
	public function store($updateNulls = false)
	{
		$date	= JFactory::getDate();
		if ($this->id) {
			// Old rating
		} else {
			// New rating
			$this->add_date = $date->toMySQL();
		}
		
		// Attempt to store the user data.
		return parent::store($updateNulls);
	}

	/**
	 * Overloaded check method to ensure data integrity
	 *
	 * @access public
	 * @return boolean True on success
	 */
	function check() {
		
		if(isset($this->rating)) {
			if(!is_numeric($this->rating)) {
				$this->setError(JText::_('COM_MOBIRATE_ERROR_RATING_VALUE'));
				return false;
			}
			if($this->rating < 0 || $this->rating > 5) {
				$this->rating = 0;
			}
		}
		
		if(empty($this->content_id)) {
			$this->setError(JText::_('COM_MOBIRATE_ERROR_NO_CONTENT_ID'));
			return false;
		}
		
		if(empty($this->comment) && empty($this->rating)) {
			$this->setError(JText::_('COM_MOBIRATE_ERROR_NEED_MORE_INFO'));
			return false;
		}
		
		// Clean up comment and convert to html-format
		if(!empty($this->comment)) {
			$this->comment = htmlspecialchars($this->comment);
			$this->comment = str_replace("\r\n", "<br />", $this->comment);
			$this->comment = str_replace("\n", "<br />", $this->comment);
		}
		// Clean up user name
		if(!empty($this->user)) {
			$this->user = htmlspecialchars($this->user);
		}
		return true;
	}

}
