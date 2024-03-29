<?php
/**
 * Joomla! 1.6 component MobiRate
 * 
 * This component is designed for mobile websites and enables user rating and comments.
 * 
 * @version $Id: $
 * @package Joomla.Administrator
 * @subpackage com_mobirate
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

// No direct access.
defined('_JEXEC') or die;

$ulid = '';
if($this->category->id == 0) {
	$ulid = 'id="mobirate-cats"';
}
?>

<?php if (count($this->cat_childs[$this->category->id]) > 0) : ?>
	<ul <?php echo $ulid?>>
	<?php foreach($this->cat_childs[$this->category->id] as $id => $child) : ?>
		<li id="<?php echo 'id'.$child->id;?>">
			<a href="index.php?option=com_mobirate&amp;view=onoff&amp;filter_category_id=<?php echo $child->id?>&amp;layout=table&amp;tmpl=component" target="tableframe">
				<?php echo $child->title; ?>
			</a>
			<?php 
			if (count($child->getChildren()) > 0 ) :
				$this->cat_childs[$child->id] = $child->getChildren();
				$this->category = $child;
				echo $this->loadTemplate('categories');
				$this->category = $child->getParent();
			endif;?> 
		</li>
	<?php endforeach; ?>
	</ul>
<?php endif; ?>
