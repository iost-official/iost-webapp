<div class="index-app">
  <?php echo $this->renderPartial('ios_header', array('active' => $active), true); ?>
  <div class="content">
    <div class="head-page head-background">
      <div class="middle-content">
        <div class="content">
          <div class="content-div">
            <img class="logo" src="/ios_assets/img/logo.svg">
            <h2>Some Technology Title Here</h2>
              <p>Lorem ipsum dolor sit amet, ligula suspendisse nulla pretium, rhoncus tempor placerat fermentum, enim integer ad vestibulum volutpat. Nisl rhoncus turpis est, vel elit, congue wisi enim nunc ultricies sit, magna tincidunt. Maecenas aliquam maecenas ligula nostra, accumsan taciti. Sociis mauris in integer, a dolor netus non dui aliquet, sagittis felis sodales, dolor sociis mauris, vel eu libero cras. Interdum at. Eget habitasse elementum est, ipsum purus pede porttitor class, ut adipiscing, aliquet sed auctor, imperdiet arcu per diam dapibus libero duis. Enim eros in vel, volutpat nec pellentesque leo, temporibus scelerisque nec.</p>
          </div>
        </div>
        <div class="pic-col">
          <img src="/ios_assets/img/intro-img.png">
        </div>
      </div>
    </div>
    <?php echo var_export($publications); ?>
    <?php echo $this->renderPartial('ios_footer', array(), true); ?>
  </div>
</div>