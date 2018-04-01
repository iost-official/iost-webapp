<?php

    date_default_timezone_set("America/New_York");  //set it to NEW YORK FOR NOW

class GoogleVision
{
    //$term is the type of stuff you want to filter, we accept an array for that
    //$url is the url of the picture
    public static function start($term, $url, $score){

        $api_key = "AIzaSyCno-uTnHc3UVQMCHiyn0oZ65xV_bhO8D8";
        $cvurl = 'https://vision.googleapis.com/v1/images:annotate?key=' . $api_key;
        $type = 'LABEL_DETECTION';
        $type2 = 'FACE_DETECTION';

        $image = file_get_contents($url);
        if (!$image) {
            die("Error: invalid image URL");
        }
        $base64 = base64_encode($image);
        $request_json = '
        {
            "requests": [
                {
                    "image": {
                        "content":"' . $base64 . '"
                    },
                    "features": [
                        {
                            "type": "' . $type . '",
                            "maxResults": 10
                        }
                    ]
                }
            ]
        }';
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $cvurl);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $request_json);
        $json_response = curl_exec($curl);
        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($status != 200) {
            die("Error: call to URL $cvurl failed with status $status, response $json_response, curl_error " . curl_error($curl) . ', curl_errno ' . curl_errno($curl));
        }

        $array = json_decode($json_response, true);

        if(!isset($array['responses']) && !isset($array['responses'][0]) || !isset($array['responses'][0]['labelAnnotations'])){
            return false;
        }

        // //check if there is face!
        if(isset($array['responses'][0]['faceAnnotations'])){
            return false;
        }

        $array = $array['responses'][0]['labelAnnotations'];

        $pass = false;

        foreach($array as $ar){
            if(isset($ar['description']) && isset($ar['score'])){
                if (in_array(strtolower($ar['description']), $term) && $ar['score'] >= $score){
                    $pass = true;
                }
            }
        }

        return $pass;
    }




}