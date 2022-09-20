<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$namepase_name = $_POST["namepase_name"];
$container_name = $_POST["container_name"];
$container_image = $_POST["container_image"];
$container_volume = $_POST["container_volume"];
$container_cpu = $_POST["container_cpu"];
$container_memory = $_POST["container_memory"];
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    shell_exec('sudo /shell/namespase/create_container.sh '.$namepase_name.' '.$container_name.' '.$container_image.' ');
    shell_exec('sudo echo "sudo /shell/namespase/create_container.sh '.$namepase_name.' '.$container_name.' '.$container_image.'" > /shell/error.log');
}
?>