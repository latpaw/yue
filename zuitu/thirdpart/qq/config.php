<?php
require_once(dirname(dirname(dirname(__FILE__))) . '/app.php');

define( "WB_AKEY" , $INI['qq']['key'] );
define( "WB_SKEY" , $INI['qq']['sec'] );
define( "MB_RETURN_FORMAT" , 'json' );
define( "MB_API_HOST" , 'open.t.qq.com' );
