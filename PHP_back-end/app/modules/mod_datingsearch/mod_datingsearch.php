<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
// no direct access
defined('_JEXEC') or die('Restricted access');

require_once ( JPATH_ROOT . DS . 'components' . DS . 'com_community' . DS . 'libraries' . DS . 'core.php' );
require_once ( dirname(__FILE__) . DS . 'helper.php' );

$field = new stdClass();

//field code.
$field->code->gender 	= $params->get('field_gender', 'FIELD_GENDER');
$field->code->birthday 	= $params->get('field_birthday', 'FIELD_BIRTHDAY');
$field->code->country 	= $params->get('field_country', 'FIELD_COUNTRY');
$field->code->state 	= $params->get('field_state', 'FIELD_STATE');
$field->code->city 		= $params->get('field_city', 'FIELD_CITY');

//field value.
$field->value->gender	= modDatingSearchHelper::getGenderValue($field->code->gender);
$field->value->country	= modDatingSearchHelper::getCountryValue($field->code->country);

//field type
$field->type 			= modDatingSearchHelper::getFieldType($field->code);

//history of previous serach if exist.
$gender 	= JRequest::getVar('datingsearch_gender', '', 'GET');
$agefrom 	= JRequest::getVar('datingsearch_agefrom', '', 'GET');
$ageto 		= JRequest::getVar('datingsearch_ageto', '', 'GET');
$country	= JRequest::getVar('datingsearch_country', '', 'GET');
$state		= JRequest::getVar('datingsearch_state', '', 'GET');
$city		= JRequest::getVar('datingsearch_city', '', 'GET');
$itemid		= CRoute::getItemId();

require(JModuleHelper::getLayoutPath('mod_datingsearch'));