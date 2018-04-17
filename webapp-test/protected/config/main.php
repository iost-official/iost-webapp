<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Timi',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
	        'application.classes.*',
		    'application.models.*',
			'application.controllers.*',
			'application.components.*',
        	'application.modules.*',
        	'application.extensions.*',
        	'ext.yii-mail.YiiMailMessage',
        	'ext.imperavi-redactor-widget.ImperaviRedactorWidget',
			'ext.segment_analytics.lib.*',
			'ext.InstaYelp.*',
			'ext.GoogleVision.*',
			'ext.Taxi.*',
            'ext.medium.*',
	        'application.classes.*',
	),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		
		// 'gii'=>array(
		// 	'class'=>'system.gii.GiiModule',
		// 	'password'=>'86626728',
		// 	// If removed, Gii defaults to localhost only. Edit carefully to taste.
		// 	'ipFilters'=>array('*','::1'),
		// ),
		
	),

	// application components
	'components'=>array(

		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),

		// uncomment the following to enable URLs in path-format
		
		'urlManager'=>array(
			'urlFormat'=>'path',
            'showScriptName'=>false,
			'caseSensitive'=>false,  
			'routeVar'=>'route',
			'rules'=>array(
                '<view:(team|tech|resource|community|career)>' => 'site/<view>',
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
		
		'session' => array(
	    		'class' => 'system.web.CHttpSession',
	    		'autoStart' => true,
		),

        'clientScript'=>array(
            //'class'=>'ext.minScript.components.ExtMinScript',
            'packages'=>array(
                'jquery'=>false,
            ),
        ),


        'mail' => array(
            'class' => 'ext.yii-mail.YiiMail',
            'transportType' => 'smtp',
            'transportOptions'=>array(
                'host'=>'smtp.mailgun.org',
                'encryption'=>'ssl',
                'username'=>'postmaster@doraprinting.com',
                'password'=>'78ef396786f06b44294cd13d69fb81e7',
                'port'=>465,
            ),
            'viewPath' => 'application.views.mail',
            'logging' => false,
            'dryRun' => false,
        ),

        'citygeoip' => array(
            'class' => 'application.extensions.geoip.CityGeoIP',
            // specify filename location for the corresponding database
            'filename' => dirname(__FILE__).'/../../geoip/GeoIPCity.dat',
            // Choose MEMORY_CACHE or STANDARD mode
            'mode' => 'MEMORY_CACHE',
        ),


        'geoip' => array(
            'class' => 'application.extensions.geoip.CGeoIP',
            // specify filename location for the corresponding database
            'filename' => dirname(__FILE__).'/../../geoip/GeoIP.dat',
            // Choose MEMORY_CACHE or STANDARD mode
            'mode' => 'MEMORY_CACHE',
        ),

        'lang' => array(
            'class' => 'application.extensions.translate.IOSTranslate',
            'dictDir' => dirname(__FILE__).'/i18n',
            'validLang' => array('en', 'zh', 'ko'),
            'lang' => 'en',
            'cookieName' => 'lang',
        ),

		// database settings are configured in database.php
		'db'=>require(dirname(__FILE__).'/database.php'),

		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>YII_DEBUG ? null : 'site/error',
		),

		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/	
			),
		),

	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'globalURL'=>'http://iost.io',
		'adminEmail'=>'team@iost.io',
	),
);
