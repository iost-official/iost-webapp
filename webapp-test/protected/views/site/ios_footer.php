
<div class="subscribe-page">
      <div class="content">

        <h3>Join our Mailing List</h3>

        <?php if(Yii::app()->user->hasFlash('subscribe')):?>

          <script>
            $(function(){
              $('html, body').scrollTop( $(document).height());
            });
          </script>

          <div class="alert alert-info offset-lg-4 col-lg-4" style="margin-top:20px;">
            <?php echo Yii::app()->user->getFlash('subscribe'); ?>
          </div>

        <?php endif; ?>

          <div class="subscribe">
            <form action="/" method="post" id="subscription_form">
              <input type="email" name="email" class="form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              <div>
                <a class="btn btn-lg btn-outline-light" onclick="$('#subscription_form').submit(); return false;">Subscribe</a>
              </div>
            <!-- </form> -->
        </div>
      

        <div class="community" style="margin-top:40px;">
          <a href="https://twitter.com/iostoken" target="_blank"><img class="icon" src="/ios_assets/img/twitter.svg"></a>
          <a href="https://t.me/officialios" target="_blank"><img class="icon"  src="/ios_assets/img/telegram.svg"></a>
          <a href="https://www.reddit.com/r/IOStoken" target="_blank"><img class="icon" src="/ios_assets/img/reddit.svg"></a>
          <a href="https://medium.com/@iostoken" target="_blank"><img class="icon" src="/ios_assets/img/medium.svg"></a>
          <a href="https://bitcointalk.org/index.php?topic=2789376.0" target="_blank"><img class="icon" src="/ios_assets/img/bitcoin.svg"></a>
          <a href="https://www.youtube.com/channel/UCyyPv5TQ01kRV48drO-ivpQ" target="_blank"><img class="icon" src="/ios_assets/img/youtube.svg"></a>
<!--           <a href="https://github.com/" target="_blank"><img class="icon" src="/ios_assets/img/github.svg"></a> -->
<!-- will guradually go open source starting April -->
        </div>
                <a href="mailto:team@iost.io" style="color:#FFF;">Contact us</a>
                <br>
                <p>Want to write about IOST? <a href="mailto:ray@iost.io" style="color:#FFF">Press inquiries</a></p>
                 <br>
                <p>© Internet of Services Foundations Ltd, 2018</p>
      </div>
    </div>
