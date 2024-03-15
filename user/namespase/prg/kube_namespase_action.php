<?php
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];

$username =$_POST["name"];
$status =$_POST["status"];
$type =$_POST["type"];
$namepase = $_POST["namepase"];
$value = $_POST["value"];

$username=strtolower("$username");
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);

if($enapikey == "2727175#356"){
    if($type=="image"){
        if($status=="add"){
            $object=shell_exec('sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$value.'');
           // shell_exec('echo "sudo /shell/images/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$value.'" > /shell/error.log');
            echo $object;
        }
        if($status=="remove"){
            $object=shell_exec('sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$value.'');
           // shell_exec('echo "sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$value.'" > /shell/error.log');
            echo $object;
        }
        if($status=="show"){
            $object=shell_exec('sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$value.'');
            shell_exec('echo "sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$value.'" > /shell/error.log');
            echo $object;
        }else if($status=="hide"){
            $object=shell_exec('sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$value.'');
            shell_exec('echo "sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$value.'" > /shell/error.log');
            echo $object;
        }
    }

    if($type=="namespace"){

        if($status=="show"){
            $object=shell_exec('sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.'');
            shell_exec('echo "sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.'" > /shell/error.log');
            echo $object;
        }else if($status=="hide"){
            $object=shell_exec('sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.'');
            shell_exec('echo "sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.'" > /shell/error.log');
            echo $object;
        }
        if($status=="delete"){
            require '../../mysql_config.php';
            $object=shell_exec('/shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.'');
            $database->delete("namespace_name", [
                "AND" => [
                    "name" => "$namepase"
                ]
            ]);
            shell_exec('echo "/shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.'" > /shell/error.log');
            echo $object;
        }
    }
    if($type=="student"){
        require '../../mysql_config.php';
        if($status=="add"){
            $data = $_POST["data"];
            shell_exec("echo '".$data." ".$value."' > /shell/error.log");
            if($data=="select"){
                $data_user = $database->select("k8s_userdb", [
                    "username"
                ], [
                    "year" => ''.$value.''
                ]);
                $arr_student=[];
                foreach( $data_user as $key => $revalue) {
                    $object=shell_exec('sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$revalue["username"].'');
                    //shell_exec('echo "sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$revalue["username"].'">>/shell/error.log');
                    array_push($arr_student,$object);
                };
                echo json_encode($arr_student);

            }
            if($data=="value"){

            }
        }
        if($status=="remove"){
            $arr_student=[];
            $object=shell_exec('sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$value.'');
            //shell_exec('echo "sudo /shell/namespase/namespase_action.sh '.$type.' '.$status.' '.$username.' '.$namepase.' '.$value.'">>/shell/error.log');
            array_push($arr_student,$object);
            echo json_encode($arr_student);
        }
    }
}
?>