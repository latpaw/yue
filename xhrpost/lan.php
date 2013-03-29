<?php
$locale = array("en"=>array("name"=>"Your Name","email"=>"Your Email","country"=>"country","telephone"=>"telephone","company"=>"company","submit"=>"Submit Now","not"=>"not","application"=>"Select Application","equipment"=>"Equipment","question"=>"Question"),
	"es"=>array("name"=>"nombre","email"=>"email","country"=>"país","telephone"=>"teléfono","company"=>"empresa","submit"=>"presentar","not"=>"no")
	);

function locale($mark="name"){
	global $locale,$lan;
    echo $locale[$lan][$mark];
}

?>