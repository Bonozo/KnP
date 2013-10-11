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

class plgCommunityEvents extends CApplications
{
	var $name 		= "Events";
	var $_name		= 'events';
	
	function plgCommunityEvents(& $subject, $config)
    {
		parent::__construct($subject, $config);
    }
    
	function onProfileDisplay()
	{
		JPlugin::loadLanguage( 'plg_events', JPATH_ADMINISTRATOR );

		$config	= CFactory::getConfig();
				
		if( !$config->get('enableevents') )
		{
			return JText::_('PLG_EVENTS_EVENT_DISABLED');	
		}
		
		$document	= JFactory::getDocument();
		$document->addStyleSheet( JURI::root() . 'plugins/community/events/style.css' );

		$mainframe	=& JFactory::getApplication();
		$user		= CFactory::getRequestUser();
		$caching 	= $this->params->get('cache', 1);
		$model		= CFactory::getModel( 'Events' );
		$my			= CFactory::getUser();
		$this->loadUserParams();

		CFactory::load( 'helpers' , 'event' );
		$event		=&JTable::getInstance( 'Event' , 'CTable' );
		$handler	= CEventHelper::getHandler( $event );
		
		$events		= $model->getEvents( null , $user->id , $this->params->get( 'sorting' , 'latest' ) , null , true , false , null , null ,$handler->getContentTypes() , $handler->getContentId() , $this->userparams->get('count', 5 ) );
		
		if($caching)
		{
			$caching = $mainframe->getCfg('caching');
		}
		
		$creatable	= false;
		
		if( $my-> id == $user->id )
		{
			$creatable	= true;
		}
		
		$cache		=& JFactory::getCache('plgCommunityEvents');
		$cache->setCaching($caching);
		$callback	= array( $this , '_getEventsHTML');		
		$content	= $cache->call($callback, true , $events , $user , $config , $model->getEventsCount( $user->id ) , $creatable );
		return $content; 
	}
	
	function _getEventsHTML( $createEvents , $rows , $user , $config , $totalEvents , $creatable )
	{
		CFactory::load( 'helpers' , 'string' );
		
		ob_start();
		?>
		<div class="jsProfileEvents">
		<?php
		if( $rows )
		{
		?>
		<ul class="cResetList">
		<?php
		foreach( $rows as $row ) {
			$event		    =&	JTable::getInstance( 'Event', 'CTable' );
			$event->load( $row->id );
			
			$creator	    =   CFactory::getUser($event->creator);
			
			// Get the formated date & time
			$format		    =   ($config->get('eventshowampm')) ?  JText::_('COM_COMMUNITY_DATE_FORMAT_LC2_12H') : JText::_('COM_COMMUNITY_DATE_FORMAT_LC2_24H');
			$event->startdate   =	CTimeHelper::getFormattedTime($event->startdate, $format);
			$event->enddate	    =	CTimeHelper::getFormattedTime($event->enddate, $format);
		?>
			<li class="jsRel jomTips tipFullWidth" title="<?php echo CStringHelper::escape($event->title);?>::<?php echo CStringHelper::escape( $event->description );?>">
				<div class="event-date jsFlLf">
					<div><img class="avatar jsFlLf" src="<?php echo $event->getThumbAvatar();?>" alt="<?php echo CStringHelper::escape( $event->title );?>" /></div>
					<div><?php echo CEventHelper::formatStartDate($event, $config->get('eventdateformat') ); ?></div>
				</div>
				<div class="event-detail">
					<div class="event-title">
						<a href="<?php echo CRoute::_('index.php?option=com_community&view=events&task=viewevent&eventid=' . $event->id );?>">
							<?php echo $event->title;?>
						</a>
					</div>
					<div class="event-loc">
						<?php echo $event->getCategoryName();?> <span>|</span> <?php echo $event->location;?>
					</div>
					<div class="eventTime"><?php echo JText::sprintf('COM_COMMUNITY_EVENTS_DURATION', $event->startdate, $event->enddate); ?></div>
					<div class="event-attendee small">
						<a href="<?php echo CRoute::_('index.php?option=com_community&view=events&task=viewguest&eventid=' . $event->id . '&type='.COMMUNITY_EVENT_STATUS_ATTEND);?>"><?php echo JText::sprintf((cIsPlural($event->confirmedcount)) ? 'COM_COMMUNITY_GUESTS_COUNT_MANY':'COM_COMMUNITY_GUESTS_COUNT', $event->confirmedcount);?></a>
					</div>
				</div>
				<div class="clr"></div>					
			</li>
		<?php } ?>
		</ul>
		<?php
		}
		else
		{
		?>
			<div><?php echo JText::_('PLG_EVENTS_NO_EVENTS_CREATED_BY_THE_USER_YET');?></div>
		<?php
		}
		?>
			<div class="profile-events-footer">                              
				<div class="profile-events-info"><?php echo JText::sprintf( 'COM_COMMUNITY_EVENTS_COUNT_DISPLAY' , count( $rows ) , $totalEvents ); ?></div>
				<div class="profile-events-action">
					<a class="app-box-action" href="<?php echo CRoute::_('index.php?option=com_community&view=events&task=create' );?>"><?php echo JText::_('COM_COMMUNITY_EVENTS_CREATE');?></a>
					<a class="app-box-action" href="<?php echo CRoute::_('index.php?option=com_community&view=events&task=myevents&userid=' . $user->id );?>"><?php echo JText::_('COM_COMMUNITY_EVENTS_ALL_EVENTS');?></a>
				</div>
			</div>
		</div>
		<?php
		$content	= ob_get_contents();
		ob_end_clean();
		
		return $content;
	}
}