<?php
/**
 * @category	Plugins
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */

// no direct access
defined('_JEXEC') or die('Restricted access');

if(!class_exists('plgCommunityMyContacts'))
{
    class plgCommunityMyContacts extends CApplications
    {
        var $name         = "My Contacts";
        var $_name        = 'mycontacts';
        var $_path        = '';
        var $_user        = '';
        var $_my        = '';
        
        function onProfileDisplay()
        {
            $this->loadUserParams();
            
            //get enable
            $enable = new stdClass();            
            
            $enable->personalInfo = new stdClass();
            $enable->personalInfo->home_address   = $this->params->get('home_address', TRUE);
            $enable->personalInfo->city           = $this->params->get('city', TRUE);
            $enable->personalInfo->postal_code    = $this->params->get('postal_code', TRUE);
            $enable->personalInfo->country        = $this->params->get('country', TRUE);
            $enable->personalInfo->phone_number   = $this->params->get('phone_number', TRUE);
            $enable->personalInfo->mobile_number  = $this->params->get('mobile_number', TRUE);
            $enable->personalInfo->fax_number     = $this->params->get('fax_number', TRUE);
            
            $enable->workInfo = new stdClass();
            $enable->workInfo->my_company   = $this->params->get('my_company', TRUE);
            $enable->workInfo->work_address = $this->params->get('work_address', TRUE);
            $enable->workInfo->website      = $this->params->get('website', TRUE);
            $enable->workInfo->department   = $this->params->get('department', TRUE);
            $enable->workInfo->job_title    = $this->params->get('job_title', TRUE);
            $enable->workInfo->main_im_id   = $this->params->get('main_im_id', TRUE);             
            
            $enable->im_list = $this->params->get('im_list', TRUE);
            
            //get info
            $info = new stdClass();
            
            $info->personal = new stdClass();
            $info->personal->home_address   = $this->userparams->get('home_address', '');
            $info->personal->city           = $this->userparams->get('city', '');
            $info->personal->postal_code    = $this->userparams->get('postal_code', '');
            $info->personal->country        = $this->userparams->get('country', '');
            $info->personal->phone_number   = $this->userparams->get('phone_number', '');
            $info->personal->mobile_number  = $this->userparams->get('mobile_number', '');
            $info->personal->fax_number     = $this->userparams->get('fax_number', '');
            
            $info->work = new stdClass();
            $info->work->my_company     = $this->userparams->get('my_company', '');
            $info->work->work_address   = $this->userparams->get('work_address', '');
            $info->work->website        = $this->userparams->get('website', '');
            $info->work->department     = $this->userparams->get('department', '');
            $info->work->job_title      = $this->userparams->get('job_title', '');
            $info->work->main_im_id     = $this->userparams->get('main_im_id', '');
            
            $info->im = new stdClass();
            $info->im->icq      = $this->userparams->get('icq', '');
            $info->im->aim      = $this->userparams->get('aim', '');
            $info->im->yim      = $this->userparams->get('yim', '');
            $info->im->msn      = $this->userparams->get('msn', '');
            $info->im->google   = $this->userparams->get('google', '');
            $info->im->skype    = $this->userparams->get('skype', '');
            
            $mainframe =& JFactory::getApplication();
            $document =& JFactory::getDocument();
            
            if(C_JOOMLA_15)
				$document->addStylesheet( rtrim( JURI::root(), '/' ) . '/plugins/community/mycontacts/style.css' );
			else
            	$document->addStylesheet( rtrim( JURI::root(), '/' ) . '/plugins/community/mycontacts/mycontacts/style.css' );
            
            
            $caching = $this->params->get('cache', 1);
            if($caching)
            {
                $caching = $mainframe->getCfg('caching');
            }
            
            $cache =& JFactory::getCache('plgCommunityMyContacts');
            $cache->setCaching($caching);
            $callback = array('plgCommunityMyContacts', '_getMyContactsHTML');
            
			//Moving this out of _getMyContactsHTML because it's causing error in Joomla 1.6
			JPlugin::loadLanguage('plg_mycontacts', JPATH_ADMINISTRATOR);
			
            return $cache->call($callback, $enable, $info , $this->params);
        }
        
        function _getMyContactsHTML($enable, $info , $params ) 
        {
            //JPlugin::loadLanguage('plg_mycontacts', JPATH_ADMINISTRATOR);
                        
            ob_start();
            ?>
            <div id="mycontacts_container">
                <div class="leftside">
                    <?php
                    foreach($enable->personalInfo as $key=>$value)
                    {
                        if($value)
                        {
                        	if( !$params->get( 'hide_empty') || $params->get( 'hide_empty') && (!empty($info->personal->$key) ) )
                        	{
                    ?>
                            <div id="<?php echo $key; ?>" class="block">
                                <div class="contact_key"><?php echo JText::_( strtoupper('mycontact_'.$key)); ?></div>
                                <div class="contact_value"><?php echo (!empty($info->personal->$key))? $info->personal->$key : JText::_('mycontacts_notavailable'); ?></div>
                            </div>
                            <div class="clearfix"></div>
                    <?php
                    		}
                        }
                    }
                    ?>
                </div>
                <div class="rightside">
                    <?php
                    foreach($enable->workInfo as $key=>$value)     
                    {
                        if($value)
                        { 
                        	if( !$params->get( 'hide_empty') || $params->get( 'hide_empty') && (!empty($info->work->$key) ) )
                        	{
                    ?>
                            <div id="<?php echo $key; ?>" class="block">
                                <div class="contact_key"><?php echo JText::_('mycontact_'.$key); ?></div>
                                <div class="contact_value"><?php echo (!empty($info->work->$key))? $info->work->$key : JText::_('mycontacts_notavailable'); ?></div>
                            </div>
                            <div class="clearfix"></div>
                    <?php
                    		}
                        }
                    }
                    ?>  
                </div>
                <div class="clearfix"></div>
                
                
                <div id="mycontacts_imlist">
                 	<?php
                    if($enable->im_list)
                    {
                        foreach($info->im as $key=>$value)
                        {           
						    if( !$params->get( 'hide_empty') || $params->get( 'hide_empty') && (!empty($value) ) )
                        	{          
                    ?>
                            <div id="<?php echo $key; ?>" class="icons">
                                <div class="icon icon_<?php echo $key; ?>"><?php echo JText::_('mycontacts_'.$key); ?></div>
                                <div class="im_info"><?php echo (!empty($value))? $value : JText::_('mycontacts_notavailable'); ?></div> 
                            </div>
                    <?php
                    		}
                        }
                    }
                    ?>
                </div>
                <div class="clearfix"></div>
            </div>
            <?php
            $contents    = ob_get_contents();
            ob_end_clean();        
            return $contents;
        }
    }
}

?>