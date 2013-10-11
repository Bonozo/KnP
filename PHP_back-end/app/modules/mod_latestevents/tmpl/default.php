<?php
/**
 * @package		Upcoming Events Module
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');
?>
<?php
if( !empty( $events ) )
{
?>
<ul class="latestevents<?php echo $params->get('moduleclass_sfx'); ?>">
	<?php
	foreach( $events as $event )
	{
		$handler	= CEventHelper::getHandler( $event );
	?>
		<li class="jsRel jomTips tipFullWidth" title="<?php echo CStringHelper::escape($event->title);?>::<?php echo CStringHelper::escape( JString::substr( strip_tags( $event->description) , 0 , $params->get('tipslength', 500 ) )  );?>">
			<div class="event-date jsFlLf">
				<div>
					<a href="<?php echo $handler->getFormattedLink( 'index.php?option=com_community&view=events&task=viewevent&eventid=' . $event->id );?>">
					<img class="avatar jsFlLf" src="<?php echo $event->getThumbAvatar();?>" alt="<?php echo CStringHelper::escape( $event->title );?>" /></a>
				</div>
				<div><?php echo CEventHelper::formatStartDate($event, $config->get('eventdateformat') ); ?></div>
			</div>
			<div class="event-detail">
				<div class="event-title">
					<a href="<?php echo $handler->getFormattedLink( 'index.php?option=com_community&view=events&task=viewevent&eventid=' . $event->id );?>">
						<?php echo $event->title;?>
					</a>
				</div>
				<div class="event-loc">
					<a href="<?php echo $handler->getFormattedLink( 'index.php?option=com_community&view=events&categoryid=' . $event->catid );?>"><?php echo $event->getCategoryName();?></a><span> 
					|
					</span> <?php echo $event->location;?>
				</div>
				<div class="eventTime"><?php echo JHTML::_('date', $event->startdate, JText::_('DATE_FORMAT_LC2') ); ?></div>
			</div>
			<div class="clr"></div>
			<div class="event-attendee small">
				<a href="<?php echo $handler->getFormattedLink('index.php?option=com_community&view=events&task=viewguest&eventid=' . $event->id . '&type='.COMMUNITY_EVENT_STATUS_ATTEND);?>"><?php echo JText::sprintf((cIsPlural($event->confirmedcount)) ? 'COM_COMMUNITY_EVENTS_ATTANDEE_COUNT_MANY':'COM_COMMUNITY_EVENTS_ATTANDEE_COUNT', $event->confirmedcount);?></a>
			</div>
			<div class="clr"></div>	
		</li>
	<?php
	}
	?>
</ul>
<?php
}
else
{
?>
	<div><?php echo JText::_( 'COM_COMMUNITY_EVENTS_NO_EVENTS_ERROR' );?></div>
<?php
}
?>