<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');
?>
<script type="text/javascript">
	function getBirthday(years)
	{
		if(years=="")
		{
			return false;
		}
		
		var now 		= new Date();
		var birthday	= new Date(now.getTime()-years*365*24*60*60*1000);
		var date 		= birthday.getDate()+"/"+birthday.getMonth()+"/"+birthday.getFullYear();
		
		return date;
	}
	
	function submitSearchForm()
	{
		var gender 			= joms.jQuery("#datingsearch_gender").val();
		var agefrom 		= joms.jQuery("#datingsearch_agefrom").val();
		var ageto 			= joms.jQuery("#datingsearch_ageto").val();
		var city 			= joms.jQuery("#datingsearch_city").val();
		var state 			= joms.jQuery("#datingsearch_state").val();
		var country 		= joms.jQuery("#datingsearch_country").val();
		var birthdaystop 	= getBirthday(agefrom);
		var birthdaystart	= getBirthday(ageto);
		var keylist			= "";
				
		joms.jQuery("#datingsearch_search").attr("disabled", true);
		
		if(gender)
		{
			joms.jQuery("#datingsearch_hidden").append('<input type="hidden" name="field0" value="<?php echo $field->code->gender; ?>"><input type="hidden" name="condition0" value="equal"><input type="hidden" name="value0" value="'+joms.jQuery("#datingsearch_gender").val()+'"><input type="hidden" name="fieldType0" value="<?php echo $field->type->gender;?>">');
			
			if(keylist!="")
			{
				keylist += ","
			}
			keylist += "0";
		}
				
		if(birthdaystop || birthdaystart)
		{
			var extraAppend = "";
			
			if(birthdaystop && birthdaystart)
			{
				extraAppend = '<input type="hidden" name="condition1" value="between"><input type="hidden" name="value1" value="'+birthdaystart+'"><input type="hidden" name="value1_2" value="'+birthdaystop+'">';
			}
			else if(birthdaystop && !birthdaystart)
			{
				extraAppend = '<input type="hidden" name="condition1" value="lessthanorequal"><input type="hidden" name="value1" value="'+birthdaystop+'">';
			}
			else if(!birthdaystop && birthdaystart)
			{
				extraAppend = '<input type="hidden" name="condition1" value="greaterthanorequal"><input type="hidden" name="value1" value="'+birthdaystart+'">';
			}
			
			joms.jQuery("#datingsearch_hidden").append('<input type="hidden" name="field1" value="<?php echo $field->code->birthday; ?>">'+extraAppend+'<input type="hidden" name="fieldType1" value="<?php echo $field->type->birthday;?>">');
			
			if(keylist!="")
			{
				keylist += ","
			}
			keylist += "1";
		}
		
		if(city)
		{
			joms.jQuery("#datingsearch_hidden").append('<input type="hidden" name="field2" value="<?php echo $field->code->city; ?>"><input type="hidden" name="condition2" value="equal"><input type="hidden" name="value2" value="'+city+'"><input type="hidden" name="fieldType2" value="<?php echo $field->type->city;?>">');
			
			if(keylist!="")
			{
				keylist += ","
			}
			keylist += "2";
		}
		
		if(state)
		{
			joms.jQuery("#datingsearch_hidden").append('<input type="hidden" name="field3" value="<?php echo $field->code->state; ?>"><input type="hidden" name="condition3" value="equal"><input type="hidden" name="value3" value="'+state+'"><input type="hidden" name="fieldType3" value="<?php echo $field->type->state;?>">');
			
			if(keylist!="")
			{
				keylist += ","
			}
			keylist += "3";
		}
		
		if(country)
		{
			joms.jQuery("#datingsearch_hidden").append('<input type="hidden" name="field4" value="<?php echo $field->code->country; ?>"><input type="hidden" name="condition4" value="equal"><input type="hidden" name="value4" value="'+country+'"><input type="hidden" name="fieldType4" value="<?php echo $field->type->country;?>">');
			
			if(keylist!="")
			{
				keylist += ","
			}
			keylist += "4";
		}
		
		if(keylist)
		{
			joms.jQuery("#datingsearch_hidden").append('<input type="hidden" id="key-list" name="key-list" value="'+keylist+'" />');
			joms.jQuery("#datingsearch").submit();
		}
		else
		{
			joms.jQuery("#datingsearch_search").attr("disabled", false);
		}
	}
</script>
<div class="<?php echo $params->get('moduleclass_sfx'); ?>">
	<form name="datingsearch" id="datingsearch" method="GET" action="<?php echo CRoute::_('index.php?option=com_community&view=search&task=advancesearch&Itemid=' . $itemid); ?>">
		<div>
			<div style="float:left; width:88px;"><?php echo JText::_('MOD_DATINGSEARCH LOOKING FOR'); ?></div>
			<div>
				<select id="datingsearch_gender" name="datingsearch_gender" style="width:96px;">
					<option value="" <?php if($gender=='')echo 'selected'?>><?php echo JText::_('MOD_DATINGSEARCH GENDER'); ?></option>
					<?php
					foreach($field->value->gender as $data)
					{
					?>
						<option value="<?php echo $data; ?>" <?php if($gender==$data)echo 'selected'?>><?php echo $data; ?></option>
					<?php
					}
					?>
				</select>
			</div>
			<div style="clear:both; margin-bottom:3px;"></div>
		</div>
		
		<div>
			<div style="float:left; width:88px;"><?php echo JText::_('MOD_DATINGSEARCH AGE BETWEEN'); ?></div>
			<div>
				<input type="text" style="width:28px;" maxlength=3 id="datingsearch_agefrom" name="datingsearch_agefrom" value="<?php echo $agefrom; ?>"/> <?php echo JText::_('MOD_DATINGSEARCH TO');?> 
				<input type="text" style="width:28px;" maxlength=3 id="datingsearch_ageto" name="datingsearch_ageto" value="<?php echo $ageto;?>"/>
			</div>
			<div style="clear:both; margin-bottom:3px;"></div>
		</div>
		
		<div><?php echo JText::_('MOD_DATINGSEARCH LOCATION'); ?> : </div>
		<div>
			<div style="float:left; width:88px;"><?php echo JText::_('MOD_DATINGSEARCH CITY'); ?></div>
			<div><input type="text" style="width:84px;" id="datingsearch_city" name="datingsearch_city" value="<?php echo $city;?>"/></div>
			<div style="clear:both; margin-bottom:3px;"></div>
		</div>
		<div>
			<div style="float:left; width:88px;"><?php echo JText::_('MOD_DATINGSEARCH STATE'); ?></div>
			<div><input type="text" style="width:84px;" id="datingsearch_state" name="datingsearch_state" value="<?php echo $state;?>"/></div>
			<div style="clear:both; margin-bottom:3px;"></div>
		</div>
		<div>
			<div style="float:left; width:88px;"><?php echo JText::_('MOD_DATINGSEARCH COUNTRY'); ?></div>
			<div>
				<select id="datingsearch_country" name="datingsearch_country" style="width:96px;">
					<option value="" <?php if($country=='')echo 'selected'?>><?php echo JText::_('MOD_DATINGSEARCH COUNTRY'); ?></option>
					<?php
					foreach($field->value->country as $data)
					{
					?>
						<option value="<?php echo $data; ?>" <?php if($country==$data)echo 'selected'?>><?php echo $data; ?></option>
					<?php
					}
					?>
				</select>
			</div>
			<div style="clear:both; margin-bottom:3px;"></div>
		</div>
		
		<div style="clear:both; margin-bottom:10px;"></div>
		
		<div style="text-align:center;">
			<input type="button" class="button" id="datingsearch_search" name="datingsearch_search" value="<?php echo JText::_('MOD_DATINGSEARCH SEARCH'); ?>" onclick="submitSearchForm();"/>
		</div>
		<div style="clear:both; margin-bottom:3px;"></div>
		
		<div id="datingsearch_hidden">
			<input type="hidden" name="operator" value="and" />
			<input type="hidden" name="option" value="com_community" />
			<input type="hidden" name="view" value="search" />
			<input type="hidden" name="task" value="advancesearch" />
			<input type="hidden" name="Itemid" value="<?php echo $itemid; ?>" />
		</div>
	</form>
</div>