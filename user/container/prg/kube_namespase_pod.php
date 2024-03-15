<?php
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$namepase = $_POST["namepase"];
$key="dic@ksu!2050014&";

$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
  $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'/pods');
  echo json_encode($output);
}
?>