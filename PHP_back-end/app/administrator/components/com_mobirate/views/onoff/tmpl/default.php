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

<script type="text/javascript">
	function submitForm(task)
	{
		form = window.frames['tableframe'].document.getElementById('adminForm');
		form.task.value = task;
		form.submit();
	}
</script>
	
<table width="100%">
	<tr valign="top">
		<td width="30%">
			<fieldset id="treeview">
				<legend><?php echo JText::_('COM_MOBIRATE_SELECT_CATEGORY'); ?></legend>
				<div id="mobirate-cats_tree"></div>
				<?php echo $this->loadTemplate('categories'); ?>
			</fieldset>
		</td>
		<td>
			<fieldset>
				<legend><?php echo JText::_('JCATEGORIES'); ?></legend>
				
				<div class="mobirate-tableview">
					<iframe src="<?php echo JRoute::_('index.php?option=com_mobirate&amp;view=onoff&amp;filter_category_id&amp;layout=table&amp;tmpl=component'); ?>" id="tableframe" name="tableframe" width="100%" marginwidth="0" marginheight="0" scrolling="auto" frameborder="0"></iframe>
				</div>
			</fieldset>
		</td>
	</tr>
</table>
		