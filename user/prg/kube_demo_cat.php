<?php
//gotty連線機制
/*
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
exec("export TERM=xterm;tmux new -s ".$student." -d sudo kubectl -n default exec -i -t demo-5877bb876b-kxkpt -- /bin/bash");
exec("export TERM=xterm;tmux new -s tty-".$student." -d /usr/bin/gotty -p ".$port." -w /usr/bin/tmux attach-session -t ".$student."" ); 

*/
exec("export TERM=xterm; gotty -w /bin/bash" ); 
?>