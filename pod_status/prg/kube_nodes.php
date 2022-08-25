<?php
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
  $output = shell_exec('curl http://127.0.0.1:8001/apis/metrics.k8s.io/v1beta1/nodes');
  echo json_encode($output);
}

?>
