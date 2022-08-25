<?php

header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$student=$_POST["student"]; 
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    
    /*
    $port=rand(8000,8999);
    $student="4080C".sprintf("%03d",rand(1,100));
    $mysql="".$student."  ".$port."";
    exec("export TERM=xterm;tmux new -s 4080C".$student." -d sudo kubectl -n default exec -i -t demo-5877bb876b-kxkpt -- /bin/bash");
    exec( "export TERM=xterm;tmux new -s tty-C".$student." -d /usr/bin/gotty -p ".$port." -w /usr/bin/tmux attach-session -t 4080C".$student."" );
    exec("echo ".$mysql." >> /shell/mysql");*/
    exec("export TERM=xterm;tmux kill-session -t ".$student."");
    exec("export TERM=xterm;tmux kill-session -t tty-".$student."");
    exec("export TERM=xterm;tmux kill-session -t pts-tty-".$student."");
    exec("echo "." > /shell/mysql");
    echo "關閉";

}
/*$status=exec("cat /shell/mysql | awk '{print $1}'");

if( ".$status." == ".$student."){
    exec("export TERM=xterm;tmux kill-session -t ".$student."");
    exec("export TERM=xterm;tmux kill-session -t tty-".$student."");
    exec("echo "." > /shell/mysql");
    echo "關閉";
}*/

//$output = exec("/usr/bin/gotty -w /bin/bash");
//$output = exec("");
//$output = exec("sudo tmux new -s 4080C018 -d kubectl  -n default exec -i -t demo-5877bb876b-kxkpt -- /bin/bash");
//$output = exec("sudo tmux kill-session -t 4080C018");
//$output = exec("sh /shell/gotty.sh");
//export TERM=xterm //gotty -p 8082  -w /bin/bash &> /shell/reset &
//$output = exec("sudo tmux");
//exec("export TERM=xterm;tmux new -s 4080C018 -d sudo kubectl  -n default exec -i -t demo-5877bb876b-kxkpt -- /bin/bash");
//exec( "export TERM=xterm;" );
//exec("export TERM=xterm;tmux kill-session -t 4080C085");
//exec("export TERM=xterm;tmux kill-session -t tty-C085");
//echo "123";
?>