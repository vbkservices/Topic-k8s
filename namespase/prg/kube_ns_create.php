<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$course = $_POST["course"];
$contianername = $_POST["contianername"];
$images = $_POST["images"];
$cpu = $_POST["cpu"];
$memory = $_POST["memory"];
$volume = $_POST["volume"];
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    shell_exec('sudo sh /shell/demo_yaml.sh '.$course.' '.$contianername.' '.$images.' '.$cpu .' '.$memory.' '.$volume.'');
    shell_exec('sudo echo "sh /shell/demo_yaml.sh '.$course.' '.$contianername.' '.$images.' '.$cpu .' '.$memory.' '.$volume.'" > /shell/error.log');
}
?>