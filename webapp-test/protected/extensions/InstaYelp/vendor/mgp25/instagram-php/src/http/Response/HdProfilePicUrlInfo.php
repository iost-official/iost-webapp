<?php

namespace InstagramAPI;

class HdProfilePicUrlInfo
{
    protected $url;
    protected $width;
    protected $height;

    public function __construct($response)
    {
        $this->url = $response['url'];
        $this->width = $response['width'];
        $this->height = $response['height'];
    }

    public function getUrl()
    {
        return $this->url;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function getHeight()
    {
        return $this->height;
    }
}
