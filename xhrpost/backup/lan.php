<?php
$locale = array("en"=>array("name"=>"name","email"=>"email","country"=>"country","telephone"=>"telephone","company"=>"company","submit"=>"submit","not"=>"not"),
	"es"=>array("name"=>"nombre","email"=>"email","country"=>"país","telephone"=>"teléfono","company"=>"empresa","submit"=>"presentar","not"=>"no")
	);

function locale($mark="name"){
	global $locale,$lan;
    echo $locale[$lan][$mark];
}

?>