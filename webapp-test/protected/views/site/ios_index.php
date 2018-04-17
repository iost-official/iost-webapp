
<div class="index-app">
  <?php echo $this->renderPartial('ios_header', array('active' => $active), true); ?>
  <div class="content">
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
              <h2>
                A Secure & Scalable <br>
                Blockchain for Smart Services</h2>
              <p>The Internet of Services  (<i>IOS</i>) offers a  secure & scalable infrastructure for online service providers. Its high TPS, scalable and secure blockchain, and privacy protection provide infinite possibilities for online service providers to serve their customer base.</p>
              <div class="buttons" style="margin-top:-10px;">
                <button type="button" style="margin-left:0px;margin-top:10px;" class="btn btn-lg btn-outline-light" onclick="window.open('https://docsend.com/view/rwgpdxx','_blank')">Primer </button>
                <button type="button" class="btn btn-lg btn-outline-light" style="margin-top:10px;margin-left:0px;" onclick="window.open('https://docsend.com/view/ihwqcdg','_blank')">Technical White Paper </button>
                <button type="button" class="btn btn-lg btn-outline-light" style="margin-top:10px;margin-left:0px;" onclick="window.open('https://mailchi.mp/8edc65384286/sign-up-iostoken-mailing-list','_blank')">Subscribe</button>
              </div>
              <p style="margin-top:20px;margin-bottom: 20px;">
                <a class="comm-twitter comm-icon-g" href="https://twitter.com/iostoken" target="_blank"></a>
                <a class="comm-telegram comm-icon-g" href="https://t.me/officialios" target="_blank"></a>
                <a class="comm-reddit comm-icon-g" href="https://www.reddit.com/r/IOStoken" target="_blank"></a>
                <a class="comm-medium comm-icon-g" href="https://medium.com/@iostoken" target="_blank"></a>
                <!-- <a class="comm-subscribe" href="https://mailchi.mp/8edc65384286/sign-up-iostoken-mailing-list" target="_blank">Subscribe</a> -->
              </p>
<!--               <p style="margin-top:0px;">
                <a style='color:#fff;' href="https://t.me/officialios" target="_blank">Join us on Telegram for updates!</a>
                <b>Note: Our institution-only private token sale has been completed. No public sale will be held. Investors in China, USA and Korea were NOT allowed. Check out our <a href="https://docsend.com/view/7m7bv7q" target="_blank" style="color:#fff"><u>Legal Disclaimer</u></a> for more details.</b>
              </p> -->
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
      <a class="scroll-icon"><span></span></a>
    </div>
    
    <div class="intro-page page">
      <div class="content">
        <h2 class="title">The New Pinnacle of Throughput</h2>
        <p class="desp">Our innovative Efficient Distributed Sharding (EDS) technology vastly improves scalability by dynamically partitioning the IOS network into subspaces via a secured, bias-free stochastic process.</p>
        <img src="/ios_assets/img/intro-img.png">
        <div class="row">
          <div class="item col-lg-4">
            <div>
              <img src="/ios_assets/img/intro-logo-1.png">
              <h5>Scaleout</h5>
            </div>
            <p>Perfect partitioning state for multiple groups handled in parallel</p>
          </div>
          <div class="item col-lg-4">
            <div>
              <img src="/ios_assets/img/intro-logo-2.png">
              <h5>Atomix</h5>
            </div>
            <p>Fast grade commit protocol to enforce consistency among cross-shard transactions</p>
          </div>
          <div class="item col-lg-4">
            <div>
              <img src="/ios_assets/img/intro-logo-3.png">
              <h5>BRDR</h5>
            </div>
            <p>Bias Resistant Distributed Randomness<br>An innovative, effective and secure way to introduce unbiased randomness into the IOS network</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="con-page page">
      <div class="content">
        <div class="img-content">
          <img src="/ios_assets/img/con-img.svg">
        </div>
        <div class="text-content">
          <div class="middle-content">
            <h2 class="title">A Ground-breaking<br>Consensus Mechanism</h2>
            <p class="desp">We designed the Proof-of-Believability mechanism to eliminate the need for an energy-hungry proof-of-work protocol, which stands as a barrier to blockchain scaling up for widespread adoption. Believability of a node is calculated based on contribution and behaviors; Meanwhile fairness is ensured with algorithmic randomness.
            <div class="row">
              <div class="item col-lg-3 col-3">
                <img src="/ios_assets/img/con-logo-1.svg">
                <p>Contribution</p>
              </div>
              <div class="item col-lg-3 col-3">
                <img src="/ios_assets/img/con-logo-2.svg">
                <p>Stake</p>
              </div>
              <div class="item col-lg-3 col-3">
                <img src="/ios_assets/img/con-logo-3.svg">
                <p>Review</p>
              </div>
              <div class="item col-lg-3 col-3">
                <img src="/ios_assets/img/con-logo-4.svg">
                <p>Behavior</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="eco-page page">
      <div class="content">
        <h2 class="title">IOS is a User-friendly Ecosystem For Your Next Big Idea</h2>
        <img class="text-img" src="/ios_assets/img/eco-text.svg">
        <p class="desp">We believe the IOS blockchain is a comprehensive ecosystem for businesses to incubate their big ideas.  We have created a handful of tools to help them realize their dreams:</p>
        <div class="items">
          <div class="item item-1">
            <h5>HUDS</h5>
            <p>Data storage services are the backbone of any ecosystem. With HUDS, the IOS ecosystem provides a decentralized secured, searchable, efficient and economical way to store information</p>
          </div>
          <img src="/ios_assets/img/layer1.png">
          <div class="item item-2">
            <h5>dApps and Smart Contracts</h5>
            <p>dApps and smart contracts are the centerpieces of the IOS ecosystem. In the IOS blockchain, developers can not only enjoy the stability and high concurrency brought by the IOS virtual machine, but also the ability to develop in several major programming languages</p>
          </div>
          <div class="item item-3">
            <h5>Fair and Transparent Feedback System</h5>
            <p>Users will have opportunities to provide feedback upon completion of the service. FTFS is designed to ensure all feedback is trustworthy.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="partner-page page">
      <div class="content">
        <h2 class="title">Investors & Partners</h2>
        <div class="row">
        <!-- <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/pantera.png">
          </div> paul from invested but we did not have enough quota for their fund-->
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p3.png">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p2.png">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p4.png">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/pp8.png">
          </div>
          <div class="logo col-lg-3 col-6" style="margin-top:10px;">
            <img src="/ios_assets/huobi02.png" style="width:130px;">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p6.png">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/pp9.png" style="width:130px;">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p111.png" style="width:110px; margin-top:5px;">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p16.png">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p10.png">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p12.png">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p14.png">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/funcity.jpg" style='width:120px;margin-top:10px;'>
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p7.png">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/p115.png" style="margin-top:15px;">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/alphacoin.jpeg">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/chain.jpg" style="width:110px; margin-top:-10px;">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/brink.png"  style="margin-top:10px;">
          </div>
          <div class="logo col-lg-3 col-6">
            <img src="/ios_assets/img/logo_bixin.png" style="margin-top:10px; width:130px;">
          </div>
          <div class="logo col-lg-3 col-6">
           <img src="/ios_assets/img/consensus.jpeg" style="margin-top:5px;">
          </div>
        </div>
      </div>
    </div>

    <div class="partner-page page">
      <div class="content">
        <h2 class="title">Exchanges</h2>
        <div class="row">
          <div class="logo col-lg-3 col-6">
            <a href="https://www.binance.com/" target="_blank">
              <img src="/ios_assets/img/binance.png" style="margin-top:2px;"></a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://www.huobi.pro/" target="_blank">
              <img src="/ios_assets/huobi02.png" style="width:120px;"></a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://www.bitfinex.com/" target="_blank">
              <img src="/ios_assets/img/bitfinex.png" style="margin-top: 8px; transform: scale(1.1);"></a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://www.okex.com/" target="_blank">
              <img src="/ios_assets/img/ok.png" style="margin-top:-5px; width:130px;"></a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://cex.com/" target="_blank">
              <img src="/ios_assets/img/cex.png" style="margin-top:1px; width:130px;"></a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://big.one/" target="_blank">
              <img src="/ios_assets/img/bigone1.png"></a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://cobinhood.com/" target="_blank">
              <img src="/ios_assets/img/cobinhood.png" style="margin-top:-5px;">
            </a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://www.kucoin.com/" target="_blank">
              <img src="/ios_assets/img/kucoin.png">
            </a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://otcbtc.com/" target="_blank">
              <img src="/ios_assets/img/otcbtc1.png" style="margin-top:5px;">
            </a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://ddex.io/" target="_blank">
              <img src="/ios_assets/img/ddex1.png">
            </a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://www.lykke.com/" target="_blank">
              <img src="/ios_assets/img/lykke.png" style="margin-top: -5px; width: 130px;">
            </a>
          </div>
          <div class="logo col-lg-3 col-6">
            <a href="https://www.lesfex.com/" target="_blank">
              <img src="/ios_assets/img/lesfex.png" >
            </a>
          </div>
          <p style="width: 75%;margin: 30px auto; ">More exchanges are coming... to be updated...
          </p>
        </div>
      </div>
    </div>

    <?php echo $this->renderPartial('ios_footer', array(), true); ?>
  </div>
</div>
