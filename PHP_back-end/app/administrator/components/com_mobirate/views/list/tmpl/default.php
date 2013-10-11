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

<form action="<?php echo JRoute::_('index.php?option=com_mobirate&view=list'); ?>" method="post" name="adminForm" id="adminForm">

	<fieldset id="filter-bar">
		<div class="filter-search fltlft">
			<label class="filter-search-lbl" for="filter_search"><?php echo JText::_('JSEARCH_FILTER_LABEL'); ?></label>
		</div>
		<div class="filter-select fltrt">
			<select name="filter_published" class="inputbox" onchange="this.form.submit()">
				<option value=""><?php echo JText::_('JOPTION_SELECT_PUBLISHED');?></option>
				<?php echo JHtml::_('select.options', JHtml::_('jgrid.publishedOptions'), 'value', 'text', $this->state->get('filter.state'), true);?>
			</select>

			<select name="filter_category_id" class="inputbox" onchange="this.form.submit()">
				<option value=""><?php echo JText::_('JOPTION_SELECT_CATEGORY');?></option>
				<?php echo JHtml::_('select.options', JHtml::_('category.options', 'com_content'), 'value', 'text', $this->state->get('filter.category_id'));?>
			</select>
		</div>
	</fieldset>
	<div class="clr"> </div>

	<table class="adminlist">
	<thead>
		<tr>
			<th width="1%">
				<input type="checkbox" name="checkall-toggle" value="" onclick="checkAll(this)" />
			</th>
			<th>
				<?php echo JHTML::_( 'grid.sort', 'JGRID_HEADING_CREATED_BY', 'a.user', $listDirn, $listOrder); ?>
			</th>
			<th>
				<?php echo JHTML::_( 'grid.sort', 'COM_MOBIRATE_COMMENT', 'a.comment', $listDirn, $listOrder); ?>
			</th>
			<th width="5%">
				<?php echo JHTML::_( 'grid.sort', 'COM_MOBIRATE_REPORT_COUNT', 'reports', $listDirn, $listOrder); ?>
			</th>
			<th>
				<?php echo JHTML::_( 'grid.sort', 'COM_MOBIRATE_DATE_ADDED', 'a.add_date', $listDirn, $listOrder); ?>
			</th>
			<th width="5%">
				<?php echo JHtml::_('grid.sort',  'JPUBLISHED', 'a.state', $listDirn, $listOrder); ?>
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
	<?php foreach($this->items as $i => $item) : ?>
	
		<tr class="row<?php echo ($i%2) ?>">
			<td class="center">
				<?php echo JHtml::_('grid.id', $i, $item->id); ?>
			</td>
			<td>
				<?php echo $item->user ?>
			</td>
			<td>
				<?php echo $item->comment ?>
			</td>
			<td class="right">
				<?php echo $item->reports ?>
			</td>
			<td>
				<?php echo JHTML::Date($item->add_date) ?>
			</td>
			<td align="center">
				<?php echo JHtml::_('jgrid.published', $item->state, $i, '', $canChange);?>
			</td>
			<td>
				<?php echo $item->content_title ?>
			</td>
			<td align="right">
				<?php echo $item->id ?>
			</td>
		</tr>
	<?php endforeach; ?>
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

		
 