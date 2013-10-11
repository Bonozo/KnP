<?php
// no direct access
defined ( '_JEXEC' ) or die ( 'Restricted access' );
jimport ( 'joomla.error.error' );
jimport ( 'joomla.plugin.helper' );
jimport ( 'joomla.html.html' );
jimport ( 'joomla.form.formfield' ); //import the necessary class definition for formfield


/**
 * 
 * Adds the Languages form-field in the backend
 * 
 * Also does cURL/fopen checks and hides options and redirects if API key data is not set
 * 
 */
class JFormFieldLangs extends JFormField {
	protected $type = 'langs';
	
	protected function getInput() {
							
		$plugin = JPluginHelper::getPlugin ( 'content', 'plg_discussit' );
		$params = new JParameter ( $plugin->params );
		
		$siteID = $params->get ( 'siteID' );
		$widgetID = $params->get ( 'widgetID' );
		$clientID = $params->get ( 'clientID' );
		$clientSecret = $params->get ( 'clientSecret' );
		$refreshToken = $params->get ( 'refreshToken' );
		
		//check for keys		
	if ($siteID == '' || $widgetID == '' || $clientID == '' || $clientSecret == '' || $refreshToken == '')
		{
			
			?>
		<script type="text/javascript">
		window.addEvent("domready", function() {$("jform_params_ShowViewAdd-lbl").getParent().getParent().set( 'html', 'API key not set please click <a href="?option=com_discussit"><strong>here</strong></a> ' );} )
		</script>
			<?php
			
		}
	
		
			$session = JFactory::getSession ();
			$options = array ();
			
			$attr = '';
			
			// Initialize some field attributes.
			$attr .= $this->element ['class'] ? ' class="' . ( string ) $this->element ['class'] . '"' : '';
			
			// To avoid user's confusion, readonly="true" should imply disabled="true".
			if (( string ) $this->element ['readonly'] == 'true' || ( string ) $this->element ['disabled'] == 'true') {
				$attr .= ' disabled="disabled"';
			}
			
			$attr .= $this->element ['size'] ? ' size="' . ( int ) $this->element ['size'] . '"' : '';
			$attr .= $this->multiple ? ' multiple="multiple"' : '';
			
			// Initialize JavaScript field attributes.
			$attr .= $this->element ['onchange'] ? ' onchange="' . ( string ) $this->element ['onchange'] . '"' : '';
			

			$url = 'http://account.discussit.com/external/ListAvailableLanguages';
			
			if (in_array ( 'curl', get_loaded_extensions () )) {
				
				$ch = curl_init ();
				$timeout = 10;
				curl_setopt ( $ch, CURLOPT_URL, $url );
				//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
				curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
				curl_setopt ( $ch, CURLOPT_CONNECTTIMEOUT, $timeout );
				$data = curl_exec ( $ch );
				curl_close ( $ch );
				
				$json = json_decode ( $data );
				$languages = ( array ) $json;
				
				$db = & JFactory::getDBO ();
				$query = "SELECT * FROM #__di_langs";
				$db->setQuery ( $query );
				$results = $db->loadResultArray();

				foreach ($languages as $language) {
					
					if (!in_array($language->ShortCode, $results)) {
						$db = & JFactory::getDBO ();
						$query = "INSERT INTO #__di_langs (tag, language) VALUES ('$language->ShortCode', '$language->Name')";
						$db->setQuery ( $query );
						$db->query();
					}
					
				}

				
				$plugin = JPluginHelper::getPlugin ( 'content', 'plg_discussit' );
				$params = new JParameter ( $plugin->params );
				
				return JHTML::_ ( 'select.genericlist', $languages, $this->name, trim ( $attr ), 'ShortCode', 'Name', $params->get ( 'Langs' ) );
			} else if (ini_get ( 'allow_url_fopen' )) {
				$response = file_get_contents ( 'http://account.discussit.com/external/ListAvailableLanguages' );
				
				$json = json_decode ( $response );
				
				$languages = ( array ) $json;
				
				return JHTML::_ ( 'select.genericlist', $languages, $this->name, trim ( $attr ), 'ShortCode', 'Name', $params->get ( 'Langs' ) );
			} 

			//Curl/Fopen notifier.
			else
			{
				
				return '<script type="text/javascript">alert("Can\'t connect to DiscussIt - CURL or fOpen not found - CURL or fOpen must be available and enabled for this plugin to function")';
			
				
			} 
		
		
	
	}
}