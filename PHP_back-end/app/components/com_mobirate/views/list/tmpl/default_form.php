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
defined('_JEXEC') or die('Restricted access'); 

require_once(JPATH_COMPONENT.DS.'helpers'.DS.'helper.php');

JHTML::_('stylesheet','com_mobirate/mobirate.css', array(), true);
$return = JFactory::getURI();
$return = base64_encode($return);

$user = JFactory::getUser();

$username = '';
if($user->guest != 1) {
	$username = $user->username;
}
?>

<?php if($this->params->get('access_create')):?>
<form class="commentForm" action="<?php echo JRoute::_("index.php?option=com_mobirate&task=addrate&id=".$this->article->id)?>" method="post">
	<fieldset>
		<div class="section">
		<!-- <label for="rating"><?php echo JText::_('COM_MOBIRATE_RATE')?></label> -->
		<?php echo JHtml::_('mobirate.selectrate', 'rating')?>
		</div>
		
		<div class="section">
		<!-- <label for="comment"><?php echo JText::_('COM_MOBIRATE_COMMENT')?></label> -->
		<div class="textareaContainer">
		<textarea rows="4" name="comment" id="comment"></textarea>
		</div>
		</div>
		
		<div class="section">
		<input type="text" name="user" id="user" value="<?php echo $username?>" />
		<label for="user"><?php echo JText::_('COM_MOBIRATE_YOUR_NAME')?></label>
		<div class="clearfix"></div>
		</div>
		
		<div class="section" style="text-align: right">
		<input class="submit button" type="submit" value="<?php echo JText::_('COM_MOBIRATE_SUBMIT_RATE')?>" />
		</div>
		
		<input type="hidden" name="return" value="<?php echo $return?>"></input>
		<?php echo JHTML::_( 'form.token' )?>
	</fieldset>
</form>
<?php endif;?>
