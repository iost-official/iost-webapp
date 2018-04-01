<?php

namespace InstagramAPI;

class UsernameSuggestionsResponse extends Response
{
    protected $username_suggestions = null;

    public function __construct($response)
    {
        if (self::STATUS_OK == $response['status']) {
            if (array_key_exists('username_suggestions', $response)) {
                $this->username_suggestions = $response['username_suggestions'];
            }
        } else {
            $this->setMessage($response['message']);
        }
        $this->setStatus($response['status']);
    }

    public function getUsernameSuggestions()
    {
        return $this->username_suggestions;
    }
}
