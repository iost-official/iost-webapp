<?php

date_default_timezone_set("America/New_York");  //set it to NEW YORK FOR NOW

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/vendor/autoload.php';

use Goutte\Client;
use InstagramScraper\Instagram;

class InstaYelp
{

    public static function testRun($url){
        $medias = Instagram::getMediasByURL($url, 60, 'tag');
        print_r($medias);
    }

    public static function testRunCaviar($page, $size){
        $result = InstaYelp::startCaviar($page, $size);
        echo json_encode($result);
    }



    public static function startCaviar($page, $size){

        $client = new Client();
        $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_TIMEOUT, 0);
        $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_TIMEOUT_MS, 0);
        $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_CONNECTTIMEOUT, 0);
        $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_RETURNTRANSFER, true);
        $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_SSL_VERIFYPEER, false);
        $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_SSL_VERIFYHOST, false);

        $crawler = $client->request('GET', 'https://www.trycaviar.com/manhattan');          //manhattan

        $domSelector = 'div[data-react-class="MerchantTiles"]';

        $merchants = [];
        if ($crawler->filter($domSelector)->count()) {
            $result = $crawler->filter($domSelector)->attr('data-react-props'); // This is a DOMElement Object
            $data = json_decode($result);
            $merchants = $data->merchants;
        }

        $merchants = array_slice($merchants, ($page - 1) * $size, $size);
        $restaurants = [];
        foreach ($merchants as $merchant) {
            $dishes = []; 
            $categorySelector = 'div.offer-tiles_categories';
            $crawler = $client->request('GET', 'https://www.trycaviar.com' . $merchant->url);
            if ($crawler->filter($categorySelector)->count()) {
                $crawler->filter($categorySelector)->each(function($node) use(&$dishes, $client) {

                    if ($node->filter('div.offer-tiles_category')->count()) {
                        $node->filter('div.offer-tiles_category')->each(function($categoryNode) use(&$dishes, $client) {
                            $category =  $categoryNode->filter('.offer-tiles_category-name')->text();
                            $dishes[strtolower($category)] = [];
                            if ($categoryNode->filter('ul li')->count()) {
                                $categoryNode->filter('ul li')->each(function($dishNode) use(&$dishes, &$category, $client) {
                                    if($dishNode->filter('div.offer-tile_image')->count()) {
                                        $style = $dishNode->filter('div.offer-tile_image')->attr('style');
                                    }

                                    $imageUrls = [];
                                    if( ! empty($style)) {
                                        preg_match_all('#\bhttps?://[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/))#', $style, $match);


                                        if( ! empty($match[0]) && is_array($match[0])) {
                                            $imageUrls = $match[0];     
                                        }
                                    }/*
                                    if ($dishNode->filter('a')->count()) {
                                        $link = $dishNode->filter('a')->attr('href');
                                        $crawler2 = $client->request('GET', 'https://www.trycaviar.com' . $link);
                                        if ($crawler2->filter('div.item_image-wrapper--alternate img')->count()) {
                                            $imageSources = $crawler2->filter('div.item_image-wrapper--alternate img')->attr('srcset');

                                            preg_match_all('#\bhttps?://[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/))#', $imageSources, $match);
                                            if( ! empty($match[0]) && is_array($match[0])) {
                                                $imageUrls = array_merge($imageUrls, $match[0]);
                                            }
                                        }    
                                    }  */   
                                    $title = null;
                                    $discription = null;
                                    $cost = null;
                                    if ($dishNode->filter('.offer-tile_name')->count()) {
                                        $title = $dishNode->filter('.offer-tile_name')->text();
                                    }
                                    if ($dishNode->filter('.offer-tile_description')->count()) {
                                        $discription = $dishNode->filter('.offer-tile_description')->text();
                                    }
                                    if ($dishNode->filter('span.offer-tile_price')->count()) {
                                        $cost = $dishNode->filter('span.offer-tile_price')->text();
                                    }
                                    $image_url = $imageUrls[2];
                                    //$dishes[strtolower($category)][] = [
                                    $dishes[] = [
                                        'title' => $title,
                                        'description' => $discription,
                                        'cost' => $cost,
                                        'imageUrl' => $image_url,
                                    ];
                                });
                            }
                        });
                    }
                });
            }

            if ($crawler->filter('h3.merchant_offers_populars_title')->count()) {
                $category =  $crawler->filter('h3.merchant_offers_populars_title')->text();
                $dishes[strtolower($category)] = [];
                if ($crawler->filter('div.merchant_offers_populars ul li')->count()) {
                    $crawler->filter('div.merchant_offers_populars ul li')->each(function($dishNode) use(&$dishes, &$category) {
                    $title = null;
                    $discription = null;
                    $cost = null;
                    if ($dishNode->filter('.offer-tile_name')->count()) {
                        $title = $dishNode->filter('.offer-tile_name')->text();
                    }
                    if ($dishNode->filter('.offer-tile_description')->count()) {
                        $discription = $dishNode->filter('.offer-tile_description')->text();
                    }
                    if ($dishNode->filter('span.offer-tile_price')->count()) {
                        $cost = $dishNode->filter('span.offer-tile_price')->text();
                    }
                    if($dishNode->filter('div.offer-tile_image')->count()) {
                        $style = $dishNode->filter('div.offer-tile_image')->attr('style');
                    }

                    $imageUrls = [];
                    if( ! empty($style)) {
                        preg_match_all('#\bhttps?://[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/))#', $style, $match);
                        if( ! empty($match[0]) && is_array($match[0])) {
                            $imageUrls = $match[0];     
                        }
                    }
                    //$dishes[strtolower($category)][] = 
                    $dishes[] = [
                        'title' => $title,
                        'description' => $discription,
                        'cost' => $cost,
                        'imageUrls' => $imageUrls,
                    ];
                    });
                }
            } 
            $restaurants[] = array(
                'name' => $merchant->name,
                'description' => $merchant->description,
                'url' => $merchant->url,
                'dishes' => $dishes,
            );
        }
        //after we get all the restaurant... we start to get things from yelp....

        foreach($restaurants as $rest){

            $term = $rest['name'];

            $client = new Client();
            $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_TIMEOUT, 0);
            $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_TIMEOUT_MS, 0);
            $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_CONNECTTIMEOUT, 0);
            $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_RETURNTRANSFER, true);

            // Go to the symfony.com website
            $crawler = $client->request('GET', 'https://www.yelp.com/search?find_desc=' . $term . '&find_loc=New+York%2C+NY');  //New+York%2C+NY

            // Get the latest post in this category and display the titles
            $result = $crawler->filter('div.search-results-content > ul.search-results li.regular-search-result')->first();

            $bizLinkPath = $result->filter('p.snippet > a')->attr('href');

            $bizLink = 'https://www.yelp.com/' . $bizLinkPath;


            $crawler = $client->request('GET', 'https://www.yelp.com/' . $bizLinkPath);

            $type = null;
            if ($crawler->filter('span.category-str-list')->count()){
                $types = array();
                $crawler->filter('span.category-str-list')->each(function($node) use(&$types){
                    if ($node->filter('a')->count()) {
                        $node->filter('a')->each(function($node2) use(&$types) {
                            $types[] = $node2->text();
                        });
                    }

                });
            }    

            $priceRange = null;
            if ($crawler->filter('span.price-range')->first()->count()) {
                $priceRange =  $crawler->filter('span.price-range')->first()->text();
            }

            $address = null;
            $addressMap = array(
                'street' => 'streetAddress',
                'locality' => 'addressLocality',
                'region' => 'addressRegion',
                'postalcode' => 'postalCode',
            );
            if ($crawler->filter('div.map-box-address address')->count()) {
                $address = array();
                $address_string = "";
                $crawler->filter('div.map-box-address address')->each(function($node) use(&$address, $addressMap) {
                    /* @var $node Symfony\Component\DomCrawler\Crawler */
                    foreach ($addressMap as $key=>$value)   
                        if ($node->filter('span[itemprop="'. $value . '"]')->count()) {
                            $address[$key] = $node->filter('span[itemprop="'. $value . '"]')->text();
                        }    
                });
            }

            $starRating = null;
            if ($crawler->filter('meta[itemprop="ratingValue"]')->count()) {
                $starRating = $crawler->filter('meta[itemprop="ratingValue"]')->attr('content');
            }

            $hours = null;
            if ($crawler->filter('table.hours-table tr')->count()) {
                $hours = array();
                $crawler->filter('table.hours-table tr')->each(function($node) use(&$hours) {
                    if ($node->filter('th')->count()) {
                        $day = $node->filter('th')->text();
                    }
                    $hours[strtolower($day)] = array();
                    if ($node->filter('tr td span')->count()) {
                        $node->filter('tr td span')->each(function($node) use($day, &$hours) {
                            $hours[strtolower($day)][] = $node->text();
                        });
                    }    
                });
            }    

            $reviewsCount = null;
            if ($crawler->filter('span[itemprop="reviewCount"]')->count()) {
                $reviewsCount = $crawler->filter('span[itemprop="reviewCount"]')->text();
            }

            $telephone = null;
            if ($crawler->filter('span.biz-phone[itemprop="telephone"]')->count()) {
                $telephone = $crawler->filter('span.biz-phone[itemprop="telephone"]')->text();
                $telephone=trim($telephone);
            }

            $name = null;
            if ($crawler->filter('h1.biz-page-title[itemprop="name"]')->count()) {
                $name = $crawler->filter('h1.biz-page-title[itemprop="name"]')->text();
                $name=trim($name);
            }    

            $website = null;
            if ($crawler->filter('span.biz-website a')->count()) {
                $website = $crawler->filter('span.biz-website a')->text();
            }

            $geo = array();

            if ($crawler->filter('div.lightbox-map')->count()) {
                $geojson = $crawler->filter('div.lightbox-map')->attr('data-map-state');
                $geodata = json_decode($geojson);
                $geo = array(
                    'latitude' => $geodata->center->latitude,
                    'longitude' => $geodata->center->longitude,
                );
            }

            $i = new \InstagramAPI\Instagram('jerryweeatio', 'xiaorui');
            $i->login();

            $res = $i->searchLocation($term);
            $location = null;

            if( ! empty($res['items'][0]['title'])) {
                $location = $res['items'][0]['title'];
            }


            $final_result[] = array(
                'name' => $name,
                'url' => $bizLink,
                'types' => $types,
                'priceRange' => $priceRange,
                'addressArray'=>$address,
                'starRating' => $starRating,
                'hours' => $hours,
                'reviewCount' => $reviewsCount,
                'telephone' => $telephone,
                'website' => $website,
                'geo' => $geo,
                'dishes' => $rest['dishes'],    //this is different!
                'cav_url'=>$rest['url']
            );
        }

        return $final_result;

    } 



    public static function start($term, $insta_url = ""){

        $client = new Client();
        $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_TIMEOUT, 0);
        $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_TIMEOUT_MS, 0);
        $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_CONNECTTIMEOUT, 0);
        $client->getClient()->setDefaultOption('config/curl/'.CURLOPT_RETURNTRANSFER, true);

        // Go to the symfony.com website
        $crawler = $client->request('GET', 'https://www.yelp.com/search?find_desc=' . $term . '&find_loc=New+York%2C+NY');

        // Get the latest post in this category and display the titles
        $result = $crawler->filter('div.search-results-content > ul.search-results li.regular-search-result')->first();

        $bizLinkPath = $result->filter('p.snippet > a')->attr('href');

        $bizLink = 'https://www.yelp.com/' . $bizLinkPath;


        $crawler = $client->request('GET', 'https://www.yelp.com/' . $bizLinkPath);

        $type = null;
        if ($crawler->filter('span.category-str-list')->count()){
            $types = array();
            $crawler->filter('span.category-str-list')->each(function($node) use(&$types){
                if ($node->filter('a')->count()) {
                    $node->filter('a')->each(function($node2) use(&$types) {
                        $types[] = $node2->text();
                    });
                }

            });
        }    

        $priceRange = null;
        if ($crawler->filter('span.price-range')->first()->count()) {
            $priceRange =  $crawler->filter('span.price-range')->first()->text();
        }

        $address = null;
        $addressMap = array(
            'street' => 'streetAddress',
            'locality' => 'addressLocality',
            'region' => 'addressRegion',
            'postalcode' => 'postalCode',
        );
        if ($crawler->filter('div.map-box-address address')->count()) {
            $address = array();
            $address_string = "";
            $crawler->filter('div.map-box-address address')->each(function($node) use(&$address, $addressMap) {
                /* @var $node Symfony\Component\DomCrawler\Crawler */
                foreach ($addressMap as $key=>$value)   
                    if ($node->filter('span[itemprop="'. $value . '"]')->count()) {
                        $address[$key] = $node->filter('span[itemprop="'. $value . '"]')->text();
                    }    
            });
        }

        $starRating = null;
        if ($crawler->filter('meta[itemprop="ratingValue"]')->count()) {
            $starRating = $crawler->filter('meta[itemprop="ratingValue"]')->attr('content');
        }

        $hours = null;
        if ($crawler->filter('table.hours-table tr')->count()) {
            $hours = array();
            $crawler->filter('table.hours-table tr')->each(function($node) use(&$hours) {
                if ($node->filter('th')->count()) {
                    $day = $node->filter('th')->text();
                }
                $hours[strtolower($day)] = array();
                if ($node->filter('tr td span')->count()) {
                    $node->filter('tr td span')->each(function($node) use($day, &$hours) {
                        $hours[strtolower($day)][] = $node->text();
                    });
                }    
            });
        }    

        $reviewsCount = null;
        if ($crawler->filter('span[itemprop="reviewCount"]')->count()) {
            $reviewsCount = $crawler->filter('span[itemprop="reviewCount"]')->text();
        }

        $telephone = null;
        if ($crawler->filter('span.biz-phone[itemprop="telephone"]')->count()) {
            $telephone = $crawler->filter('span.biz-phone[itemprop="telephone"]')->text();
            $telephone=trim($telephone);
        }

        $name = null;
        if ($crawler->filter('h1.biz-page-title[itemprop="name"]')->count()) {
            $name = $crawler->filter('h1.biz-page-title[itemprop="name"]')->text();
            $name=trim($name);
        }    

        $website = null;
        if ($crawler->filter('span.biz-website a')->count()) {
            $website = $crawler->filter('span.biz-website a')->text();
        }

        $geo = array();

        if ($crawler->filter('div.lightbox-map')->count()) {
            $geojson = $crawler->filter('div.lightbox-map')->attr('data-map-state');
            $geodata = json_decode($geojson);
            $geo = array(
                'latitude' => $geodata->center->latitude,
                'longitude' => $geodata->center->longitude,
            );
        }

        $i = new \InstagramAPI\Instagram('jerryweeatio', 'xiaorui');
        $i->login();

        $res = $i->searchLocation($term);
        $location = null;

        if( ! empty($res['items'][0]['title'])) {
            $location = $res['items'][0]['title'];
        }


        $imageUrls = array();
        $medias = null;
        $media_type = "";

        if($insta_url){
            $term = $insta_url;
            if(strpos($insta_url, "/tags/") !== false){
                $media_type = "tag";
            }else if(strpos($insta_url, "/locations/") !== false){
                $media_type = "location";
            }else{
                //normal account URL
                $media_type = "url";
            }
            $medias = Instagram::getMediasByURL($insta_url, 60, $media_type);
        }

        if(!$medias){
            $users = Instagram::searchAccountsByUsername($term);
        }

        if(!$medias && !empty($users) && is_array($users)) {
            $firstUser = current($users);
            $medias = Instagram::getMedias($firstUser->username, 60);
        }

        if($medias){
            foreach($medias as $media) {
                $imageUrls[] = array(
                    'imageLowResolutionUrl' => $media->imageLowResolutionUrl,
                    'imageThumbnailUrl' => $media->imageThumbnailUrl,
                    'imageStandardResolutionUrl' => $media->imageStandardResolutionUrl,
                    'imageHighResolutionUrl' => $media->imageHighResolutionUrl,
                );
            }
        }


        $data = array(
            'name' => $name,
            'url' => $bizLink,
            'types' => $types,
            'priceRange' => $priceRange,
            'addressArray'=>$address,
            'starRating' => $starRating,
            'hours' => $hours,
            'reviewCount' => $reviewsCount,
            'telephone' => $telephone,
            'website' => $website,
            'geo' => $geo,
            'imageUrls' => $imageUrls,
        );

        return $data;
        
    }

}