<?php
@header('Content-Type:text/html;charset=utf-8'); 
session_start();
include_once( 'config.php' );
include_once( 'txwboauth.php' );

$o = new WeiboOAuth( WB_AKEY , WB_SKEY  );
$keys = $o->getRequestToken($INI['system']['wwwprefix'] . '/thirdpart/qq/callback.php');//这里填上你的回调URL
$aurl = $o->getAuthorizeURL( $keys['oauth_token'] ,false, '');
$_SESSION['keys'] = $keys;
redirect($aurl);
