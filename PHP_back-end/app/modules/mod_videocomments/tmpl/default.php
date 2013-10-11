<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');
?>
<div class="videocomments<?php echo $params->get( 'moduleclass_sfx' ) ?>">
<ul style="margin: 0; padding: 0; list-style: none;">
<?php
if( $comments )
{
	$i		= 1;
	$total	= count( $comments );
	$char_limit	= intval($params->get('character_limit'));
	
	foreach( $comments as $comment )
	{
		//$comment->comment = CStringHelper::truncate($comment->comment, $char_limit);
		if( ($char_limit > 0) && (JString::strlen($comment->comment) > $char_limit) )
		{
			$comment->comment = JString::substr($comment->comment, 0, $char_limit) . '...';
		}
		
		$poster	= CFactory::getUser( $comment->post_by );
		
		if( $comment->creator_type == VIDEO_USER_TYPE )
		{
			$link	= CRoute::_('index.php?option=com_community&view=videos&task=video&videoid=' . $comment->contentid . '&userid=' . $comment->creator );
		}
		else
		{
			$link	= CRoute::_('index.php?option=com_community&view=videos&task=video&videoid=' . $comment->contentid . '&groupid=' . $comment->groupid );
		}
		
?>
	<li style="background: none; padding: 5px 0; <?php echo ( $i != $total ) ? 'border-bottom: solid 1px #ccc;' : '';?>">
		<?php
			if( $params->get('show_avatar') )
			{
		?>
			<div style="float: left;">
				<img style="width: 32px; padding: 2px; border: 1px solid rgb(204, 204, 204);" src="<?php echo $poster->getThumbAvatar(); ?>" />
			</div>
		<?php
			}
		?>
		<div style="<?php echo $params->get('show_avatar') ? 'margin-left: 42px;' : '';?>line-height: normal;">
			<span style="width: 100%;"><a href="<?php echo $link;?>"><?php echo $comment->title;?></a></span>
                        <span style="display: block;margin-top: 3px;"><?php echo CStringHelper::escape($comment->comment); ?></span>
		</div>
		<div style="clear: both;"></div>
	</li>
<?php
		$i++;
	}
}
else
{
?>
	<li><?php echo JText::_('MOD_VIDEOCOMMENTS_NO_COMMENTS');?></li>
<?php
}
?>
</ul>
</div>