<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];

$key="dic@ksu!2050014&";
$student=$_POST["student"]; //確認使用者
$containername=$_POST["containername"];
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    $output = shell_exec("sudo /shell/tmuxroot/images_push.sh ".$containername." ".$student." > /shell/error.log");
    echo $output;
}
?>