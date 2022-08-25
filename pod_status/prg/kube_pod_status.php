<?php
//確認容器詳細狀況
//右版面顯示
//前端會持續讀取
header("Access-Control-Allow-Origin: *");

$apikey = $_POST["apikey"];
$obj = $_POST["obj"];

$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    $student=shell_exec("cat /shell/mysql | awk '{print $1}'");
    if(  $student ==  $student ){
        $data=array();
        $array1=shell_exec("cat /shell/mysql | awk '{print $1}'");
        $array2=shell_exec("cat /shell/mysql | awk '{print $2}'");
        $array3=shell_exec("cat /shell/mysql | awk '{print $3}'");
        $array4=shell_exec("cat /shell/mysql | awk '{print $4}'");
        $array5=shell_exec("cat /shell/mysql | awk '{print $5}'");
        array_push($data,$array1,$array2,$array3,$array4,$array5);
        echo json_encode($data);
    }else{
        $data=array();
        $array1="尚未使用";
        $array2="尚未使用";
        $array3="尚未使用";
        $array4="尚未使用";
        array_push($data,$array1,$array2,$array3,$array4);
        echo json_encode($data);
    }
}




?>