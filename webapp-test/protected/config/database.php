<?php

// This is the database connection configuration.
return array(
	'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
	// uncomment the following lines to use a MySQL database
	
	'connectionString' => 'mysql:host=localhost;dbname=main_db',
	'emulatePrepare' => true,
	'username' => 'root',
	'password' => 'Bell*86626728',
	'charset' => 'utf8',
	
);