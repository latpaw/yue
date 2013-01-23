<!DOCTYPE HTML>

<html lang="en-US">

<head>

<meta charset="UTF-8">

<title></title>

</head>

<body>

<div id="form">

<script type="text/javascript" src="inquiry.js"></script>

<!-- <p id="a">a</p> -->

</div>

 

 

<script type="text/javascript">

 

var sub = document.getElementById("inquiry_submit");


var form = document.getElementById("form");

// var a = document.getElementById("a");

function cxhr(){

if(window.ActiveXObject){

return new ActiveXObject("Microsoft.XMLHTTP");

}else if(window.XMLHttpRequest){

return new XMLHttpRequest();

}

}

sub.onclick=function(ev){

var xhr = cxhr();
ev = ev || window.event;


if(ev.preventDefault){

ev.preventDefault();//or firefox not work,chrome will
}else{
ev.returnValue=false;
}



var url="m.php";

var params="name="+document.getElementById("cm_name").value+"&text="+document.getElementById("cm_content").value;

xhr.open("POST",url,true);

xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset:UTF-8");

// xhr.setRequestHeader("Content-length",params.length);

// xhr.setRequestHeader("Connection","close");

xhr.onreadystatechange = function(){

// console.log(xhr.readyState);

if(xhr.readyState == 4 && xhr.status == 200){

var b = xhr.responseText;

form.innerHTML = b;

form.style.opacity="0";

var op=0;

var o = setInterval(function(){op=op+0.1;if(op>=1){op=1;window.clearInterval(o);}form.style.opacity = op;},100)

}

};

xhr.send(params);

 

}

 

</script>

</body>

</html>