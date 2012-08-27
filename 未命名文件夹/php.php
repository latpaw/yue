<?php
// function in($num){
$dat = date("Y-m-d H:i:s",time());
// }

$fh = mysql_connect("mysql1001.ixwebhosting.com","C196768_wordpre","h9a6ggH07t");
 $db = mysql_select_db("C196768_wordpress",$fh);
// $fh = mysql_connect("172.16.2.139","root","");
// $db = mysql_select_db("wordpress",$fh);

for($i=1;$i<=2;$i++):
	include("es/$i.php");
	 $re = mysql_query('insert into test (post_author,post_date,post_date_gmt,post_content,post_title) values("1","'.$dat.'","'.$dat.'",\''.$content.'\',"'.$title.'")'); 
endfor;

?>
