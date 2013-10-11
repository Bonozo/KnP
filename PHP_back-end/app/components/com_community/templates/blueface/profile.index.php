<?php
/**
 * @package		JomSocial
 * @subpackage 	Template
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 *
 */
defined('_JEXEC') or die(); ?>

<script type="text/javascript">joms.filters.bind();</script>

<!-- begin: #cProfileWrapper -->
<div id="cProfileWrapper">

    <!-- begin: .cLayout -->
    <div class="cLayout clrfix">
    
        <?php $this->renderModules( 'js_profile_top' ); ?>
		<?php echo $adminControlHTML; ?>
        <div class="page-actions">
        	<?php echo $blockUserHTML;?>
            <?php echo $reportsHTML;?>
            <?php echo $bookmarksHTML;?>
            <div class="clr"></div>
        </div>

				<!-- begin: .cSidebar -->
				<div class="cSidebar clrfix">
					<!-- User avatar -->
					<div class="profile-avatar">
						<?php if( $isMine ): ?><a href="<?php echo CRoute::_('index.php?option=com_community&view=profile&task=uploadAvatar'); ?>"><?php endif; ?><img src="<?php echo $user->getAvatar(); ?>" alt="<?php echo $user->getDisplayName(); ?>" /><?php if( $isMine ): ?></a><?php endif; ?>
					</div>
					<!-- end Avatar -->

					<!-- like box -->
					<div class="profile-likes"><span id="like-container"><?php echo $likesHTML; ?></span></div>
					<!-- end like box -->
					
					<!-- Profile video link -->
					<?php if( $config->get('enablevideos') ){ ?>
						<?php if( $config->get('enableprofilevideo') && ($videoid != 0) ){ ?>
							<div class="profile-video-link">
								<a class="icon-videos" onclick="joms.videos.playProfileVideo( <?php echo $videoid; ?> , <?php echo $user->id; ?> )" href="javascript:void(0);"><?php echo JText::_('COM_COMMUNITY_VIDEOS_MY_PROFILE');?></a>
							</div>
						<?php } ?>
					<?php } ?>
					<!-- end profile video link-->

            <?php $this->renderModules( 'js_side_top' ); ?>
			<?php $this->renderModules( 'js_profile_side_top' ); ?>
			<?php echo $sidebarTop; ?>            
            
            <?php echo $friends; ?>
            <?php if( $config->get('enablegroups')){ ?>
            <?php echo $groups; ?>
            <?php } ?>
            <?php echo $sidebarBottom; ?>
            <?php $this->renderModules( 'js_profile_side_bottom' ); ?>
            <?php $this->renderModules( 'js_side_bottom' ); ?>
        </div>
        <!-- end: .cSidebar -->

        <div class="cMain clrfix">

            <?php echo @$header; ?>

        <div style="padding-bottom: 20px;">
        <table cellpadding="3" cellspacing="3" border="0" width="100%" class="table-info">
                <tr>
                    <?php if($config->get('enablekarma')){ ?>
                    <td align="center" valign="top" style="width: 20%">
                        <div class="number"><?php echo $user->_points; ?></div>
                        <div class="text"><?php echo JText::sprintf( (CStringHelper::isPlural($user->_points)) ? 'COM_COMMUNITY_POINTS' : 'COM_COMMUNITY_SINGULAR_POINT' ); ?></div>
                    </td>
                    <?php } ?>
                    <td align="center" valign="top" style="width: 20%">
                        <a href="<?php echo CRoute::_('index.php?option=com_community&view=groups&userid='.$user->id); ?>">
                            <div class="number"><?php echo $totalgroups; ?></div>
                            <div class="text"><?php echo JText::sprintf( (CStringHelper::isPlural($totalgroups)) ? 'COM_COMMUNITY_GROUPS_PLURAL_GROUP' : 'COM_COMMUNITY_SINGULAR_GROUP' ); ?></div>
                        </a>
                    </td>
                    
                    <td align="center" valign="top" style="width: 20%">
                        <a href="<?php echo CRoute::_('index.php?option=com_community&view=friends&userid='.$user->id); ?>">
                            <div class="number"><?php echo $totalfriends; ?></div>
                            <div class="text"><?php echo JText::sprintf( (CStringHelper::isPlural($totalfriends)) ? 'COM_COMMUNITY_FRIENDS' : 'COM_COMMUNITY_SINGULAR_FRIEND' ); ?></div>
                        </a>
                    </td>
                    <?php
                        if( $config->get('enablephotos') )
                        {
                    ?>
                    <td align="center" valign="top" style="width: 20%">
                        <a href="<?php echo CRoute::_('index.php?option=com_community&view=photos&task=myphotos&userid='.$user->id); ?>">
                            <div class="number"><?php echo $totalphotos; ?></div>
                            <div class="text"><?php echo JText::sprintf( (CStringHelper::isPlural($totalphotos)) ? 'COM_COMMUNITY_PHOTOS' : 'COM_COMMUNITY_SINGULAR_PHOTO' ); ?></div>
                        </a>
                    </td>
                    <?php
                        }
                    ?>
                    <td align="center" valign="top" style="width: 20%">
                        <div class="number">
                        <?php
                        if ( !$totalactivities == '' OR $totalactivities > 0 ) {
                            echo $totalactivities;
                        }
                        else {
                            echo 0;
                        }
                         ?>
                         </div>
                         <div class="text"><?php echo JText::sprintf( (CStringHelper::isPlural($totalactivities)) ? 'COM_COMMUNITY_ACTIVITIES' : 'COM_COMMUNITY_ACTIVITY' ); ?></div>
                    </td>
                </tr>
            </table>
            </div>

            <?php echo $about; ?>            

            <!-- begin: Activity Stream -->
            <div class="app-box">
                <div class="app-box-header">
                    <h2 class="app-box-title"><?php echo JText::_('COM_COMMUNITY_FRONTPAGE_RECENT_ACTIVITIES'); ?></h2>
                </div>
                <div class="app-box-content">
                    <?php $this->renderModules( 'js_profile_feed_top' ); ?>
					<div class="joms-latest-activities-container">
						<a id="activity-update-click" href="javascript:void(0);">1 new update </a>
					</div>
					<?php if($config->get('enable_refresh') == 1 && $isMine) : ?>
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
                    <div id="activity-stream-container"><?php echo $newsfeed; ?></div>
                    <?php $this->renderModules( 'js_profile_feed_bottom' ); ?>
                </div>
            </div>
            <!-- end: Activity Stream -->
            
            <?php echo $content; ?>
                    
        </div>
        
        <?php $this->renderModules( 'js_profile_bottom' ); ?>
    </div>
    <!-- end: .cLayout -->

</div>
<!-- end: #cProfileWrapper -->

<?php /* Insert plugin javascript at the bottom */ echo $jscript; ?>