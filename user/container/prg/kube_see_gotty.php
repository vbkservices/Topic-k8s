<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$apikey = $_POST["apikey"];
$user= $_POST["user"];
$name= $_POST["name"];
$pod_name= $_POST["pod_name"];
$namepase= $_POST["namepase"];
$image= $_POST["image"];
$see_port=$_POST["see_port"];
$port=$_POST["port"];
$clientip=$_SERVER["REMOTE_ADDR"];
$status=$_POST["status"];

//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
      shell_exec('/shell/containers/gotty_see_cont.sh '.$namepase.'');
      shell_exec('sudo kubectl label ns '.$namepase.' see.teacher-');
      shell_exec('sudo kubectl label ns '.$namepase.' see.teacher='.$pod_name.'');
      #shell_exec('echo "sudo kubectl label ns '.$namepase.' see.teacher='.$pod_name.'" > /shell/error.log');
      $optnet=shell_exec('/shell/namespase/create_gotty_see_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.' '.$user.' '.$see_port.'');
      echo $optnet;
      #shell_exec('sudo echo "sudo /shell/namespase/create_gotty_see_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.' '.$user.' '.$see_port.'" > /shell/error.log');
}
?>