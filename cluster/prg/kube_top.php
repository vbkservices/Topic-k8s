<?php
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$obj = $_POST["obj"];

$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    $output = shell_exec("sh /shell/main.sh $obj");
    echo $output;
}

?>