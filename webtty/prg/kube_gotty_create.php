<?php
//gotty連線機制
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];

$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    //收到開啟請求
    //開始更新資料庫
    /*
    $student="4080"."C018"; //確認使用者
    
    //像資料庫確認使用者狀況
    $port="8081";
    $container="demo-5877bb876b-kxkpt";
    $status="open";

    $mysql="".$student."  ".$port." ".$port." ".$port."";
     */
     //demo
     $student=$_POST["student"]; //確認使用者
    
     //像資料庫確認使用者狀況
     $port=$_POST["port"];
     $container=$_POST["container"];
     $namespace=$_POST["namespace"];
     $status="open";
 
     $mysql="".$student."  ".$port." ".$port." ".$port."";
    /*
    $port=rand(8000,8999);
    $student="4080C".sprintf("%03d",rand(1,100));
    $mysql="".$student."  ".$port."";
    exec("export TERM=xterm;tmux new -s 4080C".$student." -d sudo kubectl -n default exec -i -t demo-5877bb876b-kxkpt -- /bin/bash");
    exec( "export TERM=xterm;tmux new -s tty-C".$student." -d /usr/bin/gotty -p ".$port." -w /usr/bin/tmux attach-session -t 4080C".$student."" );
    exec("echo ".$mysql." >> /shell/mysql");
    */

    //資料庫確認狀況完就建立連線機制
    if(  $status == "open" ){
        exec("export TERM=xterm;tmux new -s ".$student." -d sudo kubectl -n ".$namespace." exec -i -t ".$container." -- /bin/bash");
        exec("export TERM=xterm;tmux new -s tty-".$student." -d /usr/bin/gotty -p ".$port." -w /usr/bin/tmux attach-session -t ".$student."" );
        exec("echo ".$mysql." > /shell/mysql");
        echo "開啟";
    }elseif( ".$status." != ".$student."){
        echo "已有了";
    }   
}
//$output = exec("/usr/bin/gotty -w /bin/bash");
//$output = exec("");
//$output = exec("sudo tmux new -s 4080C018 -d kubectl  -n default exec -i -t demo-5877bb876b-kxkpt -- /bin/bash");
//$output = exec("sudo tmux kill-session -t 4080C018");
//$output = exec("sh /shell/gotty.sh");
//export TERM=xterm //gotty -p 8082  -w /bin/bash &> /shell/reset &
//$output = exec("sudo tmux");
//exec("export TERM=xterm;tmux new -s 4080C018 -d sudo kubectl -n default exec -i -t demo-5877bb876b-kxkpt -- /bin/bash");
//exec( "export TERM=xterm;tmux new -s tty-C018 -d /usr/bin/gotty -p 8082 -w /usr/bin/tmux attach-session -t 4080C018" );
//exec( "export TERM=xterm;tmux new -s 4080C018 -d /usr/bin/gotty -p 8081 -w /usr/bin/sudo /usr/bin/kubectl -n default exec -i -t demo-5877bb876b-kxkpt -- /bin/bash" );
//tmux new -s 4080C018 -d /usr/bin/gotty -p 8081 -w sudo /usr/bin/kubectl -n default exec -i -t demo-5877bb876b-kxkpt -- /bin/bash
//$output = exec("gotty -w /bin/sh");
//echo $output
?>