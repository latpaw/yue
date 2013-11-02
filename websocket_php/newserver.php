<?php       
header("Content-Type: text/event-stream\n\n");
header("Cache-Control: no-cache");
echo "data: abc\n";
  // ob_flush();
  flush();
  sleep(1);

?>