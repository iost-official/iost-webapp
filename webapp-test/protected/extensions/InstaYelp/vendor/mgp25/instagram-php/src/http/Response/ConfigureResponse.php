<?php

namespace InstagramAPI;

class ConfigureResponse extends Response
{
    protected $upload_id;
    protected $media_id;
    protected $image_url;
    protected $media_code;

    public function __construct($response)
    {
        if (self::STATUS_OK == $response['status']) {
            $this->upload_id = $response['upload_id'];
            $this->media_id = $response['media']['id'];
            $this->image_url = $response['media']['image_versions2']['candidates']['0']['url'];
            $this->media_code = $response['media']['code'];
        } else {
            $this->setMessage($response['message']);
        }
        $this->setStatus($response['status']);
    }

    public function getUploadId()
    {
        return $this->upload_id;
    }

    public function getMediaId()
    {
        return $this->media_id;
    }

    public function getImageUrl()
    {
        return $this->image_url;
    }

    public function getMediaCode()
    {
        return $this->media_code;
    }

    public function getMediaUrl()
    {
        return 'https://www.instagram.com/p/'.$this->getMediaCode().'/';
    }
}
