<?php
/* @var $this SiteController */

$this->pageTitle=Yii::app()->name . ' - About';
$this->breadcrumbs=array(
	'About',
);
if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('UTC');
}

?>
<h1>About</h1>

<script type='text/javascript' src='//secure.opentable.com/widget/reservation/loader?rid=27763&domain=com&type=standard&theme=standard&lang=en&overlay=false&iframe=true'></script>


<p>This is a "static" page. You may change the content of this page
by updating the file <code><?php echo __FILE__; ?></code>.</p>
