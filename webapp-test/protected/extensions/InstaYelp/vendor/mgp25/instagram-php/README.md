# ![logo](/examples/assets/instagram.png) Instagram PHP [![Latest Stable Version](https://poser.pugx.org/mgp25/instagram-php/v/stable)](https://packagist.org/packages/mgp25/instagram-php) [![Total Downloads](https://poser.pugx.org/mgp25/instagram-php/downloads)](https://packagist.org/packages/mgp25/instagram-php) ![compatible](https://img.shields.io/badge/PHP%207-Compatible-brightgreen.svg) [![License](https://poser.pugx.org/mgp25/instagram-php/license)](https://packagist.org/packages/mgp25/instagram-php)

Instagram's private API.

**Read the [wiki](https://github.com/mgp25/Instagram-API/wiki)** and previous issues before opening a new one! Maybe your issue is already answered.

**Frequently Asked Questions:** [F.A.Q.](https://github.com/mgp25/Instagram-API/wiki/FAQ)

**Do you like this project? Support it by donating**
- ![Paypal](https://raw.githubusercontent.com/reek/anti-adblock-killer/gh-pages/images/paypal.png) Paypal: [Donate](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5ATYY8H9MC96E)
- ![btc](https://camo.githubusercontent.com/4bc31b03fc4026aa2f14e09c25c09b81e06d5e71/687474703a2f2f7777772e6d6f6e747265616c626974636f696e2e636f6d2f696d672f66617669636f6e2e69636f) Bitcoin: 1DCEpC9wYXeUGXS58qSsqKzyy7HLTTXNYe 

----------
## Installation

### Composer

```sh
composer require mgp25/instagram-php
```

```php
require("../vendor/autoload.php");
$instagram = new \InstagramAPI\Instagram();
```

If you want to test code that is in the master branch, which hasn't been pushed as a release, you can use master.

```
composer require mgp25/instagram-api master
```


### Don't have Composer?

You can download it here: [https://getcomposer.org/](https://getcomposer.org/)

## Examples

All examples can be found [here](https://github.com/mgp25/Instagram-API/tree/master/examples)


## Why did i do the API?

After legal measures, Facebook, WhatsApp and Instagram blocked my accounts. In order to use Instagram
 on my phone i needed a new phone, as they banned my UDID, so that is basically why i made this API.

### What is Instagram?
According to [the company](https://instagram.com/about/faq/):

> "Instagram is a fun and quirky way to share your life with friends through a series of pictures. Snap a photo with your mobile phone, then choose a filter to transform the image into a memory to keep around forever. We're building Instagram to allow you to experience moments in your friends' lives through pictures as they happen. We imagine a world more connected through photos."

# License

MIT

# Terms and conditions

- You will NOT use this API for marketing purposes (spam, massive sending...).
- We do NOT give support to anyone that wants this API to send massive messages or similar.
- We reserve the right to block any user of this repository that does not meet these conditions.

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by Instagram or any of its affiliates or subsidiaries. This is an independent and unofficial API. Use at your own risk.
