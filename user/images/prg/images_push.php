<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];

$key="dic@ksu!2050014&";
$name=$_POST["name"]; //確認使用者
$containername=$_POST["containername"];
$imagename=$_POST["imagename"];
$containername=strtolower("$containername");
$tag=$_POST["tag"];
$new_tag=$_POST["new_tag"];
//$containername=strtolower("$containername");
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    $output = shell_exec("sudo /shell/teacher/images_push.sh ".$name." ".$imagename." ".$containername." ".$tag." ".$new_tag."");
    shell_exec("echo 'sudo /shell/teacher/images_push.sh ".$name." ".$imagename." ".$containername." ".$tag." ".$new_tag."' > /shell/error.log");
    echo $output;
}
?>