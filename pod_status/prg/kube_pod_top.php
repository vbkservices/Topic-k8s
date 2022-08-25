<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];

$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    $output = shell_exec("curl http://127.0.0.1:8001/apis/metrics.k8s.io/v1beta1/pods");
    echo $output;
}

?>