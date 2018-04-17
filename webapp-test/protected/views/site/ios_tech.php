

<div class="index-app">
  <?php echo $this->renderPartial('ios_header', array('active' => $active), true); ?>
  <div class="content  tech-page">

  <div class="head-page head-background">
      <h2 class="title main-title">
        <?= Yii::app()->lang->t('Technology Mission Statement') ?>
      </h2>
      <p class="sub-title">
        <?= Yii::app()->lang->t('The Internet of Services scales social and economic cooperation to a new level. We aim to gain universal acceptance and utilize decentralization and the power of blockchain technology to cut out middlemen and maximize network value for all parties.') ?>  
        <br><br>
      </p>  
      <div class="middle-content">
        <div class="content">
          <div class="row title-row">
            <div class="col-lg-8">

                <li class="text-blue"><?= Yii::app()->lang->t('Neutral') ?></li>
                  <?= Yii::app()->lang->t('Anyone participating in blockchain-enabled cooperation does so on an equal footing with all other participants. The Internet of Services aims to fundamentally disrupt previous methods of business by gaining widespread acceptance, creating a network run with trustless trust, and maximizing network value for everyone. We are a direct challenge to the systems that came before us which have been so heavily skewed to favor the few at the expense of the many.') ?>
                <li class="text-blue"><?= Yii::app()->lang->t('Open') ?></li>
                  <?= Yii::app()->lang->t('Anyone is able to participate in any layer of the system. No registration, identification or other preconditions should or will limit participation.') ?>
                <li class="text-blue"><?= Yii::app()->lang->t('Immutable') ?></li>
                  <?= Yii::app()->lang->t('The Internet of Services is committed to keeping blockchains open, neutral and immutable. This informs our actions and positions towards any and all developments in the crypto world and beyond. We are a truth machine preserving one universally accepted version of history. It’s not possible to change history, and no resources will be wasted on that effort.') ?>
            </div>
            <div class="col-lg-3">
              <img src="/ios_assets/img/layer1.png">
            </div>
          </div>

        </div>
 
      </div>
    </div>  

    <div class="content-page tech-items intelligent">
      <div class="middle-content">
        <div class="row title-row">
          <div class="col-lg-12">
            <h1 class="title">
               <?= Yii::app()->lang->t('Intelligent Service System') ?>
            </h1>
          </div>
        </div>
                          <p>
                            <?= Yii::app()->lang->t('The IOS blockchain mitigates the tendency towards centralization by introducing Servi as both a measurement of individual users’ contribution to the community, and as a way to encourage members to contribute to the continued development of the IOS blockchain.') ?>
                            
        <div class="list-group list-group-flush">

                  <li class="text-blue"><?= Yii::app()->lang->t('Non-tradable') ?> </li>
                    <?= Yii::app()->lang->t('Since Servi are not designed as a medium of exchange, Servi can not be traded or exchanged in any way.') ?>
                  <li class="text-blue"><?= Yii::app()->lang->t('Self-terminating') ?></li>
                    <?= Yii::app()->lang->t('After validating a block, the system will automatically clear the Servi balance owned by the validator. In this way, nodes with high believability scores can take turns in validating blocks, to ensure a fair block generation process.') ?>
                  <li class="text-blue"><?= Yii::app()->lang->t('Automated Issuance') ?></li>
                    <?= Yii::app()->lang->t('Servi will be generated and deposited to user accounts automatically after making contributions such as: providing community services, evaluating services provided by other entities, and/or making other special contributions.') ?>
                  
              </p>                     
        </div>
      </div>
    </div>


    <div class="content-page tech-items tech-background">
      <div class="middle-content">
        <div class="row title-row">
          <div class="col-lg-12">
            <h1 class="title">
              <?= Yii::app()->lang->t('Decentralized Governance') ?>
            </h1>
          </div>
        </div>
        <div class="list-group list-group-flush">
          <div class="list-group-item">
            <div class="item row">
              <div class="item-content col-lg-6">
                <h2 class="title"><?= Yii::app()->lang->t('Efficient and Resilient Consensus') ?> </h2>
                <h4 class="text-blue"><?= Yii::app()->lang->t('Benefiting the entire network') ?></h4>
                <p class="desp"><?= Yii::app()->lang->t('IOST is using a powerful consensus engine named Proof-of-Believability. Believability factors include IOS token balance, Servi balance, contributions, user behaviors and, it has a definitive range. We use a faster graded Byzantine Fault Tolerance mechanism, that allows for a set of nodes to decide on the next block. A key aspect of Proof-of-Believability is that these nodes are selected fairly by using algorithmic randomness based on input from previously generated blocks. By design, accounts with more contribution to the network are more likely to be selected as the next validators and beneficiaries of the newly generated blocks. Unlike Proof-of-Stake, validators are selected using a certain algorithm, not just by chance and their number of tokens. Proof-of-Believability guarantees that nodes have negligible probability to misbehave, while significantly increasing the transaction throughput.') ?>
</p>
              </div>
              <div class="item-img col-lg-6">
                <img src="/ios_assets/img/tech1.svg">
              </div>
            </div>
          </div>
          <div class="list-group-item">
            <div class="item row">
              <div class="item-content col-lg-6">
                <h2 class="title"><?= Yii::app()->lang->t('The Key to Blockchain Scalability') ?></h2>
                <h4 class="text-blue"><?= Yii::app()->lang->t('Available. Scalable. Safe') ?></h4>
                <p class="desp">
                <?= Yii::app()->lang->t('IOST uses a robust and dynamic sharding protocol. We call it “Efficient Distributed Sharding” (EDS). It benefits the underlying blockchain networks by reducing the transaction processing workload on each validator and increasing the total processing capacity linearly with the increase of new network participants. EDS uses a novel scheme to form subsets of validators to record and process state transactions that are both sufficiently large and strongly bias-resistant.') ?>
                  
                </p>
              </div>
              <div class="item-img col-lg-6">
                <img src="/ios_assets/img/tech2.svg">
              </div>
            </div>
          </div>
          <div class="list-group-item">
            <div class="item row">
              <div class="item-content col-lg-6">
                <h2 class="title"><?= Yii::app()->lang->t('Seamless Operability') ?></h2>
                <h4 class="text-blue"><?= Yii::app()->lang->t('Designed for security and reliability') ?></h4>
                <p class="desp">
                <?= Yii::app()->lang->t('The IOS Blockchain uses an Atomic Commit protocol to commit transactions instantaneously across shards. The atomic commit protocol ensures that all transactions either commit or abort atomically even when they affect IOS blockchain states distributed across multiple shards. Additionally, application of a two-tier verification processing will minimize the latency of micro-transactions, thus ensuring that IOS transactions are safeguarded and fast.') ?>
                
                </p>
              </div>
              <div class="item-img col-lg-6">
                <img src="/ios_assets/img/tech3.svg">
              </div>
            </div>
          </div>
          <div class="list-group-item">
            <div class="item row">
              <div class="item-content col-lg-6">
                <h2 class="title"><?= Yii::app()->lang->t('Space Saving') ?></h2>
                <h4 class="text-blue"><?= Yii::app()->lang->t('Performance improvements') ?></h4>
                <p class="desp">
                <?= Yii::app()->lang->t('The IOS blockchain uses classic distributed checkpointing principles to produce consistent, collectively-signed state blocks periodically. Our micro state blocks minimize storage and update overhead, which helps new or crashed validators quickly catch up to the current blockchain state without downloading the entire blockchain since the first block. The micro state blocks summarize the shards’ states and enable blockchain pruning to reduce storage and configuration costs for validators.') ?>
                
                </p>
              </div>
              <div class="item-img col-lg-6">
                <img src="/ios_assets/img/tech4.svg">
              </div>
            </div>
          </div>                    
        </div>
      </div>
    </div>
    <?php echo $this->renderPartial('ios_footer', array(), true); ?>
  </div>
</div>


