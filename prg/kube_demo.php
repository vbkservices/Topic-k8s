<?php
/*
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$obj = $_POST["obj"];

$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){

    echo $output;
}*/

//$student="4080C"."018 ";
//$mysql="".$student."  ".$port."";
/*
$port=rand(8000,8999);
$student="4080C".sprintf("%03d",rand(1,100));
$mysql="".$student."  ".$port."";
exec("export TERM=xterm;tmux new -s 4080C".$student." -d sudo kubectl -n default exec -i -t demo-5877bb876b-kxkpt -- /bin/bash");
exec( "export TERM=xterm;tmux new -s tty-C".$student." -d /usr/bin/gotty -p ".$port." -w /usr/bin/tmux attach-session -t 4080C".$student."" );
exec("echo ".$mysql." >> /shell/mysql");
*/
exec("gotty -w /bin/bash");
//echo $status;
//$status="4080C018";
//$student="4080C018";
/*
$student="open";
if( $status == "open" ){    
    echo "open1";
}else{
    echo "已有了";
}*/
//echo "$status"."$student";
//$status="4080C018";
/*
if( $status == $student){    
    echo "$status";
}else{
    echo "已有了";
}*/
?>
