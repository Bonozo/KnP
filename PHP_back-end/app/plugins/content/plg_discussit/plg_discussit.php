<?php
/**

DiscussIt Joomla! 1.6/1.7 plugin v1.2

by Peter Bennett

 */

defined ( '_JEXEC' ) or die ( 'Restricted access' );

jimport ( 'joomla.methods' );
jimport ( 'joomla.application.application' );
jimport ( 'joomla.application.router' );
jimport ( 'joomla.plugin.plugin' );
jimport ( 'joomla.html.parameter' );
jimport ( 'joomla.language.language' );

require_once ('OAuth' . DS . 'discussit.php');

function getseo($url, $widgetid) {
	
	try {
		$spiders = array ('Googlebot', 'Yammybot', 'Openbot', 'Yahoo', 'Slurp', 'msnbot', 'ia_archiver', 'Lycos', 'Scooter', 'AltaVista', 'Teoma', 'Gigabot', 'Googlebot-Mobile' );
		
		foreach ( $spiders as $spider ) {
			if (strstr ( $spider, $_SERVER ['HTTP_USER_AGENT'] )) {
				
				$SEO = new discussit ();
				$res = $SEO->thread_init ( $url, $widgetid );
				$tid = $res->ThreadID;
				$mt = $res->ModType;
				$tg = $SEO->thread_get ( $tid, $mt );
				$count = $tg->Count;
				$out = '';
				for($counter = 0; $counter <= $count - 1; $counter += 1) {
					$body = $tg->MessageList->Message [$counter]->Body . '</br>';
					$nickname = $tg->MessageList->Message [$counter]->Nickname . '</br>';
					
					$out = $out . '<div>' . $body . $nickname . '</div>';
				}
				
				$messages = 'Number of comments: ' . $count . $out;
				
				$seo = '<div id="commp">' . '<div id="comm">' . $messages . '</div>' . '</div>';
			}
		
		}
	} catch ( exception $e ) {
		
		$seo = "SEO timeout";
	}
	if (! isset ( $seo )) {
		$seo = '';
	}
	return $seo;
}

class plgContentPlg_Discussit extends JPlugin {
	/**

	 * Constructor

	 */
	
	function plgContentPlg_Discussit(&$subject, $params) {
		parent::__construct ( $subject, $params );
	}
	
	function onContentBeforeDisplay($article, &$params, $limitstart) {
		global $sc;
		
		$sect = $this->params->get ( 'Sections' );
		
		if (isset ( $sect ) && ! is_array ( $sect )) {
			settype ( $sect, "array" );
		}
		
		if (JRequest::getCmd ( 'option' ) == 'com_content' && JRequest::getCmd ( 'view' ) == 'article') {
			//article mode
			

			if (! empty ( $sect )) {
				
				$catId = $params->catid;
				if (in_array ( $catId, $sect )) {
					$this->params->set ( 'showcomments', '1' );
				}
				else {
				$this->params->set ( 'showcomments', '0' );
				}
			} else {
				$this->params->set ( 'showcomments', '0' );
			}
			
			if (strpos ( $params->text, '{nocomments}' ) != false) 

			{
				$outText = str_replace ( "{nocomments}", '', $params->text );
				$params->text = $outText;
				$this->params->set ( 'showcomments', '0' );
			}
			if (strpos ( $params->text, '{showcomments}' ) != false) {
				$outText = str_replace ( "{showcomments}", '', $params->text );
				$params->text = $outText;
				$this->params->set ( 'showcomments', '1' );
			}
		
		} else { //frontpage mode
			

			if (! empty ( $sect )) {
				$catId = $params->catid;
				if (in_array ( $catId, $sect )) {
					$sc = 'yes';
				} else {
					$sc = 'no';
				}
			} else {
				$sc = 'no';
			}
			
			if (strpos ( $params->introtext, '{nocomments}' ) != false) {
				
				$outText = str_replace ( "{nocomments}", '', $params->introtext );
				
				$params->introtext = $outText;
				
				$sc = 'no';
			
			}
			if (strpos ( $params->introtext, '{showcomments}' ) != false) {
				$outText = str_replace ( "{showcomments}", '', $params->introtext );
				$params->introtext = $outText;
				
				$sc = 'yes';
			}
		}
		
		return '';
	
	}
	
	public function onContentAfterDisplay($article, &$params, $limitstart) {
		

		
		//get module params
		$db = & JFactory::getDBO ();
		$query = 'SELECT published' . ' FROM ' . $db->nameQuote ( '#__modules' ) . ' WHERE ' . $db->nameQuote ( 'module' ) . ' = ' . $db->Quote ( 'mod_discussit' );
		$db->setQuery ( $query );
		$modPublished = $db->loadResult ();
		
		$db = JFactory::getDbo ();
		$query = 'select * from #__extensions where element = "plg_discussit"';
		$db->setQuery ( $query );
		
		if (JRequest::getCmd ( 'option' ) == 'com_content' && JRequest::getCmd ( 'view' ) == 'article' && $modPublished == '0') {
			if ($this->params->get ( 'showcomments' ) == '1') {
				
				if ($this->params->get ( 'poweredBy' ) == '1') {
					$poweredBy = '<img border="0" src="http://account.dis.cuss.it/Content/i/cp.gif" alt="Comments powered by Dis.cuss.It" />';
				
				} else {
					$poweredBy = '';
				}
				
				if ((is_numeric ( $this->params->get ( 'widgetWidth' ) ) == true) and (is_numeric ( $this->params->get ( 'widgetMargin' ) ) == true)) {
					if ($this->params->get ( 'widgetWidth' ) != '0') {
						$distyle = ' style="width: ' . $this->params->get ( 'widgetWidth' ) . 'px; margin-top:' . $this->params->get ( 'widgetMargin' ) . 'px"';
					} else {
						$distyle = ' style="width: AUTO; margin-top:' . $this->params->get ( 'widgetMargin' ) . 'px"';
					}
				} else {
					$distyle = ' style="width: AUTO; margin-top:' . $this->params->get ( 'widgetMargin' ) . 'px"';
				}
				
				$db = & JFactory::getDBO ();
				$query = "SELECT * FROM #__di_langs";
				$db->setQuery ( $query );
				$languages = $db->loadResultArray ();
				
				$langObj = JFactory::getLanguage ();
				$langTag = $langObj->getTag ();
				$lang = substr ( $langTag, 0, 2 );
				if (! in_array ( $lang, $languages )) {
					$lang = $this->params->get ( 'Langs' );
				}
				
				$w1 = '<!--DiscussIt Comments Plugin for Joomla v1.2-->' . '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script><script type="text/javascript">  jQuery.noConflict() ;</script>' . '<script type="text/javascript">var widgetID="';
				
				$w2 = '"</script>' . '<script src="http://blob.discussit.com/javascript/j-' . $lang . '.js" type="text/javascript"></script>' . '<link href="http://account.discussit.com/content/widget/thread/' . $this->params->get ( 'widgetID' ) . '.css" rel="stylesheet" type="text/css" />' . '<div id="diThr"' . $distyle . '>';
				
				$w3 = '</div>' . '<a href="http://dis.cuss.it" title="Comments powered by DiscussIt" id="dilnkback"><div id="diPoweredBy">' . $poweredBy . '</div></a>' . '<!--DiscussIt Comments-->';
				//   
				

				if ($this->params->get ( 'widgetID' ) != '') {
					$user = & JFactory::getUser ();
					$usrinfo = & JFactory::getUser ();
					$usrname = $usrinfo->name;
					$usremail = $usrinfo->email;
					$jsuname = '<script type="text/javascript">jQuery(window).load(function() { jQuery("#txtdiNickname").val("' . $usrname . '"); jQuery("#txtdiEmail").val("' . $usremail . '"); } );</script>';
					$widgetid = $this->params->get ( 'widgetID' );
					$tref = '"; var threadRef="' . $params->id;
					$url = 'http://www.discussit.com/' . $widgetid . '/' . $params->id;
					
					if ($user->username != NULL) {
						//logged in logic
						$jsuname = '<script type="text/javascript">jQuery(window).load(function() { 
									jQuery("#txtdiNickname").parent().parent().replaceWith("<p>Logged in as: <strong>' . $user->name . '</strong></p><input id=\"txtdiNickname\" type=\"hidden\" value=\"' . $user->name . '\"/>"); 
									jQuery("#txtdiEmail").parent().parent().replaceWith("<input id=\"txtdiEmail\" type=\"hidden\" value=\"' . $user->email . '\"/>");
									} );
									
									function diReply(b) {
									var a = "#dim_" + jQuery("#diRT").attr("value");
									jQuery(a).append(jQuery(b[0].widget));
									jQuery("#direp").show("slow");
									jQuery("#direp").find(".diOAuth").text(
											"Replying to: " + jQuery(a).find(".diAuth").text());
									jQuery("#txtdiRNickname").val(jQuery("#txtdiNickname").val());
									jQuery("#txtdiREmail").val(jQuery("#txtdiEmail").val());
									jQuery("#txtdiRURL").val(jQuery("#txtdiURL").val());
									jQuery("#txtdiReplyBody").focus();
									jQuery("#di-eralert").parent().parent().hide();
									jQuery("#txtdiRNickname").parent().parent().replaceWith("<p>Logged in as: <strong>' . $user->name . '</strong></p><input id=\"txtdiRNickname\" type=\"hidden\" value=\"' . $user->name . '\"/>");
									jQuery("#txtdiREmail").parent().parent().replaceWith("<input id=\"txtdiREmail\" type=\"hidden\" value=\"' . $user->email . '\"/>");
									
									}
									var messageSent = 0;
									function diPosted(){
									
									messageSent = 1;
									
									}
									
									function diCbEnd(){
									
									if (messageSent == 1){
									jQuery("#txtdiNickname").parent().parent().replaceWith("<p>Logged in as: <strong>' . $user->name . '</strong></p><input id=\"txtdiNickname\" type=\"hidden\" value=\"' . $user->name . '\"/>"); 
									jQuery("#txtdiEmail").parent().parent().replaceWith("<input id=\"txtdiEmail\" type=\"hidden\" value=\"' . $user->email . '\"/>");
									}
									
									
									}
									';
						
						$jsuname .= '</script>';

					
					} else {
						// anonymous logic
						

						if ($this->params->get ( 'anonview' ) == '0') {
							if ($this->params->get ( 'anonpost' ) == '1') {
								// hide form
								// txtdiBody.parent.parent.parent.parent.parent
								return "<p>You must be logged in to post comments.</p>";
							} else {
								// do nothing
								$jsuname = '';
							}
						} else {
							return "<p>You must be logged in to view comments.</p>";
						}
					
					}
					
					$user = & JFactory::getUser ();
					
					$content = $w1 . $widgetid . $tref . $w2 . getseo ( $url, $widgetid ) . $w3 . $jsuname;
				
				} 

				else if ($this->params->get ( 'Key' ) == '') {
					$content = 'Please enter correct API key in plugin settings!';
				} else {
					
					$content = 'Error: widgetID not found. Please check that scripts can make outgoing connections from this host.';
				
				}
			
			} 

			else {
				$content = $this->params->get ( 'disabledText' );
			}
		
		} else if (JRequest::getCmd ( 'option' ) == 'com_content' && JRequest::getCmd ( 'view' ) == 'featured') { //front-page mode
			

			if ($this->params->get ( 'ShowViewAdd' ) != '') {
				if ($GLOBALS ['sc'] == 'yes') {
					$route = JRoute::_ ( JURI::base () . 'index.php?view=article&catid=' . $params->catslug . '&id=' . $params->slug );
					$link = '<a href="' . $route . '">' . $this->params->get ( 'ShowViewAdd' ) . '</a>';
					$content = $link;
				} else {
					$content = '';
				}
			} 

			else {
				$content = '';
			}
		
		} else {
			$content = '';
		}
		
		return $content;
	}

}	