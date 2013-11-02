<?php
 
// 引入 PHP 库文件
include("geoip.inc");
 
// 打开本地数据库, 数据保存在 GeoIP 文件中.
$geoData = geoip_open('GeoIP.dat', GEOIP_STANDARD);

$ip = $_SERVER['REMOTE_ADDR'];
 $ip = "116.247.96.94";
// 获取国家 IP
$countryCode = geoip_country_code_by_addr($geoData, $ip);
 
// 获取国家名称
$countryName = geoip_country_name_by_addr($geoData, $ip);
 
// 关闭本地数据库
geoip_close($geoData);

$callback = $_GET['callback'];
 echo $callback."('".$countryName."')";
?>

