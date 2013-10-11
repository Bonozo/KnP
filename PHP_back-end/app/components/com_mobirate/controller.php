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

require_once JPATH_COMPONENT.DS.'helpers'.DS.'helper.php';
require_once JPATH_COMPONENT.DS.'helpers'.DS.'html'.DS.'mobirate.php';

jimport('joomla.application.component.controller');
require_once(JPATH_SITE.DS.'components'.DS.'com_content'.DS.'helpers'.DS.'route.php');

/**
 * MobiRate Component Controller
 */
class MobirateController extends JController {
	
	/**
	 * Constructor
	 */
	function __construct() 
	{
		parent::__construct();
		$this->registerTask('addrate', 'addRating');
		$this->registerTask('addconfirmed', 'addRatingConfirmed');
		$this->registerTask('reportconfirmed', 'reportRatingConfirmed');
	}
  
	function display() 
	{
        // Make sure we have a default view
        // Set the default view name and format from the Request.
		$vName		= JRequest::getWord('view', 'mobirate');
		JRequest::setVar('view', $vName);
		
		return parent::display();
	}
	
	/**
	 * Invoked on a add rating request
	 */
	function addRating()
	{		
		$app =& JFactory::getApplication();
   		$model =& $this->getModel('Mobirate');
   		$state = $model->getState();
   		$params = $state->params;
   		
		$confirm = (bool)$params->get('alwaysconfirm');
		if($confirm) {
			// Check for request forgeries.
	//		JRequest::checkToken() or jexit(JText::_('JINVALID_TOKEN'));
			
			$view = $this->getView('addconfirm', 'html');
				
	   		$view->setModel($model, true);
	   		$view->display();
		} else {
			$this->addRatingConfirmed($model);
		}
	}
	
	/**
	 * Inoked on a add rating confirmed request
	 */
	function addRatingConfirmed($model=null)
	{
		// Check for request forgeries.
		JRequest::checkToken() or jexit(JText::_('JINVALID_TOKEN'));
		
		$app =& JFactory::getApplication();
		if(empty($model)) {
   			$model =& $this->getModel('Mobirate');
		}
   		$state = $model->getState();
   		$params = $state->params;
		$user = JFactory::getUser();
		
		$return = $app->getUserStateFromRequest('com_mobirate.add.return', 'return', '', 'base64');
		$data = array();
		$data['content_id'] = JRequest::getInt('id', -1);
		$data['user'] = $app->getUserStateFromRequest('com_mobirate.add.user', 'user', '', 'string');
		$data['rating'] = $app->getUserStateFromRequest('com_mobirate.add.rating', 'rating', 0, 'int');
		$data['comment'] = $app->getUserStateFromRequest('com_mobirate.add.comment', 'comment', '', 'string');
		$data['state'] = $params->get('addstatus');
		
   		$msg = "";
   		$msgType = 'message';
		if(!empty($return)) {
			$uri = JRoute::_(base64_decode($return));
		} else {
			$uri = JRoute::_(ContentHelperRoute::getArticleRoute($data['content_id']));
		}
		
		$num1 = (int) $app->getUserState('com_mobirate.captcha.num1');
		$num2 = (int) $app->getUserState('com_mobirate.captcha.num2');
		$captchasum = $num1 + $num2;
		
		if($user->authorise('core.create', 'com_mobirate')) {
			if($captchasum != 0 || !((bool)$params->get('alwaysconfirm'))) {
				$captchatry = (int) JRequest::getInt('code', 0);
				
				$article = $model->getContentItem(null, $data['content_id']);
				if (count($errors = $model->getErrors())) {
					JError::raiseWarning(500, implode("\n", $errors));
					return;
				}
				
				$access_view = $article->params->get('access-view');
				if(!$access_view) {
					JError::raiseWarning( 403, JText::_('JERROR_ALERTNOAUTHOR') );
					return;
				}
				
				if($captchasum === $captchatry) {
		   			if($item=$model->store($data)) {
						$app->getUserStateFromRequest('com_mobirate.add.user', null);
						$app->getUserStateFromRequest('com_mobirate.add.rating', null);
						$app->getUserStateFromRequest('com_mobirate.add.comment', null);
						$app->getUserStateFromRequest('com_mobirate.add.return', null);
						$this->sendRateNotificationMail($item);
		   				$msg = JText::_('COM_MOBIRATE_RATE_ADDED_SUCCESS');
		   			} else {
		   				$errors = $model->getErrors();
		   				$msg = implode("\n", $errors);
						$msgType = 'error';
		   			}
				} else {
					$msg = JText::_('COM_MOBIRATE_ERROR_CAPTCHA_ANSWER'). ": $num1 + $num2 = $captchasum";
					$uri = JRoute::_("index.php?option=com_mobirate&task=addrate&id=".$data['content_id'], true);
					$msgType = 'error';
				}
			} else {
				JError::raiseError( 500, JText::_('COM_MOBIRATE_ERROR_CAPTCHA_NOT_GENERATED') );
			}
		} else {
			$msg = JText::_('JGLOBAL_AUTH_ACCESS_DENIED');
			$msgType = 'error';
		}
   		
		$this->setRedirect($uri, $msg, $msgType);
	}
	
	/**
	 * Sends a mail to administrator and notify 
	 * about new rating added
	 * 
	 * @param Object rating Rating object
	 */
	function sendRateNotificationMail($rating)
	{		
    	// Add body and subject
    	$siteuri = JURI::base();
    	
    	$uri =& JFactory::getURI();
    	$contentlink = $uri->toString(array('scheme', 'user', 'pass', 'host', 'port'));
    	$contentlink.= JRoute::_(ContentHelperRoute::getArticleRoute($rating->content_id));
    	
    	$config =& JFactory::getConfig();
    	$sitename = $config->getValue( 'config.sitename' );
    	
    	$rate = empty($rating->rating) ? '' : $rating->rating; // Removes rating value 0
    	    		
    	$body = "
    		<p>New rating added on $sitename</p>
    		<ul>
    		<li>Author: $rating->user </li>
    		<li>Date: ".$rating->add_date." </li>
    		<li>Rate: $rate </li>
    	    <li>Comment: <br /> $rating->comment </li>
    	    <li>Article: $contentlink </li>
    		</ul>
    		<p>$sitename - $siteuri</p>
    	      ";
    	
    	$this->sendNotificationMail($body, 'New rating');
	}
	
	/**
	 * Inoked on a report of a rating
	 */
	function reportRatingConfirmed() 
	{
		// Check for request forgeries.
		JRequest::checkToken() or jexit(JText::_('JINVALID_TOKEN'));
		
		$model =& $this->getModel('Mobirate', 'MobirateModel');
		
		$state = $model->getState();
		$params = $state->params;
		$item =& $model->getItem();
		$article = $model->getContentItem();
		
		if (count($errors = $model->getErrors())) {
			JError::raiseWarning(500, implode("\n", $errors));
			return false;
		}
		
		$return = JRequest::getVar('return', '', 'method', 'base64');
		if(!empty($return)) {
			$uri = JRoute::_(base64_decode($return));
		} else {
			$uri = JRoute::_(ContentHelperRoute::getArticleRoute($article->id, $article->catid));
		}
		$msg = "";
					
		$model->reportItem();
		if (count($errors = $model->getErrors())) {
			JError::raiseWarning(500, implode("\n", $errors));
			return false;
		}
		
		$msg = JText::_('COM_MOBIRATE_REPORT_POSTED_SUCCESS') ;
		$this->sendRateReportNotificationMail($item);
		
		$this->setRedirect($uri, $msg, 'message');
	}
	
	
	/**
	 * Sends a mail to administrator and notify 
	 * about report on comment
	 * 
	 * @param Object rating Rating object
	 */
	function sendRateReportNotificationMail($rating)
	{
    	// Add body and subject
    	$siteuri = JURI::base();
    	
    	$uri =& JFactory::getURI();
    	$contentlink = $uri->toString(array('scheme', 'user', 'pass', 'host', 'port'));
    	$contentlink.= JRoute::_(ContentHelperRoute::getArticleRoute($rating->content_id));
    	
    	$config =& JFactory::getConfig();
    	$sitename = $config->getValue( 'config.sitename' );
    	
    	$rate = empty($rating->rating) ? '' : $rating->rating; // Removes rating value 0
    	
    	$body = "
    		<p>Someone has reported a comment on $sitename</p>
    		<ul>
    		<li>Author: $rating->user </li>
    		<li>Date: ".$rating->add_date." </li>
    		<li>Rate: $rate </li>
    	    <li>Comment: <br /> $rating->comment </li>
    	    <li>Article: $contentlink </li>
    		</ul>
    		<p>Review the comment and remove it if necessary</p>
    		<p>$sitename - $siteuri</p>
    	      ";
    		
    	$this->sendNotificationMail($body, 'Report on rating');
	}
    	
    /**
     * 
     */
    function sendNotificationMail($body, $subject) 
    {
		$app =& JFactory::getApplication();
   		$model =& $this->getModel('Mobirate');
   		$state = $model->getState();
   		$params = $state->params;
    	$sendmail = (bool)$params->get('sendnotifymail');
    	$mailaddr = $params->get('notifymailaddr');
    	
    	if($sendmail) {
    		$mailer =& JFactory::getMailer();
    		
    		// Add from info
    		$config =& JFactory::getConfig();
			$sender = array( 
			    $config->getValue( 'config.mailfrom' ),
			    $config->getValue( 'config.fromname' ) );
			 
			$mailer->setSender($sender);
    		
    		// Add recipients
    		$recipient = array( $mailaddr );
 			$mailer->addRecipient($recipient);
    		    		
			$mailer->setSubject($subject);
			$mailer->isHTML(true);
			$mailer->setBody($body);
			
			// Send mail
			$send =& $mailer->Send();
			if ( $send !== true ) {
				
			}
    	}
    }
}
