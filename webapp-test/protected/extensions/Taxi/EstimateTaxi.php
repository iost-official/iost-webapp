<?php

date_default_timezone_set("America/New_York");  //set it to NEW YORK FOR NOW

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


class EstimateTaxi
{

    public static function getUberEstimates($start_latitude, $start_longitude, $end_latitude, $end_longitude){

        $geo = [
            'start_latitude' => $start_latitude,
            'start_longitude' => $start_longitude,
            'end_latitude' => $end_latitude,
            'end_longitude' => $end_longitude,
        ];

        $serverToken = 'BbkXD6hxXLaymehAJqnhoMOjb77UdExTFp6OKH5I';

        $params = array_merge($geo, ['server_token' => $serverToken]);

        $url = 'https://api.uber.com/v1/estimates/price?' .http_build_query($params);
        //step1
        $cSession = curl_init();
        //step2
        curl_setopt($cSession,CURLOPT_URL, $url);
        curl_setopt($cSession,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($cSession,CURLOPT_HEADER, false);
        //step3
        $result=curl_exec($cSession);
        //step4
        curl_close($cSession);
        //step5
        $result = json_decode($result);
        $products = (array) $result->prices;

        $url = 'https://api.uber.com/v1/estimates/time?' .http_build_query($params); //https://sandbox-api.uber.com
        //step1
        $cSession = curl_init();
        //step2
        curl_setopt($cSession,CURLOPT_URL, $url);
        curl_setopt($cSession,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($cSession,CURLOPT_HEADER, false);
        //step3
        $result=curl_exec($cSession);
        //step4
        curl_close($cSession);
        //step5
        $result = json_decode($result);
        $times = (array) $result->times;

        foreach($products as $product) {
            foreach($times as $time) {
                if($product->product_id == $time->product_id) {
                    $product->pickupWaitingTime = $time->estimate;
                }
            }
        }

        // $response = [
        //     'uber' => $products,
        // ];

        return $products;
    }


    public static function getLiftAccessToken($client_id, $secret)
    {
        // The data to send to the API
        $postData = array(
            'grant_type' => 'client_credentials',
            'scope' => 'public'
            );

        // Setup cURL
        $ch = curl_init('https://api.lyft.com/oauth/token');

        curl_setopt_array($ch, array(
            CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
            CURLOPT_USERPWD => "kV15Sk9GxbhJ:xDwLT2A7PpOL889oCCF7zNdr9l_ILanZ",
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
            CURLOPT_POSTFIELDS => json_encode($postData)
        ));

        // Send the request
        $response = curl_exec($ch);

        // Check for errors
        if($response === FALSE){
            die(curl_error($ch));
        }

        // Decode the response
        $responseData = json_decode($response, TRUE);

        curl_close($ch);

        // return the response
        return $responseData['access_token'];
    }


    public static function getLyftEstimates($start_latitude, $start_longitude, $end_latitude, $end_longitude){

        $geo = [
            'start_lat' => $start_latitude,
            'start_lng' => $start_longitude,
            'end_lat' => $end_latitude,
            'end_lng' => $end_longitude,
        ];

        $client_id = 'kV15Sk9GxbhJ';
        $secret = 'xDwLT2A7PpOL889oCCF7zNdr9l_ILanZ';
        $accessToken = self::getLiftAccessToken($client_id, $secret);
        $url = 'https://api.lyft.com/v1/cost?' .http_build_query($geo);
        $headers[] = 'Authorization: Bearer ' . $accessToken;
        //step1
        $cSession = curl_init();
        //step2
        curl_setopt($cSession,CURLOPT_URL, $url);
        curl_setopt($cSession,CURLOPT_RETURNTRANSFER,true);
        //curl_setopt($cSession, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($cSession,CURLOPT_HTTPHEADER, $headers);
        //step3
        $result=curl_exec($cSession);
        //step4
        curl_close($cSession);
        //step5
        $result = json_decode($result);
        
        $costs = $result->cost_estimates;
        
        $geo = [
            'lat' => $start_latitude,
            'lng' => $start_longitude,
        ];
        
        $url = 'https://api.lyft.com/v1/eta?' .http_build_query($geo);
        //step1
        $cSession = curl_init();
        //step2
        curl_setopt($cSession,CURLOPT_URL, $url);
        curl_setopt($cSession,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($cSession,CURLOPT_HTTPHEADER, $headers);
        //step3
        $result=curl_exec($cSession);
        //step4
        curl_close($cSession);
        //step5
        $result = json_decode($result);
        $times = $result->eta_estimates;

        foreach($costs as $cost) {
            foreach($times as $time) {
                if($cost->ride_type == $time->ride_type) {
                    $cost->pickupWaitingTime = $time->eta_seconds;
                }
            }
        }

        return $costs;

    }




}