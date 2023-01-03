<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$text = $_POST["text"];
$imgtext = $_POST["imgtext"];
$key="dic@ksu!2050014&";

$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    $output = shell_exec("sudo docker exec -i ".$imgtext." /bin/sh -c 'echo -e \"".$text."\" > /open-services.sh'");
    echo $imgtext;
}


let time = value.Created.replace(/[A-Z]/g, " ")
time = time.replace(/\.+\w+\w/gi, '');
images_name=images.replace(/\:+\w+\w/g, "").replace(/\s*/g, "")
images_tag=images.replace(/\w+\/+\w+\:/g, "").replace(/\s*/g, "")
// let imagename=value.name+":"+value.tag
let containername_image=images_name.replace("/", "_")
let containername="docker_"+name+"_"+containername_image.replace(/\s*/g, "")

<p class="card-text row  justify-content-center">
<a href="#" class="btn btn-primary col-3 mx-2" onclick="edit_image('`+images_name.replace('/', '_')+`','`+images_name+`','`+images_tag+`')">編輯</a>
<a href="#" class="btn btn-outline-success mx-2 col-3" onclick="save_image('`+images_name+`','`+containername+`','`+images_tag+`')">保存</a>
<a href="#" class="btn btn-outline-danger mx-2 col-3" onclick="delete_image('`+images_name+`','`+images_tag+`')">刪除</a>
<p class="card-text mt-2"><a href="#" class="btn btn-primary  col-12" onclick="read_image('`+images_name+`')">寫入指令</a></p>
<p class="card-text mt-2"><a href="#" class="btn btn-primary  col-12"onclick="push_image('`+images_name+`','`+containername+`','`+images_tag+`')">上傳硬碟</a></p>
</p>
?>