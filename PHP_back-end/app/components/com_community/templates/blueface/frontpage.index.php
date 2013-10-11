<?php
/**
 * @package		JomSocial
 * @subpackage 	Template 
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 * 
 */
defined('_JEXEC') or die();
?>
<script type="text/javascript">joms.filters.bind();</script>
<?php echo $header;?>

<!-- .frontpage -->
<div class="frontpage">


<!-- .frontpage-right -->
<div class="frontpage-right">

    <?php $this->renderModules( 'js_side_top' ); ?>
    
    <?php if( $this->params->get('showsearch') == '1' || ($this->params->get('showsearch') == '2' && $my->id != 0 ) ) { ?>
    <!-- Search -->
    <div class="app-box">
        <div class="app-box-header">
            <h2 class="app-box-title"><?php echo JText::_('COM_COMMUNITY_SEARCH'); ?></h2>
        </div>
        <div class="app-box-content">
            <form name="search" id="cFormSearch" method="get" action="<?php echo CRoute::_('index.php?option=com_community&view=search');?>">
                <input type="text" class="inputbox" id="keyword" name="q" />
                <input type="submit" name="submit" value="<?php echo JText::_('COM_COMMUNITY_SEARCH'); ?>" class="button" />
            	<input type="hidden" name="option" value="com_community" />
            	<input type="hidden" name="view" value="search" />
                <div class="small">
                    <?php echo JText::sprintf('COM_COMMUNITY_TRY_ADVANCED_SEARCH', CRoute::_('index.php?option=com_community&view=search&task=advancesearch') ); ?>
                </div>
            </form>
        </div>
    </div>
    <!-- Search -->
    <?php } ?>
    
    <!-- Latest Members -->
    <?php if($this->params->get('showlatestmembers') ){ ?>
		<?php if( $this->params->get('showlatestmembers') == '1' || ($this->params->get('showlatestmembers') == '2' && $my->id != 0 ) ) { ?>
        <div id="latest-members" class="app-box">
	    <?php echo $latestMembers; ?>
        </div>
		<?php } ?>
	<?php } ?>
    <!-- Latest Members -->
    
    <!-- Latest Groups -->
    <?php if($config->get('enablegroups')) { ?>
    <?php if( !empty($latestGroups) && ($this->params->get('showlatestgroups') == '1' || ($this->params->get('showlatestgroups') == '2' && $my->id != 0 ) ) ) { ?>
	    <?php echo $latestGroups;?>
	    <div class="app-box-footer">
		    <a href="<?php echo CRoute::_('index.php?option=com_community&view=groups'); ?>"><?php echo JText::_('COM_COMMUNITY_GROUPS_VIEW_ALL'); ?></a>
	    </div>
	<?php } ?>
    <?php } ?>
    <!-- Latest Groups -->
    
    <!-- Latest Events -->
	<?php if($this->params->get('frontpage_latest_events')) { ?>
			<?php if($config->get('enableevents') ) { ?>
			<?php if( !empty($latestEvents) && ( $this->params->get('frontpage_latest_events') == '1' || ($this->params->get('frontpage_latest_events') == '2' && $my->id != 0 ) ) ) { ?>
			<!-- Latest Events -->
			<div class="app-box latest-events"><?php echo $latestEvents; ?></div>
			<!-- Latest Events -->
			<?php } ?>
			<?php } ?>
	<?php } ?>
    <!-- Latest Events -->
    
    <!-- Latest Photo -->
    <?php if($config->get('enablephotos')){ ?>
    <?php if( $this->params->get('showlatestphotos') == '1' || ($this->params->get('showlatestphotos') == '2' && $my->id != 0 ) ) { ?>
	    <div class="app-box">
			<?php echo $latestPhotosHTML; ?>
	    </div>
    <?php } ?>
    <?php } ?>        
    <!-- Latest Photo -->

		<?php if($config->get('enablevideos')) { ?>
		<?php if($this->params->get('showlatestvideos') ){ ?>
		<?php if( $this->params->get('showlatestvideos') == '1' || ($this->params->get('showlatestvideos') == '2' && $my->id != 0 ) ) { ?>
		<!-- Latest Video -->
	    <div class="app-box" id="latest-videos">
	        <div class="app-box-header">
	        	<h2 class="app-box-title"><?php echo JText::_('COM_COMMUNITY_VIDEOS'); ?></h2>
	            <div class="app-box-menus">
	                <div class="app-box-menu toggle">
	                    <a class="app-box-menu-icon"
	                       href="javascript: void(0)"
	                       onclick="joms.apps.toggle('#latest-videos');"><span class="app-box-menu-title"><?php echo JText::_('COM_COMMUNITY_VIDEOS_EXPAND');?></span></a>
	                </div>
	            </div>
	        </div>

	        <div class="app-box-content">
	            <div id="latest-videos-nav" class="filterlink">
	                <div>
	                    <a class="newest-videos active-state" href="javascript:void(0);"><?php echo JText::_('COM_COMMUNITY_VIDEOS_NEWEST') ?></a>
                        <b>&middot;</b>
	                    <a class="featured-videos" href="javascript:void(0);"><?php echo JText::_('COM_COMMUNITY_VIDEOS_FEATURED_TITLE') ?></a>
                        <b>&middot;</b>
	                    <a class="popular-videos" href="javascript:void(0);"><?php echo JText::_('COM_COMMUNITY_VIDEOS_POPULAR') ?></a>
	                </div>
	                <div class="loading"></div>
	            </div>

	        	<div id="latest-videos-container" class="clrfix">
	            <?php echo $latestVideosHTML;?>
	        	</div>

	        <div class="app-box-footer no-border">
	            <a href="<?php echo CRoute::_('index.php?option=com_community&view=videos'); ?>"><?php echo JText::_('COM_COMMUNITY_VIDEOS_ALL'); ?></a>
	        </div>
	        </div>
	    </div>
	    <!-- Latest Video -->
	    <?php } ?>
	    <?php } ?>
		<?php } ?>

	
	<?php if( $this->params->get('showonline') == '1' || ($this->params->get('showonline') == '2' && $my->id != 0 ) ) { ?>
    <!-- Who's online -->
    <div class="app-box">
        <div class="app-box-header">
            <h2 class="app-box-title"><?php echo JText::_('COM_COMMUNITY_FRONTPAGE_WHOSE_ONLINE'); ?></h2>
            <div class="app-box-menus">
                <div class="app-box-menu"></div>
            </div>
        </div>
        
        <div class="app-box-content">
            <ul class="cResetList cThumbList clrfix">
                <?php
                    for( $i = 0 ; $i < count( $onlineMembers ); $i++ )
                    {
                        $row    =& $onlineMembers[$i];
                ?>
                <li>
                    <a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&userid='.$row->id ); ?>"><img class="avatar jomTips" src="<?php echo $row->user->getThumbAvatar(); ?>" title="<?php echo cAvatarTooltip($row->user); ?>" width="45" height="45" alt="<?php echo $row->user->getDisplayName();?>"/></a>
                </li>
                <?php
                    }
                ?>
            </ul>
        </div>
    </div>
    <!-- Who's online -->
	<?php } ?>
    <?php $this->renderModules( 'js_side_bottom' ); ?>

</div>
<!-- .frontpage-right -->



<!-- .frontpage-main -->
<div class="frontpage-main">
	
	
	
	<?php if( $config->get('showactivitystream') == '1' || ($config->get('showactivitystream') == '2' && $my->id != 0 ) ) { ?>
		
		<?php $userstatus->render(); ?>
		
	<!-- Recent Activities -->
    <div class="app-box" id="recent-activities">
    	<div class="app-box-header">
	        <h2 class="app-box-title"><?php echo JText::_('COM_COMMUNITY_FRONTPAGE_RECENT_ACTIVITIES'); ?></h2>
            <div class="app-box-menus">
                <div class="app-box-menu toggle">
                    <a class="app-box-menu-icon"
                       href="javascript: void(0)"
                       onclick="joms.apps.toggle('#recent-activities');">
                        <span class="app-box-menu-title"><?php echo JText::_('COM_COMMUNITY_VIDEOS_EXPAND');?></span>
                    </a>
                </div>
            </div>
		</div>
 		
        <div class="app-box-content">
			<?php if($alreadyLogin==1): ?>
            <div id="activity-stream-nav" class="filterlink">
                <div style="float: right;">
                    <a class="all-activity<?php echo $config->get('frontpageactivitydefault') == 'all' ? ' active-state': '';?>" href="javascript:void(0);"><?php echo JText::_('COM_COMMUNITY_VIEW_ALL') ?></a>
                    <a class="me-and-friends-activity<?php echo $config->get('frontpageactivitydefault') == 'friends' ? ' active-state': '';?>" href="javascript:void(0);"><?php echo JText::_('COM_COMMUNITY_ME_AND_FRIENDS') ?></a>
                </div>
                <div class="loading"></div>
								<div class="clr"></div>
            </div>
            <?php endif; ?>
            
            <div style="position: relative;">
				<div class="joms-latest-activities-container">
					<a id="activity-update-click" href="javascript:void(0);">1 new update </a>
				</div>
				<?php if($config->get('enable_refresh') == 1) : ?>
				<script type="text/javascript">
					joms.jQuery(document).ready(function(){
						joms.jQuery('#activity-update-click').click(function(){
							joms.jQuery('.joms-latest-activities-container').hide();
							joms.jQuery('.newly-added').show();
							joms.jQuery('.newly-added').removeClass('newly-added');
						});
						
						joms.activities.nextActivitiesCheck(<?php echo $config->get('stream_refresh_interval');?> );
					});
					
					function reloadActivities(){
						if(joms.jQuery('.joms-newsfeed-item').size() > 0){
						   joms.activities.getLatestContent(joms.jQuery('.joms-newsfeed-item').attr('id').substring(21),true); 
						}
					}
				</script>
				<?php endif ?>
								
								
                <div id="activity-stream-container">
                <?php echo $userActivities; ?>
                </div>
            </div>
        </div>
    </div>
	<!-- Recent Activities -->
    <?php } ?>
</div>
<!-- .frontpage-main -->

<div style="clear: right;"></div>

</div>
<!-- .frontpage -->