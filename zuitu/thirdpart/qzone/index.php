<?php
@header('Content-Type:text/html;charset=utf-8'); 
session_start();
include_once( 'config.php' );
include_once( 'txwboauth.php' );

$o = new WeiboOAuth( WB_AKEY , WB_SKEY  );
$keys = $o->getRequestToken();//这里填上你的回调URL
//print_r($keys);
$aurl = $o->getAuthorizeURL( $keys['oauth_token'] ,false,WB_AKEY,$INI['system']['wwwprefix'] . '/thirdpart/qzone/callback.php');    //添加返回地址
$_SESSION['keys'] = $keys;
redirect($aurl);
//print_r($aurl);


?>
