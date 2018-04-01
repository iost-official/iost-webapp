<?php

namespace InstagramAPI;

class User
{
    protected $username;
    protected $has_anonymous_profile_picture = false;
    protected $is_favorite = false;
    protected $profile_pic_url;
    protected $full_name;
    protected $pk;
    protected $is_verified;
    protected $is_private;

    public function __construct($userData)
    {
        $this->username = $userData['username'];
        $this->profile_pic_url = $userData['profile_pic_url'];
        $this->full_name = $userData['full_name'];
        $this->pk = $userData['pk'];
        $this->is_verified = $userData['is_verified'];
        $this->is_private = $userData['is_private'];
        if (array_key_exists('has_anonymous_profile_picture', $userData)) {
            $this->has_anonymous_profile_picture = $userData['has_anonymous_profile_picture'];
        }
        if (array_key_exists('is_favorite', $userData)) {
            $this->is_favorite = $userData['is_favorite'];
        }
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getProfilePicUrl()
    {
        return $this->profile_pic_url;
    }

    public function getFullName()
    {
        return $this->full_name;
    }

    public function getUsernameId()
    {
        return $this->pk;
    }

    public function isVerified()
    {
        return $this->is_verified;
    }

    public function isPrivate()
    {
        return $this->is_private;
    }

    public function hasAnonymousProfilePicture()
    {
        return $this->has_anonymous_profile_picture;
    }

    public function isFavorite()
    {
        return $this->is_favorite;
    }
}
