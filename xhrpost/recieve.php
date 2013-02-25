<?php
$name = $email =$company=$tel=$country="";
if(isset($_POST['name'])){$name=$_POST["name"];}
if(isset($_POST['email'])){$email=$_POST["email"];}
if(isset($_POST['company'])){$company=$_POST["company"];}
if(isset($_POST['phone'])){$phone=$_POST["phone"];}
if(isset($_POST['country'])){$country=$_POST["country"];}
if(isset($_POST['content'])){$content=$_POST["content"];}
$visits = explode("!",$_POST['visits']);

	echo "提交成功! <br>";
	echo "Your name is ".$name."<br />";
	echo "your email is ".$email."<br />";
	echo "your company is ".$company."<br />";
	echo "your phone is ".$phone."<br />";
	echo "your country is ".$country."<br />";

	echo "your referer  is".$visits[0]."<br />";
	echo "your visits path is <br>";
	for($i=0;$i<count($visits);$i++){
		echo $visits[$i]."<br />";
	}
    echo "you are interested in : ".$content;
?>