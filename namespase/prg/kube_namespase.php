<?php
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$name =$_POST["name"];
$namepase = $_POST["namepase"];
$username =$_POST["username"];
$status =$_POST["status"];
$type =$_POST["type"];
$username=strtolower("$username");
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);

//echo json_encode($array_json);
if($enapikey == "2727175#356"){
    require '../../mysql_config.php';
    if($status=="namespace"){
        $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces');
        $output =json_decode($output,true);
        $array_json=[];

        $k8s_user = $database->select("k8s_userdb", [
            "remark"
        ], [
            "username" => ''.$name.''
        ]);
        if($k8s_user[0]["remark"]=="teacher" || $k8s_user[0]["remark"]=="root" ){
            foreach($output["items"] as $value) {
                if($value["metadata"]["labels"]["user"]!=null && $value["metadata"]["labels"]["user"]==$name){
                    $array=[];
                    $data_user = $database->select("k8s_userdb", [
                        "name"
                    ], [
                        "username" => ''.$value["metadata"]["labels"]["user"].''
                    ]);
                    array_push($array,$value["metadata"]["name"],$data_user[0]["name"],$value["metadata"]["creationTimestamp"],$value["metadata"]["labels"]["status"]);
                    array_push($array_json,$array);
                }
            }
        }else if($k8s_user[0]["remark"]=="student"){
            foreach($output["items"] as $value) {
                if($value["metadata"]["labels"]["user"]!=null){
                    $array=[];
                    $data_user = $database->select("k8s_userdb", [
                        "name"
                    ], [
                        "username" => ''.$value["metadata"]["labels"]["user"].''
                    ]);
                    array_push($array,$value["metadata"]["name"],$data_user[0]["name"],$value["metadata"]["creationTimestamp"],$value["metadata"]["labels"]["status"]);
                    array_push($array_json,$array);
                }
            }
        }
        echo json_encode($array_json);
    }
    if($status=="namespace_pods"){
        $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'');
        $output =json_decode($output,true);
        $array_json=[];
        $image_total=0;
        $student_total=0;
        foreach($output["metadata"]["labels"] as $key => $revalue) {
            $array=[];
            $key=explode('.',$key);
            if($key[0]=="student"){
                $student_total=$student_total+1;
            }
            if($key[0]=="docker"){
                $image_total=$image_total+1;
            }
        };
        echo json_encode('{"name":"'.$output["metadata"]["name"].'","student":"'.$student_total.'","image":"'.$image_total.'","user":"'.$output["metadata"]["labels"]["user"].'","seeport":"'.$output["metadata"]["labels"]["seeport"].'","status":"'.$output["metadata"]["labels"]["status"].'"}');
        
    }
    if($status=="pod"){
        $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'');
        $output =json_decode($output,true);
        $array_json=[];
        if($output["code"]!=404){
            $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'/pods');
            $output =json_decode($output,true);
            foreach($output["items"] as $value) {
                if($value["metadata"]["labels"]["user"]!=null){
                    $array=[];
                    $data_user = $database->select("k8s_userdb", [
                        "name"
                    ], [
                        "username" => ''.$value["metadata"]["labels"]["user"].''
                    ]);
                    array_push($array,$value["status"]["phase"],$value["spec"]["containers"][0]["image"],$data_user[0]["name"],$value["metadata"]["name"],$value["metadata"]["labels"]["conrainer-status"]);
                    array_push($array_json,$array);
                }
            }
        }else{
            array_push($array_json,"false");
        }
        echo json_encode($array_json);
    }
    if($status=="mypod"){
        $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'/pods');
        $output =json_decode($output,true);
        $array_json=[];
        foreach($output["items"] as $value) {
            if($value["metadata"]["labels"]["user"]=="$username"){
                $array=[];
                $data_user = $database->select("k8s_userdb", [
                    "name"
                ], [
                    "username" => ''.$value["metadata"]["labels"]["user"].''
                ]);
                array_push($array,$value["status"]["phase"],$value["spec"]["containers"][0]["image"],$data_user[0]["name"],$value["metadata"]["name"],$value["metadata"]["creationTimestamp"],$value["metadata"]["labels"]["port"],$value["metadata"]["labels"]["status"],$value["metadata"]["labels"]["conrainer-status"]);
                array_push($array_json,$array);
            }
        }
        echo json_encode($array_json);
    }
    if($status=="status"){
        $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'');
        $output =json_decode($output,true);
        if($type=="image"){
            $array_images=[];
            foreach($output["metadata"]["labels"] as $key => $revalue) {
                $array=[];
                $key=explode('.',$key);
                if($key[0]=="docker"){
                    array_push($array,$key[1],$key[2],$key[3],$revalue);
                    array_push($array_images,$array);
                }
            };
            echo json_encode($array_images);
        }
        if($type=="student"){
            $array_student=[];
            foreach($output["metadata"]["labels"] as $key => $revalue) {
                $array=[];
                $key=explode('.',$key);
                if($key[0]=="student"){
                    $data_user = $database->select("k8s_userdb", [
                        "name"
                    ], [
                        "username" => ''.$key[1].''
                    ]);
                    array_push($array,$key[1],$data_user[0]["name"],$revalue);
                    array_push($array_student,$array);
                }
            };
            echo json_encode($array_student);
        }
    }

}
?>