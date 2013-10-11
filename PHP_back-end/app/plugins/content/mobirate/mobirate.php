<?php
/**
 * Joomla! 1.5 content plugin MobiRate
 *
 * This plugin is designed for mobile websites and displays user
 * rating and comments from the MobiRate component.
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

// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die;

jimport( 'joomla.plugin.plugin' );

/**
 * MobiRate Content Plugin
 *
 * @package		Joomla
 * @subpackage	Content
 * @since 		1.5
 */
class plgContentMobirate extends JPlugin
{

	/**
	 * Example after display content method
	 *
	 * Method is called by the view and the results are imploded and displayed in a placeholder
	 *
	 * @param	string		The context for the content passed to the plugin.
	 * @param	object		The content object.  Note $article->text is also available
	 * @param	object		The content params
	 * @param	int			The 'page' number
	 * @return	string
	 * @since	1.6
	 */
	public function onContentAfterDisplay($context, &$article, &$params, $limitstart=0)
	{
		$app = JFactory::getApplication();
		$user	= JFactory::getUser();
		$result = '';

		if(strncasecmp($context, 'com_content', strlen('com_content')) != 0) {
			return false;
		}

		$view = JRequest::getString('view', '');
		if ( $view == 'article' && $article->state == 1) {
			$helperPath = JPATH_SITE.DS.'components'.DS.'com_mobirate'.DS.'helpers';
			if(!is_dir($helperPath)) {
				return "<span class=\"alert\">Fatal Error: the component <b>com_mobirate</b> is not/badly installed. " . "Get it at <a href=\"http://sourceforge.net/projects/visitas/\">sourceforge.net</a></span>";
			}
				
			require_once($helperPath.DS.'helper.php');
			JHtml::addIncludePath($helperPath.DS.'html');
			JHTML::_('stylesheet','com_mobirate/mobirate.css', array(), true);
				
			$display = $this->params->get('displayafter', 1);
			if($display) {
				if(MobirateHelper::isRatingEnabled($article->id, $article->catid)) {
						
					$uri = & JFactory::getURI();
					$uristr = str_replace("&","&amp;", JRoute::_($uri->toString()));
						
					$comParams =& JComponentHelper::getParams( 'com_mobirate' );
					$nofRatings = (int)$comParams->get('nofratings', 0);
						
					$a = MobirateHelper::getPubRatingsByArticle($article->id, $nofRatings);
						
					$result .= '<div class="sectionTitle">';
					$result .= '<h2>'.JText::_('COM_MOBIRATE_USER_OPINIONS').'</h2>';
					$result .= '</div>';
						
					if($user->authorise('core.create', 'com_mobirate')) {
						$result .= JHtml::_('mobirate.addform', $article->id, $uristr);
					}
						
					foreach($a as $index => $item) {
						$result .= '
						<div class="userComment">
							<div class="titleBar">
								<h3>'.$item->user.'</h3>
								<span class="date">'.JHTML::_('date', $item->add_date).'</span>
								<span class="rate">'.JHtml::_('mobirate.rating', $item->rating).'</span>
								<div class="clearfix"></div>
							</div>
							<div class="message">
								'.$item->comment.'
								<br />
								<a href="'.JRoute::_("index.php?option=com_mobirate&view=mobirate&layout=report&id=".$item->id."&return=".base64_encode($uri)).'">
									'.JText::_('COM_MOBIRATE_REPORT_COMMENT').'
								</a>
							</div>
						</div>';
					}
				}
			}
		}

		return $result;
	}

	/**
	 * Example before display content method
	 *
	 * Method is called by the view and the results are imploded and displayed in a placeholder
	 *
	 * @param	string		The context for the content passed to the plugin.
	 * @param	object		The content object.  Note $article->text is also available
	 * @param	object		The content params
	 * @param	int			The 'page' number
	 * @return	string
	 * @since	1.6
	 */
	public function onContentBeforeDisplay($context, &$article, &$params, $limitstart=0)
	{
		$app = JFactory::getApplication();
		$menus = $app->getMenu();
		$menu = $menus->getActive();

		$helperPath = JPATH_SITE.DS.'components'.DS.'com_mobirate'.DS.'helpers';
		if(!is_dir($helperPath)) {
			return "<span class=\"alert\">Fatal Error: the component <b>com_mobirate</b> is not/badly installed. " . "Get it at <a href=\"http://sourceforge.net/projects/visitas/\">sourceforge.net</a></span>";
		}
		require_once($helperPath.DS.'helper.php');
		
		// Set average rating to content if needed by other Joomla extensions
		if(empty($article->mobirate_average)) {
			$article->mobirate_average = MobirateHelper::getPubRatingAverage($article->id);
			if($article->mobirate_average == NULL) {
				$article->mobirate_average = array();
				$article->mobirate_average['average'] = 0;
				$article->mobirate_average['count'] = 0;
			}
		}
		
		if(strncasecmp($context, 'com_content', strlen('com_content')) != 0) {
			return false;
		}
		
		JHtml::addIncludePath($helperPath.DS.'html');
		JHTML::_('stylesheet','com_mobirate/mobirate.css', array(), true);

		$lang = JFactory::getLanguage();
		$lang->load('com_mobirate');

		$displayAverage = $this->params->get('displayaverage', 1);
		$result = "";
		if(MobirateHelper::isRatingEnabled($article->id, $article->catid)) {
			$uri = JFactory::getURI();
			$uristr = "index.php?option=com_mobirate&view=list&id=$article->slug";
			if(is_object($menu)) {
				$uristr.= "&Itemid=$menu->id";
			}
			$uristr.= "&return=" . base64_encode($uri);
			$uristr = JRoute::_($uristr);
				
			if($displayAverage) {

				$result .= "<div class=\"mobirate\">\n";
				$result .= JHtml::_('mobirate.rating', $article->mobirate_average['average'], true, true);
				//$result .= "(".JText::_('COM_MOBIRATE_AVERAGE_OF')." ";
				$result .= "<a href=\"$uristr\">(".$article->mobirate_average['count'].")</a>";
				$result .= "</div>\n";
			}
			else {
				$result .= "<span class=\"topInfo\">\n";
				$result .= "<a href=\"$uristr\">";
				$result .= JText::_('COM_MOBIRATE_SEE_USER_RATINGS')."</a>\n";
				$result .= "</span>\n";
			}
		}

		return $result;
	}


	/**
	 *
	 * Method is called by the view
	 *
	 * @param	string	The context of the content being passed to the plugin.
	 * @param	object	The content object.  Note $article->text is also available
	 * @param	object	The content params
	 * @param	int		The 'page' number
	 * @since	1.6
	 */
	/*public function onContentPrepare($context, &$article, &$params, $limitstart)
	{
		if(!empty($article->mobirate_average)) {
			return;
		}

		$helperPath = JPATH_SITE.DS.'components'.DS.'com_mobirate'.DS.'helpers';
		if(!is_dir($helperPath)) {
			return "<span class=\"alert\">Fatal Error: the component <b>com_mobirate</b> is not/badly installed. " . "Get it at <a href=\"http://sourceforge.net/projects/visitas/\">sourceforge.net</a></span>";
		}

		require_once($helperPath.DS.'helper.php');
		
		//echo "<h1>Calculating new average for $article->id</h1>";
		//$article->mobirate_average = MobirateHelper::getPubRatingAverage($article->id);
	}*/
}
