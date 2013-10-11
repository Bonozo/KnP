
 <?php
/**
 * @package	JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
 
// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die();
?>

<script>
	var html = new Array();
	var total = 0;
	var invited_container = '<li id="invitation-friend-&&1&&"><div class="invitation-wrap invitation-item-invited clrfix"><img src="&&2&&" class="invitation-avatar" /><div class="invitation-detail"><div class="invitation-name">&&3&&</div><div><?php echo JText::_('COM_COMMUNITY_INVITE_INVITED');?></div></div></div></li>';
	var uninvited_container = '<li id="invitation-friend-&&1&&"><div class="invitation-wrap clrfix"><img src="&&2&&" class="invitation-avatar" /><div class="invitation-detail"><div class="invitation-name">&&3&&</div><div class="invitation-check"><input type="checkbox" id="friend-&&4&&" name="friends" value="&&4&&" onclick="joms.invitation.selectMember(\'#invitation-friend-&&4&&\');" /><label for="friend-&&4&&"><?php echo JText::_('COM_COMMUNITY_INVITE_SELECTED');?></label></div>';
<?php
//s:foreach
$i = 0;
foreach( $friends as $id )
{
$user			= CFactory::getUser( $id );
$invited		= in_array( $user->id , $selected );
$selectedClass	= $invited ? ' invitation-item-invited' : '';
$checked		= $invited ? ' checked="checked"' : '';
$disabled		= $invited ? ' disabled="disabled"' : '';

if($invited){
	$invited = 'true';
}else{
	$invited = 'false';
}
?>

html[<?php echo $i; ?>] = '<?php echo $invited; ?>,<?php echo $id;?>,<?php echo $user->getThumbAvatar();?>,<?php echo $user->getDisplayName();?>,<?php echo $user->id;?>';

<?php
$i++;
}
//e:foreach
?>
	joms.jQuery(document).ready(function(){
		total = html.length;
		for(var j = 0; j < total; j++){
			if(j < total){
				html[j] = html[j].split(",");
				var container;
				if(html[j][0] == 'false'){
					container = uninvited_container.replace('&&1&&',html[j][1]);
					container = container.replace('&&2&&',html[j][2]);
					container = container.replace('&&3&&',html[j][3]);
					container = container.replace(/&&4&&/gi,html[j][1]);
				}else{
					container = invited_container.replace('&&1&&',html[j][1]);
					container = container.replace('&&2&&',html[j][2]);
					container = container.replace('&&3&&',html[j][3]);
				}
				
				joms.jQuery('ul#community-invitation-list').append(container);
			}
		}
	});
	/*
	recursion function - backup
	function append(i){
		if(i <= total){
			
			//i = i + 10;
			for(var j = total; j < total; j++){
				if(j < total){
					html[j] = html[j].split(",");
					var container;
					if(html[j][0] == 'false'){
						container = uninvited_container.replace('&&1&&',html[j][1]);
						container = container.replace('&&2&&',html[j][2]);
						container = container.replace('&&3&&',html[j][3]);
						container = container.replace(/&&4&&/gi,html[j][1]);
					}else{
						container = uninvited_container.replace('&&1&&',html[j][1]);
						container = container.replace('&&2&&',html[j][2]);
						container = container.replace('&&3&&',html[j][3]);
					}
					
					joms.jQuery('ul#community-invitation-list').append(container);
				}
			}
			i = i + 20;
			setTimeout("append("+i+")",100);
		}
	}
	*/
</script>
<div class="invitation-bg">
<form name="invitation-form" id="community-invitation-form">
<div id="invitation-error"></div>
<?php
if( $displayFriends )
{
?>
	<div class="head-note"><?php echo JText::_('COM_COMMUNITY_INVITE_SELECT_FRIENDS_TIPS');?></div>
	<div id="community-invitation">
<?php
	if( !empty( $friends ) )
	{
?>

		<ul id="community-invitation-list" class="clrfix">			
<!-- HERE -->
		</ul>
<?php
	} 
	else 
	{
?>
	<div><?php echo JText::_('COM_COMMUNITY_INVITE_NO_FRIENDS');?></div>
<?php
	}
?>		
	</div>
	
	
	<div class="invitation-option">
<?php
}
if( $displayEmail )
{
?>
		<div class="option email-container">
			<div class="textarea-label">
				<?php echo JText::_('COM_COMMUNITY_INVITE_BY_EMAIL_TIPS');?>
			</div>
			<div class="textarea-wrap">
				<textarea name="emails" id="emails"></textarea>
			</div>
		</div>
<?php
}
?>
		<div class="option invitation-message-container">
			<div class="textarea-label">
				<?php echo JText::_('COM_COMMUNITY_INVITE_PERSONAL_MESSAGE');?>
				
				<div class="textarea-label-right">
					<?php echo JText::_('COM_COMMUNITY_INVITE_SELECT');?> (<a onClick="joms.invitation.selectAll('#community-invitation-list');" href="javascript:void(0)"><?php echo JText::_('COM_COMMUNITY_JUMP_ALL');?></a>, <a onClick="joms.invitation.selectNone('#community-invitation-list');" href="javascript:void(0)"><?php echo JText::_('COM_COMMUNITY_NONE');?></a>)
				</div>
			</div>
			<div class="textarea-wrap">
				<textarea name="message" id="message"></textarea>
			</div>
		</div>
	</div>
</form>
</div>