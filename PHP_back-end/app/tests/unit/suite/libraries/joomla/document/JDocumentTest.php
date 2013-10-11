<?php
/**
 * @version		$Id: JDocumentTest.php 21780 2011-07-09 06:51:11Z infograf768 $
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

require_once JPATH_BASE.'/libraries/joomla/document/document.php';

/**
 * Test class for JDocument.
 * Generated by PHPUnit on 2009-10-09 at 12:13:55.
 */
class JDocumentTest extends PHPUnit_Framework_TestCase {
	/**
	 * @var	JDocument
	 * @access protected
	 */
	protected $object;

	/**
	 * Sets up the fixture, for example, opens a network connection.
	 * This method is called before a test is executed.
	 *
	 * @access protected
	 */
	protected function setUp() {
		//$this->object = new JDocument;
	}

	/**
	 * Tears down the fixture, for example, closes a network connection.
	 * This method is called after a test is executed.
	 *
	 * @access protected
	 */
	protected function tearDown() {

	}

	public function constructData()
	{
		return array(
			array(
				array('lineend' => "\12"),
				array(
					'lineend' => "\12",
					'charset' => 'utf-8',
					'language' => 'en-gb',
					'direction' => 'ltr',
					'tab' => "\11",
					'link' => '',
					'base' => ''
				)
			),
			array(
				array('charset' => "euc-jp"),
				array(
					'lineend' => "\12",
					'charset' => 'euc-jp',
					'language' => 'en-gb',
					'direction' => 'ltr',
					'tab' => "\11",
					'link' => '',
					'base' => ''
				)
			),
			array(
				array('language' => "de-de", 'direction' => 'rtl',
					'tab' => 'Crazy Tab', 'link' => 'http://joomla.org',
					'base' => 'http://base.joomla.org/dir'),
				array(
					'lineend' => "\12",
					'charset' => 'utf-8',
					'language' => 'de-de',
					'direction' => 'rtl',
					'tab' => "Crazy Tab",
					'link' => 'http://joomla.org',
					'base' => 'http://base.joomla.org/dir'
				)
			)



		);
	}

	/**
	 * @dataProvider constructData
	 */
	public function testConstruct($options, $expects)
	{
		$this->object = new JDocument($options);

		$this->assertThat(
			$this->object->_getLineEnd(),
			$this->equalTo($expects['lineend'])
		);

		$this->assertThat(
			$this->object->getCharset(),
			$this->equalTo($expects['charset'])
		);

		$this->assertThat(
			$this->object->getLanguage(),
			$this->equalTo($expects['language'])
		);

		$this->assertThat(
			$this->object->getDirection(),
			$this->equalTo($expects['direction'])
		);

		$this->assertThat(
			$this->object->_getTab(),
			$this->equalTo($expects['tab'])
		);

		$this->assertThat(
			$this->object->getLink(),
			$this->equalTo($expects['link'])
		);

		$this->assertThat(
			$this->object->getBase(),
			$this->equalTo($expects['base'])
		);

	}

	/**
	 * @todo Implement testGetInstance().
	 */
	public function testGetInstance() {
		$this->object = JDocument::getInstance();

		$this->assertThat(
			$this->object,
			$this->isInstanceOf('JDocumentHtml')
		);

		$this->object = JDocument::getInstance('custom');

		$this->assertThat(
			$this->object,
			$this->isInstanceOf('JDocumentRaw')
		);

		$this->assertThat(
			$this->object->getType(),
			$this->equalTo('custom')
		);


	}

	/**
	 * @todo Implement testSetType().
	 */
	public function testSetType() {
		$this->object = new JDocument;
		$this->object->setType('raw');
		$this->assertThat(
			$this->object->_type,
			$this->equalTo('raw'),
			'JDocument->setType failed'
		);
	}

	/**
	 * @todo Implement testGetType().
	 */
	public function testGetType() {
		$this->object = new JDocument;
		$this->object->_type = 'raw';
		$this->assertThat(
			$this->object->getType(),
			$this->equalTo('raw'),
			'JDocument->getType failed'
		);
	}

	/**
	 * This is an empty test for code coverage reasons (the method is empty)
	 */
	public function testGetHeadData() {
		$this->object = new JDocument;
		$this->object->getHeadData();
	}

	/**
	 * This is an empty test for code coverage reasons (the method is empty)
	 */
	public function testSetHeadData() {
		$this->object = new JDocument;
		$this->object->setHeadData(array());
	}

	/**
	 * Test getBuffer
	 */
	public function testGetBuffer() {
		$this->object = new JDocument;
		$this->object->setBuffer('This is the content of my document');

		$this->assertThat(
			$this->object->getBuffer(),
			$this->equalTo('This is the content of my document'),
			'getBuffer did not properly return document contents'
		);

	}

	/**
	 * Test setBuffer
	 */
	public function testSetBuffer() {
		$this->object = new JDocument;
		$this->object->setBuffer('This is the content of my document');

		$this->assertThat(
			$this->object->getBuffer(),
			$this->equalTo('This is the content of my document'),
			'setBuffer did not properly set document contents'
		);
	}

	/**
	 * @todo Implement testGetMetaData().
	 */
	public function testGetMetaData() {
		$this->object = new JDocument;
		$this->assertThat(
			$this->object->getMetaData('generator'),
			$this->equalTo('Joomla! 1.7 - Open Source Content Management'),
			'JDocument::getMetaData did not return generator properly'
		);

		$this->object->setMetaData('generator', 'My Custom Generator');

		$this->assertThat(
			$this->object->getMetaData('generator'),
			$this->equalTo('My Custom Generator'),
			'JDocument::getMetaData did not return generator properly or setMetaData with generator did not work'
		);

		$this->assertThat(
			$this->object->getMetaData('description'),
			$this->equalTo(''),
			'JDocument::getMetaData did not return description properly'
		);

		$this->object->setMetaData('description', 'My Description');

		$this->assertThat(
			$this->object->getMetaData('description'),
			$this->equalTo('My Description'),
			'JDocument::getMetaData did not return description properly or setMetaData with description didn not set properly'
		);

		$this->object->setMetaData('myMetaTag', 'myMetaContent');

		$this->assertThat(
			$this->object->getMetaData('myMetaTag'),
			$this->equalTo('myMetaContent'),
			'JDocument::getMetaData or setMetaData failed'
		);

		$this->assertThat(
			$this->object->getMetaData('myMetaTag', true),
			$this->logicalNot($this->equalTo('myMetaContent')),
			'JDocument::getMetaData or setMetaData returned http_equiv when it should not have'
		);

		$this->object->setMetaData('myOtherMetaTag', 'myOtherMetaContent', true);

		$this->assertThat(
			$this->object->getMetaData('myOtherMetaTag', true),
			$this->equalTo('myOtherMetaContent'),
			'JDocument::getMetaData or setMetaData failed'
		);

		$this->assertThat(
			$this->object->getMetaData('myOtherMetaTag'),
			$this->logicalNot($this->equalTo('myOtherMetaContent')),
			'JDocument::getMetaData or setMetaData returned http_equiv when it should not have'
		);


	}

	/**
	 * @todo Implement testAddScript().
	 */
	public function testAddScript() {
		$this->object = new JDocument;

		$this->object->addScript('http://www.joomla.org');
		$this->assertThat(
			$this->object->_scripts['http://www.joomla.org']['mime'],
			$this->equalTo('text/javascript'),
			'JDocument->addScript failed'
		);
		$this->assertThat(
			$this->object->_scripts['http://www.joomla.org']['defer'],
			$this->equalTo(FALSE),
			'JDocument->addScript failed'
		);
		$this->assertThat(
			$this->object->_scripts['http://www.joomla.org']['async'],
			$this->equalTo(FALSE),
			'JDocument->addScript failed'
		);

		$this->object->addScript('http://test.joomla.org', 'My Type', TRUE, TRUE);
		$this->assertThat(
			$this->object->_scripts['http://test.joomla.org']['mime'],
			$this->equalTo('My Type'),
			'JDocument->addScript failed'
		);
		$this->assertThat(
			$this->object->_scripts['http://test.joomla.org']['defer'],
			$this->equalTo(TRUE),
			'JDocument->addScript failed'
		);
		$this->assertThat(
			$this->object->_scripts['http://test.joomla.org']['async'],
			$this->equalTo(TRUE),
			'JDocument->addScript failed'
		);

	}

	/**
	 * @todo Implement testAddScriptDeclaration().
	 */
	public function testAddScriptDeclaration() {
		$this->object = new JDocument;

		$this->object->addScriptDeclaration('My Script');
		$this->assertThat(
			$this->object->_script['text/javascript'],
			$this->equalTo('My Script'),
			'JDocument->addScriptDeclaration failed'
		);

		$this->object->addScriptDeclaration('My Script', 'my/type');
		$this->assertThat(
			$this->object->_script['my/type'],
			$this->equalTo('My Script'),
			'JDocument->addScriptDeclaration failed'
		);

		$this->object->addScriptDeclaration('My Second Script');
		$this->assertThat(
			$this->object->_script['text/javascript'],
			$this->equalTo('My Script'.chr(13).'My Second Script'),
			'JDocument->addScriptDeclaration failed'
		);

	}

	/**
	 * @todo Implement testAddStyleSheet().
	 */
	public function testAddStyleSheet() {
		$this->object = new JDocument;

		$this->object->addStyleSheet(
			'http://www.joomla.org', 'text/style', 'screen', array('attrib1' => 'value1')
		);

		$this->assertThat(
			$this->object->_styleSheets['http://www.joomla.org']['mime'],
			$this->equalTo('text/style')
		);

		$this->assertThat(
			$this->object->_styleSheets['http://www.joomla.org']['media'],
			$this->equalTo('screen')
		);

		$this->assertThat(
			$this->object->_styleSheets['http://www.joomla.org']['attribs'],
			$this->equalTo(array('attrib1' => 'value1'))
		);

	}

	/**
	 * @todo Implement testAddStyleDeclaration().
	 */
	public function testAddStyleDeclaration() {
		$this->object = new JDocument;

		$this->object->addStyleDeclaration('My Style');
		$this->assertThat(
			$this->object->_style['text/css'],
			$this->equalTo('My Style'),
			'JDocument->addStyleDeclaration failed'
		);

		$this->object->addStyleDeclaration('My Style', 'my/type');
		$this->assertThat(
			$this->object->_style['my/type'],
			$this->equalTo('My Style'),
			'JDocument->addStyleDeclaration failed'
		);

		$this->object->addStyleDeclaration('My Second Style');
		$this->assertThat(
			$this->object->_style['text/css'],
			$this->equalTo('My Style'.chr(13).'My Second Style'),
			'JDocument->addStyleDeclaration failed'
		);
	}

	/**
	 * @todo Implement testSetCharset().
	 */
	public function testSetCharset() {
		$this->object = new JDocument;

		$this->object->setCharset('My Character Set');

		$this->assertThat(
			$this->object->_charset,
			$this->equalTo('My Character Set')
		);
	}

	/**
	 * @todo Implement testGetCharset().
	 */
	public function testGetCharset() {
		$this->object = new JDocument;

		$this->object->_charset = 'My Character Set';

		$this->assertThat(
			$this->object->getCharset(),
			$this->equalTo('My Character Set')
		);
	}

	/**
	 * @todo Implement testSetLanguage().
	 */
	public function testSetLanguage() {
		$this->object = new JDocument;

		$this->object->setLanguage('My Character Set');

		$this->assertThat(
			$this->object->language,
			$this->equalTo('my character set')
		);
	}

	/**
	 * @todo Implement testGetLanguage().
	 */
	public function testGetLanguage() {
		$this->object = new JDocument;

		$this->object->language = 'de-de';

		$this->assertThat(
			$this->object->getLanguage(),
			$this->equalTo('de-de')
		);
	}

	/**
	 * @todo Implement testSetDirection().
	 */
	public function testSetDirection() {
		$this->object = new JDocument;

		$this->object->setDirection('rtl');

		$this->assertThat(
			$this->object->direction,
			$this->equalTo('rtl')
		);
	}

	/**
	 * @todo Implement testGetDirection().
	 */
	public function testGetDirection() {
		$this->object = new JDocument;

		$this->object->direction = 'rtl';

		$this->assertThat(
			$this->object->getDirection(),
			$this->equalTo('rtl')
		);
	}

	/**
	 * @todo Implement testSetTitle().
	 */
	public function testSetTitle() {
		$this->object = new JDocument;

		$this->object->setTitle('My Title');

		$this->assertThat(
			$this->object->title,
			$this->equalTo('My Title')
		);
	}

	/**
	 * @todo Implement testGetTitle().
	 */
	public function testGetTitle() {
		$this->object = new JDocument;

		$this->object->title = 'My Title';

		$this->assertThat(
			$this->object->getTitle(),
			$this->equalTo('My Title')
		);
	}

	/**
	 * @todo Implement testSetBase().
	 */
	public function testSetBase() {
		$this->object = new JDocument;

		$this->object->setBase('http://www.example.com/base');

		$this->assertThat(
			$this->object->base,
			$this->equalTo('http://www.example.com/base')
		);
	}

	/**
	 * @todo Implement testGetBase().
	 */
	public function testGetBase() {
		$this->object = new JDocument;

		$this->object->base = 'http://www.example.com/base';

		$this->assertThat(
			$this->object->getBase(),
			$this->equalTo('http://www.example.com/base')
		);
	}

	/**
	 * @todo Implement testSetDescription().
	 */
	public function testSetDescription() {
		$this->object = new JDocument;

		$this->object->setDescription('Joomla Rocks');

		$this->assertThat(
			$this->object->description,
			$this->equalTo('Joomla Rocks')
		);
	}

	/**
	 * @todo Implement testGetDescription().
	 */
	public function testGetDescription() {
		$this->object = new JDocument;

		$this->object->description = 'Joomla Rocks';

		$this->assertThat(
			$this->object->getDescription(),
			$this->equalTo('Joomla Rocks')
		);
	}

	/**
	 * @todo Implement testSetLink().
	 */
	public function testSetLink() {
		$this->object = new JDocument;

		$this->object->setLink('My Link String');

		$this->assertThat(
			$this->object->link,
			$this->equalTo('My Link String')
		);
	}

	/**
	 * @todo Implement testGetLink().
	 */
	public function testGetLink() {
		$this->object = new JDocument;

		$this->object->link = 'My Link String';

		$this->assertThat(
			$this->object->getLink(),
			$this->equalTo('My Link String')
		);
	}

	/**
	 * @todo Implement testSetGenerator().
	 */
	public function testSetGenerator() {
		$this->object = new JDocument;

		$this->object->setGenerator('Joomla Content Management');

		$this->assertThat(
			$this->object->_generator,
			$this->equalTo('Joomla Content Management')
		);
	}

	/**
	 * @todo Implement testGetGenerator().
	 */
	public function testGetGenerator() {
		$this->object = new JDocument;

		$this->object->_generator = 'Joomla Content Management';

		$this->assertThat(
			$this->object->getGenerator(),
			$this->equalTo('Joomla Content Management')
		);
	}

	/**
	 * @todo Implement testSetModifiedDate().
	 */
	public function testSetModifiedDate() {
		$this->object = new JDocument;

		$this->object->setModifiedDate('2010-06-22');

		$this->assertThat(
			$this->object->_mdate,
			$this->equalTo('2010-06-22')
		);
	}

	/**
	 * @todo Implement testGetModifiedDate().
	 */
	public function testGetModifiedDate() {
		$this->object = new JDocument;

		$this->object->_mdate = '2010-06-22';

		$this->assertThat(
			$this->object->getModifiedDate(),
			$this->equalTo('2010-06-22')
		);
	}

	/**
	 * @todo Implement testSetMimeEncoding().
	 */
	public function testSetMimeEncoding() {
		$this->object = new JDocument;

		$this->object->setMimeEncoding('text/xls');

		$this->assertThat(
			$this->object->_mime,
			$this->equalTo('text/xls')
		);
	}

	/**
	 * @group Document
	 * @covers JDocument::getMimeEncoding
	 */
	public function testGetMimeEncoding() {
		$document = new JDocument();
		$document->setMimeEncoding('image');
		$this->assertEquals('image',$document->getMimeEncoding(),'getMimeEncoding should be image');
		$document->setMimeEncoding('zip');
		$this->assertEquals('zip',$document->getMimeEncoding(),'getMimeEncoding should be zip');
 	}

	/**
	 * @todo Implement testSetLineEnd().
	 */
	public function testSetLineEnd() {
		$this->object = new JDocument;

		$this->object->setLineEnd('win');

		$this->assertThat(
			$this->object->_lineEnd,
			$this->equalTo("\15\12")
		);

		$this->object->setLineEnd('unix');

		$this->assertThat(
			$this->object->_lineEnd,
			$this->equalTo("\12")
		);

		$this->object->setLineEnd('mac');

		$this->assertThat(
			$this->object->_lineEnd,
			$this->equalTo("\15")
		);

		$this->object->setLineEnd('<br />');

		$this->assertThat(
			$this->object->_lineEnd,
			$this->equalTo("<br />")
		);

	}

	/**
	 * @todo Implement test_getLineEnd().
	 */
	public function test_getLineEnd() {
		$this->object = new JDocument;

		$this->object->_lineEnd = "\12";

		$this->assertThat(
			$this->object->_getLineEnd(),
			$this->equalTo("\12")
		);
	}

	/**
	 * @todo Implement testSetTab().
	 */
	public function testSetTab() {
		$this->object = new JDocument;

		$this->object->setTab('Crazy Indent');

		$this->assertThat(
			$this->object->_tab,
			$this->equalTo('Crazy Indent')
		);

	}

	/**
	 * @todo Implement test_getTab().
	 */
	public function test_getTab() {
		$this->object = new JDocument;

		$this->object->_tab = 'Crazy Indent';

		$this->assertThat(
			$this->object->_getTab(),
			$this->equalTo('Crazy Indent')
		);
	}

	/**
	 * @todo Implement testLoadRenderer().
	 */
	public function testLoadRenderer() {
		$this->object = new JDocument;
		$this->object->setType('html');
		$renderer = $this->object->loadRenderer('head');
		$this->assertThat(
			$renderer,
			$this->isInstanceOf('JDocumentRendererHead')
		);
	}

	/**
	 * @todo Implement testParse().
	 */
	public function testParse() {
		$this->object = new JDocument;

		$this->assertThat(
			$this->object->parse(),
			$this->equalTo(null)
		);
	}

	/**
	 * @todo Implement testRender().
	 */
	public function testRender() {
		$this->object = new JDocument;

		$this->object->render();
		$headers = JResponse::getHeaders();

		$lastMod = false;
		$contentType = false;

		foreach($headers AS $header) {
			if ($header['name'] == 'Last-Modified') {
				$lastMod = $header;
			}

			if ($header['name'] == 'Content-Type') {
				$contentType = $header;
			}
		}

		$this->assertThat(
			$lastMod,
			$this->equalTo(false)
		);

		$this->assertThat(
			$contentType['value'],
			$this->equalTo('; charset=utf-8')
		);

		$this->object->setModifiedDate('My date');
		$this->object->setMimeEncoding('MyMimeType');
		$this->object->setCharset('MyCharset');

		$this->object->render();

		$headers = JResponse::getHeaders();

		$lastMod = false;
		$contentType = false;

		foreach($headers AS $header) {
			if ($header['name'] == 'Last-Modified') {
				$lastMod = $header;
			}

			if ($header['name'] == 'Content-Type') {
				$contentType = $header;
			}
		}

		$this->assertThat(
			$lastMod['value'],
			$this->equalTo('My date')
		);

		$this->assertThat(
			$contentType['value'],
			$this->equalTo('mymimetype; charset=MyCharset')
		);

	}
}
