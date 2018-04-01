<?php

class SiteController extends Controller
{

    public $layout = 'iost';
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}


	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		if(isset($_POST['email']))
		{
                //for subscription
                $model=new WhitelistUsers;

				$model->email=$_POST['email'];
				// $name='=?UTF-8?B?'.base64_encode($model->name).'?=';
				// $subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
				// $headers="From: $name <{$model->email}>\r\n".
				// 	"Reply-To: {$model->email}\r\n".
				// 	"MIME-Version: 1.0\r\n".
				// 	"Content-Type: text/plain; charset=UTF-8";

				// mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);
				$model->create_time = time();
				//status = 1 means active... too lazy to define it in the model, sorry.
				$model->status = 1;
				//validate the model first
				if($model->validate()){
					$model->save(false);
					$model->userActed();
					Yii::app()->user->setFlash('subscribe','Thank you for your subscription. Stay tuned for more updates!');

					// $message = new YiiMailMessage;
					// $message->view = 'registrationFollowup';
					 
					// //userModel is passed to the view
					// $message->setBody(array('userModel'=>$model), 'text/html');
					// $message->addTo($model->email);
					// $message->from = "system@iost.io";
					// Yii::app()->mail->send($message);

				//email has been used
				}else if(WhitelistUsers::model()->findByAttributes(array('email'=>$model->email))){
					Yii::app()->user->setFlash('subscribe','You already have an active subscription. Thank you for your support.');
				//other validation errors (only possibility = wrong email address)
				}else{
					Yii::app()->user->setFlash('subscribe','This email address is invalid. Please try again.');
				}
		}

		$this->render('ios_index', array('active' => 'home'));
	}

    public function actionTeam()
    {
        $this->render('ios_team', array('active' => 'team'));
    }

    public function actionTech()
    {
    	$this->render('ios_tech', array('active' => 'tech'));
    }

    public function actionResource()
    {
    	$this->render('ios_resource', array('active' => 'resource'));
    }

    public function actionCommunity()
    {
    	$this->render('ios_community', array('active' => 'community'));
    }

    public function actionCareer()
    {
    	$this->render('ios_career', array('active' => 'career'));
    }

	// public function sendJSONResponse($arr) {
	// 	if (!isset($_GET['callback'])) {
	// 		echo "no callback from jsonp";
	// 		exit();
	// 	}
	// 	header('content-type: application/json; charset=utf-8');
	// 	echo $_GET['callback'] . '(' . json_encode($arr) . ')';
	// }



	// public function sendJSONPost($arr) {
	// 	header('content-type: application/json; charset=utf-8');
	// 	echo json_encode($arr);
	// }



	// public function actionDownloadios(){
	// 	echo "<h1 style='font-size:35px; font-weight:300; padding:25px; line-height:80px;'>If you did not get redirected to App Store, please open this page in Safari/Chrome and try again!</h1>";
	// 	echo "<script>setTimeout(function () {	location.href = 'https://itunes.apple.com/us/app/timi-easiest-way-to-find-out/id1111783063?mt=8';}, 10);</script>";
	// }

	// public function actionDownloadAndroid(){
	// 	echo "<h1 style='font-size:35px; font-weight:300; padding:25px; line-height:80px;'>If you did not get redirected to Google Play, please open this page in Safari/Chrome and try again!</h1>";
	// 	echo "<script>setTimeout(function () {	location.href = 'https://play.google.com/store/apps/details?id=io.cordova.timi&hl=en';}, 10);</script>";
	// }

	// public function actionRestaurant($id){
	// 	date_default_timezone_set("America/New_York");	//set it to NEW YORK FOR NOW
	// 	$this->layout = 'restaurant';
	// 	$event = Event::model()->findByPk($id);
	// 	$this->pageTitle = $event->name." - Restaurants in ".$event->city." - Timi";
	// 	if(!$event){
	// 		throw new CHttpException(404, "The requested link does not exist.");
	// 	}
	// 	$pictures = EventPic::model()->findAllByAttributes(array('event_id'=>$event->id));
	// 	$this->render('restaurant', array('event'=>$event, 'pictures'=>$pictures));
	// }


	// public function actionDeletePicById(){
	// 	if(!isset($_GET['user_token'])){
	// 		$this->sendJSONResponse(array(
	// 			'error'=>'no user token'
	// 		));
	// 		exit();
	// 	}else{
	// 		$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
	// 		if(!$user || ($user->id != 23 && $user->id != 49)){
	// 			$this->sendJSONResponse(array(
	// 				'error'=>'invalid user token'
	// 			));
	// 			exit();	
	// 		}
	// 	}
	// 	if(isset($_GET['pid'])){
	// 	    $picture = EventPic::model()->findByPk($_GET['pid']);
	// 	    if($picture){
	// 	    	$picture->delete();
	// 	    }		
	// 	}
	// 	echo 200;
	// }




	// /*
	// *	Handles regular sign up for timi
	// */
	// public function actionSignup(){
	// 	if(!isset($_GET['name']) || !isset($_GET['email']) || !isset($_GET['password'])){
	// 		$this->sendJSONResponse(array(
	// 			'error'=>'no name or email or password'
	// 		));
	// 		exit();
	// 	}
	// 	$user = Users::model()->findByAttributes(array('email'=>$_GET['email']));
	// 	if($user){
	// 		$this->sendJSONResponse(array(
	// 			'error'=>'user with the same email exists'
	// 		));
	// 		exit();		
	// 	}else{
	// 		$user = new Users;
	// 		$user->username = $_GET['name'];
	// 		$user->email = $_GET['email'];
	// 		$user->password = hash('sha256', $_GET['password']);
	// 		$user->user_token = md5(time() . $user->password);
	// 		$user->social_token_type = 0;	//regular
	// 		$user->create_time = time();
	// 		$user->status = 1;
	// 		$user->avatar = "";
	// 		$user->save(false);
	// 	}
	// 	$user->userActed();
	// 	if($user->phone){
	// 		$this->sendJSONResponse(array(
	// 			'user_token' => $user->user_token,
	// 			'phone'=>$user->phone,
	// 		));
	// 	}else{
	// 		$this->sendJSONResponse(array(
	// 			'user_token' => $user->user_token,
	// 			'phone'=>false,
	// 		));
	// 	}
	// }


	// /*
	// *	Handles regular sign up for beforeTaxi
	// */
	// public function actionSignupTaxi(){
	// 	if(!isset($_GET['name']) || !isset($_GET['email']) || !isset($_GET['password'])){
	// 		$this->sendJSONResponse(array(
	// 			'error'=>'no name or email or password'
	// 		));
	// 		exit();
	// 	}
	// 	$user = TaxiUsers::model()->findByAttributes(array('email'=>$_GET['email']));
	// 	if($user){
	// 		$this->sendJSONResponse(array(
	// 			'error'=>'user with the same email exists'
	// 		));
	// 		exit();		
	// 	}else{
	// 		$user = new TaxiUsers;
	// 		$user->username = $_GET['name'];
	// 		$user->email = $_GET['email'];
	// 		$user->password = hash('sha256', $_GET['password']);
	// 		$user->user_token = md5(time() . $user->password);
	// 		$user->social_token_type = 0;	//regular
	// 		$user->create_time = time();
	// 		$user->status = 1;
	// 		$user->avatar = "";
	// 		$user->save(false);
	// 	}
	// 	$user->userActed();
	// 	if($user->phone){
	// 		$this->sendJSONResponse(array(
	// 			'user_token' => $user->user_token,
	// 			'phone'=>$user->phone,
	// 		));
	// 	}else{
	// 		$this->sendJSONResponse(array(
	// 			'user_token' => $user->user_token,
	// 			'phone'=>false,
	// 		));
	// 	}
	// }

	// /*
	// *	Handles regular login
	// */
	// public function actionLogin(){

	// 	if(isset($_GET['email']) && isset($_GET['password'])){
	// 		$user=Users::model()->findByAttributes(array('email'=>$_GET['email']));
	// 		if($user){
	// 			if(hash('sha256', $_GET['password']) === $user->password){
					
	// 				$user->userActed();

	// 				if($user->phone){
	// 					$this->sendJSONResponse(array(
	// 						'user_token' => $user->user_token,
	// 						'phone'=>$user->phone,
	// 					));
	// 				}else{
	// 					$this->sendJSONResponse(array(
	// 						'user_token' => $user->user_token,
	// 						'phone'=>false,
	// 					));
	// 				}
	// 			}else{
	// 				$this->sendJSONResponse(array(
	// 					'error'=>'incorrect password',
	// 				));
	// 			}
	// 		}else{
	// 			$this->sendJSONResponse(array(
	// 				'error'=>'incorrect email address',
	// 			));
	// 		}
	// 	}else{
	// 		$this->sendJSONResponse(array(
	// 			'error'=>'no email or password',
	// 		));
	// 	}

	// }


	// /*
	// *	Handles facebook login + sign up
	// */
	// public function actionFacebookLogin(){

	// 	header('Access-Control-Allow-Origin: *');
	// 	header('Access-Control-Allow-Methods: POST');
	// 	header('Access-Control-Max-Age: 1000');
		
	// 	if(!isset($_POST['selfData'])){
	// 		$this->sendJSONPost(array(
	// 			'error'=>'no selfData'
	// 		));
	// 		exit();
	// 	}

	// 	$json = $_POST['selfData'];
	// 	$array = json_decode($json, true);

	// 	$fbID = $array['userId'];
	// 	$social_token = $array['accessToken'];
	// 	$email = $array['email'];
	// 	$name = $array['name'];

	// 	if(isset($array['friends']) || isset($array['friends']['data'])){
	// 		if(isset($array['friends'])){
	// 			$friends = $array['friends'];	//friends array
	// 		}else{
	// 			$friends = $array['friends']['data'];	//friends array
	// 		}
	// 	}else{
	// 		$friends = null;
	// 	}

	// 	$avatar = "https://graph.facebook.com/".$fbID."/picture?type=large&redirect=true&width=1024";

	// 	$user = Users::model()->findByAttributes(array('social_id'=>$fbID));
	// 	if(!$user){
	// 		$user = new Users;
	// 		$user->username = $name;
	// 		$user->social_id = $fbID;
	// 		$user->social_token = $social_token;
	// 		$user->user_token = md5(time() . $social_token);
	// 		$user->social_token_type = 1;	//facebook
	// 		$user->email = $email;
	// 		$user->create_time = time();
	// 		$user->status = 1;
	// 		$user->avatar = $avatar;
	// 		$user->save();
	// 	}else{
	// 		$user->social_token = $social_token;
	// 		$user->save();
	// 	}

	// 	try{
	// 		if($friends){
	// 			$user->updateFriendsViaFB($friends);
	// 		}
	// 		$user->userActed();
	// 		$user->saveFacebookProfilePicture();
	// 	}catch(Exception $e){

	// 	}

	// 	if($user->phone){
	// 		$this->sendJSONPost(array(
	// 			'user_token' => $user->user_token,
	// 			'phone'=>$user->phone,
	// 		));
	// 	}else{
	// 		$this->sendJSONPost(array(
	// 			'user_token' => $user->user_token,
	// 			'phone'=>false,
	// 		));
	// 	}
	// }



// 	public function actionUpdateFBfriends(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$json = $_GET['friends'];
// 		$array = json_decode($json, true);

// 		if(isset($array['friends']) || isset($array['friends']['data'])){
// 			if(isset($array['friends'])){
// 				$friends = $array['friends'];	//friends array
// 			}else{
// 				$friends = $array['friends']['data'];	//friends array
// 			}
// 		}else{
// 			$friends = null;
// 		}

// 		try{
// 			if($friends){
// 				$user->updateFriendsViaFB($friends);
// 			}
// 			$user->userActed();
// 		}catch(Exception $e){

// 		}
// 	}


// 	/*
// 	* Add friends by using phone number
// 	*/
// 	public function actionAddfriends(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(isset($_GET['number'])){
// 			$number = $this->cleanPhoneNumber($_GET['number']);
// 			$friend = Users::model()->findByAttributes(array('phone'=>$number));
// 			if($friend){
// 				if($friend->id == $user->id){
// 					$this->sendJSONResponse(array(
// 						'error'=>'You can not add yourself!'
// 						));
// 					exit();	
// 				}
// 				$friends = Friends::model()->find('accept = 1 AND ((sender = :uid AND receiver = :myid) OR (sender = :myid AND receiver = :uid))',array(':uid'=>$friend->id, ':myid'=>$user->id));
// 					if(!$friends){
// 						$friends = new Friends;
// 						$friends->sender = $user->id;
// 						$friends->receiver = $friend->id;
// 						$friends->create_time = time();
// 						$friends->save(false);
// 						$this->sendJSONResponse(array(
// 							'success'=>'Added!'
// 						));
// 					}else{
// 						$this->sendJSONResponse(array(
// 							'error'=>'You guys are friends already!'
// 						));
// 						exit();						
// 					}
// 			}else{
// 				$this->sendJSONResponse(array(
// 					'error'=>'Sorry, we can not find the user you are looking for.'
// 				));
// 				exit();	
// 			}
// 		}else{
// 			$this->sendJSONResponse(array(
// 				'error'=>'No number'
// 			));
// 			exit();	
// 		}

// 	}



// 	public function actionTakeDeviceToken(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		DeviceToken::model()->addNewToken($user->id);
// 		$this->sendJSONResponse(array(
// 			'success' => 'success',
// 		));		

// 	}

// 	/*
// 	*	Save contact list friends
// 	*/
// 	public function actionTakePhoneContact(){

// 		header('Access-Control-Allow-Origin: *');
// 		header('Access-Control-Allow-Methods: POST');
// 		header('Access-Control-Max-Age: 1000');

// 		if(!isset($_POST['user_token'])){
// 			$this->sendJSONPost(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_POST['user_token']));
// 			if(!$user){
// 				$this->sendJSONPost(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}	

// 		$user->lastaction = time();
// 		$user->save();

// 		if(!isset($_POST['list'])){
// 			$this->sendJSONPost(array(
// 				'error'=>'no list'
// 			));
// 			exit();
// 		}
// 		$array = json_decode($_POST['list'], true);

// 		if($array):
// 			foreach($array as $arr):
// 				if(!$arr['name']){
// 					continue;
// 				}
// 				$contact = PhoneContacts::model()->findByAttributes(array('user_id'=>$user->id, 'name'=>$arr['name']));
// 				$exist = null;
// 				if(!$contact){
// 					$contact = new PhoneContacts;
// 					$contact->user_id = $user->id;
// 					$contact->name = $arr['name'];
// 					if(isset($arr['email'])){
// 						if(isset($arr['email'][0])){
// 							$contact->email = $arr['email'][0];
// 						}
// 					}
// 					if(isset($arr['number'][0])){
// 						$contact->number1 = $this->cleanPhoneNumber($arr['number'][0]);
// 						$exist = Users::model()->findByAttributes(array('phone'=>$contact->number1));
// 					}else{
// 						continue;
// 					}

// 					if(isset($arr['number'][1])){
// 						$contact->number2 = $this->cleanPhoneNumber($arr['number'][1]);
// 						if(!$exist){
// 							$exist = Users::model()->findByAttributes(array('phone'=>$contact->number2));
// 						}
// 					}
// 					if(isset($arr['number'][2])){
// 						$contact->number3 = $this->cleanPhoneNumber($arr['number'][2]);
// 						if(!$exist){
// 							$exist = Users::model()->findByAttributes(array('phone'=>$contact->number3));
// 						}
// 					}
// 					if($exist && !$contact->signed_up){
// 						$friends = Friends::model()->find('accept = 1 AND ((sender = :uid AND receiver = :myid) OR (sender = :myid AND receiver = :uid))',array(':uid'=>$exist->id, ':myid'=>$user->id));
// 						if(!$friends){
// 							$friends = new Friends;
// 							$friends->sender = $user->id;
// 							$friends->receiver = $exist->id;
// 							$friends->create_time = time();
// 							$friends->save(false);
// 						}
// 						$contact->signed_up = 1;	//means your friend signed up already and you added him

// 						//send notification to the your friend and tell them you just joined.
// 						$data = array(
// 							'title'=>'Your friend '.$user->username.' just joined Timi!',
// 							'type'=>1,
// 							'user_id'=>$exist->id,
// 						);
// 						//$user->sendNotification($data);

// 					}
// 					$contact->create_time = time();
// 					$contact->save();
// 				}
// 			endforeach;
// 		endif;

// 		$this->sendJSONPost(array(
// 			'success'=>'updated'
// 		));

// 	}


// 	/*
// 	*	Returns a list of invited friends (based on contact count order)
// 	*/
// 	public function actionReturnFriendsInviteList(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

//         $lists = Yii::app()->db->createCommand('select *, count(*) as count from tbl_phone_contacts where number1 != "" and signed_up = 0 and id in(select id from tbl_phone_contacts where user_id = '.$user->id.') group by number1 order by count desc')->queryAll();
//         $result = array();

//         foreach($lists as $entry){
//             $result[] = array(
//             	'name'=>$entry['name'],
//             	'number1'=>$entry['number1'],
//             	'count'=>$entry['count']
//             );
//         }
// 		$result = json_encode($result);

// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));

// 	}


// 	/*
// 	*	Returns requests in the last 7 days
// 	*/

// 	public function actionReturnRecentRequests(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(!isset($_GET['day'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'invalid day'
// 			));
// 			exit();		
// 		}else{
// 			$day = $_GET['day'];
// 		}

// 		$tomorrow = ($day + 1) % 7;
// 		$day_after = ($day + 2) % 7;

//         $lists = Yii::app()->db->createCommand('select * from tbl_requests where trash = 0 AND (request_day = '.$day.' OR request_day = '.$tomorrow.' OR request_day = '.$day_after.') AND ((receiver = '.$user->id.' AND status != 2) OR (sender = '.$user->id.' AND status = 1)) AND create_time >= unix_timestamp() - 86400 * 4 ORDER BY status ASC')->queryAll(); 
//         $result = array();

//         foreach($lists as $entry){
//         	if($entry['sender'] == $user->id){
//         		$entry['sender'] = $entry['receiver']; //swipe
//         	}
//         	$sender = Users::model()->findByPk($entry['sender']);

// 			$mutual = Users::model()->getMutualFriends($user->id, $sender->id);
// 			$mutual_count = count($mutual);

// 			$distance = 0;
// 			$friendObj = $sender;
// 			if($friendObj){
// 				//get the minimum of either u or ur friend's range, in miles (geo location)
// 				$range = min($user->range, $friendObj->range);
// 			}

// 			$userLocation = array();
// 			$friendLocation = array();

// 			if($user->geolocation && $friendObj->geolocation){
// 				$userLocation = explode(",", $user->geolocation);
// 				$friendLocation = explode(",", $friendObj->geolocation);
// 			}

// 			if(isset($userLocation[0]) && isset($userLocation[1]) && isset($friendLocation[0]) && isset($friendLocation[1])){
// 				//$lat1, $lon1, $lat2, $lon2, $unit, return in miles, "K" return in Kilometers.
// 				$distance = $this->getDistance($userLocation[0], $userLocation[1], $friendLocation[0], $friendLocation[1], "M");
// 				if($distance > $range){
// 					continue;		//have to ignore this long distance friend :(
// 				}
// 			}else{
// 				continue;		//no location.
// 			}

//             $result[] = array(
//             	'sender_id'=>$sender->id,
//             	'username'=>$sender->username,
//             	'distance'=>$distance,
// 				'avatar'=>$sender->avatar,
// 				'favorites'=>$sender->favorites,
// 				'whatsup'=>$sender->whatsup,
// 				'geolocation'=>$sender->geolocation,
// 				'phone'=>$sender->phone,
// 				'mutual'=>$mutual,
// 				'mutual_count'=>$mutual_count,
// 				'current'=>$sender->current,
//             	'request_day'=>$entry['request_day'],
//             	'request_time'=>$entry['request_time'],
//             	'status'=>$entry['status'],	//0 is request, 1 is match, 2 is declined by you
//             	'trashed'=>$entry['trash'],	//trashed means it's not match-able on the server side atm... we will talk about this later
//             	'create_time'=>$entry['create_time'],
//             	'super'=>$entry['super'],	//0 means anonmyous.
//             	'time_word'=>$entry['time_word'],
//             	'activity'=>$entry['activity']
//             );
//         }

// 		$result = json_encode($result);

// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));

// 	}


// 	/*
// 	*	Pass a number, this will invite your friend to join Timi.
// 	*/
// 	public function actionInvitefriends(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(!isset($_GET['number'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no number'
// 			));
// 			exit();
// 		}

// 		$newNumber = $this->cleanPhoneNumber($_GET['number']);

//         spl_autoload_unregister(array('YiiBase', 'autoload'));
//         require_once '/var/www/html/webapp/protected/extensions/twilio/Services/Twilio.php';
//         spl_autoload_register(array('YiiBase', 'autoload'));

//         $sid = "AC619e2e0259cedfa2be0cce4aef50bd57"; // Your Account SID from www.twilio.com/user/account
//         $token = "b8eeb3138dbde40f096c47d62eb36a14"; // Your Auth Token from www.twilio.com/user/account

//         $client = new Services_Twilio($sid, $token);
//         $message = $client->account->messages->sendMessage(
//                  '+13472208626', // From a valid Twilio number
//                   '+'.$newNumber, // Text this number
//                   "Hi, ".$user->username." invited you to Join Timi! At Timi, you can invite your friends to hang out at your fingertips. No more texting around or feeling awkward to initiate/reject an invitation! Check out Timi at: gettimi.com"
//         );

// 		$contact = PhoneContacts::model()->find('number1 = :number OR number2 = :number OR number3 = :number', array(':number'=>$newNumber));
// 		if($contact){
// 			$contact->invited = 1;
// 			if(isset($_GET['from'])){
// 				$contact->from = $_GET['from'];
// 			}
// 			$contact->save(false);
// 		}

// 		$this->sendJSONResponse(array(
// 			'success'=>"sent",
// 		));

// 	}


// 	/*
// 	*	This function sends out a friend request to the other user
// 	*/
// 	public function actionSendFriendRequest(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		$user->lastaction = time();
// 		$user->save();

// 		//means the friendship will be accepted by default.
// 		if(isset($_GET['direct'])){	
// 			$direct = 1;
// 		}else{
// 			$direct = 0;
// 		}

// 		if(!isset($_GET['decision'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no decision'
// 			));
// 			exit();
// 		}

// 		if(!isset($_GET['receiver'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no receiver id'
// 			));
// 			exit();
// 		}

// 		$friendship = Friends::model()->find('((sender = :uid AND receiver = :fid) OR (sender = :fid AND receiver = :uid))', array(":uid"=>$user->id, ":fid"=>$_GET['receiver']));
// 		if($friendship && !$friendship->accept && $friendship->receiver == $user->id){
// 			$friendship->accept = $_GET['decision'];	//either accept or reject -> 1 or 2
// 			$friendship->create_time = time();
// 			$friendship->manual = 1;
// 			$friendship->save();

// 			if($friendship->accept == 1){	//MATCH!

// 				//send notification to the other party and tell them they are matched with you.
// 				$data = array(
// 					'title'=> $user->username. ' just liked you back! You guys have become friends on Timi now.',
// 					'type'=>7,						//7 for friend match
// 					'user_id'=>$_GET['receiver'],
// 					'username'=>$user->username,
// 					'avatar'=>$user->avatar,
// 					'email'=>$user->email,
// 					'phone'=>$user->phone,
// 					'sender_id'=>$user->id,
// 				);
// 				$user->sendNotification($data);
				
// 				if($friendship->receiver == $user->id){
// 					$friendship->sender_read = 0;
// 				}else{
// 					$friendship->receiver_read = 0;
// 				}

// 				$friendship->create_time = time();
// 				$friendship->save(false);

// 				$this->sendJSONResponse(array(
// 					'status'=>"matched",
// 				));
// 				exit();
// 			}
// 		}else if(!$friendship){
// 			$friendship = new Friends;
// 			$friendship->manual = 1;
// 			$friendship->sender = $user->id;
// 			$friendship->receiver = $_GET['receiver'];
// 			//if $_GET['decision'] == 1, accept = 0, otherwise accept = 2
// 			if($_GET['decision'] == 1){		//send invitation
// 				$friendship->accept = 0;

// 				//send notification to the other party and tell them they are matched with you.
// 				$data = array(
// 					'title'=>'Someone nearby wants to add you as a friend. Open Timi and Swipe to find out!',
// 					'type'=>8,						//8 for secret add friend
// 					'user_id'=>$_GET['receiver'],
// 					'username'=>$user->username,
// 					'avatar'=>$user->avatar,
// 					'email'=>$user->email,
// 					'phone'=>$user->phone,
// 					'sender_id'=>$user->id,
// 				);
// 				$user->sendNotification($data);

// 			}else{							//reject directly
// 				$friendship->accept = 2;
// 			}

// 			$friendship->create_time = time();
// 			$friendship->save();
// 		}

// 		$user->points -= 20;
// 		$user->save(false);

// 		$this->sendJSONResponse(array(
// 			'success'=>"sent",
// 		));

// 	}


// 	/*
// 	*	Return unread friend requests
// 	*/
// 	public function actionUnreadFriendRequest(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		$all_requests = Friends::model()->count('accept = 0 AND receiver = :uid', array(":uid"=>$user->id));

// 		$this->sendJSONResponse(array(
// 			'unread'=>$all_requests
// 		));

// 	}


// 	/*
// 	*	This function toggles the record when the user likes the event.
// 	*/
// 	public function actionToggleEventLikes(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(!isset($_GET['event_id'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no event id'
// 			));
// 			exit();
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		$found = EventLikes::model()->findByAttributes(array('user_id'=>$user->id, 'event_id'=>$_GET['event_id']));
// 		if($found){
// 			$found->delete();	//toggle
// 			$event = Event::model()->findByPk($_GET['event_id']);
// 			if($event){
// 				$event->likes--;
// 				$event->save(false);
// 			}
// 		}else{
// 			$ue = new EventLikes;
// 			$ue->user_id = $user->id;
// 			$ue->event_id = $_GET['event_id'];
// 			$ue->create_time = time();
// 			$ue->save(false);
// 			$event = Event::model()->findByPk($_GET['event_id']);
// 			if($event){
// 				$event->likes++;
// 				$event->save(false);
// 			}
// 		}

// 		$this->sendJSONResponse(array(
// 			'success'=>"success"
// 		));

// 	}


// 	/*
// 	*	This function inserst record into table for analytic
// 	*/
// 	public function actionInsertPictureSeen(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(!isset($_GET['event_pic_id'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no event pic id'
// 			));
// 			exit();
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		$found = UserEventPicSeen::model()->findByAttributes(array('user_id'=>$user->id, 'event_pic_id'=>$_GET['event_pic_id']));
// 		if($found){
// 			$found->create_time = time();
// 		}else{
// 			$ue = new UserEventPicSeen;
// 			$ue->user_id = $user->id;
// 			$ue->event_pic_id = $_GET['event_pic_id'];
// 			$ue->create_time = time();
// 			$ue->save(false);
// 		}

// 		$this->sendJSONResponse(array(
// 			'success'=>"success"
// 		));
// 	}


// 	/*
// 	*	Returns all strangers / people with mutual friends that's close to you....
// 	*/
// 	public function actionDiscoverStrangers(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		//get people that's within 50 miles
// 		$mile = 50;

// 		$final_list = array();

// 		$slots = Yii::app()->db->createCommand('select * from tbl_friends where receiver = '.$user->id.' and accept = 0')->queryAll();
// 		foreach($slots as $entry):
// 			$friend = $entry['sender'];
// 			if (!in_array($friend, $final_list) && $friend != $user->id) {	//check duplicates
// 				array_push($final_list, $friend);
// 			}
// 		endforeach;

// 		$slots = Yii::app()->db->createCommand('SELECT t2.user_id FROM tbl_geolocation as t1 JOIN tbl_geolocation as t2 WHERE  t1.user_id = '.$user->id.' AND t2.user_id != '.$user->id.' AND MBRContains(LineString(Point (ST_X(t1.location) + '.$mile.' /  111.1 / COS(RADIANS(ST_Y(t1.location))), ST_Y(t1.location) + '.$mile.' / 111.1), Point (ST_X(t1.location) - '.$mile.' /  111.1 / COS(RADIANS(ST_Y(t1.location))), ST_Y(t1.location) - '.$mile.' / 111.1)), t2.location)')->queryAll();
// 		foreach($slots as $entry):
// 			$friend = $entry['user_id'];
// 			if (!in_array($friend, $final_list) && $friend != $user->id) {	//check duplicates
// 				array_push($final_list, $friend);
// 			}
// 		endforeach;

// 		foreach($final_list as $value):

// 			$friendObj = Users::model()->findByPk($value);	//get friend details
// 			if(!$friendObj){
// 				continue;
// 			}

// 			$check_friends = Friends::model()->find('accept > 0 AND ((sender = :uid AND receiver = :fid) OR (sender = :fid AND receiver = :uid))', array(":uid"=>$user->id, ":fid"=>$friendObj->id));
// 			if($check_friends){
// 				continue; 	//skip exisitng friends or rejected friends
// 			}
// 			$check_send_request = Friends::model()->find('sender = :uid AND receiver = :fid', array(":uid"=>$user->id, ":fid"=>$friendObj->id));
// 			if($check_send_request){
// 				continue;	//skip if request sent
// 			}

// 			$friend = $friendObj;	//get friend details
// 			$mutual = Users::model()->getMutualFriends($user->id, $friend->id);
// 			$mutual_count = count($mutual);

// 			$distance = 0;
// 			if($friendObj){
// 				//get the minimum of either u or ur friend's range, in miles (geo location)
// 				$range = min($user->range, $friendObj->range);
// 			}

// 			$userLocation = array();
// 			$friendLocation = array();

// 			if($user->geolocation && $friendObj->geolocation){
// 				$userLocation = explode(",", $user->geolocation);
// 				$friendLocation = explode(",", $friendObj->geolocation);
// 			}

// 			if(isset($userLocation[0]) && isset($userLocation[1]) && isset($friendLocation[0]) && isset($friendLocation[1])){
// 				//$lat1, $lon1, $lat2, $lon2, $unit, return in miles, "K" return in Kilometers.
// 				$distance = $this->getDistance($userLocation[0], $userLocation[1], $friendLocation[0], $friendLocation[1], "M");
// 				if($distance > $range){
// 					continue;		//have to ignore this long distance friend :(
// 				}
// 			}else{
// 				continue;		//no location.
// 			}
			

// 			//for sorting reason...
// 			$check_receive_request = Friends::model()->find('receiver = :uid AND sender = :fid AND accept = 0', array(":uid"=>$user->id, ":fid"=>$friendObj->id));
// 			if($check_receive_request){
// 				$distance = 0;
// 			}

// 			$result[] = array(
// 				'user_id'=>$value,
// 				'username'=>$friend->username,
// 				'avatar'=>$friend->avatar,
// 				'favorites'=>$friend->favorites,
// 				'whatsup'=>$friend->whatsup,
// 				'geolocation'=>$friend->geolocation,
// 				'phone'=>$friend->phone,
// 				'mutual'=>$mutual,
// 				'mutual_count'=>$mutual_count,
// 				'current'=>$friend->current,
// 				'distance'=>$distance
// 			);
// 		endforeach;


// 		if(isset($result)){
// 			$this->sortBySubkey($result, 'distance');
// 		}else{
// 			$result = array();
// 		}

// 		$result = json_encode($result);

// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));

// 	}



// 	public function actionSuggestFriendsOrderByMutual(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

//         $lists = Yii::app()->db->createCommand('select distinct(uid) from (select * from (select * from tbl_friends where sender = '.$user->id.' or receiver = '.$user->id.') friend right join (select username, id as uid from tbl_users) alltable on friend.sender = alltable.uid or friend.receiver = alltable.uid where friend.sender is NULL or friend.receiver is NULL) a')->queryAll();
//         $result = array();

//         foreach($lists as $entry){

//             $friendObj = Users::model()->findByPk($entry['uid']);
//             if(!$friendObj){
//             	continue;
//             }

// 			$userLocation = array();
// 			$friendLocation = array();

// 			$range = 50;
// 			$distance = 0;
// 			if($friendObj){
// 				//get the minimum of either u or ur friend's range, in miles (geo location)
// 				$range = min($user->range, $friendObj->range);
// 			}

// 			if($user->geolocation && $friendObj->geolocation){
// 				$userLocation = explode(",", $user->geolocation);
// 				$friendLocation = explode(",", $friendObj->geolocation);
// 			}

// 			if(isset($userLocation[0]) && isset($userLocation[1]) && isset($friendLocation[0]) && isset($friendLocation[1])){
// 				//$lat1, $lon1, $lat2, $lon2, $unit, return in miles, "K" return in Kilometers.
// 				$distance = $this->getDistance($userLocation[0], $userLocation[1], $friendLocation[0], $friendLocation[1], "M");
// 				if($distance > $range){
// 					continue;		//have to ignore this long distance friend :(
// 				}
// 			}else{
// 				continue;		//no location.
// 			}

// 			$mutual = Users::model()->getMutualFriends($user->id, $friendObj->id);
// 			$mutual_count = count($mutual);

// 			if(!$mutual_count){
// 				continue;
// 			}

// 			$result[] = array(
// 				'user_id'=>$friendObj->id,
// 				'username'=>$friendObj->username,
// 				'avatar'=>$friendObj->avatar,
// 				'favorites'=>$friendObj->favorites,
// 				'whatsup'=>$friendObj->whatsup,
// 				'geolocation'=>$friendObj->geolocation,
// 				'phone'=>$friendObj->phone,
// 				'mutual'=>$mutual,
// 				'mutual_count'=>$mutual_count,
// 			);
// 		}

// 		$this->sortBySubkey($result, 'mutual_count');
// 		$result = array_reverse($result);

// 		$result = json_encode($result);

// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));

// 	}


// 	protected function sortBySubkey(&$array, $subkey, $sortType = SORT_ASC) {
// 	    foreach ($array as $subarray) {
// 	    	$keys[] = $subarray[$subkey];
// 	    }
// 	    array_multisort($keys, $sortType, $array);
// 	}

// 	/*
// 	*	return signed up or friends that already got invited (list of friends)
// 	*/
// 	public function actionReturnInvitedSignedup(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		$contacts = PhoneContacts::model()->findAll("user_id = :uid AND (invited > 0 OR signed_up > 0)", array(":uid"=>$user->id));
// 		$result = array();
// 		foreach($contacts as $contact):
// 			$result[$contact->name] = array($contact->invited, $contact->signed_up);
// 		endforeach;
// 		$result = json_encode($result);

// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}

// 	/*
// 	*	This function calculats the distance of 2 GEO location addresses
// 	*/

// 	protected function getDistance($lat1, $lon1, $lat2, $lon2, $unit) {

// 	  if($lat1 == $lat2 && $lon1 == $lon2){
// 	  	return 0;
// 	  }

// 	  $theta = $lon1 - $lon2;
// 	  $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
// 	  $dist = acos($dist);
// 	  $dist = rad2deg($dist);
// 	  $miles = $dist * 60 * 1.1515;
// 	  $unit = strtoupper($unit);

// 	  if ($unit == "K") {
// 	      return ($miles * 1.609344);
// 	  } else if ($unit == "N") {
// 	      return ($miles * 0.8684);
// 	  } else {
// 	      return $miles;
// 	  }
// 	}


// 	/*
// 	*	This function gets rid of all special char and append 1 when necessary(10 digits) as country code for US
// 	*/
// 	protected function cleanPhoneNumber($string) {
// 	   $string = preg_replace('/[^A-Za-z0-9]/', '', $string);
// 	   if(strlen($string) == 10){
// 	   	   $string = "1".$string;
// 	   }
// 	   return trim(preg_replace('/[^A-Za-z0-9]/', '', $string)); // Removes special chars.
// 	}


// 	/*
// 	*	This returns all the events you liked
// 	*/
// 	public function actionReturnMyLikes(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
//         $lists = Yii::app()->db->createCommand('select * from tbl_event_likes where user_id = '.$user->id.' ORDER BY tbl_event_likes.create_time DESC')->queryAll();
//         $result = array();

//         foreach($lists as $entry){

//             $event = Event::model()->findByPk($entry['event_id']);
//             if(!$event){
//             	continue;
//             }
// 		    $pictures = EventPic::model()->findAll(array(
// 	            'condition' => 'event_id = :eid',
// 	            'params' => array(
// 	                ':eid'=>$event->id 
// 	            ),
// 	            'order'=>'cover DESC',
// 	        ));

// 			$pics = array();
// 			foreach($pictures as $pic){
// 				$pics[] = array(
// 					"pid"=>$pic->id,
// 					"path"=>$pic->path,
// 					"cover"=>$pic->cover,
// 					"title"=>$pic->title,
// 					"price"=>$pic->price
// 				);
// 			}

// 			$category = Category::model()->findByPk($event->category_id);
// 			if($category){
// 				$category_name = $category->name;
// 			}else{
// 				$category_name = "Uncategorized";
// 			}

// 			$likes = EventLikes::model()->findAllByAttributes(array('event_id'=>$event->id));
// 			$friends = array();
// 			$self = 0;
// 			foreach($likes as $like){
// 				$friend = Users::model()->findByPk($like->user_id);
// 				if($friend){
// 					//if you liked it yourself too, we mark self to 1.
// 					if($friend->id == $user->id){
// 						$self = 1;
// 					}
// 					$friends[] = array(
// 						'user_id'=>$friend->id,
// 						'username'=>$friend->username,
// 						'avatar'=>$friend->avatar
// 					);
// 				}
// 			}

// 			$result[] = array(
// 				'id'=>$event->id,
// 				'place'=>$event->name,
// 				'subtitle'=>$event->subtitle,
// 				'city'=>$event->city,
// 				'category_id'=>$event->category_id,
// 				'category_name'=>$category_name,
// 				'geolocation'=>$event->location,
// 				'description'=>$event->description,
// 				'recommend_menu'=>$event->recommend_menu,
// 				'friends'=>$friends,
// 				'self'=>$self,
// 				'likes'=>count($likes),
// 				'comments'=>$event->comments,
// 				'create_time'=>$event->create_time,
// 				'recommend'=>$event->recommend,
// 				'homepage'=>$event->homepage,
// 				'opentable_id'=>$event->opentable_id,
// 				'reservation_link'=>$event->reservation_link,
// 				'address'=>$event->address,
// 				'phone'=>$event->phone,
// 				'website'=>$event->website,
// 				'description'=>$event->description,
// 				'price'=>$event->price,
// 				'pics'=>$pics,
// 				'hours_json'=>$event->hours_json,
// 				'rating'=>$event->rating,
// 				'yelp_url'=>$event->yelp_url,

// 				'user_id'=>$user->id,
// 				'username'=>$user->username,
// 				'avatar'=>$user->avatar,
// 				'favorites'=>$user->favorites,
// 				'whatsup'=>$user->whatsup,
// 				'geolocation_person'=>$user->geolocation,
// 				'create_time'=>0,
// 				'phone_person'=>$user->phone
// 			);          
// 		}
// 		$result = json_encode($result);
// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}


// 	/*
// 	*	This returns all the events your friends liked
// 	*/
// 	public function actionReturnAllFriendsLikes(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

//         $lists = Yii::app()->db->createCommand('select *, tbl_event_likes.create_time as ct from tbl_event_likes, tbl_friends where (tbl_event_likes.user_id = tbl_friends.sender and receiver = '.$user->id.') or (tbl_event_likes.user_id = tbl_friends.receiver and sender = '.$user->id.') ORDER BY ct DESC')->queryAll();
//         $result = array();

//         foreach($lists as $entry){

//         	if($entry['sender'] == $user->id){
//         		$fid = $entry['receiver'];
//         	}else{
//         		$fid = $entry['sender'];
//         	}

//             $friendObj = Users::model()->findByPk($fid);
//             if(!$friendObj){
//             	continue;
//             }
//             $event = Event::model()->findByPk($entry['event_id']);
//             if(!$event){
//             	continue;
//             }
// 		    $pictures = EventPic::model()->findAll(array(
// 	            'condition' => 'event_id = :eid',
// 	            'params' => array(
// 	                ':eid'=>$event->id 
// 	            ),
// 	            'order'=>'cover DESC',
// 	        ));

// 			$pics = array();
// 			foreach($pictures as $pic){
// 				$pics[] = array(
// 					"pid"=>$pic->id,
// 					"path"=>$pic->path,
// 					"cover"=>$pic->cover,
// 					"title"=>$pic->title,
// 					"price"=>$pic->price
// 				);
// 			}

// 			$category = Category::model()->findByPk($event->category_id);
// 			if($category){
// 				$category_name = $category->name;
// 			}else{
// 				$category_name = "Uncategorized";
// 			}

// 			$likes = EventLikes::model()->findAllByAttributes(array('event_id'=>$event->id));
// 			$friends = array();
// 			$self = 0;
// 			foreach($likes as $like){
// 				$friend = Users::model()->findByPk($like->user_id);
// 				if($friend){
// 					//if you liked it yourself too, we mark self to 1.
// 					if($friend->id == $user->id){
// 						$self = 1;
// 					}
// 					$friends[] = array(
// 						'user_id'=>$friend->id,
// 						'username'=>$friend->username,
// 						'avatar'=>$friend->avatar
// 					);
// 				}
// 			}


// 			$result[] = array(
// 				'id'=>$event->id,
// 				'place'=>$event->name,
// 				'subtitle'=>$event->subtitle,
// 				'city'=>$event->city,
// 				'category_id'=>$event->category_id,
// 				'category_name'=>$category_name,
// 				'geolocation'=>$event->location,
// 				'description'=>$event->description,
// 				'recommend_menu'=>$event->recommend_menu,
// 				'friends'=>$friends,
// 				'self'=>$self,
// 				'likes'=>count($likes),
// 				'comments'=>$event->comments,
// 				'create_time'=>$event->create_time,
// 				'recommend'=>$event->recommend,
// 				'homepage'=>$event->homepage,
// 				'opentable_id'=>$event->opentable_id,
// 				'reservation_link'=>$event->reservation_link,
// 				'address'=>$event->address,
// 				'phone'=>$event->phone,
// 				'website'=>$event->website,
// 				'description'=>$event->description,
// 				'price'=>$event->price,
// 				'pics'=>$pics,
// 				'hours_json'=>$event->hours_json,
// 				'rating'=>$event->rating,
// 				'yelp_url'=>$event->yelp_url,

// 				'user_id'=>$friendObj->id,
// 				'username'=>$friendObj->username,
// 				'avatar'=>$friendObj->avatar,
// 				'favorites'=>$friendObj->favorites,
// 				'whatsup'=>$friendObj->whatsup,
// 				'geolocation_person'=>$friendObj->geolocation,
// 				'create_time'=>$entry['ct'],
// 				'phone_person'=>$friendObj->phone
// 			);          
// 		}

// 		$result = json_encode($result);
// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}


// 	/*
// 	*	Returns all subjects
// 	*/
// 	public function actionReturnAllCategories(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		$categories = Category::model()->findAll(); 	//currently we return everything!
// 		$result = array();
// 		foreach($categories as $category):
// 			$result[] = array(
// 				'category_id'=>$category->id,
// 				'name'=>$category->name,
// 				'path'=>$category->path
// 			);
// 		endforeach;

// 		$this->sendJSONResponse(array(
// 			'result'=>json_encode($result)
// 		));
// 	}

// 	public function actionOpenTableJS(){
// 		echo "<script type='text/javascript' src='//secure.opentable.com/widget/reservation/loader?rid=27763&domain=com&type=standard&theme=standard&lang=en&overlay=false&iframe=false'></script>";
// 	}


// 	/*
// 	*	Returns all the restaurants
// 	*/
// 	public function actionReturnAllEvents(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		//$events = Event::model()->findAll(); 	//currently we return everything!
// 		if(isset($_GET['category_id'])){
// 			if(isset($_GET['recommend'])){
// 				$events = Event::model()->findAllByAttributes(array('category_id'=>$_GET['category_id'], 'recommend'=>1), array('order'=>'id DESC'));
// 			}else{
// 				$events = Event::model()->findAllByAttributes(array('category_id'=>$_GET['category_id']), array('order'=>'id DESC'));
// 			}
// 		}else{
// 			$events = Event::model()->findAll('homepage = 1');
// 		}

// 		$result = array();
// 		foreach($events as $event):

// 	        $pictures = EventPic::model()->findAll(array(
// 	            'condition' => 'event_id = :eid',
// 	            'params' => array(
// 	                ':eid'=>$event->id 
// 	            ),
// 	            'order'=>'cover DESC',
// 	        ));

// 			$pics = array();
// 			foreach($pictures as $pic){
// 				$pics[] = array(
// 					"pid"=>$pic->id,
// 					"path"=>$pic->path,
// 					"cover"=>$pic->cover,
// 					"title"=>$pic->title,
// 					"price"=>$pic->price
// 				);
// 			}
// 			$category = Category::model()->findByPk($event->category_id);
// 			if($category){
// 				$category_name = $category->name;
// 			}else{
// 				$category_name = "Uncategorized";
// 			}

// 			$likes = EventLikes::model()->findAllByAttributes(array('event_id'=>$event->id));
// 			$friends = array();
// 			$self = 0;
// 			foreach($likes as $like){
// 				$friend = Users::model()->findByPk($like->user_id);
// 				if($friend){
// 					//if you liked it yourself too, we mark self to 1.
// 					if($friend->id == $user->id){
// 						$self = 1;
// 					}
// 					$friends[] = array(
// 						'user_id'=>$friend->id,
// 						'username'=>$friend->username,
// 						'avatar'=>$friend->avatar
// 					);
// 				}
// 			}

// 			$result[] = array(
// 				'id'=>$event->id,
// 				'place'=>$event->name,
// 				'subtitle'=>$event->subtitle,
// 				'city'=>$event->city,
// 				'category_id'=>$event->category_id,
// 				'category_name'=>$category_name,
// 				'geolocation'=>$event->location,
// 				'description'=>$event->description,
// 				'recommend_menu'=>$event->recommend_menu,
// 				'friends'=>$friends,
// 				'self'=>$self,
// 				'likes'=>count($likes),
// 				'comments'=>$event->comments,
// 				'create_time'=>$event->create_time,
// 				'recommend'=>$event->recommend,
// 				'homepage'=>$event->homepage,
// 				'opentable_id'=>$event->opentable_id,
// 				'reservation_link'=>$event->reservation_link,
// 				'address'=>$event->address,
// 				'phone'=>$event->phone,
// 				'website'=>$event->website,
// 				'description'=>$event->description,
// 				'price'=>$event->price,
// 				'pics'=>$pics,
// 				'hours_json'=>$event->hours_json,
// 				'rating'=>$event->rating,
// 				'yelp_url'=>$event->yelp_url,
// 				'delivery_url'=>$event->delivery_url,
// 			);
// 		endforeach;

// 		$this->sendJSONResponse(array(
// 			'result'=>json_encode($result)
// 		));

// 	}


// 	public function actionGetEventById(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(!isset($_GET['event_id'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no event id'
// 			));
// 			exit();
// 		}else{
// 			$event = Event::model()->findByPk($_GET['event_id']);
// 			if(!$event){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid event id'
// 				));
// 				exit();	
// 			}
// 		}

// 	        $pictures = EventPic::model()->findAll(array(
// 	            'condition' => 'event_id = :eid',
// 	            'params' => array(
// 	                ':eid'=>$event->id 
// 	            ),
// 	            'order'=>'cover DESC',
// 	        ));

// 			$pics = array();
// 			foreach($pictures as $pic){
// 				$pics[] = array(
// 					"pid"=>$pic->id,
// 					"path"=>$pic->path,
// 					"cover"=>$pic->cover,
// 					"title"=>$pic->title,
// 					"price"=>$pic->price
// 				);
// 			}
// 			$category = Category::model()->findByPk($event->category_id);
// 			if($category){
// 				$category_name = $category->name;
// 			}else{
// 				$category_name = "Uncategorized";
// 			}

// 			$likes = EventLikes::model()->findAllByAttributes(array('event_id'=>$event->id));
// 			$friends = array();
// 			$self = 0;
// 			foreach($likes as $like){
// 				$friend = Users::model()->findByPk($like->user_id);
// 				if($friend){
// 					//if you liked it yourself too, we mark self to 1.
// 					if($friend->id == $user->id){
// 						$self = 1;
// 					}
// 					$friends[] = array(
// 						'user_id'=>$friend->id,
// 						'username'=>$friend->username,
// 						'avatar'=>$friend->avatar
// 					);
// 				}
// 			}

// 			$result = array(
// 				'id'=>$event->id,
// 				'place'=>$event->name,
// 				'subtitle'=>$event->subtitle,
// 				'city'=>$event->city,
// 				'category_id'=>$event->category_id,
// 				'category_name'=>$category_name,
// 				'geolocation'=>$event->location,
// 				'description'=>$event->description,
// 				'recommend_menu'=>$event->recommend_menu,
// 				'friends'=>$friends,
// 				'self'=>$self,
// 				'likes'=>count($likes),
// 				'comments'=>$event->comments,
// 				'create_time'=>$event->create_time,
// 				'recommend'=>$event->recommend,
// 				'homepage'=>$event->homepage,
// 				'opentable_id'=>$event->opentable_id,
// 				'reservation_link'=>$event->reservation_link,
// 				'address'=>$event->address,
// 				'phone'=>$event->phone,
// 				'website'=>$event->website,
// 				'description'=>$event->description,
// 				'price'=>$event->price,
// 				'pics'=>$pics,
// 				'hours_json'=>$event->hours_json,
// 				'rating'=>$event->rating,
// 				'yelp_url'=>$event->yelp_url,
// 				'delivery_url'=>$event->delivery_url
// 			);

// 		$this->sendJSONResponse(array(
// 			'result'=>json_encode($result)
// 		));
		
// 	}


// 	/*
// 	*	Returns all your friends free slots on the SAME day within certain range....
// 	*/
// 	public function actionGetFriendsFreeSlots(){

// 		// $time_start = microtime(true); 

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(!isset($_GET['day'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no specific days'
// 			));
// 			exit();	
// 		}

// 		$user->saveFacebookProfilePicture();
// 		$user->updatePoints();

// 		$user->lastaction = time();
// 		$user->save();

// 		$day = $_GET['day']; 
// 		$tomorrow = ($day + 1) % 7;
// 		$day_after = ($day + 2) % 7;

// 		$like_list = array();
// 		$my_friends = array();	//list of your friends
// 		$final_list = array();	//the final list of people

// 		//get the list of people who swiped SUPER LIKE to you first!
// 		$slots = Yii::app()->db->createCommand('select sender, receiver from tbl_requests where receiver = '.$user->id.' AND status = 0 AND request_day = '.$day.' and trash = 0 AND super = 1')->queryAll();
// 		foreach($slots as $entry):
// 			$friend = $entry['sender'];
// 			if (!in_array($friend, $like_list) && $friend != $user->id) {	//check duplicates
// 				array_push($like_list, $friend);
// 			}
// 		endforeach;

// 		//get my friends
// 		//put back order by lastaction DESC for order
// 		$slots = Yii::app()->db->createCommand('select f.sender as sender, f.receiver as receiver from tbl_friends f, tbl_users u where accept = 1 AND (f.sender = '.$user->id.' OR f.receiver = '.$user->id.') AND (u.id = f.sender OR u.id = f.receiver) AND u.id != '.$user->id.' order by lastaction DESC')->queryAll();
// 		foreach($slots as $entry):
// 			if($user->id == $entry['sender']){
// 				$friend = $entry['receiver'];
// 			}else{
// 				$friend = $entry['sender'];
// 			}
// 			if (in_array($friend, $like_list)){	//avoid dup
// 				continue;
// 			}
// 			if (!in_array($friend, $my_friends) && $friend != $user->id) {	//check duplicates
// 				array_push($my_friends, $friend);
// 			}
// 			if (!in_array($friend, $final_list) && $friend != $user->id) {	//check duplicates
// 				array_push($final_list, $friend);
// 			}
// 		endforeach;


// 		//COMMENT OUT THIS PART IF WE NEED TO DISBALE THIS FEATURE
// 		//get friends' friends
// 		//put back order by lastaction DESC for order

// 		if($user->friend_friend):
// 			foreach($my_friends as $value):
// 				$slots = Yii::app()->db->createCommand('select f.sender as sender, f.receiver as receiver from tbl_friends f, tbl_users u where accept = 1 AND (f.sender = '.$value.' OR f.receiver = '.$value.') AND (u.id = f.sender OR u.id = f.receiver) AND u.id != '.$value.' order by lastaction DESC')->queryAll();
// 				foreach($slots as $entry):
// 					if($value == $entry['sender']){
// 						$friend = $entry['receiver'];
// 					}else{
// 						$friend = $entry['sender'];
// 					}
// 					if (in_array($friend, $like_list)){	//avoid dup
// 						continue;
// 					}
// 					if (!in_array($friend, $final_list) && $friend != $user->id) {	//check duplicates
// 						array_push($final_list, $friend);
// 					}
// 				endforeach;
// 			endforeach;
// 		endif;

// 		shuffle($like_list);
// 		//we order by last action now
// 		//shuffle($final_list);

// 		//reverse the order!!!
// 		$final_list = array_reverse($final_list);
// 		foreach($like_list as $value){
// 			array_push($final_list, $value);
// 		}

// 		$final = array();	//the final JSON

// 		foreach($final_list as $value):

// 			$friend = $value;

// 			$friendObj = Users::model()->findByPk($friend);	//get friend details

// 			$check_friends = Friends::model()->find('accept = 1 AND ((sender = :uid AND receiver = :fid) OR (sender = :fid AND receiver = :uid))', array(":uid"=>$user->id, ":fid"=>$friendObj->id));

// 			//if this user did not turn on friend friend and you guys are not friend, you should not see him.
// 			if(!$friendObj->friend_friend && !$check_friends){
// 				continue; //if you guys are not friend and your friend turned off friend's friend
// 			}

// 			$range = 50;
// 			if($friendObj){
// 				//get the minimum of either u or ur friend's range, in miles (geo location)
// 				$range = min($user->range, $friendObj->range);
// 			}

// 			$userLocation = array();
// 			$friendLocation = array();

// 			if($user->geolocation && $friendObj->geolocation){
// 				$userLocation = explode(",", $user->geolocation);
// 				$friendLocation = explode(",", $friendObj->geolocation);
// 			}

// 			$distance = 0;
			
// 			if(isset($userLocation[0]) && isset($userLocation[1]) && isset($friendLocation[0]) && isset($friendLocation[1])){
// 				//$lat1, $lon1, $lat2, $lon2, $unit, return in miles, "K" return in Kilometers.
// 				$distance = $this->getDistance($userLocation[0], $userLocation[1], $friendLocation[0], $friendLocation[1], "M");
// 				if($distance > $range){
// 					continue;		//have to ignore this long distance friend :(
// 				}
// 			}else{
// 				continue;		//no location.
// 			}

// 			if(!isset($final[$friend])){
// 				$final[$friend] = array(0, 0, 0, 0);
// 			}

// 			$check_if_reject_or_match_today = Requests::model()->find('trash = 0 AND request_day = :request_day AND ((sender = :uid AND receiver = :me) OR (sender = :me AND receiver = :uid)) AND (status > 0 OR (status = 0 AND sender = :me AND receiver = :uid))', 
// 						array(":me"=>$user->id, ":uid"=>$friend, ":request_day"=>$day));

// 			$check_if_reject_or_match_tmr = Requests::model()->find('trash = 0 AND request_day = :request_day AND ((sender = :uid AND receiver = :me) OR (sender = :me AND receiver = :uid)) AND (status > 0 OR (status = 0 AND sender = :me AND receiver = :uid))', 
// 						array(":me"=>$user->id, ":uid"=>$friend, ":request_day"=>$tomorrow));

// 			$check_if_reject_or_match_day_after = Requests::model()->find('trash = 0 AND request_day = :request_day AND ((sender = :uid AND receiver = :me) OR (sender = :me AND receiver = :uid)) AND (status > 0 OR (status = 0 AND sender = :me AND receiver = :uid))', 
// 						array(":me"=>$user->id, ":uid"=>$friend, ":request_day"=>$day_after));

// 			if($check_if_reject_or_match_today){	//if matched or rejected, you are not free today for this person
// 				$check_if_reject_or_match_today = 0;
// 			}else{
// 				$check_if_reject_or_match_today = 1;
// 			}
// 			if($check_if_reject_or_match_tmr){	//if matched or rejected, you are not free tmr for this person
// 				$check_if_reject_or_match_tmr = 0;
// 			}else{
// 				$check_if_reject_or_match_tmr = 1;
// 			}
// 			if($check_if_reject_or_match_day_after){	//if matched or rejected, you are not free the day after tmr for this person
// 				$check_if_reject_or_match_day_after = 0;
// 			}else{
// 				$check_if_reject_or_match_day_after = 1;
// 			}

// 			$final[$friend] = array($check_if_reject_or_match_today, $check_if_reject_or_match_tmr, $check_if_reject_or_match_day_after, 0);

// 			//3 is NOW --- means you are free NOW or not... last 3 hours for now
// 			$check_if_sent_now = Requests::model()->find('trash = 0 AND request_day = :request_day AND request_time = :request_time AND sender = :me AND receiver = :uid AND status = 0', 
// 						array(":me"=>$user->id, ":uid"=>$friend, ":request_day"=>$day, ":request_time"=>3));
// 			if($friendObj->lastaction > time() - 3600 * 3 && !$check_if_sent_now){
// 				$final[$friend][3] = 1;
// 			}else{
// 				$final[$friend][3] = 0;
// 			}
// 		endforeach;

// 		$result = array();

// 		foreach($final as $key=>$value):

// 			$friendObj = Users::model()->findByPk($key);	//get friend details

// 			$friend = $friendObj;	//get friend details
// 			$mutual = Users::model()->getMutualFriends($user->id, $friend->id);

// 			$check_friendship = Friends::model()->find('accept = 1 AND ((sender = :uid AND receiver = :fid) OR (sender = :fid AND receiver = :uid))', array(":uid"=>$user->id, ":fid"=>$friend->id));
// 			// if(!$check_friendship && count($mutual) < 3){
// 			// 	//continue;
// 			// }

// 			$result[] = array(
// 				'user_id'=>$key,
// 				'username'=>$friend->username,
// 				'avatar'=>$friend->avatar,
// 				'availability'=>$value,
// 				'favorites'=>$friend->favorites,
// 				'whatsup'=>$friend->whatsup,
// 				'geolocation'=>$friend->geolocation,
// 				'phone'=>$friend->phone,
// 				'mutual'=>$mutual,
// 				'current'=>$friend->current,
// 				'check_friendship'=>$check_friends,
// 			);

// 		endforeach;

// 		$result = json_encode($result);

// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));

// 		// $time_end = microtime(true);

// 		// $execution_time = ($time_end - $time_start);

// 		// //execution time of the script
// 		// echo '<b>Total Execution Time:</b> '.$execution_time.' Seconds';

// 	}


// 	/*
// 	*	Load your own free time slot
// 	*/
// 	public function actionFreetime(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		$json = $_GET['free_time'];
// 		$array = json_decode($json);

// 		foreach($array as $key=>$subs):
// 			$day = $key;	//'monday', etc.
// 				$slot1 = FreeTimeSlot::model()->findByAttributes(array('user_id'=>$user->id, 'day'=>$day, 'slot'=>0));	//0 stands for noon
// 				if(!$slot1){
// 					$slot1 = new FreeTimeSlot;
// 					$slot1->day = $day;
// 					$slot1->slot = 0;
// 					$slot1->user_id = $user->id;
// 				}
// 				$slot1->free = $subs[0];
// 				$slot1->save(false);
// 				/*
// 				$slot2 = FreeTimeSlot::model()->findByAttributes(array('user_id'=>$user->id, 'day'=>$day, 'slot'=>1));	//0 stands for noon
// 				if(!$slot2){
// 					$slot2 = new FreeTimeSlot;
// 					$slot2->day = $day;
// 					$slot2->slot = 1;
// 					$slot2->user_id = $user->id;
// 				}
// 				$slot2->free = $subs[1];
// 				$slot2->save(false);

// 				$slot3 = FreeTimeSlot::model()->findByAttributes(array('user_id'=>$user->id, 'day'=>$day, 'slot'=>2));	//0 stands for noon
// 				if(!$slot3){
// 					$slot3 = new FreeTimeSlot;
// 					$slot3->day = $day;
// 					$slot3->slot = 2;
// 					$slot3->user_id = $user->id;
// 				}
// 				$slot3->free = $subs[2];
// 				$slot3->save(false);
// 				*/
// 		endforeach;

// 		$this->sendJSONResponse(array(
// 			'success'=>'success'
// 		));
		
// 	}


// 	public function actionSendMessage(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		if(!isset($_GET['message'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no message'
// 			));
// 			exit();
// 		}
// 		if(!isset($_GET['receiver']) && $_GET['receiver']){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no receiver'
// 			));
// 			exit();
// 		}
// 		$message = new Message;
// 		$message->sender = $user->id;
// 		$message->receiver = $_GET['receiver'];
// 		$message->description = strip_tags(base64_encode($_GET['message']));
// 		$message->create_time = time();
// 		$message->save();

// 		$sender = Users::model()->findByPk($message->sender);

// 			//send notification to the other party and tell them they are matched with you.
// 		$data = array(
// 				'title'=>base64_decode($message->description),
// 				'type'=>5,						//5 for message
// 				'sender_id'=>$message->sender,
// 				'user_id'=>$message->receiver,
// 				'sender_name'=>$sender->username,		//need to customize the message in /simplepush
// 				'message_id'=>$message->id,
// 		);
// 		$user->sendNotification($data);

// 		$this->sendJSONResponse(array(
// 			'result'=>'success',
// 		));
// 	}


// 	public function actionMarkAsDelivered(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		if(!isset($_GET['message_id'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no message_id'
// 			));
// 			exit();
// 		}
// 		$message = Message::model()->findByPk($_GET['message_id']);
// 		if(!$message->delivered){
// 			$message->delivered = 1;
// 			$message->save(false);
// 		}

// 		$this->sendJSONResponse(array(
// 			'result'=>'success',
// 		));

// 	}



// 	public function actionLoadMessageHistory(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		if(!isset($_GET['receiver'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no receiver'
// 			));
// 			exit();
// 		}
// 		if(!isset($_GET['offset'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no offset'
// 			));
// 			exit();
// 		}

// 		$offset = $_GET['offset'];

// 		$result = array();

//         $messages = Message::model()->findAll(array(
//             'condition' => '((sender = :uid AND receiver = :fid) OR (sender = :fid AND receiver = :uid)) AND delivered = 1',
//             'params' => array(
//                 ':uid'=>$user->id, 
//                 ':fid'=>$_GET['receiver']
//             ),
//             'order'=>'create_time ASC',
//             'offset'=>$offset,
//             'limit'=>20,
//         ));

// 		foreach($messages as $message){
// 			$result[$message->id] = array(
// 				'message_id'=>$message->id,
// 				'title'=>base64_decode($message->description),
// 				'sender'=>$message->sender,
// 				'receiver'=>$message->receiver,
// 				'create_time'=>$message->create_time,
// 			);
// 			if(!$message->delivered){
// 				$message->delivered = 1;
// 				$message->save(false);
// 			}
// 		}

// 		$result = json_encode($result);

// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}


// 	/*
// 	*	load new messages from a specific receiver.
// 	*/
// 	public function actionLoadNewMessage(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		if(!isset($_GET['receiver'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no receiver'
// 			));
// 			exit();
// 		}

// 		$result = array();

// 		$messages = Message::model()->findAll('(sender = :fid AND receiver = :uid) AND delivered = 0', array(':uid'=>$user->id, ':fid'=>$_GET['receiver']));
// 		foreach($messages as $message){
// 			$result[$message->id] = array(
// 				'title'=>base64_decode($message->description),
// 				'sender'=>$message->sender,
// 				'receiver'=>$message->receiver,
// 				'create_time'=>$message->create_time,
// 			);
// 			if(!$message->delivered){
// 				$message->delivered = 1;
// 				$message->save(false);
// 			}
// 		}

// 		$result = json_encode($result);

// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}


// 	/*
// 	*	load all new messages, no receiver required.
// 	*/
// 	public function actionLoadAllNewMessage(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$result = array();

// 		$messages = Message::model()->findAll('receiver = :uid AND delivered = 0', array(':uid'=>$user->id));
// 		foreach($messages as $message){
// 			$result[$message->receiver][] = array(
// 				'id'=>$message->id,
// 				'title'=>base64_decode($message->description),
// 				'sender'=>$message->sender,
// 				'receiver'=>$message->receiver,
// 				'create_time'=>$message->create_time,
// 			);
// 			if(!$message->delivered){
// 				$message->delivered = 1;
// 				$message->save(false);
// 			}
// 		}

// 		$result = json_encode($result);

// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}


// 	/*
// 	*	Update / create your own free time slot
// 	*/
// 	public function actionUpdateFreeTime(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		$slots = FreeTimeSlot::model()->findAllByAttributes(array('user_id'=>$user->id), array('order'=>'day ASC'));
// 		$result = array();
// 		foreach($slots as $slot){
// 			if(!isset($result[$slot->day])){
// 				$result[$slot->day] = array(0, 0, 0, 1);
// 			}
// 			$result[$slot->day][$slot->slot] = $slot->free;
// 		}
// 		$result = json_encode($result);
// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}


// 	/*
// 	*	This function returns your own schedule today.
// 	*/
// 	public function actionGetMySchedule(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		if(!isset($_GET['day'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no specific days'
// 			));
// 			exit();	
// 		}
// 		$day = $_GET['day'];

// 		$slots = FreeTimeSlot::model()->findAllByAttributes(array('user_id'=>$user->id, 'day'=>$day), array('order'=>'slot ASC'));
// 		$result = array(0, 0, 0, 1);
// 		foreach($slots as $slot){
// 			$check_if_matched = Requests::model()->findAll('trash = 0 AND request_day = :request_day AND request_time = :request_time AND (receiver = :me OR sender = :me) AND status = 1', 
// 					array(":me"=>$user->id, ":request_day"=>$day, "request_time"=>$slot->slot));
// 			$check_if_matched = false;
			
// 			if($check_if_matched){
// 				if($user->id == $check_if_matched->receiver){	//if i am receiver, the other guy is sender. 
// 					$other = Users::model()->findByPk($check_if_matched->sender);
// 				}else{
// 					$other = Users::model()->findByPk($check_if_matched->receiver);
// 				}
// 				$result[$slot->slot] = array(
// 					'request_id'=>$check_if_matched->id, 
// 					'user_id'=>$other->id, //friend’s id 
// 					'username'=>$other->username, //friend’s usnerame
// 					'avatar'=>$other->avatar, //friend’s profile pic
// 					'whatsup'=>$other->whatsup, //friend’s status
// 					'current'=>$other->current,
// 					'favorites'=>$other->favorites,
// 					'geolocation'=>$other->geolocation,
// 					'phone'=>$other->phone, //friend’s phone
// 				);
// 			}else{
// 				$result[$slot->slot] = $slot->free;
// 			}
// 		}
// 		$result = json_encode($result);
// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}


// 	/*
// 	*	This function tells you if you have a match for new friends...
// 	*/
// 	public function actionGetUnreadFriendMatch(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		$result = array();
// 		$check_if_matched = Friends::model()->findAll('accept = 1 AND ((receiver = :me AND receiver_read = 0) OR (sender = :me AND sender_read = 0))', array(":me"=>$user->id));
// 		foreach($check_if_matched as $cc){
// 			if($cc->sender == $user->id){
// 				$friend = Users::model()->findByPk($cc->receiver);
// 			}
// 			if($cc->receiver == $user->id){
// 				$friend = Users::model()->findByPk($cc->sender);
// 			}
// 			$result[] = array(
// 				'user_id'=>$friend->id,
// 				'username'=>$friend->username,
// 				'avatar'=>$friend->avatar,
// 				'email'=>$friend->email,
// 				'phone'=>$friend->phone,
// 				'geolocation'=>$friend->geolocation,
// 				'favorites'=>$friend->favorites,
// 				'whatsup'=>$friend->whatsup,
// 				'range'=>$friend->range,
// 				'current'=>$friend->current
// 			);
// 		}
// 		$result = json_encode($result);
// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}



// 	/*
// 	*	Mark all as read -> strangers...
// 	*/
// 	public function actionMarkAllFriendsMatchAsRead(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		$result = array();
// 		$check_if_matched = Friends::model()->findAll('accept = 1 AND ((receiver = :me AND receiver_read = 0) OR (sender = :me AND sender_read = 0))', array(":me"=>$user->id));
// 		foreach($check_if_matched as $cc){
// 			if($cc->sender == $user->id){
// 				$cc->sender_read = 1;
// 				$cc->save(false);
// 			}
// 			if($cc->receiver == $user->id){
// 				$cc->receiver_read = 1;
// 				$cc->save(false);
// 			}
// 		}
// 		$result = json_encode($result);
// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}


// 	/*
// 	*	This function tells you if you have a match or not
// 	*/
// 	public function actionGetUnreadMatchList(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		$result = array();
// 		$check_if_matched = Requests::model()->findAll('trash = 0 AND (receiver = :me OR sender = :me) AND status = 1 AND (sender_read = 0 OR receiver_read = 0)', array(":me"=>$user->id));
// 		foreach($check_if_matched as $cc){
// 			if($cc->sender == $user->id && !$cc->sender_read){
// 				$friend = Users::model()->findByPk($cc->receiver);
// 				$result[] = array(
// 					'user_id'=>$friend->id,
// 					'username'=>$friend->username,
// 					'avatar'=>$friend->avatar,
// 					'email'=>$friend->email,
// 					'phone'=>$friend->phone,
// 					'day'=>$cc->request_day,
// 					'geolocation'=>$friend->geolocation,
// 					'favorites'=>$friend->favorites,
// 					'whatsup'=>$friend->whatsup,
// 					'range'=>$friend->range,
// 					'current'=>$friend->current,
// 				);
// 			}
// 			if($cc->receiver == $user->id && !$cc->receiver_read){
// 				$friend = Users::model()->findByPk($cc->sender);
// 				$result[] = array(
// 					'user_id'=>$friend->id,
// 					'username'=>$friend->username,
// 					'avatar'=>$friend->avatar,
// 					'email'=>$friend->email,
// 					'phone'=>$friend->phone,
// 					'day'=>$cc->request_day,
// 					'geolocation'=>$friend->geolocation,
// 					'favorites'=>$friend->favorites,
// 					'whatsup'=>$friend->whatsup,
// 					'range'=>$friend->range,
// 					'current'=>$friend->current,
// 				);
// 			}
// 		}
// 		$result = json_encode($result);
// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}

// 	/*
// 	*	Mark all as read
// 	*/
// 	public function actionMarkAllMatchListAsRead(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		$result = array();
// 		$check_if_matched = Requests::model()->findAll('trash = 0 AND (receiver = :me OR sender = :me) AND status = 1 AND (sender_read = 0 OR receiver_read = 0)', array(":me"=>$user->id));
// 		foreach($check_if_matched as $cc){
// 			if($cc->sender == $user->id && !$cc->sender_read){
// 				$cc->sender_read = 1;
// 				$cc->save(false);
// 			}
// 			if($cc->receiver == $user->id && !$cc->receiver_read){
// 				$cc->receiver_read = 1;
// 				$cc->save(false);
// 			}
// 		}
// 		$result = json_encode($result);
// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));
// 	}

// 	/*
// 	*	Mark a match as read
// 	*   NOT USING THIS FOR NOW
// 	*/
// 	public function actionMarkMatchAsRead(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		if(!isset($_GET['request_id'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no request id'
// 			));
// 			exit();
// 		}else{
// 			$request = Requests::model()->findByPk($_GET['request_id']);
// 			if(!$request){
// 				$this->sendJSONResponse(array(
// 					'error'=>'no request found'
// 				));
// 				exit();
// 			}
// 		}
// 		if($user->id == $request->sender){
// 			$request->sender_read = 1;
// 			$request->save(false);
// 		}else if($user->id == $request->receiver){
// 			$request->receiver_read = 1;
// 			$request->save(false);
// 		}

// 		$this->sendJSONResponse(array(
// 			'success'=>"sucess"
// 		));
// 	}

// 	/*
// 	*	take phone number, output verification code
// 	*/
// 	public function actionInputPhone(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(!isset($_GET['number'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no number'
// 			));
// 			exit();
// 		}

//         spl_autoload_unregister(array('YiiBase', 'autoload'));
//         require_once '/var/www/html/webapp/protected/extensions/twilio/Services/Twilio.php';
//         spl_autoload_register(array('YiiBase', 'autoload'));

//         $sid = "AC619e2e0259cedfa2be0cce4aef50bd57"; // Your Account SID from www.twilio.com/user/account
//         $token = "b8eeb3138dbde40f096c47d62eb36a14"; // Your Auth Token from www.twilio.com/user/account

//         $newNumber = trim($_GET['number']);

//         $valid_code = rand(1000, 9999);


//         try{
// 	        $client = new Services_Twilio($sid, $token);
// 	        $message = $client->account->messages->sendMessage(
// 	                 '+13472208626 ', // From a valid Twilio number
// 	                  '+'.$newNumber, // Text this number
// 	                  "Verification code: ".$valid_code//message
// 	        );
//         }catch(Exception $e){
//         	$this->sendJSONResponse(array(
// 				'error'=>"invalid number",
// 			));
//         }

//         $verify = Verify::model()->findByAttributes(array('user_id'=>$user->id));
//         if(!$verify){
// 	        $verify = new Verify;
// 	        $verify->user_id = $user->id;
//         }
// 	    $verify->code = $valid_code;
// 	    $verify->number = trim($newNumber);
// 	    $verify->create_time = time();
// 	    $verify->save(false);

// 		$this->sendJSONResponse(array(
// 			'success'=>"sent",
// 		));

// 	}

// 	/*
// 	*	take verification code, after verification, save it into phone column in tbl_users
// 	*/
// 	public function actionInputCode(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(!isset($_GET['code'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no code'
// 			));
// 			exit();
// 		}

//         $verify = Verify::model()->findByAttributes(array('user_id'=>$user->id, 'code'=>$_GET['code']));
//         if(!$verify){
// 			$this->sendJSONResponse(array(
// 				'error'=>"wrong code",
// 			));
//         }else{
//         	$user->phone = trim($verify->number);
//         	$user->save(false);
//         }

// 		$this->sendJSONResponse(array(
// 			'success'=>"verified",
// 		));

// 	}

// 	/*
// 	*	Rewind!!! for people you clicked dislike!
// 	*	if you send the request and the other party did not send it, just send request
// 	*/
// 	public function actionRewind(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		if(!isset($_GET['request_day'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no request day'
// 			));
// 			exit();
// 		}

// 		$requests = Requests::model()->findAll('trash = 0 AND request_day = :request_day AND (sender = :uid OR receiver = :uid) AND status >= 2', 
// 					array(':uid'=>$user->id, ":request_day"=>$_GET['request_day']));
		
// 		foreach($requests as $request){
// 			if($user->id == $request->sender){
// 				if($request->status == 2){
// 					$request->trash = 1;
// 					$request->save();
// 				}
// 			}else{	//receiver
// 				if($request->status == 3){
// 					//$request->trash = 1;
// 					$request->status = 0;
// 					$request->save();
// 				}
// 			}
// 		}
// 		$this->sendJSONResponse(array(
// 			'success'=>"rewind",
// 		));
// 	}


// 	/*
// 	*	Request event (from friend 1-> friend 2), need receiver, request_day, request_time
// 	*	if you send the request and the other party did not send it, just send request
// 	*   if both party has the request, match it!
// 	*   need: user_token, request_day(0 for sunday, 1 for monday....etc.), request_time(0 for noon, 1 for evening, 2 for night), receiver, decision
// 	*/
// 	public function actionSendRequest(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		if(!isset($_GET['receiver'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no receiver id'
// 			));
// 			exit();
// 		}

// 		if(!isset($_GET['request_day']) || !isset($_GET['request_time']) ){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no request day or time'
// 			));
// 			exit();
// 		}

// 		if(!isset($_GET['decision'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no decision'
// 			));
// 			exit();
// 		}

// 		if(isset($_GET['activity'])){
// 			$activity = strtolower($_GET['activity']);
// 		}
		
// 		if(!$activity){
// 			$activity = "hang out";
// 		}

// 		$friends = Friends::model()->find('accept = 1 AND ((sender = :uid AND receiver = :me) OR (sender = :me AND receiver = :uid))', array(":me"=>$user->id, ":uid"=>$_GET['receiver']));
// 		/*
// 		if(!$friends){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no friendship exists'
// 			));
// 			exit();
// 		}
// 		*/

// 		$status = "sent";
// 		$decision = $_GET['decision'];	//1 for approve, 2 for reject


// 		$time_word = "Now";

// 		if(isset($_GET['dayString'])){
// 			$time_word = $_GET['dayString'];
// 		}

// 		//you are always the receiver, since you are ACCEPTING the request
// 		//this request means someone else requested to meet with you already. so they are the sender.
// 		$request = Requests::model()->find('trash = 0 AND request_day = :request_day AND request_time = :request_time AND sender = :uid AND receiver = :me', 
// 					array(':me'=>$user->id, ":uid"=>$_GET['receiver'], ":request_day"=>$_GET['request_day'], ":request_time"=>$_GET['request_time']));

// 		//check the other party to make sure they are not booked WITH YOU ALREADY!
// 		$check_if_busy = Requests::model()->find('trash = 0 AND request_day = :request_day AND request_time = :request_time AND ((sender = :uid AND receiver = :fid) OR (sender = :fid AND receiver = :uid)) AND status = 1', 
// 					array(":uid"=>$user->id, ":fid"=>$_GET['receiver'], ":request_day"=>$_GET['request_day'], ":request_time"=>$_GET['request_time']));
		

// 		if($check_if_busy){
// 			$this->sendJSONResponse(array(
// 				'error'=>'the other party has been matched with you already! RID:'.$check_if_busy->id
// 			));
// 			exit();
// 		}

// 		if($request && $decision == 1){	//i approve a request

// 			$request->time_word = $time_word;
// 			$request->status = 1;	//approve, since it's mutual!
// 			$request->save(false);

// 			$status = "matched";
// 			$friend = Users::model()->findByPk($request->sender);

// 			//send notification to the other party and tell them they are matched with you.
// 			$data = array(
// 				'title'=>'You have been matched with '.$user->username.' '.$time_word.'!',
// 				'type'=>3,						//3 for match
// 				'user_id'=>$friend->id,
// 				'username'=>$user->username,
// 				'avatar'=>$user->avatar,
// 				'email'=>$user->email,
// 				'phone'=>$user->phone,
// 				'day'=>$_GET['request_day'],
// 				'sender_id'=>$user->id,
// 			);
// 			$user->sendNotification($data);

// 		}else if($decision == 1){	//no request sent to me, i sent out request

// 			$old = Requests::model()->find('trash = 0 AND request_day = :request_day AND request_day = :request_time AND receiver = :uid AND sender = :me', 
// 					array(':me'=>$user->id, ":uid"=>$_GET['receiver'], ":request_day"=>$_GET['request_day'], ":request_time"=>$_GET['request_time']));
// 			if(!$old){
// 				$request = new Requests;
// 				$request->activity = $activity;
// 				if(isset($_GET['super'])){
// 					$request->super = $_GET['super'];
// 				}
// 				$request->create_time = time();
// 				$request->sender = $user->id;
// 				$request->request_day = $_GET['request_day'];	//0 for sunday, 1 for monday...
// 				$request->request_time = $_GET['request_time'];
// 				$request->receiver = $_GET['receiver'];
// 				$request->status = 0;
// 				if($time_word == "Now"){
// 					$request->request_time = 3; //force it!
// 				}
// 				$request->time_word = $time_word;
// 				if($request->super || $request->request_time == 3){
// 					$request->pushed = 1;	//we push super and NOW likes right away
// 				}
// 				$request->save(false);
// 			}else{
// 				$request = $old;
// 			}

// 			$status = "sent";

// 			$check_if_busy = false; 	//we allow multiple match now.

// 			//if the other party disliked you already, do not bother them anymore...
// 			$check_if_denied = Requests::model()->find('trash = 0 AND request_day = :request_day AND request_time = :request_time AND sender = :fid AND receiver = :uid AND status > 1', 
// 					array(":fid"=>$request->receiver, ":uid"=>$user->id, ":request_day"=>$_GET['request_day'], ":request_time"=>$_GET['request_time']));

// 			if(!$check_if_busy){	//&& !$check_if_denied
// 				//if not busy, send notification to your FRIEND(the one you requested) and tell him someone liked him!
// 				if($request->super && !$check_if_denied){	//super like or denied, if denied by the other party, we do not want to tell them that it's you that want to go out?
// 					$friend = Users::model()->findByPk($request->sender);
// 					$type = 6;		//6 for super like
// 					$append_string = "";
// 					if($request->request_time == 3){
// 						$append_string = "(request expires in 2 hrs)";
// 					}
// 					$title = $friend->username." wants to ".$activity." with you ".$time_word."! Open timi and swipe right to respond! ".$append_string;
// 					$data = array(
// 						'title'=>$title,
// 						'type'=>$type,
// 						'user_id'=>$request->receiver,
// 						'sender_id'=>$friend->id,
// 						'username'=>$user->username,
// 						'avatar'=>$user->avatar,
// 						'email'=>$user->email,
// 						'phone'=>$user->phone,
// 						'day'=>$_GET['request_day'],
// 						'time'=>$_GET['request_time']
// 					);
// 					$user->sendNotification($data);
// 				//we push NOW likes right away!
// 				}else if($request->request_time == 3 && !$check_if_denied){
// 					$friend = Users::model()->findByPk($request->sender);
// 					$type = 2;		//6 for regular like
// 					$title = "1 friend wants to ".$activity." with you NOW! Open Timi and swipe right to see who! (request expires in 2 hrs)";
// 					$data = array(
// 						'title'=>$title,
// 						'type'=>$type,
// 						'user_id'=>$request->receiver,
// 						'sender_id'=>$friend->id,
// 						'username'=>$user->username,
// 						'avatar'=>$user->avatar,
// 						'email'=>$user->email,
// 						'phone'=>$user->phone,
// 						'day'=>$_GET['request_day'],
// 						'time'=>$_GET['request_time']
// 					);
// 					$user->sendNotification($data);
// 				}else{
// 					//normal like, no super like. 
// 					//we do not push notification here since we push them every 30 min to an hour in crontab...
// 				}
// 			}
// 		}else if($request && $decision == 2){	//request sent to me, i turned it down
// 			$request->time_word = $time_word;
// 			if($request->status != 2){		//if they turned you down, we keep it as 2...
// 				$request->status = 3;		//if you turn down someone, you are always the receiver of the request!!!
// 			}
// 			$request->save(false);
// 			$status = "rejected";

// 		}else if($decision == 2){	//no request sent to me, i just clicked dislike

// 			$old = Requests::model()->find('trash = 0 AND request_day = :request_day AND request_time = :request_time AND receiver = :uid AND sender = :me', 
// 					array(':me'=>$user->id, ":uid"=>$_GET['receiver'], ":request_day"=>$_GET['request_day'], ":request_time"=>$_GET['request_time']));
// 			if(!$old){
// 				$request = new Requests;
// 				$request->create_time = time();
// 				$request->sender = $user->id;
// 				$request->time_word = $time_word;
// 				$request->request_day = $_GET['request_day'];	//0 for sunday, 1 for monday...
// 				$request->request_time = $_GET['request_time'];
// 				$request->receiver = $_GET['receiver'];
// 				$request->status = 2;	//save as rejection
// 				$request->save(false);
// 			}
// 			$status = "disliked";
// 		}

// 		$this->sendJSONResponse(array(
// 			'status'=>$status,
// 		));		

// 	}


// 	public function actionReturnFriendInfo(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}
// 		$user->lastaction = time();
// 		$user->save();

// 		if(isset($_GET['number'])){
// 			$number = $this->cleanPhoneNumber($_GET['number']);
// 			$friend = Users::model()->findByAttributes(array('phone'=>$number));
// 			if($friend){
// 				$this->sendJSONResponse(array(
// 					'user_id'=>$friend->id,
// 					'username'=>$friend->username,
// 					'avatar'=>$friend->avatar,
// 					'phone'=>$friend->phone,
// 					'country'=>$friend->country,
// 					'favorites'=>$friend->favorites,
// 					'whatsup'=>$friend->whatsup,
// 					'current'=>$friend->current,
// 				));
// 			}else{
// 				$this->sendJSONResponse(array(
// 					'error'=>'Sorry, we can not find the user you are looking for.'
// 				));
// 				exit();	
// 			}
// 		}else if(isset($_GET['user_id'])){
// 			$friend = Users::model()->findByPk($_GET['user_id']);
// 			if($friend){
// 				$this->sendJSONResponse(array(
// 					'user_id'=>$friend->id,
// 					'username'=>$friend->username,
// 					'avatar'=>$friend->avatar,
// 					'phone'=>$friend->phone,
// 					'country'=>$friend->country,
// 					'favorites'=>$friend->favorites,
// 					'whatsup'=>$friend->whatsup,
// 					'current'=>$friend->current,
// 				));
// 			}else{
// 				$this->sendJSONResponse(array(
// 					'error'=>'Sorry, we can not find the user you are looking for.'
// 				));
// 				exit();	
// 			}
// 		}else{
// 			$this->sendJSONResponse(array(
// 				'error'=>'No number or user_id'
// 			));
// 			exit();	
// 		}

// 	}

// 	/*
// 	*	This function returns your personal information (edit if passed param)
// 	*/
// 	public function actionReturnInfo(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(isset($_GET['email'])){
// 			$user->email = $_GET['email'];
// 		}
// 		if(isset($_GET['phone'])){
// 			$user->phone = trim($_GET['phone']);
// 		}
// 		if(isset($_GET['country'])){
// 			$user->city = $_GET['country'];
// 		}
// 		if(isset($_GET['city'])){
// 			$user->city = $_GET['city'];
// 		}
// 		if(isset($_GET['geolocation'])){
// 			$user->geolocation = $_GET['geolocation'];
// 			$user->updatePointLocation(explode(",", $user->geolocation));
// 		}
// 		if(isset($_GET['favorites'])){
// 			$user->favorites = $_GET['favorites'];
// 		}
// 		if(isset($_GET['whatsup'])){
// 			$user->whatsup = strip_tags($_GET['whatsup']);
// 		}
// 		if(isset($_GET['friend_friend'])){
// 			$user->friend_friend = $_GET['friend_friend'];
// 		}
// 		if(isset($_GET['current'])){
// 			$user->current = strip_tags($_GET['current']);
// 		}
// 		if(isset($_GET['range'])){
// 			$user->range = strip_tags($_GET['range']);
// 		}
		
// 		$user->lastaction = time();
// 		$user->save(false);

// 		$this->sendJSONResponse(array(
// 			'username'=>$user->username,
// 			'avatar'=>$user->avatar,
// 			'email'=>$user->email,
// 			'phone'=>$user->phone,
// 			'country'=>$user->country,
// 			'city'=>$user->city,
// 			'geolocation'=>$user->geolocation,
// 			'favorites'=>$user->favorites,
// 			'whatsup'=>$user->whatsup,
// 			'range'=>$user->range,
// 			'current'=>$user->current,
// 			'friend_friend'=>$user->friend_friend,
// 			'points'=>$user->points
// 		));

// 	}


// 	/*
// 	*	This function returns other's information
// 	*/
// 	public function actionReturnUserInfo(){

// 		if(!isset($_GET['user_id'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByPk($_GET['user_id']);
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$this->sendJSONResponse(array(
// 			'user_id'=>$user->id,
// 			'username'=>$user->username,
// 			'avatar'=>$user->avatar,
// 			'email'=>$user->email,
// 			'phone'=>$user->phone,
// 			'country'=>$user->country,
// 			'city'=>$user->city,
// 			'geolocation'=>$user->geolocation,
// 			'favorites'=>$user->favorites,
// 			'whatsup'=>$user->whatsup,
// 			'range'=>$user->range,
// 			'current'=>$user->current,
// 			'friend_friend'=>$user->friend_friend,
// 			'points'=>$user->points
// 		));

// 	}



// 	/*
// 	*	Return unread swipe / unread likes
// 	*/
// 	public function actionUnprocessedSwipe(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		if(!isset($_GET['day'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no specific days'
// 			));
// 			exit();	
// 		}

// 		$day = $_GET['day'];

// 		$user->lastaction = time();
// 		$user->save();

// 		$tomorrow = ($_GET['day'] + 1) % 7;

// 		$day_after = ($_GET['day'] + 2) % 7;

// 		$today = Requests::model()->count('trash = 0 AND request_day = :request_day AND request_time = 0 AND receiver = :me AND status = 0', 
// 						array(":me"=>$user->id, ":request_day"=>$_GET['day']));

// 		$tomorrow = Requests::model()->count('trash = 0 AND request_day = :request_day AND request_time = 0 AND receiver = :me AND status = 0', 
// 						array(":me"=>$user->id, ":request_day"=>$tomorrow));

// 		$day_after = Requests::model()->count('trash = 0 AND request_day = :request_day AND request_time = 0 AND receiver = :me AND status = 0', 
// 						array(":me"=>$user->id, ":request_day"=>$day_after));

// 		$result = array($today,$tomorrow,$day_after);

// 		$result = json_encode($result);

// 		$this->sendJSONResponse(array(
// 			'result'=>$result
// 		));

// 	}


// 	/*
// 	*	Cancel a match
// 	*/
// 	/*
// 	public function actionCancelMatch(){
// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		if(!isset($_GET['request_id'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no request id'
// 			));
// 			exit();
// 		}else{
// 			$request = Requests::model()->findByPk($_GET['request_id']);
// 			if(!$request){
// 				$this->sendJSONResponse(array(
// 					'error'=>'no request found'
// 				));
// 				exit();
// 			}
// 		}

// 		$cancel = new Cancel;
// 		$cancel->request_id = $request->id;
// 		$cancel->owner_id = $user->id;
// 		$cancel->create_time = time();
// 		if(isset($_GET['reason'])){
// 			$cancel->reason = $_GET['reason'];
// 		}
// 		$cancel->save();

// 		$request->delete();

// 		$time_word = "today";

// 		if($request->request_time == 0){
// 			$time_word = "this noon";
// 		}else if($request->request_time == 1){
// 			$time_word = "this evening";
// 		}else if($request->request_time == 2){
// 			$time_word = "tonight";
// 		}

// 		if($user->id == $request->receiver){	//if i am receiver, the other guy is sender. 
// 			$friend = Users::model()->findByPk($request->sender);
// 		}else{
// 			$friend = Users::model()->findByPk($request->receiver);
// 		}

// 			//send notification to the other party and tell them they are matched with you.
// 			$data = array(
// 				'title'=>'Sorry! Your match with '.$user->username.' for '.$time_word.' has been cancelled.',
// 				'type'=>4,						//4 for cancel
// 				'user_id'=>$friend->id,
// 				'username'=>$user->username,
// 				'avatar'=>$user->avatar,
// 				'email'=>$user->email,
// 				'phone'=>$user->phone,
// 				'country'=>$user->country,
// 				'city'=>$user->city,
// 				'geolocation'=>$user->geolocation,
// 				'day'=>$request->request_day,
// 				'time'=>$request->request_time,
// 			);
// 			$user->sendNotification($data);

// 		$this->sendJSONResponse(array(
// 			'success'=>'cancelled',
// 		));	
// 	}
// 	*/

// 	/*
// 	*	Returns the # of cancels you request in the last 30 days
// 	*/
// 	public function actionGetCancelCount(){

// 		if(!isset($_GET['user_token'])){
// 			$this->sendJSONResponse(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
// 			if(!$user){
// 				$this->sendJSONResponse(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$total_cancel = Cancel::count('owner_id = :uid AND create_time > unix_timestamp() - 86400 * 30', array(":uid"=>$user->id));

// 		$this->sendJSONResponse(array(
// 			'total'=>$total_cancel,
// 		));	

// 	}




// 	/*
// 	*	This function handles change avatar for students.
// 	*   And update whatsup (optional)
// 	*/
// 	public function actionChangeAvatar(){

// 		if(!isset($_POST['user_token'])){
// 			$this->sendJSONPost(array(
// 				'error'=>'no user token'
// 			));
// 			exit();
// 		}else{
// 			$user = Users::model()->findByAttributes(array('user_token'=>$_POST['user_token']));
// 			if(!$user){
// 				$this->sendJSONPost(array(
// 					'error'=>'invalid user token'
// 				));
// 				exit();	
// 			}
// 		}

// 		$user->lastaction = time();
// 		$user->save();

// 		if(isset($_FILES['file']))
// 		{

// 			if(isset($_FILES['file'])){
// 						$filename = "avatar" . time() . rand(1, 999) . ".jpg";

// 						if (!isset($_FILES["file"]["tmp_name"]) || !$_FILES["file"]["tmp_name"]) {
// 							$this->sendJSONPost(array(
// 								'error' => 'No picture posted.'
// 							));
// 							exit();
// 						}

// 						$new_image_name = $filename; //strtolower($_FILES['file']['name']);

// 						$fileSavePath = "uploads/avatar/" . $user->id . "/";
// 						if (!file_exists($fileSavePath)) {
// 							mkdir($fileSavePath, 0777, true);
// 						}
// 						move_uploaded_file($_FILES["file"]["tmp_name"], $fileSavePath.$new_image_name);

// 						$user->avatar = Yii::app()->params['globalURL']."/".$fileSavePath.$new_image_name;

// 			}

// 			$user->save();

// 			$this->sendJSONPost(array(
// 				'avatar' => $user->avatar,
// 			));

// 		}else{
// 			$this->sendJSONPost(array(
// 				'error' => 'No post file or status',
// 			));
// 		}
// 	}



// 	public function actionAddTaxiDeviceToken(){

// 		// if(!isset($_GET['passcode']) || $_GET['passcode'] != "86626728"){
// 		// 	$this->sendJSONPost(array(
// 		// 		'error'=>'no passcode'
// 		// 	));
// 		// 	exit();
// 		// }

// 		header('Access-Control-Allow-Origin: *');
// 		header('Access-Control-Allow-Methods: GET');
// 		header('Access-Control-Max-Age: 1000');

// 		TaxiDeviceToken::model()->addNewToken();

// 		$this->sendJSONPost(array(
// 			'success'=>'success',
// 		));	
// 	}


// 	public function actionGetUberEstimates(){

// 		header('Access-Control-Allow-Origin: *');
// 		header('Access-Control-Allow-Methods: GET');
// 		header('Access-Control-Max-Age: 1000');

// 		$start_latitude = $_GET['start_latitude'];
// 		$start_longitude = $_GET['start_longitude'];
// 		$end_latitude = $_GET['end_latitude'];
// 		$end_longitude = $_GET['end_longitude'];

// 		// $start_latitude = "40.7612137";
// 		// $start_longitude = "-74.0014306";
// 		// $end_latitude = "40.749431";
// 		// $end_longitude = "-73.9896645";

// 		$results = EstimateTaxi::getUberEstimates($start_latitude, $start_longitude, $end_latitude, $end_longitude);

// 		$this->sendJSONPost(array(
// 			'total'=>json_encode($results),
// 		));	

// 	}



// 	public function actionGetLyftEstimates(){

// 		header('Access-Control-Allow-Origin: *');
// 		header('Access-Control-Allow-Methods: GET');
// 		header('Access-Control-Max-Age: 1000');

// 		$start_latitude = $_GET['start_latitude'];
// 		$start_longitude = $_GET['start_longitude'];
// 		$end_latitude = $_GET['end_latitude'];
// 		$end_longitude = $_GET['end_longitude'];

// 		// $start_latitude = "40.7612137";
// 		// $start_longitude = "-74.0014306";
// 		// $end_latitude = "40.749431";
// 		// $end_longitude = "-73.9896645";

// 		$results = EstimateTaxi::getLyftEstimates($start_latitude, $start_longitude, $end_latitude, $end_longitude);

// 		$this->sendJSONPost(array(
// 			'total'=>json_encode($results),
// 		));	

// 	}



// 	/**
// 	 * This is the default 'index' action that is invoked
// 	 * when an action is not explicitly requested by users.
// 	 */
	// public function actionIndex()
	// {
	// 	// renders the view file 'protected/views/site/index.php'
	// 	// using the default layout 'protected/views/layouts/main.php'
	// 	$this->layout = false;
	// 	$this->render('app');
	// }



// 	/**
// 	 * This is the default 'index' action that is invoked
// 	 * when an action is not explicitly requested by users.
// 	 */
// 	public function actionIndex()
// 	{
// 		// renders the view file 'protected/views/site/index.php'
// 		// using the default layout 'protected/views/layouts/main.php'
// 		$this->layout = false;

// 		//for subscription
// 		$model=new WhitelistUsers;

// 		if(isset($_POST['WhitelistUsers']))
// 		{

// 			$model->attributes=$_POST['WhitelistUsers'];
// 			if($model->validate())
// 			{
// 				// $name='=?UTF-8?B?'.base64_encode($model->name).'?=';
// 				// $subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
// 				// $headers="From: $name <{$model->email}>\r\n".
// 				// 	"Reply-To: {$model->email}\r\n".
// 				// 	"MIME-Version: 1.0\r\n".
// 				// 	"Content-Type: text/plain; charset=UTF-8";

// 				// mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);

// 				$model = new WhitelistUsers;
// 				$model->create_time = time();
// 				$model->status = 1;
// 				$model->save();
// 				$model->userActed();


// 				//$message = new YiiMailMessage;
// 				//$message->view = 'registrationFollowup';
				 
// 				// //userModel is passed to the view
// 				// $message->setBody(array('userModel'=>$model), 'text/html');
// 				// $message->addTo($model->email);
// 				// $message->from = "system@iost.io";
// 				// Yii::app()->mail->send($message);

// 				Yii::app()->user->setFlash('subscribe','Thank you for your subscription. Stay tuned for more updates!');

// 				$this->refresh();
// 			}
// 		}

// 		$this->render('ios_index');
// 	}

// 	/**
// 	 * This is the action to handle external exceptions.
// 	 */
// 	public function actionError()
// 	{
// 		if($error=Yii::app()->errorHandler->error)
// 		{
// 			if(Yii::app()->request->isAjaxRequest)
// 				echo $error['message'];
// 			else
// 				$this->render('error', $error);
// 		}
// 	}

// 	// /**
// 	//  * Displays the contact page
// 	//  */
// 	// public function actionContact()
// 	// {
// 	// 	$model=new ContactForm;
// 	// 	if(isset($_POST['ContactForm']))
// 	// 	{
// 	// 		$model->attributes=$_POST['ContactForm'];
// 	// 		if($model->validate())
// 	// 		{
// 	// 			$name='=?UTF-8?B?'.base64_encode($model->name).'?=';
// 	// 			$subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
// 	// 			$headers="From: $name <{$model->email}>\r\n".
// 	// 				"Reply-To: {$model->email}\r\n".
// 	// 				"MIME-Version: 1.0\r\n".
// 	// 				"Content-Type: text/plain; charset=UTF-8";

// 	// 			mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);
// 	// 			Yii::app()->user->setFlash('contact','Thank you for contacting us. We will respond to you as soon as possible.');
// 	// 			$this->refresh();
// 	// 		}
// 	// 	}
// 	// 	$this->render('contact',array('model'=>$model));
// 	// }


// /*
// 	public function actionAcceptInstagramPost(){

// 		header('Access-Control-Allow-Origin: *');
// 		header('Access-Control-Allow-Methods: GET, POST');  

// 		$eventPic = new EventPic;
// 		$eventPic->event_id = 1;
// 		$eventPic->path = 1;
// 		$eventPic->save(false);

// 		if(isset($_GET['event_id'])){
// 			if(isset($_GET['pictures'])){
// 				$array = json_decode($_GET['pictures']);
// 				foreach($array as $arr){
// 					$eventPic = new EventPic;
// 					$eventPic->event_id = $_GET['event_id'];
// 					$eventPic->path = $arr;
// 					$eventPic->save(false);
// 				}
// 			}
// 		}

// 		return 200;
// 	}
// */


// 	/**
// 	 * Logs out the current user and redirect to homepage.
// 	 */
// 	public function actionLogout()
// 	{
// 		Yii::app()->user->logout();
// 		$this->redirect(Yii::app()->homeUrl);
// 	}
}
