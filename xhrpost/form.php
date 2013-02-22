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
#mask{width:100%;height:100%;top:0;left:0;position:absolute;background:#fff;opacity:0.9;}
#maskp{opacity:1;background:#fff;position:absolute;left:20px;top:20px;}

.input span{cursor:pointer; display:inline-block;border-radius:2px;padding:2px; ;}
.interested{background:#468847;color:#000}
#textarea{display:none;border:1px #3eabff dashed;width:500px;margin:10px;padding:0;overflow-y:visible;}
#message{display:none;}
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

		<div class="input" id="purpose">Interested: <span>Construction</span> <span>Mining</span> <span>Crusher</span> <span>Ball Mill</span> <a href="" onclick="event.preventDefault();document.getElementById('textarea').style.display=document.getElementById('textarea').style.display=='block'?'none':'block';document.getElementById('textarea').focus();document.getElementById('message').style.display=document.getElementById('textarea').style.display=='block'?'none':'block';setHeight();" style="text-decoration:none;color:#999">↓</a></div>
		<div class="input" id="message" onclick="this.style.display='none';document.getElementById('textarea').style.display='block';document.getElementById('textarea').focus()"></div>
        <div ><textarea id="textarea" onblur="this.style.display='none';if(document.getElementById('textarea').value!=''){document.getElementById('message').innerHTML='You say: '+ document.getElementById('textarea').value;document.getElementById('message').style.display='block'}"></textarea></div>

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

var span = document.getElementById("purpose").childNodes
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
 top.document.getElementsByTagName("iframe")[0].style.height = document.getElementById("form").offsetHeight+50+"px"
}
setHeight()
</script>

</body>
</html>
