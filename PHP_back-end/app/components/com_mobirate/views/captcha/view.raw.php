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

/**
 * Captcha View class for the MobiRate component
 */
class MobirateViewCaptcha extends JView 
{
	function display($tpl = null) 
	{
		$app =& JFactory::getApplication();
		
		$num1 = $app->getUserState('com_mobirate.captcha.num1');
		$num2 = $app->getUserState('com_mobirate.captcha.num2');
		
		$document = & JFactory::getDocument();
		$document->setMimeEncoding("image/png");
		
		JResponse::allowCache(false);
		JResponse::setHeader('Content-Transfer-Encoding', 'binary', true);
		
		$im = imagecreate(80, 30);
		
		// Get colors
		$bg = imagecolorallocate($im, 192, 192, 192);
		$textcolor = imagecolorallocate($im, 0, 0, 255);

		// Write the string at the top left
		imagestring($im, 5, 10, 5, "$num1 + $num2 =", $textcolor);
		
		// Write image
		imagepng($im);
		
		// Deallocate stuff
		imagecolordeallocate($im, $bg);
		imagecolordeallocate($im, $textcolor);
		imagedestroy($im);
    }
}
