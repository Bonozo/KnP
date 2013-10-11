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

// no direct access
defined('_JEXEC') or die('Restricted access');

jimport( 'joomla.application.component.controller' );

/**
 * MobiRate Controller
 *
 * @package Joomla
 * @subpackage MobiRate
 */
class MobirateController extends JController {
	
    /**
     * Constructor
     * @access private
     * @subpackage MobiRate
     */
    function __construct() 
    {		
        parent::__construct();
        
		$this->registerTask('publish', 'publishItems');
		$this->registerTask('unpublish', 'unpublishItems');
		$this->registerTask('trash', 'trashItems');
		$this->registerTask('remove', 'removeItems');
		$this->registerTask('enable', 'enableRating');
		$this->registerTask('disable', 'disableRating');
		$this->registerTask('inherit', 'inheritRating');
		$this->registerTask('bind', 'bindContent');
		$this->registerTask('unbind', 'unbindContent');
    }
	
	/**
	 * display task
	 *
	 * @return void
	 */
	function display($cachable = false) 
	{
		// set default view if not set
		JRequest::setVar('view', JRequest::getCmd('view', 'list'));
		
		JHTML::_('stylesheet','com_mobirate/mobirate_admin.css', array(), true);
		
		require_once JPATH_COMPONENT.'/helpers/mobirate.php';

		// Load the submenu.
		MobirateHelper::addSubmenu(JRequest::getWord('view', 'list'));
		
		// call parent behavior
		parent::display($cachable);
		
		return $this;
	}
    
    
    /**
     * Invoked on task "publish"
     * 
     */
    function publishItems()
    {
		JRequest::checkToken('request') or jexit(JText::_('JINVALID_TOKEN'));
		
	    // Access check.
		if (JFactory::getUser()->authorise('core.edit.state', 'com_mobirate')) {
	    	$msg = JText::_('COM_MOBIRATE_RATINGS_PUBLISH_SUCCESS');
	    	$msgType = 'message';
	    	
	    	$cids = JRequest::getVar('cid', array(), 'post', 'array');
	    	if(!empty($cids)) {
	    		$dbo = JFactory::getDBO();
	    		
	    		$query = "";
	    		foreach($cids as $cid) {
	    			$query.= "'$cid' ";
	    		}
	    		$query = str_replace(" ", ",", trim($query));    		
				$query = "UPDATE #__mobirate SET state='1' WHERE id IN ($query)";
				$dbo->setQuery($query);
				$dbo->query();
				if($dbo->getErrorNum()) {
					$msg = JText::_('COM_MOBIRATE_DATABASE_ERROR');
					$msg.= ": ".$dbo->getErrorMsg();
					$msgType = 'error';
				}
	    	} else {
	    		
	    	}
		} else {
			$msg = JText::_('JGLOBAL_AUTH_ACCESS_DENIED');
			$msgType = 'error';
		}
    	
    	$link = 'index.php?option=com_mobirate&view=list';
    	$this->setRedirect($link, $msg, $msgType);
    }
    
    /**
     * Invoked on task "unpublish"
     * 
     */
    function unpublishItems()
    {
		JRequest::checkToken('request') or jexit(JText::_('JINVALID_TOKEN'));
		
	    // Access check.
		if (JFactory::getUser()->authorise('core.edit.state', 'com_mobirate')) {
	    	$msg = JText::_('COM_MOBIRATE_RATINGS_UNPUBLISH_SUCCESS');
	    	$msgType = 'message';
	    	
	    	$cids = JRequest::getVar('cid', array(), 'post', 'array');
	    	if(!empty($cids)) {
	    		$dbo = JFactory::getDBO();
	    		
	    		$query = "";
	    		foreach($cids as $cid) {
	    			$query.= "'$cid' ";
	    		}
	    		$query = str_replace(" ", ",", trim($query));    		
				$query = "UPDATE #__mobirate SET state='0' WHERE id IN ($query)";
				$dbo->setQuery($query);
				$dbo->query();
				if($dbo->getErrorNum()) {
					$msg = JText::_('COM_MOBIRATE_DATABASE_ERROR');
					$msg.= ": ".$dbo->getErrorMsg();
					$msgType = 'error';
				}
	    	} else {
	    		
	    	}
		} else {
			$msg = JText::_('JGLOBAL_AUTH_ACCESS_DENIED');
			$msgType = 'error';
		}
    	
    	$link = 'index.php?option=com_mobirate&view=list';
    	$this->setRedirect($link, $msg, $msgType);
    }
    
    /**
     * Invoked on task "trash"
     * 
     */
    function trashItems()
    {
		JRequest::checkToken('request') or jexit(JText::_('JINVALID_TOKEN'));
		
	    // Access check.
		if (JFactory::getUser()->authorise('core.edit.state', 'com_mobirate')) {
	    	$msg = JText::_('COM_MOBIRATE_RATINGS_TRASH_SUCCESS');
	    	$msgType = 'message';
	    	
	    	$cids = JRequest::getVar('cid', array(), 'post', 'array');
	    	if(!empty($cids)) {
	    		$dbo = JFactory::getDBO();
	    		
	    		$query = "";
	    		foreach($cids as $cid) {
	    			$query.= "'$cid' ";
	    		}
	    		$query = str_replace(" ", ",", trim($query));    		
				$query = "UPDATE #__mobirate SET state='-2' WHERE id IN ($query)";
				$dbo->setQuery($query);
				$dbo->query();
				if($dbo->getErrorNum()) {
					$msg = JText::_('COM_MOBIRATE_DATABASE_ERROR');
					$msg.= ": ".$dbo->getErrorMsg();
					$msgType = 'error';
				}
	    	} else {
	    		
	    	}
		} else {
			$msg = JText::_('JGLOBAL_AUTH_ACCESS_DENIED');
			$msgType = 'error';
		}
    	
    	$link = 'index.php?option=com_mobirate&view=list';
    	$this->setRedirect($link, $msg, $msgType);
    }
    
    /**
     * Invoked on task "remove"
     * 
     */
    function removeItems() 
    {
		JRequest::checkToken('request') or jexit(JText::_('JINVALID_TOKEN'));
		
	    // Access check.
		if (JFactory::getUser()->authorise('core.delete', 'com_mobirate')) {
	    	$msg = JText::_('COM_MOBIRATE_RATINGS_DELETE_SUCCESS');
	    	$msgType = 'message';
	    	
	    	$cids = JRequest::getVar('cid', array(), 'post', 'array');
	    	if(!empty($cids)) {
	    		$dbo = JFactory::getDBO();
	    		
	    		$query = "";
	    		foreach($cids as $cid) {
	    			$query.= "'$cid' ";
	    		}
	    		$query = str_replace(" ", ",", trim($query));    		
				$query = "DELETE FROM #__mobirate
						WHERE id IN ($query) AND state = '-2'";
				$dbo->setQuery($query);
				$dbo->query();
				if($dbo->getErrorNum()) {
					$msg = JText::_('COM_MOBIRATE_DATABASE_ERROR');
					$msg.= ": ".$dbo->getErrorMsg();
					$msgType = 'error';
				}
	    	} else {
	    		
	    	}
		} else {
			$msg = JText::_('JGLOBAL_AUTH_ACCESS_DENIED');
			$msgType = 'error';
		}
    	
    	$link = 'index.php?option=com_mobirate&view=list';
    	$this->setRedirect($link, $msg, $msgType);
    }
    
    /**
     * Invoked on task "enable"
     * 
     */
    function enableRating()
    {
		JRequest::checkToken('request') or jexit(JText::_('JINVALID_TOKEN'));
		
		// Get some data from the request
		$tmpl = JRequest::getCmd('tmpl');
		$cids = JRequest::getVar('cid', array(), 'post', 'array');
    	$fltr_catid = JRequest::getInt('filter_category_id', -1);
		
		// Access check.
		if (JFactory::getUser()->authorise('mobirate.admin.onoff', 'com_mobirate')) {
			if(!empty($cids)) {
	    		$dbo = JFactory::getDBO();
	    		
	    		foreach($cids as $cid) {
	    		/*	if($listtype == 'content') {
						$query = "REPLACE INTO #__mobirate_onoffcontent " .
								"SET content_id='$cid', onoff=TRUE";
	    			} else if($listtype == 'category') {*/
						$query = "REPLACE INTO #__mobirate_onoffcategory " .
								"SET cat_id='$cid', onoff=TRUE";
	    		/*	} else {
						$query = "REPLACE INTO #__mobirate_onoffsection " .
								"SET section_id='$cid', onoff=TRUE";
	    			}*/
					$dbo->setQuery($query);
					$dbo->query();
					if($dbo->getErrorNum()) {
					}
	    		}
	    	} else {
	    		
	    	}
		}
    	
    	$link = "index.php?option=com_mobirate&view=onoff";
    	if($fltr_catid > -1) {
    		$link.= "&filter_category_id=$fltr_catid";
    	}
    	if($tmpl == 'component') {
    		$link.= "&layout=table&tmpl=component";
    	}
    	$this->setRedirect($link);
    }
    
    /**
     * Invoked on task "disable"
     * 
     */
    function disableRating()
    {
		JRequest::checkToken('request') or jexit(JText::_('JINVALID_TOKEN'));
		
		// Get some data from the request
		$tmpl = JRequest::getCmd('tmpl');
    	$cids = JRequest::getVar('cid', array(), 'post', 'array');
    	$fltr_catid = JRequest::getInt('filter_category_id', -1);
		
		// Access check.
		if (JFactory::getUser()->authorise('mobirate.admin.onoff', 'com_mobirate')) {
	    	if(!empty($cids)) {
	    		$dbo = JFactory::getDBO();
	    		
	    		foreach($cids as $cid) {
	    		/*	if($listtype == 'content') {
						$query = "REPLACE INTO #__mobirate_onoffcontent " .
								"SET content_id='$cid', onoff=FALSE";
	    			} else if($listtype == 'category') {*/
						$query = "REPLACE INTO #__mobirate_onoffcategory " .
								"SET cat_id='$cid', onoff=FALSE";
	    		/*	} else {
						$query = "REPLACE INTO #__mobirate_onoffsection " .
								"SET section_id='$cid', onoff=FALSE";
	    			}*/
					$dbo->setQuery($query);
					$dbo->query();
					if($dbo->getErrorNum()) {
					}
	    		}
	    	} else {
	    		
	    	}
		}
    	
    	$link = "index.php?option=com_mobirate&view=onoff";
    	if($fltr_catid > -1) {
    		$link.= "&filter_category_id=$fltr_catid";
    	}
    	if($tmpl == 'component') {
    		$link.= "&layout=table&tmpl=component";
    	}
    	$this->setRedirect($link);
    }
    
    /**
     * Invoked on task "inherit"
     * 
     */
    function inheritRating()
    {
		JRequest::checkToken('request') or jexit(JText::_('JINVALID_TOKEN'));
		
		// Get some data from the request
		$tmpl = JRequest::getCmd('tmpl');
    	$cids = JRequest::getVar('cid', array(), 'post', 'array');
    	$fltr_catid = JRequest::getInt('filter_category_id', -1);
		
		// Access check.
		if (JFactory::getUser()->authorise('mobirate.admin.onoff', 'com_mobirate')) {
	    	if(!empty($cids)) {
	    		$dbo = JFactory::getDBO();
	    		
	    		$query = "";
	    		foreach($cids as $cid) {
	    			$query.= "'$cid' ";
	    		}
	    		$query = str_replace(" ", ",", trim($query));
			/*	if($listtype == 'content') {
					$query = "DELETE FROM #__mobirate_onoffcontent " .
							"WHERE content_id IN ($query)";
				} else if($listtype == 'category') {*/
					$query = "DELETE FROM #__mobirate_onoffcategory " .
							"WHERE cat_id IN ($query)";
			/*	} else {
					$query = "DELETE FROM #__mobirate_onoffsection " .
							"WHERE section_id IN ($query)";
	    		}*/
				$dbo->setQuery($query);
				$dbo->query();
				if($dbo->getErrorNum()) {
				}
	    	} else {
	    		
	    	}
		}
		
    	$link = "index.php?option=com_mobirate&view=onoff";
    	if($fltr_catid > -1) {
    		$link.= "&filter_category_id=$fltr_catid";
    	}
    	if($tmpl == 'component') {
    		$link.= "&layout=table&tmpl=component";
    	}
    	$this->setRedirect($link);
    }
    
    /**
     * Invoked on task "bind"
     * 
     */
    function bindContent()
    {
		JRequest::checkToken('request') or jexit(JText::_('JINVALID_TOKEN'));
		
		//$bind_id = JRequest::getInt('id');
    	$bind_id = JRequest::getVar('cid');
		$content_id = JRequest::getInt('content');
		
		if(is_array($bind_id)) {
			$bind_id = $bind_id[0];
		}
		
		if(!empty($content_id)) {
			$dbo = JFactory::getDBO();
			if(!is_null($bind_id)) {
				$query = "REPLACE INTO #__mobirate_binding " .
				         "SET bind_id=".$dbo->quote($bind_id).", content_id=".$dbo->quote($content_id);
			} else {
				$query = "INSERT INTO #__mobirate_binding " .
				         "SET content_id=".$dbo->quote($content_id);
			}
			$dbo->setQuery($query);
			$dbo->query();
			if($dbo->getErrorNum()) {
				$this->setError($dbo->getErrorMsg());
				$this->setMessage(JText::_('COM_MOBIRATE_ERROR_CONTENT_BIND').': '.$dbo->getErrorMsg(), 'error');
				$this->setRedirect(JRoute::_('index.php?option=com_mobirate&view=binding', false));
				return false;
			}
		} else {
			$this->setMessage(JText::_('COM_MOBIRATE_ERROR_CONTENT_BIND_NO_CID'), 'error');
			$this->setRedirect(JRoute::_('index.php?option=com_mobirate&view=binding', false));
			return false;
		}
		
		$this->setMessage(JText::_('COM_MOBIRATE_CONTENT_BIND_SUCCESSFULLY'));
		$this->setRedirect(JRoute::_('index.php?option=com_mobirate&view=binding', false));
		
		return true;
    }
    
    /**
     * Invoked on task "unbind"
     * 
     */
    function unbindContent()
    {
		JRequest::checkToken('request') or jexit(JText::_('JINVALID_TOKEN'));
		
		//$bind_id = JRequest::getInt('id');
    	$bind_id = JRequest::getVar('cid',array(),'post','array');
		
		if(!empty($bind_id)) {
			$dbo = JFactory::getDBO();
	    		
			$query = "";
    		foreach($bind_id as $id) {
    			$query.= "'$id' ";
    		}
    		$query = str_replace(" ", ",", trim($query));
			$query = "DELETE FROM #__mobirate_binding " .
					"WHERE bind_id IN ($query)";
			
			
			$dbo->setQuery($query);
			$dbo->query();
			if($dbo->getErrorNum()) {
				$this->setError($dbo->getErrorMsg());
				$this->setMessage(JText::_('COM_MOBIRATE_ERROR_CONTENT_UNBIND').': '.$dbo->getErrorMsg(), 'error');
				$this->setRedirect(JRoute::_('index.php?option=com_mobirate&view=binding', false));
				return false;
			}
		} else {
			$this->setMessage(JText::_('COM_MOBIRATE_ERROR_CONTENT_UNBIND'), 'error');
			$this->setRedirect(JRoute::_('index.php?option=com_mobirate&view=binding', false));
			return false;
		}
		
		$this->setMessage(JText::_('COM_MOBIRATE_CONTENT_UNBIND_SUCCESSFULLY'));
		$this->setRedirect(JRoute::_('index.php?option=com_mobirate&view=binding', false));
		
		return true;
    }
}
