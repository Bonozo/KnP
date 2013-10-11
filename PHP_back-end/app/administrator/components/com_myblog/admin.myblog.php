<?php
/**
 * @package		My Blog
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license http://www.azrul.com Copyrighted Commercial Software
 */
defined('_JEXEC') or die('Restricted access');

global $_MY_CONFIG, $jax;

require_once( JPATH_ROOT . DS . 'components' . DS . 'com_myblog' . DS . 'defines.myblog.php' );

jimport( 'joomla.filesystem.file' );
jimport( 'joomla.filesystem.folder' );

JTable::addIncludePath( JPATH_ROOT . DS  . 'components' . DS . 'com_myblog' . DS . 'table' );

if(!class_exists('AzrulJXCachedTemplate'))
{
	//include_once( JPATH_PLUGINS . DS . 'system' . DS . 'pc_includes' . DS . 'template.php' );
	include_once( MY_AZSYSBOT_PATH . DS . 'pc_includes' . DS . 'template.php' );
}

if(!defined('JAX_SITE_ROOT'))
{
	//include_once( JPATH_PLUGINS . DS . 'system' . DS . 'pc_includes' . DS . 'ajax.php' );
	include_once( MY_AZSYSBOT_PATH . DS . 'pc_includes' . DS . 'ajax.php' );
}

require_once( MY_COM_PATH . DS . 'functions.myblog.php' );
require_once( MY_ADMIN_COM_PATH . DS . 'config.myblog.php' );
require_once( MY_ADMIN_COM_PATH . DS . 'functions.admin.php' );

$_MY_CONFIG = new MYBLOG_Config();

$sectionid	= $_MY_CONFIG->sectionid;
$catid		= $_MY_CONFIG->catid;
$sections	= $_MY_CONFIG->get('managedSections');

if ($sections == "")
{
	$sections = "-1";
}

$jax	= new JAX( AZRUL_SYSTEM_LIVE. '/pc_includes' );
$jax->setReqURI( rtrim( JURI::root() , '/' ) . '/administrator/index.php' );

$task	= JRequest::getVar( 'task' , '' , 'REQUEST' );

if( $task && $task == 'azrul_ajax' )
{
	// Only include ajax file if needed
	require_once('ajax.myblog.php');
}
$jax->process();

$cid	= JRequest::getVar( 'cid' , 0 , 'REQUEST' );
$task	= JRequest::getVar( 'task' , '' , 'POST' );
$title	= '';

if(empty ($task))
{
	$task	= JRequest::getVar( 'task' , '' , 'GET');
}


if ($task == "xajax")
{
	showAjaxedAdmin();
}
else
{
	ob_start();
	showAjaxedAdmin($task);
	$panel = ob_get_contents();
	ob_end_clean();
	ob_start();

	$content = '';
	$title = '';
	switch ($task)
	{
		case "config" :
			$title = 'Configuration';
			showConfig();
			break;
		case "savesettings" :
			saveConfig();
			break;
		case "license":
			$title = 'License Agreement';
			showLicense();
			break;
		case "info" :
			showInfo();
			break;
		case "publish" :
		case "publishEntries" :
			publishBlog($cid, 1, $option);
			break;
		case "unpublish" :
		case "unpublishEntries" :
			publishBlog($cid, 0, $option);
			break;
		case "publishBots" :
			publishBots($cid, 1, $option);
			break;
		case "unpublishBots" :
			publishBots($cid, 0, $option);
			break;
		case "publishMambots" :
			publishMambots($cid, 1, $option);
			break;
		case "unpublishMambots" :
			publishMambots($cid, 0, $option);
			break;
		case "addBot" :
			addBot();
			break;
		case "saveBot" :
			saveBot();
			break;
		case "deleteBots" :
			deleteBots($cid, $option);
			break;
		case "frontpage" :
			frontpageBlog($cid, 1, $option);
			break;
		case "unfrontpage" :
			frontpageBlog($cid, 0, $option);
			break;
		case "category" :
			$title = 'Manage Tags';
			showCategories();
			break;
		case "about" :
			showAbout();
			break;
		case "orderup" :
		case "orderdown" :
			orderBot(intval($cid[0]), ($task == 'orderup' ? -1 : 1), $option, $client);
			break;
		case "install" :
			showInstallWizard();
			break;
		case "saveInstall" :
			saveInstall();
			break;
// 		case "exitInstall" :
// 			cmsRedirect("index2.php?option=com_myblog", "Installation complete.Thank you for using MyBlog!");
// 			break;
		case "remove":
		case "deleteEntries" :
			removeBlogs($cid);
			break;
		case "contentmambots" :
			$title = 'Content mambots integration';
			showMambots();
			break;
		case "maintenance":
			$title = 'Maintenance';
			showMaintenance();
			break;
		case "fixlinks":
			myFixLinks();
		    $mainframe	=& JFactory::getApplication();
		    
		    $mainframe->redirect( 'index.php?option=com_myblog&task=maintenance' , JText::sprintf('%1$s new permalinks added. %2$s permalinks modified.' , $new_permalinks , $modified_permalinks) );
			break;
		case "clearcache":
		    myClearCache();
		    $mainframe	=& JFactory::getApplication();
		    
		    $mainframe->redirect( 'index.php?option=com_myblog&task=maintenance' , JText::_('Cache cleared') );
		    break;
		case 'fixdashboardlinks':
			myFixDashboardLinks();
		    $mainframe	=& JFactory::getApplication();
		    
		    $mainframe->redirect( 'index.php?option=com_myblog&task=maintenance' , JText::_('My Blog dashboard link fixed') );
			break;
		case "fixIntrotext":
			fixIntrotext();
			break;
		case 'latestnews':
			/**
		     * Show latest news for My Blog
		     **/
	    	$title = "Latest updates";
			showLatestNews();
			break;
		case 'dashboard':
			/**
		     * Show dashboard
		     **/
			//showDashboard();
			showNewDashboard();
			break;
		case "blogs" :
		default :
			$title = 'List blog entries';
			showBlogs();
			break;
	}

	$content = ob_get_contents();
	ob_end_clean();
	$content = str_replace(array('{CONTENT}', '{TITLE}'), array($content, $title), $panel);
	echo $content;
}

function showAjaxedAdmin($task)
{
	echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"" . MY_COM_LIVE . "/css/admin_style.css\" />";
		
	global $jax;
?>
	<script src="<?php echo rtrim( JURI::root() , '/' ); ?>/includes/js/tabs/tabpane_mini.js" type="text/javascript"></script> 
	<?php echo $jax->getScript();?> 
	<style type="text/css">
		.loading { 
		font-family:Verdana,Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:#000000;background-color:#FFFF99;padding:4
		ppublishBlog( $cid=null,$publish=1,$option )x 16px;
		top:0px;
		right:0px;
		} --> 
	</style> 
		<table width="100%" border="0" cellspacing="4" cellpadding="6" align="left">
		<tr> <td width="10%" valign="top" align="left">
		<?php showSidePanel(); ?> 
		</td> 
		<td width="90%" valign="top" align="left">
				<div id="mainAdminContent">
				    <img src="<?php echo rtrim( JURI::root() , '/' ); ?>/administrator/components/com_myblog/logo.png" />
					<h1>{TITLE}</h1>
				<div>{CONTENT}</div>
			</td> 
		</tr> 
		</table> 
<?php
}

/**
 * Publish selected blog entry
 */ 
function publishBlog($cid = null, $publish = 1, $option)
{
	$db			=& JFactory::getDBO();
	$mainframe	=& JFactory::getApplication();
	
	if (!is_array($cid) || count($cid) < 1)
	{
		$action = $publish ? 'publish' : 'unpublish';
		echo "<script> alert('Select an item to $action');window.history.go(-1);</script>\n";
		exit;
	}
	
	$cids = implode(',', $cid);
	$db->setQuery("UPDATE #__content SET state='$publish' WHERE id IN ($cids)");
	$db->query();

	$mosmsg = $publish ? 'Blog entries published' : 'Blog entries unpublished';
	$server_string = htmlspecialchars($_SERVER['QUERY_STRING'], ENT_QUOTES);
	$server_string = str_replace('&amp;', '&',$server_string); 				
	$server_string = preg_replace('/(&mosmsg=.*)/', '', $server_string);

	$mainframe->redirect( 'index.php?' . $server_string , urlencode( $mosmsg ) );
}


/**
 *	Publish selected Mambots
 */ 
function publishMambots($cid = null, $publish = 1, $option)
{
	$mainframe	=& JFactory::getApplication();
	$db			=& JFactory::getDBO();
	
	if (!is_array($cid) || count($cid) < 1)
	{
		$action = $publish ? 'publish' : 'unpublish';
		echo "<script> alert('Select an item to $action');window.history.go(-1);</script>\n";
		exit;
	}
	$cids = implode(',', $cid);
	
	$query	= "UPDATE #__myblog_mambots SET my_published='$publish' WHERE mambot_id IN ($cids)";
	$db->setQuery( $query );
	$db->query();
	
	$message	= 'Plugins ';
	$message	.= ( $publish ) ? 'published' : 'unpublished';
	
	$mainframe->redirect( 'index.php?option=com_myblog&task=contentmambots' , $message );
}

/**
 *	Show List of tags
 */
function showCategories()
{
	global $_MY_CONFIG;

	$db		=& JFactory::getDBO();
	
	$db->setQuery("SELECT * FROM #__myblog_categories ORDER BY name ASC");
	$rows = $db->loadObjectList();
	
	$jq		= rtrim( JURI::root() , '/' ) . '/administrator/components/com_myblog/js/jquery-1.2.6.pack.js';
	
?>
<script src="<?php echo $jq;?>" type="text/javascript"></script>
<script type="text/javascript">

jQuery.noConflict();
jQuery(document).ready(
	function() {
 		showEditLink();
 		showEditSlug();
 		bindDefaultLink();
	}
);

function bindDefaultLink(){
	jQuery('.defaultTag, .notDefaultTag').each(function(){
		jQuery(this).click(function(){
			setDefaultTag(jQuery(this));
		});
	});
}

function setDefaultTag(obj){
	var id	= obj.parent().parent().find('span.tagname').attr('orgid');
	
	var set	= '0';
	
	if(obj.hasClass('defaultTag')){
		obj.parent().append('<a href="javascript:void();" class="notDefaultTag"></a>');
		obj.remove();
	} else {
		obj.parent().append('<a href="javascript:void();" class="defaultTag"></a>');
		obj.remove();
		set	= '1';
	}
	jax.call('myblog', 'myxSetDefaultCategory', id, set);
	bindDefaultLink();

}

function showEditLink(){
	jQuery('#categoryTable tr span.editlink').each(function() {
		var orgId	= jQuery(this).attr('orgid');
		var orgVal	= jQuery(this).attr('orgval');

		if(jQuery('#categoryTable tr span.tagname input') != null){
	
			orgVal	= orgVal.replace(/\'/g,'\\\'');
			
			var edit	= '<a href="javascript:void(0);" onclick="editTag(\'' + orgId +'\',\'' + orgVal +'\')">Edit</a>';
			edit	+= '<span class="errornotice"></span>';
			jQuery(this).html(edit);
		}
	});
}

function showEditSlug(){
	jQuery('#categoryTable tr span.editslug').each(function() {
		var orgId	= jQuery(this).attr('orgid');
		var orgVal	= jQuery(this).attr('orgval');

		if(jQuery('#categoryTable tr span.slugname input') != null){
			var edit	= '<a href="javascript:void(0);" onclick="editSlug(\'' + orgId +'\',\'' + orgVal +'\')">Edit</a>';
			edit	+= '<span class="errornotice"></span>';
			jQuery(this).html(edit);
		}
	});
}

function editTag(id, value){

	// restore old values from 'orgval' attr
	jQuery('#categoryTable tr span.tagname input').each(function() {
		// Restore edit link
		showEditLink();

		jQuery(this).parent().html(jQuery(this).parent().attr('orgval'));
	});

	// Add the input, save & cancel button
	var html = '<input type="text" id="tag" value="' + value + '" size="30" />';
	html 	+= '<a href="javascript:void(0);" class="saveTag">Save</a> | ';
	html 	+= '<a href="javascript:void(0);" class="cancelSaveTag">Cancel</a>';
	jQuery('#row' + id + ' span span.tagname').html(html);
	jQuery('#row' + id + ' span.editlink').html('');
	// set focus to current input box
	jQuery('#tag').focus();
	
	// Bind save button
	jQuery('#categoryTable tr span.tagname a:first').unbind('click');
	jQuery('#categoryTable tr span.tagname a:first').click(function () {
		var newTag = jQuery(this).prev().val();
		jQuery(this).parent().attr('orgval', newTag);
			
		jQuery('#categoryTable tr span.tagname input').each(function() {
			jQuery(this).parent().html(jQuery(this).parent().attr('orgval'));
		});

		if(newTag == value){
			showEditLink();
			return;
		}
		jax.call('myblog','myxUpdateCategory',id, newTag, value);
		showEditLink();
    });

	// Bind the cancel button
	jQuery('#categoryTable tr span.tagname a:last').unbind('click');
	jQuery('#categoryTable tr span.tagname a:last').click(function () {
		jQuery('#categoryTable tr span.tagname input').each(function() {
			jQuery(this).parent().html(jQuery(this).parent().attr('orgval'));
		});
		showEditLink();
	});
}

function editSlug(id, value){
	
	// restore old values from 'orgval' attr
	jQuery('#categoryTable tr span.slugname input').each(function() {
		// Restore edit link
		showEditSlug();
		
		jQuery(this).parent().html(jQuery(this).parent().attr('orgval'));
	});

	// Add the input, save & cancel button
	var html = '<input type="text" id="slug" value="' + value + '" size="30" />';
	html 	+= '<a href="javascript:void(0);" class="saveTag">Save</a> | ';
	html 	+= '<a href="javascript:void(0);" class="cancelSaveTag">Cancel</a>';
	jQuery('#row' + id + ' span span.slugname').html(html);
	jQuery('#row' + id + ' span.editslug').html('');
	// set focus to current input box
	jQuery('#slug').focus();
	
	// Bind save button
	jQuery('#categoryTable tr span.slugname a:first').unbind('click');
	jQuery('#categoryTable tr span.slugname a:first').click(function () {
		var slug	= jQuery(this).prev().val();
		jQuery(this).parent().attr('orgval', slug);
		
		jQuery('#categoryTable tr span.slugname input').each(function() {
			var val	= jQuery(this).parent().attr('orgval');
			
			// We know we dont allow '
			val		= val.replace(/\'/g,'');
			jQuery(this).parent().html(val);
		});

		if(slug == value){
			showEditSlug();
			return;
		}
		jax.icall('myblog','myxUpdateSlug',id, slug, value);
		showEditSlug();
    });

	// Bind the cancel button
	jQuery('#categoryTable tr span.slugname a:last').unbind('click');
	jQuery('#categoryTable tr span.slugname a:last').click(function () {
		jQuery('#categoryTable tr span.slugname input').each(function() {
			jQuery(this).parent().html(jQuery(this).parent().attr('orgval'));
		});
		showEditSlug();
	});
}

function addTagRow(tagName, slug , rowId, hasDefault){
	var rowClass	= jQuery('#categoryTable tr:last').hasClass('row0') ? 'row1' : 'row0';

	var html = '<tr id="row' + rowId + '" class="' + rowClass + '">';

	slug	= slug.replace(/\'/g,'\\\'');
	slug	= slug.replace(/\"/g,'\\"');
	slug	= slug.replace(/\\/g,'\\\\');
	slug	= slug.replace(/\0/g,'\\0');
	
	if(hasDefault == '1'){
		html += '<td align="center"><a href="javascript:void(0);" class="notDefaultTag">X</a></td>';
	}
	html += '<td><span onclick="if(confirm(\'Are you sure you want to remove the tag?\\nRemoving tag will also remove the tags assigned to the blogs\'))jax.icall(\'myblog\',\'myxDeleteCategory\',\'' + rowId + '\');" class="CommonTextButtonSmall">Delete</span></td>';
	html += '<td>';
	html += '	<span>';
	html += '		<span class="tagname" orgval="' + tagName + '" orgid="' + rowId + '">' + tagName + '</span>';
	html += '		<span class="editlink" orgval="' + tagName + '" orgid="' + rowId + '">'+ tagName;
	html += '		<a href="javascript:void(0);"></a>';
	html += '		</span>';
	html += '	</span>';
	html += '</td>';
	html += '<td>';
	html += '	<span>';
	html += '		<span class="slugname" orgval="' + slug + '" orgid="' + rowId + '">' + slug;
	html += '			<a href="javascript:void(0);"></a>';
	html += '		</span>';
	html += '		<span class="editslug" orgval="' + slug + '" orgid="' + rowId + '">'
	html += '			<a href="javascript:void(0);"></a>';
	html += '		</span>';
	html += '	</span>';
	html += '</td>';
	html += '</tr>';
	
	jQuery('#categoryTable').append(html);
	
 	showEditLink();
 	showEditSlug();
 	bindDefaultLink();
	
}
</script>
<div class="myInfo">
	Use this page to create / delete and edit tags which can then be assigned into your blog entries.<strong>Tag Slugs</strong> are actually
	an alternative text which will be used in the URL. This prevents My Blog from searching incorrect tags due to special encoded
	characters.
</div>
<h3 id="tagnotice"></h3>
<span id="categoryerror" class="errorMsg"></span>
<table width="100%" border="0" cellpadding="0" cellspacing="0" class="adminlist"> 
	<thead> 
		<tr> 
<?php if($_MY_CONFIG->get('allowDefaultTags')): ?>
			<th width="10%" style="text-align: center;">Default</th>
<?php endif; ?>
			<th width="10%" scope="col">Action</th>
			<th width="39%" scope="col">Tag</th> 
			<th width="39%">Slug</th>
		</tr>
	</thead>
	<tbody id="categoryTable">
<?php
		$i	= 0;
		
		foreach ($rows as $row)
		{
			$tagObj	=& JTable::getInstance( 'Tag' , 'myblog' );
			$tagObj->load($row->id);
 
?>
		<tr id="row<?php echo $row->id; ?>" class="row<?php echo $i;?>">
<?php if($_MY_CONFIG->get('allowDefaultTags')): ?>
			<td align="center">
			<?php if($row->default && $row->default == '1'){ ?>
				<a href="javascript:void(0);" class="defaultTag">X</a>
			<?php } else {?>
				<a href="javascript:void(0);" class="notDefaultTag">X</a>
			<?php } ?>
<?php endif; ?>
			</td>
			<td>
				<span onclick="if(confirm('Are you sure you want to remove the tag?\nRemoving tag will also remove the tags assigned to the blogs')) jax.call('myblog','myxDeleteCategory','<?php echo $row->id;?>');" class="CommonTextButtonSmall">Delete</span>
			</td>
			<td>
				<span>
					<span class="tagname" orgval="<?php echo $row->name; ?>" orgid="<?php echo $row->id;?>">
						<?php echo $row->name; ?>
					</span>
					
					<span class="editlink" orgval="<?php echo $row->name; ?>" orgid="<?php echo $row->id;?>">
						<a href="javascript:void(0);"></a>
					</span>
				</span>
			</td>
			<td>
				<span>
					<span class="slugname" orgval="<?php echo $tagObj->getSlug(); ?>" orgid="<?php echo $row->id;?>">
						<?php echo $tagObj->getSlug(); ?>
					</span>
					<span class="editslug" orgval="<?php echo $tagObj->getSlug(); ?>" orgid="<?php echo $row->id;?>">
						<a href="javascript:void(0);"></a>
					</span>
				</span>
			</td>
		</tr>
<?php
		$i	= ($i > 0) ? 0 : 1;
	} 
?>
	</tbody>
</table>
<p> 
<form action="" method="post" name="formNewCat" id="formNewCat" onsubmit="jax.call('myblog','myxAddCategory',document.getElementById('newCat').value);return false;"> 
<input name="newCat" id="newCat" type="text" class="CommonTextButtonSmall" size="48" maxlength="48"> 
<span class="CommonTextButtonSmall" onclick="jax.call('myblog','myxAddCategory',document.getElementById('newCat').value);">Add New Tag</span>
&nbsp;&nbsp;
</form>
</p>
<?php
	}

function fixIntrotext()
{
	global $_MY_CONFIG;
	
	$db		=& JFactory::getDBO();
	$db->setQuery("SELECT id,`fulltext` FROM #__content WHERE sectionid IN ($sections) and `introtext` = '' ");
	$rows	= $db->loadObjectList();

	$num_fixed = 0;

	if ($rows and count($rows)>0)
	{
		foreach ($rows as $row)
		{
			$id = $row->id;
			$fulltext = $row->fulltext;
		
			# get introtext (first X characters)
			$introtext = getIntrotext($fulltext, $_MY_CONFIG->get('introLength'), '{readmore}');
		
			# get fulltext (fulltext - introtext)
			$fulltext = JString::substr($fulltext, strlen($introtext));
		
			$db->setQuery("UPDATE #__content SET `introtext`='$introtext', `fulltext`='$fulltext' WHERE id='$id'");
			$db->query();
			
			$num_fixed++;
		}
	}
	$mainframe->redirect( 'index.php?option=com_myblog&task=maintenance' , JText::_('%1$s entries fixed' , $num_fixed) );
}

function myFixLinks()
{
	global $_MY_CONFIG;

	$db			=& JFactory::getDBO();
	$sections	= $_MY_CONFIG->get( 'managedSections' );
	
	// Fix content entries without permalinks
	$db->setQuery("SELECT c.id,c.title,p.contentid FROM #__content as c LEFT OUTER JOIN #__myblog_permalinks as p ON ( c.id=p.contentid ) WHERE p.contentid IS NULL and c.sectionid IN ($sections)");
	$rows = $db->loadObjectList();
	
	$new_permalinks = 0;
	if ($rows)
	{
		$new_permalinks = count($rows);

		foreach ($rows as $row)
		{
			// remove unwanted chars
			$title = $row->title;
			$link = myTitleToLink(trim($title . ".html"));

			//removes unwanted character from url including !.
			$link = preg_replace('/[!@#$%\^&*\(\)\+=\{\}\[\]|\\<">,\\/\^\*;:\?\'\\\]/', "", $link);

			$db->setQuery("SELECT * from #__myblog_permalinks WHERE permalink='$link' and contentid!='$row->id'");
			$linkExists = $db->loadResult();
			
			if ($linkExists)
			{
				// remove unwanted chars
				$link = myTitleToLink(trim($title));
				//$link = preg_replace('/[!@#$%\^&*\(\)\+=\{\}\[\]|\\<">,\\/\^\*;:\?\'\\\]/', "", $link);

				$plink = "$link-$uid.html";
				$db->setQuery("SELECT contentid from #__myblog_permalinks WHERE permalink='$plink' and contentid!='$row->id'");
				$count = 0;
				while ($db->loadResult())
				{
					$count++;
					$plink = "$link-{$row->id}-$count.html";
					$db->setQuery("SELECT contentid from #__myblog_permalinks WHERE permalink='$plink' and contentid!='$row->id'");
				}
				$db->setQuery("INSERT INTO #__myblog_permalinks SET permalink='$plink',contentid='$row->id'");
				$db->query();
			}
			else
			{
				//$link = urlencode($link);
				$db->setQuery("INSERT INTO #__myblog_permalinks SET permalink='$link',contentid='$row->id'");
				$db->query();
			}
		}
	}

	# ensure all permalinks are  'safe'
	$db->setQuery("SELECT contentid, permalink from #__myblog_permalinks");
	$permalinks = $db->loadObjectList();
	$modified_permalinks = 0;

	if ($permalinks)
	{
		$modified_permalinks = count($permalinks);

		foreach ($permalinks as $permalink)
		{
			$uid = $permalink->contentid;
			$link = $permalink->permalink;
			$link = myTitleToLink(trim($link));

			$db->setQuery("SELECT * from #__myblog_permalinks WHERE permalink='$link' and contentid!='$uid'");
			$linkExists = $db->loadResult();

			if ($linkExists)
			{ # if link exists, find a unique permalink

				// remove unwanted characters
				//$link = preg_replace('/[!@#$%\^&*\(\)\+=\{\}\[\]|\\<">,\\/\^\*;:\?\'\\\]/', "", $link);
				//$link = myTitleToLink(trim($title));

				if (substr($link, strlen($link)-5, 5)==".html")
				$link = substr($link, 0, strlen($link)-5);

				$plink = "$link-$uid.html";
				$db->setQuery("SELECT contentid from #__myblog_permalinks WHERE permalink='$plink' and contentid!='$uid'");
				$count = 0;

				while ($db->loadResult())
				{
					$count++;
					$plink = "$link-$uid-$count.html";
					$db->setQuery("SELECT contentid from #__myblog_permalinks WHERE permalink='$plink' and contentid!='$uid'");
				}

				$db->setQuery("UPDATE #__myblog_permalinks SET permalink='$plink' WHERE contentid='$uid'");
				$db->query();
			}
			else
			{
				$db->setQuery("UPDATE #__myblog_permalinks SET permalink='$link' WHERE contentid=$uid");
				$db->query();
			}
		}
	}
}

function showMaintenance()
{
	require_once( MY_ADMIN_COM_PATH . DS . 'admin.myblog.html.php' );
	
	myAdminMaintenance();
?>	
	&nbsp;&nbsp;
<?php
}

/**
 * Show latest news from our RSS Feeds
 */
function showLatestNews()
{
	jimport('simplepie.simplepie');

	// Variables declarations that will be used in this function
	$url    = 'http://support.azrul.com/rss/index.php?_m=news&_a=view&group=default';
			
	$feed = new SimplePie();
	$feed->set_feed_url( $url );
	$feed->init();
		
	$limit	= 20;
	$items	= $feed->get_items( 0, $limit );

	$html	= "<div style=\"width:640px;\"><p>";

	if( $items )
	{
		for($i = 0; ($i < count($items) && ($i<$limit)); $i++)
		{
			$item	=& $items[$i];
			$html	.= "<div style=\"padding:8px;border-bottom:1px dotted #666666;\">";
			$html	.= "<div style=\"font-weight:bold\">";
			$html	.= "<a parent=\"_blank\"href=\"" . $item->get_permalink() . "\">" . $item->get_title() . "</a></div>"
			. "<div>" . $item->get_date('j M y') . "</div><div>" . $item->get_content() . "</div></div>";
		}
	}
	else
	{
		$html	.= "Sorry: It's not possible to reach RSS file $url\n<br />";
	}


	$html	.= "</p></div>";

	echo $html;
}

/**
 *	Shows Configuration sEttings page
 */ 
function showConfig()
{
	$db		=& JFactory::getDBO();
	
	require_once( MY_ADMIN_COM_PATH . DS . 'config.myblog.php' );

	$config = new MYBLOG_Config();

	echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"" . MY_COM_LIVE ."/css/admin_style.css\" />";

	$file_list = JFolder::folders( MY_TEMPLATE_PATH );

	$t_list		= array ();
	$temp_lists	= array();

	$filecount	= 0;
	
	foreach ($file_list as $val)
	{
		if (!strstr($val, "svn") and !strstr($val, "admin") and !strstr($val, "_default"))
		{
			$t_list[] = JHTML::_('select.option',  $val, $val);
			$temp_lists[$val]    = $val;
		}
	}

	$templates = JHTML::_('select.genericlist',   $t_list, 'template', 'class="inputbox" size="1"','value', 'text', $config->get('template'));

	$sql = (JVERSION >= 1.6) 
			? "SELECT id,title FROM #__categories WHERE extension='com_content'  ORDER BY title ASC"
			: "SELECT id,title FROM #__sections ORDER BY title ASC";

	$db->setQuery($sql);
	$rows 		= $db->loadObjectList();
	$sect_rows	= count($rows);

	$managedSections 	= "<select name=\"managedSections[]\" size=\"" . count($rows) . "\" multiple>";
	$sectionid 			= $config->get('postSection');
	$catid 				= $config->get('catid');
	$sectionsArray		= explode(",", $config->get('managedSections'));

	array_walk($sectionsArray, "trim");

	#Get the list of the sections
	$sect_lists	= array();

	#Get the selected section lists.
	$sel_sect_lists = array();

	#var_dump($rows);
	if ($rows)
	{
		foreach ($rows as $row)
		{
			$managedSections .= "<option value='$row->id' ";
		
			if (in_array($row->id, $sectionsArray))
			{
				$managedSections .= "selected";
				$sel_sect_lists[]   = $row->id;
			}
			$managedSections .= ">$row->title</option>";
			$sect_lists[$row->id]   = $row->title;
		}
	}
	$managedSections .= "</select>";
	
	$sql = (JVERSION >= 1.6) 
			? "SELECT id,title FROM #__categories WHERE extension='com_content'  ORDER BY title ASC"
			: "SELECT id,title FROM #__sections ORDER BY title ASC";
	
	$db->setQuery($sql);
	$rows 			= $db->loadObjectList();
	$sect_rows 		= count($rows);
	$postInSection	= "<select name=\"postSection\">"; // Post entries in section
	$postSection	= $config->get('postSection');

	#Get the section lists so that we can display it to user to
	#select which section to save new entries at.
	$save_sect_lists    = array();
	
	if($rows)
	{
		foreach ($rows as $row)
		{
			$postInSection .= "<option value='$row->id' ";
			
			if ($postSection == $row->id)
			{
				$postInSection .= "selected";
			}
			
			$postInSection .= ">$row->title</option>";
			$save_sect_lists[$row->id]  = $row->title;
		}
	}
	$postInSection .= "</select>";

// 	$lang_file_list = JFolder::files( MY_COM_PATH . DS . 'language' );
// 
// 	$lang_list 			= array ();
// 	$lang_filecount 	= 0;
// 	$lang_lists 		= array();
// 	
// 	foreach ($lang_file_list as $val)
// 	{
// 		if (!strstr($val, "svn") and substr($val, strlen($val)-4, 4)==".php")
// 		{
// 			$lang_list[] = JHTML::_('select.option', $val,substr($val, 0, strlen($val)-4));
// 			$lang_lists[$val] = substr($val,0,-4);
// 		}
// 	}
// 
// 	$lang_files = JHTML::_('select.genericlist',   $lang_list, 'language', 'class="inputbox" size="1"','value', 'text', $config->get('language'));

	#Load the html data from config_template.php file
	include( MY_ADMIN_COM_PATH . DS . 'templates' . DS . 'config_template.php' );
}

/**
 *	Save configuration settings
 */ 
function saveConfig()
{
	$db		=& JFactory::getDBO();
	
	require_once( MY_ADMIN_COM_PATH . DS . 'config.myblog.php' );
	$config = new MYBLOG_Config();
	$note	= "";

	# Disable technorati pings if xmlrpc extension not found
	if (!function_exists('xmlrpc_encode_request'))
	{
		$note = "Note:x-m-l RPC extension in PHP is disabled.Ping Technorati set to 0";
	}

	$config->save();
	$config				= new MYBLOG_Config();
	$managedSections	= $config->get('managedSections');
	$sections			= $managedSections;

	# Fix content entries without permalinks
	$db->setQuery("SELECT c.id,c.title,p.contentid FROM #__content as c LEFT OUTER JOIN #__myblog_permalinks as p ON ( c.id=p.contentid ) WHERE p.contentid IS NULL and c.sectionid IN ($sections)");
	$rows = $db->loadObjectList();
	
	if ($rows)
	{
		foreach ($rows as $row)
		{
			// remove unwanted chars
			$title = $row->title;
			$link = myTitleToLink(trim($title . ".html"));

			$db->setQuery("SELECT * from #__myblog_permalinks WHERE permalink='$link' and contentid!='$row->id'");
			$linkExists = $db->loadResult();
			if ($linkExists)
			{
				// remove unwanted chars
				$link = myTitleToLink(trim($title));
				$plink = "$link-$uid.html";
				$db->setQuery("SELECT contentid from #__myblog_permalinks WHERE permalink='$plink' and contentid!='$row->id'");
				
				$count = 0;
				while ($db->loadResult())
				{
					$count++;
					$plink = "$link-{$row->id}-$count.html";
					$db->setQuery("SELECT contentid from #__myblog_permalinks WHERE permalink='$plink' and contentid!='$row->id'");
				}
				//$plink = urlencode($plink);
				$db->setQuery("UPDATE #__myblog_permalinks SET permalink='$plink' WHERE `contentid`='$row->id'");
				$db->query();
			}
			else
			{
				$db->setQuery("INSERT INTO #__myblog_permalinks SET permalink='$link',contentid='$row->id'");
				$db->query();
			}
		}
	}
	$mainframe	=& JFactory::getApplication();
	
	$mainframe->redirect( 'index.php?option=com_myblog&task=config' , $note );
}

	function showNewDashboard()
	{
?>
		<link href="<?php echo MY_COM_LIVE; ?>/css/azwindow.css" rel="stylesheet" type="text/css" />
		<link href="<?php echo MY_COM_LIVE; ?>/css/style.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="<?php echo MY_COM_LIVE; ?>/css/ui.css" type="text/css" media="screen" />
		<script type="text/javascript" language="javascript" src="<?php echo MY_COM_LIVE; ?>/js/myblog.js"></script>
<?php
	}
	
/**
 *	Show My Blog backend's side panel
 */ 
function showSidePanel()
{
	global $jax;
	
	$mainframe	=& JFactory::getApplication();
	
	$jax		= new JAX( AZRUL_SYSTEM_LIVE. '/pc_includes' );
	$jax->setReqURI( rtrim( JURI::root() , '/' ) . '/administrator/index.php?tmpl=component' );
	
	// Try login user.
	$user		=& JFactory::getUser();
	$db			=& JFactory::getDBO();
	showNewDashboard();
	
	$strSQL	= "SELECT session_id FROM #__session WHERE `userid`={$user->id}";
	$db->setQuery( $strSQL );
	$userId		= $user->id;
	$sessionId	= $db->loadResult();
	
	$link		= rtrim( JURI::root() , '/') . '/index.php?option=com_myblog&tmpl=component&task=write&tmpl=component&no_html=1&id=0&session=' . $userId . ':' . $sessionId;
?> 
	<link rel="stylesheet" type="text/css" href="<?php echo MY_COM_LIVE;?>/css/niftyCorners.css"> 
	<script type="text/javascript" src="<?php echo MY_COM_LIVE;?>/js/nifty.js"></script> 
	<script type="text/javascript"> window.onload=function(){ if(!NiftyCheck()) return;Rounded("div#sideNav","all","#FFF","#F8F8F8","border #ccc");} 
	</script> <div class="loading" id="loadingDiv" style="display:none;"> 
	<img src="<?php echo MY_COM_LIVE;?>/images/busy.gif" width="16" height="16" align="absmiddle">&nbsp;Loading...</div> 
	<div style="background-color:#F8F8F8" id="sideNav">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td scope="col"> 
				<div><h3 align="center">Admin Panel</h3></div>
				<div class="sideNavTitle"><img hspace="2" style="vertical-align: middle;" src="components/com_myblog/images/Options_16x16.gif"/>Configuration</div> 
				<div class="sideNavContent"> <p><a href="index.php?option=com_myblog&task=config">General Settings </a></p>
	 			<p><a href="index.php?option=com_myblog&task=category">Tags</a></p> 
	 			<p><a href="index.php?option=com_myblog&task=contentmambots">Content Mambots Integration</a></p>
				<p><a href="index.php?option=com_myblog&task=maintenance">Maintenance</a></div> 
	 			
				<div class="sideNavTitle"><img hspace="2" style="vertical-align: middle;" src="components/com_myblog/images/Documents_16x16.gif"/>Manage Blog Entries</div>
				<div class="sideNavContent"> 
				<p><a href="javascript:void(0);" onclick="myAzrulShowWindow('<?php echo $link; ?>');">Write New Entry</a></p>
				<p><a href="index.php?option=com_myblog&task=blogs&limitstart=0" >View all </a></p> 
				<p><a href="index.php?option=com_myblog&task=blogs&limitstart=0&publish=0" >View unpublished entries</a></p> 
	 			</div>
	 
	 			<div class="sideNavTitle"><img hspace="2" style="vertical-align: middle;" src="components/com_myblog/images/Information_16x16.gif"/>About / Support </div> <div class="sideNavContent"> 
	 			<p><a href="index.php?option=com_myblog&task=about">About My Blog </a></p> 
				<p><a href="index.php?option=com_myblog&task=latestnews">Check for latest news</a></p>
				<p><a href="index.php?option=com_myblog&task=license">License Information</a> </p> 
				</div>
			</td>
		</tr>
	</table>
	</div>
	
	<p align="center">

<?php
	$parser		=& JFactory::getXMLParser('Simple');

	$path		= MY_ADMIN_COM_PATH . DS  . 'myblog.xml';
	$parser->loadFile($path);
	$document	=& $parser->document;
	
	$version	= 'N/A';

	$element	=& $document->getElementByPath('version' , 1 );
	$version	= isset( $element ) ? $element->data() : '';
	
	echo JText::sprintf( 'Version: %1$s' , $version );
?>
	</p>
<?php
}

/**
 *	View list of blog entries
 */ 
function showBlogs()
{
	global $_MY_CONFIG;

	$db		=& JFactory::getDBO();

	require_once( MY_COM_PATH . DS . "functions.myblog.php");
	require_once( MY_ADMIN_COM_PATH . DS . "config.myblog.php");

	$_MY_CONFIG = new MYBLOG_Config();
	$mainframe	=& JFactory::getApplication();
	
	$limit 		= intval( $mainframe->getUserStateFromRequest( "viewlistlimit",'limit',$mainframe->getCfg('list_limit') ) );
	$limitstart = intval( $mainframe->getUserStateFromRequest( "view{com_myblog}limitstart",'limitstart',0 ) );
	$search 	= $mainframe->getUserStateFromRequest("search{com_myblog}", 'search', '');
	$search 	= $db->getEscaped(trim(strtolower($search)));

	$publish = "";

	if (isset ($_GET['publish']))
		$publish = intval($_GET['publish']);

	$where = array ();
	if ($search)
	{
		$where[] = "LOWER(comment) LIKE '%$search%'";
	}

	if(is_int($publish))
	{
		$where[] = "STATE=$publish";
	}
	$where[] = (JVERSION >= 1.6) 
			? "catid IN (" . $_MY_CONFIG->get('managedSections') . ")"
			: "sectionid IN (" . $_MY_CONFIG->get('managedSections') . ")";

	$db->setQuery("SELECT count(*) FROM #__content" . (count($where) ? "\nWHERE " . implode(' AND ', $where) : ""));
	$total = $db->loadResult();
	

	$pagination	= myPagination($total, $limitstart , $limit);
	
	$limitQuery	=  '';
	
	if( $pagination->limit != 0 )
	{
		$limitQuery	=  "\nLIMIT $pagination->limitstart,$pagination->limit";
	}
	
	
	$db->setQuery("SELECT * FROM #__content" . (count($where) ? "\nWHERE " . implode(' AND ', $where) : "") . "\n ORDER BY id DESC " . $limitQuery );
	$rows = $db->loadObjectList();
	$total = count($rows);

	$user	=& JFactory::getUser();
	
	$strSQL	= "SELECT session_id FROM #__session WHERE `userid`={$user->id}";
	$db->setQuery( $strSQL );

	$userId		= $user->id;
	$sessionId	= $db->loadResult();
?>
<script type="text/javascript" language="javascript">
function toggleEntry(id){
	var entry	= document.getElementById(id + '_content');
	
	if(entry.style.display == 'none')
		entry.style.display	= '';
	else
		entry.style.display = 'none';
}
</script>
<form action="index.php?<?php echo htmlspecialchars($_SERVER['QUERY_STRING'],ENT_QUOTES); ?>" method="POST" name="adminForm">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="adminlist">
		<thead>
		<tr>
			<th width="2%" class="title">
				<input type="checkbox" name="toggle" value="" onclick="checkAll(<?php echo count( $rows );?>);" />
			</th>
			<th width="10%">Date</th>
			<th width="25%">Title</th>
			<th width="5%">Published</th>
			<th width="5%">Edit</th>
			<th width="30%">Tags</th>
			<th width="20%">Author</th>
		</tr>
		</thead>
		<tbody>
<?php
		$i=0;$n=1;
		if ($rows) {
			foreach($rows as $row){
				$task=$row->state ? 'unpublish':'publish';
				//$img=$row->state ? 'publish_g.png':'publish_x.png';
				if(JVERSION >= 1.6){
					$img		= $row->state ?  '../components/com_myblog/images/save_tag.gif' : '../components/com_myblog/images/close_tag.gif';
				}else{
					$img		= $row->state ?  'publish_g.png' : 'publish_x.png';
				}
?>
		<tr>
			<td>
				<input type='checkbox' id='cb<?php echo $i;?>' name='cid[]' value='<?php echo $row->id;?>' onclick='isChecked(this.checked);' />
			</td>
			<td><?php echo JHTML::_('date', $row->created);	?></td>
			<td>
				<a href="javascript:void(0);" onclick="toggleEntry('<?php echo $row->id; ?>');"><?php echo htmlspecialchars($row->title);?></a>
			</td>
			<td width="5%" align="center">
				<a href="javascript:void(0);" onclick="jax.icall('myblog','myxTogglePublishAdmin','<?php echo $row->id;?>');">
				<img id="pubImg<?php echo $row->id;?>" src="images/<?php echo $img;?>" hspace="8" width="12" height="12" border="0" alt="" /></a>
			</td>
			<td align="center">
				[&nbsp;<a href="javascript:void(0);" onclick="myAzrulShowWindow('<?php echo rtrim( JURI::root() ,'/');?>/index.php?option=com_myblog&task=write&no_html=1&tmpl=component&id=<?php echo $row->id;?>&session=<?php echo $userId . ':' . $sessionId;?>');">Edit</a>&nbsp;]
			</td>
			<td><?php echo myCategoriesURLGet($row->id,false,false,false);?></td>
			<td align="center">
				<?php echo myUserGetName($row->created_by);?>
			</td>
		</tr>
		<tr id="<?php echo $row->id; ?>_content" style="display: none;">
			<td colspan="7"><?php echo $row->introtext . $row->fulltext; ?></td>
		</tr>
		<?php $i++;
			}
		}
		?>
		</tbody>
	<tfoot>
		<tr>
		<td colspan="7">
		<input type="hidden" name="option" value="com_myblog" />
		<input type="hidden" name="task" value="blogs" />
		<input type="hidden" name="boxchecked" value="0" />
		<div style="width:100%;"><?php echo $pagination->footer;?></div>
		</td>
		<tr>
	</tfoot>
	</table>
</form>
<?php
}

/**
*	Delete selected blog entries
*/ 
function removeBlogs($cid)
{
	$mainframe	=& JFactory::getApplication();
	$db			=& JFactory::getDBO();
	
	if ($cid and !empty($cid))
	{
		foreach ($cid as $uid)
		{
			$db->setQuery("DELETE FROM #__content WHERE id=$uid");
			$db->query();
			$db->setQuery("DELETE FROM #__myblog_permalinks WHERE contentid=$uid");
			$db->query();
			$db->setQuery("DELETE FROM #__myblog_content_categories WHERE contentid=$uid");
			$db->query();
		}
	}
	$mainframe->redirect( 'index.php?option=com_myblog&task=blogs' , JText::_('Blog entries removed') );
}

/**
 * Show list of content mambots
 **/	 	
function showMambots()
{
	global $_MY_CONFIG;
	
	$mainframe	=& JFactory::getApplication();
	
	require_once( MY_LIBRARY_PATH . DS . 'plugins.php' );
	
	$plugins	= new MYPlugins();

	$limit		= intval( $mainframe->getUserStateFromRequest( "viewlistlimit",'limit',$mainframe->getCfg('list_limit') ) );
	$limitstart = intval( $mainframe->getUserStateFromRequest( "view{com_myblog}limitstart",'limitstart',0 ) );
	$publish	= JRequest::getVar( 'publish' , '' , 'GET' );

	$plugins->init();
	$rows		= $plugins->get($limitstart, $limit);
	$total		= $plugins->getTotal();
	
	$pagination	= myPagination($total, $limitstart, $limit);
?>
	<div>
		<span style="color:red;font-weight: bold;">NOTE:</span>
		Content Mambot integration is by default only enabled when you view a blog entry.<br />
		To enable Content Mambot integration on the list of blog entries, make sure 
		<b>'Use mambots on My Blog frontpage?'</b> settings in <b>General Settings->Layout</b> 
		is set to <b>'Yes'</b>.
	</div>
	<br />
	<form action="#" method="POST" name="adminForm">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="adminlist">
		<thead>
		<tr>
			<th width="2%" class="title">
				<input type="checkbox" name="toggle" value="" onclick="checkAll(<?php echo count( $rows );?>);" />
			</th>
			<th width="35%">&nbsp;Bot Name</th>
			<th width="5%">&nbsp;Published</th>
			<th width="55%">&nbsp;</th>
		</tr>
		</thead>
		<tbody>
<?php
	$i=0;

	foreach($rows as $row)
	{
		$task			= $row->my_published ? 'unpublish' : 'publish';
		//$img			= $row->my_published ? 'publish_g.png' : 'publish_x.png';
		if(JVERSION >= 1.6){
			$img		= $row->my_published ?  '../components/com_myblog/images/save_tag.gif' : '../components/com_myblog/images/close_tag.gif';
		}else{
			$img		= $row->my_published ?  'publish_g.png' : 'publish_x.png';
		}
		$mambotsToKeep	= ',' . $row->mambot_id;
?> 
		<tr id="bot<?php echo $i;?>"> 
			<td>
				<input type='checkbox' id='cb<?php echo $i;?>' name='cid[]' value='<?php echo $row->mambot_id;?>' onclick='isChecked(this.checked);' />
			</td>
			<td>
				&nbsp;<?php echo $row->name;?>
			</td>
			<td align="center">
				<a href="javascript:void(0);" onclick="jax.call('myblog','myxToggleMambotPublish','<?php echo $row->mambot_id;?>');return false;">
					<img id="pubImg<?php echo $row->mambot_id;?>" src="images/<?php echo $img;?>" hspace="8" width="12" height="12" border="0" alt="" />
				</a>
			</td>
			<td>
				&nbsp;
			</td>
		</tr>
<?php 
		$i++;
	}
?>
	</tbody>
	<tr>
	<td colspan="4">
	<input type="hidden" name="option" value="com_myblog" />
	<input type="hidden" name="task" value="contentmambots" />
	<input type="hidden" name="boxchecked" value="0" />
	<br />
	<div style="width:100%;">
<?php echo $pagination->footer;?>
	</div>
	</td>
	</tr>
	</tfoot>
	</table>
	</form>
<?php 
}
?>

<?php

function showLicense()
{
?>
      <table cellpadding="4" cellspacing="0" border="0" width="100%">
      <tr>
        <td>
        
  <H3>SOFTWARE LICENSE AND LIMITED WARRANTY </H3>
  <p>This is a legally binding agreement between you and <em>Pocketcraft Software</em>. By   installing and/or using this software, you are agreeing to become bound by the   terms of this agreement.</p>
  <p>If you do not agree to the terms of this agreement, do not use this software.   </p>
  <p><strong>GRANT OF LICENSE</strong>. <em>Pocketcraft Software</em> grants to you a non-exclusive   right to use this software program (hereinafter the "Software") in accordance   with the terms contained in this Agreement. You may use the Software on a single   computer. If you have purchased a site license, you may use the Software on the   number of websites defined by and in accordance with the site license.</p>
  <p><strong>UPGRADES</strong>. If you acquired this software as an upgrade of a previous   version, this Agreement replaces and supercedes any prior Agreements. You may   not continue to use any prior versions of the Software, and nor may you   distribute prior versions to other parties.</p>
  <p><strong>OWNERSHIP OF SOFTWARE</strong>. <em>Pocketcraft Software</em> retains the copyright, title,   and ownership of the Software and the written materials.</p>
  <p><strong>COPIES</strong>. You may make as many copies of the software as you wish, as   long as you guarantee that the software can only be used on one website (joomla installation) in any   one instance. You may not distribute copies of the Software or accompanying   written materials to others.</p>
  <p><strong>TRANSFERS</strong>. You may not transfer the Software to another person provided   that you have a written permission from <em>Pocketcraft Software</em> . You may not   transfer the Software from one website to another.  In no event may you transfer, assign, rent, lease, sell, or   otherwise dispose of the Software on a temporary basis.</p>
  <p><strong>TERMINATION</strong>. This Agreement is effective until terminated. This   Agreement will terminate automatically without notice from <em>Pocketcraft Software</em> if   you fail to comply with any provision of this Agreement. Upon termination you   shall destroy the written materials and all copies of the Software, including   modified copies, if any.</p>
  <p><strong>DISCLAIMER OF WARRANTY</strong>. <em>Pocketcraft Software</em> disclaims all other   warranties, express or implied, including, but not limited to, any implied   warranties of merchantability, fitness for a particular purpose and   noninfringement.</p>
  <p><strong>OTHER WARRANTIES EXCLUDED</strong>. <em>Pocketcraft Software</em> shall not be liable for   any direct, indirect, consequential, exemplary, punitive or incidental damages   arising from any cause even if <em>Pocketcraft Software</em> has been advised of the   possibility of such damages. Certain jurisdictions do not permit the limitation   or exclusion of incidental damages, so this limitation may not apply to you.</p>
  <p>In no event will <em>Pocketcraft Software</em> be liable for any amount greater than what   you actually paid for the Software. Should any other warranties be found to   exist, such warranties shall be limited in duration to 15 days following the   date you install the Software.</p>
  <p><strong>EXPORT LAWS</strong>. You agree that you will not export the Software or   documentation.</p>
  <p><strong>PROPERTY</strong>. This software, including its code, documentation,   appearance, structure, and organization is an exclusive product of the <em>Pocketcraft Software</em>, which retains the property rights to the software, its   copies, modifications, or merged parts.</p>
  <p>&nbsp;</p>

        </td>
      </tr>
      </table>
<?php
}

function showAbout()
{
?> 
<table width="100%" border="0" cellspacing="0" cellpadding="4"> 
<tr> 
	<td>
	<p>About MyBlog for Joomla! </p> 
	<p>MyBlog brings the power of Ajax to Joomla CMS.</p> 
	<h3>Blog in style using MyBlog! </h3> 
	<p>Thank you for using My Blog - a WordPress-like blogging tool for Joomla! Developed by the Team at Pocketcraft Software that created JomComment,
	My Blog is designed to be an easy to use, neat, yet fully featured blogging component for Joomla!, replacing existing blogging solutions
	like Mamblog and Joomla!'s own content editor. </p>
	<p>Features include: <blockquote>
	- trackback<br/> 
	- RSS<br/> 
	- custom template system<br/> 
	- simple and easy to use blog editor with Myblog's own custom made image browser<br/> 
	- admin control over blogging<br/> 
	- tags<br/> 
	- Joomla content mambot integration<br/> 
	- blog posts search<br/> 
	- and much more!</blockquote>
	</p> 
	<p>
	Visit us at <a href="http://www.azrul.com">http://www.azrul.com</a> to find out more about other exciting Joomla! components we have to offer.
	</p>
	</td> </tr> </table>
<?php 
}
