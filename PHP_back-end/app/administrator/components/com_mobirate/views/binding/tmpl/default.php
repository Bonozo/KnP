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

JHTML::_('script','system/multiselect.js',false,true);

$listOrder	= $this->state->get('list.ordering');
$listDirn	= $this->state->get('list.direction');

$user	= JFactory::getUser();
$canChange = $user->authorise('core.edit.state', 'com_mobirate');
?>

<form action="<?php echo JRoute::_('index.php?option=com_mobirate&view=binding'); ?>" method="post" name="adminForm" id="adminForm">

	<div class="width-40 fltlft">
	<fieldset class="adminform">
		<legend><?php echo JText::_('COM_MOBIRATE_LEGEND_NEW_BINDING')?></legend>
		<ul class="adminformlist">
			<li>
				<label for="content"><?php echo JText::_('COM_MOBIRATE_FIELD_CONTENT_ID')?>:</label>
				<input type="text" name="content"></input>
			</li>
			<li>
				<label>&nbsp;</label>
				<input type="button" onclick="Joomla.submitform('bind')" value="<?php echo JText::_('COM_MOBIRATE_BIND')?>"></input>
			</li>
		</ul>
	</fieldset>
	</div>

	<div class="clr"> </div>

	<table class="adminlist">
	<thead>
		<tr>
			<th width="1%">
				<input type="checkbox" name="checkall-toggle" value="" onclick="checkAll(this)" />
			</th>
			<th>
				<?php echo JHTML::_( 'grid.sort', 'COM_MOBIRATE_CONTENT_TITLE', 'content_title', $listDirn, $listOrder); ?>
			</th>
			<th width="1%">
				<?php echo JHTML::_( 'grid.sort', 'JGRID_HEADING_ID', 'a.id', $listDirn, $listOrder); ?>
			</th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<td colspan="10">
				<?php echo $this->pagination->getListFooter(); ?>
			</td>
		</tr>
	</tfoot>
	<tbody>
	<?php
	$lastbindid = -1;
	foreach($this->items as $i => $item) : ?>
	
		<?php if($lastbindid != $item->bind_id):?>
		
			<?php if($lastbindid > -1):?>
				</ul>
			</td>
			<td align="right">
				<?php echo $lastbindid ?>
			</td>
		</tr>
			<?php endif;?>
			
		<tr class="row<?php echo ($i%2) ?>">
			<td class="center">
				<?php echo JHtml::_('grid.id', $i, $item->bind_id); ?>
			</td>
			<td>
				<ul>
		<?php endif; ?>
		
					<li><?php echo $item->content_title ?>
						(id=<?php echo $item->content_id ?>)</li>
		
		<?php 
		$lastbindid = $item->bind_id;
	endforeach;
	?>
	
	<?php if($lastbindid > -1):?>
				</ul>
			</td>
			<td align="right">
				<?php echo $lastbindid ?>
			</td>
		</tr>
	<?php endif;?>
	</tbody>
	</table>

	<div>
		<input type="hidden" name="task" value="" />
		<input type="hidden" name="boxchecked" value="0" />
		<input type="hidden" name="filter_order" value="<?php echo $listOrder; ?>" />
		<input type="hidden" name="filter_order_Dir" value="<?php echo $listDirn; ?>" />
		<?php echo JHtml::_('form.token'); ?>
	</div>
</form>

		
 