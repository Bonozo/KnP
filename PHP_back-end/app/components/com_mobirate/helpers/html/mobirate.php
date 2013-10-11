<?php
/**
 * Joomla! 1.6 component MobiRate
 * 
 * This component is designed for mobile websites and enables user rating and comments.
 * 
 * @version     $Id: $
 * @package		Joomla.Administrator
 * @subpackage  com_mobirate
 * @since		2.0
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

// No direct access
defined('_JEXEC') or die;

class JHtmlMobirate
{
	/**
	 * Create a select list for rating value
	 * 
	 * @param string name Name for the list as identification
	 * @param string type Selected type 
	 * @param string html HTML code to append to the select tag, can be scripts
	 */
	function selectrate($name, $type=NULL, $html='')
	{
		$types = array();
		
		$types[] = JHTML::_('select.option', '', JText::_('COM_MOBIRATE_DONT_RATE'));
		$types[] = JHTML::_('select.option', '1', JText::_('COM_MOBIRATE_RATE_1'));
		$types[] = JHTML::_('select.option', '2', JText::_('COM_MOBIRATE_RATE_2'));
		$types[] = JHTML::_('select.option', '3', JText::_('COM_MOBIRATE_RATE_3'));
		$types[] = JHTML::_('select.option', '4', JText::_('COM_MOBIRATE_RATE_4'));
		$types[] = JHTML::_('select.option', '5', JText::_('COM_MOBIRATE_RATE_5'));
		
		return JHTML::_('select.genericlist', $types, $name, 'class="inputbox" size="1" '.$html, 'value', 'text', $type);
	}
	
	/**
	 * Get rating value as HTML code with images
	 * 
	 * @param float rating Rating values
	 * @param boolean average If text should be as it is an average rate
	 * @return string HTML code for rating value
	 */
	public static function rating($rating, $average=false, $bigicons=false) 
	{
		$lang = JFactory::getLanguage();
		$lang->load('com_mobirate');
		
		$result = "";
		if($rating > 0) {
			if($average) {
				$alttext = JText::_('COM_MOBIRATE_AVERAGE_RATE_IS') . " $rating / 5";
			} else {
				$alttext = JText::_('COM_MOBIRATE_RATE') . " $rating / 5";
			}
			$rating = (int)round((float)$rating*2);
			for($i=0; $i < $rating; $i+=2) {
				if($i + 1 < $rating) {
					$result.= JHTML::_('image', 'com_mobirate/star_on'.($bigicons?'_big':'').'.png', $alttext, NULL, true);//"<img src=\"".MOBIRATE_STAR_ON_ICON."\" alt=\"$alttext\" title=\"$alttext\" />";
				} else {
					$result.= JHTML::_('image', 'com_mobirate/star_half'.($bigicons?'_big':'').'.png', $alttext, NULL, true);//"<img src=\"".MOBIRATE_STAR_HALF_ICON."\" alt=\"$alttext\" title=\"$alttext\" />";
				}
			}
			for(; $i < 10; $i+=2) {
				$result.= JHTML::_('image', 'com_mobirate/star_off'.($bigicons?'_big':'').'.png', $alttext, NULL, true);//"<img src=\"".MOBIRATE_STAR_OFF_ICON."\" alt=\"$alttext\" title=\"$alttext\" />";
			}
		} else if( $average ) {
			$alttext = JText::_('COM_MOBIRATE_NO_OPINIONS');
			for($i=0; $i < 5; $i++) {
				$result.= JHTML::_('image', 'com_mobirate/star_inactive'.($bigicons?'_big':'').'.png', $alttext, NULL, true);//"<img src=\"".MOBIRATE_STAR_HALF_ICON."\" alt=\"$alttext\" title=\"$alttext\" />";
			}
		}
		return $result;
	} 
	
	/**
	 * Static function to create a formulary for user to
	 * add MobiRating 
	 * 
	 * 
	 */
	static function addform($cid, $uri)
	{
		$user = JFactory::getUser();
		$lang = JFactory::getLanguage();
		$lang->load('com_mobirate');
		
		$retPath = JRoute::_("index.php?option=com_mobirate&task=addrate&id=$cid");
		$result = '<form class="commentForm" action="'.$retPath.'" method="post">';
		$result.= '<fieldset>';
		//$result.= '<legend>'.JText::_('COM_MOBIRATE_ADD_YOUR_OPINION').'</legend>';
		$result.= '<div class="section">';//.JText::_('COM_MOBIRATE_RATE');
		$result.= JHtml::_('mobirate.selectrate', 'rating').'</div>';
		
		$result.= '<div class="section">'/*.JText::_('COM_MOBIRATE_COMMENT')*/;
		$result.= '<div class="textareaContainer"><textarea rows="4" name="comment"></textarea></div></div>';
		
		$result.= '<div class="section"><input type="text" name="user" value="';
		if($user->guest != 1) {
			$result.= $user->username;
		}
		$result.= '" />';
		$result.= '<label>'.JText::_('COM_MOBIRATE_YOUR_NAME').'</label><div class="clearfix"></div></div>';
		
		$result.= '<div class="section" style="text-align: right">';
		$result.= '<input type="submit" class="submit button" value="'.JText::_('COM_MOBIRATE_SUBMIT_RATE').'" /></div>';
		
		$result.= '<input type="hidden" name="return" value="'.base64_encode($uri).'" />';
		$result.= JHTML::_( 'form.token' );
		$result.= '</fieldset></form>';
		
		return $result;
	}
	
	/**
	 * Get a new captcha imgage
	 *
	 */
	static function captchainput($name, $new = true, $imgonly = false)
	{
		$app =& JFactory::getApplication();
    	
		if($new) {
	    	$num1 = (int) rand(1, 9);
			$num2 = (int) rand(1, 9);
			$app->setUserState('com_mobirate.captcha.num1', $num1);
			$app->setUserState('com_mobirate.captcha.num2', $num2);
		}
    	
    	$imgurl = JRoute::_("index.php?option=com_mobirate&view=captcha&format=raw");
		
    	$img = '<img src="'.$imgurl.'" alt="Security question" title="Security question" />';
    	if($imgonly) {
    		return $img;
    	}
    	
    	$ret = '<table class="mobiratecaptcha"><tbody><tr>';
		$ret .= '<td>'.$img.'</td>';
		$ret .= '<td><input type="text" name="'.$name.'" size="10" /> </td>';
		$ret .= '</tr></tbody></table>';
		
		return $ret;
	}
}
