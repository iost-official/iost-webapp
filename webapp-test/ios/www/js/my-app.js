var $$ = Dom7;
var a,b;
var updateCalTimeout;
var avail = []; 
var cardHeight; 
var userList =[];
var invitedList = [];
var contactedLoaded = false; 
var contactsList = [];
myPhotoBrowserStandalone = new Array();
var popupQueue = []; 
var chatlist;
var nearbyList = [];
var shortedList = [];
var nearbyIndex = -1;
var timeFrame = 0; 
var myAvail = [1,1,1,1]; 
var badgeSpot = [0,0,0,0]
var xhr; 
var loadingInfinite = false;
var pictureIndex = 20;
var pictureEachLoad = 20; 
var isCordova = false;
var device_token = "";
var loadingCard; 
var phoneNumber;
var emojify;
var isProcessing = false;
var myMessages; 
var mapSwiper;
var devicePlatform;
var firstloading = true;





(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
mixpanel.init("1f6f2f18699f99df680311236eb838d3");

function incrementSwipe () {
    if (localStorage.swipeNum == null) {
        localStorage.swipeNum = 1
    } else if (localStorage.swipeNum >= 0) {
        localStorage.swipeNum = parseInt(localStorage.swipeNum) + 1
        if (localStorage.swipeNum > 3) {
            promptFillInfo()            
        }
    } 
}

function getRecsList () {
    if (personalData.geolocation == undefined) {
        return []; 
    }
    for (var i in geolocationSet) {
        var point1 = geolocationSet[i].location.split(",");
        var point2 = personalData.geolocation.split(",");
        var distance = getDistanceFromLatLonInKm(point1[0], point1[1], point2[0], point2[1]);
        console.log(distance);
        if (distance < 50) {
            if ( geolocationSet[i].name == "New York" ) {

            }
            return geolocationSet[i]
        }
    }
}

function popOver(selector, text, title) {
    var clickedLink = $(selector); 
    var popoverHTML = '<div class="popover">'+
                      '<div class="popover-inner">'+
                        '<div class="content-block">'+
                          '<p class="popover-title">' + title + '</p>'+                        
                          '<p class="popover-text">' + text + '</p>'+

                        '</div>'+
                      '</div>'+
                    '</div>'
    myApp.popover(popoverHTML, clickedLink, function() {
        console.log("haha")
    });  
}
var tutorialIndex = 0;
var tutorialList = []

function promptFillInfo () {
    if ( localStorage.hasChangedPref == null || localStorage.hasChangedPref == "null" || localStorage.hasChangedPref == 0) {
        if (personalData.current != "") return; 
        myApp.alert("Fill in your info to help Timi find you the best match? ", function () {
            myApp.prompt("What's your occupation? ", function (occ) {
                myApp.prompt("Where do you go to school? ", function (sch) {
                    myApp.alert("Choose 3 (or more) favorite activites and you are good to go! ", function () {
                        setTimeout(function () {
                            mainView.router.loadPage({"pageName": "personal-setting-page"}); 
                            document.getElementById("current").value = occ + " | " + sch;                                 
                        }, 100)                                
                    })
                })
                $(".modal-button").css("display", "none"); 
                $(".modal-button-bold").css("display", "block"); 
                $(".modal-text-input").focus()

            })
            $(".modal-button").css("display", "none"); 
            $(".modal-button-bold").css("display", "block");   
            $(".modal-text-input").focus()                         
        });                 
    }          
}

function nextPopover() {
    popOver(tutorialList[tutorialIndex].selector, 
            tutorialList[tutorialIndex].text, 
            tutorialList[tutorialIndex].title); 
    tutorialIndex++        
    if (tutorialList.length > tutorialIndex) {
        $(".popover").on('close', nextPopover)
    } else {
        $(".popover").on('close', function () {
       
        })
        console.log("yes")       
    }
}
function tutorial () {
    tutorialIndex = 0;
    tutorialList = [
    {
        selector: "#home-page-navbar-center", 
        title: "🏊🎱🎤🍺🍷🎮", 
        text: "Choose what you want to do"
    }, 
    {
        selector: "#underline-border", 
        title: "🕓",         
        text: "Pick a time", 
    }, 
    {
        selector: ".dislike-button", 
        title: "👎",         
        text: "Anonymously Reject/Pass"
    }, 
    {
        selector: ".like-button", 
        title: "👌 ",         
        text: "Secretly invite this person! He/she will know it's you only if he/she says yes too! "
    },             
    {
        selector: ".superlike-button", 
        title: "🙌",         
        text: "Invite this person! He/she will know it's you."
    },        
    ]; 
    nextPopover()

}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
var geolocationSet = [
    {
        name: "New York", 
        location: "40.75350,-73.96271", 
        recs: [
            {
                id: 1, 
                place: "Kiki's", 
                pics: [
                    "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.86.1080.1080/13696903_1582475052052048_1265353871_n.jpg?ig_cache_key=MTI5MzU2MTUyNzY2Mzg2NjkxMg%3D%3D.2.c", 
                    "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c66.0.948.948/13743490_1111510015562065_452116297_n.jpg?ig_cache_key=MTI5NjY3ODc3OTcyODQzMzMyOA%3D%3D.2.c", 
                    "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13636077_1067947803285238_1922341721_n.jpg?ig_cache_key=MTI4ODgzMzE3NDE2MDI2NjU0OA%3D%3D.2", 
                    "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13534146_1754097768213166_1633780241_n.jpg?ig_cache_key=MTI4NjU1MTg2MDUzODM4NTk3Ng%3D%3D.2"
                ], 
                address: "130 Division St, New York, NY 10002", 
                phone: "6468827052", 
                geolocation : "40.7145293,-73.9940309"
            }, 
            {
                id: 2, 
                place: "Take 31", 
                pics: [
                "http://s3-media2.fl.yelpcdn.com/bphoto/geUa6yuR0buK2eghC9K9mQ/o.jpg", 
                "http://s3-media3.fl.yelpcdn.com/bphoto/ffB6jKm7NjKWCsqoS4-q8Q/o.jpg", 
                "http://s3-media4.fl.yelpcdn.com/bphoto/oovaGawWOaP4ltXRagWAfQ/o.jpg", 
                "http://s3-media1.fl.yelpcdn.com/bphoto/YdiHgw5sETnHbrSfCNJkrQ/o.jpg", 
                "http://s3-media3.fl.yelpcdn.com/bphoto/hW-IVNyU_yE9fFB4NrYJtA/o.jpg", 
                "http://s3-media3.fl.yelpcdn.com/bphoto/Acq8MgDZszuO5X0YUA5cdw/o.jpg", 
                "http://s3-media4.fl.yelpcdn.com/bphoto/flEUtEe840Mjd05t4D48uQ/o.jpg", 
                "http://s3-media1.fl.yelpcdn.com/bphoto/4itsy3MZ5hC5ljHZlTlecQ/o.jpg", 
                "http://s3-media4.fl.yelpcdn.com/bphoto/c7BuuS27lE2NRl9zhVoEuQ/o.jpg", 
                "http://s3-media2.fl.yelpcdn.com/bphoto/d7OG-10guYdoX84aoXt9Sw/o.jpg", 
                "http://s3-media2.fl.yelpcdn.com/bphoto/CTru3KuACqi5eK7BA53buA/o.jpg", 
                "http://s3-media3.fl.yelpcdn.com/bphoto/_HVkkPqzZ4meViM15rcqZg/o.jpg", 
                "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/e35/1169064_1646377235623189_1554515025_n.jpg?ig_cache_key=MTE0Mjg0MzI1Mzc3NDM0OTA5Nw%3D%3D.2", 
                "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13725671_1735380796701604_80677170_n.jpg?ig_cache_key=MTMxNjk5NzQ0NzUxMTM1MTAyOA%3D%3D.2", 
                "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c219.0.642.642/13774718_1163111477081594_1502576562_n.jpg?ig_cache_key=MTMxNjcyMDc4MjM4NzAyNTA2OA%3D%3D.2.c", 
                "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c135.0.810.810/13774695_1082506781784793_454263416_n.jpg?ig_cache_key=MTMxNDM5NTAwOTg4OTY1Mzg1NQ%3D%3D.2.c", 
                "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13696365_1815268705371880_1260599230_n.jpg?ig_cache_key=MTMxMjMyMzk3MzE2MTQ2NTUzOQ%3D%3D.2",  
                "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13774568_169691643453248_1338521828_n.jpg?ig_cache_key=MTMxMTIxMDAyNTQ3ODIxNTQ0NQ%3D%3D.2.c"


                ], 
                address: "15 E 31st St, 1st FL, New York, NY 10016", 
                phone: "(646) 398-9990", 
                geolocation : "40.7462835,-73.9870016"
            },       
            {
                id: 3, 
                place: "Her Name Is Han", 
                pics: [
                    "http://s3-media4.fl.yelpcdn.com/bphoto/dCg9YTPQR9Tu1eDG8bmaog/o.jpg", 
                    "http://s3-media4.fl.yelpcdn.com/bphoto/Og3Stb6nTZIMgvCsDSALfA/o.jpg", 
                    "http://s3-media1.fl.yelpcdn.com/bphoto/Bm2WD6UH0ytBqdegYnmDYQ/o.jpg", 
                    "http://s3-media1.fl.yelpcdn.com/bphoto/ZMEmJP9YInYC4pcFx1Un1g/o.jpg", 
                    "http://s3-media2.fl.yelpcdn.com/bphoto/JIacrBGWHUYr0WTi84dxJw/o.jpg", 
                    "http://s3-media1.fl.yelpcdn.com/bphoto/iXkUg6DPmeJOgsK-TC7Ytw/o.jpg", 
                    "http://s3-media2.fl.yelpcdn.com/bphoto/wNswcOI1dRqYw4hPkQcB8g/o.jpg", 
                    "http://s3-media3.fl.yelpcdn.com/bphoto/6T0nlnLDqzKKEi-rO-AM0Q/o.jpg", 
                    "http://s3-media1.fl.yelpcdn.com/bphoto/wKtqJMFDSw3562U-uR4Zig/o.jpg", 
                    "http://s3-media4.fl.yelpcdn.com/bphoto/Aw2ZcPA_JFrPaeWkDmIhDA/o.jpg", 
                    "http://s3-media1.fl.yelpcdn.com/bphoto/Mps924Z8vQnb_LVpl7QUXw/o.jpg", 
                    "http://s3-media1.fl.yelpcdn.com/bphoto/LNWThzZ2t27Q6r4IwU-LYA/o.jpg"
                ], 
                address: "17 E 31st St, 1st FL, New York, NY 10016", 
                phone: "(212) 779-9990", 
                geolocation : "40.746274,-73.9869307"
            },                        
            {
                id: 4, 
                place: "La Sirena Ristorante", 
                pics: [
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c60.0.959.959/13734350_137598906670973_32144044_n.jpg?ig_cache_key=MTI5NjEwOTQ1MTgyNDU0MDIyMQ%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13735858_140042026426118_916219372_n.jpg?ig_cache_key=MTI5NTc0MDc0NzQwMzk5NzI0NA%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.85.678.678/13731114_307899146215329_76538213_n.jpg?ig_cache_key=MTI5NDQ5NjIxNzYyMzkxMzQzMA%3D%3D.2.c"
                ], 
                phone: "2129776096", 
                address: "88 9th Ave, New York, NY 10011", 
                geolocation: "40.7424619,-74.0060087"
            }, 
            {
                id: 5, 
                place: "Totto Ramen Hell’s Kitchen", 
                pics: [
                    "http://s3-media4.fl.yelpcdn.com/bphoto/Pl9j99LtRzLzekLT5sZmKg/o.jpg", 
                    "http://s3-media4.fl.yelpcdn.com/bphoto/46xDkkK77ztg1-F7z5XwKg/258s.jpg", 
                    "http://s3-media1.fl.yelpcdn.com/bphoto/yQ1IKStXeCOEoPQMIChXnQ/258s.jpg", 
                    "http://s3-media1.fl.yelpcdn.com/bphoto/7RKc2cOR7yxS76SUCVwEkA/258s.jpg"
                ], 
                address: "464 W 51st St, New York, NY 10036", 
                phone: "6465969056", 
                geolocation: "40.7650074,-73.9932085"
            }, 
            {
                id: 6, 
                place: "Muk Eun ji",
                pics: [
                    "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13652150_205365099861372_836207911_n.jpg?ig_cache_key=MTI5MTQ1NTk2MTYzMDc0MTU2MA%3D%3D.2", 
                    "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c155.0.769.769/13551719_254363721609390_1868851432_n.jpg?ig_cache_key=MTI4NDgwNzU0NjIxNzkyMDIzMQ%3D%3D.2.c", 
                    "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.54.1080.1080/13551818_1245630412144358_66921863_n.jpg?ig_cache_key=MTI4Mjk0ODUzNjI3ODgwNDA2NA%3D%3D.2.c", 
                    "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11370990_502480483268393_1391856781_n.jpg?ig_cache_key=MTIxMTE1NDA5Mzg1Nzk3ODExMw%3D%3D.2"
                ], 
                phone: "2127360099", 
                address: "34 W 32nd St, New York, NY 10001", 
                geolocation: "40.7476791,-73.9894962"
            },  
            {
                id: 7, 
                link: "https://www.instagram.com/explore/locations/15597954/", 
                place: "Loopy Doopy Rooftop Bar",
                pics: [
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13686998_1564655150503332_1505405470_n.jpg?ig_cache_key=MTI5OTU2MDc1MTA0NDE2NTc1MA%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13743448_723892341084741_975844040_n.jpg?ig_cache_key=MTI5ODc4ODI0NjAwMzcyNDQ1Mg%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13745128_1079055495520337_660567184_n.jpg?ig_cache_key=MTI5OTY5MDQyMzk3NTMyNTQ1NA%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13704308_510666769122121_945901122_n.jpg?ig_cache_key=MTI5OTYwMDEyNjE2MzIxMjY2NQ%3D%3D.2",
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c135.0.809.809/13696708_519739348232201_296901074_n.jpg?ig_cache_key=MTI5OTAwNzc2NDU1MTI4MjIyNA%3D%3D.2.c"
                ], 
                phone: "(646) 769-4250", 
                address: "Conrad New York Hotel, 102 N End Ave, New York, NY 10282", 
                geolocation: "40.7149227,-74.0178667"
            }, 
            {
                id: 8, 
                link: "https://www.instagram.com/explore/locations/139393783/", 
                place: "Osteria del Principe NYC",
                pics: [
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/e15/11240440_843655642372371_1886524393_n.jpg?ig_cache_key=OTgxNDE1ODc3MDkyMjQxNjgz.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13725602_620222141491970_1728597608_n.jpg?ig_cache_key=MTI5ODc5Mjk1NDk1ODA5MjQ5Ng%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/e15/c0.0.1079.1079/13658547_1749295615312010_938981753_n.jpg?ig_cache_key=MTI5MjE0MzUzNzY0MjYzOTE4MQ%3D%3D.2.c" ,
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/e15/13562091_1326996700645017_218158086_n.jpg?ig_cache_key=MTI4NDk1NjAwMTEwNzI4NTU5MQ%3D%3D.2"
                ], 
                phone: "(646) 596-7864", 
                address: "27 E 23rd St, New York, NY 10010", 
                geolocation: "40.740845,-73.9894224"
            }, 
            {
                id: 9, 
                link: "https://www.instagram.com/explore/locations/346340/", 
                place: "Strip House Speakeasy",
                pics: [
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.60.1080.1080/13768139_679981982153822_1182660343_n.jpg?ig_cache_key=MTI5NTgzNDk4NzgyMDMyODM1Ng%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.29.1080.1080/13696761_1260774787287518_207631179_n.jpg?ig_cache_key=MTI5NDYyMzM5ODI3NDQxMjkwOQ%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13715328_172872246463096_1923278768_n.jpg?ig_cache_key=MTI5OTc5MTMxNDk1NDc3OTM2Nw%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c108.0.863.863/13715023_640660406097588_818185566_n.jpg?ig_cache_key=MTI5OTQwODQ0ODcwMTc2MDQwNA%3D%3D.2.c"
                ], 
                phone: "(212) 838-9197", 
                address: "11 E 12th St, New York, NY 10003", 
                geolocation: "40.7150358,-74.0855511"
            }, 
            {
                id: 10, 
                link: "https://www.instagram.com/explore/locations/513452232/", 
                place: "Jack's Wife Freda Carmine St",
                pics: [
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.106.923.923/13671289_154197674989012_50349838_n.jpg?ig_cache_key=MTI5OTU0ODMyMzIxMjM3MjgwOQ%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13696586_286821741683158_110780568_n.jpg?ig_cache_key=MTI5ODY2MTEyMzk5ODAwNzIwNQ%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/l/t51.2885-15/e35/13102593_1080424992017823_676360399_n.jpg?ig_cache_key=MTIzOTEyMDExOTY4ODI5MDExNQ%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13744105_1047654435310549_830417982_n.jpg?ig_cache_key=MTI5ODY3NDY1MDk5ODM3MDM4Ng%3D%3D.2.c"
                ], 
                phone: "(646) 669-9888", 
                address: "50 Carmine St, New York, NY 10014", 
                geolocation: "40.7298168,-74.0057047"
            }, 
            {
                id: 11, 
                link: "https://www.instagram.com/explore/locations/293472/", 
                place: "Elephant & Castle NYC",
                pics: [
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11357801_1601858703407432_2108442357_n.jpg?ig_cache_key=MTA0NDI0Njc5Mjc3NDY1OTQzMw%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c1.0.1078.1078/12729465_1698817473700458_1013194076_n.jpg?ig_cache_key=MTE4NTE2NTA2ODE3NTQyMTcyNQ%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13298050_965355983563778_549503028_n.jpg?ig_cache_key=MTI2ODgzNDU0ODU5NTEyNTA2Mw%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13714047_830518217079433_1347277925_n.jpg?ig_cache_key=MTI5NzE0OTQwMjUwNzM2ODU0OA%3D%3D.2"
                ], 
                phone: "(212) 243-1400", 
                address: "68 Greenwich Ave, New York, NY 10011", 
                geolocation: "40.7362136,-74.002907"
            }, 
            {
                id: 12, 
                link: "https://www.instagram.com/explore/locations/169262423/", 
                place: "El Colmado",
                pics: [
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11925832_1488676351430564_380993543_n.jpg?ig_cache_key=MTA1NDY3MjA0OTgzODQ1NTY1OA%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/e15/11336073_424942187685641_559197425_n.jpg?ig_cache_key=MTAwMDc1NTc1OTIwMzEyMDg5Mg%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12139895_1634277033521050_1669284567_n.jpg?ig_cache_key=MTA5ODU3NzE0MTE0MDEzOTIwNQ%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/l/t51.2885-15/s640x640/sh0.08/e35/c181.0.718.718/13721267_531718530369378_1660031518_n.jpg?ig_cache_key=MTI5MzcwNjA2NTUzNTUzNTkxNQ%3D%3D.2.c"
                ], 
                phone: "(212) 582-7948", 
                address: "600 11th Ave, New York, NY 10036", 
                geolocation: "40.7623377,-73.9989466"
            }, 
            {
                id: 13, 
                link: "https://www.instagram.com/explore/locations/223443313/", 
                place: "Ladurée Soho",
                pics: [
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.62.1080.1080/13745180_808855115882528_1314243013_n.jpg?ig_cache_key=MTI5NzUwNTA3MzY4OTQzMDkwOQ%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c135.0.809.809/13722227_1794162830802229_90618703_n.jpg?ig_cache_key=MTI5OTY5NzA0Nzg4ODQxNjA1NA%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13827364_689154154566294_827594772_n.jpg?ig_cache_key=MTI5OTYzOTM4MDAzMzcxNjk5MA%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13745190_1634444336868073_1196902171_n.jpg?ig_cache_key=MTI5OTYzOTY2Nzc2MzE1MTg2Mg%3D%3D.2"
                ], 
                phone: "(646) 392-7868", 
                address: "398 W Broadway, New York, NY 10012", 
                geolocation: "40.724395,-74.0046867"
            }, 
            {
                id: 14, 
                link: "https://www.instagram.com/explore/locations/786364500/", 
                place: "Sweet Chick",
                pics: [
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13768270_1023207231109599_1286786359_n.jpg?ig_cache_key=MTI5Nzk0NTM5MTA4NjE3OTk0NA%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13706882_154715974935856_1300067624_n.jpg?ig_cache_key=MTI5ODA2MDU0MjI1NDA5NTMyNg%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13694894_1730765423857010_1346348258_n.jpg?ig_cache_key=MTI5OTM1NTY0NDQwMjQ3NzMyNQ%3D%3D.2", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13712640_164305473981186_146169016_n.jpg?ig_cache_key=MTI5ODgwOTkwMTMwNTIzODIxMQ%3D%3D.2"
                ], 
                phone: "(646) 657-0233", 
                address: "178 Ludlow St, New York, NY 10002", 
                geolocation: "40.7625327,-74.0268973"
            },                                                                                                             
            {
                id: 15, 
                place: "David Burke Kitchen", 
                pics: [
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13696567_1757018307869920_1035873077_n.jpg?ig_cache_key=MTI5NjQwNDgyMzQyNzgyNzE1MQ%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.0.1080.1080/13651824_897753470350597_858064809_n.jpg?ig_cache_key=MTI5MzAyMDc0MTA4MzYyNTI2Mw%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/13658333_1102767776473403_1378071869_n.jpg?ig_cache_key=MTI5MjEzNDIwOTgwNDk3MTY3MA%3D%3D.2.c", 
                    "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c100.0.880.880/13561650_632525326903593_1881896250_n.jpg?ig_cache_key=MTI4NzAyMDgxODkxNjU3MDkyOQ%3D%3D.2.c"
                ], 
                phone: "2122019119", 
                address: "23 Grand St, New York, NY 10013", 
                geolocation: "40.7227867,-74.0071125"
            }           
        ]
    }, 

    {
        name: "Boston", 
        location: "42.35651,-71.10352"
    }, 
    {
        name: "Chicago", 
        location: "41.87161,-87.63519"
    }, 
    {
        name: "Bay Area", 
        location: "37.55111,-122.19269"
    }, 
    {
        name: "Los Angeles", 
        location: "33.98209,-118.31177"
    }, 
    {
        name: "Los Angeles", 
        location: "33.98209,-118.31177"
    }, 
    {
        name: "Houston", 
        location: "29.71668,-95.44373"        
    }, 
    {
        name: "Atlanta", 
        location: "33.76773,-84.40247"           
    }, 
    {
        name: "Toronto", 
        location: "43.69568,-79.46411"                
    }, 
    {
        name: "Seattle", 
        location: "47.63948,-122.37671"                
    }, 
    {
        name: "Vancouver", 
        location: "49.24450,-123.08533"            
    }, 
    {
        name: "San Diego", 
        location: "32.73184,-117.15820"          
    },
    {
        name: "Washington DC", 
        location: "38.90012,-77.04025"          
    }, 
    {
        name: "Hong Kong", 
        location: "22.29926,114.17679"           
    }, 
    {
        name: "Shen Zhen", 
        location: "22.53539,114.05457"                    
    }, 
    {
        name: "Shanghai", 
        location: "31.21280,121.47308"                  
    }, 
    {
        name: "Beijing", 
        location: "39.90394,116.40152"                   
    }, 
    {
        name: "London", 
        location: " 51.50447,-0.12222"            
    }
]; 

var currentTabPage = "rate-tab";
var borderPosition = -200;
// emojify.setConfig({tag_type : 'div'});

var ray_token = "fc14487e19bc119e5e1115994bf094df"
var rayray_token = "8e03ab15ea9e668e70efcafab7e8c13d"
var jimmy_token = "cf40d87a845c66efbbe3a73205de5029"
var loading = false;
var availFriend = []
for (var i = 0; i < 4; i++) {
    availFriend[i] = []
}
var userLocation = []; 
var activityText = '<i class="fa fa-chevron-circle-down" aria-hidden="true"></i> I want to... '
// var currentTimeFrame = 0;
// var usersFavoriteList = []
var timeOutValue = 5000;

var personalData; 
if (localStorage.personalData == null ){
    personalData = new Object()
} else {
    personalData = JSON.parse(localStorage.personalData)    
}

var selfData = new Object () ;
for (var i = 0 ; i < 7; i++) {
    avail[i] = []
    for (var j = 0; j < 3; j++ ) {
        avail [i][j] = 1; 
    }
}

var push_notification = null;
var favoriteFoodList = ["Food", "Coffee", "Shopping", "Clubbing", "Party", "Chatting","Poker", "Drinking", "Workout", "Video Games", "Running", "Golf", "Swimming", "Basketball", "Soccer", "Sports", "Cooking", "Road Trip", "Concerts/Events", "Movie", "Board Games", "Karaoke"].sort(cSort)
var currentIndex = [ null, null, null]; 
var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
var fulldays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var d = new Date()
var currentHours = d.getHours()
// var currentHours = 18
var queryDay; 
// var 
// new Element("script", {src: "http://gettimi.com/ios/www/js/GALocalStorage.js?ns=1", type: "text/javascript"});

var barIconHTML = '<a class=\"  open-panel link left-link\" style="visibility:hidden"><i class=\"fa fa-bars \"></i></a>';

function getQueryDay () {
    if (currentHours <= 1) {
        queryDay = d.getDay() - 1
    } else {
        queryDay = d.getDay()
    }
    if (queryDay < 0) {
        queryDay += 7
    }    
    scheduleName = [ (currentHours < 17 && currentHours >= 2) ? "Today" : "Tonight", "Tomorrow", fulldays[(queryDay+2)%7], "Now"]    
}

getQueryDay ()

var timeAvail; 

function updateTimeAvail () {
    if ( currentHours < 2) {
        timeAvail = [0,0,1]
        // t-1 night life
        // midnight
        // d.getHours 
    } else if ( currentHours < 15) {
        // lunch dinner night available
        timeAvail = [1,1,1,1]
    } else if ( currentHours < 21) {
        // dinner, night avialable
        timeAvail = [0,1,1,1]
    } else {
        timeAvail = [0,0,1,1]
        // night avialable
    }    
    timeAvail = [1,1,1,1]
}
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function daySince (date) {
    var daysDiff = Math.floor( (new Date()).getDate() - date.getDate() ) ;    
    if (daysDiff == 0) {
        return "Today"

    } else if (daysDiff < 2) {
        return "Yesterday";

    } else if (daysDiff < 8 ) {
        return days[date.getDay()]
    } else {
        return date.getDate().toString() + " " + months[date.getMonth()] + ", " + date.getFullYear();
    }
    // var seconds = Math.floor((new Date() - date) / 1000);
    // var days = Math.floor(seconds / (60*60*24));    

}

function minTimeSince (date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var seconds, minutes, hours, days;
    if (seconds < 5) {
        return "now";
    } 
    else if (seconds < 60){
        return seconds + "s";
    } 
    else if (seconds < 3600) {
        minutes = Math.floor(seconds/60)
        if(minutes > 1)
            return minutes + "m";
        else
            return "1m";
    } 
    // 60 * 60 * 24
    else if (seconds < 86400) {
        hours = Math.floor(seconds/3600)
        if(hours > 1)
            return hours + "h";
        else
            return "1h";
    }
    // 1 month and no more
    else {
        days = Math.floor(seconds/86400)
        if (days > 1)
            return days + "d";
        else
            return "1d";
    }
}

function timeSince (date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var seconds, minutes, hours, days;
    if (seconds < 5) {
        return "just now";
    } 
    else if (seconds < 60){
        return seconds + " seconds ago";
    } 
    else if (seconds < 3600) {
        minutes = Math.floor(seconds/60)
        if(minutes > 1)
            return minutes + " minutes ago";
        else
            return "1 minute ago";
    } 
    // 60 * 60 * 24
    else if (seconds < 86400) {
        hours = Math.floor(seconds/3600)
        if(hours > 1)
            return hours + " hours ago";
        else
            return "1 hour ago";
    }
    // 1 month and no more
    else if (seconds < 2592000) {
        days = Math.floor(seconds/86400)
        if(days > 1)
            return days + " days ago";
        else
            return "1 day ago";
    }
    else{
        //return new Date(time).toLocaleDateString();
        return date.getDate().toString() + " " + months[date.getMonth()] + ", " + date.getFullYear();
    }
}
updateTimeAvail ()

var scriptHTML = document.getElementById("body-html").innerHTML
var strVar="";
strVar += "    <script>";
strVar += "      (function(d, s, id){";
strVar += "         var js, fjs = d.getElementsByTagName(s)[0];";
strVar += "         if (d.getElementById(id)) {return;}";
strVar += "         js = d.createElement(s); js.id = id;";
strVar += "         js.src = \"https:\/\/connect.facebook.net\/en_US\/sdk.js\";";
strVar += "         fjs.parentNode.insertBefore(js, fjs);";
strVar += "       }(document, 'script', 'facebook-jssdk'));";
strVar += "      window.fbAsyncInit = function() {";
strVar += "        FB.init({";
strVar += "          appId      : '1692336331017767',";
strVar += "          xfbml      : true,";
strVar += "          version    : 'v2.6'";
strVar += "        });";
strVar += "        FB.getLoginStatus(function(response) {";
strVar += "          if (response.status === 'connected') {";
strVar += "            console.log('Logged in.');";
strVar += "          }";
strVar += "          else {";
strVar += "            FB.login();";
strVar += "          }";
strVar += "        });      ";
strVar += "      };  ";
strVar += "    <\/script>    ";
strVar += '<script>'
strVar += '    (function(e, a) {'
strVar += '        if (!a.__SV) {'
strVar += '            var b = window;'
strVar += '            try {'
strVar += '                var c, l, i, j = b.location,'
strVar += '                    g = j.hash;'
strVar += '                c = function(a, b) {'
strVar += '                    return (l = a.match(RegExp(b + "=([^&]*)"))) ? l[1] : null'
strVar += '                };'
strVar += '                g && c(g, "state") && (i = JSON.parse(decodeURIComponent(c(g, "state"))), "mpeditor" === i.action && (b.sessionStorage.setItem("_mpcehash", g), history.replaceState(i.desiredHash || "", e.title, j.pathname + j.search)))'
strVar += '            } catch (m) {}'
strVar += '            var k, h;'
strVar += '            window.mixpanel = a;'
strVar += '            a._i = [];'
strVar += '            a.init = function(b, c, f) {'
strVar += '                function e(b, a) {'
strVar += '                    var c = a.split(".");'
strVar += '                    2 == c.length && (b = b[c[0]], a = c[1]);'
strVar += '                    b[a] = function() {'
strVar += '                        b.push([a].concat(Array.prototype.slice.call(arguments,'
strVar += '                            0)))'
strVar += '                    }'
strVar += '                }'
strVar += '                var d = a;'
strVar += '                "undefined" !== typeof f ? d = a[f] = [] : f = "mixpanel";'
strVar += '                d.people = d.people || [];'
strVar += '                d.toString = function(b) {'
strVar += '                    var a = "mixpanel";'
strVar += '                    "mixpanel" !== f && (a += "." + f);'
strVar += '                    b || (a += " (stub)");'
strVar += '                    return a'
strVar += '                };'
strVar += '                d.people.toString = function() {'
strVar += '                    return d.toString(1) + ".people (stub)"'
strVar += '                };'
strVar += '                k = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");'
strVar += '                for (h = 0; h < k.length; h++) e(d, k[h]);'
strVar += '                a._i.push([b, c, f])'
strVar += '            };'
strVar += '            a.__SV = 1.2;'
strVar += '            b = e.createElement("script");'
strVar += '            b.type = "text/javascript";'
strVar += '            b.async = !0;'
strVar += '            b.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === e.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";'
strVar += '            c = e.getElementsByTagName("script")[0];'
strVar += '            c.parentNode.insertBefore(b, c)'
strVar += '        }'
strVar += '    })(document, window.mixpanel || []);'
strVar += '    mixpanel.init("1f6f2f18699f99df680311236eb838d3");'
strVar += '</script>'

// strVar += "<script>"
// strVar += "  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){"
// strVar += "  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),"
// strVar += "  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)"
// strVar += "  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');"
// strVar += "  ga('create', 'UA-78465279-1', 'auto');"
// strVar += "  ga('send', 'pageview');"

// strVar += "</script>"
scriptHTML += "<script type='text/javascript' src='" + "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js" + "'></script>";
scriptHTML += '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAqBHCFbs_2Q3o7ZTAxID8Xnd3dUBUSdw" async defer></script>'
strVar += "";
strVar += "    <div class=\"statusbar-overlay\" >";
strVar += "    <\/div>";

strVar += '   <div class="panel-overlay"></div>'
 

strVar += '   <div class="panel panel-left panel-reveal" id="left-panel-html"><div id="left-panel-html-background"></div>'

strVar += '   </div>'
strVar += "    <div class=\"views\">";
strVar += "      <!-- Your main view -->";
strVar += "      <div class=\"view view-main\">";
strVar += "        <div class=\"navbar\" id=\"navbar-container\" >";
strVar += "            <!-- Home page navbar -->";
strVar += "          <div class=\"navbar-inner \" data-page=\"index\">";
strVar += "            <div class=\"center\"><\/div>";
strVar += "          <\/div>";
strVar += "";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"home\">";
strVar += "";
strVar += "            <div id=\"home-page-navbar-left\" class=\"home-nav\">" + 
                            "<a style=\"visibility:hidden;\" class=\"link right-link\" onclick=\"myApp.showTab('#invitation-tab')\"><i class=\"fa fa-question-circle\"></i></a>" + 
                        "</div>" + 
                        "<div class=\"home-nav activity-button\" id=\"home-page-navbar-center\" onclick=\"selectActivity ()\" >" + 
                            "<i class=\"fa fa-chevron-circle-down\" aria-hidden=\"true\"></i>I want to...";
strVar += "             <\/div>" + 
                        "<div id=\"home-page-navbar-right\" class=\"home-nav\">" + 
                            "<a class=\"link right-link\" onclick=\"tutorial()\"><i class=\"fa fa-question-circle\"></i></a>" + 
                        "</div>";
strVar += "        <div class=\"subnavbar\">";
strVar += "          <div class=\"buttons-row\">";

strVar += "            <a href=\"#tab1\" class=\"button time-tab lunch-tab tab-link active\">Today<\/a>";
strVar += "            <a href=\"#tab2\" class=\"button time-tab dinner-tab tab-link\">Tomorrow<\/a>";
strVar += "            <a href=\"#tab3\" class=\"button time-tab night-tab tab-link\">Saturday<\/a>";
strVar += "            <a href=\"#tab0\" class=\"button time-tab now-tab tab-link \">Now<\/a>";
strVar += "            <div id=\"underline-border\"></div>";
strVar += "          <\/div>";
strVar += "        <\/div>                              ";
strVar += "          <\/div>        ";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"match-page\">";
strVar += "            <div class=\"left\"> ";
strVar += "              <a class=\"link back-link\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span class=\"back-link-text\"><\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>          ";
strVar += "            <div class=\"center\" >Matching<\/div>";
strVar += "           ";
strVar += "          <\/div>";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"ask-calendar\">";
strVar += "            <div class=\"left\"> ";
strVar += "              <a class=\"link back-link\" id=\"ask-calendar-back\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span class=\"back-link-text\"><\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>          ";
strVar += "            <div class=\"center\">Your availability<\/div>";
strVar += "          <\/div>";
strVar += "";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"chatting-page\">";
strVar += "            <div class=\"left\" style=\"position: absolute;\"> ";
strVar += "              <a class=\"link back-link\" id=\"ask-calendar-back\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span class=\"back-link-text\"><\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>          ";
strVar += "            <div class=\"center\" id=\"chatting-page-title\"><img onclick=\"openSystem ()\" class=\"navbar-chatting-avatar\" >Ray Xiao<\/div>";
// strVar += "            <div class=\"right\" style=\"position: absolute;right: 10px;\"> ";
// strVar += "              <a class=\"link \" id=\"placeRec()\">               ";
// strVar += "                ";
// strVar += "                <span>Recs<\/span>";
// strVar += "              <\/a>";
// strVar += "            <\/div>          ";
strVar += "          <\/div>        ";
strVar += "";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"personal-setting-page\" >";
strVar += "            <div class=\"left\" onclick=\"postPersonalInfo () \"> ";
strVar += "              <a class=\"link \">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span class=\"back-link-text\"><\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>          ";
strVar += "            <div class=\"center\" >Personal Settings<\/div>";
strVar += "            <div class=\"right\" >";
strVar += "              <a class=\"link\" onclick=\"postPersonalInfo () \">               ";
strVar += "                <span>Save<\/span>";
strVar += "              <\/a>            ";
strVar += "            <\/div>";
strVar += "          <\/div>        ";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"availability-page\" >";
strVar += "            <div class=\"left\" > ";
strVar += "              <a class=\"link back-link\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span class=\"back-link-text\"><\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>          ";
strVar += "            <div class=\"center\" >My Availability<\/div>";
strVar += "            <div class=\"right\" >";
// strVar += "              <a class=\"link\" onclick=\"postPersonalInfo () \">               ";
// strVar += "                <span>Save<\/span>";
// strVar += "              <\/a>            ";
strVar += "            <\/div>";
strVar += "          <\/div>        ";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"phone-number\">      ";
strVar += "            <div class=\"center\">Personal Info<\/div>";
strVar += "          <\/div>";
strVar += "";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"friends-list\">";
strVar += "            <div class=\"left\"> ";
strVar += "              <a class=\"link back-link\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span class=\"back-link-text\"><\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>";
strVar += "            <div class=\"center\">Friends<\/div>";
strVar += "          <\/div>        ";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"pin-list\">";
strVar += "            <div class=\"left\"> ";
strVar += "              <a class=\"link back-link\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span class=\"back-link-text\"><\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>";
strVar += "            <div class=\"center\"><\/div>";
strVar += "          <\/div>        ";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"nearby-list\">";
strVar += "            <div class=\"left\"> ";
strVar += "              <a class=\"link back-link\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span class=\"back-link-text\"><\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>";
strVar += "            <div class=\"center\">People Nearby<\/div>";
strVar += "          <\/div>        ";
strVar += "          <div class=\"navbar-inner cached\" data-page=\"restaurant-page\">";
strVar += "            <div class=\"left\"> ";
strVar += "              <a class=\"link back-link\">               ";
strVar += "                <i class=\"fa fa-chevron-left\"><\/i>";
strVar += "                <span class=\"back-link-text\"><\/span>";
strVar += "              <\/a>";
strVar += "            <\/div>";
strVar += "            <div class=\"center-title center\" id=\"restaurant-name-navbar\">Timi<\/div>";
strVar += "            <div class=\"right\" >";
strVar += "              <a class=\"link\" style=\"font-size: 14px;\" id=\"restaurant-bookmark-button\">               ";
strVar += "                SHARE";
strVar += "              <\/a>            ";
strVar += "            <\/div>";
strVar += "          <\/div>        ";
strVar += "        <\/div>";
strVar += "        <span class=\"progressbar-infinite\" id=\"progressbar\"><\/span> ";
strVar += "";
strVar += "        <div class=\"pages navbar-through\">";
// strVar += "          <div class=\"page cached\" data-page=\"nearby-list\">";
// strVar += "            <div class=\"page-content\">";
// strVar += "                    <div id=\"nearbyslide\">";
// strVar += "                        <ul>";
// strVar += "                        <\/ul>";
// strVar += "                    <\/div>            ";
// strVar += "            <\/div>";
// strVar += "          <\/div>";
strVar += "          <div class=\"page cached\" data-page=\"phone-number\">";
strVar += "            <div class=\"page-content\">";
strVar += "              <form id=\"my-form\" class=\"list-block\">";
strVar += "                <ul>";
strVar += "                  <li>";
strVar += "                    <div class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title label\">";
strVar += "                          <i class=\"fa fa-user\"><\/i>";
strVar += "                        <\/div>";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input  id=\"user-name-input\" type=\"text\" name=\"name\" placeholder=\"( your name )\">";
strVar += "                        <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                  <\/li>";
strVar += "                  <li>";
strVar += "                    <div class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title label\">";
strVar += "                          <i class=\"fa fa-envelope\"><\/i>";
strVar += "                        <\/div>";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input id=\"user-email-input\" type=\"text\" name=\"email\" placeholder=\"( your email )\">";
strVar += "                        <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                  <\/li>";
strVar += "                  <li>";
strVar += "                    <div class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title label\" id=\"country-code\"><span><\/span><input id=\"country-code-input\" placeholder=\"+1\" value=\"+1\"><\/div>";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input id=\"phone-number-input\" type=\"tel\" name=\"phone\" placeholder=\"( your phone # )\">";
strVar += "                        <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                  <\/li>                ";
strVar += "                <\/ul>";
strVar += "              <\/form>";
strVar += "              <div class=\"button one-line-button button-fill color-pink\" onclick=\"verifyPhone()\">";
strVar += "                TEXT ME! ";
strVar += "              <\/div>";
strVar += "              <div class=\"button one-line-button button-fill color-gray\" onclick=\"logout()\">";
strVar += "                Reset ";
strVar += "              <\/div>";
strVar += "              <div class= \"one-line-prompt\"> ";
strVar += "                Please let Timi verify your number to find friends for you";
strVar += "              <\/div>                              ";
strVar += "            <\/div>";
strVar += "          <\/div>";
strVar += "          <div class=\"page cached \" data-page=\"home\">";
strVar += "            <div class=\"toolbar tabbar tabbar-labels\">";
strVar += "              <div class=\"toolbar-inner\">";

strVar += "                <a href=\"#rate-tab\" id= \"rate-tab-button\"class=\"tab-link\" >";
strVar += "                    <i class=\"fa fa-star-half-o\">";
strVar += "                        <!-- <span class=\"badge bg-red\"><\/span> -->";
strVar += "                    <\/i>";
strVar += "                    <span class=\"tabbar-label\">Ideas<\/span>";
strVar += "                <\/a>";

// strVar += "                <a href=\"#invitation-tab\" id=\"invitation-tab-button\" class=\"tab-link\">";
// strVar += "                    <i class=\"fa fa-users\"><span id=\"badge-red-dot-1\" style=\"display:none\" class=\"badge bg-red\"><\/span><\/i>";
// strVar += "                    <span class=\"tabbar-label\">Group Invite<\/span>";
// strVar += "                <\/a>";
// strVar += "                <a href=\"#map-tab\" id= \"map-tab-button\"class=\"tab-link\" >";
// strVar += "                    <i class=\"fa fa-map\">";
// strVar += "                        <!-- <span class=\"badge bg-red\"><\/span> -->";
// strVar += "                    <\/i>";
// strVar += "                    <span class=\"tabbar-label\">Map<\/span>";
// strVar += "                <\/a>";

strVar += "                <a href=\"#moment-tab\" class=\"tab-link\" >";
strVar += "                    <i class=\"fa fa-heart\">";
strVar += "                        <!-- <span class=\"badge bg-red\"><\/span> -->";
strVar += "                    <\/i>";
strVar += "                    <span class=\"tabbar-label\">Bookmarks<\/span>";
strVar += "                <\/a>";
strVar += "                <a href=\"#explore-tab\" id=\"explore-tab-button\" class=\"tab-link active\">";
strVar += "                    <i class=\"fa fa-glass\"><span id=\"badge-red-dot-0\" style=\"display:none\" class=\"badge bg-red\"><\/span><\/i>";

strVar += "                    <span class=\"tabbar-label\">Date<\/span>";
strVar += "                <\/a>";
strVar += "                <a href=\"#event-tab\" id=\"event-tab-button\" class=\"tab-link\" >";
strVar += "                    <i class=\"fa fa-calendar-check-o\">";
strVar += "                       <span id=\"event-badge\" style=\"display:none;\" class=\"badge bg-red\"><\/span>";
strVar += "                    <\/i>";
strVar += "                    <span class=\"tabbar-label\">Notifications<\/span>";
strVar += "                <\/a>";
strVar += "                <a href=\"#messenger-tab\" class=\"tab-link\">";
strVar += "                    <i class=\"fa fa-comments\"><span id=\"badge-red-dot-2\" style=\"display:none\" class=\"badge bg-red\"><\/span><\/i>";
strVar += "                    <span class=\"tabbar-label\">Chats<\/span>";
strVar += "                <\/a>";


// strVar += "                <a href=\"#more-tab\" class=\"tab-link\">";
// strVar += "                    <i class=\"fa fa-ellipsis-h\"><span id=\"badge-red-dot-3\" style=\"display:none\" class=\"badge bg-red\"><\/span><\/i>";
// strVar += "                    <span class=\"tabbar-label\">More<\/span>";
// strVar += "                <\/a>        ";
strVar += "              <\/div>";
strVar += "            <\/div>          ";
strVar += "            ";
strVar += "            <div class=\"tabs\">";
strVar += "              <div id=\"explore-tab\" class=\"tab active\">";
strVar += "                <div class=\"content-block\">";
strVar += "                  <div class=\"page-content\">";
strVar += "                    <div id=\"loading-icon\">";
strVar += "                    <\/div>";
strVar += "                    <div id=\"tinderslide\">";
strVar += "                        <ul>";
strVar += "                        <\/ul>";
strVar += "                    <\/div>            ";
strVar += "                  <\/div>";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "              <!-- Tab 2 -->";
strVar += "              <div id=\"event-tab\" class=\"tab\">";
strVar += "                <div class=\"content-block\">";
strVar += "                 <div class=\"page-content  contacts-content\">";
strVar += "                         <div class=\"list-block media-list contacts-block\" id=\"event-list\" >";
strVar += "                             <ul>";
strVar += "                             <\/ul>";
strVar += "                         <\/div>            ";
strVar += "                <\/div>";
strVar += "               <\/div>";

strVar += "              <\/div>";
strVar += "              <div id=\"search-restaurant-tab\" class=\"tab\">";
strVar += "                 <div class=\"page-content\" >";
strVar += "                         <div id=\"picture-list\">";
strVar += "                             <ul>";
strVar += "                             <\/ul>";
strVar += "                         <\/div>            ";
strVar += "                  <\/div>";
strVar += "              <\/div>";
strVar += "              <!-- Tab 2 -->";
strVar += "              <div id=\"search-tab\" class=\"tab\">";
strVar += "                 <div class=\"page-content\">";
strVar += "                         <div id=\"nearbyslide\">";
strVar += "                             <ul>";
strVar += "                             <\/ul>";
strVar += "                         <\/div>            ";
strVar += "                  <\/div>";
strVar += "              <\/div>";
strVar += "              <!-- Tab 2 -->";
strVar += "              <div id=\"map-tab\" class=\"tab\">";
strVar += "                     <div class=\"restaurant-info-group\" >"
strVar += "                         <div class=\"row restaurant-info-bar restaurant-category-block\">";
strVar += "                         </div>";
strVar += "                     </div> ";
strVar += "                 <div class=\"page-content\">";
strVar += "                         <div id=\"map-element\" >";

strVar += "                         <\/div>            ";
strVar += "                         <div id=\"search-in-map\" onclick=\"searchInArea()\" class=\"modern-square-button\" >Search In This Area";
strVar += "                         <\/div>            ";
strVar += "                         <div id=\"search-preview\" class=\" \"></div>"

strVar += "                  <\/div>";
strVar += "              <\/div>";
strVar += "              <div id=\"moment-tab\" class=\"tab\">";
strVar += "                 <div class=\"page-content contacts-content  \">";
// strVar += '                         <div class="pull-to-refresh-layer"> ';
// strVar += '                           <div class="preloader"></div> ';
// strVar += '                           <div class="pull-to-refresh-arrow"></div> ';
// strVar += '                         </div> ';
strVar += "                         <div id=\"moment-list\" class='contact-list list-block' >";
strVar += "                             <ul>";
strVar += "                             <\/ul>";
strVar += "                         <\/div>            ";
strVar += "                  <\/div>";
strVar += "              <\/div>";
strVar += "              <div id=\"rate-tab\" class=\"tab\">";
strVar += "                     <div class=\"restaurant-info-group\" >"
strVar += "                         <div class=\"row restaurant-info-bar restaurant-category-block\" >";
strVar += "                         </div>";
strVar += "                     </div> ";
strVar += "                 <div class=\"page-content contacts-content infinite-scroll\" id=\"rate-page-content-id\">"; 
// strVar += '                          <li class="list-group-title"> ';

// strVar += "                     <div class=\"restaurant-info-group\" id=\"restaurant-distance-id\">"
// strVar += "                     </div> ";
// strVar += '                          </li> ';
// strVar += '                          <li> ';
strVar += "                     <div class=\"list-block contacts-block \" id=\"picture-list\"></div>";
// strVar += "                         <div id=\"rate-element\" style=\"width: 100%; height: 100%;\">";
// strVar += "                             <div id=\"rate-img\"></div>";

// strVar += "<div class=\"row\"> ";
// strVar += "    <div onclick=\"rateButton(this.innerText)\"class=\"col-20 color-pink button\">A</div> ";
// strVar += "    <div onclick=\"rateButton(this.innerText)\"class=\"col-20 color-pink button\">B</div> ";
// strVar += "    <div onclick=\"rateButton(this.innerText)\"class=\"col-20 color-pink button\">C</div> ";
// strVar += "    <div onclick=\"rateButton(this.innerText)\"class=\"col-20 color-pink button\">D</div> ";
// strVar += "    <div onclick=\"rateButton(this.innerText)\"class=\"col-20 color-pink button\">F</div> ";
// strVar += "</div> ";
// // strVar += "<div class=\"row\"> ";
// // strVar += "    <div class=\"col-20 color-pink button\">6</div> ";
// // strVar += "    <div class=\"col-20 color-pink button\">7</div> ";
// // strVar += "    <div class=\"col-20 color-pink button\">8</div> ";
// // strVar += "    <div class=\"col-20 color-pink button\">9</div> ";
// // strVar += "    <div class=\"col-20 color-pink button\">10</div> ";
// // strVar += "</div> ";
// strVar += "<div class=\"row\"> ";
// strVar += "    <div onclick=\"rateButton(this.innerText)\"class=\"col-33 color-pink button\">F*** </div> ";
// strVar += "    <div onclick=\"rateButton(this.innerText)\"class=\"col-33 color-pink button\">MARRY</div> ";
// strVar += "    <div onclick=\"rateButton(this.innerText)\"class=\"col-33 color-pink button\">KILL </div> ";
// strVar += "</div> ";
// strVar += "<div id=\"rate-prompt\">Score this chick/dick</div> ";
// strVar += "                             ";
// strVar += "                         <\/div>            ";
strVar += "                  <\/div>";
// strVar += '                          </li> ';
strVar += "              <\/div>";
strVar += "              <!-- Tab 3 -->";
strVar += "              <div id=\"messenger-tab\" class=\"tab\">";
strVar += "                <div class=\"content-block\">";
strVar += "                  <div class=\"page-content\">";
strVar += "                    <div id=\"messenger-list\" class=\"list-block media-list\">";
strVar += "                    <\/div>";
strVar += "                  <\/div>";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "              <!-- Tab 4 -->";
strVar += "              <div id=\"invitation-tab\" class=\"tab\">";
strVar += "                <div class=\"content-block\">";
strVar += "                  <div class=\"page-content\" id=\"list-content-block\">";
strVar += "                     <div id=\"logo-holder\"></div>"
strVar += "                     <form id=\"listview-user\" class=\"list-block media-list\">Recommended for you"
strVar += "                     </form>"
strVar += "                  <\/div>";
strVar += '   <div id=\'invite-all-block\' class="row"> '
strVar += '        <div class="col-50"> '
strVar += '            <div class="button button-fill color-gray " style="height:44px;line-height:44px;" onclick="clearSelection()"><i class="fa fa-braille color-white" style="margin-right: 6px;" aria-hidden="true"></i>Clear</div> '
strVar += '        </div> '        
strVar += '        <div class="col-50"> '
strVar += '            <div class="button button-fill color-green " style="height:44px;line-height:44px;background:#63de9a;" onclick="top10Selection()"><i class="fa fa-list-ol color-white" style="margin-right: 6px;" aria-hidden="true"></i>Top 10</div> '
strVar += '        </div> '    
strVar += "        <div class= 'button color-pink one-line-button button-fill' style='width:100%;    margin: 15px auto;'  onclick='inviteAll()'> Let's go 🎉🎉🎉</div>"
strVar += '   </div>'     

strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "              <!-- Tab 5 -->";
strVar += "              <div id=\"more-tab\" class=\"tab\">";
strVar += "                <div class=\"content-block\">";
strVar += "                  <div class=\"page-content\" >";
strVar += "                    <div class=\"profile-image-container\" id=\"profile-pic-background\">";
strVar += "                    <\/div>";
strVar += "                    <div class=\"\">";
strVar += "                      <img onclick=\"changePicture()\" id=\"profile-pic\"class=\"profile-pic\" src=''>";
strVar += "                    <\/div>";
strVar += "                    <div class=\"user-name\" id=\"profile-name\">";
strVar += "";
strVar += "                    <\/div>";
strVar += "";
strVar += "                    <div class=\"edit-profile-text\" onclick=\"changePicture()\"> ";
strVar += "                      <b>Edit Profile Picture</b>";
strVar += "                    <\/div>";
strVar += "                    ";
strVar += "                    <div class=\"list-block media-list\">";
strVar += "                      <ul>";
// strVar += "                        <li onclick='mainView.router.loadPage({\"pageName\":\"availability-page\"})'>";
// strVar += "                          <div class=\"item-content\">";
// strVar += "                            <div class=\"item-media\">";
// strVar += "                              <i class=\"fa fa-calendar icon-background-badge\" style=\"background:lightgreen\"><\/i>";
// strVar += "                            <\/div>";
// strVar += "                            <div class=\"item-inner\">";
// strVar += "                              <div class=\"item-title-row\">";
// strVar += "                                <div class=\"item-title\">My Availability<\/div>";
// strVar += "                              <\/div>";
// strVar += "                              <div class=\"item-subtitle\">Let Timi know when you are generally free<\/div>";
// strVar += "                            <\/div>";
// strVar += "                          <\/div>";
// strVar += "                        <\/li>";
// strVar += "                        <li onclick='mainView.router.load({\"pageName\":\"nearby-list\"})'>";
// strVar += "                          <div class=\"item-content\">";
// strVar += "                            <div class=\"item-media\">";
// strVar += "                              <i class=\"fa fa-search icon-background-badge\" style=\"background:crimson\"><\/i>";
// strVar += "                            <\/div>";
// strVar += "                            <div class=\"item-inner\">";
// strVar += "                              <div class=\"item-title-row\">";
// strVar += "                                <div class=\"item-title\">People Nearby <span class='hot-badge'>NEW</span><\/div>";
// strVar += "                              <\/div>";
// strVar += "                              <div class=\"item-subtitle\">Discover people nearby<\/div><div id=\"unread-nearby-request\" class=\" badge\"><\/div>";
// strVar += "                            <\/div>";
// strVar += "                          <\/div>";
// strVar += "                        <\/li>";

// strVar += "                        <li onclick='inviteFriendsPopup()'>";
// strVar += "                          <div class=\"item-content\">";
// strVar += "                            <div class=\"item-media\">";
// strVar += "                              <i class=\"fa fa-user-plus\"><\/i>";
// strVar += "                            <\/div>";
// strVar += "                            <div class=\"item-inner\">";
// strVar += "                              <div class=\"item-title-row\">";
// strVar += "                                <div class=\"item-title\">Invite friends<\/div>";
// strVar += "                              <\/div>";
// strVar += "                              <div class=\"item-subtitle\">Get more friends to use Timi!<\/div>";
// strVar += "                            <\/div>";
// strVar += "                          <\/div>";
// strVar += "                        <\/li>";

strVar += "                        <li onclick='mainView.router.loadPage({\"pageName\":\"personal-setting-page\"})'>";
strVar += "                          <div class=\"item-content\">";
strVar += "                            <div class=\"item-media\">";
strVar += "                              <i class=\"fa fa-heart icon-background-badge\" style=\"background:#ec5298\"><\/i>";
strVar += "                            <\/div>";
strVar += "                            <div class=\"item-inner\">";
strVar += "                              <div class=\"item-title-row\">";
strVar += "                                <div class=\"item-title\">Personal Setting<\/div>";
strVar += "                              <\/div>";
strVar += "                              <div class=\"item-subtitle\">Favorite Activities, Prompt, and more<\/div>";
strVar += "                            <\/div>";
strVar += "                          <\/div>";
strVar += "                        <\/li>";
strVar += "                        <li onclick='window.open(\"sms:6178005220&body=Hi I have a question about Timi:\")'>";
strVar += "                          <div class=\"item-content\">";
strVar += "                            <div class=\"item-media\">";
strVar += "                              <i class=\"fa  fa-question-circle icon-background-badge\" style=\"background:#fc0\"><\/i>";
strVar += "                            <\/div>";
strVar += "                            <div class=\"item-inner\">";
strVar += "                              <div class=\"item-title-row\">";
strVar += "                                <div class=\"item-title\" '>Help<\/div>";
strVar += "                              <\/div>";
strVar += "                              <div class=\"item-subtitle\">FAQ, contact, and more<\/div>";
strVar += "                            <\/div>";
strVar += "                          <\/div>";
strVar += "                        <\/li>    ";
strVar += "                        <li>";
strVar += "                          <div class=\"item-content\" onclick=\"logout()\">";
strVar += "                            <div class=\"item-media\">";
strVar += "                              <i class=\"fa  fa-sign-out icon-background-badge\" style=\"background:lightgray\"><\/i>";
strVar += "                            <\/div>";
strVar += "                            <div class=\"item-inner\">";
strVar += "                              <div class=\"item-title-row\">";
strVar += "                                <div class=\"item-title\">Log out<\/div>";
strVar += "                              <\/div>";
strVar += "                              <div class=\"item-subtitle\">No, No, and more<\/div>";
strVar += "                            <\/div>";
strVar += "                          <\/div>";
strVar += "                        <\/li>                                                                          ";
strVar += "                      <\/ul>";
strVar += "                    <\/div>";
strVar += "                  <\/div>";
strVar += "                <\/div>";
strVar += "              <\/div>            ";
strVar += "            <\/div>";
strVar += "          <\/div>          ";
strVar += "          <div class=\"page no-navbar\" data-page=\"index\">";
strVar += "            <div class=\"page-content first-page\" >";
strVar += "<!--               <h1 class=\"title\">";
strVar += "              Timi                    ";
strVar += "              <\/h1> -->";
strVar += "              <img class=\"front-page-logo \" src = \"img\/timi.png\">";
strVar += "              <div class=\"gps-ring-startscreen\"></div>";
// strVar += "              <div class=\"one-line-prompt\">";
// strVar += "                Timi is the easiest way to get friends to hang out.";
// strVar += "              <\/div>";
// strVar += "              <div class=\"button facebook-login-button\" onclick=\"login()\">";
// strVar += "                <i class=\"fa fa-facebook\" aria-hidden=\"true\"><\/i>";
// strVar += "                <span class=\"text\">Continue with Facebook";
// strVar += "                <\/span>";
// strVar += "              <\/div>";
// strVar += "              <div class=\"no-facebook\" onclick=\"goToPersonalInfoPage()\">";
// strVar += "                I don't have a Facebook account";
// strVar += "              <\/div>";
strVar += "            <\/div>";
strVar += "          <\/div>  ";
strVar += "";
strVar += "          <div class=\"page cached \" data-page=\"availability-page\">";
strVar += "            <div class=\"page-content\" >";
strVar += "                    <div class=\"one-line-prompt\">";
strVar += "                      let Timi know when you are available! ";
strVar += "                    <\/div>                     ";
strVar += "                    <div class=\"calendar-table\">       ";
strVar += "                    <\/div>";
strVar += "            <\/div>";
strVar += "          <\/div>  ";
strVar += "          <div class=\"page cached \" data-page=\"pin-list\">";
strVar += "            <div class=\"page-content\" >";
strVar += "                         <div id=\"moment-list\" class=' list-block' >";
strVar += "                             <ul>";
strVar += "                             <\/ul>";
strVar += "                         <\/div>            ";
strVar += "            <\/div>";
strVar += "          <\/div>  ";
strVar += "          <div class=\"page cached \" data-page=\"personal-setting-page\">";
strVar += "            <div class=\"page-content\" >";
// strVar += "              <div class=\"content-block-title\">";
// strVar += "                <span>What's in your mind <a class=\"clear-whatsup\" onclick=\"cleanWhatsUp()\">clear all</a><a class=\"clear-whatsup\" onclick=\"randomWhatsup()\">No much?</a><\/span>";
// strVar += "              <\/div> ";
// strVar += "              <div class=\"list-block\" id=\"prompt-list-block\">";
// strVar += "                <ul>";
// strVar += "                  <li class=\"align-top\">";
// strVar += "                    <div class=\"item-content\">";
// strVar += "                      <div class=\"item-inner\">";
// strVar += "                        <div class=\"item-input\">";
// strVar += "                            <textarea class=\"resizable\" id=\"whatsup\" placeholder=\"Let your friends know what's in your mind. E.g., Let's Chipotle and chill? \"><\/textarea>";
// strVar += "                        <\/div>";
// strVar += "                      <\/div>";
// strVar += "                    <\/div>";
// strVar += "                  <\/li>";
// strVar += "                <\/ul>";
// strVar += "              <\/div>                       ";
strVar += "";
strVar += "              <div class=\"content-block-title\">";
strVar += "                <span>My School<\/span>";
strVar += "              <\/div> ";
strVar += "              <div class=\"list-block\" id=\"prompt-list-block\">";
strVar += "                <ul>";
strVar += "                  <li class=\"align-top\">";
strVar += "                    <div class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-input\">";
strVar += "                            <textarea class=\"resizable\" id=\"current\" placeholder=\"Where do you work / where do you go to school? \"><\/textarea>";
strVar += "                        <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                  <\/li>";
strVar += "                <\/ul>";
strVar += "              <\/div>                       ";
strVar += "";
strVar += "              <div class=\"content-block-title\">";
strVar += "                <span>Privacy<\/span>";
strVar += "              <\/div> ";
strVar += "              <div class=\"list-block\" id=\"prompt-list-block\">";
strVar += "                <ul>";
strVar += '                 <li> ';
strVar += '                   <div class="item-content"> ';
strVar += '                     <div class="item-inner"> ';
strVar += '                       <div class="item-title label" style="width:80%;">Show Friends of Friends</div> ';
strVar += '                       <div class="item-input"> ';
strVar += '                         <label class="label-switch" style="position: absolute;right: 20px; top: 8px;"> ';
strVar += '                           <input type="checkbox" id="allowFoF"> ';
strVar += '                           <div class="checkbox"></div> ';
strVar += '                         </label> ';
strVar += '                       </div> ';
strVar += '                     </div> ';
strVar += '                   </div> ';
strVar += '                 </li> ';
// strVar += '                 <li> ';
// strVar += '                   <div class="item-content"> ';
// strVar += '                     <div class="item-inner"> ';
// strVar += '                       <div class="item-title label" style="width:80%;">Mute Notification Sound</div> ';
// strVar += '                       <div class="item-input"> ';
// strVar += '                         <label class="label-switch" style="position: absolute;right: 20px; top: 8px;"> ';
// strVar += '                           <input type="checkbox" id="muteSound"> ';
// strVar += '                           <div class="checkbox"></div> ';
// strVar += '                         </label> ';
// strVar += '                       </div> ';
// strVar += '                     </div> ';
// strVar += '                   </div> ';
// strVar += '                 </li> ';
strVar += "                <\/ul>";
strVar += "              <\/div>";

strVar += "   ";
strVar += "";
// strVar += "              <div class=\"content-block-title\">";
// strVar += "                <span>Maximum Distance<\/span>";
// strVar += "                <span style=\"float:right\" id=\"distance-value\">5mi.<\/span>";
// strVar += "              <\/div>";
// strVar += "              <div class=\"list-block\">";
// strVar += "                <ul>";
// strVar += "                  <li>";
// strVar += "                    <div class=\"item-content\">                ";
// strVar += "                      <div class=\"item-inner\">";
// strVar += "                        <div class=\"item-input\">";
// strVar += "                            <input";
// strVar += "                                type=\"range\"";
// strVar += "                                min=\"5\"                    \/\/ default 0";
// strVar += "                                max=\"75\"                  \/\/ default 100";
// strVar += "                                step=\"1\"                   \/\/ default 1";
// strVar += "                                value=\"10\"                 \/\/ default min + (max-min)\/2";
// strVar += "                                data-orientation=\"horizontal\" \/\/ default horizontal";
// strVar += "                                onchange=\"updateDistanceValue()\"";
// strVar += "                                oninput=\"updateDistanceValue()\"";
// strVar += "                                id=\"distance-range\"";
// strVar += "";
// strVar += "                            >";
// strVar += "                        <\/div>  ";
// strVar += "                      <\/div>      ";
// strVar += "                    <\/div>           ";
// strVar += "                  <\/li>";
// strVar += "                <\/ul>";
// strVar += "              <\/div>";
strVar += "              <div class=\"content-block-title\">";
strVar += "                <span>Favorite Activities <a id=\"favorite-food-prompt\" class=\"clear-whatsup\"></a><\/span>";
strVar += "              <\/div>            ";
strVar += "              <form class=\"list-block\" id=\"favorite-food\">";
strVar += "                <ul>";
strVar += "                  <li>";
strVar += "                    <label class=\"label-checkbox item-content\">";
strVar += "                      <input type=\"checkbox\" name=\"my-checkbox\" value=\"Books\">";
strVar += "                      <div class=\"item-media\">";
strVar += "                        <i class=\"icon icon-form-checkbox\"><\/i>";
strVar += "                      <\/div>";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-title\">Books<\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/label>";
strVar += "                  <\/li>";
strVar += "                <\/ul>";
strVar += "              <\/form>                 ";
strVar += "            <\/div>";
strVar += "          <\/div>          ";
strVar += "          <div class=\"page cached\" data-page=\"verification-code\">";
strVar += "            <div class=\"page-content\">";
strVar += "              <form  class=\"list-block\">";
strVar += "                <ul>";
strVar += "                  <li>";
strVar += "                    <div class=\"item-content\">";
strVar += "                      <div class=\"item-inner\">";
strVar += "                        <div class=\"item-input\">";
strVar += "                          <input id=\"verification-code-input\" type=\"tel\" name=\"verification-code\" placeholder=\"Verification Code\">";
strVar += "                        <\/div>";
strVar += "                      <\/div>";
strVar += "                    <\/div>";
strVar += "                  <\/li>             ";
strVar += "                <\/ul>";
strVar += "              <\/form>         ";
strVar += "              <div class=\"button one-line-button color-pink \" onclick=\"verifyCode()\">";
strVar += "                SUBMIT";
strVar += "              <\/div>               ";
strVar += "              <div class=\"button one-line-button color-gray \" onclick=\"resendCode()\">";
strVar += "                Resend";
strVar += "              <\/div>               ";
strVar += "            <\/div>";
strVar += "";
strVar += "          <\/div>";
strVar += "          <div class=\"page cached\" data-page=\"restaurant-page\">";
strVar += "            <div class=\"page-content contacts-content restaurant-page-content\">";
strVar += "               <div class=\"list-block contacts-block\">"; 
strVar += '                  <div class="list-group"> ';
strVar += '                        <ul> ';
// strVar += '                          <li class="list-group-title"> ';
strVar += "                        <div id=\"restaurant-picture-list\">"; 
strVar += "                        </div>"
strVar += '                        <div id="action-bar"><div id="like-restaurant-button"><i class="fa fa-heart"></i></div></div>'

strVar += '                        <div class="restaurant-info-group" style="border-bottom: 1px solid #e6e7e8;" >'

strVar += '                          <div class="row restaurant-info-bar">'

strVar += '                             <div class="col-33 "><div class="col-title" id="restaurant-page-distance">1.7mi</div><div class="col-subtitle">from you</div>'
strVar += '                             </div>'
strVar += '                             <div class="col-33 "><div class="col-title" id="restaurant-page-dollar">$$$</div><div class="col-subtitle">price</div>'
strVar += '                             </div>'
strVar += '                             <div class="col-33 "><div class="col-title" id="restaurant-page-star">4 stars</div><div class="col-subtitle">rating</div>'
strVar += '                             </div>'

strVar += '                          </div>'
strVar += '                        </div>'
// strVar += '                        </li> ';
// strVar += '                          <li> ';
// strVar += '                          <div class=\"restaurant-title\" id=\"restaurant-name\">Restaurant Name</div> ';
// strVar += '                          <div class=\"restaurant-subtitle\" id=\"\">Restaurant Name</div> ';
// strVar += '                          <div class=\"restaurant-subtitle\">Restaurant Name</div> ';

strVar +=                       '    <div id="restaurant-info-group" class="list-block restaurant-info-text-block"> '
strVar +=                       '      <ul style="padding-left: 0"> '
// strVar +=                       '        <li class="item-content" id="restaurant-page-address-li"> '
// strVar +=                       '          <div class="item-media"><i class="fa fa-map"></i></div> '
// strVar +=                       '          <div class="item-inner"> '
// strVar +=                       '            <div class="item-after restaurant-info-text" id="restaurant-page-address">Label</div> '
// strVar +=                       '          </div> '
// strVar +=                       '        </li> '
// strVar +=                       '        <li class="item-content" id="restaurant-page-phone-li"> '
// strVar +=                       '          <div class="item-media"><i class="fa fa-phone"></i></div> '
// strVar +=                       '          <div class="item-inner"> '
// strVar +=                       '            <div class="item-after restaurant-info-text" id="restaurant-page-phone"></div> '
// strVar +=                       '          </div> '
// strVar +=                       '        </li> '
// strVar +=                       '        <li class="item-content" id="restaurant-page-website-li"> '
// strVar +=                       '          <div class="item-media"><i class="fa fa-at"></i></div> '
// strVar +=                       '          <div class="item-inner"> '
// strVar +=                       '            <div class="item-after restaurant-info-text" id="restaurant-page-website"></div> '
// strVar +=                       '          </div> '
// strVar +=                       '        </li> '
// strVar +=                       '        <li class="item-content" id="restaurant-page-yelp-li"> '
// strVar +=                       '          <div class="item-media"><i class="fa fa-yelp"></i></div> '
// strVar +=                       '          <div class="item-inner"> '
// strVar +=                       '            <div class="item-after restaurant-info-text" id="restaurant-page-yelp"></div> '
// strVar +=                       '          </div> '
// strVar +=                       '        </li> '
strVar +=                       '      </ul> '
strVar +=                       '    </div> '
strVar += '                        <div id="friend-restaurant-list"></div>'
strVar += '                        <div id="restaurant-map"></div>'
strVar += '                        <div id="restaurant-description"></div>'
strVar += '                        <div id="restaurant-hours"></div>'
// strVar += '                        <div class="restaurant-page-title">Recommended'
// strVar += '                        </div>'
strVar += '                        <div id="restaurant-recommend-menu"></div>'
strVar += '                        <div id="restaurant-gallery-title"></div>'
strVar += '                        <div id="restaurant-gallery"></div>'

// strVar += "<iframe src='http://www.opentable.com/red-egg-reservations-new-york?restref=27763'></iframe>"

// strVar += '                          <li> ';
// strVar += '                            <div class="item-content"> ';
// strVar += '                              <div class="item-inner"> ';
// strVar += '                        <div class="restaurant-page-title">TOP PICKS'
// strVar += '                        </div>'

// strVar += '                        </li> ';
// strVar += '                              </div> ';
// strVar += '                            </div> ';
// strVar += '                          </li> ';
strVar += '                        </ul> ';
strVar += "                   </div>"
strVar += "               </div>"



// strVar += "            <\/div>";
strVar += "";
strVar += "          <\/div>";
strVar += '                        <div id="reserve-button" class="modern-square-button" style="background: rgb(99, 222, 154);">Reserve Online</div>'
strVar += '                        <div id="reserve-button-background"  ></div>'
strVar += "          <div class=\"page cached\" data-page=\"ask-calendar\">";
strVar += "            <div class=\"page-content\">";
strVar += "              <div class=\"one-line-prompt\">";
strVar += "                Let Timi know when to match you with your friends! ";
strVar += "              <\/div>                     ";
strVar += "              <div class=\"calendar-table\">       ";
strVar += "              <\/div>";
strVar += "            <\/div>";
strVar += "          <\/div>     ";
strVar += "          <div class=\"page cached toolbar-fixed\" data-page=\"chatting-page\">";
strVar += "            <div class=\"toolbar messagebar\">";
strVar += "              <div class=\"toolbar-inner\">";
strVar += "                <textarea placeholder=\"Message\"><\/textarea><a id=\"message-bar-button\" href=\"#\" style=\"color:#464748 !important;font-weight: 500;\" class=\"link\">Send<\/a>";
strVar += "              <\/div>";
strVar += "            <\/div>            ";
strVar += "            <div class=\"page-content messages-content \" >"; 
strVar += "              <div class=\"messages\" >";
strVar += "              <\/div>";
strVar += "            <\/div>";
strVar += "          <\/div>          ";
strVar += "          <div class=\"page cached\" data-page=\"push-notification\">";
strVar += "            <div class=\"page-content\">";
strVar += "              Please allow Push Notification so that you know when you are paired with a friend! ";
strVar += "            <\/div>";
strVar += "          <\/div>              ";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "    <\/div>";
strVar += "    <div class=\"popup popup-intro \">";
strVar += "";
strVar += "      <div class=\"swiper-container swiper-init\">";
strVar += "          <div class=\"swiper-wrapper\">";
strVar += "              <div class=\"swiper-slide\">";
strVar += "                <img class= \"screenshot-img lazy\" src=\"img/screenshot/5.5-inch-1.png\">";
strVar += "<!--                 <div class=\"one-line-prompt\"> ";
strVar += "                  Timi helps you quickly find friends to hang out!";
strVar += "                <\/div> -->";
strVar += "                ";
strVar += "              <\/div>";
strVar += "              <div class=\"swiper-slide\">";
strVar += "                <img class= \"screenshot-img lazy\" src=\"img/screenshot/5.5-inch-2.png\">";
strVar += "<!--                 <div class=\"one-line-prompt\"> ";
strVar += "                  Anonymously \"Like\" or \"Pass\"";
strVar += "                <\/div> -->";
strVar += "              <\/div>";
strVar += "              <div class=\"swiper-slide\">";
strVar += "                <img class= \"screenshot-img lazy\" src=\"img/screenshot/5.5-inch-3.png\">";
strVar += "<!--                 <div class=\"one-line-prompt\"> ";
strVar += "                  We'll let you know if someone likes you back";
strVar += "                <\/div> -->";
strVar += "              <\/div>";
strVar += "              <div class=\"swiper-slide\">";
strVar += "                <img class= \"screenshot-img lazy\" src=\"img/screenshot/5.5-inch-4.png\">";
strVar += "<!--                 <div class=\"one-line-prompt\"> ";
strVar += "                  We'll let you know if someone likes you back";
strVar += "                <\/div> -->";
strVar += "              <\/div>              ";
// strVar += "              <div class=\"swiper-slide\">";
// strVar += "                <img class= \"screenshot-img lazy\" src=\"img/screenshot/5.5-inch-5.png\">";
// strVar += "<!--                 <div class=\"one-line-prompt\"> ";
// strVar += "                  We'll let you know if someone likes you back";
// strVar += "                <\/div> -->";
// strVar += "              <\/div>              ";
strVar += "          <\/div>";
strVar += "          <div class=\"swiper-pagination\"><\/div>";
strVar += "      <\/div>  ";
strVar += "      <div class=\"one-line-prompt\"> ";
strVar += "        By signing in you agree with our <a onclick='tos()'>Terms of Service</a>";
strVar += "      <\/div>";
strVar += "      <div class=\"button facebook-login-button-tutorial\" onclick=\"login()\">";
strVar += "        <i class=\"fa fa-facebook\" aria-hidden=\"true\"><\/i>";
strVar += "        <span class=\"text\">Continue with Facebook";
strVar += "        <\/span>";
strVar += "      <\/div> ";
strVar += "      <div class=\"one-line-prompt color-gray\" style=\"margin-top: 15px;\" onclick=\"signupEmail()\"> ";
strVar += "        Continue with Email";
strVar += "      <\/div>      ";
strVar += "    <\/div>";
strVar += "  <\/div>";
strVar += "  <div class=\"popup popup-services\"> "
strVar += "    <div class=\"content-block\"> <div class='button one-line-button color-pink' onclick='myApp.closeModal(\".popup-services\")'>Close</div>"
strVar += "         <p>Welcome to Timi, operated by Timi, Inc. (the &ldquo;Company&rdquo; or &ldquo;Timi&rdquo;). By creating a Timi account, whether through a mobile device, mobile application or computer (collectively, the &ldquo;Service&rdquo;) you agree to be bound by these Terms of Use (this &ldquo;Agreement&rdquo;). If you wish to create a Timi account and make use of the Service, please read this Agreement. You should also read the Timi Privacy Policy, which is incorporated by reference into this Agreement and available in the Service. If you do not accept and agree to be bound by all of the terms of this Agreement, including the Timi Privacy Policy, do not use the Service. Please contact us with any questions regarding this Agreement. Acceptance of Terms of Use Agreement.  a. This Agreement is an electronic contract that establishes the legally binding terms you must accept to use the Service. This Agreement includes the Company&rsquo;s (i) Privacy Policy, (ii) our Safety Tips and (iii) terms disclosed and agreed to by you if you purchase or accept additional features, products or services we offer on the Service, such as terms governing features, billing, free trials, discounts and promotions. b. By accessing or using the Service, you accept this Agreement and agree to the terms, conditions and notices contained or referenced herein and consent to have this Agreement and all notices provided to you in electronic form. To withdraw this consent, you must cease using the Service and terminate your account. Please print a copy of this Agreement for your records. To receive a non-electronic copy of this Agreement, please contact us at help@gettimi.com. c. We may, at any time and for any reason make changes to this Agreement. We may do this for a variety of reasons including to reflect changes in or requirements of the law, new features, or changes in business practices. The most recent version of this Agreement will be posted on the Services under Settings and also on gettimi.com, and you should regularly check for the most recent version. The most recent version is the version that applies. If the changes include material changes that affect your rights or obligations, we will notify you of the changes by reasonable means, which could include notification through the Services or via email. If you continue to use the Services after the changes become effective, then you shall be deemed to have accepted those changes. If you don&rsquo;t agree to these changes, you must end your relationship with us (without penalty) by ceasing to use the Services and leaving Timi. Additionally, if we update or upgrade the Services, you may be required to accept the most recent version of the Agreement to access the updated or upgraded Services.  Eligibility. No part of Timi is directed to persons under the age of 13. You must be at least 13 years of age to access and use the Service. Any use of the Service is void where prohibited. By accessing and using the Service, you represent and warrant that you have the right, authority and capacity to enter into this Agreement and to abide by all of the terms and conditions of this Agreement. If you create an account, you represent and warrant that you have never been convicted of a felony and that you are not required to register as a sex offender with any government entity. Using the Service may be prohibited or restricted in certain countries. If you use the Service from outside of the United States, you are responsible for complying with the laws and regulations of the territory from which you access or use the Service. Creating an Account. In order to use Timi, you must have or create a Facebook account and sign in using your Facebook login. If you do so, you authorize us to access and use certain Facebook account information, including but not limited to your public Facebook profile and information about Facebook friends you might share in common with other Timi users. </p> " 
strVar += "         <p>Term and Termination. This Agreement will remain in full force and effect while you use the Service and/or have a Timi account. You may terminate your account at any time, for any reason, by following the instructions in &ldquo;Settings&rdquo; in the Service. The Company may terminate or suspend your account at any time without notice if the Company believes that you have breached this Agreement, or for any other reason, in its sole discretion. Upon such termination or suspension, you will not be entitled to any refund of unused fees for in app purchases. The Company is not required to disclose, and may be prohibited by law from disclosing, the reason for the termination or suspension of your account. After your account is terminated, this Agreement will terminate, except that the following provisions will still apply: Section 4, Section 8, Section 9(e), Section 15, and Sections 17-19. Non-commercial Use by Users. The Service is for personal use only. Users may not use the Service or any content contained in the Service (including, but not limited to, content of other users, designs, text, graphics, images, video, information, logos, software, audio files and computer code) in connection with any commercial endeavors, such as (i) advertising or soliciting any user to buy or sell any products or services not offered by the Company or (ii) soliciting others to attend parties or other social functions, or networking, for commercial purposes. Users of the Service may not use any information obtained from the Service to contact, advertise to, solicit, or sell to any other user without his or her prior explicit consent. Organizations, companies, and/or businesses may not use the Service or the Service for any purpose except with Timi&rsquo;s express consent (such as for promoted profiles or other advertisements), which Timi may provide or deny in its sole discretion. The Company may investigate and take any available legal action in response to illegal and/or unauthorized uses of the Service, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email and unauthorized framing of or linking to the Service. Account Security. You are responsible for maintaining the confidentiality of the username and password you designate during the registration process, and you are solely responsible for all activities that occur under your username and password. You agree to immediately notify the Company of any disclosure or unauthorized use of your username or password or any other breach of security at help@gettimi.com and ensure that you log out from your account at the end of each session. Your Interactions with Other Users.   YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER USERS. YOU UNDERSTAND THAT THE COMPANY CURRENTLY DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS OR SCREENINGS ON ITS USERS. THE COMPANY ALSO DOES NOT INQUIRE INTO THE BACKGROUNDS OF ALL OF ITS USERS OR ATTEMPT TO VERIFY THE STATEMENTS OF ITS USERS. THE COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF USERS OR THEIR COMPATIBILITY WITH ANY CURRENT OR FUTURE USERS. THE COMPANY RESERVES THE RIGHT TO CONDUCT ANY CRIMINAL BACKGROUND CHECK OR OTHER SCREENINGS (SUCH AS SEX OFFENDER REGISTER SEARCHES), AT ANY TIME AND USING AVAILABLE PUBLIC RECORDS. The Company is not responsible for the conduct of any user. As noted in and without limiting Sections 15 and 17 below, in no event shall the Company, its affiliates or its partners be liable (directly or indirectly) for any losses or damages whatsoever, whether direct, indirect, general, special, compensatory, consequential, and/or incidental, arising out of or relating to the conduct of you or anyone else in connection with the use of the Service including, without limitation, death, bodily injury, emotional distress, and/or any other damages resulting from communications or meetings with other users or persons you meet through the Service. You agree to take all necessary precautions in all interactions with other users, particularly if you decide to communicate off the Service or meet in person, or if you decide to send money to another user. In addition, you agree to review and follow the Company's Safety Tips, located in the Service, prior to using the Service. You understand that the Company makes no guarantees, either express or implied, regarding your ultimate compatibility with individuals you meet through the Service. You should not provide your financial information (for example, your credit card or bank account information), or wire or otherwise send money, to other users. Proprietary Rights. The Company owns and retains all proprietary rights in the Service, and in all content, trademarks, trade names, service marks and other intellectual property rights related thereto. The Service contains the copyrighted material, trademarks, and other proprietary information of the Company and its licensors. You agree to not copy, modify, transmit, create any derivative works from, make use of, or reproduce in any way any copyrighted material, trademarks, trade names, service marks, or other intellectual property or proprietary information accessible through the Service, without first obtaining the prior written consent of the Company or, if such property is not owned by the Company, the owner of such intellectual property or proprietary rights. You agree to not remove, obscure or otherwise alter any proprietary notices appearing on any content, including copyright, trademark and other intellectual property notices. Content Posted by You in the Service. You are solely responsible for the content and information that you post, upload, publish, link to, transmit, record, display or otherwise make available (hereinafter, &ldquo;post&rdquo;) on the Service or transmit to other users, including text messages, chat, videos (including streaming videos), photographs, or profile text, whether publicly posted or privately transmitted (collectively, &ldquo;Content&rdquo;). You may not post as part of the Service, or transmit to the Company or any other user (either on or off the Service), any offensive, inaccurate, incomplete, abusive, obscene, profane, threatening, intimidating, harassing, racially offensive, or illegal material, or any material that infringes or violates another person&rsquo;s rights (including intellectual property rights, and rights of privacy and publicity). You represent and warrant that (i) all information that you submit upon creation of your account, including information submitted from your Facebook account, is accurate and truthful and that you will promptly update any information provided by you that subsequently becomes inaccurate, incomplete, misleading or false and (ii) you have the right to post the Content on the Service and grant the licenses set forth below. You understand and agree that the Company may, but is not obligated to, monitor or review any Content you post as part of a Service. The Company may delete any Content, in whole or in part, that in the sole judgment of the Company violates this Agreement or may harm the reputation of the Service or the Company. By posting Content as part of the Service, you automatically grant to the Company, its affiliates, licensees and successors, a non-exclusive, transferable, sub-licensable, fully paid-up, worldwide right and license to (i) use, copy, store, perform, display, reproduce, record, play, adapt, modify and distribute the Content, (ii) prepare derivative works of the Content or incorporate the Content into other works, and (iii) grant and authorize sublicenses of the foregoing in any media now known or hereafter created. You represent and warrant that any posting and use of your Content by the Company will not infringe or violate the rights of any third party. In addition to the types of Content described in Section 9(a) above, the following is a partial list of the kind of Content that is prohibited in the Service. You may not post, upload, display or otherwise make available Content that: that promotes racism, bigotry, hatred or physical harm of any kind against any group or individual; advocates harassment or intimidation of another person; requests money from, or is intended to otherwise defraud, other users of the Service; involves the transmission of &ldquo;junk mail&rdquo;, &ldquo;chain letters,&rdquo; or unsolicited mass mailing or &ldquo;spamming&rdquo; (or &ldquo;spimming&rdquo;, &ldquo;phishing&rdquo;, &ldquo;trolling&rdquo; or similar activities); promotes information that is false or misleading, or promotes illegal activities or conduct that is defamatory, libelous or otherwise objectionable; promotes an illegal or unauthorized copy of another person&rsquo;s copyrighted work, such as providing pirated computer programs or links to them, providing information to circumvent manufacture-installed copy-protect devices, or providing pirated images, audio or video, or links to pirated images, audio or video files; contains video, audio photographs, or images of another person without his or her permission (or in the case of a minor, the minor&rsquo;s legal guardian); contains restricted or password only access pages, or hidden pages or images (those not linked to or from another accessible page); provides material that exploits people in a sexual, violent or other illegal manner, or solicits personal information from anyone under the age of 18; provides instructional information about illegal activities such as making or buying illegal weapons or drugs, violating someone&rsquo;s privacy, or providing, disseminating or creating computer viruses; contains viruses, time bombs, trojan horses, cancelbots, worms or other harmful, or disruptive codes, components or devices; impersonates, or otherwise misrepresents affiliation, connection or association with, any person or entity; provides information or data you do not have a right to make available under law or under contractual or fiduciary relationships (such as inside information, proprietary and confidential information); disrupts the normal flow of dialogue, causes a screen to &ldquo;scroll&rdquo; faster than other users are able to type, or otherwise negatively affects other users&rsquo; ability to engage in real time exchanges; solicits passwords or personal identifying information for commercial or unlawful purposes from other users or disseminates another person&rsquo;s personal information without his or her permission; and publicizes or promotes commercial activities and/or sales without our prior written consent such as contests, sweepstakes, barter, advertising, and pyramid schemes. The Company reserves the right, in its sole discretion, to investigate and take any legal action against anyone who violates this provision, including removing the offending communication from the Service and terminating or suspending the account of such violators. Your use of the Service, including all Content you post through the Service, must comply with all applicable laws and regulations. You agree that the Company may access, preserve and disclose your account information and Content if required to do so by law or in a good faith belief that such access, preservation or disclosure is reasonably necessary, such as to: (i) comply with legal process; (ii) enforce this Agreement; (iii) respond to claims that any Content violates the rights of third parties; (iv) respond to your requests for customer service or allow you to use the Service in the future; or (v) protect the rights, property or personal safety of the Company or any other person. You agree that any Content you place on the Service may be viewed by other users and may be viewed by any person visiting or participating in the Service (such as individuals who may receive shared Content from other Timi users).  Prohibited Activities. The Company reserves the right to investigate, suspend and/or terminate your account if you have misused the Service or behaved in a way the Company regards as inappropriate or unlawful, including actions or communications the occur off the Service but involve users you meet through the Service. The following is a partial list of the type of actions that you may not engage in with respect to the Service. You will not: impersonate any person or entity. solicit money from any users. post any Content that is prohibited by Section 9. &ldquo;stalk&rdquo; or otherwise harass any person. express or imply that any statements you make are endorsed by the Company without our specific prior written consent. use the Service in an illegal manner or to commit an illegal act; access the Service in a jurisdiction in which it is illegal or unauthorized; ask or use users to conceal the identity, source, or destination of any illegally gained money or products. use any robot, spider, site search/retrieval application, or other manual or automatic device or process to retrieve, index, &ldquo;data mine&rdquo;, or in any way reproduce or circumvent the navigational structure or presentation of the Service or its contents. collect usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email or unauthorized framing of or linking to the Service. interfere with or disrupt the Service or the servers or networks connected to the Service. email or otherwise transmit any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment. forge headers or otherwise manipulate identifiers in order to disguise the origin of any information transmitted to or through the Service (either directly or indirectly through use of third party software). &ldquo;frame&rdquo; or &ldquo;mirror&rdquo; any part of the Service, without the Company's prior written authorization. use meta tags or code or other devices containing any reference to the Company or the Service (or any trademark, trade name, service mark, logo or slogan of the Company) to direct any person to any other website for any purpose. modify, adapt, sublicense, translate, sell, reverse engineer, decipher, decompile or otherwise disassemble any portion of the Service any software used on or for the Service, or cause others to do so. post, use, transmit or distribute, directly or indirectly, (e.g. screen scrape) in any manner or media any content or information obtained from the Service other than solely in connection with your use of the Service in accordance with this Agreement.  Customer Service. The Company provides assistance and guidance through its customer care representatives. When communicating with our customer care representatives, you agree to not be abusive, obscene, profane, offensive, sexist, threatening, harassing, racially offensive, or to not otherwise behave inappropriately. If we feel that your behavior towards any of our customer care representatives or other employees is at any time threatening or offensive, we reserve the right to immediately terminate your account.  In App Purchases. Generally. From time to time, Timi may offer additional products and services for purchase (&ldquo;in app purchases&rdquo;) through the App Store &#8480;, Google Play or other application platforms authorized by Timi (each, a &ldquo;Software Store&rdquo;). If you choose to make an in app purchase, you will be prompted to enter details for your account with the mobile platform you are using (e.g., Apple, Android, etc.) (&ldquo;your IAP Account&rdquo;), and your IAP Account will be charged for the in app purchase in accordance with the terms disclosed to you at the time of purchase as well as the general terms for in app purchases that apply to your IAP Account. In app purchases may include a free trial period. At the end of the free trial period, you will be charged the price of the subscription and will continue to be charged until you cancel your subscription. To avoid any charges, you must cancel before the end of the trial period. If you purchase an auto-recurring periodic subscription through an in app purchase, your IAP Account will be billed continuously for the subscription until you cancel in accordance with the platform terms. In all cases, please refer to the terms of your application platform which apply to your in app purchases. Super Likes and Other Virtual Items. From time to time, you may be able to purchase, with &ldquo;real world&rdquo; money, a limited, personal, non-transferable, non-sublicensable, revocable license to use &ldquo;virtual items&rdquo;, including but not limited to Super Likes (collectively, &ldquo;Virtual Items&rdquo;). You are only allowed to purchase Virtual Items from us or our authorized partners through the Service and not in any other way. Regardless of the terminology used, Virtual Items represent a limited license right governed by this Agreement. Except as otherwise prohibited by applicable law, Virtual Items obtained by you are licensed to you, and you hereby acknowledge that no title or ownership in or to Virtual Items is being transferred or assigned hereunder. This Agreement should not be construed as a sale of any rights in Virtual Items. Any Virtual Item balance shown in your account does not constitute a real-world balance or reflect any stored value, but instead constitutes a measurement of the extent of your license. Virtual Items do not incur fees for non-use; provided, however, that the license granted hereunder to Virtual Items will terminate in accordance with the terms and conditions of this Agreement, when Timi ceases providing the Service or this Agreement or your Account is otherwise terminated. Timi, in its sole discretion, reserves the right to charge fees for the right to access or use Virtual Items and/or may distribute Virtual Items with or without charge. You may purchase Virtual Items only within the Service or through a Software Store. Purchase and use of Virtual Items through a Software Store are subject to such Software Store&rsquo;s governing documents, including but not limited to its terms of service and privacy policy. Timi may manage, regulate, control, modify or eliminate Virtual Items at any time. Timi shall have no liability to you or any third party in the event that Timi exercises any such rights. The transfer of Virtual Items is prohibited, and you shall not sell, redeem or otherwise transfer Virtual Items to any person or entity. Virtual Items may only be redeemed through the Service. ALL PURCHASES AND REDEMPTIONS OF VIRTUAL ITEMS MADE THROUGH THE SERVICE ARE FINAL AND NON-REFUNDABLE. The provision of Virtual Items for use in the Service is a service provided by Timi that commences immediately upon the acceptance of your purchase of such Virtual Items. You agree to pay all fees and applicable taxes incurred by you or anyone using your Timi account. Timi may revise the pricing for the goods and services offered through the Service at any time. YOU ACKNOWLEDGE THAT Timi IS NOT REQUIRED TO PROVIDE A REFUND FOR ANY REASON, AND THAT YOU WILL NOT RECEIVE MONEY OR OTHER COMPENSATION FOR UNUSED VIRTUAL ITEMS WHEN AN ACCOUNT IS CLOSED, WHETHER SUCH CLOSURE WAS VOLUNTARY OR INVOLUNTARY.  Modifications to Service. The Company reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that the Company shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service. To protect the integrity of the Service, the Company reserves the right at any time in its sole discretion to block users from certain IP addresses from accessing the Service.  Copyright Policy; Notice and Procedure for Making Claims of Copyright Infringement. You may not post, distribute, or reproduce in any way any copyrighted material, trademarks, or other proprietary information without obtaining the prior written consent of the owner of such proprietary rights. Without limiting the foregoing, if you believe that your work has been copied and posted on the Service in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information: an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest; a description of the copyrighted work that you claim has been infringed; a description of where the material that you claim is infringing is located on the Service (and such description must be reasonably sufficient to enable the Company to find the alleged infringing material, such as a url); your address, telephone number and email address; a written statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf. Notice of claims of copyright infringement should be provided to the Company&rsquo;s Copyright Agent at copyright@match.com or the following address: </p>"
strVar += "         <p>Copyright Agent  c/o Timi Legal  P.O. Box 25458  Dallas, Texas 75225. The Company will terminate the accounts of repeat infringers.  Disclaimers. You acknowledge and agree that neither the Company nor its affiliates and third party partners are responsible for and shall not have any liability, directly or indirectly, for any loss or damage, including personal injury or death, as a result of or alleged to be the result of (i) any incorrect or inaccurate Content posted in the Service, whether caused by users or any of the equipment or programming associated with or utilized in the Service; (ii) the timeliness, deletion or removal, incorrect delivery or failure to store any Content, communications or personalization settings; (iii) the conduct, whether online or offline, of any user; (iv) any error, omission or defect in, interruption, deletion, alteration, delay in operation or transmission, theft or destruction of, or unauthorized access to, any user or user communications; or (v) any problems, failure or technical malfunction of any telephone network or lines, computer online systems, servers or providers, computer equipment, software, failure of email or players on account of technical problems or traffic congestion on the Internet or at any website or combination thereof, including injury or damage to users or to any other person&rsquo;s computer or device related to or resulting from participating or downloading materials in connection with the Internet and/or in connection with the Service. TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, THE COMPANY PROVIDES THE SERVICE ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS AND GRANTS NO WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE WITH RESPECT TO THE SERVICE (INCLUDING ALL CONTENT CONTAINED THEREIN), INCLUDING (WITHOUT LIMITATION) ANY IMPLIED WARRANTIES OF SATISFACTORY QUALITY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. THE COMPANY DOES NOT REPRESENT OR WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR FREE, SECURE OR THAT ANY DEFECTS OR ERRORS IN THE SERVICE WILL BE CORRECTED. ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICE IS ACCESSED AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR AND HEREBY WAIVE ANY AND ALL CLAIMS AND CAUSES OF ACTION WITH RESPECT TO ANY DAMAGE TO YOUR DEVICE, COMPUTER SYSTEM, INTERNET ACCESS, DOWNLOAD OR DISPLAY DEVICE, OR LOSS OR CORRUPTION OF DATA THAT RESULTS OR MAY RESULT FROM THE DOWNLOAD OF ANY SUCH MATERIAL. IF YOU DO NOT ACCEPT THIS LIMITATION OF LIABILITY, YOU ARE NOT AUTHORIZED TO DOWNLOAD OR OBTAIN ANY MATERIAL THROUGH THE SERVICE. From time to time, the Company may make third party opinions, advice, statements, offers, or other third party information or content available through the Service. All third party content is the responsibility of the respective authors thereof and should not necessarily be relied upon. Such third party authors are solely responsible for such content. THE COMPANY DOES NOT: (I) GUARANTEE THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY THIRD PARTY CONTENT PROVIDED THROUGH THE SERVICE, OR (II) ADOPT, ENDORSE OR ACCEPT RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY OPINION, ADVICE, OR STATEMENT MADE BY ANY PARTY THAT APPEARS IN THE SERVICE. UNDER NO CIRCUMSTANCES WILL THE COMPANY OR ITS AFFILIATES BE RESPONSIBLE OR LIABLE FOR ANY LOSS OR DAMAGE RESULTING FROM YOUR RELIANCE ON INFORMATION OR OTHER CONTENT POSTED IN THE SERVICE, OR TRANSMITTED TO OR BY ANY USERS. In addition to the preceding paragraph and other provisions of this Agreement, any advice that may be posted in the Service is for informational and entertainment purposes only and is not intended to replace or substitute for any professional financial, medical, legal, or other advice. The Company makes no representations or warranties and expressly disclaims any and all liability concerning any treatment, action by, or effect on any person following the information offered or provided within or through the Service. If you have specific concerns or a situation arises in which you require professional or medical advice, you should consult with an appropriately trained and qualified specialist.  Links. The Service may contain, and the Service or third parties may provide, advertisements and promotions offered by third parties and links to other web sites or resources. You acknowledge and agree that the Company is not responsible for the availability of such external websites or resources, and does not endorse and is not responsible or liable for any content, information, statements, advertising, goods or services, or other materials on or available from such websites or resources. Your correspondence or business dealings with, or participation in promotions of, third parties found in or through the Service, including payment and delivery of related goods or services, and any other terms, conditions, warranties or representations associated with such dealings, are solely between you and such third party. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of, or reliance upon, any such content, information, statements, advertising, goods or services or other materials available on or through any such website or resource.  Limitation on Liability. TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, BUSINESS PARTNERS, LICENSORS OR SERVICE PROVIDERS BE LIABLE TO YOU OR ANY THIRD PERSON FOR ANY INDIRECT, RELIANCE, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES, INCLUDING, WITHOUT LIMITATION, LOSS OF PROFITS, LOSS OF GOODWILL, DAMAGES FOR LOSS, CORRUPTION OR BREACHES OF DATA OR PROGRAMS, SERVICE INTERRUPTIONS AND PROCUREMENT OF SUBSTITUTE SERVICES, EVEN IF THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, THE COMPANY'S LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER, AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO THE COMPANY FOR THE SERVICE WHILE YOU HAVE AN ACCOUNT. YOU AGREE THAT REGARDLESS OF ANY STATUTE OR LAW TO THE CONTRARY, ANY CLAIM OR CAUSE OF ACTION ARISING OUT OF OR RELATED TO USE OF THE SERVICE OR THE TERMS OF THIS AGREEMENT MUST BE FILED WITHIN ONE YEAR AFTER SUCH CLAIM OR CAUSE OF ACTION AROSE OR BE FOREVER BARRED.  Arbitration and Governing Law. Except for users residing within the European Union and elsewhere where prohibited by applicable law: The exclusive means of resolving any dispute or claim arising out of or relating to this Agreement (including any alleged breach thereof) or the Service shall be BINDING ARBITRATION administered by the American Arbitration Association. The one exception to the exclusivity of arbitration is that you have the right to bring an individual claim against the Company in a small-claims court of competent jurisdiction. But whether you choose arbitration or small-claims court, you may not under any circumstances commence or maintain against the Company any class action, class arbitration, or other representative action or proceeding. By using the Service in any manner, you agree to the above arbitration agreement. In doing so, YOU GIVE UP YOUR RIGHT TO GO TO COURT to assert or defend any claims between you and the Company (except for matters that may be taken to small-claims court). YOU ALSO GIVE UP YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION OR OTHER CLASS PROCEEDING. Your rights will be determined by a NEUTRAL ARBITRATOR, NOT A JUDGE OR JURY. You are entitled to a fair hearing before the arbitrator. The arbitrator can grant any relief that a court can, but you should note that arbitration proceedings are usually simpler and more streamlined than trials and other judicial proceedings. Decisions by the arbitrator are enforceable in court and may be overturned by a court only for very limited reasons. For details on the arbitration process, see ourArbitration Procedures. Any proceeding to enforce this arbitration agreement, including any proceeding to confirm, modify, or vacate an arbitration award, may be commenced in any court of competent jurisdiction. In the event that this arbitration agreement is for any reason held to be unenforceable, any litigation against the Company (except for small-claims court actions) may be commenced only in the federal or state courts located in Dallas County, Texas. You hereby irrevocably consent to the jurisdiction of those courts for such purposes. This Agreement, and any dispute between you and the Company, shall be governed by the laws of the state of Texas without regard to principles of conflicts of law, provided that this arbitration agreement shall be governed by the Federal Arbitration Act. For users residing in the European Union or elsewhere where this arbitration agreement is prohibited by law, the laws of Texas, U.S.A., excluding Texas&rsquo;s conflict of laws rules, will apply to any disputes arising out of or relating to this Agreement or the Services. All claims arising out of or relating to this Agreement or the Services will be litigated exclusively in the federal or state courts of Dallas County, Texas, USA, and you and Timi consent to personal jurisdiction in those courts. Indemnity by You. You agree to indemnify and hold the Company, its subsidiaries, and affiliates, and its and their officers, agents, partners and employees, harmless from any loss, liability, claim, or demand, including reasonable attorney's fees, made by any third party due to or arising out of your breach of or failure to comply with this Agreement (including any breach of your representations and warranties contained herein), any postings or Content you post in the Service, and the violation of any law or regulation by you. The Company reserves the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with the Company in connection therewith.  Notice. The Company may provide you with notices, including those regarding changes to this Agreement, using any reasonable means now known or hereafter developed, including by email, regular mail, SMS, MMS, text message or postings in the Service. Such notices may not be received if you violate this Agreement by accessing the Service in an unauthorized manner. You agree that you are deemed to have received any and all notices that would have been delivered had you accessed the Service in an authorized manner. Entire Agreement; Other. This Agreement, with the Privacy Policy and any specific guidelines or rules that are separately posted for particular services or offers in the Service, contains the entire agreement between you and the Company regarding the use of the Service. If any provision of this Agreement is held invalid, the remainder of this Agreement shall continue in full force and effect. The failure of the Company to exercise or enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision. You agree that your online account is non-transferable and all of your rights to your profile or contents within your account terminate upon your death. No agency, partnership, joint venture or employment is created as a result of this Agreement and you may not make any representations or bind the Company in any manner. Special State Terms. The following provisions are added to this Agreement for subscribers residing in Arizona, California, Connecticut, Illinois, Iowa, Minnesota, New York, North Carolina, Ohio and Wisconsin: You, the buyer, may cancel this Agreement, without penalty or obligation, at any time prior to midnight of the third business day following the original date of this contract, excluding Sundays and holidays. To cancel this agreement, please follow these instructions: </p>"
strVar += "    </div> "
strVar += "  </div> "
strVar += "  <div class=\"popup popup-signup\"> "
strVar += "  </div> "
strVar += "  <div class=\" popup-preview-image\" style=\"display: none;\"> "
strVar += "  </div> "
function pasteAddress (){

}

function pastePhoneNumber () {

}

function signupEmail () {
    myApp.closeModal(".popup-intro"); 
    $(".modal-overlay-visible").css("display", "block")
    // myApp.popup(".popup-signup");
    var listHTML = ""
       
                    console.log(htmlString)                                             

listHTML = "    <div class=\"content-block\">"
listHTML += "<div class=\"list-block\" id=\"signup-list\"> "
listHTML += "  <ul> "
listHTML += "    <li class=\"signup-only\"> "
listHTML += "      <div class=\"item-content\"> "

listHTML += "        <div class=\"item-inner\"> "
listHTML += "          <div class=\"item-title label\">First Name</div> "
listHTML += "          <div class=\"item-input\"> "
listHTML += "              <input type=\"text\" id=\"signup-first-name\" name=\"firstname\"> "
listHTML += "          </div> "
listHTML += "        </div> "
listHTML += "      </div> "
listHTML += "    </li> "
listHTML += "    <li class=\"signup-only\"> "
listHTML += "      <div class=\"item-content\"> "

listHTML += "        <div class=\"item-inner\"> "
listHTML += "          <div class=\"item-title label\">Last Name</div> "
listHTML += "          <div class=\"item-input\"> "
listHTML += "              <input type=\"text\" id=\"signup-last-name\" name=\"lastname\"> "
listHTML += "          </div> "
listHTML += "        </div> "
listHTML += "      </div> "
listHTML += "    </li> "
listHTML += "    <li> "
listHTML += "      <div class=\"item-content\"> "

listHTML += "        <div class=\"item-inner\"> "
listHTML += "          <div class=\"item-title label\">Email</div> "
listHTML += "          <div class=\"item-input\"> "
listHTML += "              <input type=\"email\" id=\"signup-email\" name=\"email\"> "
listHTML += "          </div> "
listHTML += "        </div> "
listHTML += "      </div> "
listHTML += "    </li> "
listHTML += "    <li> "
listHTML += "      <div class=\"item-content\"> "

listHTML += "        <div class=\"item-inner\"> "
listHTML += "          <div class=\"item-title label\">Password</div> "
listHTML += "          <div class=\"item-input\"> "
listHTML += "              <input type=\"password\" id=\"signup-password\" name=\"password\"> "
listHTML += "          </div> "
listHTML += "        </div> "
listHTML += "      </div> "
listHTML += "    </li> "
listHTML += "  </ul> "
listHTML += "</div>  "
listHTML += "  <div class=\"button button-fill color-pink button-big\" id=\"continue-button\" style=\"margin: 10px 10px; \" onclick=\"signupEmailRequest()\">Sign Up</div>"
listHTML += "     "
listHTML += "  <div class=\"one-line-prompt\" style=\"margin: 10px 10px; \" onclick=\"switchLoginSignupMode()\" id=\"switchModeButton\">Login with Email</div>"
listHTML += "    </div></div> "
    var htmlString = listHTML; 

    var popupElem = {
        title: "Sign Up", 
        contentHTML: htmlString, 
        leftButton: "Close", 


        callbackLeft:function () {
            setTimeout(function () {
                    myApp.popup(".popup-intro"); 
                    $(".modal-overlay-visible").css("display", "none")
            }, 300)
            
            // currentIndex[timeFrame] = 1;
            // getMySchedule(function () {
            //     afterClickTab(timeFrame)
            // });            
            // navigator.geolocation.getCurrentPosition(onSuccess, onError);    
        }, 
        callbackRight: function () {

        }, 
        onload: function () {
            // document.getElementById("")

        }
    }
    isLoginPage = "signup"

    halfScreenPopup.push(popupElem)
    HalfScreenConfirm ()   
    $(".modal-in input").val('')
    setTimeout(function () {
        document.getElementById("signup-first-name").focus()
    }, 400)
}

function trackUserViewPicture (pid) {
    var ajaxUrl = "http://gettimi.com/site/InsertPictureSeen?user_token=" + localStorage.usertoken + "&event_pic_id=" + pid

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            console.log(results)
        }, 
        error: function (results) {

        }
    });       
}

function deletePicture (unit, pid){

    myApp.confirm("Hello God, do you actually want to delete this photo, pid:" + pid +" ?", function () {
                unit.pics = unit.pics.filter(function (unit) {
                    return unit.pid != pid
                })
                console.log(unit.pics)
                var ll = []
                unit.pics.map(function (pic) {
                    ll.push({
                        "image": pic, 
                        "id": unit.id, 
                        "geolocation": unit.geolocation, 
                        "place": unit.place, 
                        "category_name": unit.category_name
                    })    
                });

                var picHTML = ""
                for (var i = 0; i < unit.pics.length; i+=2) {
                    picHTML = picHTML + imageBlockRender(ll[i], {
                                                "secondColumn": false
                                            }, true)                                  
                    if ( i + 1 < ll.length) {
                        picHTML = picHTML + imageBlockRender(ll[i+1], {
                                                "secondColumn": true
                                            }, true) 
                    }                                                           
                }
                document.getElementById("restaurant-gallery").innerHTML = picHTML                

    $("#restaurant-gallery .image-holder").css("height", $("#restaurant-gallery .image-holder").width() + "px")
    $("#restaurant-gallery .image-background").css("height", $("#restaurant-gallery .image-holder").width() + "px")
                // goToRestaurantPage(unit);        
        var ajaxUrl = "http://gettimi.com/site/DeletePicById?user_token=" + localStorage.usertoken + "&pid=" + pid

        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {
                getImageList(false)
                // console.log(results)
            }, 
            error: function (results) {

            }
        });           
    })
       
    
}

function hasLikedEventUI (liked) {
    var iconFull, iconEmpty; 
    if (personalData.phone % 2 == 1) {
        iconFull = '<i class="fa fa-heart"></i>';
        iconEmpty = '<i class="fa fa-heart-o"></i>'
    } else {
        iconFull = '<i class="fa fa-bookmark"></i>';
        iconEmpty = '<i class="fa fa-bookmark-o"></i>'
    }
    if (liked) {
        $("#like-restaurant-button").html(iconFull)
        $("#like-restaurant-button").css("color", "rgba(222,99,99,1)");       
    } else {
        $("#like-restaurant-button").html(iconEmpty)
        $("#like-restaurant-button").css("color", "#464748");   
    }

}
var currentRestaurantId;
// var currentRestaurantIndex;
function showEventPage (unit, encodedURL, pid, refresh) {
    
    refresh = refresh || false
    console.log(unit.id, encodedURL, pid)
    if (unit.id == currentRestaurantId && mainView.url == "#restaurant-page" && !refresh) {
        if (localStorage.usertoken == ray_token || localStorage.usertoken == jimmy_token ){
            console.log(pid)
            deletePicture(unit, pid)
            return;
        } else {
            return;
        }
    }
    if (currentRestaurantId != unit.id) {
        $('.restaurant-page-content').animate({ scrollTop: 0 }, 200);
    } 
    currentRestaurantId = unit.id    
    getGeolocation()
    mainView.router.loadPage({"pageName": "restaurant-page"}); 
    // Render data
    showEventPageStaticInfo (unit, pid, encodedURL)
    showEventPageRecommend (unit)
    showEventPageFriends (unit)
    showEventPageMap (unit)
    showEventPageImageSlider (unit, encodedURL, pid)
    showEventPageDesc (unit)
    showEventPageHours (unit)
    clickFunction (unit)
    mixpanel.track("Clicked Restaurant", {
        "username": personalData.username,
        "yelp_url": unit.yelp_url, 
        "place": unit.place,        
        "address": unit.address, 
        "phone" : unit.phone, 
        "website": unit.website, 
        "currentTab": currentTabPage, 
    });    

    showEventPageQR (unit)
    showEventPageReserve (unit)
    showEventPageGallery(unit)
}
function clickFunction (unit) {

    var strVar = ""
    if (unit.yelp_url != "") {
        strVar +=                       '        <li class="item-content" id="restaurant-page-yelp-li"> '
        strVar +=                       '          <div class="item-media"><i style="background:crimson;" class="fa icon-background-badge fa-yelp"></i></div> '
        strVar +=                       '          <div class="item-inner"> '
        strVar +=                       '            <div class="item-after restaurant-info-text" id="restaurant-page-yelp"></div> '
        strVar +=                       '          </div> '
        strVar +=                       '        </li> '  
    }    
    if (unit.address != "") {
        strVar +=                       '        <li class="item-content" id="restaurant-page-address-li"> '
        strVar +=                       '          <div class="item-media"><i style="background:rgb(99,154,222);" class="fa icon-background-badge fa-map"></i></div> '
        strVar +=                       '          <div class="item-inner"> '
        strVar +=                       '            <div class="item-after restaurant-info-text" id="restaurant-page-address"></div> '
        strVar +=                       '          </div> '
        strVar +=                       '        </li> '          
    } 
    if (unit.phone != "") {
        strVar +=                       '        <li class="item-content" id="restaurant-page-phone-li"> '
        strVar +=                       '          <div class="item-media"><i style="background:rgb(99,222,154);" class="fa icon-background-badge fa-phone"></i></div> '
        strVar +=                       '          <div class="item-inner"> '
        strVar +=                       '            <div class="item-after restaurant-info-text" id="restaurant-page-phone"></div> '
        strVar +=                       '          </div> '
        strVar +=                       '        </li> '      
    }   

    if (unit.website != "http://" && unit.website != "" && unit.website != "https://" ) {
        strVar +=                       '        <li class="item-content" id="restaurant-page-website-li"> '
        strVar +=                       '          <div class="item-media"><i style="background:#464748;" class="fa icon-background-badge fa-at"></i></div> '
        strVar +=                       '          <div class="item-inner"> '
        strVar +=                       '            <div class="item-after restaurant-info-text" id="restaurant-page-website"></div> '
        strVar +=                       '          </div> '
        strVar +=                       '        </li> '         
    }
    if (deliveryAvail(unit)) {
        var brand = "", brandColor = "#f74d11"
        if (unit.delivery_url.indexOf("caviar") !== -1) {
            brand = "Caviar"; 
            brandColor = "#f74d11"
        } else if (unit.delivery_url.indexOf("seamless") !== -1) {
            brand = "Seamless"; 
            brandColor = "#f63440"; 
        } else if (unit.delivery_url.indexOf("doordash") !== -1) {
            brand = "Doordash"; 
            brandColor = "#f63440"; 
        } else if (unit.delivery_url.indexOf("grubhub") !== -1) {
            brand = "Grubhub"; 
            brandColor = "#f63440"
        } else if (unit.delivery_url.indexOf("postmates") !== -1) {
            brand = "Postmates"; 
            brandColor = "#00afab"
        }
        strVar +=                       '        <li class="item-content" id="restaurant-page-delivery-li"> '
        strVar +=                       '          <div class="item-media"><i style="background:' +brandColor+ ';" class="fa icon-background-badge fa-shopping-cart"></i></div> '
        strVar +=                       '          <div class="item-inner"> '
        strVar +=                       '            <div class="item-after restaurant-info-text" id="restaurant-page-delivery">Order Delivery Online Via ' + brand + '</div> '
        strVar +=                       '          </div> '
        strVar +=                       '        </li> '         
    }    
    if ( unit.reservation_link.indexOf("http") != -1 ) {
        strVar +=                       '        <li class="item-content" id="restaurant-page-reserve-li"> '
        strVar +=                       '          <div class="item-media"><i style="background:crimson;" class="fa icon-background-badge fa-cutlery"></i></div> '
        strVar +=                       '          <div class="item-inner"> '
        strVar +=                       '            <div class="item-after restaurant-info-text" id="restaurant-page-reserve">Reserve Online for Free</div> '
        strVar +=                       '          </div> '
        strVar +=                       '        </li> '  
    }    

    document.getElementById("restaurant-info-group").innerHTML = "<ul>" + strVar + "</ul>"
    if (unit.phone != "") {
        showEventPagePhone(unit)
    }        
    if (unit.yelp_url != "") {
        showEventPageYelp (unit)
    }    
    if (unit.website != "http://" && unit.website != "" && unit.website != "https://" ) {
        showEventPageWeb (unit)
    }
    if (unit.address != ""){
        showEventPageAddress (unit)
    }
    if (unit.reservation_link.indexOf("http") != -1) {
        showEventPageReserve (unit);
    }
    showEventPageBottomButton(unit)
    // document.getElementById("")
}
function showEventPageYelp (unit) {
    console.log("?")
    document.getElementById("restaurant-page-yelp").innerHTML = "Check out Reviews on Yelp"
    document.getElementById("restaurant-page-yelp").onclick = function () {
        mixpanel.track("Click Yelp", {
            "username": personalData.username,
            "yelp_url": unit.yelp_url, 
            "place": unit.place,
            "address": unit.address, 
            "phone" : unit.phone, 
            "website": unit.website, 
            "currentTab": currentTabPage, 
            "type": "online"
        });           
        if (AppVersion.version < 1.1) {
            var sharedText = unit.yelp_url
            console.log(sharedText + " is copied. Paste it to wherever you want! ");
            myApp.alert(sharedText + " is copied. Paste it to wherever you want! "); 
            cordova.plugins.clipboard.copy(sharedText);  
        } else {
             openUrl(unit.yelp_url); 
        }          
    }    
}
function showEventPageRecommend (unit) {
    if (unit.recommend_menu != null && unit.recommend_menu != "") {
        var htmlString = ""
        htmlString += '<div class="restaurant-page-title">Recommended'
        htmlString += '</div>'
        htmlString += "<ul class='recommend-menu'>" + unit.recommend_menu + "</ul>"
        document.getElementById("restaurant-recommend-menu").innerHTML = htmlString

    } else {
        document.getElementById("restaurant-recommend-menu").innerHTML = ""
    }    
}
function showEventPageStaticInfo (unit, pid, encodedURL) {
    $("#restaurant-name-navbar").html(unit.place)
    var geoR = unit.geolocation.split(","); 
    var geoS = personalData.geolocation.split(",");
    document.getElementById("restaurant-page-distance").innerHTML = Math.round(getDistanceFromLatLonInKm(geoR[0], geoR[1], geoS[0], geoS[1]) / 1.6 * 10 ) / 10 + "mi"
    document.getElementById("restaurant-page-dollar").innerHTML = unit.price
    document.getElementById("restaurant-page-star").innerHTML = ( unit.rating ? Math.round(unit.rating * 10)/10  : "4.5") + "<span class='col-subtitle'> / 5</span>"
    document.getElementById("like-restaurant-button").onclick = function () {
        likeEvent(unit.id, pid, encodedURL)
    }
    hasLikedEventUI(unit.self)
    // if (unit.self == 1) {
    //     hasLikedEventUI(true)
    // } else {
    //     hasLikedEventUI(false)
    // }
}
function showEventPageFriends (unit) {
    if (unit.friends.length > 0 ) {
        var htmlString = "<span class='restaurant-info-text'>Friends who like this restaurant</span><div class='row' id='friend-list-row'>"
        unit.friends.map(function (friend) {
            htmlString += "<div class='col-25' onclick='returnUserInfo(" + friend.user_id + ", \"" + friend.username + "\")'>" + 
                            "<img class='suggest-friend-img lazy lazy-fadein' src='" + (friend.avatar || "img/timi.png") + "'>" + 
                            "<div class='suggest-friend-img-background'></div>" +                                     
                            "<div class='suggest-friend-name'>" + friend.username.split(" ")[0] + "</div>" + 
                        "</div>"                                                                                                                                                                                                                            
        })
        htmlString += "</div>"
        document.getElementById("friend-restaurant-list").innerHTML = htmlString
        $("#friend-restaurant-list").css("display", "block")
        $("#friend-list-row").css("visibility", "hidden")
        setTimeout(function () {
            $("#friend-list-row").css("visibility", "visible")
            $("#friend-list-row").addClass("bounceInRight animated"); 
            setTimeout(function () {
                $("#friend-list-row").removeClass("bounceInRight animated"); 
            },700)              
        }, 200)
      
    } else {
        document.getElementById("friend-restaurant-list").innerHTML = ""
        $("#friend-restaurant-list").css("display", "none")
    }        
}
function showEventPageMap (unit) {
    initMap(unit.geolocation)
    document.getElementById("restaurant-map").onclick = function () {
        mixpanel.track("Click Map", {
            "username": personalData.username,
            "yelp_url": unit.yelp_url, 
            "place": unit.place,
            "address": unit.address, 
            "phone" : unit.phone, 
            "website": unit.website, 
            "currentTab": currentTabPage, 
            "type": "online"
        });                  
        mapActionsButton(unit.address)                
    }    
}
function showEventPageImageSlider (unit, encodedURL, pid) {
    var ll;
    var url = decodeURIComponent(encodedURL)    
    if (url != null && pid != null){
         ll = unit.pics.filter(function (pic) {
            return (pic.path != url)
        })
        console.log(ll)
        shuffle(ll);
        ll.push({
            pid: pid, 
            path: url, 
        })
        ll.reverse()        
        trackUserViewPicture(pid)
    } else {
        ll = unit.pics
        shuffle(ll);
    }


    var picHTML = '<div class="swiper-container swiper-food-container"> ' +
    '    <div class="swiper-wrapper"> ' 

    ll.map(function (pic) {
        picHTML += "        <div class='swiper-slide'><div class='image-class' style='background: url(" + pic.path + ") 100% 50% no-repeat;background-size:cover; '>" + 
                            "</div></div> " 
        // picHTML = picHTML + "<div class='image-class' style='background: url(" + pic.path + ") 100% 100% no-repeat;background-size:cover; '>" + 
        //                     "</div>" 
    });
    picHTML += '    </div> ' +'    <div class="swiper-pagination"></div> ' + ((!ll.title) ? ('<div id="photo-name">' + "" + ' </div>') : "")+'<div id="photo-number">' + ll.length + ' PHOTOS</div></div> '
    document.getElementById("restaurant-picture-list").innerHTML = picHTML
    $(".image-class").css("height", $(".image-class").width() + "px"); 
    var mySwiper1 = myApp.swiper('.swiper-food-container', {
        spaceBetween: 0, 
        slidesPerView: 1, 
        speed: 200, 
        // pagination:'.swiper-pagination',
    });     
    
}
function showEventPageDesc (unit) {
    if (unit.description) {
        var htmlString = ""
        htmlString += '<div class="restaurant-page-title">Description'
        htmlString += '</div>'
        htmlString += '<p><b>' + unit.subtitle + '</b></p>'
        htmlString += unit.description 
        document.getElementById("restaurant-description").innerHTML = htmlString
    } else {
        document.getElementById("restaurant-description").innerHTML = ""
    }
}
function showEventPageHours (unit) {
    try {
        if (unit.hours_json == "null" || unit.hours_json == "") {
            console.log("fuck3") 
            document.getElementById("restaurant-hours").innerHTML = ""            

        } else {
            var htmlString = ""
            console.log("fuck2", unit.hours_json) 
            htmlString += '<div class="restaurant-page-title">Hours'
            htmlString += '</div>'
            htmlString += '' + hoursFormatter(unit.hours_json) + ''
            // htmlString += unit.hours_json;
            document.getElementById("restaurant-hours").innerHTML = htmlString;
        }console.log("fuck1") 
    } catch (err) {

    }    
}
function showEventPageAddress (unit) {
    if (!unit.address) {
        document.getElementById("restaurant-page-address-li").style.display = "none"
        return;
    } else {
        document.getElementById("restaurant-page-address-li").style.display = "flex"
    }
    document.getElementById("restaurant-page-address").innerHTML = unit.address    
    document.getElementById("restaurant-page-address").onclick = function () {
        console.log("copied address")
        var sharedText = unit.address

        if (AppVersion.version < 1.1) {
            console.log(sharedText + " is copied. Paste it to wherever you want! ");
            cordova.plugins.clipboard.copy(sharedText);   
            myApp.alert(sharedText + " is copied. Paste it to wherever you want! ");                    
        } else {
            mapActionsButton (unit.address)

        }                
    }    
}
function showEventPageReserve (unit) {
    // document.getElementById("restaurant-page-reserve").innerHTML = "Rese"
    if (document.getElementById("restaurant-page-reserve")!=null){
        document.getElementById("restaurant-page-reserve").onclick = function () {
            if (AppVersion.version < 1.1) {
                var sharedText = unit.reservation_linkqr
                console.log(sharedText + " is copied. Paste it to wherever you want! ");
                myApp.alert(sharedText + " is copied. Paste it to wherever you want! "); 
                cordova.plugins.clipboard.copy(sharedText);  
            } else {
                mixpanel.track("Click Reserved", {
                    "username": personalData.username,
                    "yelp_url": unit.yelp_url, 
                    "place": unit.place,                    
                    "address": unit.address, 
                    "phone" : unit.phone, 
                    "website": unit.website, 
                    "currentTab": currentTabPage, 
                    "type": "online"
                });              
                openUrl(unit.reservation_link)
                          
            }                
        };              
    }
 
}
function showEventPagePhone (unit) {
    document.getElementById("restaurant-page-phone").onclick = function () {
        mixpanel.track("Click Calling Phone", {
            "username": personalData.username,
            "yelp_url": unit.yelp_url, 
            "address": unit.address, 
            "place": unit.place,            
            "phone" : unit.phone, 
            "website": unit.website, 
            "currentTab": currentTabPage, 
        });             
        if (AppVersion.version < 1.1) {
            var sharedText = unit.phone
            console.log(sharedText + " is copied. Paste it to wherever you want! ");
            myApp.alert(sharedText + " is copied. Paste it to wherever you want! "); 
            cordova.plugins.clipboard.copy(sharedText);  
        } else {
            window.open("tel:"+formatPhoneNumber(unit.phone), '_system');
             // window.open(); 
        }                
    };
    
    document.getElementById("restaurant-page-phone").innerHTML = "<a href='tel:" + unit.phone + "'>" + unit.phone + "</a>"    
}
function showEventPageWeb (unit) {
    document.getElementById("restaurant-page-website").innerHTML = unit.website
    document.getElementById("restaurant-page-website").onclick = function () {
        if (AppVersion.version < 1.1) {
            var sharedText = unit.website
            console.log(sharedText + " is copied. Paste it to wherever you want! ");
            myApp.alert(sharedText + " is copied. Paste it to wherever you want! "); 
            cordova.plugins.clipboard.copy(sharedText);  
        } else {
             openUrl(unit.website); 
        }                
    };    
}
function showEventPageQR (unit) {
    document.getElementById("restaurant-bookmark-button").onclick = function () {
        var buttons = [
            {
                text : "Copy URL", 
                onClick: function () {
                    console.log("http://gettimi.com/site/restaurant/" + unit.id)
                    try {
                        
                        cordova.plugins.clipboard.copy("http://gettimi.com/site/restaurant/" + unit.id); 
                    } catch(err) {
                    }                       
                }
            }
        ]
        myApp.actions(buttons)

    }
    // shareRestaurantURL
    // document.getElementById("restaurant-bookmark-button").innerHTML = "SHARE"
    // new QRCode(document.getElementById("restaurant-bookmark-button"), "abc");         
    // var qrcode = new QRCode(document.getElementById("restaurant-bookmark-button"), {
    //     text: "http://gettimi.com/site/restaurant/" + imageList[0].id,
    //     width: 256,
    //     height: 256,
    //     colorDark : "#000000",
    //     colorLight : "#ffffff",
    //     // correctLevel : QRCode.CorrectLevel.H
    // });    
}

function deliveryAvail (unit) {
    return (unit.delivery_url != "http://" && unit.delivery_url != "" && unit.delivery_url != "https://") ;    
}
function showEventPageBottomButton (unit) {
    if (unit.reservation_link.indexOf("http") != -1) {
        document.getElementById("reserve-button").onclick = function () {
            openUrl(unit.reservation_link)
            mixpanel.track("Click Reserved", {
                "username": personalData.username,
                "yelp_url": unit.yelp_url, 
                "address": unit.address, 
                "place": unit.place,                
                "phone" : unit.phone, 
                "website": unit.website, 
                "currentTab": currentTabPage, 
                "type": "online"
            });                
        } 
        document.getElementById("reserve-button").innerHTML = "Reserve Online via Opentable"               
        if (deliveryAvail(unit)) {
            var deliveryFunction = function () {
                mixpanel.track("Click Reserved", {
                    "username": personalData.username,
                    "yelp_url": unit.yelp_url, 
                    "address": unit.address, 
                    "phone" : unit.phone, 
                    "website": unit.website, 
                    "currentTab": currentTabPage, 
                    "type": "delivery"
                });     
                openUrl(unit.delivery_url);           
            }             
            document.getElementById("restaurant-page-delivery").onclick = deliveryFunction;             
        }        
    } else if (unit.reservation_link.indexOf("http") == -1 && (unit.phone != "" && unit.phone.toLowerCase() != "n/a") ) {
        if (deliveryAvail(unit)) {
            var deliveryFunction = function () {
                mixpanel.track("Click Reserved", {
                    "username": personalData.username,
                    "yelp_url": unit.yelp_url, 
                    "address": unit.address, 
                    "phone" : unit.phone, 
                    "place": unit.place,                    
                    "website": unit.website, 
                    "currentTab": currentTabPage, 
                    "type": "delivery"
                });     
                openUrl(unit.delivery_url);           
            }             
             document.getElementById("restaurant-page-delivery").onclick = deliveryFunction; 
             document.getElementById("reserve-button").onclick = deliveryFunction

            document.getElementById("reserve-button").innerHTML = "Get Delivery Now <i class='fa fa-shopping-cart'></i>"   
        } else {
            document.getElementById("reserve-button").onclick = function () {                
                myApp.confirm("Calling "+ unit.place + " to reserve? ", "Timi", function () {
                    window.open("tel:"+formatPhoneNumber(unit.phone), '_system');
                })        
                mixpanel.track("Click Reserved", {
                    "username": personalData.username,
                    "yelp_url": unit.yelp_url, 
                    "address": unit.address, 
                    "phone" : unit.phone, 
                    "place": unit.place,                    
                    "website": unit.website, 
                    "currentTab": currentTabPage, 
                    "type": "calling"
                });                           
            } 

            document.getElementById("reserve-button").innerHTML = "Reserve By Calling"             
        }

    } else {
        document.getElementById("reserve-button").onclick = function () {

        } 
        document.getElementById("reserve-button").innerHTML = "Just Walk In"                 
    }    
}
function showEventPageGallery (unit) {
    var ll = []
    unit.pics.map(function (pic) {
        ll.push({
            "image": pic, 
            "id": unit.id, 
            "geolocation": unit.geolocation, 
            "place": unit.place, 
            "category_name": unit.category_name
        })    
    });

    var picHTML = ""
    for (var i = 0; i < unit.pics.length; i+=2) {
        picHTML = picHTML + imageBlockRender(ll[i], {
                                    "secondColumn": false
                                }, true)                                  
        if ( i + 1 < ll.length) {
            picHTML = picHTML + imageBlockRender(ll[i+1], {
                                    "secondColumn": true
                                }, true) 
        }                                                           
        picHTML = picHTML
    }
    document.getElementById("restaurant-gallery").innerHTML = picHTML

    document.getElementById("restaurant-gallery-title").innerHTML = '<div class="restaurant-page-title">Gallery</div>'

    $("#restaurant-gallery .image-holder").css("height", $("#restaurant-gallery .image-holder").width() + "px")
    $("#restaurant-gallery .image-background").css("height", $("#restaurant-gallery .image-holder").width() + "px")   
    attachTapHold("#restaurant-gallery .image-holder")     
}

// hobject = restaurantObject.hour_json
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
            hourString += ((i >= 2) ? " / " :"" ) +  unit.openHours[i] + " - " + unit.openHours[i+1]
        }
        return dayString + " : " + hourString
    }).join("</div><div class='restaurant-hour-text'>")
    console.log(htmlString)
    return htmlString + "</div></div>"
}
function goToRestaurantPage (restaurantId, encodedURL, pid) {
    imageList.map(function (unit) {
        if (unit.id == restaurantId) {
            showEventPage(unit, encodedURL, pid)
        }
    });
}

function loseCode (str){
    var hash = 0;
    var charr
    for (i = 0; i < str.length; i++) {
        charr = str.charCodeAt(i);
        hash += charr;
    }
    return hash;
}

function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : m[1]+ m[2] + m[3];
}

function openUrl(url, readerMode) {
    try {
      SafariViewController.isAvailable(function (available) {
        if (available) {
          SafariViewController.show({
                url: url,
                hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
                animated: false, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
                transition: 'curl', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
                enterReaderModeIfAvailable: readerMode, // default false
                tintColor: "#464748", // default is ios blue
                barColor: "#464748", // on iOS 10+ you can change the background color as well
                controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor
              },
              // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
              function(result) {
                if (result.event === 'opened') {
                  console.log('opened');
                } else if (result.event === 'loaded') {
                  console.log('loaded');
                } else if (result.event === 'closed') {
                  console.log('closed');
                }
              },
              function(msg) {
                console.log("KO: " + msg);
              })
        } else {
            myApp.alert("It looks like you are not using the newest version of Timi. Please update to the newest version! ")
          // potentially powered by InAppBrowser because that (currently) clobbers window.open
          window.open(url, '_blank', 'location=yes');
        }
      });
    } catch (err) {
        myApp.alert("It looks like you are not using the newest version of Timi. Please update to the newest version! ")

    }

}

function loginViaEmail () {
    // var name = document.getElementById("signup-first-name").value + " " + document.getElementById("signup-last-name").value; 
    var email = document.getElementById("signup-email").value; 
    var password = document.getElementById("signup-password").value; 
    var ajaxUrl = "http://gettimi.com/site/login?" + "email="+email+"&password="+password
    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            console.log(results)
            if (results.result != null ) {
                    console.log(JSON.parse(results.result))
            }
            if (results.error != null) {
                // error
                myApp.alert(results.error)
            } else {
                if (!results.phone) {

                    // 
                        // localStorage.checkedPhone = 0
                        console.log("no phone")
                        // not verified verified users

                        // required, if not, calendar won't be initialized
                        // submitCalendar ()
                        // required, if not, the phone can't be filled in
                        myApp.closeModal (".half-screen-popup")

                        // go to phone number page                    
                        selfData.email = email;  
                        selfData.name = name;  

                        // fill in the name and email, focus on phone number
                        setTimeout(function () {
                            mainView.router.loadPage({"pageName":"phone-number"})
                            myApp.formFromJSON("#my-form", {
                                'name': selfData.name, 
                                'email': selfData.email, 
                                'phone' : ""
                            })                            
                            document.getElementById("phone-number-input").focus()

                        }, 800);   
                } else {
                    myApp.closeModal (".half-screen-popup")
                    localStorage.usertoken = results["user_token"]; 
                    mainView.router.loadPage({"pageName": "home"})
                    // setTimeout(function () {
                    //     initAfterLogin()
                    // }, 400)
                    // initAfterLogin()
                    // if (personalData.avatar == "" || personalData.avatar == "img/timi.png") {
                    //     myApp.alert("Woud you like to change your profile picture now? ", "Timi", function () {
                    //         myApp.showTab("#more-tab")
                    //         changePicture()
                    //     })
                    // }
                }                  
            }
            
        
        }, 
        error: function (results) {
            // myApp.hideIndicator()
            // console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });       
}

function switchLoginSignupMode () {
    if (isLoginPage == "signup") {
        isLoginPage = "login"
        document.getElementById("continue-button").innerHTML = "Login"
        document.getElementById("continue-button").onclick = function () {
            loginViaEmail()
        }
        document.getElementById("switchModeButton").innerHTML = "Sign up with Email"
        $(".modal-in .navbar .center").html("Login")
        $(".signup-only").css("display", "none"); 
    } else {
        isLoginPage = "signup"
        document.getElementById("continue-button").innerHTML = "Sign up"
        document.getElementById("continue-button").onclick = function () {
            signupEmailRequest()
        }        
        document.getElementById("switchModeButton").innerHTML = "Log in with Email"
        $(".modal-in .navbar .center").html("Sign Up")
        $(".signup-only").css("display", "block"); 
    }    
}
var isLoginPage = ""
function signupEmailRequest () {
    var name = document.getElementById("signup-first-name").value + " " + document.getElementById("signup-last-name").value; 
    var email = document.getElementById("signup-email").value; 
    var password = document.getElementById("signup-password").value;     
    var ajaxUrl = "http://gettimi.com/site/signup?" + "name=" + name + "&email="+email+"&password="+password

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            console.log(results)
            fuck = results
            if (results["user_token"] != null ) {
                console.log("here")
                // selfData.userId = response.id;
                selfData.email = email;  
                selfData.name = name;  

                localStorage.usertoken = results.user_token; 

                mixpanel.track("Continue Login", {
                    "segment": "email"
                });

                localStorage.checkedPhone = 0; 
                console.log(results)
                if (results.result != null ) {
                        console.log(JSON.parse(results.result))
                }
                if (results.error != null) {
                    // error
                    myApp.alert(results.error)
                } else {
                    if (localStorage.checkedPhone == "0") {

                        // localStorage.checkedPhone = 0
                        console.log("no phone")
                        // not verified verified users

                        // required, if not, calendar won't be initialized
                        // submitCalendar ()
                        // required, if not, the phone can't be filled in
                        myApp.closeModal (".half-screen-popup")

                        // go to phone number page                    


                        // fill in the name and email, focus on phone number
                        setTimeout(function () {
                            mainView.router.loadPage({"pageName":"phone-number"})
                            myApp.formFromJSON("#my-form", {
                                'name': selfData.name, 
                                'email': selfData.email, 
                                'phone' : ""
                            })                            
                            document.getElementById("phone-number-input").focus()

                        }, 800);   
                    }                       
                }
                

                // results.phone

                // user_token: "71dfbbee4a20149657ac4829c3aacb78", phone: false
                    // console.log(JSON.parse(results.result))
            } else {
                console.log(results.error)
                myApp.alert(results.error)
            }

            // suggestFriendsList = JSON.parse(results.result); 
            // console.log(JSON)

        }, 
        error: function (results) {
            // myApp.hideIndicator()
            // console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });   
}


document.getElementById("body-html").innerHTML += strVar + scriptHTML

// var ptrContent = $$('.pull-to-refresh-content');
 
// // Add 'refresh' listener on it
// ptrContent.on('refresh', function (e) {
//     // Emulate 2s loading

// // myMessages.addMessage(messageParameters, method, animate);

//     setTimeout(function () {
//         // Random image
//         // var picURL = 'http://hhhhold.com/88/d/jpg?' + Math.round(Math.random() * 100);
//         // // Random song
//         // var song = songs[Math.floor(Math.random() * songs.length)];
//         // // Random author
//         // var author = authors[Math.floor(Math.random() * authors.length)];
//         // // List item html
//         // var itemHTML = '<li class="item-content">' +
//         //                   '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
//         //                   '<div class="item-inner">' +
//         //                     '<div class="item-title-row">' +
//         //                       '<div class="item-title">' + song + '</div>' +
//         //                     '</div>' +
//         //                     '<div class="item-subtitle">' + author + '</div>' +
//         //                   '</div>' +
//         //                 '</li>';
//         // // Prepend new list element
//         // ptrContent.find('ul').prepend(itemHTML);
//         // When loading done, we need to reset it
//         myApp.pullToRefreshDone();
//     }, 2000);
// });


function appReturnedFromBackground () {
    console.log("returned")
    d = new Date()
    currentHours = d.getHours()
    getQueryDay ()
    updateTimeAvail ()

    if ( localStorage.usertoken == "null" || localStorage.usertoken == null) {
        // non user
    } else {
        // user
        getGeolocation() 

        // getMySchedule(function () {
        afterClickTab(timeFrame, true)  
        // });
        
        getUnreadMatchList(function () {
            popupMatchGeneral()
        });
        getRecentRequests( function () {
                updateInvitationPage()
        });          


        if (mainView.url == "#chatting-page") {
            

            loadNewMessage(chattingWidthUserId); 
        } else {
            if (mainView.url == "#home" && currentTabPage == "messenger-tab") {
                messengerOnShow() 
            } else {
                loadAllNewMessage( function () {
                    
                });                    
            }
         
        }



              
        if ( push_notification != null ) {
            push_notification.setApplicationIconBadgeNumber(function() {
                console.log('success clearBadge');
            }, function() {
                console.log('error clearBadge');
            }, 0);            
        }   
        getUnprocessedSwipe ()  
        loadStrangers ()
        getUnreadFriendMatch ()
    }
}

function timeFormatter (date) {
    var hours = date.getHours(); 
    var min = date.getMinutes(); 
    var apm = (hours < 12) ? 'AM' : 'PM'; 
    var hours = (hours < 12) ? hours : (hours - 12)
    return doubleDigitFormatter(hours) + ':' + doubleDigitFormatter(min) + ' ' + apm
}

function appendMessage (text, name, sent, timeString, animate) {
    // Random message type
    animate = animate || false;
    // var messageType = (['sent', 'received'])[Math.round(Math.random())];
    var messageType = sent ? 'sent' : 'received'; 
    name = name || ""
    if (text === undefined) {
        console.log("fuck")
    }
    console.log(text)
    console.log(new Date(timeString).getDate())
    // Avatar and name for received message
    // var avatar, name;

    // Add message


    myMessages.addMessage({
        // Message text
        text: decodeURIComponent(text),
        type: messageType,
        // Avatar and name:
        // avatar: avatar,
        name: name,
        // Day
        day: !conversationStarted ? daySince(new Date(timeString)) : false,
        time: !conversationStarted ? timeFormatter(new Date(timeString)) : false
    }, 'append', animate);
}
function doubleDigitFormatter (digit) {
    if ( digit < 10 ) {
        return "0" + digit
    } else {
        return digit
    }
}
function loadMessageList (history) {
    if (history == null) return;
    var previousTime = 0
    for ( var i in history ) {
        if (history[i].time != null ) {
            var dd = new Date(history[i].time)
            if (dd - previousTime > 300000) {
                conversationStarted = false
            } else {
                conversationStarted = true
            }
        } else {
            conversationStarted = false
        }

        // var curD = new Date()
        previousTime = dd;
        // console.log(curD - dd)

        appendMessage(history[i].text, null, history[i].type, history[i].time)
        // conversation started bug
        // console.log(history[i])
    }
}

var conversationStarted = false;
var currentChatIndex; 
var inviteAllObject;

function top10Selection () {
    inviteAllObject  = myApp.formToJSON("#listview-user")
    var index = 0; 
    for (var i in inviteAllObject ){
        if (index < 10){
            inviteAllObject[i] = [i]
        } else {
            inviteAllObject[i] = []
        }
        index ++ 
    }
    myApp.formFromJSON("#listview-user", inviteAllObject)
}

function clearSelection () {
    inviteAllObject  = myApp.formToJSON("#listview-user")
    for (var i in inviteAllObject ){
        if (inviteAllObject[i].length == 0){
            inviteAllObject[i] = []
        } else if (inviteAllObject[i][0] == i) { 
            inviteAllObject[i] = []
        } else {
            console.log("WTF")
        }

    }
    myApp.formFromJSON("#listview-user", inviteAllObject)
}

// function initMessage (index) {
//     conversationStarted = false;
//     currentChatIndex = index;
//     chattingWidthUserId = chatlist[index].user.user_id; 
     
//     // Init Messages
//     myMessages = myApp.messages('.messages', {
//         autoLayout:true
//     });
//     myMessages.clean();
     
//     // Init Messagebar
//     var myMessagebar = myApp.messagebar('.messagebar');
//     var name = chatlist[index].user.username

//     document.getElementById("chatting-page-title").innerHTML = "<img class='navbar-chatting-avatar' src='" + (chatlist[index].user.avatar || "img/timi.png") + "'>" + name
//     document.getElementById("chatting-page-title").onclick = function () {
//         chatlist = getChatList()
//         showPersonalPage(chatlist[index].user)
//     }    
//     loadMessage(chatlist[index].user.user_id)
//     $$('.messagebar .link').on('click', function () {
//         submitMessage()
//     });            
// }
function initMessage (user) {
    console.log(user)
    conversationStarted = false;
    // currentChatIndex = index;
    chattingWidthUserId = user.user_id || user.sender_id; 
     
    // Init Messages
    myMessages = myApp.messages('.messages', {
        autoLayout:true
    });
    myMessages.clean();
     
    // Init Messagebar
    var myMessagebar = myApp.messagebar('.messagebar');
    var name = user.username; 
    var avatar = user.avatar || "img/timi.png";


    document.getElementById("chatting-page-title").innerHTML = "<img class='navbar-chatting-avatar' src='" + (avatar || "img/timi.png") + "'>" + name
    document.getElementById("chatting-page-title").onclick = function () {
        chatlist = getChatList()
        showPersonalPage(user)
    }    
    loadMessage(user)
    document.getElementById("message-bar-button").onclick = function () {
        submitMessage(user)
    }
    // $$('.messagebar .link').on('click', function () {
        
    // });            
}

function submitMessage (user) {
        console.log(user)
        chatlist = getChatList()
        user.user_id = user.user_id || user.sender_id;

        // $(".messagebar textarea").focus()
        // Message text
        var myMessagebar = myApp.messagebar('.messagebar');
        var messageText = myMessagebar.value().trim();
        var dateString = (new Date()).toISOString()

        var chatObject = {
            time: dateString, 
            type: true, 
            text: messageText
        }; 

        // Exit if empy message
        if (messageText.length === 0) return;

        // Empty messagebar
        $(".messagebar textarea").val('');

        // change datebase

        var chatElem = null; 
        chatlist = chatlist.map(function (unit) {
            if (unit.user.user_id == user.user_id) {
                chatElem = unit;
            }
            return unit;
        })
        console.log(chatElem)
        if (chatElem == null) {
            console.log("fuck1")
            addUserToChatList(user, chatObject)
            conversationStarted = true;
            chatElem = {
                schedule: null, 
                timeObject: dateString, 
                chat_history: [], 
                user: user
            }
        } else {
            console.log("fuck2")   
        }
        // if the conversation has started
        if ( chatElem.chat_history != null && chatElem.chat_history.length > 1) {
            var dd = new Date( chatElem.chat_history[ chatElem.chat_history.length - 2 ].time )
            if ( (new Date(dateString)) - dd > 300000) {
                conversationStarted = false
            } else {
                conversationStarted = true
            }
        } else {
            conversationStarted = false;
        }
        console.log(chatElem)
        if (chatElem.user.user_id == null) {
            myApp.alert("You are having an system error...")

            myApp.alert(JSON.stringify(chatElem.user))
            try {
                cordova.plugins.clipboard.copy(JSON.stringify(chatElem.user)); 
            } catch(err) {
            }                       
        }     
        if (chatElem.chat_history == null ){
            // if the hisotry does not exist, create the first one
            chatElem.chat_history = [{
                text: messageText, 
                time: dateString, 
                type: true
            }];      
        } else {
            // if the hisotry has existed, add to it
            chatElem.chat_history.push({
                text: messageText, 
                time: dateString, 
                type: true
            });        
        }              
        chatElem.timeObject = dateString  
        



        // update database
        localStorage.chatlist = JSON.stringify(chatlist);  



        appendMessage (messageText, null, true, dateString, true);
        sendMessageAjax(chatElem.user.user_id, messageText);
        $(".messagebar textarea").focus()
}

function openBrowser () {
    window.open('http://www.kidzout.com', '_system');    
}
function clearBadge() {
        if (push_notification != null ) {
            push_notification.setApplicationIconBadgeNumber(function() {
                // console.log('success clearBadge');
            }, function() {
                // console.log('error clearBadge');
            }, 0);            
        }      else {
            // console.log('no badge')
        }    
}

function tos() {
    myApp.popup(".popup-services")
}

function closePhotoBrowser () {
    myPhotoBrowserStandalone.map(function (unit) {
        unit.close()
    });    
}

localStorage.doubleView = 0; 
localStorage.bestView = 1; 
localStorage.bookMarkDistance = 1; 

var viewObject = [
    {
        displayingPage: "double", 
        // leftIcon: "",
        leftIcon: '<i style="visibility: hidden" class="fa fa-th-large" aria-hidden="true"></i>', 
        callback: function (list, param) {
            return;
            if (currentTabPage == "map-tab") {
                console.log(1)
                loadSearchMap(list, param)
            } else {
                initPicByRank(list, param)
            }
            
        }, 

    },
    {
        displayingPage: "rank", 
        // showing after clicking
        // leftIcon: "",
        leftIcon: '<i class="fa fa-search" aria-hidden="true" onclick="myApp.showTab(\'#search-restaurant-tab\')"></i>', 
        // exectue after clicking
        callback: function (list, param) {
            console.log(list)
            if (currentTabPage == "map-tab") {
                console.log(2)
                loadSearchMap(list)
            } else {            
                initPicByTwo(list, param) 
            }
        }, 


    }, 
]
var bookMarkView = [
    {
        id: "recent", 
        leftIcon: "<a class=\"link left-link\" onclick='switchBookmarks()' style='margin-right: 35px;'>Near Me</a>", 
        // titleHTML: "BEST IN NYC THIS WEEK<i class='fa fa-caret-down'></i>", 
        callback: function (list) {
            // switchBookmarks()
            showBookMarks()
        }, 
        byDistance: false
    }, 
    {
        id: "nearby", 
        leftIcon: "<a class=\"link left-link\" onclick='switchBookmarks()' style='margin-right: 35px;'>Recent</a>", 

        // titleHTML: "BEST NEARBY<i class='fa fa-caret-down'></i>", 
        
        callback: function (list) {
            // switchBookmarks()
            showBookMarks()
        }, 
        byDistance: true
    },    
]; 


var titleObject = [
    {
        id: "best", 
        titleHTML: "<div class='buttons-row'>" + 
                    "<div class='tab-link button active' onclick='sortList(0)' style='padding: auto 10px;'>BEST</div>" +
                    "<div class='tab-link button' onclick='sortList(1)'>NEARBY</div>" + 
                    "<div class='tab-link button' onclick='sortList(2)'>DELIVERY</div>" +                   
                    // "<div class='tab-link button'>MAP</div>" +                        
                    "</div>", 
        // titleHTML: "BEST IN NYC THIS WEEK<i class='fa fa-caret-down'></i>", 
        callback: function (list, param) {
            // shuffle(imageList)
            console.log(list)
            currentViewObject().callback(list, param)
        }, 
        byDistance: false
    }, 
    {
        id: "nearby", 
        titleHTML: "<div class='buttons-row'>" + 
                    "<div class='tab-link button ' onclick='sortList(0)' style='padding: auto 10px;'>BEST</div>" + 
                    "<div class='tab-link button active' onclick='sortList(1)'>NEARBY</div>" + 
                    "<div class='tab-link button' onclick='sortList(2)'>DELIVERY</div>" +   
                    // "<div class='tab-link button'>MAP</div>" +                                          
                    "</div>", 

        // titleHTML: "BEST NEARBY<i class='fa fa-caret-down'></i>", 
        
        callback: function (list, param) {
            currentViewObject().callback(list, param)
        }, 
        byDistance: true
    },     
    {
        id: "delivery", 
        titleHTML: "<div class='buttons-row'>" + 
                    "<div class='tab-link button ' onclick='sortList(0)' style='padding: auto 10px;'>BEST</div>" + 
                    "<div class='tab-link button ' onclick='sortList(1)'>NEARBY</div>" + 
                    "<div class='tab-link button active' onclick='sortList(2)'>DELIVERY</div>" +   
                    // "<div class='tab-link button'>MAP</div>" +                                          
                    "</div>", 
        callback: function (list, param) {
            param = param || new Object();
            if ( !param.ignoreDelivery ) {
                list = list.filter(function (unit) {
                    return (deliveryAvail(unit))
                });
            }

            currentViewObject().callback(list, param)
        }, 
        byDistance: true
    },   
]
function switchBookmarks () {

    localStorage.bookMarkDistance = Math.abs(localStorage.bookMarkDistance - 1)
    mixpanel.track("switch bookmark page", {
        "username": personalData.username,
        "bookmarkNearby": currentBookmarkObject().id
    });                
    currentBookmarkObject().callback(); 
    var leftIconHTML = currentBookmarkObject().leftIcon
    // var rightIconHTML = "<a class=\"link right-link\" onclick='myApp.showTab(\"#more-tab\")' style='visibility:hidden;'>MAP</a>";
    var rightIconHTML = "<a class=\"link right-link\" onclick='switchAllSelfBookmarks(" + (!isShowingAllBookmarks) + ")' >" + (isShowingAllBookmarks ? "My Bookmarks" : "All Bookmarks") + "</a>";   
    changeNavbarTitle("BOOKMARKS", leftIconHTML, rightIconHTML);     
}
function currentBookmarkObject () {
    return bookMarkView[Math.abs(localStorage.bookMarkDistance - 1)]
}
function currentTitleObject () {
    return titleObject[Math.abs(localStorage.bestView - 0)]; 
}
function currentViewObject () {
    return viewObject[Math.abs(localStorage.doubleView - 1)]; 
}

function sortList (index) {
    // index = index || localStorage.bestView
    pictureIndex = 20;
    localStorage.bestView = index
    currentTitleObject().callback(imageList);
    mixpanel.track("nearby or best", {
        "username": personalData.username,
        "currentPage": currentTitleObject().id, 
        "index": index
    });      
    var leftIconHTML = "<a class=\"link left-link\" style='font-size: 17px;' >" + currentViewObject().leftIcon + "</a>"
    // var rightIconHTML = "<a class=\"link right-link\" onclick='myApp.showTab(\"#more-tab\")' style='visibility:hidden;'>MAP</a>";
    rightIconHTML = "<a class=\"link right-link\" onclick='myApp.showTab(\"#map-tab\")' >MAP</a>";   
    changeNavbarTitle(currentTitleObject().titleHTML, leftIconHTML, rightIconHTML);              
      
}

function switchView () {
    return;
    localStorage.doubleView = Math.abs(localStorage.doubleView - 1)
    currentViewObject().callback(); 
    var leftIconHTML = "<a class=\"link left-link\" onclick='switchView()'>" + currentViewObject().leftIcon + "</a>"
    // var rightIconHTML = "<a class=\"link right-link\" onclick='myApp.showTab(\"#more-tab\")' style='visibility:hidden;'>MAP</a>";
    rightIconHTML = "<a class=\"link right-link\" onclick='myApp.showTab(\"#map-tab\")' >MAP</a>";   
    changeNavbarTitle(currentTitleObject().titleHTML, leftIconHTML, rightIconHTML);              
    
}
$$("#map-tab").on('show', function () {
    currentTabPage = "map-tab"; 
    changeNavbarTitle("MAP", "<a class=\"link back-link\" onclick='myApp.showTab(\"#rate-tab\"); '>Back</a>", barIconHTML);      
    $(".subnavbar").css("display", "none")  
    $("#home-page-navbar-center").removeClass("activity-button")  
    document.getElementById("home-page-navbar-center").onclick = function () {

    }    
    updateTabUI();
    mainView.hideToolbar()
    $("#map-tab .category-tab.col-25").removeClass("active")

    $("#category-tab-" + currentCategory).addClass("active")
    
    if  (gmarkers.length == 0 ) {
        loadSearchMap()
    }    
    mixpanel.track("view map page", {
        "username": personalData.username,
    });              
}); 
function switchAllSelfBookmarks (bool) {
    isShowingAllBookmarks = bool; 
    showBookMarks(); 
    var leftIconHTML = currentBookmarkObject().leftIcon
    var rightIconHTML;    
    if (isShowingAllBookmarks) {
        mixpanel.track("switch bookmark distance", {
            "username": personalData.username,
            "bookmarkPage": "my book mark"
        });            
        rightIconHTML = "<a class=\"link right-link\" onclick='switchAllSelfBookmarks(false)' >My Bookmarks</a>"; 
    } else {
        mixpanel.track("switch bookmark distance", {
            "username": personalData.username,
            "bookmarkPage": "all book mark"
        });           
        rightIconHTML = "<a class=\"link right-link\" onclick='switchAllSelfBookmarks(true)' >All Bookmarks</a>"; 
    }    
    changeNavbarTitle("BOOKMARKS", leftIconHTML, rightIconHTML);     
}

$$("#moment-tab").on('show', function () {
    currentTabPage = "moment-tab"
    $(".subnavbar").css("display", "none")
    // var leftIconHTML = "<a class=\"link right-link\" onclick='myApp.showTab(\"#map-tab\")' style='visibility: hidden'>My Bookmarks</a>"; 
    var leftIconHTML = "<a class=\"link left-link\" '>By Distance</a>"; 

    leftIconHTML = currentBookmarkObject().leftIcon;
    var rightIconHTML;
    if (isShowingAllBookmarks) {
        rightIconHTML = "<a class=\"link right-link\" onclick='switchAllSelfBookmarks(false)' >My Bookmarks</a>"; 
    } else {
        rightIconHTML = "<a class=\"link right-link\" onclick='switchAllSelfBookmarks(true)' >All Bookmarks</a>"; 
    }    
    changeNavbarTitle("BOOKMARKS", leftIconHTML, rightIconHTML);  
    updateTabUI()
    $("#home-page-navbar-center").removeClass("activity-button")
    document.getElementById("home-page-navbar-center").onclick = function () {

    }
    mixpanel.track("see moment-tab", {
        "username": personalData.username,
    });       
    getFriendsLikes(refreshBookMarks, showBookMarks)

});
    // var ptrContent = $$('.pull-to-refresh-moment');
     
    // // Add 'refresh' listener on it
    // ptrContent.on('refresh', function (e) {
    //     // Emulate 2s loading
    //     setTimeout(function () {
    //         // Random image
    //         refreshBookMarks = true;
    //        getFriendsLikes(refreshBookMarks, showBookMarks)     
    //     }, 400);
    // });    
function rateTabOnShow () {
    currentTabPage = "rate-tab"; 
    currentTitleObject().callback(imageList); 
    var leftIconHTML = "<a class=\"link left-link\" style='font-size: 17px;' onclick='myApp.showTab(\"#search-restaurant-tab\")'>" + currentViewObject().leftIcon + "</a>"
    var rightIconHTML = "<a class=\"link right-link\" onclick='myApp.showTab(\"#map-tab\")' >MAP</a>";     
    changeNavbarTitle(currentTitleObject().titleHTML, leftIconHTML, rightIconHTML);  
    $(".subnavbar").css("display", "none")  
    $("#home-page-navbar-center").removeClass("activity-button")  
    document.getElementById("home-page-navbar-center").onclick = function () {
        // sortList(localStorage.bestView)
    }    
    updateTabUI();    
    mainView.showToolbar()
    try {
        Keyboard.shrinkView(true);
    } catch(err) {
    }      
    $("#rate-tab .category-tab").removeClass("active")
    $("#rate-tab #category-tab-" + currentCategory).addClass("active")
}
$$("#search-restaurant-tab").on('show', function () {
    currentTabPage = "search-restaurant-tab"; 
    try {
        Keyboard.shrinkView(false);
        // Keyboard.disableScrollingInShrinkView(true);
    } catch(err) {
    }    


    suggestSearchItem()
    var leftIconHTML = "<a class=\"link left-link\" onclick='myApp.showTab(\"#rate-tab\")'>" + "<i class='fa fa-chevron-left'></i>" + "</a>"
    var rightIconHTML = "<a class=\"link right-link\" onclick='searchItem()' >SEARCH</a>";     
    var titleObject = "<div class='buttons-row'>" + 
        '    <input type="text" style="width: ' + ($(window).width() - 174) + 'px; font-size: 17px;" onKeyPress="enterpressalert(event, this)" id="search-bar" placeholder="Try Sushi of Gari, Ramen, etc.. ">' +
        "<div class='clear-search-box' onclick='clearSearchBox()' style='display:none'><i style='margin: 0px 4px;' class='fa fa-times'></i></div></div>"
    changeNavbarTitle(titleObject, leftIconHTML, rightIconHTML);      
    $(".subnavbar").css("display", "none")  
    $("#home-page-navbar-center").removeClass("activity-button")  
    document.getElementById("home-page-navbar-center").onclick = function () {
        // sortList(localStorage.bestView)
    }    
    updateTabUI();  
    // $("#search-bar").focus()
    mainView.showToolbar()  
});
$$("#rate-tab").on('show', function () {
    rateTabOnShow ()
}); 
function suggestSearchItem() {
    var suggestList = ["Sushi", "Ramen", "Grill", "BBQ", "Pasta", "Foie Gras", "Caviar", "Szechuan", "Sake", "Beer", "Wine"]

    $("#search-restaurant-tab #picture-list").html("<div class='list-prompt'>" + 
        suggestList.map(function (unit) {
            return "<a class='suggest-list-li' " + (unit=="Pasta" || unit=="Sushi" ? "style='color: rgb(99,222,154);'" : "") + " onclick='fillSearchBox(\"" +unit+ "\")'>" + unit + "</a>"
        }).join("") +
        "</div>");      
}
function clearSearchBox () {
    suggestSearchItem()
    $("#search-bar").val(""); 
    $(".clear-search-box").css("display", "none");

}
function enterpressalert(e, textarea){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode       
        searchItem()
        // alert('enter press');
    }
    if (textarea.value != "") {
        $(".clear-search-box").css("display", "block");
    }

}
function initPic() {
    var picHTML = ""
    // var picHTML += "<div class='' style='background: url('++')'></div>"

    var list = imageList.sort(gSort)
    var selfGeo = personalData.geolocation.split(",")

    list.map(function (unit) {
        unit.pics.map(function (pic) {
            // console.log(pic)
            var cssGramFilter = ["ig-xpro2", "ig-walden", "ig-valencia", "ig-sierra", "ig-mayfair", "ig-kelvin", "ig-earlybird", "ig-brannan"]
            var filterIndex = Math.round(cssGramFilter.length * Math.random())            
            var locationPair = unit.geolocation.split(",")
            picHTML = picHTML + "<div class=\"list-group\">" + 
                                    "<ul>" + 
                                        "<li class=\"list-group-title\" onclick='goToRestaurantPage("+ unit.id +", \"" + encodeURIComponent(pic.path) + "\", " + pic.pid + " )'>" + unit.place + "<span class='subtitle-to-right'>" + (Math.round(getDistanceFromLatLonInKm(locationPair[0], locationPair[1], selfGeo[0], selfGeo[1]) *6.25) / 10) + "mi</span>" + "</li>" + 
                                        "<div class='image-class " + cssGramFilter[filterIndex] + "' style='background: url(" + pic.path + ") 100% 100% no-repeat;background-size:cover; '>" + 
                                        "</div>" + 
                                    "</ul>" +
                                "</div>"
        })
    })
    document.getElementById("picture-list").innerHTML = picHTML
    $(".image-class").css("height", $(".image-class").width() + "px")
}
function getImageLightness(imageSrc,callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        callback(brightness);
    }
}

function rangeFilter(list, range) {
    range = range || currentRange
    console.log(range)
    list = list.filter (function (unit) {
        var sGeo = personalData.geolocation.split(",");
        var rGeo = unit.geolocation.split(",");
        // console.log((getDistanceFromLatLonInKm(sGeo[0], sGeo[1], rGeo[0], rGeo[1]) * 0.625))
        return (getDistanceFromLatLonInKm(sGeo[0], sGeo[1], rGeo[0], rGeo[1]) * 0.625) < range; 
    });       
    return list
}

function categoryFilter(list) {
    if (currentCategory == 1 || currentCategory == 0) {
        // list = list 
        list = screenCasual(list)
    } else if (currentCategory == 10) {
        list = list.filter(function (unit) {
            return (unit.category_id == currentCategory) || deliveryAvail(unit)
        });        
        list.sort(gSort)
    }
    else {
        list = list.filter(function (unit) {
            return (unit.category_id == currentCategory)
        });
    }   
    return list
}

function screenCasual (list) {
    return list.filter(function (unit) {
        return (unit.category_id != 10 || currentCategory != 1 )
    })
}
var imageLevel = []
function initPicByTwo (restaurantList, param) {
    var picHTML = ""
    var picHTML1 = ""
    var picHTML2 = ""
    restaurantList = restaurantList || imageList
    param = param || (new Object())
    param.ignoreRange = param ? param.ignoreRange : false;
    param.ignoreCategory = param ? param.ignoreCategory : false;    
    console.log(ll)
    var rank = 1; 
    // if (cssGramFilter[filterIndex] ==)
    restaurantList = restaurantList.filter (function (unit) {
        return (unit.pics.length > 0)
    })
    // restaurantList = screenCasual(restaurantList)
    if (!param.ignoreCategory) {
        restaurantList = categoryFilter(restaurantList)        
    }

    restaurantList = rangeFilter(restaurantList)
    console.log(!currentTitleObject().byDistance)
    if (!currentTitleObject().byDistance) {
        varySeed = randomSeed
        shuffleSeed(restaurantList)
        if (!param.ignoreRange) {
            restaurantList = rangeFilter(restaurantList, 30)
        }
        // restaurantList.sort(ratingSort)
        ll = []
        restaurantList.map(function (unit) {
            var picsList = unit.pics
            shuffle(picsList)
            picsList = picsList.slice(0,3);
            picsList.map(function (pic) {
                ll.push({
                    "image": pic, 
                    "id": unit.id, 
                    "subtitle" : unit.subtitle,
                    "geolocation": unit.geolocation, 
                    "place": unit.place, 
                    "category_name": unit.category_name,
                    "height": unit.height,
                    "price": unit.price, 
                    "delivery_url" : unit.delivery_url, 
                    "reservation_link" : unit.reservation_link
                })         
            })
        });   
        varySeed = randomSeed
        shuffleSeed(ll)
        console.log(ll)        
    } else {
        // restaurantList.sort(gSort)
        var closeList = [[], [], []]
        imageLevel = [[], [], []]

        if (!param.ignoreRange) {
            restaurantList = rangeFilter(restaurantList, 30)
        }
        closeList[0] = rangeFilter(restaurantList, 0.5)
        ll = []
        closeList[0].map(function (unit) {
            var picsList = unit.pics        
            picsList.slice(0,3).map(function (pic) {
                imageLevel[0].push({
                    "image": pic, 
                    "id": unit.id, 
                    "geolocation": unit.geolocation, 
                    "place": unit.place, 
                    "category_name": unit.category_name,
                    "height": unit.height, 
                    "price": unit.price,                     
                    "delivery_url" : unit.delivery_url, 
                    "reservation_link" : unit.reservation_link                    
                    // "friends": unit.friends
                })         
            })
        });   
        varySeed = randomSeed
        shuffleSeed(imageLevel[0]);


        closeList[1] = restaurantList.filter(function (unit) {
            var sGeo = personalData.geolocation.split(",");
            var rGeo = unit.geolocation.split(",");
            var distance = getDistanceFromLatLonInKm(sGeo[0], sGeo[1], rGeo[0], rGeo[1]) * 0.625
            return distance < 2 && distance > 0.5; 
        })      
        closeList[1].map(function (unit) {
            var picsList = unit.pics
            shuffle(picsList)
            picsList.slice(0,3).map(function (pic) {
                imageLevel[1].push({
                    "image": pic, 
                    "id": unit.id, 
                    "geolocation": unit.geolocation, 
                    "place": unit.place, 
                    "category_name": unit.category_name,
                    "height": unit.height, 
                    "price": unit.price,                         
                    "delivery_url" : unit.delivery_url, 
                    "reservation_link" : unit.reservation_link                    
                    // "friends": unit.friends
                })         
            })
        });             
        if (imageLevel[0].length < 10) {
            imageLevel[1] = imageLevel[0].concat(imageLevel[1])
            imageLevel[0] = []
        }  
        shuffleSeed(imageLevel[1]);
      

        closeList[2] = restaurantList.filter(function (unit) {
            var sGeo = personalData.geolocation.split(",");
            var rGeo = unit.geolocation.split(",");
            var distance = getDistanceFromLatLonInKm(sGeo[0], sGeo[1], rGeo[0], rGeo[1]) * 0.625
            return distance > 2;
        })
        closeList[2].map(function (unit) {
            var picsList = unit.pics
            shuffle(picsList)           
            picsList.slice(0,3).map(function (pic) {
                imageLevel[2].push({
                    "image": pic, 
                    "id": unit.id, 
                    "geolocation": unit.geolocation, 
                    "place": unit.place, 
                    "category_name": unit.category_name,
                    "height": unit.height, 
                    "price": unit.price,                         
                    "delivery_url" : unit.delivery_url, 
                    "reservation_link" : unit.reservation_link                    
                    // "friends": unit.friends
                })         
            })
        });            
        shuffleSeed(imageLevel[2]);        
       
        ll = (imageLevel[0].concat(imageLevel[1])).concat(imageLevel[2])



    }
  
    for (var i = 0; i < Math.min(ll.length, pictureIndex); i+=2) {

        picHTML1 = picHTML1 +  imageBlockRender(ll[i], {
                                    "secondColumn": false, 
                                })                                  
        if ( i + 1 < ll.length) {
            picHTML2 = picHTML2 + imageBlockRender(ll[i+1], {
                                    "secondColumn": true, 
                                }) 
        }                                                                
    }
    $(".tab.active #picture-list").removeClass("with-title");
    $(".tab.active #picture-list").addClass("two-column");    
    if (ll.length == 0) {
        $(".tab.active #picture-list").html("<div class='list-prompt'>We are working on it! Come back next week! </div>");
        return;
    }
    $(".tab.active #picture-list").html("<div class='column' id='column-1'>" + picHTML1 + "</div>" + "<div class='column' id='column-2'>" + picHTML2 + "</div>");

    // document.getElementById("picture-list").innerHTML = "<div class='column' id='column-1'>" + picHTML1 + "</div>" + "<div class='column' id='column-2'>" + picHTML2 + "</div>"
    resizeImageByTwo ()
    var htmlString = document.getElementById("rate-page-content-id").innerHTML
    document.getElementById("rate-page-content-id").innerHTML = htmlString
    attachTapHold('.tab.active .image-holder')    
    $$('#rate-page-content-id.infinite-scroll').on('infinite', function () {
        console.log("infinite")
      // Exit, if loading in progress
      if (localStorage.doubleView == 1) return;
      if (loadingInfinite) return;
     
      // Set loading flag
      loadingInfinite = true;
      
     
      // Emulate 1s loading
      setTimeout(function () {
        // Reset loading flag
        loadingInfinite = false;
        // Generate new items HTML
        pictureIndex += pictureEachLoad
        infiniteImageByTwo()
      }, 500);
    });  
}

function imageBlockRender (element, param, noInfo) {
    var categoryHTML, locationHTML, likeHTML;
    likeHTML = "" 
    noInfo = noInfo || false;
    var randomNum = Math.random()
    
    // console.log(noInfo)
    // var likeHTML = "<div class='image-class-location-right' >" + "<i class='fa fa-heart-o'></i>" + "</div>"
    if (currentCategory == -1) {
        categoryHTML = "<div class='image-class-type' >" + 
                    element.category_name.split("&")[0] + 
                 "</div>" 
        locationHTML = "<div class='image-class-location-right' >" + 
                    Math.round(getDistanceFromLatLonInKm(personalData.geolocation.split(",")[0], personalData.geolocation.split(",")[1], 
                        element.geolocation.split(",")[0], element.geolocation.split(",")[1])*6.25)/10 + "mi" +
                 "</div>" + likeHTML

    } else {
        categoryHTML = ""
        actionHTML = ""
        if (element.delivery_url!="" && element.delivery_url !=null) {
            actionHTML = "<div style='background:rgb(99,222,154);' class='button button-fill trigger-button'>ORDER</div>" 
        } else if (element.reservation_link != null && element.reservation_link.indexOf("http") != -1) {
            actionHTML = "<div style='background:crimson;' class='button button-fill trigger-button'>BOOK</div>" 
        }

        locationHTML = "<div class='image-class-location-left' >" + 
                    Math.round(getDistanceFromLatLonInKm(personalData.geolocation.split(",")[0], personalData.geolocation.split(",")[1], 
                        element.geolocation.split(",")[0], element.geolocation.split(",")[1])*6.25)/10 + "mi - " + (element.price || "") + 
                 "</div>" + "<div class='image-class-location-right' >" + 
                    actionHTML +
                 "</div>" + likeHTML
    }


    return "<li class='image-class-half " +(param.secondColumn ? "" : "")+ "' onclick='goToRestaurantPage("+element.id+", \""+encodeURIComponent(element.image.path)+"\", " + element.image.pid + ")' >" + 
                "<a data-url='" +element.image.path+ "' class='image-holder  lazy lazy-fadein ' style='height: " +element.height+ "px; background: url(" + element.image.path + ") 50% 50% no-repeat;background-size:cover; '></a>" + 
                "<div class='image-background' style='height: " +element.height+ "px;'></div>" + 

                ((!noInfo) ? 
                ("<a class='image-class-place'  >" + 
                    "<i class='fa fa-map-marker'></i>" + element.place + 
                 "</a>"          +    
                (element.subtitle ? ("<a class='image-class-subtitle' >" + element.subtitle + "</a>") : "") + 
                 categoryHTML +
                 locationHTML) : "") +  
                ((element.friends && element.friends.length > 0) ? 
                    ("<div id='image-avatar-"+ element.image.pid +"' >" +
                        "<img style='top:" + (element.height-40) + "px' class='image-portrait' src='" + (element.friends[Math.round((element.friends.length-1) * randomNum)].avatar||"img/timi.png") + "'>" + 
                        "<div class='image-portrait-name'>"  + element.friends[Math.round((element.friends.length-1) * randomNum)].username +  "</div>" + 
                    "</div>") : 
                    "<div id='image-avatar-"+ element.image.pid +"' ></div>") +                                          
            "</li>"  
}

function infiniteImageByTwo () {
    mixpanel.track("Infinite loading", {
        "username": personalData.username,
        "index": pictureIndex
    });    
    var cssGramFilter = ["ig-xpro2", "ig-walden", "ig-valencia", "ig-sierra", "ig-mayfair", "ig-kelvin", "ig-earlybird", "ig-brannan"]
    var filterIndex = Math.round(cssGramFilter.length * Math.random())    
    var picHTML = ""
    var picHTML1 = ""
    var picHTML2 = ""
    for (var i = (pictureIndex-20); i < Math.min(ll.length, pictureIndex); i+=2) {
        filterIndex = Math.round(cssGramFilter.length * Math.random())
        picHTML1 = picHTML1 + imageBlockRender(ll[i], {
                                    "secondColumn": false
                                })                                       
        if ( i + 1 < ll.length) {
            filterIndex = Math.round(cssGramFilter.length * Math.random())
            picHTML2 = picHTML2 + imageBlockRender(ll[i+1], {
                                    "secondColumn": false
                                }) 
        }                                                          
    }
    $$(".tab.active #column-1").append(picHTML1)
    $$(".tab.active #column-2").append(picHTML2)
    attachTapHold('.image-holder')
    resizeImageByTwo ()

}

function attachTapHold (className) {
    $$(className).on('taphold', function (e) { 
        e.stopPropagation()
        if (localStorage.usertoken == ray_token || 1) {
            $(".popup-preview-image").css("display", "block")
            var imageURL = $(e.target).attr("data-url")
            var htmlString = '<div class="force-fullscreen animated zoomIn" style="-webkit-animation-duration: 0.2s;animation-duration: 0.2s;background: url(' + imageURL + ') 50% 50% no-repeat;background-size:contain; "></div>'
            // htmlString += '<div class="force-fullscreen-name catch">yay</div>'
            // htmlString += '<div class="force-fullscreen-name catch">yay1</div>'
            // htmlString += '<div class="force-fullscreen-name catch">yay2</div>'                        
            $(".popup-preview-image").html(htmlString)
            $(".force-fullscreen").css("height", $(".force-fullscreen").width() + "px");
            $(".force-fullscreen").css("margin-top", ($(window).height() - $(".force-fullscreen").width())/2 + "px");
            
            $(className).on('touchend', function (ev) {
                // if (localStorage.usertoken == ray_token) {
                    $(".popup-preview-image").css("display", "none")
                // }        
            });    
            // setTimeout(function () {
            //     // $(".catch").bind("touchmove", function(evt){
            //     //     console.log(evt.originalEvent)
            //     //   var touch = evt.originalEvent.touches[0]
                  
            //     //   highlightHoveredObject(touch.clientX, touch.clientY, "catch");
            //     // })      
            //     $(className).bind("touchmove", function(evt){
            //         // console.log(evt.originalEvent)
            //       var touch = evt.originalEvent.touches[0]
            //       highlightHoveredObject(touch.clientX, touch.clientY, "notcatch1", function () {
            //         if (localStorage.usertoken == ray_token ) {
            //             // console.log(tab)
            //             $(".force-fullscreen-name").css("font-size", "20px");           
                    
            //         }                      
            //       });
            //     })       
            //     $(".catch").bind("touchstart", function(evt){
            //         console.log(evt.originalEvent)
            //       var touch = evt.originalEvent.touches[0]
                  
            //       highlightHoveredObject(touch.clientX, touch.clientY, "catch", function () {
            //         $(".catch").css("color", "white"); 
            //         $(this).css("color", "green"); 
            //       });
            //     })                  
            //     // $(".force-fullscreen").bind("touchmove", function(evt){
            //     //     // console.log(evt.originalEvent)
            //     //   var touch = evt.originalEvent.touches[0]
            //     //   highlightHoveredObject(touch.clientX, touch.clientY, "notcatch2");
            //     // })                                     
            // }, 400)
        
            // $(".force-fullscreen-name").on('touchmove', function (ev) {
            //     console.log("aosdkfaokfsd")
            //     if (localStorage.usertoken == ray_token) {
            //         $(".force-fullscreen-name").css("font-size", "30px");
            //         // $(".popup-preview-image").css("display", "none")
            //     }        
            // });                        
        }
    });  
}
function highlightHoveredObject(x, y, tab, callback) {
    $('.catch').each(function() {
        // console.log(x,y)
      // check if is inside boundaries
      if (!(
          x <= $(this).offset().left || x >= $(this).offset().left + $(this).outerWidth() ||
          y <= $(this).offset().top  || y >= $(this).offset().top + $(this).outerHeight()
      )) {
        callback()
      }
    });
}
// function highlightHoveredObject(x, y, tab) {
//     $('.catch').each(function() {
//         // console.log(x,y)
//       // check if is inside boundaries
//       if (!(
//           x <= $(this).offset().left || x >= $(this).offset().left + $(this).outerWidth() ||
//           y <= $(this).offset().top  || y >= $(this).offset().top + $(this).outerHeight()
//       )) {
              
//                 if (localStorage.usertoken == ray_token ) {
//                     console.log(tab)
//                     // $(".force-fullscreen-name").css("font-size", "30px");           
//                     $(".catch").bind("touchmove", function(evt){
//                         console.log(evt.originalEvent)
//                       var touch = evt.originalEvent.touches[0]
                      
//                       highlightHoveredObject(touch.clientX, touch.clientY, "catch");
//                     })                      
//                 }  
//       }
//     });
// }





function resizeImageByTwo () {
    // var width = $(".image-holder").width();
    // var height = width
    // $(".image-holder").css("height", height + "px")
    // $(".image-background").css("height", height + "px") 
    // $(".image-portrait").css("top", height-40 + "px")
}




function initPicByRank(restaurantList) {
    var picHTML = ""
    restaurantList = restaurantList || imageList
    // var picHTML += "<div class='' style='background: url('++')'></div>"

    var cssGramFilter = ["ig-xpro2", "ig-walden", "ig-valencia", "ig-sierra", "ig-mayfair", "ig-kelvin", "ig-earlybird", "ig-brannan"]
    var filterIndex = Math.round(cssGramFilter.length * Math.random())
    console.log(cssGramFilter[filterIndex]); 
    console.log(ll)
    var rank = 1; 
    // if (cssGramFilter[filterIndex] ==)
    restaurantList = restaurantList.filter (function (unit) {
        return (unit.pics.length > 0)
    })

    restaurantList = categoryFilter(restaurantList)
    restaurantList = rangeFilter(restaurantList)
    // if      

    if (currentTitleObject().byDistance) {
        varySeed = randomSeed
        shuffleSeed(restaurantList)
        // restaurantList.sort(ratingSort)
        console.log(ll)        
    } else {
        restaurantList.sort(gSort)            
    }    


    restaurantList.map(function (unit) {
        filterIndex = Math.round(cssGramFilter.length * Math.random())
        var classString = "style = 'background: rgb(99, 222, 154);'"
        if (rank > 1) {
            classString = ""
        }

        picHTML = picHTML + 
                "<div class=\"list-group\">" + 
                                "<ul>" + 
                                        "<div class='image-class-half lazy lazy-fadein "+cssGramFilter[filterIndex]+" ' onclick='goToRestaurantPage("+unit.id+", \""+encodeURIComponent(unit.pics[0].path)+"\", " + unit.pics[0].pid + ")' style='background: url(" + unit.pics[0].path + ") 100% 100% no-repeat;background-size:cover; '>" + 
                                        "</div>"  +
                                        "<div class='image-class-half-group' onclick='goToRestaurantPage("+unit.id+", \""+encodeURIComponent(unit.pics[0].path)+"\", " + unit.pics[0].pid + ")' >" + 
                                            "<div class='image-class-top' " +classString+ ">#" + 
                                                rank + 
                                            "</div>" +    
                                            "<div class='image-class-category'>" + 
                                                Math.round(getDistanceFromLatLonInKm(personalData.geolocation.split(",")[0], personalData.geolocation.split(",")[1], 
                                                    unit.geolocation.split(",")[0], unit.geolocation.split(",")[1])*6.25)/10 + "mi" +
                                            "</div>" +                                                                                    
                                            "<div class='image-class-title'>" + 
                                                unit.place + " <span class='image-subtitle'>"+ unit.subtitle + "</span>" +
                                            "</div>" + 
                                            // "<div class='image-class-price'>" + 
                                            //     unit.price + 
                                            // "</div>" +                                                                                            
                                        "</div>"                                        
        picHTML = picHTML + 
                "</ul>" + 
                "</div>"                                                
        rank++
    })    
    $("#picture-list").addClass("with-title");
    $("#picture-list").removeClass("two-column"); 
    // $("#rate-page-content-id").removeClass("infinite-scroll");      
    document.getElementById("picture-list").innerHTML = picHTML
    if (restaurantList.length == 0) {
        document.getElementById("picture-list").innerHTML = "<div class='list-prompt'>We are working on it! Come back next week! </div>";
        return;
    }

    $(".image-class-half").css("height", $(".image-class-half").width() + "px")
    document.getElementById("rate-page-content-id").innerHTML = document.getElementById("rate-page-content-id").innerHTML
}


var rateIndex = null; 
// var nextIndex; 
function initScore () {

    if (rateIndex == null || rateIndex == -1) {
        rateIndex = userList.length-1; 
        if (rateIndex == -1) {
            $("#rate-element .row").css("display", "none")
            $("#rate-prompt").html("<div class='button color-pink' onclick='initScore()'>Loading...Click to refresh</div>")    
            return; 
        } else {
            $("#rate-element .row").css("display", "flex")            
        }
    } 
    $("#rate-img").css("background", "url('"+ userList[rateIndex].avatar + " ') no-repeat 50% 50%")
    $("#rate-img").css("height", $("#rate-img").width())
    $("#rate-prompt").html("Rate " + userList[rateIndex].username)    

}
function rateButton (innerText) {
    console.log(this)
    var e = this
    var score = Math.round(Math.random() * 10); 
    // var nextIndex = rateIndex- 1
    $("#rate-prompt").html("You gave "+ userList[rateIndex].username +" " + innerText + " points, it's acutally " + score + "/10 . Fuck. Rate " + userList[rateIndex-1].username)
    // rateIndex--; 
    // rateIndex--; 
    rateIndex--
    $("#rate-img").css("background", "url('"+ userList[rateIndex].avatar + " ') no-repeat 50% 50%")
    // document.getElementById("rate-img").src = userList[rateIndex].avatar;     
}

var map;
var searchMap 
var latlngbounds; 

function loadSearchMap (restaurantList) {
    // restaurantList
    // if (searchMap != null) return;
    var sgeolocation = personalData.geolocation.split(",");

    myLatLng = new google.maps.LatLng(parseFloat(sgeolocation[0]), parseFloat(sgeolocation[1])); 
    console.log(myLatLng, sgeolocation)
    searchMap = new google.maps.Map(document.getElementById('map-element'), {
        center: myLatLng,
        zoom: 15, 
    }); 
    var image = new google.maps.MarkerImage(
        'http://plebeosaur.us/etc/map/bluedot_retina.png',
        null, // size
        null, // origin
        new google.maps.Point( 8, 8 ), // anchor (move to center of marker)
        new google.maps.Size( 17, 17 ) // scaled size (required for Retina display icon)
    );    
    var sMarker = new google.maps.Marker({
        position: myLatLng,
        map: searchMap,
        icon: image, 
    });  
    restaurantList = restaurantList || imageList
    restaurantList = restaurantList.filter (function (unit) {
        return (unit.pics.length > 0)
    })

    restaurantList = categoryFilter(restaurantList)
    restaurantList.sort(gSort)
    // restaurantList = rangeFilter(restaurantList, 20)    
    geoList = []
    latlngbounds = new google.maps.LatLngBounds();

    // document.getElementById("search-preview").innerHTML
    var swiperHTML = "" +
        '    <div class="swiper-wrapper">'

    var imageWidth; 
    for (var i = 0; i < Math.min(20,restaurantList.length) ; i++) {
        // console.log(restaurantList[i])

        var rgeolocation = restaurantList[i].geolocation.split(",")
        var rLatLng = new google.maps.LatLng(parseFloat(rgeolocation[0]), parseFloat(rgeolocation[1])); 
        latlngbounds.extend(rLatLng);        
        var rMarker; 
        if (i == 0) {
            rMarker = new google.maps.Marker({
                position: rLatLng,
                map: searchMap,
                icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png", 
            });  
        } else {
            rMarker = new google.maps.Marker({
                position: rLatLng,
                map: searchMap,
                icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png", 
            });   
        }


        // rMarker.
        gmarkers.push(rMarker);    


        var contentString = iconUI(restaurantList[i])

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        ginfo.push(infowindow)
        // rMarkerfunction = attachInfoWindowToMarker(rMarker, infowindow);
        rMarker = attachSliderCallbackToMarker (rMarker, i)
        geoList.push(restaurantList[i])
        imageWidth = ($(window).width()-40)/3; 
        swiperHTML += '        <div class=" swiper-slide swiper-card" onclick="clickRestaurantPageFromMapSlider ('+restaurantList[i].id+', \''+encodeURIComponent(restaurantList[i].pics[0].path)+'\', '+restaurantList[i].pics[0].pid+')">' + 

            '<div  class="swiper-image" style="width: 100%; height: ' + imageWidth + 'px; background-size: cover!important; background: url(' + restaurantList[i].pics[0].path + ') 50% 50% no-repeat;" >'  + '</div>' + 
            '<div class="swiper-place">' + restaurantList[i].place + '</div>' +
            '<div class="swiper-card-shade" style="width: 100%; height: ' + imageWidth + 'px;"></div>' +            
        '</div>'

    }
    swiperHTML += '</div>'
    document.getElementById("search-preview").innerHTML = swiperHTML
    $("#search-preview").css("height", (imageWidth + 0) +"px");
    $("#map-element").css("height", $(window).height() - 84 - $(".restaurant-category-block").height() - imageWidth + "px");
    if (mapSwiper!=null) {
        mapSwiper.destroy();
    }
    mapSwiper = myApp.swiper('#search-preview', {
        speed: 200,
        spaceBetween: 8, 
        slidesPerView: 3, 
        centeredSlides: true,
        onSlideChangeStart: function (swiper) {
            console.log(swiper.activeIndex)
            var rgeolocation = geoList[swiper.activeIndex].geolocation.split(",")
            var markerNow = new google.maps.Marker({
                position: (new google.maps.LatLng(parseFloat(rgeolocation[0]), parseFloat(rgeolocation[1]))),
                map: searchMap,
                icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png", 
            });   
            if (!searchMap.getBounds().contains(markerNow.position)){
                searchMap.setCenter(markerNow.position)
            }
            gmarkers.push(markerNow); 
            attachSliderCallbackToMarker(markerNow, swiper.activeIndex) 
            var prevIndex = swiper.previousIndex;
            var rgeolocation = geoList[prevIndex].geolocation.split(",")
            var markerPrev = new google.maps.Marker({
                position: (new google.maps.LatLng(parseFloat(rgeolocation[0]), parseFloat(rgeolocation[1]))),
                map: searchMap,
                icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png", 
            });    
            gmarkers.push(markerPrev);   
            attachSliderCallbackToMarker(markerPrev, prevIndex)         
             
        }
    });       
    $("#search-in-map").css("background", "#464748")
    document.getElementById("search-in-map").innerHTML = "Search In This Area"
    document.getElementById("search-in-map").onclick = function () {
        searchInArea()       
    }        
    // latlngbounds.extend(myLatLng);    
    setTimeout(function () {
        searchMap.setCenter(latlngbounds.getCenter());
        searchMap.fitBounds(latlngbounds);   
    }, 400)
}

function clickRestaurantPageFromMapSlider(id, ecodedUrl, pid){
    var unit = geoList.filter(function (unit) {
        return unit.id == id;
    })[0]
    mixpanel.track("Clicked Restaurant", {
        "username": personalData.username,
        "yelp_url": unit.yelp_url, 
        "place": unit.place,        
        "address": unit.address, 
        "phone" : unit.phone, 
        "website": unit.website, 
        "currentTab": currentTabPage, 
    });    
    goToRestaurantPage(id, ecodedUrl, pid)
}

function iconUI (unit) {
    // console.log(unit.pics[0].path)
    return '<div onclick="goToRestaurantPage ('+unit.id+', \''+encodeURIComponent(unit.pics[0].path)+'\', '+unit.pics[0].pid+')">'+
                '<div class="" >' + unit.place + '</div>'+
                '<div id="bodyContent">'+
                    '<img class="icon-img" src ="'+ unit.pics[0].path +'">' + 
                '</div>' +
            '</div>';
}
function attachInfoWindowToMarker(rMarker, infowindow) {
            ginfo.push(infowindow)
    return rMarker.addListener('click', function() {
        console.log(i)
        // infowindow.close()
        ginfo.map(function (unit) {
            unit.close()
        })
        infowindow.open(searchMap, rMarker);
    });
}
function attachSliderCallbackToMarker(rMarker, index) {
    rMarker.addListener('click', function() {
        // console.log(index)
        mapSwiper.slideTo(index)
    });  
    // console.log(rMarker)
    return rMarker  
}
var gmarkers = []
var ginfo = []
function removeMarkers () {
    for ( i = 0 ; i < gmarkers.length; i++){
        if (gmarkers.map != null) {
                gmarkers[i].setMap(null);
        }
        
        // try {
        //     gmarkers[i].setMap(null);
        // } catch(err) {

        // }
        
    }
}
var geoList =[]
function searchInArea (restaurantList) {
    // searchMap.getBounds().b // 73
    // searchMap.getBounds().f // 40
    removeMarkers () 
    latlngbounds = new google.maps.LatLngBounds();
    restaurantList = restaurantList || imageList
    console.log(restaurantList)
    restaurantList = restaurantList.filter (function (unit) {
        return (unit.pics.length > 0)
    })

    restaurantList = categoryFilter(restaurantList)
    restaurantList = rangeFilter(restaurantList)  

    var imageWidth;

    var swiperHTML = "" +
        '    <div class="swiper-wrapper">'
    mapSwiper.destroy();
    var i = 0;
    geoList = restaurantList.filter(function (unit) {
        var rgeolocation = unit.geolocation.split(",")    
        var rLatLng = new google.maps.LatLng(parseFloat(rgeolocation[0]), parseFloat(rgeolocation[1]))    
        if (searchMap.getBounds().contains(rLatLng)) {
            var rMarker; 
            if (i == 0) {
                rMarker = new google.maps.Marker({
                    position: rLatLng,
                    map: searchMap,
                    icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png", 
                });  
            } else {
                rMarker = new google.maps.Marker({
                    position: rLatLng,
                    map: searchMap,
                    icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png", 
                });   
            } 
            var contentString = iconUI(unit)

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });            
            // rMarkerfunction = attachInfoWindowToMarker(rMarker, infowindow)
            rMarker = attachSliderCallbackToMarker (rMarker, i)

            latlngbounds.extend(rLatLng);   
            gmarkers.push(rMarker);   
            imageWidth = ($(window).width()-40)/3; 
            swiperHTML += '        <div onclick="clickRestaurantPageFromMapSlider ('+unit.id+', \''+encodeURIComponent(unit.pics[0].path)+'\', '+unit.pics[0].pid+')" class="col-33 swiper-slide swiper-card">' + 
                '<div  class="swiper-card-shade" style="width: 100%; height: ' + imageWidth + 'px;"></div>' +  
                '<div class="swiper-image" style="width: 100%; height: ' + imageWidth + 'px; background-size: cover!important; background: url(' + unit.pics[0].path + ') 50% 50% no-repeat;" >'  + '</div>' + 
                '<div class="swiper-place">' + unit.place + '</div>' +
          
            '</div>' 
            i++;  
            // mapSwiper.appendSlide(swiperHTML);                          
        }
   
    
        return searchMap.getBounds().contains(rLatLng)
        // rgeolocation[0]
    });
    swiperHTML += '</div>'
    document.getElementById("search-preview").innerHTML = swiperHTML    
    mapSwiper = new Swiper('#search-preview', {
        speed: 200,
        spaceBetween: 8, 
        slidesPerView: 3,
        centeredSlides: true,
        onSlideChangeStart: function (swiper) {
            console.log(swiper.activeIndex)
            var rgeolocation = geoList[swiper.activeIndex].geolocation.split(",")
            var markerNow = new google.maps.Marker({
                position: (new google.maps.LatLng(parseFloat(rgeolocation[0]), parseFloat(rgeolocation[1]))),
                map: searchMap,
                icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png", 
            });   
            gmarkers.push(markerNow);      
            attachSliderCallbackToMarker(markerNow, swiper.activeIndex)
            if (!searchMap.getBounds().contains(markerNow.position)){
                searchMap.setCenter(markerNow.position)
            }
            
            var prevIndex = swiper.previousIndex;
            var rgeolocation = geoList[prevIndex].geolocation.split(",")
            var markerPrev = new google.maps.Marker({
                position: (new google.maps.LatLng(parseFloat(rgeolocation[0]), parseFloat(rgeolocation[1]))),
                map: searchMap,
                icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png", 
            });    
            gmarkers.push(markerPrev);  
            attachSliderCallbackToMarker(markerPrev, prevIndex) 
        }        
        // freeMode: true
    });       
    if (geoList.length == 0) {
        myApp.alert("No featured spot is in this area. Please try again! ")
        return;
    }


    $("#search-in-map").css("background", "rgb(99, 222, 154)")
    document.getElementById("search-in-map").innerHTML = "Show Search Results"
    document.getElementById("search-in-map").onclick = function () {
        mixpanel.track("map-to-listing");
        myApp.showTab("#rate-tab");
        console.log(geoList); 
        initPicByTwo(geoList, {
            ignoreRange: true
        })
        // currentTitleObject().callback(geoList, false)
        document.getElementById("home-page-navbar-center").innerHTML = "Best In the Map"
        // home-page-navbar-center
    }
    google.maps.event.addListener(searchMap, "bounds_changed", mapSettleTime); 



    // restaurantList = geoList
    console.log(geoList)
}

function mapSettleTime() {
    $("#search-in-map").css("background", "#464748")
    // document.getElementById("search-in-map").style.background = "rgb(99, 222, 154);"
    document.getElementById("search-in-map").innerHTML = "Search In This Area"
    document.getElementById("search-in-map").onclick = function () {
        searchInArea()
    }
}    

function initMap (locationString) {
    var rgeolocation = locationString.split(","); 
    var sgeolocation = personalData.geolocation.split(",");

    rLatLng = new google.maps.LatLng(parseFloat(rgeolocation[0]), parseFloat(rgeolocation[1])); 
    myLatLng = new google.maps.LatLng(parseFloat(sgeolocation[0]), parseFloat(sgeolocation[1])); 
    map = new google.maps.Map(document.getElementById('restaurant-map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 10, 
        draggable: false, 
        zoomControl: false, 
        scrollwheel: false, 
        disableDoubleClickZoom: true
    });          
    var rMarker = new google.maps.Marker({
        position: rLatLng,
        map: map,
        icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png" 
    });    
    var image = new google.maps.MarkerImage(
        'http://plebeosaur.us/etc/map/bluedot_retina.png',
        null, // size
        null, // origin
        new google.maps.Point( 8, 8 ), // anchor (move to center of marker)
        new google.maps.Size( 17, 17 ) // scaled size (required for Retina display icon)
    );    
    var sMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image, 
    });  
    sMarker.setMap(map); 
    rMarker.setMap(map);        
    latlngList = [];
    friendMarkers = [];
    latlngbounds = new google.maps.LatLngBounds();
    latlngbounds.extend(rLatLng);
    latlngbounds.extend(myLatLng);    
    setTimeout(function () {
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);   
    }, 400)
       // if (map.getZoom() > 11) {
         map.setZoom(20);

      
    // var i = 0
    // userList.reverse().map(function (unit) {
    //     if (i > 20) {
    //         return;
    //     }
    //     var geo = unit.geolocation; 
    //     console.log(geo)
    //     var friendLatLng = new google.maps.LatLng(
    //         parseFloat(geo.split(",")[0]), 
    //         parseFloat(geo.split(",")[1]));
    //     if (getDistanceFromLatLonInKm(geolocation[0], geolocation[1], geo.split(",")[0], geo.split(",")[1]) < 2) {
    //         var image = {
    //             url : unit.avatar, 
    //             size : new google.maps.Size(44,44), 
    //             scaledSize: new google.maps.Size(44, 44), 
    //         } 
    //         var friendMarker = new google.maps.Marker({
    //             position: friendLatLng,
    //             map: map,
    //             title: 'Hello World!', 
    //             icon: image 

    //         });   
    //         friendMarkers.push(friendMarker); 
    //         latlngList.push(friendLatLng); 
    //         latlngbounds.extend(friendLatLng);
    //         google.maps.event.addListener(friendMarkers[friendMarkers.length - 1], 'click', function() {
    //             catchUser(unit)
    //             // myApp.alert(unit.username)
    //         });
    //     }
    //     i++
    // });    
       
    // userList.reverse()
}

$$('#search-tab').on('show', function () {
    currentTabPage = "search-tab"
    
    changeNavbarTitle("NEW FRIENDS", barIconHTML, "<a class=\"link right-link\" onclick='myApp.showTab(\"#more-tab\")'><img src = \'"+ (personalData.avatar || "img/timi.png" )+"\' class=\"navbar-chatting-avatar\"></a>");      
    $(".subnavbar").css("display", "none")
    // $(".home-nav").css("visibility", "hidden") 
    nearbyPendingNum = 0;
    discoverStrangers()
    updateTabUI()
    document.getElementById("home-page-navbar-center").onclick = function () {
        selectActivity()
    }
    $("#home-page-navbar-center").removeClass("activity-button")
});
$$('#event-tab').on('show', function () {
    currentTabPage = "event-tab"
    localStorage.unread = 0;
    
    changeNavbarTitle("NOTIFICATIONS", barIconHTML, "<a class=\"link right-link\" onclick='myApp.showTab(\"#more-tab\")'><img src = \'"+ (personalData.avatar || "img/timi.png" )+"\' class=\"navbar-chatting-avatar\"></a>");       
    $(".subnavbar").css("display", "none")
    // $(".home-nav").css("visibility", "hidden")
    document.getElementById("event-list").innerHTML = "<ul>" + "<div class='list-prompt'>Loading...</div>" + "</ul>";     
    if ( eventsList.length > 0 ) {
        updateInvitationPage()
    }
    getRecentRequests( function () {
        updateInvitationPage()
    });   
    document.getElementById("event-badge").style.display = "none";
    updateTabUI()
    $("#home-page-navbar-center").removeClass("activity-button")
    document.getElementById("home-page-navbar-center").onclick = function () {

    }    
});
function readEventsUserProfile (index) {
    if (eventsList[index].super==0 && eventsList[index].status == 0) {
        return;
    }
    showPersonalPage(eventsList[index])
}

function openPhotoAlbum(index) {
    console.log(myPhotoBrowserStandalone)
    myPhotoBrowserStandalone[index].open()
}

function findoutWho (request_day, request_time) {
    myApp.showTab("#explore-tab"); 
    timeSlot = 0; 
    if (request_day == queryDay) {
        if (request_time == 3) {
            timeSlot = 3; 
        } else {
            timeSlot = 0
        }
    } else if ((request_day - 1) % 7 == queryDay) {
        timeSlot = 1
    } else {
        timeSlot = 2
    }
    
    setTimeout(function () {
        $(".time-tab")[timeSlot].click(); 
        myApp.alert("You will be matched with the person who secretly liked you if you like back too:) Swipe to find out! ")
    }, 300)

    
}
var isShowMoreInvitation = true; 
function showMoreInvitation () {
    isShowMoreInvitation = (isShowMoreInvitation ? false : true); 
    $("#show-more-button").html(isShowMoreInvitation ? "Show Less" : "Show More"); 
    if (isShowMoreInvitation) {
        $(".following-card").css("display", "block")
    } else {
        $(".following-card").css("display", "none")
    }
    
}
var categoryList = [];
var currentCategory = 1; 
var currentRange = 20000;
function loadCategory (id, elem) {

    if (id == currentCategory) return;
    pictureIndex = 20;
    currentCategory = id
    mixpanel.track("change category", {
        "username": personalData.username,
        "category_id": id,
        "currentTab": currentTabPage
    });    
    if (currentTabPage == "map-tab") {
        changeNavbarTitle("MAP", "<a class=\"link back-link\" onclick='myApp.showTab(\"#rate-tab\")'>Back</a>", barIconHTML);      
        $(".subnavbar").css("display", "none")  
        $("#home-page-navbar-center").removeClass("activity-button")  
        document.getElementById("home-page-navbar-center").onclick = function () {

        }   
        mapSettleTime()         
    } else {
        var leftIconHTML = "<a class=\"link left-link\" onclick='switchView()'>" + currentViewObject().leftIcon + "</a>"
        var rightIconHTML = "<a class=\"link right-link\" onclick='myApp.showTab(\"#map-tab\")' >MAP</a>";     
        changeNavbarTitle(currentTitleObject().titleHTML, leftIconHTML, rightIconHTML);           
        currentTitleObject().callback(imageList)
        mapSettleTime()
    }
   
    $(".category-tab.col-25").removeClass("active")
    $(elem).addClass("active")
    
}

var isShowingAllBookmarks = true;


// var categoryList = JSON.parse('[{"category_id":"1","name":"Featured","path":"http://gettimi.com/images/category/general.svg"},{"category_id":"2","name":"Brunch","path":"http://gettimi.com/images/category/brunch.svg"},{"category_id":"3","name":"Japanese","path":"http://gettimi.com/images/category/japenese.svg"},{"category_id":"4","name":"Bar","path":"http://gettimi.com/images/category/bar.svg"},{"category_id":"5","name":"Italian","path":"http://gettimi.com/images/category/italian2.svg"},{"category_id":"6","name":"American","path":"http://gettimi.com/images/category/delivery2.svg"},{"category_id":"7","name":"Dessert","path":"http://gettimi.com/images/category/dessert.svg"},{"category_id":"8","name":"Tea Time","path":"http://gettimi.com/images/category/afternoontea.svg"},{"category_id":"9","name":"Chinese","path":"http://gettimi.com/images/category/chinese.svg"}]');

var likeList = [];
var mylikeList


function loadPersonalInfoFromLikes (user_id, callback) {
    var user = likeList.filter(function (unit) {
        return unit.user_id == user_id
    })[0];
    user.geolocation = user.geolocation_person
    user.phone = user.phone_person
    if (callback != null) {
        callback(user)
    }
    
}

function loadEventInfoFromLikes (event_id, callback, encodedURL, pid) {
    var ev = likeList.filter(function (unit) {
        return unit.id == event_id
    })[0];
    ev.event_id = ev.id
    if (callback != null) {
        callback(ev, encodedURL, pid)
    }
}
function bookmarkButtonUI (ev) {
    if (ev.self) {
        return '    <a href="#" class="link" ><i class="fa fa-bookmark-o"></i></a> '
    } else {
        return '    <a href="#" class="link" ><i style="color: rgb(222,99,99)" class="fa fa-bookmark"></i></a> '
    }
}

function descriptionHTML(unit) {
    return '<div class="facebook-description"><a onclick="loadEventInfoFromLikes('+unit.id+',showEventPage, \''+ encodeURIComponent(generatePicObject(unit).path) + '\', ' + generatePicObject(unit).pid +')">' + 
    // text +
                unit.description.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br>') +
            '</div><div style="padding-bottom: 15px;"></a></div>'
}

function generatePicObject (unit) {
    return unit.pics[parseInt(unit.phone_person) % unit.pics.length]
}


function showBookMarks () {
    if (isShowingAllBookmarks) {
        filteredLikeList = likeList
    } else {
        filteredLikeList = mylikeList
    }
    var ll = []
    if (currentBookmarkObject().byDistance == true) {
        filteredLikeList.sort(gSort)
    } else {
        filteredLikeList.sort(timeSort)
    }
    filteredLikeList.map(function (unit) {
        ll.push({
            "image": unit.pics[loseCode(unit.username) * primeNumberToday() % unit.pics.length], 
            "id": unit.id, 
            "price": unit.price,
            "geolocation": unit.geolocation, 
            "place": unit.place, 
            "height": unit.height,
            "category_name": unit.category_name, 
            "friends": [unit], 
        })    
    })
    // original UI
    // showBookMarkUIPinterestFlow (ll)

    //new UI
    if ( (localStorage.usertoken == ray_token || 1) && isShowingAllBookmarks) {
        // showBookMarkUIPinterestFlow (ll)
        showBookmarkPinterestMessageUI(filteredLikeList)
    } else {
        showBookMarkUIPinterestFlow (ll)
    }   
}
function showPersonalPins () {
    console.log(i)
}
var plist = []
function showBookmarkPinterestMessageUI (list) {
    plist = []; 

    list.map(function (unit) {
        if (plist.length == 0 || plist[plist.length-1].username != unit.username) {
            var userElem = {
                "username": unit.username, 
                "avatar": unit.avatar, 
                "bookmarks" : [], 
                "place": unit.place, 
            }
            plist.push(userElem)
        } 
        var eventElem = {
            "pics": unit.pics, 
            "id": unit.id, 
            "price": unit.price,
            "geolocation": unit.geolocation, 
            "place": unit.place, 
            "category_name": unit.category_name, 
            "friends": [unit],             
        }
        plist[plist.length-1].bookmarks.push(eventElem)
    }); 
    var htmlString = ""
    shuffle(plist)
    plist.slice(0,10).map(function (unit, i) {
        if (i > 0){

        }
        htmlString += "<div class='p-avatar'>" +
                        "<img class='image-portrait' style='vertical-align:top;'  src='" + unit.avatar + "'>" + 
                        "<div class='pins-block'>" + 
                            "<span class='pins-block-title'><span style='font-weight: 600;'>" + unit.username + "</span> bookmarked " + unit.bookmarks.length + " places" + "</span>" + 
                        "</div>" +
                        "<div class='pins-block-picture'>" + 
                            unit.bookmarks.map(function (pic) {
                                // console.log(pic)
                                var picElem = pic.pics[loseCode(unit.place) * primeNumberToday() % pic.pics.length]
                                // console.log(picElem)
                                // pic = [loseCode(unit.place) * primeNumberToday() % unit.pics.length]
                                return "<div class='pins-img-block'><div data-url='" + picElem.path + "' onclick='goToRestaurantPage("+pic.id+", \""+encodeURIComponent(picElem.path)+"\", " + picElem.pid + ")' class='pins-block-img ' style='background: url(" + picElem.path + ") 50% 50% no-repeat; background-size: 150%;'></div>" + 
                                "<div class='pins-block-name'>" + pic.place + "</div>" + 
                                "<div class='pins-block-name'>" + Math.round(getDistanceFromLatLonInKm(personalData.geolocation.split(",")[0], personalData.geolocation.split(",")[1], 
                        pic.geolocation.split(",")[0], pic.geolocation.split(",")[1])*6.25)/10 + "mi - " + pic.price + "</div></div>"                                 
                            }).join("") +
                            // ((unit.bookmarks.length>3) ? "<div class='pins-block-img pins-block-img-gray' data-index='" +i+ "'>" + (unit.bookmarks.length-3) + "</div>" : "") +                               
                        "</div>" + 
                    " </div>"
    });
    if (plist.length == 0) {
        $(".tab.active #moment-list").html("<div class='list-prompt'>You do not have bookmarks yet! Click <i class='fa fa-heart-o'></i> on places you have in mind! </div></ul>")
    } else {
        $(".tab.active #moment-list").html(htmlString)
    }   
    attachTapHold(".pins-block-img")
    // $(".pins-block-img-gray").map(function (i, elem) {
    //     // console.log(unit, i)
    //     var index = $(elem).attr('data-index')
    //     console.log(index)
    //     $(elem).on('click', function () {
    //         var ll = []
    //         plist[index].bookmarks.map(function (unit) {
    //             ll.push({
    //                 "image": unit.pics[0], 
    //                 "id": unit.id, 
    //                 "price": unit.price,
    //                 "geolocation": unit.geolocation, 
    //                 "place": unit.place, 
    //                 "height": unit.height,
    //                 "category_name": unit.category_name, 
    //                 "friends": [unit], 
    //             })    
    //         });   
    //         console.log(ll)
    //         mainView.router.loadPage({
    //             "pageName": "pin-list"
    //         }); 
    //         hh= ll
    //         showBookMarkUIPinterestFlow(ll)
    //     })
    // })
    
}
hh= []

function showBookMarkUIPinterestFlow (ll) {
    var htmlString = "", picHTML1 = "", picHTML2 = "";    
    for (var i = 0; i < Math.max(ll.length, 0); i+=2) {
        picHTML1 = picHTML1 + imageBlockRender(ll[i], {
                                    "secondColumn": false, 
                                })                                  
        if ( i + 1 < ll.length) {
            picHTML2 = picHTML2 + imageBlockRender(ll[i+1], {
                                    "secondColumn": true, 
                                }) 
        }
    } 
    if (ll.length == 0) {
        $(".active.tab #moment-list").html("<div class='list-prompt'>We are working on it! Come back next week! </div>")
        return;
    }
    
    $(".active.tab #moment-list").html("<div class='column' id='moment-column-1'>" + picHTML1 + "</div>" + "<div class='column' id='moment-column-2'>" + picHTML2 + "</div>" )
    $(".page-on-center.page #moment-list").html("<div class='column' id='moment-column-1'>" + picHTML1 + "</div>" + "<div class='column' id='moment-column-2'>" + picHTML2 + "</div>" )    
    if (filteredLikeList.length == 0) {
        $(".active.tab #moment-list").html("<div class='list-prompt'>You do not have bookmarks yet! Click <i class='fa fa-heart-o'></i> on places you have in mind! </div></ul>")
        $(".page-on-center.page #moment-list").html("<div class='list-prompt'>You do not have bookmarks yet! Click <i class='fa fa-heart-o'></i> on places you have in mind! </div></ul>")

    } 
    attachTapHold(".active.tab .image-holder")
}
// showEventPage(unit, encodedURL, pid)

function loadEventInfo (event_id, callback, encodedURL, pid) {
    var ajaxUrl = "http://gettimi.com/site/GetEventById?user_token=" + localStorage.usertoken + "&event_id=" + event_id
    myApp.showIndicator()
    try {
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {
                myApp.hideIndicator()
                console.log(JSON.parse(results.result))

                if (callback != null) {
                    callback(JSON.parse(results.result), encodedURL, pid)
                }
                
            }, 
            error: function (results) {
                myApp.hideIndicator()
                // myApp.hideIndicator()
                // console.log(results)
                // myApp.alert("Network error. Please try again later? ")
            }
        });  
    } catch(err) {
        myApp.hideIndicator()
    }
}
var refreshBookMarks = true;
function getMyLikes (refresh, callback) {

    // not force, > 0, no refresh
    // force refresh
    // == 0 refresh
    console.log(1)

    refresh = refresh || false
    if (likeList.length > 0 && !refresh) {
        console.log(2)
        if (callback != null){
          callback()  
        }
        myApp.pullToRefreshDone();
        return; 
    }
    var ajaxUrl = "http://gettimi.com/site/ReturnMyLikes?user_token="+ localStorage.usertoken
    // myApp.showIndicator()
    try {
        console.log(3)
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {
                console.log(4)
                myApp.hideIndicator()
                refreshBookMarks = false;
                mylikeList = JSON.parse(results.result)
                mylikeList = mylikeList.map(function (unit, i) {
                    // console.log(unit, i)
                    var rando = loseCode(unit.place)*primeNumberToday() * (i % 3) % 79
                    // console.log(rando)
                    if (rando > 66) rando+= 66
                    var width = $(window).width()/2-18;
                    var height = width - 40 + rando                
                    unit.height = height
                    return unit;
                })                
                // shuffleSeed(likeList)
                myApp.pullToRefreshDone();
                if (callback != null){
                    callback ()
                }
                
                

            }, 
            error: function (results) {
                console.log(5)
                myApp.hideIndicator()
                myApp.pullToRefreshDone();
                // myApp.hideIndicator()
                // console.log(results)
                // myApp.alert("Network error. Please try again later? ")
            }, 
            timeout: 15000
        });              
    } catch (err) {
        console.log(6)
        myApp.hideIndicator()
        myApp.pullToRefreshDone();
    }
  
}
function getFriendsLikes (refresh, callback) {

    // not force, > 0, no refresh
    // force refresh
    // == 0 refresh
    console.log(1)

    refresh = refresh || false
    console.log(likeList.length > 0, (!refresh))
    if (likeList.length > 0 && (!refresh)) {
        console.log(2)
        if (callback != null){
            console.log(2.5, callback)
            likeList = likeList.map(function (unit) {
                var rando = loseCode(unit.place)*primeNumberToday()%79
                if (rando > 66) rando+= 66
                var width = $(window).width()/2-18;
                var height = width - 40 + rando                
                unit.height = height
                return unit;
            })           
            aa = callback        
            callback()  
        }
        myApp.pullToRefreshDone();
        return; 
    }
    var ajaxUrl = "http://gettimi.com/site/ReturnAllFriendsLikes?user_token="+ localStorage.usertoken
    // myApp.showIndicator()
    try {
        console.log(3)
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {
                console.log(4)
                myApp.hideIndicator()
                refreshBookMarks = false;

                likeList = JSON.parse(results.result)
                likeList = likeList.map(function (unit) {
                    var rando = loseCode(unit.place)*primeNumberToday()%79
                    if (rando > 66) rando+= 66
                    var width = $(window).width()/2-18;
                    var height = width - 40 + rando                
                    unit.height = height
                    return unit;
                })                                
                // shuffleSeed(likeList)
                myApp.pullToRefreshDone();
                if (callback != null){
                    callback ()
                }
                
                

            }, 
            error: function (results) {
                console.log(5)
                myApp.hideIndicator()
                myApp.pullToRefreshDone();
                // myApp.hideIndicator()
                // console.log(results)
                // myApp.alert("Network error. Please try again later? ")
            }, 
            timeout: 15000
        });              
    } catch (err) {
        console.log(6)
        myApp.hideIndicator()
        myApp.pullToRefreshDone();
    }
  
}

function getCategories() {
    var ajaxUrl = "http://gettimi.com/site/ReturnAllCategories?user_token=" + localStorage.usertoken;
    // myApp.showIndicator()
    try {
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {
                myApp.hideIndicator()
                var htmlString = ""
                // htmlString += "<div class=\"row restaurant-info-bar\"> ";            
                categoryList = JSON.parse(results.result);
                var active = true;
                console.log(currentHours)
                
                // currentHours = 18
                if (currentHours > 20 || currentHours < 3) {
                    // bar
                    var elem = categoryList[1]; 
                    categoryList[1] = categoryList[3]; 
                    categoryList[3] = elem;                    
                } else if (currentHours < 11) {
                    // brunch
                    var elem = categoryList[3]; 
                    categoryList[3] = categoryList[7]; 
                    categoryList[7] = elem;
                } else {
                    var elem = categoryList[1]; 
                    categoryList[1] = categoryList[4]; 
                    categoryList[4] = elem;       
                    var elem2 = categoryList[3]; 
                    categoryList[3] = categoryList[4]; 
                    categoryList[4] = elem2;       
                    var elem2 = categoryList[7]; 
                    categoryList[7] = categoryList[3]; 
                    categoryList[3] = elem2;                                                   
                }
                categoryList.map(function (unit) {
                    htmlString += "<div id='category-tab-" + unit.category_id + "' class=\"category-tab col-25 " + (active ? "active": "") + " \" onclick=\"loadCategory(" + unit.category_id + ", this)\"><div class=\"col-title\">" + "<img class='first-page-icon' src='" + unit.path + "'>" + "</div><div class=\"col-subtitle\">" + unit.name + "</div></div> ";
                    active = false;
                });


                // htmlString += "</div> ";
                console.log(htmlString)
                $(".restaurant-category-block").html(htmlString)
                // document.getElementById("restaurant-category-id").innerHTML = htmlString;
                // getImageList()

            }, 
            error: function (results) {
                myApp.hideIndicator()
                // myApp.hideIndicator()
                // console.log(results)
                // myApp.alert("Network error. Please try again later? ")
            }
        });   
    } catch(err) {
        myApp.hideIndicator()
    }     
}
function likeEvent (event_id,pid, encodedURL) {
    event_id = event_id || currentRestaurantId
    console.log(event_id)
    var ajaxUrl = "http://gettimi.com/site/ToggleEventLikes?user_token=" + localStorage.usertoken + "&event_id=" + event_id;
    // var currentRestaurantObject; 
    imageList.map(function (unit) {
        if (unit.id == event_id) {
            currentRestaurantObject = unit; 
        }
    });  

    if (currentRestaurantObject.self == 0) {
        // imageList = imageList.map(function (unit) {
        for (var i in imageList) {
            if (imageList[i].id == event_id) {
                console.log("founded", imageList[i])
                imageList[i].friends.push({
                    "username": personalData.username, 
                    "avatar": (personalData.avatar || "img/timi.png")
                })
                imageList[i].self = 1;
                showEventPage(imageList[i], encodedURL, pid, true);       
                console.log(imageList[i])
            }            
        };     
        console.log(imageList)                  
        hasLikedEventUI(true);
        document.getElementById('image-avatar-'+pid).innerHTML = "<img class='image-portrait' src='"+personalData.avatar+"'>"

        mixpanel.track("Liked", {
            "username": personalData.username,
            "category_id": currentCategory, 
            "heartIcon": (personalData.phone % 2)
        });     
    } else {
        currentRestaurantObject.self = 0

        console.log(currentRestaurantObject)
        hasLikedEventUI(false);
        // imageList = imageList.map(function (unit) {
        for (var i in imageList){
            if (imageList[i].id == event_id) {
                console.log("founded", imageList[i])
                imageList[i].self = 0;
                imageList[i].friends = imageList[i].friends.filter(function(unit) {
                    return unit.username != personalData.username
                })          
                showEventPage(imageList[i], encodedURL, pid, true);       
            }
        }

        document.getElementById('image-avatar-'+pid).innerHTML = ""   
        // following is not working yet
        ll = ll.filter(function(unit){
            // console.log(unit)
            if (unit.image.pid == pid) {
                if (unit.friends!=null) {
                    unit.friends = unit.friends.filter(function (user) {
                        return user.username != personalData.username
                    });      
                    var portraitURL = (unit.friends && unit.friends.length > 0) ? 
                                        (unit.friends[0].avatar || "img/timi.png") : ""
                                        console.log(portraitURL)
                    if (portraitURL != "") {
                        document.getElementById('image-avatar-'+pid).innerHTML = "<img class='image-portrait' src='"+portraitURL+"'>"                      
                    } else {
                        document.getElementById('image-avatar-'+pid).innerHTML = ""    
                    }                                  
                }


            }
            return unit
        });
    }
    refreshBookMarks = true;
    getFriendsLikes(true, showBookMarks);
    getMyLikes(true, showBookMarks)

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            if (results.success == "success") {
                imageList = imageList.map(function (unit) {
                    if (unit.id == event_id) {
                        unit.self = Math.abs(unit.self - 1)
                        return unit;
                    } else {
                        return unit;
                    }
                });  
            }
        }, 
        error: function (results) {
            // myApp.hideIndicator()
            // console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });       
}
function initPicByDistance (range, elem) {
    currentRange = range;
    ee = elem; 
    $(".distance-tab.col-25").removeClass("active")
    $(ee).addClass("active")    
    currentViewObject().callback(); 
}
function getDistanceRow() {
    var htmlString = ""
    htmlString += "<div class=\"row restaurant-info-bar\"> ";            
    // categoryList = JSON.parse(results.result);
    distanceList = [0.5, 1, 2, 5, 10, 20];
    // var active = true;
    distanceList.map(function (unit) {
        active = (unit == currentRange)
        htmlString += "<div class=\"distance-tab col-25 " + (active ? "active": "") + " \" onclick=\"initPicByDistance(" + unit + ", this)\"><div class=\"col-subtitle\">" + unit + "mi.</div></div> ";
        // active = false;
    });

    htmlString += "                     </div> ";
    document.getElementById("restaurant-distance-id").innerHTML = htmlString    
}


function chatWithEventList (index) {
    var user = eventsList[index];
    user.user_id = user.sender_id || user.user_id;
    chatwith(user);
}

function updateInvitationPage () {
    var htmlString = "<ul class='request-list'>"
    var arrayIndex = 0; 
    eventsList = eventsList.sort(timeSort).filter(function (unit) {
        return unit.status < 2; // filter uninvited
    }); 
    if (eventsList.length > 0 ) {
        // htmlString += "<li class='list-group-title' style='background: white !important; '>Your Invitations<span class=\"show-more-button\" id=\"show-more-button\" onclick=\"showMoreInvitation()\">Show Less</span></li>"        
    } else {
        htmlString += "<div class='list-prompt'>That's all</div>"
    }
    var firstCard = true;
    // document.getElementById("event-list").innerHTML = "<ul>" + "<div style='text-align:center; color: #929292; padding: 25px 0px;'>Loading...</div>" + "</ul>";    

    function unitHTML (imgFront, title, text, imgAfter, arrayIndex) {
        var imgFrontHTML = '        <div class="item-media" id="notification-page-avatar-' + arrayIndex + '">' +   
             '          <img src="' +imgFront+ '">' + 
             '        </div>' 
        var titleHTML = '            <div class="item-title">' +
                            title + 
             '            </div>'
        var afterHTML = '            <div class="item-after">' +
                        text + 
             '            </div>'
        var lastHTML = '        <div class="item-last">' + 
             '          <img src="' +imgAfter+ '">' + 
             '        </div>' 
        return '<li>' +
             '    <div class="item-content">' +
                    (imgFront ? imgFrontHTML : "") +
             '        <div class="item-inner">' +
                        (title ? titleHTML : "") +
                        (text ? afterHTML : "") +
             '        </div>' +
                    (imgAfter ? lastHTML : "")+ 
             '    </div>' +
             '</li>'
    }

    eventsList.map(function (unit) {
        
        // if (unit)
        var twoLetter = ""; 
        var twoLetter = unit.username.split(" ").map(function (unit) {return unit[0]}).join("").slice(0,2)
        var buttonHTML = ""
        var innerContentHTML = ""
        var name = unit.username
        var avatarImg = unit.avatar.replace("/", "\/")

        if (unit.status == 0) {
            if ( unit.super == 0 ) {
                name = "Secret Date"                
                innerContentHTML =  "<div class='notification-page-prompt'>" + name + " - Invited you </div>" +          
                                    "<div class='notification-page-subprompt'>on " + ((unit.request_day == queryDay) ? ( (unit.request_time == 3) ? "Now" : "Today") : (((unit.request_day - 1) % 7 == queryDay) ? "Tomorrow" : days[unit.request_day])) + " - " + minTimeSince(new Date(unit.create_time * 1000)) +  ( unit.activity ? ( " - " + unit.activity ) : "") + "</div>"       
                buttonHTML = '<a href="#" class=" button button-fill single-button" style="background:#fff;color:#464748;border: 1px solid #464748;" onclick=\'findoutWho('+unit.request_day+', ' + unit.request_time+ ')\'>Find out who</a>'
                avatarImg = "img/timmi.png"
            } else {
                innerContentHTML =  "<div class='notification-page-prompt'>" + name + " - Invited you </div>" +          
                                    "<div class='notification-page-subprompt'>" + 
                                    // ((unit.request_day == queryDay) ? ( (unit.request_time == 3) ? "Now" : "Today") : (((unit.request_day - 1) % 7 == queryDay) ? "Tomorrow" : days[unit.request_day])) + 
                                    // " - " + 
                                    minTimeSince(new Date(unit.create_time * 1000)) + "</div>"       
                buttonHTML = '' +
                             // '    <a href="#" class="link">Next Time</a> '+
                             // acceptFriendRequest (day, time, receiver, decision, index)
                             '    <a href="#" class=" button button-fill single-button" style="background:#fff;color:rgb(99, 222, 154);border:1px solid rgb(99, 222, 154);" id="events-page-button-' + arrayIndex + '" onclick=\'acceptFriendRequest(' +                                                                 
                                                                unit.request_day + ',' +  
                                                                unit.request_time + ',' +
                                                                unit.sender_id + ',' + 
                                                                '1' + ',' +
                                                                arrayIndex +
                                                                ' )\'>Accept</a> '
                // requestFriend(token, day, time, receiver, decision, superlike, availIndex)                             
            }
        } else if (unit.status == 1) {
            buttonHTML = '<a href="#" class=" button button-fill single-button" style="background:#fff;color:#464748;border: 1px solid #464748;" onclick="chatWithEventList('+arrayIndex+ ')">Chat Now</a>'
            innerContentHTML =   "<div class='notification-page-prompt'>" + name + " - Matched </div>" +  
                                "<div class='notification-page-subprompt'>" + 
                                    // ((unit.request_day == queryDay) ? ( (unit.request_time == 3) ? "Now" : "Today") : (((unit.request_day - 1) % 7 == queryDay) ? "Tomorrow" : days[unit.request_day])) + 
                                    // " - " + 
                                    minTimeSince(new Date(unit.create_time * 1000)) +  ( unit.activity ? ( " - " + unit.activity ) : "") + "</div>" 
        } else {
            arrayIndex++       
            return; 
            // innerContentHTML = "This person likes you but not today"
        }
        innerContentHTML = innerContentHTML 
        htmlString += unitHTML(avatarImg, innerContentHTML + buttonHTML, "", "", arrayIndex)

        arrayIndex++      
        firstCard = false;       
    }); 
    htmlString += "</ul>"

    var swiperHeight = ""; 
    if ( $(window).height() < 600 ) {
        // iphoen 5
        swiperHeight = 150 
    } else if ( $(window).height() < 700 ) {
        // iphone 6
        swiperHeight = 177.5
    } else if ( $(window).height() < 800 ) {
        // iphone 6+
        swiperHeight = 197
    } 
    document.getElementById("event-list").innerHTML = htmlString + "</ul>";    
    arrayIndex = 0; 
    eventsList.map(function (unit) {
        unit.user_id = unit.sender_id;
        function setOnclick (unit) {
            if (unit.super == 1 || unit.status == 1) {
                return function () {
                    showPersonalPage(unit)
                }                
            } else {
                return function () {

                }
            }

        }
        document.getElementById("notification-page-avatar-" + arrayIndex).onclick = setOnclick(unit)
        arrayIndex++
    });
}
// function updateInvitationPage () {
//     var htmlString = "<ul class='request-list'>"
//     var arrayIndex = 0; 
//     if (eventsList.length == 0) {

//     } 
//     eventsList = eventsList.sort(timeSort).filter(function (unit) {
//         return unit.status < 2;
//     }); 
//     if (eventsList.length > 0 ) {
//         htmlString += "<li class='list-group-title' style='background: white !important; '>Your Invitations<span class=\"show-more-button\" id=\"show-more-button\" onclick=\"showMoreInvitation()\">Show Less</span></li>"        
//     }
//     var firstCard = true

//     eventsList.map(function (unit) {
        
//         // if (unit)
//         var twoLetter = ""; 
//         var twoLetter = unit.username.split(" ").map(function (unit) {return unit[0]}).join("").slice(0,2)
//         var buttonHTML = ""
//         var innerContentHTML = ""
//         var name = unit.username
//         var avatarImg = unit.avatar.replace("/", "\/")

//         if (unit.status == 0) {
//             if ( unit.super == 0 ) {
//                 name = "Secret Date"                
//                 innerContentHTML =  "<div class='event-page-icon'>🙋</div>" + 
//                                     "<div class='event-page-prompt'>" + name + " - Invited you</div>" +          
//                                     "<div class='event-page-subprompt'>on " + ((unit.request_day == queryDay) ? ( (unit.request_time == 3) ? "Now" : "Today") : (((unit.request_day - 1) % 7 == queryDay) ? "Tomorrow" : days[unit.request_day])) + " - " + timeSince(new Date(unit.create_time * 1000)) +  ( unit.activity ? ( " - " + unit.activity ) : "") + "</div>"       
//                 buttonHTML = '<a href="#" class=" button button-fill single-button" style="background:#fde125;" onclick=\'findoutWho('+unit.request_day+', ' + unit.request_time+ ')\'>Find out who</a>'
//                 avatarImg = "img/timmi.png"
//             } else {
//                 innerContentHTML =  "<div class='event-page-icon'>🙋</div>" + 
//                                     "<div class='event-page-prompt'>" + name + " - Invited you</div>" +          
//                                     "<div class='event-page-subprompt'>for " + ((unit.request_day == queryDay) ? ( (unit.request_time == 3) ? "Now" : "Today") : (((unit.request_day - 1) % 7 == queryDay) ? "Tomorrow" : days[unit.request_day])) + " - " + timeSince(new Date(unit.create_time * 1000)) + "</div>"       
//                 buttonHTML = '' +
//                              // '    <a href="#" class="link">Next Time</a> '+
//                              // acceptFriendRequest (day, time, receiver, decision, index)
//                              '    <a href="#" class=" button button-fill single-button" style="background:#ec5298;" id="events-page-button-' + arrayIndex + '" onclick=\'acceptFriendRequest(' +                                                                 
//                                                                 unit.request_day + ',' +  
//                                                                 unit.request_time + ',' +
//                                                                 unit.sender_id + ',' + 
//                                                                 '1' + ',' +
//                                                                 arrayIndex +
//                                                                 ' )\'>Accept</a> '
//                 // requestFriend(token, day, time, receiver, decision, superlike, availIndex)                             
//             }
//         } else if (unit.status == 1) {
//             buttonHTML = '<a href="#" class=" button button-fill single-button" style="background:rgb(99, 222, 154);" onclick="chatWithEventList('+arrayIndex+ ')">Chat Now</a>'
//             innerContentHTML =  "<div class='event-page-icon'>🙌</div>" + 
//                                 "<div class='event-page-prompt'>" + name + " - Matched </div>" +  
//                                 "<div class='event-page-subprompt'>for " + ((unit.request_day == queryDay) ? ( (unit.request_time == 3) ? "Now" : "Today") : (((unit.request_day - 1) % 7 == queryDay) ? "Tomorrow" : days[unit.request_day])) + " - " + timeSince(new Date(unit.create_time * 1000)) +  ( unit.activity ? ( " - " + unit.activity ) : "") + "</div>" 
//         } else {
//             arrayIndex++       
//             return; 
//             // innerContentHTML = "This person likes you but not today"
//         }

        
        

//         innerContentHTML = "<p>" + innerContentHTML + "</p>"
//         htmlString += '<li class="' + (firstCard ? "first-card" : "following-card") + '"><div class="card demo-card-header-pic"> ' + 
//         '   <div onclick="readEventsUserProfile('+arrayIndex+')" style="height: 170px; background-size:cover !important;background: ' + 
//                 // 'linear-gradient(rgba(0, 0, 0, 0.298039), rgba(0, 0, 0, 0.298039)), ' + 
//                 'url(\'' + 
//                 avatarImg + '\') 50% 50% no-repeat" valign="bottom" class="card-header color-white no-border">'+ 
//                 // name +
//                 " <span class='color-white' style='font-size: 14px;'>" + 
//                 // timeSince(new Date(unit.create_time * 1000)) + 
//                 "</span>" + 
//             '</div> '+
//         '  <div class="card-content"> '+
//         '    <div class="card-content-inner" > '+
//             innerContentHTML + 
//         '    </div> '+
//         '  </div> '+
//         '  <div class="card-footer"> '+
//             buttonHTML +     
//         '  </div> '+
//         '</div></li>'; 
//         arrayIndex++      
//         firstCard = false;       
//     }); 
//     htmlString += "</ul>"

//     var swiperHeight = ""; 
//     if ( $(window).height() < 600 ) {
//         // iphoen 5
//         swiperHeight = 150 
//     } else if ( $(window).height() < 700 ) {
//         // iphone 6
//         swiperHeight = 177.5
//     } else if ( $(window).height() < 800 ) {
//         // iphone 6+
//         swiperHeight = 197
//     } 

//     // if (shortedList.length > 0) {
//     //     htmlString += "<ul class='picks-list' style='background: #f7f7f7 !important; '><li class='list-group-title' >Top Picks for Today ("+ (d.getMonth()+1) +"-"+d.getDate()+")</li>"
//     // } else {

//     // }


//     // picIndex = 0;
//     // shortedList.map(function (unit) {
//     //     if (unit != null && picIndex < 4) {
//     //         htmlString += '<li><div class="card demo-card-header-pic" > ' + 
//     //             '  <div style="height: ' + swiperHeight + 'px; width: 100%;" valign="bottom" class="card-header no-border">'+
//     //             '   <div class="swiper-container swiper-food-container"  onclick= "openPhotoAlbum(' + picIndex + ');"> ' +
//     //             '     <div class="swiper-pagination"></div> ' +
//     //             '     <div class="swiper-wrapper"> ' +
//     //                     unit.pics.map(function (pics_unit) {
//     //                         return '       <div class="swiper-slide">' + '<img class="food-slider-img" src="' + pics_unit + '">' + '</div> '
//     //                     }).join("") +              
//     //             '      </div> ' +
//     //             '    </div> ' +
//     //             '  </div> ' + 
//     //             '  <div class="card-content"> ' + 
//     //             '    <div class="card-content-inner"> ' + 
//     //             '      <div class="event-page-icon">🍴</div>' + 
//     //             '      <div class="event-page-prompt can-copy">' + unit.place  + '</div> ' + 
//     //             '      <div class="event-page-subprompt" >' + 
//     //                         '<a style="color:inherit;" class="can-copy" onclick="showEventActionButton (\''+unit.place+'\', \''+unit.address+'\', \''+unit.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')+'\')">' + 
//     //                             unit.address.split(',')[0] + 
//     //                         '</a>' + ' - ' + 
//     //                         Math.round(getDistanceFromLatLonInKm(unit.geolocation.split(",")[0], unit.geolocation.split(",")[1], personalData.geolocation.split(",")[0], personalData.geolocation.split(",")[1])*6.25)/10 + 'mi ' + 
//     //             '      </div>' + 
//     //             '      <div class="event-page-subprompt can-copy" style="margin-bottom: 15px;"><a class="can-copy" onclick="showEventActionButton (\''+unit.place+'\', \''+unit.address+'\', \''+unit.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')+'\')">'+ unit.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') + '</a></div> ' + 
//     //             '    </div> ' + 
//     //             '  </div> ' + 
//     //             '  <div class="card-footer"> ' + 
//     //             '    <a href="#" class="link single-button" style="background: transparent; color: #ec5298 !important;" onclick="inviteViaWechat()">Invite Friends</a> ' + 
//     //             '  </div> ' + 
//     //             '</div></li> ' 
//     //         myPhotoBrowserStandalone[picIndex] = myApp.photoBrowser({
//     //             photos : unit.pics, 
//     //             onTap: function () {
//     //                 closePhotoBrowser()
//     //             }
//     //         });    
//     //         console.log(myPhotoBrowserStandalone)
//     //         // myPhotoBrowserStandalone.push(elem)
//     //         picIndex++            
//     //     }
                
//     // });
//     document.getElementById("event-list").innerHTML = htmlString + "</ul>";

//     // var mySwiper1 = myApp.swiper('.swiper-food-container', {
//     //     spaceBetween: 10, 
//     //     slidesPerView: 2
//     // });    
// }

function mapActionsButton (address) {
    var buttons = [
        {
            text: 'Copy Address',
            onClick: function () {
                cordova.plugins.clipboard.copy(address);
            }
        },
        {
            text: 'Open in Apple Map',
            onClick: function () {                
                window.open("maps://?q=" + address); 
            }
        },       
        {
            text: 'Open in Google Map',
            onClick: function () {
                window.open("https://www.google.com/maps/?q=" + address, '_system');                
            }
        }
    ];
    myApp.actions(buttons);    
}

function showEventActionButton (name, address, number) {
    var shareURL = "http://gettimi.com";
    var shareWord = "See what I found on Timi! " + name + ", " + address + ". Timi @ " + shareURL;

    var buttons = [
        {
            text: 'Copy Name',
            onClick: function () {
                cordova.plugins.clipboard.copy(shareWord);
            }
        },
        {
            text: 'Copy Address',
            onClick: function () {
                cordova.plugins.clipboard.copy(address);
            }
        },       
        {
            text: 'Copy Phone Number',
            onClick: function () {
                cordova.plugins.clipboard.copy(number);
            }
        },     
        {
            text: 'Share via Text',
            color: 'pink', 
            onClick: function () {
                try {
                    
                    window.plugins.socialsharing.share(shareWord, shareWord);
                    // window.plugins.socialsharing.shareVia('com.tencent.mm.ui.tools.ShareToTimeLineUI', workingList[index].title + " - 没六儿 最火热的话题与信息 ", null, null, shareURL, function(){myApp.alert("分享成功")}, function(msg) {myApp.alert("太不6了，再试试看？")})          
                } catch (err) {

                }                    
            }
        }
    ];
    myApp.actions(buttons);
}


function updateTabUI () {
    console.log("#"+currentTabPage)
    $(".toolbar .tab-link").removeClass("active")
    $("#"+currentTabPage).addClass("active")   
    if ( localStorage.unread == 1 ) {
        document.getElementById("badge-red-dot-2").style.display = "block"; 
    } else {
        document.getElementById("badge-red-dot-2").style.display = "none"; 
    }
    // $("#badge-red-dot-2").css("display", "none"); 
}



$$('#availability-tab').on('show', function () {
    currentTabPage = "availability-tab"
    console.log('Tab 2 is visible');
    updateFreeTime ()
    
    changeNavbarTitle("AVAILABILITY", barIconHTML, "<a class=\"link right-link\" onclick='myApp.showTab(\"#more-tab\")'><img src = \'"+ (personalData.avatar || "img/timi.png" )+"\' class=\"navbar-chatting-avatar\"></a>");  
    $(".subnavbar").css("display", "none")
    updateForm()
    updateTabUI()
});

function messengerOnShow () {
    currentTabPage = "messenger-tab"
    loadChattingList ()

    changeNavbarTitle("CHATS", "<a class=\"link left-link\" onclick='deleteAllMsg()'><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></a>", "<a class=\"link right-link\" onclick='myApp.showTab(\"#more-tab\")'><img src = \'"+ (personalData.avatar || "img/timi.png" )+"\' class=\"navbar-chatting-avatar\"></a>"); 
    $(".subnavbar").css("display", "none")  
    getUnreadMatchList(function () {
        loadChattingList ()
    })    
    loadAllNewMessage(function () {
        loadChattingList()
    })
    MarkAllFriendsMatchAsRead()

    // add something to check unread message!!!!   
}

function deleteAllMsg () {
    myApp.confirm("Would you like to delete all messages? ", "Timi", function () {
        localStorage.chatlist = JSON.stringify([])
        messengerOnShow();
    });
}
 
$$('#messenger-tab').on('show', function () {
    currentTabPage = "messenger-tab"
    messengerOnShow()
    badgeSpot[2] = 0;
    updateToolbarRedDot()
    updateTabUI()
    $("#home-page-navbar-center").removeClass("activity-button")
    document.getElementById("home-page-navbar-center").onclick = function () {

    }
});    
function showListViewUserProfile(tf, index) {
    showPersonalPage(availFriend[tf][availFriend[tf].length - 1 - index]);
}

function loadListRequestView () {
    // if ()
    var list = availFriend[timeFrame].reverse()
    

    var index = 0
    var listHTML = "<ul>"
    list.map(function (unit) {
        listHTML += '<li>' + 
        '  <label class="label-checkbox item-content">' + 
        '    <input type="checkbox" name="'+ unit.username +'" value="'+ unit.username +'" checked="checked">' + 
        '    <div class="item-media">' + 
        '      <i class="icon icon-form-checkbox"></i>' + 
        '      <img onclick="showListViewUserProfile('+ timeFrame + ',' + index + ')" src="' + unit.avatar + '">' +
        '    </div>' + 
        '    <div class="item-inner">' + 
        '      <div class="item-title">' + emojiList[unit.emojiIndex] + "   "+ unit.username  +'</div>' + 
        '    </div>' + 
        '  </label>' + 
        '</li>'
        index++;
    });
    listHTML += "</ul>"
    document.getElementById("listview-user").innerHTML = listHTML
    availFriend[timeFrame].reverse(); // to reverse the list back.
        document.getElementById("listview-user").style.display = "block" 
        document.getElementById("logo-holder").style.display = "none" 
}


$$('#invitation-tab').on('show', function () {
    currentTabPage = "invitation-tab"
    
    localStorage.listView = 1;


    changeNavbarTitle(activityText, "<a style=\"visibility:hidden;\"class=\"link right-link\" ></a>", "<a class=\"link right-link\" onclick='localStorage.listView=0;myApp.showTab(\"#explore-tab\")'></a>"); 
    $(".subnavbar").css("display", "flex")
    getPersonalInfo()    
    // getMySchedule(function () {
    afterClickTab(timeFrame)                        
    // })    
    badgeSpot[1] = 0;
    updateToolbarRedDot()
    updateTabUI()
    $("#explore-tab-button").addClass("active")
    $("#home-page-navbar-center").addClass("activity-button")

    document.getElementById("home-page-navbar-center").onclick = function () {
        selectActivity()
    }


    // changeNavbarTitle("Tap to Hangout", barIconHTML, "<a class=\"link right-link\" onclick='searchUser()'><i class=\"fa fa-user-plus\" ></i></a>"); 
});    
$$('#explore-tab').on('show', function () {

    if ( localStorage.listView == 1 ) {
        myApp.showTab("#invitation-tab")
        return; 
    }
    currentTabPage = "explore-tab"


    console.log('Tab 1 is visible');



    mixpanel.track("swiping page", {
        "username": personalData.username
    })
    changeNavbarTitle(activityText, "<a class=\"link right-link\" style=\"visibility:hidden;\"'><i class=\"fa fa-question-circle\"></i></a>", "<a class=\"link right-link\" onclick='tutorial()'><i class=\"fa fa-question-circle\"></i></a>"); 
    $(".subnavbar").css("display", "flex")
    getPersonalInfo()

    afterClickTab(timeFrame)                        
    badgeSpot[0] = 0;
    updateToolbarRedDot()
    $("#home-page-navbar-center").addClass("activity-button")
    document.getElementById("home-page-navbar-center").onclick = function () {
        selectActivity()
    }
});



$$('#more-tab').on('show', function () {
    currentTabPage = "more-tab"
    $(".toolbar .tab-link").removeClass("active")
    
    changeNavbarTitle("MORE", barIconHTML, "<a class=\"link right-link\" onclick='myApp.showTab(\"#more-tab\")'><img src = \'"+ (personalData.avatar || "img/timi.png" )+"\' class=\"navbar-chatting-avatar\"></a>");
    $(".subnavbar").css("display", "none")
    getPersonalInfo (function () {
        updatePersonalPage ()   
        document.getElementById("profile-pic").src = personalData.avatar || "img/timi.png";
        document.getElementById("profile-name").innerHTML = personalData.username             
    })
    setTimeout(function () {
        document.getElementById("profile-pic").src = personalData.avatar || "img/timi.png";
        setTimeout(function () {
            if (document.getElementById("profile-pic").src.indexOf("img/timi.png") != -1) {
                if (currentTabPage == "more-tab") {
                    // is default profile picture
                    var popoverHTML = '<div class="popover"><div class="popover-inner" style="padding: 15px;">Click here to update your profile picture to get more attention! </div></div>'
                    myApp.popover(popoverHTML, "#profile-pic")                    
                }

            }  
        }, 1000)
      
    }, 200)

     
    document.getElementById("profile-name").innerHTML = personalData.username
    $("#profile-pic-background").css("background", ('linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + (personalData.avatar || "img/timi.png") + ')'  ))
    // console.log(localStorage.usertoken)

    if ( nearbyPendingNum == 0 ) {
        $("#unread-nearby-request").css("display", "none")
    } else {
        $("#unread-nearby-request").html(nearbyPendingNum)
        $("#unread-nearby-request").css("display", "block")
    }




    clearBadge()
    badgeSpot[3] = 0;
    updateToolbarRedDot()
    $("#home-page-navbar-center").removeClass("activity-button")
    document.getElementById("home-page-navbar-center").onclick = function () {

    }    
    // change background too
    console.log('Tab 5 is visible');
});   

var nearbyPendingNum = 0;

function updateToolbarRedDot () {
    for (var i in badgeSpot) {
        if (badgeSpot[i] == 1) {
            $("#badge-red-dot-"+i).css("display", "block")
        } else {
            $("#badge-red-dot-"+i).css("display", "none")
        }
    }
}

document.addEventListener('deviceready', onDeviceReady, false);



// center the given title in the navbar
function changeNavbarTitle (title, left, right) {
    left = left || ""
    right = right || ""

    // var navbarHTML = '<div id="home-page-navbar-left" class="home-nav">' + 
    //     left + 
    //     // '<a style="visibility:hidden;" class="link right-link">Swipe</a>' +
    // '</div>' +
    // '<div class="home-nav activity-button" id="home-page-navbar-center" onclick="selectActivity ()" style="left: 140.5px;">' + 
    //     title + 
    //     // '<i class="fa fa-chevron-circle-down" aria-hidden="true"></i> I want to... ' + 
    // '</div>' + 
    // '<div id="home-page-navbar-right" class="home-nav">' + 
    //     right + 
    //     // '<a class="link right-link" onclick="localStorage.listView=0;myApp.showTab(&quot;#explore-tab&quot;)">Swipe</a>' + 
    // '</div>' + 
    // '<div class="subnavbar" style="display: flex;">' + 
    //     '<div class="buttons-row">' + 
    //         '<a href="#tab1" class="button time-tab lunch-tab tab-link">Tonight<span class="date-tag">7-21</span><span style="display:none" class="request-badge"></span></a>' + 
    //         '<a href="#tab2" class="button time-tab dinner-tab tab-link">Tomorrow<span class="date-tag">7-22</span><span style="display:none" class="request-badge"></span></a>' + 
    //         '<a href="#tab3" class="button time-tab night-tab tab-link current-tab active">Saturday<span class="date-tag">7-23</span><span style="display:none" class="request-badge"></span></a>' + 
    //         '<a href="#tab0" class="button time-tab now-tab tab-link">Now<span class="date-tag">7-21</span><span style="display:none" class="request-badge"></span></a>' + 
    //         '<div id="underline-border" style="transform: translate(-200%, 0px); animation-duration: 0.5s;"></div>' + 
    //     '</div>' + 
    // '</div>'
    // $(".navbar-on-center").html(navbarHTML)


    $("#home-page-navbar-center").html(title)
    var left_margin = ($(window).width() - $("#home-page-navbar-center").width()) / 2 
    $("#home-page-navbar-center").css("left", left_margin+"px")    
    $("#home-page-navbar-right").html(right)
    $("#home-page-navbar-left").html(left)
} 

function switchTime () {
    // clearBadge()
}

function testScript () {
   
}

// Add text element to chat database; no UI change

function addToChatDatabase (user_id, text, send, time) {
    chatlist = getChatList()
    var chatObject = {
        time: time, 
        type: send, 
        text: text
    }; 
    var changed = false; 

    for (var i in chatlist ) {
        if (chatlist[i].user.user_id == user_id || chatlist[i].user.username == user_id ) {
            changed = changed || true;
            // currentChatIndex = i  //maybe get this back
            if ( chatlist[i].chat_history == null ) { 
                // console.log("got new arr")
                chatlist[i].chat_history = [chatObject] 
                if ( !((mainView.url == "#chatting-page") && 
                     (chattingWidthUserId == chatlist[i].user.user_id)) && 
                     (send == false) ) {
                    chatlist[i].unread = 1;
                }                 
            } else {
                if (chatlist[i].chat_history.length > 14 ) {
                    var temp = chatlist[i].chat_history.slice(chatlist[i].chat_history.length-14,chatlist[i].chat_history.length)
                    chatlist[i].chat_history = temp
                } 
                // console.log("append old arr")
                chatlist[i].chat_history.push(chatObject)          
            }

            if ( !((mainView.url == "#chatting-page") && 
                 (chattingWidthUserId == chatlist[i].user.user_id)) && 
                 (send == false) ) {
                chatlist[i].unread = 1;
            } 

            // update time object
            chatlist[i].timeObject = time.toISOString()
        }
    }     
    if (changed == false) {
        searchUserByUserId( user_id, addUserToChatList, chatObject)
    }


    localStorage.chatlist = JSON.stringify(chatlist);       
}

function chatWithChatList (index) {
    chatlist = getChatList()
    chatlist[index].user.user_id = chatlist[index].user.user_id || chatlist[index].user.sender_id
    chatwith(chatlist[index].user)
}
function addUserToChatList (userObject, chatObject) {
    chatlist = getChatList ()
    console.log(chatObject)
    var elem = {
        user: userObject, 
        timeObject: (new Date()), 
        schedule: null
    }
    pushChatList (elem)   
    var lastIndex =  chatlist.length - 1

    if ( chatlist[lastIndex].chat_history == null ) { 
        chatlist[lastIndex].chat_history = [chatObject]
    } else {
        if (chatlist[lastIndex].chat_history.length > 14 ) {
            var temp = chatlist[lastIndex].chat_history.slice(chatlist[lastIndex].chat_history.length-14,chatlist[lastIndex].chat_history.length)
            chatlist[lastIndex].chat_history = temp
        } 
        chatlist[lastIndex].chat_history.push(chatObject)
    }
    // update time object
    chatlist[lastIndex].timeObject = chatObject.time
    localStorage.chatlist = JSON.stringify(chatlist);              
}

// chatlist => list UI
function loadChattingList () {
    chatlist = getChatList()
    chatlist.sort(tSort)
    var htmlString = ""
    if ( (chatlist == null) || (chatlist.length == 0) ) {
        document.getElementById("messenger-list").innerHTML = "<div class='one-line-prompt'>You haven't been matched with anyone yet. </div>"
    } else {
        var index = 0
        chatlist.map(function (unit) {
            var schedule = unit.schedule || 4; 
            var activity = ["Noon", "Evening", "Night", "Now", "Chilling"]
            // hehe = unit
            var d = new Date(unit.timeObject)
            var raw_day = d.getDay()
            var timiDay;  // time associated with that chat, not the current
            // console.log(hehe)
            if (d.getHours() <= 1) {
                timiDay = d.getDay() - 1
            } else {
                timiDay = d.getDay()
            }
            // console.log(timiDay)
            if (timiDay < 0) {
                timiDay += 7
            }                


            var user = unit.user
            var strVar = ""
            strVar += "<li>";
            var unreadBadge = ""
            if (unit.unread == 1) {
                unreadBadge = "<div class='message-unread-badge'></div>"
            }
            strVar += "  <a href=\"#\" class=\"item-link item-content\" onclick=\"chatWithChatList("+ index +")\">";
            // mainView.router.loadPage({pageName:"chatting-page"})
            strVar += "    <div class=\"item-media\"><img src=\""+(user.avatar || "img/timi.png")+"\" width=\"60\">" + unreadBadge + "<\/div>";
            strVar += "    <div class=\"item-inner\" >";
            strVar += "      <div class=\"item-title-row\">";
            strVar += "        <div class=\"item-title\">"+user.username+ "<\/div>";
            strVar += "        <div class=\"item-after\">" + timeSince(new Date(chatlist[index].timeObject)) + "<\/div>";        
            strVar += "      <\/div>";

            if (unit.chat_history != null){
                            // strVar += "      <div class=\"item-text\">" + days[timiDay] + "<\/div>";                
                            strVar += "        <div class=\"item-preview\">" + unit.chat_history[unit.chat_history.length-1].text + "<\/div>";    
            } else {
                            // strVar += "      <div class=\"item-text\">" + days[timiDay] + "<\/div>";                
                            // strVar += "      <div class=\"item-text\">Matched for " + activity[schedule] +" on " + days[timiDay] + "<\/div>";
                strVar += "        <div class=\"item-preview \" style=\"color:#ec5298; \">You are matched! Tap to start your conversation<\/div>";    
            }            
            strVar += "    <\/div>";
            strVar += "  <\/a>";
            strVar += "<\/li>";  
            htmlString += strVar   
            index++
            return;            
        });          
        document.getElementById("messenger-list").innerHTML ="<ul>" +htmlString +"</ul>"
        // markAllRequest()
    }
    localStorage.chatlist = JSON.stringify(chatlist)    
}

function chatwith (user) {
    user.user_id = user.user_id || user.sender_id
    chatlist = getChatList()
    // clear badge if any
    chatlist = chatlist.map(function (unit) {
        if (unit.user.user_id == user.user_id) {
            unit.unread = 0;
        }
        return unit
    })
    // chatlist[index].unread = 0; 
    localStorage.chatlist = JSON.stringify(chatlist);  

    mainView.router.loadPage({pageName:"chatting-page"})
    // initMessage(index)
    initMessage(user)
}
function initiateChat (user) {
    // mainView.router.loadPage({pageName:"chatting-page"}); 
    chatwith(user)
    // if in the chatbase, go there 
    // if not, start a new one but not insert to the database yet..? 
}

function addRandomFriendPopup () {
    addSuggestedFriends ()
}

// take selfie to change the profile picture
function changePicture () {

    var buttons = [
        {
            text: 'Upload from Camera',
            onClick: function () {
                console.log("pic")
                navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
                    quality: 50,
                    allowEdit : true,
                    destinationType: Camera.DestinationType.DATA_URI, 
                    targetWidth: 640,
                    encodingType: Camera.EncodingType.JPEG,
                    targetHeight: 640,

                });
            }
        },
        {
            text: 'Upload from Album',
            onClick: function () {
                navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
                    quality: 50,
                    allowEdit : true,
                    destinationType: Camera.DestinationType.DATA_URI, 
                    targetWidth: 640,
                    encodingType: Camera.EncodingType.JPEG,
                    targetHeight: 640,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY

                });
            }
        },        
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);



}

function SuggestFriendsOrderByMutual() {
    // /site/SuggestFriendsOrderByMutual

    token = token || localStorage.usertoken
    var ajaxUrl = "http://gettimi.com/site/SuggestFriendsOrderByMutual?user_token=" + token 

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            suggestFriendsList = JSON.parse(results.result); 
            // console.log(JSON)

        }, 
        error: function (results) {
            // myApp.hideIndicator()
            // console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });   

}


function addFriendBySwiping (user_id, decision, token, index) {
    token = token || localStorage.usertoken
    var ajaxUrl = "http://gettimi.com/site/SendFriendRequest?user_token=" + token + 
    "&receiver=" + user_id + 
    "&decision=" + decision

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("good")
            if (results.status == "matched") {
                myApp.confirm("You are matched with " + nearbyList[index].username + "! Would you like to chat now? ", "Timi", function () {
                    var user = nearbyList[index]
                    chatlist = getChatList ()
                    // assumed now
                    var elem = {
                        user: user, 
                        unread: 1, 
                        timeObject: (new Date()), 
                        schedule: 3
                    }
                    pushChatList (elem) 
                    if (mainView.url == "#nearby-list") {
                        mainView.router.back()
                        myApp.showTab("#messenger-tab");                           
                    } else if (mainView.url == "#home") {
                        myApp.showTab("#messenger-tab");    
                    } else {
                        mainView.router.back()
                        myApp.showTab("#messenger-tab");                           
                    }
                });
            } else if (results.status == "sent") {
                // myApp.confirm("You are matched with" + "name! " + "Would you like to chat now? ", "Timi", function () {

                // });
            } else {

            }
            // console.log(results)

        }, 
        error: function (results) {
            // myApp.hideIndicator()
            // console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });      
}
// function /site/

function discoverStrangers () {
    placeStrangerCard()    
}

function loadStrangers (callback) {

    var ajaxUrl = "http://gettimi.com/site/discoverStrangers?user_token=" + localStorage.usertoken 


    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("good")
            // console.log(results)
            nearbyList = JSON.parse(results.result).reverse()
            nearbyList.map(function (unit) {
                unit.emojiIndex = Math.round(Math.random() * (emojiList.length-1))            
            })
            nearbyIndex = nearbyList.length - 1
            if (callback != null) {
                callback()
            }

        }, 
        error: function (results) {
            // myApp.hideIndicator()
            // console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });        
}

function searchUser () {
    $("#searchbar-input-box").focus()
     // var ajaxUrl = "http://gettimi.com/site/ReturnFriendInfo?user_token=" + localStorage.usertoken + "&number=" + queryNumber
}

function sendMessageAjax (receiver_id, text, token) {

    var ajaxUrl = "http://gettimi.com/site/SendMessage?user_token=" + localStorage.usertoken + "&message=" + encodeURIComponent(text) + "&receiver=" + receiver_id

    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("good")
            console.log(results)
        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });     
}

function addByNumber(queryNumber, html) {
    var ajaxUrl = "http://gettimi.com/site/Addfriends?user_token=" + localStorage.usertoken + "&number=" + queryNumber
    console.log(ajaxUrl)
    // console.log(html)
    html = html || ""

     if ( html != "" ) {
         $(html).removeClass("button"); 
         $(html).removeClass("color-green");
         $(html).addClass("color-gray"); 
         $(html).addClass("text-holder");       
         $(html).html('<div class="friends-added">Adding</div>')        
     }    
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("good")
            if ( results.error == null ) {
                $(html).html('<div class="friends-added">Added</div>')
                // myApp.alert("You just added your friend!")
            } else {
                myApp.alert(results.error)
                if (results.error == "You guys are friends already!") {
                    $(html).html('<div class="friends-added">Added</div>')
                }
            }
            

            // console.log(results)
        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });         
}


window.addEventListener('keyboardWillHide', function () {

    // alert('Goodnight, sweet prince2');

});
// function keyboardHideHandler(e){
    
// }

function processUser (user) {
    console.log(user)
}

function searchUserByUserId (user_id, callback, chatObject) {
    // var queryNumber = document.getElementById("searchbar-input-box").value
    var ajaxUrl = "http://gettimi.com/site/ReturnFriendInfo?user_token=" + localStorage.usertoken + "&user_id=" + user_id
    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("good")
            // myApp.confirm ()
            // console.log(results)
            callback(results, chatObject)
            
            // if ( results.username == null ) {
            //     // not found
            //     myApp.alert("Timi did not find this user:(")
            // } else {
            //     myApp.confirm("Would you like to add " + results.username + "? ", function () {
            //         addByNumber (queryNumber) 
            //     })
            // }
        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });       
}

function searchByThisNumber () {
    var queryNumber = document.getElementById("searchbar-input-box").value
    var ajaxUrl = "http://gettimi.com/site/ReturnFriendInfo?user_token=" + localStorage.usertoken + "&number=" + queryNumber
    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("good")
            // myApp.confirm ()
            
            if ( results.username == null ) {
                // not found
                myApp.alert("Timi did not find this user:(")
            } else {
                myApp.confirm("Would you like to add " + results.username + "? ", function () {
                    addByNumber (queryNumber) 
                })
            }
        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });         

}

function availableTime () {
    var d = new Date(); 
    var n = d.getHours()
    console.log(n)


}

function cancelRequest () {
    myApp.confirm("Are you sure? ", "Timi", function () {
        // cancelRequest ()
        var ajaxUrl = "http://gettimi.com/site/CancelMatch?user_token=" + localStorage.usertoken + "&request_id=" + myAvail[timeFrame].request_id
        console.log(ajaxUrl)
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {
                // myApp.alert("good")
                // getMySchedule(function () {
                    afterClickTab(timeFrame)                        
                // })
                
                console.log(results)
            }, 
            error: function (results) {
                // myApp.hideIndicator()
                console.log(results)
                // myApp.alert("Network error. Please try again later? ")
            }
        });           
    })    
     
    
}


function updateProfilePic (fileURL) {
    // var ajaxUrl = "http://gettimi.com/site/changeAvatar?user_token=" + token + 

    var options = new FileUploadOptions;
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf("/") + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = false;
    var params = {};
    params.user_token = localStorage.usertoken;
    // params.name = document.getElementById("post-image-title-input").value;
    // params.description = "";
    // params.type = 2;
    // params.udid = udid;
    options.params = params;
    var ft = new FileTransfer;
    var win = function(r) {
        myApp.hideIndicator();
        // document.getElementById("profile-pic").src = 

        getPersonalInfo( function () {
            document.getElementById("profile-pic").src = personalData.avatar
            $(".navbar-chatting-avatar").attr("src", personalData.avatar)
        })
        // myApp.alert("\u592a6\u4e86\uff01\u53d1\u9001\u6210\u529f");
        console.log(r);
        // myApp.closeModal(".popup-post-image")
    };
    var fail = function(error) {
        console.log(error)
        myApp.hideIndicator();
        // myApp.alert("\u7f51\u7edc\u95ee\u9898\uff0c\u8bf7\u91cd\u8bd5\uff01")
    };
    myApp.showIndicator();
    ft.upload(fileURL, encodeURI("http://gettimi.com/site/changeAvatar"), win, fail, options, true)
}


// function loadPanel () {
//     var settingList = [{
//         icon: "",
//         title: "Calendar"
//     }, {
//         icon: "",
//         title: "Friends"
//     }, {
//         icon: "",
//         title: "Chat"
//     }, {
//         icon: "",
//         title: "Settings"
//     }, {
//         icon: "",
//         title: "Help"
//     }, {
//         icon: "",
//         title: "Log out"
//     }]
//     var panelStrVar = ""
// // panelStrVar += "                <div class=\"content-block\">";
// // panelStrVar += "                  <div class=\"page-content\" >";
// // panelStrVar += "                    <div class=\"profile-image-container\" id=\"profile-pic-background\">";
// // panelStrVar += "                    <\/div>";
// // panelStrVar += "                    <div class=\"\">";
// // panelStrVar += "                      <img onclick=\"changePicture()\" id=\"profile-pic\"class=\"profile-pic\" src=''>";
// // panelStrVar += "                    <\/div>";
// // panelStrVar += "                    <div class=\"user-name\" id=\"profile-name\">";
// // panelStrVar += "";
// // panelStrVar += "                    <\/div>";
// // panelStrVar += "";
// // panelStrVar += "                    <div class=\"edit-profile-text\" onclick=\"changePicture()\"> ";
// // panelStrVar += "                      <b>Edit Profile Picture</b>";
// // panelStrVar += "                    <\/div>";
// // panelStrVar += "                    ";
// panelStrVar += "                    <div class=\"list-block media-list\">";
// panelStrVar += "                      <ul>";
// panelStrVar += "                        <li onclick='mainView.router.loadPage({\"pageName\":\"personal-setting-page\"})'>";
// panelStrVar += "                          <div class=\"item-content\">";
// panelStrVar += "                            <div class=\"item-media\">";
// panelStrVar += "                              <i class=\"fa fa-heart\"><\/i>";
// panelStrVar += "                            <\/div>";
// panelStrVar += "                            <div class=\"item-inner\">";
// panelStrVar += "                              <div class=\"item-title-row\">";
// panelStrVar += "                                <div class=\"item-title\">Personal Setting<\/div>";
// panelStrVar += "                              <\/div>";
// panelStrVar += "                              <div class=\"item-subtitle\">Favorite Activities, Prompt, and more<\/div>";
// panelStrVar += "                            <\/div>";
// panelStrVar += "                          <\/div>";
// panelStrVar += "                        <\/li>";
// panelStrVar += "                        <li onclick=''>";
// panelStrVar += "                          <div class=\"item-content\">";
// panelStrVar += "                            <div class=\"item-media\">";
// panelStrVar += "                              <i class=\"fa fa-heart\"><\/i>";
// panelStrVar += "                            <\/div>";
// panelStrVar += "                            <div class=\"item-inner\">";
// panelStrVar += "                              <div class=\"item-title-row\">";
// panelStrVar += "                                <div class=\"item-title\">My Availability<\/div>";
// panelStrVar += "                              <\/div>";
// panelStrVar += "                              <div class=\"item-subtitle\">When you are free<\/div>";
// panelStrVar += "                            <\/div>";
// panelStrVar += "                          <\/div>";
// panelStrVar += "                        <\/li>";
// panelStrVar += "                        <li onclick='window.open(\"sms:6178005220&body=Hi I have a question about Timi:\")'>";
// panelStrVar += "                          <div class=\"item-content\">";
// panelStrVar += "                            <div class=\"item-media\">";
// panelStrVar += "                              <i class=\"fa  fa-question-circle\"><\/i>";
// panelStrVar += "                            <\/div>";
// panelStrVar += "                            <div class=\"item-inner\">";
// panelStrVar += "                              <div class=\"item-title-row\">";
// panelStrVar += "                                <div class=\"item-title\">Help<\/div>";
// panelStrVar += "                              <\/div>";
// panelStrVar += "                              <div class=\"item-subtitle\">FAQ, contact, and more<\/div>";
// panelStrVar += "                            <\/div>";
// panelStrVar += "                          <\/div>";
// panelStrVar += "                        <\/li>    ";
// panelStrVar += "                        <li>";
// panelStrVar += "                          <div class=\"item-content\" onclick=\"logout()\">";
// panelStrVar += "                            <div class=\"item-media\">";
// panelStrVar += "                              <i class=\"fa  fa-sign-out\"><\/i>";
// panelStrVar += "                            <\/div>";
// panelStrVar += "                            <div class=\"item-inner\">";
// panelStrVar += "                              <div class=\"item-title-row\">";
// panelStrVar += "                                <div class=\"item-title\">Log out<\/div>";
// panelStrVar += "                              <\/div>";
// panelStrVar += "                              <div class=\"item-subtitle\">No, No, and more<\/div>";
// panelStrVar += "                            <\/div>";
// panelStrVar += "                          <\/div>";
// panelStrVar += "                        <\/li>                                                                          ";
// panelStrVar += "                      <\/ul>";
// panelStrVar += "                    <\/div>";
// // panelStrVar += "                  <\/div>";
// // panelStrVar += "                <\/div>";    
// $("#left-panel-html").html(panelStrVar)
// }



function serializeObject (obj)  {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    } 
    return str   
}

function postGeolocation () {
    // myApp.alert("hello1")
    if (userLocation == null || userLocation.length == 0 ) {
        // localStorage.allowedLocation = 0
        // myApp.alert("hello5")
        return 
    }
    var infoObject = {
        "user_token": localStorage.usertoken, 
        "geolocation": userLocation, 
    }
    // serializeObject(infoObject)
    var ajaxUrl = "http://gettimi.com/site/returnInfo?" + serializeObject(infoObject) + "&random=" +Math.random()
    console.log(ajaxUrl)
    // myApp.alert(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("hello2")
            // myApp.alert("good")
            console.log(results)
            localStorage.allowedLocation = 1;
            if ( localStorage.allowedLocation == "null" || localStorage.allowedLocation == null || !localStorage.allowedLocation) {  //first time geolocation
                // myApp.alert("hello3")
                


                localStorage.allowedLocation = 1         
                // getMySchedule(function () {
                    // getFriendFreeTime()
                    // afterClickTab(timeFrame)
                // })
            }
            // getFriendFreeTime(); 
            // getImageList(true)
            
            // myApp.hideIndicator()

        }, 
        error: function (results) {
            // myApp.alert("hello4")
            // myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });      
}

// get new message of one user, store to localdb, and display using loadMessageList
// called when the user receives new message
// display *only new messages* in the database
function loadNewMessage (receiver_id) {
    if (receiver_id == null ){
        return; 
    }    

    var ajaxUrl = "http://gettimi.com/site/LoadNewMessage?receiver=" + receiver_id + "&user_token=" + localStorage.usertoken
    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            newMessage = JSON.parse(results.result)
            console.log(newMessage)
            conversationStarted = true;
            for ( var i in newMessage ) {
                var message = newMessage[i].title
                var message_date = new Date(newMessage[i].create_time*1000)
                addToChatDatabase (receiver_id, message, false, message_date) 
                if (chattingWidthUserId == receiver_id) {
                    appendMessage (message, null, false, message_date.toISOString())
                }
                
                // add to datebase
            }

            //change UI 

            console.log()
            console.log(results)

        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });   
}

function searchUser(user1, user2) {
    return user1.user_id == user2.user_id || user1.sender_id == user2.user_id || user1.user_id == user2.sender_id || user1.sender_id == user2.sender_id
}


// get new message, store to localdb, and display using loadMessageList
// called when the user click user chat
// display *all messages* in the database
function loadMessage (receiver) {
    console.log(receiver)
    var user_id = receiver.user_id || receiver.sender_id
    console.log(user_id)
    if (user_id == null ){
        return; 
    }
    token = localStorage.usertoken
    var chatElem; 
    chatlist = getChatList()
    chatlist.map(function (unit) {
        if ( unit.user.user_id == user_id || unit.user.sender_id == user_id){
            chatElem = unit
        }
    })
    console.log(chatElem)
    if ( chatElem != null ) {
        loadMessageList(chatElem.chat_history)
    } 
    
    var ajaxUrl = "http://gettimi.com/site/LoadNewMessage?receiver=" + user_id + "&user_token=" + token
    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            newMessage = JSON.parse(results.result)
            console.log(newMessage)
            for ( var i in newMessage ) {
                console.log(newMessage[i].title)
                var message = newMessage[i].title
                var message_date = new Date(newMessage[i].create_time*1000)
                addToChatDatabase (user_id, message, false, message_date) 
                appendMessage(message, null, false, message_date)
                // add to datebase
            }

            // why currentChatIndex wtf.....
            // oh so this is only for message login. 

            // loadMessageList(chatlist[currentChatIndex].chat_history)

            //change UI 

        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });   
}

function postPersonalInfo () {

// 'username'=>$user->username,
// 'avatar'=>Yii::app()->params['globalURL'].$user->avatar,
// 'email'=>$user->email,
// 'phone'=>$user->phone,
// 'country'=>$user->country,
// 'city'=>$user->city,
// 'geolocation'=>$user->geolocation,
// 'favorites'=>$user->favorites,
// 'whatsup'=>$user->whatsup,
// 'range'=>$user->range,  


    // if (document.getElementById("whatsup").value == "") {
    //     myApp.alert('Please fill in "what\'s in your mind".')
    //     return
    // }
    // document.getElementById("whatsup").value = document.getElementById("whatsup").value || ""
    if (document.getElementById("current").value == "") {
        myApp.alert('Please fill in "Your School".')
        return
    }
    if (usersFavoriteList.length < 3) {
        myApp.alert("Please choose at least 3 activities.")
        return
    }    
    // .replace(/\ud83d[\ude00-\ude4f]/g, '<span class="emoji" data-emoji="$&"></span>');
    // if (document.getElementById("whatsup").value.indexOf(/\ud83d[\ude00-\ude4f]/g) == -1) {
    //     console.log("no emoji")
    // } else {
    //     console.log("emoji")
    // }

    var infoObject = {
        "user_token": localStorage.usertoken, 
        "favorites": usersFavoriteList,
        // "range": document.getElementById("distance-range").value, 
        // "whatsup": document.getElementById("whatsup").value,
        "whatsup":"",
        "current": document.getElementById("current").value, 
        "friend_friend" : (document.getElementById("allowFoF").checked ? 1 : 0)
    }

    // var muteSound = (document.getElementById("muteSound").checked ? 1 : 0)
    // localStorage.muteSound = muteSound
    try {
        initPush()
    } catch( err ) {

    }
    
    var updateFriendList = false; 
    if (personalData.friend_friend != infoObject["friend_friend"]) {
        updateFriendList = true;
    } else {
        updateFriendList = false;
    }

    // serializeObject(infoObject)
    var ajaxUrl = "http://gettimi.com/site/returnInfo?" + serializeObject(infoObject)
    try {
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {
                localStorage.hasChangedPref = 1
                // mainView
                mainView.router.back()
                console.log("update form", updateFriendList)
                if (updateFriendList) {
                    getFriendFreeTime()
                }
                // myApp.alert("good")
                console.log(results)
                // myApp.hideIndicator()

            }, 
            error: function (results) {
                // myApp.hideIndicator()
                console.log(results)
                myApp.alert("It might be network error..or your status is too complicated for us.. Please try again later? ")
            }
        });   
    } catch (err) {
        myApp.alert("It might be network error..or your status is too complicated for us.. Please try again later? ")
    }
     
}

function MarkAllFriendsMatchAsRead () {
    var ajaxUrl = "http://gettimi.com/site/MarkAllFriendsMatchAsRead?user_token=" + localStorage.usertoken 

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // request
            console.log(results)
            
            // assumed now



        }, 
        error: function (results) {
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });       
}


// when there is a friend request match, turn the red dot on for chats
function getUnreadFriendMatch () {
    var ajaxUrl = "http://gettimi.com/site/getUnreadFriendMatch?user_token=" + localStorage.usertoken 

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // request
            console.log(results)
            // if ( JSON.parse(results.result) != null )
            unreadFriendMatchList = JSON.parse(results.result);
            console.log(unreadFriendMatchList)

            // try {
            //     nearbyPendingNum = JSON.parse(results.result).length;
            // } catch (err) {
            //     nearbyPendingNum = 0;
            // }
            badgeSpot[3] = 1
            unreadFriendMatchList.map(function (unit) {
                console.log(unit)
                chatlist = getChatList ()
                var user = {
                    "avatar": unit.avatar,
                    "username": unit.username,

                    "phone": unit.phone, 
                    "email": unit.email, 
                    "user_id": unit.user_id, 
                    "day": queryDay, 
                    "time": 3
                }
                var elem = {
                    user: user, 
                    timeObject: (new Date()), 
                    schedule: 3
                }
                pushChatList (elem)                 
            })

            
            // assumed now



        }, 
        error: function (results) {
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });        
}

function getPersonalInfo (callback) {
    var ajaxUrl = "http://gettimi.com/site/returnInfo?user_token=" + localStorage.usertoken
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // myApp.alert("good")
            console.log(results)
            personalData = results
            localStorage.personalData = JSON.stringify(results)
            personalData.avatar = personalData.avatar || "img/timmi.png"

            usersFavoriteList = personalData.favorites.split(",")
            document.getElementById("profile-pic").src = personalData.avatar || "img/timi.png";

            getGeolocation ()
            if (personalData.phone == undefined || personalData.phone == "" ) {
                localStorage.checkedPhone = 0
                
                mainView.router.loadPage({"pageName":"phone-number"})
                setTimeout(function() {
                    document.getElementById("user-name-input").value = personalData.username
                    document.getElementById("user-email-input").value = personalData.email
                    document.getElementById("phone-number-input").focus()
                }, 200);
                return; 
            } else {
                localStorage.checkedPhone = 1
            }                           
            if ( localStorage.allowedContact == null || 
                localStorage.allowedContact == "null" || 
                localStorage.allowedContact == 0 ) {
                // popupToAskContact ()
                // return; 
            }
   
            if (personalData.current == "") {
                // localStorage.hasChangedPref = 0
                setTimeout(function () {
                    // if ( localStorage.hasChangedPref == null || localStorage.hasChangedPref == "null" || localStorage.hasChangedPref == 0) {
                    //     myApp.alert("Please update your personal settings! ", function () {
                    //         setTimeout(function () {
                    //             mainView.router.loadPage({"pageName": "personal-setting-page"}); 
                    //         }, 100)
                    //     })                 
                    // }     
                }, 200)                   
                return; 
            }
            if (usersFavoriteList.length < 3) {
                // localStorage.hasChangedPref = 0
                // setTimeout(function () {
                //     if ( localStorage.hasChangedPref == null || localStorage.hasChangedPref == "null" || localStorage.hasChangedPref == 0) {
                //         myApp.alert("Please update your favorite activities! ", function () {
                //             setTimeout(function () {
                //                 mainView.router.loadPage({"pageName": "personal-setting-page"}); 
                //             }, 100)
                            
                //         })                 
                //     }     
                // }, 300)    
                return; 
            }    
            if (callback != null) {
                callback()
            }                                  
        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });      
}

// update the profile picture
function onCameraSuccess(imageData) {
    console.log(imageData)
    var profilePic = document.getElementById('profile-pic');
    var profilePicBg = document.getElementById('profile-pic-background');
    // profilePic.src = "data:image/jpeg;base64," + imageData;
    profilePic.src = imageData
    // console.log('linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' +  imageData + '")')
    $("#profile-pic-background").css("background", ('linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + profilePic.src + ')'  ))
    updateProfilePic (imageData)
}

function onCameraFail(message) {
    myApp.alert("Please go to Settings - Timi - and turn on Cameras/Photos access! ")
    // myAalert('Failed because: ' + message);
}

// upload user contact list to server
function updateContactList () {

    var ajaxUrl = "http://gettimi.com/site/TakePhoneContact"
    console.log(contactsList.length)
    // "34e760735a29876e2d95cd9c99d38b51"
        // localStorage.usertoken  
    $.ajax({
        url: ajaxUrl,
        type: "POST",
        crossDomain: true,
        data: ({
            "user_token": localStorage.usertoken, 
            "list": JSON.stringify(contactsList)
        }), 
        dataType: "json",
        success: function(results) {
            // myApp.alert("good")
            console.log(results)
            localStorage.hasPassedContacts = 1; 
            // myApp.hideIndicator()




        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });  
}

function rewindInvitation () {
    var ajaxUrl = "http://gettimi.com/site/rewind?user_token=" + 
     localStorage.usertoken +"&request_day=" + queryDay + "&request_time=" +timeFrame
     currentIndex[timeFrame] = 1 //dirty practice, it gets reset in afterClickTab()
     // setting to 1 makes it refresh and reload data.
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // getMySchedule(function () {
            //     afterClickTab(timeFrame)
            // });
            getFriendFreeTime();


        }, 
        error: function (results) {
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });     
}
var eventsList = [];

function getTopPicks () {
    var geoList = getRecsList()
    // myPhotoBrowserStandalone = []

    // geoList = geolocationSet[0];

    // get all places with 

    // console.log(geoList.recs)
    if (geoList == undefined) {
        return; 
    }
    if (geoList.recs != undefined ) {
        if (geoList.recs.length > 0) {
            shortedList = geoList.recs.filter(function (unit) {
                var distance = Math.round(getDistanceFromLatLonInKm(unit.geolocation.split(",")[0], unit.geolocation.split(",")[1], personalData.geolocation.split(",")[0], personalData.geolocation.split(",")[1])*6.25)/10; 
                console.log(distance)
                return (distance < 2);
            });    
            if (shortedList.length < 4) {
                shortedList = geoList.recs
            }               
        }
    } else {
        shortedList = []
    }

    shuffle(shortedList)
    if (eventsList.length == 0 && shortedList == 0) {
        document.getElementById("event-tab-button").style.display = "none"
    } else {
        document.getElementById("event-tab-button").style.display = "flex"
    }    
}
function getRecentRequests (callback) {


    var ajaxUrl = "http://gettimi.com/site/ReturnRecentRequests?user_token=" + 
     localStorage.usertoken + "&day=" + queryDay
     console.log(ajaxUrl)

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            console.log(results)

            eventsList = JSON.parse(results.result); 
            if ( callback != null ) {
                callback()
            } else {}

            
        }, 
        error: function (results) {
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });  

}

// get a list of users whose status are either isInvited, or isSignedup
function updateInvitationStatus () {
    // [ isInvited, isSignedUp ]
    var ajaxUrl = "http://gettimi.com/site/ReturnInvitedSignedup?user_token=" + 
     localStorage.usertoken

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // console.log(results.result)
            invitedList = JSON.parse(results.result)

            for (var x in invitedList ) {
                var name = x; 
                var arr = invitedList[x]
                // console.log(name, arr)
            }
            // console.log(results)
        }, 
        error: function (results) {
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });  
}



function cleanWhatsUp () {
    document.getElementById("whatsup").value = ""
}

function inviteByPersonalText () {
    console.log("personal")
    var number = 6178005220;
    var message = "Hey Join me at Timi!";
    console.log("number=" + number + ", message= " + message);

    //CONFIGURATION
    var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
            intent: 'INTENT'  // send SMS with the native android SMS messaging
            //intent: '' // send SMS without open any other app
        }
    };

    var success = function () { myApp.alert('Message sent successfully'); };
    var error = function (e) { myApp.alert('Message Failed:' + e); };
    sms.send(number, message, options, success, error);    
}

// fired once the user invited their friend. Invite friends by sending sms on the backend. 
// If success, change the style of the button
// If not, change it back
function inviteFriend (number, html, from) {
    if (localStorage.sendTextToInvite != 1) {
        myApp.confirm("You will be sending a free message to invite your friends to join Timi. Continue? ", "", 
            function () {
                localStorage.sendTextToInvite = 1
                inviteFriendAJAX(number, html, from)
            }, function () {

            })
    }

    function inviteFriendAJAX(number, html, from) {
        from = from || ""
        var ajaxUrl = "http://gettimi.com/site/Invitefriends?user_token=" + 
         localStorage.usertoken + 
         "&number=" + number + "&from=" + from
         console.log(ajaxUrl)
         console.log("invite F")
         if ( html != "" ) {
             $(html).removeClass("button"); 
             $(html).removeClass("color-green");
             $(html).addClass("color-gray"); 
             $(html).addClass("text-holder");       
             $(html).html('<div class="friends-added">Inviting</div>')        
         }

        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {

                $(html).html('<div class="friends-added">Invited</div>')

                console.log("invite F good ")
                // myApp.hideIndicator()
            }, 
            error: function (results) {
                 
                myApp.alert(results);
                console.log("invite F bad")
                // myApp.hideIndicator()
                // myApp.alert("Network error. Please try again later? ")
            }, 
            timeout: timeOutValue
        });           
    }
 

   
}

function updateDistanceValue () {
    console.log("lol")
    


    clearTimeout(updateCalTimeout);
    document.getElementById("distance-value").innerHTML = document.getElementById("distance-range").value + "mi"
    updateCalTimeout = setTimeout(function () {
        // do the update here
    }, 800)
}
var hasPoppedLocationNotice = false;

function getGeolocation () {  
    var onSuccess = function(position) {

        // localStorage.
        // myApp.alert('Latitude: '          + position.coords.latitude          + '\n' +
        //       'Longitude: '         + position.coords.longitude         + '\n' +
        //       'Altitude: '          + position.coords.altitude          + '\n' +
        //       'Accuracy: '          + position.coords.accuracy          + '\n' +
        //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //       'Heading: '           + position.coords.heading           + '\n' +
        //       'Speed: '             + position.coords.speed             + '\n' +
        //       'Timestamp: '         + position.timestamp                + '\n');
        userLocation = [ position.coords.latitude, position.coords.longitude ]
        personalData.geolocation = position.coords.latitude + "," + position.coords.longitude
        postGeolocation ()
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        console.log("get location err")
        // localStorage.allowedLocation = 0
        if (localStorage.allowedLocation != 1 && hasPoppedLocationNotice == false) {
            myApp.alert("Please go to Settings - Timi - and turn on Location access! ")
            hasPoppedLocationNotice = 1
        }
        
        // put system redirect
    }    
    if ( localStorage.allowedLocation != 1 && hasPoppedLocationNotice == false) {
        var popupElem = {
            title: "Turn on Location? ", 
            text:"Your location is required for us to help you discover places. Allow location access?  ", 
            iconHTML:'<i class="fa fa-map-o" aria-hidden="true"></i>', 
            confirmText:"Yes, turn on Location", 
            cancelText:"Skip", 
            callbackYes:function () {
                hasPoppedLocationNotice = true;
                navigator.geolocation.getCurrentPosition(onSuccess, onError);    
            }, 
            callbackNo:function (){}
        }
        popupQueue.push(popupElem)
        fullScreenConfirm ()             
    } else {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);    
    }

}


// popupQueue.push(popupElem)
// popupQueue.push(popupElem)

var onFullScreenPopup = false;
var onHalfScreenPopup = false;
var halfScreenPopup = [];



function showPersonalPage (user) { 

    var listHTML = ""
    var htmlString = '<div class="list-block media-list" id="suggest-frined-list"><ul>'+
                        listHTML + 
                    '</ul></div>'          
                    console.log(htmlString)                                             

    htmlString =     "<div class='page-content'><div class='personal-page-avatar' style='width: 100%; height: " + $(window).width() + "px; margin-top: 44px; background-size: cover!important; background: url(" + (user.avatar || "img/timi.png") + ") 50% 50% no-repeat; '>" + "</div>" + "" + 
                     "<div class='personal-page-title'>" + "Name" + "</div>" + 
                     "<div class='personal-page-content'>" + user.username + "</div>"   
    try {
        if (user.current != null ) {
            htmlString +="<div class='personal-page-title'>" + "Occupation / School" + "</div>" + 
                        "<div class='personal-page-content'>" + user.current + "</div>"              
        }
         
    } catch (err) {

    }
 
    try {
        htmlString +="<div class='personal-page-title'>" + "Favorite Activities" + "</div>" + 
                     "<div class='personal-page-content'>" + user.favorites.replace(/,/g, ", ") + "</div>" 
    } catch (err) {

    }          
                                                               
                     
    try {
        htmlString += "<div class='personal-page-title'>" + "Distance" + "</div>"  + 
                      "<div class='personal-page-content'>" + Math.round(getDistanceFromLatLonInKm(
                            user.geolocation.split(",")[0],  
                            user.geolocation.split(",")[1], 
                            personalData.geolocation.split(",")[0], 
                            personalData.geolocation.split(",")[1]) * 16)/10 + " mi" +  
                      "</div>" 
    } catch (err) {

    }
    htmlString += "</div>"

                                          
   
                     // "<div class='personal-page-title'>" + "Mutual Friends" + "</div>" + 
                     // "<div class='personal-page-content'>" + user.mutuals + "</div>" +                       

    var popupElem = {
        title: user.username, 
        contentHTML: htmlString, 
        leftButton: "Close", 
        rightButton: "<i class='fa fa-ellipsis-h'></i>", 
        callbackRight: function () {
            var buttons = [{
                text: "Send Message", 
                onClick: function() {
                    myApp.closeModal(".half-screen-popup");
                    chatwith(user)
                }
            }, {
                "text": "Cancel", 
                color:'red'

            }]; 
            myApp.actions(buttons)
        }, 

        callbackLeft:function () {
         
        }, 
        onload: function () {
            // document.getElementById("")

        }
    }
    halfScreenPopup.push(popupElem)
    HalfScreenConfirm ()      
}

function catchUser (user) {


    var listHTML = user.username
    var htmlString = '<div class="list-block media-list" id="suggest-frined-list"><ul>'+
                        listHTML + 
                    '</ul></div>'          
                    console.log(htmlString)                                             


    var popupElem = {
        title: "Catch", 
        contentHTML: htmlString, 
        leftButton: "Done", 

        callbackLeft:function () {
            currentIndex[timeFrame] = 1;
            // getMySchedule(function () {
                afterClickTab(timeFrame)
            // });            
            // navigator.geolocation.getCurrentPosition(onSuccess, onError);    
        }, 
        onload: function () {
            // document.getElementById("")

        }
    }
    halfScreenPopup.push(popupElem)
    HalfScreenConfirm ()        
}


function addSuggestedFriends () { 
    
    var suggestFriendList = [
        {
            "name" : "Ray Xiao", 
            "avatar": "http://gettimi.com/uploads/avatar/23/avatar1464335266484.jpg", 
            "phone": "16178005220"
        }, 
        {
            "name" : "Jiaming Zhong", 
            "avatar" :"http://gettimi.com/uploads/avatar/49/avatar1463785412102.jpg", 
            "phone" :"12126410987"
        }, 
        {
            "name" : "Sa Wang", 
            "avatar" :"http://gettimi.com/uploads/avatar/67/avatar1463785727153.jpg", 
            "phone" :"15129837196"
        }, 
        {
            "name" : "Binsong Zhao", 
            "avatar" :"http://gettimi.com/uploads/avatar/165/avatar1464123595418.jpg", 
            "phone" :"13392037990"
        }        
    ];
    shuffle(suggestFriendList)

    var listHTML = ""
    suggestFriendList.map (function (unit) {
        var text = "<div class='button button-fill color-gray ' onclick = \"addByNumber(\'"+ unit.phone +"\', this, 'contact-list') \"><i class='fa fa-user-plus'></i>Add</div>"
        var listUnitHTML =                     '<li>'+
                    '      <a href="#" class=" item-content"> '+
                    '        <div class="item-media"><img src="' + (unit.avatar || "img/timi.png") + '" width="28px" style="border-radius:100%;"></div>' + 
                    '        <div class="item-inner"> '+
                    '          <div class="item-title-row"> '+
                    '            <div class="item-title">'+ unit.name +'<span class="hidden-number"> ' + "" + '</span></div> '+
                    '            <div class="item-after">' + text + '</div> '+
                    '          </div> '+
                    // '          <div class="item-subtitle color-gray">'+ "" +'</div> '+
                    // '          <!-- <div class="item-text">Lorem ipsum dolor sit amet...</div> --> '+
                    '        </div> '+
                    '      </a> '+
                    '    </li> '
        listHTML += listUnitHTML
    })
    var htmlString = '<div class="list-block media-list" id="suggest-frined-list"><ul>'+
                        listHTML + 
                    '</ul></div>'          
                    console.log(htmlString)                                             


    var popupElem = {
        title: "Friends You May Know", 
        contentHTML: htmlString, 
        leftButton: "Done", 

        callbackLeft:function () {
            currentIndex[timeFrame] = 1;
            // getMySchedule(function () {
                afterClickTab(timeFrame)
            // });            
            // navigator.geolocation.getCurrentPosition(onSuccess, onError);    
        }, 
        onload: function () {
            // document.getElementById("")

        }
    }
    halfScreenPopup.push(popupElem)
    HalfScreenConfirm ()      
}


var activityItem = ""
function clickActivity(elem) {
    // hehe = elem;
    var text = elem.getElementsByClassName("activity-text")[0].outerHTML;
    var dropdownHTML = '<i class="fa fa-chevron-circle-down" aria-hidden="true"></i>';
    emojiHTML = elem.getElementsByClassName("emoji-holder")[0].outerHTML;
    setTimeout(function () {
        myApp.closeModal (".half-screen-popup");
        $("#home-page-navbar-center").html(dropdownHTML+emojiHTML+text)
        var left_margin = ($(window).width() - $("#home-page-navbar-center").width()) / 2 
        $("#home-page-navbar-center").css("left", left_margin+"px")            
    }, 400)  
    
    // console.log(elem)
}
var mainActivityList = []

function selectActivity () {
    // 🏀🍕☕️🍴🍺🍷🍻🍦🍣🍜🍗🚴🏋⛹🏾🎻🎮⚽️🎾🎱⛳️🏊

    var listHTML = ""    
    mainActivityList = [ 
        "<span class='emoji-holder'>🍗</span><span class='activity-text'>Grab Lunch</span>", 
        "<span class='emoji-holder'>🍴</span><span class='activity-text'>Get Dinner</span>",   
        "<span class='emoji-holder'>🎲</span><span class='activity-text'>Play Poker</span><span class='hot-badge'>HOT</span>",                        
        "<span class='emoji-holder'>🍺</span><span class='activity-text'>Party! </span><span class='hot-badge'>NEW</span>",          
        // "<span class='emoji-holder'>🏀</span><span class='activity-text'>Watch Sports</span>", 
        "<span class='emoji-holder'>🏀</span><span class='activity-text'>Play Ball</span>",        
        "<span class='emoji-holder'>🍷</span><span class='activity-text'>Chill</span>", 
        "<span class='emoji-holder'>🍹</span><span class='activity-text'>Rooftop Happy Hour</span>", 
        "<span class='emoji-holder'>🎤</span><span class='activity-text'>Sing Karaoke</span><span class='hot-badge'>HOT</span>",    
    ]
    var activityList = [
    
        "<span class='emoji-holder'>🎓</span><span class='activity-text'>Study/Do Work</span>",   
        "<span class='emoji-holder'>🍦</span><span class='activity-text'>Get Ice Cream</span>",                  
        "<span class='emoji-holder'>🏀</span><span class='activity-text'>Play Basketball</span>",     
        // "<span class='emoji-holder'>🎲</span><span class='activity-text'>Play Poker</span>", 
        "<span class='emoji-holder'>⛱</span><span class='activity-text'>Kill time</span>",         
        "<span class='emoji-holder'>🙌</span><span class='activity-text'>Chat</span>",         
        "<span class='emoji-holder'>🏋</span><span class='activity-text'>Workout</span>",         
        "<span class='emoji-holder'>🎮</span><span class='activity-text'>Play Video Games</span>", 
        "<span class='emoji-holder'>⛳️</span><span class='activity-text'>Golf</span>", 
        "<span class='emoji-holder'>🏊</span><span class='activity-text'>Swimming</span>", 
        "<span class='emoji-holder'>⚽️</span><span class='activity-text'>Play Soccer</span>", 
        "<span class='emoji-holder'>🏃</span><span class='activity-text'>Go Running</span>", 
        "<span class='emoji-holder'>🎺</span><span class='activity-text'>Go to Concerts</span>", 
        "<span class='emoji-holder'>🎬</span><span class='activity-text'>Watch a movie</span>",                                                                                                                                                                                                                                                 
        "<span class='emoji-holder'>🍻</span><span class='activity-text'>Drink</span><span class='hot-badge'>HOT</span>", 
        "<span class='emoji-holder'>👜</span><span class='activity-text'>Go shopping</span>",                         
        "<span class='emoji-holder'>👾</span><span class='activity-text'>Play Board Games</span>", 
        "<span class='emoji-holder'>👑</span><span class='activity-text'>Go Clubbing</span>"
    ]
    listHTML = '<li >'+
            '      <div href="#" class="column-title  "> '+
            // '        <div class="item-inner "> '+
                     'TRENDING TODAY' + 
            // '        </div> '+
            '      </div> '+
            '    </li> '
    shuffle(activityList);
    var finalList = mainActivityList.concat(activityList)

    mainActivityList.map(function (unit) {
              
        listHTML += '<li onclick="clickActivity(this)">'+
            '      <label href="#" class="label-radio item-content"> '+
            '        <div class="item-inner"> '+
            // '          <div class="item-title-row"> '+
            '            <div class="item-title">'+ unit + '</div> '+
            // '            <div class="item-after">' + text + '</div> '+
            // '          </div> '+
            // '          <div class="item-subtitle color-gray">'+ unit.number[num] +'</div> '+
            // '          <!-- <div class="item-text">Lorem ipsum dolor sit amet...</div> --> '+
            '        </div> '+
            '      </label> '+
            '    </li> '
    });
    listHTML += '<li >'+
            '      <div href="#" class="column-title  "> '+
            // '        <div class="item-inner "> '+
                     'OTHERS' + 
            // '        </div> '+
            '      </div> '+
            '    </li> ' 
    activityList.map(function (unit) {
              
        listHTML += '<li onclick="clickActivity(this)">'+
            '      <label href="#" class="label-radio item-content"> '+
            '        <div class="item-inner"> '+
            // '          <div class="item-title-row"> '+
            '            <div class="item-title">'+ unit + '</div> '+
            // '            <div class="item-after">' + text + '</div> '+
            // '          </div> '+
            // '          <div class="item-subtitle color-gray">'+ unit.number[num] +'</div> '+
            // '          <!-- <div class="item-text">Lorem ipsum dolor sit amet...</div> --> '+
            '        </div> '+
            '      </label> '+
            '    </li> '
    });    

    var htmlString = '<div class="content-block"><div class="page-content"><div class="list-block " id="activity-list-form"><ul>'+
                        listHTML + 
                    '</ul></div></div></div>'          
                    console.log(htmlString)                                             


    var popupElem = {
        title: "", 
        contentHTML: htmlString, 
        leftButton: "", 

        callbackLeft:function () {
            // currentIndex[timeFrame] = 1;
            // getMySchedule(function () {
            //     afterClickTab(timeFrame)
            // });            
            // navigator.geolocation.getCurrentPosition(onSuccess, onError);    
        }, 
        callbackRight: function () {

        }, 
        onload: function () {
            // document.getElementById("")

        }
    }
    halfScreenPopup.push(popupElem)
    HalfScreenConfirm ()  
    $(".popup.half-screen-popup").css("width", Math.round($(window).width() * 0.8)+"px")
    $(".popup.half-screen-popup").css("height", Math.round($(window).height() * 0.8)+"px")
    $(".popup.half-screen-popup").css("top", Math.round($(window).height() * 0.1)+"px")
    $(".popup.half-screen-popup").css("left", Math.round($(window).width() * 0.1)+"px")
    $(".popup.half-screen-popup").css("border-radius", "5px")
    // display: block;
    // width: calc(80%);
    // height: 80%;
    // top: 10%;
    // left: 10%;
    // border-radius: 5px; 
}


function inviteFriendsPopup () { 

    var list = JSON.parse(localStorage.contacts)
    console.log(list)
    var listHTML = ""
    var templist = list.slice(0,20)
    // try{
    //     cordova.plugins.clipboard.copy(JSON.stringify(templist))
    // } catch(err) {

    // }
    

    list.map(function (unit) {
        // check the invitation status
        for (var num in unit.number) {
            var arr = null ; 
            var text = ""
            for (var name in invitedList ) {
                // console.log(name)
                if ( name == unit.name ) {
                    arr = invitedList[name]
                }
            }
            if ( arr == null ) {
                // the user is yet to be invited
                text = "<div class='button button-fill color-gray ' onclick = \"inviteFriend(\'"+ unit.number[num] +"\', this, 'contact-list') \"><i class='fa fa-envelope-o'></i>Invite</div>"

            } else {
                // The suer is invited or has signed up
                var isInvited = arr[0]
                var hasSignedUp = arr[1]

                if (isInvited == 1 && hasSignedUp == 0) {
                    text = "<div class='text-holder color-gray'>Invited</div>"
                } else if ( hasSignedUp == 1 ){
                    text = "<div class='text-holder color-gray'>Friend</div>"
                } else {
                    text = "<div class=' button button-fill color-gray ' onclick = \"inviteFriend(\'"+ unit.number[num] +"\', this, 'contact-list') \"><i class='fa fa-envelope-o'></i>Invite</div>"
                }                
            }                    
            listHTML += '<li>'+
                '      <a href="#" class=" item-content"> '+
                '        <div class="item-inner"> '+
                '          <div class="item-title-row"> '+
                '            <div class="item-title">'+ unit.name + '</span></div> '+
                '            <div class="item-after">' + text + '</div> '+
                '          </div> '+
                // '          <div class="item-subtitle color-gray">'+ unit.number[num] +'</div> '+
                // '          <!-- <div class="item-text">Lorem ipsum dolor sit amet...</div> --> '+
                '        </div> '+
                '      </a> '+
                '    </li> '
        }

    });
    // htmlString = htmlString + '</ul>'


    // var listHTML = ""
    // htmlString.map (function (unit) {
    //     var text = "<div class='button button-fill color-gray ' onclick = \"addByNumber(\'"+ unit.phone +"\', this, 'contact-list') \"><i class='fa fa-user-plus'></i>Add</div>"
    //     var listUnitHTML =                     '<li>'+
    //                 '      <a href="#" class=" item-content"> '+
    //                 '        <div class="item-media"><img src="' + unit.avatar + '" width="28px" style="border-radius:100%;"></div>' + 
    //                 '        <div class="item-inner"> '+
    //                 '          <div class="item-title-row"> '+
    //                 '            <div class="item-title">'+ unit.name +'<span class="hidden-number"> ' + "" + '</span></div> '+
    //                 '            <div class="item-after">' + text + '</div> '+
    //                 '          </div> '+
    //                 // '          <div class="item-subtitle color-gray">'+ "" +'</div> '+
    //                 // '          <!-- <div class="item-text">Lorem ipsum dolor sit amet...</div> --> '+
    //                 '        </div> '+
    //                 '      </a> '+
    //                 '    </li> '
    //     listHTML += listUnitHTML
    // })


    var htmlString = '<div class="content-block" ><div class="page-content" ><div class="list-block media-list" id="friend-list-form" ><ul>'+
                        listHTML + 
                    '</ul></div></div></div>'          
                    console.log(htmlString)                                             


    var popupElem = {
        title: "Invite friends to Timi", 
        contentHTML: htmlString, 
        leftButton: "Close", 

        callbackLeft:function () {
            // currentIndex[timeFrame] = 1;
            // getMySchedule(function () {
            //     afterClickTab(timeFrame)
            // });            
            // navigator.geolocation.getCurrentPosition(onSuccess, onError);    
        }, 
        callbackRight: function () {

        }, 
        onload: function () {
            // document.getElementById("")

        }
    }
    halfScreenPopup.push(popupElem)
    HalfScreenConfirm ()    
    if ( localStorage.allowedContact == 1 ) {
        loadFriendsFromContact()
    }

    // loadFriendsFromContact()  
}
function loadPersonalInfo (user_id, callback) {
    // callback takes in a parameter which is user
    var ajaxUrl = "http://gettimi.com/site/returnUserInfo?user_token=" + localStorage.usertoken + "&user_id=" + user_id
        console.log(ajaxUrl)
    myApp.showIndicator()
    try {
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {
                myApp.hideIndicator()
                console.log(results)
                if (callback != null) {
                    callback(results); 
                }
            }, 
            error: function (results) {
                myApp.hideIndicator()
            }
        });          
    } catch (err) {
        myApp.hideIndicator()
    }

}

function returnUserInfo (user_id, username) {
    var buttons = [{
        text: "View Profile", 
        onClick: function () {
            mixpanel.track("click profile", {
                "username": personalData.username,
                "receiver": username, 
                "event" : "view profile"
            });                     
            loadPersonalInfo(user_id, showPersonalPage)
        }
    }, {
        text: "Send Message", 
        onClick: function () {
            mixpanel.track("click profile", {
                "username": personalData.username,
                "receiver": username, 
                "event" : "send message"
            });              
            loadPersonalInfo(user_id, chatwith)        
        }
    }]; 
    myApp.actions(buttons)


}


function HalfScreenConfirm () {

    if ( (halfScreenPopup == null) || (halfScreenPopup.length == 0) ) return;  
    if (onHalfScreenPopup) return; 
    onHalfScreenPopup = true; 

    var elem = halfScreenPopup.pop()
    // elem.iconHTML = elem.iconHTML || "<i class='fa fa-comments'></i>";
    // elem.title = elem.title || "Title";
    // elem.text = elem.text || "from accessing a frame with origin .  The frame requesting access has a protocol of , the frame being accessed has a protocol of . Protocols must match.";
    // elem.confirmText = elem.confirmText || "Yes, notify me";
    // elem.cancelText = elem.cancelText || "Skip";
    elem.leftButton = elem.leftButton || ""
    elem.rightButton = elem.rightButton || ""




    var popupHTML = '<div class="popup half-screen-popup">'+
                        '<div class="navbar"><div class="navbar-inner"><div class="left link" >' + elem.leftButton + '</div><div class="center">'+elem.title+'</div><div class="right">' + elem.rightButton + '</div></div></div>' +    
                        elem.contentHTML +                                                                                   
                      '</div>'






    myApp.popup(popupHTML);
    $(".navbar").css("visibility", "visible");
    $(".navbar").css("position", "absolute");
    var leftWidth = $(".half-screen-popup .left").width()
    var rightWidth = $(".half-screen-popup .right").width()
    var buttonWidth = (leftWidth < rightWidth) ? rightWidth : leftWidth;     
    $(".half-screen-popup .left").css("width", buttonWidth+"px");
    $(".half-screen-popup .right").css("width", buttonWidth+"px");       
    setTimeout(function () {
        elem.onload()
    }, 400)
    $(".half-screen-popup .left").click(function () {
        // console.log("confirm cliked")
        myApp.closeModal (".half-screen-popup")
        elem.callbackLeft ()

    }); 
    $(".half-screen-popup .right").click(function () {
        // console.log("confirm cliked")
        // myApp.closeModal (".half-screen-popup")
        elem.callbackRight ()

    });     
    $$('.half-screen-popup').on('close', function () {
        
        
        onHalfScreenPopup = false;
        if (halfScreenPopup.length != 0) {
            
            HalfScreenConfirm()
        }        
      // console.log('About Popup is closing')
    });
}


function fullScreenConfirm () {

    if ( (popupQueue == null) || (popupQueue.length == 0) ) return;  
    if (onFullScreenPopup) return; 
    onFullScreenPopup = true; 

    var elem = popupQueue.pop()
    elem.iconHTML = elem.iconHTML || "<i class='fa fa-comments'></i>";
    elem.title = elem.title || "Title";
    elem.text = elem.text || "from accessing a frame with origin .  The frame requesting access has a protocol of , the frame being accessed has a protocol of . Protocols must match.";
    elem.confirmText = elem.confirmText || "Yes, notify me";
    elem.cancelText = elem.cancelText || "Skip";
    var popupHTML = '<div class="popup fullscreen-popup bg-pink">'+
                        '<div class="content-block">'+
                            '<div class="popup-icon">'+elem.iconHTML+'</div>' + 
                            '<div class="popup-title">'+elem.title+'</div>' +
                            '<div class="popup-text">'+elem.text+'</div>' + 
                            '<div class="popup-confirm-button button button-fill color-white" style="color:#ec5298; ">'+elem.confirmText+'</div><br>' +     
                            '<div class="popup-cancel-button button color-white" >'+elem.cancelText+'</div>' +                                                                                          
                        '</div>'+
                      '</div>'
    myApp.popup(popupHTML);
    $(".popup-confirm-button").click(function () {
        console.log("confirm cliked")
        myApp.closeModal (".fullscreen-popup")
        elem.callbackYes ()
        onFullScreenPopup = false;
        if (popupQueue.length != 0) {
            
            fullScreenConfirm()
        }
    });
    $(".popup-cancel-button").click(function () {
        console.log("cancel cliked")
        myApp.closeModal (".fullscreen-popup")
        elem.callbackNo ()
        onFullScreenPopup = false;
        if (popupQueue.length != 0) {
            
            fullScreenConfirm()
        }
    });    
}
function superLikePopup (user) {
    var popupElem = {
        title: user.username + " LIKES you! ", 
        text:'Congrats! ' + user.username + ' wants to hang out with you. ' , 
        iconHTML:'<img style="margin-left: 0px; margin-top: 20px;" class="match-profile-pic" src="'+ ( user.avatar || "img/timi.png" ) + '"><img class="match-profile-pic" src="'+personalData.avatar+'">', 
        confirmText:"Yes, send a message", 
        cancelText:"Keep playing", 
        callbackYes:function () {
            myApp.showTab("#messenger-tab");  
        }, 
        callbackNo:function (){

        }
    }
    popupQueue.push(popupElem)
    fullScreenConfirm ()       
}

function matched (user) {
    // name = name || "someone"
    var popupElem = {
        title: "It's a Match!", 
        text:'Congrats! ' + user.username + ' says YES to you, too! ' + user.username + ' likes ' + user.favorites.split(",").slice(0,3).join(", ") + '. Ask '+user.username+' out now', 
        iconHTML:'<img style="margin-left: 0px; margin-top: 20px;" class="match-profile-pic" src="'+(user.avatar || "img/timi.png")+'"><img class="match-profile-pic" src="'+ (personalData.avatar || "img/timi.png" ) + '">', 
        confirmText:"Yes, send a message", 
        cancelText:"Keep playing", 
        callbackYes:function () {
            myApp.showTab("#messenger-tab");  
        }, 
        callbackNo:function (){

        }
    }
    popupQueue.push(popupElem)
    fullScreenConfirm ()    
}
function textTo (number) {
    try {
        sms.send(number, "", null, null, null);
    } 
    catch (err) {
        try {
            number = number || "6178005220"
            window.open ("sms:" + number,"_system", 'location=no');
        } catch (err2) {

        }
    }

}

// function uploadFriendContacts () {

// }

// import and display the contact list from users' mobile contacts
function loadFriendsFromContact () {

    if (localStorage.hasPassedContacts == 1) return; 
    if ( (localStorage.allowedContact == null || localStorage.allowedContact == "null") ) {
        // if has never accessed contact list
        myApp.confirm("Allow us to access your Contacts to find friends for you? ", "Timi ", function () {
            localStorage.allowedContact = "1"
            if (!contactedLoaded) {
                var options = new ContactFindOptions();
                options.filter="";
                options.multiple=true; 
                var fields = ["displayName", "phoneNumbers"];
                navigator.contacts.find(fields, onSuccess, onError, options);
                document.getElementById("progressbar").style.display = "block"
            }                    
        }, function () {
            return; 
        })
    } else {
        // if has ever accessed contact list
        console.log(contactedLoaded)
        try {

            var options = new ContactFindOptions();
            options.filter="";
            options.multiple=true; 
            var fields = ["displayName", "phoneNumbers"];
            navigator.contacts.find(fields, onSuccessSilent, onError, options);

            // var list = JSON.parse(localStorage.contacts)
            // var htmlString = "<ul>"
            // list.map(function (unit) {
            //     // check the invitation status
            //     for (var num in unit.number) {
            //         var arr = null ; 
            //         var text = ""
            //         for (var name in invitedList ) {
            //             // console.log(name)
            //             if ( name == unit.name ) {
            //                 arr = invitedList[name]
            //             }
            //         }
            //         if ( arr == null ) {
            //             // the user is yet to be invited
            //             text = "<div class='button button-fill color-gray ' onclick = \"inviteFriend(\'"+ unit.number[num] +"\', this, 'contact-list') \"><i class='fa fa-envelope-o'></i>Invite</div>"

            //         } else {
            //             // The suer is invited or has signed up
            //             var isInvited = arr[0]
            //             var hasSignedUp = arr[1]

            //             if (isInvited == 1 && hasSignedUp == 0) {
            //                 text = "<div class='text-holder color-gray'>Invited</div>"
            //             } else if ( hasSignedUp == 1 ){
            //                 text = "<div class='text-holder color-gray'>Friend</div>"
            //             } else {
            //                 text = "<div class=' button button-fill color-gray ' onclick = \"inviteFriend(\'"+ unit.number[num] +"\', this, 'contact-list') \"><i class='fa fa-envelope-o'></i>Invite</div>"
            //             }                
            //         }                    
            //         htmlString += '<li>'+
            //             '      <a href="#" class=" item-content"> '+
            //             '        <div class="item-inner"> '+
            //             '          <div class="item-title-row"> '+
            //             '            <div class="item-title">'+ unit.name +'<span class="hidden-number"> ' + unit.number[num] + '</span></div> '+
            //             '            <div class="item-after">' + text + '</div> '+
            //             '          </div> '+
            //             '          <div class="item-subtitle color-gray">'+ unit.number[num] +'</div> '+
            //             // '          <!-- <div class="item-text">Lorem ipsum dolor sit amet...</div> --> '+
            //             '        </div> '+
            //             '      </a> '+
            //             '    </li> '
            //     }

            // });
            // document.getElementById("friend-list-form").innerHTML = htmlString + '</ul>'

            // var options = new ContactFindOptions();
            // options.filter="";
            // options.multiple=true; 
            // contactedLoaded = true; 
            // var fields = ["displayName", "phoneNumbers"];
            // navigator.contacts.find(fields, onSuccess, onError, options);
            // document.getElementById("progressbar").style.display = "block"            
        } catch(err) {

        }

        // if (!contactedLoaded) {

        // }        
        // onSuccess()
        // return;
    }
    function onSuccessSilent(contacts) {
        contactedLoaded = false; 

        // sort the names alphabetically
        contacts = contacts.sort(cSort);

        // generate the list of data
        contactsList = []; 

        contacts.map(function (userUnit) {
            var number = [], email = []
            // deal with phone number
            if (userUnit.phoneNumbers != null) {
                for (var j = 0; j < Math.min(userUnit.phoneNumbers.length, 3) ; j ++) {
                    number.push(userUnit.phoneNumbers[j].value)  
                }    
                contactsList.push({
                    "name": userUnit.name.formatted, 
                    "number": number, 
                    "status": ""
                });                                   
            } 
            // deal with email
            if (userUnit.emails != null) {
                for (var j = 0; j < Math.min(userUnit.emails.length, 3) ; j ++) {
                    email.push(userUnit.emails[j].value)
                }                     
            }
            // add to contact list
   


        })
        localStorage.contacts = JSON.stringify(contactsList)
        // console.log(localStorage.contacts)
        updateContactList()
        contactedLoaded = false

    }



    function onSuccess(contacts) {
        document.getElementById("progressbar").style.display = "none"

        contactedLoaded = false; 

        // sort the names alphabetically
        contacts = contacts.sort(cSort);

        // generate the list of data
        contactsList = []; 
        var htmlString = "<ul>"

        contacts.map(function (userUnit) {
            var number = [], email = []
            // deal with phone number
            if (userUnit.phoneNumbers != null) {
                for (var j = 0; j < Math.min(userUnit.phoneNumbers.length, 3) ; j ++) {
                    number.push(userUnit.phoneNumbers[j].value)  


                    // check the invitation status
                    var arr = null ; 
                    var text = ""
                    for (var name in invitedList ) {
                        // console.log(name)
                        if ( name == userUnit.name.formatted ) {
                            arr = invitedList[name]
                        }
                    }
                    if ( arr == null ) {
                        // the user is yet to be invited
                        text = "<div class='button button-fill color-gray ' onclick = \"inviteFriend(\'"+ userUnit.phoneNumbers[j].value +"\', this, 'contact-list') \"><i class='fa fa-envelope-o'></i>Invite</div>"

                    } else {
                        // The suer is invited or has signed up
                        var isInvited = arr[0]
                        var hasSignedUp = arr[1]

                        if (isInvited == 1 && hasSignedUp == 0) {
                            text = "<div class='text-holder color-gray'>Invited</div>"
                        } else if ( hasSignedUp == 1 ){
                            text = "<div class='text-holder color-gray'>Friend</div>"
                        } else {
                            text = "<div class=' button button-fill color-gray ' onclick = \"inviteFriend(\'"+ userUnit.phoneNumbers[j].value +"\', this, 'contact-list') \"><i class='fa fa-envelope-o'></i>Invite</div>"
                        }                
                    }    

                    // update HTML string
                    htmlString += '<li>'+
                    '      <a href="#" class=" item-content"> '+
                    '        <div class="item-inner"> '+
                    '          <div class="item-title-row"> '+
                    '            <div class="item-title">'+ userUnit.name.formatted +'<span class="hidden-number"> ' + userUnit.phoneNumbers[j].value.replace(/[^\d]/g,'') + '</span></div> '+
                    '            <div class="item-after">' + text + '</div> '+
                    '          </div> '+
                    '          <div class="item-subtitle color-gray">'+ userUnit.phoneNumbers[j].value +'</div> '+
                    // '          <!-- <div class="item-text">Lorem ipsum dolor sit amet...</div> --> '+
                    '        </div> '+
                    '      </a> '+
                    '    </li> '
                }    
                contactsList.push({
                    "name": userUnit.name.formatted, 
                    "number": number, 
                    "status": ""
                });                                   
            } 
            // deal with email
            if (userUnit.emails != null) {
                for (var j = 0; j < Math.min(userUnit.emails.length, 3) ; j ++) {
                    email.push(userUnit.emails[j].value)
                }                     
            }
            // add to contact list
   


        })
        localStorage.contacts = JSON.stringify(contactsList)
        // console.log(localStorage.contacts)
        updateContactList()
        document.getElementById("friend-list-form").innerHTML = htmlString + '</ul>'
        contactedLoaded = false

    }

    function onError() {
        document.getElementById("progressbar").style.display = "none"
        myApp.alert("Please go to Settings - Timi - and turn on Contacts access! ")
        // alert("Some Error Occured");
    }          
}

function popupToAskContact () {
    if ( (localStorage.allowedContact == null || localStorage.allowedContact == "null" || localStorage.allowedContact == 0) ) {
        var popupElem = {
            title: "Find friends via Contacts", 
            text:"Allow Timi to access your Contacts to find friends for you? Timi won't share your contact information to anyone. ", 
            iconHTML:'<i class="fa fa-users" aria-hidden="true"></i>', 
            confirmText:"Yes, continue", 
            cancelText:"Skip", 
            callbackYes:function () {
                localStorage.allowedContact = 1;
                loadFriendsFromContact()

            }, 
            callbackNo:function (){
                localStorage.allowedContact = 1;
            }
        }
        popupQueue.push(popupElem)
        fullScreenConfirm ()  

        // myApp.confirm("Allow Timi to access your Contacts to find friends for you? ", "Timi ", function () {
            
        //     if (!contactedLoaded) {
        //         var options = new ContactFindOptions();
        //         options.filter="";
        //         options.multiple=true; 
        //         var fields = ["displayName", "phoneNumbers"];
        //         navigator.contacts.find(fields, onSuccess, onError, options);
        //     }                    
        // }, function () {

        //     // return; 
        // })
    } else {
        if (!contactedLoaded) {
            var options = new ContactFindOptions();
            options.filter="";
            options.multiple=true; 
            var fields = ["displayName", "phoneNumbers"];
            navigator.contacts.find(fields, onSuccess, onError, options);
        }        
        // return;
    }




    function onSuccess(contacts) {
        localStorage.allowedContact = "1"
        document.getElementById("progressbar").style.display = "none"

        contactedLoaded = true; 
        // sort the names alphabetically
        contacts = contacts.sort(cSort);

        // generate the list of data
        contactsList = []; 
        var htmlString = "<ul>"

        contacts.map(function (userUnit) {
            var number = [], email = []
            // deal with phone number
            if (userUnit.phoneNumbers != null) {
                for (var j = 0; j < Math.min(userUnit.phoneNumbers.length, 3) ; j ++) {
                    number.push(userUnit.phoneNumbers[j].value)  
                }    
                contactsList.push({
                    "name": userUnit.name.formatted, 
                    "number": number
                });                                   
            } 
            // deal with email
            if (userUnit.emails != null) {
                for (var j = 0; j < Math.min(userUnit.emails.length, 3) ; j ++) {
                    email.push(userUnit.emails[j].value)
                }                     
            }
            // add to contact list
        })
        localStorage.contacts = JSON.stringify(contactsList)
        console.log("loaded")
        afterClickTab(timeFrame)
        // myApp.alert("loaded!")
        // updateContactList()

    }

    function onError() {
        document.getElementById("progressbar").style.display = "none"
        localStorage.allowedContact = 0

        // put system redirect
        myApp.alert("Please go to Settings - Timi - Contacts to allow Timi to access contact information:) ");
    }            
}

// used with placePulse

function showNoFriendBlock () {
    setTimeout(function () {
        $(".no-friend").css("display", "block")
        $(".no-friend").addClass("animated bounceIn")
        setTimeout(function () {
            $(".no-friend").removeClass("animated bounceIn")
        }, 500)
        getUnprocessedSwipe () 
        if (localStorage.allowedLocation != 1) {
            // myApp.alert("Please turn on location setting for Timi to see who's around! Setting - Timi - Location", "Timi")
        }
    }, 1000)        
}

function reportUser () {
    var buttons = [
        {
            text: 'Report User',
            onClick: function () {
                console.log("report")
            }
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
}

function generateTopN (array) {
    var unitLength = 3; 
    var total = []
    if (array.length < unitLength) {
        return array; 
    } else {
        for (var i = 0; i <= array.length-unitLength; i++) {
            var unitList = []
            var unitEnd = i+unitLength
            console.log("united End is: "+unitEnd)
            for (var j = i; j < unitEnd; j++) {
                unitList.push(j)
            }
            total.push(unitList)
        }
    }
    return total; 
}


function placeTinderSwipe () {

    document.getElementById("tinderslide").innerHTML = "";
    var tinderListHTML = "<div id='tinder-contain'><ul id='tinder-list-ul'></ul></div>";
    document.getElementById("tinderslide").innerHTML = tinderListHTML;
    insertNewCard();
}

// supposedly 
function getLastUpdateTime () {

    var now = new Date(); 
    var returntime;
    var hours = now.getHours()
    if (hours >= 12) {
        //same day 12pm
        returntime = new Date(); 
    } else {
        // yesterday 12pm
        returntime = new Date((new Date()) - 86400 * 1000);         
    }
    returntime.setHours(12,0,0,0)
    return returntime;     
}
// localStorage.swipeNumberLeft = 3; 

function hasUpdatedNearby () {

    var lastswiped; 
    if (localStorage.swipeNumberLeft == undefined || localStorage.swipeNumberLeft == "null") {
        localStorage.swipeNumberLeft = 5;
    }
    if (localStorage.swiped == undefined) {
        lastswiped = new Date(0)
    } else {
        lastswiped = new Date(localStorage.swiped)
    }
    if (!lastswiped || lastswiped < getLastUpdateTime ()) {
        // last swipe happens before last update, then update to three
        localStorage.swipeNumberLeft = 5; 
    } else {

        // last swipe happens after last update, if less then 3, ok; else not ok
        // if (localStorage.swipeNumberLeft ) 
    }
    if (localStorage.usertoken == ray_token || localStorage.usertoken == jimmy_token) {
        localStorage.swipeNumberLeft = 100; 
    }

}

function placeStrangerCard () {
    hasUpdatedNearby();
    if (nearbyList.length == 0 || nearbyIndex == -1) {
        var pulseHTML = 
        '   <img src="' + "img/timi.png" + '" class="matched-portrait animated bounceIn "  />' + 

        '   <div class="one-line-prompt " style="color:#929292; font-size: 15px; line-height:25px; font-weight: 500;">' +
        '       You\'ve got no people nearby 😅' +
        '   </div>'         
        document.getElementById("nearbyslide").innerHTML = pulseHTML;
    } else {
        if (localStorage.swipeNumberLeft > 0) {
            document.getElementById("nearbyslide").innerHTML = "";
            var tinderListHTML = 
            "<div class='nearby-prompt'>You've got <span id='swipe-left-number'>" + localStorage.swipeNumberLeft +"</span> swipe(s) left for today! </div>" + 
            "<div id='nearby-tinder-contain'><ul id='nearby-tinder-list-ul'></ul></div>";
            document.getElementById("nearbyslide").innerHTML = tinderListHTML;
            insertStrangerCard();    
        } else {
            document.getElementById("nearbyslide").innerHTML = "";
            var pulseHTML = 
            '   <img src="' + "img/timi.png" + '" class="matched-portrait animated bounceIn "  />' + 

            '   <div class="one-line-prompt " style="color:#929292; font-size: 15px; line-height:25px; font-weight: 500;">' +
            '       You\'ve got no more swipe for today. 😅<br>' +
            '       Come tomorrow at 12pm to get 3 more swipes! <br>' + 
            '       Or let 3 best friends know Timi by pressing <span class=\'color-pink\' onclick="inviteViaWechat()">here</span>. ' + 
            '       We will give you more swipes every day if they are on board!</div>'         
            document.getElementById("nearbyslide").innerHTML = pulseHTML;
            // placeBusy()
            // insertStrangerCard();    
        }        
    }


}

function insertStrangerCard () {

    var item = nearbyList[nearbyIndex];

    //item.check_friendship = true or false -> check direct friendship
    var mutual_friends_count =  Object.keys(item.mutual).length;
    var mutual_friends = item.mutual;
    mutual_friends_string = "";

    //if you guys are already friends.
    //if(item.check_friendship){
    //    mutual_friends_string = "You and "+item.username+" are friends. You guys have the following mutual friends: ";
    //}else{
    //    mutual_friends_string = "You and "+item.username+" are not friends yet. You have the following mutual friends: ";
    //}
    console.log(mutual_friends_count + " mutual friends");

    //loop thru mutual friends
    var j = 0;

    $.each(item.mutual, function( i, val ) {
         //if more than 4, we get the first 4.
        if(j <= 4){
            j++;
            mutual_friends_string += val.username+", ";
        }
    });
    //remove the space and , at the end.
    mutual_friends_string = mutual_friends_string.slice(0, -2);

    var remind_friends = mutual_friends_count - j;

    if(remind_friends == 0){
        mutual_friends_string += ".";
    }else if(remind_friends == 1){
        mutual_friends_string += " and 1 other.";
    }else{
        mutual_friends_string += " and " + remind_friends + " others.";
    }

    mutual_friend_holder = mutual_friends_count + " mutual <i class='fa fa-users' aria-hidden='true'></i>";

    if(mutual_friends_count > 0){
        mutual_friend_link = '<a href="#" class="mutual-friends-click color-white" onclick="showMutualFriends(mutual_friends_string)">'+ mutual_friend_holder +'</a>';
    }else{
        mutual_friend_link = "";
    }

    var current = item.current;
    var whatsup = item.whatsup;
    var favorites = item.favorites.split(',').join(', ');

    if(!current){
        current = "N/A";
    }
    if(!whatsup){
        whatsup = "N/A";
    }
    if(!favorites){
        favorites = "N/A";
    }

    var newCardHtml = 
        '      <li class="new_card"> ' + 
        '            <div class="tinder-card demo-card-header-pic" > ' + 
        '              <div class="card-pic"  style="background:url(\''+ (item.avatar  || "img/timi.png") + '\') 50% 50% no-repeat"></div> ' + 
        '              <div style="" class="card-header no-border card-username-section">' + emojiList[item.emojiIndex] + " " + "Name is private until connected" + '<div class="color-white">'+mutual_friend_link+'</div></div> ' + 
        '              <div class="card-content"> ' + 
        '                <div class="card-content-inner"> ' + 
        // '                  <div class="color-pink">' +item.name+ ' says: </div>' + 
        '                   <div class="color-gray"><div class="card-pic-title">Occupation / School</div><div class="card-pic-content">'+current+'</div></div>' +
        // '                   <div class="color-gray"><i class="fa fa-comments color-pink"></i>'+whatsup+'</div>' + 
        // '                  <div class="color-pink">' +item.name+ ' likes: </div>' + 
        '                   <div class="color-gray"><div class="card-pic-title">Favorite Activities</div><div class="card-pic-content">'+favorites+'</div></div> ' + 
        '                </div> ' + 
        '              </div> ' + 
        // '              <div class="card-footer no-gutter row"> ' + 
        // '                <a href="#" class="link button col-50 color-gray button-fill dislike-button">PASS</a> ' + 
        // '                <a href="#" class="link button col-50 color-pink button-fill like-button">I\'M DOWN! </a> ' + 
        // '              </div> ' + 
        '            </div>    ' +
        '            <div class="like" >ADD FRIEND</div> ' + 
        '            <div class="dislike" >PASS</div> ' + 
        // '            <div class="superlike" >WHISPER</div> ' +         
        '          </li>';

    document.getElementById("nearby-tinder-list-ul").innerHTML += newCardHtml;

    document.getElementById("nearbyslide").innerHTML += ""+ 
    "<div class='row decision-button-row'>" + 
        "<div class='col-50 button dislike-button button-fill color-gray' style='background-color:#ec5298;font-size:20px;text-transform:uppercase;'>" + 
            // "<i class='fa fa-times' id='times-icon'></i>" + 
            "PASS" +
        "</div>" + 
        // "<div class='col-33 button like-button button-fill color-gray' style='background-color:#2cb3c9;' >" + 
        //     // "<i class='fa fa-bell-slash left-heart' aria-hidden='true'></i><i class='fa fa-heart right-heart' id='heart-icon'></i>" +         
        //     "WHISPER" +
        // "</div>" +            
        "<div class='col-50 button superlike-button button-fill color-gray' style='background-color:#63de9a;font-size:20px;text-transform:uppercase;'>" + 
            // "<i class='fa fa-heart ' ></i>" +         
            "Add Friend" +
        "</div>" + 
             
    "</div>"


    // setTimeout(function () {
        initDiscoverSwipe ("#nearby-tinder-contain"); 
    // }, 100)
    


    //use time out to make sure the previous step (initTinderSwipe) has finished executing - not ideal.
    setTimeout(function(){ 
        $(".new_card").show();
        $(".new_card").removeClass('new_card');  
        if(mutual_friends_count == 0){
            $(".mutual-friends-click").hide();
        }              
    }, 500);
}





function insertNewCard () {

    var item = availFriend[timeFrame][currentIndex[timeFrame]];

    //item.check_friendship = true or false -> check direct friendship
    var mutual_friends_count =  Object.keys(item.mutual).length;
    var mutual_friends = item.mutual;
    mutual_friends_string = "";

    //if you guys are already friends.
    //if(item.check_friendship){
    //    mutual_friends_string = "You and "+item.username+" are friends. You guys have the following mutual friends: ";
    //}else{
    //    mutual_friends_string = "You and "+item.username+" are not friends yet. You have the following mutual friends: ";
    //}
    console.log(mutual_friends_count + " mutual friends");

    //loop thru mutual friends
    var j = 0;

    $.each(item.mutual, function( i, val ) {
         //if more than 4, we get the first 4.
        if(j <= 4){
            j++;
            mutual_friends_string += val.username+", ";
        }
    });
    //remove the space and , at the end.
    mutual_friends_string = mutual_friends_string.slice(0, -2);

    var remind_friends = mutual_friends_count - j;

    if(remind_friends == 0){
        mutual_friends_string += ".";
    }else if(remind_friends == 1){
        mutual_friends_string += " and 1 other.";
    }else{
        mutual_friends_string += " and " + remind_friends + " others.";
    }

    mutual_friend_holder = mutual_friends_count + " mutual <i class='fa fa-users' aria-hidden='true'></i>";

    if(mutual_friends_count > 0){
        mutual_friend_link = '<a href="#" class="mutual-friends-click color-white" onclick="showMutualFriends(mutual_friends_string)">'+ mutual_friend_holder +'</a>';
    }else{
        mutual_friend_link = "";
    }

    var current = item.current;
    var whatsup = item.whatsup;
    var favorites = item.favorites.split(',').join(', ');

    if(!current){
        current = "N/A";
    }
    if(!whatsup){
        whatsup = "N/A";
    }
    if(!favorites){
        favorites = "N/A";
    }

    var newCardHtml = 
        '      <li class="new_card"> ' + 
        '            <div class="tinder-card demo-card-header-pic" > ' + 
        '              <div class="card-pic"  style="background:url(\''+ (item.avatar || "img/timi.png") + '\') 50% 50% no-repeat"></div> ' + 
        '              <div style="" class="card-header no-border card-username-section">' + emojiList[item.emojiIndex] + " " + item.username + '<div class="color-white">'+mutual_friend_link+'</div></div> ' + 
        '              <div class="card-content"> ' + 
        '                <div class="card-content-inner"> ' + 
        // '                  <div class="color-pink">' +item.name+ ' says: </div>' + 
        '                   <div class="color-gray"><div class="card-pic-title">School / Occupation</div><div class="card-pic-content">'+current+'</div></div>' +
        // '                   <div class="color-gray"><i class="fa fa-comments color-pink"></i>'+whatsup+'</div>' + 
        // '                  <div class="color-pink">' +item.name+ ' likes: </div>' + 
        '                   <div class="color-gray"><div class="card-pic-title">Favorite Activities</div><div class="card-pic-content">'+favorites+'</div></div> ' + 
        '                </div> ' + 
        '              </div> ' + 
        // '              <div class="card-footer no-gutter row"> ' + 
        // '                <a href="#" class="link button col-50 color-gray button-fill dislike-button">PASS</a> ' + 
        // '                <a href="#" class="link button col-50 color-pink button-fill like-button">I\'M DOWN! </a> ' + 
        // '              </div> ' + 
        '            </div>    ' +
        '            <div class="like" >INVITE</div> ' + 
        '            <div class="dislike" >PASS</div> ' + 
        // '            <div class="superlike" >WHISPER</div> ' +         
        '          </li>';

    document.getElementById("tinder-list-ul").innerHTML += newCardHtml;

    document.getElementById("tinderslide").innerHTML += ""+ 
    "<div class='row decision-button-row'>" + 
        "<div class='col-33 modern-square-button dislike-button button-fill color-gray' style='background-color:#D6D7D8;'>" + 
            // "<i class='fa fa-times' id='times-icon'></i>" + 
            "PASS" +
        "</div>" + 
        "<div class='col-33 modern-square-button like-button button-fill color-gray' style='background-color:#A6A7A8;' >" + 
            // "<i class='fa fa-bell-slash left-heart' aria-hidden='true'></i><i class='fa fa-heart right-heart' id='heart-icon'></i>" +         
            "SECRET" +
        "</div>" +            
        "<div class='col-33 modern-square-button superlike-button button-fill color-gray' style='background-color:#63de9a;'>" +  //63de9a
            // "<i class='fa fa-heart ' ></i>" +         
            "INVITE" +
        "</div>" + 
             
    "</div>"



    initTinderSwipe ("#tinder-contain"); 


    //use time out to make sure the previous step (initTinderSwipe) has finished executing - not ideal.
    setTimeout(function(){ 
        $(".new_card").show();
        $(".new_card").removeClass('new_card');  
        if(mutual_friends_count == 0){
            $(".mutual-friends-click").hide();
        }              
        // if ( localStorage.tutorial == undefined  ) {
        //     localStorage.tutorial = 0; 
        // } else  {
        //     if (localStorage.tutorial < 2 && mainView.url == "#home" && currentIndex[timeFrame]>-1) {
        //         myApp.alert("Would you like to view the Tutorial? ", "Timi" , 
        //             function () {
        //                 tutorial (); 
        //                 localStorage.tutorial = 2
        //         });                 
        //     }                                
        // }        
    }, 100);
}



function showMutualFriends (actual_string) {
    console.log('clicked');
    var clickedLink = $('.mutual-friends-click');
    var popoverHTML = '<div class="popover">'+
                                  '<div class="popover-inner">'+
                                    '<div class="content-block">'+
                                      '<p>'+actual_string+'</p>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>'
    myApp.popover(popoverHTML, clickedLink);    
}


// update the front page of the user's page given the userList
// timeFrame can be 0, 1, or 2
function updateFrontPage (timeFrame) {
    
    // if (loading) 
    console.log("update fornt page")

    if ( availFriend[timeFrame].length == 0 ) {
        console.log("has no stuff")
        $("#invite-all-block").css("display", "none")
        placePulse(); 
        showNoFriendBlock ()
        return; 
    } else {
        $(".no-friend").css("display", "none")
        console.log("has stuff")
        // placePulse ();        
        

        if (currentTabPage == "invitation-tab") {
            $("#invite-all-block").css("display", "flex")
            loadListRequestView()
        } else { // explore-tab
            loadingCard = setTimeout(function () {
                    placeTinderSwipe ()
            }, 100);              
        }
        







        // $(".no-friend").css("display", "none")
        // console.log("has stuff")
        // placePulse ();
        // loadingCard = setTimeout(function () {
        //     document.getElementById("tinderslide").innerHTML = ""
        //     var tinderListHTML = "<div id='tinder-contain'><ul>"

        //     // indexList = generateTopN(availFriend[timeFrame]);

        //     // availFriend[timeFrame]
        //     // var length = availFriend[timeFrame].length + 1;
            
        //     // var mappedList = availFriend[timeFrame]
        //     var preloadLength = 3
        //     var mappedList = availFriend[timeFrame].slice(availFriend[timeFrame].length - currentIndex[timeFrame], preloadLength)
        //     console.log(mappedList)
        //     mappedList.map(function(item) {
        //         tinderListHTML += 
        //         '      <li> ' + 
        //         '            <div class="card demo-card-header-pic" > ' + 
        //         '              <div class="card-pic"  style="background:url(\''+ item.avatar + '\') 50% 50% no-repeat"></div> ' + 
        //         '              <div style="" class="card-header no-border">' + item.username + '<div class="report-user color-gray" onclick="reportUser()"><i class="fa fa-ellipsis-h"></i></div></div> ' + 
        //         '              <div class="card-content"> ' + 
        //         '                <div class="card-content-inner"> ' + 
        //         // '                  <div class="color-pink">' +item.name+ ' says: </div>' + 
        //         '                   <div class="color-gray"><i class="fa fa-comments color-pink"></i>'+item.whatsup+'</div>' + 
        //         // '                  <div class="color-pink">' +item.name+ ' likes: </div>' + 
        //         '                   <div class="color-gray"><i class="fa fa-heart color-pink"></i>' + item.favorites.split(',').join(', ') + '</div> ' + 
        //         '                </div> ' + 
        //         '              </div> ' + 
        //         '              <div class="card-footer no-gutter row"> ' + 
        //         '                <a href="#" class="link button col-50 color-gray button-fill dislike-button">PASS</a> ' + 
        //         '                <a href="#" class="link button col-50 color-pink button-fill like-button">I\'M DOWN! </a> ' + 
        //         '              </div> ' + 
        //         '            </div>    ' +
        //         '            <div class="like" ></div> ' + 
        //         '            <div class="dislike" onclick="$(\"#tinderslide\").jTinder(\'dislike\');"></div> ' + 
        //         '          </li>'
        //         // length--;
        //     });


        //     document.getElementById("tinderslide").innerHTML = tinderListHTML + "</ul></div>"             

        //     initTinderSwipe ("#tinder-contain"); 
        // }, 1000);
    } 
}

function skipInvitingThisFriend () {
    // list[index]["status"] = "skiped"
    inviteNextFriend()
}
function inviteNextFriend () {
    // console.log(localStorage.contacts)
    var list = JSON.parse(localStorage.contacts)
    // console.log(list)
    if (list.length == 0) {
        console.log("empty list")
        return; 
    }
    console.log("not empty list")

    var index = Math.round(Math.random() * list.length)


    console.log(index)
    console.log(list[index])
    console.log(list[index]["name"])
    console.log(list[index]["number"][0])

    document.getElementById("invite-friend-name").innerHTML = list[index]["name"]
    document.getElementById("invite-button").onclick = function () {
        console.log(list[index]["number"][0])
        inviteFriend(list[index]["number"][0], "", "random")
        // list[index].status = "invited"
        localStorage.contacts = JSON.stringify(list)
        inviteNextFriend()
    }        
}
var whatsupList = ["Let's chipotle and chill?", 
"Nomnomnom", "Eat like every day is Thanksgiving.", 
"You cannot taste me, until you undress me. Sincerely, banana.", 
"Everything sucks .. .. .. .. .. except FOOD !!!!", "Hungry as hell", 
"I don't trust people that dislike tacos.", 
"Of course size matters. No one wants a small pizza.", 
"Accomplishing things before the microwave hits 00:00.", 
"You can't buy happiness, but you can buy ice cream. And that's kind of the same thing.", 
"I eat so much... I make fat kids look skinny!", 
"Dear Vegetarians, If you love animals so much, then why do you keep eating all their food?", 
"That moment when skinny people call themselves fat and your heavier than them.", 
"Arizona 99 cent drinks are the shit. Period.", 
"I want a hot body but I also want hot wings.", 
"If life gives you lemons, just add vodka.", 
"I live in a world of fantasy, so keep your reality away from me!", 
"Never make eye contact while eating a banana."]
function randomWhatsup () {
    var index = Math.round(Math.random() * (whatsupList.length-1))
    document.getElementById("whatsup").value = whatsupList[index]

}

var emojiList = ["🍻","🎉","👑","🍢","🍣","🍙","🍵","🍶","🍼","🍒","🍌","💥","🌻","🎃","🌿"]; 

// Place the pulse effect
function placePulse () {
    var pulseHTML = ''

    if ( localStorage.allowedContact == "1" ) {
        console.log("allowed contact")
        // if contact is allowed
        pulseHTML = 
        '   <img src="' + "img/timi.png" + '" class="pulse-portrait animated bounceIn"  />' + 
        '   <div class="gps-ring"></div>' + 
        // '   <div class="gps-ring-2"></div>' + 
        '   <div class="one-line-prompt no-friend" style="color:#929292;font-size:17px;">It seems that <span class="color-black">no friend</span> is available for ' + scheduleName[timeFrame] + '. Send a <span class="color-pink">FREE text!<i class="fa fa-smile-o" aria-hidden="true"></i></span> to invite your friends to Timi!</div>' + 
        '   <div class="one-line-prompt no-friend" style="color:#222; font-size: 17px;font-weight:700">Invite <span id="invite-friend-name"></span> !</div>' +     

        '   <div class="row"> ' +
        '        <div class="col-50"> ' +
        '            <div class="button button-fill color-gray no-friend" style="height:50px;line-height:50px;" onclick="skipInvitingThisFriend()">Skip</div> ' +
        '        </div> ' +
        '        <div class="col-50"> ' +
        '            <div class="button button-fill color-pink no-friend" style="height:50px;line-height:50px;" onclick="sendInvite()" id="invite-button">Invite!</div> ' +
        '        </div> ' +
        '    </div>' + 
        '   <div class="row"> ' +
        '        <div class="col-100"> ' +
        '            <div class="button button-fill color-light-gray no-friend" style="height:50px;line-height:50px;" onclick="addRandomFriendPopup()">Friends You May Know</div> ' +
        '        </div> ' +
        '    </div>' + 
        '   <div class="row"> ' +
        '        <div class="col-100"> ' +
        '            <div class="button button-fill color-light-gray no-friend" style="height:50px;line-height:50px;" onclick="rewindInvitation()">Rewind and Start Over</div> ' +
        '        </div> ' +
        '    </div>'          
        // '   <div class="row"> ' +
        // '        <div class="col-100"> ' +
        // // '            <div class="button button-fill color-green no-friend" style="height:44px;line-height:44px;" onclick="inviteViaWechat()"><i class="fa fa-weixin color-white" style="margin-right: 6px;" aria-hidden="true"></i>Invite friends from WeChat/Facebook</div> ' +
        // '        </div> ' +        
        // '   </div>'

        document.getElementById("tinderslide").innerHTML = pulseHTML
        document.getElementById("logo-holder").innerHTML = pulseHTML
        // document.getElementById("listview-user").innerHTML = pulseHTML
        document.getElementById("tinderslide").style.display = "block"
        document.getElementById("listview-user").style.display = "none" 
        document.getElementById("logo-holder").style.display = "block" 

        if (isCordova) {
            inviteNextFriend ()
        }
        
    } else {
        console.log("not allowed contact")
        // if contact is not allowed yet
        pulseHTML = 
        '   <img src="' + "img/timi.png" + '" class="pulse-portrait animated bounceIn"  />' + 
        '   <div class="gps-ring"></div>' + 
        // '   <div class="gps-ring-2"></div>' + 
        '   <div class="one-line-prompt no-friend" style="color:#929292">It seems that no friend is nearby. Invite friends to Timi by sending them a FREE text!</div>' + 
        '   <div class="row"> ' +
        '        <div class="col-100"> ' +
        '            <div class="button button-fill color-pink no-friend" style="height:50px;line-height:50px;" onclick="inviteFriendsPopup ()">Invite friends to Timi? </div> ' +
        '        </div> ' +
        '    </div>' +           
        '   <div class="row"> ' +
        '        <div class="col-100"> ' +
        '            <div class="button button-fill color-light-gray no-friend" style="height:50px;line-height:50px;" onclick="rewindInvitation()">Start Over</div> ' +
        '        </div> ' +
        '    </div>' +        
        '   <div class="one-line-prompt no-friend" style="color:#929292">Timi is the <span style="color:#ec5298">EASIEST</span> way to get friends to hang out</div>' 

        document.getElementById("tinderslide").innerHTML = pulseHTML
        document.getElementById("logo-holder").innerHTML = pulseHTML
        // document.getElementById("listview-user").innerHTML = pulseHTML
        document.getElementById("tinderslide").style.display = "block"
        document.getElementById("listview-user").style.display = "none" 
        document.getElementById("logo-holder").style.display = "block" 

    }

    // document.getElementById("tinderslide").innerHTML = pulseHTML
    
}

function sendInvite () {
    console.log("empty")

}
// several cases
// passed the time
//  timeAvail[timeFrame]
// if gets 0, meaning that the person set him/herself to be busy

// if gets user, meaning that the person is matched with others

// placeBusy will change the UI

function showChatList () {
    myApp.showTab("#messenger-tab");      
}

function placeBusy (unit) {
    var mealIndicator = ""; 
    if (timeFrame == 0) {
        mealIndicator =  "Noon arrangement can be scheduled from 2am to 2pm"
    } else if ( timeFrame == 1 ) {
        mealIndicator =  "Evening appointment can be scheduled from 2am to 9pm"
    }
    console.log(mealIndicator)
    if ( timeAvail[timeFrame] == 0 ) {
        // time has passed

        var pulseHTML = 
        '   <img src="' + "img/timi.png" + '" class="matched-portrait animated bounceIn "  />' + 

        '   <div class="one-line-prompt " style="color:#929292">It looks like the time has passed already. ' + mealIndicator + ' </div>' 

        document.getElementById("tinderslide").innerHTML = pulseHTML
        document.getElementById("logo-holder").innerHTML = pulseHTML
        // document.getElementById("listview-user").innerHTML = pulseHTML
        document.getElementById("tinderslide").style.display = "block"
        document.getElementById("listview-user").style.display = "none" 
        document.getElementById("logo-holder").style.display = "block"        
        getFriendFreeTimeNoUI()
        return; 
    }
    else if ( unit == 0 ) {
        // busy

        var pulseHTML = 
        '   <img src="' + "img/timi.png" + '" class="matched-portrait animated bounceIn "  />' + 
        '   <div class="one-line-prompt " style="color:#929292">It looks like you are busy for this time! </div>' + 
        '   <div class="button color-pink one-line-button " onclick=\'myApp.showTab(\"#availability-tab\");\'>Turn on the slot? </div>' 
        // '   <div class="one-line-prompt " style="color:#929292">Timi is the <span style="color:#ec5298">EASIEST</span> way to get friends to hang out</div>' 
        // document.getElementById("tinderslide").innerHTML = pulseHTML
        // document.getElementById("tinderslide").style.display = "block"     
        document.getElementById("tinderslide").innerHTML = pulseHTML
        document.getElementById("logo-holder").innerHTML = pulseHTML
        // document.getElementById("listview-user").innerHTML = pulseHTML
        document.getElementById("tinderslide").style.display = "block"
        document.getElementById("listview-user").style.display = "none" 
        document.getElementById("logo-holder").style.display = "block"            
    }  
    else if (unit == 1) {
        placePulse()
        showNoFriendBlock()
    }
    else {
        // matched with other

        console.log(unit)
        var pulseHTML = 
        '<div class="you-are-matched-title"><i class="fa fa-hand-peace-o" aria-hidden="true"></i>It\'s a Match!<i class="fa fa-hand-peace-o" aria-hidden="true"></i></div>' +
        '   <img src="' + (unit.avatar  || "img/timi.png") + '" class="match-portrait animated bounceIn"  />' +
        // '   <img src="' + "img/timi.png" + '" class="pulse-portrait animated bounceIn"  />' +        
        '   <div class="one-line-prompt " style="color:#929292">' + unit.username + ' </div>' + 
        '   <div class="button color-pink button-fill one-line-button " style="width: 100%;" onclick="showChatList()"><i class="fa fa-comment color-white" style="margin-right: 6px;" aria-hidden="true"></i>Text '+ unit.username +'</div>'  + 
        '   <div class="button color-gray button-fill one-line-button " style="width: 100%;" onclick="continuePlaying()"><i class="fa fa-repeat color-white" style="margin-right: 6px;" aria-hidden="true"></i>Continue Playing</div>'  +
        // '   <div class="button one-line-button color-green "  onclick="inviteViaWechat()"><i class="fa fa-weixin color-green" style="margin-right: 6px;" aria-hidden="true"></i><i class="fa fa-facebook color-blue" style="margin-right: 6px;" aria-hidden="true"></i>Share and Invite</div> '
        '   <div class="row"> ' +
        '        <div class="col-50"> ' +
        '            <div class="button button-fill color-green " style="height:44px;line-height:44px;" onclick="inviteViaWechat()"><i class="fa fa-weixin color-white" style="margin-right: 6px;" aria-hidden="true"></i>Invite/Share</div> ' +
        '        </div> ' +        
        '        <div class="col-50"> ' +
        '            <div class="button button-fill color-blue " style="height:44px;line-height:44px;" onclick="inviteViaWechat()"><i class="fa fa-facebook color-white" style="margin-right: 6px;" aria-hidden="true"></i>Invite/Share</div> ' +
        '        </div> ' +          
        '   </div>'               
        // '   <div class="one-line-prompt " style="color:#929292">Timi is the <span style="color:#ec5298">EASIEST</span> way to get friends to hang out</div>' 
        // document.getElementById("tinderslide").innerHTML = pulseHTML
        // document.getElementById("tinderslide").style.display = "block"    

        document.getElementById("tinderslide").innerHTML = pulseHTML
        document.getElementById("logo-holder").innerHTML = pulseHTML
        // document.getElementById("listview-user").innerHTML = pulseHTML
        document.getElementById("tinderslide").style.display = "block"
        document.getElementById("listview-user").style.display = "none" 
        document.getElementById("logo-holder").style.display = "block" 

    }
  
}

function continuePlaying () {
    myAvail = [1,1,1,1]
    afterClickTab(timeFrame, true)
}
 
function inviteViaWechat () {
    try {
        var shareURL = "http://gettimi.com";
        window.plugins.socialsharing.share(null, "Join me at Timi - Find out who's free to hang out! ", null, shareURL);
        // window.plugins.socialsharing.shareVia('com.tencent.mm.ui.tools.ShareToTimeLineUI', workingList[index].title + " - 没六儿 最火热的话题与信息 ", null, null, shareURL, function(){myApp.alert("分享成功")}, function(msg) {myApp.alert("太不6了，再试试看？")})          
    } catch (err) {

        // var buttons = [{
        //     text: "复制到剪贴板",
        //     onClick: function() {
        //         try {
        //             var text = workingList[index].title + " - 没六儿: " + shareURL
        //             cordova.plugins.clipboard.copy(text)
        //             var appToast = new Framework7(); 
        //             var toast = appToast.toast("已复制", '<i class="fa fa-check"></i>', {})
        //             toast.show()                    
                    
        //         } catch (err) {
        //             // myApp.alert(text)
        //         }
        //     }
        // }];
        // myApp.actions(buttons)
        // myApp.alert("好像没法启用系统分享，请更新软件！")
    }    
}
var inviteAllList = []

function inviteAll () {


    inviteAllObject  = myApp.formToJSON("#listview-user")
    inviteAllList = []
    for (var i in inviteAllObject ){
        if (inviteAllObject[i].length != 0) {
            inviteAllList.push(inviteAllObject[i])
        }
    }
    inviteAllList = inviteAllList.reverse();

      myApp.modal({
        title: 'Timi',
        text: "Ready to invite "+inviteAllList.length + " friends? ",
        verticalButtons: true,
        buttons: [
          {
            text: 'Invite All! ',
            onClick: function() {

                // n^2 search so sequence does not matter. 
                for (var i in inviteAllList) {
                    for (var j in availFriend[timeFrame]) {
                        if (availFriend[timeFrame][j].username == inviteAllList[i][0]) { 
                            console.log(availFriend[timeFrame][j].username)
                            requestFriend(localStorage.usertoken, queryDay, timeFrame, availFriend[timeFrame][j].user_id, 1, 1, j);                          
                        }
                    }
                }
                afterClickTab(timeFrame, true)   


            }
          },
          {
            text: 'Whisper (Secretly Like All)',
            onClick: function() {
                for (var i in inviteAllList) {
                    for (var j in availFriend[timeFrame]) {
                        if (availFriend[timeFrame][j].username == inviteAllList[i][0]) { 
                            console.log(availFriend[timeFrame][j].username)
                            requestFriend(localStorage.usertoken, queryDay, timeFrame, availFriend[timeFrame][j].user_id, 1, 0, j);                          
                        }
                    }
                }
                afterClickTab(timeFrame, true)  
            }
          },
          {
            text: 'Wait a sec! ',
            onClick: function() {

            }
          },
        ]
      })
}

function initDiscoverSwipe (object) {
    $(object).jTinder({
        onSuperLike: function(item) {
            localStorage.swiped = new Date()
            localStorage.swipeNumberLeft = localStorage.swipeNumberLeft-1
            addFriendBySwiping(nearbyList[nearbyIndex].user_id, 1, null, nearbyIndex)
            nearbyIndex--

            placeStrangerCard()


        }, 
        onDislike: function (item) {
            addFriendBySwiping(nearbyList[nearbyIndex].user_id, 2, null, nearbyIndex)
            localStorage.swiped = new Date()
            nearbyIndex--
            localStorage.swipeNumberLeft = localStorage.swipeNumberLeft-1
            placeStrangerCard()     

        }
    });    
    initNearbySwipeCSS()
    // initTinderSwipeCSS()
    console.log("init")
    $(".like-button").on("click", function () {
        // if (localStorage.promptLike != 1) {
        //     myApp.confirm("By Swiping right, you are sending an anonymous \"invite\" to this user, and Timi will let you know if you are a match. Continue? ", "", function () {
        //         localStorage.promptLike = 1
        //         $(object).jTinder('like');
        //     })
        // } else {
        //     $(object).jTinder('like');
        // }
        $(object).jTinder('like');
        
    })
    $(".dislike-button").on("click", function () {
        // if (localStorage.promptDisLike != 1) {
        //     myApp.confirm("By Swiping left, you are sending an anonymous \"pass\" to this user, and Timi won\'t let this user know that you say no. Continue? ", "", function () {
        //         localStorage.promptDisLike = 1
        //         $(object).jTinder('dislike');
        //     })
        // } else {
        //     $(object).jTinder('dislike');
        // }
        $(object).jTinder('dislike');

        
    })
    $(".superlike-button").on("click", function () {
        // if (localStorage.promptDisLike != 1) {
        //     myApp.confirm("By Swiping left, you are sending an anonymous \"pass\" to this user, and Timi won\'t let this user know that you say no. Continue? ", "", function () {
        //         localStorage.promptDisLike = 1
        //         $(object).jTinder('dislike');
        //     })
        // } else {
        //     $(object).jTinder('dislike');
        // }
        $(object).jTinder('superlike');

        
    })                    
}

function putNextCard () {
    if (currentIndex[timeFrame] < 0) {
        placePulse()
        showNoFriendBlock ()                
    } else {
        placeTinderSwipe ()
        incrementSwipe()
    }    
}

// Initiate the tinder swipe page, called when the home page is loaded
function initTinderSwipe (object) {
    $(object).jTinder({
        onSuperLike: function (item) {

            if (localStorage.promptSuperLike != 1) {
                myApp.confirm("You are sending an invitation to this user, and Timi will let this user know that you have invited her. Continue? ", "Are You Sure? ", function () {
                    localStorage.promptSuperLike = 1
                    requestFriend(localStorage.usertoken, queryDay, timeFrame, availFriend[timeFrame][currentIndex[timeFrame]].user_id, 1, 1, currentIndex[timeFrame]);                         
                    currentIndex[timeFrame]--                    
                    putNextCard ()
                }, function () {
                    putNextCard ()               
                })
            } else {
                requestFriend(localStorage.usertoken, queryDay, timeFrame, availFriend[timeFrame][currentIndex[timeFrame]].user_id, 1, 1, currentIndex[timeFrame]);                         
                currentIndex[timeFrame]--
                putNextCard ()                    
            }            

        }, 
        onLike: function(item) {
            // placeTinderSwipe ()

            if (localStorage.promptLike != 1) {
                myApp.confirm("By pressing \"Secret\", you are anonymously inviting this user, and Timi will let you know if you are a match. Continue? ", "Are You Sure? ", 
                    function () {
                        localStorage.promptLike = 1
                        requestFriend(localStorage.usertoken, queryDay, timeFrame, availFriend[timeFrame][currentIndex[timeFrame]].user_id, 1, 0, currentIndex[timeFrame]);                         
                        currentIndex[timeFrame]--
                        putNextCard ()  
                }, function () {
                        putNextCard ()                    
                });
            } else {
                requestFriend(localStorage.usertoken, queryDay, timeFrame, availFriend[timeFrame][currentIndex[timeFrame]].user_id, 1, 0, currentIndex[timeFrame]);                         
                currentIndex[timeFrame]--
                putNextCard ()  
            }



        }, 
        onDislike: function (item) {
            if (localStorage.promptDisLike != 1) {
                myApp.confirm("You are passing this user, and Timi won\'t let this user know that you say no. Continue? ", "Are You Sure? ", function () {
                    localStorage.promptDisLike = 1
                    requestFriend(localStorage.usertoken, queryDay, timeFrame, availFriend[timeFrame][currentIndex[timeFrame]].user_id, 2, 0, currentIndex[timeFrame]);                              
                    currentIndex[timeFrame]--
                    putNextCard ()                   
                }, function () {
                    putNextCard ()                                      
                })
            } else {
                requestFriend(localStorage.usertoken, queryDay, timeFrame, availFriend[timeFrame][currentIndex[timeFrame]].user_id, 2, 0, currentIndex[timeFrame]);                              
                currentIndex[timeFrame]--
                putNextCard ()  
            }            

        }
    });    
    initTinderSwipeCSS()
    console.log("init")
    $(".like-button").on("click", function () {
        // if (localStorage.promptLike != 1) {
        //     myApp.confirm("By Swiping right, you are sending an anonymous \"invite\" to this user, and Timi will let you know if you are a match. Continue? ", "", function () {
        //         localStorage.promptLike = 1
        //         $(object).jTinder('like');
        //     })
        // } else {
        //     $(object).jTinder('like');
        // }
        $(object).jTinder('like');
        
    })
    $(".dislike-button").on("click", function () {
        // if (localStorage.promptDisLike != 1) {
        //     myApp.confirm("By Swiping left, you are sending an anonymous \"pass\" to this user, and Timi won\'t let this user know that you say no. Continue? ", "", function () {
        //         localStorage.promptDisLike = 1
        //         $(object).jTinder('dislike');
        //     })
        // } else {
        //     $(object).jTinder('dislike');
        // }
        $(object).jTinder('dislike');

        
    })
    $(".superlike-button").on("click", function () {
        // if (localStorage.promptDisLike != 1) {
        //     myApp.confirm("By Swiping left, you are sending an anonymous \"pass\" to this user, and Timi won\'t let this user know that you say no. Continue? ", "", function () {
        //         localStorage.promptDisLike = 1
        //         $(object).jTinder('dislike');
        //     })
        // } else {
        //     $(object).jTinder('dislike');
        // }
        $(object).jTinder('superlike');

        
    })    
                  
}

function initNearbySwipeCSS () {

    // if ($(window).height() < 600 ) {
    //     // iphone 5
    //     var margin = 25
    //     var marginV = 5; 
    //     var marginH = margin;         
    //     var cardWidth = (Math.round($(window).width()) - marginH * 2)
    //     $(".card-pic").css("height", cardWidth+"px"); 
    //     $(".card-pic").css("width", cardWidth+"px"); 
    //     $("#tinderslide").css("width", cardWidth+"px"); 
    //     $("#tinderslide").css("left", marginH + "px"); 
    //     var nav = 44; 
    //     var tbH = 44; 
    //     var statusH = 0; 
    //     var topMargin = 44; // where relative css starts from
    //     var a = Math.round(($(window).height() - nav-tbH-topMargin -statusH- $(".tinder-card.demo-card-header-pic").height())/2); 
    //     console.log(a)
    //     a += tbH
    //     a = topMargin + marginV
    //     $("#tinderslide").css("margin-top", a + "px"); 
    //     $(".card-header").css("margin-bottom", "0px");
    //     $(".row.decision-button-row").css("bottom", "40px"); 
    //     $(".decision-button-row .col-33, .decision-button-row .col-50").css("height", "40px"); 
    //     $(".decision-button-row .col-33, .decision-button-row .col-50").css("line-height", "40px"); 
    //     $(".decision-button-row .col-33, .decision-button-row .col-50").css("font-size", "14px");

    // } else if ($(window).height() < 700 ) {
    //     // iphone 6
    //     var margin = 25
    //     var cardWidth = (Math.round($(window).width()) - margin * 2)
    //     $(".card-pic").css("height", cardWidth+"px"); 
    //     $(".card-pic").css("width", cardWidth+"px"); 
    //     $("#tinderslide").css("width", cardWidth+"px"); 
    //     $("#tinderslide").css("left", margin + "px"); 
    //     var nav = 44; 
    //     var tbH = 44; 
    //     var statusH = 0; 
    //     var topMargin = 44; // where relative css starts from
    //     var a = Math.round(($(window).height() - nav-tbH-topMargin -statusH- $(".tinder-card.demo-card-header-pic").height())/2); 
    //     console.log(a)
    //     a += tbH
    //     a = topMargin + margin
    //     $("#tinderslide").css("margin-top", a + "px"); 
    //     $(".row.decision-button-row").css("bottom", "68px")
    //     $(".decision-button-row .col-33, .decision-button-row .col-50").css("height", "44px"); 
    //     $(".decision-button-row .col-33, .decision-button-row .col-50").css("line-height", "44px");         
    // }

    // else {
    //     // iphone 6+
    //     var margin = 25
    //     var cardWidth = (Math.round($(window).width()) - margin * 2)
    //     $(".card-pic").css("height", cardWidth+"px"); 
    //     $(".card-pic").css("width", cardWidth+"px"); 
    //     $("#tinderslide").css("width", cardWidth+"px"); 
    //     $("#tinderslide").css("left", margin + "px"); 
    //     var nav = 44; 
    //     var tbH = 44; 
    //     var statusH = 0; 
    //     var topMargin = 44; // where relative css starts from
    //     var a = Math.round(($(window).height() - nav-tbH-topMargin -statusH- $(".tinder-card.demo-card-header-pic").height())/2); 
    //     console.log(a)
    //     a += tbH
    //     a = topMargin + margin
    //     $("#tinderslide").css("margin-top", a + "px"); 
    //     $(".row.decision-button-row").css("bottom", "88px")
    //     $(".decision-button-row .col-33, .decision-button-row .col-50").css("height", "44px"); 
    //     $(".decision-button-row .col-33, .decision-button-row .col-50").css("line-height", "44px");         
    // }

    // if ( currentIndex[timeFrame] < 0 ) return; 
    if ($(window).height() < 600 ) {
        // iphone 5
        var margin = 25
        var marginV = 5; 
        var marginH = margin;         
        var cardWidth = (Math.round($(window).width()) - marginH * 2)
        $(".card-pic").css("height", cardWidth+"px"); 
        $(".card-pic").css("width", cardWidth+"px"); 
        $("#nearbyslide").css("width", cardWidth+"px"); 
        $("#nearbyslide").css("left", marginH + "px"); 
        var nav = 44; 
        var tbH = 44; 
        var statusH = 0; 
        var topMargin = 44; // where relative css starts from
        var a = Math.round(($(window).height() - nav-tbH-topMargin -statusH- $(".tinder-card.demo-card-header-pic").height())/2); 

        a += tbH
        a = topMargin + marginV 
        console.log(a)
        $(".nearby-prompt").css("top", ( 9 + 17 - a )+"px" )
        $("#nearbyslide").css("margin-top", a + "px"); 
        $(".card-header").css("margin-bottom", "0px");
        $(".row.decision-button-row").css("bottom", "40px"); 
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("height", "40px"); 
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("line-height", "40px"); 
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("font-size", "14px");

    } else if ($(window).height() < 700 ) {
        // iphone 6
        var margin = 25
        var cardWidth = (Math.round($(window).width()) - margin * 2)
        $(".card-pic").css("height", cardWidth+"px"); 
        $(".card-pic").css("width", cardWidth+"px"); 
        $("#nearbyslide").css("width", cardWidth+"px"); 
        $("#nearbyslide").css("left", margin + "px"); 
        var nav = 44; 
        var tbH = 44; 
        var statusH = 0; 
        var topMargin = 44; // where relative css starts from
        var a = Math.round(($(window).height() - nav-tbH-topMargin -statusH- $(".tinder-card.demo-card-header-pic").height())/2); 
        
        a += tbH
        a = topMargin + margin 
        console.log(a)
        $(".nearby-prompt").css("top", ( 9 + 17 - a )+"px"  )
        $("#nearbyslide").css("margin-top", a + "px"); 
        $(".row.decision-button-row").css("bottom", "68px")
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("height", "44px"); 
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("line-height", "44px");         
    }

    else {
        // iphone 6+
        var margin = 25
        var cardWidth = (Math.round($(window).width()) - margin * 2)
        $(".card-pic").css("height", cardWidth+"px"); 
        $(".card-pic").css("width", cardWidth+"px"); 
        $("#nearbyslide").css("width", cardWidth+"px"); 
        $("#nearbyslide").css("left", margin + "px"); 
        var nav = 44; 
        var tbH = 44; 
        var statusH = 0; 
        var topMargin = 44; // where relative css starts from
        var a = Math.round(($(window).height() - nav-tbH-topMargin -statusH- $(".tinder-card.demo-card-header-pic").height())/2); 

        a += tbH
        a = topMargin + margin 
        console.log(a)
        $(".nearby-prompt").css("top", ( 9 + 17 - a )+"px" )
        $("#nearbyslide").css("margin-top", a + "px"); 
        $(".row.decision-button-row").css("bottom", "88px")
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("height", "44px"); 
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("line-height", "44px");         
    }    
}



// Initiate the tinder page css, called when the home page is loaded



function initTinderSwipeCSS() {
    // if ( currentIndex[timeFrame] < 0 ) return; 
    if ($(window).height() < 600 ) {
        // iphone 5
        var margin = 25
        var marginV = 5; 
        var marginH = margin;         
        var cardWidth = (Math.round($(window).width()) - marginH * 2)
        $(".card-pic").css("height", cardWidth+"px"); 
        $(".card-pic").css("width", cardWidth+"px"); 
        $("#tinderslide").css("width", cardWidth+"px"); 
        $("#tinderslide").css("left", marginH + "px"); 
        var nav = 44; 
        var tbH = 44; 
        var statusH = 0; 
        var topMargin = 44; // where relative css starts from
        var a = Math.round(($(window).height() - nav-tbH-topMargin -statusH- $(".tinder-card.demo-card-header-pic").height())/2); 
        console.log(a)
        a += tbH
        a = topMargin + marginV
        $("#tinderslide").css("margin-top", a + "px"); 
        $(".card-header").css("margin-bottom", "0px");
        $(".row.decision-button-row").css("bottom", "40px"); 
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("height", "40px"); 
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("line-height", "40px"); 
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("font-size", "14px");

    } else if ($(window).height() < 700 ) {
        // iphone 6
        var margin = 25
        var cardWidth = (Math.round($(window).width()) - margin * 2)
        $(".card-pic").css("height", cardWidth+"px"); 
        $(".card-pic").css("width", cardWidth+"px"); 
        $("#tinderslide").css("width", cardWidth+"px"); 
        $("#tinderslide").css("left", margin + "px"); 
        var nav = 44; 
        var tbH = 44; 
        var statusH = 0; 
        var topMargin = 44; // where relative css starts from
        var a = Math.round(($(window).height() - nav-tbH-topMargin -statusH- $(".tinder-card.demo-card-header-pic").height())/2); 
        console.log(a)
        a += tbH
        a = topMargin + margin
        $("#tinderslide").css("margin-top", a + "px"); 
        $(".row.decision-button-row").css("bottom", "68px")
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("height", "44px"); 
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("line-height", "44px");         
    }

    else {
        // iphone 6+
        var margin = 25
        var cardWidth = (Math.round($(window).width()) - margin * 2)
        $(".card-pic").css("height", cardWidth+"px"); 
        $(".card-pic").css("width", cardWidth+"px"); 
        $("#tinderslide").css("width", cardWidth+"px"); 
        $("#tinderslide").css("left", margin + "px"); 
        var nav = 44; 
        var tbH = 44; 
        var statusH = 0; 
        var topMargin = 44; // where relative css starts from
        var a = Math.round(($(window).height() - nav-tbH-topMargin -statusH- $(".tinder-card.demo-card-header-pic").height())/2); 
        console.log(a)
        a += tbH
        a = topMargin + margin

        $("#logo-holder").css("top", "-45px")
        $("#tinderslide").css("margin-top", a + "px"); 
        $(".row.decision-button-row").css("bottom", "88px")
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("height", "44px"); 
        $(".decision-button-row .col-33, .decision-button-row .col-50").css("line-height", "44px");         
    }
}
function updateFavFood () {
    // favoriteFoodList
    usersFavoriteList = []
    var dict = myApp.formToJSON('#favorite-food')  
    for (var x in dict) {
        if ( dict[x].length > 0 ) {
            usersFavoriteList.push(x)
        }
    }
    
    if ( usersFavoriteList.length < 3 ) {
        var num = 3 - usersFavoriteList.length
        document.getElementById("favorite-food-prompt").innerHTML = "Please choose at least 3 items."
        
    } else {
        document.getElementById("favorite-food-prompt").innerHTML = "<i class='fa fa-check  '></i>"
    }
}


function favoriteFoodUnitHTML (value) {
return '                <li> ' +
'                  <label class="label-checkbox item-content"> ' +
'                    <input type="checkbox" name="'+value+'" value="'+value+'" onchange="updateFavFood()"> ' +
'                    <div class="item-media"> ' +
'                      <i class="icon icon-form-checkbox"></i> ' +
'                    </div> ' +
'                    <div class="item-inner"> ' +
'                      <div class="item-title">'+ value +'</div> ' +
'                    </div> ' +
'                  </label> ' +
'                </li> '   
}

// function

function getPush () {
    if ( (localStorage.allowedPush == "null") || (localStorage.allowedPush == 0) || (localStorage.allowedPush == null)) {
        // not null and not 1
        var popupElem = {
            title: "Turn on notifications? ", 
            text:"We can let you know when someone wants to hang out with you, or notify you about other important account activity. ", 
            iconHTML:'<i class="fa fa-flag-o" aria-hidden="true"></i>', 
            confirmText:"Yes, notify me", 
            cancelText:"Skip", 
            callbackYes:function () {
                initPush ()
            }, 
            callbackNo:function (){}
        }
        popupQueue.push(popupElem)
        fullScreenConfirm ()          
        // myApp.confirm("Allow Push Notification so that you know when you are matched?", "Timi ", function () {
            
            
        // })
    } else {
        if ( isCordova ) {
            initPush ()
        }
    }         
}


var canSwipeBack = true; 
// if (localStorage != null && localStorage.usertoken != null ) {
//     canSwipeBack = true; 
// }

var myApp = new Framework7({
    swipeBackPage: canSwipeBack, 
    tapHold: true, 
    tapHoldDelay: 500, 
    modalTitle:"Timi", 
    onPageBack: function (app, page) {
        if (page.name == "chatting-page") {
            console.log("back1!")
            // messengerOnShow ()
            // if (isCordova) {
            try{
                Keyboard.close()
            } catch (err) {
                
            }            
        } else if (page.name == "nearby-list") {
            // console.log(mainView.url)
        } else if ( page.name == "personal-setting-page" ) {

        } else if ( page.name == "restaurant-page") {
            $("#restaurant-name-navbar").css("display", "none") 
        }

    }, 
    onPageBeforeAnimation: function (app, page) {
        if (page.name == "home") {
            console.log("home")
            $(".home-nav").css("visibility", "visible") 
            console.log(currentTabPage)
            if (currentTabPage == "explore-tab" || currentTabPage == "invitation-tab" || currentTabPage== null) {
                $(".subnavbar").css("display", "flex")
            } else {
                $(".subnavbar").css("display", "none")
            }
            if ( currentTabPage == "messenger-tab" ){
                messengerOnShow()
            }
            $("#restaurant-name-navbar").css("display", "none") 
        }      
        else if (page.name == "personal-setting-page" )   {
            try {
                Keyboard.hideFormAccessoryBar(false);
            }  catch(err) {
                
            }
            $(".home-nav").css("visibility", "hidden") 
        } 
        else if (page.name == "restaurant-page" )   {
            try {
                Keyboard.hideFormAccessoryBar(false);
            }  catch(err) {
                
            }
            try {
                Keyboard.shrinkView(true);
                // Keyboard.disableScrollingInShrinkView(true);
            } catch(err) {
            }              
            $(".home-nav").css("visibility", "hidden") 
        }         
        else if (page.name == "chatting-page") {
            try {
                Keyboard.hideFormAccessoryBar(true);
            }  catch(err) {
                
            }
            $(".home-nav").css("visibility", "hidden")  
            $(".messagebar textarea").on("click", function (e) {
                setTimeout(function () {
                    $(".messages-content").animate({ scrollTop: $(".messages-auto-layout").height()+"px"});
                    // $(".messages-content").animate({ scrollTop: $(".messages-content").height()+"px" });
                }, 400)
            });     
        } else if (page.name == "availability-page") {
            updateFreeTime ()
            $(".subnavbar").css("display", "none")
            // changeNavbarTitle("Availability", barIconHTML, "<a class=\"link right-link\" onclick='inviteViaWechat()'><i class=\"fa fa-user-plus\" ></i></a>");  
            updateForm()            
             $(".home-nav").css("visibility", "hidden") 
        } else if (page.name == "nearby-list") {
            $(".subnavbar").css("display", "none")
            $(".home-nav").css("visibility", "hidden") 
            nearbyPendingNum = 0;
            discoverStrangers()
        } else if (page.name == "phone-number") {
            $(".subnavbar").css("display", "none")
            $(".home-nav").css("visibility", "hidden")             
        } else if ( page.name == "restaurant-page") {
            $("#restaurant-name-navbar").css("display", "block") 
        }
    }, 
    onPageInit: function (app, page) {
        a = app; 
        b = page; 
        console.log(app, page)
        $(".navbar").css("visibility", "visible")
        // if ()
        if ( page.name == "index" ) {
            console.log("asdfasfa")
            $(".navbar").css("visibility", "hidden")   
        } else if (page.name == "home") {
            console.log("wtf")


            if ( !((localStorage.usertoken) == null || (localStorage.usertoken == "null")) ) {     

                // getImageList(true)
                // afterClickTab(timeFrame)         
            }
            if (localStorage.unread == 1) {
                badgeSpot[1] = 1;
            } else {
                badgeSpot[1] = 0;
            }
            updateToolbarRedDot()    
        } else if (page.name == "personal-setting-page") {
            try {
                Keyboard.hideFormAccessoryBar(false);
            } catch (err) {

            }
            
            $(".home-nav").css("visibility", "hidden")  
            // build fav food list
            var htmlString = "<ul>"
            favoriteFoodList.map(function (unit) {
                htmlString += favoriteFoodUnitHTML(unit)
                return; 
            })
            document.getElementById("favorite-food").innerHTML = htmlString + "</ul>"
            updatePersonalPage()
            
        } else if (page.name == "ask-calendar") {
            updateForm()
        } else if (page.name == "phone-number") {
            try {
                Keyboard.hideFormAccessoryBar(false);
            } catch (err) {

            }
            
            // var pickerDevice = myApp.picker({
            //     input: '#country-code-input',
            //     cols: [
            //         {
            //             textAlign: 'center',
                        
            //             values: ['+1', '+86']
            //         }
            //     ], 
            //     toolbarTemplate: '<div class="toolbar"> '+
            //     '  <div class="toolbar-inner"> '+
            //     '    <div class="left"></div> '+
            //     '    <div class="right"> '+
            //     '      <a href="#" class="link close-picker" style="color:#ec5298 !important">Done</a> '+
            //     '    </div> '+
            //     '  </div> '+
            //     '</div> '
            // });            
        } else if ( page.name == "chatting-page" ) {
            $(".home-nav").css("visibility", "hidden");
            try {
                Keyboard.hideFormAccessoryBar(true);
            }  catch(err) {

            }
            $(".messagebar textarea").on("touchstart", function (e) {
                setTimeout(function () {
                    $(".messages-content").animate({ scrollTop: $(".messages-auto-layout").height()+"px"});
                    // $(".messages-content").animate({ scrollTop: $(".messages-content").height()+"px" });
                }, 400);
                // myApp.alert("duang1")
            });     
            // $(".messagebar textarea").focus(function (e) {
            //     setTimeout(function () {
            //         $(".messages-content").animate({ scrollTop: $(".messages-auto-layout").height()+"px"});
            //         // $(".messages-content").animate({ scrollTop: $(".messages-content").height()+"px" });
            //     }, 300);
            //     // myApp.alert("duang2")
            // });     
            
        } else if ( page.name == "restaurant-page") {
            $("#restaurant-name-navbar").css("display", "block") 
        }
    }
});

function openSystem () {
    cordova.plugins.settings.open(null, null);    
}



function updatePersonalPage () {
    // document.getElementById("whatsup").value = personalData.whatsup;
    document.getElementById("current").value = personalData.current;
    if(personalData.friend_friend > 0){
        document.getElementById("allowFoF").checked = true;
    }else{
        document.getElementById("allowFoF").checked = false;
    }
    // if (localStorage.muteSound == 1 ) {
    //     document.getElementById("muteSound").checked = true;
    // } else {
    //     document.getElementById("muteSound").checked = false;
    // }
    // document.getElementById("distance-range").value = personalData.range
    // document.getElementById("distance-value").innerHTML = Math.round(personalData.range) + "mi"
    var formData = myApp.formToJSON('#favorite-food')
    var chose = 0; 
    usersFavoriteList = []
    for (var x in formData) {
        if (personalData.favorites.split(",").indexOf(x) == -1) {
            formData[x] = []
        } else {
            num ++ 
            usersFavoriteList.push(x)
            formData[x] = [x]
        }
    }
    if ( chose < 3 ) {
        var num = 3 - chose
        document.getElementById("favorite-food-prompt").innerHTML = "Please choose at least 3 items."
        
    } else {
        document.getElementById("favorite-food-prompt").innerHTML = "<i class='fa fa-check animated bounceIn'></i>"
    }
    myApp.formFromJSON('#favorite-food', formData)
}
 
// Init main view
var mainView = myApp.addView('.view-main', {
    domCache: true,  //enable inline pages
    dynamicNavbar: true

});

function goToMainPage () {
    mainView.router.loadPage({"pageName": "home"})
}
function goToFriendList () {
    mainView.router.loadPage({"pageName": "friends-list"})
}

function toChangeSettingPage () {
    mainView.router.loadPage({"pageName": "setting-page"})
}
function goToPersonalInfoPage() {
    mainView.router.loadPage({"pageName":"phone-number"})
}
function goToChattingPage () {
    mainView.router.loadPage({"pageName": "chatting-page"})
}


// sorting algorithm
var cSort = function(a, b) {
  aName = a.name.formatted
  bName = b.name.formatted
  return aName < bName ? -1 : (aName == bName ? 0 : 1);
};
var mSort = function(a, b) {
  aName = a.price
  bName = b.price
  return aName < bName ? -1 : (aName == bName ? 0 : 1);
};
var ratingSort = function(a, b) {
  aName = a.recommend
  bName = b.recommend
  return aName > bName ? -1 : (aName == bName ? 0 : 1);
};

var gSort = function(a, b) {
    var aLocation = a.geolocation.split(",");
    var bLocation = b.geolocation.split(","); 
    var selfLocation = personalData.geolocation.split(",");
    var aDistance = getDistanceFromLatLonInKm(selfLocation[0], selfLocation[1], aLocation[0], aLocation[1]);  
    var bDistance = getDistanceFromLatLonInKm(selfLocation[0], selfLocation[1], bLocation[0], bLocation[1]);  
    return aDistance < bDistance ? -1 : (aDistance == bDistance ? 0 : 1);
};

            // {
            //     place: "Kiki's", 
            //     pics: [
            //         "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.86.1080.1080/13696903_1582475052052048_1265353871_n.jpg?ig_cache_key=MTI5MzU2MTUyNzY2Mzg2NjkxMg%3D%3D.2.c", 
            //         "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c66.0.948.948/13743490_1111510015562065_452116297_n.jpg?ig_cache_key=MTI5NjY3ODc3OTcyODQzMzMyOA%3D%3D.2.c", 
            //         "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13636077_1067947803285238_1922341721_n.jpg?ig_cache_key=MTI4ODgzMzE3NDE2MDI2NjU0OA%3D%3D.2", 
            //         "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13534146_1754097768213166_1633780241_n.jpg?ig_cache_key=MTI4NjU1MTg2MDUzODM4NTk3Ng%3D%3D.2"
            //     ], 
            //     address: "130 Division St, New York, NY 10002", 
            //     phone: "6468827052", 
            //     geolocation : "40.7145293,-73.9940309"
            // }, 

var tSort = function (a, b) {
  aName = new Date (a.timeObject)
  bName = new Date (b.timeObject)
  return aName > bName ? -1 : (aName == bName ? 0 : 1);    
}

var timeSort = function (a, b) {
  aName = new Date (a.create_time * 1000)
  bName = new Date (b.create_time * 1000)
  return aName > bName ? -1 : (aName == bName ? 0 : 1);    
}







function onDeviceReady () {
    // screen.orientation.lock(); 
    // try {
    //     cordova.plugins.clipboard.copy(localStorage.chatlist);  
    // } catch (err) {

    // }
    devicePlatform = device.platform;
    isCordova = true;
    try {
        Keyboard.shrinkView(true);
        // Keyboard.disableScrollingInShrinkView(true);
    } catch(err) {
    }
    try {
        // if (localStorage.usertoken == ray_token || localStorage.usertoken == jimmy_token) {
        //     document.getElementById("rate-tab-button").style.display = "flex"; 
        // } else {
        //     document.getElementById("rate-tab-button").style.display = "none"; 
        // }        
    } catch (err) {

    }


    if (localStorage.usertoken === undefined || localStorage.usertoken == null || localStorage.usertoken == '' || localStorage.usertoken == "null") {
        // not logged in 
        console.log("not logged in")
        setTimeout(function () {
            popupTutorial ()
        }, 200)         
        // stay at index page
    } else if (localStorage.checkedPhone == 0) {
        // phone no good
        console.log("phone not good")
        getPersonalInfo()             
    } else {
        initAfterLogin ()
        localStorage.tutorial=2; 
        mixpanel.track("Opened App", {
            "username": personalData.username
        });
    } 

    // this has to be placed at the back because it may crash. 
    setTimeout(function () {
        try {
            StatusBar.styleDefault();
        } catch (err) {

        }  
    }, 500)
  
}

function upgradeNotification () {
    // myApp.alert(AppVersion.version)    
    // myApp.alert(device)
    try {
        if (AppVersion.version < "1.05" && devicePlatform == "iOS") {
            myApp.alert("We just updated our app! Please download the newer version to continue!", "UPDATE", function () {
                // upgradeNotification()
                // window.location = "https://itunes.apple.com/us/app/timi-easiest-way-to-find-out/id1111783063";
            });
        }        
    } catch (err) {

    }

}

function initAfterLogin () {
    mainView.router.loadPage({
        "pageName": "home", 
        "reload" : true, 
        "animatePages": true
    }); 
    if (!isCordova) {
        window.addEventListener("contextmenu", function(e) { e.preventDefault(); })
    }

    myAvail = [1,1,1,1]; 
    localStorage.listView = 0; 
    getPersonalInfo ()
    // if (localStorage.listView == 1) {
    //     myApp.showTab("#invitation-tab")
    //     currentTabPage = "invitation-tab"
    // } else {
    //     myApp.showTab("#explore-tab")
    //     currentTabPage = "explore-tab"        
    // }
    myApp.showTab("#rate-tab")
    currentTabPage = "rate-tab"
    getCategories ()     
    getImageList(true)

   
    // markRequestAsRead()

    updateToolbarRedDot()
    window.addEventListener('statusTap', function() {
        //scroll-up or do whatever you want
        $(".tab.active .page-content").animate({ scrollTop: "0px"});
        $(".page.page-on-center .page-content").animate({ scrollTop: "0px"});
    });

    // $$(".statusbar-overlay").on('click', function () {
    //     $(".tab.active .page-content").animate({ scrollTop: "0px"});
    // })


    document.addEventListener("resume", appReturnedFromBackground, false);      

    getPush ()    
    
    // getDistanceRow()
    

    // loadStrangers()
    getRecentRequests ()
    loadAllNewMessage ()
    // loadFriendsFromContact ()

    // load message
    updateInvitationStatus ()  
    getUnprocessedSwipe () 

    // $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAAqBHCFbs_2Q3o7ZTAxID8Xnd3dUBUSdw', function () {

    // });  
    if (!hasLoadedGoogleMapScript)
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAAqBHCFbs_2Q3o7ZTAxID8Xnd3dUBUSdw', function () {
        hasLoadedGoogleMapScript = true;
    });  
    setTimeout(function () {
        getFriendsLikes(true)
        getMyLikes(refreshBookMarks)         
        upgradeNotification ()
        getFriendFreeTime()        
    }, 1000)
    
}
var hasLoadedGoogleMapScript = false;



function initPush () {
    console.log(isCordova)
    localStorage.allowedPush = 1; 
    // localStorage.allowedPush = "1"
    // var playSound = "true"
    // if (localStorage.muteSound == 1 ) {
    //     playSound = "false"
    // }
    // myApp.alert("init push")

    push_notification = PushNotification.init({
        android: {
            senderID: "1020731247629"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true",
        },
        windows: {}
    });
    push_notification.setApplicationIconBadgeNumber(function() {
        console.log('success clearBadge');
    }, function() {
        console.log('error clearBadge');
    }, 0);    


    push_notification.on("registration", function(data) {
        device_token = data.registrationId;
        // cordova.plugins.clipboard.copy(data.registrationId)
        console.log("get token")
        device_type = "iOS" || ""
        device_type = "Android"

        if ( device != null ) { 
            device_type = device.platform || "iOS";
        } else {
            device_type = "iOS"
        }
        if ( device_token != "" ) {
            var ajaxUrl = "http://gettimi.com/site/takeDeviceToken?user_token=" + 
                localStorage.usertoken + "&device_type=" + device_type + "&device_token=" + device_token
                console.log(ajaxUrl)
            $.ajax({
                url: ajaxUrl,
                type: "GET",
                dataType: "jsonp",
                success: function(results) {
                    console.log(result)
                }, 
                error: function (results) {

                }
            });           
        } else {
            console.log("device_token not found")
        }        
    });
    push_notification.on("notification", function(data) {
        // 1 friend sign uo
        // 2 someone liked
        // 3 matched

        if (data.additionalData.type == "1") {
            // go to home
        }
        // some one likes you
        else if (data.additionalData.type == "2") {
            hangoutRequestPopup(data.additionalData.time)
            appReturnedFromBackground()
            // go to home
            if (mainView.url == "#home" && currentTabPage != "event-tab") { 
                document.getElementById("event-badge").style.display = "block";                                 
            }

        }
        else if (data.additionalData.type == "3") {
            // matched
            var user; 
            try {
                user = {
                    "avatar": data.additionalData.avatar,
                    "username": data.additionalData.username,
                    "phone": data.additionalData.phone, 
                    "email": data.additionalData.email, 
                    "user_id": data.additionalData.sender_id, 
                    "geolocation": data.additionalData.geolocation,  // might cause bug
                    "favorites": data.additionalData.favorites,   // might cause bug
                    "whatsup": data.additionalData.whatsup,   // might cause bug
                    "day": data.additionalData.day, 
                    "time": data.additionalData.time, 
                    "chat_history" : []
                    // [sender_id:49, sender_name:"Doe", sender_avatar:"", receiver_id:23, receiver_name: "XXX", receiver_avatar:""]
                }                    
            } catch (err) {
                user = {
                    "avatar": data.additionalData.avatar,
                    "username": data.additionalData.username,
                    "phone": data.additionalData.phone, 
                    "email": data.additionalData.email, 
                    "user_id": data.additionalData.sender_id, 
                    // "geolocation": data.additionalData.geolocation,  // might cause bug
                    // "favorites": data.additionalData.favorites,   // might cause bug
                    // "whatsup": data.additionalData.whatsup,   // might cause bug
                    "day": data.additionalData.day, 
                    "time": data.additionalData.time, 
                    "chat_history" : []
                    // [sender_id:49, sender_name:"Doe", sender_avatar:"", receiver_id:23, receiver_name: "XXX", receiver_avatar:""]
                }                       
            }     

            matched(user)

            chatlist = getChatList()
            var elem = {
                user: user, 
                unread: 1, 
                timeObject: (new Date()), 
                schedule: data.additionalData.time
            }
            pushChatList(elem) 
            // refresh, sort the chatting page in case of any update  
            if (mainView.url == "#home" && currentTabPage == "messenger-tab") {
                messengerOnShow()
            }
            // markAllRequest()




            // therefore occupied
            // placeBusy (user)
        } else if ( data.additionalData.type == "4" ) {
            // cancal request; abandoned; 


            // alert(data.additionalData)
            myApp.alert("It looks like "+data.additionalData.username+" can\'t make it:( But don\'t worry we will find you another one:) ")
            // alertt
            // getMySchedule(function () {
            afterClickTab(data.additionalData.time)                        
            // })            
            // cancallation


            // suepr like
        } else if ( data.additionalData.type == "6" ) {
            var user = {
                "avatar": data.additionalData.avatar,
                "username": data.additionalData.username,
                "phone": data.additionalData.phone, 
                "email": data.additionalData.email, 
                "user_id": data.additionalData.sender_id, 
                // "geolocation": data.additionalData.geolocation, 
                // "favorites": data.additionalData.favorites, 
                // "whatsup": data.additionalData.whatsup, 
                "day": data.additionalData.day, 
                "time": data.additionalData.time, 
                "chat_history" : []
                // [sender_id:49, sender_name:"Doe", sender_avatar:"", receiver_id:23, receiver_name: "XXX", receiver_avatar:""]
            }
            localStorage.unread = 1;               
            appReturnedFromBackground()

            if (mainView.url == "#home" && currentTabPage != "event-tab") { 
                document.getElementById("event-badge").style.display = "block";                                 
            }

            myApp.confirm(user.username + " wants to hang out with you! Swipe right to confirm. ", "", function (){
                mainView.router.loadPage({"pageName":"home"})     
                timeFrame = data.additionalData.time; 
                myApp.showTab("#event-tab")             
            })








        } else if ( data.additionalData.type == "5" ) {

            // new message


            if ( mainView.url == "#chatting-page" && chattingWidthUserId != null ) {
                if (chattingWidthUserId == data.additionalData.sender_id) {
                    // the sender matches current users
                    loadNewMessage(chattingWidthUserId)
                    getUnreadMatchList(function () {

                    })    
                    loadAllNewMessage(function () {

                    });                       
                } else { 
                    // the sender does not match current users  
                    myApp.modal({
                        title:  'New Message',
                        text: data.additionalData.content.message,
                        buttons: [
                          {
                            text: 'Later',
                            onClick: function() {
                            }
                          },
                          {
                            text: 'Reply',
                            onClick: function() {
                                mainView.router.back()
                                // myApp.showTab("#messenger-tab")
                            }
                          }
                        ]
                    });                                    
                }
               
            }
            else if (currentTabPage == "messenger-tab") {
                messengerOnShow()
            }  else {
                myApp.modal({
                    title:  'New Message',
                    text: data.additionalData.content.message,
                    buttons: [
                      {
                        text: 'Later',
                        onClick: function() {
                        }
                      },
                      {
                        text: 'Reply',
                        onClick: function() {
                            data.additionalData.user_id = data.additionalData.sender_id
                            data.additionalData.username = data.additionalData.sender_name
                            chatwith(data.additionalData)
                            // myApp.showTab("#messenger-tab")
                        }
                      }
                    ]
                });
            } 
            if (mainView.url == "#home" && currentTabPage != "messenger-tab") { 
                document.getElementById("badge-red-dot-2").style.display = "block";                                 
            }

        } else if (data.additionalData.type == "7") {
            // matched 


                var user = {
                    "avatar": data.additionalData.avatar,
                    "username": data.additionalData.username,
                    "phone": data.additionalData.phone, 
                    "email": data.additionalData.email, 
                    "user_id": data.additionalData.sender_id, 
                    // "geolocation": data.additionalData.geolocation, 
                    // "favorites": data.additionalData.favorites, 
                    // "whatsup": data.additionalData.whatsup, 
                    "day": data.additionalData.day, 
                    "time": data.additionalData.time, 
                    "chat_history" : []
                    // [sender_id:49, sender_name:"Doe", sender_avatar:"", receiver_id:23, receiver_name: "XXX", receiver_avatar:""]
                }                    

                chatlist = getChatList ()
                // assumed now
                var elem = {
                    user: user, 
                    timeObject: (new Date()), 
                    schedule: 3
                }
                pushChatList (elem) 
                if (mainView.url == "#nearby-list") {
                    mainView.router.back()
                    myApp.showTab("#messenger-tab");                           
                } else if (mainView.url == "#home") {
                    myApp.showTab("#messenger-tab");    
                } else {
                    mainView.router.back()
                    myApp.showTab("#messenger-tab");                           
                }
        } else if (data.additionalData.type == "8") {
            loadStrangers ( function () {
                if (mainView.url == "#nearby-list") {
                    mainView.router.back()
                    myApp.showTab("#search-tab");                           
                } else if (mainView.url == "#home") {
                    myApp.showTab("#search-tab");    
                } else {
                    mainView.router.back()
                    myApp.showTab("#search-tab");                           
                }                   
            })
         
            // someone wants to add friend

        }

        // window.cache.clear(clearCacheSuccess, clearCacheError);
        console.log(data.message);
        console.log(data.title);
        console.log(data.count);
        console.log(data.sound);
        console.log(data.image);
        console.log(data.additionalData);
        push_notification.finish(function() {
            console.log("processing of push data is finished")
        })
    });
    push_notification.on("error", function(e) {
        console.log("push error")
        // put system redirect
        myApp.alert("Please go to Settings - Timi - and turn on Push Notification access! ")
    })    
}
var tabCSSClass = [".lunch-tab", ".dinner-tab", ".night-tab", ".now-tab"]

function getDateString (elem) {
    // elem
    return (elem.getMonth()+1) + "-" + elem.getDate()
}
var imageList =[]
var ll = []
var fuse; 
function fillSearchBox (text) {
    $("#search-bar").val(text);
    mixpanel.track("click suggest", {
        "username": personalData.username, 
        "query": text
    });
    if ($("search-bar").val() != "") {
        $(".clear-search-box").css("display", "block");
    }    
    searchItem()
}
function getImageList(doUI) {
    doUI = doUI || false
    var ajaxUrl = "http://gettimi.com/site/ReturnAllEvents?user_token=" + localStorage.usertoken; 
    console.log(ajaxUrl)
    if (ll.length == 0) {
        document.getElementById("picture-list").innerHTML = "<div class='list-prompt'>Fetching Your Food now...</div>";

    }
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            imageList = (JSON.parse(results.result));
            // shuffleSeed(imageList)
            imageList = imageList.map(function (unit) {
                var rando = loseCode(unit.place)*primeNumberToday()%79
                if (rando > 66) rando+= 66
                var width = $(window).width()/2-18;
                var height = width - 40 + rando                
                unit.height = height
                return unit;
            })
            if (doUI) {

                currentTitleObject().callback(imageList)
                // initPicByRank ()      
            }
                          
        }, 
        error: function (results) {
            console.log(results)
        }
    });     
}

function getUnprocessedSwipe () {
    var ajaxUrl = "http://gettimi.com/site/UnprocessedSwipe?user_token=" + localStorage.usertoken +"&day=" + queryDay


    scheduleName = [ (currentHours < 17 && currentHours >= 2) ? "Today" : "Tonight", "Tomorrow", fulldays[(queryDay+2)%7], "Now"]
    console.log(scheduleName)
     // dateTab; 
    var tday = new Date()

    var dateTab = [
            getDateString(tday), 
            getDateString(new Date((tday).setDate(tday.getDate()+1))), 
            getDateString(new Date((tday).setDate(tday.getDate()+1))), 
            getDateString(new Date())
        ]

    // var date = []

    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            console.log(results.result)
            requestList = JSON.parse(results.result)
            requestList.push(0)
            console.log(requestList)
            for ( var i = 0; i < requestList.length; i++) {
                if (requestList[i] > 0 && myAvail[i]== 1 && timeAvail[i] == 1 ) {
                    var html = $(tabCSSClass[i]).html()
                    $(tabCSSClass[i]).html(scheduleName[i] +"<span class='date-tag'>" + dateTab[i] + "</span>"+ "<span class='request-badge'>" + "</span>")                    
                } else {
                    $(tabCSSClass[i]).html(scheduleName[i]+"<span class='date-tag'>" + dateTab[i] + "</span>"+ "<span style='display:none' class='request-badge'>" + "</span>")      
                }
            }
            // requestList.map(function (num) {

            // })
            // for (var i = 0; i < )

            // console.log(JSON.parse(results.results))
        }, 
        error: function (results) {
            console.log(results)
        }
    });       
}



// [4:12] 
// user_token

// [4:12] 
// day

function hangoutRequestPopup (t) {
    getQueryDay()
    scheduleName = [((new Date).getHours() < 17 && (new Date).getHours() > 1) ? "Today" : "Tonight", "Tomorrow", fulldays[(queryDay+2)%7] , "now"]
    var tabCSSClass = [".lunch-tab", ".dinner-tab", ".night-tab", ".now-tab"]
    var popupElem = {
        title: "Someone likes you!", 
        text:"Someone wants to hang out with you "+ scheduleName[t] +" :) Swipe to find out who! ", 
        iconHTML:'<i class="fa fa-heart" aria-hidden="true"></i>', 
        confirmText:"Sure! ", 
        cancelText:"Later", 
        callbackYes:function () {
            mainView.router.loadPage({"pageName": "home"}); 
            // markAllRequest()
            myApp.showTab("#event-tab");   
            // console.log(t)       
            // setTimeout(function () {
            //     $(tabCSSClass[t])[0].click()
            // }, 600)              
            
        }, 
        callbackNo:function () {
            // markAllRequest()
        }
    }
    popupQueue.push(popupElem)
    fullScreenConfirm ()                     
}

function loadPastDates () {

}

// get unread match list
// mark as read after clicking 
var unreadList =[]

function popupMatchGeneral () {
    if (localStorage.unread == 1) {

        // unreadList
        // var length = 
        var textPerson = "friend"
        if (unreadList.length > 1) {
            textPerson = "friends"
        }
        var popupElem = {
            title: "You are matched with " + unreadList.length + " "+ textPerson + "! ", 
            text:"Would you like to chat and hang out now? ", 
            iconHTML:'<i class="fa fa-heart" aria-hidden="true"></i>', 
            confirmText:"Yes, chat now", 
            cancelText:"Later", 
            callbackYes:function () {
                localStorage.unread = 0 
                // initiateChat()
                myApp.showTab("#messenger-tab");                        
            }, 
            callbackNo:function () {
                localStorage.unread = 1
            }
        }
        popupQueue.push(popupElem)
        fullScreenConfirm ()          
    }
    
}
var unloadMessage = []
function loadAllNewMessage ( callback ) {  
    // token = localStorage.usertoken
    var ajaxUrl = "http://gettimi.com/site/LoadAllNewMessage?user_token=" + localStorage.usertoken
    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // newMessage = JSON.parse(results.result)
            // console.log(newMessage)
            unloadMessage = JSON.parse(results.result)
            for ( var i in unloadMessage ) {
                console.log(i, unloadMessage[i])
                unloadMessage[i].map(function (unit) {
                    // console.log(unit)
                    addToChatDatabase (unit.sender, unit.title, false, new Date(unit.create_time * 1000))
                })       
                if (mainView.url == "#home" && currentTabPage != "messenger-tab") { 
                    document.getElementById("badge-red-dot-2").style.display = "block";                                 
                }                         
            }


            console.log()
            console.log(results)
            if (callback != null) {
                callback()
            }
            

        }, 
        error: function (results) {
            // myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });  
}

// if there is an unread match, put red dot, load chat list
function getUnreadMatchList (callback) {
     // user_token, request_Id
    var ajaxUrl = "http://gettimi.com/site/GetUnreadMatchList?user_token=" + 
        localStorage.usertoken
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            // heheda = results
            unreadList = JSON.parse(results.result);
            console.log(unreadList)
            localStorage.unread = 0
            markAllRequest()

            // unread list is nothing
            if ( unreadList.length == 0 ) {
                localStorage.unread = 0; 
                badgeSpot[1] = 0;
                callback()
            } else {
                localStorage.unread = 1
                badgeSpot[1] = 1;
                unreadList.map(function (unit) {
                    console.log(unit)

                    chatlist = getChatList ()
                    var elem = {
                        user: unit, 
                        timeObject: (new Date()), 
                        schedule: unit.time, 
                        unread: 1
                    }
                    pushChatList (elem)
                }); 
                callback ()                     

                                
            }

            console.log(results)

        }, 
        error: function (results) {
            console.log(results)
        }
    });  
}



function markAllRequest () {
    var ajaxUrl = "http://gettimi.com/site/MarkAllMatchListAsRead?user_token=" + localStorage.usertoken
    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            localStorage.unread = 0
            $("#badge-red-dot-2").css("display", "none");
            console.log(results)
        }, 
        error: function (results) {
            console.log(results)
        }
    });      
}

function markRequestAsRead (request_id) {
     // user_token, request_Id
    var ajaxUrl = "http://gettimi.com/site/MarkMatchAsRead?user_token=" + 
        localStorage.usertoken + "&request_Id=" + request_id
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {

        }, 
        error: function (results) {
            console.log(results)
        }
    });  
}

function popupTutorial () {
    myApp.popup(".popup-intro")   
    mixpanel.track("Landing page")
    $(".modal-overlay-visible").css("display", "none")
    $(".facebook-login-button-tutorial").html('<i class=\"fa fa-facebook\" aria-hidden=\"true\"><\/i><span class=\"text\">Continue with Facebook</span>')
    // $(".statusbar-overlay").css("background", "fff")
    var mySwiper = myApp.swiper('.swiper-container', {
        speed: 400,
        pagination:'.swiper-pagination',
        spaceBetween: 100
    });   
}
function mobileFormat (text) {
    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');    
}


function getChatList () {
    if (localStorage.chatlist == null || localStorage.chatlist == "null" ||localStorage.chatlist =="") {
        chatlist = []
        // myApp.alert("empty chat list")
    } else {
        chatlist = JSON.parse(localStorage.chatlist)
        // myApp.alert("not empty chat list")
          
        // cordova.
        // myApp.alert()
    }
    return chatlist
}
function elemNotIn (elem) {
    var isIn = false;
    if (chatlist.length == 0) return true;
    listt = chatlist.map(function (unit) {
        // if the username is matched, then updatethe user name to newer elem
        if (elem.user.username == unit.user.username) {
            isIn = isIn || true;
            unit.user = elem.user;
            unit.timeObject = elem.timeObject;
            unit.schedule = elem.schedule;
            unit.unread = elem.unread || 0; 
            console.log(unit)
            return unit; 
            // return elem;
        } else {

            return unit; 
        }
    }); 
    chatlist = listt;
    return !isIn;
}

function pushChatList (elem) {
    console.log(elem)
    chatlist = getChatList()
    if (elemNotIn (elem)) {
        chatlist.push(elem)
    } else {
        // listt = chatlist.map(function (unit) {
        //     if (elem.user.username == unit.user.username) {
        //         isIn = isIn || true;
        //         return elem;
        //     } else {
        //         return unit; 
        //     }
        // }); 
        // chatlist = listt;        
    }
    localStorage.chatlist = JSON.stringify(chatlist);    
    console.log(localStorage.chatlist)
}

function acceptFriendRequest (day, time, receiver, decision, index) {
    // superlike = superlike || 0
    // console.log(token, day, time, receiver, decision, superlike)
    if (time == 3) {
        // now
        time = 3
    } else {
        // not now
        time = 0;
    }
    activityItem = activityItem || "hang out"
    var dayString; 

    
    if( day == queryDay ) {
        dayString = "Today";
    } else if (day == ( queryDay +1 ) % 7) { 
        dayString = "Tomorrow";
    } else if (day == 0) {
        dayString = "on Sunday";
    } else if (day == 1) {
        dayString = "on Monday";
    } else if (day == 2) {
        dayString = "on Tuesday";
    } else if (day == 3) {
        dayString = "on Wednesday";
    } else if (day == 4) {
        dayString = "on Thursday";
    } else if (day == 5) {
        dayString = "on Friday";
    } else if (day == 6) {
        dayString = "on Saturday";
    } 
    console.log(dayString, time)
    if (time == 3) {
        dayString = "Now"
    }
    document.getElementById("events-page-button-"+index).innerHTML = "Processing..."

    
    // console.log(token, day, time, receiver, decision, superlike, dayString)
    var ajaxUrl = "http://gettimi.com/site/SendRequest?user_token=" + localStorage.usertoken + 
    "&request_day=" + day + 
    "&request_time=" + time + 
    "&receiver=" + receiver + 
    "&decision=" + decision + 
    "&super=" + 0 + 
    "&activity=" + activityItem+
    "&dayString=" + dayString; 
    console.log(ajaxUrl)

    // return;
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            if (results.status == "sent") {
                // console.log("good")
                console.log(results)

            } else if (results.status == "matched"){
                var user = eventsList[index]
                document.getElementById("events-page-button-"+index).innerHTML = "Chat Now"
                document.getElementById("events-page-button-"+index).onclick = function () {
                    chatwith(user)
                    // myApp.showTab("#messenger-tab");
                };                 
                if (user.user_id == null) {
                    user.user_id = user["sender_id"]                    
                }
                console.log(user)
                matched(user)

                chatlist = getChatList ()
                var elem = {
                    user: user, 
                    timeObject: (new Date()), 
                    schedule: time, 
                    unread: 1
                }
                console.log(elem)
                pushChatList (elem)
                placeBusy(user);
                console.log(results);
                getRecentRequests( function () {
                        updateInvitationPage()
                });                  
            } else if (results.error != null) {
                document.getElementById("events-page-button-"+index).innerHTML = "Accept"
                console.log(results)                
            }
            else {
                console.log(results)
            }
            
        }, 
        error: function (results) {
            myApp.hideIndicator()
            document.getElementById("events-page-button-"+index).innerHTML = "Accept"
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });      
}


// (0 for noon, 1 for evening, 2 for night)

// request or turn down friends
function requestFriend(token, day, time, receiver, decision, superlike, availIndex) {
    superlike = superlike || 0
    // console.log(token, day, time, receiver, decision, superlike)
    if (timeFrame == 3) {
        // now
        time = 3
    } else {
        // not now
        day = (day + timeFrame) % 7
        time = 0;
    }
    activityItem = activityItem || ""
    var dayString; 

    
    if( day == queryDay ) {
        dayString = "Today";
    } else if (day == ( queryDay +1 ) % 7) { 
        dayString = "Tomorrow";
    } else if (day == 0) {
        dayString = "on Sunday";
    } else if (day == 1) {
        dayString = "on Monday";
    } else if (day == 2) {
        dayString = "on Tuesday";
    } else if (day == 3) {
        dayString = "on Wednesday";
    } else if (day == 4) {
        dayString = "on Thursday";
    } else if (day == 5) {
        dayString = "on Friday";
    } else if (day == 6) {
        dayString = "on Saturday";
    } 
    console.log(dayString, time)
    if (time == 3) {
        dayString = "Now"
    }

    
      console.log(token, day, time, receiver, decision, superlike, dayString)
    var ajaxUrl = "http://gettimi.com/site/SendRequest?user_token=" + token + 
    "&request_day=" + day + 
    "&request_time=" + time + 
    "&receiver=" + receiver + 
    "&decision=" + decision + 
    "&super=" + superlike + 
    "&activity=" + activityItem+
    "&dayString=" + dayString; 
    console.log(ajaxUrl)

    // return;
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            

            if (results.status == "sent") {
                // console.log("good")
                console.log(results)

            } else if (results.status == "matched"){
                var user = availFriend[timeFrame][currentIndex[timeFrame] + 1]
                console.log(user)
                if (user.user_id == null) {
                    user.user_id = user["sender_id"]                    
                }
                matched(user)

                chatlist = getChatList ()
                var elem = {
                    user: user, 
                    unread: 1, 
                    timeObject: (new Date()), 
                    schedule: time
                }
                console.log(elem)
                pushChatList (elem)
                placeBusy(user);
                console.log(results)
            } else {
                console.log(results)
            }
            if (availIndex != null) {
                availFriend[time].splice(availIndex,1);
            }
            
        }, 
        error: function (results) {
            myApp.hideIndicator()
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });  
}
var randomSeed = Math.round(Math.random() * 100);
var varySeed = randomSeed
var primeList = [37, 97, 159, 203,113, 211]
function primeNumberToday () {
    return primeList[randomSeed%primeList.length]; 
}
function fixRandom() {
    var x = Math.sin(varySeed++) * 10000;
    return x - Math.floor(x);
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
function shuffleSeed(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(fixRandom() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }    
}

// Load friends' free time to @userList
// Query the users' friends availability
// make three lists
// update currentIndex or different columns
// compare with my avil and update the front page

function getFriendFreeTimeNoUI (callback) {
    getFriendFreeTime(callback, true)    
}

function userListToAvailFriendBool (unit, i) {
    // return true;
    return (unit.availability[i] == 1 || unit.availability[i] == "super")
}

function suggestFriends() {
    var ajaxUrl = "http://gettimi.com/site/suggestfriends?user_token=" + localStorage.usertoken 
    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        cache: false, 
        dataType: "jsonp",
        success: function(results) {
            suggestFriendList = JSON.parse(results.result) 
            console.log(JSON.parse(results.result)              )
        }, 
        error: function (results) {
            // myApp.alert("Network error. Please try again later? ")
        }
    });       
}

function getFriendFreeTime (callback, noUI) {
    noUI = noUI || false;
    console.log(noUI)
    console.log("WTF5")
    if (isProcessing) return; 
    console.log("WTF6")
    if (!noUI) {
        console.log("WTF7")
        placePulse(); 
    }
    var ajaxUrl = "http://gettimi.com/site/GetFriendsFreeSlots?user_token=" + localStorage.usertoken + "&day=" + queryDay+"&s="+Math.random()+"&time="+d.getDay()
    console.log(ajaxUrl)
    isProcessing = true;
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        cache: false, 
        dataType: "jsonp",
        success: function(results) {
            isProcessing = false;
            userList = JSON.parse(results.result)
            var randomNumber = Math.random()
            console.log(randomNumber)
            if (randomNumber < 0.2) {
                shuffle(userList)
            } else {

            }

            userList.map(function (unit) {
                unit.emojiIndex = Math.round(Math.random() * (emojiList.length-1))
            })
            availFriend = [[], [], [], []]
            // userList = userList.filter(function (unit) {
            //     return Object.keys(unit.mutual).length > 3
            // })
            
            userList.map(function (unit) {
                for (var i = 0 ; i < 4; i ++) {
                    if ( userListToAvailFriendBool (unit, i) ) {
                        availFriend[i].push(unit)
                    } 
                }
            }); 

            // shuffle(availFriend[3])
            currentIndex = [ 
                availFriend[0].length - 1,
                availFriend[1].length - 1,
                availFriend[2].length - 1,     
                availFriend[3].length - 1,                             
            ]
            console.log("WTF8", !noUI, noUI)
            if (!noUI) {
                console.log("WTF9")
                if ( myAvail[timeFrame] == 1 && timeAvail[timeFrame]) {
                    console.log("WTF10")
                    updateFrontPage (timeFrame)    
                } else {
                    console.log("WTF11")
                    placeBusy (myAvail[timeFrame])
                }                       
            }
             
        }, 
        error: function (results) {
            isProcessing = false;
        }
    });       
}

// Add artifical users' detail
function addDetail () {
    userList.map(function(item){
        console.log(item); 
        item["prompt"] = "let's chipotle and chill!";
        item["favorite"] = (Math.random() > 0.5) ? ["Asian, Ramen, Sushiiii"] : ["noddles", "fruit", "eggs"]
        item["picture"] = (Math.random() > 0.5) ? "http://www.wanhuajing.com/pic/1602/2411/4451604/1_531_341.jpg" : "https://scontent-lga3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/1382242_598150426908028_673547697_n.jpg?oh=b97c6cfbaf26c37302d22add92a36c66&oe=577918FC"  
    });     
}

// get my availability, if avail, execute the callback


function getMySchedule (callbackFunction) {
    console.log("get my schedule")
    console.log("q day:" + queryDay)
    var user_token = localStorage.usertoken
    var ajaxUrl = "http://gettimi.com/site/GetMySchedule?user_token=" + user_token + "&day=" + queryDay + "&random=" +Math.random()
    console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            myAvail = JSON.parse(results.result)
            // myAvail.push(1)
            myAvail = [1, 1, 1, 1];
            console.log(myAvail)
            if ( myAvail[timeFrame] == 1 ) {
                if (callbackFunction != null) {
                    callbackFunction()
                }
            } else {
                placeBusy (myAvail[timeFrame])
            }
        }, 
        error: function (results) {
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });        
}


// download users' free time and display
function updateFreeTime () {

    var user_token = localStorage.usertoken
    var ajaxUrl = "http://gettimi.com/site/UpdateFreetime?user_token=" + user_token + "&random=" +Math.random()
    
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {
            console.log(results)
            avail = JSON.parse(results.result)
            if (avail.length == []) {
                for (var i = 0 ; i < 7; i++) {
                    avail[i] = []
                    for (var j = 0; j < 3; j++ ) {
                        avail [i][j] = 1; 
                    }
                }
            }
            updateForm()
        }, 
        error: function (results) {
            console.log(results)
            // myApp.alert("Network error. Please try again later? ")
        }
    });      
}

function goToMatchPage () {
    mainView.router.loadPage({
        "pageName": "match-page"
    });    
}


// Upload users' availability
function submitCalendar () {

    var ajaxUrl = "http://gettimi.com/site/Freetime"                   
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        data: ({
            "free_time": JSON.stringify(avail), 
            "user_token": localStorage.usertoken
        }), 
        dataType: "jsonp",
        success: function(results) {
            // myApp.hideIndicator(); 
            // getMySchedule ()
        }, 
        error: function (results) {
            // myApp.hideIndicator(); 
        }
    });     
}


// switch to calendar page
function proceedToCalendar () {
    mainView.router.loadPage({"pageName": "ask-calendar"})
    document.getElementById("ask-calendar-back").style.display = "flex"
    updateFreeTime ()
}

$(".subnavbar .tab-link").on("click", function (e) {
    console.log(e)
    $(".subnavbar .tab-link").removeClass("active")
    $(this).addClass("active")
})

// switch to a certain time frame
// if no more, then show no friends
// if person sets not avail, ask him/her to turn on
// or matched. 
// myAvail is either 0, 1, or a user object
// otherwise update
var targetBorderPosition
function bottomBorder (timeFrame) {
    var percentage = -400
    if ( timeFrame == 0 ) {
        targetBorderPosition = -400
        
    } else if ( timeFrame == 1 ) {
        targetBorderPosition = -300
    } else if ( timeFrame == 2 ) {
        targetBorderPosition = -200
    } else if (timeFrame == 3 ) {
        targetBorderPosition = -100
    }
    $("#underline-border").css("transform", "translate("+targetBorderPosition+"%,0)")
    $("#underline-border").css("animation-duration", "0.5s")


}
function afterClickTab (timeFrame, refresh) {

    refresh = refresh || false;
    console.log(refresh, timeFrame, $(tabCSSClass[timeFrame]).hasClass('current-tab'))
    if($(tabCSSClass[timeFrame]).hasClass('current-tab')){
        // if (!refresh) return;
    }else{
        $(".time-tab").removeClass('current-tab');
        $(".time-tab").removeClass('active');
        $(tabCSSClass[timeFrame]).addClass('current-tab');
        $(tabCSSClass[timeFrame]).addClass('active');
    }
    

    bottomBorder(timeFrame)

    // not avail: occupied or not updated
    if ( myAvail[timeFrame] != 1 || timeAvail[timeFrame] != 1 || currentIndex[timeFrame] < 0 ) {
        $("#invite-all-block").css("display", "none")
        console.log("yea")
        clearTimeout(loadingCard)
        placeBusy (myAvail[timeFrame])        
    } else {    
        console.log("WTF1")
        // im available, update currentIndex / call getfriendsfreetime
        if (userList.length == 0 || refresh) {
            console.log("WTF2")
            getFriendFreeTime();

        } else {
            if ( myAvail[timeFrame] == 1 ) {
                console.log("WTF3")
                updateFrontPage (timeFrame)    
            } else {
                console.log("WTF4")
                placeBusy (myAvail[timeFrame])
            }                

        }
        // if ( currentIndex[timeFrame] < 0 ) {
        //     // not available, let placeBusy handle
        //     $("#invite-all-block").css("display", "none")
        //     placePulse ()
        //     showNoFriendBlock ()
        // } else {
        //     // do nothing here.               
        // }            

    }
}

$$(".lunch-tab").on("click", function (e) {
    if($(".lunch-tab").hasClass('current-tab')){
        return;
    }
    timeFrame = 0
    afterClickTab (timeFrame)
})

$$(".dinner-tab").on("click", function (e) {
    if($(".dinner-tab").hasClass('current-tab')){
        return;
    }
    timeFrame = 1
    afterClickTab (timeFrame)
})
$$(".night-tab").on("click", function (e) {
    if($(".night-tab").hasClass('current-tab')){
        return;
    }
    timeFrame = 2
    afterClickTab (timeFrame)
})
$$(".now-tab").on("click", function (e) {
    if($(".now-tab").hasClass('current-tab')){
        return;
    }
    timeFrame = 3
    afterClickTab (timeFrame)
})

// Update users' availability
function updateForm () {
    var htmlString = '              <div class="row"> '+
    '                <div class="col-25 top-row">Day<div class="calendar-note"style="color:rgba(152,152,152,0.15)">something</div></div> '+
    '                <div class="col-25 top-row">Noon<div class="calendar-note">(11am-4pm)</div></div> '+
    '                <div class="col-25 top-row">Evening<div class="calendar-note">(5pm-10pm)</div></div> '+
    '                <div class="col-25 top-row">Night<div class="calendar-note">(10pm-)</div></div> '+
    '              </div>   ' 
    for (var i = 0; i < 7; i++) {
        htmlString += '<div class="row"><div class="col-25">'+ days[i] +'</div>'
        for (var j = 0; j < 3; j ++) {
            if (avail[i][j] == 0) {
                htmlString += '<div class="col-25"><div onclick="flip('+i+','+j+')"class=" gray-block "><i class="fa fa-minus"></i></div></div>'
            } else {
                htmlString += '<div class="col-25"><div onclick="flip('+i+','+j+')"class=" green-block "><i class="fa fa-check"></i></div></div>'
            }
            
        }
        htmlString += '</div>'
    }    
    $(".calendar-table").html(htmlString)

    // adjust
    var toolbarH = 50; 
    var navbarH = 44; 
    var promptH = 68;
    var targetH = ($(window).height() - toolbarH - navbarH - promptH ) / 8 - 2
    $(".calendar-table .row").css("line-height", targetH+"px")
    console.log("done ui form")
    // $(".top-row").css("line-height", targetH/2+"px")
    // document.getElementById("calendar-table").innerHTML = htmlString
}


// Change users' free time, and save after 800ms
function flip(i,j) {
    clearTimeout(updateCalTimeout);
    avail[i][j] = Math.abs(avail[i][j] - 1); 
    updateCalTimeout = setTimeout(function () {
        submitCalendar()
    }, 800)
    updateForm()
}





function login () {
    
    if (!window.cordova) {

        var appId = 1692336331017767; 
        facebookConnectPlugin.browserInit(appId);
    }
    facebookConnectPlugin.login( ["email","user_friends"],
        function (response) {
            console.log(response)
            selfData.accessToken = response.authResponse.accessToken; 
            console.log("here1")
            setTimeout(function () {
                $(".facebook-login-button-tutorial").html('<span class="preloader preloader-white"></span>')
                getFriendsAndPersonalData ()
            }, 200)
        },
        function (response) { 
            myApp.alert(JSON.stringify(response)) 
        });
        console.log("helloooooooooo");

}

function showDialog () { 
    facebookConnectPlugin.showDialog( { method: "feed" }, 
        function (response) { alert(JSON.stringify(response)) },
        function (response) { alert(JSON.stringify(response)) });
}

function numberIsValid (number) {
    return true; 
}


// Verify phone number
function verifyPhone () {
    countryCode = document.getElementById("country-code-input").value.replace("+", "")
    phoneNumber = document.getElementById("phone-number-input").value
    mixpanel.track("User Signup Get text");      

    if (numberIsValid(phoneNumber)) {
        myApp.showIndicator()
        var ajaxUrl = "http://gettimi.com/site/InputPhone?user_token=" + 
            localStorage.usertoken + "&number=" + countryCode + phoneNumber                        
        console.log(ajaxUrl)
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(results) {
                // alert(results)
                myApp.hideIndicator()
                mainView.router.loadPage({"pageName":"verification-code"});
                getImageList(true);
                setTimeout(function () {
                    document.getElementById("verification-code-input").focus()
                }, 800)
                console.log(results)
            }, 
            error: function (err) {
                myApp.hideIndicator()
                myApp.alert("Phone number is invalid. Please try again? ");
            }
        });         
    }
   
}

$(".back-link").on("click", function (e) {
    mainView.router.back()
})

function currentTimeTab () {
    if (timeFrame == 0) {
        return ".lunch-tab"
    } else if (timeFrame == 1){
        return ".dinner-tab"
    } else if (timeFrame == 2){
        return ".night-tab"
    } else if (timeFrame == 3){
        return ".now-tab"
    }
}
function resendCode () {
    countryCode = countryCode = document.getElementById("country-code-input").value.replace("+", "")
    phoneNumber = document.getElementById("phone-number-input").value

    if (numberIsValid(phoneNumber)) {
        myApp.showIndicator()
        var ajaxUrl = "http://gettimi.com/site/InputPhone?user_token=" + 
            localStorage.usertoken + "&number=" + countryCode + phoneNumber                        
        console.log(ajaxUrl)
        try {
            $.ajax({
                url: ajaxUrl,
                type: "GET",
                dataType: "jsonp",
                success: function(results) {
                    // alert(results)
                    myApp.hideIndicator()
                    // mainView.router.loadPage({"pageName":"verification-code"})
                    setTimeout(function () {
                        document.getElementById("verification-code-input").focus()
                    }, 800)
                    console.log(results)
                    // alert("sent")
                    // myApp.alert("\u8bf7\u67e5\u6536\u60a8\u7684\u90ae\u4ef6")
                }, 
                error: function (err) {
                    myApp.hideIndicator()
                    myApp.alert("Oops something went wrong");
                }
            });               
        } catch (err) {
                myApp.hideIndicator()
        }
      
    } else {
        myApp.alert("it's not a valid number. ")
    }
}

// Input verification code
function verifyCode () {
    mixpanel.track("User Signup sent code");       
    var code = document.getElementById("verification-code-input").value
    var ajaxUrl = "http://gettimi.com/site/InputCode?user_token=" + 
        localStorage.usertoken + "&code=" + code
        console.log(ajaxUrl)
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(results) {

            // first first time login
            myApp.hideIndicator()
            localStorage.checkedPhone = 1; 
            mainView.router.loadPage({"pageName":"home", "reload": true, "reloadPrevious": true});
            myApp.showTab("#rate-tab"); 
            mixpanel.track("User Signup successfully");              
            // $(currentTimeTab())[0].click();  
            // getFriendFreeTime()            
            initAfterLogin ()
            rateTabOnShow()
            document.getElementById("ask-calendar-back").style.display = "none"
            console.log(results)                
        }, 
        error: function (results) {
            myApp.hideIndicator()
            myApp.alert("the code you put is incorrect, please try again:)")
            mainView.router.loadPage({"pageName":"phone-number"})            
        }
    });      
}

function loginToTimiServer () {

}

// Get data from Facebook
function getFriendsAndPersonalData () { 
    console.log("api")
    // limit 5000 so that it returns more than 25
    mixpanel.track("Continue Login", {
        "segment": "fb"
    });
    facebookConnectPlugin.api( "me/?fields=name,id,email,friends.limit(5000)", ["email","user_friends"],
        function (response) { 
            console.log("success api")
            console.log(response)
            myApp.hideIndicator()
            selfData.userId = response.id;
            selfData.email = response.email;  
            selfData.name = response.name; 

            // in case the facebook bug comes up again
              
            try {
                selfData.friends = response.friends["data"];   
                friendDataEscaped = JSON.stringify(selfData);
            } catch (err) {
                selfData.friends = [];
                friendDataEscaped = JSON.stringify(selfData);
            }   
            
            console.log(friendDataEscaped)
            myApp.showIndicator()
            var ajaxUrl = "http://gettimi.com/site/facebookLogin"                      
            $.ajax({
                url: ajaxUrl,
                type: "POST",
                dataType: "json",
                crossDomain: true,
                data: ({'selfData':friendDataEscaped}),
                success: function(results) {
                    myApp.hideIndicator()
                    console.log(results)
                    // localStorage 
                    localStorage.usertoken = results["user_token"]
                    // console.log("phone length: "+results["phone"].length)
                    if (results["phone"] == false || results["phone"] == undefined || results["phone"] == null || results["phone"].length == 0) {
                        localStorage.checkedPhone = 0
                        console.log("no phone")
                        // not verified verified users

                        // required, if not, calendar won't be initialized
                        // submitCalendar ()
                        // required, if not, the phone can't be filled in
                        myApp.closeModal(".popup-intro")
                        $(".modal-overlay-visible").css("display", "block")   

                        // go to phone number page                    
                        mainView.router.loadPage({"pageName":"phone-number"})
                        mixpanel.track("User Signup", {
                            "segment": "Fill in Phone"
                        });                                

                        // fill in the name and email, focus on phone number
                        setTimeout(function () {
                            myApp.formFromJSON("#my-form", {
                                'name': selfData.name, 
                                'email': selfData.email, 
                                'phone' : ""
                            })                            
                            document.getElementById("phone-number-input").focus()

                        }, 800);                             

                    } else {
                        mixpanel.track("User Login", {
                            "segment": "returning fb"
                        });                        

                        //   phone verified users logged in
                        console.log("Phone verified users logged in")
                        //  recurring user                        
                        // go home first
                        mainView.router.loadPage({
                            "pageName":"home"
                        })          
                        myApp.closeModal(".popup-intro")  
                        $(".modal-overlay-visible").css("display", "block") 
                        initAfterLogin ()
                    }
                }, 
                error: function (results) {
                    myApp.hideIndicator()
                    console.log(results)
                    myApp.alert("no good")
                    

                }
            });             

            
            // cordova.plugins.clipboard.copy(friendDataEscaped);
            // alert(JSON.stringify(friendDataEscaped)) 

        },
        function (response) { 
            $(".facebook-login-button-tutorial").html('<i class=\"fa fa-facebook\" aria-hidden=\"true\"><\/i><span class=\"text\">Continue with Facebook</span>')
            myApp.alert("Please allow Facebook access to continue using timi:) ")
            // alert(JSON.stringify(response)) 
        }); 
}

function logPurchase () {
    facebookConnectPlugin.logPurchase(1.99, "USD",
        function (response) { 
            // alert(JSON.stringify(response)) 
        },
        function (response) { 
            // alert(JSON.stringify(response)) 
        });
}

function logEvent () {
    // For more information on AppEvent param structure see
    // https://developers.facebook.com/docs/ios/app-events
    // https://developers.facebook.com/docs/android/app-events
    facebookConnectPlugin.logEvent("Purchased",
        {
            NumItems: 1,
            Currency: "USD",
            ContentType: "shoes",
            ContentID: "HDFU-8452"
        }, null,
        function (response) { 
            // alert(JSON.stringify(response)) 
        },
        function (response) { 
            // alert(JSON.stringify(response)) 
        });
}

function getAccessToken () { 
    facebookConnectPlugin.getAccessToken( 
        function (response) { 
            // alert(JSON.stringify(response)) 
        },
        function (response) { 
            // alert(JSON.stringify(response)) 
        });
}

function getStatus () { 
    facebookConnectPlugin.getLoginStatus( 
        function (response) { 
            // alert(JSON.stringify(response)) 
        },
        function (response) { 
            // alert(JSON.stringify(response)) 
        });
}

function logout () {
    localStorage.usertoken = null; 
    localStorage.checkedPhone = 0; 
    logoutFB()
    localStorage.chatlist = JSON.stringify([])
    mainView.router.loadPage({
        "pageName":"index"
    })
    setTimeout(function () {
        popupTutorial ()
    }, 200)           
}

function logoutFB () { 
    try {
        facebookConnectPlugin.logout( 
            function (response) { 
                console.log(JSON.stringify(response)) 
            },
            function (response) { 
                console.log(JSON.stringify(response)) 
            });        
    } catch (err) {

    }

}

function searchItem (query) {

    mixpanel.track("Search", {
        "username": personalData.username, 
        "query": query
    });
    query = query || document.getElementById("search-bar").value
    query = query.toLowerCase().trim()


    if (query.split(" ").length > 1) {
        fuse = new Fuse(imageList, {
            shouldSort: true,
            threshold: 0.05,
            tokenize: true,
            matchAllTokens: true,
            maxPatternLength: 32,
            keys: [
                "description", 
                "place", 
                "category_name", 
                "recommend_menu", 
                "pics"
            ]
        })  
    } else {
        fuse = new Fuse(imageList, {
            shouldSort: true,
            threshold: 0.05,
            tokenize: true,
            maxPatternLength: 32,
            keys: [
                "description", 
                "place", 
                "category_name", 
                "recommend_menu", 
                "pics"                
            ]
        })          
    }
    var searchedList = fuse.search(query)
    console.log(searchedList)

    // var searchedList = imageList.filter(function (unit){ 
    //     var criteria = [];
    //     criteria.push(unit.description.toLowerCase().indexOf(query) != -1)
    //     criteria.push(unit.place.toLowerCase().indexOf(query) != -1);
    //     if (unit.recommend_menu != null && unit.recommend_menu != "") {
    //         criteria.push(unit.recommend_menu.toLowerCase().indexOf(query) != -1);             
    //     }
       
    //     criteria.push(unit.category_name.toLowerCase().indexOf(query) != -1);
    //     var or = criteria.reduce(function (result, elem){
    //         return result || elem;
    //     });
    //     return or; 
    // });
    // console.log(searchedList)
    currentTitleObject().callback(searchedList, {
        ignoreCategory: true, 
        ignoreDelivery: true
    })
    setTimeout(function () {
        try{
            Keyboard.close()
        } catch (err) {
            
        }        
    }, 400)    
}

;(function ($, window, document, undefined) {
    var pluginName = "jTinder",
        defaults = {
            onDislike: null,
            onLike: null,
            onSuperLike: null,
            animationRevertSpeed: 200,
            animationSpeed: 200,
            threshold: 1.2,
            likeSelector: '.like',
            dislikeSelector: '.dislike',
            superlikeSelector: '.superlike'
        };
    var windowW = $(window).width(); 
    var windowH = $(window).height(); 
    console.log(windowH)

    var container = null;
    var panes = null;
    var $that = null;
    var xStart = 0;
    var yStart = 0;
    var touchStart = false;
    var posX = 0, posY = 0, lastPosX = 0, lastPosY = 0, pane_width = 0, pane_count = 0, current_pane = 0;

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init(element);
    }

    Plugin.prototype = {


        init: function (element) {

            container = $(">ul", element);
            panes = $(">ul>li", element);
            pane_width = container.width();
            pane_count = panes.length;
            current_pane = panes.length - 1;
            $that = this;

            $(element).bind('touchstart mousedown', this.handler);
            $(element).bind('touchmove mousemove', this.handler);
            $(element).bind('touchend mouseup', this.handler);
        },

        showPane: function (index) {
            panes.eq(current_pane).hide();
            current_pane = index;
        },

        next: function () {
            return this.showPane(current_pane - 1);
        },

        dislike: function() {
            panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (pane_width*-1.5) + "px) rotate(-60deg)"}, $that.settings.animationSpeed, function () {
                if($that.settings.onDislike) {
                    $that.settings.onDislike(panes.eq(current_pane));
                }
                $that.next();
            });
        },

        like: function() {
            panes.eq(current_pane).animate({"transform": "translate(" + (0) + "px,-" + (pane_width*1.5) + "px) rotate(0deg)"}, $that.settings.animationSpeed, function () {
                if($that.settings.onLike) {
                    $that.settings.onLike(panes.eq(current_pane));
                }
                $that.next();
            });            

        },

        superlike: function () {
            panes.eq(current_pane).animate({"transform": "translate(" + (pane_width) + "px," + (pane_width*-1.5) + "px) rotate(60deg)"}, $that.settings.animationSpeed, function () {
                if($that.settings.onSuperLike) {
                    $that.settings.onSuperLike(panes.eq(current_pane));
                }
                $that.next();
            });
        }, 

        handler: function (ev) {
            ev.preventDefault();

            switch (ev.type) {
                case 'touchstart':
                    if(touchStart === false) {
                        touchStart = true;
                        xStart = ev.originalEvent.touches[0].pageX;
                        yStart = ev.originalEvent.touches[0].pageY;
                    }
                case 'mousedown':
                    if(touchStart === false) {
                        touchStart = true;
                        xStart = ev.pageX;
                        yStart = ev.pageY;
                    }
                case 'mousemove':
                case 'touchmove':
                    if(touchStart === true) {
                        var pageX = typeof ev.pageX == 'undefined' ? ev.originalEvent.touches[0].pageX : ev.pageX;
                        var pageY = typeof ev.pageY == 'undefined' ? ev.originalEvent.touches[0].pageY : ev.pageY;
                        var deltaX = parseInt(pageX) - parseInt(xStart);
                        var deltaY = parseInt(pageY) - parseInt(yStart);
                        var percent = ((100 / pane_width) * deltaX) / pane_count;
                        posX = deltaX + lastPosX;
                        posY = deltaY + lastPosY;
                        // console.log(windowW, windowH, pageX, pageY)

                        // if getting outside the screen
                        if ( pageX >= windowW-2 || pageX <= 0 || pageY <= 0 || pageY >= windowH-2) {
                            console.log("out")
                            touchStart = false;
                            var pageX = (typeof ev.pageX == 'undefined') ? ev.originalEvent.changedTouches[0].pageX : ev.pageX;
                            var pageY = (typeof ev.pageY == 'undefined') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY;
                            var deltaX = parseInt(pageX) - parseInt(xStart);
                            var deltaY = parseInt(pageY) - parseInt(yStart);

                            posX = deltaX + lastPosX;
                            posY = deltaY + lastPosY;
                            var opa = Math.abs((Math.abs(deltaX) / $that.settings.threshold) / 100 + 0.2);
                            var opaY = Math.abs((Math.abs(deltaY) / $that.settings.threshold) / 100 + 0.2) / 1.5;

                            if (opaY >= 1) {
                                // $(".superlike").addClass(".animated bounceIn");
                                // setTimeout(function () {
                                //     $(".superlike").removeClass(".animated bounceIn");
                                // }, 800);
                                // console.log("super")

                            }
                            else if (opa >= 1) {
                                // console.log("afs")
                                if (posX > 0) {
                                    panes.eq(current_pane).animate({"transform": "translate(" + (pane_width) + "px," + (posY + pane_width)  + "px) rotate(30 deg)"}, $that.settings.animationSpeed, function () {
                                        if($that.settings.onSuperLike) {
                                            $that.settings.onSuperLike(panes.eq(current_pane));
                                        }
                                        $that.next();
                                    });
                                } else {
                                    panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (posY + pane_width)  + "px) rotate(-30deg)"}, $that.settings.animationSpeed, function () {
                                        if($that.settings.onDislike) {
                                            $that.settings.onDislike(panes.eq(current_pane));
                                        }
                                        $that.next();
                                    });
                                }                       
                                // if (posX > 0) {
                                //  panes.eq(current_pane).animate({"transform": "translate(" + (pane_width) + "px," + (posY + pane_width) + "px) rotate(60deg)"}, $that.settings.animationSpeed, function () {
                                //      if($that.settings.onLike) {
                                //          $that.settings.onLike(panes.eq(current_pane));
                                //      }
                                //      $that.next();
                                //  });
                                // } else {
                                //  panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (posY + pane_width) + "px) rotate(-60deg)"}, $that.settings.animationSpeed, function () {
                                //      if($that.settings.onDislike) {
                                //          $that.settings.onDislike(panes.eq(current_pane));
                                //      }
                                //      $that.next();
                                //  });
                                // }
                            } else {
                                lastPosX = 0;
                                lastPosY = 0;
                                panes.eq(current_pane).animate({"transform": "translate(0px,0px) rotate(0deg)"}, $that.settings.animationRevertSpeed);
                                panes.eq(current_pane).find($that.settings.likeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
                                panes.eq(current_pane).find($that.settings.superlikeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
                                panes.eq(current_pane).find($that.settings.dislikeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
                            }
                            break;                          

                        }

                        panes.eq(current_pane).css("transform", "translate(" + posX + "px," + posY + "px) rotate(" + (percent / 2) + "deg)");

                        var opa = (Math.abs(deltaX) / $that.settings.threshold) / 100 + 0.2;
                        var opaY = ((Math.abs(deltaY) / $that.settings.threshold) / 100 + 0.2) / 1.5;

                        // console.log(opa)
                        if (opaY >= 0.8 && deltaY < 0) {

                            opaY = ((opaY > 1.0) ? 1.0 : opaY);

                            if(opa > 1) {
                                opa = (opa > 1.2) ? 1.2 : opa;
                                if (posX >= 10) {
                                    panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', (opa-1)*5);
                                    panes.eq(current_pane).find($that.settings.superlikeSelector).css('opacity', 0);
                                    panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', 0);                                                                  
                                } else if (posX < -10) {
                                    panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', (opa-1)*5);
                                    panes.eq(current_pane).find($that.settings.superlikeSelector).css('opacity', 0);
                                    panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', 0);                                                                             
                                }
                            } else {
                                panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', 0);
                                panes.eq(current_pane).find($that.settings.superlikeSelector).css('opacity', (opaY-0.8)*5);
                                panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', 0);                                     
                            }     
                        } else {
                            if(opa > 0.8) {
                                opa = (opa > 1) ? 1.0 : opa;
                                if (posX >= 10) {
                                    panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', (opa-0.8)*5);
                                    panes.eq(current_pane).find($that.settings.superlikeSelector).css('opacity', 0);
                                    panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', 0);                                                                  
                                } else if (posX < -10) {
                                    panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', (opa-0.8)*5);
                                    panes.eq(current_pane).find($that.settings.superlikeSelector).css('opacity', 0);
                                    panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', 0);                                                                             
                                }
                            } else {
                                    panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', 0);
                                    panes.eq(current_pane).find($that.settings.superlikeSelector).css('opacity', 0);
                                    panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', 0);                                     
                            }               
                        }

                    }
                    break;
                case 'mouseup':
                case 'touchend':
                    if(touchStart === false) break;  
                    touchStart = false;

                    var pageX = (typeof ev.pageX == 'undefined') ? ev.originalEvent.changedTouches[0].pageX : ev.pageX;
                    var pageY = (typeof ev.pageY == 'undefined') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY;
                    var deltaX = parseInt(pageX) - parseInt(xStart);
                    var deltaY = parseInt(pageY) - parseInt(yStart);

                    posX = deltaX + lastPosX;
                    posY = deltaY + lastPosY;
                    var opa = Math.abs((Math.abs(deltaX) / $that.settings.threshold) / 100 + 0.2)  ;
                    var opaY = Math.abs((Math.abs(deltaY) / $that.settings.threshold) / 100 + 0.2) / 1.6;
                    if (opaY >= 1 && deltaY < 0) {
                        /* no more swipe up*/
                        lastPosX = 0;
                        lastPosY = 0;
                        panes.eq(current_pane).animate({"transform": "translate(0px,0px) rotate(0deg)"}, $that.settings.animationRevertSpeed);
                        panes.eq(current_pane).find($that.settings.likeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
                        panes.eq(current_pane).find($that.settings.superlikeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
                        panes.eq(current_pane).find($that.settings.dislikeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);                        
                        /* no more swipe up*/
                        // panes.eq(current_pane).animate({"transform": "translate(" + 0 + "px,-" + (pane_width)  + "px) rotate(0 deg)"}, $that.settings.animationSpeed, function () {
                        //     if($that.settings.onLike) {
                        //         $that.settings.onLike(panes.eq(current_pane));
                        //     }
                        //     $that.next();
                        // });                        
                    }
                    else if (opa > 1 ) {
                        if (posX > 0) {
                            panes.eq(current_pane).animate({"transform": "translate(" + (pane_width) + "px," + (posY + pane_width)  + "px) rotate(30 deg)"}, $that.settings.animationSpeed, function () {
                                if($that.settings.onSuperLike) {
                                    $that.settings.onSuperLike(panes.eq(current_pane));
                                }
                                $that.next();
                            });
                        } else {
                            panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (posY + pane_width)  + "px) rotate(-30deg)"}, $that.settings.animationSpeed, function () {
                                if($that.settings.onDislike) {
                                    $that.settings.onDislike(panes.eq(current_pane));
                                }
                                $that.next();
                            });
                        }                                
                    } else {
                        
                        lastPosX = 0;
                        lastPosY = 0;
                        panes.eq(current_pane).animate({"transform": "translate(0px,0px) rotate(0deg)"}, $that.settings.animationRevertSpeed);
                        panes.eq(current_pane).find($that.settings.likeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
                        panes.eq(current_pane).find($that.settings.superlikeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
                        panes.eq(current_pane).find($that.settings.dislikeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
                    }
                    break;
            }
        }
    };

    $.fn[ pluginName ] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
            else if ($.isFunction(Plugin.prototype[options])) {
                $.data(this, 'plugin_' + pluginName)[options]();
            }
        });

        return this;
    };

})(jQuery, window, document);
!function(t){"use strict";function e(){console.log.apply(console,arguments)}function s(t,e){var s,n,o,i;for(this.list=t,this.options=e=e||{},s=0,i=["sort","shouldSort","verbose","tokenize"],n=i.length;n>s;s++)o=i[s],this.options[o]=o in e?e[o]:r[o];for(s=0,i=["searchFn","sortFn","keys","getFn","include","tokenSeparator"],n=i.length;n>s;s++)o=i[s],this.options[o]=e[o]||r[o]}function n(t,e,s){var i,r,h,a,c,p;if(e){if(h=e.indexOf("."),-1!==h?(i=e.slice(0,h),r=e.slice(h+1)):i=e,a=t[i],null!==a&&void 0!==a)if(r||"string"!=typeof a&&"number"!=typeof a)if(o(a))for(c=0,p=a.length;p>c;c++)n(a[c],r,s);else r&&n(a,r,s);else s.push(a)}else s.push(t);return s}function o(t){return"[object Array]"===Object.prototype.toString.call(t)}function i(t,e){e=e||{},this.options=e,this.options.location=e.location||i.defaultOptions.location,this.options.distance="distance"in e?e.distance:i.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:i.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||i.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen<=this.options.maxPatternLength&&(this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet())}var r={id:null,caseSensitive:!1,include:[],shouldSort:!0,searchFn:i,sortFn:function(t,e){return t.score-e.score},getFn:n,keys:[],verbose:!1,tokenize:!1,matchAllTokens:!1,tokenSeparator:/ +/g};s.VERSION="2.5.0",s.prototype.set=function(t){return this.list=t,t},s.prototype.search=function(t){this.options.verbose&&e("\nSearch term:",t,"\n"),this.pattern=t,this.results=[],this.resultMap={},this._keyMap=null,this._prepareSearchers(),this._startSearch(),this._computeScore(),this._sort();var s=this._format();return s},s.prototype._prepareSearchers=function(){var t=this.options,e=this.pattern,s=t.searchFn,n=e.split(t.tokenSeparator),o=0,i=n.length;if(this.options.tokenize)for(this.tokenSearchers=[];i>o;o++)this.tokenSearchers.push(new s(n[o],t));this.fullSeacher=new s(e,t)},s.prototype._startSearch=function(){var t,e,s,n,o=this.options,i=o.getFn,r=this.list,h=r.length,a=this.options.keys,c=a.length,p=null;if("string"==typeof r[0])for(s=0;h>s;s++)this._analyze("",r[s],s,s);else for(this._keyMap={},s=0;h>s;s++)for(p=r[s],n=0;c>n;n++){if(t=a[n],"string"!=typeof t){if(e=1-t.weight||1,this._keyMap[t.name]={weight:e},t.weight<=0||t.weight>1)throw new Error("Key weight has to be > 0 and <= 1");t=t.name}else this._keyMap[t]={weight:1};this._analyze(t,i(p,t,[]),p,s)}},s.prototype._analyze=function(t,s,n,i){var r,h,a,c,p,l,u,f,d,g,m,y,k,v,S,b=this.options,_=!1;if(void 0!==s&&null!==s){h=[];var M=0;if("string"==typeof s){if(r=s.split(b.tokenSeparator),b.verbose&&e("---------\nKey:",t),this.options.tokenize){for(v=0;v<this.tokenSearchers.length;v++){for(f=this.tokenSearchers[v],b.verbose&&e("Pattern:",f.pattern),d=[],y=!1,S=0;S<r.length;S++){g=r[S],m=f.search(g);var L={};m.isMatch?(L[g]=m.score,_=!0,y=!0,h.push(m.score)):(L[g]=1,this.options.matchAllTokens||h.push(1)),d.push(L)}y&&M++,b.verbose&&e("Token scores:",d)}for(c=h[0],l=h.length,v=1;l>v;v++)c+=h[v];c/=l,b.verbose&&e("Token score average:",c)}u=this.fullSeacher.search(s),b.verbose&&e("Full text score:",u.score),p=u.score,void 0!==c&&(p=(p+c)/2),b.verbose&&e("Score average:",p),k=this.options.tokenize&&this.options.matchAllTokens?M>=this.tokenSearchers.length:!0,b.verbose&&e("Check Matches",k),(_||u.isMatch)&&k&&(a=this.resultMap[i],a?a.output.push({key:t,score:p,matchedIndices:u.matchedIndices}):(this.resultMap[i]={item:n,output:[{key:t,score:p,matchedIndices:u.matchedIndices}]},this.results.push(this.resultMap[i])))}else if(o(s))for(v=0;v<s.length;v++)this._analyze(t,s[v],n,i)}},s.prototype._computeScore=function(){var t,s,n,o,i,r,h,a,c,p=this._keyMap,l=this.results;for(this.options.verbose&&e("\n\nComputing score:\n"),t=0;t<l.length;t++){for(n=0,o=l[t].output,i=o.length,a=1,s=0;i>s;s++)r=o[s].score,h=p?p[o[s].key].weight:1,c=r*h,1!==h?a=Math.min(a,c):(n+=c,o[s].nScore=c);1===a?l[t].score=n/i:l[t].score=a,this.options.verbose&&e(l[t])}},s.prototype._sort=function(){var t=this.options;t.shouldSort&&(t.verbose&&e("\n\nSorting...."),this.results.sort(t.sortFn))},s.prototype._format=function(){var t,s,n,o,i,r=this.options,h=r.getFn,a=[],c=this.results,p=r.include;for(r.verbose&&e("\n\nOutput:\n\n",c),o=r.id?function(t){c[t].item=h(c[t].item,r.id,[])[0]}:function(){},i=function(t){var e,s,n,o,i,r=c[t];if(p.length>0){if(e={item:r.item},-1!==p.indexOf("matches"))for(n=r.output,e.matches=[],s=0;s<n.length;s++)o=n[s],i={indices:o.matchedIndices},o.key&&(i.key=o.key),e.matches.push(i);-1!==p.indexOf("score")&&(e.score=c[t].score)}else e=r.item;return e},s=0,n=c.length;n>s;s++)o(s),t=i(s),a.push(t);return a},i.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},i.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},i.prototype._bitapScore=function(t,e){var s=t/this.patternLen,n=Math.abs(this.options.location-e);return this.options.distance?s+n/this.options.distance:n?1:s},i.prototype.search=function(t){var e,s,n,o,i,r,h,a,c,p,l,u,f,d,g,m,y,k,v,S,b,_,M=this.options;if(t=M.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0,matchedIndices:[[0,t.length-1]]};if(this.patternLen>M.maxPatternLength){if(y=t.match(new RegExp(this.pattern.replace(M.tokenSeparator,"|"))),k=!!y)for(S=[],e=0,b=y.length;b>e;e++)_=y[e],S.push([t.indexOf(_),_.length-1]);return{isMatch:k,score:k?.5:1,matchedIndices:S}}for(o=M.location,n=t.length,i=M.threshold,r=t.indexOf(this.pattern,o),v=[],e=0;n>e;e++)v[e]=0;for(-1!=r&&(i=Math.min(this._bitapScore(0,r),i),r=t.lastIndexOf(this.pattern,o+this.patternLen),-1!=r&&(i=Math.min(this._bitapScore(0,r),i))),r=-1,g=1,m=[],c=this.patternLen+n,e=0;e<this.patternLen;e++){for(h=0,a=c;a>h;)this._bitapScore(e,o+a)<=i?h=a:c=a,a=Math.floor((c-h)/2+h);for(c=a,p=Math.max(1,o-a+1),l=Math.min(o+a,n)+this.patternLen,u=Array(l+2),u[l+1]=(1<<e)-1,s=l;s>=p;s--)if(d=this.patternAlphabet[t.charAt(s-1)],d&&(v[s-1]=1),0===e?u[s]=(u[s+1]<<1|1)&d:u[s]=(u[s+1]<<1|1)&d|((f[s+1]|f[s])<<1|1)|f[s+1],u[s]&this.matchmask&&(g=this._bitapScore(e,s-1),i>=g)){if(i=g,r=s-1,m.push(r),!(r>o))break;p=Math.max(1,2*o-r)}if(this._bitapScore(e+1,o)>i)break;f=u}return S=this._getMatchedIndices(v),{isMatch:r>=0,score:0===g?.001:g,matchedIndices:S}},i.prototype._getMatchedIndices=function(t){for(var e,s=[],n=-1,o=-1,i=0,r=t.length;r>i;i++)e=t[i],e&&-1===n?n=i:e||-1===n||(o=i-1,s.push([n,o]),n=-1);return t[i-1]&&s.push([n,i-1]),s},"object"==typeof exports?module.exports=s:"function"==typeof define&&define.amd?define(function(){return s}):t.Fuse=s}(this);

