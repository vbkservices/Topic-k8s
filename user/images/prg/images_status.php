<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$name = $_POST["name"];
$name=strtolower("$name");
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    $output = shell_exec("sudo /shell/imgyml/test_status.sh ".$name." 2> /dev/null");
    shell_exec("echo '/shell/imgyml/test_status.sh ".$name." 2> /dev/null' > /shell/error.log");
    echo $output;
}
?>