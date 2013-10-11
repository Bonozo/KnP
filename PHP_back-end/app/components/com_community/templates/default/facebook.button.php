<?php
/**
 * @package	JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
 
// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die();

/** detect and display facebook language **/
if (!defined('FACEBOOK_LANG_AVAILABLE')) {
define('FACEBOOK_LANG_AVAILABLE', 1);
}

$lang = &JFactory::getLanguage();
$currentLang =  $lang->get('tag');

$fbLang =   explode(',', trim(FACEBOOK_LANGUAGE) );
$currentLang = str_replace('-','_',$currentLang);
$fbLangScript = '<script src="http://connect.facebook.net/en_GB/all.js" type="text/javascript"></script>';

if(in_array($currentLang,$fbLang)==FACEBOOK_LANG_AVAILABLE){
    $fbLangScript = '<script src="http://connect.facebook.net/'.$currentLang.'/all.js" type="text/javascript"></script>';
}

?>

<div id="fb-root"></div><b><?php echo JText::_('COM_COMMUNITY_OR');?></b>&nbsp;
<?php echo $fbLangScript; ?>
<script type="text/javascript">
joms.jQuery(document).ready(function(){
	function init(){
		FB.init({appId: '<?php echo $config->get('fbconnectkey');?>', status: false, cookie: true, xfbml: true});
		
		/* All the events registered */
		FB.Event.subscribe('auth.login', function(response) {
			joms.connect.update();
			});  
		}
		
	if(window.FB) {
		init();
	} else {
		window.fbAsyncInit = init;
	}
});

</script>
<fb:login-button autologoutlink="true" perms="read_stream,publish_stream,offline_access,email,user_birthday,status_update,user_status"><?php echo JText::_('COM_COMMUNITY_SIGN_IN_WITH_FACEBOOK');?></fb:login-button>

