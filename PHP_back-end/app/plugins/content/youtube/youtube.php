<?php
/**
* @version		$Id: YouTube Video 1.1 2011-02-4 14:55:11Z $
* @package		Joomla 1.6
* @copyright	Copyright (C) 2005 - 2011 Maik Heinelt. All rights reserved.
* @author		Maik Heinelt (www.heinelt.info)
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/


defined( '_JEXEC' ) or die( 'Restricted access' );

jimport('joomla.plugin.plugin');


class plgContentyoutube extends JPlugin 
{
	function plgContentyoutube( &$subject, $params ) 
		{
			parent::__construct( $subject, $params );
		}


	function onContentPrepare( $context, &$row, &$params, $limitstart )
    	{
		
			// [[[ Load plugin params info
			$dheight = $this->params->def( 'dheight', 300 );
			$dwidth = $this->params->def( 'dwidth', 400 );
			// ]]] Load plugin params info
			
			
			$output = $row->text;
			$regex = "#{youtube}(.*?){/youtube}#s";
	
	
			preg_match_all( $regex, $output, $matches );
	

			$count = count( $matches[0] );
			
			
			if ( $count ) 
				{
					for ( $i=0; $i < $count; $i++ )
						{
					
							$replacement = '
<!-- Start of YouTube Plugin v1.1 ( http://heinelt.info ) -->
<object width="'.$dwidth.'" height="'.$dheight.'">
<param 
	name="movie" 
	value="http://www.youtube.com/v/'.$matches[1][$i].'">
</param>
<embed 
	src="http://www.youtube.com/v/'.$matches[1][$i].'" 
	type="application/x-shockwave-flash" 
	width="'.$dwidth.'" 
	height="'.$dheight.'">
</embed>
</object>
<!-- End of YouTube Plugin v1.1 ( http://heinelt.info ) -->';
					
					$row->text 	= preg_replace( $regex, $replacement, $row->text, 1);
					
						}
				}

        	return true;
    	}
}
?>
