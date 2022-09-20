<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$namepase = $_POST["namepase"];
$student = $_POST["student"];
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
        shell_exec('sudo kubectl label namespace '.$namepase.' '.$student.'='.$student.'');
        shell_exec('echo "sudo kubectl label namespace '.$namepase.' '.$student.'='.$student.'">/shell/error.log');
        echo "新增學生";
}
?>