<?php

/**
 * This is the model class for table "tbl_category".
 *
 * The followings are the available columns in table 'tbl_category':
 * @property integer $id
 * @property integer $name
 */
class Category extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_category';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('name', 'required'),
			array('name', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, name', 'safe', 'on'=>'search'),
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
			'name' => 'Name',
		);
	}


	public function getCategoryIdByString($findme){

		if (strpos( $findme, "Seafood") !== false || strpos( $findme, "American") !== false|| strpos( $findme, "French") !== false || strpos( $findme, "Italian") !== false || strpos( $findme, "Tapas") !== false || strpos( $findme, "Mediterranean") !== false || strpos( $findme, "Greek") !== false || strpos( $findme, "Steak") !== false) {
			return 5;
		}
		else if (strpos( $findme, "Japanese") !== false || strpos( $findme, "Sushi") !== false || strpos( $findme, "Ramen") !== false) {
			return 3;
		}
		else if (strpos( $findme, "Bars") !== false || strpos( $findme, "Lounges") !== false || strpos( $findme, "Cocktail") !== false) {
			return 4;
		}
		else if (strpos( $findme, "Brunch") !== false) {
			return 2;
		}
		else if (strpos( $findme, "Desserts") !== false || strpos( $findme, "Coffee") !== false || strpos( $findme, "Cream") !== false || strpos( $findme, "Chocolate") !== false) {
			return 7;
		}
		else if (strpos( $findme, "Korean") !== false) {
			return 8;
		}
		else if (strpos( $findme, "Chinese") !== false || strpos( $findme, "Shanghainese") !== false || strpos( $findme, "Asian") !== false || strpos( $findme, "Szechuan") !== false || strpos( $findme, "Dim Sum") !== false) {
			return 9;
		}
		else if (strpos( $findme, "Mexican") !== false || strpos( $findme, "Tapas") !== false || strpos( $findme, "Pizza") !== false || strpos( $findme, "Burgers") !== false ){
			return 10; 
		}else{
			return 0;
		}
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
		$criteria->compare('name',$this->name);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Category the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
