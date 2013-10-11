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
jimport( 'joomla.application.categories' );

class MobirateViewOnoff extends JView 
{
	protected $items;
	protected $pagination;
	protected $state;
	protected $category;
	protected $cat_childs;
	
	/**
	 * Display view
	 */
    function display($tpl = null) 
    {
		$this->state		= $this->get('State');
		$this->items		= $this->get('Items');
		$this->pagination	= $this->get('Pagination');
		$this->category     = $this->get('RootCategory');
		$this->cat_childs   = $this->get('RootCategoryChildren');
		
		$this->cat_childs = array($this->category->id => $this->cat_childs);

		// Check for errors.
		if (count($errors = $this->get('Errors'))) {
			JError::raiseError(500, implode("\n", $errors));
			return false;
		}
		
		$layout = $this->getLayout();
		
		if($layout == 'default') {
			JHtml::_('script','system/mootree.js', true, true, false, false);
			JHtml::_('stylesheet','system/mootree.css', array(), true);
			
			$params = array();
			$data = array();
			$data['url'] = 'index.php?option=com_mobirate&view=onoff&filter_category_id&layout=table&tmpl=component';
			$data['target'] = 'tableframe';
			$root = array();
			$root['text'] = 'Root';
			$root['data'] = $data;
			JHTML::_('behavior.tree', 'mobirate-cats', $params, $root);
			
			$this->addToolbar();
		}
		
        parent::display($tpl);
    }
    

	/**
	 * Add the page title and toolbar.
	 *
	 */
	protected function addToolbar()
	{
		$canDo	= MobirateHelper::getActions();
		
		// Get the toolbar object instance
		$bar = JToolBar::getInstance('toolbar');
		
		JToolBarHelper::title(JText::_('COM_MOBIRATE_TITLE_ENABLE'), 'mobirate');
		
		$title = JText::_('COM_MOBIRATE_ENABLE');
		$dhtml = "<a href=\"#\" class=\"toolbar\"";
		if ( $canDo->get('mobirate.admin.onoff') ) {
			$dhtml .= " onclick=\"submitForm('enable')\">
					<span class=\"icon-32-publish\" title=\"$title\">";
		} else {
			$dhtml .= "><span class=\"icon-32-publish toolbar-inactive\" title=\"".JText::_('JGLOBAL_AUTH_ACCESS_DENIED')."\">";
		}
		$dhtml .= "</span>$title</a>";
		$bar->appendButton('Custom', $dhtml, 'publish');
		
		$title = JText::_('COM_MOBIRATE_DISABLE');
		$dhtml = "<a href=\"#\" class=\"toolbar\"";
		if ( $canDo->get('mobirate.admin.onoff') ) {
			$dhtml .= " onclick=\"submitForm('disable')\">
					<span class=\"icon-32-unpublish\" title=\"$title\">";
		} else {
			$dhtml .= "><span class=\"icon-32-unpublish toolbar-inactive\" title=\"".JText::_('JGLOBAL_AUTH_ACCESS_DENIED')."\">";
		}
		$dhtml .= "</span>$title</a>";
		$bar->appendButton('Custom', $dhtml, 'unpublish');
		
		$title = JText::_('COM_MOBIRATE_INHERIT');
		$dhtml = "<a href=\"#\" class=\"toolbar\"";
		if ( $canDo->get('mobirate.admin.onoff') ) {
			$dhtml .= " onclick=\"submitForm('inherit')\">
					<span class=\"icon-32-delete\" title=\"$title\">";
		} else {
			$dhtml .= "><span class=\"icon-32-delete toolbar-inactive\" title=\"".JText::_('JGLOBAL_AUTH_ACCESS_DENIED')."\">";
		}
		$dhtml .= "</span>$title</a>";
		$bar->appendButton('Custom', $dhtml, 'delete');
		
		JToolBarHelper::divider();
			
		if ($canDo->get('core.admin')) {			
			JToolBarHelper::preferences('com_mobirate');
		}
	}
}
?>