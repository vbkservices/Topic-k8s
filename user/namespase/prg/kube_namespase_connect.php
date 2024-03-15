<?php
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$namepase =$_POST["namepase"];
$username =$_POST["username"];
$status =$_POST["status"];
$contain =$_POST["contain"];
$type =$_POST["type"];
$username=strtolower("$username");
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);

if($enapikey == "2727175#356"){
    $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'');
    $output =json_decode($output,true);
    $array_json=[];
    if($output["code"]!=404){
        if($status=="connect"){
            $clientip=$_SERVER["REMOTE_ADDR"];
            
            if($type=="open"){
                $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'/pods/'.$contain.'');
                $output =json_decode($output,true);
                $echo_output = shell_exec('/shell/namespase/create_gotty_container.sh '.$output["metadata"]["labels"]["user"].' '.$output["metadata"]["name"].' '.$namepase.' '.$clientip.' '.$output["metadata"]["labels"]["port"].'');
            }else if($type=="see"){
                require '../../mysql_config.php';
                $k8s_user = $database->select("k8s_userdb", [
                    "remark"
                ], [
                    "username" => ''.$username.''
                ]);
                if($k8s_user[0]["remark"]=="teacher" || $k8s_user[0]["remark"]=="root"){
                    $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'');
                    $output =json_decode($output,true);
                    $echo_output = shell_exec('/shell/namespase/create_gotty_container.sh '.$output["metadata"]["labels"]["user"].' '.$contain.' '.$namepase.' '.$clientip.' '.$output["metadata"]["labels"]["seeport"].' '.$type.'');
                }else{
                    $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'/pods/'.$contain.'');
                    $output =json_decode($output,true);
                    if($output["metadata"]["labels"]["conrainer-status"]=="open"){
                        $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'');
                        $output =json_decode($output,true);
                        $echo_output = shell_exec('/shell/namespase/create_gotty_container.sh '.$output["metadata"]["labels"]["user"].' '.$contain.' '.$namepase.' '.$clientip.' '.$output["metadata"]["labels"]["seeport"].' '.$type.'');
                        shell_exec('echo "/shell/namespase/create_gotty_container.sh '.$output["metadata"]["labels"]["user"].' '.$contain.' '.$namepase.' '.$clientip.' '.$output["metadata"]["labels"]["seeport"].' '.$type.'" > /shell/error.log');
                    }else{
                        $echo_output = "[[false],[false]]";
                    }
                }
            }
            echo json_encode($echo_output);
        }
        if($status=="close"){
            $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'/pods/'.$contain.'');
            $output =json_decode($output,true);
            $echo_output = shell_exec('/shell/namespase/delete_deploy_pod_gotty.sh '.$output["spec"]["containers"][0]["name"].' '.$namepase.' '.$output["metadata"]["name"].' '.$output["metadata"]["labels"]["port"].' '.$contain.'');
            shell_exec('echo "/shell/namespase/delete_deploy_pod_gotty.sh '.$output["spec"]["containers"][0]["name"].' '.$namepase.' '.$output["metadata"]["name"].' '.$output["metadata"]["labels"]["port"].' '.$contain.'" > /shell/error.log');
            echo json_encode($echo_output);
        }
        if($status=="open"){
            $clientip=$_SERVER["REMOTE_ADDR"];
            $output = shell_exec('sudo /shell/namespase/create_container.sh '.$namepase.' '.$username.' '.$contain.' '.$clientip.'');
            shell_exec('echo "/shell/namespase/create_container.sh '.$namepase.' '.$username.' '.$contain.' '.$clientip.'" > /shell/error.log');
            echo '[true]';
        }
        if($type=="pod"){
            if($status=="open_pod"){
                $object=shell_exec('sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$contain.'');
                shell_exec('echo "sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$contain.'" > /shell/error.log');

            }else if($status=="close_pod"){
                $object=shell_exec('sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$contain.'');
                shell_exec('echo "sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$contain.'" > /shell/error.log');
            }
            echo '[true]';
        }
    }else{
        array_push($array_json,"false");
        echo json_encode($array_json);
    }
}
?>