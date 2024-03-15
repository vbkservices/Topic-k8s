<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$images = $_POST["images"];
$objost = $_POST["objost"];
$status = $_POST["status"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
$array=[];

if($enapikey == "2727175#356"){

    require '../../login/prg/mysql_config.php';
    if( $status == "download" ){
        $image_count = $database->count("image_download", ["imagenamne" => "$images"]);
       if( $image_count == 1 ){
            array_push($array,false,"以下載至儲藏庫");
       }else{
        array_push($array,true);
       }
       echo json_encode($array);
    }

    if( $status == "download_join" ){
        $image_count = $database->count("image_download", ["imagenamne" => "$images"]);
       if( $image_count == 0 ){
        $database->query("INSERT INTO `image_download`(`id`,`imagenamne`,`imagestatus`) VALUES (null,'".$images."','ready');");
        $output = shell_exec("sudo /shell/root_images.sh ".$images."");
        $output=json_decode($output);
		$database->update("image_download", [
			"imagestatus" => "".$output[0].""
		], [
			"imagenamne" => "$images"
		]);
       }
    }

    if($status == "search"){
        $output = shell_exec("sudo /shell/images_search.sh ".$objost."");
        echo $output;
    }

    if($status == "download_status"){
        $imageknow = $database->select("image_download", [
            "imagenamne",
            "imagestatus"
        ]);
        foreach ($imageknow as $key => $value) {
            array_push($array,$value);
        }
        echo json_encode($array);
    }

    if($status == "img_status"){
        $imageknow = $database->select("image_download", [
            "imagestatus"
        ], [
            "imagenamne" => "$images"
        ]);
        echo json_encode($imageknow);
    }

    if($status == "imgdelete"){
        $database->update("image_download", [
			"imagestatus" => "delete"
		], [
			"imagenamne" => "$images"
		]);
        shell_exec("sudo rm -rf /topci/images/registry/docker/registry/v2/repositories/defaults/".$images."");
        $database->delete("image_download", [
            "AND" => [
                "imagenamne" => "$images"
            ]
        ]);
    }
}
?>