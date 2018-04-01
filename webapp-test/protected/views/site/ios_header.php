
<div class="navbar-button" style="color: <?= $active == "home" ? '#fff' : '#000'?>;">
  <i class="fa fa-bars" aria-hidden="true"></i>
</div>
<nav class="navbar fixed-top navbar-expand-lg"
  <?php if($active=='home'){
    echo ":style=\"{'background-color' : 'rgba(0, 0, 0, ' + (scrollPosition > 0.75 ? (scrollPosition - 0.75) * 5 : 0) + ')'}\"";
  } else {
    echo "style=\"background-color: rgb(0,0,0);\"";
  } 
  ?>
>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav nav-icon mr-auto">
      <li class="nav-item">
        <img src="/ios_assets/img/logo.svg">
      </li>
    </ul>
    <ul class="navbar-nav nav-menu ml-auto">
      <li class="nav-item<?= $active == 'home' ? ' active' : ''; ?>">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item<?= $active == 'tech' ? ' active' : ''; ?>">
        <a class="nav-link" href="/tech">Technology</a>
      </li>
      <li class="nav-item<?= $active == 'team' ? ' active' : ''; ?>">
        <a class="nav-link" href="/team">Team</a>
      </li>
      <li class="nav-item<?= $active == 'resource' ? ' active' : ''; ?>">
        <a class="nav-link" href="/resource">Resources</a>
      </li>
      <li class="nav-item<?= $active == 'career' ? ' active' : ''; ?>" >
        <a class="nav-link"  href="/career">Career</a>
      </li>                         
      <li class="nav-item<?= $active == 'community' ? ' active' : ''; ?>">
        <a class="nav-link" href="/community">Community</a>
      </li>
      <li class="nav-item<?= $active == 'dev' ? ' active' : ''; ?>">
        <a class="nav-link" target="_blank" href="https://medium.com/@iostoken">Project Progress</a>
      </li>
      <li class="nav-item dropdown hidden">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><?= Yii::app()->lang->t('CURRENT_LANG') ?></a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/<?= $active == 'home' ? '' : $active ?>?lang=en">English</a>
          <a class="dropdown-item" href="/<?= $active == 'home' ? '' : $active ?>?lang=zh">中文</a>
        </div>
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


