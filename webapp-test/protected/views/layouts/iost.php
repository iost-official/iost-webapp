<!DOCTYPE html>
<!--[if IE 9 ]><html class="ie ie9 no-js" lang="en"><![endif]-->
<!--[if gt IE 9 | !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
  <meta charset="utf-8">
  <script src="https://use.fontawesome.com/57368ada62.js"></script>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?= Yii::app()->lang->t('IOS | Decentralized Internet of Services Platform') ?></title>
  <meta name="description" content="The IOS (Internet of Services) provides a next-generation, decentralized ecosystem for service providers and users with fast and safeguarded transactions based on blockchain technology.">

  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

  <link rel="apple-touch-icon" sizes="180x180" href="app/favicons/apple-touch-icon.png">
  <link rel="icon" href="/ios_assets/img/logo.png">
  <link rel="manifest" href="app/favicons/manifest.json">
  <link rel="mask-icon" href="app/favicons/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="theme-color" content="#ffffff">
  <style>
    .linkedin-badge {
      width: 20px !important; 
      height: 20px !important;
      margin-left: 5px;
      border-radius: 0px;
    }
    .linkedin-sign {
      margin-left: 15px !important;
      color: #aaa !important;
    }
    .linkedin-button a:hover {
      border: 2px #FFF solid;
    }
    .email {

    }
    .email:hover, .email:active {
      font-size: 16px;
    }
    .color-lightgray {
    }
  </style>
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

  <!-- Bootstrap CSS -->
  <link type="text/css" rel="stylesheet" href="/ios_assets/bootstrap.min.css"/>
  <link type="text/css" rel="stylesheet" href="/ios_assets/bootstrap-vue.css"/>
  <link type="text/css" rel="stylesheet" href="/ios_assets/css/ionicons.min.css"/>

  <link type="text/css" rel="stylesheet" href="/ios_assets/index.css?v=201802"/>

  <script src="/ios_assets/vue.js"></script>
  <script src="/ios_assets/jquery-3.2.1.min.js"></script>
  <script src="/ios_assets/bootstrap.min.js"></script>
  <script src="/ios_assets/bootstrap-vue.js"></script>
</head>
<body class="is-loaded">

<?php
      $location = Yii::app()->geoip->lookupCountryCode($_SERVER['REMOTE_ADDR']);
      //if ($location && $location == "CN"): 
      if(false):
?>

    <div class="index-app">
      <nav class="navbar fixed-top navbar-expand-lg" :style="{'background-color' : 'rgba(0, 0, 0, ' + (scrollPosition > 0.75 ? (scrollPosition - 0.75) * 5 : 0) + ')'}">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <img src="/ios_assets/img/logo.svg">
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" :class="{'active' : curPage == 0}">
              <a class="nav-link" href="#" @click="toPage(0)">Home</a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="background2">
        <svg>
          <polygon v-for="cell in cells" :points="cell.line"
            :style="'stroke-width: 2px; stroke: rgba(0,0,0,0.01); fill: rgba(0,0,0,' + cell.alpha + ')'"/>
        </svg>
      </div>
      <div class="main-page">
        <svg class="background" ref="background">
          <line v-for="line in backgroundLines" :x1="line.x0" :y1="line.y0" :x2="line.x1" :y2="line.y1" :style="'stroke: rgba(255,255,255,' + line.alpha + '); stroke-width: ' + line.width"/>
          <polygon v-if="backgroundLogo != ''" :points="backgroundLogo"
            :style="'fill: rgba(255,255,255,' + backgroundLines[0].alpha + ')'"/>
        </svg>
        <div class="row">
          <div class="middle-content">
            <div class="content">
              <div class="content-div">
                <img src="/ios_assets/img/logo.svg">
                <h4 style="margin-bottom:50px;">This website is not available in your country/region due to the local laws & regulations.</h4>
                <p></p>
                <p></p>
                <p>©Internet of Services Foundation, Singapore</p>
              </div>
            </div>
            <div class="animation-col">
              <svg ref="window" class="animation">
                <line v-for="edge in edges" :x1="edge.x0" :y1="edge.y0" :x2="edge.x1" :y2="edge.y1" :style="'stroke: rgba(255,255,255,' + edge.alpha + '); stroke-width: 1.6'"/>
                <line v-for="item in computedTrans" :x1="item.x0" :y1="item.y0" :x2="item.x1" :y2="item.y1" :style="'stroke: rgba(255,255,255,' + item.alpha + '); stroke-width: 1.6'"/>
                <template v-for='blockVertices in computedVertices'>
                  <circle v-for="vertex in blockVertices" :cx="vertex.x" :cy="vertex.y" :r="windowWidth <= 640 ? 1.5 : 2.2" :fill="'rgba(255,255,255,' + vertex.alpha + ')'"/>
                </template>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

<?php else: ?>

<?php echo $content; ?>

<?php endif; ?>

    <script src="/ios_assets/index.js?v=201802"></script>
    <script type="text/javascript">
      var navbar_closed = true;
      var btn_color = $(".navbar-button").css("color");
      $(".navbar-button").click(function(){
          $(".navbar").css("animation", null);
          if (navbar_closed) {
            $(".navbar").css("animation", "nav-menu-show .3s ease 0s 1 normal forwards");
            $(".navbar-button").css("color", "#fff");
          } else {
            $(".navbar").css("animation", "nav-menu-hide .3s ease 0s 1 normal none");
            $(".navbar-button").css("color", btn_color);
          }
          navbar_closed = !navbar_closed;
      });
    </script>
</body>
</html>
