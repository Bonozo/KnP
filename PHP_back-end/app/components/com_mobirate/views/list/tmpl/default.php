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

JHTML::_('stylesheet','com_mobirate/mobirate.css', array(), true);

$uri = JFactory::getURI();
$returnthis = base64_encode($uri);
?>

<div id="openContentContainer">

<h1 class="contentheading"><?php echo JText::sprintf('COM_MOBIRATE_OPINIONS_FOR', $this->escape($this->article->title))?></h1>

<div class="section">
<span class="button back">
	<span class="border back"></span><a href="<?php echo JRoute::_(base64_decode($this->return))?>"><?php echo JText::_('COM_MOBIRATE_GO_BACK') ?></a>
</span>
</div>
<?php if($this->params->get('access_create')):?>
<div class="section">
<span class="button">
	<span class="border"></span><a href="<?php echo $uri?>#mobirateadd"><?php echo JText::_('COM_MOBIRATE_ADD_YOUR_OPINION') ?></a>
</span>
</div>
<?php endif;?>

<div class="sectionTitle">
<h2><?php echo JText::_('COM_MOBIRATE_USER_OPINIONS') ?></h3>
</div>

<?php if(count($this->items)) : ?>
<?php foreach($this->items as $index => $item) : ?>
	<div class="userComment">
		<div class="titleBar">
			<h3><?php echo $item->user?></h3>
			<span class="date"><?php echo JHTML::_('date', $item->add_date)?></span>
			<span class="rate"><?php echo JHtml::_('mobirate.rating', $item->rating);?></span>
			<div class="clearfix"></div>
		</div>
		<div class="message">
			<?php echo $item->comment?>
			<br />
			<a href="<?php echo JRoute::_("index.php?option=com_mobirate&view=mobirate&layout=report&id=".$item->id."&return=".$returnthis)?>">
				<?php echo JText::_('COM_MOBIRATE_REPORT_COMMENT')?>
			</a>
		</div>
	</div>
<?php endforeach; ?>
<?php else : ?>
	<div class="section"><?php echo JText::_('COM_MOBIRATE_NO_OPINIONS'); ?></div>
<?php endif;?>


<?php if ($this->pagination->get('pages.total') > 1) : ?>
<div class="pagination">

	<?php if ($this->params->def('show_pagination_results', 1)) : ?>
	 	<p class="counter">
			<?php echo $this->pagination->getPagesCounter(); ?>
		</p>
	<?php endif; ?>

	<?php echo $this->pagination->getPagesLinks(); ?>
</div>
<?php endif; ?>

<a name="mobirateadd"></a>
<div class="sectionTitle">
<h2><?php echo JText::_('COM_MOBIRATE_ADD_YOUR_OPINION')?></h2>
</div>
<?php echo $this->loadTemplate('form'); ?>

</div>
