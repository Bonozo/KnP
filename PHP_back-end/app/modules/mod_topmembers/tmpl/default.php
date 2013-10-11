<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');
?>
<div class="topmembers<?php echo $params->get( 'moduleclass_sfx' ) ?>">
	<?php
	$showAvatar = $params->get('show_avatar', 1);
	$showKarma 	= $params->get('enablekarma', 1);
	
	if ( !empty($users) ) {
	?>

	<style type="text/css">
	ul.mod_topmembers {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	ul.mod_topmembers li {
		background: none;
		padding: 5px 0 !important; 
		border: none;
	}
	ul.mod_topmembers li + li {
		border-top: 1px solid #CCC;
	}
	</style>
	<ul class="mod_topmembers">
		<?php
		foreach ( $users as $user ) {
		?>
		<li id="user-<?php echo $user->id; ?>">

			<?php if ( $showAvatar == 1 ) : ?>
			<div style="float: left; margin-top: 3px;">
				<a href="<?php echo $user->link; ?>" title="<?php echo JText::sprintf('MOD_TOPMEMBERS_GO_TO_PROFILE', CStringHelper::escape( $user->name ) ); ?>">
					<img src="<?php echo $user->avatar; ?>" alt="<?php echo CStringHelper::escape( $user->name ); ?>" style="width: 32px; padding: 2px; border: solid 1px #ccc;" />
				</a>
			</div>
			<?php endif; ?>
			
			<div style="margin-left: <?php echo ( $showAvatar == 1 ) ? '42px' : '0'; ?>; margin-top: <?php echo ( $showKarma == 1 ) ? '0' : '8px'; ?>;">
				<a href="<?php echo $user->link; ?>"><?php echo $user->name; ?></a>
			</div>

			<?php if ( $showKarma == 1 ) : ?>
				<div style="margin-left: <?php echo ( $showAvatar == 1 ) ? '42px' : '0'; ?>;"><img alt="<?php echo $user->userpoints; ?>" src="<?php echo $user->karma; ?>" /></div>
			<?php elseif ( $showKarma == 2 ) : ?>
				<div style="margin-left: <?php echo ( $showAvatar == 1 ) ? '42px' : '0'; ?>;"><small><?php echo JText::_('MOD_TOPMEMBERS_POINTS') , ': ', $user->userpoints; ?></small></div>
			<?php endif; ?>						

			<?php if ( $showAvatar == 1 ) : ?>
			<div style="clear: left;"></div>
			<?php endif; ?>
		</li>
		<?php
		}
		?>
	</ul>
	<?php
	}
	else 
	{
		echo JText::_("MOD_TOPMEMBERS_NO_MEMBERS");
	}
	?>
</div>