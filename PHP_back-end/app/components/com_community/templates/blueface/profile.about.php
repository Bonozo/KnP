<?php
/**
 * @package		JomSocial
 * @subpackage 	Template 
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 * 
 * @param	profile			A Profile object that contains profile fields for this specific user
 * @param	profile->
 * @params	isMine		boolean is this profile belongs to me?
 */
defined('_JEXEC') or die();
?>

<div class="app-box">
	<div class="app-box-header">
		<h2 class="app-box-title"><?php echo JText::_('COM_COMMUNITY_ABOUT_ME');?></h2>
		
		<!-- TODO: Port the edit profile icon from default template -->
		<div class="app-box-menus">
			<?php if( $isMine ): ?>
			<div class="app-box-menu edit-profile">
				<a class="app-box-menu-icon" href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=edit');?>"><span class="app-box-menu-title"><?php echo JText::_('COM_COMMUNITY_PROFILE_EDIT'); ?></span>
				</a>
			</div>
			<?php endif; ?>
		</div>
	</div>
		
	<div class="app-box-content">
	<?php
		//check total columns
		$columncheck = 0;
		foreach( $profile['fields'] as $column )
		{
			$columncheck ++; 
		}
		
		$i=1;
		foreach( $profile['fields'] as $groupName => $items )
		{
	?>
	<div class="infoGroup <?php if( $columncheck == 1 ) { echo "full"; } ?>">
	<div class="infoGroup">
		<?php if( $groupName != 'ungrouped' ): ?>
		<h4 class="infoGroupTitle"><?php echo JText::_( $groupName ); ?></h4>
		<?php endif; ?>
		
		<dl class="profile-right-info">
			<?php foreach( $items as $item ): ?>
			
					<dt><?php echo JText::_( $item['name'] ); ?></dt>
					<?php if( !empty($item['searchLink']) && is_array($item['searchLink']) ): ?>
						<dd>
							<?php foreach($item['searchLink'] as $linkKey=>$linkValue): ?>
							<?php $item['value'] = $linkKey; ?>
								<a href="<?php echo $linkValue; ?>"><?php echo CProfileLibrary::getFieldData( $item ) ?></a><br />
							<?php endforeach; ?>
							
						</dd>
					<?php else: ?>
				    	<dd>
				    		<?php if(!empty($item['searchLink'])) :?>
								<a href="<?php echo $item['searchLink']; ?>"> 
							<?php endif; ?>
							
							<?php echo CProfileLibrary::getFieldData( $item ); ?>
							
							<?php if(!empty($item['searchLink'])) :?>
								</a> 
							<?php endif; ?>
						</dd>
					<?php endif; ?>
				
				
			<?php endforeach; ?>
		</dl>
	</div>
	</div>
	
	<?php
			if ($i==3)
			{
				echo '<div class="clr"></div>';
				$i=1;
			}else
			{
				$i++;
			}
		}
	?>
	</div>
</div>