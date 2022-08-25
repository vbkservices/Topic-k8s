<?php
//gotty連線狀況查看
header("Access-Control-Allow-Origin: *");

$apikey = $_POST["apikey"];
$key="dic@ksu!2050014&";
/*
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){

}*/
//shell_exec("export TERM=xterm;tmux ls");
$json=exec("sh /shell/gotty.sh");
echo $json;
?>