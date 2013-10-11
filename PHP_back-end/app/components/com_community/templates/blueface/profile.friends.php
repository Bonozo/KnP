<?php
/**
 * @package		JomSocial
 * @subpackage 	Template 
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 * 
 * @param	friends		array or CUser (all user)
 * @param	total		integer total number of friends
 * @param	user		CFactory User object 
 */
defined('_JEXEC') or die();
?>

<div class="app-box">
	<div class="app-box-header">
    	<h2 class="app-box-title"><?php echo JText::_('COM_COMMUNITY_PROFILE_FRIENDS'); ?></h2>
	</div>
    
    <div class="app-box-content">	
		<ul class="cThumbList cResetList clrfix">
				<?php
				for($i = 0; ($i < 12) && ($i < count($friends)); $i++) {
						$friend =& $friends[$i];
				?>
				<li>
						<a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&userid=' . $friend->id ); ?>">
								<img width="37" alt="<?php echo $friend->getDisplayName();?>" title="<?php echo $friend->getTooltip(); ?>" src="<?php echo $friend->getThumbAvatar(); ?>" class="avatar jomTips"/>
						</a>
				</li>
				<?php } ?>
		</ul>
		<div class="clr"></div>
    </div>
    
    <div class="app-box-footer">
    	<a href="<?php echo CRoute::_('index.php?option=com_community&view=friends&userid=' . $user->id ); ?>">
    			<?php echo JText::_('COM_COMMUNITY_VIEW_ALL'); ?>
    	</a>
    	<span><?php echo JText::sprintf((CStringHelper::isPlural($total)) ? 'COM_COMMUNITY_TOTAL_FRIENDS_COUNT_MANY': 'COM_COMMUNITY_TOTAL_FRIENDS_COUNT' , $total); ?></span>
    	<div class="clr"></div>
	</div>
</div>




