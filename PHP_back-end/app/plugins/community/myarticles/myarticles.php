<?php
/**
 * @category	Plugins
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */

// no direct access
defined('_JEXEC') or die('Restricted access');
require_once( JPATH_ROOT . DS . 'components' . DS . 'com_content' . DS . 'helpers' . DS . 'route.php');
require_once( JPATH_ROOT . DS . 'components' . DS . 'com_community' . DS . 'libraries' . DS . 'core.php');

if(!class_exists('plgCommunityMyArticles'))
{
	class plgCommunityMyArticles extends CApplications
	{
		var $name		= "My Articles";
		var $section;
		var $_name	= "myarticles";		
			
	    function plgCommunityMyArticles(& $subject, $config)
	    {
			$this->db 		=& JFactory::getDBO();
			$this->_path	= JPATH_ROOT . DS . 'administrator' . DS . 'components' . DS . 'com_myblog';
	
			parent::__construct($subject, $config);
			
			$this->section = trim($this->params->get('section'), ',');
	    }
	
		/**
		 * Ajax function to save a new wall entry
		 * 	 
		 * @param message	A message that is submitted by the user
		 * @param uniqueId	The unique id for this group
		 * 
		 **/	 	 	 	 	 		
		function onProfileDisplay(){
			//Load language file.
			JPlugin::loadLanguage( 'plg_myarticles', JPATH_ADMINISTRATOR );
			
			// Attach CSS
			$document	=& JFactory::getDocument();
			$css		= ( C_JOOMLA_15 ) 
					? JURI::base() . 'plugins/community/myarticles/style.css' 
					: JURI::base() . 'plugins/community/myarticles/myarticles/style.css';
			$document->addStyleSheet($css);
			
			if(JRequest::getVar('task', '', 'REQUEST') == 'app'){
				$app = 1;	
			}else{
				$app = 0;
			}
			
			$user	= CFactory::getRequestUser();
			$userid	= $user->id;
			
			$def_limit = $this->params->get('count', 10);
			$limit = JRequest::getVar('limit', $def_limit, 'REQUEST');
			$limitstart = JRequest::getVar('limitstart', 0, 'REQUEST');
								
			if( !file_exists( $this->_path . DS . 'config.myblog.php' ) ){
				$row = $this->getArticle($userid, $limitstart, $limit, $this->section);
				$myblogItemId = "";
			}else{
				$row = $this->getArticle_with_myblog($userid, $limitstart, $limit, $this->section);	
				include_once (JPATH_ROOT . DS . "components" . DS . "com_myblog" . DS . "functions.myblog.php");
				$myblogItemId = myGetItemId();	
			}
			
			$cat = $this->getCatAlias();		
			$total = $this->countArticle($userid, $this->section);
			$introtext = $this->params->get("introtext", 0);
			
			$mainframe =& JFactory::getApplication();
			$caching = $this->params->get('cache', 1);
			if($caching)
			{
				$caching = $mainframe->getCfg('caching');
			}
			
			$cache =& JFactory::getCache('plgCommunityMyArticles');
			$cache->setCaching($caching);
			$callback = array('plgCommunityMyArticles', '_getArticleHTML');
			$content = $cache->call($callback, $userid, $limit, $limitstart, $row, $app, $total, $cat, $myblogItemId, $introtext, $this->params);
			
			return $content;
		}
		
		function _getArticleHTML($userid, $limit, $limitstart, $row, $app, $total, $cat, $myblogItemId, $introtext, $params){
			
			JPluginHelper::importPlugin('content');
			$dispatcher	=& JDispatcher::getInstance();
			$html = "";
			
			if(!empty($row))
			{	
				$html .= '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 0 5px;">';
				foreach($row as $data)
				{				
					$text_limit = $params->get('limit', 50);				
					if(JString::strlen($data->introtext) > $text_limit)
					{
						$content = strip_tags(JString::substr($data->introtext, 0, $text_limit));
						$content .= " .....";
					}
					else
					{
						$content = $data->introtext;
					}		
							
					$data->text =& $content;
					$result = $dispatcher->trigger('onPrepareContent', array (& $data, & $params, 0));
					
					if(empty($data->permalink)){
						$myblog = 0;
						$permalink  = "";
					}else{
						$myblog = 1;
						$permalink  = $data->permalink;
					}
					
					if(empty($cat[$data->catid])){
						$cat[$data->catid] = "";
					}
					
					$link = plgCommunityMyArticles::buildLink($data->id, $data->alias, $data->catid, $cat[$data->catid], $data->sectionid, $myblog, $permalink, $myblogItemId);
					
					$date = cGetDate($data->created);
					
					
					$html .= '	<tr style="border-bottom: solid 1px #ccc;">';
					$html .= '		<td height="20"><div class="myarticles-title"><a href="'.$link.'">'.$data->title.'</a></div></td>';
					$html .= '		<td valign="top" width="200" style="text-align: right; font-weight: 700;" class="createdate">'.JHTML::_('date', $data->created, JText::_('DATE_FORMAT_LC2')) .'</td>';
					$html .= '	</tr>';
					
					$html .= '	<tr>';
					$html .= '		<td colspan="2">';
					if ( $introtext == 1 ) {
						$html .= '<div class="myarticles-content">'.$content.'</div>';
					}
					$html .= '			<hr style="color: #ccc;" />';
					$html .= '		</td>';
					$html .= '	</tr>';
					
					
						
	// 				
	// 				$html .= "<div>";
	// 					$html .= "<div style='margin-top:10px;margin-bottom:5px'>";
	// 					$html .= "	<div style='float:left;font-weight:bold'><a href='".$link."'>".$data->title."</a></div>";
	// 					$html .= "	<div style='float:right;font-weight:bold' class='createdate'>".$date->toFormat()."</div>";
	// 					$html .= "	<div style='clear:both;'></div>";
	// 					$html .= "</div>";
	// 					$html .= "<div style='border-bottom:1px solid #CCCCCC; margin-bottom:4px'></div>";	
	// 				
	// 					if($introtext == 1){
	// 						$html .= "<div style='margin-bottom:20px'>".$content."</div>";
	// 					}
	// 				$html .= "</div>";		
				}
				$html .= '</table>';
				
				if($app == 1){
					jimport('joomla.html.pagination');
					
					$pagination	= new JPagination( $total , $limitstart , $limit );
					$html .= '
					<!-- Pagination -->
					<div style="text-align: center;">
						'.$pagination->getPagesLinks().'
					</div>
					<!-- End Pagination -->';			
				}else{
					$showall = CRoute::_('index.php?option=com_community&view=profile&userid='.$userid.'&task=app&app=myarticles');
					$html .= "<div style='float:right;'><a href='".$showall."'>".JText::_('PLG_MYARTICLES_SHOWALL')."</a></div>";
				}
			}else{
				$html .= "<div>".JText::_("PLG_MYARTICLES_NO_ARTICLES")."</div>";
			}	
			
			$html .= "<div style='clear:both;'></div>";
			
			return $html;
		}
		
		function onAppDisplay(){
			ob_start();
			$limit=0;
			$html= $this->onProfileDisplay($limit);
			echo $html;
			
			$content	= ob_get_contents();
			ob_end_clean(); 
		
			return $content;		
		}
		
		function buildLink($id, $alias, $catid, $catAlias, $sectionid , $myblog, $permalink, $myblogItemId){
		
			if(!$myblog)
			{
				$link	= ContentHelperRoute::getArticleRoute( $id . ':' . $alias , $catid . ':' . $catAlias , $sectionid );
				$link	= JRoute::_( $link );
			}
			else
			{	
				$link = JRoute::_( "index.php?option=com_myblog&show=".$permalink."&Itemid=".$myblogItemId );
			}
			
			return $link;
		}
		
		function getArticle($userid, $limitstart, $limit, $section)
		{
		
			if(!empty($section))
			{
				$condition = " AND ".$this->db->nameQuote('sectionid')." IN (".$section.")";
			}
			else
			{
				$condition = "";
			}
			
			if($this->params->get('display_expired', 1))
			{
				$expired = "";
			}
			else
			{
				$expired = $this->getExpiredCondition();
			}
					
			$sql  = "	SELECT
								* 
						FROM
								".$this->db->nameQuote('#__content')."	
						WHERE
								".$this->db->nameQuote('created_by')." = ".$this->db->quote($userid)." AND
								".$this->db->nameQuote('state')."=".$this->db->quote(1)." 
								".$condition."
								".$expired."										
						ORDER BY
								".$this->db->nameQuote('created')." DESC
						LIMIT 
								".$limitstart.",".$limit;							
								
			$query = $this->db->setQuery($sql);
			$row  = $this->db->loadObjectList();
			if($this->db->getErrorNum()) {
				JError::raiseError( 500, $this->db->stderr());
			}
			return $row;
		}
		
		function getArticle_with_myblog($userid, $limitstart, $limit, $section)
		{
		
			if(!empty($section))
			{
				$condition = " AND a.".$this->db->nameQuote('sectionid')." IN (".$section.")";
			}
			else
			{
				$condition = "";
			}
			
			if($this->params->get('display_expired', 1))
			{
				$expired = "";
			}
			else
			{
				$expired = $this->getExpiredCondition();
			}
			
			$sql  = "	SELECT
								a.*,
								b.permalink
						FROM	
								".$this->db->nameQuote('#__content')." AS a LEFT JOIN 
								".$this->db->nameQuote('#__myblog_permalinks')." AS b ON 
								a.id = b.contentid
						WHERE
								".$this->db->nameQuote('created_by')." = ".$this->db->quote($userid)." AND
								".$this->db->nameQuote('state')."=".$this->db->quote(1)."
								".$condition."
								".$expired."
						ORDER BY
								".$this->db->nameQuote('created')." DESC
						LIMIT 
								".$limitstart.",".$limit;			
								
			$query = $this->db->setQuery($sql);
			$row  = $this->db->loadObjectList();
			if($this->db->getErrorNum()) {
				JError::raiseError( 500, $this->db->stderr());
			}		
			return $row;
		}
		
		function countArticle($userid, $section)
		{		
			if(!empty($section))
			{
				$condition = " AND ".$this->db->nameQuote('sectionid')." IN (".$section.")";
			}
			else
			{
				$condition = "";
			}
		
			$sql  = "	SELECT
								count(id) as total
						FROM
								".$this->db->nameQuote('#__content')."
						WHERE
								".$this->db->nameQuote('created_by')." = ".$this->db->quote($userid)." AND
								".$this->db->nameQuote('state')."=".$this->db->quote(1)."
								".$condition;
			$query = $this->db->setQuery($sql);
			$count  = $this->db->loadObject();
			if($this->db->getErrorNum()) {
				JError::raiseError( 500, $this->db->stderr());
			}		
			
			return $count->total;
		}
		
		function getCatAlias(){		
			$cat = array();
			
			$sql = "	SELECT 
								".$this->db->nameQuote("id").",
								".$this->db->nameQuote("alias")."
						FROM
								".$this->db->nameQuote("#__categories");
			
			$this->db->setQuery($sql);
			$row = $this->db->loadObjectList();
			
			foreach($row as $data){
				$cat[$data->id] = $data->alias; 
			}
			
			return $cat;		
		}
		
		function getExpiredCondition()
		{
			$date	= new JDate();
			$now	= $date->toFormat();
			
			$condition = " AND ( " . " "
								   . "( "
			                       . $this->db->nameQuote('publish_up')." <= ".$this->db->quote($now) . " AND "
						 		   . $this->db->nameQuote('publish_down')." >= ".$this->db->quote($now) . " "
								   . ") OR "
								   .$this->db->nameQuote('publish_down')." = ".$this->db->quote("0000-00-00 00:00:00") . " "
							. " ) ";
						 
			return $condition;
		}
	
	}
}
