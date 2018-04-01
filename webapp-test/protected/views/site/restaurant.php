<script>
// hobject = restaurantObject.hour_json
      $(function(){
         var result = hoursFormatter('<?php echo $event->hours_json; ?>');
         $('#restaurant-hours').html(result);
         var sgeolocation = "<?php echo $event->location; ?>".split(",");
         var myLatLng = new google.maps.LatLng(parseFloat(sgeolocation[0]), parseFloat(sgeolocation[1]));
         
         var map = new google.maps.Map(document.getElementById('restaurant-map'), {
              center: myLatLng,
              scrollwheel: false,
              zoom: 12, 
              draggable: false, 
              zoomControl: false, 
              scrollwheel: false, 
              disableDoubleClickZoom: true
          });          
          var rMarker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png" 
         });  
      })
      function hoursFormatter (hobject) {
          var hhArray = $.map(JSON.parse(hobject), function(value, index) {
              return {index, value};
          });
          return printHours(hhArray)
      }
      function printHours(harray) {
          var arr = []
          var obj = new Object(); 
          console.log(harray)
          harray = harray.map(function (unit) {
              if (unit.value == null || unit.value == "") {
                  unit.value = []
              }
              if (unit.value.length % 2 != 0) {
                  unit.value.splice(unit.value.length-1,1)
              }
              return unit
          })
          harray.map(function (unit) {
              if (arr.length == 0) {            
                  obj.startDate = unit.index;
                  obj.endDate = unit.index;
                  obj.openHours = unit.value;
                  arr.push(obj)
              } else {
                  if (arr[arr.length-1].openHours.toString() == unit.value.toString()) {
                      arr[arr.length-1].endDate = unit.index;
                  } else {
                      obj = new Object();
                      obj.startDate = unit.index; 
                      obj.endDate = unit.index;
                      obj.openHours = unit.value;
                      arr.push(obj)
                  }
              }
          })
          var htmlString = "<div class='restaurant-hour-box'><div class='restaurant-hour-text'>"
          htmlString += arr.map(function (unit) {
              var dayString = "", 
                  hourString = ""; 
              if (unit.startDate == unit.endDate) {
                  dayString = unit.startDate.toUpperCase()
              } else {
                  dayString = unit.startDate.toUpperCase() + " - " + unit.endDate.toUpperCase()
              }
              if (unit.openHours.length == 0){
                  hourString = "Closed"
              }
              for (var i = 0; i < unit.openHours.length; i += 2) {
                  hourString += ((i >= 2) ? " / " :"" ) +  unit.openHours[i] + " - " + unit.openHours[i+1]
              }
              return dayString + " : " + hourString
          }).join("</div><div class='restaurant-hour-text'>")
          console.log(htmlString)
          return htmlString + "</div></div>"
      }

</script>

<div class="view view-main" data-page="restaurant-page">
   <div class="navbar" id="navbar-container" style="visibility: visible;">
      <div data-page="restaurant-page" style="text-align:center; line-height:44px;">
         <div id="restaurant-name-navbar"><?php echo $event->name; ?></div>
      </div>
   </div>
   <span class="progressbar-infinite" id="progressbar"></span>         
   <div class="pages navbar-through">
      <div class="page page-on-center" data-page="restaurant-page">
         <div class="page-content contacts-content restaurant-page-content">
            <div class="list-block contacts-block">
               <div class="list-group">
                  <ul>
                     <div id="restaurant-picture-list">
                        <div class="swiper-container swiper-food-container swiper-container-horizontal">
                           <div class="swiper-wrapper">
                              <?php foreach($pictures as $picture): ?>
                                 <div class="swiper-slide swiper-slide-active" style="width:414px;">
                                    <div class="image-class" style="background: url('<?php echo $picture->path; ?>') 100% 50% / cover no-repeat; height:414px;"></div>
                                 </div>
                              <?php endforeach; ?>
                           </div>
                           <div class="swiper-pagination"></div>
                           <div id="photo-number"><?php echo count($pictures); ?> PHOTOS</div>
                        </div>
                     </div>
<!--                      <div id="action-bar">
                        <div id="like-restaurant-button" style="color: rgb(222, 99, 99);"><i class="fa fa-bookmark"></i></div>
                     </div> -->
                     <div class="restaurant-info-group" style="border-bottom: 1px solid #e6e7e8;">
                        <div class="row restaurant-info-bar">
                           <div class="col-50 ">
                              <div class="col-title" id="restaurant-page-dollar"><?php echo $event->price; ?></div>
                              <div class="col-subtitle">price</div>
                           </div>
                           <div class="col-50 ">
                              <div class="col-title" id="restaurant-page-star"><?php echo $event->rating; ?><span class="col-subtitle"> / 5</span></div>
                              <div class="col-subtitle">rating</div>
                           </div>
                        </div>
                     </div>
                     <div id="restaurant-info-group" class="list-block restaurant-info-text-block can-copy">
                        <ul>
                           <li class="item-content" id="restaurant-page-address-li" style="display: flex;">
                              <div class="item-media"><i style="background:rgb(99,154,222);" class="fa icon-background-badge fa-map"></i></div>
                              <div class="item-inner">
                                 <div class="item-after restaurant-info-text" id="restaurant-page-address"><?php echo $event->address; ?></div>
                              </div>
                           </li>
                           <li class="item-content" id="restaurant-page-phone-li">
                              <div class="item-media"><i style="background:rgb(99,222,154);" class="fa icon-background-badge fa-phone"></i></div>
                              <div class="item-inner">
                                 <div class="item-after restaurant-info-text" id="restaurant-page-phone"><a href="#" onclick="window.open('tel://+12126410987'); return false;"><?php echo $event->phone; ?></a></div>
                              </div>
                           </li>
                           <li class="item-content" id="restaurant-page-website-li">
                              <div class="item-media"><i style="background:#464748;" class="fa icon-background-badge fa-at"></i></div>
                              <div class="item-inner">
                                 <div class="item-after restaurant-info-text" id="restaurant-page-website">
                                    <a href="#" onclick="window.open('<?php echo $event->website; ?>'); return false;" target="_blank">
                                       <?php echo $event->website; ?>
                                    </a>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div id="restaurant-map" style="position: relative;">
                     </div>
                     <div id="restaurant-description">
                        <div class="restaurant-page-title">Description</div>
                           <div id="restaurant-hours"></div>
                           <?php echo $event->description; ?>
                        </div>
                     <div id="restaurant-hours"></div>
                     <div id="restaurant-recommend-menu">
                        <?php echo $event->recommend_menu; ?>
                     </div>
                     <div id="restaurant-gallery-title">
                        <div class="restaurant-page-title">Gallery</div>
                     </div>
                     <div id="restaurant-gallery">
                        <?php foreach($pictures as $picture): ?>
                           <li class="image-class-half">
                              <a class="image-holder  lazy lazy-fadein " style="background: url('<?php echo $picture->path; ?>') 100% 50% / cover no-repeat; height: 189px;"></a>
                              <div class="image-background" style="height: 189px;"></div>
                              <div id="image-avatar-<?php echo $picture->id; ?>"></div>
                           </li>
                        <?php endforeach; ?>
                     </div>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>