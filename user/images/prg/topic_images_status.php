<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);

$status = $_POST["status"];
$username = $_POST["username"];
$username=strtolower("$username");
if($enapikey == "2727175#356"){
   require '../../mysql_config.php';
    if($status == 'load'){
        /*$name=strtolower("$name");*/
        $docker_gotty=shell_exec("sudo /shell/images/gotty_user_status.sh ".$username."");
        shell_exec("echo 'sudo /shell/images/gotty_user_status.sh ".$username."' > /shell/error.log");
        echo $docker_gotty;
    }

    if($status == 'radio'){
        $imageknow=shell_exec("sudo /shell/images/image_user_status.sh ".$username."");
        echo json_encode($imageknow);

    }
    if($status == 'load_image'){
        $imageknow=shell_exec("sudo /shell/images/image_user_status.sh ".$username."");
     /*   $imageknow=json_decode($imageknow);*/
        $imageknow=json_decode($imageknow,true);
        $array=[];
        foreach ($imageknow[1] as $key => $value) {
            $data_user = $database->select("k8s_userdb", [
                "name"
            ], [
                "username" => ''.$value["user"].''
            ]);
            $array_json=[];
            array_push($array_json,$value["name"],$value["user"],$data_user[0]["name"],$value["tag"],$value["created"],$value["size"],$value["comment"]);
            array_push($array,$array_json);
        }
        echo json_encode($array);
    }

    if($status == 'open'){
        $imageknow=shell_exec("sudo /shell/images/gotty_user_image.sh ".$username."");
        echo json_encode($imageknow);
    }
    if($status == 'status_path'){
        $imageknow=shell_exec("sudo ls /topci/userimages/".$username."");
        $imageknow=mb_split("\s",$imageknow);
        echo json_encode($imageknow);
    }
}
?>