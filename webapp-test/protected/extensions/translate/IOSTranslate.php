<?php

class IOSTranslate extends CApplicationComponent
{
    public $dict;

    public $dictDir;

    public $validLang = array('en', 'zh');

    public $lang =  'en';

    public $cookieName = 'lang';

    public function init()
    {
        $this->initLang();
        $this->loadDict();
    }

    protected function initLang()
    {
        $lang = isset($_GET['lang']) ? $_GET['lang'] : '';
        if ($lang && in_array($lang, $this->validLang)) {
            $this->lang = $lang;
            $this->setLangToCookie($lang);
        } else {
            $lang = $this->getLangFromCookie();
            if ($lang) {
                $this->lang = $lang;
            } else {
                $this->lang = $this->detectLang();
            }
        }
    }

    protected function loadDict()
    {
        $this->dict = include($this->dictDir."/{$this->lang}.php");
    }

    protected function getLangFromCookie()
    {
        $cookie = Yii::app()->request->cookies[$this->cookieName];
        return $cookie ? $cookie->value : null;
    }

    public function setLangToCookie($lang)
    {
        Yii::app()->request->cookies[$this->cookieName] = new CHttpCookie($this->cookieName, $lang);
    }

    public function detectLang()
    {
        // TODO: detect by ip
        return $this->lang;
    }

    public function t($txt)
    {
        return isset($this->dict[$txt]) ? $this->dict[$txt] : $txt;
    }
}