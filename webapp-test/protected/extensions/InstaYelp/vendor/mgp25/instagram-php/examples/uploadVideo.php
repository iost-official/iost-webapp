<?php

include __DIR__.'/../vendor/autoload.php';
require '../src/Instagram.php';

/////// CONFIG ///////
$username = '';
$password = '';
$debug = false;

$video = '';     // path to the video
$caption = '';     // caption
//////////////////////

$i = new \InstagramAPI\Instagram($username, $password, $debug);

try {
    $i->login();
} catch (Exception $e) {
    $e->getMessage();
    exit();
}

try {
    $i->uploadVideo($video, $caption);
} catch (Exception $e) {
    echo $e->getMessage();
}
