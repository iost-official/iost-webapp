<?php

/**
 * This is the model class for table "tbl_users".
 *
 * The followings are the available columns in table 'tbl_users':
 * @property integer $id
 * @property string $username
 * @property string $password
 * @property string $social_id
 * @property string $social_token
 * @property string $user_token
 * @property integer $social_token_type
 * @property string $email
 * @property string $phone
 * @property integer $create_time
 * @property integer $lastaction
 * @property integer $status
 * @property string $city
 * @property string $country
 * @property integer $gender
 */
class Users extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_users';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_token, create_time, username', 'required'),
			array('social_id, social_token_type, create_time, lastaction, status, gender, friend_friend, points', 'numerical', 'integerOnly'=>true),
			array('username, user_token', 'length', 'max'=>200),
			array('password, social_token, email', 'length', 'max'=>300),
			array('avatar, geolocation, favorites', 'length', 'max'=>500),
			array('social_id, ip', 'length', 'max'=>100),
			array('whatsup, current', 'length', 'max'=>200),
			array('phone', 'length', 'max'=>30),
			array('city, country, range', 'length', 'max'=>50),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, username, password, social_id, social_token, user_token, social_token_type, email, phone, create_time, lastaction, status, city, country, gender', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'username' => 'Username',
			'password' => 'Password',
			'social_id' => 'Social',
			'social_token' => 'Social Token',
			'user_token' => 'User Token',
			'social_token_type' => 'Social Token Type',
			'email' => 'Email',
			'phone' => 'Phone',
			'create_time' => 'Create Time',
			'lastaction' => 'Lastaction',
			'status' => 'Status',
			'city' => 'City',
			'country' => 'Country',
			'gender' => 'Gender',
		);
	}


	// Save fb's profile picture to local.
	public function saveFacebookProfilePicture(){

		$url = $this->avatar;

		if (strpos($url, 'facebook') !== false) {

			$fbprofileimage = file_get_contents($url); 

			$filename = "avatar" . time() . rand(1, 999) . ".jpg";
			$new_image_name = $filename; //strtolower($_FILES['file']['name']);
			$fileSavePath = "uploads/avatar/" . $this->id . "/";
			if (!file_exists($fileSavePath)) {
				mkdir($fileSavePath, 0777, true);
			}
			file_put_contents('/var/www/html/webapp/'.$fileSavePath.$new_image_name, $fbprofileimage);
			$this->avatar = Yii::app()->params['globalURL']."/".$fileSavePath.$new_image_name;
			$this->save();

		}else{
			return false;
		}

	}


	/**
	* This function updates the friend list of a user - INPUT array of facebook IDs
	*/	
	public function updateFriendsViaFB($array){
		foreach($array as $arr){
			$user = Users::model()->findByAttributes(array('social_id'=>$arr['id']));
			if($user){	//should be able to find him since FB only returns friends that use this app already.
				$friends = Friends::model()->find('accept > 0 AND ((sender = :uid AND receiver = :myid) OR (sender = :myid AND receiver = :uid))',array(':uid'=>$user->id, ':myid'=>$this->id));
				if(!$friends){
					$friends = new Friends;
					$friends->sender = $this->id;
					$friends->receiver = $user->id;
					$friends->create_time = time();
					$friends->save(false);

					//send notification to the your friend and tell them you just signed up.
					$data = array(
						'title'=>'Your friend '.$this->username.' just joined Timi!',	//your own username
						'type'=>1,
						'user_id'=>$user->id,	//your friend's id
					);
					$this->sendNotification($data);
				}
			}
		}
		return;
	}

	public function updatePoints(){
		$bonus = 50;

		$old = LoginPoints::model()->find('user_id = :uid AND create_time >= unix_timestamp() - 86400', array(":uid"=>$this->id));	//bonus in the last 24

		if($old){
			// do nothing, he got the bonus already
			return false;
		}else{
			$this->points += $bonus;
			$this->save();

			$points = new LoginPoints;
			$points->user_id = $this->id;
			$points->create_time = time();
			$points->points += $bonus;
			$points->save(false);
			return true;
		}
	}


	/**
	 * This function updates the lastaction time in the user model, and also sets
	 * the location city.
	 *
	 * @return null
     */
	public function userActed() {

		$this->lastaction = time();

		if(isset($_SERVER['HTTP_CF_CONNECTING_IP'])){

			$location = @Yii::app()->citygeoip->lookupLocation($_SERVER['HTTP_CF_CONNECTING_IP']);
			if ($location) {
				$this->city = $location->city;
			}

			$location = Yii::app()->geoip->lookupCountryCode($_SERVER['HTTP_CF_CONNECTING_IP']);
			if ($location) {
				$this->country = $location;
			}
			$this->ip = $_SERVER['HTTP_CF_CONNECTING_IP'];

		} else {

			$location = @Yii::app()->citygeoip->lookupLocation($_SERVER['REMOTE_ADDR']);
			if ($location) {
				$this->city = $location->city;
			}

			$location = Yii::app()->geoip->lookupCountryCode($_SERVER['REMOTE_ADDR']);
			if ($location) {
				$this->country = $location;
			}
			$this->ip = $_SERVER['REMOTE_ADDR'];
		}

		$this->save();
	}




	//return mutual friend list (ids) of 2 users: user_id and friend_id
	public function getMutualFriends($user_id, $friend_id){

		$count_user = Friends::model()->count('accept = 1 AND (sender = :uid OR receiver = :uid)', array(":uid"=>$user_id));
		$count_friend = Friends::model()->count('accept = 1 AND (sender = :uid OR receiver = :uid)', array(":uid"=>$friend_id));
		if($count_user > $count_friend){	//swipe for user, we only loop for the one with fewer friends.
			$tmp = $user_id;
			$user_id = $friend_id;
			$friend_id = $tmp;
		}

		$friends = Friends::model()->findAll('accept = 1 AND (sender = :uid OR receiver = :uid)', array(":uid"=>$user_id));
		$mutual = array();
		foreach($friends as $friend){
			if($friend->sender == $user_id){
				$other = $friend->receiver;
			}else{
				$other = $friend->sender;
			}
			$mut = Friends::model()->find('accept = 1 AND((sender = :uid AND receiver = :fid) OR (sender = :fid AND receiver = :uid))', array(":uid"=>$other, ":fid"=>$friend_id));
			if($mut){
				if($mut->sender == $other){
					$refer = $mut->sender;
				}else{
					$refer = $mut->receiver;
				}
				if (!in_array($refer, $mutual)) {	//check duplicates
					$referObj = Users::model()->findByPk($refer);
					if($referObj && $refer != $user_id && $refer != $friend_id){
						$mutual[$refer] = array(
							"username"=>$referObj->username,
							//"avatar"=>$referObj->avatar
						);
					}
				}
			}
		}

		return $mutual;
	}



	public function sendNotification($data){	//pass in ['title'], ['user_id'], ['type']
		$notifs = DeviceToken::model()->findAllByAttributes(array("user_id"=>$data['user_id']));
		foreach($notifs as $notif){
			if ($notif && $notif->token) {
				$data["token"] = $notif->token;
				$data["unread"] = 1;	//1 for now
				if($notif->device == "iOS"){
			 		$url = Yii::app()->params['globalURL'].'/simplepush/iospush.php?'.http_build_query($data);
			 	}else{
			 		$url = Yii::app()->params['globalURL'].'/simplepush/androidpush.php?'.http_build_query($data);
			 	}
				$ch  = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //this prevent printing the 200json code
				curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1); //timeout 1s
				curl_setopt($ch, CURLOPT_TIMEOUT, 1); //timeout 1s
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				$result = curl_exec($ch);
				curl_close($ch);
			}
		}
	}


	//This function added Geolocation for SPA index in tbl_geolocation.
	//This table is using MyISAM right now, we need to update mysql to 5.7.5+ to be able to change it to INNODB at some point.
	public function updatePointLocation($data){
		$geolocation = Geolocation::model()->findByPk($this->id);
		if(!$geolocation){
			$geolocation = new Geolocation;
			$geolocation->user_id = $this->id;
		}
		$geolocation->location = new CDbExpression("GeomFromText(:point)",
        array(':point'=>'POINT('.$data[0].' '.$data[1].')'));
		$geolocation->save(false);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('username',$this->username,true);
		$criteria->compare('password',$this->password,true);
		$criteria->compare('social_id',$this->social_id,true);
		$criteria->compare('social_token',$this->social_token,true);
		$criteria->compare('user_token',$this->user_token,true);
		$criteria->compare('social_token_type',$this->social_token_type);
		$criteria->compare('email',$this->email,true);
		$criteria->compare('phone',$this->phone,true);
		$criteria->compare('create_time',$this->create_time);
		$criteria->compare('lastaction',$this->lastaction);
		$criteria->compare('status',$this->status);
		$criteria->compare('city',$this->city,true);
		$criteria->compare('country',$this->country,true);
		$criteria->compare('gender',$this->gender);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Users the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
