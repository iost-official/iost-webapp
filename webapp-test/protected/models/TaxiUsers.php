<?php

/**
 * This is the model class for table "tbl_taxi_users".
 *
 * The followings are the available columns in table 'tbl_taxi_users':
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
 * @property string $ip
 * @property string $avatar
 * @property string $geolocation
 * @property integer $points
 */
class TaxiUsers extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_taxi_users';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('create_time, user_token, username', 'required'),
			array('social_token_type, create_time, lastaction, status, gender, points', 'numerical', 'integerOnly'=>true),
			array('username', 'length', 'max'=>200),
			array('password, social_token, user_token, email', 'length', 'max'=>300),
			array('social_id, ip', 'length', 'max'=>100),
			array('phone', 'length', 'max'=>30),
			array('city, country', 'length', 'max'=>50),
			array('avatar, geolocation', 'length', 'max'=>500),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, username, password, social_id, social_token, user_token, social_token_type, email, phone, create_time, lastaction, status, city, country, gender, ip, avatar, geolocation, points', 'safe', 'on'=>'search'),
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
			'ip' => 'Ip',
			'avatar' => 'Avatar',
			'geolocation' => 'Geolocation',
			'points' => 'Points',
		);
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
		$criteria->compare('ip',$this->ip,true);
		$criteria->compare('avatar',$this->avatar,true);
		$criteria->compare('geolocation',$this->geolocation,true);
		$criteria->compare('points',$this->points);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return TaxiUsers the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
