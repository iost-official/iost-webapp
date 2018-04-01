<?php

namespace InstagramAPI;

class Checkpoint
{
    protected $username;
    protected $settingsPath;
    protected $settings;
    protected $userAgent;
    protected $debug;

    public function __construct($username, $settingsPath = null, $debug = false)
    {
        $this->username = $username;
        $this->debug = $debug;
        if (is_null($settingsPath)) {
            $this->settingsPath = __DIR__.DIRECTORY_SEPARATOR.'data'.DIRECTORY_SEPARATOR.$username.DIRECTORY_SEPARATOR;
            if (!file_exists($this->settingsPath)) {
                mkdir($this->settingsPath, 0777, true);
            }
        }
        $this->settings = new Settings($this->settingsPath.'settings-'.$username.'.dat');
        $this->userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G34 Instagram 8.5.2 (iPhone5,2; iPhone OS 9_3_3; es_ES; es-ES; scale=2.00; 640x1136)';
    }

    public function doCheckpoint()
    {
        $token = $this->checkpointFirstStep();
        $this->checkpointSecondStep($token);

        return $token;
    }

    public function checkpointFirstStep()
    {
        $response = $this->request('https://i.instagram.com/integrity/checkpoint/checkpoint_logged_out_main/'.$this->settings->get('username_id').'/?next=instagram%3A%2F%2Fcheckpoint%2Fdismiss');

        preg_match('#Set-Cookie: csrftoken=([^;]+)#', $response[0], $token);

        return $token;
    }

    public function checkpointSecondStep($token)
    {
        $post =
            [
                'csrfmiddlewaretoken' => $token[1],
                'email'               => 'Verificar por correo electrónico',
            ];

        $headers =
            [
                'Origin: https://i.instagram.com',
                'Connection: keep-alive',
                'Proxy-Connection: keep-alive',
                'Accept-Language: es-es',
                'Referer: https://i.instagram.com/integrity/checkpoint/checkpoint_logged_out_main/'.$this->settings->get('username_id').'/?next=instagram%3A%2F%2Fcheckpoint%2Fdismiss',
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            ];

        $this->request('https://i.instagram.com/integrity/checkpoint/checkpoint_logged_out_main/'.$this->settings->get('username_id').'/?next=instagram%3A%2F%2Fcheckpoint%2Fdismiss', $headers, $post);

        return $token;
    }

    public function checkpointThird($code, $token)
    {
        $post =
            [
                'csrfmiddlewaretoken' => $token,
                'response_code'       => $code,
            ];

        $headers =
            [
                'Origin: https://i.instagram.com',
                'Connection: keep-alive',
                'Proxy-Connection: keep-alive',
                'Accept-Language: es-es',
                'Referer: https://i.instagram.com/integrity/checkpoint/checkpoint_logged_out_main/'.$this->settings->get('username_id').'/?next=instagram%3A%2F%2Fcheckpoint%2Fdismiss',
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            ];

        $this->request('https://i.instagram.com/integrity/checkpoint/checkpoint_logged_out_main/'.$this->settings->get('username_id').'/?next=instagram%3A%2F%2Fcheckpoint%2Fdismiss', $headers, $post);
    }

    public function request($endpoint, $headers = null, $post = null, $first = true)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_USERAGENT, $this->userAgent);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        if (!is_null($headers)) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
        curl_setopt($ch, CURLOPT_VERBOSE, $this->debug);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $this->settingsPath.$this->username.'-cookies.dat');
        curl_setopt($ch, CURLOPT_COOKIEJAR, $this->settingsPath.$this->username.'-cookies.dat');


        if ($post) {
            curl_setopt($ch, CURLOPT_POST, count($post));
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
        }


        $resp = curl_exec($ch);
        $header_len = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($resp, 0, $header_len);
        $body = substr($resp, $header_len);

        curl_close($ch);

        if ($this->debug) {
            echo "REQUEST: $endpoint\n";
            if (!is_null($post)) {
                if (!is_array($post)) {
                    echo 'DATA: '.urldecode($post)."\n";
                }
            }
            echo "RESPONSE: $body\n\n";
        }

        return [$header, json_decode($body, true)];
    }
}
