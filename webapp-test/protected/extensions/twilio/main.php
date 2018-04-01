<!DOCTYPE html>
<html>
<head>

	<link rel="stylesheet" type="text/css" href="https://studypool-likepluminc.netdna-ssl.com/css/screen.css" media="screen, projection" />
	<link rel="stylesheet" type="text/css" href="https://studypool-likepluminc.netdna-ssl.com/css/ie.css" media="screen, projection" />
    <link rel="stylesheet" type="text/css" href="https://studypool-likepluminc.netdna-ssl.com/css/likeplum.css" />
	<link rel="stylesheet" type="text/css" href="https://studypool-likepluminc.netdna-ssl.com/css/main.css" />
	<link rel="stylesheet" type="text/css" href="https://studypool-likepluminc.netdna-ssl.com/css/form.css" />
    <link rel="stylesheet" type="text/css" href="https://studypool-likepluminc.netdna-ssl.com/css/svgflags.css" />
    <link href="https://plus.google.com/b/115318258361094500793/115318258361094500793/about" rel="publisher" />
	<link rel="stylesheet" type="text/css" href="https://studypool-likepluminc.netdna-ssl.com/css/jquery-dropdown.css" />
	  <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->hostInfo; ?>/ajaxim/themes/default/theme.css" />
    <link href='//fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
    
    <meta property="og:title" content="Studypool - Get Free and Fast Homework Help - and Earn Money!" />
    <meta property="og:image" content="/uploads/splogo.jpg" />
    <meta property="og:description" content="Studypool is your source for easy online academic & homework help! Get help from qualified tutors for all your academic and homework related questions at studypool." />
	
    
    <?php
	
	
if (isset($this->feed_link) && isset($this->feed_description))
{
  echo '<link rel="alternate" type="application/atom+xml" title="'.$this->feed_description.'" href="' . $this->feed_link . '" />';
}

$purchased = false;
$rebuy = false;
$me = Users::model()->findByPk(Yii::app()->user->id);

if(Yii::app()->user->id){
	$purchased = Rebuy::model()->find(array(
				'condition'=>'owner_id = :uid AND owner_id > 0 AND sof = 0',	//change this, batch by batch.
				'params'=>array(':uid'=>Yii::app()->user->id)
				));
		
	if($purchased){		
		$rebuy = true;
	}else{
		$purchased = Transaction::model()->find(array(
			'condition'=>'service_id > 0 AND money > 0 AND sender_id = :uid AND sender_id > 0',	//change this, batch by batch.
			'params'=>array(':uid'=>Yii::app()->user->id)
			));
	}
}else{
	if(strpos(Yii::app()->urlManager->parseUrl(Yii::app()->request), "services/view") !== false || strpos(Yii::app()->urlManager->parseUrl(Yii::app()->request), "discuss/view") !== false){
		$purchased = true;
	}
}

if(Yii::app()->user->id){
	if(strpos(Yii::app()->urlManager->parseUrl(Yii::app()->request), "home") !== false || strpos(Yii::app()->urlManager->parseUrl(Yii::app()->request), "site/feed") !== false){
		//$purchased = true; 
		$purchased = false; //enable the line above to show student
	}else{
		$purchased = false;
	}
	/*
	if(strpos(Yii::app()->urlManager->parseUrl(Yii::app()->request), "mailbox") !== false || strpos(Yii::app()->urlManager->parseUrl(Yii::app()->request), "search/search") !== false || (strpos(Yii::app()->urlManager->parseUrl(Yii::app()->request), "services") !== false && strpos(Yii::app()->urlManager->parseUrl(Yii::app()->request), "services/view"))){
		$purchased = false;
	}
	*/
}

if($me && $me->user_type == 2){
	$purchased = false;
}


$purchased = false;	//disable search now
?>

    <link rel = "shortcut icon" type = "image/x-icactionon" href = "https://studypool-likepluminc.netdna-ssl.com/favicon.ico"/>
    <meta property="og:image" content="https://studypool-likepluminc.netdna-ssl.com/pictures/s_logo.png" />
    <script src="/js/emojify.min.js" type="text/javascript"></script>

    
    <link rel="image_src" href="https://studypool-likepluminc.netdna-ssl.com/pictures/s_logo.png" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" >
   
    <style type="text/css">
@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  src:  url(/css/fonts/Nunito-Regular.ttf) ;
}

@font-face {
  font-family: 'Nunito';
  font-style: bold;
  font-weight: 700;
  src:  url(/css/fonts/Nunito-Bold.ttf);
}
@font-face {
  font-family: 'Nunito';
  font-style: light;
  font-weight: 300;
  src:  url(/css/fonts/Nunito-Light.ttf) ;
}
	body .redactor_toolbar li a.redactor_btn_pre {
    	background: url(/pictures/newCodeIcon2.png) no-repeat;
		width: 70px;
	}
	.emoji{
		width:19px !important;
	}
	body .redactor_toolbar li a.redactor_btn_uploadFile {
    	background: url(/pictures/uploadIcon.png) no-repeat;
		width: 100px;
	}
	html, body {height: 100%;}
	body { font-size: 100%; }
	
#wrap {min-height: 100%; padding-bottom:25px;}

p, b, h1, h2, h3, h4, span, div{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		}
		
<?php if(isset($_GET['ok'])): ?>
h1, h2, h3, h4, h5, h6 {
	font-family: Avenir, 'Avenir LT', 'Nunito';
	/* font-family: 'Droid Sans', sans-serif; */
}
html body p, div, span, a, code, table{
    font-family: Avenir, "Helvetica Neue", Helvetica, Arial, sans-serif;
}
<?php endif; ?>
		

#main {overflow-y:auto;overflow-x:hidden; min-height: 500px;
	padding-bottom: 15px;}  /* must be same height as the footer */
	
<?php if($purchased): ?>
#main{
	margin-top:45px;	
}
.Profile_Menu{
	top:111px !important;	
}
<?php endif; ?>

#footer2 {position: relative;
	margin-top: -15px; /* negative value of footer height */
	height: 15px;
	clear:both;} 

/*Opera Fix*/
body:before {
	content:"";
	height:100%;
	float:left;
	width:0;
	margin-top:-32767px;
}


.dropdown-toggle span.caret{
opacity: 1.00;	
}

li.nav-header{
text-transform:none !important;
font-weight:600 !important;
margin-top:0px !important;
padding-left:17px !important;
}
	
	abbr, acronym{
     border-bottom: 0em;
     }
	.table{
	background-color:#FFF;
	}
		.fb-like{
    height: 20px;
    overflow: hidden;
	}
	#page{
	background-color:#EDEDED;
	}
	body{
	background-color:#EDEDED;
	}
	#footer{
	background-color:#EDEDED;
	}
	#mainmenu1{
		font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;
	}
	
	.navbar-fixed-top .nav > li > a:hover {
	background-color: #1874CC !important;
    color: #FFFFFF;
    text-decoration: none;
	}

	#active_student, #active_tutor{
	padding-top: 0px !important;	
	}
	
	#redplum:hover, #yellowplum:hover, #blueplum:hover {
	background-color: transparent !important;
    color: #FFFFFF;
    text-decoration: none;
	}
	
	#left2{
		text-align:left;
	}
	#right{
		text-align:right;
	}
	.selected a{
		background-color:#f5f5f5;
	}
	.w_number {
    color:#F90;
    font: bold 32px constantia;
}
	.w_number_small {
    color:black;
    font: bold 22px constantia;
}

   .yellowplum_c{
	background-image:url('https://studypool-likepluminc.netdna-ssl.com/pictures/notification.png');
	background-repeat: no-repeat;
	background-position: -116px -11px ;
	cursor:pointer;
	margin-top:13px;
	}
	.redplum_c{
	background-image: url("https://studypool-likepluminc.netdna-ssl.com/pictures/notification.png");
	background-repeat: no-repeat;
	background-position: -212px -10px ;
	cursor:pointer;
	margin-top:11px;
	}
	.blueplum_c{
	background-image: url("https://studypool-likepluminc.netdna-ssl.com/pictures/notification.png");
	background-repeat: no-repeat;
	background-position: -13px -11px ;
	cursor:pointer;
	margin-top:12px;
	}

	.yellowplum{
	margin-top:13px;
	background-image:url('https://studypool-likepluminc.netdna-ssl.com/pictures/notification.png');
	background-position: -161px -11px;
	background-repeat: no-repeat;
	cursor:pointer;
	}
	.redplum{
	margin-top:11px;
	background-image: url("https://studypool-likepluminc.netdna-ssl.com/pictures/notification.png");
	background-repeat: no-repeat;
	background-position: -262px -11px ;
	cursor:pointer;
	}
	.blueplum{
	margin-top:12px;
	background-image: url("https://studypool-likepluminc.netdna-ssl.com/pictures/notification.png");	
	background-position: -64px -11px ;
	background-repeat: no-repeat;
	cursor:pointer;
	}

@media only screen and (min--moz-device-pixel-ratio: 2),

only screen and (-o-min-device-pixel-ratio: 2/1),

only screen and (-webkit-min-device-pixel-ratio: 2),

only screen and (min-device-pixel-ratio: 2) {
	
	   .yellowplum_c{
	background-image:url('https://studypool-likepluminc.netdna-ssl.com/pictures/notification2x.png');
	background-position: -27px -2px ;
	background-repeat: no-repeat;
	cursor:pointer;
	background-size: 325px 24px;
	margin-top:13px;
	}
	.redplum_c{
	background-image:url('https://studypool-likepluminc.netdna-ssl.com/pictures/notification2x.png');
	background-position: -226px -1.5px ;
	background-repeat: no-repeat;
	background-size: 325px 24px;
	cursor:pointer;
	margin-top:11px;
	}
	.blueplum_c{
	background-image:url('https://studypool-likepluminc.netdna-ssl.com/pictures/notification2x.png');
	background-repeat: no-repeat;
		background-position: -180.5px -3px ;
	background-size: 325px 24px;
	cursor:pointer;
	margin-top:12px;
	}

	.yellowplum{
	margin-top:13px;
	background-image:url('https://studypool-likepluminc.netdna-ssl.com/pictures/notification2x.png');
	background-position: -77px -2.5px ;
	background-size: 325px 24px;
	background-repeat: no-repeat;
	cursor:pointer;
	}
	.redplum{
	margin-top:11px;
	background-image:url('https://studypool-likepluminc.netdna-ssl.com/pictures/notification2x.png');
	background-repeat: no-repeat;
	background-position: -276px -1.5px ;
	background-size: 325px 24px;
	cursor:pointer;
	}
	.blueplum{
	margin-top:12px;
	background-image:url('https://studypool-likepluminc.netdna-ssl.com/pictures/notification2x.png');
	background-repeat: no-repeat;
		background-position: -129px -2px ;
	background-size: 325px 24px;
	cursor:pointer;
	}
}

	#guest_register_click{
		background-color:#00b22d !important;
	}
	#guest_register_click:hover{
		background-color:rgba(0, 200, 45, 0.75) !important;
	}
	
.noti_Container {
position:relative;
border:0px; /* This is just to show you where the container ends */
}
.noti_bubble {
position:absolute;
top: -6px;
right:3px;
padding-right:2px;
padding-left:2px;
background-color:#FA3939;
color:white;
font-weight:bold;
font-size:0.80em;
z-index:1000;
border-radius:4px;
}
#n1{
top: -7px;	
}
#n2{
top: -5px;	
}

.search-icon {
    cursor: pointer;
    display: block;
    height: 26px;
    position: absolute;
    right: 0px; 
    top: 7px;
    width: 26px;
}
.notification_item:hover{
background-color:#eeeeee;
}
ul.select2-results{
padding-left:20px;
}
ul.select2-results li{
float:left;
}
ul.select2-results li:last-child{
margin-bottom:3px;
}

</style>
         
        <?php 		
		Yii::app()->clientScript->registerCssFile('/js/prettify.css');
		Yii::app()->controller->widget('ext.seo.widgets.SeoHead',array(
    'httpEquivs'=>array(
        'Content-Type'=>'text/html; charset=utf-8',
        'Content-Language'=>'en-US'
    ),
    'defaultDescription'=>"Get the best online homework help and homework answers at Studypool.",
)); ?>


<script>(function() {
  var _fbq = window._fbq || (window._fbq = []);
  if (!_fbq.loaded) {
    var fbds = document.createElement('script');
    fbds.async = true;
    fbds.src = '//connect.facebook.net/en_US/fbds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fbds, s);
    _fbq.loaded = true;
  }
  _fbq.push(['addPixelId', '1515237832084918']);
})();
window._fbq = window._fbq || [];
window._fbq.push(['track', 'PixelInitialized', {}]);
</script>
<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?id=1515237832084918&amp;ev=PixelInitialized" /></noscript>

</head>

<body itemscope="itemscope" itemtype="http://schema.org/WebPage">

<?php if (!Yii::app()->user->isGuest) { ?>
	<?php 
	$userForMix = Users::model()->findByPk(Yii::app()->user->id);
	if($userForMix && !$userForMix->mix_alias) { 
	?>

	<?php 
		$userForMix->mix_alias = 1;
		$userForMix->save();
	} else if($userForMix) {
	?>
	<?php }?>
<?php } ?>

<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=529397793825262";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<script>window.twttr = (function (d,s,id) {
  var t, js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
  js.src="https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
  return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
}(document, "script", "twitter-wjs"));</script>

<script>
function hideyellow()
{
	if ( $("#n1").is(":visible") ) {
	$.post("<?php echo Yii::app()->request->hostInfo;?>/user/user/yellowplum");	
	$("#list1").attr('class', 'yellowplum dropdown left noti_Container');
	$("#yellowplum-dropdown li[id=new]").attr('id', 'old');
	$('#n1').hide();
	}
}
function hidered()
{		
	if ( $("#n2").is(":visible") ) {
	$.post("<?php echo Yii::app()->request->hostInfo;?>/user/user/redplum");	
	$("#list2").attr('class', 'redplum dropdown left noti_Container');
    $("#redplum-dropdown li[id=new]").attr('id', 'old');
	$('#n2').hide();
	}
	
}
function hideblue()
{
	if ( $("#n3").is(":visible") ) {
	$("#list3").attr('class', 'blueplum dropdown left noti_Container');
	$.post("<?php echo Yii::app()->request->hostInfo;?>/user/user/blueplum");
	$("#blueplum-dropdown li[id=new]").attr('id', 'old');
	$('#n3').hide();
	}
}

/*
$("textarea").keyup(function(e) {
    while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
        $(this).height($(this).height()+1);
    };
});
*/

</script>

<?php
$cs=Yii::app()->clientScript;
$cs->scriptMap=array(
    'jquery.cookie.js'=>'/js/likeplum.js',
	'jquery.timeago.js'=>'/js/likeplum.js',
    'jquery.autogrow-textarea.js'=>'/js/likeplum.js',
    'hovercard.js'=>'/js/likeplum.js',
);
		$cs->registerScriptFile('https://studypool-likepluminc.netdna-ssl.com/js/likeplum.js');
		$cs->registerScriptFile('https://studypool-likepluminc.netdna-ssl.com/js/jquery.slimscroll.min.js');
		$cs->registerScriptFile('https://studypool-likepluminc.netdna-ssl.com/js/jquery.actual.min.js');
		$cs->registerScriptFile('//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js');
		$this->widget('ext.timeago.JTimeAgo', array(
    'selector' => ' .timeago',
));

//$cs->registerScriptFile(Yii::app()->baseUrl . '/js/jquery-dropdown.js');

?>

    <?php
	//yellowplum
	if(!Yii::app()->user->isGuest){
				$dataProvider1=new CActiveDataProvider('MailboxConversation', array(
                'criteria'=>array(
                'condition'=>'((csender=:user_id AND withdraw = 0) OR creceiver=:user_id) AND (modified + 2592000 > :time OR bm_read=0) AND feedback = 0',
				'params'=> array(':user_id'=>Yii::app()->user->id, ':time' => time()),
                'order'=>'modified DESC',
				'offset' => 0,
                'limit' => 10,
                          ),
                'pagination' => array('pageSize' =>100 ),
                'totalItemCount' => 100,
                ));
				
				$dataProvider1_1=new CActiveDataProvider('MailboxConversation', array(
                'criteria'=>array(
                'condition'=>'creceiver=:user_id AND (modified + 2592000 > :time OR bm_read=0) AND feedback = 1',
				'params'=> array(':user_id'=>Yii::app()->user->id, ':time' => time()),
                'order'=>'modified DESC',
				'offset' => 0,
                'limit' => 10,
                          ),
                'pagination' => array('pageSize' =>10 ),
                'totalItemCount' => 10,
                ));
				
	$yellowcount = MailboxConversation::model()->count('bm_read < 3 AND creceiver=:user_id ', array(':user_id'=>Yii::app()->user->id));
	
	}else{	
	$yellowcount = 0;
	}
	if($yellowcount > 0){
		$yellowplum = "yellowplum_c";
	}else{
		$yellowplum = "yellowplum";
	}

	
	//redplum
   if(!Yii::app()->user->isGuest){
				$dataProvider2=new CActiveDataProvider('Notification', array(
                'criteria'=>array(
                'condition'=>'owner_id=:user_id AND (type_id=2 OR type_id=11 OR type_id=10 OR type_id=3 OR type_id = 5 OR type_id = 12 OR type_id = 19 OR type_id = 18 OR type_id = 20 OR type_id = 21 OR type_id=17 OR type_id=16 OR type_id=27 OR type_id = 55 OR type_id=26 OR type_id=56)',
				'params'=> array(':user_id'=>Yii::app()->user->id),
                'order'=>'create_time DESC',
				'offset' => 0,
                'limit' => 10,
                          ),
				                'pagination' => array('pageSize' =>10 ),
                'totalItemCount' => 10,
                ));
	$redcount = Notification::model()->count('viewd=0 AND owner_id=:user_id AND (type_id=2 OR type_id=11 OR type_id=10 OR type_id=3 OR type_id = 5 OR type_id = 12 OR type_id = 19 OR type_id = 18 OR type_id = 20 OR type_id = 21 OR type_id=17 OR type_id = 16 OR type_id=27 OR type_id = 55 OR type_id=26 OR type_id=56)', array(':user_id'=>Yii::app()->user->id));
	}else{
		$redcount = 0;
	}
	if($redcount > 0){
		$redplum = "redplum_c";
	}else{
		$redplum = "redplum";
	}
	
	//blueplum
	if(!Yii::app()->user->isGuest){
				$dataProvider3=new CActiveDataProvider('Notification', array(
                'criteria'=>array(
                'condition'=>'owner_id=:user_id AND (type_id=4 OR type_id=6 OR type_id=8 OR type_id=39 OR type_id=38 OR type_id=37 OR type_id=7 OR type_id = 13 OR type_id = 14 OR type_id = 15 OR type_id = 70 OR type_id = 71 OR type_id = 72 OR type_id = 22 OR type_id = 57 OR type_id = 73 OR type_id = 74)',
				'params'=> array(':user_id'=>Yii::app()->user->id),
                'order'=>'create_time DESC',
				'offset' => 0,
                'limit' => 10,
                          ),
				                'pagination' => array('pageSize' =>10 ),
                'totalItemCount' => 10,
                ));
	$bluecount = Notification::model()->count('viewd=0 AND owner_id=:user_id AND (type_id= 6 OR type_id=4 OR type_id=7 OR type_id=8 OR type_id=39 OR type_id=38 OR type_id=37 OR type_id = 13 OR type_id = 14 OR type_id = 15 OR type_id = 70 OR type_id = 71 OR type_id = 72 OR type_id = 22 OR type_id = 57 OR type_id = 73 OR type_id = 74)', array(':user_id'=>Yii::app()->user->id));
	}else{
		$bluecount = 0;
	}
	if($bluecount > 0){
		$blueplum = "blueplum_c";
	}else{
		$blueplum = "blueplum";
	}
	?>
    

<?php if(Yii::app()->user->isGuest && (Yii::app()->controller->id == "discuss" || Yii::app()->controller->id == "free" || strpos(Yii::app()->urlManager->parseUrl(Yii::app()->request), "questions/view") !== false)): ?>

<div class="navbar navbar-fixed-top" style="position:relative;z-index:30; background-color:#1569C7; z-index:3000; margin-bottom:-40px; margin-top:1px;">
		<div class="navbar-inner"  style="margin-top:-10px; background-color:#1569C7; background-image:none; color:#fff; z-index:3000; height:100px;">
			<div class="container" id="left2">
               <a style="font-weight:500; font-family: Lucida Grande, sans-serif; font-size:36px; margin-top:18px; margin-bottom:-25px; margin-left:15px;" class="brand" href="">
					<img src="https://studypool-likepluminc.netdna-ssl.com/pictures/logo2.png" style="width:55px; margin-top:-15px;" /> <img src="https://studypool-likepluminc.netdna-ssl.com/pictures/studypool-big.png" style="width:160px;" />
				</a>
				<?php $this->widget('zii.widgets.CMenu',array(
				)); ?>

<div class="clear"></div>
              
               <div style="margin-left:40px; margin-top:15px; margin-bottom:-25px; padding-bottom:8px; color:#fafafa; font-weight:500; font-size:16px;">
			   <?php 
			   $system = System::model()->findByPk(1);
			   
if(isset($_GET['academic']) || ($system && $system->adwords)):
	$expert = "Academic";
else:
	$expert = "Homework";
endif;
               if(isset($_GET['category'])){
               $category = Category::model()->findByPk($_GET['category']);
			  
	           if($category){
		          $expert = $category->name;
	           }
			   }
               ?>
               
               <!--
        <span style="font-size:19px; font-weight:bold; margin-left:4px; display:none;">
			   
              		
				  <span id="cate_name_bar"></span>
         
				 question is <span style="color:#f45a1e;">answered</span> every <b style="position:absolute; font-size:37px; color:#f45a1e;vertical-align:center; margin-top:-3px;">17</b> <span style="margin-left:45px;">seconds</span>
	    </span>
        		-->
        
                <span style="font-size:19px; font-weight:bold; margin-left:4px;">
			   			Your source for easy online Academic help
              	  </span>        
        
        
              <script>
			  
$(function (){
			  $("#recent_q").hover(function(){
$('#recent_q').css("color","#efefef");
  },function(){
$('#recent_q').css("color","#c1d0de");
});

			  $("#browse_e").hover(function(){
$('#browse_e').css("color","#efefef");
  },function(){
$('#browse_e').css("color","#c1d0de");
});

});
			  </script>


                <?php if(true): ?>
               					<?php
              $this->widget('application.modules.user.components.RegistrationPop'); 
				$this->widget('application.modules.user.components.LoginPop');
				?>
               <style>
	#guest_register_click{
		background-color:#00b22d;
	}
	#guest_register_click:hover{
		background-color:rgba(0, 200, 45, 0.75);
	}
	#open_register:hover{
		background-color:#444 !important;	
		color:#fff !important; 
	}
</style>
 <ul class="nav pull-right" style="margin-right:0px; margin-left:0px; margin-right:40px;">

<li>
	<a href="#" id="open_register" class="openSignUp" onclick="open_register(); return false;" style="font-size:17px; font-weight:500; width:110px;  margin-left:-132px; padding-top:35px; margin-top:-62px; border-right:solid 1px #dfdfdf; border-left:solid 1px #dfdfdf; height:43px;"><span style="margin-left:22px;">Sign Up</span></a>
</li>


</ul>
<?php endif; ?>

                      
               </div>
			</div>
            
		</div>
	</div>

<?php else: ?>

<div class="navbar navbar-fixed-top">  <!---set class="navbar-fixed-top" to fix on the top-->
		<div class="navbar-inner" id="left" style="height:40px; background-color:#1569C7; background-image:none; ">
			<div class="container" id="left2" style="height:40px; width:811px;">
				
                <ul class="nav" style="z-index:10;">  
         
        		  <a class="brand" href="" style="margin-top:0px; font-family: Lucida Grande, sans-serif; font-size:24px; font-weight:500;"><img src="https://studypool-likepluminc.netdna-ssl.com/pictures/study.png" style="width:60px; margin-bottom:2px;" /><img src="https://studypool-likepluminc.netdna-ssl.com/pictures/arrow4.png" style="margin-top:1px; width:49px; margin-left:2px;"></a>
       
           <?php if(Yii::app()->user->isGuest): ?>
                
           <?php else: ?>
                
               <li class="<?php echo $yellowplum;?> dropdown left noti_Container" id="list1" style="margin-left:0px; width:32px; height:33px;">
                <a data-toggle="dropdown" id="yellowplum" class="dropdown-toggle" onClick="hideyellow();return false;" style="border: 0;padding-bottom:25px;">
                
                <?php 
				$yellowdisplay = "none";
				if($yellowcount > 0){ $yellowdisplay = "";} 				
				?>
                <div class="noti_bubble" id="n1" style="display:<?php echo $yellowdisplay;?>;"><?php echo $yellowcount;?></div>
                </a>
                <?php 	
				if(!Yii::app()->user->isGuest){ 
				?>
                
<?php
$unread = Mailbox::model()->countByAttributes(array('creceiver'=>Yii::app()->user->id,'bm_read'=>0, 'feedback'=>0));
$unread2 = Mailbox::model()->countByAttributes(array('creceiver'=>Yii::app()->user->id,'bm_read'=>0, 'feedback'=>1));
?>

<style>
					.slimScrollDiv{
						min-height:52px;
						height:450px;
					
					}
				
				</style>
<script>
		var navDropResize  = function(){
			var max_used = 211;
			var max_reqests =($("#inbox_dropdown_other").find(".items").children("a").length ) * 56;
			var max_inbox =($("#inbox_dropdown_p").find(".items").children("a").length ) * 56;
			var max_Payemnt =($("#blueplum-dropdown").find(".items").children("a").length ) * 56;
			var max_Quest =($("#redplum-dropdown").find(".items").children("a").length ) * 56;
			if($("#inbox_dropdown_p").is(":visible")){
				max_used = max_inbox;
				$(".slimScrollDiv").css('max-height', max_used);	
			}
			else if($("#blueplum-dropdown").is(":visible")){
				max_used = max_Payemnt;
				$(".slimScrollDiv").css('max-height', max_used);	
			}
			else if($("#redplum-dropdown").is(":visible")){
				max_used = max_Quest;
				$(".slimScrollDiv").css('max-height', max_used);	
			}
			else{
				max_used = max_reqests;
				$(".slimScrollDiv").css('max-height', max_used);	
			}
			
			$(".slimScrollDiv").css('height', 0.55 * $(window).innerHeight());	
			
			
			$("#yellowplum-dropdown").css("height",$(".slimScrollDiv").css('height'));
			$("#blueplum-dropdown").css("height",$(".slimScrollDiv").css('height'));
			$("#redplum-dropdown").css("height",$(".slimScrollDiv").css('height'));
			$("#inbox_dropdown_p").css("height",$(".slimScrollDiv").css('height'));
			$("#inbox_dropdown_other").css("height",$(".slimScrollDiv").css('height'));
		};
		$(window).resize( function(){
			 navDropResize()
				
		});
							
$(document).ready(function() {
	$("#inbox_inbox").click(function(){
	$("#inbox_inbox").css('font-weight','700');
	$("#inbox_inbox").css('color','black');
	$("#inbox_requests").css('font-weight','400');
	$("#inbox_requests").css('color','grey');
	$("#inbox_dropdown_p").show();
	$("#inbox_dropdown_other").hide();
	navDropResize();
	return false;
	});
	
	$("#inbox_requests").click(function(){
	$("#inbox_requests").css('font-weight','700');
	$("#inbox_requests").css('color','black');
	$("#inbox_inbox").css('font-weight','400');
	$("#inbox_inbox").css('color','grey');
	$("#inbox_dropdown_p").hide();
	$("#inbox_dropdown_other").show();
		navDropResize();
		return false;
	});
	$("#blueplum").click( function(){
		setTimeout(function() {
			navDropResize();
			}, 50);
	});
	$("#yellowplum").click( function(){
		setTimeout(function() {
			navDropResize();
			}, 50);
	});
	$("#redplum").click( function(){
		setTimeout(function() {
			navDropResize();
			}, 50);;
	});
	

});
</script>
				
				
                <ul class="dropdown-menu" style="font-size:12px; left:-5px; margin-top: 2px;border:none; background:none;box-shadow:none; height:0px; margin-bottom:0px; padding-bottom: 0px;">
                <div class="menu-inside" style="width: 350px; left: -112px; top: -1px;">
                <div class="scroll-here" >
                <div class="dropdown-top">
                <div style="width: 50%; height: 20px;">
                <p style="position: absolute; left: 7px; top: 7px; font-size:12px; font-weight:600; width:200px;">
                <span id="inbox_inbox">Inbox <?php if($unread): ?>(<?php echo $unread;?>)<?php endif; ?></span>
                <span id="inbox_requests" style="color:grey; margin-left:5px; font-weight:400;">Requests <?php if($unread2): ?>(<?php echo $unread2;?>)<?php endif; ?></span>
                </p>
                </div>
                <div style="position: absolute; right: 10px; top: 7px;">
                <a style="float: right; color:#08c; font-size:12px;" href="<?php echo Yii::app()->request->hostInfo;?>/mailbox/message/new">Send a new message</a></div>
                </div>
                <div id="yellowplum-dropdown" style="margin-bottom: -1px;">
                
                <div id="inbox_dropdown_p">
                <?php 

					$this->widget('zii.widgets.CListView', array(
					'dataProvider'=>$dataProvider1,
					'itemView'=>'application.views.notification._jyellowplum',
					'template'=>'{items}',
					'emptyText'=>'<p><center>No new messages</center></p>'
					)); 

				?>
                </div>
                
                <div id="inbox_dropdown_other" style="display:none;">
               <?php 

			   		$this->widget('zii.widgets.CListView', array(
					'dataProvider'=>$dataProvider1_1,
					'itemView'=>'application.views.notification._jyellowplum',
					'template'=>'{items}',
					'emptyText'=>'<p><center>No new requests</center></p>'
					)); 

				?>
                </div>
                
                </div>
                <div class="dropdown-bottom">
                <center><a href="<?php echo Yii::app()->request->hostInfo;?>/mailbox"><h5>See All Messages</h5></a></center>
                </div>
                </div>
                </div>
                </ul> 
                <?php 
				}
				?>
                </li>
                
                
                
                <li class="<?php echo $redplum;?> dropdown left noti_Container" id="list2" style="margin-left:0px; width:32px; height:33px;">
                <a data-toggle="dropdown" id="redplum" class="dropdown-toggle" onClick="hidered();return false;" style="border: 0;">
                <?php 
				$reddisplay = "none";
				if($redcount > 0){ $reddisplay = "";} ?>
                <div class="noti_bubble" id="n2" style="display:<?php echo $reddisplay;?>;"><?php echo $redcount;?></div>
                </a>
                <?php 	
				if(!Yii::app()->user->isGuest){
				?>
                <ul class="dropdown-menu" style="font-size:12px; left:-5px; margin-top: 2px;border:none; background:none;box-shadow:none; margin-bottom:0px; padding-bottom: 0px;">
                <div class="menu-inside" style="width: 350px;left: -144px; top: -1px;"">
                <div class="scroll-here">
                <div class="dropdown-top">
                <div style="width: 50%; height: 20px;">
                <p style="position: absolute; left: 7px; top: 7px; font-weight:600; font-size:12px;">Questions and answers</p>
                </div>
                <div style="position: absolute; right: 10px; top: 7px; visibility:hidden;">
                <a style="float: right;" href="<?php echo Yii::app()->request->hostInfo;?>/mailbox/message/new">Send a new message</a></div>
                </div>
                <div id="redplum-dropdown">
                <?php 

					$this->widget('zii.widgets.CListView', array(
						'dataProvider'=>$dataProvider2,
						'id'=>'red_plum_noti_list',
						'itemView'=>'application.views.notification._jredplum',
						'template'=>'{items}{pager}',
						'emptyText'=>'<p><center>No new notifications</center></p>',
					));

				?>
                </div>
                <div class="dropdown-bottom">
                 <center><a href="<?php echo Yii::app()->request->hostInfo;?>/user/user/mynotification"><h5>View All</h5></a></center>
                 </div>
                 </div>
                 </div>
                </ul> 
                <?php 
				}
				?>
                </li>
                 
                            
                <li class="<?php echo $blueplum;?> dropdown left noti_Container" id="list3" style="margin-left:-1px; width:32px; height:33px;">
                <a data-toggle="dropdown" id="blueplum" class="dropdown-toggle" onClick="hideblue();return false;" style="border: 0;padding-bottom:25px;">
                <?php 
				$bluedisplay = "none";
				if($bluecount > 0){ $bluedisplay = "";} ?>
                <div class="noti_bubble" id="n3" style="right:7px; display:<?php echo $bluedisplay;?>;"><?php echo $bluecount;?></div>
                </a>
                <?php 	
				if(!Yii::app()->user->isGuest){
				?>
                <ul class="dropdown-menu" style="font-size:12px; left:-8px; margin-top: 2px;border:none; background:none;box-shadow:none; height:0px; margin-bottom:0px; padding-bottom: 0px;">
				<div class="menu-inside" style="width: 350px;left: -172px; top: -1px;">
                <div class="scroll-here">
                <div class="dropdown-top">
                <div style="width: 50%; height: 20px;">
                <p style="position: absolute; left: 7px; top: 7px; font-weight:600; font-size:12px;">Payment</p>
                </div>
                <div style="position: absolute; right: 10px; top: 7px; visibility:hidden;">
                <a style="float: right;" href="<?php echo Yii::app()->request->hostInfo;?>/path/to/future/content">Future Content</a></div>
                </div>
                <div  id="blueplum-dropdown">
                <?php 
				

					$this->widget('zii.widgets.CListView', array(
					'dataProvider'=>$dataProvider3,
					'itemView'=>'application.views.notification._jblueplum',
					'template'=>'{items}',
					'emptyText'=>'<p><center>No new notifications</center></p>'
					));
				
				?>
                </div>
                <div class="dropdown-bottom">
                <?php if($me && $me->user_type == 2): ?>
               	 <center><a href="<?php echo Yii::app()->request->hostInfo;?>/user/profile/myaccount"><h5>View Balance</h5></a></center>
                 <?php else: ?>
                   <center><a href="<?php echo Yii::app()->request->hostInfo;?>/site/feed"><h5>View Balance</h5></a></center>
                 <?php endif; ?>
                 
                </div>
                </div>
                </div>
                </ul> 
                <?php 
				}
				?>
                </li>
                
         <?php endif; ?>
                </ul>
                
                <b>
                <?php 
				if(Yii::app()->user->isGuest){
				$this->widget('bootstrap.widgets.BootMenu', array(
    				'items'=>array(	
				)));
/*
		echo'<form method="get" class="navbar-search" action="'.Yii::app()->request->hostInfo.'/search/search"><input type="text" id="q" name="q" value="" class="span4" style="width:300px;font-size:13px; height:15px; padding-right:30px;margin-bottom:0px;margin-top:1px; " placeholder="Search questions and people here..."><a onclick="$(\'.navbar-search\').submit(); return false;" id="q" name="q" class="search-icon js-search-action" style="margin-top:-1px;">
<i class="icon-search"></i>
</a></form>';
*/
if(Yii::app()->controller->id == "free" || Yii::app()->controller->id == "questions" || Yii::app()->controller->id == "discuss"):
?>

<ul class="nav pull-right" style="margin-right: 13%;">

<li style="border-right:solid 1px #dfdfdf; border-left:solid 1px #dfdfdf;">
	<a href="/site/easy">Ask a Question</a>
</li>

<li style="border-right:solid 1px #dfdfdf;">
	<a href="/find-tutors-online">Browse tutors</a>
</li>

<li style="border-right:solid 1px #dfdfdf;">
	<a href="<?php echo Yii::app()->request->baseUrl; ?>/site/signup" id="guest_register_click">Sign Up</a>
</li>

</ul>


<div id="likeholder" style="position:absolute; margin-left:723px; margin-top:10px;">
	<iframe id="navbarlike" src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FStudypool%2F624783530926917&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>
</div>


<?php

else:
				$this->widget('bootstrap.widgets.BootMenu', array(
    'items'=>array(
				array('url'=>Yii::app()->getModule('user')->loginUrl, 'label'=>'Login'),	
                 array('url'=>Yii::app()->getModule('user')->registrationUrl, 'label'=>'Sign Up'),	
				 	 array('url'=>'/site/landing', 'label'=>'Ask a Question'),
					 array('url'=>'/find-tutors-online', 'label'=>'Tutors'),
),
                 'htmlOptions'=>array('class'=>'pull-right','style'=>'margin-right:0.1%;'),
	));
endif;
	
	}
				?>
                </b>

                             
               
                    <?php
						$real = null; 
	if(!Yii::app()->user->isGuest){
		$user = Users::model()->findByPk(Yii::app()->user->id);
		$username=$user->username;	
		$truncated = (strlen($username) > 13) ? mb_substr($username, 0, 11,'utf-8') . '...' : $username;
		$profile = $user->profile;
		$real = $username;
		/*
		if($user->createtime > 1399990412 && $user->user_type == 2 && $user->profile && $user->profile->lastname && $user->profile->firstname){
			
			$truncated = $profile->firstname." ".$profile->lastname[0].".";
			$real = $profile->firstname." ".$profile->lastname[0].".";
			$truncated = (strlen($truncated) > 13) ? mb_substr($truncated, 0, 11,'utf-8') . '...' : $truncated;
		}
		*/
		/*
		echo'<form method="get" class="navbar-search" action="'.Yii::app()->request->hostInfo.'/search/search"><input type="text" id="q" name="q" value="" class="span4" style="width:335px;font-size:13px; height:15px; padding-right:30px;margin-bottom:0px;margin-top:1px;" placeholder="Search questions and people here..."><a onclick="$(\'.navbar-search\').submit(); return false;" id="q" name="q" class="search-icon js-search-action" style="margin-top:-1px;">
<i class="icon-search"></i>
</a></form>';
*/
     ?>

<?php if($user->user_type == 1): ?>
<?php
	$this->widget('bootstrap.widgets.BootMenu', array(
    'encodeLabel'=>false,
    'items'=>array(
                    array('label'=>'', 'url'=>'#', 'items'=>array(
					array('label'=>'My Questions','icon'=>'tags', 'url'=>Yii::app()->request->hostInfo.'/user/profile/myquestions'),
                    array('label'=>'My Tutors','icon'=>'user','url'=>Yii::app()->request->hostInfo.'/user/profile/myfriends'),
                    '---',
					array('label'=>'Account Setting','icon'=>'lock','url'=>Yii::app()->request->hostInfo.'/user/profile/setting'),
					//array('label'=>'Affiliate','icon'=>'gift','url'=>Yii::app()->request->hostInfo.'/user/profile/affiliate'),
					array('label'=>'How it Works','icon'=>'info-sign','url'=>Yii::app()->request->hostInfo.'/howitworks'),	
					//array('label'=>'View Tutorial','icon'=>'book','url'=>Yii::app()->request->hostInfo.'?test'),	
					'---',
					 array('label'=>'Contact Us','icon'=>'comment','url'=>Yii::app()->request->hostInfo.'/site/contact'),	
                    array('label'=>'Logout','icon'=>'off', 'url'=>Yii::app()->request->hostInfo.'/user/logout'),
                    array('label'=>'Studypool inc. &copy;'.date('Y')),    
)),             
				
),'htmlOptions'=>array('class'=>'pull-right','style'=>'margin-right:0.2%; margin-left:0px;','id'=>'right_dropdown'),
	));
	?>
<?php else: ?>
<?php
	$this->widget('bootstrap.widgets.BootMenu', array(
    'encodeLabel'=>false,
    'items'=>array(
                    array('label'=>'', 'url'=>'#', 'items'=>array(
					array('label'=>'My Profile','icon'=>'home','url'=>Yii::app()->request->hostInfo.'/user/profile'),
					array('label'=>'Tutor Panel','icon'=>'list-alt','url'=>Yii::app()->request->hostInfo.'/user/profile/tutorpanel'),
                    array('label'=>'My Answers','icon'=>'bookmark', 'url'=>Yii::app()->request->hostInfo.'/user/profile/myanswers'),
                    array('label'=>'My Students','icon'=>'user','url'=>Yii::app()->request->hostInfo.'/user/profile/myfriends'),
					 array('label'=>'Browse Tutors','icon'=>'search','url'=>Yii::app()->request->hostInfo.'/user/user/find'),
                    '---',
					array('label'=>'Account Setting','icon'=>'lock','url'=>Yii::app()->request->hostInfo.'/user/profile/setting'),
				//	array('label'=>'Blog Button','icon'=>'signal','url'=>Yii::app()->request->hostInfo.'/site/button'),
				//	array('label'=>'Affiliate','icon'=>'gift','url'=>Yii::app()->request->hostInfo.'/user/profile/affiliate'),
					array('label'=>'How it Works','icon'=>'info-sign','url'=>Yii::app()->request->hostInfo.'/tutor'),	
					//array('label'=>'View Tutorial','icon'=>'book','url'=>Yii::app()->request->hostInfo.'?test'),	
					'---',
					  array('label'=>'Contact Us','icon'=>'comment','url'=>Yii::app()->request->hostInfo.'/site/contact'),	
                    array('label'=>'Logout','icon'=>'off', 'url'=>Yii::app()->request->hostInfo.'/user/logout'),
                    array('label'=>'Studypool inc. &copy;'.date('Y')),    
)),             
				
),'htmlOptions'=>array('class'=>'pull-right','style'=>'margin-right:0.2%; margin-left:0px;','id'=>'right_dropdown'),
	));
	?>
<?php endif; ?>
         
<ul class="nav pull-right" style="margin-right:0px; margin-left:0px;">

<?php
$type = UserType::model()->findByPk(Yii::app()->user->id);
if(!$type || $type->user_type < 3): ?>

<?php if($user && $user->user_type == 1): ?>

<li class="dropdown" style="border-right:solid 1px #1C86EE; border-left:solid 1px #1C86EE; ">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
       <b>Ask a Question</b>
     </a>
    <ul class="dropdown-menu">
     <li><a href="<?php echo Yii::app()->request->hostInfo;?>/questions/create"><img src="/pictures/Silver.png" style="width:18px; margin-top:-3px;" /> Paid Question</a></li>
     <li><a href="<?php echo Yii::app()->request->hostInfo;?>/free/create"><img src="/pictures/SilverLightning.png" style="width:18px;" /> Easy Question</a></li>
     
    </ul>
</li>

<li style="border-right:solid 1px #1C86EE;"><a style="font-weight:600; padding-left:15px; padding-right:15px;" href="<?php echo Yii::app()->request->hostInfo;?>/user/user/find">Find Tutors</a></li>
<li style="border-right:solid 1px #1C86EE;"><a style="font-weight:600; padding-left:15px; padding-right:15px;" href="<?php echo Yii::app()->request->hostInfo;?>"><?php echo CHtml::encode($truncated);?></a></li>
<?php elseif($user && $user->user_type == 2): ?>
<li class="nav_browse_btn" style="border-right:solid 1px #1C86EE;"><a  style="font-weight:600; padding-left:15px; padding-right:15px;" href="<?php echo Yii::app()->request->hostInfo;?>/questions/newest">Browse</a></li>
<li class="nav_browse_name" style="border-right:solid 1px #1C86EE;"><a style="font-weight:600;  padding-left:15px; padding-right:15px;" href="<?php echo Yii::app()->request->hostInfo;?>"><?php echo CHtml::encode($truncated);?></a></li>
<?php endif; ?>

<?php else: ?>

<?php if($user->user_type == 1): ?>

<li class="dropdown" style="border-right:solid 1px #1C86EE;">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
       <i class="icon-plus icon-white"></i>
     </a>
    <ul class="dropdown-menu">
<li><a href="<?php echo Yii::app()->request->hostInfo;?>/questions/create"><img src="/pictures/Silver.png" style="width:18px; margin-top: -3px;" /> Paid Question</a></li>
     <li><a href="<?php echo Yii::app()->request->hostInfo;?>/free/create"><img src="/pictures/SilverLightning.png" style="width:18px;" /> Easy Question</a></li>
     
    </ul>
</li>


<li style="border-right:solid 1px #1C86EE;"><a style="font-weight:600;" href="<?php echo Yii::app()->request->hostInfo;?>/user/user/find"><i class="icon-user icon-white"></i></a></li>
<li style="border-right:solid 1px #1C86EE;"><a style="font-weight:600;" href="<?php echo Yii::app()->request->hostInfo;?>"><?php echo CHtml::encode($truncated);?></a></li>
<?php else: ?>
<li style="border-right:solid 1px #1C86EE;"><a class="answer_icon_nav" style="font-weight:600;" href="<?php echo Yii::app()->request->hostInfo;?>/questions/newest"><i class="icon-ok icon-white"></i></a></li>
<li style="border-right:solid 1px #1C86EE;" class="name_icon_nav"><a style="font-weight:600;" href="<?php echo Yii::app()->request->hostInfo;?>"><?php echo CHtml::encode($truncated);?></a></li>
<?php endif;?>

<?php endif; ?>

</ul>


 <ul class="nav pull-right user_type_nav" style="margin-right:0px; margin-left:0px;">
    
    <?php if($user->user_type == 1): ?>
    
    <?php 
if($type && $type->user_type > 2):
?>

 <?php if(Yii::app()->user->id == 1988 || Yii::app()->user->id == 4547 || Yii::app()->user->id == 111299 || Yii::app()->user->id == 10417 || Yii::app()->user->id == 8936 || Yii::app()->user->id == 8934 || Yii::app()->user->id == 18321 || Yii::app()->user->id == 116895 || Yii::app()->user->id == 111169  || Yii::app()->user->id == 118673 || Yii::app()->user->id == 138835 || Yii::app()->user->id == 106134): ?>
    <li style="text-align:center; border-left:solid 1px #1C86EE; width:70px; background-color:#397cc9; padding-left:15px; padding-right:15px; background-position: left bottom;">
<?php
	echo CHtml::link('Outsource',"#", array('style'=>'font-weight:600; color:#fff; border-radius:4px; background-color:#00b22d; padding:1px; margin:0px; margin-top:9px; margin-bottom:10px; font-weight:500;'));
?>
    </li>
<?php else: ?>
    <li style="text-align:center; border-left:solid 1px #1C86EE; width:56px; background-color:#397cc9; padding-left:15px; padding-right:15px; background-position: left bottom;">
<?php
	echo CHtml::link('Student',"#", array('style'=>'font-weight:600; color:#fff; border-radius:4px; background-color:#00b22d; padding:1px; margin:0px; margin-top:9px; margin-bottom:10px; font-weight:500;'));
?>
    </li>
<?php endif; ?>
  
  <?php else: ?>  
    <li style="display:none; text-align:center; border-left:solid 1px #1C86EE; width:56px; background-color:#397cc9; padding-left:15px; padding-right:15px; background-position: left bottom;">
<?php
echo CHtml::link('Student',"#", array('style'=>'font-weight:600; color:#fff; border-radius:4px; background-color:#00b22d; padding:1px; margin:0px; margin-top:9px; margin-bottom:10px; font-weight:500;'));
?>
    </li>
    
    <?php endif; ?>
    
<?php else: ?>
<?php 
if($type && $type->user_type > 2):
?>
   <?php if(Yii::app()->user->id == 1988 || Yii::app()->user->id == 4547 || Yii::app()->user->id == 111299 || Yii::app()->user->id == 10417 || Yii::app()->user->id == 8936 || Yii::app()->user->id == 8934 || Yii::app()->user->id == 18321 || Yii::app()->user->id == 116895 || Yii::app()->user->id == 111169  || Yii::app()->user->id == 118673 || Yii::app()->user->id == 138835 || Yii::app()->user->id == 106134 || Yii::app()->user->id == 155723): ?>
   	<li style="text-align:center; border-left:solid 1px #1C86EE; width:90px;">
	<?php
		echo CHtml::link('Outsource',"#", array('submit'=>'/site/beasker?redirect='.Yii::app()->request->requestUri ,'style'=>'font-weight:600;'));
	?>	
   </li>
   <?php else: ?>
      	<li style="text-align:center; border-left:solid 1px #1C86EE; width:80px;">
	<?php
		echo CHtml::link('Student',"#", array('submit'=>'/site/beasker?redirect='.Yii::app()->request->requestUri ,'style'=>'font-weight:600;'));
	?>	
   </li>
   <?php endif; ?>
<?php endif; ?>
<?php endif; ?>
  
    <?php if($user->user_type == 2){ ?>
  
  <?php if(!$type || $type->user_type == 2): ?>  
    
     <li style="border-right:solid 1px #1C86EE; text-align:center; border-left:solid 1px #1C86EE; width:100px;">
<?php
echo CHtml::link('Tutor Panel',"/user/profile/tutorpanel", array('style'=>'color:#fff;  font-weight:600;'));
?>
    </li>
     
  <?php else: ?>
    <li style="border-right:solid 1px #1C86EE; text-align:center; border-left:solid 1px #1C86EE; width:50px; background-color:#397cc9; padding-left:18px; padding-right:18px; background-position: left bottom;">
<?php
echo CHtml::link('Tutor',"#", array('style'=>'color:#fff; border-radius:4px; font-weight:600; background-color:#00b22d; padding:1px; margin:0px; margin-top:9px; margin-bottom:10px; font-weight:500;'));
?>
    </li>
   <?php endif; ?>
    
    
<?php }else{ ?>
<?php 
$type = UserType::model()->findByPk(Yii::app()->user->id);
if($type && $type->user_type > 2):
?>
   <li style="border-right:solid 1px #1C86EE; text-align:center;  width:80px;">
<?php
echo CHtml::link('Tutor',"#", array('submit'=>'/site/beanswerer?redirect='.Yii::app()->request->requestUri,'style'=>'font-weight:600;'));
?>
</li>
<?php endif; ?>
<?php } ?>

        
        
	</ul>
    
    
    <?php 
	} 
	?>
    
			</div>
		</div>
        
        <?php endif; ?>

<!--Place notification bar here - Michalis-->
        
 <?php if($purchased): ?>
    <div class="navbar">  <!---set class="navbar-fixed-top" to fix on the top-->
		<div class="navbar-inner" id="left" style="height:50px; background-color:#DCF0F7; background-image:none; ">
			<div class="container" id="left2" style="height:40px; width:811px;">
				
                <ul class="nav">  

<?php
if(Yii::app()->user->id && !$rebuy):
		echo '<form method="get" target="_blank" class="navbar-search" action="'.Yii::app()->request->hostInfo.'/search/search">
<i style="position:absolute; margin-left:8px; margin-top:12px;" class="icon-search"></i>
<input type="text" id="q" name="q" value="" class="span4" style="width:470px;font-size:13px; height:25px; font-size:14px; font-weight:500; padding-left:27px; padding-right:30px;margin-bottom:0px;margin-top:1px;" placeholder="Search Class Notes / Documents..."><a onclick="$(\'.navbar-search\').submit(); return false;" id="q" name="q" class="btn go-btn go-btn-primary search-icon js-search-action" style="margin-top:-13px; margin-left:-5px; height:21px; width:90px; font-weight:bold; font-size:15px; border-radius:0px 2px 2px 0px; padding-top:8px;">Search</a>
<input style="display:none;" name="kind" value="doc" />
</form>';
else:
		echo '<form method="get" target="_blank" class="navbar-search" action="'.Yii::app()->request->hostInfo.'/search/search">
<i style="position:absolute; margin-left:8px; margin-top:12px;" class="icon-search"></i>
<input type="text" id="q" name="q" value="" class="span4" style="width:470px;font-size:13px; height:25px; font-size:14px; font-weight:500; padding-left:27px; padding-right:30px;margin-bottom:0px;margin-top:1px;" placeholder="Search Class Notes / Documents..."><a onclick="$(\'.navbar-search\').submit(); return false;" id="q" name="q" class="btn go-btn go-btn-primary search-icon js-search-action" style="margin-top:-13px; margin-left:-5px; height:21px; width:90px; font-weight:bold; font-size:15px; border-radius:0px 2px 2px 0px; padding-top:8px;">Search</a>
</form>';
endif;
?>

<a target="_blank" href="/search/search" style="margin-left:38px; font-size:14px; font-weight:500; color:black; position:absolute; width:150px; margin-top:15px;"><i class="icon-th-list" style="margin-top:2px;"></i> Document Store</a>

		</ul>

		</div>
	</div>
</div>
<?php endif; ?>
		
						<?php 
			
			if(!Yii::app()->user->isGuest) {
			$jjuser = Users::model()->findByPk(Yii::app()->user->id);
			$jjprofile = $jjuser->profile;
			$posted = Questions::model()->findByAttributes(array('owner_id'=>$jjuser->id));
			if($jjprofile->fake_register == 1 && (($jjuser->user_type == 1 && $posted) || ($jjuser->user_type == 2 && Yii::app()->controller->id == "questions"))){
			?>
			
<?php
if(isset($_GET['email_error'])) { ?>
<script>
$(document).ready(function() {
alert("Email address is taken. Please choose another.");
});
</script>

<?php } ?>

<?php
if(isset($_GET['email_error2'])) { ?>
<script>
$(document).ready(function() {
alert("Email address is not valid. Please try a valid email.");
});
</script>

<?php } ?>
<style>
#real_content, #allfeed {
	margin-top:40px !important;
	opacity:.7 !important;
}

.Profile_Menu {
top:106px !important;
}

/* newest:439 */
#cover {
position:fixed;
top:0;
right:0;
bottom:0;
left:0;
opacity: 0.80;
filter:alpha(opacity=80); /* IE */
-moz-opacity:0.80; /* FireFox */
background: #fff;
z-index: 1100;
display: none;
}
</style>
<div id="cover"></div>

<div class="alert alert-error">
<?php if($jjuser && $jjuser->user_type == 2): ?>
To answer questions, please <strong>verify</strong> your email. <span id="jjjchangee" ><a id="jjjresendemail" href="#" >Resend email</a> or</span> <a href="#" id="jjjchange" >change email</a>.
<?php else: ?>
Your question will be posted once you verify your email. <span id="jjjchangee" ><a id="jjjresendemail" href="#" >Resend email</a> or</span> <a href="#" id="jjjchange" >change email</a>.
<?php endif; ?>
</div>

<div id="change_email_popup" class="modal" style="display:none; width:450px; left:54.1%;  top:380px; z-index:1200;position:relative;">

<div class="modal-header" style="color:#fff; padding-top:6px; padding-bottom:6px; text-align:left; padding-left:14px;">
<h3><img style="margin-top:-10px; margin-right:2px;" src="https://studypool-likepluminc.netdna-ssl.com/pictures/logo2.png" width="35px;"> Change Email
<a style="float:right;margin-right:10px; color:#fff;" id="jjjjclose" href="#">X</a>
</h3>

</div>
 <form id="fkjjj" action="https://www.createpool.com/site/changeemailjjj?redirect=<?php echo "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>" method="post">
<div class="modal-body" style="float:none;color:black; text-align:left;">
<b style="margin-right:3px;">Old email address:</b> <?php echo $jjuser->email; ?><br><br>
<b style="margin-right:3px;">New email address:</b> <INPUT required class="jjjform" type="text" name="email" id="email" style="width:200px;">
<INPUT value="<?php echo Yii::app()->user->id; ?>" type="hidden" name="jjj" >
<input type="submit" class="btn btn-success" value="Change" style="margin-top:-9px;">


</div>
 </form>

 </div>
<script>
$(document).ready(function() {
	$('#jjjchange').click(function() {
		$('#change_email_popup').show();
		$('.jjjchange').hide();
		$("#cover").show();
	});
	
	$('#jjjjclose').click(function() {
		$("#cover").hide();
		$('#change_email_popup').hide();
	});
	
	$('#jjjresendemail').click(function() {
		$.post("/site/resendjjj?redirect=<?php echo "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>");
		//alert("Email resent!");
		$('#jjjchangee').html("An email has been sent to <?php echo $jjuser->email; ?>. ");
	});	
	
});

</script>


<?php
} 
}
?>
	</div>
    
<div id="page" style="
width:860px;
text-align:left;
    margin: 0 auto;
    margin-bottom:-30px;
    min-height:100%;
 background-color: white;
    -moz-box-shadow:
        0 0 10px #B0AEAF;
    -webkit-box-shadow:
        0 0 10px #B0AEAF;
    box-shadow:
        0 0 10px #B0AEAF;
        ">
		
		

    <div itemprop="breadcrumb" style="width:811px; margin-left:24px;">
	<?php if($this->breadcrumbs):?>
        <br /><br /><br />
		<?php $this->widget('bootstrap.widgets.BootBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
	)); ?><!-- breadcrumbs -->
	<?php endif?>
    </div>
    
    <div class="clear"></div>
    
    <div id="wrap">
    <div id="main">
	<?php echo $content; ?>
   </div>
    </div>
    </div>
    
    <span id="notification_sound"></span>
<?php if(!Yii::app()->user->isGuest): 
	?>
	<script  src="/ajaxim/studychat_v10_3.js" type="text/javascript"></script><!--- Live chat -------->

<script src="/js/socket.io-client-0.9.16/dist/socket.io.min.js" type="text/javascript"></script>
<script  type="text/javascript">
	//var url = 'https://lpnotificationsystem.com/';
	//makeCorsRequest(url);
	//console.log("https check");
   var socket_lp = io.connect('https://lpnotificationsystem.com:8888/',{ query: "foo=bar" });
   
      socket_lp.on('connect', function () {
            socket_lp.on('<?php echo Yii::app()->user->id; ?>', function (obj) {
				//redplum				
				if(obj.type_id == 2){ //someone answers the question
				var tmp1 = "<a href='<?php echo Yii::app()->request->hostInfo;?>/questions/" +obj.questions_id + "'><li class='notification_item' id='new'><div style='width:293px; float:right; '><b>" +obj.sender_name+ "</b> just answered your question:<br />" + htmlEncode(obj.questions_name) + "<br /><acronym class='timeago' style='font-size:10px; color:#999; margin-left:5px;'>few seconds ago</acronym></div><div style='float:left; width:40px; padding-left:2px; padding-top:5px; padding-bottom:5px;'><img width='40px' height='40px' src='"+ obj.avatar +"' ></div><div class='clear'></div></li></a>";
				$('#redplum-dropdown').prepend(tmp1);	
			    $('#notification_sound').html("<embed src='<?php echo Yii::app()->request->hostInfo;?>/audio/notification.mp3' hidden='true' autostart='true' loop='false'>");
				
				var count2 = $("#redplum-dropdown li[id=new]").length;
				$("#list2").attr('class', 'redplum_c dropdown left noti_Container');
				$('#n2').show();
				$('#n2').html(count2);
				}
				
				
				else if(obj.type_id == 19){ //personal questions
				var tmp19 = "<a href='<?php echo Yii::app()->request->hostInfo;?>/questions/" +obj.questions_id + "'><li class='notification_item' id='new'><div style='width:293px; float:right; '><b>" +obj.sender_name+ "</b> just asked you a question:<br />" + htmlEncode(obj.questions_name) + "<br /><acronym class='timeago' style='font-size:10px; color:#999; margin-left:5px;'>few seconds ago</acronym></div><div style='float:left; width:40px; padding-left:2px; padding-top:5px; padding-bottom:5px;'><img width='40px' height='40px' src='"+ obj.avatar +"' ></div><div class='clear'></div></li></a>";
				
				$('#redplum-dropdown').prepend(tmp19);	
                $('#notification_sound').html("<embed src='<?php echo Yii::app()->request->hostInfo;?>/audio/notification.mp3' hidden='true' autostart='true' loop='false'>");
				
				var count2 = $("#redplum-dropdown li[id=new]").length;
				$("#list2").attr('class', 'redplum_c dropdown left noti_Container');
				$('#n2').show();
				$('#n2').html(count2);
				}
				
				
				else if(obj.type_id == 10){ //request milestone
				var tmp19 = "<a href='<?php echo Yii::app()->request->hostInfo;?>/mile/" +obj.mile_id + "'><li class='notification_item' style='background-color:#FCFCEB;' id='new'><div style='width:293px; float:right; '><b>" +obj.sender_name+ "</b> just bid on :<br />" + htmlEncode(obj.questions_name) + "<br /><acronym class='timeago' style='font-size:10px; color:#999; margin-left:5px;'>few seconds ago</acronym></div><div style='float:left; width:40px; padding-left:2px; padding-top:5px; padding-bottom:5px;'><img width='40px' height='40px' src='"+ obj.avatar +"' ></div><div class='clear'></div></li></a>";
				
				$('#redplum-dropdown').prepend(tmp19);	
                $('#notification_sound').html("<embed src='<?php echo Yii::app()->request->hostInfo;?>/audio/notification.mp3' hidden='true' autostart='true' loop='false'>");
				
				var count2 = $("#redplum-dropdown li[id=new]").length;
				$("#list2").attr('class', 'redplum_c dropdown left noti_Container');
				$('#n2').show();
				$('#n2').html(count2);
				}
				
				else if(obj.type_id == 11){ //work on easy question
				var tmp11 = "<a href='<?php echo Yii::app()->request->hostInfo;?>/questions/" +obj.questions_id + "'><li class='notification_item' style='background-color:#FCFCEB;' id='new'><div style='width:293px; float:right; '><b>" +obj.sender_name+ "</b> is working on your question now:<br />" + htmlEncode(obj.questions_name) + "<br /><acronym class='timeago' style='font-size:10px; color:#999; margin-left:5px;'>few seconds ago</acronym></div><div style='float:left; width:40px; padding-left:2px; padding-top:5px; padding-bottom:5px;'><img width='40px' height='40px' src='"+ obj.avatar +"' ></div><div class='clear'></div></li></a>";
				
				$('#redplum-dropdown').prepend(tmp11);	
                $('#notification_sound').html("<embed src='<?php echo Yii::app()->request->hostInfo;?>/audio/notification.mp3' hidden='true' autostart='true' loop='false'>");
				
				var count2 = $("#redplum-dropdown li[id=new]").length;
				$("#list2").attr('class', 'redplum_c dropdown left noti_Container');
				$('#n2').show();
				$('#n2').html(count2);
				}
				
				
				else if(obj.type_id == 20){ //blog questions
				var tmp19 = "<a href='<?php echo Yii::app()->request->hostInfo;?>/questions/" +obj.questions_id + "'><li class='notification_item' id='new'><div style='width:293px; float:right; '><b>" +obj.sender_name+ "</b> just asked you a question via your blog button:<br />" + htmlEncode(obj.questions_name) + "<br /><acronym class='timeago' style='font-size:10px; color:#999; margin-left:5px;'>few seconds ago</acronym></div><div style='float:left; width:40px; padding-left:2px; padding-top:5px; padding-bottom:5px;'><img width='40px' height='40px' src='"+ obj.avatar +"' ></div><div class='clear'></div></li></a>";
				
				$('#redplum-dropdown').prepend(tmp19);	
                $('#notification_sound').html("<embed src='<?php echo Yii::app()->request->hostInfo;?>/audio/notification.mp3' hidden='true' autostart='true' loop='false'>");
				
				var count2 = $("#redplum-dropdown li[id=new]").length;
				$("#list2").attr('class', 'redplum_c dropdown left noti_Container');
				$('#n2').show();
				$('#n2').html(count2);
				}	
				else if ( obj.type_id == 5){ //someone reply the answers
    			var tmp2 = "<a href='<?php echo Yii::app()->request->hostInfo;?>/discuss/view/pid/" +obj.pool_id + "/aid/" + obj.answers_id +"'><li class='notification_item' style='background-color:#FCFCEB;' id='new'><div style='width:293px; float:right; '><b>" +obj.sender_name+ "</b> just replied to you in question:<br />" + htmlEncode(obj.questions_name) + "<br /><acronym class='timeago' style='font-size:10px; color:#999;'>few seconds ago</acronym></div><div style='float:left; width:40px; padding-left:2px; padding-top:5px; padding-bottom:5px;'><img width='40px' height='40px' src='"+ obj.avatar +"' ></div><div class='clear'></div></li></a>";
				
				
				$('#redplum-dropdown').prepend(tmp2);	
                $('#notification_sound').html("<embed src='<?php echo Yii::app()->request->hostInfo;?>/audio/notification.mp3' hidden='true' autostart='true' loop='false'>");
				
				var count2 = $("#redplum-dropdown li[id=new]").length;
				$("#list2").attr('class', 'redplum_c dropdown left noti_Container');
				$('#n2').show();
				$('#n2').html(count2);
				}
				//yellow plum	
				else if ( obj.type_id == 1){ //mailbox
				if(!isChatFocused(obj.sender_name)){
				console.log('Chat not focused!');
				var date = new Date();
            	var isoString = date.toISOString();
            	$( "#yellowplum-dropdown li" ).each(function( index ) {
					if(($(this).find('b').html()) != null && $(this).find('b').html().localeCompare(obj.sender_name) === 0){
						$(this).remove();
					}
				});
				
				var tmp3 = "<a href='<?php echo Yii::app()->request->hostInfo;?>/mailbox/message/view/id/"+obj.conversation_id+"'><li class='notification_item' id='new' style='background-color:#FFFACD;'><div style='width:293px; float:right; '><b>" +obj.sender_name+ "</b>:<br /><span style='color:grey;'>" + htmlEncode(obj.text) + "</span><br /><acronym class='timeago' title='" +isoString+ "' style='font-size:10px; color:#999;'></acronym></div><div style='float:left; width:40px; padding-left:2px; padding-top:5px; padding-bottom:5px;'><img style='border:solid 1px #dfdfdf;' width='40px' height='40px' src='"+ obj.avatar +"' ></div><div class='clear'></div></li></a>";
			
				$('#yellowplum-dropdown').prepend(tmp3);
				$('acronym.timeago').timeago();

                //$('#notification_sound').html("<embed src='<?php echo Yii::app()->request->hostInfo;?>/audio/notification.mp3' hidden='true' autostart='true' loop='false'>");
				
				var count1 = $("#yellowplum-dropdown li[id=new]").length;
				$("#list1").attr('class', 'yellowplum_c dropdown left noti_Container');

				$('#n1').show();
				$('#n1').html(count1);
				
				}else{
					/*console.log('Chat focused!');
					$.ajax({
                        'type': 'POST',
                            'url': 'https://www.counselpool.com/site/markconvoasread',
                            'data': {
                            'else': obj.sender_name,  
                        },
                            'success': function () {
                            //console.log('mark convo read success');
                        },
                            'error': function () {
                            //console.log('mark convo read faliure');
                        }
                    }); //ajax*/

				}
				}else if ( obj.type_id == 6){  //accept mile stone				
				var tmp6 = "<a href='<?php echo Yii::app()->request->hostInfo;?>/questions/" +obj.questions_id + "'><li class='notification_item' id='new'><div style='width:293px; float:right; '><b>" +obj.sender_name+ "</b> accepted your bid and paid the downpayment of <b>$"+ obj.money +"</b>. <b style='color:#08c;'> View</b> <br /><acronym class='timeago' style='font-size:10px; color:#999;'>few seconds ago</acronym></div><div style='float:left; width:40px; padding-left:2px; padding-top:5px; padding-bottom:5px;'><img width='40px' height='40px' src='"+ obj.avatar +"' ></div><div class='clear'></div></li></a>";
				
				$('#blueplum-dropdown').prepend(tmp6);
                $('#notification_sound').html("<embed src='<?php echo Yii::app()->request->hostInfo;?>/audio/notification.mp3' hidden='true' autostart='true' loop='false'>");
				
				var count3 = $("#blueplum-dropdown li[id=new]").length;
				$("#list3").attr('class', 'blueplum_c dropdown left noti_Container');
				$('#n3').show();
				$('#n3').html(count3);
				}
				
				else if ( obj.type_id == 8){  //someone just chose your answer				
				var tmp8 = "<a  href='<?php echo Yii::app()->request->hostInfo;?>/user/profile/myaccount'><li class='notification_item' id='new'><div style='width:293px; float:right; '><b>" +obj.sender_name+ "</b> bested your answer.<br />You received a payment of: <b>$"+ obj.money + "</b>.<br />" + htmlEncode(obj.questions_name) + "<br /><acronym class='timeago' style='font-size:10px; color:#999;'>few seconds ago</acronym></div><div style='float:left; width:40px; padding-left:2px; padding-top:5px; padding-bottom:5px;'><img width='40px' height='40px' src='"+ obj.avatar +"' ></div><div class='clear'></div></li></a>";
							
				
				$('#blueplum-dropdown').prepend(tmp8);
                $('#notification_sound').html("<embed src='<?php echo Yii::app()->request->hostInfo;?>/audio/notification.mp3' hidden='true' autostart='true' loop='false'>");
				
				var count3 = $("#blueplum-dropdown li[id=new]").length;
				$("#list3").attr('class', 'blueplum_c dropdown left noti_Container');
				$('#n3').show();
				$('#n3').html(count3);
				}
				
				else if ( obj.type_id == 7){  //someone just donate to your answer				
				var tmp7 = "<a  href='<?php echo Yii::app()->request->hostInfo;?>/user/profile/myaccount'><li class='notification_item' id='new'><div style='width:293px; float:right; '><b>" +obj.sender_name+ "</b> donated to your answer.<br />You received a donation of: <b>$"+ obj.money + "</b>.<br />" + htmlEncode(obj.questions_name) + "<br /><acronym class='timeago' style='font-size:10px; color:#999;'>few seconds ago</acronym></div><div style='float:left; width:40px; padding-left:2px; padding-top:5px; padding-bottom:5px;'><img width='40px' height='40px' src='"+ obj.avatar +"' ></div><div class='clear'></div></li></a>";
							
				
				$('#blueplum-dropdown').prepend(tmp7);
                $('#notification_sound').html("<embed src='<?php echo Yii::app()->request->hostInfo;?>/audio/notification.mp3' hidden='true' autostart='true' loop='false'>");
				
				var count3 = $("#blueplum-dropdown li[id=new]").length;
				$("#list3").attr('class', 'blueplum_c dropdown left noti_Container');
				$('#n3').show();
				$('#n3').html(count3);
				}
            });   
        });
		
		  
		  
  $(document).click(function(e) {
  	    if(!$(e.target).is('#emojibutton')){
  			$('#emojidropdown').hide();
  		}
        if($(e.target).is('#list3')){
            e.preventDefault();
            return;
        }
		        if($(e.target).is('#list2')){
            e.preventDefault();
            return;
        }
		        if($(e.target).is('#list1')){
            e.preventDefault();
            return;
        }
			if (!$('#n3').is(":visible")) {
  $("#list3").removeClass('blue_c');
	$("#list3").addClass('blueplum');
			}
				if (!$('#n2').is(":visible")) {
	    $("#list2").removeClass('redplum_c');
	$("#list2").addClass('redplum');
				}
					if (!$('#n1').is(":visible")) {
	    $("#list1").removeClass('yellowplum_c');
	$("#list1").addClass('yellowplum');
					}
    }); 
  
 $('#list3').click(function() {
     $("#list3").removeClass('blueplum');
	$("#list3").addClass('blueplum_c');
	
	if (!$('#n2').is(":visible")) {
	    $("#list2").removeClass('redplum_c');
	$("#list2").addClass('redplum');
	}
		if (!$('#n1').is(":visible")) {
	    $("#list1").removeClass('yellowplum_c');
	$("#list1").addClass('yellowplum');
		}
});

 $('#list2').click(function() {
	 	if (!$('#n3').is(":visible")) {
     $("#list3").removeClass('blueplum_c');
		}
	$("#list3").addClass('blueplum');
	    $("#list2").removeClass('redplum');
	$("#list2").addClass('redplum_c');
		if (!$('#n1').is(":visible")) {
	    $("#list1").removeClass('yellowplum_c');
	$("#list1").addClass('yellowplum');
		}
});

 $('#list1').click(function() {
	 	if (!$('#n3').is(":visible")) {
     $("#list3").removeClass('blueplum_c');
	$("#list3").addClass('blueplum');
		}
			if (!$('#n2').is(":visible")) {
	    $("#list2").removeClass('redplum_c');
	$("#list2").addClass('redplum');
			}
	    $("#list1").removeClass('yellowplum');
	$("#list1").addClass('yellowplum_c');
});


$('#list3').hover(function()
{
    $("#list3").removeClass('blueplum');
	$("#list3").addClass('blueplum_c');
}, function()
{ 
if (!$('#list3').hasClass('open') && !$('#n3').is(":visible")) {
    $("#list3").removeClass('blueplum_c');
	$("#list3").addClass('blueplum');
}
});

$('#list2').hover(function()
{
    $("#list2").removeClass('redplum');
	$("#list2").addClass('redplum_c');
}, function()
{ 
if (!$('#list2').hasClass('open')&& !$('#n2').is(":visible")) {
    $("#list2").removeClass('redplum_c');
	$("#list2").addClass('redplum');
}
});

$('#list1').hover(function()
{
    $("#list1").removeClass('yellowplum');
	$("#list1").addClass('yellowplum_c');
}, function()
{ 
if (!$('#list1').hasClass('open')&& !$('#n1').is(":visible")) {
    $("#list1").removeClass('yellowplum_c');
	$("#list1").addClass('yellowplum');
}
});
		
    </script>
    <?php endif; ?>
    
<?php
$user = Users::model()->findByPk(Yii::app()->user->id);
$friends = Friendship::model()->countByAttributes(array('receiver'=>Yii::app()->user->id));
if($user && $user->status != 3):
setcookie ("userid", $user->activkey, time()+86400, '/', NULL, 0 );
?>

<!--Live chat-->
<script type="text/javascript" src="https://studypool-likepluminc.netdna-ssl.com/js/jstorage.min.js
"></script>
<script type="text/javascript" src="https://studypool-likepluminc.netdna-ssl.com/js/jquery.tinysort.min.js
"></script>
<script src="https://studypool-likepluminc.netdna-ssl.com/js/underscore.js" type="text/javascript"></script>

<script type="text/javascript" src="https://studypool-likepluminc.netdna-ssl.com/js/md5.js     
"></script>
<script src="https://studypool-likepluminc.netdna-ssl.com/js/flashtitle.js" type="text/javascript"></script>

<!---<link href="/js/normalize.css" rel="stylesheet" type="text/css" />-->
<link href="https://studypool-likepluminc.netdna-ssl.com/ajaxim/test_style_v2.css" rel="stylesheet" type="text/css" />

<script>
	if(detectB()[0].indexOf("Safari") != -1) {
		$($(".icon-chevron-up")[0]).css("top","3px");
	
	}
</script>
<?php
date_default_timezone_set("UTC");
endif; ?>

<?php if((Yii::app()->user->isGuest))://Logged out
?>

<style>

.TutorTab{
	height:30px;
	padding:6px;
	padding-bottom:8px;
	border-bottom: solid #e5e5e5 1px;
	text-overflow: ellipsis;
	font-family: 'Nunito'!important;
	text-align: center;
		
}
.TutorTab:hover{
	background-color:#e5e5e5;
}
#close:hover{
	cursor:pointer;

}
</style>

<script>
			(function($){

    $.fn.shuffle = function() {
        return this.each(function(){
            var items = $(this).children().clone(true);
            return (items.length) ? $(this).html($.shuffle(items)) : this;
        });
    }
    
    $.shuffle = function(arr) {
        for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    }
    
		})(jQuery);
		$(".scrollableArea").shuffle();
</script>


 <script>
//$(document).ready(function() {
	//var Left_Start = $("#main").position().left +20;
	//$(window).resize(function(){
		//Left_Start = $("#main").position().left + 20;
		  //var x = -($(window).scrollLeft()-Left_Start );
        //$('.Profile_Menu').css('left',x + 'px');
	
	//});
    //$(window).scroll(function (event) {
		//Left_Start = $("#main").position().left +20;
        //var x = -($(window).scrollLeft()-Left_Start);
        //$('.Profile_Menu').css('left',x + 'px');
        
    //});
    
//});

</script>
    <div id="footer2" class="container">
 
 <div id="lpchatbar"></div>
 
	</div><!-- footer -->
   <style>
	.messlink{
		white-space:nowrap;
	}
</style>
   
    
    
    <style>
/* bootstrap.min.css:647 */
.modal-header {
  padding: 1px;
  border: 0;
  background-color: #1569c7;
}

 #navbarlike
{
transform: scale(1.1);
-ms-transform: scale(1.1); 
-webkit-transform: scale(1.1); 
-o-transform: scale(1.1); 
-moz-transform: scale(1.1); 
transform-origin: top left;
-ms-transform-origin: top left;
-webkit-transform-origin: top left;
-moz-transform-origin: top left;
-webkit-transform-origin: top left;
margin-top:-2px;
}

/* bootstrap.min.css:645 */
.modal {
  border: 7px solid rgba(82, 82, 82, 0.7);
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
 
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
 
/* bootstrap.min.css:650 */
.modal-footer {
  padding: 4px 5px 5px;
  margin-bottom: 0;
  text-align: right;
  background-color: #f2f2f2;
  border-top: 1px solid #ccc;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
 
/* newest:439 */
#cover {
position:fixed;
top:0;
right:0;
bottom:0;
left:0;
   opacity: 0.80;
   filter:alpha(opacity=80); /* IE */
   -moz-opacity:0.80; /* FireFox */
   background: #fff;
   z-index: 1100;
   display: none;
}
</style>

<div id="cover"></div>

<?php 
$promo = null;
if($user){
$promo = Promo::model()->findByPk($user->promo);
}
if($promo):
?>

<script>
function close_promo() {
$('#promo_code').fadeOut('fast');
$("body").css("overflow", "");
$("#cover").hide();
}
function open_promo() {
        $('#promo_code').show();
		$('#cover').show();
		$("body").css("overflow", "hidden");
}
<?php if(!$user->promo_seen):
Yii::app()->session['popup'] = 1;
$user->promo_seen = 1;
$user->save(false);
?>
    $(window).load(function(){
        $('#promo_code').show();
		$('#cover').show();
		$("body").css("overflow", "hidden");
    });
<?php endif; ?>
</script>

 <div id="promo_code" class="modal" style="display:none;z-index:1200;position:absolute;top:350px;">

<div class="modal-header" style="text-align:left;padding-left:12px; color:#fff; font-weight:bold;">
    <h3 style="font-weight:20px; margin-top:3px; margin-bottom:3px;font-weight:500;">
<img style="margin-top:-5px; " width="24px;" src="https://studypool-likepluminc.netdna-ssl.com/pictures/trophy.png" />
Congratulations</h3>
</div>

<div class="modal-body" style="float:none; text-align:left;">

<h4 style="color:#600; font-size:16px;">Studypool: Your source for easy online homework help!</h4><br>

<p><b>As a brother of <span style="color:#600;"><?php echo $promo->org;?></span>, you get a <u>20%</u> discount on all your questions.  This 20% will be deducted from your payments and covered by studypool. </b></p>

<p><b style="color:green;">A Free $20.00</b> has been put into your balance to try out studypool.</p>

<p>Your fraternity chapter has <b><?php echo ($promo->limit - $promo->number);?></b> accounts left for your brothers.  Tell your brothers about studypool and give them the promo code: <b><?php echo $promo->id;?></b> to use when signing up.  </p>

<p>Overall keep this on the down low, we don’t want too many people knowing about studypool.</p>

<p>Regards,<br>
Studypool Team</p>
</div>

<div class="modal-footer">
    <?php $this->widget('bootstrap.widgets.BootButton', array(
        'label'=>'OK',
		'type'=>'success',
        'htmlOptions'=>array('onclick'=>'close_promo();','style'=>'width:60px;'),
    )); ?>
</div>
</div>


<?php
endif;
?>	
<?php
$profile = Profile::model()->findByPk(Yii::app()->user->id);
$appeal = Appeal::model()->findByAttributes(array('asker_id'=>Yii::app()->user->id,'owner_id'=>1,'read'=>0));
$appeal2= Appeal::model()->findByAttributes(array('genius_id'=>Yii::app()->user->id,'owner_id'=>1,'read_genius'=>0));

$reject = MailboxConversation::model()->findByAttributes(array('bm_read'=>0, 'creceiver'=>Yii::app()->user->id, 'subject'=>"The question you answered has been withdrawn. <b style='color:#08c;'>View reason</b>"));

$reject2 = MailboxConversation::model()->findByAttributes(array('bm_read'=>0, 'creceiver'=>Yii::app()->user->id, 'subject'=>"The question you answered has been withdrawn. For your time, studypool will transfer the downpayment to your account in 72 hours. <b style='color:#08c;'>View more</b>"));

if($reject2){
	$reject2->bm_read = 1;
	$reject2->save(false);
	?>

<?php
Yii::app()->session['popup'] = 1;
?>

<script>
function close_appeal() {
$('#myappeal').fadeOut('fast');
$("body").css("overflow", "");
$("#cover").hide();
}
    $(window).load(function(){
        $('#myappeal').show();
		$('#cover').show();
		$("body").css("overflow", "hidden");
    });
</script>

 <div id="myappeal" class="modal" style="display:none;z-index:1200;position:absolute;top:300px;">

<div class="modal-header" style="text-align:left;padding-left:12px; color:#fff; font-weight:bold;">
    <h3 style="font-weight:20px; margin-top:3px; margin-bottom:3px;font-weight:500;">
<img style="margin-top:-5px; " width="22px;" src="https://studypool-likepluminc.netdna-ssl.com/pictures/editall_star.png" />
Answer Accepted </h3>
</div>

<div class="modal-body" style="float:none; text-align:left;">

<?php $myq = Questions::model()->findByPk($reject2->questions_id); 
if($myq):
?>
<h4 style="font-size:17px; font-weight:500;"><?php if(!$myq->task): ?>Question: <a target="_blank" href="<?php echo Yii::app()->request->hostInfo; ?>/questions/<?php echo $myq->id;?>"><?php echo $myq->name;?></a><?php else: ?>Task: <a target="_blank" href="<?php echo Yii::app()->request->hostInfo; ?>/questions/<?php echo $myq->id;?>"><?php echo $myq->name;?></a><?php endif; ?></h4><br />
<?php endif; ?>

Studypool customer service has decided your answer was satisfactory and has transferred you the payment. <br><br>  
We apologize for the inconvenience and recommend that you do not work with this student again.  We have given the student negative reputation.

</p>
</div>

<div class="modal-footer">
    <?php $this->widget('bootstrap.widgets.BootButton', array(
        'label'=>'View here',
        'type'=>'primary',
        'url'=>'/questions/'.$myq->id,
    )); ?>
</div>
</div>


<?php
$myq = null;
$mymile = null;
}else if($reject){ 
$myq = Questions::model()->findByPk($reject->questions_id); 
if($myq){
$mymile = Mile::model()->findByAttributes(array('questions_id'=>$myq->id,'accept'=>1));
if(!$mymile){
	$mymile = Mile::model()->findByAttributes(array('questions_id'=>$myq->id,'accept'=>2));
}
}
$reject->bm_read = 1;
$reject->save(false);
if($myq):
?>


<?php
Yii::app()->session['popup'] = 1;
?>

<script>
function close_appeal() {
$('#myappeal').fadeOut('fast');
$("body").css("overflow", "");
$("#cover").hide();
}
    $(window).load(function(){
        $('#myappeal').show();
		$('#cover').show();
		$("body").css("overflow", "hidden");
    });
</script>

 <div id="myappeal" class="modal" style="display:none;z-index:1200;position:absolute;top:300px;">

<div class="modal-header" style="text-align:left;padding-left:10px; color:#fff; font-weight:bold;">
    <h3 style="font-weight:20px; margin-top:3px; margin-bottom:3px;font-weight:500;">
<img src="https://studypool-likepluminc.netdna-ssl.com/pictures/withdraw_m.png" width="19px;" style="margin-top:-3px;" />
Answer Declined </h3>
</div>

<div class="modal-body" style="float:none; text-align:left;">

<?php 
if($myq):
?>
<h4 style="font-size:17px; font-weight:500;"><?php if(!$myq->task): ?>Question: <a target="_blank" href="<?php echo Yii::app()->request->hostInfo; ?>/questions/<?php echo $myq->id;?>"><?php echo $myq->name;?></a><?php else: ?>Task: <a target="_blank" href="<?php echo Yii::app()->request->hostInfo; ?>/questions/<?php echo $myq->id;?>"><?php echo $myq->name;?></a><?php endif; ?></h4><br />
<?php endif; ?>

<p style="font-size:14px;">
<?php if($mymile && $mymile->auto): ?>
Studypool customer service has decided your answer was not satisfactory.</p><p style="font-size:14px;"><span style="color:green;"><span style="font-size:16px; font-weight:500;">*</span>Note:</span> Since the asker did not pay or withdraw the question within 3 days after the time limit exceeded, you will still receive the downpayment for your answer.
<?php else: ?>
Studypool customer service has decided your answer was not satisfactory and has refunded the student. 
<?php endif; ?>
<?php 
$auto_reso = null;
if($myq){
$auto_reso = Resolution::model()->findByAttributes(array('questions_id'=>$myq->id));
}
if($myq && !$myq->paid && $auto_reso && $auto_reso->cs && ($auto_reso->asker_es || $auto_reso->genius_es)): 
?>

<br><br>
Because you did not refund the student yourself, your bad rating will count for twice 2x as much and you have received a review with the title “Tutor Did Not Refund”

<style>
.arrow_box {

	position: relative;

	background: #f8f8f8;

	border: 1px solid #efefef;

}

.arrow_box:after, .arrow_box:before {

	right: 100%;

	border: solid transparent;

	content: " ";

	height: 0;

	width: 0;

	position: absolute;

	pointer-events: none;

}



.arrow_box:after {

	border-color: rgba(248, 248, 248, 0);

	border-right-color: #f8f8f8;

	border-width: 13px;

	top: 70%;

	margin-top: -13px;

}

.arrow_box:before {

	border-color: rgba(239, 239, 239, 0);

	border-right-color: #efefef;

	border-width: 14px;

	top: 70%;

	margin-top: -14px;

}





.arrow_box_small {

	position: relative;

	background: #f8f8f8;

	border: 1px solid #efefef;

}

.arrow_box_small:after, .arrow_box:before {

	right: 100%;

	border: solid transparent;

	content: " ";

	height: 0;

	width: 0;

	position: absolute;

	pointer-events: none;

}



.arrow_box_small:after {

	border-color: rgba(248, 248, 248, 0);

	border-right-color: #f8f8f8;

	border-width: 13px;

	top: 40px;

	margin-top: -13px;

}

.arrow_box_small:before {

	border-color: rgba(239, 239, 239, 0);

	border-right-color: #efefef;

	border-width: 14px;

	top: 40px;

	margin-top: -14px;

}
</style>

<div class="review_view" style="position:relative; border-bottom:solid 1px #cfcfcf; margin-bottom:10px;">

<div style="margin-bottom:10px; font-weight:500;">
<a style="margin-right:50px;" href="#">Academic Question</a>

<div style="position:absolute;margin-top:-17px; margin-left:130px;">
$30.00 USD



<span style="color:red; font-weight:400;"><b>(Tutor Did Not Refund)</b></span>
</div>


<span class="right star-rating" style="margin-right:7px;">

<span id="overall8328">
<span class="star-rating-control"><div class="rating-cancel" style="display: none;"><a title="Cancel Rating"></a></div><div class="star-rating rater-7 star-rating-applied star-rating-readonly star-rating-on" id="overall8328_0"><a title="1">1</a></div><div class="star-rating rater-7 star-rating-applied star-rating-readonly" id="overall8328_1"><a title="2">2</a></div><div class="star-rating rater-7 star-rating-applied star-rating-readonly" id="overall8328_2"><a title="3">3</a></div><div class="star-rating rater-7 star-rating-applied star-rating-readonly" id="overall8328_3"><a title="4">4</a></div><div class="star-rating rater-7 star-rating-applied star-rating-readonly" id="overall8328_4"><a title="5">5</a></div></span><input id="overall8328_0" value="1" checked="checked" type="radio" name="overall8328" class="star-rating-applied star-rating-readonly" style="display: none;">
<input id="overall8328_1" value="2" type="radio" name="overall8328" class="star-rating-applied star-rating-readonly" style="display: none;">
<input id="overall8328_2" value="3" type="radio" name="overall8328" class="star-rating-applied star-rating-readonly" style="display: none;">
<input id="overall8328_3" value="4" type="radio" name="overall8328" class="star-rating-applied star-rating-readonly" style="display: none;">
<input id="overall8328_4" value="5" type="radio" name="overall8328" class="star-rating-applied star-rating-readonly" style="display: none;">
</span>
<span style="margin-left:10px;">1.0</span>

</span>
</div>




<table>
<tbody><tr>
<td style="width:100px;">
<img style="border:solid 1px #bfbfbf;" src="https://studypool-likepluminc.netdna-ssl.com/pictures/unknown.jpg" alt="studypool" width="75px">



</td>
<td>
<div class="arrow_box_small" style="min-height:53px;font-size:13px;padding:10px;margin-right:-8px; width:380px;">
<div>
<a href="#">Student</a>

<span class="right" style="color:grey;">
<acronym class="timeago" title="Dec 20th, 2013">one month ago</acronym>
</span>

</div><!--name and time-->

<p style="margin-top:3px;"><i>
"Was not satisfied"</i></p>


</div>
</td>
</tr></tbody></table>

</div>
In the future, you should refund the students payment within 2 days.
<?php elseif($myq): ?>
<?php if($mymile && $mymile->auto): ?>

<?php else: ?>
We have taken out the payment ($<?php echo $myq->money;?>) from your balance. If you did not have enough balance in your account, we would take out payment from your most recent cash withdrawal.
<?php endif; ?>
<?php endif; ?>

</p>

<p style="font-size:14px;margin-top:10px;">-Studypool Customer Service Team</p>

</div>

<div class="modal-footer">
    <?php 
	$this->widget('bootstrap.widgets.BootButton', array(
        'label'=>'View here',
        'type'=>'primary',
        'url'=>'/questions/'.$myq->id,
    )); ?>
</div>
</div>

<?php
endif;
}else if($profile && $profile->remindpay == 1){  //only trigger if you have pending questions.
?>

<script type="text/javascript">
    $(window).load(function(){
		$("body").css("overflow", "hidden");
		$('#cover').show();
        $('#remindpay').show();
    });
	
	function close_remindpay(){
		$('#remindpay').fadeOut();
		$('#cover').hide();
		$("body").css("overflow", "");
	}
	
	function known(){
    $.post('<?php echo Yii::app()->request->hostInfo;?>/user/user/known');	
	}

</script>

<style>
#remindpay {
	z-index:99999;
	top:430px !important;
}

.modal{
width:590px;
}

#tutor.fade{
  -webkit-transition: none;
  -moz-transition: none;
  -ms-transition: none;
  -o-transition: none;
  transition: none;
}

#tutor{
z-index:9999999;
}
</style>

<?php

$pool=Pool::model()->find(array(
 'condition'=>'owner_id=:uId AND free = 0 AND real_answers>0 AND UNIX_TIMESTAMP(create_time) < :time - time_limit AND paid=0 AND (withdrawed=0 OR withdrawed = 2)',
'params' => array(
 ':time'=>time(),
 ':uId'=>Yii::app()->user->id,
                 ),
));
Yii::app()->session['popup'] = 1;
//modal below
?>

<style>
/* bootstrap.min.css:647 */
.modal-header {
  padding: 1px;
  border: 0;
  background-color: #1569c7;
}
 
/* bootstrap.min.css:645 */
.modal {
  border: 7px solid rgba(82, 82, 82, 0.7);
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
 
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
 
 
/* bootstrap.min.css:650 */
.modal-footer {
  padding: 4px 5px 5px;
  margin-bottom: 0;
  text-align: right;
  background-color: #f2f2f2;
  border-top: 1px solid #ccc;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
 
/* newest:439 */
#cover {
position:fixed;
top:0;
right:0;
bottom:0;
left:0;
   opacity: 0.80;
   filter:alpha(opacity=80); /* IE */
   -moz-opacity:0.80; /* FireFox */
   background: #fff;
   z-index: 1100;
   display: none;
}
</style>
 
<div id="remindpay" class="modal" style="top:390px; width:500px;left:53%;"> 
<div class="modal-header">
    <h3 style="margin-top:3px; margin-bottom: 3px; color:#fff; text-align:left; margin-left:10px;"><img style="margin-top:-3px; width:30px; height:24px;" src="https://studypool-likepluminc.netdna-ssl.com/pictures/lightning-icon.png" /> Please take action</h3>
    </div>
 
<div class="modal-body" style="float:none; text-align:left;">
<p>Your time limit has expired, please <b>pay</b> if you received a satisfactory answer or <b>withdraw</b> if you have not.
<?php $pro = Prolong::model()->findByAttributes(array('questions_id'=>$pool->questions_id));
if(!$pro): 
?>
You may also extend the time limit. 
<?php endif; ?>
Your account will be locked until you take an action.</p>
</div>
 
<div class="modal-footer">
    <?php $this->widget('bootstrap.widgets.BootButton', array(
        'label'=>'OK',
		'type'=>'action',
        'htmlOptions'=>array('data-dismiss'=>'modal','onclick'=>'close_remindpay(); known(); return false;','id'=>'known'),
    )); ?>
</div>
 </div>
<?php  
//modal above
?>

<?php
}else if($appeal || $appeal2){
?>
<style>
/* bootstrap.min.css:647 */
.modal-header {
  padding: 1px;
  border: 0;
  background-color: #1569c7;
}
 
/* bootstrap.min.css:645 */
.modal {
  border: 7px solid rgba(82, 82, 82, 0.7);
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
 
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
 
/* bootstrap.min.css:650 */
.modal-footer {
  padding: 4px 5px 5px;
  margin-bottom: 0;
  text-align: right;
  background-color: #f2f2f2;
  border-top: 1px solid #ccc;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
 
/* newest:439 */
#cover {
position:fixed;
top:0;
right:0;
bottom:0;
left:0;
   opacity: 0.80;
   filter:alpha(opacity=80); /* IE */
   -moz-opacity:0.80; /* FireFox */
   background: #fff;
   z-index: 1100;
   display: none;
}
</style>

<div id="cover"></div>
<?php
if($appeal){
$reso = Resolution::model()->findByPk($appeal->resolution_id);
}else{
$reso = Resolution::model()->findByPk($appeal2->resolution_id);
}
if($reso && Yii::app()->user->id):
$myq = Questions::model()->findByPk($reso->questions_id);
Yii::app()->session['popup'] = 1;
?>

<script>
function close_appeal() {
$('#myappeal').fadeOut('fast');
$("body").css("overflow", "");
$("#cover").hide();
}
    $(window).load(function(){
        $('#myappeal').show();
		$('#cover').show();
		$("body").css("overflow", "hidden");
    });
</script>

 <div id="myappeal" class="modal" style="display:none;z-index:1200;position:absolute;top:390px;">

<div class="modal-header" style="text-align:left;padding-left:10px; color:#fff; font-weight:bold;">
    <h3 style="font-weight:20px; margin-top:3px; margin-bottom:3px;font-weight:500;">
<img src="<?php echo Yii::app()->request->hostInfo; ?>/images/appeal.png" style="width:24px;margin-top:-4px;" />
Pending Question Withdrawal</h3>
</div>

<div class="modal-body" style="float:none; text-align:left;">

<h4 style="font-size:17px; font-weight:500;"><?php if(!$myq->task): ?>Question: <a target="_blank" href="<?php echo Yii::app()->request->hostInfo; ?>/questions/<?php echo $myq->id;?>"><?php echo $myq->name;?></a><?php else: ?>Task: <a target="_blank" href="<?php echo Yii::app()->request->hostInfo; ?>/questions/<?php echo $myq->id;?>"><?php echo $myq->name;?></a><?php endif; ?></h4><br />

<p style="font-size:14px;">
<?php if($appeal2): ?>
The studypool review team has replied to a withdrawal by your student.
<?php else: ?>
The studypool review team has replied to your question withdrawal. 
<?php endif; ?>
</p>
</div>

<div class="modal-footer">
    <?php $this->widget('bootstrap.widgets.BootButton', array(
        'label'=>'View here',
        'type'=>'primary',
        'url'=>'/resolution/'.$reso->id,
    )); ?>
</div>
</div>


<?php 
endif;
}else if(Yii::app()->user->id){
$mywithdraw = MailboxConversation::model()->find(array(
 'condition'=>'creceiver = :uid AND csender = 1 AND bm_read = 0 AND questions_id > 0 AND approve > 0', //1approve, 2 decline,3nega
'params' => array(
 ':uid'=>$user->id,
                 ),
));
if($mywithdraw){
Yii::app()->session['popup'] = 1;
$resolution = null;
$myquestion = Questions::model()->findByPk($mywithdraw->questions_id);
if($myquestion){
$resolution = Resolution::model()->findByAttributes(array('questions_id'=>$myquestion->id));
}
if($myquestion && $resolution):
$mywithdraw->bm_read = 3;
$mywithdraw->save(false);
?>
<style>
/* bootstrap.min.css:647 */
.modal-header {
  padding: 1px;
  border: 0;
  background-color: #1569c7;
}
 
/* bootstrap.min.css:645 */
.modal {
  border: 7px solid rgba(82, 82, 82, 0.7);
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
 
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
 
/* bootstrap.min.css:650 */
.modal-footer {
  padding: 4px 5px 5px;
  margin-bottom: 0;
  text-align: right;
  background-color: #f2f2f2;
  border-top: 1px solid #ccc;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
 
/* newest:439 */
#cover {
position:fixed;
top:0;
right:0;
bottom:0;
left:0;
   opacity: 0.80;
   filter:alpha(opacity=80); /* IE */
   -moz-opacity:0.80; /* FireFox */
   background: #fff;
   z-index: 1100;
   display: none;
}
</style>
<script>
function close_withdraw() {
$('#mywithdraw').fadeOut('fast');
$("body").css("overflow", "");
$("#cover").hide();
}
    $(window).load(function(){
        $('#mywithdraw').show();
		$('#cover').show();
		$("body").css("overflow", "hidden");
    });
</script>

<div id="cover"></div>

 <div id="mywithdraw" class="modal" style="display:none;z-index:1200;position:absolute;top:340px;">

<div class="modal-header" style="text-align:left;padding-left:10px; color:#fff; font-weight:bold;">
    <h3 style="font-weight:20px; margin-top:3px; margin-bottom:3px;font-weight:500;">
<?php
if($mywithdraw->approve == 1){
?>
<img src="https://studypool-likepluminc.netdna-ssl.com/pictures/approve.png" style="width:28px;margin-top:-4px;" />
Withdrawal:  
<?php if($resolution->cs || !$resolution->genius_id): ?>Payment Refunded<?php else: ?>Refunded by Tutor<?php endif; ?>
<?php }else{ ?>
<img src="https://studypool-likepluminc.netdna-ssl.com/pictures/decline.png" style="width:28px;margin-top:-4px;" />
Withdrawal: Declined 
<?php } ?>
 </h3>
</div>

<div class="modal-body" style="float:none; text-align:left;  padding-left:10px; padding-right:10px;">
<h4 style="font-size:17px; font-weight:500;"><?php if(!$myquestion->task): ?>Question: <a target="_blank" href="<?php echo Yii::app()->request->hostInfo; ?>/questions/<?php echo $myquestion->id;?>"><?php echo $myquestion->name;?></a><?php else: ?>Task: <a target="_blank" href="<?php echo Yii::app()->request->hostInfo; ?>/questions/<?php echo $myquestion->id;?>"><?php echo $myquestion->name;?></a><?php endif; ?></h4><br />

<?php 
$tutor = null;
if($mywithdraw->approve == 1):
$mymile = null;

$mymile = Mile::model()->findByAttributes(array('questions_id'=>$myquestion->id,'accept'=>1));
if(!$mymile){
	$mymile = Mile::model()->findByAttributes(array('questions_id'=>$myquestion->id,'accept'=>2));
}
$tutor = Users::model()->findByPk($resolution->genius_id);
$me = Users::model()->findByPk(Yii::app()->user->id);

/*
if($tutor){
$newname = Newname::model()->findByPk($tutor->id);
	if(($tutor->createtime > 1399990412 || ($newname && ($newname->create_time < $me->createtime || !$me))) && $tutor->profile->firstname && isset($tutor->profile->lastname[0])){
		$tutor->username = $tutor->profile->firstname." ".$tutor->profile->lastname[0].".";
	}
}
*/
?>

<?php if($mymile && $mymile->auto == 1): ?>
<p><b>You withdrawal has been approved.</b> Sorry you didn't like the answer you received. </p><p> You will not have to pay the remainder of your payment.</p> <p><span style="font-size:16px; color:red;">*</span> <span style="color:red;">Note:</span> You will not receive a refund for your downpayment because you did not pay or withdraw the question within 3 days after your time limit exceeded. <a href="/actionrequired" target="_blank">Learn more</a></p>
<?php else: ?>
<p style="font-size:14px;">You withdrawal has been approved and refunded by <?php if($resolution->cs || !$tutor): ?>the Studypool Customer Service Team<?php elseif($tutor): ?>tutor <?php echo $tutor->username;?><?php endif; ?>. <a href="/resolution/<?php echo $resolution->id;?>">view more</a></p>
<?php endif; ?>

<?php if($mymile && $mymile->auto != 1): ?>

<?php if($resolution->cc >= 9999){  //25 ?>
<p style="font-size:14px;">Your payment of <b>$<?php echo $resolution->cc + $resolution->cash;?></b> has been refunded to your Bank/Paypal account <?php if($resolution->cash > 0):?>and your Studypool balance, which can be used for future questions<?php endif;?>. (It may take a few days for the refund to appear on your Bank/Paypal statement.)</p>

<p style="font-size:14px;">Bank/Paypal Refund: $<?php echo $resolution->cc; ?></p>

<?php if($resolution->cash > 0): ?>
<p style="font-size:14px;">Studypool Balance: $<?php echo $resolution->cash; ?></p>
<?php endif; ?>

<p style="font-size:14px;">Refund Transaction ID: #<?php echo $mymile->transaction_id; ?></p>

<?php }else if($resolution){ ?>
<p style="font-size:14px;">Your payment of <b>$<?php echo $resolution->cc + $resolution->cash;?></b> has been refunded to your Studypool balance, which can be used for future questions.</p>

<?php } ?>

<?php endif; ?>

<p style="font-size:14px;margin-top:10px;">-Studypool Customer Service Team</p>
<?php endif; ?>

<?php if($mywithdraw->approve == 2):
	$mymile = Mile::model()->findByAttributes(array('questions_id'=>$myquestion->id));
?>
<?php $cut = Cut::model()->findByAttributes(array('questions_id'=>$myquestion->id)); ?>

<p style="font-size:14px;">Your withdrawal has been declined <?php if($resolution->cs): ?>by the Studypool Customer Service Team<?php endif; ?>. <a href="<?php echo Yii::app()->request->hostInfo; ?>/mailbox/message/view/id/<?php echo $mywithdraw->conversation_id;?>">view why</a></p>

<?php if($mymile): ?>
<p style="font-size:14px;">Your downpayment of <b>$<?php echo $mymile->money;?></b> has been transferred to <b><?php echo $mymile->senderx->username;?></b>.</p>
<?php endif; ?>

<p style="font-size:14px;">You have received <span style="color:red;"><?php echo $cut->reputation; ?></span> negative reputation. </p>


<p style="font-size:14px;margin-top:10px;">-Studypool</p>
<?php endif; ?>


</div>

<div class="modal-footer">

    <?php $this->widget('bootstrap.widgets.BootButton', array(
        'label'=>'View more',
        'type'=>'primary',
        'url'=>'/resolution/'.$resolution->id,
       // 'htmlOptions'=>array('data-dismiss'=>'modal','onclick'=>'close_withdraw(); return false;'),
    )); ?>
</div>
</div>

<?php
endif;
}
} ?>

<script type="text/javascript">
adroll_adv_id = "VDTFKZKBINCGNIT24OUCEI";
adroll_pix_id = "SYFOI5AP5FDLVHEQAXYJ3H";
(function () {
var oldonload = window.onload;
window.onload = function(){
   __adroll_loaded=true;
   var scr = document.createElement("script");
   var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
   scr.setAttribute('async', 'true');
   scr.type = "text/javascript";
   scr.src = host + "/j/roundtrip.js";
   ((document.getElementsByTagName('head') || [null])[0] ||
    document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
   if(oldonload){oldonload()}};
}());
</script>



<script>
$(document).ready(function() {
$('textarea:not(".imjs-input")').css('overflow', 'hidden').autogrow();
});

function htmlEncode(value){
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}
</script>


<script>
$(document).ready(function()
{	
			if ($('#blueplum-dropdown').actual('height') >= 400) {
				$('#blueplum-dropdown').slimScroll({
					allowPageScroll: false,
        			height: '400px'
    			});
			}
			else if ($('#blueplum-dropdown').actual('height') <= 36) {
				$('#blueplum-dropdown').slimScroll({
					height: '36px'
    			});
			}
			
			else {
				$('#blueplum-dropdown').slimScroll({
        			height: $('#blueplum-dropdown').actual('height') + 'px'
    			});
			}
				
			if ($('#redplum-dropdown').actual('height') >= 400) {
				$('#redplum-dropdown').slimScroll({
					allowPageScroll: false,
        			height: '400px'
    			});
			}
			else if ($('#redplum-dropdown').actual('height') <= 36) {
				$('#redplum-dropdown').slimScroll({
					height: '36px'
    			});
			}
			else {
				$('#redplum-dropdown').slimScroll({
        			height: $('#redplum-dropdown').actual('height') + 'px'
    			});
			}
				
			if ($('#yellowplum-dropdown').actual('height') >= 400) {
				$('#yellowplum-dropdown').slimScroll({
					allowPageScroll: false,
        			height: '400px'
    			});
			}
			else if ($('#yellowplum-dropdown').actual('height') <= 36) {
				$('#yellowplum-dropdown').slimScroll({
					height: '36px'
    			});
			}
			else {
				$('#yellowplum-dropdown').slimScroll({
        			height: $('#yellowplum-dropdown').actual('height')  + 'px'
    			});
			}
			
			

});

</script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-47685492-1', 'studypool.com');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');

</script>


<script type="text/javascript">
adroll_adv_id = "6VZWAKFK45GFXLR7EESFPL";
adroll_pix_id = "SXBP3TG2N5FZLD7HRVE25B";
(function () {
var oldonload = window.onload;
window.onload = function(){
   __adroll_loaded=true;
   var scr = document.createElement("script");
   var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
   scr.setAttribute('async', 'true');
   scr.type = "text/javascript";
   scr.src = host + "/j/roundtrip.js";
   ((document.getElementsByTagName('head') || [null])[0] ||
    document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
   if(oldonload){oldonload()}};
}());
</script>


<script>
$(document).ready(function() {
    $.post('/jscreenscript?h=' + screen.height, { width: screen.width, height:screen.height }, function(json) {
        if(json.outcome == 'success') {
            // do something with the knowledge possibly?
			
        } else {
            //alert('Unable to let PHP know what the screen resolution is!');
        }
    },'json');
	
});
</script>

<?php if(Yii::app()->user->isGuest) { ?>
   <script>
var jarray = new Array(	
	<?php $jjjtheman = Keyw::model()->findAll(); // choosing variable names to avoid collision
	foreach($jjjtheman as $jjjjjjjj) {
		echo 'new Array(\'' . $jjjjjjjj->url . '\', \'' . $jjjjjjjj->key . '\'), ';
	}
	?>
	new Array('mathematics-homework-help', 'number'));
var max = 3;
var count = 0;
var x = true;

//Function replaces all of the keywords for specific catergories for the corrosponding pool
//Inputs: the jQuery object for the element in which to replace links
//Outputs: modifies the element to have links in text nodes.
function processLinks($element) {
	var counter = new Array(1, 1);
	for(var c = 2; c < jarray.length; c++) {
		counter.push(1);
		//console.log("c" + c);
	}
    while(counter.indexOf(1) >= 0 && count < max) {
	
		var i = Math.floor(Math.random() * counter.length);
		while(counter[i] == 0) {
			i = Math.floor(Math.random() * counter.length);
		}
		counter[i] = 0;
		//for (var j = 0; j < jarray[i].length; j++) {
			//x = true;
			//if(count >= max) {
			//	return;
			//} else {
				//console.log(jarray[i][1]);
				if(jarray[i][1]){
					$element.replacetext(new RegExp(' '+jarray[i][1]+' '), " <a href='/" + jarray[i][0] + "'>"+jarray[i][1]+"</a> ");
			    }
			//}
		//}
    }
}

//Callback to replace all characteristics of a single word
(function($) {
    $.fn.replacetext = function(target, replacement) {
         // Get all text nodes:
         var $textNodes = this
                 .find("*")
                 .andSelf()
                 .contents()
                 .filter(function() {
                     return this.nodeType === 3 && 
                         !$(this).parent("a").length;
                 });
         
         // Iterate through the text nodes, replacing the content
         // with the link:
         $textNodes.each(function(index, element) {
			if(x) {
			    var contents = $(element).text();
				if(target.test(contents)) {
					count = count + 1;
					//console.log(count);
					x = false;
				}
				contents = contents.replace(target, replacement);
				$(element).replaceWith(contents);
				
			}
		});
    };
})(jQuery);
  		$(document).ready(function(){
			processLinks($('.question'));
		}); 
		  $("#loading").hide();
   </script>

<?php } ?>

</body>
</html>