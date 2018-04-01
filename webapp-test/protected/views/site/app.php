<!DOCTYPE html>
<!--[if IE 9 ]><html class="ie ie9 no-js" lang="en"><![endif]-->
<!--[if gt IE 9 | !IE]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Timi - Explore fancy places with friends</title>
  <meta name="description" content="Timi - Discover fancy places and hang out with friends">
  <meta name="keywords" content="timi">
  <meta name="apple-itunes-app" content="app-id=1111783063">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link rel="apple-touch-icon" href="/app/assets/img/apple-touch-icon.png">
  <link rel="icon" href="/app/favicon.ico">
  <link rel='stylesheet' href='/app/assets/css/bootstrap.min.css'>
  <link rel='stylesheet' href='/app/assets/css/vendor.css'>
  <link rel='stylesheet' href='/app/assets/css/style.css'>
  <link rel='stylesheet' href='/app/assets/css/custom.css'>
  <!--[if lte IE 9]><!-->
  <script src='/app/assets/js/vendor/html5shiv.min.js'></script>
  <!--<![endif]-->
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" />
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic" />
</head>
<body class="is-loaded">

  <!--for wechat share-->
  <div id='wx_logo' style='margin:0 auto; position: absolute;opacity: 0;filter: alpha(opacity=0); '>
    <img src="/images/timmi300.png" />
  </div>

  <div class="site">
    <!--
      <div class="site-loader" style="display:none;">
        <div class="site-loader-spinner"></div>
      </div>
    -->

    <div class="site-canvas">
      <main class="site-main" style="display:block;">
        <div id="home" class="section block-pink position-r align-c-xs-max">
          <!--
              <ul style="color:#fff; font-size:30px; position:absolute; right:40px; top:40px;">
                <li class="audio-toggle" style="list-style-type: none;"><a href="#"><i class="fa fa-volume-up"></i></a></li>
              </ul>
          -->
          
          <div id="particles-js" class="site-bg">
            <div class="site-bg-img"></div>
            <div class="site-bg-video"></div>
            <div class="site-bg-overlay"></div>
            <div class="site-bg-effect layer" data-depth=".30"></div>
            <canvas class="site-bg-canvas layer" data-depth=".30"></canvas>
          </div>
        

          <div class="container">
            <div class="row row-table">
              <div class="col-sm-6">
                <div class="col-inner" data-sr="left">
                  <div class="section-heading">
                    <h1 style="font-size:70px; font-weight:normal;">
                      Timi
                      <img src="/images/timi.png" style="width:80px; margin-bottom:0px; margin-top:-9px;">
                    </h1>
                    <?php if(isset($_GET['qixi'])): ?>
                      <p style="font-size:18px;">生死之交遍布天南海北，同城找不到人约饭吗？</p>
                      <p style="font-size:18px; font-weight:bold;">#Timi #约饭神器</p>
                    <?php else: ?>
                      <p style="font-size:18px;">Explore fancy places with friends</p> 
                    <?php endif; ?>
                  </div> <!-- .section-heading -->
                  <div class="section-content">
                    <a class="btn btn-invert m-y-5" href="/site/downloadios">&nbsp;&nbsp;&nbsp;<i class="fa fa-apple"></i>App Store&nbsp;&nbsp;&nbsp;</a>
                    <a class="btn btn-warning m-y-5" href="/site/downloadAndroid"><i class="fa fa-android"></i>Google Play</a>
                  </div> <!-- .section-content -->
                </div>
              </div>
              <div class="col-sm-6 col-md-p-l-1 m-t-60-xs-max">
                <div class="col-inner clearfix">
                  <img class="img-responsive float-r-sm-min m-x-auto-xs-max" src="/app/assets/img/item/phone.png" alt="" data-sr="right">
                </div>
              </div>
            </div>
          </div>
        </div> <!-- #home -->


      </main> <!-- .site-main -->
      <footer class="site-footer block-invert" style="padding:50px;">
        <div class="container">
          <img class="site-footer-logo img-responsive" src="/images/timi.png" style="width:80px; margin-bottom:0px;" data-sr="bottom">
        <!--
          <ul class="site-footer-social-list">
            <li><a href="https://www.facebook.com/" target="_blank">Facebook</a></li>
            <li><a href="https://twitter.com/" target="_blank">Twitter</a></li>
            <li><a href="https://instagram.com/" target="_blank">Instagram</a></li>
            <li><a href="https://www.linkedin.com/" target="_blank">LinkedIn</a></li>
            <li><a href="https://www.pinterest.com/" target="_blank">Pinterest</a></li>
          </ul>
        -->
          <p class="site-footer-copyright">Made in NYC © 2016 Timi</p>
        </div>
      </footer> <!-- .site-footer -->
    </div>
  </div>

  <script src="/app/assets/js/vendor/jquery-1.11.3.min.js"></script>
  <script src='/app/assets/js/vendor/bootstrap.min.js'></script>
  <script src='/app/assets/js/vendor/plugin.js'></script>
  <script src='/app/assets/js/variable.js'></script>
  <script src='/app/assets/js/main.js'></script>



</body>
</html>