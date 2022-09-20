<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$name = $_POST["name"];
$namepase_name = $_POST["namepase_name"];
$namepase_student = $_POST["namepase_student"];
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    shell_exec('sudo /shell/namespase/create_namespase.sh '.$namepase_name.' '.$name.' "'.$namepase_student.'"');
    shell_exec('sudo echo "sudo /shell/namespase/create_namespase.sh '.$namepase_name.' "'.$namepase_student.'"" > /shell/error.log');
}
?>