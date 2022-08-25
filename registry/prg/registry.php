<?php
//kubernetes pod的狀況
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    $output = shell_exec('sudo sh /shell/reposit.sh');
    echo json_encode($output);
}
?>