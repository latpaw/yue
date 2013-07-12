<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<button id="noti" onclick="window.webkitNotifications.requestPermission();">Request</button>
	<script type="text/javascript">
	if(window.webkitNotifications.checkPermission()!=0){
		document.querySelector("#noti").style.display="block"
	}else{document.querySelector("#noti").style.display="none"}

	var ws       = new WebSocket('ws://inquiry.zenithcrusher.com:4567');
	ws.onopen    = function()  { show('websocket opened'); };
	ws.onclose   = function()  { show('websocket closed'); }
	ws.onmessage = function(m) { show('websocket message: ' +  m.data); notify("",m.data); };

	function show(par){
		document.getElementById("a").innerHTML=par;
	}
	function notify(title,content) {
		if (window.webkitNotifications) {
			if (window.webkitNotifications.checkPermission() == 0) {
				var notification_test = window.webkitNotifications.createNotification("rails.png", title, content);
				notification_test.ondisplay = function(event) {
					setTimeout(function(){event.currentTarget.cancel();},3000)
				}
            // notification_test.onerror = function() {}
            // notification_test.onclose = function() {}
            // notification_test.onclick = function() {this.cancel();}
            // notification_test.replaceId = 'NewId';
            notification_test.show();
        } else {
        	window.webkitNotifications.requestPermission();
        }
    } 
}
</script>

</body>
</html>