<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$name = $_POST["name"];
$name=strtolower("$name");
$image = $_POST["image"];
$container = $_POST["container"];

$tag = $_POST["tag"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    //exec('sudo docker exec -i myregistry /bin/sh -c "rm -rf /var/lib/registry/docker/registry/v2/repositories/'.$image.'/_manifests/tags/'.$tag.'"');
    //exec('sudo docker exec -i myregistry /bin/sh -c "registry garbage-collect /etc/docker/registry/config.yml"');
    exec('sudo docker rm -f docker_'.$name.'_'.$container .'_'.$tag.' ');
    exec('sudo docker rmi 10.255.1.254:5000/'.$image.':'.$tag.'');
    echo $container;
  //  exec('sudo docker rmi -f 10.255.1.254/${image}:${tag}');
}
?>