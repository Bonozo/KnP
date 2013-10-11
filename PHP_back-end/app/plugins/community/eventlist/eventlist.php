<?php
/**
 * @category	Plugins
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
// no direct access
defined('_JEXEC') or die('Restricted access');

require_once( JPATH_ROOT . DS . 'components' . DS . 'com_community' . DS . 'libraries' . DS . 'core.php');

if(!class_exists('plgCommunityEventlist'))
{
	class plgCommunityEventlist extends CApplications
	{	
		var $name 		= "Eventlist Application";
		var $_name		= 'eventlist';
		var $_path		= '';
		var $_my		= '';
	
	    function plgCommunityEventlist(& $subject, $config)
	    {
	    	$this->_path	= JPATH_ROOT . DS . 'administrator' . DS . 'components' . DS . 'com_eventlist';

			$this->_my		= CFactory::getUser();
				
			parent::__construct($subject, $config);
	    }
	
		/**
		 * Return itemid for Eventlist
		 */	 	
		function getItemid()
		{
			$db =& JFactory::getDBO();
			$Itemid = 0;
	
	    	if ($Itemid < 1)
			{
	        	$db->setQuery('SELECT ' . $db->nameQuote('id')
	        					.' FROM ' . $db->nameQuote('#__menu')
	        					.' WHERE ' . $db->nameQuote('link').' LIKE ' . $db->Quote('%index.php?option=com_eventlist%')
	        					.' AND ' . $db->nameQuote('published').' = ' . $db->Quote('1'));
	        	$Itemid = $db->loadResult();
	
	        	if ($Itemid < 1)
				{
	         	   $Itemid = 0;
	        	}
	    	}
		    
		    return $Itemid;
		}
		
		function onProfileDisplay()
		{
			// Load language
			JPlugin::loadLanguage( 'plg_eventlist', JPATH_ADMINISTRATOR );
					
			// Attach CSS
			$document	=& JFactory::getDocument();
			$css		= JURI::base() . 'plugins/community/eventlist/style.css';
			$document->addStyleSheet($css);
			
// 			$html  		 = "\n".'<!--[if lte IE 6]>'."\n";
// 			$html 		.= '<link rel="stylesheet" type="text/css" href="'. JURI::base() . 'plugins/community/eventlist/styleIE6.css" type="text/css" />'."\n";
// 			$html 		.= '<![endif]-->'."\n";
// 			$document->addCustomTag( $html );
			
			if( !file_exists( $this->_path . DS . 'admin.eventlist.php' ) ){
				$el_exist = 0;
				$content = "<table>
							<tr>
								<td style=\"vertical-align: top;padding:4px\">
					            <img src='".JURI::base()."components/com_community/assets/error.gif' alt='' />
					        	</td>
					        	<td style=\"vertical-align: top;padding:4px\">
								 " .JText::_('PLG_EVENTLIST_EVENTLIST_NOT_INSTALLED') . "
								</td>
							</tr>
							</table>";
			}else{
				$user		= CFactory::getRequestUser();
				$userName = $user->getDisplayName();
				$userId = $user->id;
				$events	= $this->_getEvents();
				$itemId = $this->getItemid();
				$el_exist = 1;
				
				$mainframe =& JFactory::getApplication();
				$caching = $this->params->get('cache', 1);		
				if($caching)
				{
					$caching = $mainframe->getCfg('caching');
				}		
				
				$cache =& JFactory::getCache('plgCommunityEventlist');
				$cache->setCaching($caching);
				$callback = array('plgCommunityEventlist', '_getEventListHTML');
				
				$content = $cache->call($callback, $userName, $userId, $el_exist, $events, $itemId);
			}
			
			return $content;
		}
		
		function _getEventListHTML($userName, $userId, $el_exist, $events, $itemId){
			ob_start();
			// Test if seyret really exists on this environment.
			if($el_exist)
			{			
				if( !$events )
				{
					?>
					<div id="application-eventlist">
			        <div class="nopost">
			        	<img class="icon-nopost" src="<?php echo JURI::base(); ?>plugins/community/eventlist/favicon.png" alt="" />
			        	<span class="content-nopost"><?php echo $userName; ?> <?php echo JText::_('PLG_EVENTLIST_NO_EVENT_JOINED'); ?></span>
			        </div>
			        </div>
					<?php
				}
				else
				{
				?>
					<div id="community-eventlist-wrap">
					    <table cellpadding="2" cellspacing="0" border="0" width="100%">
						
						<?php foreach( $events as $event ): ?>
						    <tr>
						        <td width="15">
						            <img src="<?php echo JURI::base(); ?>plugins/community/eventlist/favicon.png" alt="" />
						        </td>
						        <td valign="top">
						            <a href="<?php echo JRoute::_('index.php?option=com_eventlist&view=details&id=' . $event->slug . '&Itemid=' . $itemId);?>">
										<?php echo $event->title; ?>
									</a>
									<?php if( !empty( $event->venue ) ): ?>
										<?php echo JText::_('PLG_EVENTLIST_AT'); ?>
										<a href="<?php echo JRoute::_( 'index.php?option=com_eventlist&view=venueevents&id=' . $event->venueslug . '&Itemid=' . $itemId);?>"><?php echo $event->venue;?></a>
									<?php endif; ?>
								</td valign="top">
						        
						        <td width="150" align="right">
								<?php
									$start		= new JDate($event->dates);
									echo $start->toFormat( '%d/%m/%Y' );
									echo ' - ';
									$end		= new JDate($event->enddates);
									echo $end->toFormat( '%d/%m/%Y' );
								?>
						        </td>
							</tr>
						<?php endforeach; ?>
						</table>
					</div>
				<?php
				}
			}
			
			$content	= ob_get_contents();
			ob_end_clean();
			return $content;
		}
		
		/**
		 * Returns the list of videos and its properties for the specific browsed user
		 * 
		 * @access private
		 * 
		 * returns	Array	An array of object list
		 **/	 	
		function _getEvents()
		{
			$db		=& JFactory::getDBO();
			$limit	= '10';
			$user	= CFactory::getRequestUser();
			
			$query	= 'SELECT *, '
					. 'CASE WHEN CHAR_LENGTH( b.' . $db->nameQuote('alias').' ) THEN CONCAT_WS(' . $db->Quote(':').',b.' . $db->nameQuote('id').',b.' . $db->nameQuote('alias').') ELSE b.' . $db->nameQuote('id').' END AS slug '
					. 'FROM ' . $db->nameQuote( '#__eventlist_register' ) . ' AS a '
					. 'INNER JOIN ' . $db->nameQuote( '#__eventlist_events' ) . ' AS b ON a.' . $db->nameQuote('event').'=b.' . $db->nameQuote('id')
					. ' AND a.' . $db->nameQuote('uid').'=' . $db->Quote( $user->id )
					. ' AND b.' . $db->nameQuote('published').'=' . $db->Quote( '1' )
					. ' LIMIT 0,' . $limit;
			$db->setQuery( $query );
	
			$result = $db->loadObjectList();
	
			// Attach the venues if there are any
			if(! empty($result))
			{
				foreach( $result as $row )
				{
					$query	= 'SELECT ' . $db->nameQuote('id') . ',' . $db->nameQuote('venue') . ','
							. 'CASE WHEN CHAR_LENGTH( alias ) THEN CONCAT_WS(' . $db->Quote(':').',' . $db->nameQuote('id').',' . $db->nameQuote('alias').') ELSE ' . $db->nameQuote('id').' END AS slug '
							. 'FROM ' . $db->nameQuote( '#__eventlist_venues') . ' '
							. 'WHERE ' . $db->nameQuote( 'id' ) . '=' . $db->Quote( $row->locid );
		
					$db->setQuery( $query );
		
					$venue			= $db->loadObject();
		 			$row->venue		= $venue->venue;
		 			$row->venueslug	= $venue->slug;
				}
			}		
			return $result; 
		}
	}	
}

