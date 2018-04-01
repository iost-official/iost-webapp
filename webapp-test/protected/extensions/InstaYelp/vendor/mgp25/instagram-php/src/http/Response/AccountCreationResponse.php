<?php

namespace InstagramAPI;

class AccountCreationResponse extends Response
{
    protected $username;
    protected $has_anonymous_profile_picture;
    protected $allow_contacts_sync;
    protected $nux_private_first_page;
    protected $profile_pic_url;
    protected $full_name;
    protected $pk;
    protected $hd_profile_pic_url_info;
    protected $nux_private_enabled;
    protected $is_private;
    protected $account_created = false;
    protected $feedback_title = '';
    protected $feedback_message = '';
    protected $spam = false;
    protected $feedback_action = '';
    protected $feedback_url = '';
    protected $errors = null;

    public function __construct($response)
    {
        if ((self::STATUS_OK == $response['status']) && (is_null($response['errors']))) {
            $this->username = $response['created_user']['username'];
            $this->has_anonymous_profile_picture = $response['created_user']['has_anonymous_profile_picture'];
            $this->allow_contacts_sync = $response['created_user']['allow_contacts_sync'];
            $this->nux_private_first_page = $response['created_user']['nux_private_first_page'];
            $this->profile_pic_url = $response['created_user']['profile_pic_url'];
            $this->full_name = $response['created_user']['full_name'];
            $this->pk = $response['created_user']['pk'];
            $this->hd_profile_pic_url_info = new HdProfilePicUrlInfo($response['created_user']['hd_profile_pic_url_info']);
            $this->nux_private_enabled = $response['created_user']['nux_private_enabled'];
            $this->is_private = $response['created_user']['is_private'];
            $this->account_created = $response['account_created'];
        } else {
            if (array_key_exists('message', $response)) {
                $this->setMessage($response['message']);
            }
            if (array_key_exists('errors', $response)) {
                $this->errors = $response['errors'];
            }
            if (is_null($this->errors)) {
                $this->feedback_title = $response['feedback_title'];
                $this->feedback_message = $response['feedback_message'];
                $this->spam = $response['spam'];
                $this->feedback_action = $response['feedback_action'];
                $this->feedback_url = $response['feedback_url'];
            }
        }
        $this->setStatus($response['status']);
    }

    public function hasAnonymousProfilePicture()
    {
        return $this->has_anonymous_profile_picture;
    }

    public function allowContactsSync()
    {
        return $this->allow_contacts_sync;
    }

    public function nuxPrivateFirstPage()
    {
        return $this->nux_private_first_page;
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

    public function getHdProfilePicUrlInfo()
    {
        return $this->hd_profile_pic_url_info;
    }

    public function isNuxPrivateEnabled()
    {
        return $this->nux_private_enabled;
    }

    public function isPrivate()
    {
        return $this->is_private;
    }

    public function isAccountCreated()
    {
        return $this->account_created;
    }

    public function getFeedbackTitle()
    {
        return $this->feedback_title;
    }

    public function getFeedbackMessage()
    {
        return $this->feedback_message;
    }

    public function isSpam()
    {
        return $this->spam;
    }

    public function getFeedbackAction()
    {
        return $this->feedback_action;
    }

    public function getFeedbackUrl()
    {
        return $this->feedback_url;
    }

    public function getErrors()
    {
        return $this->errors;
    }
}
