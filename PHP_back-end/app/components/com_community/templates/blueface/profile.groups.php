<?php
/**
 * @package		JomSocial
 * @subpackage 	Template 
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 * 
 * @param	groups		Array	Array of groups object
 * @param	total		integer total number of groups
 * @param	user		CFactory User object 
 */
defined('_JEXEC') or die();
?>

<div class="app-box">
	<div class="app-box-header">
		<h2 class="app-box-title"><?php echo JText::_('COM_COMMUNITY_GROUPS'); ?></h2>
	</div>

	<div class="app-box-content">	
		<ul class="cThumbList cResetList clrfix">
			<?php
			for($i = 0; ($i < 12) && ($i < count($groups)); $i++)
			{
					$row	=& $groups[$i];
					$group	=& JTable::getInstance( 'Group' , 'CTable' );
					$group->load( $row->id );
			?>
			<li>
					<a href="<?php echo $row->link;?>">
							<img width="37" title="<?php echo $this->escape($row->name); ?>::<?php echo $this->escape($row->description); ?>" alt="<?php echo $this->escape($row->name); ?>" src="<?php echo $group->getAvatar(); ?>" class="avatar jomTips"/>
					</a>
			</li>
			<?php
			}
			?>
		</ul>
		<div class="clr"></div>
	</div>
	
	<div class="app-box-footer">
		<a href="<?php echo CRoute::_('index.php?option=com_community&view=groups&task=mygroups&userid=' . $user->id ); ?>">
			<?php echo JText::_('COM_COMMUNITY_GROUPS_VIEW_ALL'); ?>
		</a>
		<span><?php echo JText::sprintf((CStringHelper::isPlural($total)) ? 'COM_COMMUNITY_GROUPS_COUNT_MANY' : 'COM_COMMUNITY_GROUPS_COUNT', $total); ?></span>
		<div class="clr"></div>
	</div>
</div>