<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$images = $_POST["images"];
$objost = $_POST["objost"];
$down = $_POST["down"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    if( $down == "true" ){
        $output = shell_exec("sudo /shell/root_images.sh ".$images.";echo 'sudo /shell/root_images.sh ".$images."' > /shell/error.log");
        echo "true";
    }else{
        $output = shell_exec("sudo /shell/images_search.sh ".$objost.";echo 'sudo /shell/images_search.sh ".$objost."' > /shell/error.log");
        echo $output;
    }
}
?>