<?php
/**
 * Joomla! 1.6 component MobiRate
 * 
 * This component is designed for mobile websites and enables user rating and comments.
 * 
 * @version     $Id: $
 * @package		Joomla.Administrator
 * @subpackage  com_mobirate
 * @since		2.0
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

// No direct access
defined('_JEXEC') or die;

class MobirateHelper
{
	
	/**
	 * Check if rating is enabled for a content
	 * 
	 * @param integer cid Content element id
	 * @param integer cat_id Category id
	 * @return bool True if enabled, else false 
	 */
	public static function isRatingEnabled($cid, $cat_id)
	{
			
		$db = JFactory::getDBO();
		$query	= $db->getQuery(true);
		$query->select('a.*');
		$query->from('`#__mobirate_onoffcontent` AS a');
		$query->where('a.content_id = '.$db->getEscaped($cid));
		$db->setQuery($query);
		$dbRes = $db->loadObject();
		if($dbRes) {
			$result = (bool)$dbRes->onoff;
		}
		
		$dbRes = true;
		while($dbRes) {
			$query	= $db->getQuery(true);
			$query->select('a.id, a.parent_id');
			$query->from('`#__categories` AS a');
			$query->where('a.id = '.$db->getEscaped($cat_id));
			$query->select('m.onoff AS mobirate_onoff');
			$query->join('LEFT', '#__mobirate_onoffcategory AS m ON a.id = m.cat_id');
			$db->setQuery($query);
			$dbRes = $db->loadObject();
			
			if($dbRes && isset($dbRes->mobirate_onoff)) {
				return (bool)$dbRes->mobirate_onoff;
			}
			if($dbRes) {
				$cat_id = $dbRes->parent_id;
			}
		}
		
		$params =& JComponentHelper::getParams( 'com_mobirate' );
    	return (bool)$params->get('globalenable', 1);
	}
	
	/**
	 * 
	 *
	 */
	public static function addMobirateToContentQuery(&$query)
	{
		$subquery = "SELECT content_id FROM #__mobirate_binding ".
				"WHERE bind_id IN (".
        			"SELECT bind_id FROM #__mobirate_binding ".
        			"WHERE content_id = a.id)";
		
		$subquery = "SELECT avg(rating) FROM #__mobirate ".
				"WHERE (content_id IN ($subquery) OR content_id = a.id) AND rating > 0 AND state = 1";
		
		$query->select("($subquery) as mobirate");
	}
	
	/**
	 * Get all published rating by content id. Returned with
	 * newest rating first.
	 * 
	 * @param integer cid Content element id
	 * @param integer count Number of elements to get (0 for all)
	 * @param integer start Index where to start get (0 for latest)
	 * @return array Array of object of class Ratings 
	 */
	public static function getPubRatingsByArticle($cid, $count=0, $start=0)
	{
		$db = JFactory::getDBO();
		$query	= $db->getQuery(true);
		
		$query->select('a.*');
		$query->from('#__mobirate AS a');
		
		$query->where("(a.content_id IN (".
				"SELECT content_id FROM #__mobirate_binding ".
				"WHERE bind_id IN (".
        			"SELECT bind_id FROM #__mobirate_binding ".
        			"WHERE content_id = ".$db->quote($cid)."))".
        		" OR content_id = ".$db->quote($cid).")");
		$query->where("a.state = '1'");
		
		$query->order('a.add_date DESC');
		
		$db->setQuery($query, $start, $count);
		$ratings = $db->loadObjectList();
		
		return $ratings;
	}
	
	/**
	 * Get average rating for a content element.
	 * 
	 * @param integer cid Content id
	 * @return array 'average' => Average rating, 'count' => Rating count
	 */
	public static function getPubRatingAverage($cid)
	{	
		$db = JFactory::getDBO();
		$query	= $db->getQuery(true);
		
		$query->select('AVG(a.rating) AS average, COUNT(a.rating) AS count');
		$query->from('#__mobirate AS a');
		
		$query->where("(a.content_id IN (".
				"SELECT content_id FROM #__mobirate_binding ".
				"WHERE bind_id IN (".
        			"SELECT bind_id FROM #__mobirate_binding ".
        			"WHERE content_id = ".$db->quote($cid)."))".
        		" OR content_id = ".$db->quote($cid).")");
		$query->where("a.state = '1'");
		$query->where("a.rating > '0'");
		
		$db->setQuery($query);
		$dbRes = $db->loadObject();
		
		$result = NULL;
		if($dbRes) {
			if($dbRes->average) {
				$result = array();
				$result['average'] = round($dbRes->average, 1);
				$result['count'] = $dbRes->count;
			}
		}
		
		return $result;
	}
}
