<?php
require_once( dirname(__FILE__) . '/config.php' );
include_once( dirname(__FILE__) . '/txwboauth.php' );

$c = new WeiboClient( WB_AKEY , WB_SKEY , $_SESSION['last_key']['oauth_token'] , $_SESSION['last_key']['oauth_token_secret']  );
$ms  = $c->user_info(); 
$ms = $ms['data'];

if(!$ms['name']) {
	need_login();
}
$type = "qq";
$sns = "qq:{$ms['name']}";
$exist_user = Table::Fetch('user', $sns, 'sns');
if ( $exist_user ) {
	Session::Set('user_id', $exist_user['id']);
	Utility::Redirect(get_loginpage(WEB_ROOT . '/index.php'));
}

$prompt_name = $ms['nick'];
$exist_user = Table::Fetch('user', $prompt_name, 'username');
while(!empty($exist_user)) {
	$prompt_name = $ms['nick'] .'_' . rand(10000,99999);
	$exist_user = Table::Fetch('user', $prompt_name, 'username');
}

$new_user = array(
	'username' => $prompt_name,
	'realname' => $ms['nick'],
	'email' => "{$ms['name']}@t.qq.com",
	'password' => rand(1000000,999999),
	'gender' => intval($ms['sex']) ? 'M' : 'F',
	'sns' => $sns,
);

if ( $user_id = ZUser::Create($new_user, true) ) {
	Session::Set('user_id', $user_id);
	Utility::Redirect(get_loginpage(WEB_ROOT . '/index.php'));
}

Utility::Redirect(WEB_ROOT . '/thirdpart/qq/index.php' );
