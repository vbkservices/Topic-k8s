<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$name = $_POST["name"];
$namepase_name =$_POST["namepase_name"];
$namepase_student = $_POST["namepase_student"];
$namepase_images = $_POST["namepase_images"];
$namepase_status = $_POST["namepase_status"];
$namepase_student=strtolower("$namepase_student");
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    require '../../mysql_config.php';
    $remail = $database->count("namespace_name", ["namespace" => "$namepase_name"]);
    if($remail>=1){
        echo '["fales","exist"]';
    }else{
        $reaults=shell_exec('sudo /shell/namespase/create_namespase.sh '.$namepase_name.' '.$name.' "'.$namepase_student.'" "'.$namepase_images.'" '.$namepase_status.'');
        if($reaults=="false"){
            echo '["fales","create"]';
        }else{
            $reaults = trim($reaults);
            $database->query("INSERT INTO `namespace_name`(`id`,`name`,`namespace`) VALUES (null,'".$reaults."','".$namepase_name."');");
            echo '["true","create"]';
        }
    }
   /* shell_exec('echo "sudo /shell/namespase/create_namespase.sh '.$namepase_name.' '.$name.' \"'.$namepase_student.'\" \"'.$namepase_images.'\"" > /shell/error.log');*/
}
?>