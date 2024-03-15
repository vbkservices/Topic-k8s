<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$name = $_POST["name"];
$name=strtolower("$name");
$image = $_POST["image"];
$tag = $_POST["tag"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
/*
exec('sudo docker exec -i vbfakregistry /bin/sh -c "rm -rf /var/lib/registry/docker/registry/v2/repositories/'.$image.'/_manifests/tags/'.$tag.'"');
exec('sudo docker exec -i vbfakregistry /bin/sh -c "registry garbage-collect /etc/docker/registry/config.yml"');
exec('echo "sudo docker exec -i myregistry /bin/sh -c "registry garbage-collect /etc/docker/registry/config.yml"" > /shell/error.log');*/
if($enapikey == "2727175#356"){
    exec('sudo docker exec -i vbfakregistry /bin/sh -c "rm -rf /var/lib/registry/docker/registry/v2/repositories/'.$image.'/_manifests/tags/'.$tag.'"');
    exec('sudo docker exec -i vbfakregistry /bin/sh -c "registry garbage-collect /etc/docker/registry/config.yml"');
    exec('echo "sudo docker exec -i myregistry /bin/sh -c "registry garbage-collect /etc/docker/registry/config.yml"" > /shell/error.log');
    echo $image;
}
?>