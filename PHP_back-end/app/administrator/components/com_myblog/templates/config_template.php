<?php
/**
 * @package		My Blog
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license http://www.azrul.com Copyrighted Commercial Software
 */
defined('_JEXEC') or die('Restricted access');

$jq     	= rtrim( JURI::root() , '/' ) . '/administrator/components/com_myblog/js/jquery-1.2.6.pack.js';
$jq_tabs    = rtrim( JURI::root() , '/' ) . '/administrator/components/com_myblog/js/jquery.tabs.pack.js';
$jq_css     = rtrim( JURI::root() , '/' ) . '/administrator/components/com_myblog/js/tabs.css';

$images		= rtrim( JURI::root() , '/' ) . '/administrator/components/com_myblog/images';

require_once( MY_LIBRARY_PATH . DS . 'optionsetup.php' );
$opt = new MYOptionSetup();
?>
<style type="text/css">

div.cfgdesc{
color:#666666;
padding-top:4px;
font-size:11px;
}

label.cfgdesc{
color:#000000;
font-weight:bold;
padding-bottom:4px;
}

td.leftalign{
text-align:right;
vertical-align:top;
}

input.cfgdesc{
margin-top:5px;
vertical-align:top;

}

table.mytable td div input{
	margin-top:10px;
}
</style>
<script src="<?php echo $jq;?>" type="text/javascript"></script>
<script src="<?php echo $jq_tabs;?>" type="text/javascript"></script>

<link rel="stylesheet" href="<?php echo $jq_css;?>" type="text/css" media="print, projection, screen">
<script type="text/javascript">
	jQuery.noConflict();
	jQuery(document).ready( function(){
	    jQuery('#myBlogTab').tabs();
	});
</script>
<form method="POST" name="adminForm">
<div id="myBlogTab" style="width:100%;border: none;">
	<ul class="ui-tabs-nav">
		<li class="ui-tabs-nav-item">
			<a href="#general">
				<span style="float: left;margin-right: 5px;"><img src="<?php echo $images;?>/general.gif" border="0" /></span>
				<span>General</span>
			</a>
		</li>
		<li class="ui-tabs-nav-item">
			<a href="#permission">
				<span style="float: left;margin-right: 5px;"><img src="<?php echo $images;?>/permissions.gif" border="0" /></span>
				<span>Permissions</span>
			</a>
		</li>
		<li class="ui-tabs-nav-item">
			<a href="#mediabrowser">
				<span style="float: left;margin-right: 5px;"><img src="<?php echo $images;?>/mediabrowser.gif" border="0" /></span>
				<span>Media Browser</span>
			</a>
		</li>
		<li class="ui-tabs-nav-item">
			<a href="#workflow">
				<span style="float: left;margin-right: 5px;"><img src="<?php echo $images;?>/workflow.gif" border="0" /></span>
				<span>Workflow & Integrations</span>
			</a>
		</li>
		<li class="ui-tabs-nav-item">
			<a href="#layout">
				<span style="float: left;margin-right: 5px;"><img src="<?php echo $images;?>/layout.gif" border="0" /></span>
				<span>Layout</span>
			</a>
		</li>
		<li class="ui-tabs-nav-item">
			<a href="#mydashboard">
				<span style="float: left;margin-right: 5px;"><img src="<?php echo $images;?>/dashboard.gif" border="0" /></span>
				<span>Dashboard</span>
			</a>
		</li>
		<!-- <li><a href="#sef_support"><span>SEF Options</span></a></li> -->
	</ul>
<?php
////////////////////////////////////////////////////////////////////////////
// General tab
////////////////////////////////////////////////////////////////////////////
$opt->add_section('General Settings');
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'mainBlogTitle',
					'size'  => 45,
					'maxlength' => 500,
					'value' => stripslashes($config->get('mainBlogTitle')),
					'title' => 'Primary blog title',
					'desc'  => 'Set the primary blog title for My Blog.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'textarea',
					'name'  => 'mainBlogDesc',
					'value' => stripslashes($config->get('mainBlogDesc')),
					'rows'  => 4,
					'cols'  => 30,
					'title' => 'Primary blog description',
					'desc'  => 'Set some descripton for the primary blog.'
				)
		);

$opt->add(
			array(
					'type' 		=> 'select',
					'name' 		=> 'managedSections[]',
					'value' 	=> $sect_lists,
					'selected'  => $sel_sect_lists,
					'size'      => $sect_rows,
					'title' 	=> 'Manage sections using My Blog',
					'desc'  	=> 'Select one or more sections to be managed using MyBlog.By selecting sections to be managed using MyBlog,content in the selected sections can be managed,published,editted,and viewed using MyBlog.'
				)
		);

$opt->add(
			array(
					'type' 		=> 'select',
					'name' 		=> 'postSection',
					'value' 	=> $save_sect_lists,
					'selected'  => $config->get('postSection'),
					'size'      => 1,
					'title' 	=> 'Save entries in default section',
					'desc'  	=> 'MyBlog will store all entry in 1 single category, named "MyBlog" within your selected section. If it doesn\'t exist, the category will be created automatically'
				)
		);
$opt->add_section('RSS Feeds');
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'useRSSFeed',
					'value' => $config->get('useRSSFeed'),
					'title' => 'Enable Blog RSS Feeds',
					'desc'  => 'Enable RSS feeds for each user\'s blog.Must be enabled for MyBlog tags to be picked up as Technorati Tags.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'rssFeedLimit',
					'size'  => 5,
					'maxlength' => 5,
					'value' => (int) $config->get('rssFeedLimit'),
					'title' => 'Limit number of entries to appear in the feed',
					'desc'  => 'Set the limit of entries to appear in the RSS Feed'
				)
		);
$opt->add_section('Feedburner');
$opt->add(
			array(
					'type'	=> 'checkbox',
					'name'	=> 'useFeedBurner',
					'value'	=> $config->get('useFeedBurner'),
					'title'	=> 'Use Feedburner',
					'desc'	=> 'Enable or use feedburner by providing the feed url below instead.'
					)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'useFeedBurnerURL',
					'size'  => 45,
					'maxlength' => 500,
					'value' => stripslashes($config->get('useFeedBurnerURL')),
					'title' => 'Feedburner URL',
					'desc'  => 'Set the feedburner URL'
				)
		);
$opt->add(
			array(
					'type'	=> 'checkbox',
					'name'	=> 'userUseFeedBurner',
					'value'	=> $config->get('userUseFeedBurner'),
					'title'	=> 'Allow blogger\'s to use Feedburner',
					'desc'	=> 'Allow\'s site bloggers to use feedburner instead of My Blog\'s default RSS Feeds.'
					)
		);
?>
	<div id="general"><?PHP echo $opt->get_html();?></div>
<?php
////////////////////////////////////////////////////////////////////////////
// Permissions tab
////////////////////////////////////////////////////////////////////////////
$opt    = null;
$opt    = new MYOptionSetup();

$opt->add_section("General Permissions");

$postGroup		= explode(",",$config->get('postGroup'));
array_walk($postGroup,"trim");

$adminPostGroup		= explode(",",$config->get('adminPostGroup'));
array_walk($adminPostGroup,"trim");

$registered = '';
$author     = '';
$editor     = '';
$publisher  = '';

if(in_array('Registered',$postGroup)){
	$registered = ' selected="selected"';
}

if(in_array('Author',$postGroup)){
	$author     = ' selected="selected"';
}

if(in_array('Editor',$postGroup)){
	$editor     = ' selected="selected"';
}

if(in_array('Publisher',$postGroup)){
	$publisher  = ' selected="selected"';
}

$manager    = '';
$admin      = '';
$supadmin   = '';
$addPermission = '';
if(in_array('Manager',$adminPostGroup)){
	$manager    = ' selected="selected"';
}

if(in_array('Administrator',$adminPostGroup)){
	$admin      = ' selected="selected"';
}

if(JVERSION >= 1.6){
	if(in_array('Super Users',$adminPostGroup)){
        $supadmin   = ' selected="selected"';
    }
}else{
	if(in_array('Super Administrator',$adminPostGroup)){
		$supadmin   = ' selected="selected"';
	}
}

$customval  = '<select name="postGroup[]" multiple="multiple" size="4">'
			. '	<option value="Registered"' . $registered . '>- Registered</option>'
			. '	<option value="Author"' . $author . '>- Author</option>'
			. '	<option value="Editor"' . $editor . '>- Editor</option>'
			. '	<option value="Publisher"' . $publisher . '>- Publisher</option>'
			. '</select>'
			. '&nbsp;&nbsp;&nbsp;&nbsp;'
			. '<select name="adminPostGroup[]" multiple="multiple" size="4">'
			. '	<option value="Manager"' . $manager . '>- Manager</option>'
			. ' <option value="Administrator"' . $admin . '>- Administrator</option>'
			. '	<option value="'.((JVERSION >= 1.6) ? 'Super Users' : 'Super Administrator').'"' . $supadmin . '>- '.((JVERSION >= 1.6) ? 'Super Users' : 'Super Administrator') .'</option>'
                        . $addPermission
                        . '</select>'
			. '<br />Additional user groups (separated by comma):<br />'
			. '<input type="text" name="extraPostGroups" value="' . $config->get('extraPostGroups') . '" size="40"/>';
$opt->add(
			array(
					'type' 	=> 'custom',
					'value' => $customval,
					'name'	=> 'postingFrom',
					'title' => 'Allow posting from',
					'desc'  => 'Allow specific groups to post.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'textarea',
					'value' => $config->get('allowedPosters'),
					'name'  => 'allowedPosters',
					'rows'  => 4,
					'cols'  => 30,
					'title' => 'Allow posting from',
					'desc'  => 'Enter <b>userids or username</b> of users you want to allow to post (seperated by commas). For example: 61,62,63. <br /><b>NOTE: If you want ONLY these users to be able to post, deselect all options in allow posting from settings above</b>'
				)
		);
$opt->add(
			array(
					'type' 	=> 'textarea',
					'value' => $config->get('disallowedPosters'),
					'name'  => 'disallowedPosters',
					'rows'  => 4,
					'cols'  => 30,
					'title' => 'Disallow blog posting from the specified users below',
					'desc'  => 'Enter <b>userids or username</b> of users you want to disallow to post (seperated by commas). For example: 61,admin,63. <br />'
				)
		);
$publishControlGroup    	= explode(",",$config->get('publishControlGroup'));
array_walk($publishControlGroup,"trim");

$adminPublishControlGroup   = explode(",",$config->get('adminPublishControlGroup'));
array_walk($adminPublishControlGroup,"trim");

$categoryGroup              = explode(",",$config->get('publishControlGroup'));
array_walk($categoryGroup,"trim");

$registered = '';
$author     = '';
$editor     = '';
$publisher  = '';

if(in_array('Registered',$publishControlGroup)){
	$registered = ' selected="selected"';
}

if(in_array('Author',$publishControlGroup)){
	$author     = ' selected="selected"';
}

if(in_array('Editor',$publishControlGroup)){
	$editor     = ' selected="selected"';
}

if(in_array('Publisher',$publishControlGroup)){
	$publisher  = ' selected="selected"';
}

$manager    = '';
$admin      = '';
$supadmin   = '';

if(in_array('Manager',$adminPublishControlGroup)){
	$manager    = ' selected="selected"';
}

if(in_array('Administrator',$adminPublishControlGroup)){
	$admin      = ' selected="selected"';
}

if(JVERSION >= 1.6){
	if(in_array('Super Users',$adminPublishControlGroup)){
        $supadmin   = ' selected="selected"';
    }
}else{
	if(in_array('Super Administrator',$adminPublishControlGroup)){
		$supadmin   = ' selected="selected"';
	}
}


$customval = '';
$customval  = '<select name="publishControlGroup[]" multiple="multiple" size="4">'
			. '	<option value="Registered"' . $registered . '>- Registered</option>'
			. '	<option value="Author"' . $author . '>- Author</option>'
			. '	<option value="Editor"' . $editor . '>- Editor</option>'
			. '	<option value="Publisher"' . $publisher . '>- Publisher</option>'
			. '</select>'
			. '&nbsp;&nbsp;&nbsp;&nbsp;'
			. '<select name="adminPublishControlGroup[]" multiple="multiple" size="4">'
			. '	<option value="Manager"' . $manager . '>- Manager</option>'
			. ' <option value="Administrator"' . $admin . '>- Administrator</option>'
			. '	<option value="'.((JVERSION >= 1.6) ? 'Super Users' : 'Super Administrator').'"' . $supadmin . '>- '.((JVERSION >= 1.6) ? 'Super Users' : 'Super Administrator').'</option>'
			. '</select>'
			. '<br />Extra user groups (seperated by comma):<br />'
			.'<input type="text" name="extraPublishGroups" value="' . $config->get('extraPublishGroups') . '" size="40"/>';

$opt->add(
			array(
					'type' 	=> 'custom',
					'value' => $customval,
					'name'	=> '',
					'title' => 'Allow Publish/Unpublish by',
					'desc'  => 'Allow specific groups to post.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'textarea',
					'name'  => 'allowedPublishers',
					'value' => $config->get('allowedPublishers'),
					'rows'  => 4,
					'cols'  => 30,
					'title' => 'Allow specific users to publish',
					'desc'  => 'Enter <b>userids or username</b> of users you want to allow to publish (seperated by commas). For example: 61,62,63. <br /><b>NOTE: If you want ONLY these users to be able to publish, deselect all options in allow publish/unpublish by settings above</b>'
				)
		);
?>
	<div id="permission"><?php echo $opt->get_html();?></div>
<?php

$opt    = null;

$opt    = new MYOptionSetup();
$opt->add_section('Media browser');
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'useImageBrowser',
					'value' => $config->get('useImageBrowser'),
					'title' => 'Enable image browser',
					'desc'  => 'Select No to disable image browser. Will subsequently disable image uploads.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'imgFolderRoot',
					'size'  => 45,
					'maxlength' => 500,
					'value' => $config->get('imgFolderRoot'),
					'title' => 'Set image root directory',
					'desc'  => 'Set root directory of image browser (<b>relative to joomla directory</b>).Users will be able to browse all images in this directory and its subdirectories unless \'restrict user to own directory\' is set to \'Yes\'.<br/><br/>Note:User uploaded images will reside in their own subdirectory within the image root directory.(image_root_directory/user_id)'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'imgFolderRestrict',
					'value' => $config->get('imgFolderRestrict'),
					'title' => 'Restrict user to own directory',
					'desc'  => 'Restricts user to their own directory (image_root_directory/user_id/)'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'uploadSizeLimit',
					'value' => $config->get('uploadSizeLimit'),
					'size'  => 8,
					'maxlength' => 8,
					'title' => 'Image file size limit',
					'desc'  => 'Set image file upload size limit (in KBytes). Limit must be less than the POST limit set in php.ini'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'enableImageResize',
					'value' => $config->get('enableImageResize'),
					'title' => 'Allow Automatic Image Upload Resizing (Remember to set the width below)',
					'desc'  => 'Enabling this option will automatically resize uploaded images.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'maxWidth',
					'value' => $config->get('maxWidth'),
					'size'  => 8,
					'maxlength' => 8,
					'title' => 'Automatic resize uploaded images larger than width (In pixels)',
					'desc'  => 'Automatically resize images which has larger width than specified. (In pixels)'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'allowedUploadFileType',
					'value' => $config->get('allowedUploadFileType'),
					'size'  => 45,
					'maxlength' => 500,
					'title' => 'File extension allowed for uploads',
					'desc'  => 'Set the file extension that you would allow to be uploaded by users. Only file extension listed here can be uploaded.'
				)
		);	
?>
	<div id="mediabrowser"><?php echo $opt->get_html();?></div>
<?php
$opt    = null;

$opt    = new MYOptionSetup();
$opt->add_section('Notification');
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'allowNotification',
					'value' => $config->get('allowNotification'),
					'title' => 'E-mail notifications',
					'desc'  => 'Send email to the specified address whenever a new blog entry is posted. If you disable the auto-publish feature, you might want to enable this.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'adminEmail',
					'value' => $config->get('adminEmail'),
					'size'  => 30,
					'maxlength' => 255,
					'title' => 'Notification Email',
					'desc'  => 'Specify where the notification email should be send. To specify multiple e-mail address, use \'comma\'. E.g: user@email.com,user2@email.com'
				)
		);

$opt->add(
			array(
					'type' 		=> 'select',
					'name' 		=> 'viewIntro',
					'value' 	=> array(
					                        '1' => 'All',
					                        '2' => 'Members Only'
										),
					'selected'  => $config->get('viewIntro'),
					'size'      => 1,
					'title' 	=> 'Permissions to view blog introtext',
					'desc'  	=> 'Select the permissions that you would want to allow for viewing of blogs'
				)
		);
		
$opt->add(
			array(
					'type' 		=> 'select',
					'name' 		=> 'viewEntry',
					'value' 	=> array(
					                        '1' => 'All',
					                        '2' => 'Members Only'
										),
					'selected'  => $config->get('viewEntry'),
					'size'      => 1,
					'title' 	=> 'Permissions to view blog entries',
					'desc'  	=> 'Select the permissions that you would want to allow for viewing of blogs'
				)
		);
$opt->add_section('Tags');

$site	= rtrim( JURI::root() , '/' ) . '/administrator/index.php?option=com_myblog&task=category';
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'allowDefaultTags',
					'value' => $config->get('allowDefaultTags'),
					'title' => 'Default Tags',
					'desc'  => 'Allows the tags to be automatically tagged into the entry. To set the default tags, please proceed to the tags management page by <a href="' . $site . '">clicking here</a>'
				)
		);
$opt->add_section('JomSocial Integrations');
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'jomsocialActivity',
					'value' => $config->get('jomsocialActivity'),
					'title' => 'Integration with Jom Social Activities',
					'desc'  => 'Enable this if you would like to have the activities integrated with JomSocial.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'jomsocialPoints',
					'value' => $config->get('jomsocialPoints'),
					'title' => 'Integration with Jom Social User points',
					'desc'  => 'Enable this if you would like to have the user points integrated with JomSocial.'
				)
		);
		
//===================COMMENT SYSTEM + EXTRA PARAMS============================================        
$opt->add_section('Comments');		
$commentsettings = '';
$selectedsys = $config->get('useComment');
$commentsettings = '<select name="useComment" id="useComment" onchange=\'jQuery(".commentparam").hide(); 
						 jQuery("#" + this.value + "_param").show(); \'>
						<option value="">None</option>
						<option value="jomcomment" '.(($selectedsys == '1' || $selectedsys == 'jomcomment') ? 'selected' : '' ).'>JomComment (currently only available for Joomla <= 1.5)</option>
						<option value="intensedebate" '.(($selectedsys == 'intensedebate') ? 'selected' : '' ).'>IntenseDebate</option>
						<option value="disqus" '.(($selectedsys == 'disqus') ? 'selected' : '' ).'>Disqus</option>
                                                <option value="facebook" '.(($selectedsys == 'facebook') ? 'selected' : '' ).'>Facebook</option>
                     </select>';
					
$jomcomment_param = '<div class="commentparam mytable cfgdesc" id="jomcomment_param" style="display:'.(($selectedsys == 'jomcomment') ? '' : 'none' ).';">
						<dl>
							<dt>
							<div style="float:left; margin-right:10px;">
							<input type="checkbox" id="enableJCDashboard" value="1" name="enableJCDashboard" '.($config->get('enableJCDashboard') ? 'checked' : '').'>
							</div>
							<div>
							<label for="enableJCDashboard" class="cfgdesc">
							Add Jom Comment locking in dashboard
							</label>
							<div class="cfgdesc">
							Adds Jom Comment locking features in the dashboard and allow users to customize their blog to enable / disable comments
							</div>
							</dt>
							</div>
							<dd></dd>
						</dl>
					</div>';
$intensedebate_param = '<div class="commentparam mytable cfgdesc" id="intensedebate_param" style="display:'.(($selectedsys == 'intensedebate') ? '' : 'none' ).';">
						<dl>
							<dt>
							<label class="cfgdesc">IntenseDebate Account</label>
							<div>
							<input onclick="event.preventDefault();" size="60" type="text" id="accountIntenseDebate" value="'.$config->get('accountIntenseDebate').'" name="accountIntenseDebate" /><br />
							<div class="cfgdesc">Fill your IntenseDebate site account</div>
							</div>
							</dt>
							<dd></dd>
						</dl>
					</div>';
$disqus_param = '<div class="commentparam mytable cfgdesc" id="disqus_param" style="display:'.(($selectedsys == 'disqus') ? '' : 'none' ).';">
						<dl>
							<dt>
							<label class="cfgdesc">Disqus Shortname</label>
							<div>
							<input onclick="event.preventDefault();" size="60" type="text" id="disqusShortname" value="'.$config->get('disqusShortname').'" name="disqusShortname" /><br />
							<div class="cfgdesc">This is the name of your comment forum after registering with Disqus e.g. <b>myblogcomment</b>.disqus.com</div>
							</div>
							</dt>
							<dd></dd>
						</dl>
					</div>';
$facebook_param = '<div class="commentparam mytable cfgdesc" id="facebook_param" style="display:'.(($selectedsys == 'facebook') ? '' : 'none' ).';">
						<dl>
							<dt>
							<label class="cfgdesc">Facebook App ID</label>
							<div>
							<input onclick="event.preventDefault();" size="60" type="text" id="fbAppID" value="'.$config->get('fbAppID').'" name="fbAppID" /><br />
							</div>
                                                        <label class="cfgdesc">Facebook Secret ID</label>
                                                        <div>
							<input onclick="event.preventDefault();" size="60" type="text" id="fbSecretID" value="'.$config->get('fbSecretID').'" name="fbSecretID" /><br />
							</div>
                                                        <label class="cfgdesc">Moderator Facebook UserID</label>
                                                        <div>
							<input onclick="event.preventDefault();" size="60" type="text" id="fbUserID" value="'.$config->get('fbUserID').'" name="fbUserID" /><br />
							<div class="cfgdesc">This is for moderator in FB Comment, you can put multiple moderators by inputting comma-separated Facebook UserIDs </div>

                                                        </div>
							</dt>
							<dd></dd>
						</dl>
					</div>';
							
$opt->add(
			array(
					'type' 	=> 'custom',
					'name' 	=> 'useComment',
					'value' => $commentsettings.$jomcomment_param.$intensedebate_param.$disqus_param.$facebook_param,
					'title' => 'Choose your Commenting System',
					'desc'  => ''
				)
		);

//========================================================================
		
/*$opt->add_section('Comments');
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'useComment',
					'value' => $config->get('useComment'),
					'title' => 'Integration with Jom Comment',
					'desc'  => 'Enable this if you would like to have Jom Comment integrations.'
				)
		);
		
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'enableJCDashboard',
					'value' => $config->get('enableJCDashboard'),
					'title' => 'Add Jom Comment locking in dashboard',
					'desc'  => 'Adds Jom Comment locking features in the dashboard and allow users to customize their blog to enable / disable comments.'
				)
		);
*/

$opt->add_section('Technorati Pings');
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'pingTechnorati',
					'value' => $config->get('pingTechnorati'),
					'title' => 'Ping Technorati',
					'desc'  => 'Automatically ping Technorati with each new blog post.Requires xmlrpc extension enabled in php.ini.(Blog RSS Feeds must be set to \'Yes\' for MyBlog tags to be picked up by Technorati)'
				)
		);
?>
	<div id="workflow"><?php echo $opt->get_html();?></div>
<?php			
////////////////////////////////////////////////////////////////////////////
// Layout tab
////////////////////////////////////////////////////////////////////////////
$opt    = null;

$opt    = new MYOptionSetup();
$opt->add_section('Main Page');
$opt->add(
			array(
					'type' 		=> 'select',
					'name' 		=> 'template',
					'value' 	=> $temp_lists,
					'selected'  => $config->get('template'),
					'size'      => 1,
					'title' 	=> 'Default My Blog Template',
					'desc'  	=> 'Select the default template for My Blog.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'overrideTemplate',
					'value' => $config->get('overrideTemplate'),
					'title' => 'Override Template',
					'desc'  => 'Enable template overriding. Your custom template must resided within /html/com_myblog/ folder of your currectly selected Joomla! template.'
				)
		);
$opt->add(
			array(
					'type' 		=> 'text',
					'name' 		=> 'numEntry',
					'value' 	=> $config->get('numEntry'),
					'size'      => 8,
					'maxlength' => 8,
					'title' 	=> 'No of entries per page',
					'desc'  	=> '&nbsp;'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'categoryDisplay',
					'value' => $config->get('categoryDisplay'),
					'title' => 'Show category',
					'desc'  => 'Display category which the entry is posted in.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'frontpageToolbar',
					'value' => $config->get('frontpageToolbar'),
					'title' => 'Show front page toolbar',
					'desc'  => 'Enable to show toolbar in My Blog\'s frontpage.'
				)
		);
$opt->add(
            array(
					'type' 		=> 'text',
					'name' 		=> 'dateFormat',
					'value' 	=> $config->get('dateFormat'),
					'size'      => 20,
					'maxlength' => 20,
					'title' 	=> 'Date Format',
					'desc'  	=> 'Works with the default template only. Set the date format that would appear in the blog entries. Format can be found at <a href="http://de.php.net/strftime" target="_blank">"PHP strftime"</a>'
                )
        );
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'enableBackLink',
					'value' => $config->get('enableBackLink'),
					'title' => 'Back link',
					'desc'  => 'Enable back link when viewing the blog.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'enablePdfLink',
					'value' => $config->get('enablePdfLink'),
					'title' => 'Enable PDF',
					'desc'  => 'Enable PDF link when viewing the blog.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'enablePrintLink',
					'value' => $config->get('enablePrintLink'),
					'title' => 'Enable Print Link',
					'desc'  => 'Enable Print link when viewing the blog.'
				)
		);

$opt->add_section('Avatar Settings');
$none 		= '';
$gravatar   = '';
$cb         = '';
$smf        = '';
$fireboard  = '';
$juser		= '';
$jomsocial	= '';

if($config->get('avatar') == 'none'){
	$none   = 'selected="selected"';
}elseif($config->get('avatar') == 'gravatar'){
	$gravatar = 'selected="selected"';
}elseif($config->get('avatar') == 'cb'){
	$cb     = 'selected="selected"';
}elseif($config->get('avatar') == 'smf'){
	$smf    = 'selected="selected"';
}elseif($config->get('avatar') == 'fireboard'){
	$fireboard  = 'selected="selected"';
}elseif($config->get('avatar') == 'juser'){
	$juser	= 'selected="selected"';
}elseif( $config->get('avatar') == 'jomsocial' ){
	$jomsocial= ' selected="selected"';
}
$customval  = '';
$customval  = '<select name="avatar" id="avatar" multiple="multiple" size="4">'
			. '	<option value="none"' . $none . '>None</option>'
			. '	<option value="gravatar"' . $gravatar . '>Gravatar</option>'
			. '	<option value="cb"' . $cb . '>Community Builder</option>'
			. '	<option value="smf"' . $smf . '>SMF Forum</option>'
			. '	<option value="fireboard"' . $fireboard . '>Fireboard</option>'
			. '	<option value="juser"' . $juser . '>JUser</option>'
			. '	<option value="jomsocial"' . $jomsocial . '>JomSocial</option>'
			. '</select>';

$opt->add(
			array(
					'type' 	=> 'custom',
					'name' 	=> 'avatar',
					'value' => $customval,
					'title' => 'Use Avatar',
					'desc'  => 'Select which avatar to display.If you do not want to use avatar,select &quot;none&quot;,otherwise you can select <a href="http://www.gravatar.com" target="_blank">Gravatar</a>.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'avatarWidth',
					'value' => $config->get('avatarWidth'),
					'size'  => 4,
					'maxlength' => 3,
					'title' => 'Avatar Width',
					'desc'  => 'Width of the avatar to display'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'avatarHeight',
					'value' => $config->get('avatarHeight'),
					'size'  => 4,
					'maxlength' => 3,
					'title' => 'Avatar Height',
					'desc'  => 'Height of the avatar to display'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'smfPath',
					'value' => $config->get('smfPath'),
					'size'  => 45,
					'maxlength' => 500,
					'title' => 'Path to SMF forum (if required)',
					'desc'  => 'Path to your SMF forum.(Example:C:/xampplite/htdocs/smf )'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'linkAvatar',
					'value' => $config->get('linkAvatar'),
					'title' => 'Link Avatar to profile',
					'desc'  => 'Links avatar image to respective profile.Only works if Community Builder or SMF forum profile avatar is enabled'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'useFullName',
					'value' => $config->get('useFullName'),
					'title' => 'Use full name',
					'desc'  => 'Choose to use full name or username of blogger for posts.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'mambotFrontpage',
					'value' => $config->get('mambotFrontpage'),
					'title' => 'Use mambots on My Blog frontpage',
					'desc'  => 'Select \'Yes\' to integrate mambots on My Blog frontpage, \'No\' to integrate only when user clicks on blog entry.'
				)
		);
$opt->add_section('Read More Settings');
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'useIntrotext',
					'value' => $config->get('useIntrotext'),
					'title' => 'Display Introtext',
					'desc'  => 'Enable if you want to display introtext instead of fulltext in the blog entries view.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'autoReadmorePCount',
					'value' => $config->get('autoReadmorePCount'),
					'size'  => 5,
					'maxlength' => 5,
					'title' => 'Default number of paragraph for default introtext',
					'desc'  => 'If no {readmore} is not used in content, select how many paragraph to be displayed as introtext.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'text',
					'name' 	=> 'readMoreLink',
					'value' => $config->get('readMoreLink'),
					'title' => 'Read More Link display',
					'desc'  => 'Customize the Read More link in the My Blog Frontpage. Only applies to certain templates that do not have a preset Read More link.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'disableReadMoreTag',
					'value' => $config->get('disableReadMoreTag'),
					'title' => 'Disable {readmore} tag and read more button',
					'desc'  => 'Disable {readmore} tag and button in editor. Force all introtext to be first X paragraph as defined above.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'necessaryReadmore',
					'value' => $config->get('necessaryReadmore'),
					'title' => 'Show Read More link only when necessary',
					'desc'  => 'Show Read More link only if there is fulltext in addition to introtext.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'anchorReadmore',
					'value' => $config->get('anchorReadmore'),
					'title' => 'Readmore Anchor',
					'desc'  => 'If enabled, clicking on read more link will automatically focus the view to the rest of the entry.'
				)
		);
// $opt->add_section('Bookmarking Settings');
// $opt->add(
// 			array(
// 					'type' 	=> 'checkbox',
// 					'name' 	=> 'showBookmarking',
// 					'value' => $config->get('showBookmarking'),
// 					'title' => 'Show Social bookmarking links',
// 					'desc'  => 'Show Social Bookmarking links when viewing blogs'
// 				)
// 		);
?>
	<div id="layout"><?php echo $opt->get_html();?></div>
<?php
////////////////////////////////////////////////////////////////////////////
// Dashboard tab
////////////////////////////////////////////////////////////////////////////
$opt    = null;
$opt    = new MYOptionSetup();
$opt->add_section('Configurations');
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'useGzipEditor',
					'value' => $config->get('useGzipEditor'),
					'title' => 'Enable Gzip version of TINYMCE editor',
					'desc'  => 'Enable Gzip version for TINYMCE editor. If you have troubles displaying editor, disable this option.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'defaultPublishStatus',
					'value' => $config->get('defaultPublishStatus'),
					'title' => 'Automatically set blog\'s status to publish',
					'desc'  => 'Set default publish status in Dashboard Write/Edit entry'
				)
		);
/*
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'useLoginForm',
					'value' => $config->get('useLoginForm'),
					'title' => 'Show Login Form if not logged in',
					'desc'  => 'If enabled ,a login form will show when a user that is not logged in tries to access the MyBlog Dashboard. This is an alternative for sites that do not have a login form enabled.'
				)
		);
*/
// $opt->add(
// 			array(
// 					'type' 	=> 'checkbox',
// 					'name' 	=> 'languageCompat',
// 					'value' => $config->get('languageCompat'),
// 					'title' => 'Language compatibilty mode',
// 					'desc'  => 'Enable this if you are having troubles with encoding issues in the Dashboard by disabling some AJAX functionality.'
// 				)
// 		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'useMCEeditor',
					'value' => $config->get('useMCEeditor'),
					'title' => 'Use HTML Editor',
					'desc'  => 'Enable this if you would like to have HTML editor enabled when writing an entry.'
				)
		);
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'enableAzrulVideoBot',
					'value' => $config->get('enableAzrulVideoBot'),
					'title' => 'Enable Video Embedding in dashboard',
					'desc'  => 'Enable video embedding in dashboard. Azrul Video Mambot required.'
				)
		);
$opt->add_section('Tags');
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'enableUserCreateTags',
					'value' => $config->get('enableUserCreateTags'),
					'title' => 'Allow bloggers to create tags through dashboard',
					'desc'  => 'Allow or disallow tag creations by bloggers from the dashboard.'
				)
		);
$opt->add_section('Google Gears');
$opt->add(
			array(
					'type' 	=> 'checkbox',
					'name' 	=> 'userUseGoGears',
					'value' => $config->get('userUseGoGears'),
					'title' => 'Allow blogger to use Google Gears',
					'desc'  => 'Enables Google gear option in bloggers preference page.'
				)
		);
?>
    <div id="mydashboard"><?php echo $opt->get_html();?></div>
    
<?php
////////////////////////////////////////////////////////////////////////////
// URL SEF
////////////////////////////////////////////////////////////////////////////
$opt    = null;
$opt    = new MYOptionSetup();
$opt->add_section('URL SEF');

$temp_lists = array();
$temp_lists[0] = '/myblog/[article title].html';
$temp_lists[1] = '/myblog/[blogger name]/[article title].html';

$opt->add(
			array(
					'type' 		=> 'select',
					'name' 		=> 'sefstyle',
					'value' 	=> $temp_lists,
					'selected'  => $config->get('sefstyle'),
					'size'      => 1,
					'title' 	=> 'Blog view url style',
					'desc'  	=> 'Select the default template for My Blog.'
				)
		);
			
		
?>
	<!-- <div id="sef_support"><?php echo $opt->get_html();?></div> -->
</div>
<input type="hidden" name="option" value="com_myblog">
<input type="hidden" name="task" value="savesettings">
<input type="hidden" name="boxchecked" value="0">
</form>
