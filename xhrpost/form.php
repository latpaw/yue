<?php
$lan = isset($_GET['lan'])? $_GET['lan'] : 'en';
$demo = isset($_GET['demo'])? $_GET['demo'] : '1';
include("lan.php");
?>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title></title>
	<link rel="stylesheet" type="text/css" href="<?php if($demo=='1'){echo 'css/demo1.css';} ?>">
	<style type="text/css" src=""></style>
</head>
<body onload="document.forms[0].reset()">

<p id="result"></p>
	<form action="" name="form" method="post" id="form">
		<div class="input" id="name_out">
			<?php locale("name");?>: <input type="text" name="name" id="name" >
		</div>
		<div class="input" id="email_out">
			<?php locale("email");?>: <input type="text" name="email" id="email" >
		</div>
		<div class="input" id="country_out">
			<?php locale("country");?>: <select disabled type="text" name="country" id="country">
		</select><b id="not">Not</b></div>
		<div class="input" id="tel_out">
			<?php locale("telephone");?>: <input type="text" name="phone" id="phone" >
		</div>
		<div class="input" id="company_out">
			<?php locale("company");?>: <input type="text" name="company" id="company" >
		</div>
		<input type="hidden" name="visits" id="visits" value="<?php echo $_GET['visits'];?>">

		<div class="input" id="purpose">
			Interested: 
			<span>Construction</span> <span>Mining</span> <span>Crusher</span>  <span>Ball Mill</span> <a href="" id="down">↓</a>
		</div>
		<div class="input" id="message"></div>
        <div ><textarea id="textarea"></textarea></div>

		<input type="button" id="submit" value="<?php locale('submit');?>">
	</form>

<script type="text/javascript">
var byid=function(id){return document.getElementById(id)}

byid("down").onclick=function(){
	event.preventDefault();
	byid('textarea').style.display=byid('textarea').style.display=='block'?'none':'block';
	byid('textarea').focus();
	byid('message').style.display=byid('textarea').style.display=='block'?'none':'block';
	setHeight();
}

byid("message").onclick=function(){
	this.style.display='none';
	byid('textarea').style.display='block';
	byid('textarea').focus();
}

byid("textarea").onblur=function(){
	this.style.display='none';
	if(byid('textarea').value!=''){
		byid('message').innerHTML='You say: '+ byid('textarea').value;
		byid('message').style.display='block';
		byid('message').style.height='auto';
	}
		setHeight();
}

var href = window.location.href
var href_tmp = href.split("?")[0].split("/")
var path = href_tmp.slice(0,href_tmp.length-1)
path = path.join("/")+"/"
// console.log(path)
var formjs = document.createElement("script")
formjs.type="text/javascript"
formjs.src=path+"form.js"
document.getElementsByTagName("head")[0].appendChild(formjs)

var span = byid("purpose").childNodes
for(i in span){
	if(span[i].nodeName == "SPAN"){
		span[i].onclick = function(){
			if(this.className==""){
			this.className="interested"
		    }
			else{this.className=""}
		}
	}
}//感兴趣的产品

function interested(){
          var interested=" "
for(i in span){
	if(span[i].nodeName == "SPAN" && span[i].className=="interested"){
          interested = interested + "/"+ span[i].innerHTML
		}
	}
	return interested
}//获取感兴趣的产品

function setHeight(){
 top.document.getElementsByTagName("iframe")[0].style.height = byid("form").offsetHeight+50+"px"
}
setHeight()
</script>

</body>
</html>
