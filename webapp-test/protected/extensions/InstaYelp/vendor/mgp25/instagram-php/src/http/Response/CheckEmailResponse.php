<?php

namespace InstagramAPI;

class CheckEmailResponse extends Response
{
    protected $username;
    protected $confirmed;
    protected $status;
    protected $valid;
    protected $username_suggestions = null;

    public function __construct($response)
    {
        if (self::STATUS_OK == $response['status']) {
            $this->confirmed = $response['confirmed'];
            $this->available = $response['available'];
            $this->valid = $response['valid'];
            if (array_key_exists('username_suggestions', $response)) {
                $this->username_suggestions = $response['username_suggestions'];
            }
        } else {
            $this->setMessage($response['message']);
        }
        $this->setStatus($response['status']);
    }

    public function isConfirmed()
    {
        return $this->confirmed;
    }

    public function isAvailable()
    {
        return $this->available;
    }

    public function isValid()
    {
        return $this->valid;
    }

    public function getUsernameSuggestions()
    {
        return $this->username_suggestions;
    }
}
