<?php

namespace InstagramAPI;

class ChallengeResponse extends Response
{
    public function __construct($response)
    {
        if (self::STATUS_OK == $response['status']) {
        } else {
            $this->setMessage($response['message']);
        }
        $this->setStatus($response['status']);
    }
}
