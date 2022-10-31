<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$namepase = $_POST["namepase"];
$images_name = $_POST["images_name"];
$status = $_POST["status"];
$status_images = $_POST["status_images"];

//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
        if($status=="lable"){
                shell_exec('sudo kubectl label namespace '.$namepase.' docker.'.$images_name.'="show"');
                shell_exec('echo "sudo kubectl label namespace '.$namepase.' '.$images_name.'="show"">/shell/error.log');
        }else if($status=="switch"){
                shell_exec('sudo kubectl label namespace '.$namepase.' '.$images_name.'-');
                shell_exec('sudo kubectl label namespace '.$namepase.' '.$images_name.'='.$status_images.'');
                shell_exec('echo "sudo kubectl label namespace '.$namepase.' '.$images_name.'='.$images_name.'">/shell/error.log');
        }

}
?>