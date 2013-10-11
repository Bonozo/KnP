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
class MobirateViewList extends JView 
{
	protected $state;
	protected $items;
	protected $params;
	protected $pagination;
	protected $article;
	protected $return;
	
	function display($tpl = null) 
	{		
		$app = JFactory::getApplication();
		$user = JFactory::getUser();
   		
		$state = $this->get('State');
		$params = $state->params;
   		$items = $this->get('Items');
   		$pagination = $this->get('Pagination');
   		$article = $this->get('ContentItem');
   		
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
		
		$params->set('access_create', $user->authorise('core.create', 'com_mobirate'));
		
		$cid = $state->get('content.id');
		$return = $app->getUserStateFromRequest('com_mobirate.list'.$cid.'.return', 'return', '', 'base64');
   		//$return = JRequest::getVar('return', '', 'method', 'base64');
   		if(empty($return)) {
   			$return = JRoute::_(ContentHelperRoute::getArticleRoute($article->id, $article->catid));
   			$return = base64_encode($return);
   		}
   		
   		$this->assignRef('state', $state);
   		$this->assignRef('params', $params);
   		$this->assignRef('items', $items);
   		$this->assignRef('pagination', $pagination);
   		$this->assignRef('article', $article);
   		$this->assignRef('return', $return);
		
		$this->_prepareDocument();
   		
        parent::display($tpl);
    }

	/**
	 * Prepares the document
	 */
	protected function _prepareDocument()
	{
		$app		= JFactory::getApplication();
		$menus		= $app->getMenu();
		$pathway	= $app->getPathway();
		$title		= null;

		// Because the application sets a default page title,
		// we need to get it from the menu item itself
		$menu = $menus->getActive();

		if ($menu) {
			$this->params->def('page_heading', $this->params->get('page_title', $menu->title));
		}
		else if($this->article) {
			$this->params->def('page_heading', JText::sprintf('COM_MOBIRATE_OPINIONS_FOR', $this->escape($this->article->title)));
		}

		$id = (int) @$menu->query['id'];

		//if ($menu && ($menu->query['option'] != 'com_mobirate' || $menu->query['view'] == 'article' || $id != $this->category->id)) {
		if($this->article) {
			$path = array(array('title' => JText::_('COM_MOBIRATE_USER_OPINIONS'), 'link' => ''));
			
			$path[] = array('title' => $this->article->title, 'link' => ContentHelperRoute::getArticleRoute($this->article->id, $this->article->catid));
			
			$categories = JCategories::getInstance('Content');
			$category = $categories->get((int)$this->article->catid);
			
			/*$path[] = array('title' => $this->category->title, 'link' => '');
			$category = $this->category->getParent();*/

			while ($category->id > 1)
			{
				$path[] = array('title' => $category->title, 'link' => ContentHelperRoute::getCategoryRoute($category->id));
				$category = $category->getParent();
			}

			$path = array_reverse($path);

			foreach ($path as $item)
			{
				$pathway->addItem($item['title'], $item['link']);
			}
		}

		$title = $this->params->get('page_title', '');

		if (empty($title)) {
			$title = $app->getCfg('sitename');
		}
		elseif ($app->getCfg('sitename_pagetitles', 0)) {
			$title = JText::sprintf('JPAGETITLE', $app->getCfg('sitename'), $title);
		}

		$this->document->setTitle($title);
	}
}
