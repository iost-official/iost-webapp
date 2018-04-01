// <?php

// class CrontabController extends Controller
// {

// /*
// 	public function actionUpdateFB(){
// 		$users = Users::model()->findAll();
// 		foreach($users as $user):
// 			$user->saveFacebookProfilePicture();
// 		endforeach;
// 	}
// */

// public function actionTest(){
// 	//echo "<pre>".json_encode(InstaYelp::start("jean georges nyc"))."</pre>";
// 	//$term = array("meal", "food", "dish", "cuisine", "drink", "wine", "cocktail", "dessert", "alcoholic beverage", "beverage", "beer");
// 	//$url = "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/e35/14156147_1234993639865213_1264107392_n.jpg?ig_cache_key=MTMzMjAzNzI2NjU2MTg5MDE2Mg%3D%3D.2";
// 	//$url = "http://gettimi.com/images/attaboy/attaboy1.jpg";
// 	//GoogleVision::start($term, $url, 0.7);
// 	//echo Category::model()->getCategoryIdByString('test');
// 	//InstaYelp::testRun("https://www.instagram.com/explore/tags/lebernardinnyc/");
// 	//InstaYelp::testRunCaviar(1, 10);	//$page, $size
// }


// 	public function actionUpdateInstaYelp(){

// 		$eventPics = EventPic::model()->findAll(array(
//   			'condition' => 'path LIKE "%instagram%"',
//   			'limit' => 150,
// 		));

// 		foreach($eventPics as $ep):
// 			try{
// 				$url = trim($ep->path);
// 				if (strpos($url, 'trycaviar') !== false || strpos($url, 'yelpcdn') !== false || strpos($url, 'cdninstagram') !== false  || strpos($url, 'fbcdn') !== false) {
// 					//use @ to suppress the warning
// 					$fbprofileimage = @file_get_contents($url); 
// 					//if image not found
// 					if($fbprofileimage === FALSE) {
// 						continue;
// 					}

// 					$filename = "events" . time() . rand(1, 999) . ".jpg";
// 					$new_image_name = $filename; //strtolower($_FILES['file']['name']);
// 					$fileSavePath = "uploads/eventPics/" . $this->id . "/";
// 					if (!file_exists($fileSavePath)) {
// 						mkdir($fileSavePath, 0777, true);
// 					}
// 					file_put_contents('/var/www/html/webapp/'.$fileSavePath.$new_image_name, $fbprofileimage);
// 					$ep->path = Yii::app()->params['globalURL']."/".$fileSavePath.$new_image_name;
// 					$ep->save(false);
// 				}else{
// 					continue;
// 				}
// 			}catch (Exception $e) {
// 			}
// 		endforeach;
// 		echo 200;
// 	}


// 	public function actionScrapeCaviar(){
// 	    //prevent anyone else from using our cron
//         if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
//             //throw new CHttpException(404, "The requested link does not exist.");
//         }	
//         $page = $_GET['page'];
//         $size = $_GET['size'];
//         set_time_limit(0);

//         $results = InstaYelp::startCaviar($page, $size);
//         foreach($results as $result):

// 				$name = $result['name'];

// 				$event = Event::model()->findByAttributes(array('name'=>$name,'homepage'=>1));
// 				if($event){
// 					continue;
// 				}

// 				$website = "http://".$result['website'];
// 				$yelp_url = $result['url'];
// 				$types = $result['types'];	//this is an array!
// 				$price = $result['priceRange'];	//$$$
// 				$addressArray = $result['addressArray'];
// 				$delivery_url = $result['cav_url'];
// 				$city = "";
// 				$address = "";
// 				if(isset($addressArray['locality'])){
// 					$city = $addressArray['locality'];
// 				}
// 				foreach($addressArray as $key=>$value){
// 					$address .= $value." ";
// 				}
// 				$rating = $result['starRating'];	//float, 4.0
// 				$rating_count = $result['reviewCount'];	//2200
// 				$phone = $result['telephone'];
// 				$geo = $result['geo'];
// 				if(isset($geo["latitude"]) && isset($geo["longitude"])){
// 					$geo = $geo["latitude"].",".$geo["longitude"];
// 				}
// 				$hour = json_encode($result['hours']);	//hours json string

// 				$types = $result['types'];
// 				$types_string = implode(" ",$types);

// 				$pictures = $result['dishes'];

// 		    	$event = new Event;
// 		    	$event->name = $name;
// 		    	$event->city = $city;
// 		    	$event->location = $geo;
// 		    	$event->address = $address;
// 		    	$event->phone = $phone;
// 		    	$event->website = $website;
// 		    	$event->price = $price;
// 		    	$event->homepage = 1;
// 		    	$event->recommend = 1;
// 		    	$event->yelp_category = $types_string;
// 		    	$event->category_id = Category::model()->getCategoryIdByString($types_string);
// 		    	$event->description = "";
// 		    	$event->hours_json = $hour;
// 		    	$event->rating = $rating;
// 		    	$event->rating_count = $rating_count;
// 		    	$event->yelp_url = $yelp_url;
// 		    	$event->create_time = time();
// 		    	$event->delivery_url = "http://trycaviar.com".$delivery_url;
// 		    	$event->save(false);

// 				foreach($pictures as $index=>$pic){		//$dish!!!!!
// 					// save event pic here.
// 					if(!isset($pic['imageUrl'])){
// 						continue;
// 					}
// 				    $eventPic = new EventPic;
// 				    $eventPic->event_id = $event->id;
// 				    $eventPic->path = $pic['imageUrl'];
// 				    $eventPic->description = $pic['description'];
// 				    $eventPic->price = $pic['cost'];
// 				    $eventPic->title = $pic['title'];
// 				    $eventPic->save(false);
// 				}

// 		endforeach;

// 		echo 200;

// 	}




// 	public function actionScrapeInstaYelp(){

//         //prevent anyone else from using our cron
//         if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
//             //throw new CHttpException(404, "The requested link does not exist.");
//         }

// 		$filename = $_GET['filename'];

// 		//filter terms
// 		$term = array("meal", "food", "dish", "cuisine", "drink", "wine", "cocktail", "dessert", "alcoholic beverage", "beverage", "beer");
// 		$pic_counter = 0;

// 		set_time_limit(0);

// 		$result = array();
// 		$handle = fopen("/var/www/html/webapp/".$filename, "r");
// 		//one by one! make a queue...
// 		if ($handle) {
// 			if(($line = fgets($handle)) !== false){
// 				$line = explode("|", $line);

// 		    	if(isset($line[1])){
// 		    		$name = $line[0];
// 		    		$insta_username = $line[1];
// 		    	}else{
// 		    		$name = $line[0];
// 		    		$insta_username = null;
// 		    	}

// 				$event = Event::model()->findByAttributes(array('name'=>$name,'homepage'=>1));
// 				if($event){
// 					//delete the first line
// 					$contents = file($filename, FILE_IGNORE_NEW_LINES);
// 					$first_line = array_shift($contents);
// 					file_put_contents($filename, implode("\r\n", $contents));
// 					echo 200;
// 					exit();
// 				}

// 				$result = InstaYelp::start($name, $insta_username);

// 				// save event here.
// 				$name = $result['name'];
// 				$website = "http://".$result['website'];
// 				$yelp_url = $result['url'];
// 				$types = $result['types'];	//this is an array!
// 				$price = $result['priceRange'];	//$$$
// 				$addressArray = $result['addressArray'];
// 				$city = "";
// 				$address = "";
// 				if(isset($addressArray['locality'])){
// 					$city = $addressArray['locality'];
// 				}
// 				foreach($addressArray as $key=>$value){
// 					$address .= $value." ";
// 				}
// 				$rating = $result['starRating'];	//float, 4.0
// 				$rating_count = $result['reviewCount'];	//2200
// 				$phone = $result['telephone'];
// 				$geo = $result['geo'];
// 				if(isset($geo["latitude"]) && isset($geo["longitude"])){
// 					$geo = $geo["latitude"].",".$geo["longitude"];
// 				}
// 				$hour = json_encode($result['hours']);	//hours json string

// 				$types = $result['types'];
// 				$types_string = implode(" ",$types);

// 				$pictures = $result['imageUrls'];

// 		    	$event = new Event;
// 		    	$event->name = $name;
// 		    	$event->city = $city;
// 		    	$event->location = $geo;
// 		    	$event->address = $address;
// 		    	$event->phone = $phone;
// 		    	$event->website = $website;
// 		    	$event->price = $price;
// 		    	$event->homepage = 1;
// 		    	$event->recommend = 1;
// 		    	$event->yelp_category = $types_string;
// 		    	$event->category_id = Category::model()->getCategoryIdByString($types_string);
// 		    	$event->description = "";
// 		    	$event->hours_json = $hour;
// 		    	$event->rating = $rating;
// 		    	$event->rating_count = $rating_count;
// 		    	$event->yelp_url = $yelp_url;
// 		    	$event->create_time = time();
// 		    	$event->save(false);

// 				foreach($pictures as $pic){
// 					if($pic_counter >= 15){
// 						break; 	//we no longer need more pictures
// 					}
// 					$url = $pic['imageStandardResolutionUrl'];
// 					$result = GoogleVision::start($term, $url, 0.8);
// 					if($result){
// 						$pic_counter++;
// 						// save event pic here.
// 				    	$eventPic = new EventPic;
// 				    	$eventPic->event_id = $event->id;
// 				    	$eventPic->path = $url;
// 				    	$eventPic->description = "";
// 				    	$eventPic->save(false);
// 					}
// 				}

// 				if(!$pic_counter){
// 					$event->recommend = 1;
// 					$event->homepage = 0;
// 					$event->save(false);
// 				}

// 			}
// 			fclose($handle);
// 		}else{
// 			echo "error opening the file.";
// 		}

// 		//delete the first line
// 		$contents = file($filename, FILE_IGNORE_NEW_LINES);
// 		$first_line = array_shift($contents);
// 		file_put_contents($filename, implode("\r\n", $contents));

// 		echo 200;

// 	}




// 	// public function actionParseTxt(){

// 	// 	$result = array();
// 	// 	$handle = fopen("/var/www/html/webapp/30to60-2.txt", "r");
// 	// 	if ($handle) {
// 	// 	    while (($line = fgets($handle)) !== false) {
// 	// 	    	$line = explode("|", $line);
// 	// 	    	$name = $line[0];
// 	// 	    	$city = $line[1];
// 	// 	    	$geo = $line[2];
// 	// 	    	$address = $line[3];
// 	// 	    	if(isset($line[4])){
// 	// 	    		$phone = $line[4];
// 	// 	    	}else{
// 	// 	    		$phone = "";
// 	// 	    	}
// 	// 	    	if(isset($line[5])){
// 	// 	    		$web = $line[5];
// 	// 	    	}else{
// 	// 	    		$web = "";
// 	// 	    	}
// 	// 	    	$photo = array();

// 	// 	    	if(!isset($line[6])){
// 	// 	    		echo $name;
// 	// 	    		exit();
// 	// 	    	}

// 	// 	    	$photo[] = $line[6];

// 	// 	    	$photo[] = $line[7];
// 	// 	    	if(isset($line[8])){
// 	// 	    		$photo[] = $line[8];
// 	// 	    	}
// 	// 	    	if(isset($line[9])){
// 	// 	    		$photo[] = $line[9];
// 	// 	    	}

// 	// 	    	$event = new Event;
// 	// 	    	$event->name = $name;
// 	// 	    	$event->city = $city;
// 	// 	    	$event->location = $geo;
// 	// 	    	$event->address = $address;
// 	// 	    	$event->phone = $phone;
// 	// 	    	$event->website = $web;
// 	// 	    	$event->description = "";
// 	// 	    	$event->create_time = time();
// 	// 	    	$event->save(false);

// 	// 	    	foreach($photo as $ph){
// 	// 		    	$eventPic = new EventPic;
// 	// 		    	$eventPic->event_id = $event->id;
// 	// 		    	$eventPic->path = $ph;
// 	// 		    	$eventPic->description = "";
// 	// 		    	$eventPic->save(false);
// 	// 	    	}

// 	// 	    }
// 	// 	    fclose($handle);
// 	// 	} else {
// 	// 	    // error opening the file.
// 	// 	} 

// 	// }


// 	public function actionDeleteDupPics(){

//         $lists = Yii::app()->db->createCommand('select count(*) as count, event_id, id, path from tbl_event_pic group by path, event_id having count > 1 order by count DESC')->queryAll();
//         foreach($lists as $list){
//         	$dups = EventPic::model()->findAll('path = :path AND event_id = :eid AND id != :id', array(":path"=>$list['path'], ":eid"=>$list['event_id'], ":id"=>$list['id']));
//         	foreach($dups as $dp){
//         		$dp->delete();
//         	}
//         }
//         echo 200;
// 	}


// 	//send text message if you did not respond after 20 minutes 
// 	public function actionSendTextMessageQueue(){
//         //prevent anyone else from using our cron
//         if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
//             throw new CHttpException(404, "The requested link does not exist.");
//         }


// 		set_time_limit(0);
//        	spl_autoload_unregister(array('YiiBase', 'autoload'));
//         require_once '/var/www/html/webapp/protected/extensions/twilio/Services/Twilio.php';
//         spl_autoload_register(array('YiiBase', 'autoload'));

//         $sid = "AC619e2e0259cedfa2be0cce4aef50bd57"; // Your Account SID from www.twilio.com/user/account
//         $token = "b8eeb3138dbde40f096c47d62eb36a14"; // Your Auth Token from www.twilio.com/user/account

//         $lists = Yii::app()->db->createCommand('select * from tbl_requests where trash = 0 AND status = 0 AND msg = 0 AND receiver_read = 0 AND unix_timestamp() - create_time > 20 * 60')->queryAll();
        
//         foreach($lists as $entry):

//         	$user = Users::model()->findByPk($entry['receiver']);

//         	if(!$user || $user->lastaction > $entry['create_time']){
//         		continue;
//         	}

//         	$friend = Users::model()->findByPk($entry['sender']);

// 			try{
// 					$time_word = "Now";

// 					if($entry['time_word']){
// 						$time_word = $entry['time_word'];
// 					}

// 					$activity = strtolower($entry['activity']);
// 					if(!$activity){
// 						$activity = "hang out";
// 					}

// 					if($entry['super'] == 0){
// 						$friend_name = "Someone";
// 					}else{
// 						$friend_name = $friend->username;
// 					}

// 					$title = $friend_name." wants to ".$activity." with you ".$time_word."! Open Timi🍙 and swipe right to respond! <http://gettimi.com>";			

// 					$client = new Services_Twilio($sid, $token);

// 			        $message = $client->account->messages->sendMessage(
// 			                 '+13472208626', // From a valid Twilio number
// 			                  '+'.$user->phone, // Text this number
// 			                  $title
// 			        );
// 			}catch (Exception $e) {

// 			}

//         	$request = Requests::model()->findByPk($entry['id']);
// 			$request->msg = 1;
// 			$request->save(false);

//         endforeach;
//     	echo 200;
// 	}


// 	//Call this every 30 minutes? 1 hour?
// 	public function actionPushNotificationQueue(){
//         //prevent anyone else from using our cron
//         if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
//             throw new CHttpException(404, "The requested link does not exist.");
//         }

//         $lists = Yii::app()->db->createCommand('select id, sender, receiver, count(*) as count, request_day, request_time, activity, time_word from tbl_requests where trash = 0 AND pushed = 0 AND status = 0 AND super = 0 group by receiver')->queryAll();

//         foreach($lists as $entry):
// 			//super likes have been pushed alerady, we only push regular likes here...
// 				$count = $entry['count'];
// 				if(!$count){
// 					$count = 1;	//just in case
// 				}

// 				$time_word = "Now";

// 				if($entry['time_word']){
// 					$time_word = $entry['time_word'];
// 				}

// 				$user = Users::model()->findByPk($entry['sender']);	//the real sender
// 				$type = 2;
// 				$friend_word = "friend wants";
// 				if($count > 1){
// 					$friend_word = "friends want";
// 				}

// 				$activity = strtolower($entry['activity']);
// 				if(!$activity){
// 					$activity = "hang out";
// 				}

// 				$title = $count." ".$friend_word." to ".$activity." with you ".$time_word."! Open Timi and swipe right to see who!";
// 				$data = array(
// 					'title'=>$title,
// 					'type'=>$type,
// 					'user_id'=>$entry['receiver'],	//the receiver of the notification + request
// 					'username'=>$user->username,
// 					'avatar'=>$user->avatar,
// 					'email'=>$user->email,
// 					'phone'=>$user->phone,
// 					'day'=>$entry['request_day'],
// 					'time'=>$entry['request_time'],
// 				);
// 				$user->sendNotification($data);

// 				$request = Requests::model()->findByPk($entry['id']);
// 				$request->pushed = 1;
// 				$request->save(false);

// 		endforeach;
// 		echo 200;
// 	}




// 	public function actionDailyPush(){

// 		exit();

//         //prevent anyone else from using our cron
//         if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
//             throw new CHttpException(404, "The requested link does not exist.");
//         }

// 		$notifs = DeviceToken::model()->findAll('user_id >= 900');
// 		foreach($notifs as $notif){

// 			$user = Users::model()->findByPk($notif->user_id);
// 			// if($user && $user->lastaction > time() - 86400 * 2){	//active in the last 2 days, do not push
// 			// 	continue;
// 			// }

// 			if ($notif && $notif->token) {
// 				$data["user_id"] = $notif->user_id;
// 				// $array = array(
// 				// 	"Lunch time, dinner time, this time, that time, Timi time!",
// 				// 	"Summer is the best. Waking up late & more time to chill with friends on Timi!",
// 				// 	"I love summer, I love music, I love food & I love Timi!",
// 				// 	"A true friend is someone who swipes right for you on Timi!",
// 				// 	"God made us best friends because I swiped right for you on Timi",
// 				// 	"My dinner stomach is full, but my dessert stomach still has room.",
// 				// 	"You don't really truly know someone until you get ridiculously drunk with them.",
// 				// 	"Food is my favorite. If I ever share it with you, then you're pretty damn special.",
// 				// 	"Need Love...? Let's get on Timi and find some!",
// 				// );
// 				//$random = rand(0, 9);
// 				$result = "Don't think, Just go. An awesome dinner awaits!";
// 				$data["title"] = $result;
// 				$data["token"] = $notif->token;
// 				$data["unread"] = 1;
// 				$data["type"] = 5;				// is to homepage

// 				if($notif->device == "iOS"){
// 			 		$url = Yii::app()->params['globalURL'].'/simplepush/iospush.php?'.http_build_query($data);
// 			 	}else{	//android
// 			 		$url = Yii::app()->params['globalURL'].'/simplepush/androidpush.php?'.http_build_query($data);
// 			 	}

// 				$ch  = curl_init();
// 				curl_setopt($ch, CURLOPT_URL, $url);
// 				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //this prevent printing the 200json code
// 				curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1); //timeout 1s
// 				curl_setopt($ch, CURLOPT_TIMEOUT, 1); //timeout 1s
// 				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// 				$result = curl_exec($ch);
// 				curl_close($ch);
// 			}
// 		}
// 		echo 200;
// 	}


// 	//trash request after an hour -> for NOW request (2 hours trash)
// 	public function actionTrashNowRequest(){
//         //prevent anyone else from using our cron
//         if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
//             throw new CHttpException(404, "The requested link does not exist.");
//         }
//         $requests = Requests::model()->findAll('UNIX_TIMESTAMP() - create_time > 3600 * 6 AND request_time = 3 AND trash = 0');
//         foreach($requests as $request):
//         	$request->trash = 1;
//         	$request->save(false);
//         endforeach;
//         echo 200;
// 	}


// 	//trash the request from 3-4 days ago.  THIS IS SUPER IMPORTANT.	
// 	public function actionTrashRequest(){
//         //prevent anyone else from using our cron
//         if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
//             throw new CHttpException(404, "The requested link does not exist.");
//         }

// 		date_default_timezone_set("America/New_York");	//set it to NEW YORK FOR NOW
// 		$timestamp = time();
// 		$jd_day = cal_to_jd(CAL_GREGORIAN,date("m"),date("d"),date("Y"));
// 		$day = (jddayofweek($jd_day,0));
// 		if($day == 0){
// 			$request = Requests::model()->findAll('(request_day = 4 OR request_day = 5) AND trash = 0');
// 			foreach($request as $rq){
// 				$rq->trash = 1;
// 				$rq->save(false);
// 			}	
// 		}
// 		if($day == 1){
// 			$request = Requests::model()->findAll('(request_day = 5 OR request_day = 6) AND trash = 0');
// 			foreach($request as $rq){
// 				$rq->trash = 1;
// 				$rq->save(false);
// 			}	
// 		}
// 		if($day == 2){
// 			$request = Requests::model()->findAll('(request_day = 6 OR request_day = 0) AND trash = 0');
// 			foreach($request as $rq){
// 				$rq->trash = 1;
// 				$rq->save(false);
// 			}	
// 		}
// 		if($day == 3){
// 			$request = Requests::model()->findAll('(request_day = 0 OR request_day = 1) AND trash = 0');
// 			foreach($request as $rq){
// 				$rq->trash = 1;
// 				$rq->save(false);
// 			}	
// 		}
// 		if($day == 4){
// 			$request = Requests::model()->findAll('(request_day = 1 OR request_day = 2) AND trash = 0');
// 			foreach($request as $rq){
// 				$rq->trash = 1;
// 				$rq->save(false);
// 			}	
// 		}
// 		if($day == 5){
// 			$request = Requests::model()->findAll('(request_day = 2 OR request_day = 3) AND trash = 0');
// 			foreach($request as $rq){
// 				$rq->trash = 1;
// 				$rq->save(false);
// 			}	
// 		}
// 		if($day == 6){
// 			$request = Requests::model()->findAll('(request_day = 3 OR request_day = 4) AND trash = 0');	
// 			foreach($request as $rq){
// 				$rq->trash = 1;
// 				$rq->save(false);
// 			}		
// 		}
// 		echo 200;
// 	}

// /*
// 	public function actionRemindComeback(){

// 		set_time_limit(0);
//        	spl_autoload_unregister(array('YiiBase', 'autoload'));
//         require_once '/var/www/html/webapp/protected/extensions/twilio/Services/Twilio.php';
//         spl_autoload_register(array('YiiBase', 'autoload'));

//         $sid = "AC619e2e0259cedfa2be0cce4aef50bd57"; // Your Account SID from www.twilio.com/user/account
//         $token = "b8eeb3138dbde40f096c47d62eb36a14"; // Your Auth Token from www.twilio.com/user/account

//         $lists = Yii::app()->db->createCommand("select id from tbl_users where lastaction < unix_timestamp() - 86400 * 7 and phone != ''")->queryAll();
//         $count = 0;

//         foreach($lists as $entry){
//         	$user = Users::model()->findByPk($entry['id']);

//         	$friends = Friends::model()->findAll('sender = :uid OR receiver = :uid', array(":uid"=>$user->id));

//         	if(!$friends){
//         		continue;
//         	}

//         	$friends_count = count($friends) + 10;

//         	$friend_array = array();
// 			$friend_string = "";

//         	foreach($friends as $friend){
//         		if($friend->sender == $user->id){
//         			$other = $friend->receiver;
//         		}else{
//         			$other = $friend->sender;
//         		}
// 				if (!in_array($other, $friend_array)){
// 					array_push($friend_array, $other);
// 				}
//         	}

// 			//only output max to 3 examples...
// 			if(count($friend_array) > 3){
// 				$friend_array = array_slice($friend_array, 0, 3, true); 
// 			}


// 			foreach($friend_array as $fa){
// 				$friend_obj = Users::model()->findByPk($fa);
// 				$friend_string .= $friend_obj->username.", ";
// 			}
// 			$friend_string = substr($friend_string, 0, -2);
// 			//$friend_string .= ".";

// 			try{
// 			        $client = new Services_Twilio($sid, $token);
// 			        $message = $client->account->messages->sendMessage(
// 			                 '+13472208626', // From a valid Twilio number
// 			                  '+'.$user->phone, // Text this number
// 			                  "Hi! 🍻🍻".$friends_count." friends of yours(e.g., ".$friend_string.") are using 🍙Timi! Use Timi to hang out with your friends and their friends NOW! No more texting around or feeling awkward to initiate/reject an invitation! 🍙Timi: Gettimi.com <http://gettimi.com>. You will ❤️ it!"
// 			        );

// 			        $count++;

// 			}catch (Exception $e) {

// 			}

//         }
//         echo $count."sent";
// 	}
// */

// /*
// 	public function actionTestDisplay(){

// 		set_time_limit(0);

//         spl_autoload_unregister(array('YiiBase', 'autoload'));
//         require_once '/var/www/html/webapp/protected/extensions/twilio/Services/Twilio.php';
//         spl_autoload_register(array('YiiBase', 'autoload'));

//         $sid = "AC619e2e0259cedfa2be0cce4aef50bd57"; // Your Account SID from www.twilio.com/user/account
//         $token = "b8eeb3138dbde40f096c47d62eb36a14"; // Your Auth Token from www.twilio.com/user/account

// 		$lists = Yii::app()->db->createCommand("select name, number1, count(*) as count from tbl_phone_contacts where number1 not like '%861%' and number1 not like '10%' and number1 not like '150%' and number1 not like '135%' and number1 not like '1860%' and number1 not like '151%' and name not like '%taxi%' and name not like '%apple%' and name not like '%colum%' and number1 not like '0%' and name not like '%class%' and name not like '%police%' and name not like '%service%' and name not like '%campus%' and name not like '%school%' and name not like '%dad%' and name not like '%mom%' and name not like '%US%' and name not like '%ETS%' and name not like '%mergency%' and name not like '%hospital%' and name not like '%NYC%' and name not like '%chase%' and name not like '%bank%' and name not like '%NYC%' and name not like '%prof%' and name not like '%customer%' and name not like '%at&t%' and name not like '%att%' and name not like '%office%' and name not like '%PD%' and name not like '%cab%' and name not like '%rest%' and name not like '%help%' and name not like '%one%' and CHAR_LENGTH(number1) = 11 and CHAR_LENGTH(name) > 2 and name regexp '^[A-Za-z]' group by number1 having count >= 2 order by count desc")->queryAll();
// 		$count = 0;

// 		$lists = array_slice($lists, 966); 

// 		foreach($lists as $entry):
// 			$user = Users::model()->findByAttributes(array('phone'=>$entry['number1']));
// 			if($user){
// 				continue;
// 			}else{
// 				$friends = PhoneContacts::model()->findAllByAttributes(array('number1'=>$entry['number1']));
// 				$friend_array = array();
// 				$friend_string = "";

// 				foreach($friends as $friend){
// 					if (!in_array($friend->user_id, $friend_array)){
// 						array_push($friend_array, $friend->user_id);
// 					}
// 				}

// 				//only output max to 3 examples...
// 				if(count($friend_array) > 3){
// 					$friend_array = array_slice($friend_array, 0, 3, true); 
// 				}

// 				//give you a random number....
// 				$count_friend = rand(12,29);

// 				foreach($friend_array as $fa){
// 					$user = Users::model()->findByPk($fa);
// 					if($user){
// 						$friend_string .= $user->username.", ";
// 					}
// 				}
// 				$friend_string = substr($friend_string, 0, -2);
// 				//$friend_string .= ".";

// 				//put this back for test...
// 				//$entry['number1'] = "12126410987";

// 				try{

// 			        $client = new Services_Twilio($sid, $token);
// 			        $message = $client->account->messages->sendMessage(
// 			                 '+13472208626', // From a valid Twilio number
// 			                  '+'.$entry['number1'], // Text this number
// 			                  "Hi! 🍻🍻".$count_friend." friends of yours(e.g., ".$friend_string.") just joined 🍙Timi! At Timi, you can easily hang out with friends and their friends. No more texting around or feeling awkward to initiate/reject an invitation! Try out 🍙Timi at: Gettimi.com <http://gettimi.com>. You will ❤️ it!"
// 			        );
// 					$count++;

// 				}catch (Exception $e) {

// 				}

// 				//put this back for test..
// 				//exit();
// 			}
// 		endforeach;
// 		echo $count." sent";
// 	}
// */

// 	//do not use this function for now we curertly pass all free slots

// 	/*
// 	public function actionUpdateTimeSlot(){
//         //prevent anyone else from using our cron
//         if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
//             throw new CHttpException(404, "The requested link does not exist.");
//         }

// 		date_default_timezone_set("America/New_York");	//set it to NEW YORK FOR NOW
// 		$timestamp = time();
// 		$noon_expire = strtotime('3pm', $timestamp);
// 		$evening_expire = strtotime('9pm', $timestamp);
// 		$night_expire = strtotime('11pm', $timestamp) + 4 * 3600;

// 		$jd_day = cal_to_jd(CAL_GREGORIAN,date("m"),date("d"),date("Y"));
// 		$day = (jddayofweek($jd_day,0)); 

// 		if(time() > $night_expire){	//update night slots
// 			$slots = Yii::app()->db->createCommand("select * from tbl_free_time_slot 
// where matched = 0 AND slot = 2 AND day = ".$day)->queryAll();
// 		}else if(time() > $evening_expire){	//update evening slots
// 			$slots = Yii::app()->db->createCommand("select * from tbl_free_time_slot 
// where matched = 0 AND slot = 1 AND day = ".$day)->queryAll();
// 		}else if(time() > $noon_expire){	//update noon slots
// 			$slots = Yii::app()->db->createCommand("select * from tbl_free_time_slot 
// where matched = 0 AND slot = 0 AND day = ".$day)->queryAll();
// 		}else{
// 			echo 200;
// 			exit();	//not a time to call
// 		}

//         foreach($slots as $entry):
//         	$slot = FreeTimeSlot::model()->findByPk($entry['id']);
//         	$slot->matched = 2;	//2 stands for an overdue, 1 for a success match
//         	$slot->save(false);
// 		endforeach;

// 		echo 200;
// 	}

// 	//do not use this function for now
// 	public function actionResetTimeSlot(){
//         //prevent anyone else from using our cron
//         if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
//            throw new CHttpException(404, "The requested link does not exist.");
//         }

// 		date_default_timezone_set("America/New_York");	//set it to NEW YORK FOR NOW
// 		$timestamp = time();
// 		$night_expire = strtotime('11pm', $timestamp) + 4 * 3600;
// 		if(time() > $night_expire){	//reset 
// 			$rows_affected = Yii::app()->db->createCommand("update tbl_free_time_slot set matched = 0")->execute();
// 		}

// 		echo 200;
// 	}
// 	*/


 
// 	// Uncomment the following methods and override them if needed
// 	/*
// 	public function filters()
// 	{
// 		// return the filter configuration for this controller, e.g.:
// 		return array(
// 			'inlineFilterName',
// 			array(
// 				'class'=>'path.to.FilterClass',
// 				'propertyName'=>'propertyValue',
// 			),
// 		);
// 	}

// 	public function actions()
// 	{
// 		// return external action classes, e.g.:
// 		return array(
// 			'action1'=>'path.to.ActionClass',
// 			'action2'=>array(
// 				'class'=>'path.to.AnotherActionClass',
// 				'propertyName'=>'propertyValue',
// 			),
// 		);
// 	}
// 	*/
// }