<?php
header("Access-Control-Allow-Origin: *");
$apikey=$_POST["apikey"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    require '../mysql_config.php';
    $data = $database->select("k8s_userdb", "*");
    echo json_encode($data);
}

?>