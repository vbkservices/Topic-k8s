<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
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

$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'');
    $result = json_decode($output, true);
    $array=array();
    if($result['metadata']['labels']['user']==$user){
        /*
        if($result['metadata']['labels']['see.teacher']==NULL){

        }else{
            $optnet=shell_exec('/shell/namespase/create_gotty_see_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.' '.$user.' '.$see_port.'');
         //   shell_exec('echo "123"> /shell/error.log');
            array_push($array,$result['metadata']['labels']['user']."_"."$namepase"."_".$result['metadata']['labels']['see.teacher'],$result['metadata']['labels']['seeport']);
           // array_push($array,$result['metadata']['labels']['user'],$user);
        }*/
        if($status=="create"){
            $optnet=shell_exec('/shell/namespase/create_gotty_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.'');
            array_push($array,$optnet,$port);
        }else if($status=="see"){
            $optnet=shell_exec('/shell/namespase/create_gotty_see_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.' '.$user.' '.$see_port.'');
            array_push($array,$optnet,$result['metadata']['labels']['seeport']);
        }
        echo json_encode($array);
        shell_exec('export TERM=xterm;tmux new -s close_'.$port.' -d /bin/bash -c "sleep 10s && sudo /sbin/iptables -D INPUT -p tcp -s '.$clientip.' -m tcp --dport '.$port.' -j ACCEPT"');
    }else{
        if($result['metadata']['labels']['see.teacher']==NULL){
            if($status=="create"){
                $optnet=shell_exec('/shell/namespase/create_gotty_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.'');
                array_push($array,$optnet,$port);
            }else if($status=="see"){
                $optnet=shell_exec('/shell/namespase/create_gotty_see_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.' '.$user.' '.$see_port.'');
                array_push($array,$optnet,$result['metadata']['labels']['seeport']);
            }
            echo json_encode($array);
        }else{
            $optnet=shell_exec('/shell/namespase/create_gotty_see_container.sh '.$name.' '.$pod_name.' '.$namepase.' '.$image.' '.$clientip.' '.$port.' '.$user.' '.$see_port.'');
         //   shell_exec('echo "123"> /shell/error.log');
            array_push($array,$result['metadata']['labels']['user']."_"."$namepase"."_".$result['metadata']['labels']['see.teacher'],$result['metadata']['labels']['seeport']);
           // array_push($array,$result['metadata']['labels']['user'],$user);
            echo json_encode($array);
        }
        shell_exec('export TERM=xterm;tmux new -s close_'.$port.' -d /bin/bash -c "sleep 10s && sudo /sbin/iptables -D INPUT -p tcp -s '.$clientip.' -m tcp --dport '.$port.' -j ACCEPT"');
    }
}
?>