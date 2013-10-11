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

?>

<h2 class="contentheading"><?php echo JText::_('COM_MOBIRATE_CONFIRM_RATING'); ?></h2>

<?php if((int)$this->rating['rating'] > 0 || trim($this->rating['comment']) != "") : ?> 

	<div class="mobiratings">
	<div class="mobirateentry1">
		<div class="mobiraterating">
			<?php echo JHtml::_('mobirate.rating', $this->rating['rating']);?>
		</div>
		<div class="mobiratecomment">
			<?php echo $this->rating['comment_escaped']?>
		</div>
		<div class="mobirateuser">
			<?php echo $this->rating['user']?>
		</div>
	</div>
	</div>

	<form action="<?php echo JRoute::_("index.php?option=com_mobirate&task=addconfirmed&id=".$this->rating['content_id'])?>" method="post"> 
		
		<?php echo JHtml::_('mobirate.captchainput', 'code', true)?>
		
		<input type="submit" value="<?php echo JText::_('COM_MOBIRATE_SUBMIT_RATE') ?>" />
		
		<input type="hidden" name="user" value="<?php echo $this->rating['user'] ?>" />
		<input type="hidden" name="comment" value="<?php echo $this->rating['comment'] ?>" />
		<input type="hidden" name="rating" value="<?php echo $this->rating['rating'] ?>" />
		<input type="hidden" name="return" value="<?php echo $this->return?>"></input>
		<?php echo JHTML::_( 'form.token' )?>
	</form>
<?php else : ?>
	<p>
		<?php echo JText::_('COM_MOBIRATE_ERROR_NEED_MORE_INFO') ?>
	</p>
<?php endif; ?>
<p>
	<a href="<?php echo base64_decode($this->return)?>">
	<?php echo JText::_('COM_MOBIRATE_GO_BACK') ?>
	</a>
</p>