<?php
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$namepase = $_POST["namepase"];
$username ="4080C018";//$_POST["name"];
$username=strtolower("$username");
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);

if($enapikey == "2727175#356"){
    require '../../mysql_config.php';
    $output = shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces');
    $output =json_decode($output,true);
    
    $array_json=[];
    foreach($output["items"] as $value) {
        if($value["metadata"]["labels"]["user"]==$username){
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
    echo json_encode($array_json);
}
?>