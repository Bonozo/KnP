<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */

// no direct access
defined('_JEXEC') or die('Restricted access');
?>
<div id="latest-discussions-wrapper<?php echo $params->get('moduleclass_sfx'); ?>">
<?php
if(!empty($latest) )
{
	$items			= array();

	foreach( $latest as $data )
	{
		$items[ $data->groupid ][]	= $data;
	}
?>
	<ul class="latest-discussions-items">
	<?php
	foreach($items as $groupId => $data )
	{
		$table	= & JTable::getInstance( 'Group' , 'CTable' );
		$table->load( $groupId );

		if( count( $data ) > 1 )
		{
		?>
		<li>
		<?php
			if($showavatar )
			{
		?>
			<div class="item-avatar">
				<a href="<?php echo CRoute::_('index.php?option=com_community&view=groups&task=viewgroup&groupid=' . $table->id );?>"><img src="<?php echo $table->getAvatar('thumb');?>" alt="<?php echo CStringHelper::escape( $table->name );?>" /></a>
			</div>
		<?php
			}
		?>
		<?php
		$i = 0;
		foreach( $data as $row )
		{
			$creator	= CFactory::getUser( $row->creator );
		?>
			<div class="item-title">
				<a href="<?php echo CRoute::_('index.php?option=com_community&view=groups&task=viewdiscussion&groupid=' . $table->id . '&topicid=' . $row->id );?>"><?php echo $row->title; ?></a>
			</div>
			<div class="item-description">
				<small><?php echo JText::_('by');?> <a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&userid=' . $creator->id );?>"><?php echo $creator->getDisplayName(); ?></a>
				<?php echo JText::sprintf( (cIsPlural( $row->counter)) ? 'MOD_LATESTDISC_REPLY_MANY' : 'MOD_LATESTDISC_REPLY', $row->counter); ?>
				</small>
			</div>
			<div class="item-group-separator"></div>
			<div style="clear: both;"></div>
		<?php
			$i++;
		}
		?>
		</li>
		<?php
		}
		else
		{
			$creator	= CFactory::getUser( $data[0]->creator );
		?>
		<li>			
		<?php
			if($showavatar )
			{
		?>
			<div class="item-avatar">
				<a href="<?php echo CRoute::_('index.php?option=com_community&view=groups&task=viewgroup&groupid=' . $table->id );?>"><img src="<?php echo $table->getAvatar('thumb');?>" alt="<?php echo CStringHelper::escape( $table->name );?>" /></a>
			</div>
		<?php
			}
		?>
			<div class="item-title">
				<a href="<?php echo CRoute::_('index.php?option=com_community&view=groups&task=viewdiscussion&groupid=' . $table->id . '&topicid=' . $data[0]->id );?>"><?php echo $data[0]->title; ?></a>
			</div>
			<div class="item-description">
				<small><?php echo JText::_('by');?> <a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&userid=' . $creator->id );?>"><?php echo $creator->getDisplayName(); ?></a>
				<?php echo JText::sprintf( (cIsPlural($data[0]->counter)) ? 'MOD_LATESTDISC_REPLY_MANY' : 'MOD_LATESTDISC_REPLY', $data[0]->counter); ?>
				</small>
			</div>
			<div style="clear: both;"></div>
		</li>
		<?php
		}
	}
	?>
	</ul>
<?php
}
else
{
	echo JText::_("MOD_LATESTDISC_NO_DISCUSSION");
}
?>
</div>
