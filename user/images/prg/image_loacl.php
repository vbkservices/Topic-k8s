<?php
//gotty連線機制
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$name = $_POST["name"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);

$docker_gotty=shell_exec("sudo sh /shell/teacher/local_images_status.sh 4080c018");
echo $docker_gotty;

if($enapikey == "2727175#356"){
     $name=strtolower("$name");
     $docker_gotty=shell_exec("sudo /shell/teacher/local_images_status.sh ".$name."");
     shell_exec("echo 'sudo /shell/teacher/local_images_status.sh ".$name."' > /shell/error.log");
     echo $docker_gotty;
}
?>