<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Demo</title>
<script type="text/javascript">
function say(words) {
    console.log(words);
}
</script>
</head>
<body>
<script type="text/javascript" src="http://172.16.2.197:8080/a.php?callback=say"></script>
</body>
</html>
<?php 
function a(){
	echo "asd";
}



?>