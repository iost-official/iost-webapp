<?php

namespace InstagramAPI;

class FollowerResponse extends Response
{
    protected $followers;

    public function __construct($response)
    {
        if (self::STATUS_OK == $response['status']) {
            $users = [];
            foreach ($response['users'] as $user) {
                $users[] = new User($user);
            }
            $this->followers = $users;
        } else {
            $this->setMessage($response['message']);
        }
        $this->setStatus($response['status']);
    }

    public function getFollowers()
    {
        return $this->followers;
    }
}
