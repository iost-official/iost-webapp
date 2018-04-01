<?php /* @var $this Controller */ ?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="language" content="en">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="icon" href="/app/favicon.ico">
	 <link rel="apple-touch-icon" href="/app/assets/img/apple-touch-icon.png">

	<meta name="apple-itunes-app" content="app-id=1111783063">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- // <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script> -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<title><?php echo $this->pageTitle; ?></title>
	<!-- Path to Framework7 Library CSS-->
	<link rel="stylesheet" href="/ios/www/css/framework7.ios.min.css">
	<link rel="stylesheet" href="/ios/www/css/framework7.ios.colors.min.css">
	<!-- Tinder  -->
	<link rel="stylesheet" href="/ios/www/css/jTinder.css?n=1">
	<!-- Slider plugin -->
	<link rel="stylesheet" href="/ios/www/css/rangeslider.css">
	<!-- Icon plugin -->
	<link rel="stylesheet" href="/ios/www/css/font-awesome-4.6.1/css/font-awesome.css">
	<!-- Font -->
	<link rel="stylesheet" href="/ios/www/css/google-font.css?n=1">
	<!-- <link href="https://fonts.googleapis.com/css?family=PT Sans" rel="stylesheet"> -->
	<!-- Animation -->
	<link rel="stylesheet" href="/ios/www/css/animate.css?">
	<!-- Core -->
	<!-- <link rel="stylesheet" href="http://gettimi.com/ios/www/css/my-app.css?n=1"> -->
	<link rel="stylesheet" href="/ios/www/css/my-app.css?n=1">
	<!-- <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/emojify.js/1.0.1/emojify.min.css" /> -->
	<!-- jQuery lib -->
	<script type="text/javascript" src="/ios/www/js/jquery.min.js"></script>
	<!-- Slider plugin -->
	<script type="text/javascript" src="/ios/www/js/rangeslider.js"></script>
	<!-- transform2d lib -->
	<script type="text/javascript" src="/ios/www/js/jquery.transform2d.js"></script>
	<!-- jTinder lib -->
	<script type="text/javascript" src="/ios/www/js/jquery.jTinder.js"></script>
	<!-- // <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script> -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<title>Timi</title>
	<!-- Path to Framework7 Library CSS-->
	<link rel="stylesheet" href="/ios/www/css/framework7.ios.min.css">
	<link rel="stylesheet" href="/ios/www/css/framework7.ios.colors.min.css">
	<!-- Tinder  -->
	<link rel="stylesheet" href="/ios/www/css/jTinder.css?n=1">
	<!-- Slider plugin -->
	<link rel="stylesheet" href="/ios/www/css/rangeslider.css">
	<!-- Icon plugin -->
	<link rel="stylesheet" href="/ios/www/css/font-awesome-4.6.1/css/font-awesome.css">
	<!-- Font -->
	<link rel="stylesheet" href="/ios/www/css/google-font.css?n=1">
	<!-- <link href="https://fonts.googleapis.com/css?family=PT Sans" rel="stylesheet"> -->
	<!-- Animation -->
	<link rel="stylesheet" href="/ios/www/css/animate.css?">
	<!-- Core -->
	<!-- <link rel="stylesheet" href="http://gettimi.com/ios/www/css/my-app.css?n=1"> -->
	<link rel="stylesheet" href="/ios/www/css/my-app.css?n=1">
	<!-- <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/emojify.js/1.0.1/emojify.min.css" /> -->
	<!-- jQuery lib -->
	<script type="text/javascript" src="/ios/www/js/jquery.min.js"></script>
	<!-- Slider plugin -->
	<script type="text/javascript" src="/ios/www/js/rangeslider.js"></script>
	<!-- transform2d lib -->
	<script type="text/javascript" src="/ios/www/js/jquery.transform2d.js"></script>
	<!-- jTinder lib -->
	<script type="text/javascript" src="/ios/www/js/jquery.jTinder.js"></script>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAqBHCFbs_2Q3o7ZTAxID8Xnd3dUBUSdw"></script>
	<script>
	   window.onload = function() {
	     var myApp = new Framework7();
	     var mySwiper1 = myApp.swiper('.swiper-food-container', {
	         spaceBetween: 0, 
	         slidesPerView: 1, 
	         speed: 200, 
	         // pagination:'.swiper-pagination',
	     });   
	     $(".swiper-food-container").css("height",$(".swiper-food-container").width() )
	   };
	</script>
	<script type="text/javascript" src="/ios/www/js/facebookConnectPlugin.js"></script>
	<!-- Path to Framework7 Library JS-->
	<script type="text/javascript" src="/ios/www/js/framework7.min.js"></script>
	<!-- Path to your app js-->
	<!-- // <script type="text/javascript" src="js/my-app.js?n=1"></script> -->
	<script type="text/javascript" src="/ios/www/js/localScript.js"></script>
	<style>
		*{ 
		    user-select: auto !important;
		    -moz-user-select: -moz-auto !important;
		    -khtml-user-select: auto !important;
		    -webkit-user-select: auto !important;
		    -webkit-touch-callout: auto !important;
		}
	</style>
	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>

	<?php echo $content; ?>

</body>
</html>
