<?php
$countries = <<<EOF
"Asia/Pacific Region","Europe","Andorra","United Arab Emirates",
"Afghanistan","Antigua and Barbuda","Anguilla","Albania","Armenia",
"Netherlands Antilles","Angola","Antarctica","Argentina","American Samoa",
"Austria","Australia","Aruba","Azerbaijan","Bosnia and Herzegovina",
"Barbados","Bangladesh","Belgium","Burkina Faso","Bulgaria","Bahrain",
"Burundi","Benin","Bermuda","Brunei Darussalam","Bolivia","Brazil",
"Bahamas","Bhutan","Bouvet Island","Botswana","Belarus","Belize",
"Canada","Cocos (Keeling) Islands","Congo,The Democratic Republic of the",
"Central African Republic","Congo","Switzerland","Cote DIvoire","Cook Islands",
"Chile","Cameroon","China","Colombia","Costa Rica","Cuba","Cape Verde",
"Christmas Island","Cyprus","Czech Republic","Germany","Djibouti",
"Denmark","Dominica","Dominican Republic","Algeria","Ecuador","Estonia",
"Egypt","Western Sahara","Eritrea","Spain","Ethiopia","Finland","Fiji",
"Falkland Islands (Malvinas)","Micronesia,Federated States of","Faroe Islands",
"France","France,Metropolitan","Gabon","United Kingdom",
"Grenada","Georgia","French Guiana","Ghana","Gibraltar","Greenland",
"Gambia","Guinea","Guadeloupe","Equatorial Guinea","Greece","South Georgia and the South Sandwich Islands",
"Guatemala","Guam","Guinea-Bissau",
"Guyana","Hong Kong","Heard Island and McDonald Islands","Honduras",
"Croatia","Haiti","Hungary","Indonesia","Ireland","Israel","India",
"British Indian Ocean Territory","Iraq","Iran,Islamic Republic of",
"Iceland","Italy","Jamaica","Jordan","Japan","Kenya","Kyrgyzstan",
"Cambodia","Kiribati","Comoros","Saint Kitts and Nevis","Korea,Democratic Peoples Republic of",
"Korea,Republic of","Kuwait","Cayman Islands",
"Kazakhstan","Lao Peoples Democratic Republic","Lebanon","Saint Lucia",
"Liechtenstein","Sri Lanka","Liberia","Lesotho","Lithuania","Luxembourg",
"Latvia","Libyan Arab Jamahiriya","Morocco","Monaco","Moldova,Republic of",
"Madagascar","Marshall Islands","Macedonia",
"Mali","Myanmar","Mongolia","Macau","Northern Mariana Islands",
"Martinique","Mauritania","Montserrat","Malta","Mauritius","Maldives",
"Malawi","Mexico","Malaysia","Mozambique","Namibia","New Caledonia",
"Niger","Norfolk Island","Nigeria","Nicaragua","Netherlands","Norway",
"Nepal","Nauru","Niue","New Zealand","Oman","Panama","Peru","French Polynesia",
"Papua New Guinea","Philippines","Pakistan","Poland","Saint Pierre and Miquelon",
"Pitcairn Islands","Puerto Rico","Palestinian Territory",
"Portugal","Palau","Paraguay","Qatar","Reunion","Romania",
"Russian Federation","Rwanda","Saudi Arabia","Solomon Islands",
"Seychelles","Sudan","Sweden","Singapore","Saint Helena","Slovenia",
"Svalbard and Jan Mayen","Slovakia","Sierra Leone","San Marino","Senegal",
"Somalia","Suriname","Sao Tome and Principe","El Salvador","Syrian Arab Republic",
"Swaziland","Turks and Caicos Islands","Chad","French Southern Territories",
"Togo","Thailand","Tajikistan","Tokelau","Turkmenistan",
"Tunisia","Tonga","Timor-Leste","Turkey","Trinidad and Tobago","Tuvalu",
"Taiwan","Tanzania,United Republic of","Ukraine",
"Uganda","United States Minor Outlying Islands","United States","Uruguay",
"Uzbekistan","Holy See (Vatican City State)","Saint Vincent and the Grenadines",
"Venezuela","Virgin Islands,British","Virgin Islands,U.S.",
"Vietnam","Vanuatu","Wallis and Futuna","Samoa","Yemen","Mayotte",
"Serbia","South Africa","Zambia","Montenegro","Zimbabwe",
"Anonymous Proxy","Satellite Provider","Other",
"Aland Islands","Guernsey","Isle of Man","Jersey","Saint Barthelemy","Saint Martin"
EOF;



// for($i=0;$i<count($countries);$i++){
// 	$option = '<option value="'.$countries[$i].'">'.$countries[$i].'</option>';
// 	$options = $options.$option;
// }
// echo $options;
$countries = str_replace("\r\n","",$countries);
$callback = $_GET['callback'];
 echo $callback."('".$countries."')";
?>