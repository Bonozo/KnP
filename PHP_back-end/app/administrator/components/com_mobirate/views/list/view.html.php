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
jimport( 'joomla.application.component.view');

class MobirateViewList extends JView 
{
	protected $items;
	protected $pagination;
	protected $state;
	
	/**
	 * Display view
	 */
    public function display($tpl = null) 
    {
		$this->state		= $this->get('State');
		$this->items		= $this->get('Items');
		$this->pagination	= $this->get('Pagination');

		// Check for errors.
		if (count($errors = $this->get('Errors'))) {
			JError::raiseError(500, implode("\n", $errors));
			return false;
		}
		
		JHTML::_('stylesheet','administrator/components/com_mobirate/css/mobirate_admin.css', array(), true);
    	
		$this->addToolbar();
		
        parent::display($tpl);
    }
    

	/**
	 * Add the page title and toolbar.
	 *
	 */
	protected function addToolbar()
	{
		$state	= $this->get('State');
		$canDo	= MobirateHelper::getActions();
		
		JToolBarHelper::title(JText::_('COM_MOBIRATE_TITLE_MANAGER'), 'mobirate');
		if ($canDo->get('core.edit.state')) {
			JToolBarHelper::publishList();
			JToolBarHelper::unpublishList();
			JToolBarHelper::divider();
		}
		if ($state->get('filter.state') == -2 && $canDo->get('core.delete')) {
			JToolBarHelper::deleteList('', 'remove','JTOOLBAR_EMPTY_TRASH');
			JToolBarHelper::divider();
		} else if ($canDo->get('core.edit.state')) {
			JToolBarHelper::trash('trash','JTOOLBAR_TRASH');
			JToolBarHelper::divider();
		}
		if ($canDo->get('core.admin')) {
			JToolBarHelper::preferences('com_mobirate');
		}
	}
}
