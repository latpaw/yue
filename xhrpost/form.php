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
	<link rel="stylesheet" type="text/css" href="css/demo<?php echo $demo; ?>.css">
	<style type="text/css" src=""></style>
</head>
<body onload="document.forms[0].reset()">

	<?php if($demo=="1"){include('demo1.php');};?>
	
<script type="text/javascript">
// alert(parent.location.href)
var byid=function(id){return document.getElementById(id)}

///////////////////////////////process the url
var href = window.location.href
var href_tmp = href.split("?")[0].split("/")
var path = href_tmp.slice(0,href_tmp.length-1)
path = path.join("/")+"/"

//////////////////////////////include the js
var formjs = document.createElement("script")
formjs.type="text/javascript"
formjs.src=path+"demo"+<?php echo $demo; ?>+".js"
document.getElementsByTagName("head")[0].appendChild(formjs)

// function setHeight(){ /////////////////set the iframe height through proxy
//  // var height = byid("form").offsetHeight+50
//  // var tmps = document.createElement("iframe")
//  // tmps.src="http://al.sbmchina.com/asd/proxy.html#800|"+height
//  // tmps.style.display="none"
//  // document.getElementById("form").appendChild(tmps)
 
// }
// setHeight()

///////////////////////////////////////////////add the click event to the checkbox
var appequip = document.getElementsByTagName("i")
for(i in appequip){
	appequip[i].onclick=function(){
			if(this.className.indexOf("gray")>0){
				this.className="box orange"
			}else{
				this.className="box gray"
			}
	}
}
</script>

</body>
</html>
