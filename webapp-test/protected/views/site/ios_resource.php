<style>
.card-header {
    border-bottom: 1px solid rgba(0,0,0,.125);
    border-top: 1px solid rgba(0,0,0,.125);
  background-color: rgba(0,0,0,0) !important;
}
.qa-page .card {
  border:none;
  border-bottom: 1px solid rgba(0,0,0,.125) !important;
}
/* desktop */
@media screen and (min-width: 991px) {
  .qa-page.content-page{
    margin: 0px 50px 100px !important;
  }
  .head-page.doc-page {
    margin: 0px 50px;
  }
  .head-background {
    background: transparent;
  }
  .doc-prompt{
    /* max-width: 70%;  */
    margin: 50px auto;
    font-size: 1rem !important;
    font-weight: 400 !important;
    line-height: 1.5 !important;
    color: #212529;
    text-align: center;
  }
}
/* mobile */
@media screen and (max-width: 991px) {
  .qa-page.content-page {
    margin: 0px 30px 100px !important;
    background: transparent;
  }
  .qa-page .title {
    font-size: 1.7rem;
  }
  .head-page h2 {
    font-size: 1.7rem; 
  }
  .doc-prompt{
    /*margin-top: 1em !important;*/
    /* max-width: 70%; */
    margin: 1em auto;
  }
}
</style>
<div class="index-app">
  <?php echo $this->renderPartial('ios_header', array('active' => $active), true); ?>
  <div class="content">
    <div class="head-page doc-page head-background">
      <div class="middle-content">
        <div class="content">
          <div class="content-div">
            <!-- <img class="logo" src="/ios_assets/img/logo.svg"> -->
            <h2 class="main-title">Documents & Videos</h2>
              <p class="doc-prompt sub-title">We are constantly updating our content online to accomodate fans' need. To avoid missing out on important announcements please <a href="../community">follow</a> to our social media to get the latest content and interact with us.</p>
            </div>
        </div>
      </div>
      <div class="middle-content mt-5">
        <div class="doc-col">
          <div class="row">
            <div class="col-sm-6">
              <div class="doc-item">
                <a href="https://docsend.com/view/rwgpdxx" target="_blank">
                  <span>Primer (English)</span>
                  <i class="fa fa-angle-right" aria-hidden="true"></i>
                </a>                
              </div>
            </div>
            <div class="col-sm-6">
              <div class="doc-item">
                <a href="https://docsend.com/view/ihwqcdg" target="_blank">
                  <span>Technical White Paper  (English)</span>
                  <i class="fa fa-angle-right" aria-hidden="true"></i>
                </a>                
              </div>
            </div>
                <div class="col-sm-6">
                  <div class="doc-item">
                    <a href="https://www.youtube.com/watch?v=Go7n78MpAE0&t=1s" target="_blank">
                      <span>IOS Techtalk Episode 1 - Consensus</span>
                      <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </a>                
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="doc-item">
                    <a href="https://www.youtube.com/watch?v=ZtLhgkG65u0" target="_blank">
                      <span>IOS Techtalk - Episode 2 - Scalability (Part 1)</span>
                      <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </a>                
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="doc-item">
                    <a href="https://www.youtube.com/watch?v=qGb5CBD-G0I" target="_blank">
                      <span>IOS Techtalk - Episode 2 - Scalability (Part 2)</span>
                      <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </a>                
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="doc-item">
                    <a href="https://www.youtube.com/watch?feature=youtu.be&v=bgx-Of1DPLw&app=desktop" target="_blank">
                      <span>Crypto Beadles: Interview with Jimmy Zhong</span>
                      <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </a>                
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>


    <div class="qa-page content-page" >
      <div class="middle-content">
        <div class="row title-row">
          <div class="col-lg-12">
            <h1 class="title">Frequently Asked Questions</h1>
          </div>
        </div>
        <div class="qa-items" id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link question collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  What is IOS/IOST?
                </button>
              </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                The IOS (Internet of Services) is a next-generation blockchain technology that provides the network infrastructure to support a service-oriented ecosystem. IOS Token is IOST. The IOS platform not only provides its users a completely decentralized way to exchange online services and digital goods, but also enables developers to deploy large scale dApps with the ability to support massive number of users.
                <br><br>
                In short, IOST is a scaling solution we proposed to resolve the scalability issues faced by the greater blockchain community. Our aim is to make decentralized services with large transaction volume possible.
                <br><br>
                For the technical details, please refer to our white paper draft here.
                <br><br>
                For more information about the IOS project, you can visit the following sources:
                <br><br>
                Official Website: https://iost.io<br>
                Twitter: https://twitter.com/IOStoken<br>
                Medium: https://medium.com/@iostoken<br>
                Telegram: https://t.me/officialios<br>
                Reddit: https://www.reddit.com/r/IOStoken/<br>
                Youtube: https://www.youtube.com/channel/UCyyPv5TQ01kRV48drO-ivpQ
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link question collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Who is developing the IOS blockchain?
                </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body">
                The Internet of Service Foundation, a Singapore incorporated non-for-profit organization, is currently developing the IOS blockchain and relevant technologies. The foundation is formed by a group of blockchain experts, distributed system scientists, world-class programmers and tech enthusiasts, aiming to make business-grade decentralized services possible on the blockchain (we only revealed part of our team members due to the respect for their privacy).
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button class="btn btn-link question collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  What’s the project plan & roadmap?
                </button>
              </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
              <div class="card-body">
                We have finished deploying our private test net (v0.1 Apollo) and are currently working on the development of our public test net, which we aim to release toward the end of Q2 2018. We are also aiming to launch the main net no later than Q1 2019(multiple months ahead of our original schedule). We will keep you updated via our official social media accounts.
                <br><br>
                For the roadmap of our project, please refer to our primer <a href="https://docsend.com/view/rwgpdxx">here</a>.
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingFour">
              <h5 class="mb-0">
                <button class="btn btn-link question collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Is IOS an open source project?
                </button>
              </h5>
            </div>
            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
              <div class="card-body">
                Yes, the Internet of Services will be an open source project. As tech enthusiasts ourselves, the IOS team deeply believe in the power of open source software. We know that open source is the key to innovation, therefore we want to invite all of you to join our community and help blockchain technology deliver on its incredible potential.
                <br><br>
                Currently, we are developing the IOS architecture in a private repository. As soon as the early stage architecture development complete, we will release source code of the IOS blockchain under open source licenses.
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingFive">
              <h5 class="mb-0">
                <button class="btn btn-link question collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  I really think IOST is a promising project. How can I get involved?
                </button>
              </h5>
            </div>
            <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
              <div class="card-body">
                The easiest way to support us is by following our social media accounts (posted above).
                <br><br>
                If you are you a programmer, crypto-expert or in a relevant field, we are always looking for more talent. If interested, please contact <a href="mailto:team@iost.io">team@iost.io</a> with all relevant information.
                <br><br>
                if you are interested in helping us grow our community, please send an email to <a href="mailto:team@iost.io">team@iost.io.</a>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingSix">
              <h5 class="mb-0">
                <button class="btn btn-link question collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                  How can I meet with IOST team members?
                </button>
              </h5>
            </div>
            <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
              <div class="card-body">
                The IOS team will soon host a series of offline meetups/information sessions for our community members and supporters to participate. Details of those events will be released soon. Stay tuned for updates.

                Additionally, we are currently setting up a main operation office in the greater Bay area. Before our Silicon Valley/SF office is setup properly, our team members will work remotely from New York, Boston, Beijing and San Francisco. If you are interested in meeting with our team members in person, please send an email to us via team@iost.io.
              </div>
            </div>
          </div>                            
        </div>
      </div>
    </div>

    <?php echo $this->renderPartial('ios_footer', array(), true); ?>
  </div>
</div>