<?php

namespace InstagramAPI;

class Instagram
{
    public $username;            // Instagram username
  public $password;            // Instagram password
  public $debug;               // Debug

  public $uuid;                // UUID
  public $device_id;           // Device ID
  public $username_id;         // Username ID
  public $token;               // _csrftoken
  public $isLoggedIn = false;  // Session status
  public $rank_token;          // Rank token
  public $IGDataPath;          // Data storage path
  public $customPath = false;
    public $http;
    public $settings;
    public $proxy = null;           // Full Proxy
    public $proxyHost = null;       // Proxy Host and Port
    public $proxyAuth = null;       // Proxy User and Pass

  /**
   * Default class constructor.
   *
   * @param string $username
   *   Your Instagram username.
   * @param string $password
   *   Your Instagram password.
   * @param $debug
   *   Debug on or off, false by default.
   * @param $IGDataPath
   *  Default folder to store data, you can change it.
   */
  public function __construct($username, $password, $debug = false, $IGDataPath = null)
  {
      $this->debug = $debug;
      $this->device_id = SignatureUtils::generateDeviceId(md5($username.$password));

      if (!is_null($IGDataPath)) {
          $this->IGDataPath = $IGDataPath;
          $this->customPath = true;
      } else {
          $this->IGDataPath = __DIR__.DIRECTORY_SEPARATOR.'data'.DIRECTORY_SEPARATOR.$username.DIRECTORY_SEPARATOR;
          if (!file_exists($this->IGDataPath)) {
              mkdir($this->IGDataPath, 0777, true);
          }
      }

      $this->checkSettings($username);

      $this->http = new HttpInterface($this);

      $this->setUser($username, $password);
  }

  /**
   * Set the user. Manage multiple accounts.
   *
   * @param string $username
   *   Your Instagram username.
   * @param string $password
   *   Your Instagram password.
   */
  public function setUser($username, $password)
  {
      $this->username = $username;
      $this->password = $password;

      $this->checkSettings($username);

      $this->uuid = SignatureUtils::generateUUID(true);

      if ((file_exists($this->IGDataPath."$this->username-cookies.dat")) && ($this->settings->get('username_id') != null)
    && ($this->settings->get('token') != null)) {
          $this->isLoggedIn = true;
          $this->username_id = $this->settings->get('username_id');
          $this->rank_token = $this->username_id.'_'.$this->uuid;
          $this->token = $this->settings->get('token');
      } else {
          $this->isLoggedIn = false;
      }
  }

    protected function checkSettings($username)
    {
        if (!$this->customPath) {
            $this->IGDataPath = __DIR__.DIRECTORY_SEPARATOR.'data'.DIRECTORY_SEPARATOR.$username.DIRECTORY_SEPARATOR;
        }

        if (!file_exists($this->IGDataPath)) {
            mkdir($this->IGDataPath, 0777, true);
        }

        $this->settings = new Settings($this->IGDataPath.'settings-'.$username.'.dat');

        if ($this->settings->get('version') == null) {
            $this->settings->set('version', Constants::VERSION);
        }


        if (($this->settings->get('user_agent') == null) || (version_compare($this->settings->get('version'), Constants::VERSION) == -1)) {
            $userAgent = new UserAgent($this);
            $ua = $userAgent->buildUserAgent();
            $this->settings->set('version', Constants::VERSION);
            $this->settings->set('user_agent', $ua);
        }
    }

    /**
     * Set the proxy.
     *
     * @param string $proxy
     *                         Full proxy string. Ex: user:pass@192.168.0.0:8080
     *                         Use $proxy = "" to clear proxy
     * @param int    $port
     *                         Port of proxy
     * @param string $username
     *                         Username for proxy
     * @param string $password
     *                         Password for proxy
     *
     * @throws InstagramException
     */
    public function setProxy($proxy, $port = null, $username = null, $password = null)
    {
        $this->proxy = $proxy;

        if ($proxy == '') {
            return;
        }

        $proxy = parse_url($proxy);

        if (!is_null($port) && is_int($port)) {
            $proxy['port'] = $port;
        }

        if (!is_null($username) && !is_null($password)) {
            $proxy['user'] = $username;
            $proxy['pass'] = $password;
        }

        if (!empty($proxy['host']) && isset($proxy['port']) && is_int($proxy['port'])) {
            $this->proxyHost = $proxy['host'].':'.$proxy['port'];
        } else {
            throw new InstagramException('Proxy host error. Please check ip address and port of proxy.');
        }

        if (isset($proxy['user']) && isset($proxy['pass'])) {
            $this->proxyAuth = $proxy['user'].':'.$proxy['pass'];
        }
    }

  /**
   * Login to Instagram.
   *
   * @param bool $force
   *   Force login to Instagram, this will create a new session
   *
   * @return array
   *    Login data
   */
  public function login($force = false)
  {
      if (!$this->isLoggedIn || $force) {
          $fetch = $this->http->request('si/fetch_headers/?challenge_type=signup&guid='.SignatureUtils::generateUUID(false), null, true);
          $header = $fetch[0];
          $response = new ChallengeResponse($fetch[1]);

          if (!isset($header) || (!$response->isOk())) {
              throw new InstagramException("Couldn't get challenge, check your connection");

              return $response;
          }

          if (!preg_match('#Set-Cookie: csrftoken=([^;]+)#', $fetch[0], $token)) {
              throw new InstagramException('Missing csfrtoken');

              return $response;
          }

          $data = [
          'phone_id'            => SignatureUtils::generateUUID(true),
          '_csrftoken'          => $token[0],
          'username'            => $this->username,
          'guid'                => $this->uuid,
          'device_id'           => $this->device_id,
          'password'            => $this->password,
          'login_attempt_count' => '0',
      ];

          $login = $this->http->request('accounts/login/', SignatureUtils::generateSignature(json_encode($data)), true);
          $response = new LoginResponse($login[1]);

          if (!$response->isOk()) {
              throw new InstagramException($response->getMessage());

              return $response;
          }

          $this->isLoggedIn = true;
          $this->username_id = $response->getUsernameId();
          $this->settings->set('username_id', $this->username_id);
          $this->rank_token = $this->username_id.'_'.$this->uuid;
          preg_match('#Set-Cookie: csrftoken=([^;]+)#', $login[0], $match);
          $this->token = $match[1];
          $this->settings->set('token', $this->token);

          $this->syncFeatures();
          $this->autoCompleteUserList();
          $this->timelineFeed();
          $this->getv2Inbox();
          $this->getRecentActivity();

          return $response;
      }

      $check = $this->timelineFeed();
      if (isset($check['message']) && $check['message'] == 'login_required') {
          $this->login(true);
      }
      $this->getv2Inbox();
      $this->getRecentActivity();
  }

    public function syncFeatures()
    {
        $data = json_encode([
        '_uuid'         => $this->uuid,
        '_uid'          => $this->username_id,
        'id'            => $this->username_id,
        '_csrftoken'    => $this->token,
        'experiments'   => Constants::EXPERIMENTS,
    ]);

        return $this->http->request('qe/sync/', SignatureUtils::generateSignature($data))[1];
    }

    protected function autoCompleteUserList()
    {
        return $this->http->request('friendships/autocomplete_user_list/')[1];
    }

    protected function timelineFeed()
    {
        return $this->http->request('feed/timeline/')[1];
    }

    protected function megaphoneLog()
    {
        return $this->http->request('megaphone/log/')[1];
    }

    /**
     * Pending Inbox.
     *
     * @return array
     *               Pending Inbox Data
     */
    public function getPendingInbox()
    {
        $pendingInbox = $this->request('direct_v2/pending_inbox/?')[1];

        if ($pendingInbox['status'] != 'ok') {
            throw new InstagramException($pendingInbox['message']."\n");

            return;
        }

        return $pendingInbox;
    }

    /**
     * Explore Tab.
     *
     * @return array
     *               Explore data
     */
    public function explore()
    {
        return $this->request('discover/explore/?')[1];
    }

    public function expose()
    {
        $data = json_encode([
        '_uuid'        => $this->uuid,
        '_uid'         => $this->username_id,
        'id'           => $this->username_id,
        '_csrftoken'   => $this->token,
        'experiment'   => 'ig_android_profile_contextual_feed',
    ]);

        $this->http->request('qe/expose/', SignatureUtils::generateSignature($data))[1];
    }

  /**
   * Logout of Instagram.
   *
   * @return bool
   *    Returns true if logged out correctly
   */
  public function logout()
  {
      $logout = $this->http->request('accounts/logout/');

      if ($logout == 'ok') {
          return true;
      } else {
          return false;
      }
  }

    /**
     * Upload photo to Instagram.
     *
     * @param string $photo
     *                        Path to your photo
     * @param string $caption
     *                        Caption to be included in your photo.
     *
     * @return array
     *               Upload data
     */
    public function uploadPhoto($photo, $caption = null, $upload_id = null)
    {
        return $this->http->uploadPhoto($photo, $caption, $upload_id);
    }

    /**
     * Upload video to Instagram.
     *
     * @param string $video
     *                        Path to your video
     * @param string $caption
     *                        Caption to be included in your video.
     *
     * @return array
     *               Upload data
     */
    public function uploadVideo($video, $caption = null)
    {
        return $this->http->uploadVideo($video, $caption);
    }

    public function direct_share($media_id, $recipients, $text = null)
    {
        $this->http->direct_share($media_id, $recipients, $text);
    }

    /**
     * Direct Thread Data.
     *
     * @param string $threadId
     *                         Thread Id
     *
     * @return array
     *               Direct Thread Data
     */
    public function directThread($threadId)
    {
        $directThread = $this->request("direct_v2/threads/$threadId/?")[1];

        if ($directThread['status'] != 'ok') {
            throw new InstagramException($directThread['message']."\n");

            return;
        }

        return $directThread;
    }

    /**
     * Direct Thread Action.
     *
     * @param string $threadId
     *                             Thread Id
     * @param string $threadAction
     *                             Thread Action 'approve' OR 'decline' OR 'block'
     *
     * @return array
     *               Direct Thread Action Data
     */
    public function directThreadAction($threadId, $threadAction)
    {
        $data = json_encode([
          '_uuid'      => $this->uuid,
          '_uid'       => $this->username_id,
          '_csrftoken' => $this->token,
        ]);

        return $this->request("direct_v2/threads/$threadId/$threadAction/", $this->generateSignature($data))[1];
    }

    public function configureVideo($upload_id, $video, $caption = '')
    {
        $this->uploadPhoto($video, $caption, $upload_id);

        $size = getimagesize($video)[0];

        $post = json_encode([
        'upload_id'          => $upload_id,
        'source_type'        => '3',
        'poster_frame_index' => 0,
        'length'             => 0.00,
        'audio_muted'        => false,
        'filter_type'        => '0',
        'video_result'       => 'deprecated',
        'clips'              => [
          'length'           => Utils::getSeconds($video),
          'source_type'      => '3',
          'camera_position'  => 'back',
        ],
        'extra' => [
          'source_width'  => 960,
          'source_height' => 1280,
        ],
        'device' => [
          'manufacturer'    => $this->settings->get('manufacturer'),
          'model'           => $this->settings->get('model'),
          'android_version' => Constants::ANDROID_VERSION,
          'android_release' => Constants::ANDROID_RELEASE,
        ],
        '_csrftoken'  => $this->token,
        '_uuid'       => $this->uuid,
        '_uid'        => $this->username_id,
        'caption'     => $caption,
     ]);

        $post = str_replace('"length":0', '"length":0.00', $post);

        return new ConfigureVideoResponse($this->http->request('media/configure/?video=1', SignatureUtils::generateSignature($post))[1]);
    }

    public function configure($upload_id, $photo, $caption = '')
    {
        $size = getimagesize($photo)[0];

        $post = json_encode([
        'upload_id'          => $upload_id,
        'camera_model'       => str_replace(' ', '', $this->settings->get('model')),
        'source_type'        => 3,
        'date_time_original' => date('Y:m:d H:i:s'),
        'camera_make'        => $this->settings->get('manufacturer'),
        'edits'              => [
          'crop_original_size' => [$size, $size],
          'crop_zoom'          => 1.3333334,
          'crop_center'        => [0.0, -0.0],
        ],
        'extra' => [
          'source_width'  => $size,
          'source_height' => $size,
        ],
        'device' => [
          'manufacturer'    => $this->settings->get('manufacturer'),
          'model'           => $this->settings->get('model'),
          'android_version' => Constants::ANDROID_VERSION,
          'android_release' => Constants::ANDROID_RELEASE,
        ],
        '_csrftoken'  => $this->token,
        '_uuid'       => $this->uuid,
        '_uid'        => $this->username_id,
        'caption'     => $caption,
     ]);

        $post = str_replace('"crop_center":[0,0]', '"crop_center":[0.0,-0.0]', $post);

        return new ConfigureResponse($this->http->request('media/configure/', SignatureUtils::generateSignature($post))[1]);
    }

  /**
   * Edit media.
   *
   * @param string $mediaId
   *   Media id
   * @param string $captionText
   *   Caption text
   *
   * @return array
   *   edit media data
   */
  public function editMedia($mediaId, $captionText = '')
  {
      $data = json_encode([
        '_uuid'          => $this->uuid,
        '_uid'           => $this->username_id,
        '_csrftoken'     => $this->token,
        'caption_text'   => $captionText,
    ]);

      return $this->http->request("media/$mediaId/edit_media/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Remove yourself from a tagged media.
   *
   * @param string $mediaId
   *   Media id
   *
   * @return array
   *   edit media data
   */
  public function removeSelftag($mediaId)
  {
      $data = json_encode([
        '_uuid'          => $this->uuid,
        '_uid'           => $this->username_id,
        '_csrftoken'     => $this->token,
    ]);

      return $this->http->request("usertags/$mediaId/remove/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Media info.
   *
   * @param string $mediaId
   *   Media id
   *
   * @return array
   *   delete request data
   */
  public function mediaInfo($mediaId)
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        '_csrftoken' => $this->token,
        'media_id'   => $mediaId,
    ]);

      return new MediaInfoResponse($this->http->request("media/$mediaId/info/", SignatureUtils::generateSignature($data))[1]);
  }

  /**
   * Delete photo or video.
   *
   * @param string $mediaId
   *   Media id
   *
   * @return array
   *   delete request data
   */
  public function deleteMedia($mediaId)
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        '_csrftoken' => $this->token,
        'media_id'   => $mediaId,
    ]);

      return $this->http->request("media/$mediaId/delete/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Comment media.
   *
   * @param string $mediaId
   *   Media id
   * @param string $commentText
   *   Comment Text
   *
   * @return array
   *   comment media data
   */
  public function comment($mediaId, $commentText)
  {
      $data = json_encode([
        '_uuid'          => $this->uuid,
        '_uid'           => $this->username_id,
        '_csrftoken'     => $this->token,
        'comment_text'   => $commentText,
    ]);

      return $this->http->request("media/$mediaId/comment/", SignatureUtils::generateSignature($data))[1];
  }

    /**
     * Delete Comment.
     *
     * @param string $mediaId
     *                          Media ID
     * @param string $commentId
     *                          Comment ID
     *
     * @return array
     *               Delete comment data
     */
    public function deleteComment($mediaId, $commentId)
    {
        $data = json_encode([
          '_uuid'          => $this->uuid,
          '_uid'           => $this->username_id,
          '_csrftoken'     => $this->token,
      ]);

        return $this->http->request("media/$mediaId/comment/$commentId/delete/", SignatureUtils::generateSignature($data))[1];
    }

  /**
   * Delete Comment Bulk.
   *
   * @param string $mediaId
   *   Media id
   * @param string $commentIds
   *   List of comments to delete
   *
   * @return array
   *   Delete Comment Bulk Data
   */
  public function deleteCommentsBulk($mediaId, $commentIds)
  {
      if (!is_array($commentIds)) {
          $commentIds = [$commentIds];
      }

      $string = [];
      foreach ($commentIds as $commentId) {
          $string[] = "$commentId";
      }

      $comment_ids_to_delete = implode(',', $string);

      $data = json_encode([
        '_uuid'                 => $this->uuid,
        '_uid'                  => $this->username_id,
        '_csrftoken'            => $this->token,
        'comment_ids_to_delete' => $comment_ids_to_delete,
      ]);

      return $this->http->request("media/$mediaId/comment/bulk_delete/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Sets account to public.
   *
   * @param string $photo
   *   Path to photo
   */
  public function changeProfilePicture($photo)
  {
      $this->http->changeProfilePicture($photo);
  }

  /**
   * Remove profile picture.
   *
   * @return array
   *   status request data
   */
  public function removeProfilePicture()
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        '_csrftoken' => $this->token,
    ]);

      return $this->http->request('accounts/remove_profile_picture/', SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Sets account to private.
   *
   * @return array
   *   status request data
   */
  public function setPrivateAccount()
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        '_csrftoken' => $this->token,
    ]);

      return $this->http->request('accounts/set_private/', SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Sets account to public.
   *
   * @return array
   *   status request data
   */
  public function setPublicAccount()
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        '_csrftoken' => $this->token,
    ]);

      return $this->http->request('accounts/set_public/', SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Get personal profile data.
   *
   * @return array
   *   profile data
   */
  public function getProfileData()
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        '_csrftoken' => $this->token,
    ]);

      return $this->http->request('accounts/current_user/?edit=true', SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Edit profile.
   *
   * @param string $url
   *   Url - website. "" for nothing
   * @param string $phone
   *   Phone number. "" for nothing
   * @param string $first_name
   *   Name. "" for nothing
   * @param string $email
   *   Email. Required.
   * @param int $gender
   *   Gender. male = 1 , female = 0
   *
   * @return array
   *   edit profile data
   */
  public function editProfile($url, $phone, $first_name, $biography, $email, $gender)
  {
      $data = json_encode([
        '_uuid'         => $this->uuid,
        '_uid'          => $this->username_id,
        '_csrftoken'    => $this->token,
        'external_url'  => $url,
        'phone_number'  => $phone,
        'username'      => $this->username,
        'first_name'    => $first_name,
        'biography'     => $biography,
        'email'         => $email,
        'gender'        => $gender,
    ]);

      return $this->http->request('accounts/edit_profile/', SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Change Password.
   *
   * @param string $oldPassword
   *   Old Password
   * @param string $newPassword
   *   New Password
   *
   * @return array
   *   Change Password Data
   */
  public function changePassword($oldPassword, $newPassword)
  {
      $data = json_encode([
        '_uuid'          => $this->uuid,
        '_uid'           => $this->username_id,
        '_csrftoken'     => $this->token,
        'old_password'   => $oldPassword,
        'new_password1'  => $newPassword,
        'new_password2'  => $newPassword,
      ]);

      return $this->http->request('accounts/change_password/', SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Get username info.
   *
   * @param string $usernameId
   *   Username id
   *
   * @return array
   *   Username data
   */
  public function getUsernameInfo($usernameId)
  {
      return $this->http->request("users/$usernameId/info/")[1];
  }

  /**
   * Get self username info.
   *
   * @return array
   *   Username data
   */
  public function getSelfUsernameInfo()
  {
      return $this->getUsernameInfo($this->username_id);
  }

  /**
   * Get recent activity.
   *
   * @return array
   *   Recent activity data
   */
  public function getRecentActivity()
  {
      $activity = $this->http->request('news/inbox/?')[1];

      if ($activity['status'] != 'ok') {
          throw new InstagramException($activity['message']."\n");

          return;
      }

      return $activity;
  }

  /**
   * Get recent activity from accounts followed.
   *
   * @return array
   *   Recent activity data of follows
   */
  public function getFollowingRecentActivity()
  {
      $activity = $this->http->request('news/?')[1];

      if ($activity['status'] != 'ok') {
          throw new InstagramException($activity['message']."\n");

          return;
      }

      return $activity;
  }

  /**
   * I dont know this yet.
   *
   * @return array
   *   v2 inbox data
   */
  public function getv2Inbox()
  {
      $inbox = $this->http->request('direct_v2/inbox/?')[1];

      if ($inbox['status'] != 'ok') {
          throw new InstagramException($inbox['message']."\n");

          return;
      }

      return $inbox;
  }

  /**
   * Get user tags.
   *
   * @param string $usernameId
   *
   * @return array
   *   user tags data
   */
  public function getUserTags($usernameId)
  {
      $tags = $this->http->request("usertags/$usernameId/feed/?rank_token=$this->rank_token&ranked_content=true&")[1];

      if ($tags['status'] != 'ok') {
          throw new InstagramException($tags['message']."\n");

          return;
      }

      return $tags;
  }

  /**
   * Get self user tags.
   *
   * @return array
   *   self user tags data
   */
  public function getSelfUserTags()
  {
      return $this->getUserTags($this->username_id);
  }

  /**
   * Get tagged media.
   *
   * @param string $tag
   *
   * @return array
   */
  public function tagFeed($tag)
  {
      $userFeed = $this->http->request("feed/tag/$tag/?rank_token=$this->rank_token&ranked_content=true&")[1];

      if ($userFeed['status'] != 'ok') {
          throw new InstagramException($userFeed['message']."\n");

          return;
      }

      return $userFeed;
  }

  /**
   * Get media likers.
   *
   * @param string $mediaId
   *
   * @return array
   */
  public function getMediaLikers($mediaId)
  {
      $likers = new MediaLikersResponse($this->http->request("media/$mediaId/likers/")[1]);
      if (!$likers->isOk()) {
          throw new InstagramException($likers['message']."\n");

          return;
      }

      return $likers;
  }

  /**
   * Get user locations media.
   *
   * @param string $usernameId
   *   Username id
   *
   * @return array
   *   Geo Media data
   */
  public function getGeoMedia($usernameId)
  {
      $locations = $this->http->request("maps/user/$usernameId/")[1];

      if ($locations['status'] != 'ok') {
          throw new InstagramException($locations['message']."\n");

          return;
      }

      return $locations;
  }

  /**
   * Get self user locations media.
   *
   * @return array
   *   Geo Media data
   */
  public function getSelfGeoMedia()
  {
      return $this->getGeoMedia($this->username_id);
  }

  /**
   * facebook user search.
   *
   * @param string $query
   *
   * @return array
   *   query data
   */
  public function fbUserSearch($query)
  {
      $query = rawurlencode($query);
      $query = $this->http->request("fbsearch/topsearch/?context=blended&query=$query&rank_token=$this->rank_token")[1];

      if ($query['status'] != 'ok') {
          throw new InstagramException($query['message']."\n");

          return;
      }

      return $query;
  }

  /**
   * Search users.
   *
   * @param string $query
   *
   * @return array
   *   query data
   */
  public function searchUsers($query)
  {
      $query = $this->http->request('users/search/?ig_sig_key_version='.Constants::SIG_KEY_VERSION."&is_typeahead=true&query=$query&rank_token=$this->rank_token")[1];

      if ($query['status'] != 'ok') {
          throw new InstagramException($query['message']."\n");

          return;
      }

      return $query;
  }

  /**
   * Search exact username.
   *
   * @param string usernameName username as STRING not an id
   *
   * @return array
   *   query data
   */
  public function searchUsername($usernameName)
  {
      $query = $this->http->request("users/$usernameName/usernameinfo/")[1];

      if ($query['status'] != 'ok') {
          throw new InstagramException($query['message']."\n");

          return;
      }

      return $query;
  }

  /**
   * Search users using addres book.
   *
   * @param array $contacts
   *
   * @return array
   *   query data
   */
  public function syncFromAdressBook($contacts)
  {
      $data = 'contacts='.json_encode($contacts, true);

      return $this->http->request('address_book/link/?include=extra_display_name,thumbnails', $data)[1];
  }

  /**
   * Search tags.
   *
   * @param string $query
   *
   * @return array
   *   query data
   */
  public function searchTags($query)
  {
      $query = $this->http->request("tags/search/?is_typeahead=true&q=$query&rank_token=$this->rank_token")[1];

      if ($query['status'] != 'ok') {
          throw new InstagramException($query['message']."\n");

          return;
      }

      return $query;
  }

  /**
   * Get timeline data.
   *
   * @return array
   *   timeline data
   */
  public function getTimeline($maxid = null)
  {
      $timeline = $this->http->request(
          "feed/timeline/?rank_token=$this->rank_token&ranked_content=true"
          .(!is_null($maxid) ? '&max_id='.$maxid : '')
      )[1];

      if ($timeline['status'] != 'ok') {
          throw new InstagramException($timeline['message']."\n");

          return;
      }

      return $timeline;
  }

  /**
   * Get user feed.
   *
   * @param string $usernameId
   *    Username id
   * @param null $maxid
   *    Max Id
   * @param null $minTimestamp
   *    Min timestamp
   *
   * @throws InstagramException
   *
   * @return array User feed data
   *    User feed data
   */
  public function getUserFeed($usernameId, $maxid = null, $minTimestamp = null)
  {
      $userFeed = $this->http->request(
          "feed/user/$usernameId/?rank_token=$this->rank_token"
          .(!is_null($maxid) ? '&max_id='.$maxid : '')
          .(!is_null($minTimestamp) ? '&min_timestamp='.$minTimestamp : '')
          .'&ranked_content=true'
      )[1];

      if ($userFeed['status'] != 'ok') {
          throw new InstagramException($userFeed['message']."\n");

          return;
      }

      return $userFeed;
  }

  /**
   * Get hashtag feed.
   *
   * @param string $hashtagString
   *    Hashtag string, not including the #
   *
   * @return array
   *   Hashtag feed data
   */
  public function getHashtagFeed($hashtagString, $maxid = null)
  {
      if (is_null($maxid)) {
          $endpoint = "feed/tag/$hashtagString/?rank_token=$this->rank_token&ranked_content=true&";
      } else {
          $endpoint = "feed/tag/$hashtagString/?max_id=".$maxid."&rank_token=$this->rank_token&ranked_content=true&";
      }

      $hashtagFeed = $this->http->request($endpoint)[1];

      if ($hashtagFeed['status'] != 'ok') {
          throw new InstagramException($hashtagFeed['message']."\n");

          return;
      }

      return $hashtagFeed;
  }

  /**
   * Get locations.
   *
   * @param string $query
   *    search query
   *
   * @return array
   *   Location location data
   */
  public function searchLocation($query)
  {
      $query = rawurlencode($query);
      $endpoint = "fbsearch/places/?rank_token=$this->rank_token&query=".$query;

      $locationFeed = $this->http->request($endpoint)[1];

      if ($locationFeed['status'] != 'ok') {
          throw new InstagramException($locationFeed['message']."\n");

          return;
      }

      return $locationFeed;
  }

  /**
   * Get location feed.
   *
   * @param string $locationId
   *    location id
   *
   * @return array
   *   Location feed data
   */
  public function getLocationFeed($locationId, $maxid = null)
  {
      if (is_null($maxid)) {
          $endpoint = "feed/location/$locationId/?rank_token=$this->rank_token&ranked_content=true&";
      } else {
          $endpoint = "feed/location/$locationId/?max_id=".$maxid."&rank_token=$this->rank_token&ranked_content=true&";
      }

      $locationFeed = $this->http->request($endpoint)[1];

      if ($locationFeed['status'] != 'ok') {
          throw new InstagramException($locationFeed['message']."\n");

          return;
      }

      return $locationFeed;
  }

  /**
   * Get self user feed.
   *
   * @return array
   *   User feed data
   */
  public function getSelfUserFeed()
  {
      return $this->getUserFeed($this->username_id);
  }

  /**
   * Get popular feed.
   *
   * @return array
   *   popular feed data
   */
  public function getPopularFeed()
  {
      $popularFeed = $this->http->request("feed/popular/?people_teaser_supported=1&rank_token=$this->rank_token&ranked_content=true&")[1];

      if ($popularFeed['status'] != 'ok') {
          throw new InstagramException($popularFeed['message']."\n");

          return;
      }

      return $popularFeed;
  }

   /**
    * Get user followings.
    *
    * @param string $usernameId
    *   Username id
    *
    * @return array
    *   followers data
    */
   public function getUserFollowings($usernameId, $maxid = null)
   {
       return new FollowingResponse($this->http->request("friendships/$usernameId/following/?max_id=$maxid&ig_sig_key_version=".Constants::SIG_KEY_VERSION."&rank_token=$this->rank_token")[1]);
   }

  /**
   * Get user followers.
   *
   * @param string $usernameId
   *   Username id
   *
   * @return array
   *   followers data
   */
  public function getUserFollowers($usernameId, $maxid = null)
  {
      return new FollowerResponse($this->http->request("friendships/$usernameId/followers/?max_id=$maxid&ig_sig_key_version=".Constants::SIG_KEY_VERSION."&rank_token=$this->rank_token")[1]);
  }

  /**
   * Get self user followers.
   *
   * @return array
   *   followers data
   */
  public function getSelfUserFollowers()
  {
      return $this->getUserFollowers($this->username_id);
  }

  /**
   * Get self users we are following.
   *
   * @return array
   *   users we are following data
   */
  public function getSelfUsersFollowing()
  {
      return $this->getUserFollowings($this->username_id);
  }

  /**
   * Like photo or video.
   *
   * @param string $mediaId
   *   Media id
   *
   * @return array
   *   status request
   */
  public function like($mediaId)
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        '_csrftoken' => $this->token,
        'media_id'   => $mediaId,
    ]);

      return $this->http->request("media/$mediaId/like/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Unlike photo or video.
   *
   * @param string $mediaId
   *   Media id
   *
   * @return array
   *   status request
   */
  public function unlike($mediaId)
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        '_csrftoken' => $this->token,
        'media_id'   => $mediaId,
    ]);

      return $this->http->request("media/$mediaId/unlike/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Get media comments.
   *
   * @param string $mediaId
   *   Media id
   *
   * @return array
   *   Media comments data
   */
  public function getMediaComments($mediaId)
  {
      return $this->http->request("media/$mediaId/comments/?")[1];
  }

  /**
   * Set name and phone (Optional).
   *
   * @param string $name
   * @param string $phone
   *
   * @return array
   *   Set status data
   */
  public function setNameAndPhone($name = '', $phone = '')
  {
      $data = json_encode([
        '_uuid'         => $this->uuid,
        '_uid'          => $this->username_id,
        'first_name'    => $name,
        'phone_number'  => $phone,
        '_csrftoken'    => $this->token,
    ]);

      return $this->http->request('accounts/set_phone_and_name/', SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Get direct share.
   *
   * @return array
   *   Direct share data
   */
  public function getDirectShare()
  {
      return $this->http->request('direct_share/inbox/?')[1];
  }

  /**
   * Backups all your uploaded photos :).
   */
  public function backup()
  {
      $myUploads = $this->getSelfUserFeed();
      foreach ($myUploads['items'] as $item) {
          if (!is_dir($this->IGDataPath.'backup/'."$this->username-".date('Y-m-d'))) {
              mkdir($this->IGDataPath.'backup/'."$this->username-".date('Y-m-d'));
          }
          file_put_contents($this->IGDataPath.'backup/'."$this->username-".date('Y-m-d').'/'.$item['id'].'.jpg',
      file_get_contents($item['image_versions2']['candidates'][0]['url']));
      }
  }

  /**
   * Follow.
   *
   * @param string $userId
   *
   * @return array
   *   Friendship status data
   */
  public function follow($userId)
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        'user_id'    => $userId,
        '_csrftoken' => $this->token,
    ]);

      return $this->http->request("friendships/create/$userId/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Unfollow.
   *
   * @param string $userId
   *
   * @return array
   *   Friendship status data
   */
  public function unfollow($userId)
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        'user_id'    => $userId,
        '_csrftoken' => $this->token,
    ]);

      return $this->http->request("friendships/destroy/$userId/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Block.
   *
   * @param string $userId
   *
   * @return array
   *   Friendship status data
   */
  public function block($userId)
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        'user_id'    => $userId,
        '_csrftoken' => $this->token,
    ]);

      return $this->http->request("friendships/block/$userId/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Unblock.
   *
   * @param string $userId
   *
   * @return array
   *   Friendship status data
   */
  public function unblock($userId)
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        'user_id'    => $userId,
        '_csrftoken' => $this->token,
    ]);

      return $this->http->request("friendships/unblock/$userId/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Show User Friendship.
   *
   * @param string $userId
   *
   * @return array
   *   Friendship relationship data
   */
  public function userFriendship($userId)
  {
      $data = json_encode([
        '_uuid'      => $this->uuid,
        '_uid'       => $this->username_id,
        'user_id'    => $userId,
        '_csrftoken' => $this->token,
    ]);

      return $this->http->request("friendships/show/$userId/", SignatureUtils::generateSignature($data))[1];
  }

  /**
   * Get liked media.
   *
   * @return array
   *   Liked media data
   */
  public function getLikedMedia($maxid = null)
  {
      $endpoint = 'feed/liked/?'.(!is_null($maxid) ? 'max_id='.$maxid.'&' : '');

      return $this->http->request($endpoint)[1];
  }

    public function verifyPeer($enable)
    {
        $this->http->verifyPeer($enable);
    }

    public function verifyHost($enable)
    {
        $this->http->verifyHost($enable);
    }
}
