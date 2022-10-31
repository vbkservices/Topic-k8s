<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$name= $_POST["name"];
$namepase_name = $_POST["namepase_name"];
$container_name = $_POST["container_name"];
$container_image = $_POST["container_image"];
$container_volume = $_POST["container_volume"];
$container_cpu = $_POST["container_cpu"];
$container_memory = $_POST["container_memory"];
$clientip=$_SERVER["REMOTE_ADDR"];

$port=rand(1.1,999.9);
$port=str_pad($port,3,"0",STR_PAD_LEFT);    
$kube_port="8".$port;

$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    shell_exec('sudo /shell/namespase/create_container.sh '.$namepase_name.' '.$name.' '.$container_name.' '.$container_image.' '.$clientip.' '.$kube_port.'');
    shell_exec('sudo echo "/shell/namespase/create_container.sh '.$namepase_name.' '.$name.' '.$container_name.' '.$container_image.' '.$clientip.' '.$kube_port.'" > /shell/error.log');
}
?>