<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title></title>
	<style type="text/css">
ul{list-style-type: none;margin:0;padding:0}
.dropdown:hover{cursor:pointer}
.input{width:500px;margin:10px;padding:0;height:30px;position:relative;border-bottom:1px #3EABFF solid;color:#999;padding-left:10px;}
input{border:none;height:28px;width: 300px}
input:focus{outline:none;}
#active{background:#009900}
#emailp{position:absolute;top:10px;left:50px;width:200px;color:#333;z-index:1000;background: #fff}
select{border:none;width:;}
button{border:none;border-radius:3px;padding:4px;background:;background-position:-20px -20px}
#form{position:relative}
#mask{width:100%;height:100%;top:0;left:0;position:absolute;background:#fff;opacity:0.5;}
#maskp{opacity:1;background:#fff;position:absolute;left:20px;top:20px;}
	</style>
</head>
<body onload="document.forms[0].reset()">

<p id="result"></p>
	<form action="" name="form" method="post" id="form">
		<div class="input" id="name_out">name: <input type="text" name="name" id="name" ></div>
		<div class="input" id="email_out">email: <input type="text" name="email" id="email" ></div>
		<div class="input" id="country_out">country: <select disabled type="text" name="country" id="country"  >

		</select><b id="not">Not</b></div>
		<div class="input" id="tel_out">telphone: <input type="text" name="tel" id="tel" ></div>
		<div class="input" id="company_out">company: <input type="text" name="company" id="company" ></div>
		<input type="hidden" name="visits" id="visits" value="<?php echo $_GET['visits'];?>">
		<input type="button" id="submit" value="Submit">
	</form>
	


<script type="text/javascript">
var href = window.location.href
var href_tmp = href.split("?")[0].split("/")
var path = href_tmp.slice(0,href_tmp.length-1)
path = path.join("/")+"/"
// console.log(path)
var formjs = document.createElement("script")
formjs.type="text/javascript"
formjs.src=path+"form.js"
document.getElementsByTagName("head")[0].appendChild(formjs)
</script>

</body>
</html>