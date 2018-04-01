<?php

/**
 * This is the model class for table "tbl_whitelistUsers".
 *
 * The followings are the available columns in table 'tbl_whitelistUsers':
 * @property string $id
 * @property string $email
 * @property integer $create_time
 * @property string $city
 * @property string $country
 * @property string $ip
 */
class WhitelistUsers extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_whitelistUsers';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('create_time, email, status', 'required'),
			array('create_time', 'numerical', 'integerOnly'=>true),
			array('email', 'length', 'max'=>200),
			array('email', 'unique', 'message'=>'This email already exists.'),
			array('email','email','message'=>'This email address is invalid.'),
			array('city, country, ip', 'length', 'max'=>100),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, email, create_time, city, country, ip', 'safe', 'on'=>'search'),
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
			'email' => 'Email',
			'create_time' => 'Create Time',
			'city' => 'City',
			'country' => 'Country',
			'ip' => 'Ip',
		);
	}


	/**
	 * This function updates the lastaction time in the user model, and also sets
	 * the location city.
	 *
	 * @return null
     */
	public function userActed() {

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

		$criteria->compare('id',$this->id,true);
		$criteria->compare('email',$this->email,true);
		$criteria->compare('create_time',$this->create_time);
		$criteria->compare('city',$this->city,true);
		$criteria->compare('country',$this->country,true);
		$criteria->compare('ip',$this->ip,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return WhitelistUsers the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
