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

?> 

<link rel="stylesheet" href="../media/com_mobirate/css/mobirate_iframe_admin.css" type="text/css" />

<script type="text/javascript">
window.addEvent('load', function() {
	var iframeElement = parent.window.document.getElementById('tableframe'); 
	iframeElement.height = document.body.offsetHeight + 20;
	}) 
</script>

<form action="<?php echo JRoute::_('index.php?option=com_mobirate&amp;view=onoff&amp;layout=table&amp;tmpl=component'); ?>" method="post" name="adminForm" id="adminForm">
	<fieldset id="filter-bar">
		<div class="filter-search fltlft">
			<label class="filter-search-lbl" for="filter_search"><?php echo JText::_('JSEARCH_FILTER_LABEL'); ?></label>
		</div>
		<div class="filter-select fltrt">
			<?php
			$values = array();
			$values['0'] = JText::_('COM_MOBIRATE_DISABLED');
			$values['1'] = JText::_('COM_MOBIRATE_ENABLED');
			$values['-1'] = JText::_('COM_MOBIRATE_INHERITED');
			?>
			<select name="filter_config" class="inputbox" onchange="this.form.submit()">
				<option value=""><?php echo '- '.JText::_('COM_MOBIRATE_SELECT_CONFIGURATION').' -';?></option>
				<?php echo JHtml::_('select.options', $values, 'value', 'text', $this->state->get('filter.config'), true);?>
			</select>
			<select name="filter_published" class="inputbox" onchange="this.form.submit()">
				<option value=""><?php echo JText::_('JOPTION_SELECT_PUBLISHED');?></option>
				<?php echo JHtml::_('select.options', JHtml::_('jgrid.publishedOptions'), 'value', 'text', $this->state->get('filter.published'), true);?>
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
				<?php echo JHTML::_( 'grid.sort', 'JCATEGORY', 'a.title', $listDirn, $listOrder); ?>
			</th>
			<th>
				<?php echo JHTML::_( 'grid.sort', 'JENABLED', 'mobirate_onoff', $listDirn, $listOrder); ?>
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
	<?php foreach($this->items as $i => $item) :?>
		<tr class="row<?php echo ($i%2) ?>">
			<td class="center">
				<?php echo JHtml::_('grid.id', $i, $item->id); ?>
			</td>
			<td>
				<?php echo $item->title ?>
			</td>
			<td>
				<?php if($item->mobirate_onoff == '0'): ?>
					<span class="mobirating-off">
						<?php echo JText::_('COM_MOBIRATE_DISABLED')?>
					</span>
				<?php elseif($item->mobirate_onoff == '1'): ?>
					<span class="mobirating-on">
						<?php echo JText::_('COM_MOBIRATE_ENABLED')?>
					</span>
				<?php else: ?>
					<span class="mobirating-inherited">
						<?php echo JText::_('COM_MOBIRATE_INHERITED')?>
					</span>
				<?php endif; ?>
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
		<input type="hidden" name="filter_category_id" value="<?php echo $this->state->get('filter.category_id');?>" />
		<?php echo JHtml::_('form.token'); ?>
	</div>    
</form>
		