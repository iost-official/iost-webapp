<?php

namespace InstagramAPI;

class FollowingResponse extends Response
{
    protected $followings;

    public function __construct($response)
    {
        if (self::STATUS_OK == $response['status']) {
            $users = [];
            foreach ($response['users'] as $user) {
                $users[] = new User($user);
            }
            $this->followings = $users;
        } else {
            $this->setMessage($response['message']);
        }
        $this->setStatus($response['status']);
    }

    public function getFollowings()
    {
        return $this->followings;
    }
}
