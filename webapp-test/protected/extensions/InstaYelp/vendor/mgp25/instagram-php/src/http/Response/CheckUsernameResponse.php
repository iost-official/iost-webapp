<?php

namespace InstagramAPI;

class CheckUsernameResponse extends Response
{
    protected $username;
    protected $available;
    protected $status;
    protected $error = false;

    public function __construct($response)
    {
        if (self::STATUS_OK == $response['status']) {
            $this->username = $response['username'];
            $this->available = $response['available'];
            if (array_key_exists('error', $response)) {
                $this->error = $response['error'];
            }
        } else {
            $this->setMessage($response['message']);
        }
        $this->setStatus($response['status']);
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function isAvailable()
    {
        return $this->available;
    }

    public function getError()
    {
        return $this->error;
    }
}
