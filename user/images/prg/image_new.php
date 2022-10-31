<?php
//gotty連線機制
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
     $name=$_POST["name"]; //確認使用者
     $containername=$_POST["containername"];
     $imagesname=$_POST["imagesname"];
     $imagesuser=$_POST["imagesuser"];
     $name=strtolower("$name");
     shell_exec("sudo /shell/imgyml/new_create_images.sh ".$name." ".$containername." ".$imagesname." ".$imagesuser."");
     shell_exec("echo 'sudo /shell/imgyml/new_create_images.sh ".$name." ".$containername." ".$imagesname." ".$imagesuser."' > /shell/error.log");
}
?>