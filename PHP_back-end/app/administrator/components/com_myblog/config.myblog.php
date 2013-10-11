<?php
/**
 * @package		My Blog
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license http://www.azrul.com Copyrighted Commercial Software
 */
defined('_JEXEC') or die('Restricted access');

if (!defined('MYBLOG_CONFIG_CLASS'))
{
	define('MYBLOG_CONFIG_CLASS', 1);

	class MYBLOG_Config
	{
		var $_configString = "";
		var $_tableName = "#__myblog_config";
		var $useBBCode = "1";
		var $useFeed = "1";
		var $notifyAdmin = "0";
		var $notifyEmail = "";
		var $dateFormat = "%b %d, %Y";
		var $numEntry = "10";
		var $avatar = "none";
		var $textWrap = "75";
		var $processMambots = "0";
		var $useComment = "1";
		var $sectionid = "1";
		var $template = "default";
		var $overrideTemplate = "0";
		var $frontOrderby = "ordering";
		var $postGroup = "Registered";
		var $adminPostGroup = "Manager,Administrator,Super Administrator";
		var $adminPublishControlGroup = "Manager,Administrator,Super Administrator";
        var $publishControlGroup = "Registered";
		var $postUsers = "";
		var $frontpageToolbar = "1";
		var $allowedUser = "";
		var $useMCEeditor = "1";
		var $catid = "";
		var $managedSections = "";
		var $postSection = "";
		var $showCBProfile = "";
		var $avatarWidth = "40";
		var $avatarHeight = "40";
		var $smfPath = "";
		var $linkAvatar = "0";
		var $imgFolderRoot = "/images/";
		var $imgFolderRestrict = "0";
		var $useRSSFeed = "1";
		var $rssFeedLimit	= '20';
		var $pingTechnorati = "0";
		//var $useLoginForm = "1";
		var $useImageBrowser = "1";
		var $uploadSizeLimit = "200";
		var $useFullName = "0";
		var $introLength = "400";
		var $useIntrotext = "0";
		var $defaultPublishStatus = "1";
		var $mambotFrontpage = "0";
		var $necessaryReadmore = "1";
		var $disableReadMoreTag = "0";
		var $readMoreLink = "[...]";
		var $replacements_array = array();
		//var $languageCompat = 0;
		var $language = "english.php";
		var $allowedPosters = "";
		var $allowedPublishers = "";
		var $extraPostGroups = "";
		var $extraPublishGroups = "";
		var $allowModerateComment = "0";
		//var $showBookmarking    = "1";
		var $allowCategorySelection = "1";
		var $enableBackLink = "1";
		var $enablePdfLink = "1";
		var $enablePrintLink = "1";
		var $enableJCDashboard = "0";
		var $enableUserCreateTags   = "0";
		var $enableAzrulVideoBot    = "0";
		var $mainBlogTitle = "My Blog";
		var $mainBlogDesc = "Description of my blog";
		var $useFeedBurner	= '0';
		var $useFeedBurnerURL	= "";
		var $userUseFeedBurner	= '0';
		var $adminEmail			= '';
		var $allowNotification	= '';
		var $allowedUploadFileType = "gif,jpg,jpeg,png, bmp,doc, xls,swf,pdf";
		var $viewEntry		= '1';
		var $viewIntro		= '1';
		var $anchorReadmore	= '0';
		var $allowDefaultTags	= '0';
		var $autoReadmorePCount = '3';
		var $enableImageResize	= '0';
		var $maxWidth			= '';
		var $disallowedPosters	= '';
		var $jomsocialActivity	= '0';
		var $jomsocialPoints	= '0';
		var $userUseGoGears		= '0';
		var $categoryDisplay	= '0';
		var $useGzipEditor		= '1';
		
		var $pageTitle = ''; //added on 27 oct 2010 by Johny
		var $allowAtom = '0';
		var $allowTwitter = '0';
        var $enableIntenseDebate = '';
        var $accountIntenseDebate = '';
        var $disqusShortname = '';
        var $fbAppID = '';
        var $fbSecretID = '';
        var $fbUserID = '';
		function MYBLOG_Config()
		{
			// add new groups for >J1.6
			if(JVERSION >= 1.6){
				$this->adminPostGroup = "Manager,Administrator,Super Users";
				$this->adminPublishControlGroup = "Manager,Administrator,Super Users";
			}

			$db		=& JFactory::getDBO();
			$my		=& JFactory::getUser();
			
			$db->setQuery("SELECT value FROM $this->_tableName WHERE name='all'");
			$this->_configString = $db->loadResult();
			
			if (!$this->_configString)
			{
				// The only place to initialize config string
				// On first install this probably be empty. Set it to 'MyBlog' section!
				if(empty($this->managedSections))
				{
					$sql = (JVERSION >= 1.6) 
						? "SELECT `id` FROM #__categories WHERE `title`='MyBlog' AND extension='com_content'"
						: "SELECT `id` FROM #__sections WHERE `name`='MyBlog'";
					$db->setQuery($sql);
					$this->managedSections = $db->loadResult(); 
				}
				
				# Set post section default value to 'MyBlog'
				if(empty($this->postSection))
				{
					$sql = (JVERSION >= 1.6) 
						? "SELECT `id` FROM #__categories WHERE `title`='MyBlog' AND extension='com_content'"
						: "SELECT `id` FROM #__sections WHERE `name`='MyBlog'";
					$db->setQuery($sql);
					$this->postSection = $db->loadResult();
				}
				
				# Add a category for myblog section
				if(JVERSION >= 1.6){
					$this->catid = $this->postSection;
				}else{
					$db->setQuery("SELECT id from #__categories WHERE section='{$this->postSection}'");
					$this->catid = $db->loadResult();
				}
				
				if(!$this->catid)
				{
					$db->setQuery("INSERT INTO #__categories SET parent_id='0', title='MyBlog', name='MyBlog', section='{$this->postSection}', published='1'");
					$db->query();
					$this->catid = $db->insertid();
				}
				
				# On first install, this category should be empty
				if(empty($this->catid))
				{
					$db->setQuery("SELECT `id` FROM #__categories WHERE `section`='{$this->managedSections}'");
					$this->catid = $db->loadResult();
				}
				
				# Add a sample entry content,
				# Since we are using $my var, this config MUST be called by the installer at least once.				
				$sql = (JVERSION >= 1.6) 
						? "SELECT count(*) from #__content WHERE catid='{$this->managedSections}'"
						: "SELECT count(*) from #__content WHERE sectionid='{$this->managedSections}'";
				$db->setQuery($sql);
				$contentcount = $db->loadResult();
								
				if ($contentcount == 0)
				{	
					$u = JFactory::getUser();
					$uid = $u->id;
					$date =& JFactory::getDate();
					$access = (JVERSION >= 1.6) ? ' access=1, ' : '' ;
					$entry= sprintf("INSERT into #__content SET {$access} sectionid='{$this->managedSections}', catid='{$this->catid}', created_by='".$uid."', title='%s', `fulltext`='%s', state='1', created='".$date->toMySQL()."', modified='".$date->toMySQL()."', hits='0'",
								'Welcome to MyBlog!',
								'<p>Hello,</p><p> Thank you for using <strong>MyBlog!</strong>, the premier blogging tool for the popular Content Management System - Joomla!. <strong>MyBlog!</strong> is a feature packed, AJAX enabled replacement for the Joomla! Blog component.</p><p>&nbsp;</p><div style="text-align: center"><img src="components/com_myblog/images/icon.png" border="0" alt="icon.png" hspace="4" vspace="4" width="199" height="60" /></div><p>&nbsp;</p><p>&nbsp;Among the features currently implemented are:</p><ul><li><strong>MyBlog! </strong>Dashboard</li></ul><blockquote>   <ul><li>Quick search and linking of previous posts while writing a blog entry</li><li>Tags / Tagclouds</li><li> Easy image upload and browsing using MyBlog!&#39;s own image browser</li><li>SEF friendly permanent links for each blog entry</li><li> Single-click publishing/unpublishing</li><li>AJAXed page view of my blog entries </li></ul></blockquote> <ul><li><strong>MyBlog! </strong>Admin</li></ul><blockquote><ul><li>Publishing/posting permissions</li><li>3rd party MyBlog! addons support similar to Mambots</li><li><a href="http://www.azrul.com/product/joomla_comment_system.html">Jomcomment</a>  integration</li><li>Moderate blogs, tags/categories</li></ul></blockquote><ul><li> <strong>MyBlog!</strong> Frontpage view</li></ul><blockquote><ul><li>Browse blogs by keyword, blogger, or tags</li><li>Simple and easy view of all blog entries / my blog entries <br /></li><li>Templating support</li><li><a href="http://del.icio.us">del.icio.us</a> &bull;  	<a href="http://www.digg.com/">digg</a> &bull; <a href="http://www.spurl.net">spurl</a> 	 &bull; <a href="http://reddit.com/">reddit</a> &bull; <a href="http://www.furl.net">furl</a> social bookmarking support</li></ul></blockquote><ul><li>Future features:</li></ul><ul><li>RSS feeds</li><li>Trackbacks</li><li>More  ready-made templates</li><li>Community-builder support</li><li>Archived view of posts</li><li> and more...! </li></ul><p>As part of our product improvement process, we would like you to submit any queries, suggestions, or comments regarding MyBlog! on our <a href="http://www.azrul.com/forum/index.php/board,6.0.html">forums at Azrul.com</a>. </p><p> Thank you!</p><p>-MyBlog Dev Team. </p><p>&nbsp;</p>');	
					$db->setQuery($entry);
					$db->query();
					$insertid = $db->insertid();
					
					# Insert a permalink for this content
					$db->setQuery("INSERT INTO `#__myblog_permalinks` VALUES ($insertid, 'Welcome-to-MyBlog!.html');");
					$db->query();
						
					# Insert some samples tags
					$categories = array('gadgets', 'sports', 'myblog');
					
					foreach($categories as $cat)
					{
						$db->setQuery("INSERT INTO #__myblog_categories SET name='$cat',slug='{$cat}'");
						$db->query();
					}
					
					
					# Add a sample tag to our sample content
					$cid = $insertid;
					$db->setQuery("SELECT id from #__myblog_categories WHERE name='myblog'");
					$catid = $db->loadResult();
					
					$db->setQuery("INSERT into #__myblog_content_categories SET contentid='$cid', category='$catid'");
					$db->query();
				}
								
				# Check if Jom Comment is present
				$sql = (JVERSION >= 1.6) 
						? "SELECT extension_id FROM #__extensions WHERE `name`='com_jomcomment' OR element='com_jomcomment' " 
						: "SELECT id FROM #__components WHERE `option`='com_jomcomment'" ;
				$db->setQuery($sql);
				$this->useComment = strval($db->loadResult());

				
				$default_vars = get_object_vars($this);
				$this->_configString = "";
				
				foreach ($default_vars as $name => $value)
				{
					if (substr($name, 0, 1) != "_")
						$this->_configString .= "\$$name=\"" . strval($value) . "\";\n";
				}
				
				$db->setQuery("INSERT INTO $this->_tableName SET value='$this->_configString',name='all'");
				$db->query();
			}
			// Convert all the $ in the value to %% so that it wont be evaluated wrongly.
			$this->_configString	= str_replace("\\$", "%%" , $this->_configString);

			$cfg = str_replace('$', '$this->', $this->_configString);
			//$cfg = substr($cfg, strpos($cfg, '$this->language'));
			eval ($cfg);
			
			# Check if Jom Comment is present. If user want to use it, need to make sure it does exist
			if($this->useComment == 'jomcomment' || $this->useComment == 1)
			{			
				$sql = (JVERSION >= 1.6) 
						? "SELECT count(*) FROM #__extensions WHERE `name`='com_jomcomment' OR element='com_jomcomment' " 
						: "SELECT count(*) FROM #__components WHERE `option`='com_jomcomment'" ;
			
				$db->setQuery($sql);
				if(!$db->loadResult())
					$this->useComment = '0'; //strval($db->loadResult());
			}
			
			# create replacements array for permalinks
			# BUG: this is being accessed dorectly			
			$this->replacements_array = array();
			$replacements = "ï¿½?|A, Ã‚|A, Ä‚|A, Ã„|A, Ä†|C, Ã‡|C, ÄŒ|C, ÄŽ|D, ï¿½?|D, Ã‰|E, ï¿½?|E, Ã‹|E, Äš|E, Ã?|I, ÃŽ|I, Ä¹|L, ï¿½?|N, Å‡|N, Ã“|O, Ã”|O, ï¿½?|O, Ã–|O, Å”|R, ï¿½?|R, Å |S, Åš|O, Å¤|T, Å®|U, Ãš|U, Å°|U, Ãœ|U, Ã?|Y, Å½|Z, Å¹|Z, Ã¡|a, Ã¢|a, ï¿½?|a, Ã¤|a, Ä‡|c, Ã§|c, Ä?|c, Ä?|d, Ä‘|d, Ã©|e, Ä™|e, Ã«|e, Ä›|e, Ã­|i, Ã®|i, Äº|l, Å„|n, ï¿½?|n, Ã³|o, Ã´|o, Å‘|o, Ã¶|o, Å¡|s, Å›|s, Å™|r, Å•|r, Å¥|t, Å¯|u, Ãº|u, Å±|u, Ã¼|u, Ã½|y, Å¾|z, Åº|z, Ë™|-, ÃŸ|ss, Ä„|A, Âµ|u, Ã¥|a, Ã…|A, Ã¦|ae, Ã†|AE, Å“|ce, Å’|CE";
	        $items = explode(',', $replacements);
	        foreach ($items as $item)
			{
	            @list($src, $dst) = explode('|', trim($item));
	            $this->replacements_array[trim($src)] = trim($dst);
	        }
	        
			// If the time format is empty, set to default
			if(empty($this->dateFormat))
			{
				$this->dateFormat = '%b %d, %Y';
			}
		}
		
		function get($varname, $default = "0") 
		{
			if (isset ($this->$varname)) 
			{
				// Replace the occurence of %% since we know that is supposed to be $
				return str_replace('%%', '$' , $this->$varname);
			}
			else
			{
				return $default;
			}
		}
		
		function saveUsingClassVars()
		{
			$db				=& JFactory::getDBO();
			
			$default_vars = get_object_vars($this);
			$this->_configString = "";
			foreach ($default_vars as $name => $value)
			{
				if (substr($name, 0, 1) != "_")
					$this->_configString .= "\$$name=\"" . strval($value) . "\";\n";
			}
			$db->setQuery("INSERT INTO $this->_tableName SET value='$this->_configString',name='all' ON DUPLICATE KEY UPDATE value='$this->_configString'");
			$db->query();
		}
		
		function save()
		{
			$db		=& JFactory::getDBO();
			$config = "";
			$objvars = get_object_vars ($this);

			#Loop through the properties of this class
			#$key: property name
			#$val: value of property
			foreach($objvars as $key => $val)
			{
			    #Check for certain unwanted properties such as _ & db
				if($key{0} != '_' && $key !='db')
				{
				    #Check properties being set or not.
				    if(isset($_POST[$key]))
					{
				        $val = $_POST[$key];
					}
					else
					{
					    $val = "0";
					}

					#Check if property is an array as some input is in array form.
					if (is_array($val)) {
						$ls = implode(",", $val);
						$config .= "\$$key= \"$ls\";\n";
					
					} else{
						// Fix $ values
						$val	= str_replace("$" , "\\\\$" , $val );

					    if($key == 'pingTechnorati' && !function_exists('xmlrpc_encode_request')){
					        $config .= "\$$key=\"0\";\n";
						} elseif($key == 'catid'){
						
							$db->setQuery("SELECT id from #__categories WHERE section='".$_POST['postSection']."' limit 1");
							$mycatid = $db->loadResult();
							
							
							// If a default category named myblog doesn't exist, one will be created automatically
							if(!$mycatid){
								$db->setQuery("INSERT INTO #__categories SET parent_id='0', title='MyBlog', name='MyBlog', section='".$_POST['postSection']."', published='1'");
								$db->query();
								$insertid = $db->insertid();
								$config .= "\$$key=\"$insertid\";\n";
							
							} else{
							    $config .= "\$$key=\"".$mycatid."\";\n";
							}
						} else{
						    $config .= "\$$key=\"$val\";\n";
						}
					}
				}
			}

			// Clear cache.
			myClearCache();
			$config = addslashes($config);
			$db->setQuery("UPDATE #__myblog_config SET value='$config',name='all'");
			$db->query();
		}
		
		function getReplacements()
		{
			
		}
	}
}
?>
