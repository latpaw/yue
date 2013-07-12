<?php
//确保在连接客户端时不会超时
set_time_limit(0);

$ip = '172.16.2.197';
$port = 8086;

if(($sock = socket_create(AF_INET,SOCK_STREAM,SOL_TCP)) < 0) {
	echo "socket_create() cause:".socket_strerror($sock)."\n";
}

if(($ret = socket_bind($sock,$ip,$port)) < 0) {
	echo "socket_bind() cause:".socket_strerror($ret)."\n";
}

if(($ret = socket_listen($sock,4)) < 0) {
	echo "socket_listen() cause:".socket_strerror($ret)."\n";
}

$count = 0;

do {
	if (($msgsock = socket_accept($sock)) < 0) {
		echo "socket_accept() failed: reason: " . socket_strerror($msgsock) . "\n";
		echo "waiting...";
		break;
	} else {
		    $buffer = socket_read($msgsock,8192);
			$buf  = substr($buffer,strpos($buffer,'Sec-WebSocket-Key:')+18);
			$key  = trim(substr($buf,0,strpos($buf,"\r\n")));
			$new_key = base64_encode(sha1($key."258EAFA5-E914-47DA-95CA-C5AB0DC85B11",true));
			$new_message = "HTTP/1.1 101 Switching Protocols\r\n";
			$new_message .= "Upgrade: websocket\r\n";
			$new_message .= "Sec-WebSocket-Version: 13\r\n";
			$new_message .= "Connection: Upgrade\r\n";
			$new_message .= "Sec-WebSocket-Accept: " . $new_key . "\r\n\r\n";
			socket_write($msgsock, $new_message, 8192);
			$msg = "";
		while(true):
			ob_start();
			include("misc.php");
			$newmsg = ob_get_contents();
			ob_end_clean();
			// $newmsg = time();
			$newmsg = code($newmsg);
			if($msg != $newmsg){
			$msg = $newmsg;
			// echo $msg;
			$sent = socket_write($msgsock,$msg,strlen($msg));
			}else{
				continue;
			}
			sleep(5);
		endwhile;
// echo "success!\n";

$talkback = "Infor:$buffer\n";
echo $talkback;
echo $sent;
echo $new_message;

	}

	socket_close($msgsock);

} while (true);

socket_close($sock);

function code($msg){
	$msg = preg_replace(array('/\r$/','/\n$/','/\r\n$/',), '', $msg);
	$frame = array();  
	$frame[0] = '81';  
	$len = strlen($msg);  
	$frame[1] = $len<16?'0'.dechex($len):dechex($len);
	$frame[2] = ord_hex($msg);
	$data = implode('',$frame);
	return pack("H*", $data);
}
function ord_hex($data)  {  
	$msg = '';  
	$l = strlen($data);  
	for ($i= 0; $i<$l; $i++) {  
		$msg .= dechex(ord($data{$i}));  
	}  
	return $msg;  
}

?>
