<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
$output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces');
$output =json_decode($output,true);
require '../../mysql_config.php';
$array_json=[];

$output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/4080c018-mi4d0498');
$output =json_decode($output,true);
$array_images=[];
foreach($output["metadata"]["labels"] as $key => $revalue) {
    $array=[];
    $key=explode('.',$key);
    if($key[0]=="docker"){
        if($key[1]=="defaults"){
            $image=$key[2].":".$key[3];
            array_push($array,$key[1],$key[2],$key[3],$revalue,$image);
            array_push($array_images,$array);
        }else{
            $vars=shell_exec("sudo docker inspect 10.255.1.254:5000/".$key[1]."/".$key[2].":".$key[3]."");
            $vars =json_decode($vars,true);
            $vars[0]["Comment"] =json_decode($vars[0]["Comment"],true);
            $image=$vars[0]["Comment"][0].":".$key[3];
            array_push($array,$key[1],$key[2],$key[3],$revalue,$image);
            array_push($array_images,$array);
        }
    }
};
echo json_encode($array_images);


?>