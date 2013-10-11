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

<table class="adminlist" align="center" style="width: 50%">
  <tr>
    <td>
      <?php echo JHTML::_('image','com_mobirate/mobirate_logo_big.png','Logo MobiRate', null, true)?>
    </td>
    <td width="100%">
      <h2>MobiRate for Joomla! 1.6</h2>
      <p>Version <?php echo $this->data->version;?> (<?php echo $this->data->creationDate;?>)</p>
      <p>Copyright &copy; <?php echo $this->data->copyright;?><br />
      This component is released under the <?php echo JHTML::_('link','http://www.gnu.org/licenses/gpl-2.0.html','GNU/GPL version 2')?> License.<br />
      All copyright statements must be kept.</p>
      <p>visit us: <?php echo JHTML::_('link','http://www.omicron.se','www.omicron.se')?></p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 1em">
      <p>This component has been created
      by Omicron AB on behalf of Norrbottens county council, Piteå
      municipality, Region of Västerbotten, Robertsfors municipality,
      Skellefteå municipality, Umeå municipality, Västerbottens county
      council and European Regional Development Found as a part in the
      project "200 years of peace".</p>
      <p>Visit this part of the project at <?php echo JHTML::_('link','http://sourceforge.net/projects/visitas/','sourceforge.net')?></p>
      <p align="center">
      <?php echo JHTML::_('image','com_mobirate/EUlogo_Inv_eng_c_RGB.jpg','EU-logo', null, true)?>
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 1em">
      This program is free software; you can redistribute it and/or
      modify it under the terms of the GNU General Public License
      as published by the Free Software Foundation; either version 2
      of the License, or (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program; if not, write to the Free Software
      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
    </td>
  </tr>
</table>


		
