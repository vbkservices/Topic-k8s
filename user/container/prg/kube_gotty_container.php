<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$name= $_POST["name"];
$pod_name= $_POST["pod_name"];
$namepase= $_POST["namepase"];
$image= $_POST["image"];
$port=$_POST["port"];
$clientip=$_SERVER["REMOTE_ADDR"];
$status=$_POST["status"];

$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);

if($enapikey == "2727175#356"){
    if($status=="create"){
        shell_exec('/shell/namespase/create_gotty_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.'');
        shell_exec('sudo echo "sudo /shell/namespase/create_gotty_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.'" > /shell/error.log');
    }else if($status=="see"){
        $optnet=shell_exec('/shell/namespase/create_gotty_see_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.'');
        echo $optnet;
        shell_exec('sudo echo "sudo /shell/namespase/create_gotty_see_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.'" > /shell/error.log');
    }
}
?>